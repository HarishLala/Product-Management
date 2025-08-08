import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
    setUploadProgress(0);
    setUploadStatus("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setUploadProgress(0);
      setUploadStatus("");
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const res = await axios.post("http://localhost:8081/product/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      if (res.data.success) {
        setUploadStatus("File uploaded and saved successfully.");
      } else {
        setUploadStatus("Failed to upload file.");
      }
    } catch (error) {
      console.error(error);
      setUploadStatus("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Hi, {username}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>

      {/* Drag and Drop Area */}
      <div
        className="border-dashed border-2 border-gray-600 p-12 text-center rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-all mb-8"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="text-xl mb-2">Drag and Drop file here or</p>
        <label className="underline cursor-pointer">
          <input type="file" accept=".xls,.xlsx" onChange={handleFileSelect} hidden />
          Choose file
        </label>
        <p className="mt-2 text-sm text-gray-400">Supported formats: .XLS, .XLSX</p>
      </div>

      {/* Upload Preview */}
      {file && (
        <div className="bg-purple-700 bg-opacity-80 text-white p-6 rounded-lg transition-all shadow-lg max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">{file.name}</p>
            <p className="text-sm">{uploadProgress}%</p>
          </div>

          <div className="w-full bg-purple-900 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="bg-white h-3 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>

          {uploading ? (
            <button
              className="w-full bg-gray-500 text-white py-2 rounded cursor-not-allowed"
              disabled
            >
              Uploading...
            </button>
          ) : (
            <button
              onClick={handleUpload}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Upload
            </button>
          )}
        </div>
      )}

      {/* Upload Status */}
      {uploadStatus && (
        <div className="text-center text-sm mt-6 text-gray-300">{uploadStatus}</div>
      )}
    </div>
  );
}

export default AdminDashboard;
