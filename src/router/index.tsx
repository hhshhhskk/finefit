import { useRoutes } from "react-router-dom";
import Home from "../pages/home/page";
import Mbti from "../pages/mbti/page";
import Contact from "../pages/contact/page";
import NotFound from "../pages/NotFound";
import Layout from "@/layouts/Layout";
import AdminLayout from "@/layouts/AdminLayout";
import AdminPage from "@/pages/admin/page";
import LoginPage from "@/pages/admin/login/LoginPage";
import RegisterPage from "@/pages/admin/register/RegisterPage";
import ProtectedRoute from "@/pages/admin/components/ProtectedRoute";
import SurveyDetailPage from "@/pages/admin/surveys/SurveyDetail";

export default function AppRoutes() {
  const isLoggedIn = !!sessionStorage.getItem("role");
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "mbti", element: <Mbti /> },
        { path: "contact", element: <Contact /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        {
          path: "survey/:surveyId",
          element: (
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SurveyDetailPage />
            </ProtectedRoute>
          ),
        },
      ],
    },

    { path: "*", element: <NotFound /> },
  ];

  return useRoutes(routes);
}
