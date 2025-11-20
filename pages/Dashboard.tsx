import React, { useState } from 'react';
import { User } from '../App';
import { Plus, TrendingUp, Users, Eye, FolderGit2, Search, Bell, ArrowUpRight, Trash2, ExternalLink, AlertTriangle, BarChart3, Clock, Heart, MessageSquare, CheckCircle2, Zap, Award, Target, Rocket, Star, Code, LayersIcon, Activity, TrendingDown, Gift, Settings, Upload, Edit } from 'lucide-react';
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
    { id: 4, user: 'أحمد العتيبي', action: 'بدأ متابعة', target: 'ملفك الشخصي', time: 'منذ يومين', icon: <Users size={14}/>, color: 'bg-purple-500' },
  ];

  // Sparkline data for mini charts
  const sparklineData = {
    views: [20, 35, 28, 45, 38, 55, 48],
    engagement: [15, 25, 20, 38, 32, 45, 40],
    projects: [1, 2, 2, 3, 4, 4, 5],
    profile: [30, 42, 38, 55, 48, 65, 58],
  };

  // Weekly performance data
  const weeklyData = [40, 65, 45, 80, 55, 90, 70];
  const days = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

  // Tech distribution data
  const techStack = [
    { name: 'React', percentage: 35, color: 'bg-blue-500' },
    { name: 'TypeScript', percentage: 25, color: 'bg-cyan-500' },
    { name: 'Node.js', percentage: 20, color: 'bg-green-500' },
    { name: 'Python', percentage: 15, color: 'bg-yellow-500' },
    { name: 'أخرى', percentage: 5, color: 'bg-gray-500' },
  ];

  // Notifications
  const notifications = [
    { id: 1, title: 'مشروع جديد تم نشره', desc: 'تم نشر مشروع "ProjexHub" بنجاح', time: 'منذ ساعة', type: 'success', icon: <CheckCircle2 size={16} /> },
    { id: 2, title: 'تحديث مهم', desc: 'لديك 3 تعليقات جديدة على مشاريعك', time: 'منذ 3 ساعات', type: 'info', icon: <Bell size={16} /> },
    { id: 3, title: 'إنجاز جديد', desc: 'وصلت إلى 10,000 مشاهدة!', time: 'منذ يوم', type: 'achievement', icon: <Award size={16} /> },
  ];

  // Quick actions
  const quickActions = [
    { icon: <Upload size={18} />, label: 'رفع مشروع', link: '/upload', color: 'bg-blue-600' },
    { icon: <Search size={18} />, label: 'تصفح المشاريع', link: '/projects', color: 'bg-blue-500' },
    { icon: <Settings size={18} />, label: 'الإعدادات', link: '/settings', color: 'bg-blue-700' },
    { icon: <Activity size={18} />, label: 'الإحصائيات', link: '/stats', color: 'bg-blue-800' },
  ];

  // Mini sparkline component
  const MiniSparkline = ({ data, color = 'primary' }: { data: number[], color?: string }) => {
    const max = Math.max(...data);
    const normalized = data.map(v => (v / max) * 100);
    
    return (
      <div className="flex items-end gap-0.5 h-8">
        {normalized.map((height, i) => (
          <div
            key={i}
            className={`flex-1 bg-${color}-400/30 rounded-sm transition-all hover:bg-${color}-400`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent pb-20 relative font-sans">

      {/* Delete Modal */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">

         {/* Welcome Banner with Gradient */}
         <div className="relative overflow-hidden rounded-[3rem] mb-8 animate-fade-in-up">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
               <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  {/* User Info */}
                  <div className="flex items-center gap-6">
                     {user.avatar.startsWith('http') || user.avatar.includes('/') ? (
                        <div className="w-24 h-24 rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-white/20 backdrop-blur">
                           <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                     ) : (
                        <div className={`w-24 h-24 rounded-[2rem] ${user.avatar} flex items-center justify-center text-4xl font-bold text-white shadow-2xl ring-4 ring-white/20`}>{user.initial}</div>
                     )}
                     <div className="text-white">
                        <h1 className="text-4xl md:text-5xl font-black mb-2">مرحباً، {user.name}! 👋</h1>
                        <p className="text-white/80 font-medium text-lg">لديك يوم رائع اليوم! إليك ملخص أنشطتك</p>
                        <div className="flex items-center gap-3 mt-3">
                           <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">المطور الشامل</span>
                           <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold flex items-center gap-1">
                              <Star size={14} fill="currentColor" /> عضو مميز
                           </span>
                        </div>
                     </div>
                  </div>

                  {/* Quick Stats in Banner */}
                  <div className="flex gap-4">
                     <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[100px] border border-white/20">
                        <div className="text-3xl font-black text-white mb-1">5</div>
                        <div className="text-white/70 text-xs font-bold">مشاريع</div>
                     </div>
                     <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[100px] border border-white/20">
                        <div className="text-3xl font-black text-white mb-1">100k</div>
                        <div className="text-white/70 text-xs font-bold">مشاهدة</div>
                     </div>
                     <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[100px] border border-white/20">
                        <div className="text-3xl font-black text-white mb-1">85%</div>
                        <div className="text-white/70 text-xs font-bold">التفاعل</div>
                     </div>
                  </div>
               </div>

               {/* Monthly Goal Progress */}
               <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex justify-between items-center mb-3">
                     <div className="flex items-center gap-2 text-white">
                        <Target size={20} />
                        <span className="font-bold">الهدف الشهري</span>
                     </div>
                     <span className="text-white font-black text-lg">75%</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-white/70 text-sm font-medium mt-2">3 من 4 مشاريع مكتملة هذا الشهر</p>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">

               {/* Enhanced Stats Cards with Sparklines */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up delay-100">
                  {[
                     { l: 'إجمالي المشاهدات', v: '100k', prev: '88k', c: 'blue', i: <Eye />, trend: '+12%', sparkline: sparklineData.views, up: true },
                     { l: 'تفاعل الجمهور', v: '100k', prev: '95k', c: 'purple', i: <TrendingUp />, trend: '+5.3%', sparkline: sparklineData.engagement, up: true },
                     { l: 'المشاريع النشطة', v: '5', prev: '4', c: 'green', i: <FolderGit2 />, trend: '+1', sparkline: sparklineData.projects, up: true },
                     { l: 'زيارات الملف', v: '100k', prev: '82k', c: 'orange', i: <Users />, trend: '+22%', sparkline: sparklineData.profile, up: true },
                  ].map((s, i) => (
                     <div key={i} className="relative bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
                        {/* Gradient overlay on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-${s.c}-50 to-transparent dark:from-${s.c}-950/20 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                        
                        <div className="relative z-10">
                           <div className="flex justify-between items-start mb-4">
                              <div className={`w-14 h-14 rounded-2xl bg-${s.c}-50 dark:bg-${s.c}-900/20 text-${s.c}-600 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                                 {s.i}
                              </div>
                              <span className={`${s.up ? 'bg-green-100 dark:bg-green-900/20 text-green-600' : 'bg-red-100 dark:bg-red-900/20 text-red-600'} text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm`}>
                                 {s.up ? <ArrowUpRight size={12} /> : <TrendingDown size={12} />} {s.trend}
                              </span>
                           </div>
                           <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-1">{s.v}</h3>
                           <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-4">{s.l}</p>
                           
                           {/* Sparkline */}
                           <div className="mt-4">
                              <MiniSparkline data={s.sparkline} color={s.c} />
                           </div>
                           
                           <div className="mt-2 flex items-center justify-between text-xs">
                              <span className="text-slate-400 font-medium">من {s.prev}</span>
                              <span className="text-slate-400 font-medium">آخر 7 أيام</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Projects Grid */}
               <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden animate-fade-in-up delay-200">
                  <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                     <div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">مشاريعي النشطة</h3>
                        <p className="text-slate-500 text-sm">إدارة ومتابعة جميع مشاريعك</p>
                     </div>
                     <div className="flex gap-3 w-full sm:w-auto">
                        <div className="flex-1 sm:flex-none bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-2 border border-slate-100 dark:border-slate-700">
                           <Search size={18} className="text-slate-400" />
                           <input type="text" placeholder="بحث..." className="bg-transparent outline-none text-sm font-bold w-full sm:w-40 dark:text-white" />
                        </div>
                        <Link to="/upload" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/30">
                           <Plus size={18} /> جديد
                        </Link>
                     </div>
                  </div>
                  
                  {/* Projects Grid Layout */}
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                     {userProjects.slice(0, 4).map((p) => (
                        <div key={p.id} className="group bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 hover:from-white hover:to-slate-50 dark:hover:from-slate-800 dark:hover:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                           {/* Thumbnail */}
                           <div className="relative h-48 overflow-hidden">
                              <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                              <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg border border-white/20">
                                 {p.badge?.text || 'مشروع'}
                              </div>
                              <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                                 <span className="px-2 py-1 bg-green-500/90 backdrop-blur text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                                    <CheckCircle2 size={10} /> منشور
                                 </span>
                              </div>
                           </div>

                           {/* Content */}
                           <div className="p-5">
                              <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 line-clamp-1">{p.title}</h4>
                              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-2 mb-4">
                                 {p.description}
                              </p>

                              {/* Stats */}
                              <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                                 <span className="flex items-center gap-1"><Eye size={14} /> {p.views}</span>
                                 <span className="flex items-center gap-1"><Heart size={14} /> {p.likes}</span>
                                 <span className="flex items-center gap-1"><Clock size={14} /> {p.year}</span>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                 <Link to={`/projects/${p.slug}`} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                    <Eye size={14} /> عرض
                                 </Link>
                                 {p.demoUrl && (
                                    <a href={p.demoUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                       <ExternalLink size={14} /> زيارة
                                    </a>
                                 )}
                                 <button className="px-4 py-2.5 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 text-xs font-bold hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                                    <Edit size={14} />
                                 </button>
                                 <button onClick={() => handleDeleteClick(p.id)} className="px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                                    <Trash2 size={14} />
                                 </button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>

                  {userProjects.length > 4 && (
                     <div className="p-6 pt-0">
                        <Link to="/my-projects" className="w-full py-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center gap-2">
                           عرض جميع المشاريع ({userProjects.length})
                        </Link>
                     </div>
                  )}
               </div>

               {/* Tech Stack Distribution */}
               <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-lg animate-fade-in-up delay-300">
                  <div className="flex items-center justify-between mb-6">
                     <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                           <Code size={20} className="text-blue-600" /> توزيع التقنيات
                        </h3>
                        <p className="text-slate-500 text-sm">التقنيات المستخدمة في مشاريعك</p>
                     </div>
                  </div>
                  
                  <div className="space-y-4">
                     {techStack.map((tech, idx) => (
                        <div key={idx}>
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{tech.name}</span>
                              <span className="text-sm font-black text-slate-900 dark:text-white">{tech.percentage}%</span>
                           </div>
                           <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                 className={`h-full ${tech.color} rounded-full transition-all duration-1000 ease-out`}
                                 style={{ width: `${tech.percentage}%` }}
                              ></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">

               {/* Quick Actions Widget */}
               <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl animate-fade-in-up delay-100">
                  <div className="flex items-center gap-2 mb-6">
                     <Rocket size={24} className="text-yellow-400" />
                     <h3 className="text-xl font-black">إجراءات سريعة</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                     {quickActions.map((action, idx) => (
                        <Link 
                           key={idx}
                           to={action.link}
                           className={`${action.color} p-4 rounded-2xl hover:scale-105 transition-transform flex flex-col items-center justify-center gap-2 text-center min-h-[100px] shadow-lg`}
                        >
                           {action.icon}
                           <span className="text-xs font-bold">{action.label}</span>
                        </Link>
                     ))}
                  </div>
               </div>

               {/* Notifications Panel */}
               <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-lg animate-fade-in-up delay-200">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <Bell size={20} className="text-orange-500" /> الإشعارات
                     </h3>
                     <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-lg">
                        {notifications.length} جديد
                     </span>
                  </div>
                  
                  <div className="space-y-4">
                     {notifications.map((notif) => (
                        <div 
                           key={notif.id} 
                           className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer ${
                              notif.type === 'success' ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' :
                              notif.type === 'achievement' ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/30' :
                              'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30'
                           }`}
                        >
                           <div className="flex gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                 notif.type === 'success' ? 'bg-green-500 text-white' :
                                 notif.type === 'achievement' ? 'bg-yellow-500 text-white' :
                                 'bg-blue-500 text-white'
                              }`}>
                                 {notif.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{notif.title}</h4>
                                 <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{notif.desc}</p>
                                 <span className="text-[10px] text-slate-400 font-medium">{notif.time}</span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>

                  <button className="w-full mt-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                     عرض جميع الإشعارات
                  </button>
               </div>

               {/* Weekly Performance Chart */}
               <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden animate-fade-in-up delay-300">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="relative z-10">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                           <h3 className="text-xl font-black">أداء الأسبوع</h3>
                           <p className="text-blue-200 text-sm font-medium">مشاهدات الملف الشخصي</p>
                        </div>
                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm"><BarChart3 size={24} /></div>
                     </div>

                     <div className="flex items-end justify-between h-32 gap-2">
                        {weeklyData.map((h, i) => (
                           <div key={i} className="w-full flex flex-col justify-end group cursor-pointer">
                              <div 
                                className="w-full bg-white/20 rounded-t-lg transition-all duration-300 group-hover:bg-white/40 relative"
                                style={{ height: `${h}%` }}
                              >
                                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {h * 10}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="flex justify-between mt-4 text-[10px] font-bold text-blue-200 px-1">
                        {days.map((d, i) => <span key={i}>{d.charAt(0)}</span>)}
                     </div>
                  </div>
               </div>

               {/* Activity Timeline */}
               <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-lg animate-fade-in-up delay-400">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <Zap size={20} className="text-yellow-500" /> آخر الأنشطة
                     </h3>
                     <button className="text-xs font-bold text-blue-600 hover:underline">عرض الكل</button>
                  </div>
                  
                  <div className="space-y-6 relative">
                     <div className="absolute right-[19px] top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800"></div>

                     {activities.map((act) => (
                        <div key={act.id} className="relative flex items-start gap-4 group">
                           <div className={`relative z-10 w-10 h-10 rounded-full ${act.color} flex items-center justify-center text-white shadow-md ring-4 ring-white dark:ring-slate-900 shrink-0 group-hover:scale-110 transition-transform`}>
                              {act.icon}
                           </div>
                           <div className="flex-1 pt-1">
                              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                                 <span className="font-bold text-slate-900 dark:text-white">{act.user}</span> {act.action} <span className="text-blue-600 font-bold">{act.target}</span>
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
