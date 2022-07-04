import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center ">
      <ol>
        {[1, 2].map((day, i) => (
          <li key={i}>
            <Link href={`/days/${day}`}>
              <a className="text-white text-3xl hover:text-green-400">
                Dia {day}
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
