# 🖼️ Image Compression Guide - Emblem.png

## 🔴 CRITICAL ISSUE
**Current emblem.png: 1,320.9 KiB** ❌
- Displayed at: 66×66px
- Actual size: 1024×1024px
- **Needs to be: <50KB**

## ✅ Solution: Compress & Generate Multiple Sizes

### Option 1: Online Tools (Quick)

1. **TinyPNG / TinyJPG** (https://tinypng.com)
   - Upload emblem.png
   - Download optimized version
   - Expected: 20-40KB

2. **ImageOptim** (Mac) / XnConvert (Windows)
   - Batch optimize PNG
   - Remove metadata
   - Expected result: <50KB

### Option 2: Command Line (Recommended)

```bash
# Install ImageMagick if not installed
brew install imagemagick

# Compress emblem.png (reduce quality, strip metadata)
magick public/assets/img/emblem.png \
  -strip \
  -quality 90 \
  -resize 1024x1024 \
  public/assets/img/emblem-opt.png

# Generate multiple sizes for responsive design
magick public/assets/img/emblem.png \
  -strip \
  -resize 40x40 \
  public/assets/img/emblem-40.png

magick public/assets/img/emblem.png \
  -strip \
  -resize 72x72 \
  public/assets/img/emblem-72.png

# Convert to WebP (even smaller)
magick public/assets/img/emblem.png \
  -strip \
  -quality 85 \
  public/assets/img/emblem.webp
```

### Option 3: Automated Script

```bash
npm run optimize:images
```

## 📝 Update HTML After Compression

```html
<!-- In SiteHeader.astro -->
<picture>
  <source srcset="/assets/img/emblem.webp" type="image/webp">
  <img
    class="brand-logo"
    src="/assets/img/emblem-40.png"
    alt=""
    width="40"
    height="40"
    decoding="async"
  />
</picture>
```

## ✅ Expected Results

| Format | Size | Time Saved |
|--------|------|-----------|
| Original PNG | 1,320 KB | baseline |
| Optimized PNG | 45 KB | **97% ↓** |
| WebP format | 28 KB | **98% ↓** |

## 🎯 Impact on Metrics

- **LCP**: -500ms (emblem is in critical path)
- **FCP**: -200ms
- **Total size reduction**: 1.2 MB per page load

⚠️ **ACTION REQUIRED**: Compress emblem.png ASAP!
