import { cn } from "@homepage/ui/lib/utils";
import { figlet } from "./figlet";

const CW = 10;
const CH = 20;

/** Line segments (in cell units, 0..1) that stand in for box-drawing glyphs. */
const STROKES: Record<string, [number, number, number, number][]> = {
	"═": [
		[0, 0.4, 1, 0.4],
		[0, 0.6, 1, 0.6],
	],
	"║": [
		[0.4, 0, 0.4, 1],
		[0.6, 0, 0.6, 1],
	],
	"╗": [
		[0, 0.4, 0.6, 0.4],
		[0.6, 0.4, 0.6, 1],
		[0, 0.6, 0.4, 0.6],
		[0.4, 0.6, 0.4, 1],
	],
	"╔": [
		[1, 0.4, 0.4, 0.4],
		[0.4, 0.4, 0.4, 1],
		[1, 0.6, 0.6, 0.6],
		[0.6, 0.6, 0.6, 1],
	],
	"╝": [
		[0, 0.6, 0.6, 0.6],
		[0.6, 0.6, 0.6, 0],
		[0, 0.4, 0.4, 0.4],
		[0.4, 0.4, 0.4, 0],
	],
	"╚": [
		[1, 0.6, 0.4, 0.6],
		[0.4, 0.6, 0.4, 0],
		[1, 0.4, 0.6, 0.4],
		[0.6, 0.4, 0.6, 0],
	],
};

type FigletSvgProps = {
	word: string;
	className?: string;
	/** Colour of the solid blocks; the shadow strokes use `currentColor` at lower opacity. */
	blockClassName?: string;
};

/**
 * Renders an ANSI Shadow figlet word as SVG so blocks line up perfectly no
 * matter which monospace font the visitor has. Rows/blocks carry data
 * attributes so they can be animated.
 */
export function FigletSvg({
	word,
	className,
	blockClassName = "fill-current",
}: FigletSvgProps) {
	const rows = figlet(word);
	const width = Math.max(...rows.map((r) => [...r].length)) * CW;
	const height = rows.length * CH;

	return (
		<svg
			viewBox={`0 0 ${width} ${height}`}
			className={cn("block h-auto w-full", className)}
			role="img"
			aria-label={word}
		>
			{rows.map((row, r) => (
				<g key={`${r}-${row}`} data-figlet-row>
					{[...row].map((ch, c) => {
						const x = c * CW;
						const y = r * CH;
						if (ch === "█") {
							return (
								<rect
									key={c}
									data-figlet-block
									x={x}
									y={y}
									width={CW + 0.4}
									height={CH + 0.4}
									className={blockClassName}
								/>
							);
						}
						const lines = STROKES[ch];
						if (!lines) return null;
						return (
							<g
								key={c}
								className="stroke-current opacity-45"
								strokeWidth={1.4}
								fill="none"
							>
								{lines.map(([x1, y1, x2, y2]) => (
									<line
										key={`${x1}${y1}${x2}${y2}`}
										x1={x + x1 * CW}
										y1={y + y1 * CH}
										x2={x + x2 * CW}
										y2={y + y2 * CH}
									/>
								))}
							</g>
						);
					})}
				</g>
			))}
		</svg>
	);
}
