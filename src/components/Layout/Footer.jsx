export function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} SeeMarkdown.
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                    Proyecto para edición y visualización de Markdown.
                </p>
            </div>
        </footer>
    );
}
