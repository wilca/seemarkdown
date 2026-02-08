import { useState, useCallback } from 'react';

// Wait, I didn't install react-dropzone. I should use native drag and drop or install it.
// Native is fine and lighter.
import { Upload, FileText, X, AlertTriangle } from 'lucide-react';
import { MarkdownPreview } from '../components/Editor/MarkdownPreview';
import { Button } from '../components/UI/Button';

export default function ViewerPage() {
    const [content, setContent] = useState('');
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    const processFile = (file) => {
        setError('');
        if (!file) return;

        if (!file.name.endsWith('.md') && !file.name.endsWith('.txt')) {
            setError('Formato no soportado. Por favor sube un archivo Markdown (.md)');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setContent(e.target.result);
            setFileName(file.name);
        };
        reader.onerror = () => {
            setError('Error al leer el archivo');
        };
        reader.readAsText(file);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        processFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...e.dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    processFile(file);
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...e.dataTransfer.files].forEach((file, i) => {
                processFile(file);
            });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const clearFile = () => {
        setContent('');
        setFileName('');
        setError('');
    };

    if (content) {
        return (
            <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8 bg-gray-50 dark:bg-dark-bg">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6 bg-white dark:bg-dark-surface p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                            <FileText className="h-6 w-6 text-primary-500" />
                            <h1 className="text-xl font-bold truncate max-w-xs sm:max-w-md">{fileName}</h1>
                        </div>
                        <Button variant="ghost" onClick={clearFile} title="Cerrar archivo">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="bg-white dark:bg-dark-surface p-8 rounded-lg shadow-sm min-h-[500px]">
                        <MarkdownPreview content={content} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div
                className={`
          max-w-xl w-full p-10 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center
          ${isDragOver
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                        : 'border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface'}
        `}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className="mb-6 p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                    <Upload className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>

                <h2 className="text-2xl font-bold mb-2">Sube tu archivo Markdown</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Arrastra y suelta tu archivo aquí, o haz clic para seleccionar
                </p>

                <label htmlFor="file-upload" className="cursor-pointer">
                    <Button as="span" size="lg" className="pointer-events-none">
                        Seleccionar Archivo
                    </Button>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".md,.txt"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                {error && (
                    <div className="mt-6 flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg animate-fade-in">
                        <AlertTriangle className="h-5 w-5" />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
