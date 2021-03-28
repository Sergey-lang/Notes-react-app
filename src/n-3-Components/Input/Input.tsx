import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react';
import s from './Input.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type InputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

export const Input: React.FC<InputTextPropsType> = React.memo((
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

        ...restProps
    }
) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e)

        e.key === 'Enter'
        && onEnter
        && onEnter()
    }

    const finalInputClassName = className ? `${s.input} ${className}` : s.superInput
    const finalSpanClassName = spanClassName ? `${s.error} ${spanClassName}` : s.spanError

    return (
        <>
            <input type={'text'}
                   onChange={onChangeCallback}
                   onKeyPress={onKeyPressCallback}
                   className={finalInputClassName}

                   {...restProps}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </>
    )
})

