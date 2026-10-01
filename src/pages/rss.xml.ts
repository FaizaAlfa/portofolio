import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const writeups = await getCollection('writeups', ({ data }) => !data.draft);
  const sorted = writeups.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: `${siteConfig.handle} // CTF Writeups & Security Archive`,
    description: siteConfig.description,
    site: context.site || siteConfig.siteUrl,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/writeups/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>en-us</language>`,
  });
}
