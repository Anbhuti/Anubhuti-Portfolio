import os
import sys

def extract_pdf():
    try:
        import pypdf
        reader = pypdf.PdfReader(r"c:\Users\anubh\OneDrive\Desktop\My Webiste\resume\Anubhuti Pal.pdf")
        text = ""
        for i, page in enumerate(reader.pages):
            text += f"--- Page {i+1} ---\n"
            text += page.extract_text() + "\n"
        
        with open(r"c:\Users\anubh\OneDrive\Desktop\My Webiste\resume_text.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print("Success! Extracted with pypdf.")
        return True
    except ImportError:
        print("pypdf not installed. Trying to install and run...")
        return False

if __name__ == "__main__":
    if not extract_pdf():
        os.system("pip install pypdf")
        if extract_pdf():
            print("Successfully installed pypdf and extracted text.")
        else:
            print("Failed to extract even after installation.")
