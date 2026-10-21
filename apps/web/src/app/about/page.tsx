import type { Metadata } from "next";
import { AsciiDonut } from "@/components/ascii/ascii-donut";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { AsciiButton } from "@/components/site/ascii-button";
import { PageCard } from "@/components/site/page-card";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = { title: "About" };

const principles = [
	{
		title: "Fans first",
		body: "Every feature starts with a fan's actual problem — missing a live, a confusing schedule, a payment that never confirms.",
	},
	{
		title: "Edge by default",
		body: "Workers, KV and Durable Objects keep things fast and cheap, so the platform stays free or affordable for the community.",
	},
	{
		title: "Own the whole stack",
		body: "API, dashboard, mobile app, bots, streaming, payments — building solo means caring about every layer, end to end.",
	},
];

const now = [
	["Building", "JKT48Connect Pay — multi-tenant QRIS billing"],
	["Maintaining", "The API, app, bot and @jkt48/core"],
	["Working with", "Cavallery & Fritzyforce IT divisions"],
	["Listening to", "JKT48 setlists on repeat"],
	["Oshi", "Catherina Vallencia ♡"],
];

export default function AboutPage() {
	return (
		<PageCard
			maxWidth="m"
			stage={
				<PageHero
					index="01"
					title="About"
					cols={80}
					headline="A developer who'd rather ship for fans than for metrics."
					description="I'm Valzy Nathaniel — an independent full-stack developer in Indonesia and the founder & sole engineer of JKT48Connect."
				/>
			}
		>
			<div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-12">
				<Reveal className="flex flex-col gap-5 text-lg text-muted-foreground leading-relaxed md:col-span-7">
					<p className="m-0">
						JKT48Connect started in 2024 as a small API so fans could stop
						refreshing five different sites. It grew into an ecosystem: a
						Cloudflare Workers API, a Next.js dashboard, a React Native app,
						live streaming infrastructure and an automated QRIS payment gateway
						— all designed, built and maintained by me.
					</p>
					<p className="m-0">
						Alongside that I work in the IT divisions of Cavallery and
						Fritzyforce (and previously Nayrakuen), helping fan communities run
						smoother online.
					</p>
					<p className="m-0">
						Outside of code you'll find me at theater shows, on live streams, or
						tinkering with something that probably didn't need to be rebuilt —
						but now runs at the edge.
					</p>
				</Reveal>
				<Reveal className="flex justify-center md:col-span-5">
					<div className="relative flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl bg-stone-950 text-orange-500">
						<AsciiDonut className="text-[clamp(6px,1.6vw,10px)]" />
						<span className="absolute bottom-3 left-3 font-mono text-[10px] text-stone-500 uppercase tracking-widest">
							fig. 01 — brain, idle
						</span>
					</div>
				</Reveal>
			</div>

			<section className="flex w-full flex-col gap-6">
				<SplitHeading
					as="h2"
					className="m-0 font-medium text-3xl text-foreground md:text-4xl"
				>
					What I believe in
				</SplitHeading>
				<Reveal stagger={0.1} className="grid grid-cols-1 gap-3 md:grid-cols-3">
					{principles.map((p, i) => (
						<article
							key={p.title}
							className="group flex flex-col gap-4 rounded-2xl border border-foreground/10 p-6 transition-colors duration-500 hover:bg-stone-950 hover:text-stone-100"
						>
							<span className="font-mono text-orange-500 text-xs">
								0{i + 1}
							</span>
							<h3 className="m-0 font-medium text-2xl">{p.title}</h3>
							<p className="m-0 text-muted-foreground transition-colors group-hover:text-stone-400">
								{p.body}
							</p>
						</article>
					))}
				</Reveal>
			</section>

			<section className="flex w-full flex-col gap-6">
				<SplitHeading
					as="h2"
					className="m-0 font-medium text-3xl text-foreground md:text-4xl"
				>
					Right now
				</SplitHeading>
				<Reveal stagger={0.06} className="flex flex-col">
					{now.map(([k, v]) => (
						<div
							key={k}
							className="flex flex-col gap-1 border-foreground/10 border-b py-4 first:border-t sm:flex-row sm:items-baseline sm:gap-6"
						>
							<span className="w-36 shrink-0 font-mono text-muted-foreground text-xs uppercase tracking-widest">
								{k}
							</span>
							<span className="text-foreground text-xl">{v}</span>
						</div>
					))}
				</Reveal>
				<div className="flex flex-wrap gap-2 pt-2">
					<AsciiButton href="/journey" label="See the journey" />
					<AsciiButton href="/contact" label="Get in touch" variant="ghost" />
				</div>
			</section>
		</PageCard>
	);
}
