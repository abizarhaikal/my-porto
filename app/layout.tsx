import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://my-porto-six-sigma.vercel.app";
const description = "Haikal Abizar is a software engineer based in Jakarta, building web applications, operational dashboards, and backend services. Explore his projects and career journey.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Haikal Abizar | Full-stack Developer",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Haikal Abizar",
    title: "Haikal Abizar | Full-stack Developer",
    description,
  },
  twitter: { card: "summary_large_image", title: "Haikal Abizar | Full-stack Developer", description },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Haikal Abizar",
  url: siteUrl,
  image: `${siteUrl}/haikal-portrait-editorial.png`,
  jobTitle: "Software Engineer",
  description,
  sameAs: ["https://www.linkedin.com/in/haikal-abizar/", "https://www.instagram.com/abizarhaikal"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
