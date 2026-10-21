"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { useRef } from "react";
import { FigletSvg } from "@/components/ascii/figlet-svg";
import ImageTrail, { ImageTrailItem } from "@/components/image-trail";
import { Marquee } from "@/components/motion/marquee";
import { ScrambleText } from "@/components/motion/scramble-link";
import { SplitHeading } from "@/components/motion/split-heading";
import { AsciiButton } from "@/components/site/ascii-button";
import { LocalClock } from "@/components/site/local-clock";
import { Terminal } from "@/components/site/terminal";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { pages } from "@/lib/site";
import { images } from "@/resources/image-trail";
import { socials } from "@/resources/socials";

const elsewhere = [
	{ label: "GitHub", href: socials.github },
	{ label: "X / Twitter", href: socials.x },
	{ label: "Email", href: socials.email },
	{ label: "Docs API", href: "https://docs.jkt48connect.com" },
];

const colophon = [
	["Built with", "Next.js · Once UI · Tailwind"],
	["Motion", "GSAP · Lenis · Motion"],
	["UI bits", "shadcn · bklit · evilcharts · cult-ui · skiper-ui"],
	["Shipped on", "Vercel · GitHub · Supabase Cron"],
	["Analytics", "PostHog"],
];

const EMAIL = socials.email.replace("mailto:", "");

export default function SiteFooter() {
	const root = useRef<HTMLElement>(null);
	const lenis = useLenis();

	useGSAP(
		() => {
			if (prefersReducedMotion()) return;
			// Content rises into place and settles exactly when the page bottoms out.
			gsap.from("[data-footer-inner]", {
				y: 160,
				ease: "none",
				scrollTrigger: {
					trigger: root.current,
					start: "top bottom",
					end: "bottom bottom",
					scrub: true,
				},
			});
			gsap.from("[data-wordmark] [data-figlet-block]", {
				autoAlpha: 0,
				duration: 0.05,
				stagger: { each: 0.008, from: "random" },
				scrollTrigger: {
					trigger: "[data-wordmark]",
					start: "top 92%",
					once: true,
				},
			});
			gsap.from("[data-footer-col]", {
				y: 40,
				autoAlpha: 0,
				duration: 1,
				stagger: 0.1,
				ease: "expo.out",
				scrollTrigger: {
					trigger: "[data-footer-grid]",
					start: "top 85%",
					once: true,
				},
			});
		},
		{ scope: root },
	);

	return (
		<footer
			ref={root}
			className="relative w-full overflow-hidden rounded-3xl bg-stone-950 text-stone-300"
		>
			<div data-footer-inner className="flex flex-col">
				<div className="border-stone-800 border-b py-6">
					<Marquee duration={26}>
						{[
							"Let's build something",
							"Open for collabs",
							"Fan-first software",
							"Shipped from Indonesia",
						].map((t, i) => (
							<span
								key={t}
								className="flex items-center gap-8 pr-8 font-pixel text-[clamp(40px,7vw,104px)] uppercase leading-none"
							>
								<span
									className={
										i % 2
											? "text-transparent [-webkit-text-stroke:1px_rgb(168_162_158)]"
											: "text-stone-100"
									}
								>
									{t}
								</span>
								<span className="text-orange-500">✦</span>
							</span>
						))}
					</Marquee>
				</div>

				<div
					data-footer-grid
					className="grid grid-cols-1 gap-10 p-6 md:grid-cols-12 md:p-10"
				>
					<div data-footer-col className="flex flex-col gap-6 md:col-span-5">
						<span className="font-mono text-[11px] text-stone-500 uppercase tracking-widest">
							[ 06 — get in touch ]
						</span>
						<SplitHeading
							as="h2"
							className="m-0 font-medium text-4xl text-stone-100 leading-tight md:text-5xl"
						>
							Got an idea worth building? Let's make it real.
						</SplitHeading>
						<a
							href={socials.email}
							className="ink group w-fit text-stone-100 no-underline"
						>
							<ScrambleText
								text={EMAIL}
								className="font-mono text-lg md:text-xl"
							/>
							<span className="block h-px w-full origin-left scale-x-30 bg-orange-500 transition-transform duration-500 group-hover:scale-x-100" />
						</a>
						<div className="flex flex-wrap gap-2">
							<AsciiButton
								href="/contact"
								label="Start a project"
								className="bg-stone-100 text-stone-950"
							/>
							<AsciiButton
								href={socials.x}
								label="DM on X"
								variant="ghost"
								className="border-stone-700 bg-transparent text-stone-200"
							/>
						</div>
					</div>

					<div data-footer-col className="md:col-span-4">
						<Terminal />
					</div>

					<div
						data-footer-col
						className="grid grid-cols-2 gap-6 md:col-span-3 md:grid-cols-1"
					>
						<FooterList title="Index">
							{pages.map((p) => (
								<li key={p.href}>
									<Link
										href={p.href}
										className="ink group flex items-baseline gap-2 text-stone-300 no-underline hover:text-white"
									>
										<span className="font-mono text-[10px] text-stone-600 group-hover:text-orange-500">
											{p.index}
										</span>
										<ScrambleText text={p.label} />
									</Link>
								</li>
							))}
						</FooterList>
						<FooterList title="Elsewhere">
							{elsewhere.map((l) => (
								<li key={l.label}>
									<a
										href={l.href}
										target="_blank"
										rel="noopener noreferrer"
										className="ink group flex items-center gap-1 text-stone-300 no-underline hover:text-white"
									>
										<ScrambleText text={l.label} />
										<span className="text-stone-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-500">
											↗
										</span>
									</a>
								</li>
							))}
						</FooterList>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-x-10 gap-y-2 border-stone-800 border-t px-6 py-5 font-mono text-[11px] text-stone-500 sm:grid-cols-2 md:grid-cols-5 md:px-10">
					{colophon.map(([k, v]) => (
						<div key={k} className="flex flex-col">
							<span className="text-stone-600 uppercase tracking-widest">
								{k}
							</span>
							<span className="text-stone-400">{v}</span>
						</div>
					))}
				</div>

				<div
					data-wordmark
					className="relative cursor-crosshair select-none px-4 pt-6 md:px-10"
				>
					<ImageTrail
						threshold={60}
						keyframes={{ opacity: [0, 1, 1, 0], scale: [1, 1, 0] }}
						keyframesOptions={{
							opacity: { duration: 1, times: [0, 0.001, 0.9, 1] },
							scale: { duration: 1, times: [0, 0.8, 1] },
						}}
						style={{
							position: "absolute",
							inset: 0,
							zIndex: 9,
							backgroundColor: "transparent",
						}}
					>
						{images.map((url, index) => (
							<ImageTrailItem key={index + url}>
								<div className="relative h-full w-30 sm:w-38">
									<img src={url} alt="" className="object-cover" />
								</div>
							</ImageTrailItem>
						))}
					</ImageTrail>
					<FigletSvg word="VALZY" className="text-orange-500" />
				</div>

				<div className="flex flex-col gap-3 px-6 py-5 font-mono text-[11px] text-stone-500 uppercase tracking-widest md:flex-row md:items-center md:justify-between md:px-10">
					<span>
						© {new Date().getFullYear()} Valzy Nathaniel — handcrafted, never
						templated
					</span>
					<span className="flex items-center gap-2">
						<span className="inline-block size-1.5 animate-pulse rounded-full bg-emerald-500" />
						Jakarta, ID · <LocalClock className="text-stone-300" /> WIB
					</span>
					<button
						type="button"
						onClick={() =>
							lenis?.scrollTo(0, {
								duration: 2.2,
								easing: (t) => 1 - (1 - t) ** 4,
							})
						}
						className="group flex cursor-pointer items-center gap-2 uppercase tracking-widest transition-colors hover:text-orange-500"
					>
						Back to top
						<span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
							↑
						</span>
					</button>
				</div>
			</div>
		</footer>
	);
}

function FooterList({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-3">
			<span className="font-mono text-[11px] text-stone-500 uppercase tracking-widest">
				{title}
			</span>
			<ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[15px]">
				{children}
			</ul>
		</div>
	);
}
