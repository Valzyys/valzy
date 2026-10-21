"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-GB", {
	timeZone: "Asia/Jakarta",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
});

export function LocalClock({ className }: { className?: string }) {
	const [now, setNow] = useState<string | null>(null);

	useEffect(() => {
		const tick = () => setNow(format.format(new Date()));
		tick();
		const id = window.setInterval(tick, 1000);
		return () => window.clearInterval(id);
	}, []);

	return (
		<time className={className} suppressHydrationWarning>
			{now ?? "--:--:--"}
		</time>
	);
}
