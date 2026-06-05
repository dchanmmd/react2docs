import styles from "#styles/table.module.css";

export default function TableRow({ children, ...props }) {
    return (
        <tr className={styles.tableRow} {...props}>{children}</tr>
    );
}