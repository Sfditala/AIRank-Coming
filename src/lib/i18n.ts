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

    // ── Problems section ──────────────────────────────────────────
    problems_badge: "The Problem",
    problems_title: "What's Broken Today.",
    problem_1_title: "Rigid Directories",
    problem_1_desc:
      "Static, uncurated lists that bundle every AI tool together with no quality filter or real-world performance data.",
    problem_2_title: "No Arabic Support",
    problem_2_desc:
      "The global AI discovery space has almost entirely ignored Arabic-speaking markets and right-to-left workflows.",
    problem_3_title: "No ROI Analysis",
    problem_3_desc:
      "Tools are listed, never evaluated. There is no structured way to measure actual value against your specific use case.",
    problem_4_title: "Outdated Content",
    problem_4_desc:
      "Rapidly evolving models become stale the moment they are published. Most platforms never catch up.",

    // ── Feedback section ──────────────────────────────────────────
    feedback_badge: "Your Feedback",
    feedback_title: "Shape What's Coming.",
    feedback_rating_label: "Rate your anticipation",
    feedback_placeholder:
      "Share your thoughts, suggestions, or features you'd like to see...",
    feedback_submit: "Send Feedback",
    feedback_success: "Feedback received. Thank you.",
    feedback_error: "Something went wrong. Please try again.",

    // ── FAQ section ───────────────────────────────────────────────
    faq_badge: "FAQ",
    faq_title: "Common Questions.",
    faq_1_q: "What is AiRank and how is it different?",
    faq_1_a:
      "AiRank is a data-driven AI benchmarking platform — not a directory. Every tool is evaluated against measurable performance signals, real-world capability metrics, and structured use-case fit. We rank; we do not simply list.",
    faq_2_q: "When is the official launch?",
    faq_2_a:
      "The Private Beta launches on June 16, 2026. Waitlist members are the first and only ones to receive access — no public signup, no exceptions. Secure your spot now.",
    faq_3_q: "Will AiRank fully support Arabic?",
    faq_3_a:
      "Native Arabic support is a primary launch pillar, not an afterthought. AiRank is built with full RTL rendering, Arabic-language tool evaluation, and a localized discovery experience from day one.",
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

    // ── Problems section ──────────────────────────────────────────
    problems_badge: "المشكلة",
    problems_title: "ما الذي يحتاج إلى إصلاح.",
    problem_1_title: "قوائم جامدة",
    problem_1_desc:
      "قوائم ثابتة وغير مُنتقاة تضم كل أداة دون فلترة للجودة أو بيانات أداء حقيقية.",
    problem_2_title: "لا دعم للعربية",
    problem_2_desc:
      "يتجاهل فضاء اكتشاف الذكاء الاصطناعي العالمي الأسواق الناطقة بالعربية وتدفقات العمل من اليمين إلى اليسار.",
    problem_3_title: "لا تحليل للعائد",
    problem_3_desc:
      "تُدرج الأدوات دون تقييم. لا توجد طريقة منظمة لقياس القيمة الفعلية وفق حالة الاستخدام.",
    problem_4_title: "محتوى قديم",
    problem_4_desc:
      "النماذج المتطورة تصبح قديمة بمجرد نشرها. معظم المنصات لا تواكب هذا التطور أبداً.",

    // ── Feedback section ──────────────────────────────────────────
    feedback_badge: "رأيك يهمنا",
    feedback_title: "ساهم في تشكيل ما يأتي.",
    feedback_rating_label: "قيّم توقعاتك",
    feedback_placeholder:
      "شاركنا أفكارك أو اقتراحاتك أو الميزات التي تود رؤيتها...",
    feedback_submit: "إرسال",
    feedback_success: "تم استلام ملاحظاتك. شكراً لك.",
    feedback_error: "حدث خطأ. حاول مرة أخرى.",

    // ── FAQ section ───────────────────────────────────────────────
    faq_badge: "الأسئلة الشائعة",
    faq_title: "أسئلة متكررة.",
    faq_1_q: "ما هو AiRank وما الذي يميّزه؟",
    faq_1_a:
      "AiRank منصة مقارنة ذكاء اصطناعي تعتمد على البيانات — وليست مجرد دليل. يُقيَّم كل أداة وفق إشارات أداء قابلة للقياس ومقاييس موضوعية. نحن نُرتِّب، لا نكتفي بالإدراج.",
    faq_2_q: "متى سيكون الإطلاق الرسمي؟",
    faq_2_a:
      "تنطلق النسخة التجريبية الخاصة في 16 يونيو 2026. أعضاء قائمة الانتظار هم الوحيدون الذين سيحصلون على الوصول — لا تسجيل عام ولا استثناءات. احجز مكانك الآن.",
    faq_3_q: "هل سيدعم AiRank اللغة العربية بالكامل؟",
    faq_3_a:
      "دعم اللغة العربية الأصلية ركيزة أساسية في الإطلاق وليس إضافةً لاحقة. يُبنى AiRank بدعم كامل للكتابة من اليمين إلى اليسار وتقييم أدوات باللغة العربية منذ اليوم الأول.",
  },
} as const;
