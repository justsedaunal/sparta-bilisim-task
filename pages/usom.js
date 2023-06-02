import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import UsomTable from "../pages/table";

function usom() {
  // const [data, setData] = useState(null);
  // const [isLoading, setLoading] = useState(false);
  // const [reload, setReload] = useState();
  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`https://www.usom.gov.tr/api/address/index?type=domain&per-page=100`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //       console.log(data.models)
  //     });
  // }, [reload]);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No data</p>;

  return (
    <div>
      {/* <Link href="/">
        <button className="page-button"> HOME</button>
      </Link> */}

      <UsomTable />
    </div>
  );
}

export default usom;
