import React, { useState } from "react";
import axios from "axios";
import EmailCard from './EmailCard';
import Loader from "./Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "tailwindcss/tailwind.css"; 
import TicketCard from "./TicketCard";

const TicketDetailsForm = ({ selectedTicket }) => {

  const [references, setReferences] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);

  const notifyError = (error) => toast.error(`Error: ${error.message}`, { autoClose: 5000 });

  const handleAddReference = () => {
    const isPreviousReferencesFilled = references.every(reference => {
      return (
        reference.ticket_type !== "" &&
        reference.service !== "" &&
        reference.priority !== "" &&
        reference.severity !== "" &&  
        reference.ticket_id !== "" && 
        reference.ref !== ""
      );
    });
  
    if (!isPreviousReferencesFilled) {
      alert("Please fill in all fields in each reference before adding a new reference.");
      return;
    }
  
    const newReference = { ticket_type: "", service: "", priority: "", severity: 0, ticket_id: 0, ref: "" };
    setReferences([...references, newReference]);
  };

  const handleRemoveReference = (index) => {
    const updatedReferences = [...references];
    updatedReferences.splice(index, 1);
    setReferences(updatedReferences);
  };

  const handleChangeReference = (index, field, value) => {
    const updatedReferences = [...references];
    updatedReferences[index][field] = value;
    setReferences(updatedReferences);
  };

  const handleToggleDescription = () => {
    setExpandedDescription(!expandedDescription);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const areAllReferencesFilled = references.every(reference => {
      return (
        reference.ticket_type.trim() !== "" &&
        reference.service.trim() !== "" &&
        reference.priority.trim() !== "" &&
        reference.severity !== 0 &&
        reference.ticket_id !== 0 &&
        reference.ref.trim() !== ""
      );
    });

    if (!areAllReferencesFilled) {
      alert("Please fill in all fields in each reference before generating the email.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://127.0.0.1:8000/api/v1/1/email", {
        ticket_id: selectedTicket.ticket_id,
        ticket_type: selectedTicket.ticket_type,
        requestor_name: selectedTicket.requestor_name,
        title: selectedTicket.title,
        description: selectedTicket.description,
        status: selectedTicket.status,
        severity: selectedTicket.severity,
        priority: selectedTicket.priority,
        source: selectedTicket.source,
        
        reference: references
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.data); // Log or handle the response as needed
      setResponse(res.data);

    } catch (error) {
      console.error("Error occurred during API call:", error.message);
      notifyError(error); // Trigger toast notification for error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Loader />
      ) : (
        <div>
          {!response ? (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>
              
              <TicketCard selectedTicket = {selectedTicket} />

              {references.length > 0 && <h2 className="text-2xl font-bold mb-4">References</h2>}
              {references.length > 0 && references.map((reference, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-md mb-4">
                  {/* Reference fields */}
                </div>
              ))}
              <div className="">
                {/* <span></span> */}
                {/* <button
                  type="button"
                  onClick={handleAddReference}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
                >
                  Add Reference
                </button> */}
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                  Generate Email
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-2xl font-bold mb-4">Email</h2>
              <EmailCard response={response}  selectedTicket={selectedTicket}/>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TicketDetailsForm;
