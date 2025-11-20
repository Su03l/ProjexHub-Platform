import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BrowseProjects from './pages/BrowseProjects';
import UploadProject from './pages/UploadProject';
import Competition from './pages/Competition';
import ProjectDetails from './pages/ProjectDetails';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Messages from './pages/Messages';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import ReportIssue from './pages/ReportIssue';
import ForgotPassword from './pages/ForgotPassword';
import MyProjects from './pages/MyProjects';
import Stats from './pages/Stats';
import { User as UserIcon } from 'lucide-react';
import avatar from './assets/suliman.jpg';

// Enhanced User Type
export interface User {
  name: string;
  email: string;
  username: string;
  avatar: string; // Color class or URL
  initial: string;
  jobTitle?: string;
  bio?: string;
  location?: string;
  university?: string;
  joinDate?: string;
  skills: string[];
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  const [user, setUser] = useState<User | null>(null);
  const [postLoginPath, setPostLoginPath] = useState<string>('/dashboard');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleLogin = (destination: string = '/dashboard') => {
    setUser({
      name: 'سليمان يوسف',
      email: 'sulaiman@example.com',
      username: 'su05l',
      initial: 'س',
      avatar: avatar,
      jobTitle: 'Full Stack Developer',
      bio: 'Software Engineering | Full Stack Web Development and Passionate About Web Development Next -Node Js | Laravel',
      location: 'المدينة المنورة، السعودية',
      university: 'جامعة طيبة',
      joinDate: '2010',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'TailwindCSS', 'TypeScript', 'Node.js', 'Express.js', 'PHP', 'Laravel'],
      socials: {
        twitter: 'Su05l',
        github: 'Su03l',
        linkedin: 'suliaman-yousef-36265a320',
        website: 'https://suliman-yousef-link-tree.vercel.app/'
      }
    });
    setPostLoginPath(destination);
  };

  const handleLogout = () => {
    setUser(null);
    setPostLoginPath('/signin');
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-transparent font-sans text-slate-900 dark:text-white">
        <Navbar
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          user={user}
          onLogout={handleLogout}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<BrowseProjects />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="/upload" element={<UploadProject />} />
            <Route path="/competition" element={<Competition />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/signin"
              element={user ? <Navigate to={postLoginPath} /> : <SignIn onLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to={postLoginPath} /> : <SignUp onLogin={handleLogin} />}
            />
            <Route
              path="/profile"
              element={user ? <Profile user={user} /> : <Navigate to="/signin" />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard user={user} /> : <Navigate to="/signin" />}
            />
            <Route
              path="/messages"
              element={user ? <Messages user={user} /> : <Navigate to="/signin" />}
            />
            <Route
              path="/settings"
              element={user ? <Settings user={user} /> : <Navigate to="/signin" />}
            />
            <Route
              path="/dashboard/my-projects"
              element={user ? <MyProjects user={user} /> : <Navigate to="/signin" />}
            />
            <Route
              path="/dashboard/stats"
              element={user ? <Stats user={user} /> : <Navigate to="/signin" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;