import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

export function publicImageUrl(...segments: string[]): string {
	return '/' + segments.map((segment) => encodeURIComponent(segment)).join('/');
}

export function getImagesFromPublicFolder(folder: string): string[] {
	const dir = path.join(process.cwd(), 'public', folder);

	if (!fs.existsSync(dir)) return [];

	return fs
		.readdirSync(dir)
		.filter((file) => IMAGE_EXT.test(file))
		.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
		.map((file) => publicImageUrl(folder, file));
}
