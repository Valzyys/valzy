import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { PageCard } from "@/components/site/page-card";
import { PageHero } from "@/components/site/page-hero";
import { Timeline } from "@/components/site/timeline";
import { education, experiences } from "@/resources/experiences";

export const metadata: Metadata = { title: "Journey" };

export default function JourneyPage() {
	return (
		<PageCard
			maxWidth="m"
			stage={
				<PageHero
					index="04"
					title="Journey"
					cols={90}
					headline="From bootcamps to founding an ecosystem — the path so far."
					description="Every role and course that shaped how I build. Scroll and watch the line draw itself."
				/>
			}
		>
			<section className="flex w-full flex-col gap-6">
				<SplitHeading
					as="h2"
					className="m-0 font-medium text-3xl text-foreground md:text-4xl"
				>
					Work
				</SplitHeading>
				<Timeline
					entries={experiences.map((e) => ({ ...e, kind: "work" as const }))}
				/>
			</section>
			<section className="flex w-full flex-col gap-6">
				<SplitHeading
					as="h2"
					className="m-0 font-medium text-3xl text-foreground md:text-4xl"
				>
					Learning
				</SplitHeading>
				<Timeline
					entries={education.map((e) => ({ ...e, kind: "study" as const }))}
				/>
			</section>
			<Reveal className="rounded-2xl bg-stone-950 p-6 font-mono text-sm text-stone-400">
				<span className="text-orange-500">$</span> git log --oneline
				--since=2020 | wc -l
				<br />
				<span className="text-stone-100">→ a lot. and still counting.</span>
			</Reveal>
		</PageCard>
	);
}
