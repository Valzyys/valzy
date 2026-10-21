import { cn } from "@homepage/ui/lib/utils";

const HAIR = "#2b2540";
const SKIN = "#ffe4d6";
const HOODIE = "#f97316";
const HOODIE_DARK = "#c2410c";
const INK = "#1e1033";

const KEYS = Array.from({ length: 3 }, (_, row) =>
	Array.from({ length: 11 - row }, (_, col) => ({
		x: 70 + row * 5 + col * 9.6,
		y: 226 + row * 6,
	})),
).flat();

const CODE_LINES = [36, 52, 28, 60, 44, 22, 50];

function Eye({ cx, cy }: { cx: number; cy: number }) {
	return (
		<g data-chibi-eye>
			<ellipse cx={cx} cy={cy} rx={12} ry={14} fill="#fff" />
			<ellipse cx={cx} cy={cy + 1} rx={10} ry={12.5} fill="url(#chibi-iris)" />
			<ellipse cx={cx} cy={cy + 2} rx={5} ry={6} fill={INK} />
			<circle cx={cx + 3.5} cy={cy - 5} r={3.6} fill="#fff" />
			<circle cx={cx - 4} cy={cy + 5.5} r={1.7} fill="#fff" />
			<path
				d={`M${cx - 14} ${cy - 7} Q${cx} ${cy - 19} ${cx + 14} ${cy - 7}`}
				stroke={INK}
				strokeWidth={3.6}
				strokeLinecap="round"
				fill="none"
			/>
		</g>
	);
}

function Sparkle({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
	return (
		<path
			data-chibi-sparkle
			d={`M${x} ${y - 9 * s} Q${x + 1.5 * s} ${y - 1.5 * s} ${x + 9 * s} ${y} Q${x + 1.5 * s} ${y + 1.5 * s} ${x} ${y + 9 * s} Q${x - 1.5 * s} ${y + 1.5 * s} ${x - 9 * s} ${y} Q${x - 1.5 * s} ${y - 1.5 * s} ${x} ${y - 9 * s}Z`}
			fill="#fde68a"
		/>
	);
}

/**
 * An original chibi mascot drawn in SVG. Every moving part carries a
 * `data-chibi-*` attribute so the intro timeline can puppet it.
 */
export function AnimeChibi({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 320 260"
			className={cn("block h-auto w-full overflow-visible", className)}
			aria-hidden="true"
		>
			<defs>
				<linearGradient id="chibi-iris" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#3b2a6b" />
					<stop offset="0.65" stopColor="#7c3aed" />
					<stop offset="1" stopColor="#fb923c" />
				</linearGradient>
				<radialGradient id="chibi-glow" cx="0.5" cy="0.5" r="0.5">
					<stop offset="0" stopColor={HOODIE} stopOpacity="0.35" />
					<stop offset="1" stopColor={HOODIE} stopOpacity="0" />
				</radialGradient>
			</defs>

			<ellipse cx={140} cy={150} rx={130} ry={110} fill="url(#chibi-glow)" />

			{/* Holographic screen she is coding on */}
			<g data-chibi-holo>
				<rect
					data-chibi-holo-frame
					x={232}
					y={92}
					width={82}
					height={84}
					rx={7}
					fill={HOODIE}
					fillOpacity={0.08}
					stroke={HOODIE}
					strokeOpacity={0.75}
				/>
				<circle cx={240} cy={100} r={2} fill={HOODIE} />
				<circle cx={247} cy={100} r={2} fill="#78716c" />
				<circle cx={254} cy={100} r={2} fill="#78716c" />
				{CODE_LINES.map((w, i) => (
					<rect
						key={`${w}-${i}`}
						data-chibi-code
						x={240 + (i % 3 === 1 ? 6 : 0)}
						y={110 + i * 9}
						width={w}
						height={4}
						rx={2}
						fill={i % 2 ? "#a8a29e" : HOODIE}
					/>
				))}
				<text
					data-chibi-error
					x={273}
					y={142}
					textAnchor="middle"
					fontSize={22}
					fontWeight={700}
					fill="#f43f5e"
					opacity={0}
				>
					ERR
				</text>
			</g>

			{/* Character (offset so she sits left of the screen) */}
			<g data-chibi>
				<g transform="translate(20 0)">
					{/* Back hair */}
					<ellipse cx={120} cy={112} rx={62} ry={60} fill={HAIR} />
					<path
						d="M58 112 C54 150 58 178 70 192 C78 170 74 140 72 118Z"
						fill={HAIR}
					/>
					<path
						d="M182 112 C186 150 182 178 170 192 C162 170 166 140 168 118Z"
						fill={HAIR}
					/>

					{/* Body */}
					<path
						d="M68 236 C68 192 88 172 120 172 C152 172 172 192 172 236Z"
						fill={HOODIE}
					/>
					<path
						d="M96 176 Q120 196 144 176"
						stroke={HOODIE_DARK}
						strokeWidth={5}
						fill="none"
						strokeLinecap="round"
					/>
					<path
						d="M112 184 L110 202 M128 184 L130 202"
						stroke="#fff"
						strokeWidth={2.4}
						strokeLinecap="round"
					/>
					<rect x={110} y={160} width={20} height={16} rx={4} fill="#f5c9b8" />

					{/* Head */}
					<g data-chibi-head>
						<path
							d="M68 112 C68 150 95 170 120 170 C145 170 172 150 172 112 C172 80 150 70 120 70 C90 70 68 80 68 112Z"
							fill={SKIN}
						/>
						<g data-chibi-eyes>
							<Eye cx={98} cy={130} />
							<Eye cx={142} cy={130} />
						</g>
						<g
							data-chibi-happy
							opacity={0}
							stroke={INK}
							strokeWidth={4}
							strokeLinecap="round"
							fill="none"
						>
							<path d="M86 132 Q98 118 110 132" />
							<path d="M130 132 Q142 118 154 132" />
						</g>
						<g
							data-chibi-shock
							opacity={0}
							stroke={INK}
							strokeWidth={3.5}
							strokeLinecap="round"
						>
							<circle cx={98} cy={130} r={9} fill="#fff" />
							<circle cx={142} cy={130} r={9} fill="#fff" />
							<circle cx={98} cy={130} r={2.5} fill={INK} stroke="none" />
							<circle cx={142} cy={130} r={2.5} fill={INK} stroke="none" />
						</g>
						<ellipse
							data-chibi-blush
							cx={86}
							cy={149}
							rx={8}
							ry={4}
							fill="#fb7185"
							opacity={0.45}
						/>
						<ellipse
							data-chibi-blush
							cx={154}
							cy={149}
							rx={8}
							ry={4}
							fill="#fb7185"
							opacity={0.45}
						/>
						<path
							data-chibi-mouth-idle
							d="M112 152 q4 5 8 0 q4 5 8 0"
							stroke={INK}
							strokeWidth={2.4}
							strokeLinecap="round"
							fill="none"
						/>
						<path
							data-chibi-mouth-shock
							d="M120 149 a5 6 0 1 0 0.1 0Z"
							fill={INK}
							opacity={0}
						/>
						<g data-chibi-mouth-happy opacity={0}>
							<path
								d="M108 149 Q120 150 132 149 Q130 166 120 166 Q110 166 108 149Z"
								fill={INK}
							/>
							<path
								d="M113 160 Q120 154 127 160 Q124 165 120 165 Q116 165 113 160Z"
								fill="#fb7185"
							/>
						</g>

						{/* Bangs + ahoge */}
						<path
							d="M60 118 C58 62 182 62 180 118 L172 104 L166 122 L156 96 L146 118 L136 92 L124 116 L114 90 L104 118 L94 96 L84 120 L76 102Z"
							fill={HAIR}
						/>
						<path
							d="M84 76 Q120 58 156 76"
							stroke="#fff"
							strokeOpacity={0.22}
							strokeWidth={3}
							fill="none"
							strokeLinecap="round"
						/>
						<path
							data-chibi-ahoge
							d="M118 68 C110 50 124 34 138 28 C128 40 124 52 125 68Z"
							fill={HAIR}
						/>

						{/* Headphones */}
						<path
							d="M64 116 C62 46 178 46 176 116"
							stroke="#e7e5e4"
							strokeWidth={7}
							fill="none"
							strokeLinecap="round"
						/>
						<rect x={55} y={104} width={17} height={30} rx={8} fill="#1c1917" />
						<rect x={59} y={110} width={9} height={18} rx={4.5} fill={HOODIE} />
						<rect
							x={168}
							y={104}
							width={17}
							height={30}
							rx={8}
							fill="#1c1917"
						/>
						<rect
							x={172}
							y={110}
							width={9}
							height={18}
							rx={4.5}
							fill={HOODIE}
						/>
					</g>

					{/* Typing arms */}
					<g data-chibi-typing>
						<g data-chibi-arm-l>
							<path
								d="M82 188 Q74 212 98 222"
								stroke={HOODIE_DARK}
								strokeWidth={18}
								strokeLinecap="round"
								fill="none"
							/>
							<path
								d="M82 188 Q74 212 98 222"
								stroke={HOODIE}
								strokeWidth={13}
								strokeLinecap="round"
								fill="none"
							/>
							<circle
								cx={101}
								cy={222}
								r={6.5}
								fill={SKIN}
								stroke="#f5c9b8"
								strokeWidth={1.5}
							/>
						</g>
						<g data-chibi-arm-r>
							<path
								d="M158 188 Q166 212 142 222"
								stroke={HOODIE_DARK}
								strokeWidth={18}
								strokeLinecap="round"
								fill="none"
							/>
							<path
								d="M158 188 Q166 212 142 222"
								stroke={HOODIE}
								strokeWidth={13}
								strokeLinecap="round"
								fill="none"
							/>
							<circle
								cx={139}
								cy={222}
								r={6.5}
								fill={SKIN}
								stroke="#f5c9b8"
								strokeWidth={1.5}
							/>
						</g>
					</g>

					{/* Waving arm (hidden until she's done) */}
					<g data-chibi-wave opacity={0}>
						<path
							d="M156 190 Q178 172 184 142"
							stroke={HOODIE_DARK}
							strokeWidth={18}
							strokeLinecap="round"
							fill="none"
						/>
						<path
							d="M156 190 Q178 172 184 142"
							stroke={HOODIE}
							strokeWidth={13}
							strokeLinecap="round"
							fill="none"
						/>
						<circle cx={185} cy={135} r={7.5} fill={SKIN} />
						<path
							d="M196 122 q6 4 6 12 M202 116 q9 6 9 18"
							stroke="#fde68a"
							strokeWidth={2.2}
							strokeLinecap="round"
							fill="none"
						/>
					</g>

					{/* Emotes */}
					<g data-chibi-bang opacity={0}>
						<path
							d="M176 30 l14 -18 l6 20 l18 -4 l-10 16 l14 10 l-20 2 l-2 16 l-12 -12 l-14 8 l2 -18Z"
							fill="#fff"
						/>
						<text
							x={190}
							y={46}
							textAnchor="middle"
							fontSize={22}
							fontWeight={800}
							fill="#f43f5e"
						>
							!
						</text>
					</g>
					<path
						data-chibi-sweat
						d="M170 86 q8 12 0 16 q-8 -4 0 -16Z"
						fill="#7dd3fc"
						opacity={0}
					/>
				</g>
			</g>

			{/* Keyboard + desk */}
			<g data-chibi-keyboard>
				<path d="M82 222 L198 222 L208 244 L72 244Z" fill="#1c1917" />
				{KEYS.map((k) => (
					<rect
						key={`${k.x}-${k.y}`}
						data-chibi-key
						x={k.x + 14}
						y={k.y}
						width={7}
						height={4}
						rx={1}
						fill="#44403c"
					/>
				))}
			</g>
			<rect x={10} y={244} width={300} height={3} rx={1.5} fill="#44403c" />

			<g data-chibi-sparkles>
				<Sparkle x={70} y={70} s={1.2} />
				<Sparkle x={238} y={64} s={1} />
				<Sparkle x={52} y={170} s={0.8} />
				<Sparkle x={250} y={196} s={1.3} />
				<Sparkle x={150} y={22} s={0.9} />
			</g>
		</svg>
	);
}
