import React, { useState } from 'react';
import { User } from '../App';
import { MOCK_PROJECTS } from '../type/constants';
import { MapPin, Calendar, Link as LinkIcon, Mail, Heart, Eye, Award, CheckCircle2, Github, Linkedin, Globe, Code2, Share2, MoreHorizontal, Edit3, MessageSquare, GitCommit, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import header from '../assets/header.jpg';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'activity'>('projects');
  const userProjects = MOCK_PROJECTS; // Show all mock projects for demo

  // Mock Github-style Contribution Data
  const contributionDays = Array.from({ length: 14 }, (_, i) => 
    Array.from({ length: 7 }, (_, j) => Math.random() > 0.7)
  );

  return (
    <div className="min-h-screen bg-transparent font-sans pb-20">
      
      {/* Main Container - Centered like X/Twitter */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-950 min-h-screen border-x border-slate-200 dark:border-slate-800 shadow-2xl relative z-10">
         
         {/* Cover Image */}
         <div className="h-48 md:h-64 w-full bg-slate-200 dark:bg-slate-900 relative overflow-hidden group">
            <img 
              src={header}
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
         </div>

         {/* Profile Header Info */}
         <div className="px-6 pb-4 relative">
            
            {/* Avatar & Actions Row */}
            <div className="flex justify-between items-end -mt-16 md:-mt-20 mb-4">
               <div className="relative">
                  {/* Check if avatar is an image URL or CSS class */}
                  {user.avatar.startsWith('http') || user.avatar.includes('/') ? (
                     <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-slate-950 shadow-lg overflow-hidden">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                     </div>
                  ) : (
                     <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${user.avatar} border-4 border-white dark:border-slate-950 flex items-center justify-center text-5xl font-bold text-white shadow-lg`}>
                        {user.initial}
                     </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white dark:border-slate-950" title="موثق">
                     <CheckCircle2 size={16} />
                  </div>
               </div>
               
               <div className="flex gap-3 mb-2">
                  <button className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                     <MoreHorizontal size={20} />
                  </button>
                  <Link to="/messages" className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                     <Mail size={20} />
                  </Link>
                  <Link to="/settings" className="px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-600 font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                     <Edit3 size={16} /> تعديل الملف
                  </Link>
               </div>
            </div>

            {/* User Details */}
            <div className="space-y-3">
               <div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                     {user.name}
                  </h1>
                  <p className="text-slate-500 font-medium dir-ltr text-right w-fit">@{user.username}</p>
               </div>

               {user.jobTitle && (
                  <div className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                     {user.jobTitle}
                  </div>
               )}

               {user.bio && (
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
                     {user.bio}
                  </p>
               )}

               {/* Metadata Row */}
               <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-slate-500 dark:text-slate-400 font-medium pt-2">
                  {user.location && <div className="flex items-center gap-1.5"><MapPin size={16} /> {user.location}</div>}
                  {user.university && <div className="flex items-center gap-1.5"><Award size={16} /> {user.university}</div>}
                  {user.socials?.website && <a href={user.socials.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary-600 hover:underline"><LinkIcon size={16} /> {user.socials.website.replace('https://', '')}</a>}
                  <div className="flex items-center gap-1.5"><Calendar size={16} /> انضم في {user.joinDate}</div>
               </div>

               {/* Stats Row */}
               <div className="flex gap-6 pt-3 pb-2">
                  <div className="flex gap-1 hover:underline cursor-pointer">
                     <span className="font-black text-slate-900 dark:text-white">999</span>
                     <span className="text-slate-500">متابع</span>
                  </div>
                  <div className="flex gap-1 hover:underline cursor-pointer">
                     <span className="font-black text-slate-900 dark:text-white">25K</span>
                     <span className="text-slate-500">يتابع</span>
                  </div>
                  <div className="flex gap-1 hover:underline cursor-pointer">
                     <span className="font-black text-slate-900 dark:text-white">{userProjects.length}</span>
                     <span className="text-slate-500">مشاريع</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Tabs Navigation (Sticky) */}
         <div className="sticky top-[80px] z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-b border-slate-200 dark:border-slate-800">
            <div className="flex">
               {[
                  { id: 'projects', label: 'المشاريع' },
                  { id: 'skills', label: 'المهارات والأوسمة' },
                  { id: 'activity', label: 'النشاطات' },
               ].map((tab) => (
                  <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id as any)}
                     className={`flex-1 py-4 text-sm font-bold relative hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors ${
                        activeTab === tab.id 
                        ? 'text-slate-900 dark:text-white' 
                        : 'text-slate-500'
                     }`}
                  >
                     {tab.label}
                     {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-full mx-auto w-16"></div>
                     )}
                  </button>
               ))}
            </div>
         </div>

         {/* Tab Content */}
         <div className="min-h-[300px]">
            
            {/* --- PROJECTS TAB --- */}
            {activeTab === 'projects' && (
               <div className="p-0">
                  {userProjects.map((project) => (
                     <div key={project.id} className="border-b border-slate-100 dark:border-slate-800 p-6 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group cursor-pointer">
                        
                        {/* Project Header */}
                        <div className="flex gap-3 mb-3">
                           {user.avatar.startsWith('http') || user.avatar.includes('/') ? (
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                 <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                              </div>
                           ) : (
                              <div className={`w-10 h-10 rounded-full ${user.avatar} flex items-center justify-center text-white font-bold text-sm`}>{user.initial}</div>
                           )}
                           <div>
                              <div className="flex items-center gap-2">
                                 <span className="font-bold text-slate-900 dark:text-white hover:underline">{user.name}</span>
                                 <span className="text-slate-500 text-sm">@{user.username}</span>
                                 <span className="text-slate-400 text-xs">• {project.year}</span>
                              </div>
                              <div className="text-sm text-slate-500 flex items-center gap-2">
                                 <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-xs">{project.major}</span>
                              </div>
                           </div>
                        </div>

                        {/* Project Body */}
                        <div className="pr-14">
                           <Link to={`/project/${project.id}`}>
                              <p className="text-slate-800 dark:text-slate-200 mb-4 font-medium leading-relaxed">
                                 {project.title} - {project.description}
                              </p>
                              
                              {/* Project Card/Image */}
                              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 mb-4 relative bg-slate-100 dark:bg-slate-900 aspect-video sm:aspect-[2/1]">
                                 <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                                 <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-lg text-white text-xs font-bold">
                                    {project.university}
                                 </div>
                              </div>
                           </Link>

                           {/* Interactions */}
                           <div className="flex items-center justify-between max-w-md text-slate-500 text-sm">
                              <button className="flex items-center gap-2 hover:text-blue-500 transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 px-2 py-1 rounded-full">
                                 <MessageSquare size={18} /> <span>{project.comments?.length || 0}</span>
                              </button>
                              <button className="flex items-center gap-2 hover:text-green-500 transition-colors group-hover:bg-green-50 dark:group-hover:bg-green-900/20 px-2 py-1 rounded-full">
                                 <Share2 size={18} />
                              </button>
                              <button className="flex items-center gap-2 hover:text-red-500 transition-colors group-hover:bg-red-50 dark:group-hover:bg-red-900/20 px-2 py-1 rounded-full">
                                 <Heart size={18} /> <span>{project.likes}</span>
                              </button>
                              <button className="flex items-center gap-2 hover:text-primary-600 transition-colors group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 px-2 py-1 rounded-full">
                                 <Eye size={18} /> <span>{project.views}</span>
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {/* --- SKILLS TAB --- */}
            {activeTab === 'skills' && (
               <div className="p-6 space-y-8 animate-fade-in">
                  
                  {/* Tech Stack Horizontal Scroll */}
                  <div>
                     <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Code2 className="text-primary-600" /> المهارات التقنية
                     </h3>
                     <div className="flex flex-wrap gap-3">
                        {user.skills && user.skills.length > 0 ? user.skills.map((skill, idx) => (
                           <div key={idx} className="px-5 py-3 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-2xl font-bold border border-slate-200 dark:border-slate-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all hover:shadow-md cursor-default">
                              {skill}
                           </div>
                        )) : (
                           <p className="text-slate-500">لا توجد مهارات مضافة.</p>
                        )}
                     </div>
                  </div>

                  {/* Badges Grid */}
                  <div>
                     <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Award className="text-yellow-500" /> الأوسمة والشهادات
                     </h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-all">
                           <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center text-yellow-600">
                              <Award size={24} />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900 dark:text-white">نجم الشهر</h4>
                              <p className="text-xs text-slate-500">حصل على أعلى تقييم في شهر نوفمبر</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-all">
                           <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                              <GitCommit size={24} />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900 dark:text-white">مساهم نشط</h4>
                              <p className="text-xs text-slate-500">+50 مشاركة في المشاريع المفتوحة</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Social Links Expanded */}
                  <div>
                     <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Globe className="text-blue-500" /> التواصل
                     </h3>
                     <div className="flex flex-wrap gap-4">
                        {user.socials?.twitter && (
                           <a href={`https://twitter.com/${user.socials.twitter}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                              <Twitter size={20} /> Twitter
                           </a>
                        )}
                        {user.socials?.github && (
                           <a href={`https://github.com/${user.socials.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors">
                              <Github size={20} /> GitHub
                           </a>
                        )}
                        {user.socials?.linkedin && (
                           <a href={`https://linkedin.com/in/${user.socials.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-colors">
                              <Linkedin size={20} /> LinkedIn
                           </a>
                        )}
                        {user.socials?.website && (
                           <a href={user.socials.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors">
                              <Globe size={20} /> Website
                           </a>
                        )}
                     </div>
                  </div>
               </div>
            )}

            {/* --- ACTIVITY TAB --- */}
            {activeTab === 'activity' && (
               <div className="p-6 animate-fade-in">
                  {/* Contribution Graph (Mock) */}
                  <div className="mb-8 overflow-x-auto">
                     <h3 className="font-bold text-slate-900 dark:text-white mb-4">سجل المساهمات</h3>
                     <div className="flex gap-1 min-w-max">
                        {contributionDays.map((week, i) => (
                           <div key={i} className="flex flex-col gap-1">
                              {week.map((active, j) => (
                                 <div 
                                    key={j} 
                                    className={`w-3 h-3 rounded-sm ${active ? 'bg-primary-500' : 'bg-slate-100 dark:bg-slate-800'}`}
                                    title={active ? 'مساهمة نشطة' : 'لا توجد مساهمات'}
                                 ></div>
                              ))}
                           </div>
                        ))}
                     </div>
                     <p className="text-xs text-slate-400 mt-2">نشط في آخر 14 أسبوع</p>
                  </div>

                  <div className="space-y-6 relative border-r-2 border-slate-100 dark:border-slate-800 pr-6 mr-2">
                     {[1, 2, 3].map((_, i) => (
                        <div key={i} className="relative">
                           <div className="absolute top-1 -right-[31px] w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-primary-500"></div>
                           <p className="text-sm text-slate-500 mb-1">منذ {i + 1} يوم</p>
                           <p className="text-slate-900 dark:text-white font-medium">
                              قام <span className="font-bold text-primary-600">@{user.username}</span> بتحديث مشروع <Link to="#" className="underline decoration-primary-300 underline-offset-4">نظام إدارة المكتبات</Link>
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            )}

         </div>
      </div>

    </div>
  );
};

export default Profile;