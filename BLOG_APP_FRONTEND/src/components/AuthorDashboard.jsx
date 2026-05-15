import { NavLink, Outlet } from "react-router";
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { pageWrapper, navLinksClass, navLinkClass, navLinkActiveClass, divider } from "../styles/common";

function AuthorDashboard() {
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();
   const currentUser = useAuth((state) => state.currentUser);
  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <div className={pageWrapper}>
      {/* Author Navigation */}
      <div className="flex gap-6 mb-6">
        <NavLink to="articles" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
          Articles
        </NavLink>

        <NavLink to="write-article" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
          Write Article
        </NavLink>
        </div>
        {/* <div className="text-end">
        <p className="text-2xl"> Welcome,{currentUser?.firstName}</p>
        <img src={currentUser?.profileImageUrl} className="w-14 mr-2 rounded-full block ms-auto" alt="" />
      </div>
      <div className="flex justify-end mb-6 mt-3">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onLogout}>
          Logout
      </button>
      </div> */}
      <div className={divider}></div>

      {/* Nested route content */}
      <Outlet />
    </div>
  );
}

export default AuthorDashboard;