"use client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import Checkbox from "@app/components/Checkbox";
import { CldUploadWidget } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import LogoutButton from "@app/components/LogoutButton";
import { InputField } from "@app/components/InputField";

export default function App() {
  const { id } = useParams();
  const router = useRouter();
  const [hostLink, setHostLink] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [hostSource, setHostSource] = useState("");
  const [avgReadTime, setAvgReadTime] = useState("");
  const [publicId, setPublicId] = useState<string>("");
  const [blogDescription, setBlogDescription] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [publishDate, setPublishDate] = useState<string>(() => {
    const today = new Date();
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(today);
  });

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get("/api/v1/validate-token");

        if (response.status !== 200) {
          throw new Error("Invalid session token");
        }

        setIsAuthenticated(true);
        return true;
      } catch {
        alert("Unauthorized or invalid token. Redirecting to login...");
        router.push("/login");
        return false;
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/blogs?id=${id}`);
        const existingBlog = response.data?.data;

        if (existingBlog) {
          setPublicId(existingBlog.blogImage);
          setHostSource(existingBlog.hostSource);
          setBlogDescription(existingBlog.blogDescription);
          setBlogTitle(existingBlog.blogTitle);
          setBlogImage(existingBlog.blogImage);
          setAvgReadTime(existingBlog.avgReadTime);
          setPublishDate(existingBlog.publishDate);
          setHostLink(existingBlog.hostLink);
        } else {
          throw new Error("Blog not found.");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch data.");
        } else {
          setError("An unknown error occurred.");
        }
        alert("Failed to fetch blog data.");
      } finally {
        setIsLoading(false);
      }
    };

    const validateAndFetch = async () => {
      const isTokenValid = await validateToken();
      if (isTokenValid && id !== "new") {
        await fetchData();
      } else {
        setIsLoading(false);
      }
    };

    validateAndFetch();
  }, [id, router]);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const payload = {
        publishDate,
        hostSource,
        blogDescription,
        blogTitle,
        blogImage,
        avgReadTime,
        hostLink,
      };

      const response = await axios.post("/api/v1/blogs", payload);
      if (response.status === 200) {
        alert("Blog added successfully!");
        router.push("/edit-portfolio");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to update Blog.");
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditChanges = async () => {
    setIsSaving(true);
    try {
      const updatedAt = new Date();
      const payload = {
        id,
        publishDate,
        hostSource,
        blogDescription,
        blogTitle,
        blogImage,
        avgReadTime,
        hostLink,
        updatedAt,
      };

      const response = await axios.put("/api/v1/blogs", payload);
      if (response.status === 200) {
        alert("Blog updated successfully!");
        router.push("/edit-portfolio");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to update Blog.");
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
      setBlogImage(result.info.public_id);
      setPublicId(result.info.public_id);
    } else {
      alert("Unexpected upload result");
    }
  };

  const handleUploadError = () => {
    alert("Image upload error");
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHostSource(value);
  };

  const imageSrc = blogImage ? `${blogImage}` : publicId ? `${publicId}` : "";
  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative p-4">
      <LogoutButton />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Edit Portfolio
        </h2>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
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
                label="Linkedin"
                isChecked={hostSource === "Linkedin"}
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
              label="Host Link"
              value={hostLink}
              onChange={(e) => setHostLink(e.target.value)}
            />
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
