import React from "react";

interface LoadingOverlayProps {
  visible: boolean;
  children?: React.ReactNode;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  children,
}) => {
  return (
    <div className="relative">
      {children}
      {visible && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#000000]/60 backdrop-blur-sm z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};
