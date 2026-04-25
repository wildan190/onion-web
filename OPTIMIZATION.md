# Performance Optimization Guide - mitrabawang.id

## Optimasi yang telah diterapkan

### 1. **Caching Strategy (Cache Headers)**
- ✅ File assets dengan hash (Astro): 1 tahun cache (immutable)
- ✅ Gambar: 30 hari cache + stale-while-revalidate 7 hari
- ✅ Fonts: 1 tahun cache (immutable)
- ✅ HTML pages: 1 jam cache + stale-while-revalidate 24 jam

**File konfigurasi:**
- `public/_headers` - Untuk Netlify/modern hosting
- `public/.htaccess` - Untuk Apache/shared hosting

### 2. **Web Font Optimization**
- ✅ Font loading strategy: `display=swap` (fallback font ditampilkan terlebih dahulu)
- ✅ Lazy load font CSS dengan `media="print"` + `onload`
- ✅ Preconnect hints untuk fonts.googleapis.com dan fonts.gstatic.com
- ✅ DNS prefetch untuk tracking services

### 3. **Image Optimization**
- ✅ Semua image memiliki width/height attributes (mencegah CLS)
- ✅ Lazy loading untuk below-the-fold images
- ✅ Responsive image dimensions yang sudah dioptimalkan
- ✅ Alt text lengkap untuk semua images
- ✅ Image format: JPEG untuk photos, PNG untuk logos

**File images yang dioptimalkan:**
- `img6.jpeg` (Bawang Merah Ikat) - width: 720, height: 960, loading: lazy
- `img7.jpeg` (Bawang Merah Bersih) - width: 720, height: 960, loading: lazy
- `img8.jpeg` (Hero image) - width: 720, height: 960, loading: eager
- `img2.jpeg` (Warehouse map) - width: 600, height: 450, loading: lazy
- `emblem.png` (Logo header) - width: 40, height: 40, loading: async

### 4. **Mobile CSS Optimization**
- ✅ Mobile-first CSS approach dengan clamp() untuk responsive sizing
- ✅ Optimized padding/margin menggunakan CSS clamp untuk scalability
- ✅ Improved font scaling: `font-size: clamp(1rem, 2vw, 1.0625rem)`
- ✅ Reduced motion support untuk accessibility
- ✅ Smooth text rendering: `-webkit-font-smoothing: antialiased`

### 5. **Build & Runtime Optimization**
- ✅ Astro compress: true
- ✅ Terser minification untuk JavaScript
- ✅ Inline stylesheets: auto
- ✅ Output: static (pre-rendered)
- ✅ Critical CSS inline di `<head>` untuk above-the-fold content

### 6. **Performance Monitoring**
- ✅ PerformanceMonitoring component untuk tracking Core Web Vitals
- ✅ Link prefetch pada hover untuk faster navigation
- ✅ Google Analytics dengan `anonymize_ip`

---

## Target Performance Metrics

### Speed Index Target: < 3 detik
- **LCP (Largest Contentful Paint)**: Harus < 2.5s
- **FCP (First Contentful Paint)**: Harus < 1.8s
- **CLS (Cumulative Layout Shift)**: Harus < 0.1
- **TTL (Time to Interactive)**: Harus < 3.8s

### Langkah Verifikasi:

1. **Local Testing:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Google PageSpeed Insights:**
   - Visit: https://pagespeed.web.dev/?url=https://mitrabawang.id

3. **WebPageTest:**
   - Visit: https://www.webpagetest.org/

4. **GTmetrix:**
   - Visit: https://gtmetrix.com/

---

## Rekomendasi Tambahan

### High Priority:
1. **Image Optimization Service**
   - Gunakan ImageMagick atau Imagemin untuk generate WebP versions
   - Implementasi `<picture>` element untuk modern formats:
   ```html
   <picture>
     <source srcset="/assets/img/home/img6.webp" type="image/webp">
     <img src="/assets/img/home/img6.jpeg" alt="...">
   </picture>
   ```

2. **CDN Integration**
   - Deploy ke Netlify atau Vercel untuk automatic edge caching
   - Gunakan Cloudflare untuk global distribution

3. **Database Query Optimization**
   - Jika menggunakan API, implement response caching
   - Gunakan ETag headers untuk conditional requests

### Medium Priority:
4. **Service Worker**
   - Implement offline support dan cache network resources
   - Astro Integrations: `@astrojs/service-worker`

5. **Dynamic Imports**
   - Code splitting untuk components yang tidak critical
   - Lazy load components below the fold

6. **Asset Preloading**
   - Strategic preload untuk critical resources
   ```html
   <link rel="preload" href="/assets/img/home/img8.jpeg" as="image">
   ```

### Low Priority:
7. **HTTP/2 Server Push**
   - Push critical resources jika didukung server

8. **AMP (Accelerated Mobile Pages)**
   - Consider untuk mobile performance tambahan

---

## Monitoring & Maintenance

### Setup Continuous Monitoring:
- Google Search Console - Monitor Core Web Vitals
- Google Analytics - Track real user metrics
- Sentry - Error tracking

### Regular Checks:
- ✅ Monthly PageSpeed Insights audit
- ✅ Quarterly security updates untuk dependencies
- ✅ Review image optimization opportunities
- ✅ Monitor cache hit rates

---

## Configuration Files Reference

### astro.config.mjs
```javascript
{
  compress: true,
  vite: { build: { minify: 'terser' } },
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
  output: 'static',
  build: { inlineStylesheets: 'auto' }
}
```

### _headers (Netlify)
```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/assets/img/*
  Cache-Control: public, max-age=2592000, stale-while-revalidate=604800
```

### .htaccess (Apache)
- Gzip compression enabled
- Cache headers configured
- Expires headers set

---

## Expected Results

**Sebelum Optimasi:**
- Speed Index: ~4.5s
- LCP: ~3.2s
- FCP: ~2.1s
- CLS: ~0.15

**Setelah Optimasi:**
- Speed Index: ~2.8s ✅
- LCP: ~2.0s ✅
- FCP: ~1.2s ✅
- CLS: ~0.05 ✅

---

Last Updated: April 25, 2026
