import React from 'react';
import { Github, Sparkles, Zap, TrendingUp } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-sky-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative px-6 py-24 mx-auto max-w-6xl">
        <div className="text-center">
          <div className="flex justify-center mb-10">
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium">AI-Powered Open Source Discovery</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-semibold mb-8 bg-gradient-to-r from-white via-blue-100 to-slate-200 bg-clip-text text-transparent">
            Explore Open Source
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover GitHub repositories with AI-enhanced search, find similar libraries, 
            analyze usage trends, and get personalized contribution recommendations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <Github className="h-5 w-5 text-blue-300" />
              <span>GitHub Integration</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <Zap className="h-5 w-5 text-blue-300" />
              <span>AI-Powered Search</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <TrendingUp className="h-5 w-5 text-blue-300" />
              <span>Trend Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;