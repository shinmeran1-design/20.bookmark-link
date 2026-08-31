import { baseMetadata } from "@/lib/site-metadata";
import "../globals.css";

export const metadata = baseMetadata;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-[var(--bg)]">
        <main className="flex min-h-screen items-center justify-center px-6 py-16">
          {children}
        </main>
      </body>
    </html>
  );
}
