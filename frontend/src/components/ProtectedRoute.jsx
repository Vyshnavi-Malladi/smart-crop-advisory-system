// import { Navigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

// export default function ProtectedRoute({ children }) {
//     const token = Cookies.get('token');

//     if (!token) {
//         return <Navigate to="/login" replace />;
//     }

//     return children;
// }








// import { Navigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

// export default function ProtectedRoute({ children }) {

//     const token = Cookies.get('token');

//     // If no token → redirect to login
//     if (!token) {
//         return <Navigate to="/login" replace />;
//     }

//     // If logged in → allow access
//     return children;
// }








import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {

    const token = Cookies.get("token");

    // If token does not exist → redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If token exists → allow access
    return children;
}