"use client";

import React, { useEffect, useState } from "react";

const Stoa = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [reload, setReload] = useState();
  useEffect(() => {
    setLoading(true);
    fetch("https://api.themotivate365.com/stoic-quote")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [reload]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1> {data.author} </h1>
      <p> {data.quote} </p>
      <button onClick={() => setReload(!reload)}>Reload</button>
    </div>
  );
};

export default Stoa;
