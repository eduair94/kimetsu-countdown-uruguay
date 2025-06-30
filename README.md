# 🗡️ Kimetsu no Yaiba Countdown

Una hermosa aplicación de cuenta regresiva para el estreno de Kimetsu no Yaiba en Uruguay el 10 de septiembre de 2025.

## ✨ Características

- 🎯 **Countdown en tiempo real** - Actualización cada segundo
- 🎨 **Diseño temático** - Inspirado en el anime con efectos visuales impresionantes
- 📱 **Responsive** - Optimizado para todos los dispositivos
- 🚀 **Server-Side Rendering** - Compatible con Vercel y optimizado para SEO
- 📊 **Meta tags dinámicas** - Embeddings hermosos en redes sociales
- 🔗 **Función de compartir** - Comparte el countdown fácilmente
- ⚡ **Efectos especiales** - Animaciones de urgencia cuando quedan pocos días

## 🛠️ Tecnologías

- **Next.js 14** - Framework React con SSR
- **TypeScript** - Para un código más robusto
- **CSS Modules** - Estilos modernos con animaciones
- **Vercel** - Deployment optimizado

## 🚀 Deployment en Vercel

### Opción 1: Deploy directo desde GitHub

1. Sube el código a tu repositorio de GitHub
2. Ve a [Vercel](https://vercel.com)
3. Conecta tu repositorio
4. Vercel detectará automáticamente que es un proyecto Next.js
5. ¡Deploy automático!

### Opción 2: Deploy desde línea de comandos

```bash
# Instalar dependencias
npm install

# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Para production
vercel --prod
```

## 📦 Instalación Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar producción
npm start
```

## 🎨 Características de SEO

- **Meta tags dinámicas** - Títulos y descripciones que cambian según el tiempo restante
- **Open Graph** - Previews hermosos en redes sociales
- **Twitter Cards** - Optimizado para Twitter
- **JSON-LD** - Structured data para Google
- **Sitemap** - Generado automáticamente
- **Robots.txt** - Configurado para mejor indexación

## 🔧 Configuración

### Variables de entorno (opcionales)

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
NEXT_PUBLIC_GOOGLE_VERIFICATION=tu-codigo-de-verificacion
```

### Personalización

Para cambiar la fecha del estreno, edita `utils/countdown.ts`:

```typescript
const premiereDate = new Date('2025-09-10T00:00:00-03:00'); // Cambia esta fecha
```

## 📱 PWA Support

La aplicación está configurada como Progressive Web App:

- **Manifest** - Instalable en dispositivos móviles
- **Icons** - Iconos optimizados para diferentes tamaños
- **Offline** - Funciona sin conexión una vez cargada

## 🎯 API Endpoints

### `/api/countdown`

Retorna información actualizada del countdown:

```json
{
  "countdown": {
    "days": 73,
    "hours": 15,
    "minutes": 42,
    "seconds": 18,
    "totalSeconds": 6359538,
    "isFinished": false
  },
  "timeText": "73 días, 15 horas y 42 minutos",
  "shareText": "¡Faltan 73 días, 15 horas y 42 minutos para ver Kimetsu no Yaiba en cines uruguayos! 🗡️⚡",
  "premiereDate": "2025-09-10T00:00:00-03:00",
  "timezone": "America/Montevideo",
  "isFinished": false,
  "timestamp": "2025-06-29T..."
}
```

## 🎨 Efectos Especiales

- **Animaciones de urgencia** - Cuando quedan ≤ 7 días
- **Countdown final** - Efectos especiales cuando queda ≤ 1 día
- **Gradientes animados** - En títulos y números
- **Efectos de cristal** - Backdrop blur en tarjetas
- **Floating animation** - Tarjetas flotantes suaves

## 🔧 Troubleshooting

### Error de TypeScript

Si ves errores de TypeScript, instala las dependencias:

```bash
npm install
```

### Problemas de fonts

Las fuentes se cargan desde Google Fonts. Si hay problemas de carga:

1. Verifica la conexión a internet
2. Revisa que las URLs de las fuentes sean correctas
3. Considera usar fuentes locales como fallback

### Problemas de timezone

El countdown está configurado para timezone de Uruguay (UTC-3). Si necesitas otro:

```typescript
// En utils/countdown.ts
const premiereDate = new Date('2025-09-10T00:00:00-03:00');
// Cambia -03:00 por tu timezone
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**¡Disfruta el countdown hacia la épica película de Kimetsu no Yaiba! 🗡️⚡**
