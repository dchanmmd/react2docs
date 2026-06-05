import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import "#styles/index.css";
import Document from "./views/Document";

createRoot(document.getElementById("root")).render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<Document />} />
            <Route path="/:slug" element={<Document />} />
        </Routes>
    </HashRouter>
);
