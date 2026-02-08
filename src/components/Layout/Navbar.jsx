import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../UI/Button';
import { useTheme } from '../../hooks/useTheme';

export function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Crear Archivo', path: '/editor' },
        { name: 'Visualizar', path: '/viewer' },
    ];

    return (
        <nav className="border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            SeeMarkdown
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors 
                  ${location.pathname === link.path
                                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/10'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle Theme">
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center">
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2">
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium 
                  ${location.pathname === link.path
                                        ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/10'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
