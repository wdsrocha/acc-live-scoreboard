/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export function ScoreboardRow({
  position,
  key,
  title,
  data,
}: {
  title: string;
  position: number;
  key: number;
  data: Row;
}) {
  const { points, penality } = data;
  const positionFontColor = position <= 3 ? "text-green-800" : "text-white";
  const titleFontColor = position <= 3 ? "text-white" : "text-green-800";
  return (
    <li key={key} className="flex items-center justify-begin">
      <span
        className={`default-font ${
          position !== 10 ? "ml-3" : "ml-1"
        } mb-3 absolute font-bold text-4xl ${positionFontColor}`}
      >
        {position}º
      </span>
      <span
        className={`default-font absolute ml-24 mb-6 font-bold text-xl ${titleFontColor}`}
      >
        {title}
      </span>
      <span
        className={`default-font text-sm  absolute ml-24 mt-6 ${titleFontColor}`}
      >
        Pontuação: {points}
      </span>
      <img
        src={`/images/user_${position <= 3 ? "top3" : "normal"}.png`}
        width={600}
      />
    </li>
  );
}
