#!/usr/bin/env python3
"""
Send offer letters via email
Simple script to email offer letter PDFs to candidates
"""

import smtplib
import json
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders
from pathlib import Path
import sys

def send_offer_letter(candidate_data_path, pdf_path, sender_email, sender_password):
    """Send offer letter PDF via email"""
    
    # Load candidate data
    with open(candidate_data_path, 'r') as f:
        data = json.load(f)
    
    recipient_email = data.get('email')
    candidate_name = data.get('name')
    position = data.get('position')
    
    # Create email
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = f"Offer Letter - {position} Position at The Melange Studio"
    
    # Email body
    body = f"""Dear {candidate_name},

Congratulations! 🎉

We are delighted to extend an offer for the position of {position} at The Melange Studio.

Please find your offer letter attached to this email. Kindly review the terms and conditions carefully.

To accept this offer, please:
1. Review the attached offer letter
2. Visit the signature portal: http://localhost:5000
3. Sign digitally and submit

If you have any questions or need clarification, please don't hesitate to reach out.

We look forward to welcoming you to our team!

Best regards,
HR Team
The Melange Studio
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
        
    except smtplib.SMTPAuthenticationError:
        print("❌ Authentication failed. Please check your email and app password.")
        print("💡 Tip: Use an App Password, not your regular Gmail password.")
        print("   Generate one at: https://myaccount.google.com/apppasswords")
        return False
        
    except Exception as e:
        print(f"❌ Email failed: {e}")
        return False

def main():
    if len(sys.argv) != 4:
        print("Usage: python3 send_offer_email.py <candidate.json> <sender_email> <app_password>")
        print("\nExample:")
        print("  python3 send_offer_email.py examples/sample_candidate.json your.email@gmail.com your_app_password")
        print("\n💡 Note: Use Gmail App Password, not your regular password")
        print("   Generate at: https://myaccount.google.com/apppasswords")
        sys.exit(1)
    
    candidate_file = sys.argv[1]
    sender_email = sys.argv[2]
    sender_password = sys.argv[3]
    
    # Load candidate data to get name
    with open(candidate_file, 'r') as f:
        data = json.load(f)
    
    candidate_name = data['name'].replace(' ', '_')
    pdf_path = Path('output') / f'offer_letter_{candidate_name}.pdf'
    
    if not pdf_path.exists():
        print(f"❌ PDF not found: {pdf_path}")
        print("💡 Generate the offer letter first using:")
        print(f"   python3 src/offer_automation.py {candidate_file}")
        sys.exit(1)
    
    print(f"📄 Found PDF: {pdf_path}")
    send_offer_letter(candidate_file, pdf_path, sender_email, sender_password)

if __name__ == "__main__":
    main()
