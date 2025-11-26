import React, { useEffect, useState } from "react";
import API, { setAuthToken } from "../services/api";
import ChatBox from "../components/ChatBox";
import PageLayout from "../components/PageLayout";

export default function Matches({ token }) {
  const [matches, setMatches] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    setAuthToken(token);
    API.get("/match").then((res) => setMatches(res.data));
  }, [token]);

  return (
    <PageLayout>
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Matches</h2>
      {matches.map((m) => (
        <div
          key={m._id}
          className="border p-2 mb-2 rounded shadow cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedRoom(m._id)}
        >
          <p><strong>{m.name}</strong></p>
          <p>Skills: {Array.isArray(m.skills) ? m.skills.join(", ") : ""}</p>
          <p>Timezone: {m.timezone}</p>
          <p>Goals: {m.goals}</p>
        </div>
      ))}

      {selectedRoom && (
        <>
          <h3 className="text-lg font-semibold mt-4">Chat with selected match</h3>
          <ChatBox roomId={selectedRoom} user={user} />
        </>
      )}
    </div>
    </PageLayout>
  );
}
