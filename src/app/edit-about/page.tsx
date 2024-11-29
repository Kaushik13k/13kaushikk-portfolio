"use client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { InputField } from "@app/components/InputField";
import LogoutButton from "@app/components/LogoutButton";
import { ABOUT_MAX_LENGTH, TITLE_MAX_LENGTH } from "@app/constants/profile";

export default function App() {
  const router = useRouter();
  const [devTo, setDevTo] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [isHireMe, setIsHireMe] = useState(false);
  const [publicId, setPublicId] = useState<string>("");
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioTitle, setPortfolioTitle] = useState("");
  const [portfolioAbout, setPortfolioAbout] = useState("");
  const [portfolioEmail, setPortfolioEmail] = useState("");
  const [portfolioImage, setPortfolioImage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateTokenAndFetchData = async () => {
      try {
        const tokenResponse = await axios.get("/api/v1/validate-token");

        if (tokenResponse.status !== 200) {
          throw new Error("Invalid session token");
        }

        setIsAuthenticated(true);

        const response = await axios.get("/api/v1/about");
        const data = response.data.data;

        setPortfolioName(data.portfolioName);
        setPortfolioTitle(data.portfolioTitle);
        setPortfolioAbout(data.portfolioAbout);
        setPortfolioEmail(data.portfolioEmail);
        setPortfolioImage(data.portfolioImage);
        setIsHireMe(data.isHireMe);
        setInstagram(data.portfolioContact.instagram);
        setTwitter(data.portfolioContact.twitter);
        setGithub(data.portfolioContact.github);
        setDevTo(data.portfolioContact.devTo);
        setLinkedin(data.portfolioContact.linkedin);
        setError(null);
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

  const handleSaveChanges = async () => {
    try {
      const payload = {
        portfolioName,
        portfolioTitle,
        portfolioAbout,
        portfolioEmail,
        portfolioImage,
        portfolioContact: {
          instagram,
          twitter,
          github,
          devTo,
          linkedin,
        },
        isHireMe,
      };

      const response = await axios.post("/api/v1/about", payload);
      if (response.status === 200) {
        alert("Portfolio updated successfully!");
        router.push("/edit-portfolio");
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
      setPortfolioImage(result.info.public_id);
      setPublicId(result.info.public_id);
    } else {
    }
  };

  const handleUploadError = () => {
    return;
  };

  const isTitleValid = portfolioTitle.length <= TITLE_MAX_LENGTH;
  const isAboutValid = portfolioAbout.length <= ABOUT_MAX_LENGTH;

  const titleErrorMessage = !isTitleValid
    ? `Title cannot exceed ${TITLE_MAX_LENGTH} characters`
    : "";
  const aboutErrorMessage = !isAboutValid
    ? `About section cannot exceed ${ABOUT_MAX_LENGTH} characters`
    : "";

  const isFormValid = isTitleValid && isAboutValid;

  if (isLoading || !isAuthenticated) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const imageSrc = portfolioImage
    ? `${portfolioImage}`
    : publicId
    ? `${publicId}`
    : "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative p-4">
      <LogoutButton />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Edit Portfolio
        </h2>
        <InputField
          label="Name"
          value={portfolioName}
          onChange={(e) => setPortfolioName(e.target.value)}
        />
        <InputField
          label="Title"
          value={portfolioTitle}
          onChange={(e) => setPortfolioTitle(e.target.value)}
          errorMessage={titleErrorMessage}
        />
        <InputField
          label="About"
          value={portfolioAbout}
          onChange={(e) => setPortfolioAbout(e.target.value)}
          type="textarea"
          errorMessage={aboutErrorMessage}
        />
        <p className="text-xs text-blue-600 -mt-4">
          NOTE: If a new paragraph needed, with break in middle use: \n\n
        </p>
        <br />
        <InputField
          label="Email"
          value={portfolioEmail}
          onChange={(e) => setPortfolioEmail(e.target.value)}
          type="email"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Profile Image
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
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Contact Links
        </h3>
        <InputField
          label="Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          type="url"
        />
        <InputField
          label="Twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          type="url"
        />
        <InputField
          label="GitHub"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          type="url"
        />
        <InputField
          label="Dev.to"
          value={devTo}
          onChange={(e) => setDevTo(e.target.value)}
          type="url"
        />
        <InputField
          label="LinkedIn"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          type="url"
        />
        <p className="text-sm text-red-400">Please Select the below checkbox</p>
        <input
          type="checkbox"
          checked={isHireMe}
          onChange={(e) => setIsHireMe(e.target.checked ? true : false)}
          className="mb-10"
        />{" "}
        Hire Me?
        <br />
        <button
          type="button"
          onClick={handleSaveChanges}
          disabled={!isFormValid}
          className={`m-2 px-10 py-3 ${
            isFormValid ? "bg-zinc-950" : "bg-gray-400"
          } text-white rounded-md hover:bg-zinc-600`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
