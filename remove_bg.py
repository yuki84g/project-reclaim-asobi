from PIL import Image

def make_white_transparent(image_path, output_path, tolerance=30):
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    # Any color close to white
    for item in datas:
        # Check if pixel is near white
        if item[0] >= 255 - tolerance and item[1] >= 255 - tolerance and item[2] >= 255 - tolerance:
            # Change to transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

make_white_transparent("/Users/yukiseki/.gemini/antigravity/scratch/project-reclaim-asobi/lp/assets/rin_character.png", "/Users/yukiseki/.gemini/antigravity/scratch/project-reclaim-asobi/lp/assets/rin_character_transparent.png")
