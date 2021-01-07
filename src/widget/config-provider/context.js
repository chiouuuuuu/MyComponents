import * as React from 'react';
// import defaultRenderEmpty from './renderEmpty';
export var ConfigContext = /*#__PURE__*/React.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? "ant-".concat(suffixCls) : 'ant';
  },
  // renderEmpty: defaultRenderEmpty
});
export var ConfigConsumer = ConfigContext.Consumer;

