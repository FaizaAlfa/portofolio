export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  title: string;
  tagline: string;
  author: string;
  handle: string;
  description: string;
  siteUrl: string;
  email: string;
  location: string;
  university: string;
  semester: string;
  major: string;
  specialization: string[];
  navItems: NavItem[];
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
    ctftime: string;
    pgpFingerprint?: string;
  };
}

export const siteConfig: SiteConfig = {
  title: 'Portofolio',
  tagline: 'Cybersecurity Student • Reverse Engineering & Digital Forensics',
  author: 'Faiza',
  handle: 'FAZer0',
  description: 'Personal portfolio and CTF writeup archive of Faiza (FAZer0), Informatics Engineering student at Universitas Brawijaya specializing in Reverse Engineering and Digital Forensics.',
  siteUrl: 'https://fazer0.dev',
  email: 'algdfz257@gmail.com',
  location: 'Malang, Indonesia',
  university: 'Universitas Brawijaya',
  semester: 'Semester 3',
  major: 'Teknik Informatika',
  specialization: ['Reverse Engineering', 'Digital Forensics', 'Binary Analysis'],

  navItems: [
    { label: 'About', href: '/#about' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Projects', href: '/projects' },
    { label: 'Writeups', href: '/writeups' },
    { label: 'Contact', href: '/#contact' },
  ],

  socials: {
    github: 'https://github.com/FaizaAlfa',
    linkedin: 'https://linkedin.com/in/faizaalfa',
    instagram: 'https://instagram.com/faizaalfa_25',
    ctftime: 'https://ctftime.org/user/FAZer0', // TODO(Faiza): Update with your real CTFtime profile URL
  },
};
