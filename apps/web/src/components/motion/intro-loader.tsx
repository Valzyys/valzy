"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { FigletSvg } from "@/components/ascii/figlet-svg";
import { AnimeChibi } from "@/components/motion/anime-chibi";
import { gsap, markIntroDone, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const STORAGE_KEY = "valzy-intro-seen";
const BAR = 28;

// Deterministic so server and client render the same speed lines.
const SPEED_LINES = Array.from({ length: 72 }, (_, i) => {
	const angle = (i / 72) * Math.PI * 2;
	const jitter = ((i * 37) % 11) / 11;
	const inner = 260 + jitter * 160;
	return {
		x1: 500 + Math.cos(angle) * inner,
		y1: 500 + Math.sin(angle) * inner,
		x2: 500 + Math.cos(angle) * 760,
		y2: 500 + Math.sin(angle) * 760,
		w: 1 + ((i * 13) % 5),
	};
});

function hasSeenIntro() {
	try {
		return sessionStorage.getItem(STORAGE_KEY) === "1";
	} catch {
		return false;
	}
}

/**
 * Anime-style boot sequence shown once per session: the mascot codes, hits a
 * bug, fixes it, celebrates, then an "episode" title card wipes away. An
 * inline script in the root layout adds `intro-seen` to <html> before paint
 * on repeat visits so the overlay never flashes.
 */
export function IntroLoader() {
	const root = useRef<HTMLDivElement>(null);
	const counter = useRef<HTMLSpanElement>(null);
	const bar = useRef<HTMLSpanElement>(null);
	const timeline = useRef<gsap.core.Timeline | null>(null);
	const [done, setDone] = useState(false);
	const lenis = useLenis();

	useEffect(() => {
		if (!done) lenis?.stop();
		else lenis?.start();
	}, [done, lenis]);

	useGSAP(
		() => {
			if (hasSeenIntro() || prefersReducedMotion()) {
				setDone(true);
				markIntroDone();
				return;
			}

			const q = gsap.utils.selector(root);
			const say = (text: string) =>
				gsap.to(q("[data-intro-status]"), {
					duration: 0.5,
					scrambleText: { text, chars: "░▒▓<>/" },
				});

			// GSAP needs explicit origins for SVG parts.
			gsap.set(q("[data-chibi]"), { transformOrigin: "50% 100%" });
			gsap.set(q("[data-chibi-head]"), { transformOrigin: "50% 90%" });
			gsap.set(q("[data-chibi-ahoge]"), { transformOrigin: "30% 100%" });
			gsap.set(q("[data-chibi-wave]"), { transformOrigin: "0% 100%" });
			gsap.set(q("[data-chibi-bang]"), { transformOrigin: "50% 100%" });
			gsap.set(q("[data-chibi-eye], [data-chibi-sparkle]"), {
				transformOrigin: "50% 50%",
			});

			// Idle loops — they keep running underneath the main timeline.
			gsap.to(q("[data-speedlines]"), {
				rotate: 360,
				duration: 60,
				ease: "none",
				repeat: -1,
				transformOrigin: "50% 50%",
			});
			const typing = gsap
				.timeline({ repeat: -1 })
				.to(q("[data-chibi-arm-l]"), {
					y: -4,
					duration: 0.09,
					yoyo: true,
					repeat: 1,
				})
				.to(q("[data-chibi-arm-r]"), {
					y: -4,
					duration: 0.09,
					yoyo: true,
					repeat: 1,
				});
			const keys = gsap.to(q("[data-chibi-key]"), {
				fill: "#f97316",
				duration: 0.08,
				stagger: { each: 0.05, from: "random", repeat: -1, yoyo: true },
			});
			const bob = gsap.to(q("[data-chibi-head]"), {
				rotate: 2.5,
				y: 1.5,
				duration: 0.45,
				yoyo: true,
				repeat: -1,
				ease: "sine.inOut",
			});
			gsap.to(q("[data-chibi-ahoge]"), {
				rotate: 14,
				duration: 0.5,
				yoyo: true,
				repeat: -1,
				ease: "sine.inOut",
			});
			gsap
				.timeline({ repeat: -1, repeatDelay: 2.1 })
				.to(q("[data-chibi-eye]"), {
					scaleY: 0.08,
					duration: 0.07,
					yoyo: true,
					repeat: 1,
				});
			gsap.to(q("[data-chibi-holo]"), {
				y: -5,
				duration: 1.4,
				yoyo: true,
				repeat: -1,
				ease: "sine.inOut",
			});
			gsap.set(q("[data-chibi-code]"), { scaleX: 0 });
			gsap.set(q("[data-chibi-sparkle]"), { scale: 0 });

			const progress = { value: 0 };
			const tl = gsap.timeline({
				defaults: { ease: "expo.out" },
				onComplete: () => {
					try {
						sessionStorage.setItem(STORAGE_KEY, "1");
					} catch {}
					setDone(true);
				},
			});
			timeline.current = tl;

			tl.addLabel("enter")
				.from(q("[data-intro-chrome]"), {
					autoAlpha: 0,
					y: 12,
					duration: 0.6,
					stagger: 0.08,
				})
				.from(
					q("[data-speedlines]"),
					{ autoAlpha: 0, scale: 1.4, duration: 1.2 },
					"<",
				)
				.from(
					q("[data-chibi]"),
					{
						scale: 0.4,
						y: 60,
						autoAlpha: 0,
						duration: 0.9,
						ease: "back.out(2)",
					},
					"<0.1",
				)
				.from(
					q("[data-chibi-holo], [data-chibi-keyboard]"),
					{ autoAlpha: 0, y: 20, duration: 0.6, stagger: 0.1 },
					"<0.3",
				)
				.add(say("> coding the portfolio…"), "<")
				.to(
					progress,
					{
						value: 100,
						duration: 3.4,
						ease: "power1.inOut",
						onUpdate: () => {
							const v = Math.round(progress.value);
							if (counter.current)
								counter.current.textContent = String(v).padStart(3, "0");
							if (bar.current) {
								const filled = Math.round((v / 100) * BAR);
								bar.current.textContent = `${"█".repeat(filled)}${"░".repeat(BAR - filled)}`;
							}
						},
					},
					"enter+=0.6",
				)
				.to(
					q("[data-chibi-code]"),
					{ scaleX: 1, duration: 0.35, stagger: 0.18, ease: "power2.out" },
					"<",
				)

				// Oh no — a bug.
				.addLabel("bug", "enter+=1.9")
				.add(() => {
					typing.pause();
					keys.pause();
				}, "bug")
				.add(say("> wait… bug?! ∑(°□°)"), "bug")
				.to(
					q("[data-chibi-eyes], [data-chibi-mouth-idle]"),
					{ autoAlpha: 0, duration: 0.05 },
					"bug",
				)
				.to(
					q("[data-chibi-shock], [data-chibi-mouth-shock]"),
					{ autoAlpha: 1, duration: 0.05 },
					"bug",
				)
				.fromTo(
					q("[data-chibi-bang]"),
					{ autoAlpha: 0, scale: 0.2 },
					{ autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(3)" },
					"bug",
				)
				.to(
					q("[data-chibi]"),
					{ y: -10, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" },
					"bug",
				)
				.to(
					q("[data-chibi-holo-frame]"),
					{
						stroke: "#f43f5e",
						fill: "#f43f5e",
						duration: 0.1,
						yoyo: true,
						repeat: 3,
					},
					"bug",
				)
				.to(
					q("[data-chibi-error]"),
					{ opacity: 1, duration: 0.1, yoyo: true, repeat: 3 },
					"bug",
				)
				.fromTo(
					q("[data-chibi-sweat]"),
					{ opacity: 0, y: -6 },
					{ opacity: 1, y: 8, duration: 0.8, ease: "power1.in" },
					"bug+=0.2",
				)
				.to(
					q("[data-speedlines] line"),
					{ stroke: "#7f1d1d", duration: 0.2 },
					"bug",
				)

				// Fixing it, faster.
				.addLabel("fix", "bug+=0.9")
				.add(say("> fixing it (ง •̀_•́)ง"), "fix")
				.to(
					q("[data-chibi-bang], [data-chibi-sweat]"),
					{ autoAlpha: 0, duration: 0.2 },
					"fix",
				)
				.to(
					q("[data-chibi-shock], [data-chibi-mouth-shock]"),
					{ autoAlpha: 0, duration: 0.05 },
					"fix",
				)
				.to(
					q("[data-chibi-eyes], [data-chibi-mouth-idle]"),
					{ autoAlpha: 1, duration: 0.05 },
					"fix",
				)
				.to(
					q("[data-speedlines] line"),
					{ stroke: "#292524", duration: 0.3 },
					"fix",
				)
				.add(() => {
					typing.timeScale(2.4).play();
					keys.timeScale(2).play();
					bob.timeScale(2);
				}, "fix")

				// Yatta!
				.addLabel("yatta", "enter+=4.05")
				.add(() => {
					typing.pause();
					keys.pause();
					bob.pause();
				}, "yatta")
				.add(say("> yatta! ٩(◕‿◕)۶"), "yatta")
				.to(
					q("[data-chibi-typing], [data-chibi-eyes], [data-chibi-mouth-idle]"),
					{ autoAlpha: 0, duration: 0.05 },
					"yatta",
				)
				.to(
					q("[data-chibi-wave], [data-chibi-happy], [data-chibi-mouth-happy]"),
					{ autoAlpha: 1, duration: 0.05 },
					"yatta",
				)
				.to(
					q("[data-chibi-holo], [data-chibi-keyboard]"),
					{ autoAlpha: 0, y: 24, duration: 0.4, ease: "power2.in" },
					"yatta",
				)
				.to(
					q("[data-chibi]"),
					{ scaleY: 0.88, scaleX: 1.08, duration: 0.1, ease: "power2.in" },
					"yatta",
				)
				.to(q("[data-chibi]"), {
					y: -36,
					scaleY: 1.06,
					scaleX: 0.96,
					duration: 0.3,
					ease: "power2.out",
				})
				.to(q("[data-chibi]"), {
					y: 0,
					scaleY: 1,
					scaleX: 1,
					duration: 0.45,
					ease: "bounce.out",
				})
				.fromTo(
					q("[data-chibi-wave]"),
					{ rotate: -12 },
					{
						rotate: 16,
						duration: 0.18,
						yoyo: true,
						repeat: 5,
						ease: "sine.inOut",
					},
					"yatta+=0.1",
				)
				.to(
					q("[data-chibi-sparkle]"),
					{
						scale: 1,
						rotate: 90,
						duration: 0.5,
						stagger: 0.06,
						ease: "back.out(3)",
					},
					"yatta+=0.15",
				)
				.to(
					q("[data-chibi-sparkle]"),
					{ scale: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" },
					"yatta+=0.95",
				)
				.fromTo(
					q("[data-intro-bubble]"),
					{ autoAlpha: 0, scale: 0.3, rotate: -8 },
					{
						autoAlpha: 1,
						scale: 1,
						rotate: -3,
						duration: 0.6,
						ease: "back.out(2.5)",
					},
					"yatta+=0.2",
				)
				.to(
					q("[data-speedlines] line"),
					{ stroke: "#57534e", duration: 0.15, yoyo: true, repeat: 1 },
					"yatta",
				)

				// Anime episode title card.
				.addLabel("title", "yatta+=1.6")
				.to(
					q("[data-intro-scene]"),
					{
						autoAlpha: 0,
						scale: 0.92,
						filter: "blur(6px)",
						duration: 0.35,
						ease: "power2.in",
					},
					"title",
				)
				.set(q("[data-intro-title]"), { autoAlpha: 1 }, "title+=0.3")
				.from(
					q("[data-intro-title] [data-figlet-block]"),
					{
						autoAlpha: 0,
						duration: 0.04,
						stagger: { each: 0.003, from: "random" },
					},
					"title+=0.3",
				)
				.from(
					q("[data-intro-title-line]"),
					{ autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.1 },
					"title+=0.45",
				)
				.to(
					q("[data-intro-title]"),
					{ autoAlpha: 0, duration: 0.3, ease: "power2.in" },
					"title+=1.55",
				)
				.add(() => markIntroDone(), "title+=1.75")
				.to(
					q("[data-intro-panel]"),
					{
						yPercent: -100,
						duration: 1.05,
						ease: "expo.inOut",
						stagger: { each: 0.06, from: "center" },
					},
					"title+=1.7",
				);
		},
		{ scope: root },
	);

	const skip = () => timeline.current?.progress(1);

	if (done) return null;

	return (
		<div
			ref={root}
			data-intro
			className="fixed inset-0 z-[20000] overflow-hidden text-stone-300"
			aria-label="Loading"
			role="status"
		>
			<div className="absolute inset-0 flex">
				{Array.from({ length: 5 }, (_, i) => (
					<div
						key={i}
						data-intro-panel
						className="h-full flex-1 bg-stone-950"
						style={{ marginLeft: i ? -1 : 0 }}
					/>
				))}
			</div>

			<div data-intro-content className="absolute inset-0">
				<svg
					data-speedlines
					viewBox="0 0 1000 1000"
					preserveAspectRatio="xMidYMid slice"
					className="absolute inset-0 size-full"
					aria-hidden="true"
				>
					{SPEED_LINES.map((l) => (
						<line
							key={`${l.x1}-${l.y1}`}
							x1={l.x1}
							y1={l.y1}
							x2={l.x2}
							y2={l.y2}
							stroke="#292524"
							strokeWidth={l.w}
						/>
					))}
				</svg>
				<div
					aria-hidden
					className="absolute inset-0 bg-[length:7px_7px] bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1.6px)] [mask-image:radial-gradient(circle_at_center,transparent_25%,black_80%)]"
				/>

				<div className="relative flex h-full flex-col justify-between p-5 font-mono text-[11px] uppercase tracking-widest md:p-8">
					<div className="flex items-start justify-between gap-4">
						<span data-intro-chrome>valzy.sys — v26.10</span>
						<span
							data-intro-chrome
							className="hidden text-orange-500 sm:inline"
						>
							第01話 · episode 01
						</span>
						<button
							type="button"
							data-intro-chrome
							onClick={skip}
							className="cursor-pointer border border-stone-700 px-2 py-1 uppercase transition-colors hover:border-orange-500 hover:text-orange-500"
						>
							[ skip ]
						</button>
					</div>

					<div
						data-intro-scene
						className="relative mx-auto flex w-full max-w-[560px] flex-col items-center gap-4"
					>
						<div className="relative w-[min(86vw,520px)]">
							<AnimeChibi />
							<div
								data-intro-bubble
								className="invisible absolute top-[-6%] left-[2%] rounded-[22px] border-2 border-stone-950 bg-white px-4 py-2 text-stone-950 normal-case tracking-normal shadow-[4px_4px_0_#f97316]"
							>
								<span className="block font-bold font-pixel text-xl leading-tight md:text-2xl">
									ようこそ！
								</span>
								<span className="block text-[11px] md:text-xs">
									welcome to valzy's world~
								</span>
								<span
									aria-hidden
									className="absolute -bottom-[10px] left-10 size-4 rotate-45 border-stone-950 border-r-2 border-b-2 bg-white"
								/>
							</div>
						</div>
						<p
							data-intro-chrome
							className="m-0 text-stone-400 normal-case tracking-normal"
						>
							<span data-intro-status>&nbsp;</span>
						</p>
					</div>

					<div className="flex items-end justify-between gap-4">
						<div data-intro-chrome className="flex flex-col gap-2">
							<span className="text-stone-500">ローディング中 — loading</span>
							<span ref={bar} className="text-orange-500 tracking-normal">
								{"░".repeat(BAR)}
							</span>
						</div>
						<span
							data-intro-chrome
							className="font-pixel text-[clamp(56px,12vw,160px)] text-stone-100 leading-none tracking-tight"
						>
							<span ref={counter}>000</span>
							<span className="text-orange-500">%</span>
						</span>
					</div>
				</div>

				<div
					data-intro-title
					className="invisible absolute inset-0 flex flex-col items-center justify-center gap-6 bg-stone-950 px-6"
				>
					<span
						data-intro-title-line
						className="font-mono text-[11px] text-orange-500 uppercase tracking-[0.4em]"
					>
						第一話 · episode 01
					</span>
					<FigletSvg
						word="VALZY"
						className="w-[min(84vw,640px)] text-orange-500"
					/>
					<span
						data-intro-title-line
						className="font-pixel text-2xl text-stone-100 md:text-3xl"
					>
						「はじまり」 — the beginning
					</span>
				</div>
			</div>
		</div>
	);
}
