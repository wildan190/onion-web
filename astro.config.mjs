// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

const site = 'https://mitrabawang.id';

/**
 * URL kanonik halaman publik (trailing slash = format build `directory` bawaan Astro).
 * Dipakai sebagai customPages supaya sitemap tetap mencakup semua halaman penting.
 */
const publicPageUrls = [
	`${site}/`,
	`${site}/about/`,
	`${site}/harga-bawang-merah-hari-ini/`,
	`${site}/exporter-red-onion-shallot-from-indonesia/`,
	`${site}/privacy-policy/`,
	`${site}/refund-and-returns-policy/`,
];

/**
 * @param {import('@astrojs/sitemap').SitemapItem} item
 */
function serializeSitemapItem(item) {
	let pathname = '';
	try {
		pathname = new URL(item.url).pathname;
	} catch {
		return item;
	}

	const slug = pathname.replace(/\/+$/, '') || '/';

	let priority = 0.75;

	if (slug === '/') {
		priority = 1;
	} else if (slug === '/harga-bawang-merah-hari-ini') {
		priority = 0.95;
	} else if (slug === '/about' || slug === '/exporter-red-onion-shallot-from-indonesia') {
		priority = 0.85;
	} else if (slug === '/privacy-policy' || slug === '/refund-and-returns-policy') {
		priority = 0.35;
	}

	return {
		url: item.url,
		links: item.links,
		priority,
	};
}

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [
		sitemap({
			customPages: publicPageUrls,
			serialize: serializeSitemapItem,
			namespaces: {
				news: false,
				xhtml: false,
				image: false,
				video: false,
			},
		}),
		icon(),
	],
});
