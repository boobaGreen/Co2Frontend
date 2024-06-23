import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import crypto from "crypto";

interface TelegramUser {
  id: number;
  first_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string; // Non utilizzeremo questo hash
}

// Dichiarazione globale per TypeScript
declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramUser) => void;
  }
}

const TelegramLoginButton: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Definisci la funzione onTelegramAuth come callback globale in window
    window.onTelegramAuth = async (user: TelegramUser) => {
      console.log("Pre Authenticated user:", user);

      // Calcola l'HMAC utilizzando la chiave segreta del bot Telegram
      const secret = "7317510692:AAF20M_I-Gz8g8PCnbE3fPjCnwRM9cKF784"; // Sostituisci con la tua chiave segreta del bot Telegram
      const hmac = crypto.createHmac("sha256", secret);

      // Costruisci la stringa dati per HMAC in ordine alfabetico
      const dataCheckArr = [];
      if (user.auth_date) dataCheckArr.push(`auth_date=${user.auth_date}`);
      if (user.first_name) dataCheckArr.push(`first_name=${user.first_name}`);
      if (user.id) dataCheckArr.push(`id=${user.id}`);
      if (user.username) dataCheckArr.push(`username=${user.username}`);
      if (user.photo_url) dataCheckArr.push(`photo_url=${user.photo_url}`);

      dataCheckArr.sort(); // Ordina le chiavi in ordine alfabetico
      const dataCheckString = dataCheckArr.join("\n");

      hmac.update(dataCheckString, "utf8");
      const calculatedHash = hmac.digest("hex");

      console.log("calculatedHash:", calculatedHash);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASE_URL_BE}/api/v1/callback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Origin": "secretorginipasswordtomorrowdevfromfe",
            },
            body: JSON.stringify({ ...user, hash: calculatedHash }), // Invia l'hash calcolato
          }
        );

        const result = await response.json();
        console.log("Login result:", result);
        if (result.status === "success") {
          navigate("/dashboard");
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    // Load Telegram Login Widget script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.async = true;
    script.setAttribute("data-telegram-login", "co2usage_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", "https://co2backend.onrender.com");
    script.setAttribute("data-request-access", "write");
    // Non specificare data-onauth qui
    document
      .getElementById("telegram-login-button-container")
      ?.appendChild(script);
  }, [navigate]);

  return <div id="telegram-login-button-container"></div>;
};

export default TelegramLoginButton;
