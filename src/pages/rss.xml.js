import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../data/site';
import { JURISDICTIONS } from '../data/jurisdictions';

export async function GET(context) {
  const pieces = await getCollection('opinion', ({ data }) => !data.draft);
  return rss({
    title: SITE.name,
    description: SITE.masthead.standfirst,
    site: context.site,
    items: pieces
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((p) => ({
        title: `[${JURISDICTIONS[p.data.jurisdiction].name}] ${p.data.title}`,
        description: p.data.dek,
        pubDate: p.data.date,
        link: `/${p.data.jurisdiction}/${p.id.split('/').pop()}/`
      }))
  });
}
