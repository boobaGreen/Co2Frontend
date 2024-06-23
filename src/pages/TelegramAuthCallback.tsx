import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMain } from "../contexts/MainContext"; // Assumendo che MainContext.tsx si trovi in src/contexts

const TelegramAuthCallback = () => {
  const navigate = useNavigate();
  const { dispatch } = useMain();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const user = {
      id: queryParams.get("id"),
      firstName: queryParams.get("first_name"),
      username: queryParams.get("username"),
      hash: queryParams.get("hash"),
    };

    console.log("User data received:", user);

    if (user.id) {
      dispatch({
        type: "SET_USER",
        payload: {
          userId: user.id,
          userName: user.firstName ?? undefined,
          userNick: user.username ?? undefined,
        },
      });
      navigate("/dashboard");
    } else {
      console.error("User data is missing or invalid");
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default TelegramAuthCallback;
