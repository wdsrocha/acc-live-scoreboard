import React, { useEffect, useState } from "react";
import { Position } from "../components/Position";
import { useInterval } from "../hooks/useInterval";
import { neps, ScoreBoard as ScoreBoardType } from "../lib/neps";
import { SCOREBOARD_UPDATE_INTERVAL } from "../lib/utils";
import { Setup, Row } from "../typings/types";

export function ScoreBoard({ setup }: { setup: Setup }) {
  const { users } = setup;

  const [scoreBoard, setScoreBoard] = useState<ScoreBoardType | undefined>();

  const ranking: Row[] | undefined = scoreBoard?.scores
    .map((score) => ({ ...score, id: Number(score.user.name.split(" ")[1]) }))
    .filter(function isIdRegistered(score) {
      if (!(score.id in users) && score.total.points) {
        console.error(
          `Usuário "${score.id}" tem pontuação mas não foi cadastrado!`
        );
      }
      return score.id in users;
    })
    .map(function toRankingRow(score) {
      const customPenality = score.problems
        .filter((problem) => problem.points > 0)
        .reduce((penality, problem) => {
          return (
            penality +
            problem.timestamp -
            (users?.[score.id]?.begin ?? 0) +
            (problem.attempts - 1) * 20
          );
        }, 0);

      return {
        id: score.id,
        name: users?.[score.id]?.name,
        points: score.total.points,
        penality: customPenality,
      };
    })
    .filter((row) => row.name)
    .sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points; // greater is better
      } else if (a.penality !== b.penality) {
        return a.penality - b.penality; // lesser is better
      } else {
        return a.name.localeCompare(b.name); // whatever
      }
    });

  useEffect(() => {
    (async () => setScoreBoard(await neps.getScoreBoard(setup.contest.id)))();
  }, [setScoreBoard, setup.contest.id]);

  useInterval(() => {
    if (!setup.contest.isOver) {
      try {
        (async () =>
          setScoreBoard(await neps.getScoreBoard(setup.contest.id)))();
      } catch (e) {}
    }
  }, SCOREBOARD_UPDATE_INTERVAL);

  function getTitle(id: number) {
    const { name, company, school } = users[id];

    const tokens = name.split(" ");
    const shortName = `${tokens[0]} ${tokens[tokens.length - 1]}`;

    if (!school && !company) return shortName;
    if (!school) return `${shortName} (${company})`;
    if (!company) return `${shortName} (${school})`;
    return `${shortName} (${school}/${company})`;
  }

  if (!ranking?.length) {
    return <div className="text-white text-center text-4xl">Carregando...</div>;
  }

  return (
    <div className="flex items-begin justify-around">
      <ol>
        {ranking?.slice(0, 5).map((row, i) => (
          <Position
            key={i}
            position={i + 1}
            title={getTitle(row.id)}
            data={row}
          />
        ))}
      </ol>
      <ol>
        {ranking?.slice(5, 10).map((row, i) => (
          <Position
            key={i}
            position={i + 6}
            title={getTitle(row.id)}
            data={row}
          />
        ))}
      </ol>
    </div>
  );
}
