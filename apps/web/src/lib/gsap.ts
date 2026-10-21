"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
	gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin);
}

export const ASCII_CHARS = "!<>-_\\/[]{}—=+*^?#░▒▓";

export function prefersReducedMotion() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Fired once the intro loader has finished (or was skipped). */
export const INTRO_DONE_EVENT = "valzy:intro-done";

export function isIntroDone() {
	if (typeof window === "undefined") return false;
	return Boolean(
		(window as unknown as { __valzyIntroDone?: boolean }).__valzyIntroDone,
	);
}

export function markIntroDone() {
	if (isIntroDone()) return;
	(window as unknown as { __valzyIntroDone?: boolean }).__valzyIntroDone = true;
	// Dispatch outside any running GSAP callback so listeners aren't scoped to its context.
	window.setTimeout(() => window.dispatchEvent(new Event(INTRO_DONE_EVENT)), 0);
}

/** Runs `cb` right away if the intro is finished, otherwise once it finishes. */
export function onIntroDone(cb: () => void) {
	if (isIntroDone()) {
		cb();
		return () => {};
	}
	window.addEventListener(INTRO_DONE_EVENT, cb, { once: true });
	return () => window.removeEventListener(INTRO_DONE_EVENT, cb);
}

export { gsap, ScrambleTextPlugin, ScrollTrigger, SplitText, useGSAP };
