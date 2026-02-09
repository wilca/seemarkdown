# Plan de Implementación - SeeMarkdown

## Objetivo
Crear "SeeMarkdown", un editor y visualizador de Markdown habilitado para PWA. El sistema cuenta con un editor de doble panel (escritura/vista previa), un visualizador de archivos independiente y una página de aterrizaje. Funciona completamente del lado del cliente utilizando LocalStorage, sin necesidad de backend. Incluye un formulario de contacto que se integra con webhooks de Discord.

## Tecnologías
- **Framework**: React (v18+)
- **Herramienta de Construcción**: Vite
- **Estilos**: Tailwind CSS (para UI moderna y Modo Oscuro) con `@tailwindcss/typography`
- **Enrutamiento**: React Router DOM
- **Markdown**: `react-markdown`, `remark-gfm`
- **Resaltado de Sintaxis**: `react-syntax-highlighter`
- **Iconos**: `lucide-react`
- **PWA**: `vite-plugin-pwa`
- **Estado**: React Context / Hooks (para tema/archivos)

## Arquitectura Propuesta

### Estructura de Directorios
```
seemarkdown/
├── public/              # Activos estáticos
├── src/
│   ├── components/      # Componentes UI reutilizables
│   │   ├── Editor/      # Componentes del editor Markdown
│   │   ├── Viewer/      # Componentes del visualizador Markdown
│   │   ├── Layout/      # Encabezado, Pie de página
│   │   └── UI/          # Botones, Entradas
│   ├── hooks/           # Hooks personalizados (useTheme)
│   ├── pages/           # Páginas de ruta
│   │   ├── Landing.jsx
│   │   ├── EditorPage.jsx
│   │   └── ViewerPage.jsx
│   ├── utils/           # Funciones auxiliares
│   ├── App.jsx          # Componente principal de la aplicación
│   └── main.jsx         # Punto de entrada
├── index.html
├── vite.config.js
└── tailwind.config.js
```

### Detalle de Componentes

#### Página de Aterrizaje (`Landing.jsx`)
- **Hero**: Título, Descripción, CTA para "Comenzar a Escribir" o "Ver Archivo".
- **Características**: Cuadrícula mostrando formatos/características soportadas.
- **Contacto**:
    - Botón de WhatsApp (integración con URL scheme).
    - Formulario (Nombre, Mensaje) -> POST a Webhook de Discord.

#### Editor (`EditorPage.jsx`)
- **Barra de Herramientas**: Botones para H1, H2, Negrita, Cursiva, Enlace, Código, etc.
- **Panel Dividido**: 
    - Izquierda: Área de Texto (Textarea) con soporte básico.
    - Derecha: Markdown renderizado con estilos de tipografía.
- **Controles**: Alternar Vista (Editar|Dividir|Vista Previa), Guardar/Descargar, Limpiar (con SweetAlert2).
- **Persistencia**: Auto-guardado en LocalStorage.

#### Visualizador (`ViewerPage.jsx`)
- **Carga**: Entrada de archivo y zona de Arrastrar y Soltar.
- **Renderizado**: Vista previa de markdown a pantalla completa.
- **Tema**: Alternancia Oscuro/Claro disponible globalmente.

## Plan de Verificación

### Pruebas Manuales
- **Aterrizaje**: Verificar botones de navegación, envío de formulario (webhook real) y enlace de WhatsApp.
- **Editor**:
    - Escribir markdown, verificar actualizaciones de vista previa en tiempo real.
    - Usar botones de la barra de herramientas.
    - Alternar entre modos dividido, solo edición, solo vista previa.
    - Recargar página: El contenido debe persistir.
    - Descargar archivo: Debe descargar `.md`.
    - Botón de Copiar en bloques de código.
- **Visualizador**:
    - Subir un archivo `.md` válido -> verificar contenido.
    - Arrastrar y soltar archivo.
- **PWA**: 
    - Verificar instalación y carga offline.
    - **Nota de Desarrollo**: Para probar la instalación en `npm run dev`, se debe asegurar que `devOptions.enabled` esté en `true` en `vite.config.js`.
    - Generación de iconos mediante `node scripts/generate-icons.js <source-image>`.
- **Tema**: El interruptor cambia los colores correctamente y persiste.
