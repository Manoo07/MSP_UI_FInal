import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "tailwindcss/tailwind.css";
import TicketCard from "./TicketCard";

const EmailCard = ({ response, selectedTicket }) => {
  const [res, setRes] = useState(response);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const regenerateHandler = async () => {
    try {
      setLoading(true);
      const res_data = await axios.post(
        "http://127.0.0.1:8000/api/v1/1/regenerate",
        res,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res_data.data);
      setRes(res_data.data);
    } catch (error) {
      console.error("Error occurred during API call:", error.message);
      toast.error(`Error: ${error.message}`, { autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("Content copied successfully!");
  };

  const viewHandler = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="space-y-4">
      <div className="card bg-gray-100 p-4 rounded-md shadow-md">
        {loading ? (
          <Loader />
        ) : res ? (
          <div>
            <div className="mb-4 flex items-start justify-between">
              <div className="flex  w-1/2 max-w-[calc(50%-1rem)]">
                <p className="font-bold">Subject:</p>
                <pre className="text-left whitespace-pre-wrap pl-10">
                  {res.subject}
                </pre>
              </div>
              <button
                className="flex-shrink-0 ml-4"
                style={{ width: "20px", height: "20px" }}
                onClick={() => copyToClipboard(`${res.subject}`)}
                aria-label="Copy Subject"
              >
                <img
                  className="w-full h-full"
                  src="src/assets/images/copy.svg"
                  alt="Copy Subject"
                />
              </button>
            </div>

            <div className="mb-4 flex items-start justify-between">
              <div className="flex  w-1/2 max-w-[calc(50%-1rem)]">
                <p className="font-bold">Body:</p>
                <pre className="text-left whitespace-pre-wrap pl-16">
                  {res.body}
                </pre>
              </div>
              <button
                className="flex-shrink-0 ml-4"
                style={{ width: "20px", height: "20px" }}
                onClick={() => copyToClipboard(`${res.body}`)}
                aria-label="Copy Body"
              >
                <img
                  className="w-full h-full"
                  src="src/assets/images/copy.svg"
                  alt="Copy Body"
                />
              </button>
            </div>

            <div className="flex justify-around">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={regenerateHandler}
              >
                Regenerate
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={viewHandler}
              >
                {showDetails ? "Hide Ticket Details" : "View Ticket Details"}
              </button>
            </div>
          </div>
        ) : null}
        <ToastContainer />
      </div>
      {showDetails && !loading && (
        <div>
          <TicketCard selectedTicket={selectedTicket} />
        </div>
      )}
    </div>
  );
};

export default EmailCard;
