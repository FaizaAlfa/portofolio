export interface SkillItem {
  name: string;
  level?: 'Proficient' | 'Advanced' | 'Familiar';
  description?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  icon?: string;
  badge: string;
  description: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Reverse Engineering',
    badge: 'Primary Focus',
    description: 'Analisis statis & dinamis binary, dekompilasi bytecode, debugging, dan analisis aplikasi Android.',
    skills: [
      { name: 'Ghidra', highlight: true },
      { name: 'GDB', highlight: true },
      { name: 'x64dbg', highlight: true },
      { name: 'r2 (radare2)', highlight: true },
      { name: 'pycdc', highlight: true },
      { name: 'Android Studio', highlight: true },
    ],
  },
  {
    title: 'Digital Forensics',
    badge: 'Secondary Focus',
    description: 'Analisis disk image, ekstraksi artefak Windows, inspeksi lalu lintas jaringan, dan steganografi.',
    skills: [
      { name: 'FTK Imager', highlight: true },
      { name: 'Autopsy', highlight: true },
      { name: 'Wireshark', highlight: true },
      { name: 'binwalk', highlight: true },
      { name: 'ExifTool', highlight: true },
      { name: 'Stegano / Stegsolve', highlight: true },
      { name: 'Eric Zimmerman Tools', highlight: true },
    ],
  },
  {
    title: 'Programming & Core Tools',
    badge: 'Core Tools',
    description: 'Bahasa pemrograman sistem, scripting otomatisasi eksploitasi, solver, dan analisis bytecode.',
    skills: [
      { name: 'C / C++', highlight: true },
      { name: 'Python 3', highlight: true },
      { name: 'x86 / x64 Assembly', highlight: true },
      { name: 'Bash', highlight: true },
      { name: 'Java', highlight: true },
    ],
  },
  {
    title: 'System & Infrastructure',
    badge: 'Environment',
    description: 'Sistem operasi, containerization, kontrol versi, dan isolasi lingkungan sandboxing malware.',
    skills: [
      { name: 'Linux', highlight: true },
      { name: 'Docker', highlight: true },
      { name: 'Git', highlight: true },
      { name: 'VMware', highlight: true },
    ],
  },
  {
    title: 'Progress Belajar',
    badge: 'Learning Roadmap',
    description: 'Teknologi, bahasa modern, dan topik infrastruktur yang sedang dipelajari dan dieksplorasi secara aktif.',
    skills: [
      { name: 'Kotlin', highlight: false },
      { name: 'Rust', highlight: false },
      { name: 'Flutter', highlight: false },
      { name: 'Jaringan Komputer', highlight: false },
      { name: 'Cloud Computing', highlight: false },
    ],
  },
];

export const currentlyPlaying = [
  { platform: 'CTFtime.org', notes: 'Active player with University Team' },
  { platform: 'HackTheBox', notes: 'Proving Grounds & Forensics/Reversing Tracks' },
  { platform: 'CyberDefenders', notes: 'Blue-team & Memory forensics labs' },
  { platform: 'Crackmes.one', notes: 'Solving x86/x64 crackme binaries' },
];

export const currentlyLearning = [
  { topic: 'Kotlin & Android Reversing', progress: 'Exploring' },
  { topic: 'Rust Systems Programming', progress: 'In Progress' },
  { topic: 'Computer Networks & Protocols', progress: 'Learning' },
  { topic: 'Cloud Security Fundamentals', progress: 'Exploring' },
];
