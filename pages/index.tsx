/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { ScoreboardRow } from "../components/ScoreboardRow";
import { useInterval } from "../hooks/useInterval";
import { data } from "../lib/config";
import { neps, ScoreBoard } from "../lib/neps";
import { SCOREBOARD_UPDATE_INTERVAL } from "../lib/utils";

const { users } = data;

const Home: NextPage = () => {
  const [scoreBoard, setScoreBoard] = useState<ScoreBoard | undefined>();

  const ranking: Row[] | undefined = scoreBoard?.scores
    .filter((score) => {
      const id = Number(score.user.name.split(" ")[1]);

      if (!(id in users) && score.total.points) {
        console.error(`Usuário "${id}" não foi cadastrado!`);
      }

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
            (users?.[id]?.begin ?? 0) +
            (problem.attempts - 1) * 20
          );
        }, 0);

      const name = users?.[id]?.name;

      return {
        id,
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
  }, SCOREBOARD_UPDATE_INTERVAL);

  const ICON_SIZE = 150;

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
        <div className="flex items-center justify-around -mt-16">
          <span className="text-4xl default-font text-white">RANK</span>
          <img src="/images/title.png" width={600} />
          <img src="/images/logo_main.png" width={120} />
        </div>
        <div className="flex items-begin justify-around -mt-12">
          {ranking?.length ? (
            <>
              <ol>
                {ranking?.slice(0, 5).map((x, i) => (
                  <ScoreboardRow
                    key={i}
                    position={i + 1}
                    title={getTitle(x.id)}
                    data={x}
                  />
                ))}
              </ol>
              <ol>
                {ranking?.slice(5, 10).map((x, i) => (
                  <ScoreboardRow
                    key={i}
                    position={i + 6}
                    title={getTitle(x.id)}
                    data={x}
                  />
                ))}
              </ol>
            </>
          ) : (
            <span className="default-font text-white text-4xl my-32">
              Carregando...
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mx-64 mt-16">
          <img src="/images/logo_eldorado.png" width={ICON_SIZE} />
          <img src="/images/logo_icomp.png" width={ICON_SIZE} />
          <img src="/images/logo_sidia.png" width={ICON_SIZE} />
          <img src="/images/logo_polo_digital.png" width={ICON_SIZE} />
        </div>
      </div>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </main>
  );
};

export default Home;
