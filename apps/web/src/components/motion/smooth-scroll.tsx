"use client";

import { type LenisRef, ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function ScrollTriggerSync() {
	useLenis(() => ScrollTrigger.update());
	const lenis = useLenis();
	const pathname = usePathname();

	useEffect(() => {
		if (!pathname) return;
		lenis?.scrollTo(0, { immediate: true, force: true });
		const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
		return () => window.clearTimeout(id);
	}, [pathname, lenis]);

	return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
	const lenisRef = useRef<LenisRef>(null);

	useEffect(() => {
		function update(time: number) {
			lenisRef.current?.lenis?.raf(time * 1000);
		}
		gsap.ticker.add(update);
		gsap.ticker.lagSmoothing(0);
		return () => gsap.ticker.remove(update);
	}, []);

	return (
		<ReactLenis
			root
			ref={lenisRef}
			options={{ autoRaf: false, lerp: 0.085, wheelMultiplier: 0.95 }}
		>
			<ScrollTriggerSync />
			{children}
		</ReactLenis>
	);
}
