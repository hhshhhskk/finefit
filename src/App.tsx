import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/index";
import ScrollToTop from "./components/feature/ScrollToTop";

import "./assets/globals.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
