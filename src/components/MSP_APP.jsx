import React, { useState, useEffect } from "react";
import TicketTable from "./TicketTable";
import TicketDetailsForm from "./TicketDetails";
import Loader from "./Loader/Loader.jsx";
import axios from "axios";

import "tailwindcss/tailwind.css"; 

const MSP_APP = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/tickets');
      const data = await response.data;
      console.log(data)
      setTickets(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tickets:", error.message);
    }
  };

  const handleRowClick = (ticketId) => {
    const selected = tickets.find((ticket) => ticket.ticket_id === ticketId);
    setSelectedTicket(selected);
    setShowDetails(true);
  };

  return (
    <div className="container mx-auto p-4"> 
      <h1 className="text-3xl font-bold mb-4">Welcome to MSP Email generation</h1>
      {loading ? (
        <Loader />
      ) : !showDetails ? (
        <TicketTable tickets={tickets} onRowClick={handleRowClick} />
      ) : (
        <TicketDetailsForm selectedTicket={selectedTicket} />
      )}
    </div>
  );
};

export default MSP_APP;
