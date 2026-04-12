type FlexColProps = {
		children?: React.ReactNode
		style?: React.CSSProperties
		className?: string
}

export function FlexCol({ children, style }: FlexColProps) {
    return (
        <div style={{ display: "flex", flexDirection: "column", ...style }}>
            {children}
        </div>
    )
}