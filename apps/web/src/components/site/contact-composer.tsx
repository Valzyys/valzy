"use client";

import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { socials } from "@/resources/socials";

const TOPICS = [
	"A project",
	"JKT48Connect API",
	"Collaboration",
	"Just saying hi",
];
const EMAIL = socials.email.replace("mailto:", "");

/** Builds a pre-filled email — no backend, no data stored. */
export function ContactComposer() {
	const [topic, setTopic] = useState(TOPICS[0]);
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	const submit = (e: FormEvent) => {
		e.preventDefault();
		const subject = `[${topic}] from ${name || "a visitor"}`;
		window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
	};

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(EMAIL);
			toast.success("Email copied to clipboard");
		} catch {
			toast.error(`Couldn't copy — it's ${EMAIL}`);
		}
	};

	return (
		<form
			onSubmit={submit}
			className="flex w-full flex-col gap-6 rounded-2xl border border-foreground/10 p-6 md:p-8"
		>
			<fieldset className="m-0 flex flex-col gap-3 border-none p-0">
				<legend className="mb-3 font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
					01 — I want to talk about
				</legend>
				<div className="flex flex-wrap gap-2">
					{TOPICS.map((t) => (
						<label
							key={t}
							className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
								topic === t
									? "border-orange-500 bg-orange-500 text-white"
									: "border-foreground/15 text-foreground hover:border-foreground/40"
							}`}
						>
							<input
								type="radio"
								name="topic"
								value={t}
								checked={topic === t}
								onChange={() => setTopic(t)}
								className="sr-only"
							/>
							{t}
						</label>
					))}
				</div>
			</fieldset>
			<label className="flex flex-col gap-2">
				<span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
					02 — My name is
				</span>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Your name"
					className="border-foreground/15 border-b bg-transparent py-2 text-2xl text-foreground outline-none transition-colors placeholder:text-foreground/25 focus:border-orange-500"
				/>
			</label>
			<label className="flex flex-col gap-2">
				<span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
					03 — And here's the idea
				</span>
				<textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					rows={4}
					data-lenis-prevent
					placeholder="Tell me a bit about it…"
					className="resize-none border-foreground/15 border-b bg-transparent py-2 text-foreground text-xl outline-none transition-colors placeholder:text-foreground/25 focus:border-orange-500"
				/>
			</label>
			<div className="flex flex-wrap items-center gap-3">
				<button
					type="submit"
					className="group relative inline-flex h-11 cursor-pointer items-center gap-2 overflow-hidden rounded-[8px] bg-stone-950 px-4 font-mono text-[13px] text-stone-50 uppercase tracking-wider dark:bg-stone-50 dark:text-stone-950"
				>
					<span
						aria-hidden
						className="absolute inset-0 origin-left scale-x-0 bg-orange-500 transition-transform duration-500 group-hover:scale-x-100"
					/>
					<span className="relative">[ open in mail → ]</span>
				</button>
				<button
					type="button"
					onClick={copy}
					className="cursor-pointer font-mono text-muted-foreground text-xs uppercase tracking-widest transition-colors hover:text-orange-500"
				>
					or copy {EMAIL}
				</button>
			</div>
		</form>
	);
}
