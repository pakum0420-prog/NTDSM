import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";

function AuditLogs() {

  const [logs, setLogs] =
    useState([]);

const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");

const [currentPage, setCurrentPage] = useState(1);

const recordsPerPage = 5;

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {

    const response =
      await fetch(
        "https://ntdsm.onrender.com/api/audit-logs"
      );

    const data =
      await response.json();

    setLogs(data);

  };
  
  const filteredLogs = logs.filter((log) => {

  const matchesSearch =
    log.subscriber_name
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesFilter =
    filter === "All" ||
    log.action === filter;

  return matchesSearch && matchesFilter;

});

const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

const currentLogs = filteredLogs.slice(
  indexOfFirstRecord,
  indexOfLastRecord
);

const totalPages = Math.ceil(
  filteredLogs.length / recordsPerPage
);

 
const exportCSV = () => {

  const headers = [
    "ID",
    "Action",
    "Subscriber",
    "Created At"
  ];

  const rows = filteredLogs.map((log) => [
    log.id,
    log.action,
    log.subscriber_name,
    log.created_at
  ]);

  const csv =
    [headers, ...rows]
      .map((e) => e.join(","))
      .join("\n");

  const blob = new Blob(
    [csv],
    { type: "text/csv;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "audit_logs.csv";

  link.click();

};

  return (

    <div className="container-fluid py-3">
      <Breadcrumb
  items={[
    {
      label: "Dashboard",
      path: "/admin-dashboard"
    },
    {
      label: "Audit Logs"
    }
  ]}
/>

      <h1 className="mb-4">
        Audit Logs
      </h1>


       <div className="mb-3">

  <button
    className="btn btn-success"
    onClick={exportCSV}
  >
    Export CSV
  </button>

</div>
       
         <div className="row mb-4">

  <div className="col-md-8">
    <input
      type="text"
      className="form-control"
      placeholder="Search Subscriber..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
    />
  </div>

  <div className="col-md-4">
    <select
      className="form-select"
      value={filter}
      onChange={(e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
      }}
    >
      <option value="All">All Actions</option>
      <option value="Created">Created</option>
      <option value="Updated">Updated</option>
      <option value="Deleted">Deleted</option>
    </select>
  </div>

</div>

<div/>

      <div className="card">

        <div className="card-body">
          <div className="table-responsive">
          <table className="table table-striped">

            <thead>

              <tr>

                <th>ID</th>

                <th>Action</th>

                <th>Subscriber</th>

                <th>Date & Time</th>

              </tr>

            </thead>

            <tbody>

              {currentLogs.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center"
                  >
                    No Audit Logs Found
                  </td>

                </tr>

              ) : (

                 currentLogs.map((log) => (

                  <tr key={log.id}>

                    <td>
                      {log.id}
                    </td>

                    <td>

                      <span
                        className={
                          log.action ===
                          "Created"
                            ? "badge bg-success"
                            : log.action ===
                              "Updated"
                            ? "badge bg-warning text-dark"
                            : "badge bg-danger"
                        }
                      >
                        {log.action}
                      </span>

                    </td>

                    <td>
                      {log.subscriber_name}
                    </td>

                    <td>
                      {log.created_at}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>
       </div>
           <div className="d-flex justify-content-center mt-4">

  <button
    className="btn btn-secondary me-2"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Previous
  </button>

  {[...Array(totalPages)].map((_, index) => (

    <button
      key={index}
      className={
        currentPage === index + 1
          ? "btn btn-primary me-2"
          : "btn btn-outline-primary me-2"
      }
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </button>

  ))}

  <button
    className="btn btn-secondary"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>

</div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default AuditLogs;