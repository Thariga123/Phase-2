import React from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <PageLayout>
      <div className="text-center bg-white shadow-lg rounded-lg p-10 max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6 text-purple-700">
          Welcome to DevRoomies
        </h1>
        <p className="text-gray-700 mb-8">
          Find the perfect remote collaborator or project buddy and build amazing things together!
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition text-lg font-semibold cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </PageLayout>
  );
}
