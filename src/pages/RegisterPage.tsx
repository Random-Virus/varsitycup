import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, CaseSensitive as University, Mail, Hash, LogIn, UserPlus, Shield, Terminal } from 'lucide-react';
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
      newErrors.name = 'Identity required for system access';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Communication protocol required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid communication format';
    }
    
    if (!isLoginMode && !university) {
      newErrors.university = 'Institution affiliation required';
    }
    
    if (!studentNumber.trim()) {
      newErrors.studentNumber = 'Access code required';
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
          setErrors({ general: isLoginMode ? 'Access denied. Verify credentials.' : 'Registration failed. System error.' });
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
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 font-orbitron">INITIALIZING SYSTEM...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black py-12 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-matrix animate-matrix opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-red-900/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="cyber-card rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-900/50 to-red-900/50 p-8 border-b border-cyan-400/30">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-cyan-400/10 rounded-full border border-cyan-400/30 mr-4">
                  {isLoginMode ? (
                    <LogIn className="text-cyan-400" size={32} />
                  ) : (
                    <UserPlus className="text-cyan-400" size={32} />
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-orbitron font-bold text-cyan-400 text-glow-cyan">
                    {isLoginMode ? 'SYSTEM ACCESS' : 'USER REGISTRATION'}
                  </h1>
                  <p className="text-gray-300 font-rajdhani">
                    {isLoginMode 
                      ? 'Authenticate to enter the digital arena' 
                      : 'Initialize your profile for competition entry'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              {errors.general && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg font-rajdhani">
                  <div className="flex items-center">
                    <Shield size={18} className="mr-2" />
                    {errors.general}
                  </div>
                </div>
              )}

              {!isLoginMode && (
                <div className="mb-6">
                  <label htmlFor="name" className="block text-cyan-400 font-orbitron font-bold mb-3 text-sm">
                    IDENTITY MATRIX
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-cyan-400/60">
                      <User size={20} />
                    </span>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`cyber-input w-full pl-12 pr-4 py-3 rounded-lg font-rajdhani ${
                        errors.name ? 'border-red-500/50' : ''
                      }`}
                      placeholder="Enter your full designation"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-sm mt-2 font-rajdhani">{errors.name}</p>}
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-cyan-400 font-orbitron font-bold mb-3 text-sm">
                  COMMUNICATION PROTOCOL
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-cyan-400/60">
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`cyber-input w-full pl-12 pr-4 py-3 rounded-lg font-rajdhani ${
                      errors.email ? 'border-red-500/50' : ''
                    }`}
                    placeholder="Enter communication address"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm mt-2 font-rajdhani">{errors.email}</p>}
              </div>
              
              {!isLoginMode && (
                <div className="mb-6">
                  <label htmlFor="university" className="block text-cyan-400 font-orbitron font-bold mb-3 text-sm">
                    INSTITUTION NETWORK
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-cyan-400/60">
                      <University size={20} />
                    </span>
                    <select
                      id="university"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className={`cyber-input w-full pl-12 pr-4 py-3 rounded-lg appearance-none font-rajdhani ${
                        errors.university ? 'border-red-500/50' : ''
                      }`}
                    >
                      <option value="">Select your institution</option>
                      {universities.map((uni) => (
                        <option key={uni} value={uni} className="bg-black text-cyan-400">
                          {uni}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.university && <p className="text-red-400 text-sm mt-2 font-rajdhani">{errors.university}</p>}
                </div>
              )}
              
              <div className="mb-8">
                <label htmlFor="studentNumber" className="block text-cyan-400 font-orbitron font-bold mb-3 text-sm">
                  ACCESS CODE
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-cyan-400/60">
                    <Hash size={20} />
                  </span>
                  <input
                    type="text"
                    id="studentNumber"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    className={`cyber-input w-full pl-12 pr-4 py-3 rounded-lg font-rajdhani ${
                      errors.studentNumber ? 'border-red-500/50' : ''
                    }`}
                    placeholder="Enter your access identifier"
                  />
                </div>
                {errors.studentNumber && <p className="text-red-400 text-sm mt-2 font-rajdhani">{errors.studentNumber}</p>}
              </div>
              
              <div className="mb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`cyber-button w-full py-4 rounded-lg font-orbitron font-bold text-lg transition-all duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Terminal size={20} className="mr-2" />
                    {isSubmitting 
                      ? (isLoginMode ? 'AUTHENTICATING...' : 'REGISTERING...') 
                      : (isLoginMode ? 'AUTHENTICATE' : 'INITIALIZE')
                    }
                  </div>
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-cyan-400 hover:text-cyan-300 font-rajdhani font-medium transition-colors duration-300 border-b border-cyan-400/30 hover:border-cyan-300/50"
                >
                  {isLoginMode 
                    ? "Need system access? Initialize new profile" 
                    : "Already registered? Access existing profile"
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