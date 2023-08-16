import { useEffect, useState } from "react";

const API_URL = "https://ba01-152-207-253-90.ngrok-free.app/api";

const useFetch = ({ url, method, body = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch(API_URL + url, { method, mode: "cors", credentials: "include", body })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setResponse(response);
      })
      .catch((err) => setError(err))
      .finally(setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, url, body]);

  return { response, error, loading };
};

export default useFetch;
