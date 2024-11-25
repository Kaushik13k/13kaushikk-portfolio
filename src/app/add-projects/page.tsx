"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { InputField } from "../components/InputField";
import LogoutButton from "../components/LogoutButton";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import axios from "axios";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function MdeRenderer() {
  const [publicId, setPublicId] = useState<string>("");
  const [inProgress, setInProgress] = useState(false);
  const [projectArticle, setProjectArticle] = useState<string>("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [publishDate, setPublishDate] = useState<string>(() => {
    const today = new Date();
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(today);
  });
  const imageSrc = projectImage
    ? `${projectImage}`
    : publicId
    ? `${publicId}`
    : "";

  const handleChange = (text: string) => {
    setProjectArticle(text);
    console.log(projectArticle);
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

      const response = await axios.post("/api/projects", payload);
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
      console.log("Upload successful:", result);
      setProjectImage(result.info.public_id);
      setPublicId(result.info.public_id);
    } else {
      console.warn("Unexpected upload result:", result);
    }
  };

  const handleUploadError = (error: unknown) => {
    console.error("Upload error:", error);
  };

  return (
    <div className="p-4">
      <LogoutButton />
      <h1 className="text-2xl font-bold mb-4">Add Projects</h1>
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
      <p className="text-sm text-red-400">Please Select the below checkbox</p>
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
        type="button"
        onClick={handleSaveChanges}
        className="m-2 px-10 py-3 bg-zinc-950 text-white rounded-md hover:bg-zinc-600"
      >
        Save Changes
      </button>
    </div>
  );
}
