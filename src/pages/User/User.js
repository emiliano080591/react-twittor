import React,{useEffect,useState} from 'react';
//import {Button,Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import BasicLayout from '../../layout/BasicLayout';
import {getUserApi} from '../../api/user';
import {toast} from 'react-toastify';
import useAuth from '../../hooks/userAuth';
import BannerAvatar from '../../components/User/BannerAvatar';
import InfoUser from '../../components/User/InfoUser';

import './User.scss';

function User(props) {
    const {match}=props;
    const [user, setUser] = useState(null);
    const {params}=match;
    const loggedUser=useAuth();
    
    useEffect(() => {
       getUserApi(params.id).then(response => {  
        if (!response) {
            toast.error("El usuario que has visitado no existe");
        }

        setUser(response);
       }).catch(() => {
            toast.error("El usuario que has visitado no existe");
       })
    }, [params]);

    return (
        <BasicLayout className="user">
            <div className="user__title">
                <h2>
                    {user ? `${user.nombre} ${user.apellidos}` : "Este usuario no existe"}
                </h2>
            </div>
            <BannerAvatar user={user} loggedUser={loggedUser}/>
            <InfoUser user={user}/>
            <div className="user_tweets">
                Lista de tweets
            </div>
        </BasicLayout>
    );
}

export default withRouter(User);