import React, { useState, useRef, useEffect } from 'react';
import { User } from '../App';
import { Plus, TrendingUp, Users, Eye, FolderGit2, MoreVertical, Search, Bell, ArrowUpRight, Edit, Trash2, ExternalLink, AlertTriangle, BarChart3, Clock, Heart, MessageSquare, CheckCircle2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_PROJECTS } from '../type/constants';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const userProjects = MOCK_PROJECTS; 
  const [deleteModal, setDeleteModal] = useState<{isOpen: boolean, projectId: string | null}>({isOpen: false, projectId: null});

  const handleDeleteClick = (projectId: string) => {
    setDeleteModal({ isOpen: true, projectId });
  };

  const activities = [
    { id: 1, user: 'د. خالد الحريي', action: 'قام بالتعليق على', target: 'ProjexHub', time: 'منذ 2 ساعة', icon: <MessageSquare size={14}/>, color: 'bg-blue-500' },
    { id: 2, user: 'عبدالعزيز السحيمي', action: 'أعجب بـ', target: 'Suliman OS', time: 'منذ 5 ساعات', icon: <Heart size={14}/>, color: 'bg-red-500' },
    { id: 3, user: 'النظام', action: 'تم نشر مشروعك', target: 'CineMax Platform', time: 'منذ يوم واحد', icon: <CheckCircle2 size={14}/>, color: 'bg-green-500' },
  ];

  const chartData = [40, 65, 45, 80, 55, 90, 70];
  const days = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

  return (
    <div className="min-h-screen bg-transparent pb-20 relative font-sans">

      {deleteModal.isOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setDeleteModal({isOpen: false, projectId: null})}></div>
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-md p-8 relative z-10 border border-slate-200 dark:border-slate-800 animate-zoom-in">
               <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-red-500/10"><AlertTriangle size={32} /></div>
               <h3 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-2">حذف المشروع؟</h3>
               <p className="text-slate-500 dark:text-slate-400 text-center mb-8 text-lg font-medium">هل أنت متأكد من رغبتك في حذف هذا المشروع؟ هذا الإجراء نهائي ولا يمكن التراجع عنه.</p>
               <div className="flex gap-4">
                  <button onClick={() => setDeleteModal({isOpen: false, projectId: null})} className="flex-1 py-4 rounded-2xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">إلغاء</button>
                  <button onClick={() => setDeleteModal({isOpen: false, projectId: null})} className="flex-1 py-4 rounded-2xl font-bold text-white bg-red-500 shadow-xl shadow-red-500/30 hover:bg-red-600 transition-colors">نعم، حذف</button>
               </div>
            </div>
         </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

         <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 animate-fade-in-up">
            <div className="flex items-center gap-6">
               {user.avatar.startsWith('http') || user.avatar.includes('/') ? (
                  <div className="w-20 h-20 rounded-[2rem] overflow-hidden shadow-2xl shadow-primary-900/20 ring-4 ring-white dark:ring-slate-950">
                     <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
               ) : (
                  <div className={`w-20 h-20 rounded-[2rem] ${user.avatar} flex items-center justify-center text-3xl font-bold text-white shadow-2xl shadow-primary-900/20 ring-4 ring-white dark:ring-slate-950`}>{user.initial}</div>
               )}
               <div>
                  <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-1">لوحة التحكم</h1>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold">
                     <span>أهلاً بك، {user.name}</span>
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                     <span className="text-primary-600 dark:text-primary-400 text-sm">المطور الشامل</span>
                  </div>
               </div>
            </div>
            <Link to="/upload" className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all group">
               <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
               مشروع جديد
            </Link>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            <div className="lg:col-span-8 space-y-8">

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up delay-100">
                  {[
                     { l: 'إجمالي المشاهدات', v: '100k', c: 'blue', i: <Eye />, trend: '+12%' },
                     { l: 'تفاعل الجمهور', v: '100k', c: 'primary', i: <TrendingUp />, trend: '+5.3%' },
                     { l: 'المشاريع النشطة', v: '5', c: 'sky', i: <FolderGit2 />, trend: 'جديد' },
                     { l: 'زيارات الملف', v: '100k', c: 'indigo', i: <Users />, trend: '+22%' },
                  ].map((s, i) => (
                     <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                           <div className={`w-12 h-12 rounded-2xl bg-${s.c === 'primary' ? 'primary' : s.c + '-50'} dark:bg-${s.c === 'primary' ? 'primary' : s.c + '-900'}${s.c !== 'primary' ? '/20' : ''} text-${s.c === 'primary' ? 'primary' : s.c + '-600'} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                              {s.i}
                           </div>
                           <span className="bg-green-100 dark:bg-green-900/20 text-green-600 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                              <ArrowUpRight size={12} /> {s.trend}
                           </span>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{s.v}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">{s.l}</p>
                     </div>
                  ))}
               </div>

               <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden animate-fade-in-up delay-200">
                  <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white">إدارة المشاريع</h3>
                     <div className="hidden sm:flex bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 items-center gap-2 border border-slate-100 dark:border-slate-700 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                        <Search size={18} className="text-slate-400" />
                        <input type="text" placeholder="بحث سريع..." className="bg-transparent outline-none text-sm font-bold w-40 dark:text-white" />
                     </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                     {userProjects.map((p, idx) => (
                        <div key={p.id} className="group bg-slate-50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/50 hover:border-primary-200 dark:hover:border-primary-900 rounded-[2rem] p-5 transition-all duration-300 hover:shadow-xl flex flex-col md:flex-row gap-6 items-center">

                           <div className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                              <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                                 {p.badge?.text || 'مشروع'}
                              </div>
                           </div>

                           <div className="flex-1 w-full text-center md:text-right">
                              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                 <h4 className="text-lg font-black text-slate-900 dark:text-white">{p.title}</h4>
                                 <span className="inline-flex w-fit mx-auto md:mx-0 items-center gap-1 px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold border border-green-200 dark:border-green-800">
                                    <CheckCircle2 size={10} /> منشور
                                 </span>
                              </div>
                              
                              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-2 mb-4">
                                 {p.description}
                              </p>

                              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                 <div className="w-full md:w-1/2">
                                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                       <span>اكتمال البيانات</span>
                                       <span>100%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                       <div className="h-full bg-primary-600 rounded-full" style={{ width: '100%' }}></div>
                                    </div>
                                 </div>
                                 
                                 <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                                    <span className="flex items-center gap-1"><Eye size={14} /> {p.views}</span>
                                    <span className="flex items-center gap-1"><Heart size={14} /> {p.likes}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {p.year}</span>
                                 </div>
                              </div>
                           </div>

                           <div className="flex md:flex-col gap-2 w-full md:w-auto">
                              {p.demoUrl && (
                                  <a href={p.demoUrl} target="_blank" rel="noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-primary-50 dark:hover:bg-slate-600 hover:text-primary-600 transition-colors">
                                     <ExternalLink size={14} /> زيارة
                                  </a>
                              )}
                              <Link to={`/project/${p.id}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-colors">
                                 <Eye size={14} /> عرض
                              </Link>
                              <button onClick={() => handleDeleteClick(p.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-red-500 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                 <Trash2 size={14} /> حذف
                              </button>
                           </div>

                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="lg:col-span-4 space-y-8">

               <div className="bg-primary-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-primary-600/30 relative overflow-hidden animate-fade-in-up delay-200">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="relative z-10">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                           <h3 className="text-xl font-black">أداء الأسبوع</h3>
                           <p className="text-primary-200 text-sm font-medium">مشاهدات الملف الشخصي</p>
                        </div>
                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm"><BarChart3 size={24} /></div>
                     </div>

                     <div className="flex items-end justify-between h-32 gap-2">
                        {chartData.map((h, i) => (
                           <div key={i} className="w-full flex flex-col justify-end group cursor-pointer">
                              <div 
                                className="w-full bg-white/20 rounded-t-lg transition-all duration-300 group-hover:bg-white/40 relative"
                                style={{ height: `${h}%` }}
                              >
                                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-primary-600 text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {h * 10}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="flex justify-between mt-4 text-[10px] font-bold text-primary-200 px-1">
                        {days.map((d, i) => <span key={i}>{d.charAt(0)}</span>)}
                     </div>
                  </div>
               </div>

               <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-lg animate-fade-in-up delay-300">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <Zap size={20} className="text-yellow-500" /> آخر الأنشطة
                     </h3>
                     <button className="text-xs font-bold text-primary-600 hover:underline">عرض الكل</button>
                  </div>
                  
                  <div className="space-y-6 relative">
                     <div className="absolute right-[19px] top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800"></div>

                     {activities.map((act) => (
                        <div key={act.id} className="relative flex items-start gap-4">
                           <div className={`relative z-10 w-10 h-10 rounded-full ${act.color} flex items-center justify-center text-white shadow-md ring-4 ring-white dark:ring-slate-900 shrink-0`}>
                              {act.icon}
                           </div>
                           <div className="flex-1 pt-1">
                              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                                 <span className="font-bold text-slate-900 dark:text-white">{act.user}</span> {act.action} <span className="text-primary-600 font-bold">{act.target}</span>
                              </p>
                              <span className="text-xs text-slate-400 font-bold mt-1 block">{act.time}</span>
                           </div>
                        </div>
                     ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                     <button className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        تحديث النشاطات
                     </button>
                  </div>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;