document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // UTILITIES
    // -------------------------------------------------------------
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Auto-update footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Hide Preloader
    const hidePreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('loaded')) {
            preloader.classList.add('loaded');
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    };

    hidePreloader();
    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 1000);

    // Initialize AOS (Animate on Scroll) safely
    const initAOS = () => {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: prefersReducedMotion ? 0 : 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100
            });
        }
    };
    initAOS();
    window.addEventListener('load', initAOS);

    // Register Service Worker (PWA) — safe no-op when not supported
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .catch(err => console.warn('SW registration skipped:', err.message));
        });
    }

    // Language Dictionaries
    const translations = {
        so: {
            home: "Bogga Hore",
            about: "Aniga",
            exp: "Khibrad",
            services: "Adeegyada",
            process_nav: "Habka",
            projects: "Mashaariic",
            skills: "Xirfadaha",
            contact: "Xiriir",
            hero_badge: "✨ Abokor Tech",
            hero_title: "Abokor Tech",
            typing: ["Full Stack Developer", "Cloud Solutions", "UI/UX Designer", "AI & Automation Expert"],
            hero_desc: "Full Stack Developer, Cloud Solutions Specialist, iyo UI/UX Designer — dhisaya alaabo dhijitaal ah oo heersare ah oo ganacsigaaga kor u qaada.",
            btn_contact: "Ila soo xiriir",
            btn_work: "Eeg Mashaariicda",
            btn_hire: "Hire Me",
            btn_cv: "Arag CV-ga",
            proof_1_num: "24/7",
            proof_1_text: "Automation & AI support",
            proof_2_num: "Cloud",
            proof_2_text: "Docker & Cloud Architecture",
            proof_3_num: "3 bilood",
            proof_3_text: "Taageero kadib launch",
            stats_exp: "Sano Khibrad",
            stats_projects: "Mashaariic",
            stats_clients: "Macaamiil",
            services_title: "Adeegyada Aan Bixiyo",
            services_subtitle: "Xalal tayo sare leh oo ku dhisay tignoolajiyada u dambaysay",
            service_web: "Dhisidda Shirkadaha",
            service_web_desc: "Dhisidda nidaamyo adag oo loogu talagalay shirkadaha (Web-based Systems).",
            service_cms: "WordPress & CMS",
            service_cms_desc: "Website-yo WordPress, WooCommerce, blogs, company sites, iyo CMS si sahlan loo maamuli karo.",
            service_health: "Daryeelka Caafimaadka",
            service_health_desc: "Xalal dijital ah oo loogu talagalay maamulka isbitaallada (HMS).",
            service_school: "Maamulka Iskoolka",
            service_school_desc: "Nidaamyo habaysan oo loogu talagalay maamulka dugsiyada (SMS).",
            service_fintech: "Fintech Systems",
            service_fintech_desc: "Dhisidda nidaamyada lacagaha iyo is-weydaarsiga (Exchange Systems).",
            service_automation: "AI & Automation",
            service_automation_desc: "Otomaatig ka dhigidda ganacsiga adigoo isticmaalaya n8n iyo AI Agents.",
            service_uiux: "UI/UX Design",
            service_uiux_desc: "Naqshadaynta muuqaalka website-yada si ay u noqdaan kuwo soo jiidasho leh.",
            website_types_title: "Noocyada Website-yada",
            website_types_subtitle: "Waxaan kuu dhisi karaa website fudud, CMS, ama system custom ah iyadoo ku xiran baahidaada.",
            website_type_wordpress: "WordPress Websites",
            website_type_ecommerce: "WooCommerce / E-commerce",
            website_type_landing: "Landing Pages",
            website_type_business: "Business Websites",
            website_type_react: "React / Next.js Apps",
            website_type_custom: "Custom HTML, PHP & Laravel",
            process_title: "Habka aan u Shaqeeyo",
            process_subtitle: "Mashruucaaga wuxuu maraa hannaan cad, degdeg ah, oo natiijo lagu cabbiro",
            process_1_title: "Discovery",
            process_1_desc: "Waxaan fahmaa ganacsigaaga, dadka isticmaali doona, iyo yoolka mashruuca kahor inta aanan code bilaabin.",
            process_2_title: "Design & Prototype",
            process_2_desc: "Waxaan diyaariyaa UI nadiif ah, flow sahlan, iyo prototype si fikradda loo arko kahor dhismaha.",
            process_3_title: "Build & Automate",
            process_3_desc: "Waxaan dhisaa frontend, backend, database, payment ama AI automation-ka loo baahan yahay.",
            process_4_title: "Launch & Support",
            process_4_desc: "Waxaan tijaabiyaa, launch-gareeyaa, kadibna bixiya taageero iyo hagaajin joogto ah.",
            process_cta_title: "Ma rabtaa nidaam ganacsigaaga si dhab ah u shaqeeya?",
            process_cta_text: "Ii soo dir fikraddaada, waxaan kuu celinayaa qorshe kooban iyo tallaabada xigta.",
            process_cta_btn: "Bilow Wadahadal",
            pricing_title: "Xirmooyinka Adeegga",
            pricing_subtitle: "Xulo xirmada ku habboon ganacsigaaga",
            basic: "Basic",
            premium: "Premium",
            custom: "Custom",
            per_web: "/web",
            cta_order: "Dalbo Hadda",
            cta_talk: "Kala Hadal",
            custom_text: "Si gaar ah ugu dhis nidaamyo adag sida Automation, AI Agents, ama Fintech Apps.",
            most_popular: "Ugu Caansan",
            exp_title: "Khibradda & Waxbarashada",
            exp_subtitle: "Taariikhda aqoontayda iyo shaqooyinkii aan soo qabtay",
            exp_date_1: "2022 - Hadda",
            exp_role_1: "Full Stack Developer (Freelance)",
            exp_desc_1: "Waxaan u qabtay macaamiil badan mashaariic kala duwan oo isugu jira Web iyo Mobile Apps.",
            exp_date_2: "2022 - 2025",
            exp_role_2: "Bachelor of Computer Science",
            exp_desc_2: "Alpha University - Hargeysa, Somaliland. Waxaan ku qalin-jabiyay darajada ugu sarraysa.",
            exp_date_3: "2021 - 2022",
            exp_role_3: "Web Development Intern",
            exp_desc_3: "Barashada aasaaska dhisidda degellada iyo la shaqaynta kooxaha ka tirsan shirkadaha tignoolajiyada.",
            projects_title: "Mashaariic",
            projects_subtitle: "Halkan ka eeg qaar ka mid ah shaqooyinkii aan dhowaan qabtay",
            filter_all: "Dhammaan",
            filter_web: "Web",
            filter_apps: "Apps",
            filter_fintech: "Fintech",
            filter_automation: "Automation",
            project_search: "Raadi mashruuc ama technology...",
            no_projects: "Wax mashruuc ah lama helin. Isku day eray kale.",
            proj_badge_featured: "La Xushay",
            proj_badge_impact: "Saamayn Bulsho",
            proj_badge_enterprise: "Ganacsi",
            proj_features_title: "Astaamaha Muhiimka ah:",
            proj_agentworks: "AgentWorks AI",
            proj_agentworks_desc: "Nidaam AI madax-bannaan oo loogu talagalay daryeelka macaamiisha, iibka, iyo ballamaha. Waxay ku xidhantaa WhatsApp, Telegram, iyo CRM-yada.",
            proj_agentworks_f1: "Sheeko AI 24/7 ah oo WhatsApp ah",
            proj_agentworks_f2: "Ballan-qabasho Toos ah ee Macaamiisha",
            proj_agentworks_f3: "Ila-socodka CRM & Falanqaynta Dareenka",
            proj_bloodsave: "BloodSave",
            proj_bloodsave_desc: "Madal naf-badbaadin ah oo isku xidha dadka dhiigga bixiya, cusbitaallada, iyo bukaanada wakhtiga dhabta ah ee guud ahaan Soomaaliya.",
            proj_bloodsave_f1: "Isku-dhegista Deeq-bixiyayaasha ee Real-time",
            proj_bloodsave_f2: "Maamulka Kaydka Dhiigga ee Cusbitaalka",
            proj_bloodsave_f3: "Farriimaha SMS iyada oo loo marayo Somali Gateways",
            proj_sogasho: "SO! Gasho ISP CRM",
            proj_sogasho_desc: "CRM & Nidaamka biilasha ee loo dhisay SO! Gasho ISP si loo maareeyo macaamiisha, qaybinta bandwidth-ka, iyo biilasha fiber-ka.",
            proj_sogasho_f1: "Xisaabinta iyo Biilasha Tooska ah ee Macaamiisha",
            proj_sogasho_f2: "Isku-xidhka Bandwidth-ka ee MikroTik API",
            proj_sogasho_f3: "Lacag-bixinta Mobilada ee Soomaaliga (Zaad/Sahal/E-Dahab)",
            proj_school: "Nidaamka Maamulka Dugsiga",
            proj_school_desc: "Nidaam dhammaystiran oo maamul dugsi, maareeyo ardayda, admissions-ka internetka, darajooyinka, iyo imaanshiyaha.",
            proj_school_f1: "Dashboards-ka Ardayda & Macallimiinta",
            proj_school_f2: "Buugaagta Darajada & Abuurista Warbixinta Natiijooyinka",
            proj_school_f3: "La-socodka Khidmadaha & Imaanshiyaha",
            proj_school_f4: "WhatsApp Automation: Waalidiintu way weydiin karaan exam-ka, natiijadana si otomaatig ah ayaa loogu dirayaa",
            proj_karti: "Karti POS",
            proj_karti_desc: "Nidaam casri ah oo loogu talagalay maaraynta iibka, bakhaarrada, iyo xisaabaadka ganacsiga ee Somaliland.",
            proj_karti_f1: "La-socodka Bakhaarrada Kala Duwan",
            proj_karti_f2: "Sawiridda Barcode & Abuurista Qaansheegta Tooska ah",
            proj_karti_f3: "Habka Offline-ka & Warbixinnada Faa'iidada",
            proj_hibo: "Mareegta Hibo Foundation",
            proj_hibo_desc: "Mareeg casri ah iyo nidaamka tabarucaadka ee Hibo Foundation, oo muujinaya hawlaha bulshada iyo saamayntooda.",
            proj_hibo_f1: "Albaabka Tabaruca ee Amniga ah ee Lacagaha Kala Duwan",
            proj_hibo_f2: "Tirakoobyada Saamaynta ee Interactive-ka ah",
            proj_hibo_f3: "Sawirro & Muuqaallo qani ah ee Mashaariicda",
            proj_visit: "Booqo Mashruuca",
            skills_title: "Xirfadaha",
            skills_subtitle: "Aaladaha iyo tignoolajiyada aan u isticmaalo dhisidda xalalka",
            testi_title: "Markhaatiyada",
            testi_subtitle: "Waxa ay macaamiisheedu ka yiraahdeen shaqadeenna",
            testi_1_text: "\"Abokor waa developer aqoon sare u leh shaqadiisa. Wuxuu noo dhisay nidaam aad u heersareeya oo shaqadeenii aad u fududeeyay.\"",
            testi_2_text: "\"Aad ayaan ugu faraxsanahay la shaqaynta Abokor. Wuxuu leeyahay dabeecad wanaagsan iyo karti uu wax kasta ku xaliyo.\"",
            testi_3_text: "\"Nidaamka dugsigu wuxuu si weyn u beddelay habka aannu ku maamulno ardayda. Abokor wuxuu ahaa xirfadle heer sare ah oo shaqadiisa xiiseeya.\"",
            faq_title: "Su'aalaha Badanaa la Isweydiiyo",
            faq_subtitle: "Halkan ka hel jawaabaha su'aalaha aad maskaxda ku hayso",
            faq_q1: "Intee in le'eg ayay kugu qaadanaysaa inaad ku dhammaystirto mashruuc?",
            faq_a1: "Waqtigu wuxuu ku xiran yahay baaxadda mashruuca, laakiin inta badan mareegaha fudud waxay qaataan 1-2 toddobaad.",
            faq_q2: "Ma bixisaa taageero farsamo kadib markaad shaqada dhammayso?",
            faq_a2: "Haa, dhammaan mashaariicda aan dhisno waxay leeyihiin taageero farsamo oo bilaash ah muddo 3 bilood ah.",
            contact_title: "Xiriir",
            contact_subtitle: "Ma haysaa mashruuc? Hala wadaag hadda!",
            contact_phone: "Telefoonka",
            contact_email: "Email-ka",
            contact_location: "Goobta",
            contact_support: "Taageerada",
            form_name: "Magacaaga",
            form_email: "Email-kaaga",
            form_msg: "Farriintaada",
            form_send: "Dir Farriinta",
            form_sending: "Waa la dirayaa...",
            form_success: "Waad ku mahadsantahay farriintaada! Dhawaan ayaan kula soo xiriiri doonaa.",
            footer_rights: "Abokor Tech. Xuquuqda way dhowrantahay.",
            contact_location_val: "Hargeysa, Somaliland",
            avail_text: "Fursad u Furan Mashaariic Cusub • Abokor Tech",
            certs_nav: "Shahaadooyinka",
            cert_title: "Shahaadooyinka",
            cert_subtitle: "Waxbarashada iyo tababarrada aan dhammaystay",
            cert_1_title: "Bachelor of Computer Science",
            cert_1_org: "Alpha University - Hargeysa, Somaliland",
            cert_2_title: "Full Stack Web Development",
            cert_2_org: "Udemy / freeCodeCamp",
            cert_3_title: "n8n Automation & AI Agents",
            cert_3_org: "n8n Academy / Self-study",
            cert_4_title: "React Native - Mobile Dev",
            cert_4_org: "Udemy",
            cert_5_title: "Database Design & MySQL",
            cert_5_org: "Oracle Academy",
            cert_6_title: "UI/UX Design - Figma",
            cert_6_org: "Google UX Design Certificate",
            testi_nav: "Markhaati",
            hire_banner_text: "\uD83D\uDE80 Waxaan u furan yahay mashaariic cusub \u2014 Hala xiriiro hadda!",
            hire_banner_btn: "Bilow Hadda",
            proof_4_text: "Mashaariic la Dhameeyay",
            faq_q3: "Sidee ayaan kuu bixin karaa lacagta?",
            faq_a3: "Waxaan aqbalaa lacag-bixin iyada oo loo marayo EVC Plus (Hormuud), Zaad (Telesom), E-Dahab, iyo Western Union. Lacagta waxaa lagu qaybiyaa: 50% bilowga, 50% dhammaadka.",
            faq_q4: "Ma samayn kartaa website oo Af-Soomaali ah?",
            faq_a4: "Haa, waxaan dhisi karaa website leh luqad kasta oo aad doorato \u2014 Af-Soomaali, Ingiriisi, ama labadaba. Waxaan kaloo ku dari karaa nidaam luqad-beddel ah.",
            footer_tagline: "Dhisidda Berri ka Fiican \u2014 Code by Code.",
            proj_hms: "Nidaamka Maamulka Isbitaalka",
            proj_hms_desc: "Nidaam dhammaystiran oo loogu talagalay maamulka isbitaallada: diiwaanka bukaanka, ballamaha, farmashiyaha, biilasha, iyo shaqaalaha.",
            proj_hms_f1: "Diiwaanka Bukaanka & Ballamaha",
            proj_hms_f2: "Maamulka Farmashiyaha & Shaybaarka",
            proj_hms_f3: "La-socodka Biilasha & Caymiska",
            proj_badge_new: "Cusub",
            testi_4_text: "\"BloodSave platform-kii Abokor dhisay wuxuu nooga badbaadiyay nolol badan. Tignoolajiyada iyo xiisaha uu u leeyahay shaqadiisu aad ayay saamayn weyn u leedahay Soomaaliya.\"",
            testi_5_text: "\"CRM-ka SO! Gasho wuxuu si buuxda u beddelay habka aan ku maamulno macaamiilka iyo biilasha. Abokor waa developer aad loo kalsoonaan karo.\"",
            skills_cat_frontend: "Frontend",
            skills_cat_backend: "Backend & DB",
            skills_cat_automation: "AI & Automation",
            skills_cat_tools: "Tools & DevOps",
            cta_title: "Ma haysaa fikrad mashruuc ah?",
            cta_text: "Ka hadalno fikraddaada \u2014 waxaan kuu diyaarinayaa xal tayo sare leh, waqti yar gudaheed.",
            cta_btn: "WhatsApp ku soo dir"
        },
        en: {
            home: "Home",
            about: "About",
            exp: "Experience",
            services: "Services",
            process_nav: "Process",
            projects: "Projects",
            skills: "Skills",
            contact: "Contact",
            hero_badge: "✨ Abokor Tech",
            hero_title: "Abokor Tech",
            typing: ["Full Stack Developer", "Cloud Solutions", "UI/UX Designer", "AI & Automation Expert"],
            hero_desc: "Full Stack Developer, Cloud Solutions Specialist, and UI/UX Designer — engineering scalable digital products and human-crafted experiences.",
            btn_contact: "Contact Me",
            btn_work: "View Projects",
            btn_hire: "Hire Me",
            btn_cv: "View CV",
            proof_1_num: "24/7",
            proof_1_text: "Automation & AI support",
            proof_2_num: "Cloud",
            proof_2_text: "Docker & Cloud Architecture",
            proof_3_num: "3 months",
            proof_3_text: "Support after launch",
            stats_exp: "Years Experience",
            stats_projects: "Projects Done",
            stats_clients: "Happy Clients",
            services_title: "Our Services",
            services_subtitle: "High-quality solutions built with the latest technologies",
            service_web: "Enterprise Dev",
            service_web_desc: "Building robust web-based systems for companies and enterprises.",
            service_cms: "WordPress & CMS",
            service_cms_desc: "WordPress, WooCommerce, blogs, company sites, and easy-to-manage CMS websites.",
            service_health: "Healthcare Solutions",
            service_health_desc: "Digital solutions for hospital management (HMS).",
            service_school: "School Management",
            service_school_desc: "Organized systems for school administration (SMS).",
            service_fintech: "Fintech Systems",
            service_fintech_desc: "Building payment systems and exchange platforms.",
            service_automation: "AI & Automation",
            service_automation_desc: "Automating your business using n8n and AI Agents effectively.",
            service_uiux: "UI/UX Design",
            service_uiux_desc: "Creating attractive and user-friendly interface designs.",
            website_types_title: "Website Types",
            website_types_subtitle: "I can build simple websites, CMS platforms, or custom systems depending on your needs.",
            website_type_wordpress: "WordPress Websites",
            website_type_ecommerce: "WooCommerce / E-commerce",
            website_type_landing: "Landing Pages",
            website_type_business: "Business Websites",
            website_type_react: "React / Next.js Apps",
            website_type_custom: "Custom HTML, PHP & Laravel",
            process_title: "How I Work",
            process_subtitle: "Your project moves through a clear, fast, measurable delivery process",
            process_1_title: "Discovery",
            process_1_desc: "I map your business, users, and project goals before writing code.",
            process_2_title: "Design & Prototype",
            process_2_desc: "I prepare clean UI, simple flows, and a prototype so the idea is visible before development.",
            process_3_title: "Build & Automate",
            process_3_desc: "I build the frontend, backend, database, payment flows, or AI automation the product needs.",
            process_4_title: "Launch & Support",
            process_4_desc: "I test, launch, then provide continuous support and improvements.",
            process_cta_title: "Need a system that genuinely works for your business?",
            process_cta_text: "Send me your idea and I will reply with a short plan and the next step.",
            process_cta_btn: "Start a Conversation",
            pricing_title: "Service Packages",
            pricing_subtitle: "Choose the best package for your business",
            basic: "Basic",
            premium: "Premium",
            custom: "Custom",
            per_web: "/web",
            cta_order: "Order Now",
            cta_talk: "Let's Talk",
            custom_text: "Custom building complex systems like Automation, AI Agents, or Fintech Apps.",
            most_popular: "Most Popular",
            exp_title: "Experience & Education",
            exp_subtitle: "My formal education and professional career timeline",
            exp_date_1: "2022 - Present",
            exp_role_1: "Full Stack Developer (Freelance)",
            exp_desc_1: "Built various Web and Mobile App projects for diverse clients.",
            exp_date_2: "2022 - 2025",
            exp_role_2: "Bachelor of Computer Science",
            exp_desc_2: "Alpha University - Hargeisa, Somaliland. Graduated with honors.",
            exp_date_3: "2021 - 2022",
            exp_role_3: "Web Development Intern",
            exp_desc_3: "Learning web development basics and collaborating with tech teams.",
            projects_title: "Projects",
            projects_subtitle: "Explore some of my recently completed work",
            filter_all: "All",
            filter_web: "Web",
            filter_apps: "Apps",
            filter_fintech: "Fintech",
            filter_automation: "Automation",
            project_search: "Search project or technology...",
            no_projects: "No projects found. Try another keyword.",
            proj_badge_featured: "Featured",
            proj_badge_impact: "Social Impact",
            proj_badge_enterprise: "Enterprise",
            proj_features_title: "Key Features:",
            proj_agentworks: "AgentWorks AI",
            proj_agentworks_desc: "Autonomous AI agent system for customer care, sales, and automated scheduling. Integrates with WhatsApp, Telegram, and CRMs.",
            proj_agentworks_f1: "24/7 WhatsApp AI Chat",
            proj_agentworks_f2: "Lead Auto-Booking",
            proj_agentworks_f3: "CRM Sync & Sentiment Analysis",
            proj_bloodsave: "BloodSave",
            proj_bloodsave_desc: "A life-saving platform connecting blood donors with hospitals and patients in real-time across Somalia.",
            proj_bloodsave_f1: "Real-time Donor Matching",
            proj_bloodsave_f2: "Hospital Stock Management",
            proj_bloodsave_f3: "SMS Alerts via Somali Gateways",
            proj_sogasho: "SO! Gasho ISP CRM",
            proj_sogasho_desc: "Enterprise CRM & Billing system built for SO! Gasho ISP to manage subscribers, bandwidth allocation, and fiber billing.",
            proj_sogasho_f1: "Automated Subscriber Billing",
            proj_sogasho_f2: "MikroTik API Bandwidth Sync",
            proj_sogasho_f3: "Somali Mobile Money Payment",
            proj_school: "School Management System",
            proj_school_desc: "Comprehensive administrative portal for schools, managing student lifecycle, online admissions, gradebooks, and attendance.",
            proj_school_f1: "Student & Teacher Dashboards",
            proj_school_f2: "Gradebook & Report Generation",
            proj_school_f3: "Fees and Attendance Tracking",
            proj_school_f4: "WhatsApp Automation: Parents can request exams & receive automatic student results",
            proj_karti: "Karti POS",
            proj_karti_desc: "High-performance Point of Sale and inventory tracking software tailored for retail and wholesale businesses in Somaliland.",
            proj_karti_f1: "Multi-warehouse Stock Tracking",
            proj_karti_f2: "Barcode Scanning & Invoice Auto-gen",
            proj_karti_f3: "Offline Mode & Profit Reports",
            proj_hibo: "Hibo Foundation Website",
            proj_hibo_desc: "Modern, accessible landing page and donation portal for Hibo Foundation, showcasing community outreach and impact.",
            proj_hibo_f1: "Secure Multi-Currency Donation Gateway",
            proj_hibo_f2: "Interactive Impact Counters",
            proj_hibo_f3: "Rich Media & Outreach Gallery",
            proj_visit: "Visit Project",
            skills_title: "Skills",
            skills_subtitle: "Tools and technologies I use to build solutions",
            testi_title: "Testimonials",
            testi_subtitle: "What our clients say about our work",
            testi_1_text: "\"Abokor is a highly skilled developer. He built us an excellent system that greatly simplified our work.\"",
            testi_2_text: "\"I am very happy with working with Abokor. He has a great attitude and the ability to solve anything.\"",
            testi_3_text: "\"The school system greatly transformed how we manage students. Abokor is an exceptionally skilled and passionate developer.\"",
            faq_title: "Frequently Asked Questions",
            faq_subtitle: "Here you will find answers to questions you might have in mind",
            faq_q1: "How long does it take you to complete a project?",
            faq_a1: "Time depends on the project scope, but most simple websites take 1-2 weeks.",
            faq_q2: "Do you provide technical support after the work is done?",
            faq_a2: "Yes, all projects we build come with free technical support for 3 months.",
            contact_title: "Contact",
            contact_subtitle: "Have a project? Share it now!",
            contact_phone: "Phone",
            contact_email: "Email",
            contact_location: "Location",
            contact_support: "Support",
            form_name: "Your Name",
            form_email: "Your Email",
            form_msg: "Your Message",
            form_send: "Send Message",
            form_sending: "Sending...",
            form_success: "Thank you for your message! I will get back to you soon.",
            footer_rights: "Abokor Tech. All rights reserved.",
            contact_location_val: "Hargeisa, Somaliland",
            avail_text: "Available for New Projects • Abokor Tech",
            certs_nav: "Certificates",
            cert_title: "Certificates",
            cert_subtitle: "My academic qualifications and completed training",
            cert_1_title: "Bachelor of Computer Science",
            cert_1_org: "Alpha University - Hargeisa, Somaliland",
            cert_2_title: "Full Stack Web Development",
            cert_2_org: "Udemy / freeCodeCamp",
            cert_3_title: "n8n Automation & AI Agents",
            cert_3_org: "n8n Academy / Self-study",
            cert_4_title: "React Native - Mobile Dev",
            cert_4_org: "Udemy",
            cert_5_title: "Database Design & MySQL",
            cert_5_org: "Oracle Academy",
            cert_6_title: "UI/UX Design - Figma",
            cert_6_org: "Google UX Design Certificate",
            testi_nav: "Testimonials",
            hire_banner_text: "\uD83D\uDE80 Available for new projects \u2014 Let's connect now!",
            hire_banner_btn: "Start Now",
            proof_4_text: "Projects Delivered",
            faq_q3: "How can I pay you?",
            faq_a3: "I accept payments via EVC Plus (Hormuud), Zaad (Telesom), E-Dahab, and Western Union. Payment is split: 50% upfront, 50% on delivery.",
            faq_q4: "Can you build a website in Somali?",
            faq_a4: "Yes, I can build a website in any language you choose \u2014 Somali, English, or both. I can also add a language switcher.",
            footer_tagline: "Building Tomorrow, Better \u2014 Code by Code.",
            proj_hms: "Hospital Management System",
            proj_hms_desc: "Full-featured HMS for Somali hospitals: patient records, appointments, pharmacy, billing, and staff management in one platform.",
            proj_hms_f1: "Patient Records & Appointments",
            proj_hms_f2: "Pharmacy & Lab Management",
            proj_hms_f3: "Billing & Insurance Tracking",
            proj_badge_new: "New",
            testi_4_text: "\"The BloodSave platform Abokor built has saved many lives. His passion for technology has a huge positive impact on Somalia.\"",
            testi_5_text: "\"The SO! Gasho CRM completely transformed how we manage subscribers and billing. Abokor is a developer you can fully trust.\"",
            skills_cat_frontend: "Frontend",
            skills_cat_backend: "Backend & DB",
            skills_cat_automation: "AI & Automation",
            skills_cat_tools: "Tools & DevOps",
            cta_title: "Have a project idea?",
            cta_text: "Let's talk about your idea \u2014 I will prepare a high-quality solution for you in no time.",
            cta_btn: "Message on WhatsApp"
        }
    };

    // Current State Settings
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('lang') || 'so';

    // Typed.js Dynamic Typing Animation with reliable fallback
    function updateTypedAnimation(lang) {
        if (window.typedInstance) {
            try { window.typedInstance.destroy(); } catch (e) {}
            window.typedInstance = null;
        }

        const typingEl = document.querySelector('#typing');
        if (!typingEl) return;

        const startTyped = () => {
            if (typeof Typed !== 'undefined') {
                try {
                    window.typedInstance = new Typed('#typing', {
                        strings: translations[lang].typing,
                        typeSpeed: 60,
                        backSpeed: 30,
                        loop: true
                    });
                } catch (e) {
                    console.warn('Typed init error, showing fallback:', e);
                    typingEl.textContent = translations[lang].typing[0];
                }
            } else {
                // Immediate fallback text so hero is never blank
                if (!typingEl.textContent || typingEl.textContent.trim() === '') {
                    typingEl.textContent = translations[lang].typing[0];
                }
                // Retry once Typed CDN script finishes loading
                setTimeout(() => {
                    if (typeof Typed !== 'undefined' && !window.typedInstance) {
                        startTyped();
                    }
                }, 400);
            }
        };

        startTyped();
    }

    // Language Toggle Switcher
    function updateLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        // Set Placeholders dynamically
        const nameInp = document.getElementById('form_name_input');
        const emailInp = document.getElementById('form_email_input');
        const msgInp = document.getElementById('form_msg_input');
        const projectSearchInp = document.getElementById('projectSearch');

        if (nameInp) nameInp.placeholder = lang === 'so' ? "Gali magacaaga oo buuxa" : "Enter your full name";
        if (emailInp) emailInp.placeholder = "example@gmail.com";
        if (msgInp) msgInp.placeholder = lang === 'so' ? "Maxaan kaa caawin karnaa?" : "How can we help you?";
        if (projectSearchInp) projectSearchInp.placeholder = translations[lang].project_search;

        // Re-init typed effect
        updateTypedAnimation(lang);

        if (langToggle) {
            langToggle.innerText = lang === 'so' ? 'EN' : 'SO';
        }
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);
        currentLang = lang;
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'so' ? 'en' : 'so';
            updateLanguage(newLang);
        });
    }

    // Initialize Language
    updateLanguage(currentLang);

    // Light/Dark Theme Switching Logic
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    const savedTheme = localStorage.getItem('theme') || 'dark'; // default to dark for premium look
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('#faq .faq-item');

    // --- Hire Banner Close Logic ---
    const hireBanner = document.getElementById('hireBanner');
    const hireBannerClose = document.getElementById('hireBannerClose');
    if (hireBannerClose && hireBanner) {
        // Check if user dismissed already
        if (localStorage.getItem('hireBannerDismissed') === '1') {
            hireBanner.classList.add('hidden');
        }
        hireBannerClose.addEventListener('click', () => {
            hireBanner.classList.add('hidden');
            localStorage.setItem('hireBannerDismissed', '1');
        });
    }

    // -------------------------------------------------------------
    // THREE.JS 3D INTERACTIVE HERO WORLD (with resilient 2D fallback)
    // -------------------------------------------------------------
    const init3DHeroWorld = () => {
        const heroCanvas = document.getElementById('heroCanvas');
        if (!heroCanvas || prefersReducedMotion) return;

        // If Three.js is not loaded yet or unavailable, try fallback or wait
        if (typeof THREE === 'undefined') {
            const checkThree = setInterval(() => {
                if (typeof THREE !== 'undefined') {
                    clearInterval(checkThree);
                    init3DHeroWorld();
                }
            }, 300);
            setTimeout(() => {
                clearInterval(checkThree);
                if (typeof THREE === 'undefined') init2DParticleFallback(heroCanvas);
            }, 2500);
            init2DParticleFallback(heroCanvas);
            return;
        }

        try {
            const heroSection = document.getElementById('home') || heroCanvas.parentElement;
            const getWidth = () => heroSection ? heroSection.clientWidth : window.innerWidth;
            const getHeight = () => heroSection ? heroSection.clientHeight : window.innerHeight;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(55, getWidth() / getHeight(), 0.1, 1000);
            camera.position.z = 24;

            const renderer = new THREE.WebGLRenderer({
                canvas: heroCanvas,
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance'
            });
            renderer.setSize(getWidth(), getHeight());
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Theme colors — Abokor Tech Brand
            const primaryHex = 0xFB5800; // Abokor Tech Orange #FB5800
            const violetHex = 0x8B5CF6;  // Electric Violet
            const cyanHex = 0x06B6D4;    // Aqua Cyan

            // 1. Central 3D Holographic Geometry Group
            const hero3DGroup = new THREE.Group();
            scene.add(hero3DGroup);

            // Responsive positioning: position on right for desktop, centered for mobile
            const updateGroupPos = () => {
                if (window.innerWidth > 900) {
                    hero3DGroup.position.set(4.5, 0.4, 0);
                    hero3DGroup.scale.set(1.1, 1.1, 1.1);
                } else {
                    hero3DGroup.position.set(0, 1.8, -4);
                    hero3DGroup.scale.set(0.75, 0.75, 0.75);
                }
            };
            updateGroupPos();

            // Outer Icosahedron Wireframe
            const icoGeo = new THREE.IcosahedronGeometry(4.2, 1);
            const icoMat = new THREE.MeshBasicMaterial({
                color: primaryHex,
                wireframe: true,
                transparent: true,
                opacity: 0.38
            });
            const icoMesh = new THREE.Mesh(icoGeo, icoMat);
            hero3DGroup.add(icoMesh);

            // Inner Geodesic Sphere
            const innerSphereGeo = new THREE.SphereGeometry(2.5, 18, 18);
            const innerSphereMat = new THREE.MeshBasicMaterial({
                color: cyanHex,
                wireframe: true,
                transparent: true,
                opacity: 0.24
            });
            const innerSphereMesh = new THREE.Mesh(innerSphereGeo, innerSphereMat);
            hero3DGroup.add(innerSphereMesh);

            // Orbit Ring 1 (Violet)
            const ring1Geo = new THREE.TorusGeometry(5.8, 0.045, 16, 80);
            const ring1Mat = new THREE.MeshBasicMaterial({
                color: violetHex,
                transparent: true,
                opacity: 0.55
            });
            const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
            ring1.rotation.x = Math.PI / 3;
            hero3DGroup.add(ring1);

            // Orbit Ring 2 (Primary Orange)
            const ring2Geo = new THREE.TorusGeometry(6.8, 0.035, 16, 90);
            const ring2Mat = new THREE.MeshBasicMaterial({
                color: primaryHex,
                transparent: true,
                opacity: 0.45
            });
            const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
            ring2.rotation.y = Math.PI / 4;
            ring2.rotation.x = -Math.PI / 6;
            hero3DGroup.add(ring2);

            // 2. Particle Galaxy Starfield
            const particleCount = window.innerWidth < 768 ? 130 : 240;
            const particleGeo = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            const pColorPrimary = new THREE.Color(primaryHex);
            const pColorViolet = new THREE.Color(violetHex);
            const pColorCyan = new THREE.Color(cyanHex);

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3] = (Math.random() - 0.5) * 50;
                positions[i3 + 1] = (Math.random() - 0.5) * 32;
                positions[i3 + 2] = (Math.random() - 0.5) * 32;

                const mixedColor = Math.random() < 0.45 ? pColorPrimary : (Math.random() < 0.75 ? pColorViolet : pColorCyan);
                colors[i3] = mixedColor.r;
                colors[i3 + 1] = mixedColor.g;
                colors[i3 + 2] = mixedColor.b;
            }

            particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const particleMat = new THREE.PointsMaterial({
                size: 0.28,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });

            const particles = new THREE.Points(particleGeo, particleMat);
            scene.add(particles);

            // Mouse coordinate tracking with smooth damping (lerp)
            let mouseX = 0, mouseY = 0;
            let targetMouseX = 0, targetMouseY = 0;

            const onMouseMove = (e) => {
                targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            };
            window.addEventListener('mousemove', onMouseMove, { passive: true });

            // Window resize handler
            const onResize = () => {
                const newWidth = getWidth();
                const newHeight = getHeight();
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
                updateGroupPos();
            };
            window.addEventListener('resize', onResize);

            // IntersectionObserver to pause loop when scrolled away (performance & battery saver)
            let isVisible = true;
            let animId = null;
            if ('IntersectionObserver' in window && heroSection) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        isVisible = entry.isIntersecting;
                        if (isVisible && !animId) {
                            render();
                        }
                    });
                }, { threshold: 0.05 });
                observer.observe(heroSection);
            }

            // Animation Render Loop
            let clock = new THREE.Clock();
            const render = () => {
                if (!isVisible) {
                    animId = null;
                    return;
                }
                animId = requestAnimationFrame(render);

                const elapsedTime = clock.getElapsedTime();

                // Smooth damping interpolation
                mouseX += (targetMouseX - mouseX) * 0.05;
                mouseY += (targetMouseY - mouseY) * 0.05;

                // Rotations
                icoMesh.rotation.x = elapsedTime * 0.15 + mouseY * 0.35;
                icoMesh.rotation.y = elapsedTime * 0.22 + mouseX * 0.45;

                innerSphereMesh.rotation.x = -elapsedTime * 0.2;
                innerSphereMesh.rotation.y = -elapsedTime * 0.28;

                ring1.rotation.z = elapsedTime * 0.18;
                ring1.rotation.y = Math.sin(elapsedTime * 0.3) * 0.4;

                ring2.rotation.z = -elapsedTime * 0.14;
                ring2.rotation.x = -Math.PI / 6 + Math.cos(elapsedTime * 0.25) * 0.35;

                // Galaxy drift
                particles.rotation.y = elapsedTime * 0.04 + mouseX * 0.12;
                particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.08 + mouseY * 0.1;

                // Camera parallax
                camera.position.x += (mouseX * 2.2 - camera.position.x) * 0.05;
                camera.position.y += (-mouseY * 2.2 - camera.position.y) * 0.05;
                camera.lookAt(0, 0, 0);

                renderer.render(scene, camera);
            };

            render();
        } catch (err) {
            console.warn('Three.js failed, using 2D fallback:', err);
            init2DParticleFallback(heroCanvas);
        }
    };

    // 2D Canvas Fallback
    const init2DParticleFallback = (heroCanvas) => {
        if (!heroCanvas) return;
        const ctx = heroCanvas.getContext('2d');
        if (!ctx) return;
        let particles = [];

        const resizeCanvas = () => {
            heroCanvas.width = heroCanvas.offsetWidth || window.innerWidth;
            heroCanvas.height = heroCanvas.offsetHeight || window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * heroCanvas.width,
                y: Math.random() * heroCanvas.height,
                r: Math.random() * 2 + 0.6,
                dx: (Math.random() - 0.5) * 0.6,
                dy: (Math.random() - 0.5) * 0.6,
                color: Math.random() > 0.5 ? '251,88,0' : '139,92,246',
                alpha: Math.random() * 0.6 + 0.2
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > heroCanvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > heroCanvas.height) p.dy *= -1;
            });
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (dist < 95) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${particles[i].color}, ${0.08 * (1 - dist / 95)})`;
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(draw);
        };
        draw();
    };

    init3DHeroWorld();

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-header i');

        if (header && content) {
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');

                // Close all other active items
                faqItems.forEach(other => {
                    other.classList.remove('open');
                    const otherContent = other.querySelector('.faq-content');
                    const otherIcon = other.querySelector('.faq-header i');
                    if (otherContent) otherContent.style.display = 'none';
                    if (otherIcon) otherIcon.className = 'fas fa-chevron-down';
                });

                if (!isOpen) {
                    item.classList.add('open');
                    content.style.display = 'block';
                    if (icon) icon.className = 'fas fa-chevron-up';
                }
            });
        }
    });

    // Project Search and Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectSearch = document.getElementById('projectSearch');
    const noProjects = document.getElementById('noProjects');
    let activeProjectFilter = 'all';

    function applyProjectFilters() {
        const query = (projectSearch?.value || '').trim().toLowerCase();
        let visibleCount = 0;

        projectCards.forEach(card => {
            const matchesFilter = activeProjectFilter === 'all' || card.dataset.category === activeProjectFilter;
            const cardText = card.innerText.toLowerCase();
            const matchesSearch = !query || cardText.includes(query);

            if (matchesFilter && matchesSearch) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(15px)';
                card.style.display = 'none';
            }
        });

        if (noProjects) {
            noProjects.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeProjectFilter = btn.dataset.filter;
            applyProjectFilters();
        });
    });

    if (projectSearch) {
        projectSearch.addEventListener('input', applyProjectFilters);
    }

    // Scroll Active Section Link Highlighter
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.getElementById('navbar');

    function updateActiveLink() {
        let currentSectionId = '';
        const scrollPos = window.scrollY || window.pageYOffset;

        if (navbar) {
            navbar.classList.toggle('scrolled', scrollPos > 30);
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= (sectionTop - 280)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // Scroll progress bar and To Top Button
    const scrollTopBtn = document.getElementById('scrollTop');
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY || window.pageYOffset;

        // Toggle Top button
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('active', scrollPos > 400);
        }

        // Fill Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrolled + "%";
        }
    }, { passive: true });

    if (scrollTopBtn) {
        const scrollToTop = () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        scrollTopBtn.addEventListener('click', scrollToTop);
        scrollTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToTop(); }
        });
    }

    // Mobile Menu Nav bar toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinksContainer = document.getElementById('navLinks');

    if (menuBtn && navLinksContainer) {
        menuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const menuIcon = menuBtn.querySelector('i');
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            }
        });

        // Close menu on link clicks
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const menuIcon = menuBtn.querySelector('i');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-times');
                }
            });
        });
    }

    // Smooth scroll support for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            e.preventDefault();
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const name = document.getElementById('form_name_input').value.trim();
            const email = document.getElementById('form_email_input').value.trim();
            const msg = document.getElementById('form_msg_input').value.trim();
            const honeypot = document.getElementById('form_honeypot').value;

            if (!name || !email || !msg) return;

            // Honeypot check
            if (honeypot) {
                window.showToast(translations[currentLang].form_success, 'success');
                contactForm.reset();
                return;
            }

            btn.innerText = translations[currentLang].form_sending;
            btn.disabled = true;

            // Try direct submission to improved local send_mail.php first
            fetch('./send_mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, email, message: msg })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Local mail failed, attempting fallback...');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    window.showToast(translations[currentLang].form_success, 'success');
                    contactForm.reset();
                } else {
                    throw new Error(data.error || 'Unknown error');
                }
            })
            .catch(error => {
                console.warn('Local mail failed. Using FormSubmit.co fallback. Error:', error);

                // Fallback to FormSubmit.co
                fetch('https://formsubmit.co/ajax/abokor445@hotmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        _subject: "Farriin Cusub oo Portfolio-gaaga ah",
                        Magaca: name,
                        Email: email,
                        Farriinta: msg
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success === "true" || data.success === true) {
                        window.showToast(translations[currentLang].form_success, 'success');
                        contactForm.reset();
                    } else {
                        window.showToast(
                            currentLang === 'so'
                                ? "Fadlan iska hubi emailkaaga. Fariinta ugu horaysa waxay u baahantahay 'Activation'."
                                : "Please verify your email. The first message requires form activation.",
                            'error'
                        );
                    }
                })
                .catch(err => {
                    console.error('Contact Form Final Error:', err);
                    window.showToast(
                        currentLang === 'so'
                            ? "Waan ka xunnahay, cilad ayaa dhacday adigoo fariinta diraya. Fadlan isku day markale."
                            : "Sorry, an error occurred while sending your message. Please try again.",
                        'error'
                    );
                });
            })
            .finally(() => {
                btn.innerText = translations[currentLang].form_send;
                btn.disabled = false;
            });
        });
    }

    // Stats Counters Animation (runs once when visible)
    const counters = document.querySelectorAll('.counter');
    const counterSpeed = 160;

    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;

                const updateCount = () => {
                    const increment = target / counterSpeed;
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count) + '+';
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target + '+';
                    }
                };

                if (prefersReducedMotion) {
                    counter.innerText = target + '+';
                } else {
                    updateCount();
                }
                observer.unobserve(counter);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounters, { threshold: 0.6 });
    counters.forEach(counter => counterObserver.observe(counter));

    // Skill Bar filling animation on scroll
    const skillBars = document.querySelectorAll('.skill-bar[data-width]');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // -------------------------------------------------------------
    // Redesigned AI Chatbot Logic
    // -------------------------------------------------------------
    let chatSessionId = localStorage.getItem('chatSessionId');
    if (!chatSessionId) {
        chatSessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('chatSessionId', chatSessionId);
    }

    const aiChatBtn = document.getElementById('aiChatBtn');
    const aiChatWindow = document.getElementById('aiChatWindow');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    let isSendingMessage = false;

    if (aiChatBtn && aiChatWindow) {
        const toggleChat = () => {
            aiChatWindow.classList.toggle('active');
            if (aiChatWindow.classList.contains('active') && chatInput) {
                chatInput.focus();
            }
        };
        aiChatBtn.addEventListener('click', toggleChat);
        aiChatBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleChat(); }
        });
    }

    if (closeChatBtn && aiChatWindow) {
        closeChatBtn.addEventListener('click', () => {
            aiChatWindow.classList.remove('active');
        });
    }

    const cleanBotText = (text) => {
        return String(text || '')
            .replace(/tareen\w*/gi, 'features')
            .replace(/shaybaar/gi, 'features')
            .replace(/standard package/gi, 'package-ka caadiga ah')
            .replace(/heliso/gi, 'hesho')
            .replace(/u soo contact/gi, 'kala xiriir')
            .replace(/jawab dhan/gi, 'jawaab degdeg ah');
    };

    // Smart Offline Knowledge Base
    const getOfflineKnowledgeReply = (query, lang) => {
        const q = (query || '').toLowerCase().trim();
        const isSo = (lang === 'so');

        if (q.includes('mashruuc') || q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('shaqo')) {
            return isSo
                ? "Mashaariicda ugu waaweyn ee Abokor qabtay waxaa ka mid ah:\n1. AgentWorks AI — AI Customer Care & Booking Bots ku xiran WhatsApp & Telegram.\n2. BloodSave — Nidaamka isku xirka deeq-bixiyayaasha dhiigga & cusbitaallada Soomaaliya.\n3. SO! Gasho ISP CRM — Nidaamka biilasha iyo maaraynta macaamiisha fiber-ka.\n4. School Management System — Maamulka dugsiyada oo leh WhatsApp Bot otomaatig ah.\n5. Hospital Management System (HMS) — Maamulka bukaanada, farmashiyaha & biilasha.\n\nWaxaad sidoo kale toos uga arki kartaa qaybta Mashaariicda ee boggan!"
                : "Key projects developed by Abokor include:\n1. AgentWorks AI — Autonomous AI customer service & booking agents on WhatsApp/Telegram.\n2. BloodSave — Real-time blood donor & hospital matching portal in Somalia.\n3. SO! Gasho ISP CRM — Fiber customer billing & MikroTik bandwidth management system.\n4. School Management System — Comprehensive school administration with automated WhatsApp Bot.\n5. Hospital Management System (HMS) — Patient records, pharmacy & insurance tracking.\n\nYou can also explore interactive demos directly in the Projects section above!";
        }

        if (q.includes('qiim') || q.includes('price') || q.includes('cost') || q.includes('xirmo') || q.includes('package') || q.includes('rate')) {
            return isSo
                ? "Qiimaha adeegyada Abokor Keyse:\n• Basic: $149/web (Landing page, responsive, SEO-ready, WhatsApp chat)\n• Premium: $349/web (Business website, CMS maamul leh, animations sare, domain/hosting)\n• Custom: Ballan & xisaab gaar ah (AI Automation, Fintech, CRM, iyo Mobile Apps).\n\nKala hadal WhatsApp: +252 633 009 299 si laguu siiyo qiimo-dhimis gaar ah!"
                : "Service Packages & Pricing:\n• Basic: $149/site (Landing page, responsive, SEO-ready, WhatsApp integration)\n• Premium: $349/site (Full business portal, custom CMS, rich animations, domain/hosting)\n• Custom: Tailored quote (AI Automation, Fintech, CRM, and Mobile Apps).\n\nReach out on WhatsApp at +252 633 009 299 for a free consultation and project quote!";
        }

        if (q.includes('whatsapp') || q.includes('xiriir') || q.includes('contact') || q.includes('telefoon') || q.includes('phone') || q.includes('email')) {
            return isSo
                ? "Waad la xiriiri kartaa Abokor Keyse si toos ah:\n• WhatsApp / Tel: +252 633 009 299\n• Email: abokor445@hotmail.com\n• Goobta: Hargeysa, Somaliland (wuxuu qabtaa shaqooyin Remote & On-site ah)."
                : "You can contact Abokor Keyse directly:\n• WhatsApp / Phone: +252 633 009 299\n• Email: abokor445@hotmail.com\n• Location: Hargeisa, Somaliland (Available for both Remote & On-site projects).";
        }

        if (q.includes('xirfad') || q.includes('skill') || q.includes('tech') || q.includes('react') || q.includes('next') || q.includes('node') || q.includes('python') || q.includes('n8n') || q.includes('ai')) {
            return isSo
                ? "Xirfadaha farsamo ee Abokor Keyse:\n• Frontend: React, Next.js, HTML5/CSS3, JavaScript (ES6+), TailwindCSS, Three.js 3D Web.\n• Backend: Node.js, PHP, Laravel, Python, REST APIs, Webhooks.\n• Database: PostgreSQL, MySQL, Supabase, Prisma ORM.\n• Automation & AI: n8n workflow automation, OpenAI/Gemini AI Agents, WhatsApp Business APIs.\n• Tools: Docker, Git/GitHub, Linux, MikroTik API."
                : "Technical skills of Abokor Keyse:\n• Frontend: React, Next.js, JavaScript (ES6+), TailwindCSS, CSS3 animations, Three.js 3D.\n• Backend: Node.js, PHP, Laravel, Python, REST APIs, Webhooks.\n• Databases: PostgreSQL, MySQL, Supabase, Prisma ORM.\n• Automation & AI: n8n workflow orchestration, OpenAI/Gemini AI Agents, WhatsApp Cloud API.\n• Tools: Docker, Git, Linux, MikroTik API.";
        }

        return isSo
            ? "Asc! Waxaan ahay AI Assistant-ka rasmiga ah ee Abokor Tech (Abokor Keyse). Waxaan kaa caawin karaa faahfaahinta mashaariicda, cloud solutions, qiimaha adeegyada, ama inaad si toos ah WhatsApp ugala xiriirto: +252 633 009 299."
            : "Hello! I am the official AI Assistant for Abokor Tech (Abokor Keyse) — Full Stack Developer, Cloud Solutions Specialist, and UI/UX Designer. I can answer questions regarding projects, services, architecture, or connect you on WhatsApp: +252 633 009 299.";
    };

    const addMessageToChat = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.textContent = sender === 'bot' ? cleanBotText(text) : text;
        if (chatMessages && typingIndicator) {
            chatMessages.insertBefore(msgDiv, typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    };

    const handleChatSubmit = async () => {
        if (isSendingMessage || !chatInput) return;
        const msg = chatInput.value.trim();
        if (!msg) return;

        isSendingMessage = true;
        if (sendChatBtn) sendChatBtn.disabled = true;
        chatInput.disabled = true;

        addMessageToChat(msg, 'user');
        chatInput.value = '';

        if (typingIndicator) typingIndicator.style.display = 'flex';
        if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const WEBHOOK_URL = "https://n8n.abokor.shop/webhook/portfolio-chat";
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 12000);

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg, sessionId: chatSessionId }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const rawText = await response.text();
            let parsed = null;
            try { parsed = JSON.parse(rawText); } catch (e) { /* not JSON */ }

            if (!response.ok || (parsed && parsed.error)) {
                const serverError = parsed && typeof parsed.error === 'string' ? parsed.error : '';
                throw new Error(serverError || `Webhook responded with status ${response.status}`);
            }

            let botReply = rawText;
            if (parsed) {
                botReply = parsed.reply || parsed.output || parsed.text || parsed.message || rawText;
            }

            if (!botReply || typeof botReply !== 'string' || botReply.trim() === '') {
                botReply = getOfflineKnowledgeReply(msg, currentLang);
            }

            addMessageToChat(botReply, 'bot');
        } catch (err) {
            console.warn("AI Chatbot Webhook unreachable, using smart offline response:", err);
            const smartFallbackReply = getOfflineKnowledgeReply(msg, currentLang);
            addMessageToChat(smartFallbackReply, 'bot');
        } finally {
            if (typingIndicator) typingIndicator.style.display = 'none';
            isSendingMessage = false;
            if (sendChatBtn) sendChatBtn.disabled = false;
            chatInput.disabled = false;
            chatInput.focus();
            if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    };

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChatSubmit();
        });
    }

    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', handleChatSubmit);
    }

    // Quick suggestion chips event listeners
    const chipBtns = document.querySelectorAll('.chip-btn');
    chipBtns.forEach(chip => {
        chip.addEventListener('click', () => {
            const msg = chip.getAttribute('data-msg');
            if (msg && chatInput) {
                chatInput.value = msg;
                handleChatSubmit();
            }
        });
    });

    // Close chat if clicked outside window
    document.addEventListener('click', (e) => {
        if (aiChatWindow && aiChatBtn && !aiChatWindow.contains(e.target) && !aiChatBtn.contains(e.target)) {
            aiChatWindow.classList.remove('active');
        }
    });

    // Close chat & modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (aiChatWindow) aiChatWindow.classList.remove('active');
            const projectModal = document.getElementById('projectModal');
            if (projectModal && projectModal.classList.contains('active')) {
                projectModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // -------------------------------------------------------------
    // Toast Notification System
    // -------------------------------------------------------------
    window.showToast = function(message, type = 'info', duration = 3200) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let iconClass = 'fa-info-circle';
        if (type === 'success') iconClass = 'fa-check-circle';
        if (type === 'error') iconClass = 'fa-exclamation-circle';

        toast.innerHTML = `<i class="fas ${iconClass} toast-icon"></i><span class="toast-msg">${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    // -------------------------------------------------------------
    // Quick Copy-to-Clipboard Handler
    // -------------------------------------------------------------
    document.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('[data-copy]');
        if (copyBtn) {
            const textToCopy = copyBtn.getAttribute('data-copy');
            if (textToCopy) {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        window.showToast(
                            currentLang === 'so' ? `Waa la copy-gareeyay: ${textToCopy}` : `Copied to clipboard: ${textToCopy}`,
                            'success'
                        );
                    }).catch(() => {
                        fallbackCopyTextToClipboard(textToCopy);
                    });
                } else {
                    fallbackCopyTextToClipboard(textToCopy);
                }
            }
        }
    });

    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            window.showToast(
                currentLang === 'so' ? `Waa la copy-gareeyay: ${text}` : `Copied to clipboard: ${text}`,
                'success'
            );
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        document.body.removeChild(textArea);
    }

    // -------------------------------------------------------------
    // SVG Circular Scroll Ring & Progress
    // -------------------------------------------------------------
    const scrollRingFill = document.getElementById('scrollRingFill');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;

        if (scrollProgress) {
            scrollProgress.style.width = (scrollPercent * 100) + '%';
        }

        if (scrollRingFill) {
            const circumference = 144.5;
            scrollRingFill.style.strokeDashoffset = circumference - (scrollPercent * circumference);
        }
    }, { passive: true });

    // -------------------------------------------------------------
    // ADVANCED 3D CARD PERSPECTIVE & SPECULAR SHEEN ENGINE
    // -------------------------------------------------------------
    const tiltCards = document.querySelectorAll(
        '.project-card, .service-card, .stat-card, .cert-card, .pricing-card, .testimonial-card, .website-type, .about-card'
    );

    if (!prefersReducedMotion) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Update CSS variables for dynamic specular sheen reflection
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -7.5;
                const rotateY = ((x - centerX) / centerX) * 7.5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });

        // 3D Interactive Hero Avatar Stage Tilt
        const heroStage = document.getElementById('heroImageStage');
        const heroHomeSec = document.getElementById('home');
        if (heroStage && heroHomeSec) {
            heroHomeSec.addEventListener('mousemove', (e) => {
                const rect = heroStage.getBoundingClientRect();
                const stageCenterX = rect.left + rect.width / 2;
                const stageCenterY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - stageCenterX) / (window.innerWidth / 2);
                const deltaY = (e.clientY - stageCenterY) / (window.innerHeight / 2);
                const rotX = Math.max(-14, Math.min(14, -deltaY * 14));
                const rotY = Math.max(-14, Math.min(14, deltaX * 14));
                heroStage.style.transform = `perspective(1100px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
            });

            heroHomeSec.addEventListener('mouseleave', () => {
                heroStage.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
            });
        }
    }

    // -------------------------------------------------------------
    // Skills Category Filter Switcher
    // -------------------------------------------------------------
    const skillCatBtns = document.querySelectorAll('.skills-cat-btn');
    const skillItems = document.querySelectorAll('.skill-item');

    skillCatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillCatBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selectedCat = btn.getAttribute('data-skill-cat');

            skillItems.forEach(item => {
                const itemCat = item.getAttribute('data-category');
                if (selectedCat === 'all' || itemCat === selectedCat) {
                    item.style.display = 'flex';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });

    // -------------------------------------------------------------
    // Project Quick View Modal Logic
    // -------------------------------------------------------------
    const projectModal = document.getElementById('projectModal');
    const closeProjectModal = document.getElementById('closeProjectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalActions = document.getElementById('modalActions');

    window.openProjectModal = function(title, desc, features = [], actions = []) {
        if (!projectModal) return;
        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = desc;

        if (modalFeatures) {
            modalFeatures.innerHTML = `
                <h4>${currentLang === 'so' ? 'Astaamaha Muhiimka ah:' : 'Key Features:'}</h4>
                <ul>
                    ${features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            `;
        }

        if (modalActions) {
            modalActions.innerHTML = actions.map(act => `
                <a href="${act.url}" target="_blank" rel="noopener noreferrer" class="btn ${act.btnClass || 'btn-primary'}">
                    <i class="${act.icon}"></i> ${act.label}
                </a>
            `).join('');
        }

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    if (closeProjectModal && projectModal) {
        closeProjectModal.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Attach click triggers on project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return; // Ignore link clicks

            const titleEl = card.querySelector('h3');
            const descEl = card.querySelector('p');
            const featureEls = card.querySelectorAll('.project-features li');
            const actionEls = card.querySelectorAll('.project-actions a');

            const title = titleEl ? titleEl.textContent : 'Project Details';
            const desc = descEl ? descEl.textContent : '';
            const features = Array.from(featureEls).map(li => li.textContent);
            const actions = Array.from(actionEls).map(a => ({
                label: a.textContent.trim(),
                url: a.getAttribute('href'),
                icon: a.querySelector('i')?.className || 'fas fa-external-link-alt',
                btnClass: a.classList.contains('btn-primary') ? 'btn-primary' : 'btn-outline'
            }));

            window.openProjectModal(title, desc, features, actions);
        });
    });

    // Premium Custom Hover Cursor Trailing Effects (pointer devices only)
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('customCursorDot');

    if (cursor && cursorDot && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        const hoverElements = 'a, button, .btn, .glass, input, textarea, .faq-header, .lang-toggle, .theme-toggle, .filter-btn, .skills-cat-btn, .copy-btn';
        document.querySelectorAll(hoverElements).forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
});
