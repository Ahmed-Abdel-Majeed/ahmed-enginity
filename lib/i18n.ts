export const locales = ['en', 'ar'] as const
export type Locale = typeof locales[number]

export function isRTL(lang: Locale) {
  return lang === 'ar'
}

export function getDir(lang: Locale) {
  return isRTL(lang) ? 'rtl' : 'ltr'
}

export const t = {
  en: {
    nav: { about:'About', services:'Services', projects:'Projects', blog:'Blog', courses:'Courses', youtube:'YouTube', contact:'Contact', bookCall:'Book Call →' },
    hero: { badge:'Available for Projects · Based in Egypt', cta1:'View Projects', cta2:'Book a Consultation' },
    about: { label:'// About', title:'Building AI Systems\nThat Actually Work', p1s:'AI Automation Engineer', p2s:'intelligent, automated workflows', p3s:'n8n, OpenAI, LangChain, and Supabase' },
    services: { label:'// Services', title:'What I Build For You', sub:'End-to-end automation architecture designed for real business impact — not demos.' },
    projects: { label:'// Projects', title:'Production Systems Shipped', filterAll:'All', filterAI:'AI Agents', filterN8n:'n8n', filterWA:'WhatsApp', filterVoice:'Voice AI', filterCRM:'CRM', filterAuto:'Automation' },
    blog: { label:'// Blog', title:'Thoughts & Tutorials', sub:'Deep-dives into AI automation, n8n workflows, and production systems.', readMore:'Read Article →', minRead:'min read' },
    courses: { label:'// Courses', title:'Learn AI Automation', sub:'Practical Arabic courses teaching real systems, not theory.' },
    youtube: { label:'// YouTube', title:'Free Content Library', sub:'100K+ subscribers learning AI automation in Arabic.' },
    testimonials: { label:'// Testimonials', title:'What Clients Say', sub:'Real business impact from real automation systems.' },
    contact: { label:'// Contact', title:"Let's Build Your Next\nAI Automation System", sub:'Have a project in mind? Reach out — I usually reply within a few hours.', formTitle:'Send a Message', name:'Name', email:'Email', type:'Project Type', message:'Message', submit:'Send Message →', fastest:'Fastest response — usually within an hour', professional:'Professional profile & recommendations', freeTutorials:'Free tutorials & AI automation content' },
    footer: { copy:'© 2025 · Built with purpose, not templates', rights:'All rights reserved.' },
    chat: { title:"Ahmed's AI Assistant", status:'Online · Powered by n8n + OpenAI', placeholder:'Ask me anything…', welcome:"👋 Hi! I'm Ahmed's personal AI assistant.\nAsk me about services, projects, or anything else!" },
    theme: { dark:'Dark', light:'Light' },
    lang: 'العربية',
  },
  ar: {
    nav: { about:'عني', services:'الخدمات', projects:'المشاريع', blog:'المدونة', courses:'الكورسات', youtube:'يوتيوب', contact:'تواصل', bookCall:'← احجز مكالمة' },
    hero: { badge:'متاح للمشاريع · مصر', cta1:'عرض المشاريع', cta2:'احجز استشارة' },
    about: { label:'// عني', title:'بناء أنظمة ذكاء اصطناعي\nتعمل فعلاً', p1s:'مهندس أتمتة ذكاء اصطناعي', p2s:'مسارات عمل ذكية تلقائية', p3s:'n8n و OpenAI و LangChain و Supabase' },
    services: { label:'// الخدمات', title:'ما أبنيه لك', sub:'هندسة أتمتة متكاملة مصممة لتأثير حقيقي على الأعمال — لا مجرد عروض.' },
    projects: { label:'// المشاريع', title:'أنظمة حقيقية تم إطلاقها', filterAll:'الكل', filterAI:'وكلاء AI', filterN8n:'n8n', filterWA:'واتساب', filterVoice:'صوتي', filterCRM:'CRM', filterAuto:'أتمتة' },
    blog: { label:'// المدونة', title:'مقالات وشروحات', sub:'تعمق في أتمتة الذكاء الاصطناعي وسير عمل n8n والأنظمة الإنتاجية.', readMore:'اقرأ المقال →', minRead:'دقيقة قراءة' },
    courses: { label:'// الكورسات', title:'تعلم أتمتة الذكاء الاصطناعي', sub:'كورسات عربية عملية تعلم أنظمة حقيقية لا مجرد نظرية.' },
    youtube: { label:'// يوتيوب', title:'مكتبة محتوى مجانية', sub:'+100K مشترك يتعلمون أتمتة الذكاء الاصطناعي باللغة العربية.' },
    testimonials: { label:'// آراء العملاء', title:'ماذا يقول العملاء', sub:'تأثير تجاري حقيقي من أنظمة أتمتة حقيقية.' },
    contact: { label:'// تواصل', title:'لنبني نظام الذكاء الاصطناعي\nالتالي معاً', sub:'لديك مشروع في ذهنك؟ تواصل معي — عادة ما أرد خلال ساعات.', formTitle:'أرسل رسالة', name:'الاسم', email:'البريد الإلكتروني', type:'نوع المشروع', message:'الرسالة', submit:'← إرسال الرسالة', fastest:'أسرع رد — عادة خلال ساعة', professional:'الملف المهني والتوصيات', freeTutorials:'دروس مجانية ومحتوى أتمتة الذكاء الاصطناعي' },
    footer: { copy:'© 2025 · مبني بهدف', rights:'جميع الحقوق محفوظة.' },
    chat: { title:'المساعد الذكي لأحمد', status:'متصل · يعمل بـ n8n + OpenAI', placeholder:'اكتب سؤالك هنا…', welcome:'👋 أهلاً! أنا المساعد الشخصي لأحمد.\nاسألني عن الخدمات أو المشاريع أو أي شيء آخر!' },
    theme: { dark:'داكن', light:'فاتح' },
    lang: 'English',
  }
} as const
