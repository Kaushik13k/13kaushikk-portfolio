"use client";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/v1/logout");

      if (response.status === 200) {
        router.push("/login");
        return;
      }
    } catch {
      alert("Error while logging out!");
    }
  };

  return (
    <div className="absolute top-0 right-0 m-4">
      <button
        onClick={handleLogout}
        type="button"
        className="px-10 py-3 bg-zinc-950 text-white rounded-md hover:bg-zinc-600"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
