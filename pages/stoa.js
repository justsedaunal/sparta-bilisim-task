"use client";

import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { Empty } from "antd";

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

  return (
    <>
      {!data ? (
        <Spin
          tip="Loading"
          size="large"
          style={{ maxHeight: "150px", minHeight: "150px" }}
        ></Spin>
      ) : (
        <li
          class="articles__article"
          style={{ "--animation-order:": 2 }}
          onClick={() => setReload(!reload)}
        >
          <a class="articles__link">
            <div class="articles__content articles__content--lhs">
              <h2 class="articles__title"> {data.quote} </h2>
              <div class="articles__footer">
                <p>{data.author} </p>
                {/* <time>2 Feb 2020</time> */}
              </div>
            </div>
            <div
              class="articles__content articles__content--rhs"
              aria-hidden="true"
            >
              <h2 class="articles__title"> {data.quote} </h2>
              <div class="articles__footer">
                <p>Chocolates</p>
                {/* <time>2 Feb 2020</time> */}
              </div>
            </div>
          </a>
          <button class="button">next</button>
        </li>
      )}
    </>
  );
};

export default Stoa;
