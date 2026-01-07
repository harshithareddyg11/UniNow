
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Logo from '../components/Logo';

const InputField = ({ label, name, type, value, onChange, placeholder }: { label: string, name: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }) => (
    <div>
       <label htmlFor={name} className="block text-sm font-medium text-slate-300">
           {label}
       </label>
       <div className="mt-1">
           <input
               id={name}
               name={name}
               type={type}
               required
               value={value}
               onChange={onChange}
               className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
               placeholder={placeholder}
           />
       </div>
   </div>
);

const SignUpPage: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent, isOrganizer: boolean) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError('');
        // In a real app, you'd register the user here.
        console.log('New user signed up:', { ...formData, isOrganizer });
        alert('Sign up successful! Please log in.');
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 p-4">
            <GlassCard className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <Logo className="h-12 w-12 mx-auto text-teal-400" />
                    <h2 className="mt-4 text-3xl font-extrabold text-white">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-slate-400">Join the UniNow community</p>
                </div>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <InputField label="Full Name" name="fullName" type="text" value={formData.fullName} onChange={handleChange} placeholder="Priya Sharma" />
                    <InputField label="Email address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@mbu.asia" />
                    <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="********" />
                    <InputField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="********" />
                    
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <div className="flex flex-col space-y-4 pt-4">
                         <Button type="submit" onClick={(e) => handleSubmit(e, false)} className="w-full">
                            Sign Up as Student
                         </Button>
                         <Button type="submit" onClick={(e) => handleSubmit(e, true)} variant="secondary" className="w-full">
                            Sign Up as Organizer
                         </Button>
                    </div>

                    <div className="text-center pt-2">
                        <p className="text-sm text-slate-400">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-teal-400 hover:text-teal-300">
                                Log in
                            </Link>
                        </p>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
};

export default SignUpPage;
