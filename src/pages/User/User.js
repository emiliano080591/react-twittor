import React,{useEffect,useState} from 'react';
//import {Button,Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import BasicLayout from '../../layout/BasicLayout';
import {getUserApi} from '../../api/user';
import {toast} from 'react-toastify';
import useAuth from '../../hooks/userAuth';
import BannerAvatar from '../../components/User/BannerAvatar';
import InfoUser from '../../components/User/InfoUser';
import ListTweets from '../../components/ListTweets';
import {getUserTweetsApi} from '../../api/tweet';

import './User.scss';
import { Button, Spinner } from 'react-bootstrap';

function User(props) {
    const {match}=props;
    const [user, setUser] = useState(null);
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingTweets, setLoadingTweets] = useState(false);
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

    useEffect(() => {
       getUserTweetsApi(params.id,1)
            .then(response=>{
                setTweets(response);
            })
            .catch(()=>{
                setTweets([]);
            });
    }, [params]);

    const moreData=()=>{
        const pageTemp=page+1;
        setLoadingTweets(true);

        getUserTweetsApi(params.id,pageTemp)
            .then(response=>{
                if (!response) {
                    setLoadingTweets(0);
                }else{
                    setTweets([...tweets,...response]);
                    setPage(pageTemp);
                    setLoadingTweets(tweets);
                }
            })
    };

    return (
        <BasicLayout className="user">
            <div className="user__title">
                <h2>
                    {user ? `${user.nombre} ${user.apellidos}` : "Este usuario no existe"}
                </h2>
            </div>
            <BannerAvatar user={user} loggedUser={loggedUser}/>
            <InfoUser user={user}/>
            <div className="user__tweets">
                <h3>Tweets</h3>
                {tweets && <ListTweets tweets={tweets}/>}
                <Button onClick={moreData}>
                    {!loadingTweets ? (
                        loadingTweets !== 0 && 'Obtener más tweets'
                    ):(
                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                    )}
                </Button>
            </div>
        </BasicLayout>
    );
}

export default withRouter(User);