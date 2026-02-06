import os
import re
from PyPDF2 import PdfReader

PDF_DIR = 'public/articles/investment-management-journal/'

# Regex patterns for metadata fields
TITLE_PAT = re.compile(r'^(.*?)(?:\n|$)', re.MULTILINE)
AUTHOR_PAT = re.compile(r'Author[s]?:\s*(.*)', re.IGNORECASE)
ABSTRACT_PAT = re.compile(r'Abstract:?\s*(.*?)(?:\n\s*Keywords?:|\n\s*Key words?:|\n\s*DOI:|\n\s*$)', re.IGNORECASE | re.DOTALL)
KEYWORDS_PAT = re.compile(r'Keywords?:\s*(.*)', re.IGNORECASE)
DOI_PAT = re.compile(r'DOI:?\s*([\w./-]+)', re.IGNORECASE)


def extract_metadata_from_text(text):
    # Try to extract each field
    title = TITLE_PAT.search(text)
    author = AUTHOR_PAT.search(text)
    abstract = ABSTRACT_PAT.search(text)
    keywords = KEYWORDS_PAT.search(text)
    doi = DOI_PAT.search(text)
    return {
        'title': title.group(1).strip() if title else '',
        'author': author.group(1).strip() if author else '',
        'abstract': abstract.group(1).strip().replace('\n', ' ') if abstract else '',
        'keywords': [k.strip() for k in keywords.group(1).split(',')] if keywords else [],
        'doi': doi.group(1).strip() if doi else ''
    }

def extract_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    # Concatenate first 2 pages for metadata
    text = ''
    for i in range(min(2, len(reader.pages))):
        text += reader.pages[i].extract_text() + '\n'
    return extract_metadata_from_text(text)

def main():
    for fname in os.listdir(PDF_DIR):
        if fname.lower().endswith('.pdf'):
            path = os.path.join(PDF_DIR, fname)
            meta = extract_from_pdf(path)
            print(f'--- {fname} ---')
            print(meta)
            print()

if __name__ == '__main__':
    main() 