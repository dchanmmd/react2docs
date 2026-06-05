/** @param {{ children: React.ReactNode, props: Record<string, Any>}} */
export default function Paragraph({ children, ...props }) {
    return <p {...props}>{children}</p>;
}
