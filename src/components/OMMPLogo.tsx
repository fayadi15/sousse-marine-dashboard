
import React from 'react';

interface OMMPLogoProps {
  className?: string;
}

const OMMPLogo: React.FC<OMMPLogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/57dfd3c6-189d-4b7a-9971-97a79b8d7733.png" 
        alt="OMMP Logo" 
        className="h-16 w-auto" 
      />
    </div>
  );
};

export default OMMPLogo;
