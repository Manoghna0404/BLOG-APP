import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from "../store/authStore";

function Header() {

  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);

  const currentUser = useAuth((state) => state.currentUser);

  // Zustand state
  const isAuthenticated = useAuth(
    (state) => state.isAuthenticate
  );

  const logout = useAuth((state) => state.logout);

  const handleLogout = async () => {

    await logout();

    setShowProfile(false);

    navigate("/login");
  };

  const handleDashboardNavigation = () => {

    if (currentUser?.role === "AUTHOR") {

      navigate("/author-profile");

    } else if (currentUser?.role === "USER") {

      navigate("/user-profile");

    } else {

      navigate("/admin-profile");
    }

    setShowProfile(false);
  };

  return (

    <div className='bg-black px-8 py-4 shadow-lg sticky top-0 z-50'>

      <div className='flex justify-between items-center text-white'>

        {/* LOGO */}
        <img
          src="https://marketplace.canva.com/EAFauoQSZtY/2/0/1600w/canva-brown-mascot-lion-free-logo-kAK-ljYAGXg.jpg"
          width="80"
          className='rounded-full cursor-pointer'
          onClick={() => navigate("/home")}
        />

        {/* NAVBAR */}
        <ul className='flex gap-8 items-center text-lg'>

          {/* HOME */}
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white rounded-full px-5 py-2 font-semibold transition"
                  : "text-white hover:bg-blue-600 rounded-full px-5 py-2 transition"
              }
            >
              Home
            </NavLink>
          </li>

          {/* REGISTER */}
          {!isAuthenticated && (
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-600 text-white rounded-full px-5 py-2 font-semibold transition"
                    : "text-white hover:bg-blue-600 rounded-full px-5 py-2 transition"
                }
              >
                Register
              </NavLink>
            </li>
          )}

          {/* LOGIN / PROFILE */}
          <li className="relative">

            {!isAuthenticated ? (

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-600 text-white rounded-full px-5 py-2 font-semibold transition"
                    : "text-white hover:bg-blue-600 rounded-full px-5 py-2 font-semibold transition"
                }
              >
                Login
              </NavLink>

            ) : (

              <div>

                {/* PROFILE SECTION */}
                <div
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-full transition hover:bg-blue-600"
                >

                  {/* PROFILE TEXT */}
                  <div className="text-right">
                    <p className="text-white font-semibold leading-none">
                      {currentUser?.firstName}
                    </p>

                  </div>

                  {/* PROFILE IMAGE */}
                  <img
                    src={currentUser?.profileImageUrl}
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-white hover:scale-105 transition"
                  />

                </div>

                {/* DROPDOWN */}
                {showProfile && (

                  <div className="absolute right-0 mt-4 bg-white text-gray-800 rounded-2xl shadow-2xl p-5 w-72 z-50 border border-gray-200">

                    {/* CLOSE BUTTON */}
                    <button
                      onClick={() => setShowProfile(false)}
                      className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
                    >
                      ✕
                    </button>

                    <div className="text-center">

                      <img
                        src={currentUser?.profileImageUrl}
                        alt=""
                        className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-md"
                      />

                      <h2 className="text-2xl font-bold text-gray-900">
                        {currentUser?.firstName}{" "}
                        {currentUser?.lastName}
                      </h2>

                      <p className="text-gray-500 mt-2 break-word">
                        {currentUser?.email}
                      </p>

                      <p className="text-blue-600 font-semibold mt-2 uppercase tracking-wide">
                        {currentUser?.role}
                      </p>

                    </div>

                    {/* DASHBOARD BUTTON */}
                    <button
                      onClick={handleDashboardNavigation}
                      className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                    >
                      Dashboard
                    </button>

                    {/* LOGOUT BUTTON */}
                    <button
                      onClick={handleLogout}
                      className="w-full mt-3 bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-800 font-semibold py-3 rounded-xl transition"
                    >
                      Logout
                    </button>

                  </div>

                )}

              </div>

            )}

          </li>

        </ul>

      </div>

    </div>
  )
}

export default Header