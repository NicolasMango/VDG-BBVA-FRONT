# BBVA Front - Sistema de Ofertas Personalizadas

Sistema web desarrollado en React que permite a los usuarios ingresar su DNI y recibir ofertas bancarias personalizadas con una interfaz moderna y animada.

## 🚀 Características

- **Interfaz moderna** con animaciones tipo nova.app
- **Diseño responsive** adaptado a dispositivos móviles
- **Tema corporativo BBVA** con colores oficiales
- **Animaciones fluidas** de fondo y transiciones
- **Sistema de routing** con React Router
- **Ofertas personalizadas** basadas en DNI del usuario
- **Cards dinámicas** con efectos hover y animaciones de entrada

## 🛠️ Tecnologías Utilizadas

- **React** 18.x
- **React Router DOM** para navegación
- **CSS3** con animaciones y gradientes
- **JavaScript ES6+**
- **Vite** como bundler y servidor de desarrollo

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16.0 o superior)
- **npm** (viene incluido con Node.js) o **yarn**
- **Git** para clonar el repositorio

### Verificar instalaciones:

```bash
node --version
npm --version
git --version
```

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd bbva-front
```

### 2. Instalar dependencias

```bash
npm install
```

O si prefieres usar yarn:

```bash
yarn install
```

### 3. Configurar el proyecto

El proyecto incluye las siguientes dependencias principales:

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0"
}
```

## 🚀 Ejecución

### Modo desarrollo

```bash
npm run dev
```

O con yarn:

```bash
yarn dev
```

El servidor se iniciará en `http://localhost:5173`

### Modo producción

```bash
# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
bbva-front/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── tarjeta.png
│   │   └── moneda.png
│   ├── components/
│   ├── App.jsx          # Página principal con landing
│   ├── Login.jsx        # Formulario de ingreso DNI
│   ├── Oferta.jsx       # Página de ofertas personalizadas
│   ├── main.jsx         # Punto de entrada
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Funcionalidades

### 1. Página Principal (App.jsx)
- Landing page con diseño corporativo BBVA
- Navegación hacia el formulario de login
- Animaciones de fondo y elementos flotantes
- Diseño responsive

### 2. Login (Login.jsx)
- Formulario para ingreso de DNI
- Validación de formato de DNI argentino
- Almacenamiento en sessionStorage
- Redirección automática a ofertas

### 3. Ofertas (Oferta.jsx)
- Carga dinámica de ofertas desde API
- Animaciones de fondo tipo nova.app
- Cards con tema oscuro y efectos hover
- Sistema de loading con animaciones

## 🔌 API Integration

El proyecto está configurado para consumir una API REST:

```javascript
// Endpoint para obtener ofertas
GET /api/oferta/${dni}

// Respuesta esperada:
{
  "ofertas_generadas": [
    {
      "titulo": "Título de la oferta",
      "cuerpo": "Descripción detallada",
      "motivo_interno": "Razón de la oferta",
      "score_confianza": 8,
      "cta": "Texto del botón"
    }
  ]
}
```

### Configurar Backend Local

Si tienes un backend local, asegúrate de que esté corriendo en el puerto correspondiente y configura el proxy en `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

## 🎨 Personalización

### Colores Corporativos

Los colores están definidos en las variables CSS:

```css
:root {
  --bbva-blue-dark: #004481;
  --bbva-blue-medium: #1464A0;
  --bbva-blue-light: #5BBAD5;
  --bbva-blue-accent: #85C8FF;
}
```

### Fuentes

El proyecto utiliza:
- **DM Serif Display** para títulos
- **Roboto** para texto general
- **Source Sans Pro** en la página principal

## 🐛 Solución de Problemas

### Error: Cannot find module

```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto en uso

```bash
# Cambiar puerto en vite.config.js
export default defineConfig({
  server: {
    port: 3001
  }
})
```

### Problemas de CORS

Asegúrate de que tu backend tenga configurado CORS para el dominio del frontend.

## 📱 Responsive Design

El proyecto está optimizado para:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🚀 Deploy

### Netlify

```bash
npm run build
# Subir carpeta dist/ a Netlify
```

### Vercel

```bash
npm i -g vercel
vercel --prod
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 📞 Contacto

- **Proyecto**: BBVA Front
- **Repositorio**: [GitHub Link]
- **Issues**: [GitHub Issues]

---

### 🎉 ¡Listo para usar!

Una vez completados estos pasos, tendrás el proyecto corriendo localmente y listo para desarrollo o producción.