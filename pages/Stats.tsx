import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../App';
import { TrendingUp, Eye, Heart, Users, FolderGit2, ArrowUpRight, TrendingDown, BarChart3, Activity, Clock, Star, Award, Target, ArrowRight } from 'lucide-react';

interface StatsProps {
  user: User;
}

const Stats: React.FC<StatsProps> = ({ user }) => {
  
  const monthlyViews = [
    { month: 'يناير', views: 12000, engagement: 8500 },
    { month: 'فبراير', views: 15000, engagement: 10200 },
    { month: 'مارس', views: 18000, engagement: 12500 },
    { month: 'أبريل', views: 22000, engagement: 15000 },
    { month: 'مايو', views: 28000, engagement: 19000 },
    { month: 'يونيو', views: 35000, engagement: 24000 },
  ];

  const projectStats = [
    { name: 'ProjexHub', views: 45000, likes: 1200, growth: '+25%', trend: 'up' },
    { name: 'Suliman OS', views: 38000, likes: 980, growth: '+18%', trend: 'up' },
    { name: 'CineMax Platform', views: 12000, likes: 450, growth: '+12%', trend: 'up' },
    { name: 'Portfolio Website', views: 8500, likes: 320, growth: '-5%', trend: 'down' },
    { name: 'E-Commerce App', views: 6200, likes: 180, growth: '+8%', trend: 'up' },
  ];

  const audienceData = [
    { country: 'جامعة طيبة', percentage: 45, color: 'bg-blue-600' },
    { country: 'جامعة الملك سعود', percentage: 20, color: 'bg-blue-600' },
    { country: 'جامعة الملك عبدالعزيز', percentage: 15, color: 'bg-blue-600' },
    { country: 'جامعة الإمام محمد بن سعود', percentage: 10, color: 'bg-blue-600' },
    { country: 'جامعة أم القرى', percentage: 10, color: 'bg-blue-600' },
  ];

  const achievements = [
    { icon: <Award size={24} />, title: '100k مشاهدة', desc: 'وصلت إلى 100,000 مشاهدة', color: 'bg-yellow-500' },
    { icon: <Star size={24} />, title: 'مشروع مميز', desc: '5 مشاريع حصلت على تقييم ممتاز', color: 'bg-purple-500' },
    { icon: <Users size={24} />, title: '1000 متابع', desc: 'وصلت إلى 1000 متابع', color: 'bg-blue-500' },
    { icon: <Target size={24} />, title: 'هدف شهري', desc: 'حققت الهدف الشهري 3 مرات', color: 'bg-green-500' },
  ];

  const maxViews = Math.max(...monthlyViews.map(m => m.views));

  return (
    <div className="min-h-screen bg-transparent pb-20 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        <div className="mb-8 animate-fade-in-up">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 font-bold">
            <ArrowRight size={20} />
            العودة إلى لوحة التحكم
          </Link>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">الإحصائيات المتقدمة</h1>
          <p className="text-slate-500 dark:text-slate-400">تحليل شامل لأداء مشاريعك وتفاعل الجمهور</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in-up delay-100">
          {[
            { label: 'إجمالي المشاهدات', value: '100k', change: '+12.5%', icon: <Eye />, color: 'blue', up: true },
            { label: 'التفاعل الكلي', value: '100k', change: '+8.3%', icon: <Heart />, color: 'red', up: true },
            { label: 'المتابعون', value: '1,234', change: '+15.2%', icon: <Users />, color: 'purple', up: true },
            { label: 'المشاريع المنشورة', value: '5', change: '+1', icon: <FolderGit2 />, color: 'green', up: true },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <span className={`${stat.up ? 'bg-green-100 dark:bg-green-900/20 text-green-600' : 'bg-red-100 dark:bg-red-900/20 text-red-600'} text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1`}>
                  {stat.up ? <ArrowUpRight size={12} /> : <TrendingDown size={12} />} {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-lg animate-fade-in-up delay-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">الأداء الشهري</h3>
                  <p className="text-slate-500 text-sm">المشاهدات والتفاعل خلال آخر 6 أشهر</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <BarChart3 size={24} className="text-blue-600" />
                </div>
              </div>

              <div className="space-y-6">
                {monthlyViews.map((data, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{data.month}</span>
                      <div className="flex gap-4 text-xs font-bold">
                        <span className="text-blue-600">{data.views.toLocaleString()} مشاهدة</span>
                        <span className="text-green-600">{data.engagement.toLocaleString()} تفاعل</span>
                      </div>
                    </div>
                    <div className="relative h-12 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                      <div 
                        className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl transition-all duration-1000"
                        style={{ width: `${(data.views / maxViews) * 100}%` }}
                      ></div>
                      <div 
                        className="absolute h-full bg-gradient-to-r from-green-500/50 to-green-600/50 rounded-xl transition-all duration-1000"
                        style={{ width: `${(data.engagement / maxViews) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-lg animate-fade-in-up delay-300">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">أداء المشاريع</h3>
                <p className="text-slate-500 text-sm">إحصائيات تفصيلية لكل مشروع</p>
              </div>

              <div className="space-y-4">
                {projectStats.map((project, i) => (
                  <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-black text-slate-900 dark:text-white">{project.name}</h4>
                      <span className={`${project.trend === 'up' ? 'bg-green-100 dark:bg-green-900/20 text-green-600' : 'bg-red-100 dark:bg-red-900/20 text-red-600'} text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1`}>
                        {project.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {project.growth}
                      </span>
                    </div>
                    <div className="flex gap-6 text-sm font-bold text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1"><Eye size={16} /> {project.views.toLocaleString()} مشاهدة</span>
                      <span className="flex items-center gap-1"><Heart size={16} /> {project.likes.toLocaleString()} إعجاب</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="lg:col-span-4 space-y-8">
            
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-lg animate-fade-in-up delay-200">
              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">الجمهور حسب الجامعة</h3>
                <p className="text-slate-500 text-sm">توزيع المشاهدين</p>
              </div>

              <div className="space-y-4">
                {audienceData.map((data, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{data.country}</span>
                      <span className="text-sm font-black text-slate-900 dark:text-white">{data.percentage}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${data.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${data.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-600/30 animate-fade-in-up delay-300">
              <div className="mb-6">
                <h3 className="text-xl font-black mb-1">الإنجازات</h3>
                <p className="text-blue-200 text-sm">الجوائز والإنجازات المحققة</p>
              </div>

              <div className="space-y-4">
                {achievements.map((achievement, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                    <div className={`w-12 h-12 ${achievement.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{achievement.title}</h4>
                      <p className="text-sm text-blue-100">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-lg animate-fade-in-up delay-400">
              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">إحصائيات سريعة</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">متوسط المشاهدات</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">20k</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">معدل التفاعل</span>
                  <span className="text-lg font-black text-green-600">68%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">وقت المشاهدة</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">4.5 دقيقة</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">معدل النمو</span>
                  <span className="text-lg font-black text-blue-600">+12.5%</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
