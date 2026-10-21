"use client";

import { cn } from "@homepage/ui/lib/utils";
import { Column, Flex, StatusIndicator, Text } from "@once-ui-system/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ScrambleText } from "@/components/motion/scramble-link";
import { getDate } from "@/lib/get-date";
import { gsap, onIntroDone, useGSAP } from "@/lib/gsap";
import { pages } from "@/lib/site";

function isActive(pathname: string, href: string) {
	return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function SiteHeader() {
	const pathname = usePathname() ?? "/";
	const root = useRef<HTMLDivElement>(null);
	const menu = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);

	useGSAP(
		(_, contextSafe) => {
			if (!contextSafe) return;
			gsap.set("[data-header-item]", { autoAlpha: 0, y: -14 });
			return onIntroDone(
				contextSafe(() => {
					gsap.to("[data-header-item]", {
						autoAlpha: 1,
						y: 0,
						duration: 0.9,
						ease: "expo.out",
						stagger: 0.05,
					});
				}),
			);
		},
		{ scope: root },
	);

	useGSAP(
		() => {
			if (!menu.current) return;
			if (open) {
				gsap
					.timeline()
					.set(menu.current, { display: "flex" })
					.fromTo(
						menu.current,
						{ clipPath: "inset(0 0 100% 0)" },
						{ clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.inOut" },
					)
					.from(
						"[data-menu-link]",
						{ yPercent: 120, duration: 0.8, ease: "expo.out", stagger: 0.05 },
						"-=0.25",
					);
			} else {
				gsap.to(menu.current, {
					clipPath: "inset(0 0 100% 0)",
					duration: 0.5,
					ease: "expo.in",
					onComplete: () => {
						gsap.set(menu.current, { display: "none" });
					},
				});
			}
		},
		{ dependencies: [open], scope: menu },
	);

	useEffect(() => {
		if (pathname) setOpen(false);
	}, [pathname]);

	return (
		<Flex
			ref={root}
			vertical="end"
			fillWidth
			direction="row"
			horizontal="between"
			fitHeight
			className="font-pixel"
		>
			<Column vertical="center" horizontal="start">
				<Flex
					data-header-item
					direction="row"
					gap={1}
					vertical="center"
					horizontal="center"
				>
					<Text variant="label-default-l" className="text-muted-foreground">
						{getDate()}
					</Text>
					<Flex fit overflow="hidden" className="rounded-full">
						<StatusIndicator color="orange" className="rounded-full" size="m" />
					</Flex>
				</Flex>
				<Link href="/" data-header-item className="ink no-underline">
					<Text variant="display-default-s" className="text-foreground">
						Today
					</Text>
				</Link>
			</Column>

			<nav aria-label="Primary" className="hidden items-end gap-1 md:flex">
				{pages.map((page) => {
					const active = isActive(pathname, page.href);
					return (
						<Link
							key={page.href}
							href={page.href}
							data-header-item
							aria-current={active ? "page" : undefined}
							className="ink group flex min-h-11 items-center px-1.5 no-underline"
						>
							<span
								className={cn(
									"text-[15px] transition-colors",
									active
										? "text-foreground"
										: "text-muted-foreground group-hover:text-foreground",
								)}
							>
								<span
									className={cn(
										"text-orange-500 transition-opacity",
										active ? "opacity-100" : "opacity-0",
									)}
								>
									[
								</span>
								<ScrambleText text={page.label} />
								<span
									className={cn(
										"text-orange-500 transition-opacity",
										active ? "opacity-100" : "opacity-0",
									)}
								>
									]
								</span>
							</span>
						</Link>
					);
				})}
			</nav>

			<button
				type="button"
				data-header-item
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open}
				aria-controls="mobile-menu"
				className="relative z-[9001] flex min-h-11 cursor-pointer items-center gap-2 text-[15px] text-foreground md:hidden"
			>
				<span className="text-orange-500">{open ? "[x]" : "[≡]"}</span>
				{open ? "Close" : "Menu"}
			</button>

			<div
				ref={menu}
				id="mobile-menu"
				className="fixed inset-0 z-[9000] hidden flex-col justify-between bg-stone-950 p-6 pt-24 text-stone-100 md:hidden"
			>
				<ul className="m-0 flex list-none flex-col gap-1 p-0">
					{pages.map((page) => (
						<li key={page.href} className="overflow-hidden">
							<Link
								href={page.href}
								data-menu-link
								className="ink flex items-baseline gap-3 py-1 text-stone-100 no-underline"
							>
								<span className="font-mono text-orange-500 text-xs">
									{page.index}
								</span>
								<span className="text-5xl leading-tight">{page.label}</span>
							</Link>
						</li>
					))}
				</ul>
				<p className="m-0 font-mono text-stone-500 text-xs">
					valzy@jkt48connect:~${" "}
					<span className="animate-pulse text-orange-500">▋</span>
				</p>
			</div>
		</Flex>
	);
}
