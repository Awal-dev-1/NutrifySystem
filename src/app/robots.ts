import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://nutrifygh--studio-228615184-8a100.europe-west4.hosted.app/sitemap.xml',
  }
}
