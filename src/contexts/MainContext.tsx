// MainContext.tsx
import React, { createContext, useContext, useReducer } from "react";

// Interface for User state
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

const initialState: UserState = {
  userId: "",
  userName: "",
  userNick: "",
  isAuth: false,
  dispatch: () => {
    throw new Error("Dispatch called before initialization");
  },
};

const QueryContext = createContext<UserState>(initialState);

function reducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case "SET_USER": {
      const { userId, userName, userNick } = action.payload!;
      return {
        ...state,
        userId: userId || state.userId,
        userName: userName || state.userName,
        userNick: userNick || state.userNick,
        isAuth: true,
      };
    }
    case "LOGOUT": {
      return {
        ...initialState,
        dispatch: state.dispatch, // Preserve dispatch function
      };
    }
    default:
      throw new Error("Action unknown");
  }
}

function MainProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QueryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QueryContext.Provider>
  );
}

function useMain() {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("MainContext was used outside of the MainProvider");
  }
  return context;
}

export { MainProvider, useMain };
