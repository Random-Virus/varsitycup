import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, CaseSensitive as University, Mail, Hash, LogIn, UserPlus } from 'lucide-react';
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
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!isLoginMode && !university) {
      newErrors.university = 'University is required';
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
          setErrors({ general: isLoginMode ? 'Login failed. Please try again.' : 'Registration failed. Please try again.' });
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-black p-6 text-white">
            <h1 className="text-2xl font-bold flex items-center">
              {isLoginMode ? (
                <>
                  <LogIn className="mr-2" /> Student Login
                </>
              ) : (
                <>
                  <UserPlus className="mr-2" /> Student Registration
                </>
              )}
            </h1>
            <p className="text-gray-300">
              {isLoginMode 
                ? 'Login to access the Varsity Code Cup' 
                : 'Register for the Varsity Code Cup'
              }
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            {errors.general && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.general}
              </div>
            )}

            {!isLoginMode && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-black'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-black'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            {!isLoginMode && (
              <div className="mb-4">
                <label htmlFor="university" className="block text-gray-700 font-medium mb-2">
                  University
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <University size={18} />
                  </span>
                  <select
                    id="university"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 appearance-none bg-white ${
                      errors.university ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-black'
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
                {errors.university && <p className="text-red-500 text-sm mt-1">{errors.university}</p>}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="studentNumber" className="block text-gray-700 font-medium mb-2">
                Student Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <Hash size={18} />
                </span>
                <input
                  type="text"
                  id="studentNumber"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.studentNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-black'
                  }`}
                  placeholder="Enter your student number"
                />
              </div>
              {errors.studentNumber && <p className="text-red-500 text-sm mt-1">{errors.studentNumber}</p>}
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded-lg font-medium transition ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                {isSubmitting 
                  ? (isLoginMode ? 'Logging in...' : 'Registering...') 
                  : (isLoginMode ? 'Login' : 'Register')
                }
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={toggleMode}
                className="text-black hover:text-gray-700 underline"
              >
                {isLoginMode 
                  ? "Don't have an account? Register here" 
                  : "Already have an account? Login here"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;