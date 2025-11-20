import React, { useState } from 'react';
import { User } from '../App';
import { Search, Eye, Heart, Clock, ExternalLink, Edit, Trash2, CheckCircle2, AlertTriangle, Filter, Grid3x3, List, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_PROJECTS } from '../type/constants';

interface MyProjectsProps {
  user: User;
}

const MyProjects: React.FC<MyProjectsProps> = ({ user }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, projectId: string | null }>({ isOpen: false, projectId: null });

  const handleDeleteClick = (projectId: string) => {
    setDeleteModal({ isOpen: true, projectId });
  };

  const filteredProjects = MOCK_PROJECTS.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent pb-20 relative font-sans">

      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setDeleteModal({ isOpen: false, projectId: null })}></div>
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-md p-8 relative z-10 border border-slate-200 dark:border-slate-800 animate-zoom-in">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-red-500/10"><AlertTriangle size={32} /></div>
            <h3 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-2">حذف المشروع؟</h3>
            <p className="text-slate-500 dark:text-slate-400 text-center mb-8 text-lg font-medium">هل أنت متأكد من رغبتك في حذف هذا المشروع؟ هذا الإجراء نهائي ولا يمكن التراجع عنه.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteModal({ isOpen: false, projectId: null })} className="flex-1 py-4 rounded-2xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">إلغاء</button>
              <button onClick={() => setDeleteModal({ isOpen: false, projectId: null })} className="flex-1 py-4 rounded-2xl font-bold text-white bg-red-500 shadow-xl shadow-red-500/30 hover:bg-red-600 transition-colors">نعم، حذف</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        <div className="mb-8 animate-fade-in-up">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 font-bold">
            <ArrowRight size={20} />
            العودة إلى لوحة التحكم
          </Link>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">مشاريعي</h1>
          <p className="text-slate-500 dark:text-slate-400">إدارة ومتابعة جميع مشاريعك ({MOCK_PROJECTS.length} مشروع)</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-200 dark:border-slate-800 shadow-lg mb-8 animate-fade-in-up delay-100">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 flex items-center gap-2 border border-slate-100 dark:border-slate-700">
              <Search size={20} className="text-slate-400" />
              <input
                type="text"
                placeholder="ابحث في مشاريعك..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm font-bold w-full dark:text-white"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-colors ${viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-colors ${viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-200">
            {filteredProjects.map((p) => (
              <div key={p.id} className="group bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 hover:from-white hover:to-slate-50 dark:hover:from-slate-800 dark:hover:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
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

                <div className="p-5">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 line-clamp-1">{p.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-2 mb-4">
                    {p.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1"><Eye size={14} /> {p.views}</span>
                    <span className="flex items-center gap-1"><Heart size={14} /> {p.likes}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {p.year}</span>
                  </div>

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
        ) : (
          <div className="space-y-4 animate-fade-in-up delay-200">
            {filteredProjects.map((p) => (
              <div key={p.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[2rem] p-6 transition-all duration-300 hover:shadow-xl flex flex-col md:flex-row gap-6 items-center">
                <div className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                    {p.badge?.text || 'مشروع'}
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">{p.title}</h4>
                    <span className="inline-flex w-fit items-center gap-1 px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold border border-green-200 dark:border-green-800">
                      <CheckCircle2 size={10} /> منشور
                    </span>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-2 mb-4">
                    {p.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1"><Eye size={14} /> {p.views}</span>
                    <span className="flex items-center gap-1"><Heart size={14} /> {p.likes}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {p.year}</span>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 w-full md:w-auto">
                  {p.demoUrl && (
                    <a href={p.demoUrl} target="_blank" rel="noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                      <ExternalLink size={14} /> زيارة
                    </a>
                  )}
                  <Link to={`/projects/${p.slug}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <Eye size={14} /> عرض
                  </Link>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 text-xs font-bold hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                    <Edit size={14} /> تعديل
                  </button>
                  <button onClick={() => handleDeleteClick(p.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    <Trash2 size={14} /> حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 dark:text-slate-400 text-lg">لا توجد مشاريع تطابق بحثك</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;
