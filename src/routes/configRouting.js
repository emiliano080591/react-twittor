import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import User from '../pages/User';

export default[
    {
        path:"/",
        exact:true,
        page: Home
    },
    {
        path:"/:id",
        exact:true,
        page:User
    },
    {
        path:"*",
        page:Error404
    }
]