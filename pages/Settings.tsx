import React, { useState, useEffect } from 'react';
import { User } from '../App';
import { User as UserIcon, Lock, Bell, Shield, Save, Camera, Phone, Twitter, Github, Linkedin, Globe, Plus, Trash2, Link as LinkIcon, AtSign, Briefcase, Code2, X, Eye, EyeOff, Check, Info } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

interface SettingsProps {
  user: User;
}

interface CustomLink {
  id: number;
  label: string;
  url: string;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [activeSection, setActiveSection] = useState<'account' | 'security' | 'notifications'>('account');
  
  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Password validation states
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  
  // Form States
  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    jobTitle: '',
    bio: '',
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');

  const [socials, setSocials] = useState({
    twitter: '',
    github: '',
    linkedin: '',
    website: ''
  });

  const [customLinks, setCustomLinks] = useState<CustomLink[]>([
    { id: 1, label: 'معرض الأعمال (Behance)', url: '' }
  ]);

  // Initialize state from user prop
  useEffect(() => {
    if (user) {
      const nameParts = user.name.split(' ');
      setBasicInfo({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        username: user.username || '',
        email: user.email || '',
        phone: '', // Assuming phone isn't in the base User type for now
        jobTitle: user.jobTitle || '',
        bio: user.bio || ''
      });
      setSkills(user.skills || []);
      setSocials({
        twitter: user.socials?.twitter || '',
        github: user.socials?.github || '',
        linkedin: user.socials?.linkedin || '',
        website: user.socials?.website || ''
      });
    }
  }, [user]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 9) setBasicInfo({ ...basicInfo, phone: value });
  };

  const handleBasicChange = (field: string, value: string) => {
    setBasicInfo({ ...basicInfo, [field]: value });
  };

  const handleSocialChange = (field: string, value: string) => {
    setSocials({ ...socials, [field]: value });
  };

  // Skills Handlers
  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(currentSkill.trim())) {
        setSkills([...skills, currentSkill.trim()]);
      }
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  // Custom Links Handlers
  const addCustomLink = () => {
    setCustomLinks([...customLinks, { id: Date.now(), label: '', url: '' }]);
  };

  const removeCustomLink = (id: number) => {
    setCustomLinks(customLinks.filter(l => l.id !== id));
  };

  const updateCustomLink = (id: number, field: 'label' | 'url', value: string) => {
    setCustomLinks(customLinks.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const tabs = [
    { id: 'account', label: 'الملف الشخصي', icon: <UserIcon size={18} /> },
    { id: 'security', label: 'الأمان', icon: <Lock size={18} /> },
    { id: 'notifications', label: 'التنبيهات', icon: <Bell size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-transparent pb-20 pt-12 relative font-sans">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">الإعدادات</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-3 space-y-2">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveSection(tab.id as any)} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeSection === tab.id ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg' : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 border border-slate-200 dark:border-slate-800'}`}>
                   {tab.icon} {tab.label}
                </button>
              ))}
           </div>

           <div className="lg:col-span-9">
              {/* Main Panel - Solid */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
                 
                 {/* --- Account Section --- */}
                 {activeSection === 'account' && (
                    <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                       
                       {/* Avatar */}
                       <div className="flex items-center gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
                           <div className="relative w-24 h-24">
                              {user.avatar.startsWith('http') || user.avatar.includes('/') ? (
                                 <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg">
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                 </div>
                              ) : (
                                 <div className={`w-full h-full rounded-3xl ${user.avatar} flex items-center justify-center text-4xl font-bold text-white shadow-lg`}>{user.initial}</div>
                              )}
                              <button type="button" className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md border border-slate-100 text-primary-600 hover:bg-primary-50 transition-colors"><Camera size={18} /></button>
                           </div>
                          <div>
                             <h3 className="text-lg font-bold text-slate-900 dark:text-white">صورة الملف الشخصي</h3>
                             <p className="text-slate-500 text-xs mb-3">يدعم PNG, JPG بحد أقصى 5MB</p>
                             <button type="button" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">تغيير الصورة</button>
                          </div>
                       </div>

                       {/* Basic Info */}
                       <div>
                          <h4 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                             <UserIcon className="text-primary-600" size={20} /> المعلومات الأساسية
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">الاسم الأول</label>
                                <input type="text" value={basicInfo.firstName} onChange={(e) => handleBasicChange('firstName', e.target.value)} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none font-bold dark:text-white transition-all" />
                             </div>
                             <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">الاسم الأخير</label>
                                <input type="text" value={basicInfo.lastName} onChange={(e) => handleBasicChange('lastName', e.target.value)} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none font-bold dark:text-white transition-all" />
                             </div>
                             <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">المسمى الوظيفي</label>
                                <div className="relative">
                                   <input type="text" value={basicInfo.jobTitle} onChange={(e) => handleBasicChange('jobTitle', e.target.value)} className="w-full p-3.5 pl-10 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none font-bold dark:text-white transition-all" placeholder="مثال: Full Stack Developer" />
                                   <Briefcase className="absolute left-3 top-3.5 text-slate-400" size={18}/>
                                </div>
                             </div>
                             <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">اسم المستخدم</label>
                                <div className="relative">
                                   <input type="text" value={basicInfo.username} onChange={(e) => handleBasicChange('username', e.target.value)} className="w-full p-3.5 pl-10 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none font-bold dark:text-white transition-all dir-ltr text-right" />
                                   <AtSign className="absolute left-3 top-3.5 text-slate-400" size={18}/>
                                </div>
                             </div>
                             <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">البريد الإلكتروني</label>
                                <input type="email" value={basicInfo.email} onChange={(e) => handleBasicChange('email', e.target.value)} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none font-bold dark:text-white transition-all" />
                             </div>
                             <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">رقم الهاتف</label>
                                <div className="relative">
                                   <input type="tel" value={basicInfo.phone} onChange={handlePhoneChange} className="w-full p-3.5 pl-10 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none font-bold dark:text-white transition-all" placeholder="5xxxxxxxx" />
                                   <Phone className="absolute left-3 top-3.5 text-slate-400" size={18}/>
                                </div>
                             </div>
                             <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">نبذة تعريفية (Bio)</label>
                                <textarea rows={3} value={basicInfo.bio} onChange={(e) => handleBasicChange('bio', e.target.value)} className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none font-bold dark:text-white resize-none transition-all"></textarea>
                             </div>
                          </div>
                       </div>
                       
                       {/* Technologies & Skills */}
                       <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                          <h4 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                             <Code2 className="text-primary-600" size={20} /> المهارات والتقنيات
                          </h4>
                          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                             <div className="flex flex-wrap gap-2 mb-3">
                                {skills.map((skill, idx) => (
                                   <span key={idx} className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-slate-900 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-bold shadow-sm border border-slate-100 dark:border-slate-700">
                                      {skill} <button onClick={() => removeSkill(skill)} className="hover:text-red-500 ml-1 transition-colors"><X size={14} /></button>
                                   </span>
                                ))}
                             </div>
                             <div className="relative">
                                <input 
                                   type="text" 
                                   value={currentSkill} 
                                   onChange={(e) => setCurrentSkill(e.target.value)} 
                                   onKeyDown={addSkill}
                                   className="w-full bg-transparent outline-none dark:text-white font-bold placeholder-slate-400" 
                                   placeholder="اكتب المهارة واضغط Enter (مثال: React, UI Design)..." 
                                />
                             </div>
                          </div>
                       </div>

                       {/* Social Links */}
                       <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                          <h4 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                             <Globe className="text-primary-600" size={20} /> الروابط الاجتماعية
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Twitter / X</label>
                                <div className="relative group">
                                   <input type="text" value={socials.twitter} onChange={(e) => handleSocialChange('twitter', e.target.value)} className="w-full p-3.5 pl-10 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none font-medium dark:text-white transition-all" placeholder="@username" />
                                   <Twitter className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-400 transition-colors" size={18}/>
                                </div>
                             </div>
                             <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">GitHub</label>
                                <div className="relative group">
                                   <input type="text" value={socials.github} onChange={(e) => handleSocialChange('github', e.target.value)} className="w-full p-3.5 pl-10 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none font-medium dark:text-white transition-all" placeholder="username" />
                                   <Github className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors" size={18}/>
                                </div>
                             </div>
                             <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">LinkedIn</label>
                                <div className="relative group">
                                   <input type="text" value={socials.linkedin} onChange={(e) => handleSocialChange('linkedin', e.target.value)} className="w-full p-3.5 pl-10 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none font-medium dark:text-white transition-all" placeholder="in/username" />
                                   <Linkedin className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-700 transition-colors" size={18}/>
                                </div>
                             </div>
                             <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">الموقع الشخصي</label>
                                <div className="relative group">
                                   <input type="text" value={socials.website} onChange={(e) => handleSocialChange('website', e.target.value)} className="w-full p-3.5 pl-10 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none font-medium dark:text-white transition-all" placeholder="https://www.example.com" />
                                   <Globe className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18}/>
                                </div>
                             </div>
                          </div>
                       </div>

                       {/* Custom Links */}
                       <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                          <h4 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                             <LinkIcon className="text-primary-600" size={20} /> روابط إضافية
                          </h4>
                          <div className="space-y-4">
                             {customLinks.map((link, index) => (
                                <div key={link.id} className="flex flex-col md:flex-row gap-4 items-start animate-fade-in">
                                   <div className="flex-1 w-full">
                                      <input 
                                        type="text" 
                                        value={link.label} 
                                        onChange={(e) => updateCustomLink(link.id, 'label', e.target.value)} 
                                        placeholder="عنوان الرابط (مثلاً: معرض الأعمال)" 
                                        className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none font-medium dark:text-white" 
                                      />
                                   </div>
                                   <div className="flex-[2] w-full">
                                      <input 
                                        type="text" 
                                        value={link.url} 
                                        onChange={(e) => updateCustomLink(link.id, 'url', e.target.value)} 
                                        placeholder="الرابط URL" 
                                        className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none font-medium dark:text-white text-left dir-ltr" 
                                      />
                                   </div>
                                   <button 
                                     type="button" 
                                     onClick={() => removeCustomLink(link.id)}
                                     className="p-3.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                   >
                                      <Trash2 size={20} />
                                   </button>
                                </div>
                             ))}
                             <button 
                               type="button" 
                               onClick={addCustomLink}
                               className="flex items-center gap-2 text-sm font-bold text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-2 rounded-xl transition-colors"
                             >
                                <Plus size={16} /> إضافة رابط جديد
                             </button>
                          </div>
                       </div>
                    </form>
                 )}
                 
                 {/* --- Security Section --- */}
                 {activeSection === 'security' && (
                     <div className="space-y-6 animate-fade-in">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                           <div className="flex gap-4 items-center"><div className="p-2 bg-green-100 text-green-600 rounded-lg"><Shield size={24}/></div><div><p className="font-bold text-slate-900 dark:text-white">التحقق بخطوتين</p><p className="text-xs text-slate-500">حماية إضافية لحسابك عبر رسالة نصية</p></div></div>
                           <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                               <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                               <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                           </div>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">كلمة المرور الحالية</label>
                           <div className="relative">
                              <input 
                                type={showCurrentPassword ? "text" : "password"} 
                                className="w-full p-3.5 pr-12 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none dark:text-white transition-all font-medium" 
                                placeholder="••••••" 
                              />
                              <button 
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute left-4 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                              >
                                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                           </div>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">كلمة المرور الجديدة</label>
                           <div className="relative">
                              <input 
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                className="w-full p-3.5 pr-12 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none dark:text-white transition-all font-medium" 
                                placeholder="••••••" 
                              />
                              <button 
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute left-4 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                              >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>

                              {/* Password Requirements Popup */}
                              {isPasswordFocused && (
                                <div className="absolute z-20 bottom-full left-0 w-full mb-2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 animate-fade-in-up">
                                   <div className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1">
                                     <Info size={12} />
                                     كلمة مرور قوية:
                                   </div>
                                   <div className="space-y-2">
                                      {[
                                        { regex: /.{8,}/, text: "8 أحرف على الأقل" },
                                        { regex: /[0-9]/, text: "رقم واحد على الأقل" },
                                        { regex: /[a-z]/, text: "حرف صغير واحد" },
                                        { regex: /[A-Z]/, text: "حرف كبير واحد" },
                                        { regex: /[^A-Za-z0-9]/, text: "رمز خاص (!@#$%^&*)" }
                                      ].map((req, idx) => (
                                        <div key={idx} className={`flex items-center gap-2 text-xs font-medium transition-colors ${req.regex.test(newPassword) ? 'text-green-500' : 'text-slate-400'}`}>
                                           {req.regex.test(newPassword) ? <Check size={12} /> : <div className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600"></div>}
                                           <span>{req.text}</span>
                                        </div>
                                      ))}
                                   </div>
                                </div>
                              )}
                           </div>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">تأكيد كلمة المرور الجديدة</label>
                           <div className="relative">
                              <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                className="w-full p-3.5 pr-12 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:border-primary-500 outline-none dark:text-white transition-all font-medium" 
                                placeholder="••••••" 
                              />
                              <button 
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute left-4 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                              >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                           </div>
                        </div>
                        <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:shadow-lg transition-all">تحديث كلمة المرور</button>
                     </div>
                 )}

                 {/* Save Button Area */}
                 <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
                    <button className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">إلغاء</button>
                    <button className="px-8 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-600/30 hover:scale-105 transition-all flex items-center gap-2"><Save size={18} /> حفظ التغييرات</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Settings;