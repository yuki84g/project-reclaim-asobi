from PIL import Image

def remove_bg_floodfill(image_path, output_path, tolerance=50):
    img = Image.open(image_path).convert("RGBA")
    
    # We will do a simple breadth-first search (BFS) flood fill from the edges
    width, height = img.size
    pixels = img.load()
    
    # Visited array to keep track
    visited = [[False for _ in range(height)] for _ in range(width)]
    
    # Queue for BFS
    queue = []
    
    # Define what is "background" color, we assume top-left pixel is a good background color
    bg_color = pixels[0, 0]
    
    def color_distance(c1, c2):
        return sum(abs(a - b) for a, b in zip(c1[:3], c2[:3]))
    
    # Initialize queue with boundary pixels that match the background color
    for x in range(width):
        if color_distance(pixels[x, 0], bg_color) <= tolerance:
            queue.append((x, 0))
            visited[x][0] = True
        if color_distance(pixels[x, height-1], bg_color) <= tolerance:
            queue.append((x, height-1))
            visited[x][height-1] = True
            
    for y in range(height):
        if color_distance(pixels[0, y], bg_color) <= tolerance:
            queue.append((0, y))
            visited[0][y] = True
        if color_distance(pixels[width-1, y], bg_color) <= tolerance:
            queue.append((width-1, y))
            visited[width-1][y] = True
            
    # Directions for 4-way connectivity
    dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    
    head = 0
    while head < len(queue):
        x, y = queue[head]
        head += 1
        
        # Set the pixel to transparent
        pixels[x, y] = (255, 255, 255, 0)
        
        # Check neighbors
        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height:
                if not visited[nx][ny]:
                    if color_distance(pixels[nx, ny], bg_color) <= tolerance:
                        visited[nx][ny] = True
                        queue.append((nx, ny))

    img.save(output_path, "PNG")

remove_bg_floodfill("/Users/yukiseki/.gemini/antigravity/scratch/project-reclaim-asobi/lp/assets/rin_character.png", "/Users/yukiseki/.gemini/antigravity/scratch/project-reclaim-asobi/lp/assets/rin_character_transparent.png", tolerance=80)
print("Finished background removal")
