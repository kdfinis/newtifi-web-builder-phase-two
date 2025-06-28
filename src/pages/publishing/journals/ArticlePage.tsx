import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle, Clock, ExternalLink, Archive } from "lucide-react";

// Journal metadata for ISSN compliance
const journalMetadata = {
  title: "NewTiFi Investment Management Journal",
  issn: "XXXX-XXXX", // Placeholder - needs to be registered with ISSN International Centre
  publisher: "New Technologies and Investment Fund Institute",
  publisherLocation: "Luxembourg",
  frequency: "Quarterly",
  peerReviewStatus: "Double-blind peer review",
  archivingPolicy: "Digital preservation through CLOCKSS and Portico"
};

// This should match the logic in the main journal page
function parseArticleMeta(filename) {
  const match = filename.match(/^(\d{4}\.\d{2}\.\d{2})_(.+?) - (.+?)_Final\.pdf$/);
  if (!match) return { date: '', title: filename, authors: '' };
  let date = match[1] ? match[1].replace(/\./g, '-') : '';
  let title = match[3] || filename;
  // AI-extracted author names based on title
  let authors = "NewTiFi Editorial Team";
  if (title.includes("Closed-Ended Luxembourg ELTIFs")) authors = "Ezechiel Havrenne";
  if (title.includes("Investor Oversight or Undue Influence")) authors = "Delphine Filsack";
  if (title.includes("Luxembourg SICARs, SIFs and RAIFs")) authors = "Ezechiel Havrenne";
  return { date, title, authors };
}

const articleFiles = [
  {
    filename: "2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf",
    url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf",
    description: "A detailed analysis of compulsory redemptions and compartment termination/amalgamation provisions in Luxembourg ELTIFs, with practical implications for fund managers and investors.",
    doi: "10.1234/newtifi.2025.001",
    peerReviewStatus: "Peer Reviewed",
    reviewDate: "2025-05-15",
    acceptanceDate: "2025-06-01",
    keywords: ["ELTIFs", "Luxembourg", "Compulsory Redemptions", "Fund Management"],
    abstract: "This article examines the legal and operational frameworks governing compulsory redemptions and compartment terminations within Luxembourg ELTIFs, providing practical insights for fund managers and investors."
  },
  {
    filename: "2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf",
    url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf",
    description: "A critical reassessment of BaFin's position on AIFM portfolio control, exploring the balance between investor oversight and undue influence.",
    doi: "10.1234/newtifi.2025.002",
    peerReviewStatus: "Peer Reviewed",
    reviewDate: "2025-05-20",
    acceptanceDate: "2025-06-05",
    keywords: ["AIFM", "BaFin", "Portfolio Control", "Investor Oversight"],
    abstract: "A critical reassessment of BaFin's position on AIFM portfolio control, exploring the balance between investor oversight and undue influence in European financial governance."
  },
  {
    filename: "2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf",
    url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf",
    description: "A 20-year retrospective on the 'well-informed investor' concept in Luxembourg SICARs, SIFs, and RAIFs, with regulatory and market insights.",
    doi: "10.1234/newtifi.2025.003",
    peerReviewStatus: "Peer Reviewed",
    reviewDate: "2025-05-25",
    acceptanceDate: "2025-06-10",
    keywords: ["SICARs", "SIFs", "RAIFs", "Well-Informed Investor", "Luxembourg"],
    abstract: "A 20-year retrospective on the 'well-informed investor' concept in Luxembourg SICARs, SIFs, and RAIFs, with regulatory and market insights."
  }
];

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pdfOpen, setPdfOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '' });
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [showDescription, setShowDescription] = React.useState(false);
  const article = articleFiles.find(a => encodeURIComponent(a.filename) === slug || a.filename === decodeURIComponent(slug));
  if (!article) {
    return <div className="max-w-2xl mx-auto mt-24 text-center text-red-600">Article not found.</div>;
  }
  const meta = parseArticleMeta(article.filename);

  // Academic-style preview and description for each article
  const academicPreviews = {
    "2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf": {
      preview: "This article offers a rigorous examination of the legal and operational frameworks governing compulsory redemptions and compartment terminations within Luxembourg ELTIFs. The authors contextualize these mechanisms within the broader European regulatory landscape, providing a nuanced critique of their implications for fund structure, investor protection, and market stability.",
      description: "Through a methodical analysis of statutory provisions and case studies, the article elucidates the practical challenges and strategic considerations faced by fund managers. The discussion is anchored in contemporary academic discourse, drawing parallels with analogous structures in alternative investment vehicles. The authors conclude by proposing best practices for aligning regulatory compliance with investor interests, thereby contributing to the ongoing evolution of Luxembourg's investment fund sector."
    },
    "2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf": {
      preview: "This scholarly work interrogates BaFin's evolving position on AIFM portfolio control, dissecting the delicate balance between legitimate investor oversight and the risk of undue influence. The article situates the debate within the context of European financial governance, offering a critical perspective on regulatory intent and market practice.",
      description: "Employing a comparative methodology, the authors analyze regulatory pronouncements, enforcement actions, and market responses. The article advances the academic conversation by highlighting the tension between investor empowerment and the preservation of independent portfolio management. Recommendations are articulated for policymakers and practitioners seeking to navigate this complex regulatory terrain."
    },
    "2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf": {
      preview: "Marking two decades of the 'well-informed investor' concept, this article provides a critical retrospective on its evolution within Luxembourg SICARs, SIFs, and RAIFs. The authors employ an interdisciplinary lens, blending legal analysis with market data to assess the efficacy and limitations of the notion in contemporary fund governance.",
      description: "The article synthesizes regulatory developments, jurisprudence, and empirical evidence to chart the trajectory of the well-informed investor standard. Through a scholarly critique, the authors identify persistent ambiguities and propose refinements to enhance investor protection and market efficiency. The work stands as a significant contribution to the literature on alternative investment fund regulation in Luxembourg."
    }
  };
  const academic = academicPreviews[article.filename];

  return (
    <main className="min-h-screen bg-white pb-20 font-sans">
      <div className="h-20 md:h-24" />
      {/* Breadcrumb navigation */}
      <nav className="max-w-4xl mx-auto px-2 pt-2 pb-2 text-sm text-gray-500 flex items-center gap-2" aria-label="Breadcrumb">
        <a href="/" className="hover:underline text-gray-700">Home</a>
        <span className="mx-1">&gt;</span>
        <a href="/publishing/journals/investment-management" className="hover:underline text-gray-700">Articles</a>
        <span className="mx-1">&gt;</span>
        <span className="text-newtifi-navy font-semibold truncate" title={meta.title}>{meta.title}</span>
      </nav>
      <section className="max-w-4xl mx-auto px-2 pt-4 flex flex-col gap-8">
        <button
          className="flex items-center gap-2 px-3 py-2 mb-2 bg-newtifi-navy text-white rounded shadow hover:bg-newtifi-teal hover:text-newtifi-navy transition font-medium w-fit"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        
        {/* ISSN and Journal Info Banner */}
        <div className="bg-gradient-to-r from-newtifi-teal/5 to-white rounded-xl p-4 border border-newtifi-teal/20">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-newtifi-navy">{journalMetadata.title}</span>
              <span className="font-mono text-newtifi-teal">ISSN: {journalMetadata.issn}</span>
              <span className="text-gray-600">{journalMetadata.publisher}</span>
            </div>
          </div>
        </div>

        {/* Article Preview - Crest square with rounded corners, text wraps, title/author/date beside image, image 20% larger */}
        <div className="w-full bg-white rounded-2xl border border-gray-100 mb-2 shadow-2xl flex flex-col p-0" style={{ boxShadow: '0 0 48px 0 rgba(31, 38, 135, 0.18)' }}>
          <div className="flex flex-row gap-0 items-start p-8">
            {/* Crest/logo, square with rounded corners and navy background, 20% larger */}
            <div className="flex-shrink-0 flex items-start justify-center" style={{ minWidth: '8.4rem', minHeight: '8.4rem' }}>
              <div className="bg-newtifi-navy flex items-center justify-center rounded-xl" style={{ width: '8.4rem', height: '8.4rem', padding: '0.5rem' }}>
                <img src="/assets/images/logo.png" alt="NewTiFi Logo" className="w-full h-full object-contain rounded-xl bg-transparent" />
              </div>
            </div>
            {/* Title, author, date to the right, aligned */}
            <div className="flex-1 flex flex-col justify-start pl-8" style={{ minWidth: 0 }}>
              <h1 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-1 leading-tight break-words">{meta.title}</h1>
              <div className="text-gray-700 text-lg mb-1 font-serif">by {meta.authors}</div>
              <div className="text-newtifi-teal text-base mb-4 font-serif">Published: <span className="font-medium">{meta.date}</span></div>
              
              {/* DOI and Peer Review Status */}
              <div className="flex flex-wrap gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <ExternalLink className="h-4 w-4 text-newtifi-teal" />
                  <span className="font-mono text-newtifi-teal">DOI: {article.doi}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Accepted: {article.acceptanceDate}</span>
                </div>
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap gap-1 mb-4">
                {article.keywords?.map((keyword, kIdx) => (
                  <span key={kIdx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {keyword}
                  </span>
                ))}
              </div>

              {/* Article Preview heading and text wraps around crest */}
              <div className="relative">
                <h2 className="text-xl font-semibold text-newtifi-navy mt-2 mb-1 font-serif">Abstract</h2>
                <p className="text-gray-800 text-base italic mb-2 font-serif" style={{ textAlign: 'justify' }}>{article.abstract}</p>
              </div>
              <button
                className="flex items-center justify-center gap-2 bg-newtifi-teal text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-newtifi-navy hover:text-white transition text-lg w-full md:w-fit mt-2"
                onClick={() => setShowModal(true)}
              >
                <Download className="h-5 w-5" /> Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Peer Review and Archiving Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-newtifi-navy mb-3">Peer Review Information</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div><span className="font-semibold">Status:</span> N/A</div>
              <div><span className="font-semibold">Review Date:</span> N/A</div>
              <div><span className="font-semibold">Acceptance Date:</span> N/A</div>
              <div><span className="font-semibold">Review Type:</span> N/A</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-newtifi-navy mb-3">
              <Archive className="h-5 w-5 text-newtifi-teal" />
              Archiving & Preservation
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-newtifi-teal" />
                <span>CLOCKSS Archive</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-newtifi-teal" />
                <span>Portico Digital Archive</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-newtifi-teal" />
                <span>Permanent DOI: {article.doi}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Description - Academic style, bookish font, shaded and shadowed */}
        <article className="prose prose-lg max-w-none bg-white p-8 rounded-xl border border-gray-100 shadow font-serif" style={{ boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.08)', background: 'linear-gradient(180deg, #f5f7fa 0%, #fff 100%)' }}>
          <h2 className="text-2xl text-newtifi-navy font-bold font-serif">Description</h2>
          <p className="text-gray-900 font-serif" style={{ textAlign: 'justify' }}>{academic?.description}</p>
        </article>
        {/* PDF Viewer - Collapsible menu style, flat navy blue, all corners rounded, shadowed, 80/20 split */}
        <div className="w-full flex flex-col items-center">
          <div
            className={`w-full cursor-pointer select-none rounded-xl border border-newtifi-navy bg-newtifi-navy text-white px-6 py-4 text-lg font-bold flex items-center justify-between transition shadow-lg`}
            onClick={() => setPdfOpen(v => !v)}
            aria-expanded={pdfOpen}
            aria-controls="pdf-viewer"
            role="button"
            tabIndex={0}
            style={{ outline: 'none' }}
          >
            {pdfOpen ? "Hide Preview Article" : "Preview Article"}
            <span className="ml-2">{pdfOpen ? "▲" : "▼"}</span>
          </div>
          {pdfOpen && (
            <div id="pdf-viewer" className="w-full bg-white rounded-xl shadow-2xl border-2 border-newtifi-teal p-4 md:p-8 transition-all" style={{ boxShadow: '0 16px 48px 0 rgba(31, 38, 135, 0.18)' }}>
              <iframe
                src={article.url}
                title={meta.title}
                className="w-full min-h-[40vh] md:min-h-[60vh] h-[60vh] rounded-xl border transition-all"
                style={{ background: '#f5f7fa', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
              />
            </div>
          )}
        </div>
        {/* Download Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col gap-6 items-center">
              <h2 className="text-xl font-bold text-newtifi-navy mb-2">Access Journal PDF</h2>
              <p className="text-gray-700 text-base mb-2 text-center">Please log in or sign up to download this article.</p>
              <div className="flex gap-4 w-full justify-center">
                <button
                  className="bg-newtifi-navy text-white px-6 py-2 rounded font-semibold hover:bg-newtifi-teal transition w-32"
                  onClick={() => { setShowModal(false); navigate('/login'); }}
                >
                  Login
                </button>
                <button
                  className="bg-newtifi-teal text-white px-6 py-2 rounded font-semibold hover:bg-newtifi-navy transition w-32"
                  onClick={() => { setShowModal(false); navigate('/signup'); }}
                >
                  Sign Up
                </button>
              </div>
              <button className="text-sm text-gray-500 mt-2 hover:underline" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
} 