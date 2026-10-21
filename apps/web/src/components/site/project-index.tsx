"use client";

import type { Route } from "next";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Projects } from "@/components/projects-block";
import { gsap, useGSAP } from "@/lib/gsap";
import { slugify } from "@/lib/site";

/** Big numbered project list with a cursor-following preview image. */
export function ProjectIndex({ projects }: { projects: Projects[] }) {
	const root = useRef<HTMLDivElement>(null);
	const preview = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState<number | null>(null);
	const moveX = useRef<gsap.QuickToFunc | null>(null);
	const moveY = useRef<gsap.QuickToFunc | null>(null);

	const { contextSafe } = useGSAP(
		() => {
			moveX.current = gsap.quickTo(preview.current, "x", {
				duration: 0.6,
				ease: "power3",
			});
			moveY.current = gsap.quickTo(preview.current, "y", {
				duration: 0.6,
				ease: "power3",
			});
			gsap.from("[data-project-row]", {
				y: 60,
				autoAlpha: 0,
				duration: 1.1,
				ease: "expo.out",
				stagger: 0.08,
				scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
			});
		},
		{ scope: root },
	);

	const show = contextSafe((index: number | null) => {
		setActive(index);
		gsap.to(preview.current, {
			autoAlpha: index === null ? 0 : 1,
			scale: index === null ? 0.85 : 1,
			duration: 0.4,
			ease: "power3.out",
		});
	});

	const onMove = (e: React.PointerEvent) => {
		const rect = root.current?.getBoundingClientRect();
		if (!rect) return;
		moveX.current?.(e.clientX - rect.left + 24);
		moveY.current?.(e.clientY - rect.top - 90);
	};

	return (
		<div
			ref={root}
			className="relative w-full"
			onPointerMove={onMove}
			onPointerLeave={() => show(null)}
		>
			<div
				ref={preview}
				aria-hidden
				className="pointer-events-none invisible absolute top-0 left-0 z-20 hidden h-44 w-64 overflow-hidden rounded-xl border border-foreground/10 bg-stone-950 opacity-0 shadow-2xl md:block"
			>
				{projects.map((p, i) => (
					<img
						key={p.title}
						src={p.imageUrl}
						alt=""
						className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"} ${p.invert ? "invert" : ""}`}
					/>
				))}
				<span className="absolute bottom-2 left-2 font-mono text-[10px] text-white uppercase tracking-widest mix-blend-difference">
					view case ↗
				</span>
			</div>

			<ul className="m-0 flex list-none flex-col p-0">
				{projects.map((p, i) => (
					<li
						key={p.title}
						data-project-row
						className="border-foreground/10 border-b first:border-t"
					>
						<Link
							href={`/projects/${slugify(p.title)}` as Route}
							onPointerEnter={() => show(i)}
							onFocus={() => show(i)}
							onBlur={() => show(null)}
							className="ink group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-2 py-6 text-foreground no-underline md:grid-cols-[3rem_1fr_14rem_5rem]"
						>
							<span className="font-mono text-orange-500 text-xs">
								{String(i + 1).padStart(2, "0")}
							</span>
							<span className="font-medium text-3xl leading-tight transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:translate-x-3 md:text-5xl">
								{p.title}
							</span>
							<span className="col-start-2 flex flex-wrap gap-1.5 md:col-start-3 md:row-start-1">
								{p.tags?.map((t) => (
									<span
										key={t}
										className="rounded-full border border-foreground/15 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground uppercase"
									>
										{t}
									</span>
								))}
							</span>
							<span className="col-start-3 row-start-1 text-right font-mono text-muted-foreground text-sm md:col-start-4">
								{p.date.getFullYear()}
								<span className="ml-2 inline-block text-foreground transition-transform duration-500 group-hover:-rotate-45 group-hover:text-orange-500">
									→
								</span>
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
