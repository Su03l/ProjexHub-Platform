import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, User, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-transparent pb-20 pt-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            تواصل معنا
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            نحن هنا للإجابة على استفساراتك ومساعدتك. لا تتردد في التواصل معنا
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1 space-y-6 animate-fade-in-up delay-100">

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 mb-4">
                <Mail size={28} />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">البريد الإلكتروني</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">راسلنا في أي وقت</p>
              <a href="mailto:support@projexhub.sa" className="text-primary-600 font-bold hover:underline">
                info@projexhub.sa
              </a>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 mb-4">
                <Phone size={28} />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">الهاتف</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">اتصل بنا مباشرة</p>
              <a href="tel:+966500000000" className="text-primary-600 font-bold hover:underline direction-ltr block text-right">
                +966 50 000 0000
              </a>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 mb-4">
                <MapPin size={28} />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">الموقع</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">زرنا في مقرنا</p>
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                المدينة المنورة، المملكة العربية السعودية
              </p>
            </div>

            {/* Working Hours Card */}
            {/* <div className="bg-gradient-to-br from-primary-600 to-purple-600 rounded-[2rem] p-6 shadow-xl text-white">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <Clock size={28} />
              </div>
              <h3 className="text-lg font-black mb-2">ساعات العمل</h3>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="font-bold">الأحد - الخميس</span>
                  <span className="text-primary-100">9:00 - 17:00</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-bold">الجمعة - السبت</span>
                  <span className="text-primary-100">مغلق</span>
                </p>
              </div>
            </div> */}

          </div>

          <div className="lg:col-span-2 animate-fade-in-up delay-200">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">أرسل رسالة</h2>
                  <p className="text-sm text-slate-500">سنرد عليك خلال 24 ساعة</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
       
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    الاسم الكامل
                  </label>
                  <div className="relative">
                    <User className="absolute right-4 top-3.5 text-slate-400" size={18} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      className="w-full pr-11 pl-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none dark:text-white transition-all font-medium"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-4 top-3.5 text-slate-400" size={18} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      className="w-full pr-11 pl-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none dark:text-white transition-all font-medium"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    الموضوع
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none dark:text-white transition-all font-medium"
                    placeholder="موضوع الرسالة"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    الرسالة
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    rows={6}
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none dark:text-white transition-all font-medium resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  إرسال الرسالة
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
