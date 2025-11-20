import React from 'react';
import { Trophy, Mail, Bell, Users, Briefcase, Star, Sparkles } from 'lucide-react';

const Competition: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-primary-200 dark:border-primary-900/50 mb-8 animate-fade-in-up hover:scale-105 transition-transform cursor-default shadow-lg shadow-primary-500/10">
          <Sparkles size={16} className="text-primary-500 animate-pulse" />
          <span className="text-sm font-bold text-primary-700 dark:text-primary-400">قريباً في ProjexHub</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-tight animate-fade-in-up delay-100 drop-shadow-sm">
          قريباً سيتم الإعلان<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-600 to-blue-600">
            عن أضخم المسابقات
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-16 animate-fade-in-up delay-200 leading-relaxed font-medium">
          نحن نعمل على إعداد مسابقات مثيرة ومميزة لأفضل مشاريع التخرج الجامعية.
          ترقبوا الإعلان عن تفاصيل المسابقة، الجوائز القيمة، والمواعيد المهمة قريباً جداً.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-20 animate-fade-in-up delay-300">
          {[
            { icon: <Trophy size={32} className="text-white" />, title: 'جوائز قيمة', desc: 'جوائز نقدية وتقديرية لأفضل المشاريع المبتكرة', color: 'bg-primary-500' },
            { icon: <Users size={32} className="text-white" />, title: 'لجنة تحكيم متخصصة', desc: 'تقييم من خبراء وأكاديميين من كبرى الشركات', color: 'bg-blue-500' },
            { icon: <Briefcase size={32} className="text-white" />, title: 'فرص وظيفية', desc: 'فرص تدريب وتوظيف للفائزين والمشاركين', color: 'bg-sky-500' },
          ].map((feat, idx) => (
            <div key={idx} className="group bg-white dark:bg-slate-900 p-8 rounded-3xl hover:-translate-y-3 transition-all duration-300 shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className={`w-16 h-16 rounded-2xl ${feat.color} flex items-center justify-center mb-6 mx-auto shadow-lg shadow-${feat.color}/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feat.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-4xl relative animate-fade-in-up delay-400 group">
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-700 dark:to-slate-600 rounded-3xl transform rotate-1 opacity-50 blur-md group-hover:rotate-2 transition-transform"></div>
           <div className="relative bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden border border-slate-700 dark:border-slate-600">

             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 group-hover:opacity-30 transition-opacity"></div>
             <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="text-right md:w-1/2">
                 <h3 className="text-3xl font-black mb-3 flex items-center gap-3">
                   <Bell className="text-primary-500 animate-bounce" />
                   كن أول من يعلم
                 </h3>
                 <p className="text-slate-400 dark:text-slate-300 text-lg font-medium">اشترك في القائمة البريدية ليصلك إشعار فور الإعلان عن المسابقة وبدء التسجيل.</p>
               </div>
               
               <div className="w-full md:w-1/2">
                 <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                   <div className="relative">
                     <Mail className="absolute right-4 top-3.5 text-slate-400" size={20} />
                     <input 
                       type="email" 
                       placeholder="أدخل بريدك الإلكتروني"
                       className="w-full pr-12 pl-4 py-4 rounded-xl bg-white/10 dark:bg-slate-900/50 border border-white/20 dark:border-slate-600 placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium transition-all"
                     />
                   </div>
                   <button className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg transform active:scale-95 flex items-center justify-center gap-2">
                     <Sparkles size={20} />
                     إشعرني عند الانطلاق
                   </button>
                 </form>
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Competition;