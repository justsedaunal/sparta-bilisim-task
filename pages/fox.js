"use client";

import React, { useEffect, useState } from "react";
import { Spin } from "antd";

const Fox = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [reload, setReload] = useState();
  useEffect(() => {
    setLoading(true);
    fetch("https://randomfox.ca/floof/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [reload]);

  if (isLoading)
    return (
    
        <Spin tip="Loading" size="large">
          <div className="content articles__article" />
        </Spin>

    );
  if (!data) return <p class="articles__article">No data</p>;

  return (
    <>
      {/* <button onClick={() => setReload(!reload)} >Reload</button> */}
      <li
        class="articles__article"
        style={{ "--animation-order": 3 }}
        onClick={() => setReload(!reload)}
      >
        <a class="articles__link">
          <div class="articles__content articles__content--lhs">
            <img src={data.image} class="articles__title" />
            <div class="articles__footer">
              {/* <p>Puddings</p> */}
              {/* <time>3 Mar 2020</time> */}
            </div>
          </div>
          <div
            class="articles__content articles__content--rhs"
            aria-hidden="true"
          >
            <img src={data.image} class="articles__title" />{" "}
            <div class="articles__footer">
              {/* <p>Puddings</p> */}
              {/* <time>3 Mar 2020</time> */}
            </div>
          </div>
        </a>
        <button class="button">next</button>
      </li>
    </>
  );
};

export default Fox;
