import React, { memo } from 'react';
import { Newspaper, Calendar, User, ExternalLink } from 'lucide-react';
import SafeImage from './SafeImage';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  category: 'announcement' | 'event' | 'update' | 'tournament';
  readTime?: number;
}

const UPGNews: React.FC = () => {
  const articles: NewsArticle[] = [
    {
      id: '1',
      title: 'Nuevo Sistema de Moderación',
      excerpt:
        'Implementamos un panel de administración avanzado para mantener la comunidad segura.',
      author: 'AdminZero',
      date: '2025-11-24',
      category: 'update',
      readTime: 2,
    },
    {
      id: '2',
      title: 'Torneo Valorant - Diciembre',
      excerpt:
        '¡Prepárense! El torneo mensual de Valorant comienza el 1 de diciembre con premios de $500.',
      author: 'ModLuna',
      date: '2025-11-23',
      category: 'tournament',
      readTime: 3,
    },
    {
      id: '3',
      title: 'Modo Troll Activado',
      excerpt:
        'Nueva función experimental: transforma mensajes de usuarios objetivo. ¡Solo para admins!',
      author: 'DevKai',
      date: '2025-11-22',
      category: 'announcement',
      readTime: 1,
    },
    {
      id: '4',
      title: 'Evento Comunidad - Game Night',
      excerpt:
        'Únete a nuestra game night semanal este viernes. Juegos variados para todos los niveles.',
      author: 'ComMgr',
      date: '2025-11-21',
      category: 'event',
      readTime: 2,
    },
    {
      id: '5',
      title: 'Actualización de Voz en Tiempo Real',
      excerpt:
        'Mejoramos la calidad de audio y añadimos indicadores de latencia en canales de voz.',
      author: 'DevKai',
      date: '2025-11-20',
      category: 'update',
      readTime: 2,
    },
  ];

  const getCategoryColor = (category: NewsArticle['category']) => {
    switch (category) {
      case 'announcement':
        return 'bg-blue-500';
      case 'event':
        return 'bg-green-500';
      case 'update':
        return 'bg-purple-500';
      case 'tournament':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryLabel = (category: NewsArticle['category']) => {
    switch (category) {
      case 'announcement':
        return 'Anuncio';
      case 'event':
        return 'Evento';
      case 'update':
        return 'Actualización';
      case 'tournament':
        return 'Torneo';
      default:
        return 'Noticia';
    }
  };

  return (
    <div className="flex-1 bg-discord-chat custom-scrollbar">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-discord-text-header mb-4">
            📰 UPG News
          </h1>
          <p className="text-lg text-discord-text-normal max-w-2xl mx-auto">
            Mantente al día con las últimas novedades, anuncios y eventos de la comunidad UPG
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map(article => (
            <article
              key={article.id}
              className="discord-card hover:border-discord-blurple/30 transition-colors cursor-pointer group"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(article.category)}`}
                >
                  {getCategoryLabel(article.category)}
                </span>
                {article.readTime && (
                  <span className="text-xs text-discord-text-muted flex items-center gap-1">
                    <User size={10} />
                    {article.readTime}min de lectura
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-discord-text-header mb-3 group-hover:text-discord-blurple transition-colors line-clamp-2">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-discord-text-normal mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-discord-text-muted border-t border-discord-border pt-3">
                <div className="flex items-center gap-2">
                  <User size={12} />
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={12} />
                  <span>
                    {new Date(article.date).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Read More Link */}
              <div className="mt-4">
                <button className="flex items-center gap-2 text-sm text-discord-blurple hover:text-discord-blurple-hover transition-colors font-medium">
                  <span>Leer artículo completo</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="discord-button secondary px-8 py-3">Cargar más noticias</button>
        </div>
      </div>
    </div>
  );
};

export default memo(UPGNews);
