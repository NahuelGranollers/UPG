import React, { memo, useEffect, useState } from 'react';
import { Newspaper, Calendar, User, ExternalLink, Plus, X } from 'lucide-react';
import SafeImage from './SafeImage';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author_name: string;
  created_at: string;
  image_url?: string;
  category: 'announcement' | 'event' | 'update' | 'tournament';
}

const UPGNews: React.FC = () => {
  const { currentUser } = useAuth();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('announcement');

  const fetchNews = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV 
        ? 'http://localhost:3000/api' 
        : 'https://api.unaspartidillas.online/api');
      const res = await fetch(`${API_URL}/news`);
      const data = await res.json();
      setArticles(data);
    } catch (e) {
      console.error('Error fetching news', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV 
        ? 'http://localhost:3000/api' 
        : 'https://api.unaspartidillas.online/api');
      const res = await fetch(`${API_URL}/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, content, excerpt, category })
      });
      const data = await res.json();
      if (data.ok) {
        toast.success('Noticia creada correctamente');
        setShowCreateModal(false);
        setTitle('');
        setContent('');
        setExcerpt('');
        fetchNews();
      } else {
        toast.error(data.error || 'Error creando noticia');
      }
    } catch (e) {
      toast.error('Error de conexión');
    }
  };

  const canCreate = currentUser && (currentUser.role === 'admin' || currentUser.verified);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'announcement': return 'bg-blue-500';
      case 'event': return 'bg-green-500';
      case 'update': return 'bg-purple-500';
      case 'tournament': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'announcement': return 'Anuncio';
      case 'event': return 'Evento';
      case 'update': return 'Actualización';
      case 'tournament': return 'Torneo';
      default: return 'Noticia';
    }
  };

  return (
    <div className="flex-1 bg-discord-chat custom-scrollbar overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <h1 className="text-3xl sm:text-4xl font-black text-discord-text-header mb-4">
            📰 UPG News
          </h1>
          <p className="text-lg text-discord-text-normal max-w-2xl mx-auto">
            Mantente al día con las últimas novedades, anuncios y eventos de la comunidad UPG
          </p>
          
          {canCreate && (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="absolute top-0 right-0 discord-button success flex items-center gap-2"
            >
              <Plus size={16} /> Crear Noticia
            </button>
          )}
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="text-center text-discord-text-muted">Cargando noticias...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map(article => (
              <article
                key={article.id}
                className="discord-card hover:border-discord-blurple/30 transition-colors cursor-pointer group flex flex-col"
              >
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(article.category)}`}
                  >
                    {getCategoryLabel(article.category)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-discord-text-header mb-3 group-hover:text-discord-blurple transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-discord-text-normal mb-4 line-clamp-3 flex-grow">
                  {article.excerpt || article.content.substring(0, 100) + '...'}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-discord-text-muted border-t border-discord-border pt-3 mt-auto">
                  <div className="flex items-center gap-2">
                    <User size={12} />
                    <span className="font-medium">{article.author_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={12} />
                    <span>
                      {new Date(article.created_at).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-discord-surface p-6 rounded-lg w-full max-w-lg border border-discord-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-discord-text-header">Crear Noticia</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-discord-text-muted hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleCreateNews} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-discord-text-muted uppercase mb-1">Título</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="discord-input w-full"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-discord-text-muted uppercase mb-1">Categoría</label>
                  <select 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="discord-input w-full"
                  >
                    <option value="announcement">Anuncio</option>
                    <option value="event">Evento</option>
                    <option value="update">Actualización</option>
                    <option value="tournament">Torneo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-discord-text-muted uppercase mb-1">Resumen (Opcional)</label>
                  <input 
                    type="text" 
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    className="discord-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-discord-text-muted uppercase mb-1">Contenido</label>
                  <textarea 
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="discord-input w-full h-32 resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowCreateModal(false)} className="discord-button secondary">
                    Cancelar
                  </button>
                  <button type="submit" className="discord-button success">
                    Publicar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(UPGNews);
