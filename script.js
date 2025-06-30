// Configuración del countdown
const premiereDate = new Date('2025-09-10T00:00:00-03:00'); // Hora de Uruguay (UTC-3)

// Elementos del DOM
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Función para actualizar el countdown
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = premiereDate.getTime() - now;

    // Si ya pasó la fecha
    if (timeLeft < 0) {
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        
        // Cambiar el mensaje
        document.querySelector('.premiere-date h3').textContent = '¡Ya está disponible!';
        document.querySelector('.date').textContent = 'Disfruta la película';
        
        return;
    }

    // Calcular días, horas, minutos y segundos
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Actualizar los elementos con formato de dos dígitos
    daysElement.textContent = String(days).padStart(2, '0');
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');

    // Agregar efectos especiales cuando quedan pocos días
    if (days <= 7) {
        document.querySelector('.countdown-card').style.animation = 
            'cardFloat 2s ease-in-out infinite, urgentPulse 1s ease-in-out infinite';
        
        // Agregar clase para efectos de urgencia
        document.body.classList.add('urgent-countdown');
    }

    if (days <= 1) {
        document.querySelector('.title').style.animation += ', finalCountdown 0.5s ease-in-out infinite';
    }
}

// Funciones de efectos visuales
function addUrgentStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes urgentPulse {
            0%, 100% { 
                box-shadow: 
                    0 8px 32px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    0 0 20px rgba(255, 107, 107, 0.4);
            }
            50% { 
                box-shadow: 
                    0 8px 32px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    0 0 40px rgba(255, 107, 107, 0.8);
            }
        }
        
        @keyframes finalCountdown {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        
        .urgent-countdown .number {
            color: #ff6b6b !important;
            text-shadow: 0 0 20px rgba(255, 107, 107, 0.6);
        }
    `;
    document.head.appendChild(style);
}

// Función para mostrar información adicional
function showMovieInfo() {
    console.log('🎬 Kimetsu no Yaiba - Información del Estreno');
    console.log('📅 Fecha: 10 de Septiembre, 2025');
    console.log('🇺🇾 País: Uruguay');
    console.log('⏰ Countdown actualizado cada segundo');
}

// Función para calcular estadísticas del countdown
function getCountdownStats() {
    const now = new Date().getTime();
    const timeLeft = premiereDate.getTime() - now;
    
    if (timeLeft > 0) {
        const totalHours = Math.floor(timeLeft / (1000 * 60 * 60));
        const totalMinutes = Math.floor(timeLeft / (1000 * 60));
        const totalSeconds = Math.floor(timeLeft / 1000);
        
        return {
            totalDays: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
            totalHours: totalHours,
            totalMinutes: totalMinutes,
            totalSeconds: totalSeconds,
            weekends: Math.floor(totalHours / (24 * 7))
        };
    }
    return null;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Agregar estilos de urgencia
    addUrgentStyles();
    
    // Mostrar información inicial
    showMovieInfo();
    
    // Actualizar countdown inmediatamente
    updateCountdown();
    
    // Actualizar cada segundo
    setInterval(updateCountdown, 1000);
    
    // Mostrar estadísticas en consola cada 10 segundos
    setInterval(() => {
        const stats = getCountdownStats();
        if (stats) {
            console.log(`📊 Estadísticas: ${stats.totalDays} días, ${stats.totalHours} horas, ${stats.totalMinutes} minutos restantes`);
        }
    }, 10000);
});

// Función para compartir el countdown (bonus)
function shareCountdown() {
    const stats = getCountdownStats();
    if (stats) {
        const message = `¡Faltan ${stats.totalDays} días para ver Kimetsu no Yaiba en el cine! 🗡️⚡ #KimetsuNoYaiba #Countdown`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Countdown Kimetsu no Yaiba',
                text: message,
                url: window.location.href
            });
        } else {
            // Fallback para navegadores que no soportan Web Share API
            navigator.clipboard.writeText(message).then(() => {
                console.log('📋 Mensaje copiado al portapapeles');
            });
        }
    }
}

// Hacer la función disponible globalmente
window.shareCountdown = shareCountdown;

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activado
        document.body.style.filter = 'hue-rotate(180deg)';
        console.log('🎌 Modo Demon Slayer activado!');
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        konamiCode = [];
    }
});
