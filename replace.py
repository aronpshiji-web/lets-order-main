import os
import re

src_dir = '/Users/sal/Downloads/lets-order-main/src'

# First rename files and directories
for root, dirs, files in os.walk(src_dir, topdown=False):
    for name in files:
        if 'farmer' in name.lower() or 'harvest' in name.lower():
            new_name = re.sub(r'farmer', 'seller', name, flags=re.IGNORECASE)
            new_name = re.sub(r'harvest', 'product', new_name, flags=re.IGNORECASE)
            os.rename(os.path.join(root, name), os.path.join(root, new_name))
    for name in dirs:
        if 'farmer' in name.lower():
            new_name = re.sub(r'farmer', 'seller', name, flags=re.IGNORECASE)
            os.rename(os.path.join(root, name), os.path.join(root, new_name))

# Then replace content
def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    replacements = {
        'farmer': 'seller',
        'Farmer': 'Seller',
        'FARMER': 'SELLER',
        'harvest': 'product',
        'Harvest': 'Product',
        'HARVEST': 'PRODUCT',
        'crop': 'item',
        'Crop': 'Item',
        'CROP': 'ITEM',
        '🧑‍🌾': '🏬'
    }
    
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)

for root, dirs, files in os.walk(src_dir):
    for name in files:
        if name.endswith(('.jsx', '.js', '.css', '.html')):
            replace_in_file(os.path.join(root, name))

print("Done replacing.")
