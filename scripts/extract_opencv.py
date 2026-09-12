import cv2
import numpy as np
import subprocess
import os

OUTPUT_DIR = "scripts/output"
os.makedirs(OUTPUT_DIR, exist_ok=True)
IMG_PATH = r"C:\Users\limit\.gemini\antigravity\brain\7d76daa1-5db3-47b4-bfa0-611bedf72649\.user_uploaded\media_1789224068621.jpg"

print("Loading image...")
img = cv2.imread(IMG_PATH)
h, w = img.shape[:2]

# The image is a 2x3 grid. Let's define the bounding boxes for the titles roughly.
# Each cell is w/2 wide, h/3 high.
cw = w // 2
ch = h // 3

# Lahore (Top Left)
# Marrakech (Top Right)
# Paris (Mid Left)
# Amsterdam (Mid Right)
# Kyoto (Bot Left)
# Venice (Bot Right)

titles = {
    "Lahore": (0, 0, int(cw*0.4), int(ch*0.4)), # Crop top-left of the first cell
    "Marrakech": (cw, 0, cw + int(cw*0.5), int(ch*0.4)),
    "Paris": (0, ch, int(cw*0.4), ch + int(ch*0.4)),
    "Amsterdam": (cw, ch, cw + int(cw*0.6), ch + int(ch*0.4)),
    "Kyoto": (0, ch*2, int(cw*0.4), ch*2 + int(ch*0.4)),
    "Venice": (cw, ch*2, cw + int(cw*0.5), ch*2 + int(ch*0.5))
}

for name, (x1, y1, x2, y2) in titles.items():
    print(f"Extracting {name}...")
    crop = img[y1:y2, x1:x2]
    
    # Convert to grayscale
    gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
    
    # The text is white/light on dark backgrounds.
    # Let's use adaptive thresholding to isolate the white text.
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    _, thresh = cv2.threshold(blur, 200, 255, cv2.THRESH_BINARY)
    
    # Morphological operations to clean noise
    kernel = np.ones((2,2), np.uint8)
    clean = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)
    clean = cv2.morphologyEx(clean, cv2.MORPH_CLOSE, kernel)
    
    # Invert so text is black on white (vtracer expects this)
    inv = cv2.bitwise_not(clean)
    
    # Resize heavily to smooth out jagged artifacts before tracing
    inv_large = cv2.resize(inv, (0,0), fx=4, fy=4, interpolation=cv2.INTER_CUBIC)
    
    # Convert to RGB before saving
    png_path = os.path.join(OUTPUT_DIR, f"{name}_clean.png")
    svg_path = os.path.join(OUTPUT_DIR, f"{name}.svg")
    
    final_img_rgb = cv2.cvtColor(final_img, cv2.COLOR_GRAY2RGB)
    cv2.imwrite(png_path, final_img_rgb)
    
    import vtracer
    try:
        vtracer.convert_image_to_svg_py(
            png_path,
            svg_path,
            colormode="color",
            hierarchical="stacked",
            mode="spline",
            filter_speckle=20,
            path_precision=3
        )
        print(f"Traced {name}")
    except Exception as e:
        print(f"Error tracing {name}: {e}")

print("Done")
