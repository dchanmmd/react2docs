import React from "react";
import { useChecklist } from "#src/hooks/useChecklist";
import styles from "#styles/checklist.module.css";

/** @param {{ name: string, children: React.ReactNode, props: Record<string, Any>}} */
export default function CheckList({ name, children, ...props }) {
    const [checklist, toggle] = useChecklist(name);

    return (
        <ul className={styles.list} {...props}>
            {React.Children.map(children, (child, index) => {
                if (!React.isValidElement(child)) return child;

                const liChildren = React.Children.toArray(child.props.children);
                const content = liChildren.filter(
                    c => !(React.isValidElement(c) && c.type === "input")
                );
                const checked = !!checklist[index];

                return (
                    <li className={styles.item}>
                        <label className={styles.label}>
                            <input
                                className={styles.input}
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggle(index)}
                            />
                            <div className={styles.box}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    className={styles.check}
                                >
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                </svg>
                            </div>
                            {content}
                        </label>
                    </li>
                );
            })}
        </ul>
    );
}
