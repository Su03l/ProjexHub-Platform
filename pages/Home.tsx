import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Globe, Zap, Shield, Layers, Rocket, Sparkles, GraduationCap, Briefcase, Users, Check, ChevronDown, Building2, Lightbulb, Share2, Award, Quote, User, Target, Lock, FileCode, Upload as UploadIcon } from 'lucide-react';
import { SAUDI_UNIVERSITIES } from '../type/constants';

const Home: React.FC = () => {
  const universitiesList = [...SAUDI_UNIVERSITIES.slice(0, 15), ...SAUDI_UNIVERSITIES.slice(0, 15)];

  const [stepsVisible, setStepsVisible] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStepsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (stepsRef.current) {
      observer.observe(stepsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const faqs = [
    { q: "هل التسجيل متاح لجميع الجامعات السعودية؟", a: "نعم، المنصة متاحة لجميع طلاب الجامعات والكليات السعودية الحكومية والأهلية." },
    { q: "هل يمكنني رفع مشروع تخرج قديم؟", a: "بالتأكيد! نهدف لبناء أرشيف وطني شامل. يمكنك رفع مشاريع من السنوات السابقة." },
    { q: "هل تحمي المنصة حقوق الملكية الفكرية؟", a: "نعم، توثق المنصة تاريخ النشر وتمنحك رابطاً دائماً يثبت أسبقيتك في الفكرة، ولكنها لا تغني عن التسجيل الرسمي في الهيئة السعودية للملكية الفكرية." },
    { q: "كيف تستفيد الشركات من المنصة؟", a: "يمكن للشركات تصفح المشاريع للبحث عن مواهب شابة لتوظيفهم أو تبني أفكار مشاريعهم وتحويلها لمنتجات تجارية." }
  ];

  const techIcons = [
    { img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", top: "20%", left: "8%", delay: "0s" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg", top: "20%", right: "12%", delay: "2s" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", bottom: "15%", left: "12%", delay: "1s" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg", bottom: "15%", right: "8%", delay: "3s" },
    { img: "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg", top: "45%", right: "5%", delay: "4s" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg", top: "45%", left: "5%", delay: "5s" },

  ];

  const testimonials = [
    { name: "عبدالرحمن المطيري", role: "خريج علوم حاسب", text: "بفضل المنصة، تمكنت من عرض مشروعي وحصلت على عرض وظيفي من شركة تقنية رائدة أعجبت بعملي.", avatar: "bg-blue-500" },
    { name: "د. سارة القحطاني", role: "أستاذ مساعد", text: "منصة ممتازة سهلت عليّ متابعة مشاريع طلابي وأرشفتها بشكل منظم للرجوع إليها مستقبلاً.", avatar: "bg-primary-500" },
    { name: "خالد الشمري", role: "طالب هندسة برمجيات", text: "وجدت فكرة مشروعي من خلال تصفح المشاريع السابقة، ساعدتني المنصة في تجنب تكرار الأفكار.", avatar: "bg-sky-500" },
    { name: "ريم البراهيم", role: "طالبة تصميم", text: "الواجهة سهلة جداً وتساعد في عرض ملفات التصميم والمخططات بشكل احترافي.", avatar: "bg-indigo-500" },
    { name: "فيصل الدوسري", role: "هندسة شبكات", text: "كنت أبحث عن أعضاء لفريقي، ووجدت زملاء مبدعين من خلال ميزة البحث في المنصة.", avatar: "bg-blue-600" },
    { name: "د. أحمد العلي", role: "رئيس قسم", text: "ProjexHub ساهمت في رفع جودة المشاريع في كليتنا بفضل التنافسية والاطلاع على تجارب الجامعات الأخرى.", avatar: "bg-primary-600" },
    { name: "نورة السالم", role: "أمن سيبراني", text: "التوثيق الرقمي للمشاريع فكرة رائعة تحمي حقوقنا وتشجعنا على نشر المصادر المفتوحة.", avatar: "bg-sky-600" },
    { name: "م. ياسر الحربي", role: "مدير توظيف", text: "أستخدم المنصة دائماً للبحث عن المواهب التقنية الشابة لضمهم لشركتنا.", avatar: "bg-blue-400" },
    { name: "لما الغامدي", role: "نظم معلومات", text: "كمية المشاريع الملهمة هنا لا تصدق! ساعدتني كثيراً في اختيار موضوع مشروعي.", avatar: "bg-indigo-400" },
    { name: "سعد القحطاني", role: "ذكاء اصطناعي", text: "منصة متكاملة، أتمنى التوفيق لجميع القائمين عليها.", avatar: "bg-primary-400" },
  ];

  const scrollingTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="flex flex-col min-h-screen bg-transparent overflow-x-hidden font-sans">

      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 border-b border-slate-100 dark:border-slate-900 overflow-hidden">

        {techIcons.map((icon, idx) => (
           <div 
             key={idx}
             className="absolute w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl flex items-center justify-center p-4 animate-float hover:scale-110 transition-all duration-300 cursor-pointer z-0"
             style={{ 
               top: icon.top, 
               left: icon.left, 
               right: icon.right, 
               bottom: icon.bottom,
               animationDelay: icon.delay 
             }}
           >
             <img src={icon.img} alt="Tech" className="w-full h-full object-contain" />
           </div>
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-8 animate-fade-in-up cursor-default hover:border-primary-500/30 transition-colors shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">المنصة الأولى لمشاريع التخرج في المملكة</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight animate-fade-in-up delay-100">
              حول فكرتك إلى <br className="hidden md:block" />
              <span className="relative inline-block">
                 <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200">مشروع ملهم</span>
                 <svg className="absolute w-full h-3 -bottom-1 right-0 text-primary-500 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                 </svg>
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
               منصة <span className="font-bold text-slate-900 dark:text-white">ProjexHub</span> هي الجسر الذي يربط إبداعك الأكاديمي بسوق العمل.
               <br className="hidden md:block" />
               اكتشف أفكاراً جديدة، وثق إنجازك، وتواصل مع المبتكرين.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300 w-full sm:w-auto">
               <Link to="/auth?mode=signup" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 dark:shadow-white/10">
                 <Rocket size={20} />
                 ابدأ رحلتك الآن
               </Link>
               <Link to="/browse" className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                 <Search size={20} />
                 تصفح المشاريع
               </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
             {[
                { label: 'مشروع منشور', value: '+1,200', icon: <Layers className="text-primary-600" /> },
                { label: 'طالب وطالبة', value: '+5,000', icon: <Users className="text-primary-600" /> },
                { label: 'جامعة وكلية', value: '45', icon: <Building2 className="text-blue-600" /> },
                { label: 'مشاهدة شهرية', value: '+150K', icon: <Globe className="text-sky-600" /> },
             ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center group bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                   <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">{stat.icon}</div>
                   <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</span>
                   <span className="text-slate-500 dark:text-slate-400 font-bold text-sm">{stat.label}</span>
                </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 overflow-hidden">
         <div className="marquee-container">
            <div className="flex items-center gap-12 animate-scroll-x whitespace-nowrap w-max px-4">
               {universitiesList.map((uni, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xl font-bold text-slate-300 dark:text-slate-700 grayscale hover:grayscale-0 hover:text-slate-500 dark:hover:text-slate-400 transition-all duration-500 cursor-default">
                     <GraduationCap size={24} />
                     {uni}
                  </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-24 overflow-hidden" ref={stepsRef}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">كيف تبدأ؟</h2>
               <p className="text-slate-500 dark:text-slate-400 text-lg">ثلاث خطوات بسيطة تفصلك عن التميز الأكاديمي</p>
            </div>

            <div className="max-w-3xl mx-auto relative pr-10 md:pr-0">
               <div className="absolute top-0 bottom-0 right-4 md:right-[-40px] w-1 bg-gray-200 dark:bg-slate-800 rounded-full"></div>

               <div 
                 className="absolute top-0 right-4 md:right-[-40px] w-1 bg-gradient-to-b from-primary-500 to-blue-600 rounded-full transition-all duration-[2000ms] ease-linear"
                 style={{ height: stepsVisible ? '100%' : '0%' }}
               ></div>

               <div className="space-y-12">
                  {[
                     { step: '01', title: 'سجل حسابك', desc: 'استخدم بريدك الجامعي الرسمي أو بريدك الخاص  لإنشاء حساب موثق والوصول لكافة المميزات.', icon: <UserIcon size={24} />, delay: '0ms' },
                     { step: '02', title: 'ارفع مشروعك', desc: 'أضف تفاصيل المشروع، الصور، الملفات، وأعضاء الفريق في نموذج سهل ومرن.', icon: <UploadIcon size={24} />, delay: '500ms' },
                     { step: '03', title: 'انطلق للعالمية', desc: 'شارك رابط مشروعك في سيرتك الذاتية وعلى LinkedIn واحصل على تقييمات.', icon: <Rocket size={24} />, delay: '1000ms' },
                  ].map((item, idx) => (
                     <div 
                        key={idx} 
                        className={`relative flex items-start gap-8 transition-all duration-700 transform ${stepsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                        style={{ transitionDelay: item.delay }}
                     >

                        <div className="absolute right-[-60px] md:right-[-124px] flex items-center justify-center">
                           <div className={`w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-slate-900 border-4 border-primary-100 dark:border-primary-900/30 rounded-full flex items-center justify-center text-xl font-black text-primary-600 shadow-lg z-10 relative group transition-all duration-500 ${stepsVisible ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: item.delay }}>
                              <span className="relative z-10">{item.step}</span>
                              <div className="absolute inset-0 bg-primary-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"></div>
                           </div>
                        </div>

                        <div className="flex-1 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow group">
                           <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 mb-4 group-hover:scale-110 transition-transform">
                             {item.icon}
                           </div>
                           <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                           <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base">
                              {item.desc}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            
            <div className="text-center mt-16">
               <Link to="/auth?mode=signup" className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all bg-primary-600 hover:bg-primary-700 px-8 py-4 rounded-2xl shadow-lg shadow-primary-600/30">
                  ابدأ التسجيل مجاناً <ArrowRight size={20} />
               </Link>
            </div>
         </div>
      </section>

      <section className="py-24 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">المنصة التي تخدم الجميع</h2>
               <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                 سواء كنت طالباً، مشرفاً أكاديمياً، أو شركة تبحث عن المواهب
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 hover:border-primary-500 transition-colors duration-300 shadow-lg">
                  <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
                     <GraduationCap size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">للطلاب</h3>
                  <ul className="space-y-3">
                     {['حفظ وتوثيق مشاريع التخرج', 'بناء سيرة ذاتية قوية', 'الوصول لمصادر وأفكار ملهمة', 'التواصل مع الطلاب الآخرين'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm">
                           <Check size={16} className="text-primary-500 mt-0.5" /> {item}
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-colors duration-300 shadow-lg">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                     <Target size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">للمشرفين والجامعات</h3>
                  <ul className="space-y-3">
                     {['أرشفة إلكترونية لمخرجات الطلاب', 'إبراز جودة التعليم بالجامعة', 'متابعة أداء الطلاب وتطورهم', 'تسهيل عملية التقييم والمراجعة'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm">
                           <Check size={16} className="text-primary-500 mt-0.5" /> {item}
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 hover:border-sky-500 transition-colors duration-300 shadow-lg">
                  <div className="w-14 h-14 bg-sky-100 dark:bg-sky-900/30 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
                     <Briefcase size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">للشركات وجهات التوظيف</h3>
                  <ul className="space-y-3">
                     {['استقطاب المواهب الشابة المتميزة', 'رعاية المشاريع الواعدة', 'الاطلاع على التوجهات التقنية', 'دعم الابتكار والبحث والتطوير'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm">
                           <Check size={16} className="text-primary-500 mt-0.5" /> {item}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </section>

      <section className="py-24 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-white dark:bg-slate-900 -skew-x-12 opacity-50 pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">لماذا ProjexHub؟</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                أكثر من مجرد منصة أرشفة، نحن نبني مجتمعاً للمعرفة والإلهام
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-6 rotate-3 group-hover:rotate-0 transition-transform">
                    <Lightbulb size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">إلهام متجدد</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    هل تبحث عن فكرة لمشروعك؟ تصفح آلاف المشاريع السابقة واستلهم أفكاراً إبداعية وحلولاً تقنية مبتكرة.
                  </p>
               </div>

               <div className="group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30 mb-6 -rotate-3 group-hover:rotate-0 transition-transform">
                    <Share2 size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">شبكة علاقات</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    تواصل مع طلاب من جامعات أخرى، تبادل الخبرات البرمجية، وقم ببناء فريقك للمشاريع القادمة.
                  </p>
               </div>

               <div className="group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/30 mb-6 rotate-3 group-hover:rotate-0 transition-transform">
                    <Award size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">توثيق الإنجاز</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    احصل على ملف تعريفي احترافي يعرض مشاريعك وإنجازاتك ليكون مرجعاً قوياً عند التقديم على الوظائف.
                  </p>
               </div>
            </div>
         </div>
      </section>

      <section className="py-24 border-y border-slate-100 dark:border-slate-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">كل ما تحتاجه في مكان واحد</h2>
               <p className="text-lg text-slate-500 dark:text-slate-400">أدوات متكاملة تدعم رحلتك من الفكرة إلى النشر</p>
            </div>

            <div className="relative mx-auto max-w-6xl rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden group animate-fade-in-up">

               <div className="h-12 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="flex-1 text-center text-xs font-bold text-slate-400">ProjexHub Dashboard</div>
               </div>

               <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative z-10">

                  <div className="flex gap-6 items-start">
                     <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 flex-shrink-0 mt-1">
                        <Globe size={28} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">معرض أعمال احترافي</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                           احصل على رابط خاص يعرض مشاريعك، مهاراتك، وإنجازاتك بشكل أنيق يليق بمشاركتها مع جهات التوظيف في سيرتك الذاتية.
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-6 items-start">
                     <div className="w-14 h-14 rounded-2xl bg-sky-100 dark:bg-sky-900/20 flex items-center justify-center text-sky-600 flex-shrink-0 mt-1">
                        <Zap size={28} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">بحث ذكي</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                           محرك بحث متقدم يدعم التصفية حسب الجامعة، التخصص، والتقنيات المستخدمة لتصل لما تبحث عنه بسرعة.
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-6 items-start">
                     <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 flex-shrink-0 mt-1">
                        <Shield size={28} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">حفظ الحقوق</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                           توثيق رقمي لأفكارك ومشاريعك يحميك من السرقة الفكرية ويثبت أسبقيتك في الابتكار وتاريخ النشر.
                        </p>
                     </div>
                  </div>

                   <div className="flex gap-6 items-start">
                     <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-1">
                        <FileCode size={28} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">مكتبة مصادر ضخمة</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                           استفد من آلاف المشاريع السابقة، اطلع على طريقة كتابة التقارير، وتعلم من الأكواد المصدرية المفتوحة.
                        </p>
                     </div>
                  </div>

               </div>

               <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-primary-50/50 to-transparent pointer-events-none rounded-tl-full"></div>
            </div>
         </div>
      </section>

      <section className="py-24 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">قصص نجاح</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">ماذا يقول الطلاب والمشرفون عن ProjexHub</p>
         </div>

         <div className="marquee-container">
            <div className="flex items-center gap-8 animate-scroll-x whitespace-nowrap w-max px-4 hover:[animation-play-state:paused]">
               {scrollingTestimonials.map((review, idx) => (
                  <div key={idx} className="w-[400px] bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 relative flex-shrink-0 whitespace-normal shadow-sm hover:shadow-md transition-all">
                     <Quote className="absolute top-6 left-6 text-slate-100 dark:text-slate-800 transform rotate-180" size={32} />
                     <div className="relative z-10">
                        <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6 min-h-[80px]">"{review.text}"</p>
                        <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                           <div className={`w-12 h-12 rounded-full ${review.avatar} flex items-center justify-center text-white font-bold shadow-md text-lg`}>
                              {review.name.charAt(0)}
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{review.name}</h4>
                              <span className="text-xs font-bold text-slate-500">{review.role}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-950">
         <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">الأسئلة الشائعة</h2>
               <p className="text-slate-500 dark:text-slate-400 text-lg">إجابات سريعة على استفساراتك</p>
            </div>

            <div className="space-y-4">
               {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                     <button 
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-6 text-right font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                     >
                        <span>{faq.q}</span>
                        <ChevronDown className={`transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180' : ''}`} size={20} />
                     </button>
                     <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="p-6 pt-0 text-slate-500 dark:text-slate-400 leading-relaxed">
                           {faq.a}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <Sparkles className="w-12 h-12 text-primary-400 mx-auto mb-8 animate-pulse-slow" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
               لا تدع مشروعك يبقى حبيس الأدراج
            </h2>
            <p className="text-slate-300 text-xl mb-10 leading-relaxed">
               انضم لأكثر من 5,000 طالب يشاركون إبداعاتهم الآن.
            </p>
            <Link to="/auth?mode=signup" className="inline-flex px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary-500/30 hover:scale-105 transition-all">
               سجل الآن مجاناً
            </Link>
         </div>
      </section>

    </div>
  );
};

const UserIcon = ({size}: {size:number}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default Home;