import { useEffect, useState } from "react";
import Footer from "../components/Footer";

function AuditLogs() {

  const [logs, setLogs] =
    useState([]);

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

  return (

    <div>

      <h1 className="mb-4">
        Audit Logs
      </h1>

      <div className="card">

        <div className="card-body">

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

              {logs.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center"
                  >
                    No Audit Logs Found
                  </td>

                </tr>

              ) : (

                logs.map((log) => (

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

      </div>

      <Footer />

    </div>

  );

}

export default AuditLogs;