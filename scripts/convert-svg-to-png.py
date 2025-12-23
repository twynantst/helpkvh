"""
SVG naar PNG converter
Installeer eerst: pip install cairosvg
"""
import cairosvg

svg_files = [
    ("../docs/assets/qrs/bodega-qr-icon.svg", "../docs/assets/qrs/bodega-qr-icon.png"),
    ("../docs/assets/qrs/eetdag-qr-icon.svg", "../docs/assets/qrs/eetdag-qr-icon.png")
]

for svg_path, png_path in svg_files:
    cairosvg.svg2png(url=svg_path, write_to=png_path, output_width=80, output_height=80)
    print(f"Converted {svg_path} -> {png_path}")
