import styles from "#styles/table.module.css";

export default function TableData({ children, ...props }) {
    return (
        <td className={styles.tableData} {...props}>{children}</td>
    );
}