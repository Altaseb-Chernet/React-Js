import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);