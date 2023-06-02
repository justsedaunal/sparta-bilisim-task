import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import IPInput from "../pages/input";

import { Spin, TableProps } from "antd";
import { Button, Space, Table,Typography } from "antd";
const { Text } = Typography;

import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";

interface DataType {
  key: string;
  connectiontype: string;
  criticality_level: number;
  date: string;
  desc: string;
  id: number;
  source: string;
  type: string;
  url: string;
}

const App: React.FC = () => {
  const handleRowClick = (record) => {
    console.log("Clicked row:", record);
    // Perform any desired actions with the clicked row data
  };

  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const [dataUsom, setData] = useState<DataType[]>([]);
  const [isLoading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    setLoading(true);

    try {
      let response = await fetch(
        `https://www.usom.gov.tr/api/address/index?type=domain&per-page=100`
      ).then((res) => res.json());
      setData(response.models as any);
    } catch (error) {}

    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    // fetch(`https://www.usom.gov.tr/api/address/index?type=domain&per-page=100`)
    //   .then((res) => res.json())
    //   .then((dataUsom) => {
    //     setData(dataUsom.models);
    //     setLoading(false);
    //     console.log(dataUsom.models);
    //   });
    getData();
  }, [getData]);

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "date",
    });
  };

  const handleDetailClick = async (url: string) => {
    axios
      .get(
        `https://api.ip2whois.com/v2?key=C6BA7F2A20EB76313D5D2918966CE963&domain=${url}`
      )
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const handleDetailClick = (url: string) => {
  //   console.log(url)
  //   fetch(`https://api.ip2whois.com/v2?key=C6BA7F2A20EB76313D5D2918966CE963&domain=${url}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       // Burada alınan alan adı bilgilerini istediğiniz şekilde kullanabilirsiniz.
  //     });
  // };
  const columns: ColumnsType<DataType> = [
    {
      title: "Address",
      dataIndex: "url",
      key: "url",
      filters: [
        { text: ".net", value: ".net" },
        { text: ".com", value: ".com" },
        { text: ".xyz", value: ".xyz" },
      ],
      filteredValue: filteredInfo.url || null,
      onFilter: (value: string, record) => record.url.includes(value),
      sorter: (a, b) => a.url.length - b.url.length,
      sortOrder: sortedInfo.columnKey === "url" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      //   sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "date" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      filters: [
        { text: "BP", value: "BP" },
        { text: "MD", value: "MD" },
      ],
      filteredValue: filteredInfo.desc || null,
      onFilter: (value: string, record) => record.desc.includes(value),
      sorter: (a, b) => a.desc.length - b.desc.length,
      sortOrder: sortedInfo.columnKey === "desc" ? sortedInfo.order : null,
      ellipsis: true,
    },
    //     {
    //       title: "Action",
    //       dataIndex: "url",
    //       key: "url",
    //       render: (text) => (

    //             <a  onClick={ () => handleDetailClick(text)   }  >
    // Detail
    //             </a>

    //       ),
    //     },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Button
    //       type="primary"
    //       onClick={() => handleDetailClick(text.url)}
    //       style={{ background: "#914141bd" }}
    //     >
    //       Click
    //     </Button>
    //   ),
    // },
  ];

  return (
    <>
      {/* <div onClick={() => handleDetailClick("")}>data</div> */}
      <Space style={{ marginBottom: 16 }}>
        {/* <Button onClick={setAgeSort}>Sort age</Button> */}
        {/* <Button onClick={clearFilters}>Clear filters</Button> */}
        {/* <Button onClick={clearAll}>Clear filters and sorters</Button> */}
      </Space>
      {isLoading ? (
        <Spin tip="Loading" size="large"></Spin>
      ) : (
        <>
          {/* <IPInput /> */}
          <Text type="danger"  >Last Uptaded 100 Malicious Links According To The USOM API</Text>


          <Table
            loading={isLoading}
            columns={columns}
            dataSource={dataUsom}
            onChange={handleChange}
          />
        </>
      )}
    </>
  );
};

export default App;
