"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/v1/logout");
      console.log("Logout successful:", response.status);

      if (response.status === 200) {
        router.push("/login");
        return;
      }
      console.error("Failed to logout:");
    } catch (error: unknown) {
      console.error("Failed to logout:", error);
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
