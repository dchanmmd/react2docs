import { useState, useEffect } from "react";

let cache = null;
let pending = null;

export function useManifest() {
    const [manifest, setManifest] = useState(cache);

    useEffect(() => {
        if (cache) return;
        if (!pending) {
            const url = `${import.meta.env.BASE_URL}docs/manifest.json`;

            pending = fetch(url)
                .then(res => {
                    if (!res.ok) throw new Error("Manifest not found");
                    return res.json();
                })
                .then(data => { 
                    cache = data; 
                    return data; 
                })
                .catch(() => { 
                    cache = []; 
                    return []; 
                });
        }
        pending.then(setManifest);
    }, []);
    return manifest;
}
