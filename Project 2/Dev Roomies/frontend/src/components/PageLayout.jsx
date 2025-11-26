// client/src/components/PageLayout.jsx
import React from "react";

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-pink-100">
      {children}
    </div>
  );
}
