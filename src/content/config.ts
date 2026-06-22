import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqs = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/faqs' }),
	schema: z.object({
		order: z.number().int().positive(),
		question: z.string(),
	}),
});

export const collections = {
	faqs,
};
