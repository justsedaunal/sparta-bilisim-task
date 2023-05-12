"use client";

import React, { useEffect, useState } from 'react';

const Fox = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [reload, setReload] = useState()
  useEffect(() => {
    setLoading(true);
    fetch('https://randomfox.ca/floof/')
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
      <img src={data.image} />
      <button onClick={() => setReload(!reload)} >Reload</button>
    </div>
  );
};

export default Fox;