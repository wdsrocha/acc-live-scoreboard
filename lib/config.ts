import { t } from "./utils";

interface Data {
  contestId: number;
  rounds: {
    begin: number;
    end?: number;
    participants: number[];
  }[];
  users: {
    [key: number]: {
      name: string;
      school?: string;
      company?: string;
      isHighSchooler?: boolean;
      isFemale?: boolean;
    };
  };
}

export const data: Data = {
  contestId: 1360,
  rounds: [
    {
      begin: t("00:14:00"),
      end: t("00:14:00") + t("00:30:00"),
      participants: Array.from({ length: 20 }, (_, i) => i + 1),
    },
    {
      begin: t("01:07:00"),
      end: t("01:07:00") + t("00:29:00"),
      participants: [],
    },
    {
      begin: t("02:22:00"),
      end: t("02:22:00") + t("00:33:00"),
      participants: [],
    },
    {
      begin: t("03:15:00"),
      end: t("03:15:00") + t("00:28:00"),
      participants: [],
    },
  ],
  users: {
    100: {
      name: "Wesley Rocha",
      company: "VTEX",
    },
  },
};
