import { Route, Routes, Navigate } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import Home from "./pages/Home";
import { contextData } from "./context/AuthContext";
import MembershipRegistration from "./pages/Auth/MembershipRegistration";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Layout from "./components/layout/Layout";
import AdminHome from "./pages/Admin/AdminHome";
import Members from "./pages/Admin/Members";
import BannedUsers from "./pages/Admin/BannedUsers";
import Settings from "./pages/Admin/Settings";

export default function App() {
	const { fetching, user } = contextData();

	if (fetching) return <PageLoader />;

	return (
		<Routes>
			{/* Public routes */}
			<Route path="/" element={<Home />} />
			<Route path="/register" element={<MembershipRegistration />} />
			<Route path="/login" element={<Login />} />
			<Route path="/contact" element={<Contact />} />

			{/*    --    --   --   --  */}
			{/*User Dashboard routes (Protected)  */}
			{/*    --    --   --   --  */}

			{/*    --    --   --   --  */}
      {/* Admin Dashboard routes (Protected) */}
      {user ? (
          <>
          {user.accountType === "admin" ? (
            <>
              <Route path="/admin/" element={<Layout />}>
                <Route index element={<AdminHome />} />
                <Route path="/admin/members" element={<Members />} />
                <Route path="/admin/banned-users" element={<BannedUsers />} />
                <Route path="/admin/settings" element={<Settings />} />
              </Route>
            </>
          ): (
            <Route path="/admin/*" element={<Navigate to="/" />} />
          )}
          </>
        ): (
          <Route path="/admin/*" element={<Navigate to="/login" />} />
        )}
			{/*    --    --   --   --  */}

			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}
