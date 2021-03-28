import React from 'react';
import {HighlightWithinTextarea} from 'react-highlight-within-textarea'
import s from './HighlightTextarea.module.scss'

export const HighlightTextarea = (props) => {
    return (
        <HighlightWithinTextarea
            className={s.text_area}
            onKeyUp={props.onKeyPress}
            value={props.areaText}
            highlight={props.tagsNameArray}
            onChange= {(event)=> props.setAreaText(event.target.value)}
        />
    );
};
