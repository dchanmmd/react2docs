import styles from "#styles/table.module.css";

export default function TableHeading({ children, ...props }) {
    return (
        <th className={styles.tableHeading} {...props}>{children}</th>
    );
}