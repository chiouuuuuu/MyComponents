import React, {useEffect, useState} from "react";
import styles from './index.module.less';
import classNames from "classnames";
import Button from "../Button";

const addChildrenProps = (children: any, props: any) => {
    const {choseTarget, onChange} = props;
    return React.Children.map(children, child => {
        return React.cloneElement(child, {
            choseTarget,
            onChange: onChange
        });
    })
}
const defaultHandleChange = (isCheck:boolean,setIsCheck:Function) => {
    console.log('default');
    setIsCheck(!isCheck);
}
function Checkbox(props: any){
    //单独使用checkbox时 如果不传入onchange时默认调用此函数

    const {value, children, disabled, choseTarget, onChange= ()=>{defaultHandleChange(isCheck,setIsCheck)}} = props;
    //choseTarget === arr
    const [isCheck, setIsCheck] = useState<boolean>(false);

    const check = choseTarget && value ? choseTarget.includes(value) : isCheck;
    // const check=true;
    return (
        <span className={classNames(styles['checkbox-warp'], {[styles['checkbox-display-warp']]: disabled})}>
            <input type="checkbox" name={value} disabled={disabled} value={value} id={value}
                   checked={check} onChange={onChange}/>
            <label htmlFor={value}>{children + ' ' + check}</label>
        </span>
    )
}


const Tbutton=(props:any)=>{
    const {value,children,disabled,choseTarget,onChange= ()=>{defaultHandleChange(isCheck,setIsCheck)}}=props;
    const [isCheck, setIsCheck] = useState<boolean>(false);

    const check = choseTarget && value ? choseTarget.includes(value) : isCheck;
    console.log(props,check)
    return(
        <Button type={check?'primary':'default'} disabled={disabled} data-value={value} onClick={onChange}>{children}</Button>
    )
}

function Group(props: any) {
    const {children, defaultChoose, onChange} = props;
    //被选中的checkbox的value值 因为暂时无法将这个值传到父组件 所以form可能会麻烦
    const [choseTarget, setChoseTarget] = useState<string[]>(defaultChoose || []);
    const [type, setType] = useState<'button' | 'checkbox'>('checkbox');

    useEffect(() => {
        for (let i of children) {
            console.log(i.type.name)
            if (i.type.name === 'Tbutton') {
                setType('button');
                break;
            }
        }
    })

    const handleChange = (e: any) => {
        const choseTargetCopy = choseTarget.slice();
        const val = e.target.value || e.target.dataset.value;
        //checkbox || button样式
        const index = choseTargetCopy.indexOf(val);
        if (index === -1) {
            choseTargetCopy.push(val);
        } else {
            choseTargetCopy.splice(index, 1);
        }
        setChoseTarget(choseTargetCopy);
    }

    const onChangeParam=onChange || handleChange;
    console.log(type)
    return (
        <>
            <div>{JSON.stringify(choseTarget)}</div>
            <div className={styles['checkbox-group']}>
                {console.log(JSON.stringify(choseTarget))}
                {type === 'button' ?
                    <Button.ButtonGroup>
                        {addChildrenProps(children, {choseTarget, onChange:onChangeParam})}
                    </Button.ButtonGroup>
                    : addChildrenProps(children, {choseTarget, onChange:onChangeParam})}
            </div>
        </>
    )
}

Checkbox.Group = Group;
Checkbox.Button = Tbutton;

export default Checkbox;
