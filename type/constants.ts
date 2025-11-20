import { Project, Major, Competition } from './types';
import ProjexHub from '../assets/projexhub.png';
import SulimanOS from '../assets/suliman-os.png';
import CardsGenerate from '../assets/cardsgenerate.png';
import EduPlatform from '../assets/eduplatform.png';
import CineMax from '../assets/cinemax.png';


export const SAUDI_UNIVERSITIES = [
  "جامعة طيبة",
  "جامعة الملك سعود",
  "جامعة الملك عبدالعزيز",
  "جامعة الملك فهد للبترول والمعادن",
  "جامعة الإمام محمد بن سعود الإسلامية",
  "جامعة الأميرة نورة بنت عبدالرحمن",
  "جامعة الملك فيصل",
  "جامعة القصيم",
  "جامعة أم القرى",
  "جامعة الملك خالد",
  "جامعة جازان",
  "جامعة حائل",
  "جامعة الجوف",
  "جامعة نجران",
  "جامعة الباحة",
  "جامعة تبوك",
  "جامعة الحدود الشمالية",
  "جامعة شقراء",
  "جامعة المجمعة",
  "جامعة الأمير سطام بن عبدالعزيز",
  "الجامعة السعودية الإلكترونية",
  "جامعة جدة",
  "جامعة بيشة",
  "جامعة حفر الباطن",
  "جامعة الطائف",
  "جامعة الأمير محمد بن فهد",
  "جامعة الفيصل",
  "جامعة دار العلوم",
  "جامعة اليمامة",
  "كليات الشرق العربي",
  "كليات المعرفة",
  "جامعة الرياض الهلم",
  "أخرى"
];

export const TECH_MAJORS = [
  "هندسة البرمجيات (Software Engineering)",
  "علوم الحاسب (Computer Science)",
  "نظم المعلومات (Information Systems)",
  "تقنية المعلومات (Information Technology)",
  "الأمن السيبراني (Cybersecurity)",
  "هندسة الحاسب (Computer Engineering)",
  "الذكاء الاصطناعي (Artificial Intelligence)",
  "علم البيانات (Data Science)",
  "إنترنت الأشياء (IoT)",
  "الحوسبة السحابية (Cloud Computing)",
  "هندسة الشبكات (Network Engineering)",
  "تصميم وتطوير الألعاب (Game Development)",
  "الروبوتات (Robotics)",
  "نظم المعلومات الإدارية (MIS)",
  "الوسائط المتعددة (Multimedia)",
  "أخرى"
];

// Generate years from 2000 to 2030 in descending order
export const GRADUATION_YEARS = Array.from({ length: 31 }, (_, i) => (2030 - i).toString());

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'projexhub-platform',
    title: 'ProjexHub - منصة تبادل المشاريع',
    description: 'المنصة الأولى لتوثيق وإبراز مشاريع التخرج الجامعية في المملكة العربية السعودية.',
    longDescription: 'منصة متكاملة تهدف إلى جمع مشاريع التخرج للطلاب في مكان واحد، مما يسهل عملية البحث، التوثيق، والتواصل بين الطلاب، المشرفين، والشركات. تدعم المنصة ميزات متقدمة مثل الدردشة، لوحة التحكم، والمسابقات.',
    author: { name: 'سليمان يوسف', initial: 'س', avatarColor: 'bg-primary-600', role: 'Full Stack Developer', username: '@su05l' },
    university: 'جامعة طيبة',
    major: Major.CS,
    year: 2025,
    likes: 999,
    views: 35000,
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Node.js'],
    badge: { text: 'إبداعي', color: 'blue' },
    thumbnail: ProjexHub,
    demoUrl: 'https://projexhub.sa',
    comments: []
  },
  {
    id: '2',
    slug: 'suliman-os-portfolio',
    title: 'Suliman OS - Windows Style Portfolio',
    description: 'موقع شخصي تفاعلي يحاكي نظام تشغيل ويندوز، يعرض المهارات والمشاريع بأسلوب مبتكر.',
    longDescription: 'تجربة مستخدم فريدة من نوعها تحول السيرة الذاتية التقليدية إلى سطح مكتب تفاعلي. يمكن للمستخدم فتح النوافذ، تصفح الملفات، وتشغيل التطبيقات المصغرة داخل المتصفح.',
    author: { name: 'سليمان يوسف', initial: 'س', avatarColor: 'bg-primary-600', role: 'Full Stack Developer', username: '@su05l' },
    university: 'جامعة طيبة',
    major: Major.CS,
    year: 2025,
    likes: 999,
    views: 35000,
    tags: ['React', 'CSS Modules', 'OS Simulation', 'Portfolio'],
    badge: { text: 'مميز', color: 'indigo' },
    thumbnail: SulimanOS,
    demoUrl: 'https://suliman-os.vercel.app/',
    sourceUrl: 'https://github.com/Su03l/suliman-os-profile',
    comments: []
  },
  {
    id: '3',
    slug: 'generate-cards',
    title: 'Generate Cards',
    description: 'A web application to create, customize, and share digital business cards.',
    longDescription: 'تطبيق ويب متطور يسمح للمستخدمين بإنشاء بطاقات عمل رقمية قابلة للتخصيص بالكامل. يوفر خيارات متعددة للألوان، الخطوط، وتخطيطات التصميم، مع إمكانية مشاركة البطاقة عبر رابط مباشر أو QR Code.',
    author: { name: 'سليمان يوسف', initial: 'س', avatarColor: 'bg-primary-600', role: 'Full Stack Developer', username: '@su05l' },
    university: 'جامعة طيبة',
    major: Major.CS,
    year: 2025,
    likes: 999,
    views: 35000,
    tags: ['Next.js', 'React js', 'Tailwind CSS', 'Typescript', 'Shadcn UI'],
    badge: { text: 'تقني', color: 'blue' },
    thumbnail: CardsGenerate,
    demoUrl: 'https://cards-generate.vercel.app/',
    sourceUrl: 'https://github.com/Su03l/Cards-Generate',
    comments: []
  },
  {
    id: '4',
    slug: 'educational-platform',
    title: 'Educational Platform',
    description: 'An educational platform that brings together the best programming tutorials from YouTube in one place.',
    longDescription: 'منصة تعليمية تهدف إلى تبسيط رحلة التعلم للمطورين من خلال تجميع وتصنيف أفضل الشروحات البرمجية من يوتيوب. توفر المنصة مسارات تعلم منظمة وواجهة مستخدم خالية من المشتتات.',
    author: { name: 'سليمان يوسف', initial: 'س', avatarColor: 'bg-primary-600', role: 'Full Stack Developer', username: '@su05l' },
    university: 'جامعة طيبة',
    major: Major.CS,
    year: 2025,
    likes: 999,
    views: 35000,
    tags: ['React Js', 'CSS', 'Typescript', 'MUi UI', 'React Router', 'Vite'],
    badge: { text: 'تعليمي', color: 'green' },
    thumbnail: EduPlatform,
    demoUrl: 'https://educa-platform.vercel.app/',
    sourceUrl: 'https://github.com/Su03l/education-platform',
    comments: []
  },
  {
    id: '5',
    slug: 'cinemax-platform',
    title: 'CineMax Platform',
    description: 'CineMax is a modern cinema website for browsing movies and booking tickets online.',
    longDescription: 'منصة سينمائية حديثة تتيح للمستخدمين استعراض أحدث الأفلام، مشاهدة العروض التشويقية، وحجز التذاكر عبر الإنترنت. تتميز بتصميم عصري وتجربة حجز سلسة.',
    author: { name: 'سليمان يوسف', initial: 'س', avatarColor: 'bg-primary-600', role: 'Full Stack Developer', username: '@su05l' },
    university: 'جامعة طيبة',
    major: Major.CS,
    year: 2025,
    likes: 999,
    views: 35000,
    tags: ['Next JS', 'React Js', 'API Integration'],
    badge: { text: 'ترفيه', color: 'purple' },
    thumbnail: CineMax,
    demoUrl: 'https://cine-max.vercel.app/',
    sourceUrl: 'https://github.com/Su03l/CineMax',
    comments: []
  }
];

export const COMPETITIONS: Competition[] = [];