import React from 'react';
import { MyButton } from '../../components/MyButton/MyButton';
import { useNavigate } from 'react-router-dom';
import notFound from '../../assets/img/Not_found.png'
import styles from './NotFoundPage.module.css'

export const NotFoundPage = () => {

const navigation=useNavigate()

const onGoHome=()=>{
navigation('/')
}

    return (
        <div >
           
            <img src={notFound} alt="not_found" className={styles.not__found}/>  
          <MyButton onClick={onGoHome}>Main Gallery</MyButton>
        </div>
    );
};