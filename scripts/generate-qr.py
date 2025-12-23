
import qrcode
from PIL import Image

# URL voor QR-code
# Opmerking: PIL kan geen SVG lezen, gebruik PNG versies
url = [["https://samenvoorkoen.be", "logo.png"], 
       ["https://samenvoorkoen.be/bodega", "..\\docs\\assets\\qrs\\bodega-qr-icon.png"], 
       ["https://samenvoorkoen.be/eten", "..\\docs\\assets\\qrs\\eetdag-qr-icon.png"]]

for entry in url:
    url = entry[0]
    logo_path = entry[1]

    # QR-code genereren
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H)  # Hoge foutcorrectie
    qr.add_data(url)
    qr.make(fit=True)

    img_qr = qr.make_image(fill_color="black", back_color="white").convert('RGB')

    # Logo laden
    logo = Image.open(logo_path)

    # Logo schalen
    logo_size = 80
    logo = logo.resize((logo_size, logo_size))

    # Positie berekenen (midden)
    pos = ((img_qr.size[0] - logo_size) // 2, (img_qr.size[1] - logo_size) // 2)

    # Logo toevoegen
    img_qr.paste(logo, pos)

    # Opslaan
    output_filename = "qr_" + url.split("/")[-1] + ".png"
    img_qr.save(output_filename)
    
# # QR-code genereren
# qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H)  # Hoge foutcorrectie
# qr.add_data(url)
# qr.make(fit=True)

# img_qr = qr.make_image(fill_color="black", back_color="white").convert('RGB')

# # Logo laden
# logo = Image.open("logo.png")

# # Logo schalen
# logo_size = 80
# logo = logo.resize((logo_size, logo_size))

# # Positie berekenen (midden)
# pos = ((img_qr.size[0] - logo_size) // 2, (img_qr.size[1] - logo_size) // 2)

# # Logo toevoegen
# img_qr.paste(logo, pos)

# # Opslaan
# img_qr.save("qr_website.png")
