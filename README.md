# SeeMarkdown

SeeMarkdown es un editor y visualizador de Markdown del lado del cliente, construido con React. Permite a los usuarios crear, editar y previsualizar archivos Markdown en tiempo real con una interfaz de panel dividido.

## Características

- **Editor de Panel Dividido en Tiempo Real**: Edita y previsualiza Markdown lado a lado.
- **Gestión de Archivos**: Crea nuevos archivos, sube archivos `.md` existentes o arrástralos para visualizar.
- **Guardado Automático**: Tu trabajo se guarda automáticamente en el almacenamiento local de tu navegador.
- **Soporte PWA**: Instalable como una Aplicación Web Progresiva.
- **Interfaz Moderna**: Diseño limpio con soporte para modo Claro/Oscuro.
- **Exportación**: Descarga tu trabajo como archivos `.md`.
- **Soporte de Sintaxis**: Barra de herramientas para sintaxis común de Markdown (Encabezados, Negrita, Listas, Código, etc.).

## Tecnologías

- **React** + **Vite**
- **Tailwind CSS**
- **React Router**
- **React Markdown**

## Comenzando

1. Clona el repositorio.
2. Instala las dependencias: `npm install`
3. Ejecuta el servidor de desarrollo: `npm run dev`
4. crea un servidor en discord para recibir los mensajes del formulario de contacto.
5. crea un archivo .env con las variables de entorno.
    - VITE_DISCORD_WEBHOOK_URL=tu_url_webhook
6. Abre `http://localhost:5173` en tu navegador.

## Contacto

Para más información, visita la sección "Acerca de" en la aplicación.

## Despliegue

1. Ejecuta el comando `npm run build` para generar los archivos de producción.
2. Sube los archivos generados en la carpeta `dist` a tu servidor.
3. Configura el servidor para servir los archivos de la carpeta `dist`.

## Ir a la aplicación

- https://seemarkdown.vercel.app/