import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const writeups = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writeups' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    event: z.string(),
    category: z.enum(['reverse', 'forensics', 'misc', 'crypto', 'web', 'pwn']),
    difficulty: z.enum(['easy', 'medium', 'hard', 'insane']),
    points: z.number().optional(),
    tags: z.array(z.string()),
    tools: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    status: z.enum(['active', 'archived', 'wip']),
  }),
});

const ctf = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/ctf' }),
  schema: z.object({
    event: z.string(),
    year: z.number(),
    team: z.string(),
    rank: z.number(),
    totalTeams: z.number().optional(),
    categoriesSolved: z.array(z.string()),
    link: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  writeups,
  projects,
  ctf,
};
