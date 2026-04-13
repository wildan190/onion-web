// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

const site = 'https://mitrabawang.id';

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

	// Remove trailing slash for the final URL in sitemap, unless it's just the domain.
	let finalUrl = item.url;
	if (finalUrl.length > site.length && finalUrl.endsWith('/')) {
		finalUrl = finalUrl.slice(0, -1);
	}

	return {
		url: finalUrl,
		links: item.links,
		priority,
	};
}

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [
		sitemap({
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
