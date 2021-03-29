import React from 'react';
import s from './ErrorBar.module.scss';
import errorIcon from '../../assets/icons/error.png'

type PropsType = {
    errorMessage: string
}

export const ErrorBar: React.FC<PropsType> = ({errorMessage, ...props}) => {
    return (
        <div className={s.error_bar_wrapper}>
            <img className={s.icon} src={errorIcon} alt="error"/>
            <div className={s.message}>{errorMessage}</div>
        </div>
    )
}
