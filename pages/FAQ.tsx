import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('الكل');

  const faqs: FAQItem[] = [
    {
      category: 'عام',
      question: 'ما هي منصة ProjexHub؟',
      answer: 'ProjexHub هي المنصة الأولى لتوثيق وإبراز مشاريع التخرج الجامعية في المملكة العربية السعودية. نوفر مساحة للطلاب لعرض مشاريعهم، التواصل مع الشركات، والحصول على فرص عمل.'
    },
    {
      category: 'عام',
      question: 'هل المنصة مجانية؟',
      answer: 'نعم، التسجيل الأساسي ورفع المشاريع مجاني بالكامل. نوفر أيضاً خطط مميزة للطلاب والجامعات الذين يرغبون في الحصول على مزايا إضافية.'
    },
    {
      category: 'عام',
      question: 'من يمكنه استخدام المنصة؟',
      answer: 'المنصة متاحة لجميع طلاب الجامعات السعودية، الخريجين، المشرفين الأكاديميين، والشركات المهتمة بتوظيف المواهب.'
    },
    {
      category: 'التسجيل',
      question: 'كيف أقوم بإنشاء حساب؟',
      answer: 'يمكنك التسجيل باستخدام بريدك الإلكتروني الجامعي أو الشخصي. انقر على زر "إنشاء حساب" في الصفحة الرئيسية، املأ البيانات المطلوبة، وستتلقى رسالة تأكيد على بريدك الإلكتروني.'
    },
    {
      category: 'التسجيل',
      question: 'هل يجب استخدام البريد الجامعي للتسجيل؟',
      answer: 'لا، يمكنك التسجيل باستخدام أي بريد إلكتروني. ولكن استخدام البريد الجامعي يمنحك شارة "طالب موثق" ويزيد من مصداقية ملفك الشخصي.'
    },
    {
      category: 'التسجيل',
      question: 'نسيت كلمة المرور، ماذا أفعل؟',
      answer: 'انقر على "نسيت كلمة المرور" في صفحة تسجيل الدخول، أدخل بريدك الإلكتروني، وسنرسل لك رابط لإعادة تعيين كلمة المرور.'
    },
    {
      category: 'المشاريع',
      question: 'كيف أرفع مشروعي؟',
      answer: 'بعد تسجيل الدخول، اذهب إلى "لوحة التحكم" ثم انقر على "إضافة مشروع جديد". املأ تفاصيل المشروع، أضف الصور والملفات، ثم انقر على "نشر المشروع".'
    },
    {
      category: 'المشاريع',
      question: 'ما هي المعلومات المطلوبة لرفع المشروع؟',
      answer: 'تحتاج إلى: عنوان المشروع، وصف مختصر، وصف تفصيلي، الجامعة، التخصص، سنة التخرج، التقنيات المستخدمة، وصور توضيحية. يمكنك أيضاً إضافة روابط العرض التوضيحي والكود المصدري.'
    },
    {
      category: 'المشاريع',
      question: 'هل يمكنني تعديل المشروع بعد نشره؟',
      answer: 'نعم، يمكنك تعديل جميع تفاصيل مشروعك في أي وقت من خلال لوحة التحكم الخاصة بك.'
    },
    {
      category: 'المشاريع',
      question: 'كم عدد المشاريع التي يمكنني رفعها؟',
      answer: 'لا يوجد حد أقصى لعدد المشاريع. يمكنك رفع جميع مشاريعك الأكاديمية والشخصية.'
    },
    {
      category: 'المشاريع',
      question: 'هل يمكنني إضافة أعضاء الفريق؟',
      answer: 'نعم، يمكنك إضافة أسماء جميع أعضاء الفريق الذين عملوا معك على المشروع.'
    },
    {
      category: 'الخصوصية',
      question: 'هل مشاريعي مرئية للجميع؟',
      answer: 'نعم، المشاريع المنشورة تكون مرئية لجميع زوار المنصة. هذا يساعد في زيادة فرص التواصل مع الشركات وأصحاب العمل.'
    },
    {
      category: 'الخصوصية',
      question: 'هل يمكنني جعل مشروعي خاصاً؟',
      answer: 'حالياً، جميع المشاريع المنشورة تكون عامة. نعمل على إضافة خيار المشاريع الخاصة في التحديثات القادمة.'
    },
    {
      category: 'الخصوصية',
      question: 'كيف تحمون بياناتي الشخصية؟',
      answer: 'نستخدم أحدث معايير الأمان لحماية بياناتك. لا نشارك معلوماتك الشخصية مع أي جهة خارجية دون إذنك.'
    },
    {
      category: 'التواصل',
      question: 'كيف يمكن للشركات التواصل معي؟',
      answer: 'الشركات يمكنها مراسلتك مباشرة من خلال نظام الرسائل الداخلي في المنصة. ستتلقى إشعاراً عند وصول رسالة جديدة.'
    },
    {
      category: 'التواصل',
      question: 'هل يمكنني التواصل مع طلاب آخرين؟',
      answer: 'نعم، يمكنك التواصل مع أي طالب أو مشرف على المنصة من خلال نظام الرسائل.'
    },
    {
      category: 'المسابقات',
      question: 'ما هي المسابقات المتاحة؟',
      answer: 'نقوم بتنظيم مسابقات دورية لأفضل المشاريع في مختلف التخصصات. تابع صفحة المسابقات للاطلاع على المسابقات الحالية والجوائز.'
    },
    {
      category: 'المسابقات',
      question: 'كيف أشارك في المسابقات؟',
      answer: 'بعد رفع مشروعك، يمكنك التقديم للمسابقات المتاحة من خلال صفحة المسابقات. بعض المسابقات تتطلب معايير محددة للمشاركة.'
    },
    {
      category: 'الدعم',
      question: 'كيف أتواصل مع الدعم الفني؟',
      answer: 'يمكنك التواصل معنا عبر صفحة "تواصل معنا" أو إرسال بريد إلكتروني إلى support@projexhub.sa. نرد على جميع الاستفسارات خلال 24 ساعة.'
    },
    {
      category: 'الدعم',
      question: 'هل توفرون دعماً للجامعات؟',
      answer: 'نعم، نوفر حلولاً مخصصة للجامعات لإدارة مشاريع طلابها. للمزيد من المعلومات، تواصل معنا عبر البريد الإلكتروني.'
    }
  ];

  const categories = ['الكل', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'الكل' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-transparent pb-20 pt-24 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 mx-auto mb-6">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            الأسئلة الشائعة
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            إجابات على الأسئلة الأكثر شيوعاً حول منصة ProjexHub
          </p>
        </div>

        <div className="mb-8 animate-fade-in-up delay-100">
          <div className="relative">
            <Search className="absolute right-4 top-4 text-slate-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن سؤال..."
              className="w-full pr-12 pl-4 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 focus:border-primary-500 outline-none dark:text-white transition-all font-medium shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up delay-200">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                activeCategory === category
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-primary-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4 animate-fade-in-up delay-300">
          {filteredFAQs.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                لم يتم العثور على نتائج. جرب البحث بكلمات مختلفة.
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-bold rounded-lg mb-2">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`text-slate-400 transition-transform flex-shrink-0 mr-4 ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                    size={24}
                  />
                </button>
                
                {activeIndex === index && (
                  <div className="px-6 pb-5 animate-fade-in">
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-[2.5rem] p-8 md:p-12 text-center text-white shadow-xl animate-fade-in-up delay-400">
          <h2 className="text-2xl md:text-3xl font-black mb-3">لم تجد إجابة لسؤالك؟</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            فريق الدعم لدينا جاهز لمساعدتك. تواصل معنا وسنرد عليك في أقرب وقت ممكن.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-2xl font-bold hover:shadow-2xl transition-all hover:scale-105"
          >
            تواصل معنا
          </Link>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
