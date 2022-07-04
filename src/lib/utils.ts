// Converts "hh:mm:ss" to seconds
export function t(time: string): number {
  let d = 0;
  if (time.includes("day")) {
    d = Number(time.split(" ")[0]);
    time = time.split(" ")[2];
  }

  const [h, m, s] = time.split(":").map(Number);

  let answer = 0;
  answer += d * 24 * 60 * 60;
  answer += h * 60 * 60;
  answer += m * 60;
  answer += s;

  return answer;
}

export const SCOREBOARD_UPDATE_INTERVAL = 10_000;
