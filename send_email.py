#!/usr/bin/env python3
"""
Profile-based Email Sender
Sends offer letters using company-specific email credentials
"""

import smtplib
import json
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders
from pathlib import Path
import sys

def load_profile(profile_name):
    """Load company profile configuration"""
    profile_path = Path('profiles') / profile_name / 'config.json'
    
    if not profile_path.exists():
        print(f"❌ Profile '{profile_name}' not found!")
        print(f"Available profiles: melange, urbanmistrii, decoarte")
        sys.exit(1)
    
    with open(profile_path, 'r') as f:
        return json.load(f)

def send_offer_email(candidate_data_path, pdf_path, profile):
    """Send offer letter PDF via email using profile credentials"""
    
    # Load candidate data
    with open(candidate_data_path, 'r') as f:
        data = json.load(f)
    
    recipient_email = data.get('email')
    candidate_name = data.get('name')
    position = data.get('position')
    
    sender_email = profile['email']
    sender_password = profile['app_password']
    company_name = profile['company_name']
    
    if sender_password == "TO_BE_CONFIGURED":
        print(f"❌ Email credentials not configured for {company_name}")
        print(f"💡 Update the app_password in profiles/{profile['email'].split('@')[0]}/config.json")
        return False
    
    # Create email
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = f"Offer Letter - {position} Position at {company_name}"
    
    # Email body
    body = f"""Dear {candidate_name},

Congratulations! 🎉

We are delighted to extend an offer for the position of {position} at {company_name}.

Please find your offer letter attached to this email. Kindly review the terms and conditions carefully.

To accept this offer:
1. Review the attached offer letter
2. Print and sign the document
3. Scan and email the signed copy back to us

Alternatively, you may apply your digital signature to the PDF and email it back.

If you have any questions or need clarification, please don't hesitate to reach out.

We look forward to welcoming you to our team!

{profile['email_signature']}
"""
    
    msg.attach(MIMEText(body, 'plain'))
    
    # Attach PDF
    with open(pdf_path, 'rb') as f:
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(f.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename=Offer_Letter_{candidate_name.replace(" ", "_")}.pdf')
        msg.attach(part)
    
    # Send email
    try:
        print(f"📧 Connecting to Gmail SMTP server...")
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        
        print(f"🔐 Logging in as {sender_email}...")
        server.login(sender_email, sender_password)
        
        print(f"📤 Sending email to {recipient_email}...")
        server.send_message(msg)
        server.quit()
        
        print(f"✅ Email sent successfully to {candidate_name} ({recipient_email})")
        return True
        
    except Exception as e:
        print(f"❌ Email failed: {e}")
        return False

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 send_email.py <profile> <candidate.json>")
        print("\nProfiles:")
        print("  melange      - The Melange Studio")
        print("  urbanmistrii - Urban Mistrii")
        print("  decoarte     - Deco Arte")
        print("\nExample:")
        print("  python3 send_email.py melange examples/sample_candidate.json")
        sys.exit(1)
    
    profile_name = sys.argv[1]
    candidate_file = sys.argv[2]
    
    # Load profile
    print(f"📋 Loading profile: {profile_name}")
    profile = load_profile(profile_name)
    
    # Load candidate data
    with open(candidate_file, 'r') as f:
        data = json.load(f)
    
    # Find PDF
    candidate_name = data['name'].replace(' ', '_')
    pdf_path = Path('output') / profile_name / f'offer_letter_{candidate_name}.pdf'
    
    if not pdf_path.exists():
        print(f"❌ PDF not found: {pdf_path}")
        print("💡 Generate the offer letter first using:")
        print(f"   python3 generate_offer.py {profile_name} {candidate_file}")
        sys.exit(1)
    
    print(f"📄 Found PDF: {pdf_path}")
    print(f"🏢 Company: {profile['company_name']}")
    send_offer_email(candidate_file, pdf_path, profile)

if __name__ == "__main__":
    main()
