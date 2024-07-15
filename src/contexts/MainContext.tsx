import React, { createContext, useContext, useReducer, useEffect } from "react";
import Cookies from "js-cookie";

// Interface for User state
export interface UserState {
  telegramId: string;
  userId: string;
  userName: string;
  userNick: string;
  groupId: string;
  jwt: string;
  dispatch: React.Dispatch<Action>;
}

// Interface for Actions
interface Action {
  type: string;
  payload?: {
    telegramId: string;
    userId?: string;
    userName?: string;
    userNick?: string;
    jwt?: string;
    groupId?: string;
  };
}

// Funzione per ottenere lo stato iniziale basato sul token JWT
const jwtTokenInit = Cookies.get("jwt-co2") || "";

const initialState: UserState = {
  telegramId: "",
  userId: "",
  userName: "",
  userNick: "",
  groupId: "",
  jwt: jwtTokenInit,

  dispatch: () => {
    throw new Error("Dispatch called before initialization");
  },
};

const QueryContext = createContext<UserState>(initialState);

function reducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case "SET_USER": {
      const { userId, userName, userNick, jwt, telegramId } = action.payload!;
      return {
        ...state,
        telegramId: telegramId || state.telegramId,
        userId: userId || state.userId,
        userName: userName || state.userName,
        userNick: userNick || state.userNick,
        jwt: jwt || state.jwt,
      };
    }
    case "LOGOUT": {
      Cookies.remove("jwt-co2"); // Rimuovi il cookie al logout
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
  console.log("dev o prod env", `${import.meta.env.VITE_APP_BASE_URL_FE}`);
  useEffect(() => {
    async function verifyToken() {
      if (state.jwt) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_APP_BASE_URL_BE}/verify-jwt`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${state.jwt}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("data :", data);
            console.log("data.telegramid :", data.telegramId);
            console.log("data.userid :", data.userId);
            console.log("data.username :", data.userName);
            console.log("data.usernick :", data.userNick);
            dispatch({
              type: "SET_USER",
              payload: {
                telegramId: data.userTelegramId,
                userId: data.userId,
                userName: data.userName,
                userNick: data.userNick,
                jwt: state.jwt,
              },
            });
          } else {
            dispatch({ type: "LOGOUT" });
          }
        } catch (error) {
          dispatch({ type: "LOGOUT" });
        }
      }
    }

    verifyToken();
  }, [state.jwt]);

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

// eslint-disable-next-line react-refresh/only-export-components
export { MainProvider, useMain };
