import { useState, useEffect, useRef } from 'react';
import { Toolbar } from '../components/Editor/Toolbar';
import { MarkdownPreview } from '../components/Editor/MarkdownPreview';
import { Button } from '../components/UI/Button';
import { Download, Trash2, FilePlus, AlertCircle } from 'lucide-react';

import Swal from 'sweetalert2';

export default function EditorPage() {
    const [markdown, setMarkdown] = useState('');
    const [viewMode, setViewMode] = useState('split'); // edit, preview, split
    const [fileName, setFileName] = useState('untitled.md');
    const textareaRef = useRef(null);

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedContent = localStorage.getItem('autosave_content');
        if (savedContent) setMarkdown(savedContent);
    }, []);

    // Auto-save
    useEffect(() => {
        localStorage.setItem('autosave_content', markdown);
    }, [markdown]);

    const handleInsert = (prefix, suffix) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        const newText = before + prefix + selection + suffix + after;
        setMarkdown(newText);

        // Restore cursor / focus
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    const handleDownload = () => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName.endsWith('.md') ? fileName : `${fileName}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleClear = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0ea5e9', // primary-500
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar todo',
            cancelButtonText: 'Cancelar',
            background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#1e293b'
        }).then((result) => {
            if (result.isConfirmed) {
                setMarkdown('');
                Swal.fire({
                    title: '¡Borrado!',
                    text: 'El contenido ha sido eliminado.',
                    icon: 'success',
                    confirmButtonColor: '#0ea5e9',
                    background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#fff',
                    color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#1e293b'
                })
            }
        })
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="px-2 py-1 rounded border border-gray-300 dark:border-dark-border bg-transparent focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="Nombre del archivo"
                    />
                </div>
                <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={handleClear} title="Limpiar">
                        <Trash2 className="h-4 w-4" /> <span className="hidden sm:inline ml-1">Limpiar</span>
                    </Button>
                    <Button size="sm" onClick={handleDownload} title="Descargar">
                        <Download className="h-4 w-4" /> <span className="hidden sm:inline ml-1">Descargar</span>
                    </Button>
                </div>
            </div>

            <Toolbar onInsert={handleInsert} viewMode={viewMode} setViewMode={setViewMode} />

            {/* Editor Area */}
            <div className="flex-grow flex overflow-hidden relative">
                {/* Editor Pane */}
                <div className={`
          flex-1 flex flex-col h-full border-r border-gray-200 dark:border-dark-border transition-all duration-300
          ${viewMode === 'preview' ? 'hidden' : 'block'}
          ${viewMode === 'split' ? 'w-1/2' : 'w-full'}
        `}>
                    <textarea
                        ref={textareaRef}
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="flex-grow w-full p-4 resize-none outline-none font-mono text-sm bg-white dark:bg-dark-bg text-gray-800 dark:text-gray-200"
                        placeholder="# Empieza a escribir aquí..."
                    />
                    {/* Status Bar / Error Highlight mock */}
                    <div className="bg-gray-100 dark:bg-dark-surface p-1 text-xs text-gray-500 flex justify-between px-4">
                        <span>Líneas: {markdown.split('\n').length}</span>
                        <span>Caracteres: {markdown.length}</span>
                    </div>
                </div>

                {/* Preview Pane */}
                <div className={`
          flex-1 h-full overflow-auto bg-gray-50 dark:bg-dark-surface transition-all duration-300
          ${viewMode === 'edit' ? 'hidden' : 'block'}
          ${viewMode === 'split' ? 'w-1/2' : 'w-full'}
        `}>
                    <div className="p-8 max-w-3xl mx-auto">
                        <MarkdownPreview content={markdown} />
                    </div>
                </div>
            </div>
        </div>
    );
}
