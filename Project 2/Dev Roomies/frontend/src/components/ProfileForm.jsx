import React, { useState, useEffect } from "react";
import API, { setAuthToken } from "../services/api";

export default function ProfileForm({ token }) {
  const [form, setForm] = useState({ skills: "", timezone: "", goals: "" });

  useEffect(() => { setAuthToken(token); }, [token]);

  const handleSubmit = async e => {
    e.preventDefault();
    const skillsArr = form.skills.split(",").map(s => s.trim());
    const res = await API.put("/profile", { ...form, skills: skillsArr });
    alert("Profile updated!");
  };

  return (
    
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <input className="border p-2 w-full" placeholder="Skills (comma separated)" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Timezone" value={form.timezone} onChange={e => setForm({ ...form, timezone: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Goals" value={form.goals} onChange={e => setForm({ ...form, goals: e.target.value })} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
