import React, { useState, useEffect, useRef } from 'react';
import { User } from '../App';
import { Link } from 'react-router-dom';
import { Search, Send, MoreVertical, Image, Paperclip, ArrowRight, Check, CheckCheck, Smile, Mic, Info, Trash2, User as UserIcon, Ban, BellOff, FileText, Camera, X, ChevronLeft, MessageCircle, Users as UsersIcon } from 'lucide-react';

interface MessagesProps {
   user: User;
}

interface Message {
   id: string;
   sender: 'me' | 'them';
   content: string;
   time: string;
   read: boolean;
   type: 'text' | 'image' | 'file';
}

interface Chat {
   id: string;
   name: string;
   avatar: string;
   initial: string;
   status: 'online' | 'offline';
   role: string;
   lastMessage: string;
   lastMessageTime: string;
   unreadCount: number;
   messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ user }) => {

   const [chats, setChats] = useState<Chat[]>([
      {
         id: '1',
         name: 'د. عبدالمجيد الجهني',
         avatar: 'bg-blue-500',
         initial: 'خ',
         status: 'online',
         role: 'مشرف أكاديمي',
         lastMessage: 'ممتاز، سأراجع المشروع وأرد عليك.',
         lastMessageTime: '10:30 ص',
         unreadCount: 2,
         messages: [
            { id: '1', sender: 'me', content: 'دكتور، هل اطلعت على المسودة الأخيرة؟', time: '10:00 ص', read: true, type: 'text' },
            { id: '2', sender: 'them', content: 'نعم اطلعت عليها، العمل جيد بشكل عام.', time: '10:15 ص', read: true, type: 'text' },
            { id: '3', sender: 'them', content: 'ممتاز، سأراجع المشروع وأرد عليك.', time: '10:30 ص', read: false, type: 'text' },
         ]
      },
      {
         id: '2',
         name: 'عبدالمنان محمد',
         avatar: 'bg-sky-500',
         initial: 'س',
         status: 'offline',
         role: 'طالب - هندسة برمجيات',
         lastMessage: 'هل يمكننا الاجتماع غداً لمناقشة الـ UI؟',
         lastMessageTime: 'أمس',
         unreadCount: 0,
         messages: [
            { id: '1', sender: 'them', content: 'هل يمكننا الاجتماع غداً لمناقشة الـ UI؟', time: 'أمس', read: true, type: 'text' },
         ]
      },
      {
         id: '3',
         name: 'فريق مشروع "DataStrike"',
         avatar: 'bg-primary-600',
         initial: 'م',
         status: 'online',
         role: 'مجموعة',
         lastMessage: 'تم رفع الملفات على GitHub',
         lastMessageTime: 'منذ يومين',
         unreadCount: 0,
         messages: [
            { id: '1', sender: 'me', content: 'يا شباب، مين خلص تصميم الداتابيس؟', time: 'الاثنين', read: true, type: 'text' },
            { id: '2', sender: 'them', content: 'أنا خلصته ورفعته على الدرايف', time: 'الاثنين', read: true, type: 'text' },
            { id: '3', sender: 'them', content: 'تم رفع الملفات على GitHub', time: 'الثلاثاء', read: true, type: 'text' },
         ]
      }
   ]);

   const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
   const [newMessage, setNewMessage] = useState('');
   const [showMenu, setShowMenu] = useState(false);
   const [showAttachments, setShowAttachments] = useState(false);
   const [showInfoPanel, setShowInfoPanel] = useState(false);
   const [showChatListMenu, setShowChatListMenu] = useState(false);

   const messagesEndRef = useRef<HTMLDivElement>(null);
   const messagesContainerRef = useRef<HTMLDivElement>(null);
   const menuRef = useRef<HTMLDivElement>(null);
   const attachmentRef = useRef<HTMLDivElement>(null);
   const chatListMenuRef = useRef<HTMLDivElement>(null);

   const selectedChat = chats.find(c => c.id === selectedChatId);



   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowMenu(false);
         }
         if (attachmentRef.current && !attachmentRef.current.contains(event.target as Node)) {
            setShowAttachments(false);
         }
         if (chatListMenuRef.current && !chatListMenuRef.current.contains(event.target as Node)) {
            setShowChatListMenu(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   const handleSendMessage = (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!newMessage.trim() || !selectedChatId) return;

      const updatedChats = chats.map(chat => {
         if (chat.id === selectedChatId) {
            return {
               ...chat,
               messages: [...chat.messages, {
                  id: Date.now().toString(),
                  sender: 'me',
                  content: newMessage,
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  read: false,
                  type: 'text'
               } as Message],
               lastMessage: newMessage,
               lastMessageTime: 'الآن'
            };
         }
         return chat;
      });
      setChats(updatedChats);
      setNewMessage('');
   };

   const handleClearChat = () => {
      if (!selectedChatId) return;
      const updatedChats = chats.map(chat => {
         if (chat.id === selectedChatId) {
            return { ...chat, messages: [], lastMessage: 'تم مسح المحادثة', lastMessageTime: '' };
         }
         return chat;
      });
      setChats(updatedChats);
      setShowMenu(false);
   };

   return (
      <div className="h-[calc(100vh-80px)] bg-transparent overflow-hidden relative font-sans">

         <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-6 relative z-10">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 h-full overflow-hidden flex">

               <div className={`w-full lg:w-1/3 border-l border-slate-100 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900 ${selectedChatId ? 'hidden lg:flex' : 'flex'}`}>

                  <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">المحادثات</h2>
                        <div className="relative" ref={chatListMenuRef}>
                           <button
                              onClick={() => setShowChatListMenu(!showChatListMenu)}
                              className={`p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-colors ${showChatListMenu ? 'bg-slate-50 dark:bg-slate-800 text-primary-600' : ''}`}
                           >
                              <MoreVertical size={20} />
                           </button>

                           {showChatListMenu && (
                              <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-fade-in-up origin-top-left z-50">
                                 <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary-600 transition-colors">
                                    <MessageCircle size={16} />
                                    إنشاء محادثة جديدة
                                 </button>
                                 <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary-600 transition-colors">
                                    <UsersIcon size={16} />
                                    إنشاء مجموعة
                                 </button>
                                 <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
                                 <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <BellOff size={16} />
                                    كتم جميع الإشعارات
                                 </button>
                                 <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                    <Trash2 size={16} />
                                    مسح جميع المحادثات
                                 </button>
                              </div>
                           )}
                        </div>
                     </div>
                     <div className="relative">
                        <Search className="absolute right-4 top-3.5 text-slate-400" size={18} />
                        <input
                           type="text"
                           placeholder="بحث في المحادثات..."
                           className="w-full pr-11 pl-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 focus:border-primary-500 outline-none transition-all text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400"
                        />
                     </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                     {chats.map((chat) => (
                        <button
                           key={chat.id}
                           onClick={() => { setSelectedChatId(chat.id); setShowInfoPanel(false); }}
                           className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${selectedChatId === chat.id ? 'bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-100 dark:ring-primary-900/30' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                        >
                           <div className="relative">
                              <div className={`w-14 h-14 rounded-2xl ${chat.avatar} flex items-center justify-center text-white font-bold text-xl shadow-md`}>
                                 {chat.initial}
                              </div>
                              {chat.status === 'online' && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>}
                           </div>
                           <div className="flex-1 text-right min-w-0">
                              <div className="flex justify-between items-center mb-1">
                                 <h3 className="font-bold text-slate-900 dark:text-white truncate">{chat.name}</h3>
                                 <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{chat.lastMessageTime}</span>
                              </div>
                              <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'font-bold text-slate-800 dark:text-slate-200' : 'text-slate-500'}`}>
                                 {chat.lastMessage}
                              </p>
                           </div>
                           {chat.unreadCount > 0 && (
                              <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm animate-pulse">
                                 {chat.unreadCount}
                              </div>
                           )}
                        </button>
                     ))}
                  </div>
               </div>

               <div className={`flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 relative ${!selectedChatId ? 'hidden lg:flex' : 'flex'}`}>
                  {selectedChat ? (
                     <>

                        <div className="p-4 px-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shadow-sm z-20">
                           <div className="flex items-center gap-4">
                              <button onClick={() => setSelectedChatId(null)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl">
                                 <ArrowRight size={20} />
                              </button>
                              <div onClick={() => setShowInfoPanel(!showInfoPanel)} className="cursor-pointer flex items-center gap-4 group">
                                 <div className={`w-12 h-12 rounded-xl ${selectedChat.avatar} flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform`}>
                                    {selectedChat.initial}
                                 </div>
                                 <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                       {selectedChat.name}
                                       <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">{selectedChat.role}</span>
                                    </h3>
                                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                       {selectedChat.status === 'online' ? <><span className="w-2 h-2 bg-green-500 rounded-full"></span> متصل الآن</> : 'غير متصل'}
                                    </span>
                                 </div>
                              </div>
                           </div>

                           <div className="flex items-center gap-1 text-slate-400">
                              <button onClick={() => setShowInfoPanel(!showInfoPanel)} className={`p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors ${showInfoPanel ? 'bg-slate-100 dark:bg-slate-800 text-primary-600' : ''}`}>
                                 <Info size={20} />
                              </button>

                              <div className="relative" ref={menuRef}>
                                 <button onClick={() => setShowMenu(!showMenu)} className={`p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors ${showMenu ? 'bg-slate-100 dark:bg-slate-800 text-primary-600' : ''}`}>
                                    <MoreVertical size={20} />
                                 </button>

                                 {showMenu && (
                                    <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-fade-in-up origin-top-left z-50">
                                       <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary-600 transition-colors">
                                          <UserIcon size={16} /> عرض الملف الشخصي
                                       </Link>
                                       <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                          <Search size={16} /> بحث في المحادثة
                                       </button>
                                       <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                          <BellOff size={16} /> كتم الإشعارات
                                       </button>
                                       <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
                                       <button onClick={handleClearChat} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                          <Trash2 size={16} /> مسح المحادثة
                                       </button>
                                       <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                          <Ban size={16} /> حظر المستخدم
                                       </button>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>

                        <div
                           className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50 dark:bg-slate-950 flex flex-col"
                           ref={messagesContainerRef}
                        >
                           <div className="flex justify-center">
                              <span className="px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 shadow-sm">
                                 اليوم
                              </span>
                           </div>

                           {selectedChat.messages.length === 0 && (
                              <div className="flex flex-col items-center justify-center h-full opacity-50 flex-grow">
                                 <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                    <Smile size={32} className="text-slate-400" />
                                 </div>
                                 <p className="text-slate-500 font-bold">لا توجد رسائل، ابدأ المحادثة الآن!</p>
                              </div>
                           )}

                           {selectedChat.messages.map((msg) => (
                              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-start' : 'justify-end'} group`}>
                                 <div className={`max-w-[75%] lg:max-w-[60%] rounded-[1.3rem] p-4 shadow-sm relative transition-all ${msg.sender === 'me'
                                    ? 'bg-primary-600 text-white rounded-tr-none hover:shadow-md'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700 hover:shadow-md'
                                    }`}>
                                    {msg.type === 'text' && <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>}

                                    <div className={`flex items-center gap-1 justify-end mt-1.5 text-[10px] ${msg.sender === 'me' ? 'text-primary-100' : 'text-slate-400'}`}>
                                       <span>{msg.time}</span>
                                       {msg.sender === 'me' && (
                                          msg.read ? <CheckCheck size={12} /> : <Check size={12} />
                                       )}
                                    </div>
                                 </div>
                              </div>
                           ))}
                           <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 relative z-20">
                           <form onSubmit={handleSendMessage} className="flex items-end gap-3">

                              <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400">
                                 <div className="relative" ref={attachmentRef}>
                                    <button
                                       type="button"
                                       onClick={() => setShowAttachments(!showAttachments)}
                                       className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors ${showAttachments ? 'text-primary-600 bg-slate-200 dark:bg-slate-700' : ''}`}
                                    >
                                       <Paperclip size={20} />
                                    </button>
                                    {showAttachments && (
                                       <div className="absolute bottom-full left-0 mb-3 flex flex-col gap-2 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-fade-in-up min-w-[40px]">
                                          <button type="button" className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl text-primary-500 tooltip-right" title="صورة"><Image size={20} /></button>
                                          <button type="button" className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl text-blue-500" title="ملف"><FileText size={20} /></button>
                                          <button type="button" className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl text-red-500" title="كاميرا"><Camera size={20} /></button>
                                       </div>
                                    )}
                                 </div>
                                 <button type="button" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"><Smile size={20} /></button>
                              </div>

                              <div className="flex-1 relative">
                                 <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="اكتب رسالتك هنا..."
                                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-white font-medium max-h-32 placeholder-slate-400"
                                 />
                              </div>

                              {newMessage.trim() ? (
                                 <button
                                    type="submit"
                                    className="p-4 bg-primary-600 text-white rounded-2xl shadow-lg shadow-primary-600/20 hover:scale-105 active:scale-95 transition-all"
                                 >
                                    <Send size={20} />
                                 </button>
                              ) : (
                                 <button
                                    type="button"
                                    className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                 >
                                    <Mic size={20} />
                                 </button>
                              )}
                           </form>
                        </div>
                     </>
                  ) : (
                     <div className="flex-1 flex flex-col items-center justify-center text-slate-400 relative">
                        <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mb-8 animate-float">
                           <div className="relative">
                              <Smile size={60} className="text-slate-300 dark:text-slate-600" />
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full animate-ping"></div>
                           </div>
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-3">اختر محادثة للبدء</h3>
                        <p className="text-base font-medium text-slate-500 max-w-xs text-center leading-relaxed">
                           تواصل مع زملائك، شارك الملفات، وناقش تفاصيل مشروعك بكل سهولة وأمان.
                        </p>
                     </div>
                  )}
               </div>

               {selectedChat && showInfoPanel && (
                  <div className="w-80 border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col animate-fade-in-up overflow-hidden z-30 absolute left-0 top-0 bottom-0 lg:relative shadow-2xl lg:shadow-none">
                     <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <h3 className="font-black text-lg text-slate-900 dark:text-white">معلومات المحادثة</h3>
                        <button onClick={() => setShowInfoPanel(false)} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full"><X size={20} /></button>
                     </div>
                     <div className="p-6 flex flex-col items-center text-center border-b border-slate-100 dark:border-slate-800">
                        <div className={`w-24 h-24 rounded-3xl ${selectedChat.avatar} flex items-center justify-center text-white text-4xl font-bold shadow-xl mb-4`}>
                           {selectedChat.initial}
                        </div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1">{selectedChat.name}</h2>
                        <p className="text-primary-600 dark:text-primary-400 font-bold text-sm mb-4">{selectedChat.role}</p>
                        <div className="flex gap-3 w-full">
                           <Link to="/profile" className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">الملف الشخصي</Link>
                           <button className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">بحث</button>
                        </div>
                     </div>
                     <div className="flex-1 overflow-y-auto p-6">
                        <h4 className="text-sm font-bold text-slate-500 mb-4">الوسائط المشتركة</h4>
                        <div className="grid grid-cols-3 gap-2 mb-6">
                           {[1, 2, 3, 4, 5, 6].map(i => (
                              <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                           ))}
                        </div>
                        <h4 className="text-sm font-bold text-slate-500 mb-4">الملفات</h4>
                        <div className="space-y-3">
                           <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><FileText size={16} /></div>
                              <div className="flex-1 overflow-hidden">
                                 <p className="text-sm font-bold truncate dark:text-white">Project_Plan.pdf</p>
                                 <p className="text-[10px] text-slate-400">2.4 MB</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

            </div>
         </div>
      </div>
   );
};

export default Messages;