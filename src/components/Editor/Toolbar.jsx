import {
    Bold, Italic, Heading1, Heading2, Heading3,
    List, ListOrdered, Link, Image, Code, Quote,
    Columns, LayoutTemplate, Monitor
} from 'lucide-react';
import { Button } from '../UI/Button';

export function Toolbar({ onInsert, viewMode, setViewMode }) {
    const tools = [
        { icon: <Heading1 className="h-4 w-4" />, label: 'H1', action: () => onInsert('# ', '') },
        { icon: <Heading2 className="h-4 w-4" />, label: 'H2', action: () => onInsert('## ', '') },
        { icon: <Bold className="h-4 w-4" />, label: 'Bold', action: () => onInsert('**', '**') },
        { icon: <Italic className="h-4 w-4" />, label: 'Italic', action: () => onInsert('*', '*') },
        { icon: <List className="h-4 w-4" />, label: 'List', action: () => onInsert('- ', '') },
        { icon: <ListOrdered className="h-4 w-4" />, label: 'Ordered', action: () => onInsert('1. ', '') },
        { icon: <Code className="h-4 w-4" />, label: 'Code', action: () => onInsert('```\n', '\n```') },
        { icon: <Quote className="h-4 w-4" />, label: 'Quote', action: () => onInsert('> ', '') },
        { icon: <Link className="h-4 w-4" />, label: 'Link', action: () => onInsert('[', '](url)') },
        { icon: <Image className="h-4 w-4" />, label: 'Image', action: () => onInsert('![alt](', ')') },
    ];

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface sticky top-16 z-40">
            {tools.map((tool, index) => (
                <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={tool.action}
                    title={tool.label}
                    className="h-8 w-8 p-0"
                >
                    {tool.icon}
                </Button>
            ))}

            <div className="flex-grow"></div>

            <div className="flex items-center gap-1 border-l border-gray-300 dark:border-gray-700 pl-2 ml-1">
                <Button
                    variant={viewMode === 'edit' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('edit')}
                    title="Solo Editor"
                    className="h-8 w-8 p-0"
                >
                    <EditIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant={viewMode === 'split' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('split')}
                    title="Dividido"
                    className="h-8 w-8 p-0"
                >
                    <Columns className="h-4 w-4" />
                </Button>
                <Button
                    variant={viewMode === 'preview' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('preview')}
                    title="Solo Vista Previa"
                    className="h-8 w-8 p-0"
                >
                    <Monitor className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

function EditIcon({ className }) {
    // Simple edit icon wrapper to avoid conflict with imported 'Image' etc if I were to use lucide 'Edit' which might clash
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
    );
}
