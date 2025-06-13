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
      <div className="min-h-screen bg-vscode-dark flex items-center justify-center relative overflow-hidden">
        <div className="text-center relative z-10">
          <div className="w-16 h-16 loading-spinner mx-auto mb-4"></div>
          <p className="text-vscode-blue font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-vscode-dark py-12 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="vscode-card overflow-hidden animate-scaleIn">
            <div className="bg-vscode-panel p-8 border-b border-vscode">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-vscode-blue/20 rounded mr-4">
                  {isLoginMode ? (
                    <LogIn className="text-vscode-blue" size={32} />
                  ) : (
                    <UserPlus className="text-vscode-blue" size={32} />
                  )}
                </div>
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-vscode-blue mb-2">
                    {isLoginMode ? 'Welcome Back' : 'Join Competition'}
                  </h1>
                  <p className="text-vscode-foreground">
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
                <div className="mb-6 p-4 bg-vscode-red/10 border border-vscode-red text-vscode-red rounded animate-fadeIn">
                  <div className="flex items-center">
                    <Shield size={18} className="mr-2" />
                    {errors.general}
                  </div>
                </div>
              )}

              {!isLoginMode && (
                <div className="mb-6">
                  <label htmlFor="name" className="block text-vscode-blue font-medium mb-3">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-vscode-comment">
                      <User size={20} />
                    </span>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`vscode-input w-full pl-10 pr-4 py-3 ${
                        errors.name ? 'border-vscode-red' : ''
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="text-vscode-red text-sm mt-2 animate-fadeIn">{errors.name}</p>}
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-vscode-blue font-medium mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-vscode-comment">
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`vscode-input w-full pl-10 pr-4 py-3 ${
                      errors.email ? 'border-vscode-red' : ''
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && <p className="text-vscode-red text-sm mt-2 animate-fadeIn">{errors.email}</p>}
              </div>
              
              {!isLoginMode && (
                <div className="mb-6">
                  <label htmlFor="university" className="block text-vscode-blue font-medium mb-3">
                    University
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-vscode-comment">
                      <University size={20} />
                    </span>
                    <select
                      id="university"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className={`vscode-select w-full pl-10 pr-4 py-3 ${
                        errors.university ? 'border-vscode-red' : ''
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
                  {errors.university && <p className="text-vscode-red text-sm mt-2 animate-fadeIn">{errors.university}</p>}
                </div>
              )}
              
              <div className="mb-8">
                <label htmlFor="studentNumber" className="block text-vscode-blue font-medium mb-3">
                  Student Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-vscode-comment">
                    <Hash size={20} />
                  </span>
                  <input
                    type="text"
                    id="studentNumber"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    className={`vscode-input w-full pl-10 pr-4 py-3 ${
                      errors.studentNumber ? 'border-vscode-red' : ''
                    }`}
                    placeholder="Enter your student number"
                  />
                </div>
                {errors.studentNumber && <p className="text-vscode-red text-sm mt-2 animate-fadeIn">{errors.studentNumber}</p>}
              </div>
              
              <div className="mb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`vscode-button w-full py-3 text-lg font-medium hover-lift ${
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
                  className="text-vscode-blue hover:text-white font-medium transition-colors duration-200 underline underline-offset-4"
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