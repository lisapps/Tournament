import React from "react";
import { useAsync } from "react-async";

// this calls our Express Backend on the same server during development. This must be changed to the full path in production.
const loadApiData = async () =>
  await fetch("http://localhost:3002/dashboard")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());

function Dashboard() {
  const { data, error, isLoading } = useAsync({ promiseFn: loadApiData });
  if (isLoading) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data)
    return (
      <>
        <p className="animated fadeIn">{data.name}</p>
      </>
    );
}

export default Dashboard;
