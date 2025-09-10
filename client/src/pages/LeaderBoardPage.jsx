import React, { useEffect, useState } from "react";
import { useLeaderBoardStore } from "../stores/useLeaderBoardStore";
import { useAuth } from "../context/AuthContext";
import { User2, Trophy } from "lucide-react";
function Leaderboard(){
  const { user } = useAuth();
  const { loading, Leaderboard, fetchLeaderboard } = useLeaderBoardStore();
  const  [index, setIndex] =useState(null);
useEffect(() => {
  fetchLeaderboard();
}, []);

useEffect(() => {
  if (Leaderboard.length && user) {
    const idx = Leaderboard.findIndex(u => u.member_id === user.member_id);
    setIndex(idx);
  }
}, [Leaderboard, user]);
  const podiumIcons = [
    <Trophy className="w-8 h-8 text-yellow-500" />,
    <Trophy className="w-8 h-8 text-gray-400" />,
    <Trophy className="w-8 h-8 text-orange-500" />,
  ];
  const podiumHeight = [180, 170, 160];
  const bgColors = ["bg-yellow-400", "bg-gray-300", "bg-orange-400"];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Leaderboard Title */}
      <h2 className="text-3xl font-bold mb-4 text-center text-gradient bg-clip-text text-transparent bg-primary">
        Leaderboard
      </h2>

      {/* Current User Highlight */}
      {user && (
        <div className="sticky top-0 z-10 bg-accent/80 backdrop-blur-md p-4 rounded-xl shadow-md mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">#{index+1}</span>
            <User2 className="w-8 h-8 text-white" />
            <span className="font-semibold">{user.first_name} {user.last_name}</span>
          </div>
          <span className="font-bold">{Leaderboard[index]? Leaderboard[index].total_points:'--'} pts</span>
        </div>
      )}

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-6 mb-8">
        {Leaderboard.slice(0, 3).map((member, index) => (
          <div
            key={member.id}
            className={`flex flex-col justify-end items-center rounded-xl p-4 shadow-lg ${bgColors[index]} text-white w-32 transition-transform transform hover:scale-105`}
            style={{ height: podiumHeight[index] }}
          >
            <span className="text-xl font-bold">{index + 1}</span>
            <div className="my-2">{podiumIcons[index]}</div>
            <User2 className="w-10 h-10 my-2" />
            <span className="font-semibold">{member.first_name}</span>
            <span className="text-sm">{member.total_points} pts</span>
          </div>
        ))}
      </div>

      {/* Scrollable List for Rest */}
      <div className="bg-base-100 shadow-lg rounded-xl p-4 max-h-[500px] overflow-y-auto">
        {Leaderboard.slice(3, (Leaderboard.length)).map((member, index) => {
          const isCurrent = member.member_id === user.member_id;
          return (
            <div
              key={member.member_id}
              className={`flex justify-between items-center p-3 rounded-lg mb-2 transition cursor-pointer 
                ${isCurrent ? "bg-accent/70 text-white font-semibold" : "hover:bg-base-200"}`}
            >
              <div className="flex items-center gap-4">
                <span className="font-bold">{index + 4}</span>
                <User2 className={`w-6 h-6 ${isCurrent ? "text-white" : "text-primary"}`} />
                <span>{member.first_name} {member.last_name}</span>
              </div>
              <span className="font-semibold">{member.total_points} pts</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
