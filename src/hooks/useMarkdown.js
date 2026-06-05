import { useState, useEffect } from 'react';

/** @param {string} slug */
export function useMarkdown(slug) {
    /** @type {[string | null, React.Dispatch<React.SetStateAction<string | null>>]} */
    const [content, setContent] = useState(null);

    useEffect(() => {
        if (!slug) return;
        setContent(null);
        fetch(`${import.meta.env.BASE_URL}docs/${slug}.md`)
            .then(r => {
                if (!r.ok) throw new Error('not found');
                return r.text();
            })
            .then(setContent)
            .catch(() => setContent('# 404\n\nDocument not found.'));
    }, [slug]);

    return content;
}
