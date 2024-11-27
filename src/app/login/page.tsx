"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logger from "@logger";

export default function App() {
  const [user, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get("/api/v1/validate-token", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          router.push("/edit-portfolio");
        }
        if (response.status === 401) {
          router.push("/login");
        }
      } catch (error) {
        logger.error("Token validation failed:", error);
      }
    };

    checkToken();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        user,
        password,
      };

      const response = await axios.post("api/v1/login", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      logger.info("Login successful:", response.status);
      setSuccess("Login successful!");

      router.push("/edit-portfolio");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Admin Login
        </h2>

        {success && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">{success}</span>
          </div>
        )}

        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {loading ? (
            <button
              type="button"
              disabled
              className="w-full py-3 bg-zinc-300 text-white rounded-md"
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-3 bg-zinc-950 text-white rounded-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
