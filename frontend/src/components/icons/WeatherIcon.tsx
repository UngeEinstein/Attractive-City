import React from "react";
import { WiCloud, WiDaySunny, WiSnow } from "react-icons/wi";

export const WeatherIcon = (props: any) => {
  return (
    <>
      {props.weather === "cloudy" ? (
        <WiCloud />
      ) : props.weather === "sunny" ? (
        <WiDaySunny />
      ) : props.weather === "snowy" ? (
        <WiSnow />
      ) : (
        <></>
      )}
    </>
  );
};
