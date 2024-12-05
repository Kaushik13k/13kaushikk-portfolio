"use client";
import axios from "axios";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { InputField } from "@app/components/InputField";
import LogoutButton from "@app/components/LogoutButton";
import { CldImage, CldUploadWidget } from "next-cloudinary";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function MdeRenderer() {
  const { id } = useParams();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [publicId, setPublicId] = useState<string>("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectArticle, setProjectArticle] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState("");
  const [publishDate, setPublishDate] = useState<string>(() => {
    const today = new Date();
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(today);
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );

  const imageSrc = projectImage
    ? `${projectImage}`
    : publicId
    ? `${publicId}`
    : "";

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get("/api/v1/validate-token");

        if (response.status !== 200) {
          throw new Error("Invalid session token");
        }

        setIsAuthenticated(true);
        return true;
      } catch (err) {
        alert("Unauthorized or invalid token. Redirecting to login...");
        router.push("/login");
        return false;
      }
    };

    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/v1/projects?id=${id}`);
        const existingProject = response.data?.data;
        if (existingProject) {
          setPublicId(existingProject.blogImage);
          setInProgress(existingProject.inProgress);
          setProjectArticle(existingProject.projectArticle);
          setProjectTitle(existingProject.projectTitle);
          setProjectDescription(existingProject.projectDescription);
          setProjectImage(existingProject.projectImage);
          setPublishDate(existingProject.publishDate);
          setSelectedTechnologies(existingProject.selectedTechnologies);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch data.");
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    const validateAndFetch = async () => {
      const isTokenValid = await validateToken();
      if (isTokenValid && id !== "new") {
        await fetchProject();
      } else {
        setIsLoading(false);
      }
    };

    validateAndFetch();
  }, [id, router]);

  const handleChange = (text: string) => {
    setProjectArticle(text);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const payload = {
        publishDate,
        projectImage,
        projectDescription,
        projectTitle,
        projectArticle,
        inProgress,
        selectedTechnologies,
      };

      const response = await axios.post("/api/v1/projects", payload);
      if (response.status === 200) {
        alert("Project Added successfully!");
        router.push("/edit-portfolio");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to Add Projects.");
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = (result: any) => {
    if (result.event === "success" && result.info?.public_id) {
      setProjectImage(result.info.public_id);
      setPublicId(result.info.public_id);
    } else {
      alert("there was error while uploading the image");
    }
  };

  const handleUploadError = (error: unknown) => {
    alert("there was error while uploading the image");
  };

  const handleEditChanges = async () => {
    setIsSaving(true);
    try {
      const updatedAt = new Date();
      const payload = {
        id,
        publishDate,
        projectImage,
        projectDescription,
        projectTitle,
        projectArticle,
        selectedTechnologies,
        inProgress,
        updatedAt,
      };

      const response = await axios.put("/api/v1/projects", payload);
      if (response.status === 200) {
        alert("Project updated successfully!");
        router.push("/edit-portfolio");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to update Project.");
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setIsSaving(false);
    }
  };
  if (!isAuthenticated) return <div>Loading...</div>;

  const technologies = ["Python", "Rust", "Next.js", "Redis"];

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleTechnologyChange = (tech: string, isChecked: boolean) => {
    setSelectedTechnologies((prev) =>
      isChecked ? [...prev, tech] : prev.filter((t) => t !== tech)
    );
  };

  return (
    <div className="p-4">
      <LogoutButton />
      <h1 className="text-2xl font-bold mb-4">Add Projects</h1>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <InputField
            label="Project Title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            type="email"
          />
          <InputField
            label="Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            type="email"
          />
          <br />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Blog cover image
            </label>
            {imageSrc ? (
              <div className="lg:w-1/2 w-full flex justify-center lg:ml-12 mt-4 lg:mt-0 mb-4">
                <CldImage
                  width="200"
                  height="200"
                  src={imageSrc}
                  sizes="100vw"
                  alt="Portfolio Image"
                  className="rounded-lg w-full h-auto lg:h-96 lg:max-w-full object-cover shadow-2xl"
                />
              </div>
            ) : (
              <div className="text-gray-500 italic text-center mb-4">
                No image uploaded
              </div>
            )}

            <CldUploadWidget
              uploadPreset="testing"
              onSuccess={handleUploadSuccess}
              onError={handleUploadError}
            >
              {({ open }) => (
                <button
                  type="button"
                  className="m-2 px-10 py-3 bg-zinc-950 text-white rounded-md hover:bg-zinc-600"
                  onClick={() => open()}
                >
                  Upload an Image
                </button>
              )}
            </CldUploadWidget>
          </div>
          <p className="text-sm">Project Article</p>
          <SimpleMDE value={projectArticle} onChange={handleChange} />
          <p className="text-sm text-red-400">
            Please Select the below checkbox
          </p>
          <input
            type="checkbox"
            onChange={(e) => setInProgress(e.target.checked ? true : false)}
            className="mb-10"
          />{" "}
          In-Progress ?
          <InputField
            label="Publish Date"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />
          <button
            onClick={toggleDropdown}
            className="m-2 px-10 py-3 bg-zinc-950 text-white rounded-md hover:bg-zinc-600"
            type="button"
          >
            Technologies Used
          </button>
          {isDropdownOpen && (
            <div className="z-10 mt-2 w-48 bg-white rounded-lg shadow dark:bg-gray-700">
              <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                {technologies.map((tech) => (
                  <li key={tech}>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id={tech.toLowerCase()}
                        type="checkbox"
                        value={tech}
                        checked={selectedTechnologies.includes(tech)}
                        onChange={(e) =>
                          handleTechnologyChange(tech, e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor={tech.toLowerCase()}
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        {tech}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <br />
          {id === "new" ? (
            <button
              type="button"
              onClick={handleSaveChanges}
              className="m-2 px-10 py-3 bg-zinc-950 text-white rounded-md hover:bg-zinc-600"
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEditChanges}
              className="m-2 px-10 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              Edit Changes
            </button>
          )}
        </>
      )}
      {isSaving && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <p className="text-lg font-semibold text-gray-700">Saving...</p>
          </div>
        </div>
      )}
    </div>
  );
}
