import React, { useState } from "react";
import { AutoComplete, Input } from "antd";

const { Option } = AutoComplete;

function generateIPRange(ip) {
  const parts = ip.split(".");
  if (parts.length !== 4) {
    // IP adresinin dört bölüme ayrılmış olması gerekir
    return [];
  }
  const lastByte = parseInt(parts[3]);
  if (isNaN(lastByte)) {
    // Son bölüm sayısal bir ifade olmalıdır
    return [];
  }
  const ips = [];
  for (let i = 1; i <= 254; i += 50) {
    if (i === lastByte) {
      continue;
    }
    const newIP = `${parts[0]}.${parts[1]}.${parts[2]}.${i}`;
    ips.push(newIP);
  }
  return ips;
}

function App() {
  const [options, setOptions] = useState([]);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e);
  };

  function handleSearch(value) {
    if (!value) {
      // Boş bir dizeye arama yapılmamalıdır
      setOptions([]);
      return;
    }
    const ipRange = generateIPRange(value);
    const firstIP = `${value.split(".")[0]}.${value.split(".")[1]}.${
      value.split(".")[2]
    }.1`;
    const lastIP = `${value.split(".")[0]}.${value.split(".")[1]}.${
      value.split(".")[2]
    }.254`;

    const allOptions = [
      //   {
      //     label: "İlk IP adresi",
      //     value: firstIP,
      //   },
      //   {
      //     label: "Son IP adresi",
      //     value: lastIP,
      //   },
      {
        label: " IP addresses",
        options: ipRange.map((ip) => ({ value: ip })),
      },
    ];
    setOptions(allOptions);
  }

  return (
    <div>
      <AutoComplete
        style={{ width: 200 }}
        options={options}
        onSearch={handleSearch}
      >
        <Input placeholder="Enter IP Address" allowClear onChange={onChange} />
      </AutoComplete>
    </div>
  );
}

export default App;
