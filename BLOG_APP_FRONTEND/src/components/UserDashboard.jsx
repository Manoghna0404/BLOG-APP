import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  articleGrid,
  articleCardClass,
  articleTitle,
  articleBody,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
} from "../styles/common.js";

function UserProfile() {
  const logout = useAuth((state) => state.logout);
  const currentUser = useAuth((state) => state.currentUser);
  const navigate = useNavigate();
  //console.log("currentUser in profile",currentUser)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/user-api/articles", { withCredentials: true });

        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  // convert UTC → IST
  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  if (loading) {
    return <p className={loadingClass}>Loading articles...</p>;
  }
  const searchArticles = async (title) => {

  try {

    // if input empty → get all articles
    if (title.trim() === "") {

      const res = await axios.get(
        "http://localhost:4000/user-api/articles",
        { withCredentials: true }
      );

      setArticles(res.data.payload);

      return;
    }

    const res = await axios.get(
      `http://localhost:4000/user-api/articles/search/${title}`,
      { withCredentials: true }
    );

    setArticles(res.data.payload);

  } catch (err) {

    console.log(err);

    setArticles([]);
  }
};
  return (
    <div>
      {error && <p className={errorClass}>{error}</p>}
      <div className="mb-6 mt-6">
  <input
    type="text"
    placeholder="Search article..."
    value={searchText}
    onChange={(e) => {

      setSearchText(e.target.value);

      searchArticles(e.target.value);
    }}
    className="border p-3 rounded w-full"
  />
</div>
      <div className={articleGrid}>
        {articles.map((articleObj) => (
          <div className={articleCardClass} key={articleObj._id}>
            <div className="flex flex-col h-full">
              {/* Top Content */}
              <div>
                <p className={articleTitle}>{articleObj.title}</p>

                <p>{articleObj.content.slice(0, 20)}...</p>

                <p className={timestampClass}>{formatDateIST(articleObj.createdAt)}</p>
              </div>

              {/* Button at bottom */}
              <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => navigateToArticleByID(articleObj)}>
                Read Article →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;