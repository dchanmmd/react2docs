import styles from "#styles/heading.module.css";

/** @param {{ as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", children: React.ReactNode, props: Record<string, Any>}} */
export default function Heading({ as = "h3", children, ...props }) {
    switch (as) {
        case "h1":
            return <h1 className={styles.heading1} {...props}>{children}</h1>;
        case "h2":
            return <h2 className={styles.heading2} {...props}>{children}</h2>;
        case "h3":
            return <h3 className={styles.heading3} {...props}>{children}</h3>;
        case "h4":
            return <h4 className={styles.heading4} {...props}>{children}</h4>;
        case "h5":
            return <h5 className={styles.heading5} {...props}>{children}</h5>;
        case "h6":
            return <h6 className={styles.heading6} {...props}>{children}</h6>;
        default:
            return <h3 className={styles.heading3} {...props} data-default={true}>{children}</h3>;
    }
}

