import styles from "#styles/table.module.css";

/** @param {{ children: React.ReactNode, props: Record<string, Any>}} */
export default function Table({ children, ...props }) {
    return <table className={styles.table} {...props}>{children}</table>;
}
