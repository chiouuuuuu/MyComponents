import React, {useEffect, useState} from "react";
import styles from './index.module.less';
import classNames from "classnames";

const Input = React.forwardRef((props: any,ref) => {
    const {value, addonBefore, addonAfter, onClick, mask, ...others} = props;
    const [inputValue, setInputValue] = useState<string>(value);

    useEffect(() => {
        setInputValue(value);
    }, [value])

    const handleChange = (e: any) => {
        if (!onClick) {
            console.log(e.target.value);
            setInputValue(e.target.value);
        } else {
            onClick(e);
        }
    }
    return (
        <span className={styles['input-warp']}>
             {addonBefore && <span className={styles['addon-before']}>{addonBefore}</span>}
            <input type="text" ref={ref} className={classNames({
                [styles['input-addon-before']]: addonAfter,
                [styles['input-addon-after']]: addonBefore
            }, styles['input'])} onChange={handleChange} value={inputValue} {...others}/>
            {addonAfter && <span className={styles['addon-after']}>{addonAfter}</span>}
        </span>
    )
})
export default Input;
