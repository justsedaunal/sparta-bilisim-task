import axios from "axios";
import { useState, useEffect } from "react";
import DateTime from "./date";
const Weather = () => {
  let lat = "39.91987";
  let lon = "32.85427";


  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [reload, setReload] = useState();
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_ENV_VARIABLE}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data)
      });
  }, [reload]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;


    
//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_ENV_VARIABLE}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setMyData(data);
//         });
//       console.log("called every 1 second");
//     }, 10000);
//     return () => clearInterval(interval);
//   }, []);
//   console.log("DATA", myData.name,myData.main.temp);

  //   axios
  //     .get(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_ENV_VARIABLE}`
  //     )
  //     .then( (response) => {
  //         // console.log(response);
  //     }

  //     );

  return (
    <div>
      <DateTime />
 
    <div>
      <h1> {data.name} </h1>
      <p> {data.main.temp} </p>
    </div>

    </div>
  );
};

export default Weather;
