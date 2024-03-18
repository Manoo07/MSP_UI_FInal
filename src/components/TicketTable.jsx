import React, { useState } from "react";
import Loader from "./Loader/Loader.jsx";
import EyeCon from "../assets/images/view.svg";
import NoData from "./NoData";

const truncateText = (text) => {
  if (!text) return ""; // Added null check
  const words = text.split(" ");
  if (words.length > 10) {
    return words.slice(0, 10).join(" ") + "...";
  }
  return text;
};

const TicketTable = ({ tickets, onRowClick }) => {
  const [ticketTypeFilter, setTicketTypeFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    return (
      ticket.ticket_type.toLowerCase().includes(ticketTypeFilter.toLowerCase()) &&
      ticket.severity.toLowerCase().includes(severityFilter.toLowerCase()) &&
      ticket.priority.toLowerCase().includes(priorityFilter.toLowerCase()) &&
      ticket.source.toLowerCase().includes(sourceFilter.toLowerCase()) &&
      ticket.status.toLowerCase().includes(statusFilter.toLowerCase())
    );
  });

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">Ticket Table</h2>
      {tickets.length === 0 ? (
        <NoData />
      ) : (
        <div style={{ overflowX: "auto", position: "relative" }}>
          <div className="filter-section py-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-65">
                <label
                  htmlFor="ticketTypeFilter"
                  className="px-4 py-2 bg-gray-200"
                >
                  Ticket Type:
                </label>
                <input
                  type="text"
                  id="ticketTypeFilter"
                  value={ticketTypeFilter}
                  onChange={(e) => setTicketTypeFilter(e.target.value.toLowerCase())}
                  className="flex-grow px-4 py-2 focus:outline-none"
                  placeholder="Search by Ticket Type"
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-64">
                <label
                  htmlFor="severityFilter"
                  className="px-4 py-2 bg-gray-200"
                >
                  Severity:
                </label>
                <input
                  type="text"
                  id="severityFilter"
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value.toLowerCase())}
                  className="flex-grow px-4 py-2 focus:outline-none"
                  placeholder="Search by Severity"
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-64">
                <label
                  htmlFor="priorityFilter"
                  className="px-4 py-2 bg-gray-200"
                >
                  Priority:
                </label>
                <input
                  type="text"
                  id="priorityFilter"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value.toLowerCase())}
                  className="flex-grow px-4 py-2 focus:outline-none"
                  placeholder="Search by Priority"
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-64">
                <label
                  htmlFor="statusFilter"
                  className="px-4 py-2 bg-gray-200"
                >
                  Status:
                </label>
                <input
                  type="text"
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value.toLowerCase())}
                  className="flex-grow px-4 py-2 focus:outline-none"
                  placeholder="Search by Status"
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-64">
                <label htmlFor="sourceFilter" className="px-4 py-2 bg-gray-200">
                  Source:
                </label>
                <input
                  type="text"
                  id="sourceFilter"
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value.toLowerCase())}
                  className="flex-grow px-4 py-2 focus:outline-none"
                  placeholder="Search by Source"
                />
              </div>
            </div>
          </div>

          <table className="shadow-lg bg-white border-collapse">
            <thead>
              <tr>
                <th className="bg-blue-300 border text-left px-8 py-4">
                  Ticket Id
                </th>
                <th className="bg-blue-300 border text-left px-8 py-4">
                  Ticket Type
                </th>
                <th className="bg-blue-300 border text-left px-8 py-4">
                  Requestor Name
                </th>
                <th className="bg-blue-300 border text-left px-8 py-4">
                  Title
                </th>
                <th className="bg-blue-300 border text-left px-8 py-4">
                  Description
                </th>
                <th className="bg-blue-300 border text-left px-8 py-4">
                  Status
                </th>
                <th className="bg-blue-300 border text-left px-8 py-4">
                  Severity
                </th>
                <th className="bg-blue-300 border text-left px-8 py-4">
                  Priority
                </th>
                <th className="bg-blue-300 border text-left px-8 py-4">
                  Source
                </th>
                <th className="bg-blue-300 border text-left px-8 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr
                  className="hover:bg-gray-50"
                  key={ticket.ticket_id}
                  onClick={() => onRowClick(ticket.ticket_id)}
                >
                  <td className="border px-8 py-4">{ticket.ticket_id}</td>
                  <td className="border px-8 py-4">{ticket.ticket_type}</td>
                  <td className="border px-8 py-4">
                    {ticket.requestor_name ? ticket.requestor_name : "User"}
                  </td>
                  <td className="border px-8 py-4">
                    {truncateText(ticket.title)}
                  </td>
                  <td className="border px-8 py-4">
                    {truncateText(ticket.description)}
                  </td>
                  <td className="border px-8 py-4">{ticket.status}</td>
                  <td className="border px-8 py-4">{ticket.severity}</td>
                  <td className="border px-8 py-4">{ticket.priority}</td>
                  <td className="border px-8 py-4">{ticket.source}</td>
                  <td className="border px-8 py-4">
                    <img
                      src={EyeCon}
                      onClick={() => onRowClick(ticket.ticket_id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TicketTable;
