import { useMemo } from "react";
import BananaSlug from "github-slugger";
import styles from "#styles/in-this-section.module.css";


function parseHeadings(markdown) {
    const bSlug = new BananaSlug();
    return [...markdown.matchAll(/^(#{2,4})\s+(.+)$/gm)].map(([, hashes, text]) => ({
        level: hashes.length,
        text: text.trim(),
        id: bSlug.slug(text.trim()),
    }));
}

/** @param {{ markdown: string | null }} */
export default function InThisSection({ markdown }) {
    const headings = useMemo(() => (markdown ? parseHeadings(markdown) : []), [markdown]);

    if (!headings.length) return null;

    return (
        <nav className={styles.nav}>
            <p className={styles.label}>In this section</p>
            <ul className={styles.list}>
                {headings.map((h, i) => (
                    <li key={i} className={styles[`level${h.level}`]}>
                        <a
                            href={`#${h.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
