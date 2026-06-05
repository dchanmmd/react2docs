import styles from "#styles/unordered-list.module.css";

/** @param {{ children: React.ReactNode, props: Record<string, Any>}} */
export default function UnorderedList({ children, ...props }) {
    return (
        <ul className={styles.list} {...props}>
            {children}
        </ul>
    );
}
