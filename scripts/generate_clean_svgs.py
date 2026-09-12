import os
import urllib.request
import subprocess
from PIL import Image, ImageDraw, ImageFont

FONTS_DIR = "scripts/fonts"
OUTPUT_DIR = "scripts/output"

os.makedirs(FONTS_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Font URLs from Google Fonts github (OFL/Apache)
FONT_URLS = {
    "GreatVibes": "https://raw.githubusercontent.com/google/fonts/main/ofl/greatvibes/GreatVibes-Regular.ttf",
    "Playfair": "https://raw.githubusercontent.com/google/fonts/main/ofl/playfairdisplay/PlayfairDisplay-Regular.ttf",
    "PlayfairItalic": "https://raw.githubusercontent.com/google/fonts/main/ofl/playfairdisplay/PlayfairDisplay-Italic.ttf",
    "CinzelDec": "https://raw.githubusercontent.com/google/fonts/main/ofl/cinzeldecorative/CinzelDecorative-Regular.ttf",
    "Cinzel": "https://raw.githubusercontent.com/google/fonts/main/ofl/cinzel/Cinzel-Regular.ttf",
    "NotoUrdu": "https://raw.githubusercontent.com/google/fonts/main/ofl/notonastaliqurdu/NotoNastaliqUrdu-Regular.ttf",
    "NotoArabic": "https://raw.githubusercontent.com/google/fonts/main/ofl/notonaskharabic/NotoNaskhArabic-Regular.ttf",
    "Shippori": "https://raw.githubusercontent.com/google/fonts/main/ofl/shipporimincho/ShipporiMincho-Regular.ttf",
    "Kaisei": "https://raw.githubusercontent.com/google/fonts/main/ofl/kaiseidecol/KaiseiDecol-Regular.ttf"
}

fonts = {}

print("Downloading fonts...")
for name, url in FONT_URLS.items():
    font_path = os.path.join(FONTS_DIR, f"{name}.ttf")
    if not os.path.exists(font_path):
        urllib.request.urlretrieve(url, font_path)
    fonts[name] = font_path

def generate_title(name, draw_func):
    # Render at high resolution
    img = Image.new("L", (2000, 1000), "white")
    draw = ImageDraw.Draw(img)
    
    draw_func(draw, img.width, img.height)
    
    png_path = os.path.join(OUTPUT_DIR, f"{name}.png")
    svg_path = os.path.join(OUTPUT_DIR, f"{name}.svg")
    
    # Save the high-res black on white image
    img.save(png_path)
    
    # Trace with vtracer
    # vtracer requires input and output args. 
    # mode='spline' or 'polygon'. Spline is smoother.
    print(f"Tracing {name}...")
    try:
        subprocess.run([
            "vtracer", 
            "--input", png_path, 
            "--output", svg_path, 
            "--mode", "spline",
            "--colormode", "binary", # Black and white
            "--hierarchical", "stacked",
            "--filter_speckle", "10",
            "--path_precision", "3"
        ], check=True)
    except Exception as e:
        print(f"Failed to trace {name}: {e}")

# Drawing functions
def draw_paris(draw, w, h):
    font = ImageFont.truetype(fonts["GreatVibes"], 600)
    text = "Paris"
    bbox = draw.textbbox((0, 0), text, font=font)
    draw.text(((w - (bbox[2]-bbox[0]))/2, (h - (bbox[3]-bbox[1]))/2 - 100), text, font=font, fill="black")

def draw_amsterdam(draw, w, h):
    font = ImageFont.truetype(fonts["Playfair"], 450)
    text = "Amsterdam"
    bbox = draw.textbbox((0, 0), text, font=font)
    draw.text(((w - (bbox[2]-bbox[0]))/2, (h - (bbox[3]-bbox[1]))/2), text, font=font, fill="black")

def draw_venice(draw, w, h):
    font_main = ImageFont.truetype(fonts["Cinzel"], 500)
    font_sub = ImageFont.truetype(fonts["Cinzel"], 100)
    
    text_main = "VENICE"
    bbox1 = draw.textbbox((0, 0), text_main, font=font_main)
    main_w = bbox1[2] - bbox1[0]
    draw.text(((w - main_w)/2, h/2 - 250), text_main, font=font_main, fill="black")
    
    text_sub = "— ITALY —"
    bbox2 = draw.textbbox((0, 0), text_sub, font=font_sub)
    sub_w = bbox2[2] - bbox2[0]
    draw.text(((w - sub_w)/2, h/2 + 250), text_sub, font=font_sub, fill="black")

def draw_kyoto(draw, w, h):
    font_main = ImageFont.truetype(fonts["Kaisei"], 550)
    font_sub = ImageFont.truetype(fonts["Shippori"], 250)
    
    text_main = "Kyoto"
    bbox1 = draw.textbbox((0, 0), text_main, font=font_main)
    draw.text((300, (h - (bbox1[3]-bbox1[1]))/2 - 150), text_main, font=font_main, fill="black")
    
    # Draw Japanese vertically
    draw.text((300 + bbox1[2] + 50, h/2 - 100), "京\n都", font=font_sub, fill="black")

def draw_lahore(draw, w, h):
    font_main = ImageFont.truetype(fonts["PlayfairItalic"], 500)
    font_sub = ImageFont.truetype(fonts["NotoUrdu"], 200)
    
    text_main = "Lahore"
    bbox1 = draw.textbbox((0, 0), text_main, font=font_main)
    draw.text((400, (h - (bbox1[3]-bbox1[1]))/2 - 200), text_main, font=font_main, fill="black")
    
    text_sub = "لاہور"
    draw.text((700, h/2 + 150), text_sub, font=font_sub, fill="black")

def draw_marrakech(draw, w, h):
    font_main = ImageFont.truetype(fonts["CinzelDec"], 450)
    font_sub = ImageFont.truetype(fonts["NotoArabic"], 250)
    
    text_main = "Marrakech"
    bbox1 = draw.textbbox((0, 0), text_main, font=font_main)
    draw.text((200, (h - (bbox1[3]-bbox1[1]))/2 - 150), text_main, font=font_main, fill="black")
    
    text_sub = "مراكش"
    draw.text((800, h/2 + 150), text_sub, font=font_sub, fill="black")

print("Generating images and tracing SVGs...")
generate_title("Paris", draw_paris)
generate_title("Amsterdam", draw_amsterdam)
generate_title("Venice", draw_venice)
generate_title("Kyoto", draw_kyoto)
generate_title("Lahore", draw_lahore)
generate_title("Marrakech", draw_marrakech)

print("Done.")
