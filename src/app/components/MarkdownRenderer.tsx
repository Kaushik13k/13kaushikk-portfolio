import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const headingStyle = "font-extrabold";

  return (
    <div className="prose lg:prose-xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className={`text-4xl mt-5 ${headingStyle}`}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className={`text-3xl mt-5 ${headingStyle}`}>{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className={`text-2xl mt-5 ${headingStyle}`}>{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className={`text-xl mt-5 ${headingStyle}`}>{children}</h5>
          ),
          p: ({ children }) => <p className="text-sm mt-5">{children}</p>,
          li: ({ children }) => (
            <li className="text-sm list-disc ml-6 ">{children}</li>
          ),
          ul: ({ children }) => (
            <ul className="list-disc mt-5 pl-6">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6">{children}</ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-400">
              {children}
            </blockquote>
          ),
          code: ({
            inline,
            className,
            children,
          }: {
            inline?: boolean;
            className?: string;
            children: React.ReactNode;
          }) => {
            if (inline) {
              return (
                <code className="bg-gray-100 text-black text-sm font-bold mt-5 px-1 py-0.5 rounded">
                  {children}
                </code>
              );
            } else {
              return (
                <pre
                  className={`bg-gray-100 text-black text-sm font-bold mt-5 p-4 rounded overflow-x-auto ${className}`}
                >
                  {children}
                </pre>
              );
            }
          },
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-400 underline hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
