import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import OMMPLogo from "../components/OMMPLogo";
import { BarChart, Ship, MapPin } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { username, logout } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url("/lovable-uploads/6d92b2dc-a7d1-493d-a81f-dc1647dc5c78.png")',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <header className="absolute top-0 left-0 right-0 bg-blue-900/80 shadow-md p-4 z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
          <OMMPLogo
            className={isMobile ? "mb-2 w-full justify-center" : ""}
            showText={!isMobile}
          />

          <div
            className={`flex items-center gap-4 ${
              isMobile ? "w-full justify-center mt-2" : ""
            }`}
          >
            <div className="text-white">
              <span className="text-blue-200">Utilisateur: </span>
              <span className="font-medium">{username}</span>
            </div>
            <Button
              variant="destructive"
              onClick={logout}
              className="bg-red-600 hover:bg-red-700"
              size={isMobile ? "sm" : "default"}
            >
              Déconnecter
            </Button>
          </div>
        </div>
      </header>

      <main className="z-10 w-full max-w-5xl px-4 fade-in">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Tableau de Bord Maritime
          </h1>
          <p className="text-xl text-blue-200">Port de Sousse</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Button
            className="flex flex-col items-center justify-center p-6 md:p-8 h-auto bg-blue-700/80 hover:bg-blue-800/90 text-white border border-blue-500 shadow-lg transition-all"
            onClick={() => navigate("/stats")}
          >
            <BarChart size={isMobile ? 36 : 48} className="mb-4" />
            <span className="text-sm md:text-lg font-semibold text-center break-words hyphens-auto">
              Indicateurs globaux de performance
            </span>
          </Button>

          <Button
            className="flex flex-col items-center justify-center p-6 md:p-8 h-auto bg-blue-700/80 hover:bg-blue-800/90 text-white border border-blue-500 shadow-lg transition-all"
            onClick={() => console.log("Escales par quai clicked")}
          >
            <MapPin size={isMobile ? 36 : 48} className="mb-4" />
            <span className="text-sm md:text-lg font-semibold text-center break-words hyphens-auto">
              Suivi des escales par quai
            </span>
          </Button>

          <Button
            className="flex flex-col items-center justify-center p-6 md:p-8 h-auto bg-blue-700/80 hover:bg-blue-800/90 text-white border border-blue-500 shadow-lg transition-all md:col-span-2 lg:col-span-1 mx-auto lg:mx-0 w-full"
            onClick={() => console.log("Types de navires clicked")}
          >
            <Ship size={isMobile ? 36 : 48} className="mb-4" />
            <span className="text-sm md:text-lg font-semibold text-center break-words hyphens-auto">
              Suivi des escales par type de navires
            </span>
          </Button>
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 py-4 bg-blue-900/80 text-blue-200 text-center z-10">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm md:text-base">
            &copy; 2025 Office de la Marine Marchande et des Ports Sousse. Tous
            droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
