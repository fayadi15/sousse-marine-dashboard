
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from '../contexts/AuthContext';
import OMMPLogo from '../components/OMMPLogo';
import { BarChart, Ship, MapPin } from 'lucide-react';

const Dashboard = () => {
  const { username, logout } = useAuth();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-900 to-blue-950">
      <header className="bg-blue-800 shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <OMMPLogo />
            <div>
              <h1 className="text-2xl font-bold text-white">Tableau de Bord</h1>
              <p className="text-blue-100">Port de Sousse</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-white">
              <span className="text-blue-200">Utilisateur: </span>
              <span className="font-medium">{username}</span>
            </div>
            <Button 
              variant="destructive" 
              onClick={logout} 
              className="bg-red-600 hover:bg-red-700"
            >
              Déconnecter
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Bienvenue, {username}</h2>
          <p className="text-blue-200 text-xl">Suivi des indicateurs de performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-700 to-blue-800 border-blue-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Indicateurs globaux de performance</h3>
              <BarChart size={28} className="text-blue-200" />
            </div>
            <p className="text-blue-100 mb-4">Visualisez et analysez les indicateurs clés de performance du port</p>
            <Button className="w-full bg-white text-blue-800 hover:bg-blue-50">
              Accéder aux indicateurs
            </Button>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-700 to-blue-800 border-blue-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Suivi des escales par quai</h3>
              <MapPin size={28} className="text-blue-200" />
            </div>
            <p className="text-blue-100 mb-4">Consultez le statut et les détails des escales par emplacement de quai</p>
            <Button className="w-full bg-white text-blue-800 hover:bg-blue-50">
              Voir les escales par quai
            </Button>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-700 to-blue-800 border-blue-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Suivi des escales par type de navires</h3>
              <Ship size={28} className="text-blue-200" />
            </div>
            <p className="text-blue-100 mb-4">Analysez les escales en fonction des différents types de navires</p>
            <Button className="w-full bg-white text-blue-800 hover:bg-blue-50">
              Voir par type de navires
            </Button>
          </Card>
        </div>

        <div className="mt-10">
          <Card className="p-6 bg-blue-800/50 border-blue-700">
            <h3 className="text-xl font-semibold text-white mb-4">Aperçu de l'activité portuaire</h3>
            <div className="aspect-video bg-blue-900/50 rounded-md flex items-center justify-center">
              <img 
                src="/lovable-uploads/5d6d793c-1907-44d4-b6b0-13e7c6532d98.png" 
                alt="Port de Sousse" 
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </Card>
        </div>
      </main>

      <footer className="mt-auto py-4 bg-blue-900 text-blue-200 text-center">
        <div className="max-w-7xl mx-auto">
          <p>&copy; 2025 Office de la Marine Marchande et des Ports Sousse. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
