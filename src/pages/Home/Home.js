import React,{useState,useEffect} from 'react';
import {Button,Spinner} from 'react-bootstrap';
import BasicLayout from '../../layout/BasicLayout';
import ListTweets from '../../components/ListTweets';
import {getTweetsFollowers} from '../../api/tweet';

import './Home.scss';

export default function Home(props) {
    const {setRefreshCheckLogin}=props;
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingTweets, setLoadingTweets] = useState(false);
    
    useEffect(() => {
        getTweetsFollowers(page).then(response=>{
            if (!tweets && response) {
                setTweets(formatModel(response));
            }else{
                if (!response) {
                    setLoadingTweets(0);
                }else{
                    const data=formatModel(response);
                    setTweets([...tweets,...data]);
                    setLoadingTweets(false);
                }
            }
            
        })
        .catch(()=>{});
    }, [page]);

    const moreData=(()=>{
        setLoadingTweets(true);
        setPage(page+1);
    });

    return (
        <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="home__title">
                <h2>Inicio</h2>
            </div>
            {tweets && <ListTweets tweets={tweets}/>}
            <Button onClick={moreData} className="load-more">
                {!loadingTweets ? (
                    loadingTweets!==0  ? "Obtner más tweets" : "No hay más tweets"
                ) : (
                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                )}
            </Button>
        </BasicLayout>
    )
}

function formatModel(tweets) {
    const tempTweets=[];
    

    tweets.forEach(tweet=>{
        tempTweets.push({
            _id:tweet._id,
            userId:tweet.userRelationId,
            mensaje:tweet.Tweet.mensaje,
            fecha:tweet.Tweet.fecha
        });
    });

    return tempTweets;
}
