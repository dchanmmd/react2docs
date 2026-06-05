import styles from "#styles/link.module.css";

/** @param {{ children: React.ReactNode, props: Record<string, Any>}} */
export default function Link({ children, ...props }) {
    return <a className={styles.link} {...props}>{children}</a>;
}
