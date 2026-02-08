import { Link } from 'react-router-dom';
import { FileText, Eye, Edit3, MessageCircle, Send, CheckCircle, Smartphone } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Landing() {
    return (
        <div className="space-y-20 pb-20">

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent animate-fade-in-up">
                        Escribe. Visualiza. <br /> Comparte.
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-10 animate-fade-in-up delay-100">
                        SeeMarkdown es una herramienta para crear y editar archivos Markdown en tiempo real.
                        Sin distracciones, solo tú y tu contenido.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-200">
                        <Link to="/editor">
                            <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary-500/30">
                                <Edit3 className="mr-2 h-5 w-5" /> Comenzar a Escribir
                            </Button>
                        </Link>
                        <Link to="/viewer">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                <Eye className="mr-2 h-5 w-5" /> Visualizar Archivo
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Background blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-200/20 dark:bg-primary-900/10 blur-3xl animate-blob"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/20 dark:bg-indigo-900/10 blur-3xl animate-blob animation-delay-2000"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Edit3 className="h-8 w-8 text-primary-500" />}
                        title="Editor Dual"
                        description="Escribe en un lado y ve el resultado instantáneamente en el otro. Soporte completo de sintaxis GFM."
                    />
                    <FeatureCard
                        icon={<Smartphone className="h-8 w-8 text-purple-500" />}
                        title="PWA Offline"
                        description="Instala la app en tu dispositivo y trabaja sin conexión a internet. Tus archivos están seguros."
                    />
                    <FeatureCard
                        icon={<FileText className="h-8 w-8 text-green-500" />}
                        title="Local & Seguro"
                        description="Todo sucede en tu navegador. Tus datos se guardan en LocalStorage y nunca salen de tu dispositivo."
                    />
                </div>
            </section>

            {/* About Section */}
            <section className="bg-gray-50 dark:bg-dark-surface py-16 rounded-3xl mx-4 sm:mx-8 lg:mx-auto max-w-7xl">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Acerca de SeeMarkdown</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        Este proyecto nació de la necesidad de tener una herramienta ligera, rápida y bonita para editar archivos README y documentación.
                        Creado con las últimas tecnologías web para ofrecer un rendimiento excepcional.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a
                            href="https://wa.me/3177858446?text=Hola,%20quisiera%20más%20información%20sobre%20SeeMarkdown"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20">
                                <MessageCircle className="mr-2 h-5 w-5" /> Chat en WhatsApp
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="max-w-xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Contáctanos</h2>
                <ContactForm />
            </section>

        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 p-3 bg-gray-50 dark:bg-dark-bg rounded-xl inline-block">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    );
}

function ContactForm() {
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error('Discord Webhook URL not found in environment variables.');
            setStatus('error');
            return;
        }

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: `**Nuevo Mensaje de Contacto - SeeMarkdown**\n**Nombre:** ${formData.name}\n**Mensaje:** ${formData.message}`,
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', message: '' });

                // Show success alert for 1.5 seconds
                Swal.fire({
                    icon: 'success',
                    title: '¡Enviado!',
                    text: 'Gracias por tu mensaje.',
                    timer: 1500,
                    showConfirmButton: false,
                    background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#fff',
                    color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#1e293b'
                });

                // Reset status to allow new submission
                setTimeout(() => {
                    setStatus('idle');
                }, 1500);

            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo enviar el mensaje.',
                background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#1e293b'
            });
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border">
            <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Nombre</label>
                <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Mensaje</label>
                <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={status === 'submitting' || status === 'success'}
            >
                {status === 'submitting' ? (
                    'Enviando...'
                ) : status === 'success' ? (
                    <><CheckCircle className="mr-2 h-5 w-5" /> Enviado</>
                ) : (
                    <><Send className="mr-2 h-5 w-5" /> Enviar Mensaje</>
                )}
            </Button>

            {status === 'success' && (
                <p className="text-green-600 text-center text-sm mt-2">
                    ¡Gracias! Hemos recibido tu mensaje.
                </p>
            )}
        </form>
    );
}
