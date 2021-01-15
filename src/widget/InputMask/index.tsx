import React, {useEffect, useState} from "react";
import Input from '../Input';
// 用一个input 接受一个数字数组作为参数，按顺序限制位数 如果未来有必要 将数字改为对象 其中包括 位数和类型（number||string
// 参数接受分隔符标志数组或者单个的标志符 类型是strArr 或者 arr
// 实现 初始值为 位数*_ + 分隔符 。。。

/***
 * 监听 onchang 事件 如果符合 就直接添加 不符合则无视 直接return
 * 逐渐替换字符
 * 如果到了第一个分隔符 那么 跳过分隔符
 * 使用e.target 和 selectionStart selectionEnd 控制光标的位置
 * 难度不小 暂时先不做 可以参考input mask ref 组件
 */

class InputMask extends React.Component<any, any>{
    // 6  8  4
    // const {numArr,sym}=props;
    constructor(props:any) {
        super(props);
       this.state={
           defaultVal:'',
           value:''
       }
    }
    numArr = [6, 8, 4];//目前只限制位数 类型默认为数字 之后可能是一个对象数组 限制输入的值的类型
    sym = '/';
    componentDidMount() {
        let defaultVal=''
        if (typeof this.sym !== 'object') { //sym 之后可能会是一个数组 对应 xxx/xxx-xxx 这样的mask
            const arr = this.numArr.map((item: number) => {
                return '_'.repeat(item);
            })
            defaultVal = arr.join(this.sym);
        }
        this.setState({defaultVal});
    }

    // const [value, setValue] = useState<string>('');
    // const [index, setIndex] = useState<number>(0);//光标的位置
    // const [isEmptyFocus, setIsEmptyFocus] = useState<boolean>(true);

    //==========================================

    getIndex = (str1: string, str2: string, len: number): number => {
        if (len < 0) {
            return 0;
        } else {
            for (let i = 0; i < str1.length; i++) {
                if (str1[i] !== str2[i]) {
                    return i;
                }
            }
            return str2.length - 1;
        }
    }

    sum = (arr: number[]) => {
        return arr.reduce((res, item) => {
            return res + item;
        })
    }
    //123456789
    handleChange = (e: any) => {
        const value=this.state.value;
        console.log('--------------')
        console.log('target', e.target.value)//是一个键入后的情景
        console.log('pos', e.target.selectionStart, e.target.selectionEnd);
        let pos=e.target.selectionEnd;
        let targetValue = e.target.value;
        let len = targetValue.length - value.length;// 目标值-缓存值 <0 表示删减 >0 表示增加
        console.log('len', len);
        // let index = getIndex(value, e.target.value, len);
        let index=pos-len;
        console.log('index-2', index, e.target.value[index]);

        let additionStr = e.target.value.substring(pos - len, pos);
        console.log('add value',additionStr);
        let copy = value;
        let n = '';
        for (let i = 0, cnt = 0, flag = false; i < copy.length; i++) {
            if (!flag && cnt === index) {
                for(let j=0;j<additionStr.length;) {
                    if (copy[i] === '/') {
                        n += '/';
                        i++;
                    } else {
                        n += additionStr[j];
                        j++;i++;
                    }
                }
                flag = true;
                i--;
            } else if (!flag) {
                n += copy[i];
                cnt++;
            } else if(flag) {
                console.log(i-1)
                console.log(copy.length)
                n += copy.substring(i);
                break;
            }
        }
        // setValue(n);
        this.setState({value:n},()=>{
            e.target.setSelectionRange(pos+len,pos+len)
            e.target.selectionStart=e.target.selectionEnd=pos+len;
        })
        console.log(e.target.selectionStart)
    }

    handleFocus = (e: any) => {
        if (this.state.value === '') {
            this.setState({value:this.state.defaultVal});
        }
    }

    handleBlur = (e: any) => {
        if (this.state.value === this.state.defaultVal) {
            this.setState({value:''});
        }
    }

    // const handleBlur=(e:any)=>{
    //     setValue('');
    // }
    render() {
        const {value}=this.state;
        return (
            <div>
                <Input value={value} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}>

                </Input>
            </div>
        )
    }
}

export default InputMask;
