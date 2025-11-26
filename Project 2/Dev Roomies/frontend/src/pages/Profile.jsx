import React, { useState, useEffect } from "react";
import API from "../services/api";
import PageLayout from "../components/PageLayout";

export default function Profile({ token }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    skills: "",
    timezone: "",
    goals: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile/me");
        setUser({
          ...res.data,
          skills: res.data.skills ? res.data.skills.join(", ") : "",
        });
      } catch (err) {
        console.error("Fetch profile error:", err.response?.data);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...user,
        skills: user.skills.split(",").map((s) => s.trim()),
      };

      const res = await API.put("/profile/me", payload);
      setMessage("Profile updated!");
      setUser({
        ...res.data,
        skills: res.data.skills.join(", "),
      });
    } catch (err) {
      console.error("Update error:", err.response?.data);
    }

    setLoading(false);
  };

  return (
    <PageLayout>
      <form className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

        <input
          name="name"
          className="border p-2 w-full mb-4"
          value={user.name}
          onChange={handleChange}
        />

        <input
          name="email"
          disabled
          className="border p-2 w-full mb-4 bg-gray-100"
          value={user.email}
        />

        <input
          name="skills"
          className="border p-2 w-full mb-4"
          value={user.skills}
          onChange={handleChange}
          placeholder="React, Node, JavaScript"
        />

        <input
          name="timezone"
          className="border p-2 w-full mb-4"
          value={user.timezone}
          onChange={handleChange}
        />

        <textarea
          name="goals"
          className="border p-2 w-full mb-4"
          value={user.goals}
          onChange={handleChange}
        />

        <button
          className="w-full bg-purple-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>

        {message && <p className="text-green-600 mt-3">{message}</p>}
      </form>
    </PageLayout>
  );
}
