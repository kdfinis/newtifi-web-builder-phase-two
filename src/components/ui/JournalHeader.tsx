// JournalHeader - Consistent journal header component
import React from 'react';
import { BookOpen, Users, Calendar, Award, Globe, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { configManager } from '@/lib/config/ConfigManager';
import { Journal, JournalWithStats } from '@/lib/services/JournalService';

interface JournalHeaderProps {
  journal: Journal | JournalWithStats;
  showIssn?: boolean;
  showPublisher?: boolean;
  showFrequency?: boolean;
  showPeerReview?: boolean;
  className?: string;
}

const JournalHeader: React.FC<JournalHeaderProps> = ({
  journal,
  showIssn = true,
  showPublisher = true,
  showFrequency = true,
  showPeerReview = true,
  className
}) => {
  const uiConfig = configManager.getComponentConfig('JournalHeader');
  
  const baseClasses = uiConfig.baseClasses || 'bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg';
  const titleClasses = uiConfig.titleClasses || 'text-3xl font-bold mb-2';
  const descriptionClasses = uiConfig.descriptionClasses || 'text-blue-100 text-lg';
  
  const stats = 'stats' in journal ? journal.stats : null;

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

  const getStatusDisplay = (status: string) => {
    const statusMap: Record<string, string> = {
      'active': 'Active',
      'planned': 'Planned',
      'inactive': 'Inactive',
      'archived': 'Archived'
    };
    return statusMap[status] || status;
  };

  return (
    <div className={cn(baseClasses, className)}>
      <div className="max-w-6xl mx-auto">
        {/* Status and Featured Badges */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
            {getStatusDisplay(journal.status)}
          </span>
          {journal.featured && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-400/20 text-yellow-100">
              <Award className="w-4 h-4 mr-1" />
              Featured Journal
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className={cn(titleClasses, 'mb-4')}>
          {journal.name}
        </h1>

        {/* Publisher and Location */}
        {showPublisher && (
          <div className="flex items-center gap-2 mb-4 text-blue-100">
            <BookOpen className="w-5 h-5" />
            <span className="text-lg">{journal.publisher}</span>
            {journal.publisherLocation && (
              <span className="text-blue-200">• {journal.publisherLocation}</span>
            )}
          </div>
        )}

        {/* ISSN */}
        {showIssn && (
          <div className="text-blue-100 mb-4">
            <span className="font-medium">ISSN:</span> {journal.issn}
          </div>
        )}

        {/* Frequency and Peer Review */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {showFrequency && (
            <div className="flex items-center gap-2 text-blue-100">
              <Calendar className="w-5 h-5" />
              <span>{getFrequencyDisplay(journal.frequency)} Publication</span>
            </div>
          )}
          {showPeerReview && (
            <div className="flex items-center gap-2 text-blue-100">
              <Award className="w-5 h-5" />
              <span>{getPeerReviewDisplay(journal.peerReview)}</span>
            </div>
          )}
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.totalArticles}</div>
              <div className="text-blue-100 text-sm">Total Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.featuredArticles}</div>
              <div className="text-blue-100 text-sm">Featured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.categories.length}</div>
              <div className="text-blue-100 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{Math.round(stats.averageReadingTime)}</div>
              <div className="text-blue-100 text-sm">Avg. Read Time</div>
            </div>
          </div>
        )}

        {/* Categories */}
        {journal.categories.length > 0 && (
          <div className="mb-6">
            <div className="text-blue-100 font-medium mb-2">Research Areas:</div>
            <div className="flex flex-wrap gap-2">
              {journal.categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/20 text-white"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Editorial Board Preview */}
        {journal.editorialBoard.length > 0 && (
          <div className="mb-6">
            <div className="text-blue-100 font-medium mb-2">Editorial Board:</div>
            <div className="flex items-center gap-4 text-blue-100">
              <Users className="w-5 h-5" />
              <span>{journal.editorialBoard.length} members</span>
              <span className="text-blue-200">•</span>
              <span>Led by {journal.editorialBoard[0]?.name || 'Editorial Board'}</span>
            </div>
          </div>
        )}

        {/* Archiving Information */}
        {journal.archiving.length > 0 && (
          <div className="mb-6">
            <div className="text-blue-100 font-medium mb-2">Digital Preservation:</div>
            <div className="flex items-center gap-2 text-blue-100">
              <Globe className="w-5 h-5" />
              <span>Preserved through {journal.archiving.join(', ')}</span>
            </div>
          </div>
        )}

        {/* Article Types */}
        {journal.articleTypes.length > 0 && (
          <div className="mb-6">
            <div className="text-blue-100 font-medium mb-2">Accepts:</div>
            <div className="flex flex-wrap gap-2">
              {journal.articleTypes.map((type, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/20 text-white"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Latest Article */}
        {stats && stats.latestArticle && (
          <div className="border-t border-blue-400/30 pt-4">
            <div className="text-blue-100 font-medium mb-2">Latest Article:</div>
            <div className="text-white">
              <div className="font-medium">{stats.latestArticle.title}</div>
              <div className="text-blue-100 text-sm">
                by {stats.latestArticle.author.name} • {new Date(stats.latestArticle.publishedDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalHeader;
