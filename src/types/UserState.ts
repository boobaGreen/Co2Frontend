import React from "react";

export interface UserState {
  userId: string;
  userName: string;
  userNick: string;
  isAuth: boolean;
  dispatch: React.Dispatch<Action>;
}

// Interface for Actions
interface Action {
  type: string;
  payload?: {
    userId?: string;
    userName?: string;
    userNick?: string;
  };
}
