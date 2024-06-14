"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useRouter } from "next/navigation";
import Form from "@/assets/form";
import PlayerContent from "@/assets/PlayerContent";

export default function Page() {
  // whether app is currently uploading files
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>([]);
  // whether upload has been completed
  const [uploadComplete, setUploadComplete] = useState(false);
  // details of animal
  const [animalSpec, setanimalSpec] = useState({});

  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
    null
  );
  const [jumpTime, setJumpTime] = useState<number>(0);
  // delete files
  const [handleDelete, setHandleDelete] = useState<number>(0);
  // set router
  const router = useRouter();

  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: any) => {
    // Prevent opening of file in browser when dragged over
    e.preventDefault();
    // Prevent any parent handler from being executed
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files) as File[];
    setSelectedFiles(files);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("audio", file);
    });
    const fileNames = files.map((file) => file.name).join(", ");
    setFileName(fileNames);
    setSelectedFileIndex(0);
    try {
      setUploading(true);
      const response = await fetch(
        "https://radjan.pythonanywhere.com/api/predict_audio",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("response data:", data);
      setanimalSpec(data.scores);
      setUploadComplete(true);

      // Navigate to a new URL with predictions
      // router.push("/details");

      return data;
    } catch (error) {
      console.error("Error detecting:", error);
      return [];
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (event: any) => {
    const files = Array.from(event.target.files as FileList);
    setSelectedFiles(files);
    console.log(files);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("audio", file);
    });
    const fileNames = files.map((file) => file.name).join(", ");
    console.log(fileNames);
    setFileName(fileNames);
    setSelectedFileIndex(0);
    try {
      setUploading(true);
      const response = await fetch(
        "https://radjan.pythonanywhere.com/api/predict_audio",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("response data:", data);
      setanimalSpec(data.scores);
      setUploadComplete(true);

      // Navigate to a new URL with predictions
      // router.push("/details");

      return data;
    } catch (error) {
      console.error("Error detecting:", error);
      return [];
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <header className="pb-4 border-solid border-b-2 border-black-500 w-full">
        <nav className="mb-4 flex justify-center">
          <ol className="flex space-x-4 text-lg text-gray-500 ">
            <li className="flex items-center">
              <span
                className={`p-2 pb-3 ${
                  !fileName && "border-solid border-b-2 border-green-500"
                } text-green-500 relative`}
              >
                Upload
              </span>
            </li>
            <li>
              <ArrowForwardIosOutlinedIcon className="relative top-2 ml-2" />
            </li>
            <li className="flex items-center">
              <span
                className={`p-2 pb-3 ${
                  fileName &&
                  "border-solid border-b-2 border-green-500 text-green-500"
                }  relative`}
              >
                Details
              </span>
            </li>
          </ol>
        </nav>
      </header>

      <div className="container mx-auto mt-5 p-16">
        {/* Swap out the drag and drop box with the file uploading box when data is uploaded. this is done by varying the UI based on filenames*/}
        {selectedFileIndex == null && (
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold pb-3">Upload audio or video</h1>

              <span className="grid gap-3">
                <p className="text-base pb-8 font-normal text-gray-500">
                  Upload multiple audio or video clips in a few simple steps.
                </p>
                <p className="text-base pb-3 font-bold text-gray-500">
                  Supported file types:
                </p>
                <ul className="list-disc list-inside mb-5 text-base font-normal text-gray-500">
                  <li>Audio files: mp3, m4a, wav, or mpg</li>
                  <li>Video files: mp4 or mov</li>
                </ul>

                <h2 className="text-lg font-bold mb-2">
                  Review audio library?
                </h2>
                <p className="text-base font-normal text-gray-500 mb-4">
                  If you would like to review your previous uploaded clips, or
                  peer-review audio or video clips from other folks, visit our
                  active repository.
                </p>
                <div>
                  <button className="text-sm font-bold mb-4 px-3 py-2 border-2 rounded-md border-gray-300 inline-block">
                    Review with Repository
                  </button>
                </div>
              </span>
            </div>

            <div
              className="flex-1 flex flex-col items-center justify-center font-bold  text-base border-2 border-dashed border-gray-300 rounded-md"
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <div className="text-gray-400 pb-3">
                  <VideoLibraryOutlinedIcon fontSize="large" />
                </div>
                <h4 className="text-gray-600 pb-8">Drag and drop or</h4>
                <label className="px-4 py-2 bg-green-600 text-white hover:bg-green-500 rounded-lg">
                  <input
                    type="file"
                    hidden
                    accept="audio/*"
                    multiple
                    onChange={handleFileChange}
                  />
                  Select files
                </label>
              </div>
            </div>
          </div>
        )}

        {selectedFileIndex !== null &&
          selectedFiles &&
          selectedFiles[selectedFileIndex] && (
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
              <Form />
              <div className="flex-1 flex flex-col items-center justify-start font-bold text-base border-2 border-gray-300 shadow-md rounded-md p-2 bg-gray-100">
                {selectedFiles.map((file, index) => (
                  <div className="flex flex-row items-center gap-x-4">
                    <span className="flex justify-center items-center text-lg font-bold backdrop-blur-md bg-white rounded-full size-9 border-2 border-black">{index+1}</span>
                    <PlayerContent
                      key={index}
                      audioUrl={URL.createObjectURL(file)}
                      filename={file.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
