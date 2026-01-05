import React from 'react';
import { Github, Linkedin, Globe } from 'lucide-react';
// Import your image
import profileImage from '../images/profile.jpg'; // Make sure the path is correct

const Footer: React.FC = () => {
    return (
        <footer className="w-full max-w-[1260px] animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex flex-col items-center justify-between gap-6 p-6 transition-colors duration-500 border shadow-2xl bg-white/5 backdrop-blur-xl border-white/10 rounded-3xl md:flex-row hover:border-white/20">
                
                {/* Developer Info */}
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shrink-0 p-0.5">
                        {/* Replaced Code icon with your image */}
                        <img 
                            src={profileImage} 
                            alt="Chamika Gayashan" 
                            className="object-cover w-full h-full rounded-full"
                        />
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-0.5">Developed By</span>
                        <span className="text-lg font-bold leading-none tracking-wide text-white">Chamika Gayashan</span>
                        <span className="mt-1 text-xs font-medium text-white/40">Software Engineer</span>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-2 bg-black/20 rounded-full p-1.5 border border-white/5">
                    {/* Add your actual links here */}
                    <a href="https://github.com/chamikathereal" target="_blank" rel="noreferrer" className="p-3 transition-all duration-300 rounded-full hover:bg-white/10 text-white/70 hover:text-white hover:scale-110">
                        <Github size={18} />
                    </a>
                    <a href="https://linkedin.com/in/chamikathereal" target="_blank" rel="noreferrer" className="p-3 transition-all duration-300 rounded-full hover:bg-white/10 text-white/70 hover:text-white hover:scale-110">
                        <Linkedin size={18} />
                    </a>
                    <a href="https://chamikathereal.com" target="_blank" rel="noreferrer" className="p-3 transition-all duration-300 rounded-full hover:bg-white/10 text-white/70 hover:text-white hover:scale-110">
                        <Globe size={18} />
                    </a>
                </div>
            </div>
            
            {/* Copyright Line */}
            <div className="text-center mt-6 text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase">
                Weather App © {new Date().getFullYear()} • Built with React & Tailwind
            </div>
        </footer>
    );
};

export default Footer;