# Offer Letter Automation

Professional automation system for generating, signing, and sending offer letters.

## Features
- **Template Generation**: Preserves formatting while replacing placeholders in `.docx` templates.
- **PDF Conversion**: Headless conversion using LibreOffice.
- **Email Integration**: Automated delivery via Gmail SMTP with company-specific profiles.
- **Digital Signatures**: Web-based interface for candidates to sign offer letters.
- **AI Parsing**: Integrated Gemini AI to extract candidate details from unstructured text.

## Project Structure
- `signature_server.py`: Main Flask server for the web interface.
- `generate_offer.py`: Core logic for DOCX manipulation and PDF conversion.
- `send_email.py`: Email delivery utility.
- `web/`: Frontend assets (HTML, JS, CSS).
- `profiles/`: Company-specific configurations and templates.
- `templates/`: Global templates.
- `candidates/`: Candidate data in JSON format.
- `scripts/`: Utility scripts for maintenance and WhatsApp pairing.

## Setup

### Prerequisites
- Python 3.10+
- Node.js (for utility scripts)
- LibreOffice (for PDF conversion, `soffice` must be in PATH)

### Installation
1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```

## Usage

### 1. Generate an Offer Letter
```bash
python3 generate_offer.py <profile_name> <candidate_json_path>
```
Example:
```bash
python3 generate_offer.py melange candidates/sample_candidate.json
```

### 2. Send an Offer Letter
```bash
python3 send_email.py <profile_name> <candidate_json_path>
```

### 3. Start the Signature Server
```bash
python3 signature_server.py
```
Then open `http://localhost:5001` to access the admin and signature portals.

## Adding New Profiles
Create a new directory in `profiles/` with:
- `config.json`: Email credentials and template paths.
- `offer_template.docx`: The actual document template.

## Placeholders
The system supports the following placeholders in `.docx` files:
- `{{Candidate Name}}`
- `{{Job Title}}`
- `{{Joining Date}}`
- `{{Offer Validity Days}}`
- `{{Probation Monthly Salary}}`
- `{{Probation Period Months}}`
- `{{Current Date}}`
