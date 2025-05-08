import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from '../contexts/AuthContext';
import OMMPLogo from '../components/OMMPLogo';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: 'url("/lovable-uploads/bd7a3e0d-5b7a-46e6-a49a-ee760c1aac41.png")' }}>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="absolute top-5 left-5 z-10">
        <OMMPLogo />
      </div>
      
      <Card className="w-full max-w-md p-8 z-10 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Tableau de Bord</h2>
          <p className="text-gray-200 mt-2">Le port de Sousse</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-white">
              Nom d'utilisateur:
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-white/20 border-white/30 text-white placeholder:text-gray-300"
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-white">
              Mot de passe:
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/20 border-white/30 text-white placeholder:text-gray-300"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Connecter"}
            </Button>
          </div>
        </form>
      </Card>
      
      <div className="absolute bottom-4 text-white/70 text-sm z-10">
        &copy; 2025 Office de la Marine Marchande et des Ports Sousse
      </div>
    </div>
  );
};

export default Login;
