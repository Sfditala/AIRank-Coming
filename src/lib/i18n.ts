export type Lang = "en" | "ar";

export const translations = {
  en: {
    dir: "ltr",
    nav_lang: "العربية",
    theme_dark: "Dark",
    theme_light: "Light",

    badge: "Private Beta · Launching Soon",
    hype_badge: "🔥 Limited Access",
    headline_a: "The Future of",
    headline_b: "AI Ranking",
    headline_c: "is Coming.",
    subhead:
      "Join the waitlist to receive your exclusive launch link directly in your inbox. Be the first to rank, benchmark and dominate the AI landscape.",
    email_placeholder: "you@futurestack.ai",
    cta: "Join the Waitlist",
    cta_loading: "Securing your spot...",
    invalid_email: "Please enter a valid email address.",
    footer: "© 2026 AI Rank — Built for the next era of intelligence.",

    toast_success: "Welcome to the inner circle! 🎉",
    toast_success_sub: "Your exclusive launch link is on its way.",
    toast_duplicate: "You're already on the list! We've got you.",
    toast_error: "Something went wrong. Please try again.",

    modal_title: "You're on the list!",
    modal_desc: "Check your inbox soon — your exclusive launch link is on its way.",
    share: "Share with friends",
    copied: "Link copied!",
    close: "Close",

    bento_title: "What's Coming",
    bento_rankings_title: "Live AI Leaderboards",
    bento_rankings_desc:
      "Real-time rankings across 50+ frontier models — updated the moment benchmarks drop.",
    bento_benchmarks_title: "Deep Benchmarks",
    bento_benchmarks_desc: "MMLU, HumanEval, MATH — every metric that moves the needle.",
    bento_updates_title: "Instant Alerts",
    bento_updates_desc: "Be the first to know when rankings shift overnight.",
    bento_access_title: "Early Access Perks",
    bento_access_desc:
      "Custom watchlists, API access & priority invites — reserved for waitlisters only.",
    bento_access_perks: ["Custom API", "Watchlists", "Priority Invite", "Exclusive Insights"],
    bento_community_title: "Builder Community",
    bento_community_desc: "Join 2,000+ AI builders already on the waitlist.",

    countdown_label: "Launching in",
    countdown_days: "Days",
    countdown_hours: "Hours",
    countdown_mins: "Mins",
    countdown_secs: "Secs",

    slots_label: "Limited spots remaining",
    slots_urgency: "Moving fast — don't miss your spot.",
  },
  ar: {
    dir: "rtl",
    nav_lang: "English",
    theme_dark: "داكن",
    theme_light: "فاتح",

    badge: "نسخة تجريبية خاصة · الإطلاق قريباً",
    hype_badge: "🔥 وصول محدود",
    headline_a: "مستقبل",
    headline_b: "تقييم الذكاء الاصطناعي",
    headline_c: "قادم.",
    subhead:
      "انضم إلى قائمة الانتظار لتصلك رسالة الإطلاق الحصرية مباشرةً إلى بريدك الإلكتروني. كن أول من يقيّم ويتصدّر عالم الذكاء الاصطناعي.",
    email_placeholder: "you@futurestack.ai",
    cta: "انضم إلى قائمة الانتظار",
    cta_loading: "جارٍ حجز مكانك...",
    invalid_email: "يرجى إدخال بريد إلكتروني صالح.",
    footer: "© 2026 AI Rank — صُمم لعصر الذكاء القادم.",

    toast_success: "انضممت إلينا بنجاح! 🎉",
    toast_success_sub: "رابط الإطلاق الحصري في طريقه إلى بريدك.",
    toast_duplicate: "أنت مسجّل بالفعل! نراك في الإطلاق.",
    toast_error: "حدث خطأ. حاول مرة أخرى.",

    modal_title: "تم تسجيلك بنجاح!",
    modal_desc: "تفقد بريدك الإلكتروني قريبًا — رابط الإطلاق الحصري في طريقه إليك.",
    share: "شارك مع الأصدقاء",
    copied: "تم نسخ الرابط!",
    close: "إغلاق",

    bento_title: "ما الذي يأتي",
    bento_rankings_title: "ترتيبات الذكاء الاصطناعي اللحظية",
    bento_rankings_desc:
      "ترتيب حي لأكثر من 50 نموذجاً متقدماً — يُحدَّث فور صدور المقاييس.",
    bento_benchmarks_title: "مقاييس معمّقة",
    bento_benchmarks_desc: "MMLU وHumanEval وMATH — كل مقياس يصنع الفارق.",
    bento_updates_title: "تنبيهات فورية",
    bento_updates_desc: "كن أول من يعلم عند تغيّر الترتيبات.",
    bento_access_title: "مزايا الوصول المبكر",
    bento_access_desc:
      "قوائم مراقبة مخصصة، وصول API، ودعوات ذات أولوية — محجوزة لمن يُسجّل الآن.",
    bento_access_perks: ["API مخصص", "قوائم المراقبة", "دعوة أولوية", "رؤى حصرية"],
    bento_community_title: "مجتمع المطوّرين",
    bento_community_desc: "انضم إلى أكثر من ألفي مطوّر ذكاء اصطناعي في القائمة.",

    countdown_label: "الإطلاق خلال",
    countdown_days: "يوم",
    countdown_hours: "ساعة",
    countdown_mins: "دقيقة",
    countdown_secs: "ثانية",

    slots_label: "عدد الأماكن المتبقية",
    slots_urgency: "الطلب مرتفع — لا تفوّت مكانك.",
  },
} as const;
