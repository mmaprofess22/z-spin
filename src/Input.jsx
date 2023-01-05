import React, { useEffect, useRef, useState } from "react";

const defList = [
  "Wade Wiley",
  "Julia Page",
  "Abby Tucker",
  "Aydan Macias",
  "Julius Mcknight",
  "Chaim Stephenson",
  "Nicolas Newman",
  "Sarah Finley",
  "Tyree Flowers",
  "Guadalupe Shannon",
  "Francesca Lawson",
  "Turner Gibson",
];

export default function Input({
  isZoom,
  setIsZoom,
  isSprin,
  isInputOpen,
  setIsInputOpen,
  setBackground,
  setDataSet,
  setDataFix,
  rewardList,
  setRewardList,
  setDegRes,
}) {
  const bgInput = useRef(null);
  const [listValue, setListValue] = useState(
    localStorage.getItem("listValue") || defList.join("\n")
  );
  const [fixValue, setFixValue] = useState(
    localStorage.getItem("fixValue") || ""
  );
  const [fullScreen, setFullScreen] = useState(!!document.fullscreenElement);

  useEffect(() => {
    onUpdateDataSet();
  }, []);

  const onUpdateDataSet = (a, b) => {
    if (isSprin) return;
    let list = (a !== undefined ? a : listValue).split("\n").filter((t) => t);
    const fix = (b !== undefined ? b : fixValue).split("\n").filter((t) => t);
    list = [...list, ...fix];
    // if (list.length === 0) list = ["", "", "", ""];
    // else if (list.length === 1) list = [...list, ...list, ...list, ...list];
    // else if (list.length <= 3) list = [...list, ...list];
    setDataSet(shuffle(list));
    setDataFix(shuffle(fix));
    setRewardList([]);
    setDegRes(0);
  };

  const onUploadBG = async (e) => {
    const base64 = await toBase64(e.target.files[0]);
    setBackground(base64);
    localStorage.setItem("bg", base64);
  };

  return (
    <>
      <button
        className="absolute right-[149px] top-0 w-fit text-center bg-black/70 rounded-b-lg px-4 py-2 z-10 flex items-center"
        onClick={() => setIsZoom((z) => !z)}
      >
        <input
          className="pointer-events-none mr-2"
          type="checkbox"
          checked={isZoom}
        />
        <div className="mb-0.5">แสดงผลแบบซูม</div>
      </button>
      <button
        className="absolute right-0 top-0 w-20 text-center bg-black/70 rounded-bl-lg px-4 py-2 z-10"
        onClick={() => setIsInputOpen((s) => !s)}
      >
        {isInputOpen ? "ประวัติ" : "ตั่งค่า"}
      </button>
      <button
        className="absolute right-20 top-0 mr-2 text-center bg-black/70 rounded-b-lg px-4 py-2 z-10"
        onClick={() => {
          toggleFullScreen();
          setFullScreen((fs) => !fs);
        }}
      >
        <img
          className="w-5 h-5"
          src={
            fullScreen
              ? "https://img.icons8.com/external-inkubators-detailed-outline-inkubators/2x/external-exit-full-screen-arrows-inkubators-detailed-outline-inkubators-3.png"
              : "https://img.icons8.com/external-inkubators-detailed-outline-inkubators/2x/external-full-screen-arrows-inkubators-detailed-outline-inkubators-3.png"
          }
          style={{ filter: "invert(100%)" }}
        />
      </button>
      <div className="absolute right-2 top-12 bottom-2 w-[300px]">
        <div
          className={`absolute w-full h-full bg-black/70 border-2 border-white/10 rounded-xl transition-all p-2 pt-4 flex flex-col overflow-hidden
            ${!isInputOpen && "opacity-0 pointer-events-none"}`}
        >
          <p className="text-lg font-semibold text-center">ตั่งค่า</p>
          <div className="flex">
            <input ref={bgInput} type="file" hidden onChange={onUploadBG} />
            <button
              className="flex-[4] mr-2 w-full bg-yellow-800 mt-2 p-2 pt-2.5 rounded-md"
              onClick={() => bgInput.current.click()}
            >
              อัพโหลด พื้นหลัง
            </button>
            <button
              className="flex-1 w-full bg-gray-800 mt-2 p-2 pt-2.5 rounded-md"
              onClick={() => {
                setBackground(
                  "https://toruskit.com/assets/img/util/gradient-01-w.svg"
                );
                localStorage.setItem("bg", "");
              }}
            >
              ลบ
            </button>
          </div>
          <hr className="mb-1 mt-3 opacity-20" />
          <textarea
            value={listValue}
            onChange={(e) => {
              if (isSprin) return;
              setListValue(e.target.value);
              localStorage.setItem("listValue", e.target.value);
              onUpdateDataSet(e.target.value);
            }}
            className="flex-[2] bg-white/10 rounded-lg text-white p-2 mt-2 outline-none"
          ></textarea>
          <textarea
            value={fixValue}
            onChange={(e) => {
              if (isSprin) return;
              setFixValue(e.target.value);
              localStorage.setItem("fixValue", e.target.value);
              onUpdateDataSet(undefined, e.target.value);
            }}
            className="flex-1 bg-white/10 rounded-lg text-white p-2 mt-2 outline-none"
          ></textarea>
        </div>
        {/* -------------------------- */}
        <div
          className={`absolute w-full h-full bg-black/70 border-2 border-white/10 rounded-xl transition-all p-2 pt-4 flex flex-col overflow-hidden
            ${isInputOpen && "opacity-0 pointer-events-none"}`}
        >
          <p className="text-lg font-semibold text-center">ประวัติ</p>
          <div className="flex-1 overflow-y-auto m-2">
            <table>
              <tbody>
                {rewardList.map((t, i) => (
                  <tr key={i}>
                    <td className="w-0 text-right pr-2">{i + 1}.</td>
                    <td>{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="w-full bg-red-900 p-2 rounded-md"
            onClick={() => onUpdateDataSet()}
          >
            ล้างประวัติ
          </button>
        </div>
      </div>
    </>
  );
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

function toggleFullScreen() {
  if (
    !document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement
  ) {
    // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}
