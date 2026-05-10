#!/usr/bin/env python3
from PIL import Image
import os

here = os.path.dirname(os.path.abspath(__file__))
input_path = os.path.join(here, '..', 'public', 'res', 'ed', 'profile_head.png')
output_path = os.path.join(here, '..', 'public', 'res', 'ed', 'profile_head_alpha.png')

print('Input:', input_path)
print('Output:', output_path)

img = Image.open(input_path).convert('RGBA')
px = img.getdata()
new_px = []
# Threshold for "near-white" background
threshold = 245
for r, g, b, a in px:
    if r >= threshold and g >= threshold and b >= threshold:
        new_px.append((r, g, b, 0))
    else:
        new_px.append((r, g, b, a))

img.putdata(new_px)
img.save(output_path, 'PNG')
print('Saved', output_path)
