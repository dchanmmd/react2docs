import { useMemo } from "react";
import { useParams, Navigate } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { useManifest } from "#hooks/useManifest";
import { useMarkdown } from "#hooks/useMarkdown";
import Navigation from "#components/Navigation";
import InThisSection from "#components/InThisSection";
import Heading from "#components/Heading";
import Paragraph from "#components/Paragraph";
import Link from "#components/Link";
import Blockquote from "#components/Blockquote";
import Table from "#components/Table";
import CheckList from "#components/CheckList";
import UnorderedList from "#components/UnorderedList";
import OrderedList from "#components/OrderedList";
import styles from "#styles/document.module.css";
import Hr from "#components/Hr.jsx";
import TableRow from "#components/TableRow.jsx";
import TableHeading from "#components/TableHeading.jsx";
import TableData from "#components/TableData.jsx";
import Pre from "#src/components/Pre.jsx";

export default function Document() {
    const { slug } = useParams();
    const manifest = useManifest();
    const markdown = useMarkdown(slug ?? manifest?.[0]?.slug);

    /** @type {import("react-markdown").Components} */
    const components = useMemo(() => {
        let i = 0;
        return {
            h1: ({ node, ...props }) => <Heading as="h1" {...props} />,
            h2: ({ node, ...props }) => <Heading as="h2" {...props} />,
            h3: ({ node, ...props }) => <Heading as="h3" {...props} />,
            h4: ({ node, ...props }) => <Heading as="h4" {...props} />,
            h5: ({ node, ...props }) => <Heading as="h5" {...props} />,
            h6: ({ node, ...props }) => <Heading as="h6" {...props} />,
            p: ({ node, ...props }) => <Paragraph {...props} />,
            a: ({ node, ...props }) => <Link {...props} />,
            blockquote: ({ node, ...props }) => <Blockquote {...props} />,
            table: ({ node, ...props }) => <Table {...props} />,
            tr: ({ node, ...props }) => <TableRow {...props} />,
            th: ({ node, ...props }) => <TableHeading {...props} />,
            td: ({ node, ...props }) => <TableData {...props} />,
            ul: ({ node, className, ...props }) =>
                className === "contains-task-list"
                    ? <CheckList name={`${slug}-${i++}`} {...props} />
                    : <UnorderedList {...props} />,
            ol: ({ node, ...props }) => <OrderedList {...props} />,
            hr: ({...props}) => <Hr {...props}/>,
            pre: ({ node, ...props }) => <Pre {...props} />,
        };
    }, [slug]);

    if (!manifest) return null;
    if (manifest.length === 0) return <p>No docs found.</p>;
    if (!slug) return <Navigate to={`/${manifest[0].slug}`} replace />;

    return (
        <div className={styles.layout}>
            <Navigation manifest={manifest} currentSlug={slug} />
            <main className={styles.document}>
                {markdown && (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeSlug]}
                        components={components}
                    >
                        {markdown}
                    </ReactMarkdown>
                )}
            </main>
            <InThisSection markdown={markdown} />
        </div>
    );
}
