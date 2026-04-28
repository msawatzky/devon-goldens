import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const dogs = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/dogs' }),
	schema: z.object({
		name: z.string(),
		label: z.string(),
		image: z.string(),
		group: z.enum(['Parents', 'Previous Litter', 'Current Litter']),
		role: z.enum(['Mama', 'Stud', 'Puppy']).optional(),
	}),
});

const faqs = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/faqs' }),
	schema: z.object({
		order: z.number().int().positive(),
		question: z.string(),
	}),
});

export const collections = {
	dogs,
	faqs,
};
