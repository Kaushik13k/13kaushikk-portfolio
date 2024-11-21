"use client";
import { useState } from "react";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { CldUploadWidget } from "next-cloudinary";
import LogoutButton from "../components/LogoutButton";
import Checkbox from "../components/Checkbox";

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  placeholder?: string;
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md"
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md"
        placeholder={placeholder}
      />
    )}
  </div>
);

export default function App() {
  const [publicId, setPublicId] = useState<string>("");
  const [hostSource, setHostSource] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [avgReadTime, setAvgReadTime] = useState("");
  const [publishDate, setPublishDate] = useState<string>(() => {
    const today = new Date();
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(today);
  });
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState<string | null>(null);

  const handleSaveChanges = async () => {
    try {
      const payload = {
        publishDate,
        hostSource,
        blogDescription,
        blogTitle,
        blogImage,
        avgReadTime,
      };

      const response = await axios.post("/api/blogs", payload);
      if (response.status === 200) {
        alert("Portfolio updated successfully!");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to update portfolio.");
      } else {
        alert("An unknown error occurred.");
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = (result: any) => {
    if (result.event === "success" && result.info?.public_id) {
      console.log("Upload successful:", result);
      setBlogImage(result.info.public_id);
      setPublicId(result.info.public_id);
    } else {
      console.warn("Unexpected upload result:", result);
    }
  };

  const handleUploadError = (error: unknown) => {
    console.error("Upload error:", error);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHostSource(value);
  };

  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error}</div>;

  const imageSrc = blogImage ? `${blogImage}` : publicId ? `${publicId}` : "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative p-4">
      <LogoutButton />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Edit Portfolio
        </h2>
        <InputField
          label="Blog title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          type="email"
        />
        <InputField
          label="Blog description"
          value={blogDescription}
          onChange={(e) => setBlogDescription(e.target.value)}
          type="textarea"
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
        <InputField
          label="Average read time"
          value={avgReadTime}
          onChange={(e) => setAvgReadTime(e.target.value)}
          type="url"
        />

        <div className="mb-4">
          <p className="text-sm mb-1">Host source</p>
          <Checkbox
            label="Medium"
            isChecked={hostSource === "Medium"}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <br />
          <Checkbox
            label="Others"
            isDisabled
            isChecked={hostSource === "Others"}
            onChange={(e) => handleCheckboxChange(e)}
          />
        </div>

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
    </div>
  );
}
