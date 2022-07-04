interface Row {
  id: number;
  name: string;
  points: number;
  penality: number;
}

interface User {
  name: string;
  school?: string;
  company?: string;
  begin?: number;
}

export interface Setup {
  contest: {
    id: number;
    isOver: boolean;
  };
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
