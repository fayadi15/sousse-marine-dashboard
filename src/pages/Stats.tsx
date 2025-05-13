import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Chart, { TooltipItem } from "chart.js/auto";

const Stats: React.FC = () => {
  const navigate = useNavigate();
  const delaiChartRef = useRef<HTMLCanvasElement>(null);
  const attenteChartRef = useRef<HTMLCanvasElement>(null);
  const circularChartRef = useRef<HTMLCanvasElement>(null);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  // Update date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Initialize charts
  useEffect(() => {
    if (
      delaiChartRef.current &&
      attenteChartRef.current &&
      circularChartRef.current
    ) {
      // Data for postes
      const postes = [
        { nom: "Poste 1", valeur: 51.29 },
        { nom: "Poste 2", valeur: 72.58 },
        { nom: "Poste 3", valeur: 88.57 },
        { nom: "Poste 4", valeur: 93.92 },
        { nom: "Poste 5", valeur: 79.41 },
        { nom: "Poste 6", valeur: 31.0 },
        { nom: "Poste 7", valeur: 59.74 },
        { nom: "Poste 7(1)", valeur: 56.21 },
        { nom: "Poste 7(2)", valeur: 63.05 },
      ];

      // Colors for each poste
      const colors = [
        "#8bc34a",
        "#4caf50",
        "#009688",
        "#00bcd4",
        "#03a9f4",
        "#2196f3",
        "#3f51b5",
        "#673ab7",
        "#9c27b0",
      ];

      // Délai moyen par type de navire
      const delaiChart = new Chart(delaiChartRef.current, {
        type: "bar",
        data: {
          labels: [
            "Conventionnels",
            "Porte conteneurs",
            "Vraquiers (L+S)",
            "Navires spéciaux",
          ],
          datasets: [
            {
              label: "Délai moyen (h)",
              data: [43.04, 28.63, 34.23, 0],
              backgroundColor: [
                "rgba(139, 195, 74, 0.7)",
                "rgba(255, 183, 77, 0.7)",
                "rgba(66, 165, 245, 0.7)",
                "rgba(156, 39, 176, 0.7)",
              ],
              borderColor: [
                "rgba(139, 195, 74, 1)",
                "rgba(255, 183, 77, 1)",
                "rgba(66, 165, 245, 1)",
                "rgba(156, 39, 176, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Heures",
              },
            },
          },
          plugins: {
            title: { display: false },
            legend: { display: false },
          },
        },
      });

      // Taux d'attente par type de navire
      const attenteChart = new Chart(attenteChartRef.current, {
        type: "bar",
        data: {
          labels: [
            "Porte conteneurs",
            "Vraquiers",
            "Conventionnels",
            "Navires spéciaux",
            "Total",
          ],
          datasets: [
            {
              label: "Taux d'attente (%)",
              data: [54.2, 71.4, 69.9, 3.7, 52.1],
              backgroundColor: [
                "rgba(255, 183, 77, 0.7)",
                "rgba(66, 165, 245, 0.7)",
                "rgba(139, 195, 74, 0.7)",
                "rgba(156, 39, 176, 0.7)",
                "rgba(55, 71, 79, 0.7)",
              ],
              borderColor: [
                "rgba(255, 183, 77, 1)",
                "rgba(66, 165, 245, 1)",
                "rgba(139, 195, 74, 1)",
                "rgba(156, 39, 176, 1)",
                "rgba(55, 71, 79, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Pourcentage (%)",
              },
              max: 100,
            },
          },
          plugins: {
            title: { display: false },
            legend: { display: false },
          },
        },
      });

      // Circular chart for séjour times
      const circularChart = new Chart(circularChartRef.current, {
        type: "doughnut",
        data: {
          labels: postes.map((poste) => poste.nom),
          datasets: [
            {
              label: "Temps de séjour (h/navire)",
              data: postes.map((poste) => poste.valeur),
              backgroundColor: colors,
              borderColor: colors,
              borderWidth: 1,
              hoverOffset: 15,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (context: TooltipItem<'doughnut'>) {
                  return `${context.label}: ${context.raw} h/navire`;
                },
              },
            },
          },
        },
      });

      return () => {
        delaiChart.destroy();
        attenteChart.destroy();
        circularChart.destroy();
      };
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <Button
        variant="ghost"
        className="mb-4 flex items-center gap-2 hover:bg-gray-200"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} />
        Retour au tableau de bord
      </Button>

      <div className="dashboard max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="dashboard-header bg-gray-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-medium">
            Tableau de bord - Gestion Portuaire
          </h1>
          <div>{currentDateTime}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
          <div className="bg-white rounded-lg p-4 shadow border-l-4 border-green-500">
            <h3 className="text-sm text-gray-600 mb-2">
              Tonnage manutentionné (total)
            </h3>
            <div className="text-2xl font-semibold text-gray-800">
              6 218 498,7 T
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow border-l-4 border-green-500">
            <h3 className="text-sm text-gray-600 mb-2">
              Total navires en attente
            </h3>
            <div className="text-2xl font-semibold text-gray-800">249</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow border-l-4 border-green-500">
            <h3 className="text-sm text-gray-600 mb-2">Taux d'attente moyen</h3>
            <div className="text-2xl font-semibold text-gray-800">52,1%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">
                Délai moyen par type de navire (h)
              </h3>
            </div>
            <div className="h-[300px] relative">
              <canvas ref={delaiChartRef}></canvas>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">
                Taux d'attente par type de navire (%)
              </h3>
            </div>
            <div className="h-[300px] relative">
              <canvas ref={attenteChartRef}></canvas>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow mx-5 mb-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">
              Répartition du temps de séjour par poste (h/navire)
            </h3>
          </div>
          <div className="flex justify-center h-[380px]">
            <canvas ref={circularChartRef}></canvas>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-5">
            {[
              { nom: "Poste 1", valeur: 51.29, color: "#8bc34a" },
              { nom: "Poste 2", valeur: 72.58, color: "#4caf50" },
              { nom: "Poste 3", valeur: 88.57, color: "#009688" },
              { nom: "Poste 4", valeur: 93.92, color: "#00bcd4" },
              { nom: "Poste 5", valeur: 79.41, color: "#03a9f4" },
              { nom: "Poste 6", valeur: 31.0, color: "#2196f3" },
              { nom: "Poste 7", valeur: 59.74, color: "#3f51b5" },
              { nom: "Poste 7(1)", valeur: 56.21, color: "#673ab7" },
              { nom: "Poste 7(2)", valeur: 63.05, color: "#9c27b0" },
            ].map((poste, index) => (
              <div key={index} className="flex items-center text-sm">
                <div
                  className="w-4 h-4 rounded mr-2"
                  style={{ backgroundColor: poste.color }}
                ></div>
                <span>
                  {poste.nom}: {poste.valeur} h/navire
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 pb-5">
          <h3 className="font-medium text-gray-800 mb-4">
            Taux de séjour par poste (TSM h/navire)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "Poste 1", value: 51.29, width: "55%" },
              { name: "Poste 2", value: 72.58, width: "77%" },
              { name: "Poste 3", value: 88.57, width: "94%" },
              { name: "Poste 4", value: 93.92, width: "100%" },
              { name: "Poste 5", value: 79.41, width: "85%" },
              { name: "Poste 6", value: 31.0, width: "33%" },
              { name: "Poste 7", value: 59.74, width: "64%" },
              { name: "Poste 7(1)", value: 56.21, width: "60%" },
              { name: "Poste 7(2)", value: 63.05, width: "67%" },
            ].map((poste, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm text-gray-600 mb-1">{poste.name}</h4>
                <p className="text-lg font-semibold text-gray-800">
                  {poste.value} h/navire
                </p>
                <div
                  className="relative h-[30px] bg-green-500 rounded mt-2"
                  style={{ width: poste.width }}
                >
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-sm font-medium">
                    {poste.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
