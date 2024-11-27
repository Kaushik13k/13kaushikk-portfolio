"use client";
import axios from "axios";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { InputField } from "@app/components/InputField";
import LogoutButton from "@app/components/LogoutButton";
import { CldImage, CldUploadWidget } from "next-cloudinary";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function MdeRenderer() {
  const { id } = useParams();
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

  const imageSrc = projectImage
    ? `${projectImage}`
    : publicId
    ? `${publicId}`
    : "";

  useEffect(() => {
    if (id != "new") {
      const fetchProject = async () => {
        try {
          const response = await axios.get(`/api/v1/projects?id=${id}`);
          const existingProject = response.data?.data?.projectDetails;
          if (existingProject) {
            setPublicId(existingProject.blogImage);
            setInProgress(existingProject.inProgress);
            setProjectArticle(existingProject.projectArticle);
            setProjectTitle(existingProject.projectTitle);
            setProjectDescription(existingProject.projectDescription);
            setProjectImage(existingProject.projectImage);
            setPublishDate(existingProject.publishDate);
          }
        } catch {
          alert("The Id doesnt exist. Please check-id or enter new record");
          setError("The Id doesnt exist. Please check-id or enter new record");
        } finally {
          setIsLoading(false);
        }
      };

      fetchProject();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleChange = (text: string) => {
    setProjectArticle(text);
  };

  const handleSaveChanges = async () => {
    try {
      const payload = {
        publishDate,
        projectImage,
        projectDescription,
        projectTitle,
        projectArticle,
        inProgress,
      };

      const response = await axios.post("/api/v1/projects", payload);
      if (response.status === 200) {
        alert("Project Added successfully!");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to Add Projects.");
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = (result: any) => {
    if (result.event === "success" && result.info?.public_id) {
      setProjectImage(result.info.public_id);
      setPublicId(result.info.public_id);
    } else {
    }
  };

  const handleUploadError = (error: unknown) => {
    return;
  };

  const handleEditChanges = async () => {
    try {
      const payload = {
        id,
        publishDate,
        projectImage,
        projectDescription,
        projectTitle,
        projectArticle,
        inProgress,
      };

      const response = await axios.put("/api/v1/projects", payload);
      if (response.status === 200) {
        alert("Project updated successfully!");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to update Project.");
      } else {
        alert("An unknown error occurred.");
      }
    }
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
    </div>
  );
}
