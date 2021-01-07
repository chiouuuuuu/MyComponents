import React, {useEffect, useMemo, useRef, useState,} from "react";
import Modal from "./minifymodal";
import {switchPosition, switchTrianglePosition,} from "./position";
import "./index.css";
import {useStateAnimation} from "./hooks";

function Popover(props) {
    const {
        content,//弹出框内容
        directions,//弹出框方向
        children,//触发弹出框的位置
        callback,
        closeFuncCallback,
        constDomStyle,//触发者的样式
        modalDomStyle,
        triangleDomStyle,
        innerDomStyle,
        innerConstDomStyle,
        modalRefCallback,
        needOutsideClose,
    } = props;
    console.log(props)
    const [visible, setVisible] = useState(false);//是否显示弹出框y
    const [style, setStyle] = useState({});//样式对象
    const [triaStyle, setTriaStyle] = useState({});
    const [forceState, forceRender] = useState(0);
    const modalRef = useRef(null);//弹出框的引用
    const ref = useRef(null);//引用到的应该是触发者的dom
    useEffect(() => {
        if (callback) {
            callback(() => forceRender((v) => v + 1));
        }
    }, [callback]);//用于关闭弹出框

    //这里是常驻的dom
    const constDom = useMemo(() => {
        // console.log(constDomStyle);
        //如果以最简单的方法使用（只传了content） 那么会是个undefined
        // console.log(children)
        // console.log(ref)
        // return (React.createElement("div", {
        //     style: Object.assign({display: "inline-block"}, constDomStyle),
        //     ref: ref
        // }, children));
        return (<div style={Object.assign({display: 'inline-block'}, constDomStyle)} ref={ref}>{children}</div>)

    }, [children, constDomStyle]);

    //提供样式并定位
    const FinalRender = useMemo(() => {
        // console.log('style',style);
        //style来自计算后的位置信息
        // console.log('modalDomStyle',modalDomStyle);
        return (React.createElement("div", {
            style: Object.assign(Object.assign(Object.assign({position: "absolute"}, style), {
                boxShadow: "0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)",
                borderRadius: "2px",
                padding: "10px",
                background: "white",
                zIndex: 2000
            }), modalDomStyle), ref: modalRef
        }, content));
    }, [style, modalDomStyle, content]);

    //1个render需要一个小三角
    const Triangle = useMemo(() => {
        let aaastyle = Object.assign(Object.assign({
            position: "absolute",
            transform: "rotate(45deg)",
            height: "8px",
            width: "8px",
            background: "#fff",
            zIndex: 2000,
            borderColor: "transparent #fff #fff transparent"
        }, triaStyle), triangleDomStyle);

        let bbbstyle = Object.assign({
            position: "absolute",
            transform: "rotate(45deg)",
            height: "8px",
            width: "8px",
            background: "#fff",
            zIndex: 2000,
            borderColor: "transparent #fff #fff transparent"
        }, triaStyle, triangleDomStyle);
        console.log('a', aaastyle);
        console.log('b', bbbstyle);

        return (React.createElement("div", {
            style: aaastyle
        }));
    }, [triaStyle, triangleDomStyle]);

    useEffect(() => {
        //出现时才有modal
        if (ref.current && modalRef.current) {
            const scroll = document.documentElement.scrollTop + document.body.scrollTop; //移动端可能取不到
            let res = switchPosition(directions, modalRef.current.getBoundingClientRect(), ref.current.getBoundingClientRect(), scroll);
            setStyle(res);
            //拿到三角形的pos
            let res2 = switchTrianglePosition(directions, modalRef.current.getBoundingClientRect(), ref.current.getBoundingClientRect(), scroll);
            setTriaStyle(res2);
        }
    }, [directions, modalRef, visible, forceState]);

    useEffect(() => {
        const handler = () => {
            forceRender((prev) => prev + 1);
        };
        window.addEventListener("resize", handler);
        return () => {
            window.removeEventListener("resize", handler);
        };
    }, [forceRender]);
    useEffect(() => {
        if (modalRefCallback) {
            modalRefCallback(modalRef);
        }
    }, [modalRefCallback]);
    const [state, setState, unmount] = useStateAnimation(setVisible, 150);
    useEffect(() => {
        let listener;
        if (needOutsideClose) {
            listener = (event) => {
                if (!modalRef.current ||
                    modalRef.current.contains(event.target)) {
                    return;
                }
                setState(false);
            };
            window.addEventListener("click", listener);
        }
        return () => {
            window.removeEventListener("click", listener);
        };
    }, [needOutsideClose, setState]);
    // return (React.createElement(React.Fragment, null,
    //     React.createElement(Modal, {
    //             visible: visible,
    //             setVisible: setVisible,
    //             constnode: constDom,
    //             closeFuncCallback: closeFuncCallback,
    //             innerDomStyle: innerDomStyle,
    //             innerConstDomStyle: innerConstDomStyle,
    //             state: state,
    //             setState: setState,
    //             unmount: unmount
    //         },
    //         FinalRender,
    //         Triangle)));
    return (<>
        <Modal visible={visible}
               setVisible={setVisible}
               constnode={constDom}
               closeFuncCallback={closeFuncCallback}
               innerDomStyle={innerDomStyle}
               innerConstDomStyle={innerConstDomStyle}
               state={state}
               setState={setState}
               unmount={unmount}
        >
            {FinalRender}
            {Triangle}
        </Modal>
    </>)
}

Popover.defaultProps = {
    directions: "TOP",
    needOutsideClose: true,
};
export default Popover;
