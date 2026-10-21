import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { AsciiButton } from "@/components/site/ascii-button";
import { PageCard } from "@/components/site/page-card";
import { PageHero } from "@/components/site/page-hero";
import { ProjectIndex } from "@/components/site/project-index";
import { projectsData } from "@/resources/projects";
import { socials } from "@/resources/socials";

export const metadata: Metadata = { title: "Projects" };

const sorted = [...projectsData].sort(
	(a, b) => b.date.getTime() - a.date.getTime(),
);

export default function ProjectsPage() {
	return (
		<PageCard
			maxWidth="l"
			stage={
				<PageHero
					index="02"
					title="Projects"
					cols={110}
					headline="Things I've designed, built and kept alive in production."
					description="Almost everything here lives inside the JKT48Connect ecosystem — one API feeding apps, bots, streaming and payments. Hover a row for a peek, click for the full story."
				/>
			}
		>
			<ProjectIndex projects={sorted} />
			<Reveal className="flex flex-col gap-4 rounded-2xl border border-foreground/10 p-6 md:flex-row md:items-center md:justify-between">
				<p className="m-0 text-lg text-muted-foreground">
					More experiments, forks and half-finished ideas live on GitHub.
				</p>
				<AsciiButton href={socials.github} label="Browse GitHub" />
			</Reveal>
		</PageCard>
	);
}
