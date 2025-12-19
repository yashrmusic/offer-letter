#!/usr/bin/env python3
"""
Profile-based Offer Letter Generation
Supports multiple companies with different templates and configurations
"""

import json
import sys
from pathlib import Path
from docx import Document
import subprocess

def load_profile(profile_name):
    """Load company profile configuration"""
    profile_path = Path('profiles') / profile_name / 'config.json'
    
    if not profile_path.exists():
        print(f"❌ Profile '{profile_name}' not found!")
        print(f"Available profiles: melange, urbanmistrii, decoarte")
        sys.exit(1)
    
    with open(profile_path, 'r') as f:
        return json.load(f)

def fill_offer_letter(template_path, data, profile, output_path):
    """Fill offer letter template with candidate data"""
    doc = Document(template_path)
    
    # Map JSON data fields to template placeholders
    replacements = {
        '{{Candidate Name}}': data.get('name', ''),
        '{{Interview Date}}': data.get('test_date', ''),
        '{{Job Title}}': data.get('position', ''),
        '{{Joining Date}}': data.get('start_date', ''),
        '{{Offer Validity Days}}': str(profile['offer_validity_days']),
        '{{Probation Monthly Salary}}': data.get('salary', ''),
        '{{Probation Period Months}}': str(profile['probation_months']),
        '{{Acceptance Date}}': '',
    }
    
    for paragraph in doc.paragraphs:
        for find_text, replace_text in replacements.items():
            if find_text in paragraph.text:
                paragraph.text = paragraph.text.replace(find_text, str(replace_text))
    
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                for find_text, replace_text in replacements.items():
                    if find_text in cell.text:
                        cell.text = cell.text.replace(find_text, str(replace_text))
    
    # Fill Schedule 1 based on profile config
    if len(doc.tables) >= 2:
        schedule_table = doc.tables[1]
        schedule_config = profile['schedule_1_config']
        
        # Parse salary
        salary_str = data.get('salary', '0')
        salary_str = salary_str.replace('/-', '').replace(',', '').strip()
        
        if '-' in salary_str:
            parts = salary_str.split('-')
            try:
                if schedule_config['use_lower_bound']:
                    salary = float(parts[0])
                else:
                    salary = (float(parts[0]) + float(parts[1])) / 2
            except:
                salary = 0
        else:
            try:
                salary = float(salary_str)
            except:
                salary = 0
        
        # Fill configured rows with same value
        if schedule_config['all_same_value']:
            salary_formatted = f"{salary:,.0f}"
            compensation_data = {row: salary_formatted for row in schedule_config['fill_rows']}
        
        # Fill the table
        for row in schedule_table.rows[1:]:
            if len(row.cells) >= 2:
                component = row.cells[0].text.strip()
                if component in compensation_data:
                    row.cells[1].text = compensation_data[component]
    
    doc.save(output_path)
    return output_path

def convert_to_pdf(docx_path, pdf_path):
    """Convert DOCX to PDF using LibreOffice"""
    try:
        subprocess.run([
            'soffice',
            '--headless',
            '--convert-to', 'pdf',
            '--outdir', str(pdf_path.parent),
            str(docx_path)
        ], check=True)
        return pdf_path
    except Exception as e:
        print(f"❌ PDF conversion failed: {e}")
        return None

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 generate_offer.py <profile> <candidate.json>")
        print("\nProfiles:")
        print("  melange      - The Melange Studio")
        print("  urbanmistrii - Urban Mistrii")
        print("  decoarte     - Deco Arte")
        print("\nExample:")
        print("  python3 generate_offer.py melange examples/sample_candidate.json")
        sys.exit(1)
    
    profile_name = sys.argv[1]
    candidate_file = sys.argv[2]
    
    # Load profile and candidate data
    print(f"📋 Loading profile: {profile_name}")
    profile = load_profile(profile_name)
    
    print(f"👤 Loading candidate data: {candidate_file}")
    with open(candidate_file, 'r') as f:
        data = json.load(f)
    
    # Prepare paths
    name_clean = data['name'].replace(' ', '_')
    output_dir = Path('output') / profile_name
    output_dir.mkdir(exist_ok=True, parents=True)
    
    docx_out = output_dir / f'offer_letter_{name_clean}.docx'
    
    # Generate offer letter
    print(f"📝 Filling offer letter for {profile['company_name']}...")
    template_path = Path(profile['template_docx'])
    
    if not template_path.exists():
        print(f"❌ Template not found: {template_path}")
        print(f"💡 Please add the template to: {template_path}")
        sys.exit(1)
    
    fill_offer_letter(template_path, data, profile, docx_out)
    print(f"✅ Created: {docx_out}")
    
    # Convert to PDF
    pdf_out = docx_out.with_suffix('.pdf')
    print(f"\n📄 Converting to PDF...")
    convert_to_pdf(docx_out, pdf_out)
    print(f"✅ PDF created: {pdf_out}")
    
    print(f"\n🎉 Success! Offer letter ready for {data['name']}")
    print(f"   Company: {profile['company_name']}")
    print(f"   Output: {pdf_out}")

if __name__ == "__main__":
    main()
