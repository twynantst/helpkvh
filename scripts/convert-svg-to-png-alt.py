"""
SVG naar PNG converter met PIL + svglib
Installeer: pip install svglib reportlab pillow
"""
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM
from PIL import Image

svg_files = [
    ("../docs/assets/qrs/bodega-qr-icon.svg", "../docs/assets/qrs/bodega-qr-icon.png"),
    ("../docs/assets/qrs/eetdag-qr-icon.svg", "../docs/assets/qrs/eetdag-qr-icon.png")
]

for svg_path, png_path in svg_files:
    # SVG naar RenderPM drawing object
    drawing = svg2rlg(svg_path)
    
    # Render naar PNG
    renderPM.drawToFile(drawing, png_path, fmt='PNG')
    
    # Resize naar 80x80
    img = Image.open(png_path)
    img = img.resize((80, 80), Image.Resampling.LANCZOS)
    img.save(png_path)
    
    print(f"Converted {svg_path} -> {png_path} (80x80)")
