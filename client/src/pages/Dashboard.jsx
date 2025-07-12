import React, { useState, useEffect } from 'react';
import {
  Upload,
  Target,
  BookOpen,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [targetRole, setTargetRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [backendData, setBackendData] = useState({
    extractedText: '',
    skillText: '',
    jobSkills: [],
    matchedSkills: [],
    missingSkills: [],
  });
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

  const handleGenerateRoadmap = () => {
    if (file && targetRole) {
      console.log('Generating roadmap for:', targetRole, 'with file:', file.name);
    }
  };

  const extractSkills = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized. Please login again.');
      navigate('/login');
      return;
    }

    if (!file || !targetRole) {
      setError('Please upload a resume and enter a target role.');
      return;
    }

    setLoading(true);
    setError('');
    setSkills([]);
    setBackendData({
      extractedText: '',
      skillText: '',
      jobSkills: [],
      matchedSkills: [],
      missingSkills: [],
    });

    const formData = new FormData();
    formData.append('docx', file);
    formData.append('targetRole', targetRole);

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
        setSkills(data.matchedSkills || []);
        setBackendData({
          extractedText: data.extractedText || '',
          skillText: data.skillText || '',
          jobSkills: data.jobSkills || [],
          matchedSkills: data.matchedSkills || [],
          missingSkills: data.missingSkills || [],
        });
        handleGenerateRoadmap();
      } else {
        setError(data.error || 'Skill extraction failed');
      }
    } catch (err) {
      setError('Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'roadmap', label: 'My Roadmap', icon: Target },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'resources', label: 'Resources', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600 mb-8">Track your learning progress and manage your career roadmap</p>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-6">
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
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Generate New Roadmap</h2>

            {/* Upload Resume */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Upload Your Resume</label>
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100"
              >
                <Upload className="w-10 h-10 text-slate-400 mb-2" />
                <p className="text-sm text-slate-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-400">PDF, DOC, DOCX up to 10MB</p>
                {file && (
                  <p className="mt-2 text-sm text-emerald-600">{file.name} uploaded successfully</p>
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {/* Target Role */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target Role</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g. Frontend Developer, ML Engineer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={extractSkills}
                disabled={!file || loading}
                className={`px-4 py-2 rounded-md text-white font-medium ${
                  loading || !file
                    ? 'bg-emerald-300 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {loading ? 'Extracting...' : 'Extract Skills'}
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600">{error}</p>}

            {/* Full Backend Response */}
            {backendData.extractedText && (
              <div className="space-y-4">

                <div className="bg-green-50 p-4 rounded border border-green-300">
                  <h3 className="text-sm font-semibold text-green-800 mb-1">✅ Matched Skills</h3>
                  <ul className="list-disc list-inside text-green-700">
                    {backendData.matchedSkills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded border border-yellow-300">
                  <h3 className="text-sm font-semibold text-yellow-800 mb-1">🔍 Missing Skills</h3>
                  <ul className="list-disc list-inside text-yellow-700">
                    {backendData.missingSkills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-300">
                  <h3 className="text-sm font-semibold text-blue-800 mb-1">
                    🧠 Job Skills Required for "{targetRole}"
                  </h3>
                  <ul className="list-disc list-inside text-blue-700">
                    {backendData.jobSkills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
