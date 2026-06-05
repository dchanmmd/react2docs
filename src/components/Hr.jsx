import styles from "#styles/hr.module.css";

/** @param {{ props: Record<string, Any>}} */
export default function Hr({ ...props }) {
    return <hr className={styles.hr} {...props}/>
}