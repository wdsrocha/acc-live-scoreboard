/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useInterval } from "../../hooks/useInterval";
import { data } from "../../lib/config";
import { neps, ScoreBoard } from "../../lib/neps";

const { users } = data;

const Home: NextPage = () => {
  const [scoreBoard, setScoreBoard] = useState<ScoreBoard | undefined>();

  const ranking = scoreBoard?.scores
    .filter((score) => {
      const id = Number(score.user.name.split(" ")[1]);
      return id in users;
    })
    .map((score) => {
      const id = Number(score.user.name.split(" ")[1]);

      const customPenality = score.problems
        .filter((problem) => problem.points > 0)
        .reduce((penality, problem) => {
          return (
            penality +
            problem.timestamp -
            users?.[id]?.begin +
            (problem.attempts - 1) * 20
          );
        }, 0);

      const name = users?.[id]?.name;

      return {
        id,
        nepsId: score.user.id,
        name,
        points: score.total.points,
        penality: customPenality,
      };
    })
    .filter((x) => x.name)
    .sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points; // greater is better
      } else if (a.penality !== b.penality) {
        return a.penality - b.penality; // lesser is better
      } else {
        return a.name.localeCompare(b.name); // whatever
      }
    });

  if (Math.random() < 0.1) {
    console.log({ ranking });
  }

  async function updateNepsScoreBoard() {
    try {
      const result = await neps.getScoreBoard(data.contestId);
      setScoreBoard(result);
    } catch (e) {}
  }

  useEffect(() => {
    updateNepsScoreBoard();
  }, []);

  useInterval(() => {
    updateNepsScoreBoard();
  }, 5000);

  const ICON_SIZE = 150;

  function Position({
    position,
    key,
    title,
    points,
    penality,
    data,
  }: {
    title: string;
    position: number;
    key: number;
    points: number;
    penality: number;
    data: any;
  }) {
    const positionFontColor = position < 3 ? "text-green-800" : "text-white";
    const titleFontColor = position < 3 ? "text-white" : "text-green-800";
    return (
      <li key={key} className="flex items-center justify-begin">
        <span
          className={`default-font absolute font-bold text-4xl ${positionFontColor}`}
        >
          {position + 1}º
        </span>
        <span
          className={`default-font absolute ml-24 font-bold ${titleFontColor}`}
        >
          {title}
        </span>
        <span className={`default-font absolute ml-24 mt-10 ${titleFontColor}`}>
          {data.id} | {points}/{penality}
        </span>
        <img
          src={`/images/user_${position < 3 ? "top3" : "normal"}.png`}
          width={600}
        />
      </li>
    );
  }

  function getTitle(id: number) {
    const { name, company, school } = users[id];

    const tokens = name.split(" ");
    const shortName = `${tokens[0]} ${tokens[tokens.length - 1]}`;

    if (!school && !company) return shortName;
    if (!school) return `${shortName} (${company})`;
    if (!company) return `${shortName} (${school})`;
    return `${shortName} (${school}/${company})`;
  }

  return (
    <main className="bg-[url('/images/bg.jpg')] min-h-screen">
      <div className="mx-auto w-full max-w-7xl min-h-screen">
        <div className="flex items-center justify-around">
          <span className=" text-4xl default-font text-white">RANK</span>
          <img src="/images/title.png" width={600} />
          <img src="/images/logo_main.png" width={120} />
        </div>
        <div className="flex items-begin justify-around -mt-12">
          <ol>
            {ranking?.slice(0, 5).map((x, i) => (
              <Position
                key={i}
                position={i}
                title={getTitle(x.id)}
                points={x.points}
                penality={x.penality}
                data={x}
              />
            ))}
          </ol>
          <ol>
            {ranking?.slice(5, 10).map((x, i) => (
              <Position
                key={i}
                position={i + 5}
                title={getTitle(x.id)}
                points={x.points}
                penality={x.penality}
                data={x}
              />
            ))}
          </ol>
        </div>
        <div className="flex items-center justify-between mx-64 mt-16">
          <img src="/images/logo_eldorado.png" width={ICON_SIZE} />
          <img src="/images/logo_icomp.png" width={ICON_SIZE} />
          <img src="/images/logo_sidia.png" width={ICON_SIZE} />
          <img src="/images/logo_polo_digital.png" width={ICON_SIZE} />
        </div>
      </div>
    </main>
  );
};

export default Home;
