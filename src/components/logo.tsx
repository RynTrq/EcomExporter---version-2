import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  variant?: "header" | "lockup";
};

export function Logo({ compact = false, variant = "header" }: LogoProps) {
  if (variant === "lockup") {
    return (
      <Link className="brand brand-lockup" href="/" aria-label="Ecom Exporter home">
        <Image
          alt="Ecom Exporter — Manage, Optimize, Grow"
          className="brand-lockup-image"
          height={1254}
          loading="lazy"
          sizes="220px"
          src="/brand/logo.png"
          width={1254}
        />
      </Link>
    );
  }

  return (
    <Link className="brand brand-header" href="/" aria-label="Ecom Exporter home">
      <span className="brand-emblem" aria-hidden="true">
        <Image
          alt=""
          className="brand-emblem-image"
          height={256}
          sizes="48px"
          src="/brand/logo-emblem.png"
          width={256}
        />
      </span>
      {!compact && (
        <span className="brand-word">
          ECOM&nbsp;EXPORTER
          <small>MANAGE · OPTIMIZE · GROW</small>
        </span>
      )}
    </Link>
  );
}
