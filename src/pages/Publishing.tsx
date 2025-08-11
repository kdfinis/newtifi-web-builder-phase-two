import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { BookOpen, FileText, Download, Upload, AlertCircle, CheckCircle, ChevronRight, ExternalLink } from 'lucide-react';
import { submissionRulesData, downloadSubmissionRulesPDF } from '@/data/submissionRules';

const Publishing: React.FC = () => {
  const [showSubmissionRules, setShowSubmissionRules] = useState(false);

  // Submission workflow state (strictly limited to requested data stack)
  type SubmissionType = 'Research Article' | 'Commentary';
  type EnglishVariant = 'American' | 'British';
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 Overview, 1 Authors, 2 Files, 3 Compliance, 4 Review, 5 Submit
  const [submissionType, setSubmissionType] = useState<SubmissionType | ''>('');
  const [englishVariant, setEnglishVariant] = useState<EnglishVariant>('American');
  const [manuscriptId, setManuscriptId] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const officialDocs = [
    { label: 'Rules for Submission – Investment Management Journal', filename: '2025.08.01_Rules for Submission – Investment Management Journal (1).docx' },
    { label: 'Title Page Template – NewTIFI Investment Management Journal', filename: '2025.08.07_Title Page Template – NewTIFI Investment Management Journal.docx' },
    { label: 'Manuscript Template – NewTIFI Investment Management Journal', filename: '2025.08.07_Manuscript Template – NewTIFI Investment Management Journal.docx' },
    { label: 'Co‑Author Submission Approval Form – NewTIFI Investment Management Journal', filename: '2025.08.07_Co-Author Submission Approval Form – NewTIFI Investment Management Journal.docx' },
  ];

  // Title Page record
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  type Author = { firstName: string; lastName: string; affiliation: string };
  const [authors, setAuthors] = useState<Author[]>([{ firstName: '', lastName: '', affiliation: '' }]);
  const [estimatedReadingMinutes, setEstimatedReadingMinutes] = useState<number | ''>('');
  const [abstractText, setAbstractText] = useState<string>('');
  const [keywords, setKeywords] = useState<string>(''); // ALL CAPS tokens separated by a dot
  const [citationOSCOLA, setCitationOSCOLA] = useState<string>('');
  const [citationBluebook, setCitationBluebook] = useState<string>('');
  const disclaimer = 'All views expressed are those of the author(s). The Journal and its Publisher accept no responsibility for any errors or omissions.';
  const journalHomeUrl = '/publishing/journals/investment-management';
  const fontGuidance = 'Use Verdana for all text.';

  // Manuscript record (compliance notes)
  const [templateReference, setTemplateReference] = useState<string>('Official IMJ Template v1.0');
  const [removedIdentifyingInfo, setRemovedIdentifyingInfo] = useState<boolean>(false);
  const [removedMetadata, setRemovedMetadata] = useState<boolean>(false);
  const [styleNotes, setStyleNotes] = useState<string>(''); // defined terms, cross-references, headings, footnotes
  const [citationSystem, setCitationSystem] = useState<'OSCOLA' | 'Bluebook'>('OSCOLA');
  const [numbersDatesRules, setNumbersDatesRules] = useState<string>('');
  const [unitsCurrencyRules, setUnitsCurrencyRules] = useState<string>('');
  const [figuresTablesEquations, setFiguresTablesEquations] = useState<string>('');

  // Files
  type NamedFile = { file?: File; path?: string; uploaded: boolean };
  const [fileTitlePage, setFileTitlePage] = useState<NamedFile>({ uploaded: false });
  const [fileManuscript, setFileManuscript] = useState<NamedFile>({ uploaded: false });
  const [fileCV, setFileCV] = useState<NamedFile>({ uploaded: false });
  const [fileCoverLetter, setFileCoverLetter] = useState<NamedFile>({ uploaded: false });
  const [filesCoAuthorApprovals, setFilesCoAuthorApprovals] = useState<Array<NamedFile>>([]);

  // Compliance confirmations
  const [confNotElsewhere, setConfNotElsewhere] = useState<boolean>(false);
  const [confRulesAccepted, setConfRulesAccepted] = useState<boolean>(false);
  const [confPrivacyAccepted, setConfPrivacyAccepted] = useState<boolean>(false);
  const [confRightsAccepted, setConfRightsAccepted] = useState<boolean>(false);

  // UI errors
  const [errors, setErrors] = useState<string[]>([]);

  const steps = ['Overview', 'Authors', 'Files', 'Compliance', 'Review', 'Submit'];

  const isLoggedIn = Boolean(localStorage.getItem('user'));
  const memberEmail = isLoggedIn ? (JSON.parse(localStorage.getItem('user') || '{}').email || '') : '';

  function addAuthor() {
    setAuthors(prev => [...prev, { firstName: '', lastName: '', affiliation: '' }]);
  }
  function removeAuthor(index: number) {
    setAuthors(prev => prev.filter((_, i) => i !== index));
  }

  function checkFileName(name: string, docType: 'Title Page' | 'Manuscript' | 'CV' | 'Cover Letter' | 'Co Author Approval') {
    // Pattern: YYYY.MM.DD_<DocType>_<Article Title>
    const safeDocType = docType.replace(/ /g, ' ');
    const pattern = new RegExp(`^\\d{4}\\.\\d{2}\\.\\d{2}_${safeDocType}_.+`);
    return pattern.test(name);
  }

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>, setter: (f: NamedFile) => void, docType: 'Title Page' | 'Manuscript' | 'CV' | 'Cover Letter') {
    const f = e.target.files?.[0];
    if (!f) return;
    const okName = checkFileName(f.name, docType);
    const okType = /pdf|msword|officedocument/.test(f.type);
    const errs: string[] = [];
    if (!okName) errs.push(`Filename for ${docType} must follow YYYY.MM.DD_${docType}_Article Title`);
    if (!okType) errs.push(`${docType} must be PDF or Word`);
    if (errs.length) {
      setErrors(errs);
      setter({ uploaded: false });
      return;
    }
    setErrors([]);
    setter({ file: f, uploaded: true, path: `/files/submissions/${f.name}` });
  }

  function onPickApprovals(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files ? Array.from(e.target.files) : [];
    const named = list.map(f => ({ file: f, uploaded: checkFileName(f.name, 'Co Author Approval'), path: `/files/submissions/${f.name}` }));
    const bad = named.filter(n => !n.uploaded);
    if (bad.length) {
      setErrors([`Each Co Author Approval must follow YYYY.MM.DD_Co Author Approval_Article Title`]);
    } else {
      setErrors([]);
    }
    setFilesCoAuthorApprovals(named);
  }

  function handleNext() {
    const newErrors: string[] = [];
    if (currentStep === 0) {
      if (!submissionType) newErrors.push('Select a submission type.');
      if (!title) newErrors.push('Enter a Title.');
      if (!abstractText) newErrors.push('Enter an Abstract.');
      if (!keywords) newErrors.push('Enter Keywords.');
    }
    if (currentStep === 1) {
      if (!authors.length || !authors[0].firstName || !authors[0].lastName) newErrors.push('Enter at least one author.');
      if (authors.length > 1 && filesCoAuthorApprovals.length < (authors.length - 1)) newErrors.push('Upload Co Author Approval forms for each co-author.');
    }
    if (currentStep === 2) {
      if (!fileTitlePage.uploaded) newErrors.push('Upload Title Page file (PDF/Word).');
      if (!fileManuscript.uploaded) newErrors.push('Upload Manuscript file (anonymised).');
      if (!removedIdentifyingInfo || !removedMetadata) newErrors.push('Confirm identifying info and metadata were removed from Manuscript.');
    }
    if (currentStep === 3) {
      if (!confNotElsewhere || !confRulesAccepted || !confPrivacyAccepted || !confRightsAccepted) newErrors.push('All four confirmations are required.');
    }
    setErrors(newErrors);
    if (newErrors.length === 0) setCurrentStep(s => Math.min(s + 1, steps.length - 1));
  }

  function handleBack() {
    setErrors([]);
    setCurrentStep(s => Math.max(s - 1, 0));
  }

  function generateManuscriptId() {
    const now = new Date();
    const id = `IMJ-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    return id;
  }

  function handleSubmit() {
    // Only store/display the limited dataset per spec
    const id = generateManuscriptId();
    setManuscriptId(id);
    setIsSubmitted(true);
    setCurrentStep(5);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section (consistent with Home/WhoWeAre) */}
      <section className="px-6 py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <div className="w-full">
            <h1 className="text-2xl md:text-2xl font-light mb-10">Publishing</h1>
            <div className="mb-10">
              <h2 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight uppercase">
                Submission Guidelines & Workflow
              </h2>
            </div>
            <p className="text-base md:text-base leading-relaxed text-white/90 font-light">
              Submission guidelines, workflow and documents for the Investment Management Journal.
            </p>
          </div>
        </div>
      </section>

      {/* Content section removed to reduce fluff and whitespace */}

      {/* Publishing (primary) */}
      <section className="px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto w-full">
          <div className="w-full">
            <ScrollReveal>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-4xl font-bold text-newtifi-navy mb-4">
                  How to Submit Your Research
                </h2>
                <p className="text-base text-gray-600 w-full">
                  Follow our comprehensive guidelines to ensure your submission meets our standards for quality and academic rigor.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Submission Guidelines</h3>
                      <p className="text-white/90">Complete guidelines for authors and contributors</p>
                    </div>
                    <button
                      onClick={downloadSubmissionRulesPDF}
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>

                {/* Integrated Submission Builder per blueprint */}
                <div className="p-6 space-y-6">
                  {/* Removed top notice and login identity box per request */}

                  {/* Official Documents – direct downloads */}
                  <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
                    <h4 className="text-base font-bold text-newtifi-navy mb-3">Official Documents</h4>
                    <ul className="divide-y divide-gray-100">
                      {officialDocs.map((doc) => {
                        const encoded = encodeURIComponent(doc.filename);
                        const url = `/files/research-submissions/${encoded}`;
                        return (
                          <li key={doc.filename} className="py-3 flex items-center justify-between gap-3">
                            <div className="text-base text-gray-800">{doc.label}</div>
                            <a href={url} download className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-newtifi-navy text-white hover:bg-newtifi-teal hover:text-newtifi-navy transition font-medium">
                              <Download className="w-4 h-4"/> Download
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Submission Guidelines Summary */}
                  <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-4">
                    <h4 className="text-base font-bold text-newtifi-navy">Submission Guidelines Summary</h4>
                    <p className="text-base text-gray-800">Use English and choose either American or British conventions consistently across the Title Page and Manuscript. Ensure strict double‑blind compliance by removing all identifying information and embedded metadata from the Manuscript. Follow the official template for structure, headings, footnotes, defined terms and cross‑references, and include a concise abstract (150–250 words) with 3–12 ALL‑CAPS keywords separated by a dot.</p>
                    <p className="text-base text-gray-800">Prepare files separately: Title Page (PDF/Word) and Manuscript (PDF/Word, anonymised). Optional files include CV and Cover Letter. Where there are multiple authors, upload a signed Co‑Author Submission Approval for each co‑author using the provided template. File names must follow the convention YYYY.MM.DD_&lt;DocType&gt;_&lt;Article Title&gt; (for example: 2025.12.31_Title Page_My Article).</p>
                    <p className="text-base text-gray-800">Formatting rules: use the numbering table with single‑column rows and sequential paragraph numbers in parentheses, preserve page numbering layout, and apply Format Painter for consistency. Citations must follow OSCOLA or Bluebook with footnotes, including “last accessed” dates for URLs. Italicize Latin, and apply the specified rules for numbers, dates, units and currencies. Provide clear captions and correct formats for figures, tables and equations.</p>
                    <p className="text-base text-gray-800">Before submission, confirm the four required statements: the Manuscript is not under consideration elsewhere; you have read, accepted and complied with the Rules for Submission; you accept the Privacy Policy; and you accept the Rights and Licensing terms. A Manuscript ID will be generated on submit and a confirmation sent to your account email. For technical issues, contact imj.editorial@newtifi.com.</p>
                  </div>

                  {/* Overview, Authors, Files, Compliance, Review, Submit steps are defined below and appear single-column */}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Anchor (kept to not break existing links) */}
      <div id="submission-guidelines" className="h-0" />
    </main>
  );
};

export default Publishing; 