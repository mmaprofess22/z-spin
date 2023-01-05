const colorMap = [
  "#fbf8cc",
  "#fde4cf",
  "#ffcfd2",
  "#f1c0e8",
  "#cfbaf0",
  "#a3c4f3",
  "#8eecf5",
  "#98f5e1",
  "#b9fbc0",
];

export default function Pizza({ text, index, length }) {
  const deg = 350 / length;
  const x = (Math.cos((deg * Math.PI) / 180) * 100).toFixed(2);
  const y = (Math.sin((deg * Math.PI) / 180) * 100).toFixed(2);
  const clipPath = `polygon(
    0% 0%, 
    100% 0%, 
    ${x}% ${y}%
  )`;

  switch (length) {
    case 1:
      return (
        <div
          className="relative w-full h-full whitespace-nowrap text-black font-semibold text-xl"
          style={{
            backgroundColor: colorMap[index],
          }}
        >
          <span className="absolute top-[20%] left-[50%] -translate-x-[50%]">
            {text}
          </span>
        </div>
      );
    case 2:
      return (
        <div
          className="relative w-full h-1/2 mb-0.5 whitespace-nowrap text-black font-semibold text-xl"
          style={{
            backgroundColor: colorMap[index],
          }}
        >
          <span
            className={`absolute left-[50%] -translate-x-[50%] 
                ${!index ? "rotate-90 top-[20%]" : "-rotate-90 bottom-[20%]"}`}
          >
            {text}
          </span>
        </div>
      );
    default:
      return (
        <div
          className="absolute w-full h-full select-none"
          style={{
            transform:
              length === 3
                ? `rotate(${(360 / length) * (index - 1) + deg / 2 - 75}deg)`
                : `rotate(${(360 / length) * (index - 1) + deg / 2 - 90}deg)`,
          }}
        >
          <div
            className="absolute w-full h-full left-[50%] top-[50%]"
            style={{
              backgroundColor: colorMap[index % colorMap.length],
              clipPath,
            }}
          >
            <div
              className={`whitespace-nowrap text-black
                ${
                  length <= 40
                    ? "mr-[52%] font-semibold text-lg"
                    : "mr-[51%] font-medium text-sm"
                }`}
              style={{
                transform:
                  length === 3 ? `rotate(45deg)` : `rotate(${deg / 2}deg)`,
                transformOrigin: "top left",
              }}
            >
              <div className="rotate-180">
                <div className="translate-y-[50%]">{text}</div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
