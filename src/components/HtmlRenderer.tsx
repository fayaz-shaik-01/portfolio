// HtmlRenderer.tsx
import React, { useEffect, useRef } from "react";

type Props = {
  src: string;                // path to the generated notebook HTML (public or src/content/articles)
  theme?: "light" | "dark";   // current site theme
  minHeight?: number;         // optional minimum iframe height
};

export default function HtmlRenderer({ src, theme = "light", minHeight = 400 }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const lastHeightRef = useRef<number>(0);
  const resizeTimerRef = useRef<number | null>(null);

  // Small throttle helper (runs fn after wait ms, cancelling previous)
  const scheduleResize = (fn: () => void, wait = 160) => {
    if (resizeTimerRef.current) window.clearTimeout(resizeTimerRef.current);
    resizeTimerRef.current = window.setTimeout(() => {
      resizeTimerRef.current = null;
      fn();
    }, wait);
  };

  // write HTML into iframe and setup observers/listeners
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !src) return;

    let mounted = true;
    let mutationObserver: MutationObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;

    // load the HTML file
    (async () => {
      try {
        const res = await fetch(src, { cache: "no-store" }); // ensure fresh
        const html = await res.text();

        if (!mounted) return;
        const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
        if (!doc) return;

        // write a base document that contains the notebook HTML (keeps its CSS & scripts)
        // we wrap original HTML inside bodyContent to avoid duplicate <html>/<head> when user file already a full HTML
        // but we simply write the fetched HTML as-is — nbconvert emits complete HTML files
        doc.open();
        doc.write(html);
        doc.close();

        // inject a small helper style for dark/light adaptation that tries not to override notebook styles
        const injectedStyleId = "portfolio-notebook-theme-overrides";
        const ensureThemeStyle = (mode: "light" | "dark") => {
          // remove previous
          const prev = doc.getElementById(injectedStyleId);
          if (prev) prev.remove();

          const style = doc.createElement("style");
          style.id = injectedStyleId;
          style.setAttribute("data-portfolio", "true");
          // conservative overrides: background + base text color + link color + code/pre backgrounds contrast
          style.innerHTML = mode === "dark"
            ? `
              html, body { background: #0b1220 !important; color: #e6eef8 !important; }
              body { -webkit-font-smoothing:antialiased; }
              a { color: #93c5fd !important; }
              pre, code { background: rgba(255,255,255,0.04) !important; color: #e6eef8 !important; }
              .output { background: rgba(255,255,255,0.02) !important; }
            `
            : `
              /* light mode: minimal change so original notebook styles stay intact */
              html, body { background: initial !important; color: initial !important; }
            `;
          doc.head?.appendChild(style);
        };

        // initial theme
        ensureThemeStyle(theme);

        // resize function: set iframe height to body's scrollHeight
        const doResize = () => {
          try {
            const body = doc.body;
            if (!body) return;
            // prefer scrollHeight (covers content including overflowing elements)
            const h = Math.max(minHeight, Math.ceil(body.scrollHeight));
            // avoid tiny fluctuations causing jitter
            if (Math.abs(h - lastHeightRef.current) > 6) {
              lastHeightRef.current = h;
              iframe.style.height = `${h}px`;
            }
          } catch (e) {
            // ignore cross-origin or other odd cases
          }
        };

        // Throttled initial resize after load and images render
        const initialResize = () => scheduleResize(doResize, 160);
        // ensure initial resize after all resources loaded inside iframe
        if (iframe.contentWindow) {
          // If the notebook scripts/images take time, wait for load
          iframe.contentWindow.addEventListener("load", initialResize, { once: true });
        }
        // always run an immediate attempt too
        initialResize();

        // Observe DOM mutations (MathJax or dynamic outputs)
        mutationObserver = new MutationObserver(() => scheduleResize(doResize, 200));
        mutationObserver.observe(doc.body, {
          subtree: true,
          childList: true,
          attributes: true,
          characterData: true,
        });

        // Observe layout size changes (e.g., resized images)
        resizeObserver = new ResizeObserver(() => scheduleResize(doResize, 200));
        resizeObserver.observe(doc.body);

        // If MathJax exists inside iframe, ask it to typeset and then resize
        try {
          const win = iframe.contentWindow as any;
          if (win && win.MathJax && typeof win.MathJax.typesetPromise === "function") {
            // typeset (safe if math already typeset; returns quickly)
            win.MathJax.typesetPromise()
              .then(() => scheduleResize(doResize, 120))
              .catch(() => {
                /* ignore MathJax errors */
              });
          }
        } catch (e) {
          // ignore
        }

        // Also hook to image load events inside iframe (images often change height)
        Array.from(doc.images || []).forEach((img) => {
          img.addEventListener("load", () => scheduleResize(doResize, 120));
        });

        // expose a small API to allow external theme updates (we'll call it below in theme effect)
        (iframe as any).__applyNotebookTheme = (mode: "light" | "dark") => {
          try {
            ensureThemeStyle(mode);
            scheduleResize(doResize, 120);
          } catch (e) { /* ignore */ }
        };

      } catch (err) {
        console.error("HtmlRenderer: failed to fetch notebook HTML:", err);
      }
    })();

    return () => {
      mounted = false;
      // disconnect observers if present
      try {
        mutationObserver?.disconnect();
        resizeObserver?.disconnect();
      } catch {}
      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current);
        resizeTimerRef.current = null;
      }
    };
  }, [src, minHeight]);

  // update theme inside iframe when `theme` prop changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      // call the helper injected into iframe once doc available
      const win = iframe.contentWindow as any;
      if (win && typeof win.__applyNotebookTheme === "function") {
        win.__applyNotebookTheme(theme);
      } else {
        // fallback: try to set style directly
        const doc = iframe.contentDocument;
        if (doc) {
          const existing = doc.getElementById("portfolio-notebook-theme-overrides");
          if (existing) existing.remove();
          const style = doc.createElement("style");
          style.id = "portfolio-notebook-theme-overrides";
          style.innerHTML = theme === "dark"
            ? `html, body { background: #0b1220 !important; color: #e6eef8 !important; } a { color: #93c5fd !important; } pre, code { background: rgba(255,255,255,0.04) !important; color: #e6eef8 !important; }`
            : `html, body { background: initial !important; color: initial !important; }`;
          doc.head?.appendChild(style);
        }
      }
    } catch (e) {
      // ignore cross-origin issues
    }
  }, [theme]);

  return (
    <iframe
      ref={iframeRef}
      title="Notebook Viewer"
      // Note: allow-same-origin + allow-scripts is required so we can access iframe.document
      // and MathJax inside. On production, be mindful of untrusted HTML sources.
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      style={{
        width: "100%",
        height: `${minHeight}px`,
        minHeight: `${minHeight}px`,
        border: "none",
        borderRadius: 12,
        overflow: "hidden",
        transition: "height 0.18s ease",
        background: theme === "dark" ? "#0b1220" : "transparent",
      }}
    />
  );
}
