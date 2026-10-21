import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { PageCard } from "@/components/site/page-card";
import { PageHero } from "@/components/site/page-hero";
import { StackButton } from "@/components/stack-button";
import { stacksData } from "@/resources/stacks";

export const metadata: Metadata = { title: "Stack" };

const BAR = 24;
const max = Math.max(...stacksData.map((c) => c.items.length));
const total = stacksData.reduce((n, c) => n + c.items.length, 0);

export default function StackPage() {
	return (
		<PageCard
			maxWidth="m"
			stage={
				<PageHero
					index="03"
					title="Stack"
					cols={70}
					headline={`${total} tools, one goal: ship it fast and keep it running.`}
					description="Languages, frameworks, databases and infra I reach for. Not a résumé keyword dump — these all run something real, somewhere."
				/>
			}
		>
			{stacksData.map((cat, i) => {
				const filled = Math.round((cat.items.length / max) * BAR);
				return (
					<section
						key={cat.category}
						className="flex w-full flex-col gap-5 border-foreground/10 border-t pt-6"
					>
						<Reveal className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
							<h2 className="m-0 flex items-baseline gap-3 font-medium text-3xl text-foreground">
								<span className="font-mono text-orange-500 text-xs">
									{String(i + 1).padStart(2, "0")}
								</span>
								{cat.category}
							</h2>
							<span className="font-mono text-muted-foreground text-xs">
								<span className="sr-only">{cat.items.length} tools</span>
								<span aria-hidden className="text-orange-500">
									{"█".repeat(filled)}
								</span>
								<span aria-hidden className="text-foreground/15">
									{"░".repeat(BAR - filled)}
								</span>{" "}
								{String(cat.items.length).padStart(2, "0")}
							</span>
						</Reveal>
						<Reveal stagger={0.025} y={20} className="flex flex-wrap gap-2">
							{cat.items.map((item) => (
								<StackButton
									key={item.label}
									url={item.url}
									label={item.label}
									color={item.color ?? cat.parentColor}
									overrideMediaUrl={item.overrideMediaUrl}
								/>
							))}
						</Reveal>
					</section>
				);
			})}
		</PageCard>
	);
}
