
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROJECTS } from '../type/constants';
import { Project } from '../type/types';
import { 
  ArrowRight, Heart, Eye, Share2, Calendar, Building2, Download, 
  MessageCircle, Send, Code2, Users, FileText, Github, Globe, 
  Youtube, MonitorPlay, FileCode, Paperclip, ChevronRight, ExternalLink
} from 'lucide-react';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const found = MOCK_PROJECTS.find(p => p.id === id);
    if (found) {
      setProject(found);
      setActiveImage(found.thumbnail || '');
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return null;

  const technologies = project.tags ? project.tags : ['React', 'Tailwind', 'Node.js'];

  // Mocking Files for Display Purpose (since the interface is simple strings)
  const mockFiles = [
    { name: 'التقرير_النهائي_للمشروع.pdf', size: '4.2 MB', type: 'pdf' },
    { name: 'عرض_تقديمي.pptx', size: '12.5 MB', type: 'pptx' },
    { name: 'مخططات_النظام.png', size: '2.1 MB', type: 'image' }
  ];

  return (
    <div className="min-h-screen bg-transparent pb-20 overflow-x-hidden font-sans">
      
      {/* Header / Breadcrumbs - Solid */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-24 pb-8">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-6">
               <Link to="/" className="hover:text-primary-600 transition-colors">الرئيسية</Link>
               <ChevronRight size={14} />
               <Link to="/browse" className="hover:text-primary-600 transition-colors">المشاريع</Link>
               <ChevronRight size={14} />
               <span className="text-slate-900 dark:text-white">{project.title}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
               <div className="animate-fade-in-up">
                  <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                    {project.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                       <Building2 size={16} className="text-slate-400" /> {project.university}
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                       <Code2 size={16} className="text-slate-400" /> {project.major}
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                       <Calendar size={16} className="text-slate-400" /> {project.year}
                    </div>
                  </div>
               </div>

               {/* Header Actions */}
               <div className="flex gap-3 animate-fade-in-up delay-100">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold border transition-all ${isLiked ? 'bg-red-50 border-red-100 text-red-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}
                  >
                     <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                     <span className="hidden sm:inline">{project.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-primary-600 text-white hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20">
                     <Share2 size={20} /> <span className="hidden sm:inline">مشاركة</span>
                  </button>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Column (Right) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Gallery Section */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-2 shadow-xl border border-slate-200 dark:border-slate-800 animate-fade-in-up delay-200">
              <div className="rounded-[1.5rem] overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800 relative group">
                <img src={activeImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Project View" />
              </div>
              {(project.images && project.images.length > 0) && (
                 <div className="flex gap-3 overflow-x-auto p-4 pb-2 no-scrollbar">
                    <button onClick={() => setActiveImage(project.thumbnail || '')} className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === project.thumbnail ? 'border-primary-600 ring-2 ring-primary-100' : 'border-slate-100 dark:border-slate-800 opacity-70 hover:opacity-100'}`}>
                       <img src={project.thumbnail} className="w-full h-full object-cover" alt="" />
                    </button>
                    {project.images.map((img, idx) => (
                       <button key={idx} onClick={() => setActiveImage(img)} className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary-600 ring-2 ring-primary-100' : 'border-slate-100 dark:border-slate-800 opacity-70 hover:opacity-100'}`}>
                          <img src={img} className="w-full h-full object-cover" alt="" />
                       </button>
                    ))}
                 </div>
              )}
            </div>

            {/* --- NEW SECTION: Project Artifacts (Links & Files) --- */}
            <div className="animate-fade-in-up delay-300 space-y-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                   <Paperclip className="text-primary-600" /> المرفقات والمصادر
                </h3>
                
                {/* External Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                   {project.sourceUrl && (
                      <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-6 bg-slate-900 text-white rounded-2xl hover:scale-[1.02] transition-transform shadow-lg">
                         <Github size={32} className="mb-3" />
                         <span className="font-bold text-sm">Source Code</span>
                         <span className="text-xs text-slate-400 mt-1">GitHub Repo</span>
                      </a>
                   )}
                   {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-6 bg-primary-600 text-white rounded-2xl hover:scale-[1.02] transition-transform shadow-lg shadow-primary-600/20">
                         <MonitorPlay size={32} className="mb-3" />
                         <span className="font-bold text-sm">Open Live</span>
                         <span className="text-xs text-primary-100 mt-1">عرض مباشر</span>
                      </a>
                   )}
                   {/* YouTube video link - placeholder for future implementation */}
                   {/* <a href="#" className="flex flex-col items-center justify-center p-6 bg-red-600 text-white rounded-2xl hover:scale-[1.02] transition-transform shadow-lg shadow-red-600/20">
                      <Youtube size={32} className="mb-3" />
                      <span className="font-bold text-sm">Explainer Video</span>
                      <span className="text-xs text-red-100 mt-1">شرح المشروع</span>
                   </a> */}
                </div>

                {/* Attached Files List */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-lg">
                   <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <FileCode size={18} className="text-slate-400" /> الملفات المرفقة ({mockFiles.length})
                   </h4>
                   <div className="space-y-3">
                      {mockFiles.map((file, idx) => (
                         <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                            <div className="flex items-center gap-4">
                               <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${file.type === 'pdf' ? 'bg-red-100 text-red-600' : file.type === 'pptx' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                  <FileText size={24} />
                               </div>
                               <div>
                                  <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{file.name}</p>
                                  <p className="text-xs text-slate-500 font-medium">{file.size}</p>
                               </div>
                            </div>
                            <button className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:border-primary-500 transition-all group-hover:shadow-md">
                               <Download size={20} />
                            </button>
                         </div>
                      ))}
                   </div>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-200 dark:border-slate-800 animate-fade-in-up delay-400">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">تفاصيل المشروع</h3>
              <div className="prose dark:prose-invert max-w-none">
                 <p className="text-slate-600 dark:text-slate-300 text-lg leading-loose font-medium">
                    {project.longDescription || project.description}
                 </p>
                 <p className="text-slate-600 dark:text-slate-300 text-lg leading-loose font-medium mt-4">
                    تم تطوير هذا النظام ليعالج المشاكل الحالية في السوق، حيث يعتمد على أحدث التقنيات لضمان الأداء العالي وتجربة المستخدم السلسة. يهدف المشروع بشكل أساسي إلى خدمة القطاع التعليمي والصحي في المملكة.
                 </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-8 mt-8">
                 <h4 className="text-sm font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Code2 size={18} className="text-primary-600" /> التقنيات المستخدمة
                 </h4>
                 <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, i) => (
                       <span key={i} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm border border-slate-200 dark:border-slate-700 hover:border-primary-500 hover:text-primary-600 transition-colors cursor-default">
                          {tech}
                       </span>
                    ))}
                 </div>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-xl border border-slate-200 dark:border-slate-800 animate-fade-in-up delay-500">
               <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                  <MessageCircle className="text-primary-600" /> النقاش والملاحظات ({project.comments?.length || 0})
               </h3>
               
               <div className="space-y-6 mb-8">
                  {project.comments?.map((c) => (
                     <div key={c.id} className="flex gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${c.avatarColor} flex items-center justify-center text-white font-bold shadow-sm shrink-0`}>{c.user.charAt(0)}</div>
                        <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-2xl rounded-tr-none p-5">
                           <div className="flex justify-between items-center mb-2">
                              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{c.user}</h4>
                              <span className="text-xs text-slate-400 font-medium">{c.date}</span>
                           </div>
                           <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{c.content}</p>
                        </div>
                     </div>
                  ))}
               </div>
               
               <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                  <div className="flex-1 relative">
                     <textarea 
                        rows={3} 
                        placeholder="أضف تعليقاً أو استفساراً..." 
                        className="w-full pl-4 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none border border-slate-200 dark:border-slate-700 focus:border-primary-500 dark:text-white font-medium resize-none transition-all" 
                     />
                     <div className="absolute left-3 bottom-3 flex items-center gap-2">
                        <button className="bg-primary-600 text-white p-2 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20">
                           <Send size={18} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar Column (Left) */}
          <div className="lg:col-span-4 space-y-6 animate-fade-in-up delay-200">
            
            {/* Author Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xl border border-slate-200 dark:border-slate-800 text-center">
               <Link to="/profile" className="block group">
                 <div className={`w-24 h-24 mx-auto rounded-[2rem] ${project.author.avatarColor} flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4 group-hover:scale-105 transition-transform`}>
                    {project.author.initial}
                 </div>
                 <h3 className="font-black text-slate-900 dark:text-white text-xl mb-1 group-hover:text-primary-600 transition-colors">{project.author.name}</h3>
               </Link>
               <p className="text-slate-500 text-sm font-bold mb-6">{project.author.role || 'طالب علوم حاسب'}</p>
               
               <Link to="/profile" className="block w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity mb-4">
                 زيارة الملف الشخصي
               </Link>
               <Link to="/messages" className="block w-full py-3.5 rounded-xl border-2 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:border-primary-500 hover:text-primary-600 transition-all">
                 مراسلة الطالب
               </Link>
            </div>

            {/* Team Members */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xl border border-slate-200 dark:border-slate-800">
               <h4 className="font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users size={18} className="text-primary-600" /> فريق العمل
               </h4>
               <div className="space-y-3">
                  {project.teamMembers?.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                       <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-600">{m.charAt(0)}</div>
                       <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{m}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl text-center">
                    <div className="text-slate-500 font-bold text-xs mb-2 flex items-center justify-center gap-1"><Eye size={16} /> المشاهدات</div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{project.views}</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl text-center">
                    <div className="text-red-500 font-bold text-xs mb-2 flex items-center justify-center gap-1"><Heart size={16} className={isLiked ? "fill-current" : ""} /> الإعجابات</div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{project.likes + (isLiked ? 1 : 0)}</span>
                </div>
            </div>

            {/* License / Info */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] p-6 text-center border border-slate-100 dark:border-slate-800">
               <p className="text-xs text-slate-500 leading-relaxed">
                  جميع الحقوق محفوظة للطالب والجامعة. يمنع نسخ أو استخدام هذا المشروع لأغراض تجارية دون إذن خطي.
               </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
