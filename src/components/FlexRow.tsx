type FlexRowProps = {
	children?: React.ReactNode
	style?: React.CSSProperties
	className?: string
}

export function FlexRow({ children, style }: FlexRowProps) {
	return (
		<div style={{ display: "flex", flexDirection: "row", ...style }}>
			{children}
		</div>
	)
}