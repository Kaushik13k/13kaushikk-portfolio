"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "@app/components/LogoutButton";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const validateTokenAndFetchData = async () => {
      try {
        const response = await axios.get("/api/v1/validate-token");

        if (response.status !== 200) {
          throw new Error("Invalid session token");
        }

        setIsAuthenticated(true);
      } catch (err) {
        alert("Unauthorized or failed to fetch data. Redirecting to login...");
        router.push("/login");
      }
    };

    validateTokenAndFetchData();
  }, [router]);
  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <LogoutButton />
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Add / Edit Sections
        </h2>
        <Link href="/edit-about">
          <button
            type="submit"
            className="m-2 px-10 py-3 bg-zinc-950 text-white rounded-md hover:bg-zinc-600"
          >
            Edit Body
          </button>
        </Link>
        <Link href="/add-blogs/new">
          <button
            type="submit"
            className="m-2 px-10 py-3 bg-zinc-950 text-white rounded-md hover:bg-zinc-600"
          >
            Add Blogs
          </button>
        </Link>
        <Link href="/add-projects/new">
          <button
            type="submit"
            className="m-2 px-10 py-3 bg-zinc-950 text-white rounded-md hover:bg-zinc-600"
          >
            Add Projects
          </button>
        </Link>
        <Link href="/edit-blogs">
          <button
            type="submit"
            className="m-2 px-10 py-3 bg-zinc-950 text-white rounded-md hover:bg-zinc-600"
          >
            Edit Blogs
          </button>
        </Link>
        <Link href="/edit-projects">
          <button
            type="submit"
            className="m-2 px-10 py-3 bg-zinc-950 text-white rounded-md hover:bg-zinc-600"
          >
            Edit Projects
          </button>
        </Link>
      </div>
    </div>
  );
}
