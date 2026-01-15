
import React, { useState } from 'react';
import { Project, Category, CATEGORIES } from '../types';

interface AdminPanelProps {
  projects: Project[];
  onAdd: (project: Project) => void;
  onDelete: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ projects, onAdd, onDelete }) => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    if (username === 'noobiesdesign' && password === 'Noobies@123') {
      setIsLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError('INVALID CREDENTIALS ACCESS DENIED');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageFile) {
      alert('Please provide a name and select a file.');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const newProject: Project = {
        id: Date.now().toString(),
        name,
        category,
        imageUrl: reader.result as string,
        timestamp: Date.now()
      };
      onAdd(newProject);
      setName('');
      setImageFile(null);
      setIsUploading(false);
      
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    };
    reader.readAsDataURL(imageFile);
  };

  // Login View
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="w-full max-w-md border border-white/10 bg-white/5 p-12 backdrop-blur-md">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">SECURE LOGIN</h2>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold">Authorized Personnel Only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="text" 
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-white/20 p-4 text-[10px] font-black tracking-widest outline-none focus:border-white transition-colors uppercase"
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/20 p-4 text-[10px] font-black tracking-widest outline-none focus:border-white transition-colors uppercase"
              />
            </div>
            {authError && (
              <p className="text-red-500 text-[9px] font-black tracking-widest text-center">{authError}</p>
            )}
            <button 
              type="submit"
              className="w-full p-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white border border-white transition-all"
            >
              Verify Identity
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard View
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none">COMMAND<br/>CENTER</h2>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-4 underline decoration-white/20 underline-offset-8"
        >
          Disconnect Session
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Upload Form */}
        <section className="lg:col-span-5 bg-white/5 p-10 border border-white/10 rounded-sm h-fit sticky top-28">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-10 border-b border-white/10 pb-6 flex items-center justify-between">
            <span>Add New Entry</span>
            <span className="text-xs text-white/20">/ +</span>
          </h3>
          <form onSubmit={handleUpload} className="space-y-8">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] font-black mb-3 text-white/30">Entry Designation</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="EX: PROJECT_V3_FINAL"
                className="w-full bg-black border border-white/10 p-4 focus:border-white outline-none transition-colors text-white placeholder:text-white/10 text-[10px] font-black tracking-widest uppercase"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] font-black mb-3 text-white/30">Select Segment</label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`p-3 text-[9px] font-black uppercase tracking-[0.15em] border transition-all ${
                      category === cat 
                        ? 'bg-white text-black border-white' 
                        : 'bg-black text-white border-white/10 hover:border-white/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] font-black mb-3 text-white/30">Asset Payload</label>
              <label 
                htmlFor="file-upload" 
                className="flex flex-col items-center justify-center w-full h-40 border border-dashed border-white/10 cursor-pointer hover:border-white/40 transition-colors bg-black/50"
              >
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30 leading-relaxed">
                    {imageFile ? <span className="text-white">{imageFile.name}</span> : 'SELECT_FILE.JPG_PNG_OR_MP4'}
                  </p>
                </div>
                <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isUploading}
              className={`w-full p-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all border ${
                isUploading 
                  ? 'bg-white/5 border-white/10 text-white/20 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-transparent hover:text-white border-white'
              }`}
            >
              {isUploading ? 'SYNCHRONIZING...' : 'COMMIT_CHANGES'}
            </button>
          </form>
        </section>

        {/* Existing Projects List */}
        <section className="lg:col-span-7">
          <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
            <h3 className="text-xl font-black uppercase tracking-tighter">Live Directory</h3>
            <span className="text-[10px] font-black px-3 py-1 bg-white/10 rounded-full tracking-widest">{projects.length} ITEMS</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {projects.map(p => (
              <div key={p.id} className="group flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:border-white/30 transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-black overflow-hidden border border-white/10">
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-tighter text-lg leading-tight mb-1">{p.name}</h4>
                    <p className="text-[9px] text-white/30 uppercase font-black tracking-[0.3em]">{p.category}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onDelete(p.id)}
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-red-900 hover:text-red-500 p-3 px-6 border border-red-900/10 hover:border-red-500/40 transition-all bg-red-500/5"
                >
                  Terminate
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
