import React from 'react';
import { TreePine, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TreePine className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold">SkillTree</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered career roadmap generator. Upload your resume and get personalized learning paths to reach your dream role.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Features</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">API</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">About</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 SkillTree. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
