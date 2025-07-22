import PyPDF2
import os

def extract_article_info(pdf_path):
    try:
        reader = PyPDF2.PdfReader(pdf_path)
        text = reader.pages[0].extract_text()
        return text[:3000]  # Get first 3000 characters
    except Exception as e:
        return f"Error reading {pdf_path}: {str(e)}"

# List of PDF files
pdf_files = [
    "public/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf",
    "public/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf",
    "public/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf"
]

for i, pdf_file in enumerate(pdf_files, 1):
    print(f"\n{'='*80}")
    print(f"ARTICLE {i}: {os.path.basename(pdf_file)}")
    print(f"{'='*80}")
    print(extract_article_info(pdf_file))
    print(f"\n{'='*80}\n") 