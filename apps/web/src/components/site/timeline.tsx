"use client";

import { useRef } from "react";
import type { Experience } from "@/components/experience-block";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type Entry = Experience & { kind: "work" | "study" };

/** Vertical timeline whose spine draws itself as you scroll. */
export function Timeline({ entries }: { entries: Entry[] }) {
	const root = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (prefersReducedMotion()) return;
			gsap.fromTo(
				"[data-spine]",
				{ scaleY: 0 },
				{
					scaleY: 1,
					ease: "none",
					scrollTrigger: {
						trigger: root.current,
						start: "top 70%",
						end: "bottom 60%",
						scrub: true,
					},
				},
			);
			for (const item of gsap.utils.toArray<HTMLElement>("[data-entry]")) {
				gsap
					.timeline({
						scrollTrigger: { trigger: item, start: "top 80%", once: true },
					})
					.from(item.querySelector("[data-dot]"), {
						scale: 0,
						duration: 0.5,
						ease: "back.out(3)",
					})
					.from(
						item.querySelector("[data-card]"),
						{ x: 40, autoAlpha: 0, duration: 0.9, ease: "expo.out" },
						"<",
					);
			}
		},
		{ scope: root },
	);

	return (
		// Padding lives on a wrapper: Once UI's unlayered list reset overrides it on <ol>.
		<div ref={root} className="relative w-full pl-10">
			<span
				aria-hidden
				className="absolute top-2 bottom-2 left-[11px] w-px bg-foreground/10"
			/>
			<span
				aria-hidden
				data-spine
				className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-orange-500"
			/>
			<ol className="m-0 flex list-none flex-col gap-6 p-0">
				{entries.map((e) => (
					<li key={`${e.company}-${e.role}`} data-entry className="relative">
						<span
							data-dot
							aria-hidden
							className={`absolute top-6 -left-10 flex size-6 items-center justify-center rounded-full border font-mono text-[10px] ${
								e.kind === "work"
									? "border-orange-500 bg-orange-500 text-white"
									: "border-foreground/30 bg-accent text-muted-foreground"
							}`}
						>
							{e.kind === "work" ? "W" : "E"}
						</span>
						<article
							data-card
							className="group flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background/40 p-5 transition-colors duration-500 hover:border-orange-500/50 sm:flex-row sm:items-center"
						>
							{e.logo && (
								<img
									src={e.logo}
									alt=""
									className={`size-14 shrink-0 rounded-xl bg-foreground/5 object-cover ${e.invert ? "invert" : ""}`}
								/>
							)}
							<div className="flex min-w-0 flex-1 flex-col gap-1">
								<span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
									{e.startDate} → {e.endDate ?? "Now"} ·{" "}
									{e.kind === "work" ? "work" : "learning"}
								</span>
								<h3 className="m-0 font-medium text-2xl text-foreground">
									{e.company}
								</h3>
								<p className="m-0 text-muted-foreground">{e.role}</p>
							</div>
							{e.url && (
								<a
									href={e.url}
									target="_blank"
									rel="noopener noreferrer"
									className="ink w-fit font-mono text-foreground text-xs uppercase tracking-widest no-underline transition-colors hover:text-orange-500"
								>
									[ visit ↗ ]
								</a>
							)}
						</article>
					</li>
				))}
			</ol>
		</div>
	);
}
