#!/usr/bin/env python3
"""
Web server for digital signature collection
Serves the signature interface and handles signature submission
"""

from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS
import json
import base64
from pathlib import Path
from PIL import Image
import io
from docx import Document
from docx.shared import Inches
import subprocess

app = Flask(__name__, 
            static_folder='web',
            template_folder='web')
CORS(app)

OUTPUT_DIR = Path('output')
WEB_DIR = Path('web')
EXAMPLES_DIR = Path('examples')

@app.route('/')
def index():
    return send_file(WEB_DIR / 'index.html')

@app.route('/api/offer-preview/<candidate_name>')
def get_offer_preview(candidate_name):
    """Get offer letter preview data"""
    try:
        profile_name = request.args.get('profile', 'melange')
        
        # Load candidate data
        # We try to find the candidate data in examples/ or in profile-specific dirs if they exist
        candidate_file = EXAMPLES_DIR / f'sample_candidate.json' # Default fallback
        
        # Optional: search for specific candidate json if needed
        # For now, we'll keep using the sample or look for one matching name
        potential_candidate_file = EXAMPLES_DIR / f'{candidate_name.lower()}.json'
        if potential_candidate_file.exists():
            candidate_file = potential_candidate_file
            
        with open(candidate_file, 'r') as f:
            data = json.load(f)
        
        return jsonify({
            'success': True,
            'candidate': {
                'name': data.get('name', ''),
                'position': data.get('position', ''),
                'start_date': data.get('start_date', ''),
                'interview_date': data.get('test_date', ''),
                'salary': data.get('salary', '')
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/offer-pdf/<candidate_name>')
def get_offer_pdf(candidate_name):
    """Serve the unsigned PDF"""
    try:
        profile_name = request.args.get('profile', 'melange')
        pdf_file = OUTPUT_DIR / profile_name / f'offer_letter_{candidate_name}.pdf'
        
        if not pdf_file.exists():
            # Try root output dir just in case
            pdf_file = OUTPUT_DIR / f'offer_letter_{candidate_name}.pdf'
            
        if pdf_file.exists():
            return send_file(pdf_file, mimetype='application/pdf')
        else:
            return jsonify({'success': False, 'message': f'PDF not found at {pdf_file}'}), 404
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/submit-signature', methods=['POST'])
def submit_signature():
    """Handle signature submission and create signed PDF"""
    try:
        data = request.json
        candidate_name = data.get('candidate', 'Mariya_Fatima')
        profile_name = data.get('profile', 'melange')
        signature_data = data.get('signature', '')
        signature_date = data.get('date', '')
        
        # Decode base64 signature image
        signature_base64 = signature_data.split(',')[1] if ',' in signature_data else signature_data
        signature_bytes = base64.b64decode(signature_base64)
        
        # Save signature image to output dir
        profile_output_dir = OUTPUT_DIR / profile_name
        profile_output_dir.mkdir(exist_ok=True, parents=True)
        
        sig_image_path = profile_output_dir / f'signature_{candidate_name}.png'
        with open(sig_image_path, 'wb') as f:
            f.write(signature_bytes)
        
        # Path to the unsigned DOCX
        docx_path = profile_output_dir / f'offer_letter_{candidate_name}.docx'
        
        if not docx_path.exists():
            # Try checking the root output dir
            docx_path = OUTPUT_DIR / f'offer_letter_{candidate_name}.docx'
            
        if not docx_path.exists():
             return jsonify({'success': False, 'message': f'Source DOCX not found at {docx_path}'}), 404
             
        signed_docx_path = profile_output_dir / f'offer_letter_{candidate_name}_signed.docx'
        
        # Copy and add signature to DOCX
        doc = Document(docx_path)
        
        # Find the signature placeholder or just add to the end
        found_placeholder = False
        for paragraph in doc.paragraphs:
            if 'Signature:' in paragraph.text or 'Candidate Signature' in paragraph.text:
                # Add some space
                p = doc.add_paragraph()
                # Add signature image
                run = p.add_run()
                run.add_picture(str(sig_image_path), width=Inches(2))
                # Add date
                doc.add_paragraph(f'Date: {signature_date}')
                found_placeholder = True
                break
        
        if not found_placeholder:
            # If no placeholder, just add at the end
            doc.add_paragraph('\nCandidate Signature:')
            doc.add_picture(str(sig_image_path), width=Inches(2))
            doc.add_paragraph(f'Date: {signature_date}')
            
        doc.save(signed_docx_path)
        
        # Convert to PDF
        subprocess.run([
            'soffice',
            '--headless',
            '--convert-to', 'pdf',
            '--outdir', str(profile_output_dir),
            str(signed_docx_path)
        ], check=True)
        
        return jsonify({
            'success': True,
            'message': 'Signature submitted successfully',
            'signed_pdf_url': f'/api/signed-pdf/{candidate_name}?profile={profile_name}'
        })
        
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/signed-pdf/<candidate_name>')
def get_signed_pdf(candidate_name):
    """Serve the signed PDF"""
    try:
        profile_name = request.args.get('profile', 'melange')
        pdf_file = OUTPUT_DIR / profile_name / f'offer_letter_{candidate_name}_signed.pdf'
        
        if pdf_file.exists():
            return send_file(pdf_file, 
                           mimetype='application/pdf',
                           as_attachment=True,
                           download_name=f'offer_letter_{candidate_name}_signed.pdf')
        else:
            return jsonify({'success': False, 'message': 'Signed PDF not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    # Ensure output directory exists
    OUTPUT_DIR.mkdir(exist_ok=True)
    
    print("🚀 Starting signature collection server...")
    print("📝 Open http://localhost:5000 in your browser")
    print("✍️  Candidates can sign their offer letters digitally!")
    
    # Check if templates and output exist
    if not (OUTPUT_DIR / 'melange').exists():
        print("⚠️  Warning: output/melange directory not found. Have you generated any offers yet?")
        
    app.run(debug=True, port=5000)
