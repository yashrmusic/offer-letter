#!/usr/bin/env python3
from docx2pdf import convert
from pathlib import Path

docx_file = Path("/Users/yashrakhiani/.gemini/antigravity/scratch/offer_letter_Mariya_Fatima.docx")
pdf_file = Path("/Users/yashrakhiani/.gemini/antigravity/scratch/offer_letter_Mariya_Fatima.pdf")

print(f"Converting {docx_file} to PDF...")
convert(str(docx_file), str(pdf_file))
print(f"✅ PDF created: {pdf_file}")
