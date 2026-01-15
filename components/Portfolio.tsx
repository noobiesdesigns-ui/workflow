
import React, { useState, useMemo } from 'react';
import { Project, Category, CATEGORIES } from '../types';

interface PortfolioProps {
  projects: Project[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <header className="mb-24">
        <h1 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter leading-[0.85] mb-12">
          MY<br/>WORKS
        </h1>
        
        <div className="flex flex-wrap gap-2 mt-16 max-w-4xl">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-8 py-3 rounded-none border text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
              activeCategory === 'All' 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent text-white border-white/20 hover:border-white'
            }`}
          >
            All Works
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-none border text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-white text-black border-white' 
                  : 'bg-transparent text-white border-white/20 hover:border-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              className="group relative flex flex-col cursor-none"
            >
              <div className="relative overflow-hidden bg-neutral-900 aspect-[3/4]">
                <img 
                  src={project.imageUrl} 
                  alt={project.name}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                {/* Visual indicator of hover (slight gradient/overlay) without text/button */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="mt-6 flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 leading-none transition-colors group-hover:text-white">{project.name}</h3>
                  <p className="text-[9px] tracking-[0.3em] text-white/40 uppercase font-black">{project.category}</p>
                </div>
                <span className="text-[10px] font-black text-white/10 mt-1">/ {String(idx + 1).padStart(2, '0')}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center border border-dashed border-white/10">
            <p className="text-white/20 uppercase tracking-[0.4em] text-[10px] font-black">Awaiting New Creations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
