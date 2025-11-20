import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, GraduationCap, Code, Activity, Building2, Eye, EyeOff, Phone, Twitter, Check, Info, Sparkles, Briefcase, ChevronDown } from 'lucide-react';
import { SAUDI_UNIVERSITIES, TECH_MAJORS, GRADUATION_YEARS } from '../type/constants';

interface AuthProps {
  onLogin: (destination: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');

  useEffect(() => {
    if (searchParams.get('mode') === 'signup') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
        onLogin(isLogin ? '/dashboard' : '/settings');
    }, 500);
  };

  const handleSocialLogin = () => {
     onLogin(isLogin ? '/dashboard' : '/settings');
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 9) setPhoneNumber(value);
  };

  const requirements = [
    { regex: /.{8,}/, text: "8 أحرف على الأقل" },
    { regex: /[0-9]/, text: "رقم واحد على الأقل" },
    { regex: /[a-z]/, text: "حرف صغير واحد" },
    { regex: /[A-Z]/, text: "حرف كبير واحد" },
    { regex: /[^A-Za-z0-9]/, text: "رمز خاص (!@#$%^&*)" }
  ];

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 overflow-hidden relative font-sans">
      
      <div className="bg-white dark:bg-slate-900 w-full max-w-6xl rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col lg:flex-row relative z-10 min-h-[700px] animate-fade-in-up">

        <div className="w-full lg:w-5/12 p-12 bg-slate-50 dark:bg-slate-900 relative overflow-hidden flex flex-col justify-between border-l border-slate-100 dark:border-slate-800 order-1 lg:order-none">
           <div className="absolute top-20 right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
           <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>

           <div className="relative z-10">
             <Link to="/" className="flex items-center gap-2 mb-12 group">
                <div className="bg-primary-600 text-white font-bold text-lg p-2 rounded-xl shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform">PH</div>
                <span className="font-bold text-2xl text-slate-900 dark:text-white">ProjexHub</span>
             </Link>

             <div className="space-y-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-4">
                  <Sparkles size={14} className="text-yellow-500" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">انضم لمجتمع المبدعين</span>
               </div>

               <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                 {isLogin ? 'أهلاً بعودتك!' : 'اصنع مستقبلك'} <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                   {isLogin ? 'لإكمال مسيرتك' : 'بمشروع تخرجك'}
                 </span>
               </h2>
               <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md leading-relaxed">
                 {isLogin 
                   ? 'تابع مشاريعك، تواصل مع فريقك، واكتشف فرصاً جديدة في سوق العمل.' 
                   : 'المنصة الأولى لتوثيق وإبراز مشاريع التخرج الجامعية في المملكة العربية السعودية.'}
               </p>

               <div className="space-y-4 mt-8">
                  {isLogin ? (
                     <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600"><Activity /></div>
                        <div>
                           <h4 className="font-bold text-lg text-slate-900 dark:text-white">لوحة تحكم متكاملة</h4>
                           <span className="text-sm text-slate-500">تتبع مشاهدات وإحصائيات مشروعك</span>
                        </div>
                     </div>
                  ) : (
                     <>
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600"><Check size={16} /></div>
                         <span className="text-slate-600 dark:text-slate-300 font-medium">توثيق رسمي للمشروع</span>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600"><Check size={16} /></div>
                         <span className="text-slate-600 dark:text-slate-300 font-medium">تواصل مع الشركات والجهات</span>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600"><Briefcase size={16} /></div>
                         <span className="text-slate-600 dark:text-slate-300 font-medium">بناء سيرة ذاتية قوية</span>
                       </div>
                     </>
                  )}
               </div>
             </div>
           </div>

           <div className="relative z-10 mt-12 text-sm text-slate-400 font-medium">
             © 2024 ProjexHub. جميع الحقوق محفوظة
           </div>
        </div>

        <div className="w-full lg:w-7/12 p-8 md:p-12 bg-white dark:bg-slate-950 flex flex-col justify-center order-2 lg:order-none overflow-y-auto">
           <div className="max-w-lg mx-auto w-full">
             
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                  {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
                </h2>
                <Link to="/" className="text-sm font-bold text-slate-400 hover:text-primary-600 transition-colors flex items-center gap-1">
                   العودة للرئيسية <ArrowRight size={16} />
                </Link>
             </div>

             <div className="grid grid-cols-2 gap-4 mb-8">
               <button type="button" onClick={handleSocialLogin} className="flex items-center justify-center gap-2 px-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:-translate-y-0.5 shadow-sm bg-white dark:bg-slate-900">
                 <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                 <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Google</span>
               </button>
               <button type="button" onClick={handleSocialLogin} className="flex items-center justify-center gap-2 px-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:-translate-y-0.5 shadow-sm bg-white dark:bg-slate-900">
                  <img src="https://www.svgrepo.com/show/69341/apple-logo.svg" className="w-5 h-5" alt="Apple" />
                  <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Apple</span>
               </button>
             </div>

             <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-slate-950 text-slate-400 font-medium">أو باستخدام البريد الإلكتروني</span>
                </div>
             </div>

             <form className="space-y-5" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4 animate-fade-in">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">الاسم الأول</label>
                      <input type="text" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white" placeholder="سليمان" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">الاسم الأخير</label>
                      <input type="text" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white" placeholder="يوسف" />
                    </div>
                  </div>
                )}

                <div className="animate-fade-in" style={{ animationDelay: '50ms' }}>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">البريد الإلكتروني</label>
                  <div className="relative group">
                    <Mail className="absolute right-4 top-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                    <input 
                      type="email" 
                      className="w-full pr-11 pl-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white shadow-sm placeholder-slate-400" 
                      placeholder="student@uni.edu.sa" 
                    />
                  </div>
                </div>

                {!isLogin && (
                   <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">رقم الهاتف</label>
                      <div className="relative group">
                        <Phone className="absolute right-4 top-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                        <div className="absolute left-4 top-3.5 text-slate-500 text-sm font-bold ltr bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">+966</div>
                        <input 
                          type="tel"
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          maxLength={9}
                          className="w-full pr-11 pl-20 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white shadow-sm text-left direction-ltr placeholder-slate-400" 
                          placeholder="50xxxxxxx" 
                        />
                      </div>
                   </div>
                )}

                {!isLogin && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '150ms' }}>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">الجامعة</label>
                        <div className="relative group">
                          <Building2 className="absolute right-4 top-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors pointer-events-none z-10" size={18} />
                          <ChevronDown className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors pointer-events-none z-10" size={18} />
                          <select className="w-full pr-11 pl-11 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white cursor-pointer appearance-none text-sm font-medium hover:border-slate-300 dark:hover:border-slate-700 shadow-sm">
                              <option disabled selected>اختر الجامعة</option>
                              {SAUDI_UNIVERSITIES.map((uni, idx) => <option key={idx} value={uni}>{uni}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">التخصص</label>
                        <div className="relative group">
                           <Code className="absolute right-4 top-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors pointer-events-none z-10" size={18} />
                           <ChevronDown className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors pointer-events-none z-10" size={18} />
                           <select className="w-full pr-11 pl-11 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white cursor-pointer appearance-none text-sm font-medium hover:border-slate-300 dark:hover:border-slate-700 shadow-sm">
                              <option disabled selected>اختر التخصص</option>
                              {TECH_MAJORS.map((major, idx) => <option key={idx} value={major}>{major}</option>)}
                           </select>
                        </div>
                      </div>
                   </div>
                )}

                <div className="relative animate-fade-in" style={{ animationDelay: isLogin ? '100ms' : '200ms' }}>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">كلمة المرور</label>
                  <div className="relative group">
                    <Lock className="absolute right-4 top-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      className="w-full pr-11 pl-12 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white shadow-sm placeholder-slate-400" 
                      placeholder="••••••••" 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>

                    {!isLogin && isPasswordFocused && (
                      <div className="absolute z-20 bottom-full left-0 w-full mb-2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 animate-fade-in-up">
                         <div className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1">
                           <Info size={12} />
                           كلمة مرور قوية:
                         </div>
                         <div className="space-y-2">
                            {requirements.map((req, idx) => (
                              <div key={idx} className={`flex items-center gap-2 text-xs font-medium transition-colors ${req.regex.test(password) ? 'text-green-500' : 'text-slate-400'}`}>
                                 {req.regex.test(password) ? <Check size={12} /> : <div className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600"></div>}
                                 <span>{req.text}</span>
                              </div>
                            ))}
                         </div>
                      </div>
                    )}
                  </div>
                </div>

                {!isLogin && (
                  <div className="animate-fade-in" style={{ animationDelay: '250ms' }}>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">تأكيد كلمة المرور</label>
                    <div className="relative group">
                      <Lock className="absolute right-4 top-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full pr-11 pl-12 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white shadow-sm placeholder-slate-400" 
                        placeholder="••••••••" 
                      />
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: '150ms' }}>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-primary-600 focus:ring-primary-500 focus:ring-2 cursor-pointer"
                      />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                        تذكرني
                      </span>
                    </label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm font-bold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                    >
                      نسيت كلمة المرور؟
                    </Link>
                  </div>
                )}

                <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-95 mt-2">
                  {isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'}
                </button>
             </form>

             <div className="text-center mt-8">
               <p className="text-slate-500 dark:text-slate-400 font-medium">
                 {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
                 <button 
                   type="button"
                   onClick={() => setIsLogin(!isLogin)} 
                   className="text-primary-600 font-bold hover:underline mr-1 px-2 py-1 rounded hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors"
                 >
                   {isLogin ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
                 </button>
               </p>
            </div>

           </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;