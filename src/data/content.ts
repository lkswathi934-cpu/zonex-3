export const AGENCY = {
  name: 'ZoneX Growth Hub',
  email: 'hello@zonexgrowthhub.com',
  phone: '+1 (415) 555-0199',
  whatsapp: 'https://wa.me/14155550199',
  calendar: 'https://calendly.com/zonex-growth/strategy-call',
  office: 'San Francisco · Dubai · Remote Worldwide',
  socials: {
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
    twitter: 'https://twitter.com',
  },
};

export const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  { label: 'Live Projects', href: '#portfolio' },
  { label: 'ROI Estimator', href: '#roi' },
  { label: 'Reels Showcase', href: '#reels' },
  { label: 'Process', href: '#process' },
  { label: 'FAQs', href: '#faqs' },
];


export const HERO_STATS: HeroStat[] = [
  { prefix: '$', suffix: 'M+', target: 2.5, decimals: 1, label: 'Ad Budget Scaled' },
  { suffix: '+', target: 180, decimals: 0, label: 'Successful Launches' },
  { suffix: '%', target: 99.2, decimals: 1, label: 'Client Satisfaction' },
  { suffix: '/5', target: 4.9, decimals: 1, star: true, label: 'Average Rating' },
];

export const PORTFOLIO_FILTERS = ['All Work', 'Web Development', 'Video Reels & Ads', 'Brand Identity', 'SEO Growth'] as const;

export interface ReelItem {
  id: number;
  title: string;
  type: string;
  views: string;
  image: string;
  caption: string;
  video?: string;
}

export const REELS: ReelItem[] = [
  {
    id: 1,
    title: 'Product Launch Reel',
    type: 'Instagram Reel',
    views: '2.4M views',
    image: 'https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'High-impact product reveal with motion graphics & VFX transitions',
    video: 'https://files.catbox.moe/0dtism.mp4',
  },
  {
    id: 2,
    title: 'Brand Story Ad',
    type: 'Meta Ad Creative',
    views: '1.1M views',
    image: 'https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Cinematic founder story scaled with high engagement & CTR',
    video: 'https://files.catbox.moe/bl5ukt.mp4',
  },
  {
    id: 3,
    title: 'Sneaker Promo Reel',
    type: 'Footwear Brand Ad',
    views: '890K views',
    image: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Dynamic footwear commercial edit with crisp cuts, beat sync, and color grading',
    video: 'https://files.catbox.moe/7fyys1.mp4',
  },
  {
    id: 4,
    title: 'Gym Motivation',
    type: 'Aesthetic Fitness Edit',
    views: '3.2M views',
    image: 'https://images.pexels.com/photos/3888405/pexels-photo-3888405.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'High-energy aesthetic gym motivation edit with beat-synced cuts, sound design, and color grading',
    video: 'https://files.catbox.moe/xasar8.mp4',
  },
  {
    id: 5,
    title: 'Gym Workout Edit',
    type: 'Aesthetic Fitness Edit',
    views: '2.1M views',
    image: 'https://images.pexels.com/photos/9644820/pexels-photo-9644820.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Intense weightlifting workout edit with cinematic color grading and sound design',
    video: 'https://files.catbox.moe/tdgw2u.mp4',
  },
  {
    id: 6,
    title: 'Fitness Promo',
    type: 'Aesthetic Fitness Edit',
    views: '1.7M views',
    image: 'https://images.pexels.com/photos/12600444/pexels-photo-12600444.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Dynamic fitness promo with crisp transitions, body-weight training, and pump footage',
    video: 'https://files.catbox.moe/4fwyia.mp4',
  },
  {
    id: 7,
    title: 'Aesthetic Pump',
    type: 'Aesthetic Fitness Edit',
    views: '2.8M views',
    image: 'https://images.pexels.com/photos/6388452/pexels-photo-6388452.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Aesthetic pump edit featuring dynamic stretching and gym atmosphere with beat sync',
    video: 'https://files.catbox.moe/amft9l.mp4',
  },
];

export interface ServiceItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  deliverables: string[];
  image: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    icon: 'Rocket',
    title: 'Full Business Setup & Brand Building',
    description: 'From concept to launch — complete brand identity, visual assets, and go-to-market foundation.',
    deliverables: ['Brand Strategy & Positioning', 'Logo & Visual Identity', 'Brand Guidelines', 'Launch Assets'],
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    icon: 'Share2',
    title: 'Social Media Management',
    description: 'End-to-end social growth with content calendars, community engagement, and platform strategy.',
    deliverables: ['Content Calendar', 'Daily Posting', 'Community Management', 'Growth Analytics'],
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    icon: 'Palette',
    title: 'Creative Graphic & Poster Design',
    description: 'High-CTR ad creatives, sales collateral, and scroll-stopping visual design that converts.',
    deliverables: ['Ad Creatives', 'Social Graphics', 'Sales Collateral', 'Brand Posters'],
    image: 'https://images.pexels.com/photos/323503/pexels-photo-323503.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    icon: 'Video',
    title: 'Professional Video Editing & Production',
    description: 'Instagram Reels, YouTube Shorts, and VFX-driven ad content engineered for virality.',
    deliverables: ['Reels & Shorts', 'VFX & Motion Graphics', 'Ad Video Edits', 'Sound Design'],
    image: 'https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    icon: 'PenTool',
    title: 'Content Creation & Strategy',
    description: 'Viral scripts, sales copy, and full-funnel copywriting that drives action at every stage.',
    deliverables: ['Viral Scripts', 'Sales Copywriting', 'Content Strategy', 'Email Copy'],
    image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 6,
    icon: 'Mail',
    title: 'Email Marketing & Sales Funnels',
    description: 'Drip campaigns, automations, and lifecycle flows that turn subscribers into repeat buyers.',
    deliverables: ['Drip Campaigns', 'Automation Flows', 'Lifecycle Emails', 'Funnel Optimization'],
    image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 7,
    icon: 'Globe',
    title: 'Website Design & Development',
    description: 'Shopify, WordPress, Webflow, and custom React UI — high-converting sites built to scale.',
    deliverables: ['Shopify / WordPress', 'Custom React UI', 'Webflow Builds', 'CRO Optimization'],
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 8,
    icon: 'Search',
    title: 'Search Engine Optimization',
    description: 'On-page, technical, and Google Business Profile local SEO that dominates search rankings.',
    deliverables: ['On-Page SEO', 'Technical Audit', 'GBP Local SEO', 'Link Building'],
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 9,
    icon: 'Target',
    title: 'Performance Marketing & Paid Ads',
    description: 'Meta Ads, Google PPC, and CRO — profitably scaled campaigns with full-funnel attribution.',
    deliverables: ['Meta Ads Management', 'Google PPC', 'CRO Testing', 'Attribution Setup'],
    image: 'https://images.pexels.com/photos/5900499/pexels-photo-5900499.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 10,
    icon: 'BarChart3',
    title: 'Advanced Analytics & ROI Reporting',
    description: 'GA4, Meta Pixel, and live dashboards — full transparency into every dollar and every conversion.',
    deliverables: ['GA4 Setup', 'Meta Pixel', 'Live Dashboards', 'ROI Reports'],
    image: 'https://images.pexels.com/photos/5900511/pexels-photo-5900511.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 11,
    icon: 'Presentation',
    title: 'Premium Pitch Decks & Portfolios',
    description: 'Investor presentations, sales assets, and portfolio decks that win deals and raise capital.',
    deliverables: ['Investor Decks', 'Sales Assets', 'Portfolio Design', 'Brand Storytelling'],
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const TECH_STACK = ['Meta Ads', 'Google Ads', 'Figma', 'Shopify', 'Premiere Pro', 'CapCut', 'WordPress', 'GA4', 'Webflow'];

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  growth: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    company: 'Luxe Apparel Co.',
    rating: 5,
    text: 'Nexus rebuilt our entire funnel and ad strategy. We went from $40k/mo to $180k/mo in under 90 days. The creative team is world-class.',
    growth: '+340% Revenue',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Co-Founder',
    company: 'FlowSaaS',
    rating: 5,
    text: 'Our organic traffic 5x\'d and we now rank #1 for our top commercial keywords. The SEO and content engine they built is unmatched.',
    growth: '5x Organic Traffic',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 3,
    name: 'Aisha Patel',
    role: 'Owner',
    company: 'Saffron Kitchen',
    rating: 5,
    text: '600+ daily orders through our new web app. The ordering platform, delivery tracking, and ad campaigns all just work flawlessly.',
    growth: '600+ Daily Orders',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 4,
    name: 'James Whitfield',
    role: 'CEO',
    company: 'Vertex Studios',
    rating: 5,
    text: 'Our new brand identity and interactive website won two design awards. Investor meetings have never been easier — the deck speaks for itself.',
    growth: '2x Design Awards',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const FAQS: FAQ[] = [
  {
    id: 1,
    question: 'What is the typical timeline for a full project launch?',
    answer: 'Brand identity and website builds take 3–6 weeks depending on scope. Ad campaigns can go live within 7 days of onboarding. Full multi-channel growth systems are typically operational within 30 days.',
  },
  {
    id: 2,
    question: 'Do I have control over my ad budget and spending?',
    answer: 'Absolutely. You own all ad accounts and retain full control of budget. We provide transparent recommendations, but every dollar spent is authorized by you. We never spend without your approval.',
  },
  {
    id: 3,
    question: 'Do you offer performance guarantees?',
    answer: 'While no agency can ethically guarantee specific revenue, we guarantee our process, deliverables, and strategic execution. Our 99.2% client satisfaction rate reflects our commitment. If something isn\'t working, we pivot fast — weekly optimization is built into every engagement.',
  },
  {
    id: 4,
    question: 'What deliverables are included in each engagement?',
    answer: 'Every engagement includes a custom roadmap, all creative assets, campaign setup, analytics dashboards, and weekly reporting. Specific deliverables scale with your chosen service tier — from single-channel campaigns to full-funnel growth systems.',
  },
  {
    id: 5,
    question: 'How does communication and reporting work?',
    answer: 'You get a dedicated account manager, a shared Slack channel, and access to a live dashboard with real-time metrics. We hold weekly strategy calls and send detailed ROI reports every Monday.',
  },
  {
    id: 6,
    question: 'What industries do you specialize in?',
    answer: 'We have deep experience in e-commerce, SaaS, restaurants & hospitality, creative studios, and local service businesses. Our frameworks adapt across industries — the growth principles are universal.',
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Free Audit & Strategy',
    description: 'We deep-dive into your brand, competitors, and current metrics — then deliver a free 15-minute audit with actionable growth opportunities.',
    icon: 'Search',
  },
  {
    step: 2,
    title: 'Custom Roadmap & Assets',
    description: 'A tailored growth roadmap, brand assets, ad creatives, and funnel architecture — all built specifically for your market and goals.',
    icon: 'Map',
  },
  {
    step: 3,
    title: 'Launch & Multi-Channel Scale',
    description: 'We launch campaigns across Meta, Google, organic, and email — then scale what works with daily budget optimization.',
    icon: 'Rocket',
  },
  {
    step: 4,
    title: 'Daily Tracking & ROI Optimization',
    description: 'Live dashboards, weekly reports, and continuous CRO. We don\'t just launch — we compound results month over month.',
    icon: 'TrendingUp',
  },
];

export const BEFORE_AFTER = [
  { label: 'Return on Ad Spend', before: '1.2x ROAS', after: '4.2x ROAS' },
  { label: 'Lead Generation', before: 'Manual outreach', after: 'Automated funnels' },
  { label: 'Creative Quality', before: 'Template graphics', after: 'Premium custom design' },
  { label: 'Reporting', before: 'Monthly guesswork', after: 'Live real-time dashboards' },
  { label: 'Time to Scale', before: '6–12 months', after: '30–90 days' },
  { label: 'Brand Perception', before: 'Generic / forgettable', after: 'Market leader aesthetic' },
];

export interface Project {
  id: number;
  title: string;
  category: 'Web Development' | 'Video Reels & Ads' | 'Brand Identity' | 'SEO Growth';
  metric: string;
  metricColor: string;
  url: string;
  tech: string[];
  description: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'ZoneX Academy Platform',
    category: 'Web Development',
    metric: 'Live Project',
    metricColor: 'emerald',
    url: 'https://zonex-academy.com',
    tech: ['React', 'Node.js', 'LMS', 'GA4'],
    description: 'Official ed-tech learning platform built for seamless course delivery and student engagement.',
    image: '/assets/images/WhatsApp_Image_2026-08-06_at_3.32.41_PM.jpeg',
  },
  {
    id: 2,
    title: 'SaaS Tech Platform & SEO',
    category: 'SEO Growth',
    metric: '#1 Google Rank',
    metricColor: 'cyan',
    url: 'https://example.com',
    tech: ['Next.js', 'Webflow', 'Ahrefs', 'Schema'],
    description: 'Technical SEO overhaul and content engine for a B2B SaaS — ranking #1 for 40+ commercial keywords and driving 5x organic traffic.',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 3,
    title: 'Restaurant & Food Chain Web App',
    category: 'Web Development',
    metric: '600+ Daily Orders',
    metricColor: 'gold',
    url: 'https://example.com',
    tech: ['React Native', 'Node.js', 'Stripe', 'Maps API'],
    description: 'A multi-location ordering platform with real-time delivery tracking, loyalty rewards, and a 600+ daily order run rate.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 4,
    title: 'Digital Marketing Portfolio',
    category: 'Brand Identity',
    metric: 'Live Project',
    metricColor: 'royal',
    url: 'https://lithin-digital-marke-7he4.bolt.host',
    tech: ['React', 'Framer Motion', 'Tailwind', 'Vite'],
    description: 'High-converting interactive web portfolio showcasing digital marketing agency capabilities and UI animations.',
    image: '/assets/images/WhatsApp_Image_2026-08-06_at_3.38.35_PM.jpeg',
  },
];

