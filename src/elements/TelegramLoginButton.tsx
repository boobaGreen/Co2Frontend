import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js"; // Importa crypto-js per la crittografia nel frontend
import Cookies from "js-cookie"; // Import Cookies for handling cookies
import { useMain } from "../contexts/MainContext";

interface TelegramUser {
  id: number;
  first_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
}

declare global {
  interface Window {
    onTelegramAuth: (user: TelegramUser) => void;
  }
}
const TelegramLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useMain();
  useEffect(() => {
    window.onTelegramAuth = async (user: TelegramUser) => {
      // Chiave segreta per la crittografia
      const secretKey = import.meta.env.VITE_APP_SECRET_KEY; // Sostituisci con la tua chiave segreta

      // Costruisci la stringa dati per la crittografia
      const dataString = `${user.auth_date}${user.first_name}${user.id}${user.username}${user.photo_url}`;

      // Crittografa i dati con AES
      const encryptedData = CryptoJS.AES.encrypt(
        dataString,
        secretKey
      ).toString();

      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASE_URL_BE}/callback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Origin": "secretorginipasswordtomorrowdevfromfe",
            },
            body: JSON.stringify({ ...user, hash: encryptedData }),
          }
        );

        const result = await response.json();

        if (result.status === "success") {
          const tokenJwt = result.token; // Assuming the JWT token is returned in the result

          // Set JWT token in a secure cookie
          Cookies.set("jwt-co2", tokenJwt, {
            secure: true,
            sameSite: "None",
          });
          console.log("telegram id", user.id);
          dispatch({
            type: "SET_USER",
            payload: {
              telegramId: user.id + "",
              userName: user.first_name ?? undefined,
              userNick: user.username ?? undefined,
              jwt: tokenJwt,
            },
          });
          navigate("/groups");
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    // Carica lo script del widget di accesso Telegram
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.async = true;
    script.setAttribute("data-telegram-login", "co2usage_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", "https://co2backend.onrender.com");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    document
      .getElementById("telegram-login-button-container")
      ?.appendChild(script);
  }, [dispatch, navigate]);

  return <div id="telegram-login-button-container"></div>;
};

export default TelegramLoginButton;
