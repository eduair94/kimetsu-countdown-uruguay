import { Metadata } from 'next';
import { calculateCountdown, formatCountdownText, generateShareText } from '../utils/countdown';
import CountdownTimer from '../components/CountdownTimer';
import ShareButton from '../components/ShareButton';

export async function generateMetadata(): Promise<Metadata> {
  const countdown = calculateCountdown();
  const shareText = generateShareText(countdown);
  const timeText = formatCountdownText(countdown);
  
  const title = countdown.isFinished 
    ? "¡Kimetsu no Yaiba ya disponible en cines!"
    : `Kimetsu no Yaiba - Faltan ${timeText}`;
    
  const description = countdown.isFinished
    ? "¡La película de Kimetsu no Yaiba ya está disponible en cines uruguayos! Ve a disfrutar de la épica aventura de Tanjiro y sus amigos."
    : `Countdown oficial para el estreno de Kimetsu no Yaiba en Uruguay. Faltan ${timeText} para ver la película más esperada del año.`;

  return {
    title,
    description,
    keywords: ['Kimetsu no Yaiba', 'Demon Slayer', 'anime', 'película', 'cine', 'Uruguay', 'estreno', 'countdown'],
    authors: [{ name: 'Kimetsu Countdown' }],
    creator: 'Kimetsu Countdown',
    publisher: 'Kimetsu Countdown',
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_UY',
      siteName: 'Kimetsu no Yaiba Countdown',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Kimetsu no Yaiba Countdown - Estreno en Uruguay',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
      creator: '@KimetsuCountdown',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
    alternates: {
      canonical: 'https://kimetsu-countdown.vercel.app',
    },
    other: {
      'theme-color': '#ff6b6b',
      'msapplication-TileColor': '#ff6b6b',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
    },
  };
}

export default function HomePage() {
  const countdown = calculateCountdown();

  return (
    <>
      <div className="background-overlay"></div>
      
      <div className="container">
        <header className="header">
          <h1 className="title">鬼滅の刃</h1>
          <h2 className="subtitle">Kimetsu no Yaiba</h2>
          <p className="movie-info">Estreno en Uruguay</p>
        </header>

        <CountdownTimer initialCountdown={countdown} />

        <div className="date-info">
          <div className="premiere-date">
            <h3>
              {countdown.isFinished ? '¡Ya está disponible!' : '¡Nos vemos en el cine!'}
            </h3>
            <p className="date">
              {countdown.isFinished ? 'Disfruta la película' : '10 de Septiembre, 2025'}
            </p>
          </div>
        </div>

        <div className="quote-container">
          <blockquote className="quote">
            "La debilidad de una persona puede convertirse en la fortaleza de otra."
            <cite>- Tanjiro Kamado</cite>
          </blockquote>
        </div>

        <ShareButton countdown={countdown} />
      </div>

      {/* JSON-LD for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Kimetsu no Yaiba - Estreno en Uruguay",
            "description": "Estreno de la película Kimetsu no Yaiba en cines uruguayos",
            "startDate": "2025-09-10T00:00:00-03:00",
            "location": {
              "@type": "Country",
              "name": "Uruguay"
            },
            "image": "/og-image.jpg",
            "organizer": {
              "@type": "Organization",
              "name": "Cines Uruguay"
            }
          })
        }}
      />
    </>
  );
}
