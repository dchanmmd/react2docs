import { NavLink } from "react-router";
import styles from "#styles/navigation.module.css";

/** @param {{ manifest: {slug: string, title: string}[], currentSlug: string}} */
export default function Navigation({ manifest, currentSlug }) {
    return (
        <nav className={styles.navigation}>
            <p className={styles.label}>All articles</p>
            {manifest.map(({ slug, title }) => (
                <NavLink
                    key={slug}
                    to={`/${slug}`}
                    aria-current={slug === currentSlug ? "page" : undefined}
                >
                    {title}
                </NavLink>
            ))}
        </nav>
    );
}
