import React, { useState } from "react";
import Input from "./Input";
import Pizza from "./Pizza";

import Swal from "sweetalert2";

export default function App() {
  const [isZoom, setIsZoom] = useState(false);
  const [isOnZoom, setisOnZoom] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(true);
  const [degRes, setDegRes] = useState(0);
  const [isSprin, setIsSprin] = useState(false);
  const [rewardList, setRewardList] = useState([]);
  const [background, setBackground] = useState(
    localStorage.getItem("bg") ||
      "https://toruskit.com/assets/img/util/gradient-01-w.svg"
  );
  const [dataFix, setDataFix] = useState([]);
  const [dataSet, setDataSet] = useState([]);

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const onSprin = () => {
    if (isSprin) return;
    if (!dataSet.length) {
      Swal.fire({
        icon: "warning",
        title: "ไม่มีข้อมูลสำหรับสุ่ม",
        confirmButtonText: "ยืนยัน",
      }).then((_) => {
        setDataSet(dataSet.filter((_, i) => i !== res));
      });
      return;
    }
    setIsInputOpen(false);
    setIsSprin(true);
    const length = dataSet.length;
    const deg = 360 / length;
    let res = random(0, length - 1);
    if (dataFix.length) {
      res = dataSet.findIndex((ds) => ds === dataFix[0]);
      setDataFix(dataFix.filter((_, i) => i !== 0));
    }
    const newDeg = -deg * res + random(-deg * 10, deg * 10) / 30;
    setDegRes(-3600 + newDeg);
    setTimeout(() => {
      isZoom && setisOnZoom(true);
    }, 3000);
    setTimeout(() => {
      setRewardList((rl) => [...rl, dataSet[res]]);
      setDegRes(newDeg);
      setIsSprin(false);
      Swal.fire({
        title: dataSet[res],
        confirmButtonText: "ยืนยัน",
      }).then((_) => {
        setDataSet(dataSet.filter((_, i) => i !== res));
        setisOnZoom(false);
      });
    }, [7000]);
  };

  return (
    <div
      className="relative w-[100vw] h-[100vh] bg-cover bg-center"
      style={{ backgroundImage: `url('${background}')` }}
    >
      <div
        className={`absolute top-[50%] left-[50%] -translate-x-[50%] -ml-[150px]
          ${
            isOnZoom
              ? "-translate-y-[13%] w-[300vw] max-w-[300vh] h-[300vw] max-h-[300vh]"
              : "-translate-y-[50%] w-[80vw] max-w-[80vh] h-[80vw] max-h-[80vh]"
          }`}
        style={{ transition: isOnZoom ? "all 2s" : "" }}
      >
        <div
          className={`absolute top-[50%] left-[50%] -translate-x-[50%] w-[15%] h-[15%] flex justify-center items-center 
          bg-white border-gray-700 rounded-full z-10 text-black font-bold select-none cursor-pointer shadow-[0_0_5px_rgba(0,0,0,0.5)]
          ${
            isOnZoom
              ? "border-[10px] -translate-y-[150%]"
              : "border-[3px] -translate-y-[50%]"
          }`}
          style={{ transition: isOnZoom ? "all 2s" : "" }}
          onClick={onSprin}
        >
          หมุน
          <div
            className="absolute -top-[30%] left-[34%] right-[34%] bottom-[calc(100%-1px)] z-20 bg-gray-700"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          ></div>
          <div
            className="absolute -top-[30%] left-[35%] right-[35%] bottom-[90%] z-20 bg-white"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          ></div>
        </div>
        <div
          className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_0_2px_#000,0_0_0_9px_#fff,0_0_0_12px_#000,0_0_50px_12px_rgba(0,0,0,0.3)] bg-black/75"
          style={{
            transform: `rotate(${degRes}deg)`,
            transition: isSprin ? "all 6.5s cubic-bezier(0, 0, 0, 1)" : "",
          }}
        >
          {dataSet.map((t, i) => (
            <Pizza key={i} text={t} index={i} length={dataSet.length} />
          ))}
        </div>
      </div>
      <Input
        isZoom={isZoom}
        setIsZoom={setIsZoom}
        isSprin={isSprin}
        isInputOpen={isInputOpen}
        setIsInputOpen={setIsInputOpen}
        setBackground={setBackground}
        setDataSet={setDataSet}
        setDataFix={setDataFix}
        rewardList={rewardList}
        setRewardList={setRewardList}
        setDegRes={setDegRes}
      />
    </div>
  );
}
