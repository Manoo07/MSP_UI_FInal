const TicketCard = ({selectedTicket})=>{
    return (
              <div className="flex items-center justify-center text-center">
                {selectedTicket && (
                  <div className="bg-white p-4 rounded-md shadow-md mb-4 w-6/12">
                    <div className="grid grid-cols-1 gap-3">
                      <p className="mb-1 flex items-center"><b>Ticket Id: </b> <span className="ml-2">{selectedTicket.ticket_id}</span></p>
                      <p className="mb-1 flex items-center"><b>Ticket Type: </b> <span className="ml-2">{selectedTicket.ticket_type}</span></p>
                      <p className="mb-1 flex items-center"><b>Requestor Name: </b> <span className="ml-2">{selectedTicket.requestor_name}</span></p>
                      <p className="mb-1 flex items-center"><b>Title: </b> 
                      <div className="overflow-auto max-h-11 ml-2 m-4"><span className="ml-2 text-justify">{selectedTicket.title}</span></div> </p>
                      <div className="mb-1 flex items-center text-justify">
                        <b>Description:</b>
                        <div className="overflow-auto max-h-32 ml-2 m-4">{/* Adjust the max-height as needed */}
                          <span className="ml-2">{selectedTicket.description}</span>
                        </div>
                      </div>
                      <p className="mb-1 flex items-center"><b>Status: </b> <span className="ml-2">
                      { selectedTicket.status}</span></p>
                      <p className="mb-1 flex items-center"><b>Severity: </b> <span className="ml-2">{selectedTicket.severity}</span></p>
                      <p className="mb-1 flex items-center"><b>Priority: </b> <span className="ml-2">
                      {selectedTicket.priority}</span></p>
                      <p className="mb-1 flex items-center"><b>Source: </b> <span className="ml-2">
                      {selectedTicket.source}</span></p>
                    </div>
                  </div>
                )}
              </div>
    )
}

export default TicketCard