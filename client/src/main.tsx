import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Chat from "./pages/Chat.tsx";
import Login from "./pages/Login.tsx";
import FaqPage from "./pages/FaqPage.tsx";
import About from "./pages/About.tsx";
import Translate from "./pages/Translate.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/faq",
    element: <FaqPage />,
  },
  {
    path: "/aboutus",
    element: <About />,
  },
  {
    path: "/translate",
    element: <Translate />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
