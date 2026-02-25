import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-foreground mt-8 mb-4 text-3xl font-bold first:mt-0">{children}</h1>,
          h2: ({ children }) => <h2 className="text-foreground mt-8 mb-3 text-2xl font-bold first:mt-0">{children}</h2>,
          h3: ({ children }) => <h3 className="text-foreground mt-6 mb-3 text-xl font-bold first:mt-0">{children}</h3>,
          h4: ({ children }) => (
            <h4 className="text-foreground mt-6 mb-2 text-lg font-semibold first:mt-0">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-foreground mt-4 mb-2 text-base font-semibold first:mt-0">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-muted-foreground mt-4 mb-2 text-sm font-semibold first:mt-0">{children}</h6>
          ),
          p: ({ children }) => <p className="text-foreground mb-4 leading-7 font-normal">{children}</p>,
          ul: ({ children }) => <ul className="mb-4 ml-4 list-inside list-disc space-y-1.5 font-normal">{children}</ul>,
          ol: ({ children }) => (
            <ol className="mb-4 ml-4 list-inside list-decimal space-y-1.5 font-normal">{children}</ol>
          ),
          li: ({ children }) => <li className="text-foreground leading-7 font-normal">{children}</li>,
          strong: ({ children }) => <strong className="text-foreground font-bold">{children}</strong>,
          em: ({ children }) => <em className="text-foreground italic">{children}</em>,
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-muted text-foreground border-border rounded border px-1.5 py-0.5 font-mono text-sm font-normal">
                  {children}
                </code>
              );
            }
            return <code className="text-foreground font-mono text-sm font-normal">{children}</code>;
          },
          pre: ({ children }) => (
            <pre className="bg-muted/50 border-border mb-4 overflow-x-auto rounded-lg border p-4 font-mono text-sm">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-primary text-muted-foreground my-4 border-l-4 pl-4 font-normal italic">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-border my-8" />,
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="my-4 h-auto max-w-full rounded-lg"
            />
          ),
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto">
              <table className="border-border min-w-full border-collapse border font-normal">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="border-border border-b">{children}</tr>,
          th: ({ children }) => (
            <th className="border-border text-foreground border px-4 py-2 text-left font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="border-border text-foreground border px-4 py-2 font-normal">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
