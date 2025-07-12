import React, { useState, useEffect } from 'react';
import {
  Upload,
  FileText,
  Target,
  Brain,
  Clock,
  CheckCircle,
  PlayCircle,
  BookOpen,
  TrendingUp,
  Award,
  Users,
  Settings,
  BarChart3,
  Calendar,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      navigate('/login');
    }
  }, [navigate]);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setSkills([]);
      setError('');
    }
  };

  const extractSkills = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized. Please login again.');
      navigate('/login');
      return;
    }

    if (!file) {
      setError('Please upload a resume first.');
      return;
    }

    setLoading(true);
    setError('');
    setSkills([]);

    const formData = new FormData();
    formData.append('docx', file);

    try {
      const response = await fetch('http://localhost:3000/api/scan/extract-text', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSkills(data.skill || []);
      } else {
        setError(data.error || 'Skill extraction failed');
      }
    } catch (err) {
      setError('Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  const sampleRoadmapData = [
    {
      skill: 'Python',
      level: 'Intermediate',
      progress: 75,
      timeEstimate: '2 weeks',
      resources: 5,
      children: [
        { skill: 'Pandas', level: 'Beginner', progress: 40, timeEstimate: '1 week' },
        { skill: 'FastAPI', level: 'Beginner', progress: 20, timeEstimate: '2 weeks' },
      ],
    },
    {
      skill: 'SQL',
      level: 'Advanced',
      progress: 90,
      timeEstimate: '1 week',
      resources: 8,
      children: [
        { skill: 'PostgreSQL', level: 'Intermediate', progress: 60, timeEstimate: '1 week' },
        { skill: 'Query Optimization', level: 'Beginner', progress: 10, timeEstimate: '2 weeks' },
      ],
    },
    {
      skill: 'Docker',
      level: 'Beginner',
      progress: 30,
      timeEstimate: '3 weeks',
      resources: 12,
      children: [
        { skill: 'Docker Compose', level: 'Beginner', progress: 0, timeEstimate: '1 week' },
        { skill: 'Kubernetes', level: 'Beginner', progress: 0, timeEstimate: '4 weeks' },
      ],
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'roadmap', label: 'My Roadmap', icon: Target },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'resources', label: 'Resources', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Track your learning progress and manage your career roadmap</p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8 border-b border-slate-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  } transition-colors`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Generate New Roadmap</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Your Resume
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-slate-400" />
                        <p className="mb-2 text-sm text-slate-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-slate-500">PDF, DOC, or DOCX (MAX. 10MB)</p>
                        {file && (
                          <p className="mt-2 text-sm text-emerald-600 font-medium">
                            {file.name} uploaded successfully
                          </p>
                        )}
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={extractSkills}
                    disabled={!file || loading}
                    className={`px-4 py-2 rounded-lg font-medium text-white ${
                      !file || loading
                        ? 'bg-emerald-300 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {loading ? 'Extracting...' : 'Extract Skills'}
                  </button>
                </div>

                {skills.length > 0 && (
                  <div className="bg-slate-100 p-4 rounded-lg border border-slate-300">
                    <p className="text-sm font-semibold text-slate-800 mb-2">Extracted Skills:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {skills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Roadmap Tab */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Data Engineer Roadmap</h2>
              <p className="text-slate-600">Based on your current skills and target role</p>
            </div>

            {sampleRoadmapData.map((skill, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Brain className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{skill.skill}</h3>
                      <p className="text-sm text-slate-500">{skill.level} • {skill.timeEstimate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">{skill.progress}%</p>
                      <p className="text-xs text-slate-500">{skill.resources} resources</p>
                    </div>
                    <div className="w-20 bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="ml-6 space-y-2">
                  {skill.children.map((child, childIndex) => (
                    <div key={childIndex} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Target className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{child.skill}</p>
                          <p className="text-xs text-slate-500">{child.level} • {child.timeEstimate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <p className="text-sm font-medium text-slate-700">{child.progress}%</p>
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${child.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Learning Progress</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                  <span className="text-sm font-medium text-slate-900">68%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className="bg-emerald-600 h-3 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {[
                  { title: 'Completed Python Pandas Tutorial', date: '2 days ago', icon: CheckCircle },
                  { title: 'Earned SQL Expert Badge', date: '1 week ago', icon: Award },
                  { title: 'Finished Docker Fundamentals', date: '2 weeks ago', icon: CheckCircle },
                ].map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{achievement.title}</p>
                        <p className="text-xs text-slate-500">{achievement.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Recommended Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Python for Data Science', type: 'Course', duration: '6 hours', rating: 4.8 },
                  { title: 'SQL Mastery Guide', type: 'Article', duration: '15 min read', rating: 4.9 },
                  { title: 'Docker Deep Dive', type: 'Video', duration: '2 hours', rating: 4.7 },
                  { title: 'FastAPI Tutorial', type: 'Course', duration: '4 hours', rating: 4.6 },
                ].map((resource, index) => (
                  <div
                    key={index}
                    className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-slate-900">{resource.title}</h4>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                        {resource.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{resource.duration}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{resource.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
