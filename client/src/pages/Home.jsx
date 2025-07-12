import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  Brain, 
  Target, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Zap,
  Users,
  Award
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Plan, Progress,
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {' '} Succeed
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload your resume, choose your target role, and get a personalized skill-based learning roadmap 
              powered by AI. Transform your career with visual learning paths and curated resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <span className="mr-2">Get Started Free</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-all duration-200"
              >
                <span>View Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How SkillTree Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to unlock your personalized career roadmap
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Upload Resume</h3>
              <p className="text-slate-600 leading-relaxed">
                Upload your current resume and specify your target role. Our AI analyzes your existing skills and experience.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">AI Analysis</h3>
              <p className="text-slate-600 leading-relaxed">
                Advanced AI compares your skills with role requirements and identifies knowledge gaps to create your personalized roadmap.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Follow Your Path</h3>
              <p className="text-slate-600 leading-relaxed">
                Get visual skill trees with curated resources, estimated timelines, and progress tracking to reach your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to accelerate your career growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Curated Resources</h3>
              <p className="text-slate-600">
                Access top-rated videos, articles, and courses for each skill in your roadmap.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Time Estimation</h3>
              <p className="text-slate-600">
                Get realistic timelines and effort estimates for mastering each skill.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Progress Tracking</h3>
              <p className="text-slate-600">
                Monitor your learning progress and celebrate milestones along the way.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">AI-Powered</h3>
              <p className="text-slate-600">
                Leverage GPT-4 and advanced prompt engineering for accurate skill analysis.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Community</h3>
              <p className="text-slate-600">
                Connect with others following similar career paths and share experiences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Achievements</h3>
              <p className="text-slate-600">
                Earn badges and certificates as you complete sections of your roadmap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-emerald-100">Career Roadmaps Generated</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-emerald-100">Success Rate</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-emerald-100">Skills Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have accelerated their careers with SkillTree. 
            Get started today and see the difference AI-powered learning can make.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <span className="mr-2">Start Your Journey</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;