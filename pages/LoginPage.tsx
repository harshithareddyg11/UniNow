import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { signIn } from "../lib/auth";

interface LoginPageProps {
  onLogin: (isOrganizer: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ NOW email & password are in scope
  const handleLogin = async (isOrganizer: boolean) => {
    setError("");

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      return;
    }

    onLogin(isOrganizer);
    navigate(isOrganizer ? "/organizer" : "/student-dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <GlassCard>
        <Logo className="mx-auto mb-6 h-16 w-16" />

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded"
          />

          <Button onClick={() => handleLogin(false)}>
            Login as Student
          </Button>

          <Button onClick={() => handleLogin(true)}>
            Login as Organizer
          </Button>
        </form>

        <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-teal-400">
            Sign up
          </Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default LoginPage;
