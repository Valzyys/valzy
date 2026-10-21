"use client";

import { useRef } from "react";
import { AsciiField } from "@/components/ascii/ascii-field";
import { Marquee } from "@/components/motion/marquee";
import { AsciiButton } from "@/components/site/ascii-button";
import {
	gsap,
	onIntroDone,
	prefersReducedMotion,
	SplitText,
	useGSAP,
} from "@/lib/gsap";
import { stacksData } from "@/resources/stacks";

const stats = [
	{ value: 2024, label: "building since" },
	{ value: 6, label: "products shipped", suffix: "+" },
	{ value: 4, label: "orgs & teams" },
	{ value: 80, label: "tools in the belt", suffix: "+" },
];

const ticker = stacksData
	.flatMap((c) => c.items.map((i) => i.label))
	.slice(0, 28);

export default function HeroStage({ id }: { id: string }) {
	const root = useRef<HTMLElement>(null);

	useGSAP(
		(_, contextSafe) => {
			if (!contextSafe) return;
			const reduced = prefersReducedMotion();
			const split = SplitText.create("[data-hero-name]", {
				type: "chars",
				mask: "chars",
			});
			gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 24 });
			gsap.set("[data-hero-field]", { autoAlpha: 0 });
			gsap.set(split.chars, { yPercent: 115 });

			const off = onIntroDone(
				contextSafe(() => {
					const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
					tl.to("[data-hero-field]", {
						autoAlpha: 1,
						duration: 2,
						ease: "power2.out",
					})
						.to(
							split.chars,
							{ yPercent: 0, duration: 1.3, stagger: 0.035 },
							0.05,
						)
						.to(
							"[data-hero-fade]",
							{ autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08 },
							0.35,
						)
						.to(
							"[data-hero-role]",
							{
								duration: 1.4,
								scrambleText: {
									text: "full-stack developer · founder of jkt48connect",
									chars: "░▒▓<>/\\_",
									speed: 0.5,
								},
							},
							0.5,
						);
					root.current
						?.querySelectorAll<HTMLElement>("[data-count]")
						.forEach((el) => {
							const to = Number(el.dataset.count);
							const obj = { v: to > 1000 ? to - 40 : 0 };
							tl.to(
								obj,
								{
									v: to,
									duration: 1.8,
									ease: "power3.out",
									onUpdate: () => (el.textContent = String(Math.round(obj.v))),
								},
								0.6,
							);
						});
					if (reduced) tl.progress(1);
				}),
			);

			if (!reduced) {
				gsap.to("[data-hero-parallax]", {
					yPercent: -35,
					autoAlpha: 0.15,
					ease: "none",
					scrollTrigger: {
						trigger: root.current,
						start: "top top",
						end: "bottom top",
						scrub: true,
					},
				});
				gsap.to("[data-hero-field]", {
					scale: 1.18,
					ease: "none",
					scrollTrigger: {
						trigger: root.current,
						start: "top top",
						end: "bottom top",
						scrub: true,
					},
				});
			}
			return off;
		},
		{ scope: root },
	);

	return (
		<section
			ref={root}
			id={id}
			className="relative flex min-h-[calc(100svh-7.5rem)] w-full flex-col justify-between overflow-hidden rounded-2xl"
		>
			<div
				data-hero-field
				className="absolute inset-0 text-foreground/30 [mask-image:linear-gradient(105deg,transparent_18%,black_62%)] dark:text-foreground/20"
			>
				<AsciiField />
			</div>

			<div className="relative flex items-start justify-between gap-4 p-1 font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
				<span data-hero-fade>[ portfolio — edition 2026 ]</span>
				<span data-hero-fade className="hidden sm:inline">
					move your cursor ✦ the field reacts
				</span>
			</div>

			<div
				data-hero-parallax
				className="relative flex flex-col gap-6 px-1 py-10"
			>
				<p
					data-hero-fade
					className="m-0 flex items-center gap-2 font-mono text-[12px] text-muted-foreground uppercase tracking-widest"
				>
					<span className="inline-block size-2 animate-pulse bg-orange-500" />
					<span data-hero-role>hello, world</span>
				</p>
				<h1 className="m-0 flex flex-col font-normal font-pixel text-[clamp(48px,13.5vw,210px)] text-foreground leading-[0.86] tracking-tight">
					<span data-hero-name className="whitespace-nowrap">
						Valzy
					</span>
					<span
						data-hero-name
						className="whitespace-nowrap text-muted-foreground"
					>
						Nathaniel<span className="text-orange-500">.</span>
					</span>
				</h1>
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<p
						data-hero-fade
						className="m-0 max-w-md text-lg text-muted-foreground leading-relaxed"
					>
						I build fast, fan-first products on the edge — APIs, apps, bots,
						live streaming and payments for the JKT48 community. Designing in
						code, shipping solo since 2024.
					</p>
					<div data-hero-fade className="flex flex-wrap gap-2">
						<AsciiButton href="/projects" label="See the work" />
						<AsciiButton href="/contact" label="Say hi" variant="ghost" />
					</div>
				</div>
			</div>

			<div className="relative flex flex-col gap-4">
				<dl
					data-hero-fade
					className="m-0 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-foreground/10 bg-foreground/10 md:grid-cols-4"
				>
					{stats.map((s) => (
						<div
							key={s.label}
							className="flex flex-col gap-1 bg-accent/90 p-4 backdrop-blur-sm"
						>
							<dt className="order-2 font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
								{s.label}
							</dt>
							<dd className="order-1 m-0 font-pixel text-4xl text-foreground">
								<span data-count={s.value}>{s.value}</span>
								{s.suffix && (
									<span className="text-orange-500">{s.suffix}</span>
								)}
							</dd>
						</div>
					))}
				</dl>
				<div data-hero-fade className="border-foreground/10 border-y py-3">
					<Marquee duration={40}>
						{ticker.map((label) => (
							<span
								key={label}
								className="flex items-center gap-6 pr-6 font-mono text-muted-foreground text-sm uppercase tracking-widest"
							>
								{label}
								<span className="text-orange-500">✦</span>
							</span>
						))}
					</Marquee>
				</div>
			</div>
		</section>
	);
}
