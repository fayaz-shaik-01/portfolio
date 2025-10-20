import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { defaultSchema } from 'hast-util-sanitize';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css'; // light
import 'highlight.js/styles/github-dark.css'; // dark
import '../learn.css';

type Props = { markdown: string };

type TocItem = { id: string; text: string; level: number };

function slugify(s = '') {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// extend sanitize schema to allow class/style on div/span and data: image URIs
const schema = {
  ...defaultSchema,
  tagNames: Array.from(new Set([...(defaultSchema.tagNames ?? []), 'div', 'span', 'iframe'])),
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div ?? []), 'class', 'style'],
    span: [...(defaultSchema.attributes?.span ?? []), 'class', 'style'],
    img: [...(defaultSchema.attributes?.img ?? []), 'src', 'alt', 'title'],
    a: [...(defaultSchema.attributes?.a ?? []), 'href', 'target', 'rel'],
  },
};

export default function ArticleRenderer({ markdown }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // GENERATE TOC: ensure headings have ids
    const headings = Array.from(container.querySelectorAll('h1, h2, h3')) as HTMLElement[];
    const used = new Set<string>();
    const tocItems: TocItem[] = headings.map((h) => {
      const text = h.textContent?.trim() ?? '';
      const base = h.id || slugify(text);
      let uniq = base;
      let i = 1;
      while (used.has(uniq)) uniq = `${base}-${i++}`;
      used.add(uniq);
      h.id = uniq;
      return { id: uniq, text, level: Number(h.tagName[1]) };
    });
    setToc(tocItems);

    // ADD CODE TOOLBAR (copy button + lang label)
    const pres = Array.from(container.querySelectorAll('pre')) as HTMLElement[];
    pres.forEach((pre) => {
      if (pre.dataset.toolbarInitialized === '1') return;
      pre.dataset.toolbarInitialized = '1';
      pre.style.position = 'relative';

      const code = pre.querySelector('code');
      const className = code?.className ?? '';
      const langMatch = className.match(/language-([^\s]+)/);
      const lang = langMatch ? langMatch[1] : '';

      // language label
      if (lang) {
        const langEl = document.createElement('span');
        langEl.className = 'code-lang';
        langEl.textContent = lang.toUpperCase();
        pre.appendChild(langEl);
      }

      // copy button
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.addEventListener('click', async (ev) => {
        ev.stopPropagation();
        const text = code?.textContent ?? '';
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = 'Copied';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 1500);
        } catch (e) {
          btn.textContent = 'Failed';
          setTimeout(() => (btn.textContent = 'Copy'), 1500);
        }
      });
      pre.appendChild(btn);
    });

    // external links open in new tab
    const links = Array.from(container.querySelectorAll('a')) as HTMLAnchorElement[];
    links.forEach((a) => {
      try {
        const url = new URL(a.href, location.href);
        if (url.origin !== location.origin) {
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        }
      } catch (e) {
        // ignore
      }
    });
  }, [markdown]);

  return (
    <div className="article-container grid gap-8 lg:grid-cols-[1fr_260px]">
      <article ref={ref} className="prose max-w-none dark:prose-invert learn-md">
        <ReactMarkdown
          children={markdown}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, [rehypeSanitize, schema], rehypeKatex, rehypeHighlight]}
        />
      </article>

      <aside className="hidden lg:block sticky top-28 self-start">
        <div className="toc-card bg-white dark:bg-[#20243a] border-2 border-gray-100 dark:border-[#334155] rounded-xl p-4 shadow-sm dark:shadow-blue-900/10">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-[#f3f4f6] mb-3">On this page</h4>
          <nav className="space-y-2 text-sm">
            {toc.length === 0 ? (
              <div className="text-gray-500 dark:text-[#a3aed0]">No sections</div>
            ) : (
              toc.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(t.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`block ${t.level === 1 ? 'pl-4' : t.level === 2 ? 'pl-8' : 'pl-12'} text-gray-700 dark:text-[#cbd5e1] hover:text-blue-600 dark:hover:text-blue-300`}
                >
                  {t.text}
                </a>
              ))
            )}
          </nav>
        </div>
      </aside>
    </div>
  );
}