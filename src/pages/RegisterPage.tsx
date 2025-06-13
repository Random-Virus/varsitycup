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
      newErrors.name = 'FULL NAME IS REQUIRED';
    }
    
    if (!email.trim()) {
      newErrors.email = 'EMAIL ADDRESS IS REQUIRED';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'PLEASE ENTER A VALID EMAIL ADDRESS';
    }
    
    if (!isLoginMode && !university) {
      newErrors.university = 'PLEASE SELECT YOUR UNIVERSITY';
    }
    
    if (!studentNumber.trim()) {
      newErrors.studentNumber = 'STUDENT NUMBER IS REQUIRED';
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
          setErrors({ general: error.message.toUpperCase() });
        } else {
          setErrors({ general: isLoginMode ? 'LOGIN FAILED. PLEASE CHECK YOUR CREDENTIALS.' : 'REGISTRATION FAILED. PLEASE TRY AGAIN.' });
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
      <div className="min-h-screen bg-vscode-dark flex items-center justify-center relative overflow-hidden matrix-bg">
        <div className="absolute inset-0 scanlines"></div>
        <div className="text-center relative z-10">
          <div className="w-16 h-16 loading-spinner mx-auto mb-4"></div>
          <p className="text-white font-bold font-display tracking-wider">INITIALIZING SYSTEM...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-vscode-dark py-12 relative overflow-hidden">
      {/* Futuristic background */}
      <div className="absolute inset-0 matrix-bg"></div>
      <div className="absolute inset-0 scanlines"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="vscode-card overflow-hidden animate-scaleIn shadow-2xl terminal">
            <div className="bg-black/90 p-8 border-b border-white/10 pt-12">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-white/10 mr-4">
                  {isLoginMode ? (
                    <LogIn className="text-white" size={32} />
                  ) : (
                    <UserPlus className="text-white" size={32} />
                  )}
                </div>
                <div className="text-center">
                  <h1 className="text-4xl font-bold gradient-text mb-2 font-display">
                    {isLoginMode ? 'SYSTEM ACCESS' : 'JOIN NETWORK'}
                  </h1>
                  <p className="text-white/60 font-bold font-display tracking-wider">
                    {isLoginMode 
                      ? 'AUTHENTICATE TO CONTINUE YOUR CODING JOURNEY' 
                      : 'REGISTER FOR THE VARSITY CODE CUP 2024'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-white/60">
                <Shield size={16} className="text-white" />
                <span className="font-display tracking-wider">SECURE AUTHENTICATION POWERED BY FIREBASE</span>
                <Lock size={16} className="text-white" />
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              {errors.general && (
                <div className="mb-6 p-4 bg-white/10 border border-white/30 text-white animate-fadeIn">
                  <div className="flex items-center">
                    <Shield size={18} className="mr-2" />
                    <span className="font-display tracking-wider">{errors.general}</span>
                  </div>
                </div>
              )}

              {!isLoginMode && (
                <div className="mb-6">
                  <label htmlFor="name" className="block text-white font-bold mb-3 font-display tracking-wider">
                    FULL NAME
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/60">
                      <User size={20} />
                    </span>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`vscode-input w-full pl-12 pr-4 py-3 ${
                        errors.name ? 'border-white' : ''
                      }`}
                      placeholder="ENTER YOUR FULL NAME"
                    />
                  </div>
                  {errors.name && <p className="text-white text-sm mt-2 animate-fadeIn font-display tracking-wider">{errors.name}</p>}
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-white font-bold mb-3 font-display tracking-wider">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/60">
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`vscode-input w-full pl-12 pr-4 py-3 ${
                      errors.email ? 'border-white' : ''
                    }`}
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                  />
                </div>
                {errors.email && <p className="text-white text-sm mt-2 animate-fadeIn font-display tracking-wider">{errors.email}</p>}
              </div>
              
              {!isLoginMode && (
                <div className="mb-6">
                  <label htmlFor="university" className="block text-white font-bold mb-3 font-display tracking-wider">
                    UNIVERSITY
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/60">
                      <University size={20} />
                    </span>
                    <select
                      id="university"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className={`vscode-select w-full pl-12 pr-4 py-3 ${
                        errors.university ? 'border-white' : ''
                      }`}
                    >
                      <option value="">SELECT YOUR UNIVERSITY</option>
                      {universities.map((uni) => (
                        <option key={uni} value={uni}>
                          {uni}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.university && <p className="text-white text-sm mt-2 animate-fadeIn font-display tracking-wider">{errors.university}</p>}
                </div>
              )}
              
              <div className="mb-8">
                <label htmlFor="studentNumber" className="block text-white font-bold mb-3 font-display tracking-wider">
                  STUDENT NUMBER
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/60">
                    <Hash size={20} />
                  </span>
                  <input
                    type="text"
                    id="studentNumber"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    className={`vscode-input w-full pl-12 pr-4 py-3 ${
                      errors.studentNumber ? 'border-white' : ''
                    }`}
                    placeholder="ENTER YOUR STUDENT NUMBER"
                  />
                </div>
                {errors.studentNumber && <p className="text-white text-sm mt-2 animate-fadeIn font-display tracking-wider">{errors.studentNumber}</p>}
              </div>
              
              <div className="mb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`vscode-button w-full py-3 text-lg font-bold hover-lift ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Terminal size={20} className="mr-2" />
                    {isSubmitting 
                      ? (isLoginMode ? 'AUTHENTICATING...' : 'REGISTERING...') 
                      : (isLoginMode ? 'ACCESS SYSTEM' : 'JOIN NETWORK')
                    }
                  </div>
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-white hover:text-white/80 font-bold transition-colors duration-200 underline underline-offset-4 font-display tracking-wider"
                >
                  {isLoginMode 
                    ? "DON'T HAVE ACCESS? REGISTER HERE" 
                    : "ALREADY REGISTERED? ACCESS SYSTEM"
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