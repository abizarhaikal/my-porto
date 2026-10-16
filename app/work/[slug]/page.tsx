import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "./CaseStudy";
import { detail, projectIds, projectInfo, type ProjectId } from "../projects";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return projectIds.map((slug) => ({ slug }));
}

function isProjectId(slug: string): slug is ProjectId {
  return projectIds.some((id) => id === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isProjectId(slug)) return {};
  const title = `${projectInfo[slug].name} | Haikal Abizar`;
  const description = detail.en[slug][0];
  const url = `/work/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  if (!isProjectId(slug)) notFound();
  return <CaseStudy id={slug} />;
}
