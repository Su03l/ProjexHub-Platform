

import React, { useState } from 'react';
import { UploadCloud, Plus, X, ChevronLeft, Check, FileText, Layers, Image as ImageIcon, CheckCircle2, Tag, Cpu, Link as LinkIcon, Github, Globe, Youtube, Trash2, File } from 'lucide-react';
import { SAUDI_UNIVERSITIES, TECH_MAJORS, GRADUATION_YEARS } from '../type/constants';
import { useToast } from '../components/ToastContainer';

const UploadProject: React.FC = () => {
  const [step, setStep] = useState(1);
  const toast = useToast();
  
  // Form States
  const [basicInfo, setBasicInfo] = useState({
    title: '', university: '', major: '', year: '', degree: '', students: ['']
  });
  
  const [details, setDetails] = useState({
    description: '', longDescription: '', 
    tags: [] as string[], currentTag: '',
    technologies: [] as string[], currentTech: ''
  });

  const [media, setMedia] = useState({
    images: [] as string[], // Simulating file names
    files: [] as string[]
  });

  const [links, setLinks] = useState({
    github: '',
    demo: '',
    video: ''
  });
  
  // Basic Info Handlers
  const updateBasic = (field: string, value: any) => setBasicInfo({ ...basicInfo, [field]: value });
  const addStudent = () => updateBasic('students', [...basicInfo.students, '']);
  const removeStudent = (index: number) => {
    if (basicInfo.students.length > 1) {
      const newStudents = [...basicInfo.students];
      newStudents.splice(index, 1);
      updateBasic('students', newStudents);
    }
  };
  const updateStudent = (index: number, value: string) => {
    const newStudents = [...basicInfo.students];
    newStudents[index] = value;
    updateBasic('students', newStudents);
  };

  // Tag & Tech Handlers
  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && details.currentTag.trim() && !details.tags.includes(details.currentTag.trim())) {
      e.preventDefault();
      setDetails({ ...details, tags: [...details.tags, details.currentTag.trim()], currentTag: '' });
    }
  };
  const removeTag = (tagToRemove: string) => setDetails({ ...details, tags: details.tags.filter(t => t !== tagToRemove) });

  const addTech = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && details.currentTech.trim() && !details.technologies.includes(details.currentTech.trim())) {
      e.preventDefault();
      setDetails({ ...details, technologies: [...details.technologies, details.currentTech.trim()], currentTech: '' });
    }
  };
  const removeTech = (techToRemove: string) => setDetails({ ...details, technologies: details.technologies.filter(t => t !== techToRemove) });

  // Media Handlers (Simulation)
  const simulateUploadImage = () => {
    const newImage = `screenshot_${media.images.length + 1}.png`;
    setMedia({ ...media, images: [...media.images, newImage] });
  };
  const removeImage = (index: number) => {
    const newImages = [...media.images];
    newImages.splice(index, 1);
    setMedia({ ...media, images: newImages });
  };

  const simulateUploadFile = () => {
    const newFile = `project_report_${media.files.length + 1}.pdf`;
    setMedia({ ...media, files: [...media.files, newFile] });
  };
  const removeFile = (index: number) => {
    const newFiles = [...media.files];
    newFiles.splice(index, 1);
    setMedia({ ...media, files: newFiles });
  };

  const handlePublish = () => {
    toast.success('تم نشر المشروع بنجاح! سيتم مراجعته قريباً');
    // Here you would typically send data to backend
    setTimeout(() => {
      setStep(1);
      // Reset form or redirect
    }, 2000);
  };


  const steps = [
    { number: 1, title: 'أساسية', icon: <FileText size={18} /> },
    { number: 2, title: 'التفاصيل', icon: <Layers size={18} /> },
    { number: 3, title: 'الوسائط', icon: <ImageIcon size={18} /> },
    { number: 4, title: 'الروابط', icon: <LinkIcon size={18} /> }, // New Step
    { number: 5, title: 'النشر', icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-transparent py-12 relative overflow-hidden font-sans">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-2xl mb-4 shadow-sm">
             <UploadCloud size={32} className="text-primary-600" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">رفع مشروع جديد</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">شارك إبداعك الأكاديمي مع العالم</p>
        </div>

        {/* Stepper */}
        <div className="mb-12 relative animate-fade-in-up delay-100 px-4">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 rounded-full z-0"></div>
          <div 
            className="absolute top-1/2 right-0 h-1 bg-primary-600 -translate-y-1/2 rounded-full z-0 transition-all duration-700 ease-out"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          <div className="relative z-10 flex justify-between">
            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center gap-3 group cursor-default">
                <div 
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 transform ${
                    step >= s.number 
                      ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/30 scale-110' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                  }`}
                >
                  {step > s.number ? <Check size={20} /> : s.icon}
                </div>
                <span className={`text-xs font-bold transition-colors duration-300 ${
                  step >= s.number ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                }`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Panel - Solid Opaque Background */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in-up delay-200 relative">
          <div className="p-8 md:p-12">
            
            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">المعلومات الأساسية</h3>
                </div>
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">عنوان المشروع <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={basicInfo.title}
                      onChange={(e) => updateBasic('title', e.target.value)}
                      className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all font-bold dark:text-white"
                      placeholder="مثال: نظام ذكي..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">الجامعة</label>
                      <select value={basicInfo.university} onChange={(e) => updateBasic('university', e.target.value)} className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all font-bold dark:text-white cursor-pointer appearance-none">
                        <option value="" disabled>اختر الجامعة</option>
                        {SAUDI_UNIVERSITIES.map((uni, idx) => <option key={idx} value={uni}>{uni}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">التخصص</label>
                      <select value={basicInfo.major} onChange={(e) => updateBasic('major', e.target.value)} className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all font-bold dark:text-white cursor-pointer appearance-none">
                        <option value="" disabled>اختر التخصص</option>
                        {TECH_MAJORS.map((m, idx) => <option key={idx} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">سنة التخرج</label>
                      <select value={basicInfo.year} onChange={(e) => updateBasic('year', e.target.value)} className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all font-bold dark:text-white cursor-pointer appearance-none">
                        <option value="" disabled>اختر السنة</option>
                        {GRADUATION_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">الدرجة العلمية</label>
                      <select value={basicInfo.degree} onChange={(e) => updateBasic('degree', e.target.value)} className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all font-bold dark:text-white cursor-pointer appearance-none">
                        <option value="" disabled>اختر الدرجة</option>
                        <option>بكالوريوس</option>
                        <option>ماجستير</option>
                        <option>دكتوراه</option>
                      </select>
                    </div>
                  </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">أعضاء الفريق</label>
                     <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        {basicInfo.students.map((student, index) => (
                          <div key={index} className="flex gap-2 animate-fade-in">
                            <input type="text" value={student} onChange={(e) => updateStudent(index, e.target.value)} className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:border-primary-500 outline-none" placeholder={`اسم الطالب ${index + 1}`} />
                            {basicInfo.students.length > 1 && <button type="button" onClick={() => removeStudent(index)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"><X size={20} /></button>}
                          </div>
                        ))}
                        <button type="button" onClick={addStudent} className="flex items-center gap-2 text-sm text-primary-600 font-bold hover:bg-primary-50 px-4 py-2 rounded-xl transition-colors w-full justify-center border border-dashed border-primary-200 dark:border-primary-800"><Plus size={18} /> إضافة طالب آخر</button>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Details */}
            {step === 2 && (
               <div className="space-y-8 animate-fade-in">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">تفاصيل المشروع</h3>
                  </div>
                  <div className="space-y-6">
                     <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">ملخص المشروع</label>
                        <textarea rows={3} value={details.description} onChange={(e) => setDetails({ ...details, description: e.target.value })} className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none resize-none transition-all font-medium dark:text-white" placeholder="وصف مختصر..." />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">الوصف التفصيلي</label>
                        <textarea rows={6} value={details.longDescription} onChange={(e) => setDetails({ ...details, longDescription: e.target.value })} className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none resize-none transition-all font-medium dark:text-white" placeholder="اشرح المشكلة والحل..." />
                     </div>
                     
                     {/* Technologies Input */}
                     <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">التقنيات المستخدمة</label>
                        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-primary-500 transition-all">
                           <div className="flex flex-wrap gap-2 mb-2">
                              {details.technologies.map((tech, idx) => (
                                 <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-bold animate-zoom-in">
                                    <Cpu size={12} /> {tech} <button onClick={() => removeTech(tech)} className="hover:text-red-500 ml-1"><X size={14} /></button>
                                 </span>
                              ))}
                           </div>
                           <input type="text" value={details.currentTech} onChange={(e) => setDetails({ ...details, currentTech: e.target.value })} onKeyDown={addTech} className="w-full bg-transparent outline-none dark:text-white placeholder-slate-400 font-medium" placeholder="اكتب التقنية (مثل: React, Python) واضغط Enter..." />
                           <p className="text-xs text-slate-400 mt-2">اضغط Enter لإضافة التقنية</p>
                        </div>
                     </div>

                     {/* Tags Input */}
                     <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">الكلمات المفتاحية</label>
                        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-primary-500 transition-all">
                           <div className="flex flex-wrap gap-2 mb-2">
                              {details.tags.map((tag, idx) => (
                                 <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-bold animate-zoom-in">
                                    <Tag size={12} /> {tag} <button onClick={() => removeTag(tag)} className="hover:text-red-500 ml-1"><X size={14} /></button>
                                 </span>
                              ))}
                           </div>
                           <input type="text" value={details.currentTag} onChange={(e) => setDetails({ ...details, currentTag: e.target.value })} onKeyDown={addTag} className="w-full bg-transparent outline-none dark:text-white placeholder-slate-400 font-medium" placeholder="اكتب الكلمة واضغط Enter..." />
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* STEP 3: Media */}
            {step === 3 && (
               <div className="space-y-8 animate-fade-in">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">الملفات والوسائط</h3>
                    <p className="text-slate-500 text-sm mt-1">يمكنك إضافة صور متعددة وملفات المشروع</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                     {/* Images Upload */}
                     <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">صور المشروع</label>
                        
                        {/* Upload Box */}
                        <div onClick={simulateUploadImage} className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group bg-slate-50 dark:bg-slate-900/50">
                           <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 group-hover:text-primary-500 group-hover:scale-110 transition-all shadow-sm">
                              <ImageIcon size={32} />
                           </div>
                           <p className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-1">اضغط لإضافة صور</p>
                           <p className="text-xs text-slate-500">PNG, JPG (Max 5MB)</p>
                        </div>

                        {/* Files List */}
                        {media.images.length > 0 && (
                           <div className="space-y-2 mt-4">
                              <p className="text-xs font-bold text-slate-400">الصور المضافة ({media.images.length})</p>
                              {media.images.map((img, idx) => (
                                 <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 animate-fade-in">
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                                          <ImageIcon size={18} />
                                       </div>
                                       <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{img}</span>
                                    </div>
                                    <button onClick={() => removeImage(idx)} className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                       <Trash2 size={18} />
                                    </button>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>

                     {/* Files Upload */}
                     <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                           ملفات المشروع <span className="text-slate-400 text-xs font-normal">(اختياري)</span>
                        </label>
                        
                        {/* Upload Box */}
                        <div onClick={simulateUploadFile} className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group bg-slate-50 dark:bg-slate-900/50">
                           <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 group-hover:text-primary-500 group-hover:scale-110 transition-all shadow-sm">
                              <UploadCloud size={32} />
                           </div>
                           <p className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-1">اضغط لإضافة ملفات</p>
                           <p className="text-xs text-slate-500">PDF, ZIP (Max 50MB)</p>
                        </div>

                         {/* Files List */}
                         {media.files.length > 0 && (
                           <div className="space-y-2 mt-4">
                              <p className="text-xs font-bold text-slate-400">الملفات المضافة ({media.files.length})</p>
                              {media.files.map((file, idx) => (
                                 <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 animate-fade-in">
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                                          <File size={18} />
                                       </div>
                                       <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{file}</span>
                                    </div>
                                    <button onClick={() => removeFile(idx)} className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                       <Trash2 size={18} />
                                    </button>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            )}

            {/* STEP 4: Links (NEW) */}
            {step === 4 && (
               <div className="space-y-8 animate-fade-in">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">روابط المشروع</h3>
                    <p className="text-slate-500 text-sm mt-1">أضف روابط خارجية للكود المصدري أو العرض المباشر</p>
                  </div>
                  <div className="grid gap-6">
                     <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">GitHub Repository</label>
                        <div className="relative group">
                           <input 
                              type="text" 
                              value={links.github} 
                              onChange={(e) => setLinks({ ...links, github: e.target.value })}
                              className="w-full pl-10 pr-12 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all font-medium dark:text-white ltr placeholder:text-slate-400"
                              placeholder="https://github.com/username/repo"
                           />
                           <Github className="absolute right-4 top-4 text-slate-400 group-focus-within:text-slate-800 dark:group-focus-within:text-white transition-colors" size={20} />
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">رابط العرض المباشر (Live Demo)</label>
                        <div className="relative group">
                           <input 
                              type="text" 
                              value={links.demo} 
                              onChange={(e) => setLinks({ ...links, demo: e.target.value })}
                              className="w-full pl-10 pr-12 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all font-medium dark:text-white ltr placeholder:text-slate-400"
                              placeholder="https://my-project.com"
                           />
                           <Globe className="absolute right-4 top-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                           رابط فيديو توضيحي (Youtube) <span className="text-slate-400 text-xs font-normal">(اختياري)</span>
                        </label>
                        <div className="relative group">
                           <input 
                              type="text" 
                              value={links.video} 
                              onChange={(e) => setLinks({ ...links, video: e.target.value })}
                              className="w-full pl-10 pr-12 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all font-medium dark:text-white ltr placeholder:text-slate-400"
                              placeholder="https://youtube.com/watch?v=..."
                           />
                           <Youtube className="absolute right-4 top-4 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* STEP 5: Review */}
            {step === 5 && (
               <div className="space-y-8 animate-fade-in">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">المراجعة والنشر</h3>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
                     <div className="flex justify-between items-start mb-6">
                        <h4 className="text-xl font-black text-slate-900 dark:text-white">{basicInfo.title || 'عنوان المشروع'}</h4>
                        <span className="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs px-3 py-1 rounded-full font-bold">
                           {basicInfo.major || 'التخصص'}
                        </span>
                     </div>
                     <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 font-medium">
                        <p>الجامعة: <span className="text-slate-900 dark:text-white font-bold">{basicInfo.university}</span></p>
                        <p>السنة: <span className="text-slate-900 dark:text-white font-bold">{basicInfo.year}</span></p>
                        
                        {/* Tech */}
                        {details.technologies.length > 0 && (
                           <div className="flex flex-wrap gap-2 mt-4">
                              {details.technologies.map(t => (
                                 <span key={t} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-2 py-1 rounded-md border border-blue-100 dark:border-blue-900/30">{t}</span>
                              ))}
                           </div>
                        )}

                        {/* Media Summary */}
                        <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
                            <div className="flex items-center gap-2 text-xs bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                                <ImageIcon size={14} className="text-slate-400" /> {media.images.length} صور
                            </div>
                            <div className="flex items-center gap-2 text-xs bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                                <File size={14} className="text-slate-400" /> {media.files.length} ملفات
                            </div>
                        </div>

                        {/* Links Summary */}
                        {(links.github || links.demo || links.video) && (
                            <div className="flex flex-wrap gap-3 pt-2">
                                {links.github && <span className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300"><Github size={12} /> GitHub</span>}
                                {links.demo && <span className="flex items-center gap-1 text-xs font-bold text-primary-600"><Globe size={12} /> Demo</span>}
                                {links.video && <span className="flex items-center gap-1 text-xs font-bold text-red-500"><Youtube size={12} /> Video</span>}
                            </div>
                        )}

                     </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
                     <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-300 text-primary-600 focus:ring-primary-500" />
                     <span>أقر بأن هذا العمل أصلي وأملك حقوق نشره</span>
                  </div>
               </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="px-8 md:px-12 py-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
             {step > 1 ? (
               <button onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition-all">السابق</button>
             ) : <div></div>}
             <button onClick={() => step < 5 ? setStep(step + 1) : handlePublish()} className="px-8 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold shadow-lg shadow-primary-600/20 flex items-center gap-2 transition-all hover:scale-105">
               {step === 5 ? 'نشر المشروع' : 'التالي'} {step < 5 && <ChevronLeft size={18} />}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProject;
