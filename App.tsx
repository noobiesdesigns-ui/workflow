
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import AdminPanel from './components/AdminPanel';
import { Project, Category } from './types';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Initial load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('design_portfolio_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      // Mock data for initial impression
      const mock: Project[] = [
        { id: '1', name: 'Cyberpunk Identity', category: 'Logo Design', imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop', timestamp: Date.now() },
        { id: '2', name: 'Brutalist Rave', category: 'Poster Design', imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop', timestamp: Date.now() },
        { id: '3', name: 'Minimal Mono', category: 'Business Card', imageUrl: 'https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=2069&auto=format&fit=crop', timestamp: Date.now() },
        { id: '4', name: 'Eco Stream App', category: 'UI UX Design', imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop', timestamp: Date.now() },
        { id: '5', name: 'Gamer Fuel', category: 'Thumbnail Design', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', timestamp: Date.now() },
        { id: '6', name: 'Street Motion', category: 'Video Editing', imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop', timestamp: Date.now() },
      ];
      setProjects(mock);
      localStorage.setItem('design_portfolio_projects', JSON.stringify(mock));
    }
  }, []);

  const addProject = (project: Project) => {
    const updated = [project, ...projects];
    setProjects(updated);
    localStorage.setItem('design_portfolio_projects', JSON.stringify(updated));
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('design_portfolio_projects', JSON.stringify(updated));
  };

  const updateProject = (id: string, updatedProject: Project) => {
    const updated = projects.map(p => p.id === id ? updatedProject : p);
    setProjects(updated);
    localStorage.setItem('design_portfolio_projects', JSON.stringify(updated));
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col selection:bg-white selection:text-black">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Portfolio projects={projects} />} />
            <Route 
              path="/admin" 
              element={<AdminPanel projects={projects} onAdd={addProject} onDelete={deleteProject} onUpdate={updateProject} />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

const Navigation: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-3">
        {/* Logo Placeholder */}
        <div className="w-10 h-10 bg-white flex items-center justify-center">
          <span className="text-black font-black text-xl italic">N</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-black tracking-tighter uppercase">Noobies</span>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Design Studio</span>
        </div>
      </Link>
      <div className="flex gap-8 items-center text-[10px] font-black uppercase tracking-[0.2em]">
        <Link 
          to="/" 
          className={`hover:text-gray-400 transition-colors ${!isAdmin ? 'text-white' : 'text-white/40'}`}
        >
          Portfolio
        </Link>
        <Link 
          to="/admin" 
          className={`hover:text-gray-400 transition-colors ${isAdmin ? 'text-white' : 'text-white/40'}`}
        >
          Manage
        </Link>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="border-t border-white/10 py-20 px-6 mt-20 text-center">
    <div className="mb-10 max-w-4xl mx-auto">
      <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
        Visionary Design for High-End Brands.
      </h2>
    </div>
    <div className="flex flex-col items-center gap-8">
       <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-widest text-white/40">
          <a href="https://www.instagram.com/noobies_design/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors border-b border-white/0 hover:border-white pb-1">Instagram</a>
          <a href="https://wa.me/919363366300" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors border-b border-white/0 hover:border-white pb-1">WhatsApp</a>
          <a href="mailto:noobiesdesigns@gmail.com" className="hover:text-white transition-colors border-b border-white/0 hover:border-white pb-1">Email</a>
       </div>
       <p className="text-[10px] tracking-widest uppercase text-white/20 font-bold">© 2024 NOOBIESDESIGN · Built for the Bold</p>
    </div>
  </footer>
);

export default App;
