/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { data } from "../lib/config";
import { neps, ScoreBoard } from "../lib/neps";

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
          // We should check for cheat attempts here:
          // 1. What should happen if a submission is before the first round?
          // 2. How about submissions between rounds?
          // 3. And what if the participant isn't in this round?
          // See the comment below for the solution of (1) and (2)

          // let ts = problem.timestamp;
          // let elapsedTime = 0;

          // rounds.forEach((round, index) => {
          // Checks if this submission was made after the end of the last
          // round. If true, pretend that the submission was made right on the
          // start of the current round.

          // const INF = 999_999_999;
          // This will work as long as ONLY the last round don't have an end
          //   const end = round.end ?? INF;

          //   if (
          //     index - 1 >= 0 &&
          //     (rounds[index - 1]?.end ?? INF) < ts &&
          //     ts <= round.begin
          //   ) {
          //     ts = round.begin;
          //   }

          //   if (round.begin <= ts && ts <= (round.end ?? INF)) {
          //     ts = ts - round.begin + elapsedTime;
          //   }

          //   if (id in round.participants) {
          //     elapsedTime += end - round.begin;
          //   }
          // });

          // return penality + ts + (problem.attempts - 1) * 20;
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
      setScoreBoard(result); // TODO: make this a constant
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
  }: {
    title: string;
    position: number;
    key: number;
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
          className={`default-font absolute ml-24 font-bold text-xl ${titleFontColor}`}
        >
          {title}
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
              <Position key={i} position={i} title={getTitle(x.id)} />
            ))}
          </ol>
          <ol>
            {ranking?.slice(5, 10).map((x, i) => (
              <Position key={i} position={i + 5} title={getTitle(x.id)} />
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
