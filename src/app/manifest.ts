import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Nutrify',
    short_name: 'Nutrify',
    description: 'Your AI-powered nutrition companion for healthy eating in Ghana.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    display_override: ["standalone", "window-controls-overlay"],
    prefer_related_applications: false,
    orientation: 'portrait',
    background_color: '#f1f7f5',
    theme_color: '#00b371',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      }
    ],
  }
}
