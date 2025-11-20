import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Github, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-600 text-white font-bold text-lg p-1.5 rounded">PH</div>
              <span className="font-bold text-xl text-slate-800 dark:text-white">ProjexHub</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
              منصة تبادل مشاريع التخرج الجامعية - اكتشف، شارك، وتعلم مع مجتمع من المبدعين.
              المنصة الأولى لدعم الابتكار الأكاديمي في المملكة.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com/Su05l" target='_blank' className="text-slate-400 hover:text-primary-600 transition-colors"><Twitter size={20} /></a>
              <a href="https://www.linkedin.com/in/suliaman-yousef-36265a320" target='_blank' className="text-slate-400 hover:text-primary-600 transition-colors"><Linkedin size={20} /></a>
              <a href="https://github.com/Su03l" target='_blank' className="text-slate-400 hover:text-primary-600 transition-colors"><Github size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/" className="hover:text-primary-600 transition-colors">الرئيسية</Link></li>
              <li><Link to="/browse" className="hover:text-primary-600 transition-colors">تصفح المشاريع</Link></li>
              <li><Link to="/upload" className="hover:text-primary-600 transition-colors">رفع مشروع</Link></li>
              <li><Link to="/competition" className="hover:text-primary-600 transition-colors">المسابقة</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">الدعم والتواصل</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/contact" className="hover:text-primary-600 transition-colors">تواصل معنا</Link></li>
              <li><Link to="/faq" className="hover:text-primary-600 transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link to="/report-issue" className="hover:text-primary-600 transition-colors">بلاغ عن مشكلة</Link></li>
              <li><Link to="/auth?mode=signup" className="hover:text-primary-600 transition-colors">إنشاء حساب</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">تواصل معنا</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary-600" />
                <span>info@projexhub.sa</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary-600" />
                <span dir='ltr'>+966 50 000 0000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">© 2024 ProjexHub. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6 text-sm text-slate-400">
             <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200">شروط الاستخدام</a>
             <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200">سياسة الخصوصية</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;