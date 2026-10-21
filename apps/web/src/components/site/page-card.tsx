import { Column, Flex } from "@once-ui-system/core";
import type { ReactNode } from "react";

type PageCardProps = {
	/** Full-bleed content rendered above the reading column (e.g. a page hero). */
	stage?: ReactNode;
	children: ReactNode;
	maxWidth?: "s" | "m" | "l";
};

/** The rounded content sheet every page sits on. */
export function PageCard({ stage, children, maxWidth = "s" }: PageCardProps) {
	return (
		<Flex
			className="rounded-3xl bg-accent"
			fillWidth
			padding={2}
			direction="column"
			horizontal="center"
			vertical="start"
			gap={4}
		>
			{stage}
			<Column
				fillWidth
				horizontal="start"
				vertical="start"
				maxWidth={maxWidth}
				gap={4}
				paddingBottom={4}
			>
				{children}
			</Column>
		</Flex>
	);
}
