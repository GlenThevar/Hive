import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThirdwebProvider } from "thirdweb/react";

import App from "./App";
import "./index.css";
import { AppProvider } from "./context/AppProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThirdwebProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ThirdwebProvider>
  </StrictMode>
);
