import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, University, Mail, Hash, LogIn, UserPlus, Shield, Terminal } from 'lucide-react';
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
      <div className="min-h-screen bg-pattern flex items-center justify-center relative overflow-hidden">
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-400 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-pattern py-12 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 p-8 border-b border-white/10">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-blue-500/20 rounded-2xl mr-4">
                  {isLoginMode ? (
                    <LogIn className="text-blue-400" size={32} />
                  ) : (
                    <UserPlus className="text-blue-400" size={32} />
                  )}
                </div>
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gradient mb-2">
                    {isLoginMode ? 'Welcome Back' : 'Join Competition'}
                  </h1>
                  <p className="text-gray-300">
                    {isLoginMode 
                      ? 'Sign in to continue your coding journey' 
                      : 'Register for the Varsity Code Cup 2024'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              {errors.general && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl">
                  <div className="flex items-center">
                    <Shield size={18} className="mr-2" />
                    {errors.general}
                  </div>
                </div>
              )}

              {!isLoginMode && (
                <div className="mb-6">
                  <label htmlFor="name" className="block text-blue-400 font-semibold mb-3">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <User size={20} />
                    </span>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`input-field w-full pl-12 pr-4 py-4 rounded-2xl font-medium ${
                        errors.name ? 'border-red-500/50' : ''
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-blue-400 font-semibold mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input-field w-full pl-12 pr-4 py-4 rounded-2xl font-medium ${
                      errors.email ? 'border-red-500/50' : ''
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
              </div>
              
              {!isLoginMode && (
                <div className="mb-6">
                  <label htmlFor="university" className="block text-blue-400 font-semibold mb-3">
                    University
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <University size={20} />
                    </span>
                    <select
                      id="university"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className={`input-field w-full pl-12 pr-4 py-4 rounded-2xl appearance-none font-medium ${
                        errors.university ? 'border-red-500/50' : ''
                      }`}
                    >
                      <option value="">Select your university</option>
                      {universities.map((uni) => (
                        <option key={uni} value={uni} className="bg-gray-800 text-white">
                          {uni}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.university && <p className="text-red-400 text-sm mt-2">{errors.university}</p>}
                </div>
              )}
              
              <div className="mb-8">
                <label htmlFor="studentNumber" className="block text-blue-400 font-semibold mb-3">
                  Student Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <Hash size={20} />
                  </span>
                  <input
                    type="text"
                    id="studentNumber"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    className={`input-field w-full pl-12 pr-4 py-4 rounded-2xl font-medium ${
                      errors.studentNumber ? 'border-red-500/50' : ''
                    }`}
                    placeholder="Enter your student number"
                  />
                </div>
                {errors.studentNumber && <p className="text-red-400 text-sm mt-2">{errors.studentNumber}</p>}
              </div>
              
              <div className="mb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
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
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 underline underline-offset-4"
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