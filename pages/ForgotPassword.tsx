import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle, KeyRound, Eye, EyeOff, Lock, Check, X } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending OTP to:', email);
    setStep(2);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; 
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6 && /^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      otpRefs.current[nextEmptyIndex]?.focus();
    } else {
      otpRefs.current[5]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const otpCode = otp.join('');
    console.log('Verifying OTP:', otpCode);
    if (otpCode.length === 6) {
      setStep(3);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      console.log('Password reset successful');
      setSuccess(true);
    } else {
      alert('كلمات المرور غير متطابقة');
    }
  };

  const passwordRules = {
    minLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /[0-9]/.test(newPassword),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const allRulesMet = Object.values(passwordRules).every(rule => rule);

  if (success) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4 font-sans">
        <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-12 shadow-2xl border border-slate-200 dark:border-slate-800 text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
            تم تغيير كلمة المرور بنجاح!
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.
          </p>
          <Link
            to="/auth"
            className="block w-full py-3.5 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 font-sans">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="bg-blue-600 p-8 text-center text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
            <KeyRound size={32} />
          </div>
          <h1 className="text-3xl font-black mb-2">
            {step === 1 && 'نسيت كلمة المرور؟'}
            {step === 2 && 'التحقق من الهوية'}
            {step === 3 && 'كلمة مرور جديدة'}
          </h1>
          <p className="text-blue-100">
            {step === 1 && 'لا تقلق، سنساعدك على استعادة حسابك'}
            {step === 2 && 'أدخل الرمز المرسل إلى بريدك الإلكتروني'}
            {step === 3 && 'اختر كلمة مرور قوية وآمنة'}
          </p>
        </div>

        <div className="p-8">

          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6 animate-fade-in">
              <div className="mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  أدخل عنوان بريدك الإلكتروني المسجل وسنرسل لك رمز التحقق.
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative group">
                  <Mail className="absolute right-4 top-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pr-11 pl-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white shadow-sm placeholder-slate-400 font-medium"
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                إرسال رمز التحقق
              </button>

              <div className="text-center">
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors"
                >
                  <ArrowRight size={16} />
                  العودة لتسجيل الدخول
                </Link>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed text-center">
                  تم إرسال رمز مكون من 6 أرقام إلى <br />
                  <strong className="text-primary-600">{email}</strong>
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 text-center">
                  رمز التحقق
                </label>
                <div className="flex gap-2 justify-center direction-ltr" dir="ltr">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { otpRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white"
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={otp.some(digit => !digit)}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                التحقق من الرمز
              </button>

              <div className="text-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors"
                >
                  تغيير البريد الإلكتروني
                </button>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
                <p className="text-xs text-blue-800 dark:text-blue-300 font-medium text-center">
                  لم تستلم الرمز؟ <button className="underline font-bold">إعادة الإرسال</button>
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <Lock className="absolute right-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    required
                    className="w-full pr-11 pl-12 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white shadow-sm font-medium"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute left-4 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {isPasswordFocused && (
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-2 animate-fade-in">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
                      متطلبات كلمة المرور:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className={`flex items-center gap-2 text-xs transition-colors ${passwordRules.minLength ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                        {passwordRules.minLength ? <Check size={14} /> : <X size={14} />}
                        <span>8 أحرف على الأقل</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs transition-colors ${passwordRules.hasUppercase ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                        {passwordRules.hasUppercase ? <Check size={14} /> : <X size={14} />}
                        <span>حرف كبير واحد على الأقل (A-Z)</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs transition-colors ${passwordRules.hasLowercase ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                        {passwordRules.hasLowercase ? <Check size={14} /> : <X size={14} />}
                        <span>حرف صغير واحد على الأقل (a-z)</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs transition-colors ${passwordRules.hasNumber ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                        {passwordRules.hasNumber ? <Check size={14} /> : <X size={14} />}
                        <span>رقم واحد على الأقل (0-9)</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs transition-colors ${passwordRules.hasSpecial ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                        {passwordRules.hasSpecial ? <Check size={14} /> : <X size={14} />}
                        <span>رمز خاص واحد على الأقل (!@#$%...)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pr-11 pl-12 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white shadow-sm font-medium"
                    placeholder="••••••••"
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


              <button
                type="submit"
                disabled={!allRulesMet || newPassword !== confirmPassword || !newPassword || !confirmPassword}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                تغيير كلمة المرور
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
