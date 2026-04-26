/** Profil situs & organisasi untuk JSON-LD (Schema.org). */

export const sameAsProfiles = [
	'https://www.tiktok.com/@mitrabawang.id',
	'https://www.facebook.com/share/1DUiYnV7bB/',
	'https://www.instagram.com/mitrabawang.id?igsh=MTgwcmttMTB6ZzJ0cQ==',
	'https://pin.it/6qHfRdXuR',
	'https://www.youtube.com/@mitrabawangid',
] as const;

export const siteEmail = 'mitrabawang.id@gmail.com';
export const siteTelephoneE164 = '+6281233624549';

/** Alamat gudang (satu baris + pecahan untuk PostalAddress). */
export const warehouse = {
	full: 'Manggihan Laban, RT.10/RW.03, Sambung, Kec. Godong, Kabupaten Grobogan, Jawa Tengah 58162, Indonesia.',
	streetAddress: 'Manggihan Laban, RT.10/RW.03, Sambung',
	addressLocality: 'Godong',
	addressRegion: 'Jawa Tengah',
	postalCode: '58162',
	addressCountry: 'ID',
} as const;

export function siteOrigin(site: URL | undefined): string {
	return site?.origin ?? 'https://mitrabawang.id';
}

export function orgId(origin: string): string {
	return `${origin}/#organization`;
}

export function websiteId(origin: string): string {
	return `${origin}/#website`;
}

export function logoUrl(origin: string): string {
	return `${origin}/assets/img/emblem.webp`;
}

export function postalAddressBlock() {
	return {
		'@type': 'PostalAddress',
		streetAddress: warehouse.streetAddress,
		addressLocality: warehouse.addressLocality,
		addressRegion: warehouse.addressRegion,
		postalCode: warehouse.postalCode,
		addressCountry: warehouse.addressCountry,
	};
}
