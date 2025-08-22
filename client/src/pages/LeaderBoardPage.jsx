import React, { useEffect } from "react";
import { useLeaderBoardStore } from "../stores/useLeaderBoardStore";

const Leaderboard = () => {
  const {loading, Leaderboard, fetchLeaderboard} = useLeaderBoardStore();

  useEffect(()=>{
    fetchLeaderboard();
  },[])

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Member</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {Leaderboard.map((member, index) => (
                <tr key={member.id} className="hover:bg-base-200">
                  <td>{index + 1}</td>
                  <td>{member.first_name} {member.last_name}</td>
                  <td>{member.total_points}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
