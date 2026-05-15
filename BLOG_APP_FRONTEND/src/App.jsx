import {createBrowserRouter} from 'react-router'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import { RouterProvider } from 'react-router'
import UserDashboard from './components/UserDashboard'
import AuthorDashboard from './components/AuthorDashboard'
import AdminDashboard from './components/AdminDashboard'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/protectedRoute'
import UnAuthorized from './components/UnAuthorized'
import ErrorBoundary from './components/ErrorBoundary'
import EditArticleForm from './components/EditArticleForm'
import ArticleByID from './components/ArticleByID'
import AuthorArticles from './components/AuthorArticles'
import WriteArticle from './components/WriteArticle'
import { useEffect } from "react";
import { useAuth } from "./store/authStore";
function App() {
  const routerObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      errorElement:<ErrorBoundary/>,
      children:[
        {
          index:true,
          element:<Home/>
        },
        {
          path:"home",
          element:<Home/>
        },
        {
          path:"register",
          element:<Register/>
        },
        {
          path:"login",
          element:<Login/>
        },
        {
          path:"user-profile",
          element:
          <ProtectedRoute allowedRoles={["USER"]}>
            <UserDashboard/>
          </ProtectedRoute>
        },
        {
          path:"author-profile",
          element:
          <ProtectedRoute allowedRoles={["AUTHOR"]}>
             <AuthorDashboard/>
          </ProtectedRoute>,
          children: [
            {
              index: true,
              element: <AuthorArticles />,
            },
            {
              path: "articles",
              element: <AuthorArticles />,
            },
            {
              path: "write-article",
              element: <WriteArticle />,
            },
          ],
        },
        {
          path:"admin-profile",
          element:<AdminDashboard/>
        },
        {
          path:"/unauthorized",
          element:<UnAuthorized/>
        },
        {
          path:"edit-article",
          element:<EditArticleForm />
        },
        {
          path: "article/:id",
          element: <ArticleByID />,
        },
      ],
    },
  ]);
  const checkAuth = useAuth((state) => state.checkAuth);

useEffect(() => {
  checkAuth();
}, []);
  return (<>
     <Toaster position='top-center' reverseOrder={false}/>
    <RouterProvider router={routerObj}/>
    </>
  )
}

export default App