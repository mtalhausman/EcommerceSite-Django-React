import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/auth";

const isAuthenticated = () => {
    const token = getAccessToken();
    return !!token;
};

export default function PrivateRouter({ redirectTo = '/login' }) {
    return isAuthenticated() ? <Outlet /> : <Navigate to={redirectTo} replace />;
}