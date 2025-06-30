#!/bin/bash

echo "🗡️ Instalando Kimetsu no Yaiba Countdown..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    echo "👉 https://nodejs.org/"
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instala npm primero."
    exit 1
fi

echo "✅ Node.js y npm encontrados"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error instalando dependencias"
    exit 1
fi

# Verificar si todo está listo
echo "🔍 Verificando instalación..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build exitoso"
    echo ""
    echo "🎉 ¡Instalación completada!"
    echo ""
    echo "📋 Comandos disponibles:"
    echo "  npm run dev     - Ejecutar en modo desarrollo"
    echo "  npm run build   - Build para producción"
    echo "  npm run start   - Ejecutar en producción"
    echo "  vercel          - Deploy en Vercel"
    echo ""
    echo "🚀 Para empezar en desarrollo:"
    echo "  npm run dev"
    echo ""
    echo "🌐 La aplicación estará disponible en http://localhost:3000"
else
    echo "❌ Error en el build"
    echo "🔧 Revisa los errores arriba y vuelve a intentar"
    exit 1
fi
