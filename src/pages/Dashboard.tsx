import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../elements/Loading";
import { useMain } from "../contexts/MainContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuth } = useMain();
  console.log("isAuth in dashboard", isAuth);
  if (!isAuth) {
    return <Loading />;
  } else {
    const handle1MonthButtonClick = () => {
      navigate("/estimatedemissions");
    };

    return (
      <div className="relative bg-gray-100 flex flex-col min-h-screen overflow-auto">
        <img
          src={`/background.svg`}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          aria-hidden="true"
        />

        <Header />

        <main className="relative flex flex-col items-center justify-center md:pt-0 pt-0">
          <h1 className="font-poppins text-3xl font-bold text-center bg-yellow-400 text-green-800 py-3 px-4 shadow-lg">
            Emissions Impact Dashboard
          </h1>

          <p className="font-body text-xl text-shadow text-bold text-green-900 mb-6 mt-4 text-center">
            Track your emissions related to your Telegram services usage
          </p>

          <div className="flex flex-col items-center space-y-3 w-full px-4 mb-8">
            <button
              className="relative w-full max-w-xs bg-yellow-400 text-green-800 font-body py-2 px-4 rounded border-2 border-green-800 shadow-md hover:bg-yellow-500 flex items-center justify-center"
              onClick={handle1MonthButtonClick}
              aria-label="Track emissions for 1 month"
            >
              <img
                src={`/icon.png`}
                alt=""
                className="absolute left-2 w-6 h-6"
                aria-hidden="true"
              />
              1 Month
            </button>
            <button
              className="relative w-full max-w-xs bg-yellow-400 text-green-800 font-body py-2 px-4 rounded border-2 border-green-800 shadow-md hover:bg-yellow-500 flex items-center justify-center"
              aria-label="Track emissions for 3 months"
            >
              <img
                src={`/icon.png`}
                alt=""
                className="absolute left-2 w-6 h-6"
                aria-hidden="true"
              />
              3 Months
            </button>
            <button
              className="relative w-full max-w-xs bg-yellow-400 text-green-800 font-body py-2 px-4 rounded border-2 border-green-800 shadow-md hover:bg-yellow-500 flex items-center justify-center"
              aria-label="Track emissions for 6 months"
            >
              <img
                src={`/icon.png`}
                alt=""
                className="absolute left-2 w-6 h-6"
                aria-hidden="true"
              />
              6 Months
            </button>
            <button
              className="relative w-full max-w-xs bg-yellow-400 text-green-800 font-body py-2 px-4 rounded border-2 border-green-800 shadow-md hover:bg-yellow-500 flex items-center justify-center"
              aria-label="Track emissions for 1 year"
            >
              <img
                src={`/icon.png`}
                alt=""
                className="absolute left-2 w-6 h-6"
                aria-hidden="true"
              />
              1 Year
            </button>
          </div>
        </main>
      </div>
    );
  }
};

export default Dashboard;
