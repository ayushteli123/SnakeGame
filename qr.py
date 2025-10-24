import qrcode

# Take website input from user
website = input("Enter the website URL: ")

# Generate QR code
qr = qrcode.QRCode(
    version=1,  # size of the QR code (1 is small)
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,  # size of each box in pixels
    border=4,     # thickness of the border
)
qr.add_data(website)
qr.make(fit=True)

# Create an image of the QR code
img = qr.make_image(fill_color="black", back_color="white")

# Save the image
img.save("website_qr.png")

print("QR code generated and saved as website_qr.png!")
