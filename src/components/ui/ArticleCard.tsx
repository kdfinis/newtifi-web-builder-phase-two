// ArticleCard - Consistent article display component
import React from 'react';
import { Clock, User, Calendar, FileText, Download, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { configManager } from '@/lib/config/ConfigManager';
import { Article } from '@/lib/services/ArticleService';
import { formatDate } from '@/lib/dateUtils';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact' | 'minimal';
  showAuthor?: boolean;
  showDate?: boolean;
  showCategory?: boolean;
  showReadingTime?: boolean;
  onClick?: (article: Article) => void;
  onDownload?: (article: Article) => void;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'default',
  showAuthor = true,
  showDate = true,
  showCategory = true,
  showReadingTime = true,
  onClick,
  onDownload,
  className
}) => {
  const uiConfig = configManager.getComponentConfig('ArticleCard');
  
  const getVariantClasses = () => {
    const baseClasses = uiConfig.baseClasses || 'bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200';
    const titleClasses = uiConfig.titleClasses || 'text-xl font-light uppercase tracking-wide text-gray-900 mb-2';
    const abstractClasses = uiConfig.abstractClasses || 'text-gray-600 text-sm leading-relaxed';
    
    switch (variant) {
      case 'featured':
        return {
          container: `${baseClasses} border border-gray-200 bg-gradient-to-br from-blue-50 to-white`,
          title: `${titleClasses} text-2xl`,
          abstract: `${abstractClasses} text-base`
        };
      case 'compact':
        return {
          container: `${baseClasses} p-4`,
          title: `${titleClasses} text-lg`,
          abstract: `${abstractClasses} text-xs line-clamp-2`
        };
      case 'minimal':
        return {
          container: `${baseClasses} shadow-sm border border-gray-100`,
          title: `${titleClasses} text-lg`,
          abstract: `${abstractClasses} text-sm`
        };
      default:
        return {
          container: baseClasses,
          title: titleClasses,
          abstract: abstractClasses
        };
    }
  };

  const classes = getVariantClasses();
  const maxTitleLength = uiConfig.maxTitleLength || 100;
  const maxAbstractLength = uiConfig.maxAbstractLength || 200;

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const handleClick = () => {
    onClick?.(article);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload?.(article);
  };

  return (
    <div
      className={cn(classes.container, 'p-6 cursor-pointer', className)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Read article: ${article.title}`}
    >
      {/* Category Badge */}
      {showCategory && (
        <div className="mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {article.metadata.category}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className={cn(classes.title, 'line-clamp-2')}>
        {truncateText(article.title, maxTitleLength)}
      </h3>

      {/* Author */}
      {showAuthor && (
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>{article.author.name}</span>
        </div>
      )}

      {/* Abstract */}
      <p className={cn(classes.abstract, 'line-clamp-3 mb-4')}>
        {truncateText(article.content.abstract, maxAbstractLength)}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          {showDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.publishedDate).display}</span>
            </div>
          )}
          {showReadingTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.metadata.readingTime} min read</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleClick}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Read article"
          >
            <FileText className="w-4 h-4" />
            <span>Read</span>
          </button>
          {onDownload && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Download PDF"
            >
              <Download className="w-4 h-4" />
              <span>PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Tags */}
      {article.metadata.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1">
          {article.metadata.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
            >
              {tag}
            </span>
          ))}
          {article.metadata.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
              +{article.metadata.tags.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
