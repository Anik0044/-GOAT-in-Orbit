import React, { useState } from 'react';
import WikiHome from './wiki/WikiHome';
import WikiCategory from './wiki/WikiCategory';
import WikiSearch from './wiki/WikiSearch';
import WikiArticle from './wiki/WikiArticle';

export default function WikiSection() {
  // 'home' | 'category' | 'search' | 'article'
  const [wikiView, setWikiView] = useState('home');
  const [activeCategorySlug, setActiveCategorySlug] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const handleSelectCategory = (slug) => {
    setActiveCategorySlug(slug);
    setWikiView('category');
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setWikiView('search');
  };

  const handleSelectArticle = (articleId) => {
    setSelectedArticleId(articleId);
    setWikiView('article');
  };

  const handleBackToHome = () => {
    setWikiView('home');
  };

  return (
    <section id="wiki" className="relative z-10 min-h-screen">
      {wikiView === 'home' && (
        <WikiHome
          onSearchSubmit={handleSearchSubmit}
          onSelectCategory={handleSelectCategory}
          onSelectArticle={handleSelectArticle}
        />
      )}

      {wikiView === 'category' && (
        <WikiCategory
          categorySlug={activeCategorySlug}
          onBack={handleBackToHome}
          onSelectArticle={handleSelectArticle}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {wikiView === 'search' && (
        <WikiSearch
          initialQuery={searchQuery}
          onBack={handleBackToHome}
          onSelectArticle={handleSelectArticle}
        />
      )}

      {wikiView === 'article' && (
        <WikiArticle
          articleId={selectedArticleId}
          onBack={handleBackToHome}
          onSelectArticle={handleSelectArticle}
        />
      )}
    </section>
  );
}
