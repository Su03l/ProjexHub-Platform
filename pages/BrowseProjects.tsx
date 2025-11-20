import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PROJECTS, SAUDI_UNIVERSITIES, TECH_MAJORS } from '../type/constants';
import { Search, Eye, Tag, X, Filter, RotateCcw } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

const BrowseProjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<string>('الكل');
  const [selectedUni, setSelectedUni] = useState<string>('الكل');

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter(project => {
      const matchesSearch = project.title.includes(searchTerm) || project.description.includes(searchTerm);
      const matchesMajor = selectedMajor === 'الكل' || project.major === selectedMajor;
      const matchesUni = selectedUni === 'الكل' || project.university === selectedUni;
      return matchesSearch && matchesMajor && matchesUni;
    });
  }, [searchTerm, selectedMajor, selectedUni]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedMajor('الكل');
    setSelectedUni('الكل');
  };

  const trendingTags = ["ذكاء اصطناعي", "إنترنت الأشياء", "تطبيقات جوال", "أمن سيبراني", "بلوكتشين", "واقع معزز", "روبوتات", "بيانات ضخمة"];

  return (
    <div className="min-h-screen bg-transparent pb-20 font-sans">
      
      {/* Header Section */}
      <div className="pt-24 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Titles */}
          <div className="animate-fade-in-up mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
              تصفح المشاريع
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
              اكتشف أحدث الابتكارات الأكاديمية من طلاب المملكة.
            </p>
          </div>

          <div className="animate-fade-in-up delay-100">
             <div className="bg-white dark:bg-slate-900 p-2 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800">

                <div className="relative w-full">
                   <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-primary-50 dark:bg-primary-900/20 p-2 rounded-xl text-primary-600">
                      <Search size={24} />
                   </div>
                   <input
                     type="text"
                     placeholder="ابحث بعنوان المشروع، الكلمات المفتاحية..."
                     className="w-full pr-20 pl-6 py-5 bg-transparent outline-none text-lg text-slate-900 dark:text-white font-bold rounded-t-[1.5rem] placeholder-slate-400"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4"></div>

                <div className="p-4 flex flex-col md:flex-row gap-4">
                   <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <select 
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-2xl pr-12 pl-4 py-4 outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none transition-all"
                            value={selectedMajor}
                            onChange={(e) => setSelectedMajor(e.target.value)}
                          >
                            <option value="الكل">جميع التخصصات</option>
                            {TECH_MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                       </div>
                       
                       <div className="relative">
                          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <select 
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-2xl pr-12 pl-4 py-4 outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none transition-all"
                            value={selectedUni}
                            onChange={(e) => setSelectedUni(e.target.value)}
                          >
                            <option value="الكل">جميع الجامعات</option>
                            {SAUDI_UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
                          </select>
                       </div>
                   </div>

                   <div className="flex gap-3">
                      <button 
                        onClick={handleReset}
                        className="px-6 py-4 rounded-2xl font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
                        title="إعادة تعيين"
                      >
                        <RotateCcw size={20} />
                      </button>
                      <button className="flex-1 md:flex-none bg-primary-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 hover:scale-105 active:scale-95">
                        بحث
                      </button>
                   </div>
                </div>
             </div>

             <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 ml-2">
                   <Tag size={16} className="text-primary-500" />
                   شائع:
                </span>
                {trendingTags.map((tag, i) => (
                   <button key={i} className="px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-bold hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all shadow-sm hover:shadow-md">
                      {tag}
                   </button>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 relative z-10">
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            النتائج
            <span className="text-sm font-bold text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full">
              {filteredProjects.length}
            </span>
          </h2>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 flex flex-col relative"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  <div className="mb-4 flex items-center gap-2 flex-wrap">
                     <span className="text-primary-700 dark:text-primary-300 text-xs font-extrabold uppercase tracking-wider bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg">
                       {project.major}
                     </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors leading-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${project.author.avatarColor} flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-slate-900 shadow-sm`}>
                           {project.author.initial}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
                              {project.author.name}
                           </span>
                           <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                              {project.university}
                           </span>
                        </div>
                     </div>

                     <Link to={`/projects/${project.slug}`} className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-5 py-2.5 rounded-xl hover:bg-primary-600 hover:text-white dark:hover:text-white transition-all">
                        عرض <Eye size={14} />
                     </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
           <div className="text-center py-32">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Search size={40} className="text-slate-300 dark:text-slate-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">لا توجد نتائج</h3>
              <p className="text-slate-500">لم نجد مشاريع تطابق بحثك الحالي.</p>
           </div>
        )}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default BrowseProjects;