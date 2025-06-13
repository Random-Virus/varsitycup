import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, University, Mail, Hash, LogIn, UserPlus, Shield, Terminal, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerParticipant, loginParticipant, loading } = useApp();
  
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    university?: string;
    studentNumber?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const universities = [
    'Cape Peninsula University of Technology',
    'Central University of Technology',
    'Durban University of Technology',
    'Mangosuthu University of Technology',
    'Nelson Mandela University',
    'North-West University',
    'Rhodes University',
    'Sefako Makgatho Health Sciences University',
    'Sol Plaatje University',
    'Stellenbosch University',
    'Tshwane University of Technology',
    'University of Cape Town',
    'University of Fort Hare',
    'University of Johannesburg',
    'University of KwaZulu-Natal',
    'University of Limpopo',
    'University of Mpumalanga',
    'University of Pretoria',
    'University of South Africa',
    'University of the Free State',
    'University of the Western Cape',
    'University of the Witwatersrand',
    'University of Venda',
    'University of Zululand',
    'Vaal University of Technology',
    'Walter Sisulu University',
  ].sort();
  
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      university?: string;
      studentNumber?: string;
      general?: string;
    } = {};
    
    if (!isLoginMode && !name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!isLoginMode && !university) {
      newErrors.university = 'Please select your university';
    }
    
    if (!studentNumber.trim()) {
      newErrors.studentNumber = 'Student number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setErrors({});
      
      try {
        if (isLoginMode) {
          await loginParticipant(email.trim(), studentNumber.trim());
        } else {
          await registerParticipant({
            name: name.trim(),
            email: email.trim(),
            university,
            studentNumber: studentNumber.trim(),
          });
        }
        
        navigate('/dashboard');
      } catch (error) {
        console.error('Authentication error:', error);
        if (error instanceof Error) {
          setErrors({ general: error.message });
        } else {
          setErrors({ general: isLoginMode ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.' });
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrors({});
    setName('');
    setEmail('');
    setUniversity('');
    setStudentNumber('');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        </div>
        <div className="text-center relative z-10">
          <div className="w-16 h-16 loading-spinner mx-auto mb-4"></div>
          <p className="text-blue-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="vscode-card overflow-hidden animate-scaleIn shadow-xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b border-slate-200">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl mr-4">
                  {isLoginMode ? (
                    <LogIn className="text-blue-600" size={32} />
                  ) : (
                    <UserPlus className="text-blue-600" size={32} />
                  )}
                </div>
                <div className="text-center">
                  <h1 className="text-4xl font-bold gradient-text mb-2">
                    {isLoginMode ? 'Welcome Back' : 'Join Competition'}
                  </h1>
                  <p className="text-slate-600 font-medium">
                    {isLoginMode 
                      ? 'Sign in to continue your coding journey' 
                      : 'Register for the Varsity Code Cup 2024'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
                <Sparkles size={16} className="text-blue-500" />
                <span>Secure authentication powered by Firebase</span>
                <Shield size={16} className="text-green-500" />
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg animate-fadeIn">
                  <div className="flex items-center">
                    <Shield size={18} className="mr-2" />
                    {errors.general}
                  </div>
                </div>
              )}

              {!isLoginMode && (
                <div className="mb-6">
                  <label htmlFor="name" className="block text-slate-700 font-semibold mb-3">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                      <User size={20} />
                    </span>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`vscode-input w-full pl-12 pr-4 py-3 ${
                        errors.name ? 'border-red-300 focus:border-red-500' : ''
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="text-red-600 text-sm mt-2 animate-fadeIn">{errors.name}</p>}
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-slate-700 font-semibold mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`vscode-input w-full pl-12 pr-4 py-3 ${
                      errors.email ? 'border-red-300 focus:border-red-500' : ''
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && <p className="text-red-600 text-sm mt-2 animate-fadeIn">{errors.email}</p>}
              </div>
              
              {!isLoginMode && (
                <div className="mb-6">
                  <label htmlFor="university" className="block text-slate-700 font-semibold mb-3">
                    University
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                      <University size={20} />
                    </span>
                    <select
                      id="university"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className={`vscode-select w-full pl-12 pr-4 py-3 ${
                        errors.university ? 'border-red-300 focus:border-red-500' : ''
                      }`}
                    >
                      <option value="">Select your university</option>
                      {universities.map((uni) => (
                        <option key={uni} value={uni}>
                          {uni}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.university && <p className="text-red-600 text-sm mt-2 animate-fadeIn">{errors.university}</p>}
                </div>
              )}
              
              <div className="mb-8">
                <label htmlFor="studentNumber" className="block text-slate-700 font-semibold mb-3">
                  Student Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <Hash size={20} />
                  </span>
                  <input
                    type="text"
                    id="studentNumber"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    className={`vscode-input w-full pl-12 pr-4 py-3 ${
                      errors.studentNumber ? 'border-red-300 focus:border-red-500' : ''
                    }`}
                    placeholder="Enter your student number"
                  />
                </div>
                {errors.studentNumber && <p className="text-red-600 text-sm mt-2 animate-fadeIn">{errors.studentNumber}</p>}
              </div>
              
              <div className="mb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full py-3 text-lg font-semibold hover-lift ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Terminal size={20} className="mr-2" />
                    {isSubmitting 
                      ? (isLoginMode ? 'Signing In...' : 'Registering...') 
                      : (isLoginMode ? 'Sign In' : 'Register Now')
                    }
                  </div>
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 underline underline-offset-4"
                >
                  {isLoginMode 
                    ? "Don't have an account? Register here" 
                    : "Already registered? Sign in here"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;