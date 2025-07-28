import React from "react";

const MovingGradientBackground = () => (
  <div className="fixed inset-0 -z-10">
    <div
      className="
        w-full h-full animate-gradient-move 
        bg-[linear-gradient(120deg,#0e0e11_0%,#232313_35%,#ffe066_100%)]
        opacity-90
      "
    />
  </div>
);

export default MovingGradientBackground;
