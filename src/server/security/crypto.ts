import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "@/server/config/env";

export function hashIp(ip: string) {
  return createHmac("sha256", env.ipHashSalt).update(ip).digest("hex");
}

export function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  const length = Math.max(leftBuffer.length, rightBuffer.length, 1);
  const paddedLeft = Buffer.alloc(length);
  const paddedRight = Buffer.alloc(length);
  leftBuffer.copy(paddedLeft);
  rightBuffer.copy(paddedRight);

  return timingSafeEqual(paddedLeft, paddedRight) && leftBuffer.length === rightBuffer.length;
}
