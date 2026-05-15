import { useAuth } from "../store/authStore";
import { useNavigate,Navigate } from "react-router";


function ProtectedRoute({children,allowedRoles}) {
    const {loading,currentUser,isAuthenticate,logout}=useAuth()
    //loading state
    if(loading)
        return <p>Loading...</p>
    
    //if user not loggedin
    if(!isAuthenticate){
        return <Navigate to="/login" replace/>
    }
    
    //check roles
    if(allowedRoles && !allowedRoles.includes(currentUser?.role)){
        //logout user
        //redirect to login
        return <Navigate to="/unauthorized" replace state={{ redirectTo: "/" }} />
    }
    return children;
} 
export default ProtectedRoute