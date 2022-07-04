import { NextPage } from "next";
import React from "react";
import { ScoreBoard } from "../../components/ScoreBoard";
import { t } from "../../lib/utils";
import { Setup } from "../../typings/types";

const setup: Setup = {
  contest: {
    id: 1358,
    isOver: true,
  },
  users: {
    1: {
      name: "Luano Cesas Barros dos Santos",
      begin: t("00:55:00"),
    },
    2: {
      name: "Iranildo Batalha",
      school: "UEA",
      begin: t("03:30:00"),
    },
    4: {
      name: "Ricardo Coutinho II",
      school: "UFAM",
      begin: t("02:36:00"),
    },
    5: {
      name: "Eduardo Peres",
      school: "UEA",
      begin: t("00:55:00"),
    },
    6: {
      name: "Thaissa Silva",
      school: "FMM",
      begin: t("03:04:00"),
    },
    8: {
      name: "Fernando Vítor Ventilari Neder",
      school: "UFAM",
      begin: t("00:00:00"),
    },
    10: {
      name: "Jônatas Lima Magalhães de Azevedo",
      school: "UFAM",
      begin: t("00:00:00"),
    },
    11: {
      name: "Rodrigo Queiroz",
      school: "UFAM",
      begin: t("01:55:00"),
    },
    12: {
      name: "Gabriel dos Santos Batista",
      school: "UEA",
      begin: t("03:29:00"),
    },
    13: {
      name: "Raquel Folz",
      school: "UFAM",
      begin: t("02:45:00"),
    },
    14: {
      name: "Thailsson Clementino",
      school: "UFAM",
      begin: t("00:00:00"),
    },
    15: {
      name: "Guilherme Pantoja Martins",
      school: "FMM",
      begin: t("03:03:00"),
    },
    18: {
      name: "Alexandre da Silva Tupinambá",
      school: "UFAM",
      begin: t("00:00:00"),
    },
    21: {
      name: "Erick Monteiro",
      school: "UEA",
      begin: t("03:10:00"),
    },
    24: {
      name: "João Victor Souza",
      school: "UEA",
      begin: t("03:47:00"),
    },
  },
};

const Page: NextPage = () => {
  return <ScoreBoard setup={setup} />;
};

export default Page;
