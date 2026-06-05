import styles from "#styles/ordered-list.module.css";

/** @param {{ children: React.ReactNode, props: Record<string, Any>}} */ 
export default function OrderedList({ children, ...props }) {
    return (
        <ol className={styles.list} {...props}>
            {children}
        </ol>
    );
}
