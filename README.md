# 🚀 Portafolio Web Moderno - Template para GitHub Pages

Un template de portafolio profesional, moderno, ultra rápido y listo para desplegar inmediatamente en **GitHub Pages** sin necesidad de Node.js, Webpack, npm ni pasos complejos de compilación.

---

## ⚡ ¿Cómo desplegar en GitHub Pages? (1 Minuto)

Este proyecto está configurado para que simplemente haciendo **`git push`** a tu repositorio esté disponible en internet de inmediato.

### Paso 1: Subir tus cambios a GitHub
Abre la terminal en esta carpeta y ejecuta:
```bash
git add .
git commit -m "Mi portafolio listo para GitHub Pages"
git push origin main
```

### Paso 2: Verificar la configuración en GitHub
1. Ve a tu repositorio en GitHub: `https://github.com/Motya03/mateo.github.io`
2. Haz clic en **Settings** (Configuración) > **Pages** (en el menú lateral izquierdo).
3. En **Build and deployment**:
   - **Source**: Selecciona **Deploy from a branch**.
   - **Branch**: Selecciona **`main`** y la carpeta **`/(root)`**.
   - Haz clic en **Save**.
4. ¡Listo! En 1 a 2 minutos tu portafolio estará visible públicamente en:
   👉 **`https://Motya03.github.io`** (o `https://mateo.github.io`)

> **Nota:** También se incluye el flujo automático oficial en `.github/workflows/deploy.yml`, por lo que si prefieres la opción **GitHub Actions** en GitHub Pages, funcionará de manera automática y transparente.

---

## 📁 Estructura del Proyecto

```text
mateo.github.io/
├── index.html              <-- Página principal (se sirve directamente en la raíz)
├── favicon.ico             <-- Icono de la pestaña del navegador
├── .nojekyll               <-- Instruye a GitHub Pages a servir archivos estáticos sin Jekyll
├── .github/
│   └── workflows/
│       └── deploy.yml      <-- Flujo oficial de despliegue continuo de GitHub Pages
├── assets/
│   ├── css/
│   │   └── style.css       <-- Estilos modernos, temas oscuro/claro y diseño responsivo
│   ├── js/
│   │   └── main.js         <-- Interactividad vanilla (modo oscuro, filtros, modales, etc.)
│   └── img/
│       ├── avatar.png      <-- Tu foto de perfil
│       ├── avatar-og.png   <-- Imagen para compartir en redes sociales (Open Graph)
│       └── projects/       <-- Iconos e imágenes de tus proyectos
└── README.md               <-- Esta guía
```

---

## 🛠️ Cómo Personalizar tu Portafolio

Toda la personalización se realiza directamente en el archivo [`index.html`](index.html):

### 1. Tu Información y Foto de Perfil
- **Nombre y Título**: Edita las líneas en la sección `#hero` (ej. busca `Mateo`).
- **Foto de perfil**: Puedes sustituir el archivo `assets/img/avatar.png` por tu propia foto con el mismo nombre, o cambiar la ruta `<img src="assets/img/avatar.png">`.
- **Bio y Sobre Mí**: Edita los párrafos dentro de la sección `<section id="about">`.

### 2. Tus Proyectos
Dentro de `<section id="projects">`:
- Cambia los títulos, descripciones y etiquetas tecnológicas (`React`, `Node.js`, etc.).
- Coloca las imágenes o capturas de tus proyectos en `assets/img/projects/`.
- Actualiza los enlaces a la demo (`href="..."`) y al repositorio en GitHub.
- Los detalles extendidos de la ventana modal se configuran en `assets/js/main.js` dentro del objeto `projectsData`.

### 3. Tus Redes Sociales y Correo
- En la sección `#hero` y `#contact`, reemplaza los enlaces:
  - GitHub: `https://github.com/Motya03`
  - LinkedIn: `https://linkedin.com/in/tu-perfil`
  - Correo: `shestpro@gmail.com`
  - El botón **"Copiar Correo"** copia automáticamente la dirección configurada al portapapeles con confirmación visual.

---

## ✨ Características Incluidas

- 🌓 **Modo Oscuro / Modo Claro:** Detección automática de preferencia del sistema y guardado de elección en `localStorage`.
- 📱 **100% Responsivo:** Adaptado a pantallas móviles, tablets y monitores de alta resolución.
- ⚡ **0 Dependencias / Cero Build:** Sin `npm install` ni paquetes pesados. Carga al instante con calificación 100 en Google Lighthouse.
- 🎨 **Diseño Moderno 2026:** Efectos de cristal esmerilado (glassmorphism), gradientes sutiles y micro-interacciones suaves.
- 🔍 **Filtro de Proyectos & Habilidades:** Categorización interactiva en tiempo real.
- 🪟 **Modal de Detalles:** Vista emergente para describir en profundidad cada proyecto.
- 📋 **Copiado al Portapapeles:** Copia de correo con notificación toast flotante.
- 🔝 **Botón Volver Arriba:** Aparece suavemente al hacer scroll hacia abajo.

---

## 💻 Probar Localmente

Simplemente haz doble clic en el archivo [`index.html`](index.html) para abrirlo en cualquier navegador (Chrome, Edge, Firefox, Safari) o usa la extensión **Live Server** de VS Code.
