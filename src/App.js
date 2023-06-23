import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

   const fetchData = () => {
      fetch("https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/70726f")
        .then((response) => {
           let html = response.text();
           return html;
        })
        .then((data) => {
           setData(data);
           console.log("DATA:  " , data);           
        })
        .catch((err) => { 
           setError(error);
           console.log('Fetch Error', err);  
        })
        .finally(() => {
           setLoading(false);
         });        

    }

    fetchData();
  }, [error, data]);
  
  

  if (loading) return "Loading...";
  if (error) return "Error!";
  return (
    <>
      <pre>{JSON.stringify(data)}</pre>
    </>


    
  );
}

export default App;

