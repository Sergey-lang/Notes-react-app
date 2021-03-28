import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTagTC, TagType} from '../../n-2-Redux/tags-reducer';
import {Button} from '../Button/Button';
import s from './Tag.module.scss';
import {selectorAppStatus} from '../../n-3-App/selectors';

type PropsType = {
    tag: TagType
    editMode: boolean
}

export const Tag: React.FC<PropsType> = React.memo(({tag, editMode}) => {
    const dispatch = useDispatch()
    const appStatus = useSelector(selectorAppStatus)

    const removeTag = useCallback(() => {
        dispatch(deleteTagTC(tag.id))
    }, [tag.id])

    return (
        <div className={s.tag}>{tag.title}
            {editMode && <Button className={s.tag_btn}
                                 disabled={appStatus === 'loading'}
                                 onClick={removeTag}>x</Button>}
        </div>
    )
})

