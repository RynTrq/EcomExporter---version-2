import { NextRequest, NextResponse } from "next/server";

const ADMIN_REALM = 'Basic realm="Ecom Exporter Operations", charset="UTF-8"';

export function proxy(request: NextRequest) {
  const isAdminPath =
    request.nextUrl.pathname === "/admin" ||
    request.nextUrl.pathname.startsWith("/admin/") ||
    request.nextUrl.pathname.startsWith("/api/admin/");

  if (isAdminPath && !isAuthorizedAdmin(request.headers.get("authorization"))) {
    const response = new NextResponse("Authentication required.", {
      status: 401,
      headers: {
        "www-authenticate": ADMIN_REALM,
      },
    });
    return applySecurityHeaders(response);
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

function isAuthorizedAdmin(authorization: string | null) {
  const adminKey = process.env.ADMIN_KEY;
  const adminUser = process.env.ADMIN_USER || "admin";
  if (!adminKey || !authorization?.startsWith("Basic ")) {
    return false;
  }

  const decoded = decodeBase64(authorization.slice(6));
  if (!decoded) return false;

  const separator = decoded.indexOf(":");
  const username = separator >= 0 ? decoded.slice(0, separator) : "";
  const password = separator >= 0 ? decoded.slice(separator + 1) : "";

  return constantTimeEqual(username, adminUser) && constantTimeEqual(password, adminKey);
}

function decodeBase64(value: string) {
  try {
    return atob(value);
  } catch {
    return "";
  }
}

function constantTimeEqual(left: string, right: string) {
  const maxLength = Math.max(left.length, right.length);
  let diff = left.length ^ right.length;
  for (let index = 0; index < maxLength; index += 1) {
    diff |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return diff === 0;
}

function applySecurityHeaders(response: NextResponse) {
  response.headers.set("content-security-policy", getContentSecurityPolicy());
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin");
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("x-frame-options", "DENY");
  response.headers.set("x-dns-prefetch-control", "on");
  response.headers.set("cross-origin-opener-policy", "same-origin");
  response.headers.set("cross-origin-resource-policy", "same-origin");
  response.headers.set(
    "permissions-policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()",
  );

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "strict-transport-security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }

  return response;
}

function getContentSecurityPolicy() {
  const scriptPolicy =
    process.env.NODE_ENV === "production"
      ? "'self' 'unsafe-inline'"
      : "'self' 'unsafe-inline' 'unsafe-eval'";

  const directives = [
    "default-src 'self'",
    `script-src ${scriptPolicy}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ];

  if (process.env.NODE_ENV === "production") {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}
