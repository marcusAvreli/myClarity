(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	function __$styleInject(css, returnValue) {
	  if (typeof document === 'undefined') {
	    return returnValue;
	  }
	  css = css || '';
	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';
	  head.appendChild(style);
	  
	  if (style.styleSheet){
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	  return returnValue;
	}

	__$styleInject("$main-color: #0259b3;\r\n$gray: #eee;\r\n$dark: #1d2e38;\r\n",undefined);

})));
