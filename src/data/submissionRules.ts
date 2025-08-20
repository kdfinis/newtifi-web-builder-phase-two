export interface SubmissionRule {
  id: string;
  category: string;
  title: string;
  content: string;
  order: number;
  isActive: boolean;
  lastUpdated: string;
  pdfUrl?: string;
}

export interface SubmissionRulesCategory {
  id: string;
  name: string;
  description: string;
  rules: SubmissionRule[];
}

export const submissionRulesData: SubmissionRulesCategory[] = [
  {
    id: 'general',
    name: 'General Guidelines',
    description: 'Basic requirements for all submissions',
    rules: [
      {
        id: 'originality',
        category: 'general',
        title: 'Originality Requirement',
        content: 'Articles must be original, unpublished work not submitted elsewhere. All submissions must represent the author\'s own work and must not have been previously published in any form.',
        order: 1,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'word-count',
        category: 'general',
        title: 'Word Count Requirements',
        content: 'Manuscripts should be between 5,000-12,000 words, including abstract, references, and appendices. Shorter submissions may be considered for special sections.',
        order: 2,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'language',
        category: 'general',
        title: 'Language Requirements',
        content: 'All submissions must be in English. Non-native English speakers are encouraged to have their manuscripts professionally edited before submission.',
        order: 3,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'abstract-keywords',
        category: 'general',
        title: 'Abstract and Keywords',
        content: 'Submissions must include an abstract (150-250 words) and keywords (5-10 terms). The abstract should clearly state the research question, methodology, findings, and implications.',
        order: 4,
        isActive: true,
        lastUpdated: '2025-01-15'
      }
    ]
  },
  {
    id: 'formatting',
    name: 'Formatting Requirements',
    description: 'Technical formatting specifications',
    rules: [
      {
        id: 'font-formatting',
        category: 'formatting',
        title: 'Font and Spacing',
        content: 'Use Times New Roman, 12pt font, double-spaced throughout the manuscript. Margins should be 1 inch (2.54 cm) on all sides.',
        order: 1,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'page-numbers',
        category: 'formatting',
        title: 'Page Numbering',
        content: 'Include page numbers and line numbers. Page numbers should be centered at the bottom of each page.',
        order: 2,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'citations',
        category: 'formatting',
        title: 'Citation Format',
        content: 'Use footnotes for citations (not endnotes). Follow the Chicago Manual of Style for citation format. All sources must be properly cited and referenced.',
        order: 3,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'title-page',
        category: 'formatting',
        title: 'Title Page Requirements',
        content: 'Include a title page with author information, institutional affiliation, contact details, and any acknowledgments or funding information.',
        order: 4,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'file-separation',
        category: 'formatting',
        title: 'File Organization',
        content: 'Provide separate files for main text, figures, and tables. All figures and tables should be high resolution and properly labeled.',
        order: 5,
        isActive: true,
        lastUpdated: '2025-01-15'
      }
    ]
  },
  {
    id: 'peer-review',
    name: 'Peer Review Process',
    description: 'Information about the review process',
    rules: [
      {
        id: 'review-type',
        category: 'peer-review',
        title: 'Review Type',
        content: 'All submissions undergo double-blind peer review. Authors and reviewers remain anonymous throughout the process.',
        order: 1,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'review-timeline',
        category: 'peer-review',
        title: 'Review Timeline',
        content: 'Review process typically takes 6-8 weeks. Authors will be notified of the initial decision within this timeframe.',
        order: 2,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'reviewer-selection',
        category: 'peer-review',
        title: 'Reviewer Selection',
        content: 'Reviewers are selected based on expertise in the field and absence of conflicts of interest. We strive to match manuscripts with appropriate specialists.',
        order: 3,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'feedback',
        category: 'peer-review',
        title: 'Feedback and Revisions',
        content: 'Authors receive detailed feedback and revision suggestions. Constructive criticism is provided to help improve the quality of the research.',
        order: 4,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'final-approval',
        category: 'peer-review',
        title: 'Final Approval',
        content: 'Final acceptance is subject to editorial approval. The editorial board makes the final decision on publication.',
        order: 5,
        isActive: true,
        lastUpdated: '2025-01-15'
      }
    ]
  },
  {
    id: 'ethics',
    name: 'Ethical Guidelines',
    description: 'Ethical standards and requirements',
    rules: [
      {
        id: 'conflicts-interest',
        category: 'ethics',
        title: 'Conflicts of Interest',
        content: 'Authors must disclose any conflicts of interest, including financial relationships, institutional affiliations, or personal relationships that could influence the research.',
        order: 1,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'proper-citation',
        category: 'ethics',
        title: 'Proper Citation',
        content: 'All sources must be properly cited and referenced. Plagiarism in any form is strictly prohibited and will result in immediate rejection.',
        order: 2,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'data-transparency',
        category: 'ethics',
        title: 'Data Transparency',
        content: 'Data and methodology must be transparent and reproducible. Authors should be prepared to share data and code upon request.',
        order: 3,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'permissions',
        category: 'ethics',
        title: 'Copyright Permissions',
        content: 'Authors must obtain necessary permissions for copyrighted material, including figures, tables, and extended quotations.',
        order: 4,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'plagiarism',
        category: 'ethics',
        title: 'Plagiarism Policy',
        content: 'Plagiarism and self-plagiarism are strictly prohibited. All submissions are checked using plagiarism detection software.',
        order: 5,
        isActive: true,
        lastUpdated: '2025-01-15'
      }
    ]
  },
  {
    id: 'timeline',
    name: 'Publication Timeline',
    description: 'Expected timelines for publication',
    rules: [
      {
        id: 'initial-review',
        category: 'timeline',
        title: 'Initial Submission Review',
        content: 'Initial submission review: 2-3 weeks. Manuscripts are first reviewed by the editorial team for basic requirements and formatting.',
        order: 1,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'peer-review-process',
        category: 'timeline',
        title: 'Peer Review Process',
        content: 'Peer review process: 6-8 weeks. This includes reviewer selection, review completion, and editorial decision.',
        order: 2,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'revision-period',
        category: 'timeline',
        title: 'Revision Period',
        content: 'Revision period: 4-6 weeks. Authors are given time to address reviewer comments and make necessary revisions.',
        order: 3,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'final-publication',
        category: 'timeline',
        title: 'Final Publication',
        content: 'Final acceptance to publication: 2-4 weeks. This includes final editing, typesetting, and online publication.',
        order: 4,
        isActive: true,
        lastUpdated: '2025-01-15'
      },
      {
        id: 'total-timeline',
        category: 'timeline',
        title: 'Total Timeline',
        content: 'Total timeline: 4-6 months from submission to publication. This timeline may vary depending on the complexity of revisions required.',
        order: 5,
        isActive: true,
        lastUpdated: '2025-01-15'
      }
    ]
  }
];

// Function to generate PDF content from rules
export const generateSubmissionRulesPDF = (): string => {
  let pdfContent = `
    <html>
    <head>
      <style>
        body { font-family: Verdana, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #0A0A23; text-align: center; border-bottom: 2px solid #00C2CB; padding-bottom: 10px; }
        h2 { color: #0A0A23; margin-top: 30px; }
        h3 { color: #00C2CB; margin-top: 20px; }
        .rule { margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-left: 4px solid #00C2CB; }
        .category { margin-bottom: 30px; }
        .footer { margin-top: 50px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <h1>NewTIFI Investment Management Journal</h1>
      <h1>Submission Guidelines</h1>
      <p><strong>Last Updated:</strong> January 15, 2025</p>
              <p><strong>Publisher:</strong> New Technologies & Investment Funds Institute</p>
      <p><strong>ISSN:</strong> XXXX-XXXX</p>
  `;

  submissionRulesData.forEach(category => {
    pdfContent += `
      <div class="category">
        <h2>${category.name}</h2>
        <p><em>${category.description}</em></p>
    `;

    category.rules.forEach(rule => {
      pdfContent += `
        <div class="rule">
          <h3>${rule.title}</h3>
          <p>${rule.content}</p>
        </div>
      `;
    });

    pdfContent += `</div>`;
  });

  pdfContent += `
      <div class="footer">
        <p>For questions about these guidelines, please contact: submissions@newtifi.com</p>
        <p>New Technologies & Investment Funds Institute | Luxembourg</p>
      </div>
    </body>
    </html>
  `;

  return pdfContent;
};

// Function to download rules as PDF
export const downloadSubmissionRulesPDF = () => {
  const content = generateSubmissionRulesPDF();
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'NewTIFI_Submission_Guidelines.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


