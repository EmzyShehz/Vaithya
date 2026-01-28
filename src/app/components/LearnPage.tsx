import React, { useState } from 'react';
import { Search, Clock, BookmarkPlus, Bookmark } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  image: string;
  isBookmarked?: boolean;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Understanding Your Cholesterol Levels',
    description: 'Learn about HDL, LDL, and total cholesterol, and what your numbers really mean for heart health.',
    category: 'Biomarkers',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1477358969844-4cd7baf5ab2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwaGVhcnQlMjBudXRyaXRpb258ZW58MXx8fHwxNzY4NzQxNTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '2',
    title: 'The Complete Guide to Blood Tests',
    description: 'Everything you need to know about common blood tests, how to prepare, and interpreting your results.',
    category: 'Tests',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1656337426914-5e5ba162d606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHRlc3QlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc2ODY0MTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '3',
    title: 'Vitamin D: The Sunshine Vitamin',
    description: 'Discover why vitamin D is crucial for bone health, immune function, and mood regulation.',
    category: 'Nutrition',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzY4NjY1MjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '4',
    title: 'How Sleep Affects Your Blood Sugar',
    description: 'The surprising connection between sleep quality and glucose metabolism, plus tips for better rest.',
    category: 'Lifestyle',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1666934209593-25b6aa02ab4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlcCUyMGhlYWx0aCUyMHdlbGxuZXNzfGVufDF8fHx8MTc2ODc0MTUyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '5',
    title: 'Thyroid Function: TSH and Beyond',
    description: 'Understanding thyroid hormones and their impact on metabolism, energy, and overall health.',
    category: 'Biomarkers',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzY4NzQxNTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '6',
    title: 'Exercise and Inflammation Markers',
    description: 'How physical activity influences CRP and other inflammation biomarkers in your blood work.',
    category: 'Lifestyle',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1634144646738-809a0f8897c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbGlmZXN0eWxlJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzY4NjM2Nzc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '7',
    title: 'Decoding Your Liver Function Tests',
    description: 'What ALT, AST, and other liver enzymes reveal about your liver health and what to do if they\'re elevated.',
    category: 'Biomarkers',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1656337426914-5e5ba162d606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHRlc3QlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc2ODY0MTE3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '8',
    title: 'Omega-3s and Heart Health',
    description: 'The science behind omega-3 fatty acids and their role in cardiovascular disease prevention.',
    category: 'Nutrition',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1477358969844-4cd7baf5ab2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwaGVhcnQlMjBudXRyaXRpb258ZW58MXx8fHwxNzY4NzQxNTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '9',
    title: 'Blood Pressure: What the Numbers Mean',
    description: 'Understanding systolic and diastolic pressure, and lifestyle changes to improve your readings.',
    category: 'Biomarkers',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzY4NzQxNTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '10',
    title: 'Iron Deficiency: Signs and Solutions',
    description: 'Recognizing the symptoms of low iron and how to boost your levels through diet and supplements.',
    category: 'Nutrition',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzY4NjY1MjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

const categories = ['All', 'Biomarkers', 'Tests', 'Nutrition', 'Lifestyle'];

export function LearnPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set());

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#59b559] focus:border-transparent text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 pb-2 bg-slate-100 rounded-xl p-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-[#337e51] text-white'
                    : 'bg-transparent text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <p className="text-sm text-slate-600 mb-4">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} found
          </p>
        )}

        {/* Articles Feed */}
        <div className="space-y-4">
          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-3xl px-4 py-12 shadow-sm text-center">
              <p className="text-slate-500">No articles found. Try a different search.</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 hover:border-[#337e51]"
              >
                {/* Article Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-medium text-slate-700 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(article.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    {bookmarkedArticles.has(article.id) ? (
                      <Bookmark className="w-4 h-4 text-[#59b559] fill-[#59b559]" />
                    ) : (
                      <BookmarkPlus className="w-4 h-4 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* Article Content */}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{article.description}</p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{article.readTime}</span>
                    </div>
                    <button className="text-[#59b559] text-sm font-medium hover:underline">
                      Read article →
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Bookmarked Section - shown when there are bookmarks */}
        {bookmarkedArticles.size > 0 && selectedCategory === 'All' && !searchQuery && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#59b559]" />
              Bookmarked Articles
            </h2>
            <div className="space-y-3">
              {articles
                .filter((article) => bookmarkedArticles.has(article.id))
                .map((article) => (
                  <div
                    key={`bookmarked-${article.id}`}
                    className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-900 text-sm line-clamp-1 mb-1">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-500">{article.readTime}</p>
                    </div>
                    <button
                      onClick={() => toggleBookmark(article.id)}
                      className="p-2 hover:bg-slate-50 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Bookmark className="w-4 h-4 text-[#59b559] fill-[#59b559]" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}