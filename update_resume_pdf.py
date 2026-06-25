from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from pathlib import Path

resume_text_path = Path(r'c:\Users\anubh\OneDrive\Desktop\My Webiste\resume_text.txt')
pdf_path = Path(r'c:\Users\anubh\OneDrive\Desktop\My Webiste\resume\Resume.pdf')
text = resume_text_path.read_text(encoding='utf-8')

c = canvas.Canvas(str(pdf_path), pagesize=letter)
width, height = letter
margin = 50
y = height - margin
line_height = 14

for raw_line in text.splitlines():
    line = raw_line.strip()
    if not line:
        y -= line_height
        continue
    if y < margin + 50:
        c.showPage()
        y = height - margin
    if line == 'ANUBHUTI PAL':
        c.setFont('Helvetica-Bold', 18)
        c.drawString(margin, y, line)
        y -= 24
        continue
    if line in ('Summary', 'Skills', 'Experience', 'Projects', 'Certifications', 'Education'):
        c.setFont('Helvetica-Bold', 12)
        c.drawString(margin, y, line)
        y -= 18
        continue
    if line.startswith('- '):
        c.setFont('Helvetica', 10)
        c.drawString(margin + 10, y, line)
    else:
        c.setFont('Helvetica', 10)
        c.drawString(margin, y, line)
    y -= line_height

c.save()
print('Updated PDF generated at', pdf_path)
