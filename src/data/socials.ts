export interface SocialLink {
  id: string;
  name: string;
  url: string;
  display: string;
  icon: string;
  category: 'social' | 'ctf' | 'security';
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/FaizaAlfa',
    display: 'github.com/FaizaAlfa',
    icon: 'github',
    category: 'social',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/faizaalfa',
    display: 'linkedin.com/in/faizaalfa',
    icon: 'linkedin',
    category: 'social',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/faizaalfa_25',
    display: '@faizaalfa_25',
    icon: 'instagram',
    category: 'social',
  },
];
