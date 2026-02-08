import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../../hooks/useTheme';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function MarkdownPreview({ content, className }) {
    const { theme } = useTheme();

    return (
        <div className={`prose dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-img:rounded-xl prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-0 ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const [copied, setCopied] = useState(false);
                        const codeText = String(children).replace(/\n$/, '');

                        const handleCopy = () => {
                            navigator.clipboard.writeText(codeText);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        };

                        return !inline && match ? (
                            <div className="relative group rounded-lg overflow-hidden my-4 border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{match[1]}</span>
                                    <button
                                        onClick={handleCopy}
                                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
                                        title="Copiar código"
                                    >
                                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                </div>
                                <SyntaxHighlighter
                                    {...props}
                                    style={theme === 'dark' ? vscDarkPlus : ghcolors}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{
                                        margin: 0,
                                        borderRadius: 0,
                                        background: 'transparent',
                                        padding: '1.5rem',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {codeText}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code {...props} className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-primary-600 dark:text-primary-400">
                                {children}
                            </code>
                        )
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
