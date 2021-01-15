import React from 'react'

const inputWrapperStyle = {
    margin: '10%',
    boxSizing: 'border-box'
};

export default class CardNo extends React.Component<any,{cardNo:string}> {
    constructor(props:any) {
        super(props)
        this.state = {
            cardNo: '123456',
        }
    }
    handleCardNoChange(e:any) {
        const element = e.target;

        const {
            value  // 可以在这里 debugger 一下，观察一下 react 中受控组件中，元素 value 的值和该元素对应 state 的差别
        } = element;

        const {
            cardNo
        } = this.state;

        let afterFormatCardNo = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');  // (?=.) 表明若后面还存在一位的话将前四位格式化，比如 '1234' 格式化为 '1234'，'12345' 格式化为 '1234 5'

        let cursorPositionX = element.selectionEnd;

        cursorPositionX = this.calcPos(cursorPositionX, cardNo, value, afterFormatCardNo, [' '], /\D/g);

        this.setState({
            cardNo: afterFormatCardNo
        }, () => {
            element.selectionStart = element.selectionEnd = cursorPositionX;
        })

    }

    /**
     * 计算光标位置
     * @param {*} prePos 格式化前光标位置，光标位置从 0 开始
     * @param {*} preCtrlVal 输入前输入框的内容，例如：1234 1234 1234 123
     * @param {*} beforeFormatVal 格式化前输入框的值
     * @param {*} afterFormatVal 格式化后的值
     * @param {*} placeholderChars
     * @param {*} maskReg
     */
    calcPos = function (prePos = 0, preCtrlVal = '', beforeFormatVal = '', afterFormatVal = '', placeholderChars:any, maskReg:any) {
        // debugger
        var editLength = beforeFormatVal.length - preCtrlVal.length;  // 输入后的值 - 输入前的值，用来判断是输入还是删除，新输入字符串长度
        var isAddition = editLength > 0;  // true 表示输入，false 表示删除
        var pos = prePos;
        if (isAddition) {  // 输入操作，光标移动方案
            var additionStr = beforeFormatVal.substring(pos - editLength, pos);  // pos - editLength 表示输入前光标位置，pos 表示输入后光标位置, additionStr 表示输入的字符串
            // var additionStr = beforeFormatVal.substr(pos - editLength, editLength);
            var ctrlCharCount = additionStr.replace(maskReg, '').length;  // ’1234 1234‘ -> '12341234' 有效字符长度
            // pos = pos - (editLength - ctrlCharCount);
            pos = pos - editLength + ctrlCharCount;
            var placeholderCharCount = 0;
            while (ctrlCharCount > 0) {
                if (placeholderChars.indexOf(afterFormatVal.charAt(pos - ctrlCharCount + placeholderCharCount)) === -1) {
                    ctrlCharCount--;
                } else {
                    placeholderCharCount++;
                }
            }
            pos = pos + placeholderCharCount;
        } else {  // 删除操作，光标移动方案
            if (pos > 0 && pos % 5 === 0) {
                pos = pos - 1;
            }
        }
        return pos;
    };

    render() {
        return (
            <div style={{
                margin: '10%',
                boxSizing: 'border-box'
            }} >
                <input onChange={this.handleCardNoChange.bind(this)} value={this.state.cardNo} style={{ width: '100%', fontSize: '22px' }} />
            </div>
        )
    }
}
