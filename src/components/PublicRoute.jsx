import { Navigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

function PublicRoute({ children }) {
    const { user,loading } = useSelector((state) => state.user);
    
    if (loading) return <p>Loading...</p>;
    

    if (user?._id) {
        return <Navigate to={"/"} /> // If logged in, redirect to home
    }

    return children;
}

export default PublicRoute;