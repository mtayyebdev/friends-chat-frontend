import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const { user } = useSelector((state) => state.user);

    if (!user?._id) {
        return <Navigate to={"/login"} /> // If not logged in, redirect to login
    }
    return children
}

export default PrivateRoute