import type { Metadata } from "next";
import { Inbox, LockKeyhole } from "lucide-react";
import { headers } from "next/headers";
import { createMetadata } from "@/lib/seo";
import { env } from "@/server/config/env";
import { listLeadRecords } from "@/server/db/repositories";
import { safeEqual } from "@/server/security/crypto";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Operations console",
  description: "Private Ecom Exporter operations console.",
  path: "/admin",
  robots: { index: false, follow: false },
});

export default async function AdminPage() {
  const authorization = (await headers()).get("authorization");
  const encodedCredentials = authorization?.startsWith("Basic ")
    ? authorization.slice(6)
    : "";
  const decodedCredentials = encodedCredentials
    ? Buffer.from(encodedCredentials, "base64").toString("utf8")
    : "";
  const separator = decodedCredentials.indexOf(":");
  const receivedUser =
    separator >= 0 ? decodedCredentials.slice(0, separator) : "";
  const receivedKey =
    separator >= 0 ? decodedCredentials.slice(separator + 1) : "";
  const authorized = Boolean(
    env.adminKey &&
      safeEqual(receivedUser, env.adminUser) &&
      safeEqual(receivedKey, env.adminKey),
  );

  if (!authorized) {
    return (
      <section className="admin-shell">
        <div className="container admin-empty">
          <span><LockKeyhole size={24} /></span>
          <h1>Operations console is locked.</h1>
          <p>
            {env.adminKey
              ? "Use HTTP Basic authentication with the configured admin user and secret."
              : "Set ADMIN_KEY before enabling this internal route."}
          </p>
        </div>
      </section>
    );
  }

  const leads = await listLeadRecords(250);

  return (
    <section className="admin-shell">
      <div className="container">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">Internal operations</span>
            <h1>Growth enquiries</h1>
          </div>
          <span className="admin-count">{leads.length} records</span>
        </div>
        {leads.length === 0 ? (
          <div className="admin-empty">
            <span><Inbox size={24} /></span>
            <h2>No enquiries yet.</h2>
            <p>Validated website leads will appear here.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Created</th>
                  <th>Contact</th>
                  <th>Marketplace</th>
                  <th>Revenue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{new Date(`${lead.created_at}Z`).toLocaleString()}</td>
                    <td>
                      <strong>{lead.name}</strong>
                      <a href={`mailto:${lead.email_display}`}>{lead.email_display}</a>
                      <span>{lead.phone_display}</span>
                    </td>
                    <td>{lead.marketplace}</td>
                    <td>{lead.monthly_revenue || "—"}</td>
                    <td><span className="status-chip">{lead.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
