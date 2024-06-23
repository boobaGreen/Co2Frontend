import { MainProvider } from "./contexts/MainContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RouterCustom from "./RouterCustom";
// import RouterCustom from "./RouterCustom";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <MainProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterCustom />
        CIAO
      </QueryClientProvider>
    </MainProvider>
  );
}

export default App;
