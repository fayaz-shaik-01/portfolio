import React, { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { basePath } from '../utils/basePath';

type Props = {
  src: string;
  theme?: 'light' | 'dark';
};

export default function HtmlRenderer({ src, theme = 'light' }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Fetch article HTML
    fetch(src)
      .then((res) => res.text())
      .then((html) => {
        const sanitized = DOMPurify.sanitize(html, {
          ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'loading'],
          FORBID_TAGS: ['script'],
          ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|data):|[^a-z]|[a-z+.\-]+:)/i,
        });

        const doc = iframe.contentDocument;
        if (!doc) return;

        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html lang="en" data-theme="${theme}">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />

              <!-- MathJax configuration -->
              <script>
                window.MathJax = {
                  tex: {
                    inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                    displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                    processEscapes: true,
                  },
                  options: {
                    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
                  },
                  svg: { fontCache: 'global' }
                };
              </script>

              <style>
                body {
                  font-family: system-ui, sans-serif;
                  line-height: 1.6;
                  background: ${theme === 'dark' ? '#1e1e2e' : '#ffffff'};
                  color: ${theme === 'dark' ? '#e5e7eb' : '#111827'};
                  padding: 1.5rem;
                  max-width: 900px;
                  margin: auto;
                }
                h1, h2, h3, h4, h5, h6 {
                  color: ${theme === 'dark' ? '#f3f4f6' : '#111827'};
                  margin-top: 1.5em;
                }
                pre {
                  background: ${theme === 'dark' ? '#2d2d2d' : '#f8f8f8'};
                  padding: 1rem;
                  border-radius: 0.5rem;
                  overflow-x: auto;
                }
                code {
                  font-family: 'Fira Code', monospace;
                  font-size: 0.9rem;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
              </style>
            </head>
            <body>${sanitized}</body>
          </html>
        `);
        doc.close();

        const adjustHeight = () => {
          if (iframe.contentDocument?.body) {
            iframe.style.height = iframe.contentDocument.body.scrollHeight + 20 + 'px';
          }
        };

        iframe.onload = adjustHeight;
        setTimeout(adjustHeight, 800);

        // Load Prism
        const prismLink = doc.createElement('link');
        prismLink.rel = 'stylesheet';
        prismLink.href =
          theme === 'dark'
            ? 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css'
            : 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css';
        doc.head.appendChild(prismLink);

        const prismScript = doc.createElement('script');
        prismScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
        prismScript.async = true;
        doc.body.appendChild(prismScript);

        // Load MathJax (AFTER writing content)
        const mathjax = doc.createElement('script');
        mathjax.type = 'text/javascript';
        mathjax.id = 'MathJax-script';
        mathjax.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        mathjax.async = true;
        doc.body.appendChild(mathjax);

        // Re-render MathJax once loaded
        mathjax.onload = () => {
          if ((iframe.contentWindow as any).MathJax) {
            (iframe.contentWindow as any).MathJax.typesetPromise();
            adjustHeight();
          }
        };
      });
  }, [src, theme]);

  return (
    <iframe
      ref={iframeRef}
      title="Article Content"
      sandbox="allow-same-origin allow-scripts"
      style={{
        width: '100%',
        border: 'none',
        minHeight: '400px',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow:
          theme === 'dark'
            ? '0 0 10px #1e293b'
            : '0 0 10px rgba(0,0,0,0.1)',
        transition: 'background 0.3s ease',
      }}
    />
  );
}
