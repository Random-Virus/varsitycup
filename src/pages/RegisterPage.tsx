import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, University, Mail, Hash, LogIn, UserPlus, Shield, Terminal, Lock } from 'lucide-react';
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
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden modern-grid">
        <div className="text-center relative z-10">
          <div className="w-8 h-8 modern-spinner mx-auto mb-2"></div>
          <p className="text-white font-semibold text-sm">Initializing system...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black py-6 relative overflow-hidden">
      {/* Modern background */}
      <div className="absolute inset-0 modern-grid"></div>

      <div className="container mx-auto px-3 relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="modern-card overflow-hidden animate-scaleIn shadow-2xl">
            <div className="bg-black/90 p-4 border-b border-white/10">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-white/10 rounded mr-2">
                  {isLoginMode ? (
                    <LogIn className="text-white" size={16} />
                  ) : (
                    <UserPlus className="text-white" size={16} />
                  )}
                </div>
                <div className="text-center">
                  <h1 className="text-xl font-bold modern-gradient-text mb-1 font-display">
                    {isLoginMode ? 'SYSTEM ACCESS' : 'JOIN NETWORK'}
                  </h1>
                  <p className="text-white/60 font-semibold text-xs">
                    {isLoginMode 
                      ? 'Authenticate to continue your coding journey' 
                      : 'Register for the Varsity Code Cup 2024'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-1 text-xs text-white/60">
                <Shield size={10} className="text-white" />
                <span className="font-semibold">Secure authentication powered by Firebase</span>
                <Lock size={10} className="text-white" />
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              {errors.general && (
                <div className="mb-3 p-2 bg-white/10 border border-white/30 text-white rounded animate-fadeIn">
                  <div className="flex items-center">
                    <Shield size={12} className="mr-1" />
                    <span className="font-semibold text-xs">{errors.general}</span>
                  </div>
                </div>
              )}

              {!isLoginMode && (
                <div className="mb-3">
                  <label htmlFor="name" className="block text-white font-semibold mb-1 text-xs">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-white/60">
                      <User size={12} />
                    </span>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`modern-input w-full pl-6 pr-2 py-2 text-xs ${
                        errors.name ? 'border-white/50' : ''
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="text-white text-xs mt-1 animate-fadeIn">{errors.name}</p>}
                </div>
              )}
              
              <div className="mb-3">
                <label htmlFor="email" className="block text-white font-semibold mb-1 text-xs">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-white/60">
                    <Mail size={12} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`modern-input w-full pl-6 pr-2 py-2 text-xs ${
                      errors.email ? 'border-white/50' : ''
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && <p className="text-white text-xs mt-1 animate-fadeIn">{errors.email}</p>}
              </div>
              
              {!isLoginMode && (
                <div className="mb-3">
                  <label htmlFor="university" className="block text-white font-semibold mb-1 text-xs">
                    University
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-white/60">
                      <University size={12} />
                    </span>
                    <select
                      id="university"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className={`modern-select w-full pl-6 pr-2 py-2 text-xs ${
                        errors.university ? 'border-white/50' : ''
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
                  {errors.university && <p className="text-white text-xs mt-1 animate-fadeIn">{errors.university}</p>}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="studentNumber" className="block text-white font-semibold mb-1 text-xs">
                  Student Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-white/60">
                    <Hash size={12} />
                  </span>
                  <input
                    type="text"
                    id="studentNumber"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    className={`modern-input w-full pl-6 pr-2 py-2 text-xs ${
                      errors.studentNumber ? 'border-white/50' : ''
                    }`}
                    placeholder="Enter your student number"
                  />
                </div>
                {errors.studentNumber && <p className="text-white text-xs mt-1 animate-fadeIn">{errors.studentNumber}</p>}
              </div>
              
              <div className="mb-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`modern-button w-full py-2 text-sm font-semibold hover-lift ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Terminal size={12} className="mr-1" />
                    {isSubmitting 
                      ? (isLoginMode ? 'Authenticating...' : 'Registering...') 
                      : (isLoginMode ? 'Access System' : 'Join Network')
                    }
                  </div>
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-white hover:text-white/80 font-semibold transition-colors duration-200 underline underline-offset-4 text-xs"
                >
                  {isLoginMode 
                    ? "Don't have an account? Register here" 
                    : "Already registered? Access system"
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