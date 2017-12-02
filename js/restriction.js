//This code quote from StackOverFlow - Rob W
//https://stackoverflow.com/questions/23202136/changing-navigator-useragent-using-chrome-extension

var actualCode =  '(' + function() {
    'use strict';
    var navigator = window.navigator;
    var modifiedNavigator = Navigator.prototype;
    // Pretend to be Windows 7
    Object.defineProperties(modifiedNavigator, {
        userAgent: {
            value: navigator.userAgent.replace(/\([^)]+\)/, '(Windows NT 6.1; Win64; x64)'),
            configurable: false,
            enumerable: true,
            writable: false
        },
        appVersion: {
            value: navigator.appVersion.replace(/\([^)]+\)/, '(Windows NT 6.1; Win64; x64)'),
            configurable: false,
            enumerable: true,
            writable: false
        },
        platform: {
            value: 'Win32',
            configurable: false,
            enumerable: true,
            writable: false
        },
    });
} + ')();';

var s = document.createElement('script');
s.textContent = actualCode;
document.documentElement.appendChild(s);
s.remove();
