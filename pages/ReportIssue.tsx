import React, { useState } from 'react';
import { AlertCircle, Send, FileText, Image, Paperclip, CheckCircle } from 'lucide-react';

const ReportIssue: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: '',
    priority: 'medium',
    title: '',
    description: '',
    url: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Issue reported:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        issueType: '',
        priority: 'medium',
        title: '',
        description: '',
        url: ''
      });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const issueTypes = [
    'مشكلة تقنية',
    'خطأ في البيانات',
    'مشكلة في التسجيل',
    'مشكلة في رفع المشروع',
    'مشكلة في الدفع',
    'محتوى غير لائق',
    'اقتراح تحسين',
    'أخرى'
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-transparent pb-20 pt-24 font-sans flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 border border-slate-200 dark:border-slate-800 shadow-xl text-center max-w-md animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">تم إرسال البلاغ بنجاح!</h2>
          <p className="text-slate-600 dark:text-slate-400">
            شكراً لك على إبلاغنا. سنقوم بمراجعة المشكلة والعمل على حلها في أقرب وقت ممكن.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pb-20 pt-24 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 mx-auto mb-6">
            <AlertCircle size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            بلاغ عن مشكلة
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            ساعدنا في تحسين المنصة من خلال إبلاغنا عن أي مشاكل تواجهها
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl animate-fade-in-up delay-100">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none dark:text-white transition-all font-medium"
                  placeholder="أدخل اسمك"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none dark:text-white transition-all font-medium"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            {/* Issue Type and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  نوع المشكلة
                </label>
                <select
                  value={formData.issueType}
                  onChange={(e) => handleChange('issueType', e.target.value)}
                  required
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none dark:text-white transition-all font-medium cursor-pointer"
                >
                  <option value="" disabled>اختر نوع المشكلة</option>
                  {issueTypes.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  الأولوية
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none dark:text-white transition-all font-medium cursor-pointer"
                >
                  <option value="low">منخفضة</option>
                  <option value="medium">متوسطة</option>
                  <option value="high">عالية</option>
                  <option value="critical">حرجة</option>
                </select>
              </div>
            </div>

            {/* Issue Title */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                عنوان المشكلة
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none dark:text-white transition-all font-medium"
                placeholder="وصف مختصر للمشكلة"
              />
            </div>

            {/* URL (Optional) */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                رابط الصفحة (اختياري)
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => handleChange('url', e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none dark:text-white transition-all font-medium text-left direction-ltr"
                placeholder="https://projexhub.sa/page"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                وصف المشكلة بالتفصيل
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none dark:text-white transition-all font-medium resize-none"
                placeholder="اشرح المشكلة بالتفصيل، متى حدثت، وما الخطوات التي قمت بها..."
              />
            </div>

            {/* File Upload (Visual Only) */}
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
              <Paperclip className="mx-auto text-slate-400 mb-3" size={32} />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                إرفاق صور أو ملفات (اختياري)
              </p>
              <p className="text-xs text-slate-500">
                PNG, JPG, PDF حتى 10MB
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <Send size={20} />
              إرسال البلاغ
            </button>

            {/* Note */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
              <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                <strong>ملاحظة:</strong> سيتم مراجعة جميع البلاغات خلال 24-48 ساعة. شكراً لمساعدتك في تحسين المنصة.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
