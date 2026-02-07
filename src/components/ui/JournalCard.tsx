// JournalCard - Consistent journal display component
import React from 'react';
import { BookOpen, Users, Calendar, Award, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { configManager } from '@/lib/config/ConfigManager';
import { Journal, JournalWithStats } from '@/lib/services/JournalService';

interface JournalCardProps {
  journal: Journal | JournalWithStats;
  variant?: 'default' | 'featured' | 'compact';
  showIssn?: boolean;
  showPublisher?: boolean;
  showFrequency?: boolean;
  showPeerReview?: boolean;
  onClick?: (journal: Journal) => void;
  className?: string;
}

const JournalCard: React.FC<JournalCardProps> = ({
  journal,
  variant = 'default',
  showIssn = true,
  showPublisher = true,
  showFrequency = true,
  showPeerReview = true,
  onClick,
  className
}) => {
  const uiConfig = configManager.getComponentConfig('JournalCard');
  
  const getVariantClasses = () => {
    const baseClasses = uiConfig.baseClasses || 'bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200';
    const titleClasses = uiConfig.titleClasses || 'text-xl font-light uppercase tracking-wide text-gray-900 mb-2';
    const descriptionClasses = uiConfig.descriptionClasses || 'text-gray-600 text-sm leading-relaxed';
    
    switch (variant) {
      case 'featured':
        return {
          container: `${baseClasses} border border-gray-200 bg-gradient-to-br from-blue-50 to-white`,
          title: `${titleClasses} text-2xl`,
          description: `${descriptionClasses} text-base`
        };
      case 'compact':
        return {
          container: `${baseClasses} p-4`,
          title: `${titleClasses} text-lg`,
          description: `${descriptionClasses} text-xs`
        };
      default:
        return {
          container: baseClasses,
          title: titleClasses,
          description: descriptionClasses
        };
    }
  };

  const classes = getVariantClasses();
  const stats = 'stats' in journal ? journal.stats : null;

  const handleClick = () => {
    onClick?.(journal);
  };

  const getFrequencyDisplay = (frequency: string) => {
    const frequencyMap: Record<string, string> = {
      'monthly': 'Monthly',
      'quarterly': 'Quarterly',
      'bi-annual': 'Bi-annual',
      'annual': 'Annual'
    };
    return frequencyMap[frequency] || frequency;
  };

  const getPeerReviewDisplay = (peerReview: string) => {
    const peerReviewMap: Record<string, string> = {
      'single-blind': 'Single-blind peer review',
      'double-blind': 'Double-blind peer review',
      'open': 'Open peer review'
    };
    return peerReviewMap[peerReview] || peerReview;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
      aria-label={`View journal: ${journal.name}`}
    >
      {/* Status Badge */}
      <div className="mb-3 flex items-center gap-2">
        <span className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          getStatusColor(journal.status)
        )}>
          {journal.status.charAt(0).toUpperCase() + journal.status.slice(1)}
        </span>
        {journal.featured && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Award className="w-3 h-3 mr-1" />
            Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className={cn(classes.title, 'mb-3')}>
        {journal.name}
      </h3>

      {/* Publisher */}
      {showPublisher && (
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <BookOpen className="w-4 h-4" />
          <span>{journal.publisher}</span>
          {journal.publisherLocation && (
            <span className="text-gray-400">• {journal.publisherLocation}</span>
          )}
        </div>
      )}

      {/* ISSN */}
      {showIssn && (
        <div className="text-sm text-gray-500 mb-2">
          <span className="font-medium">ISSN:</span> {journal.issn}
        </div>
      )}

      {/* Frequency */}
      {showFrequency && (
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{getFrequencyDisplay(journal.frequency)}</span>
        </div>
      )}

      {/* Peer Review */}
      {showPeerReview && (
        <div className="text-sm text-gray-600 mb-3">
          {getPeerReviewDisplay(journal.peerReview)}
        </div>
      )}

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-light uppercase tracking-wide text-gray-900">{stats.totalArticles}</div>
            <div className="text-xs text-gray-600">Articles</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-light uppercase tracking-wide text-gray-900">{stats.featuredArticles}</div>
            <div className="text-xs text-gray-600">Featured</div>
          </div>
        </div>
      )}

      {/* Categories */}
      {journal.categories.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Categories:</div>
          <div className="flex flex-wrap gap-1">
            {journal.categories.slice(0, 3).map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800"
              >
                {category}
              </span>
            ))}
            {journal.categories.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                +{journal.categories.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Editorial Board Preview */}
      {journal.editorialBoard.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Editorial Board:</div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{journal.editorialBoard.length} members</span>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleClick}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="View journal details"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Journal</span>
        </button>
        
        {stats && stats.latestArticle && (
          <div className="text-xs text-gray-500">
            Latest: {new Date(stats.latestArticle.publishedDate).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalCard;
