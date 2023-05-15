import React, { useState, useEffect } from "react";
import type { TableProps } from "antd";
import { Button, Space, Table } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";

interface DataType {
  // key: string;
  // name: string;
  // age: number;
  // address: string;

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
    const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
    >({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
    const [dataUsom, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [reload, setReload] = useState();
    useEffect(() => {
        setLoading(true);
        fetch(`https://www.usom.gov.tr/api/address/index?type=domain&per-page=100`)
        .then((res) => res.json())
        .then((dataUsom) => {
            setData(dataUsom.models);
            setLoading(false);
            console.log(dataUsom.models);
        });
    }, [reload]);
    const data: DataType[] = dataUsom

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

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
      columnKey: "age",
    });
  };

  const columns: ColumnsType<DataType> = [
    {
        title: 'Address',
        dataIndex: 'url',
        key: 'url',
        filters: [
          { text: '.net', value: '.net' },
          { text: '.com', value: '.com' },
          { text: '.xyz', value: '.xyz' },
        ],
        filteredValue: filteredInfo.url || null,
        onFilter: (value: string, record) => record.url.includes(value),
        sorter: (a, b) => a.url.length - b.url.length,
        sortOrder: sortedInfo.columnKey === 'url' ? sortedInfo.order : null,
        ellipsis: true,
      },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      //   sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      filters: [
        { text: "London", value: "London" },
        { text: "New York", value: "New York" },
      ],
      filteredValue: filteredInfo.address || null,
      //   onFilter: (value: string, record) => record.address.includes(value),
      //   sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};

export default App;
