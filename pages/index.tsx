import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { data } from "../lib/config";
import { neps, ScoreBoard } from "../lib/neps";

const { rounds } = data;

const Home: NextPage = () => {
  const [scoreBoard, setScoreBoard] = useState<ScoreBoard | undefined>();

  const ranking = scoreBoard?.scores
    .map((score) => {
      const id = Number(score.user.name.split(" ")[1]);

      const customPenality = score.problems
        .filter((problem) => problem.points > 0)
        .reduce((penality, problem) => {
          // We should check for cheat attempts here:
          // 1. What should happen if a submission is before the first round?
          // 2. How about submissions between rounds?
          // 3. And what if the participant isn't in this round?
          // See the comment below for the solution of (1) and (2)

          let ts = problem.timestamp;
          let elapsedTime = 0;

          rounds.forEach((round, index) => {
            // Checks if this submission was made after the end of the last
            // round. If true, pretend that the submission was made right on the
            // start of the current round.

            const INF = 999_999_999;
            // This will work as long as ONLY the last round don't have an end
            const end = round.end ?? INF;

            if (
              index - 1 >= 0 &&
              (rounds[index - 1]?.end ?? INF) < ts &&
              ts <= round.begin
            ) {
              ts = round.begin;
            }

            if (round.begin <= ts && ts <= (round.end ?? INF)) {
              ts = ts - round.begin + elapsedTime;
            }

            if (id in round.participants) {
              elapsedTime += end - round.begin;
            }
          });

          return penality + ts + (problem.attempts - 1) * 20;
        }, 0);

      return {
        id,
        nepsId: score.user.id,
        name: score.user.name,
        points: score.total.points,
        penality: customPenality,
      };
    })
    .sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points; // greater is better
      }

      return a.penality - b.penality; // lesser is better
    });

  async function updateNepsScoreBoard() {
    setScoreBoard(await neps.getScoreBoard(1360)); // TODO: make this a constant
  }

  useEffect(() => {
    updateNepsScoreBoard();
  }, []);

  useInterval(() => {
    updateNepsScoreBoard();
  }, 5000);

  return (
    <main>
      <pre>{JSON.stringify(ranking, null, 2)}</pre>
    </main>
  );
};

export default Home;
