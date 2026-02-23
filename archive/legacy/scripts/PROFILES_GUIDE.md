# Multi-Company Profile System

## Overview

The system now supports multiple companies, each with their own:
- ✅ Email credentials
- ✅ Offer letter templates  
- ✅ Company-specific configurations
- ✅ Branding and signatures

## Available Profiles

### 1. **melange** - The Melange Studio ✅ CONFIGURED
- Email: hr.melangestudio@gmail.com
- Template: Configured
- Status: Ready to use

### 2. **urbanmistrii** - Urban Mistrii ⚠️ PENDING
- Email: TO_BE_CONFIGURED
- Template: Needs to be added
- Status: Placeholder created

### 3. **decoarte** - Deco Arte ⚠️ PENDING
- Email: TO_BE_CONFIGURED
- Template: Needs to be added
- Status: Placeholder created

## Quick Start

### Generate Offer Letter
```bash
python3 generate_offer.py <profile> <candidate.json>
```

**Example (Melange):**
```bash
python3 generate_offer.py melange examples/sample_candidate.json
```

### Send Email
```bash
python3 send_email.py <profile> <candidate.json>
```

**Example (Melange):**
```bash
python3 send_email.py melange examples/sample_candidate.json
```

## Complete Workflow

### For Melange Studio

```bash
# 1. Generate offer letter
python3 generate_offer.py melange examples/sample_candidate.json

# 2. Send email
python3 send_email.py melange examples/sample_candidate.json
```

Output will be in: `output/melange/offer_letter_Candidate_Name.pdf`

## Setting Up New Profiles

### For Urban Mistrii or Deco Arte:

**Step 1: Update Configuration**

Edit `profiles/urbanmistrii/config.json` (or `decoarte`):
```json
{
    "company_name": "Urban Mistrii",
    "email": "hr@urbanmistrii.com",
    "app_password": "YOUR_APP_PASSWORD_HERE",
    "office_address": "Your Office Address",
    ...
}
```

**Step 2: Add Template**

Place the Word template at:
- `profiles/urbanmistrii/offer_template.docx`, or
- `profiles/decoarte/offer_template.docx`

**Step 3: Test**

```bash
python3 generate_offer.py urbanmistrii examples/sample_candidate.json
python3 send_email.py urbanmistrii examples/sample_candidate.json
```

## Profile Structure

```
profiles/
├── melange/
│   ├── config.json          # Company configuration
│   └── offer_template.docx  # Word template
├── urbanmistrii/
│   ├── config.json
│   └── offer_template.docx
└── decoarte/
    ├── config.json
    └── offer_template.docx
```

## Configuration Options

Each `config.json` supports:

```json
{
    "company_name": "Company Name",
    "email": "hr@company.com",
    "app_password": "gmail_app_password",
    "template_docx": "path/to/template.docx",
    "offer_validity_days": 2,
    "probation_months": 3,
    "signature_portal_url": "http://localhost:5000",
    "email_signature": "Best regards,\nHR Team\nCompany Name",
    "office_address": "Full office address",
    "schedule_1_config": {
        "fill_rows": ["Basic", "Gross Compensation", ...],
        "use_lower_bound": true,
        "all_same_value": true
    }
}
```

## Output Organization

Outputs are organized by profile:

```
output/
├── melange/
│   ├── offer_letter_John_Doe.docx
│   └── offer_letter_John_Doe.pdf
├── urbanmistrii/
│   └── ...
└── decoarte/
    └── ...
```

## Updating Melange Template

To use the Google Docs template:

1. Download the template from Google Docs as .docx
2. Replace: `profiles/melange/offer_template.docx`
3. Regenerate offers with the new template

## Benefits

✅ **Separation**: Each company's offers are separate
✅ **Security**: Each company uses their own credentials
✅ **Scalability**: Easy to add new companies
✅ **Customization**: Each company can have unique templates and rules
✅ **Organization**: Clear folder structure

## Migration from Old Scripts

Old scripts still work, but use the new profile-based scripts for better organization:

**Old way:**
```bash
python3 src/offer_automation.py examples/candidate.json
python3 send_offer_email.py examples/candidate.json email password
```

**New way (recommended):**
```bash
python3 generate_offer.py melange examples/candidate.json
python3 send_email.py melange examples/candidate.json
```
