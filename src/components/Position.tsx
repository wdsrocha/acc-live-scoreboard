/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { Row } from "../typings/types";

export function Position({
  position,
  title,
  data,
}: {
  title: string;
  position: number;
  data: Row;
}) {
  const { points } = data;
  const positionFontColor = position <= 3 ? "text-green-700" : "text-white";
  const titleFontColor = position <= 3 ? "text-white" : "text-green-700";
  return (
    <li className="flex items-center justify-begin">
      <span
        className={`${
          position !== 10 ? "ml-3" : "ml-1"
        } mb-3 absolute font-bold text-4xl ${positionFontColor}`}
      >
        {position}º
      </span>
      <span
        className={`absolute ml-24 mb-6 font-bold text-xl ${titleFontColor}`}
      >
        {title}
      </span>
      <span className={`text-sm  absolute ml-24 mt-6 ${titleFontColor}`}>
        Pontuação: {points}
      </span>
      <img
        src={`/images/user_${position <= 3 ? "top3" : "normal"}.png`}
        width={600}
      />
    </li>
  );
}
