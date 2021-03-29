import React, {useCallback, useState} from 'react';
import {Button} from '../Button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {getNotesListTC} from '../../n-2-Redux/notes-reducer';
import s from './SearchField.module.scss'
import {selectorAppStatus} from '../../n-3-App/selectors';
import {Input} from '../Input/Input';
import {addNewTagTC} from '../../n-2-Redux/tags-reducer';
import {setAppStatus} from '../../n-2-Redux/app-reducer';

type PropsType = {
    callback: (value: string) => void
}

export const SearchField: React.FC<PropsType> = ({callback}) => {
    const dispatch = useDispatch()
    const appStatus = useSelector(selectorAppStatus)
    const [value, setValue] = useState<string>('')

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onSendRequest = useCallback(() => {
        if (value.trim() !== '') {
            callback(`#${value}`)
            setValue('')
        } else {
            dispatch(setAppStatus('failed', 'Title is required'))
        }
    },[value,callback])

    const showAll = useCallback(() => {
        dispatch(getNotesListTC())
    },[dispatch])

    return (
        <div className={s.search}>
            <Input className={s.search_input}
                   onEnter={onSendRequest}
                   value={value}
                   placeholder='Search...'
                   onChange={inputHandler}
            />
            <div className={s.search_btn_wrapper}>
                <Button className={s.search_btn}
                        onClick={onSendRequest} disabled={appStatus === 'loading'}>FILTER</Button>
                <Button className={s.search_btn}
                        onClick={showAll}
                        disabled={appStatus === 'loading'}>All</Button>
            </div>
        </div>
    )
}
