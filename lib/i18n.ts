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
    nav: { about:'About', services:'Services', projects:'Case Studies', blog:'Blog', courses:'Courses', youtube:'YouTube', contact:'Contact', bookCall:'Book a Free Audit →' },
    hero: { eyebrow:'AI AUTOMATION ENGINEER · EGYPT / MENA', headline:'I Build AI Systems That Automate Your Business.', sub:'I help businesses automate repetitive work, capture more leads, and operate 24/7 with production-ready AI systems.', capabilities:'WhatsApp AI · Voice AI · CRM Automation · n8n · AI Agents', cta1:'Book a Free Automation Audit →', cta2:'See My Work →', trust:'50+ production systems · 30+ AI agents · 5+ years experience' },
    proof: { title:'Built for real businesses. Built for production.' },
    whoIHelp: { title:'Built For Businesses That Want To Automate.', sub:'I design automation systems around the way your business actually operates.' },
    services: { label:'// Services', title:'What I Can Automate For Your Business', sub:'End-to-end AI automation designed around real business workflows — not demos.', cta:'See an Example →' },
    projects: { label:'// Case Studies', title:'Real Systems. Real Business Results.', sub:'A selection of AI automation systems built for real-world workflows.', filterAll:'All', filterAI:'AI Agents', filterN8n:'n8n', filterWA:'WhatsApp', filterVoice:'Voice AI', filterCRM:'CRM', filterAuto:'Automation', builtLabel:'Built:', resultLabel:'Result:', viewCaseStudy:'View Case Study →' },
    howItWorks: { label:'// Methodology', title:'From Problem → Production', sub:'A simple, battle-tested 5-step process for deploying AI automations into your workflow.' },
    about: { label:'// About Ahmed', title:'Building AI Systems That Actually Work', sub:'Client-focused engineering for real operational results.' },
    enginity: { label:'// Enginity Studio', title:'Ahmed Abdelmajeid', subtitle:'Founder / AI Automation Engineer at Enginity', desc:'Enginity is the AI automation studio built to help businesses deploy and operate production-ready AI systems.' },
    blog: { label:'// Blog', title:'Thoughts & Tutorials', sub:'Deep-dives into AI automation, n8n workflows, and production systems.', readMore:'Read Article →', minRead:'min read' },
    courses: { label:'// Courses', title:'Learn AI Automation', sub:'Practical Arabic courses for building real automation systems.', cta:'Explore Courses →' },
    youtube: { label:'// YouTube', title:'Learn From What I Build', sub:'Free tutorials on AI automation, n8n workflows and production systems.', cta:'Watch More on YouTube →' },
    testimonials: { label:'// Testimonials', title:'What Clients Say', sub:'Real business impact from real automation systems.' },
    contact: { label:'// Contact', title:"Let's Automate Your Next Business Process.", sub:'Have a repetitive workflow, lead problem or manual process in mind? Tell me what you\'re trying to automate.', formTitle:'Get My Automation Plan', name:'Name', email:'Work Email', type:'What do you want to automate?', message:'Tell me about your business', submit:'Get My Automation Plan →', fastest:'Usually replies within a few hours', professional:'Professional profile & recommendations', freeTutorials:'Free tutorials & AI automation content' },
    finalCta: { title:'Have a Process That Shouldn\'t Be Manual?', sub:'Let\'s turn it into an automated system.', cta1:'Book a Free Automation Audit →', cta2:'Tell Me About Your Project →' },
    footer: { copy:'© 2026 Ahmed Abdelmajeid · Built with purpose', rights:'All rights reserved.' },
    chat: { title:"Ahmed's Automation Assistant", status:'Online · Lead Qualification AI', placeholder:'Describe your business problem…', welcome:"Hey 👋 I'm Ahmed's AI assistant.\nI can help you figure out what parts of your business could be automated!" },
    theme: { dark:'Dark', light:'Light' },
    lang: 'العربية',
  },
  ar: {
    nav: { about:'عني', services:'الخدمات', projects:'دراسات الحالة', blog:'المدونة', courses:'الكورسات', youtube:'يوتيوب', contact:'تواصل', bookCall:'احجز تدقيق أتمتة مجاني ←' },
    hero: { eyebrow:'مهندس أتمتة الذكاء الاصطناعي · مصر / الشرق الأوسط', headline:'أبني أنظمة ذكاء اصطناعي تُأتمت أعمالك.', sub:'أساعد الشركات على أتمتة الأعمال المتكررة، وجلب المزيد من العملاء المحتملين، والعمل على مدار 24/7 بأنظمة جاهزة للإنتاج.', capabilities:'واتساب AI · ذكاء صوتي · أتمتة CRM · n8n · وكلاء AI', cta1:'← احجز تدقيق أتمتة مجاني', cta2:'← شاهد أعمالي', trust:'+50 نظام إنتاجي · +30 وكيل ذكاء اصطناعي · +5 سنوات خبرة' },
    proof: { title:'مُصممة لشركات حقيقية. مَبنيّة للإنتاج الفعلي.' },
    whoIHelp: { title:'مُصممة للشركات التي ترغب في الأتمتة.', sub:'أصمم أنظمة الأتمتة حول طريقة عمل شركتك الفعلية.' },
    services: { label:'// الخدمات', title:'ما يمكنني أتمتته لشركتك', sub:'أتمتة ذكاء اصطناعي متكاملة مصممة حول مسارات العمل الحقيقية — لا مجرد عروض.', cta:'← شاهد مثالاً' },
    projects: { label:'// دراسات الحالة', title:'أنظمة حقيقية. نتائج تجارية ملموسة.', sub:'مجموعة مختارة من أنظمة أتمتة الذكاء الاصطناعي المَبنية لمسارات عمل حقيقية.', filterAll:'الكل', filterAI:'وكلاء AI', filterN8n:'n8n', filterWA:'واتساب', filterVoice:'صوتي', filterCRM:'CRM', filterAuto:'أتمتة', builtLabel:'تم بناء:', resultLabel:'النتيجة:', viewCaseStudy:'← عرض دراسة الحالة' },
    howItWorks: { label:'// منهجية العمل', title:'من المشكلة ← إلى الإنتاج', sub:'عملية من 5 خطوات مجربة ومُثبتة لنشر أتمتة الذكاء الاصطناعي في بيئة عملك.' },
    about: { label:'// عن أحمد', title:'بناء أنظمة ذكاء اصطناعي تعمل فعلاً', sub:'هندسة برمجية موجهة لمصلحة العميل ولتحقيق نتائج تشغيلية حقيقية.' },
    enginity: { label:'// استوديو إنجينيتي', title:'أحمد عبد المجيد', subtitle:'المؤسس / مهندس أتمتة الذكاء الاصطناعي في إنجينيتي', desc:'إنجينيتي هي المنصة واستوديو أتمتة الذكاء الاصطناعي المُصمم لمساعدة الشركات على نشر وتشغيل أنظمة ذكاء اصطناعي جاهزة للإنتاج.' },
    blog: { label:'// المدونة', title:'مقالات وشروحات', sub:'تعمق في أتمتة الذكاء الاصطناعي وسير عمل n8n والأنظمة الإنتاجية.', readMore:'اقرأ المقال →', minRead:'دقيقة قراءة' },
    courses: { label:'// الكورسات', title:'تعلم أتمتة الذكاء الاصطناعي', sub:'كورسات عربية عملية لبناء أنظمة أتمتة حقيقية.', cta:'استكشف الكورسات ←' },
    youtube: { label:'// يوتيوب', title:'تعلم مما أبنيه', sub:'دروس مجانية في أتمتة الذكاء الاصطناعي وسير عمل n8n وأنظمة الإنتاج.', cta:'شاهد المزيد على يوتيوب ←' },
    testimonials: { label:'// آراء العملاء', title:'ماذا يقول العملاء', sub:'تأثير تجاري حقيقي من أنظمة أتمتة حقيقية.' },
    contact: { label:'// تواصل', title:'لنبني نظام الأتمتة التالي لشركتك.', sub:'لديك مسار عمل متكرر أو مشكلة في العملاء المحتملين؟ أخبرني بما تريد أتمتته.', formTitle:'احصل على خطة الأتمتة', name:'الاسم', email:'بريد العمل', type:'ما الذي تريد أتمتته؟', message:'حدثني عن شركتك ومسار عملك', submit:'← احصل على خطة الأتمتة', fastest:'عادة ما أرد خلال بضع ساعات', professional:'الملف المهني والتوصيات', freeTutorials:'دروس مجانية ومحتوى أتمتة الذكاء الاصطناعي' },
    finalCta: { title:'لديك عمل يدوي يضيع وقتك؟', sub:'لنحوله إلى نظام مؤتمت يعمل بذكاء.', cta1:'← احجز تدقيق أتمتة مجاني', cta2:'← أخبرني عن مشروعك' },
    footer: { copy:'© 2026 أحمد عبد المجيد · مبني بهدف وتأثير', rights:'جميع الحقوق محفوظة.' },
    chat: { title:'مساعد الأتمتة الذكي', status:'متصل · مساعد تأهيل العملاء', placeholder:'صف المشكلة التي تود أتمتتها…', welcome:'أهلاً 👋 أنا المساعد الذكي لأحمد.\nيمكنني مساعدتك في اكتشاف الأجزاء التي يمكنك أتمتتها في شركتك!' },
    theme: { dark:'داكن', light:'فاتح' },
    lang: 'English',
  }
} as const
