"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import LogoutButton from "../components/LogoutButton";

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
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioTitle, setPortfolioTitle] = useState("");
  const [portfolioAbout, setPortfolioAbout] = useState("");
  const [portfolioEmail, setPortfolioEmail] = useState("");
  const [portfolioImage, setPortfolioImage] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [devTo, setDevTo] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/about");
        console.log("the get response is: ", response);
        const data = response.data.data.userDetails;

        setPortfolioName(data.portfolioName);
        setPortfolioTitle(data.portfolioTitle);
        setPortfolioAbout(data.portfolioAbout);
        setPortfolioEmail(data.portfolioEmail);
        setPortfolioImage(data.portfolioImage);
        setInstagram(data.portfolioContact.instagram);
        setTwitter(data.portfolioContact.twitter);
        setGithub(data.portfolioContact.github);
        setDevTo(data.portfolioContact.devTo);
        setLinkedin(data.portfolioContact.linkedin);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.request?.status) {
            return;
          }
          setError(err.response?.data?.message || "Failed to fetch data.");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      };

      const response = await axios.post("/api/about", payload);
      if (response.status === 200) {
        alert("Portfolio updated successfully!");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to update portfolio.");
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
        />
        <InputField
          label="About"
          value={portfolioAbout}
          onChange={(e) => setPortfolioAbout(e.target.value)}
          type="textarea"
        />
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
          {portfolioImage ? (
            <div className="lg:w-1/2 w-full flex justify-center lg:ml-12 mt-4 lg:mt-0 mb-4">
              <CldImage
                width="200"
                height="200"
                src={portfolioImage}
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
          <input
            type="text"
            value={portfolioImage}
            onChange={(e) => setPortfolioImage(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter image URL"
          />
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
