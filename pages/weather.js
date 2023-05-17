import axios from "axios";
import { useState, useEffect } from "react";
import DateTime from "./date";
import { Spin } from "antd";
const Weather = () => {
  let lat = "39.91987";
  let lon = "32.85427";

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [reload, setReload] = useState();
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_ENV_VARIABLE}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setTimeout(() => {
                setLoading(false);
        }, 1000);
  

        console.log(data);
      });
  }, [reload]);

  return (
<>

{!data ? (
        <Spin tip="Loading" size="large" style={{maxHeight:"150px",minHeight:"150px"}} >
        </Spin>
      ) : (
        <>
          {isLoading ? (
            <Spin tip="Loading" size="large" style={{maxHeight:"150px",minHeight:"150px"}} >
            </Spin>
          ) : (
            <>
              {" "}
              <div class="card"  >
                <div class="card__info">
                  <p class="card__info__place">{data.name}</p>
                  <DateTime />
                </div>
                <div class="card__weather">
                  <svg
                    width="34"
                    class="card__weather__icon"
                    height="24"
                    viewBox="0 0 34 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31.7764 13.3718C30.8073 12.1841 29.5779 11.4201 28.0897 11.0793C28.5632 10.3633 28.7992 9.57921 28.7992 8.72709C28.7992 7.52249 28.3664 6.49418 27.5014 5.64182C26.6361 4.78976 25.592 4.36354 24.3688 4.36354C23.2612 4.36354 22.3034 4.71584 21.496 5.42044C20.8155 3.80682 19.7334 2.50001 18.251 1.50001C16.7682 0.500241 15.1152 0 13.2921 0C10.8461 0 8.75757 0.852482 7.02679 2.55703C5.29589 4.26116 4.43071 6.31818 4.43071 8.72727C4.43071 8.89777 4.44229 9.1419 4.46532 9.46011C3.12694 10.0738 2.04801 11.0027 1.22884 12.2473C0.409735 13.4913 0 14.8637 0 16.3637C0 18.4659 0.758789 20.2642 2.27594 21.7583C3.79316 23.2528 5.61918 24 7.75375 24H26.5847C28.4191 24 29.9853 23.3603 31.2836 22.0823C32.5816 20.804 33.2308 19.2615 33.2308 17.4545C33.2306 15.9206 32.7457 14.5591 31.7764 13.3718Z"
                      fill="#567DF4"
                    />
                  </svg>

                  <p class="card__weather__temp">
                    {Math.floor(data.main.temp - 272.15)}° C
                  </p>
                </div>
              </div>{" "}
            </>
          )}
        </>
      )}
</>
      
  
  );

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
};

export default Weather;
