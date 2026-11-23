import sys, json, os, math
from PIL import Image, ImageDraw, ImageFont

if len(sys.argv) < 3:
    print("Usage: python draw_heart_qr.py <temp_matrix.json> <public_dir>")
    sys.exit(1)

matrix_file = sys.argv[1]
public_dir = sys.argv[2]

with open(matrix_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

url = data.get('url', '')
size = data.get('size', 33)
matrix = data.get('matrix', [])

# Color definitions
COLOR_BG = (255, 253, 249, 255)       # Warm Cream White #FFFDF9
COLOR_CHERRY = (153, 27, 27, 255)      # Deep Cherry Red #991B1B
COLOR_CHERRY_DARK = (127, 29, 29, 255) # Dark Cherry #7F1D1D
COLOR_GOLD = (212, 175, 55, 255)       # Gold Accent #D4AF37
COLOR_GOLD_LIGHT = (253, 230, 138, 255)# Light Gold #FDE68A
COLOR_TEXT_DARK = (74, 14, 23, 255)    # #4A0E17

def is_finder_module(r, c, qr_size):
    # Top-left finder (0..7, 0..7 including 1-module quiet margin)
    if r < 8 and c < 8:
        return True
    # Top-right finder (0..7, size-8..size-1)
    if r < 8 and c >= qr_size - 8:
        return True
    # Bottom-left finder (size-8..size-1, 0..7)
    if r >= qr_size - 8 and c < 8:
        return True
    return False

# ========================================================
# 1. GENERATE ARTISTIC HEART QR (1000x1000px)
# ========================================================
img_w, img_h = 1000, 1000
img = Image.new('RGBA', (img_w, img_h), COLOR_BG)
draw = ImageDraw.Draw(img)

# QR layout calculations
quiet_zone_modules = 4
total_modules = size + (quiet_zone_modules * 2)
module_px = img_w / total_modules
offset_x = quiet_zone_modules * module_px
offset_y = quiet_zone_modules * module_px

# Heart silhouette helper
def is_inside_heart(nx, ny):
    # Normalized x from -1.3 to +1.3, ny from -1.3 to +1.3
    # Heart formula: (x^2 + y^2 - 1)^3 - x^2 * y^3 <= 0
    # Invert y because screen coords go down
    y = -ny + 0.25
    x = nx
    return (x**2 + y**2 - 1.0)**3 - (x**2) * (y**3) <= 0.05

# Draw soft heart silhouette aura in background
center_x = img_w / 2
center_y = img_h / 2
scale_r = img_w * 0.44

for step in range(12, 0, -1):
    alpha = int(4 + step * 2.5)
    r_val = scale_r + (step * 4)
    # Draw soft outer halo
    draw.ellipse([center_x - r_val, center_y - r_val, center_x + r_val, center_y + r_val], outline=(254, 205, 211, alpha), width=3)

# Draw QR Modules with artistic styling & high contrast
dot_radius = module_px * 0.45

for r in range(size):
    for c in range(size):
        if matrix[r][c] == 1:
            x0 = offset_x + c * module_px
            y0 = offset_y + r * module_px
            x1 = x0 + module_px
            y1 = y0 + module_px
            cx = (x0 + x1) / 2
            cy = (y0 + y1) / 2

            if is_finder_module(r, c, size):
                # Draw standard solid square module for 100% compliant finder patterns
                draw.rectangle([x0, y0, x1, y1], fill=COLOR_CHERRY)
            else:
                # Artistic rounded module
                r_offset = module_px * 0.12
                draw.rounded_rectangle([x0 + r_offset, y0 + r_offset, x1 - r_offset, y1 - r_offset], radius=int(module_px * 0.28), fill=COLOR_CHERRY)

# Draw decorative heart embellishments in outer corners outside quiet zone
def draw_mini_heart(dr, hx, hy, h_size, col):
    pts = []
    for deg in range(0, 360, 10):
        t = math.radians(deg)
        x = 16 * (math.sin(t) ** 3)
        y = -(13 * math.cos(t) - 5 * math.cos(2*t) - 2 * math.cos(3*t) - math.cos(4*t))
        pts.append((hx + x * (h_size / 34), hy + y * (h_size / 34)))
    dr.polygon(pts, fill=col)

# Outer corner delicate hearts
draw_mini_heart(draw, 50, 50, 24, COLOR_GOLD)
draw_mini_heart(draw, img_w - 50, 50, 24, COLOR_GOLD)
draw_mini_heart(draw, 50, img_h - 50, 24, COLOR_GOLD)
draw_mini_heart(draw, img_w - 50, img_h - 50, 24, COLOR_GOLD)

# Elegant thin gold perimeter border
draw.rounded_rectangle([18, 18, img_w - 18, img_h - 18], radius=24, outline=COLOR_GOLD, width=3)
draw.rounded_rectangle([24, 24, img_w - 24, img_h - 24], radius=20, outline=COLOR_GOLD_LIGHT, width=1)

heart_qr_path = os.path.join(public_dir, 'birthday-heart-qr.png')
img.save(heart_qr_path, 'PNG', optimize=True)
print(f"[draw_heart_qr] Saved Artistic Heart QR -> {heart_qr_path}")

# ========================================================
# 2. GENERATE ULTRA HIGH-RES PRINT CARD (2048x2048px, 300 DPI)
# ========================================================
hd_w, hd_h = 2048, 2048
hd_img = Image.new('RGB', (hd_w, hd_h), (255, 253, 249))
hd_draw = ImageDraw.Draw(hd_img)

# Luxury double border with gold and deep cherry
hd_draw.rectangle([40, 40, hd_w - 40, hd_h - 40], outline=COLOR_CHERRY, width=8)
hd_draw.rectangle([56, 56, hd_w - 56, hd_h - 56], outline=COLOR_GOLD, width=4)
hd_draw.rectangle([70, 70, hd_w - 70, hd_h - 70], outline=COLOR_CHERRY_DARK, width=2)

# Load fonts (fallback to default if system font not found)
try:
    font_title = ImageFont.truetype("arialbd.ttf", 68)
    font_subtitle = ImageFont.truetype("arial.ttf", 38)
    font_footer = ImageFont.truetype("arialbd.ttf", 40)
    font_url = ImageFont.truetype("arial.ttf", 32)
except Exception:
    font_title = ImageFont.load_default()
    font_subtitle = ImageFont.load_default()
    font_footer = ImageFont.load_default()
    font_url = ImageFont.load_default()

# Header text
title_text = "HAPPY BIRTHDAY MY LOVE"
hd_draw.text((hd_w / 2, 170), title_text, fill=COLOR_CHERRY, font=font_title, anchor="mm")

sub_text = "Sealed with Duas, Respect & Eternal Affection"
hd_draw.text((hd_w / 2, 240), sub_text, fill=COLOR_TEXT_DARK, font=font_subtitle, anchor="mm")

# Golden divider
hd_draw.line([(hd_w/2 - 250, 290), (hd_w/2 + 250, 290)], fill=COLOR_GOLD, width=3)
draw_mini_heart(hd_draw, hd_w / 2, 290, 28, COLOR_CHERRY)

# Paste the Heart QR in center at 1300x1300px
qr_resized = img.resize((1320, 1320), Image.Resampling.LANCZOS)
qr_x = int((hd_w - 1320) / 2)
qr_y = 350
hd_img.paste(qr_resized, (qr_x, qr_y), qr_resized)

# Footer instructions
footer_text = "Scan with your phone camera to open your surprise"
hd_draw.text((hd_w / 2, 1750), footer_text, fill=COLOR_CHERRY, font=font_footer, anchor="mm")

url_text = url
hd_draw.text((hd_w / 2, 1830), url_text, fill=(120, 113, 108), font=font_url, anchor="mm")

draw_mini_heart(hd_draw, hd_w / 2, 1910, 36, COLOR_GOLD)

hd_qr_path = os.path.join(public_dir, 'birthday-heart-qr-hd.png')
hd_img.save(hd_qr_path, 'PNG', dpi=(300, 300), optimize=True)
print(f"[draw_heart_qr] Saved High-Res Print Card -> {hd_qr_path}")
print("[draw_heart_qr] Rendering completed successfully.")

