// import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

// export default function AdminRoute({ children }) {

//   const token = Cookies.get("token");
//   const user = Cookies.get("user")
//     ? JSON.parse(Cookies.get("user"))
//     : null;

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!user || user.role !== "admin") {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// }









// import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

// export default function AdminRoute({ children }) {

//   const token = Cookies.get("token");

//   let user = null;

//   try {
//     const userCookie = Cookies.get("user");
//     user = userCookie ? JSON.parse(userCookie) : null;
//   } catch (err) {
//     user = null;
//   }

//   // If not logged in → go to login
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // If not admin → redirect to normal dashboard
//   if (!user || user.role !== "admin") {
//     return <Navigate to="/dashboard" replace />;
//   }

//   // If admin → allow access
//   return children;
// }










import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AdminRoute({ children }) {

  const token = Cookies.get("token");

  const { i18n } = useTranslation();

  let user = null;

  try {
    const userCookie = Cookies.get("user");
    user = userCookie ? JSON.parse(userCookie) : null;
  } catch (err) {
    user = null;
  }

  // Force English language for admin pages
  useEffect(() => {
    i18n.changeLanguage("en");
  }, [i18n]);

  // If not logged in → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If not admin → redirect to normal dashboard
  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // If admin → allow access
  return children;
}