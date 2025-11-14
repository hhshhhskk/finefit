import { useRoutes } from "react-router-dom";
import Home from "../pages/home/page";
import Mbti from "../pages/mbti/page";
import Contact from "../pages/contact/page";
import NotFound from "../pages/NotFound";
import Layout from "@/layouts/Layout";
import AdminLayout from "@/layouts/AdminLayout";
import AdminPage from "@/pages/admin/page";

export default function AppRoutes() {
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
      children: [{ index: true, element: <AdminPage /> }],
    },
    { path: "*", element: <NotFound /> },
  ];

  return useRoutes(routes);
}
