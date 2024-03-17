import React from "react";
import Loader from "./Loader/Loader.jsx";
import EyeCon from '../assets/images/view.svg'
import NoData from './NoData'

const truncateText = (text) => {
  if (!text) return ''; // Added null check
  const words = text.split(' ');
  if (words.length > 10) {
    return words.slice(0, 10).join(' ') + '...';
  }
  return text;
};

const TicketTable = ({ tickets, onRowClick }) => {
  return (
    <div>
      <h2 className=" text-4xl font-bold mb-4">Ticket Table</h2>
      {tickets.length === 0 ? (
        <NoData />
      ) : (
        <div style={{ overflowX: 'auto', position: 'relative' }}>
          <table className="shadow-lg bg-white border-collapse">
          <thead>
            <tr>
              <th className="bg-blue-300 border text-left px-8 py-4">Ticket Id</th>
              <th className="bg-blue-300 border text-left px-8 py-4">Ticket Type</th>
              <th className="bg-blue-300 border text-left px-8 py-4">Requestor Name</th>
              <th className="bg-blue-300 border text-left px-8 py-4">Title</th>
              <th className="bg-blue-300 border text-left px-8 py-4">Description</th>
              <th className="bg-blue-300 border text-left px-8 py-4">Status</th>
              <th className="bg-blue-300 border text-left px-8 py-4">Severity</th>
              <th className="bg-blue-300 border text-left px-8 py-4">Priority</th>
              <th className="bg-blue-300 border text-left px-8 py-4">Source</th>
              <th className="bg-blue-300 border text-left px-8 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr className="hover:bg-gray-50" key={ticket.ticket_id} onClick={() => onRowClick(ticket.ticket_id)}>
                <td className="border px-8 py-4">{ticket.ticket_id}</td>
                <td className="border px-8 py-4">{ticket.ticket_type}</td>
                <td className="border px-8 py-4">{ticket.requestor_name ? ticket.requestor_name : 'User'}</td>
                <td className="border px-8 py-4">{truncateText(ticket.title)}</td>
                <td className="border px-8 py-4">{truncateText(ticket.description)}</td>
                <td className="border px-8 py-4">{ticket.status}</td>
                <td className="border px-8 py-4">{ticket.severity}</td>
                <td className="border px-8 py-4">{ticket.priority}</td>
                <td className="border px-8 py-4">{ticket.source}</td>
                <td className="border px-8 py-4">
                  <img src={EyeCon} onClick={() => onRowClick(ticket.ticket_id)} />
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
