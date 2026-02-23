# How to Send Offer Letters via Email

## Quick Start

### Step 1: Generate Gmail App Password
1. Go to https://myaccount.google.com/apppasswords
2. Sign in to your Gmail account
3. Select app: "Mail"
4. Select device: "Other" → Enter "Offer Letter System"
5. Click "Generate"
6. Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)

### Step 2: Send Email

```bash
cd /Users/yashrakhiani/Desktop/OfferLetterAutomation
python3 send_offer_email.py examples/sample_candidate.json your.email@gmail.com "your_app_password"
```

**Example:**
```bash
python3 send_offer_email.py examples/sample_candidate.json hr@melangestudio.com "abcd efgh ijkl mnop"
```

## What Gets Sent

The email includes:
- **Subject**: Offer Letter - [Position] Position at The Melange Studio
- **Body**: Personalized congratulations message
- **Attachment**: Offer letter PDF
- **Instructions**: Link to digital signature portal

## Complete Workflow

### 1. Generate Offer Letter
```bash
python3 src/offer_automation.py examples/sample_candidate.json
```

### 2. Review PDF
```bash
open output/offer_letter_Mariya_Fatima.pdf
```

### 3. Send Email
```bash
python3 send_offer_email.py examples/sample_candidate.json hr@email.com "app_password"
```

### 4. Candidate Signs
- Candidate receives email
- Opens signature portal link
- Reviews offer and signs digitally
- Signed PDF sent back automatically

## Troubleshooting

### "Authentication failed"
- You're using your regular Gmail password instead of App Password
- Generate App Password at: https://myaccount.google.com/apppasswords

### "PDF not found"
- Generate the offer letter first:
  ```bash
  python3 src/offer_automation.py examples/sample_candidate.json
  ```

### "Less secure app access"
- Gmail no longer supports this
- You MUST use App Passwords (not regular passwords)

## Email Template

The sent email looks like:

```
Subject: Offer Letter - Architecture Intern Position at The Melange Studio

Dear Mariya Fatima,

Congratulations! 🎉

We are delighted to extend an offer for the position of Architecture Intern at The Melange Studio.

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

[Attachment: Offer_Letter_Mariya_Fatima.pdf]
```

## Security Notes

⚠️ **Never commit your App Password to git!**
- Keep it in a secure password manager
- Don't share it in code or documentation
- Consider using environment variables for production

## Alternative: Use Existing Script

You can also use the built-in email feature:
```bash
python3 src/offer_automation.py examples/sample_candidate.json --email sender@gmail.com "app_password"
```
