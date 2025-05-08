
import React from 'react';

interface OMMPLogoProps {
  className?: string;
  showText?: boolean;
}

const OMMPLogo: React.FC<OMMPLogoProps> = ({ className = "", showText = true }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/57dfd3c6-189d-4b7a-9971-97a79b8d7733.png" 
        alt="OMMP Logo" 
        className="h-16 w-auto" 
      />
      {showText && (
        <h1 className="ml-4 text-xl font-semibold text-white">
          Office de la Marine Marchande et des Ports Sousse
        </h1>
      )}
    </div>
  );
};

export default OMMPLogo;
