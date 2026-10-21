import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { AsciiButton } from "@/components/site/ascii-button";
import { PageCard } from "@/components/site/page-card";
import { slugify } from "@/lib/site";
import { projectsData } from "@/resources/projects";

type Props = { params: Promise<{ slug: string }> };

const findIndex = (slug: string) =>
	projectsData.findIndex((p) => slugify(p.title) === slug);

export function generateStaticParams() {
	return projectsData.map((p) => ({ slug: slugify(p.title) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const project = projectsData[findIndex((await params).slug)];
	return project
		? { title: project.title, description: project.description }
		: {};
}

export default async function ProjectPage({ params }: Props) {
	const index = findIndex((await params).slug);
	if (index === -1) notFound();
	const project = projectsData[index];
	const next = projectsData[(index + 1) % projectsData.length];

	return (
		<PageCard maxWidth="l">
			<section className="flex w-full flex-col gap-8">
				<div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
					<Link
						href="/projects"
						className="ink text-muted-foreground no-underline hover:text-orange-500"
					>
						← all projects
					</Link>
					<span>
						case {String(index + 1).padStart(2, "0")} /{" "}
						{String(projectsData.length).padStart(2, "0")}
					</span>
				</div>
				<SplitHeading
					as="h1"
					type="chars"
					immediate
					className="m-0 font-pixel text-[clamp(48px,9vw,140px)] text-foreground leading-[0.9]"
				>
					{project.title}
				</SplitHeading>
				<div className="flex flex-wrap gap-2">
					{project.tags?.map((t) => (
						<span
							key={t}
							className="rounded-full border border-foreground/15 px-3 py-1 font-mono text-[11px] text-muted-foreground uppercase"
						>
							{t}
						</span>
					))}
				</div>
			</section>

			<Reveal className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl bg-stone-950">
				{project.imageUrl && (
					<img
						src={project.imageUrl}
						alt={project.title}
						className={`size-full object-cover ${project.invert ? "invert" : ""}`}
					/>
				)}
				<span className="absolute top-4 left-4 font-mono text-[11px] text-white uppercase tracking-widest mix-blend-difference">
					fig. {String(index + 1).padStart(2, "0")} — {project.title}
				</span>
			</Reveal>

			<div className="grid w-full grid-cols-1 gap-10 md:grid-cols-12">
				<Reveal className="flex flex-col gap-6 md:col-span-7">
					<span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
						Overview
					</span>
					<p className="m-0 text-2xl text-foreground leading-snug">
						{project.description}
					</p>
					<ul className="m-0 flex list-none flex-col gap-3 p-0">
						{project.highlights?.map((h, i) => (
							<li
								key={h}
								className="flex gap-4 border-foreground/10 border-t pt-3 text-lg text-muted-foreground"
							>
								<span className="font-mono text-orange-500 text-xs leading-7">
									0{i + 1}
								</span>
								{h}
							</li>
						))}
					</ul>
				</Reveal>
				<Reveal className="flex flex-col gap-6 md:col-span-5">
					<dl className="m-0 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-foreground/10 bg-foreground/10">
						<Meta
							label="Launched"
							value={project.date.toLocaleString("en-US", {
								month: "short",
								year: "numeric",
							})}
						/>
						<Meta label="Role" value="Design · Build · Ops" />
						<div className="col-span-2 flex flex-col gap-2 bg-accent p-4">
							<dt className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
								Stack
							</dt>
							<dd className="m-0 flex flex-wrap gap-1.5">
								{project.stack?.map((s) => (
									<span
										key={s}
										className="rounded-md bg-foreground/5 px-2 py-1 font-mono text-foreground text-xs"
									>
										{s}
									</span>
								))}
							</dd>
						</div>
					</dl>
					<div className="flex flex-wrap gap-2">
						{project.liveUrl && (
							<AsciiButton href={project.liveUrl} label="Visit live" />
						)}
						{project.repoUrl && (
							<AsciiButton
								href={project.repoUrl}
								label="Source"
								variant="ghost"
							/>
						)}
					</div>
				</Reveal>
			</div>

			<Link
				href={`/projects/${slugify(next.title)}` as Route}
				className="ink group flex w-full flex-col gap-2 border-foreground/10 border-t pt-8 text-foreground no-underline"
			>
				<span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
					Next case →
				</span>
				<span className="font-pixel text-[clamp(36px,7vw,96px)] leading-none transition-colors duration-300 group-hover:text-orange-500">
					{next.title}
				</span>
			</Link>
		</PageCard>
	);
}

function Meta({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col gap-1 bg-accent p-4">
			<dt className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
				{label}
			</dt>
			<dd className="m-0 text-foreground">{value}</dd>
		</div>
	);
}
