import styles from "#styles/blockquote.module.css";


/** @param {{ children: React.ReactNode, props: Record<string, Any>}} */
export default function Blockquote({ children, ...props }) {
    return (
        <blockquote className={styles.blockquote} {...props}>
            <span />
            <div>{children}</div>
        </blockquote>
    );
}
