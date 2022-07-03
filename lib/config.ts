import { t } from "./utils";

interface User {
  name: string;
  school?: string;
  company?: string;
  begin?: number;
}

export interface Data {
  contestId: number;
  rounds?: {
    begin: number;
    end?: number;
    participants: number[];
  }[];
  users: {
    [key: number]: User;
  };
  pastUsers?: {
    [key: number]: User;
  };
}

export const data: Data = {
  contestId: 1359,
  users: {
    10: {
      name: "Fernando Ventilari",
      school: "UFAM",
      begin: t("00:05:00"),
    },
    11: {
      name: "Hélio Fernandes Schineider",
      school: "Anhanguera",
      begin: t("00:05:00"),
    },
    13: {
      name: "Diogo Roberto Duarte da Costa",
      school: "UEA",
      begin: t("00:05:00"),
    },
    18: {
      name: "Raquel Folz",
      school: "UFAM",
      begin: t("00:05:00"),
    },
    1: {
      name: "Lucas Fernandes de Oliveira",
      school: "UFAM",
      begin: t("00:05:00"),
    },
    20: {
      name: "Igor Correa",
      school: "Anhanguera",
      begin: t("00:05:00"),
    },
    21: {
      name: "Raycon Lima",
      school: "Batista	",
      begin: t("00:05:00"),
    },
    22: {
      name: "Lucas Marques Cardenas",
      school: "INDT",
      begin: t("00:52:00"),
    },
    23: {
      name: "Lucas Castro",
      school: "UFAM",
      begin: t("01:48:00"),
    },
    24: {
      name: "Thailsson Clementino",
      school: "UFAM",
      begin: t("00:05:00"),
    },
    26: {
      name: "Rayssa Carla",
      school: "Fametro",
      begin: t("02:29:00"),
    },
    27: {
      name: "João Victor",
      school: "UEA",
      begin: t("02:37:00"),
    },
    28: {
      name: "Carlos Júnior",
      school: "UFAM",
      begin: t("02:50:00"),
    },
    2: {
      name: "José Abel",
      school: "UFRS",
      begin: t("01:33:00"),
    },
    3: {
      name: "Leonardo Santos",
      school: "UFAM",
      begin: t("00:05:00"),
    },
    4: {
      name: "Guilherme Duarte",
      school: "UFAM",
      begin: t("00:05:00"),
    },
    5: {
      name: "Jackson Fernandes",
      school: "UFAM",
      begin: t("00:56:00"),
    },
    6: {
      name: "Alexandre da Silva Tupinambá",
      school: "UFAM",
      begin: t("00:05:00"),
    },
    7: {
      name: "Jônatas Lima",
      school: "UFAM",
      begin: t("00:05:00"),
    },
    8: {
      name: "Eduardo Peres",
      school: "UEA",
      begin: t("01:41:00"),
    },
    9: {
      name: "Natanael Bezerra de Oliveira",
      school: "UFAM",
      begin: t("00:05:00"),
    },
    29: {
      name: "Saimon Tavares",
      school: "UFAM",
      begin: t("02:58:00"),
    },
    31: {
      name: "Thalisson Costa",
      school: "UFAM",
      begin: t("04:00:00"),
    },
  },
};
