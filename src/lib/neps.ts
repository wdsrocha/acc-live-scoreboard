import { t } from "./utils";

const BASE_URL = "https://api.neps.academy";
const ADMIN_EMAIL = "amazon.code@tmp.com";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

interface RawScoreBoard {
  exercises: [string, number, string][];
  scores: {
    position: number;
    problems: [number, number, string | 0, string][];
    total: [number, number];
    type: string;
    user: {
      color: string;
      id: number;
      is_pro: boolean;
      name: string;
    };
  }[];
}

export type Verdict = "ACCEPTED" | "WRONG" | "NO TRIED";

export interface ScoreBoard {
  exercises: {
    letter: string;
    index: number;
    title: string;
  }[];
  scores: {
    position: number;
    problems: {
      points: number; // 0 <= x <= 100
      attempts: number;
      timestamp: number; // seconds elapsed since the beginning of the contest
      verdict: Verdict;
    }[];
    total: {
      points: number;
      penality: number;
    };
    user: {
      id: string;
      name: string;
    };
  }[];
}

function transformRawScoreBoard(raw: RawScoreBoard): ScoreBoard {
  return {
    exercises: raw.exercises.map(([letter, index, title]) => ({
      letter,
      index,
      title,
    })),
    scores: raw.scores.map((rawScore) => ({
      position: rawScore.position,
      problems: rawScore.problems.map(
        ([points, attempts, rawTimestamp, rawVerdict]) => ({
          points,
          attempts,
          timestamp: rawTimestamp ? t(rawTimestamp) : 0,
          verdict: rawVerdict as Verdict,
        })
      ),
      total: {
        points: rawScore.total[0],
        penality: rawScore.total[1],
      },
      user: {
        id: rawScore.user.id.toString(),
        name: rawScore.user.name,
      },
    })),
  };
}

let instance: NepsClient;

class NepsClient {
  private accessToken?: string;

  constructor() {
    if (instance) {
      throw new Error("You can only create one instance of NepsClient");
    }

    instance = this;
  }

  private async getHeaders() {
    if (!this.accessToken) {
      await this.login();
    }

    return {
      Accept: "application/json",
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  async login(): Promise<void> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    });

    const result = await response.json();

    this.accessToken = result?.access_token;
  }

  private async getScoreBoardPage(
    competitionId: number,
    page: number
  ): Promise<RawScoreBoard> {
    const response = await fetch(
      `${BASE_URL}/competition/${competitionId}/scores?locale=br&page=${page}`,
      {
        method: "GET",
        headers: await this.getHeaders(),
      }
    );

    return await response.json();
  }

  async getScoreBoard(competitionId: number): Promise<ScoreBoard> {
    // For now, we only care about the first page
    let rawScoreBoard = await this.getScoreBoardPage(competitionId, 1);
    return transformRawScoreBoard(rawScoreBoard);
  }
}

const neps = new NepsClient();

export { neps };
