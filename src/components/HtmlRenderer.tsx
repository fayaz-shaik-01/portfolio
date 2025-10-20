import React from 'react';

type Props = {
  /** The path or URL to the HTML file (e.g. "/learn/lecture-3.html") */
  src: string;
  /** Optional: light/dark theme for frame background */
  theme?: 'light' | 'dark';
};

export default function HtmlRenderer({ src, theme = 'light' }: Props) {
  return (
    <iframe
      src={src}
      title="Article"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      style={{
        width: '100%',
        minHeight: '80vh',
        border: 'none',
        borderRadius: '12px',
        backgroundColor: theme === 'dark' ? '#0f172a' : '#fff',
        boxShadow:
          theme === 'dark'
            ? '0 0 10px rgba(30,41,59,0.8)'
            : '0 0 10px rgba(0,0,0,0.1)',
      }}
    />
  );
}
