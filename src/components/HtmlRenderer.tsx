import React, { useEffect, useRef } from 'react';

type Props = {
  src: string;
  theme?: 'light' | 'dark';
};

export default function HtmlRenderer({ src, theme = 'light' }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Load notebook HTML as-is
    fetch(src)
      .then((res) => res.text())
      .then((html) => {
        const doc = iframe.contentDocument;
        if (!doc) return;

        // Directly write notebook HTML (keep its <style>, <script>, MathJax, etc.)
        doc.open();
        doc.write(html);
        doc.close();

        // Once the iframe loads, adjust height & fix link behavior
        const fixLinksAndResize = () => {
          const innerDoc = iframe.contentDocument;
          if (!innerDoc) return;

          // Fix link behavior - open all links in new tab
          const links = innerDoc.querySelectorAll('a[href]');
          links.forEach((a) => {
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener noreferrer');
          });

          // Adjust height to fit full notebook content
          iframe.style.height = innerDoc.body.scrollHeight + 20 + 'px';
        };

        iframe.addEventListener('load', () => setTimeout(fixLinksAndResize, 500));

        // Run once initially (in case iframe fires instantly)
        setTimeout(fixLinksAndResize, 1000);
      });
  }, [src]);

  return (
    <iframe
      ref={iframeRef}
      title="Notebook Viewer"
      sandbox="allow-same-origin allow-scripts allow-popups"
      style={{
        width: '100%',
        border: 'none',
        minHeight: '600px',
        overflow: 'hidden',
        borderRadius: '12px',
        background: theme === 'dark' ? '#1e1e2e' : '#ffffff',
        boxShadow:
          theme === 'dark'
            ? '0 0 12px rgba(30,41,59,0.8)'
            : '0 0 10px rgba(0,0,0,0.1)',
        transition: 'background 0.3s ease',
      }}
    />
  );
}
