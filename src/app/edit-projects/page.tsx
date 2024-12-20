"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Blog {
  id: string;
  projectTitle: string;
  publishDate: string;
}

const CardsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [projectData, setProjectData] = useState<Blog[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const validateTokenAndFetchData = async () => {
      try {
        const tokenResponse = await axios.get("/api/v1/validate-token");

        if (tokenResponse.status !== 200) {
          throw new Error("Invalid session token");
        }

        setIsAuthenticated(true);

        const response = await axios.get("/api/v1/projects");
        const projData = response.data.data;

        setProjectData(projData);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch data.");
        } else {
          setError("An unknown error occurred.");
        }
        alert("Unauthorized or failed to fetch data. Redirecting to login...");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    validateTokenAndFetchData();
  }, [router]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil((projectData?.length || 0) / itemsPerPage);
  const currentData = Array.isArray(projectData)
    ? projectData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleCardClick = (id: string) => {
    router.push(`/add-projects/${id}`);
  };
  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Projects Available
        </h1>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item.id)}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg cursor-pointer"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {item.projectTitle}
                  </h2>
                  <p className="text-gray-500">
                    Published on: {item.publishDate}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-white rounded ${
                  currentPage === 1
                    ? "bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              <span className="text-lg">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-white rounded ${
                  currentPage === totalPages
                    ? "bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardsPage;
