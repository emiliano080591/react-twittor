import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import User from '../pages/User';
import Users from '../pages/Users';

export default[
    {
        path:"/",
        exact:true,
        page: Home
    },
    {
        path:"/users",
        exact:true,
        page:Users
    },
    {
        path:"/error",
        page:Error404
    },
    {
        path:"/:id",
        exact:true,
        page:User
    }
    
]