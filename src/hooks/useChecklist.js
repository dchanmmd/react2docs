import { useState, useEffect } from "react";

/** @param {string} name */
export function useChecklist(name) {
    const [checklist, setChecklist] = useState(() => {
        if (!localStorage.getItem(name)) {
            localStorage.setItem(name, "[]");
        }
        try {
            return JSON.parse(localStorage.getItem(name));
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(name, JSON.stringify(checklist));
    }, [name, checklist]);

    const toggle = (index) => {
        setChecklist(prev => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    };

    return [checklist, toggle];
}