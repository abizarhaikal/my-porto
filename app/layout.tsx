import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haikal Abizar | Full-stack Developer",
  description: "Haikal Abizar is a software engineer based in Jakarta, building web applications, operational dashboards, and backend services. Explore his projects and career journey.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
