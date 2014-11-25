/*! 
* DevExpress Core Library
* Version: 13.2.8
* Build date: Mar 11, 2014
*
* Copyright (c) 2012 - 2014 Developer Express Inc. ALL RIGHTS RESERVED
* EULA: http://phonejs.devexpress.com/EULA
*/

"use strict";
if (!window.DevExpress) {
    /*! Module core, file devexpress.js */
    (function($, global, undefined) {
        (function checkjQueryVersion(version) {
            version = version.split(".");
            if (version[0] < 1 || version[0] === 1 && version[1] < 10)
                throw Error("Your version of jQuery is too old. Please upgrade jQuery to 1.10.0 or later.");
        })($.fn.jquery);
        var Class = function() {
                var wrapOverridden = function(baseProto, methodName, method) {
                        return function() {
                                var prevCallBase = this.callBase;
                                this.callBase = baseProto[methodName];
                                try {
                                    return method.apply(this, arguments)
                                }
                                finally {
                                    this.callBase = prevCallBase
                                }
                            }
                    };
                var clonePrototype = function(obj) {
                        var func = function(){};
                        func.prototype = obj.prototype;
                        return new func
                    };
                var classImpl = function(){};
                var redefine = function(members) {
                        var self = this;
                        if (!members)
                            return self;
                        var memberNames = $.map(members, function(_, k) {
                                return k
                            });
                        $.each(["toString", "toLocaleString", "valueOf"], function() {
                            if (members[this])
                                memberNames.push(this)
                        });
                        $.each(memberNames, function() {
                            var overridden = $.isFunction(self.prototype[this]) && $.isFunction(members[this]);
                            self.prototype[this] = overridden ? wrapOverridden(self.parent.prototype, this, members[this]) : members[this]
                        });
                        return self
                    };
                var include = function() {
                        var classObj = this;
                        $.each(arguments, function() {
                            if (this.ctor)
                                classObj._includedCtors.push(this.ctor);
                            for (var name in this) {
                                if (name === "ctor")
                                    continue;
                                if (name in classObj.prototype)
                                    throw Error("Member name collision: " + name);
                                classObj.prototype[name] = this[name]
                            }
                        });
                        return classObj
                    };
                var subclassOf = function(parentClass) {
                        if (this.parent === parentClass)
                            return true;
                        if (!this.parent || !this.parent.subclassOf)
                            return false;
                        return this.parent.subclassOf(parentClass)
                    };
                classImpl.inherit = function(members) {
                    var inheritor = function() {
                            if (!this || this.constructor !== inheritor)
                                throw Error("A class must be instantiated using the 'new' keyword");
                            var instance = this,
                                ctor = instance.ctor;
                            if (ctor)
                                ctor.apply(instance, arguments);
                            $.each(instance.constructor._includedCtors, function() {
                                this.call(instance)
                            })
                        };
                    inheritor.prototype = clonePrototype(this);
                    inheritor.inherit = this.inherit;
                    inheritor.redefine = redefine;
                    inheritor.include = include;
                    inheritor.subclassOf = subclassOf;
                    inheritor.parent = this;
                    inheritor._includedCtors = this._includedCtors ? this._includedCtors.slice(0) : [];
                    inheritor.prototype.constructor = inheritor;
                    inheritor.redefine(members);
                    return inheritor
                };
                return classImpl
            }();
        function createQueue(discardPendingTasks) {
            var _tasks = [],
                _busy = false;
            function exec() {
                while (_tasks.length) {
                    _busy = true;
                    var task = _tasks.shift(),
                        result = task();
                    if (result === undefined)
                        continue;
                    if (result.then) {
                        $.when(result).always(exec);
                        return
                    }
                    throw Error("Queued task returned unexpected result");
                }
                _busy = false
            }
            function add(task, removeTaskCallback) {
                if (!discardPendingTasks)
                    _tasks.push(task);
                else {
                    if (_tasks[0] && removeTaskCallback)
                        removeTaskCallback(_tasks[0]);
                    _tasks = [task]
                }
                if (!_busy)
                    exec()
            }
            function busy() {
                return _busy
            }
            return {
                    add: add,
                    busy: busy
                }
        }
        var parseUrl = function() {
                var a = document.createElement("a"),
                    props = ["protocol", "hostname", "port", "pathname", "search", "hash"];
                var normalizePath = function(value) {
                        if (value.charAt(0) !== "/")
                            value = "/" + value;
                        return value
                    };
                return function(url) {
                        a.href = url;
                        var result = {};
                        $.each(props, function() {
                            result[this] = a[this]
                        });
                        result.pathname = normalizePath(result.pathname);
                        return result
                    }
            }();
        global.DevExpress = global.DevExpress || {};
        var enqueueAsync = function(task) {
                var deferred = $.Deferred();
                setTimeout(function() {
                    deferred.resolve(task())
                }, 60);
                return deferred
            };
        var backButtonCallback = function() {
                var callbacks = [];
                return {
                        add: function(callback) {
                            var indexOfCallback = $.inArray(callback, callbacks);
                            if (indexOfCallback === -1)
                                callbacks.push(callback)
                        },
                        remove: function(callback) {
                            var indexOfCallback = $.inArray(callback, callbacks);
                            if (indexOfCallback !== -1)
                                callbacks.splice(indexOfCallback, 1)
                        },
                        fire: function() {
                            var callback = callbacks.pop(),
                                result = !!callback;
                            if (result)
                                callback();
                            return result
                        },
                        hasCallback: function() {
                            return callbacks.length > 0
                        },
                        reset: function() {
                            callbacks = []
                        }
                    }
            }();
        var overlayTargetContainer = function() {
                var defaultTargetContainer = "body";
                return function(targetContainer) {
                        if (arguments.length)
                            defaultTargetContainer = targetContainer;
                        return defaultTargetContainer
                    }
            }();
        $.extend(global.DevExpress, {
            abstract: function() {
                throw Error("Not implemented");
            },
            Class: Class,
            createQueue: createQueue,
            enqueue: createQueue().add,
            enqueueAsync: enqueueAsync,
            parseUrl: parseUrl,
            backButtonCallback: backButtonCallback,
            hardwareBackButton: $.Callbacks(),
            overlayTargetContainer: overlayTargetContainer
        })
    })(jQuery, this);
    /*! Module core, file inflector.js */
    (function($, DX, undefined) {
        var _normalize = function(text) {
                if (text === undefined || text === null)
                    return "";
                return String(text)
            };
        var _ucfirst = function(text) {
                return _normalize(text).charAt(0).toUpperCase() + text.substr(1)
            };
        var _chop = function(text) {
                return _normalize(text).replace(/([a-z\d])([A-Z])/g, "$1 $2").split(/[\s_-]+/)
            };
        var dasherize = function(text) {
                return $.map(_chop(text), function(p) {
                        return p.toLowerCase()
                    }).join("-")
            };
        var underscore = function(text) {
                return dasherize(text).replace(/-/g, "_")
            };
        var camelize = function(text, upperFirst) {
                return $.map(_chop(text), function(p, i) {
                        p = p.toLowerCase();
                        if (upperFirst || i > 0)
                            p = _ucfirst(p);
                        return p
                    }).join("")
            };
        var humanize = function(text) {
                return _ucfirst(dasherize(text).replace(/-/g, " "))
            };
        var titleize = function(text) {
                return $.map(_chop(text), function(p) {
                        return _ucfirst(p.toLowerCase())
                    }).join(" ")
            };
        DX.inflector = {
            dasherize: dasherize,
            camelize: camelize,
            humanize: humanize,
            titleize: titleize,
            underscore: underscore
        }
    })(jQuery, DevExpress);
    /*! Module core, file devices.js */
    (function($, DX, undefined) {
        var knownUATable = {
                iPhone: "iPhone",
                iPhone5: "iPhone 5",
                iPad: "iPad",
                iPadMini: "iPad Mini",
                androidPhone: "Android Mobile",
                androidTablet: "Android",
                win8: "MSAppHost",
                win8Phone: "Windows Phone 8",
                msSurface: "MSIE ARM Tablet PC",
                desktop: "desktop",
                tizen: "Tizen Mobile"
            };
        var knownMajorVersion = {
                ios: [5, 6, 7],
                android: [2, 3, 4],
                win8: [8],
                tizen: [2],
                desktop: [],
                generic: []
            };
        var device;
        var current = function(deviceOrName) {
                if (deviceOrName)
                    device = getDevice(deviceOrName);
                else {
                    if (!device) {
                        deviceOrName = undefined;
                        try {
                            deviceOrName = getDeviceOrNameFromWindowScope()
                        }
                        catch(e) {
                            deviceOrName = getDeviceNameFromSessionStorage()
                        }
                        finally {
                            if (!deviceOrName)
                                deviceOrName = getDeviceNameFromSessionStorage()
                        }
                        device = getDevice(deviceOrName)
                    }
                    return device
                }
            };
        var getDevice = function(deviceName) {
                if (deviceName === "genericPhone")
                    return {
                            deviceType: "phone",
                            platform: "generic",
                            generic: true
                        };
                if ($.isPlainObject(deviceName))
                    return fromConfig(deviceName);
                else {
                    var ua;
                    if (deviceName) {
                        ua = knownUATable[deviceName];
                        if (!ua)
                            throw Error("Unknown device");
                    }
                    else
                        ua = navigator.userAgent;
                    return fromUA(ua)
                }
            };
        var fromConfig = function(config) {
                var shortcuts = {
                        phone: config.deviceType === "phone",
                        tablet: config.deviceType === "tablet",
                        android: config.platform === "android",
                        ios: config.platform === "ios",
                        win8: config.platform === "win8",
                        tizen: config.platform === "tizen",
                        generic: config.platform === "generic"
                    };
                return $.extend({}, defaultDevice, shortcuts, config)
            };
        var fromUA = function(ua) {
                return deviceParser.ios(ua) || deviceParser.android(ua) || deviceParser.win8(ua) || deviceParser.tizen(ua) || deviceParser.desktop(ua) || genericDevice
            };
        var defaultDevice = {
                deviceType: "",
                platform: "",
                version: [],
                phone: false,
                tablet: false,
                android: false,
                ios: false,
                win8: false,
                tizen: false,
                generic: false
            };
        var genericDevice = $.extend(defaultDevice, {
                platform: "generic",
                deviceType: "phone",
                generic: true
            });
        var deviceParser = {
                ios: function(userAgent) {
                    if (!/ip(hone|od|ad)/i.test(userAgent))
                        return;
                    var isPhone = /ip(hone|od)/i.test(userAgent);
                    var matches = userAgent.match(/os (\d+)_(\d+)_?(\d+)?/i);
                    var version = matches ? [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3] || 0, 10)] : [];
                    return fromConfig({
                            deviceType: isPhone ? "phone" : "tablet",
                            platform: "ios",
                            version: version
                        })
                },
                android: function(userAgent) {
                    if (!/android|htc_|silk/i.test(userAgent))
                        return;
                    var isPhone = /mobile/i.test(userAgent);
                    var matches = userAgent.match(/android (\d+)\.(\d+)\.?(\d+)?/i);
                    var version = matches ? [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3] || 0, 10)] : [];
                    return fromConfig({
                            deviceType: isPhone ? "phone" : "tablet",
                            platform: "android",
                            version: version
                        })
                },
                win8: function(userAgent) {
                    var isPhone = /windows phone/i.test(userAgent),
                        isTablet = !isPhone && /arm(.*)trident/i.test(userAgent),
                        isDesktop = !isPhone && !isTablet && /msapphost/i.test(userAgent);
                    if (!(isPhone || isTablet || isDesktop))
                        return;
                    var matches = userAgent.match(/windows phone (\d+).(\d+)/i) || userAgent.match(/windows nt (\d+).(\d+)/i),
                        version = matches ? [parseInt(matches[1], 10), parseInt(matches[2], 10)] : [];
                    return fromConfig({
                            deviceType: isPhone ? "phone" : isTablet ? "tablet" : "desktop",
                            platform: "win8",
                            version: version
                        })
                },
                tizen: function(userAgent) {
                    if (!/tizen/i.test(userAgent))
                        return;
                    var isPhone = /mobile/i.test(userAgent);
                    var matches = userAgent.match(/tizen (\d+)\.(\d+)/i);
                    var version = matches ? [parseInt(matches[1], 10), parseInt(matches[2], 10)] : [];
                    return fromConfig({
                            deviceType: isPhone ? "phone" : "tablet",
                            platform: "tizen",
                            version: version
                        })
                },
                desktop: function(userAgent) {
                    if (!/desktop/i.test(userAgent))
                        return;
                    return fromConfig({
                            deviceType: "desktop",
                            platform: "desktop"
                        })
                }
            };
        var getDeviceOrNameFromWindowScope = function() {
                var result;
                if (window.top["dx-force-device-object"] || window.top["dx-force-device"])
                    result = window.top["dx-force-device-object"] || window.top["dx-force-device"];
                return result
            };
        var getDeviceNameFromSessionStorage = function() {
                return window.sessionStorage && (sessionStorage.getItem("dx-force-device") || sessionStorage.getItem("dx-simulator-device"))
            };
        var getDeviceMajorVersionClass = function(device) {
                var versions = knownMajorVersion[device.platform],
                    deviceVersion = device.version && device.version[0],
                    lastVersion = versions[versions.length - 1];
                if (deviceVersion) {
                    var isKnownVersion = $.inArray(parseInt(deviceVersion, 10), versions) !== -1,
                        version = isKnownVersion ? deviceVersion : lastVersion;
                    return " dx-version-major-" + version
                }
                return lastVersion ? " dx-version-major-" + lastVersion : ""
            };
        DX.devices = {
            attachCss: function(element, device) {
                var $element = $(element);
                device = device || this.current();
                var deviceTypeClass = device.deviceType ? " dx-device-" + device.deviceType : "";
                $element.addClass("dx-theme-" + device.platform).addClass("dx-theme-" + device.platform + "-typography").addClass(deviceTypeClass).addClass(getDeviceMajorVersionClass(device))
            },
            current: current,
            real: getDevice(),
            isRippleEmulator: function() {
                return !!window.tinyHippos
            },
            isSimulator: function() {
                try {
                    return window.top !== window.self && window.top["dx-force-device"]
                }
                catch(e) {
                    return false
                }
            }
        };
        DX.devices.__internals = {fromUA: fromUA}
    })(jQuery, DevExpress);
    /*! Module core, file browser.js */
    (function($, DX, global, undefined) {
        var webkitRegExp = /(webkit)[ \/]([\w.]+)/,
            operaRegExp = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            ieRegExp = /(msie) ([\w.]+)/,
            mozillaRegExp = /(mozilla)(?:.*? rv:([\w.]+))?/;
        var ua = navigator.userAgent.toLowerCase();
        var browser = function() {
                var result = {},
                    matches = webkitRegExp.exec(ua) || operaRegExp.exec(ua) || ieRegExp.exec(ua) || ua.indexOf("compatible") < 0 && mozillaRegExp.exec(ua) || [],
                    browserName = matches[1],
                    browserVersion = matches[2];
                if (browserName) {
                    result[browserName] = true;
                    result.version = browserVersion
                }
                return result
            }();
        DX.browser = browser
    })(jQuery, DevExpress, this);
    /*! Module core, file support.js */
    (function($, DX, window) {
        var cssPrefixes = ["", "Webkit", "Moz", "O", "ms"],
            styles = document.createElement("dx").style;
        var transitionEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd',
                msTransition: 'MsTransitionEnd',
                transition: 'transitionend'
            };
        var styleProp = function(prop) {
                prop = DX.inflector.camelize(prop, true);
                for (var i = 0, cssPrefixesCount = cssPrefixes.length; i < cssPrefixesCount; i++) {
                    var specific = cssPrefixes[i] + prop;
                    if (specific in styles)
                        return specific
                }
            };
        var supportProp = function(prop) {
                return !!styleProp(prop)
            };
        var isDesktopIE = (DX.devices.real.deviceType === "desktop" || DX.devices.isSimulator()) && DX.browser.msie;
        DX.support = {
            touch: "ontouchstart" in window,
            pointer: window.navigator.pointerEnabled,
            transform3d: !isDesktopIE && supportProp("perspective"),
            transition: supportProp("transition"),
            transitionEndEventName: transitionEndEventNames[styleProp("transition")],
            animation: supportProp("animation"),
            winJS: "WinJS" in window,
            styleProp: styleProp,
            supportProp: supportProp,
            hasKo: !!window.ko,
            hasNg: !window.ko && !!window.angular,
            inputType: function(type) {
                if (type === "text")
                    return true;
                var input = document.createElement("input");
                try {
                    input.setAttribute("type", type);
                    input.value = "wrongValue";
                    return !input.value
                }
                catch(e) {
                    return false
                }
            }
        }
    })(jQuery, DevExpress, this);
    /*! Module core, file position.js */
    (function($, DX, undefined) {
        var horzRe = /left|right/,
            vertRe = /top|bottom/,
            collisionRe = /fit|flip|none/;
        var splitPair = function(raw) {
                switch (typeof raw) {
                    case"string":
                        return raw.split(/\s+/, 2);
                    case"object":
                        return [raw.x || raw.h, raw.y || raw.v];
                    case"number":
                        return [raw];
                    default:
                        return raw
                }
            };
        var normalizeAlign = function(raw) {
                var result = {
                        h: "center",
                        v: "center"
                    };
                var pair = splitPair(raw);
                if (pair)
                    $.each(pair, function() {
                        var w = String(this).toLowerCase();
                        if (horzRe.test(w))
                            result.h = w;
                        else if (vertRe.test(w))
                            result.v = w
                    });
                return result
            };
        var normalizeOffset = function(raw) {
                var pair = splitPair(raw),
                    h = parseInt(pair && pair[0], 10),
                    v = parseInt(pair && pair[1], 10);
                if (!isFinite(h))
                    h = 0;
                if (!isFinite(v))
                    v = h;
                return {
                        h: h,
                        v: v
                    }
            };
        var normalizeCollision = function(raw) {
                var pair = splitPair(raw),
                    h = String(pair && pair[0]).toLowerCase(),
                    v = String(pair && pair[1]).toLowerCase();
                if (!collisionRe.test(h))
                    h = "none";
                if (!collisionRe.test(v))
                    v = h;
                return {
                        h: h,
                        v: v
                    }
            };
        var getAlignFactor = function(align) {
                switch (align) {
                    case"center":
                        return 0.5;
                    case"right":
                    case"bottom":
                        return 1;
                    default:
                        return 0
                }
            };
        var inverseAlign = function(align) {
                switch (align) {
                    case"left":
                        return "right";
                    case"right":
                        return "left";
                    case"top":
                        return "bottom";
                    case"bottom":
                        return "top";
                    default:
                        return align
                }
            };
        var initMyLocation = function(data) {
                data.myLocation = data.atLocation + getAlignFactor(data.atAlign) * data.atSize - getAlignFactor(data.myAlign) * data.mySize + data.offset
            };
        var decolliders = {
                fit: function(data, bounds) {
                    var result = false;
                    if (data.myLocation > bounds.max) {
                        data.myLocation = bounds.max;
                        result = true
                    }
                    if (data.myLocation < bounds.min) {
                        data.myLocation = bounds.min;
                        result = true
                    }
                    return result
                },
                flip: function(data, bounds) {
                    if (data.myAlign === "center" && data.atAlign === "center")
                        return false;
                    if (data.myLocation < bounds.min || data.myLocation > bounds.max) {
                        var inverseData = $.extend({}, data, {
                                myAlign: inverseAlign(data.myAlign),
                                atAlign: inverseAlign(data.atAlign),
                                offset: -data.offset
                            });
                        initMyLocation(inverseData);
                        if (inverseData.myLocation >= bounds.min && inverseData.myLocation <= bounds.max || inverseData.myLocation > data.myLocation) {
                            data.myLocation = inverseData.myLocation;
                            return true
                        }
                    }
                    return false
                }
            };
        var scrollbarWidth;
        var defaultPositionResult = {
                h: {
                    location: 0,
                    flip: false,
                    fit: false
                },
                v: {
                    location: 0,
                    flip: false,
                    fit: false
                }
            };
        var calculatePosition = function(what, options) {
                var $what = $(what),
                    currentOffset = $what.offset(),
                    result = $.extend(true, {}, defaultPositionResult, {
                        h: {location: currentOffset.left},
                        v: {location: currentOffset.top}
                    });
                if (!options)
                    return result;
                var my = normalizeAlign(options.my),
                    at = normalizeAlign(options.at),
                    of = options.of || window,
                    offset = normalizeOffset(options.offset),
                    collision = normalizeCollision(options.collision);
                var h = {
                        mySize: $what.outerWidth(),
                        myAlign: my.h,
                        atAlign: at.h,
                        offset: offset.h,
                        collision: collision.h
                    };
                var v = {
                        mySize: $what.outerHeight(),
                        myAlign: my.v,
                        atAlign: at.v,
                        offset: offset.v,
                        collision: collision.v
                    };
                if (of.preventDefault) {
                    h.atLocation = of.pageX;
                    v.atLocation = of.pageY;
                    h.atSize = 0;
                    v.atSize = 0
                }
                else {
                    of = $(of);
                    if ($.isWindow(of[0])) {
                        h.atLocation = of.scrollLeft();
                        v.atLocation = of.scrollTop();
                        h.atSize = of.width();
                        v.atSize = of.height()
                    }
                    else if (of[0].nodeType === 9) {
                        h.atLocation = 0;
                        v.atLocation = 0;
                        h.atSize = of.width();
                        v.atSize = of.height()
                    }
                    else {
                        var o = of.offset();
                        h.atLocation = o.left;
                        v.atLocation = o.top;
                        h.atSize = of.outerWidth();
                        v.atSize = of.outerHeight()
                    }
                }
                initMyLocation(h);
                initMyLocation(v);
                var bounds = function() {
                        var win = $(window),
                            windowWidth = win.width(),
                            windowHeight = win.height(),
                            left = win.scrollLeft(),
                            top = win.scrollTop(),
                            hScrollbar = document.width > document.documentElement.clientWidth,
                            vScrollbar = document.height > document.documentElement.clientHeight,
                            hZoomLevel = DX.support.touch ? document.documentElement.clientWidth / (vScrollbar ? windowWidth - scrollbarWidth : windowWidth) : 1,
                            vZoomLevel = DX.support.touch ? document.documentElement.clientHeight / (hScrollbar ? windowHeight - scrollbarWidth : windowHeight) : 1;
                        if (scrollbarWidth === undefined)
                            scrollbarWidth = calculateScrollbarWidth();
                        return {
                                h: {
                                    min: left,
                                    max: left + win.width() / hZoomLevel - h.mySize
                                },
                                v: {
                                    min: top,
                                    max: top + win.height() / vZoomLevel - v.mySize
                                }
                            }
                    }();
                if (decolliders[h.collision])
                    result.h[h.collision] = decolliders[h.collision](h, bounds.h);
                if (decolliders[v.collision])
                    result.v[v.collision] = decolliders[v.collision](v, bounds.v);
                $.extend(true, result, {
                    h: {location: Math.round(h.myLocation)},
                    v: {location: Math.round(v.myLocation)}
                });
                return result
            };
        var position = function(what, options) {
                var $what = $(what);
                if (!options)
                    return $what.offset();
                var targetPosition = options.h && options.v ? options : calculatePosition($what, options);
                $what.offset({
                    left: targetPosition.h.location,
                    top: targetPosition.v.location
                });
                return targetPosition
            };
        $.extend(DX, {
            calculatePosition: calculatePosition,
            position: position,
            inverseAlign: inverseAlign
        });
        var calculateScrollbarWidth = function() {
                var $scrollDiv = $("<div>").css({
                        width: 100,
                        height: 100,
                        overflow: "scroll",
                        position: "absolute",
                        top: -9999
                    }).appendTo($("body")),
                    result = $scrollDiv.get(0).offsetWidth - $scrollDiv.get(0).clientWidth;
                $scrollDiv.remove();
                return result
            }
    })(jQuery, DevExpress);
    /*! Module core, file action.js */
    (function($, DX, undefined) {
        var actionExecutors = {};
        var registerExecutor = function(name, executor) {
                if ($.isPlainObject(name)) {
                    $.each(name, registerExecutor);
                    return
                }
                actionExecutors[name] = executor
            };
        var unregisterExecutor = function(name) {
                var args = $.makeArray(arguments);
                $.each(args, function() {
                    delete actionExecutors[this]
                })
            };
        registerExecutor({
            func: {execute: function(e) {
                    if ($.isFunction(e.action)) {
                        e.result = e.action.apply(e.context, e.args);
                        e.handled = true
                    }
                }},
            url: {execute: function(e) {
                    if (typeof e.action === "string" && e.action.charAt(0) !== "#")
                        document.location = e.action
                }},
            hash: {execute: function(e) {
                    if (typeof e.action === "string" && e.action.charAt(0) === "#")
                        document.location.hash = e.action
                }}
        });
        var Action = DX.Class.inherit({
                ctor: function(action, config) {
                    config = config || {};
                    this._action = action || $.noop;
                    this._context = config.context || window;
                    this._beforeExecute = config.beforeExecute || $.noop;
                    this._afterExecute = config.afterExecute || $.noop;
                    this._component = config.component;
                    this._excludeValidators = config.excludeValidators
                },
                execute: function() {
                    var e = {
                            action: this._action,
                            args: Array.prototype.slice.call(arguments),
                            context: this._context,
                            component: this._component,
                            canceled: false,
                            handled: false
                        };
                    if (!this._validateAction(e))
                        return;
                    this._beforeExecute.call(this._context, e);
                    if (e.canceled)
                        return;
                    var result = this._executeAction(e);
                    this._afterExecute.call(this._context, e);
                    return result
                },
                _validateAction: function(e) {
                    var excludeValidators = this._excludeValidators;
                    $.each(actionExecutors, function(name, executor) {
                        if (excludeValidators && $.inArray(name, excludeValidators) > -1)
                            return;
                        if (executor.validate)
                            executor.validate(e);
                        if (e.canceled)
                            return false
                    });
                    return !e.canceled
                },
                _executeAction: function(e) {
                    var result;
                    $.each(actionExecutors, function(index, executor) {
                        if (executor.execute)
                            executor.execute(e);
                        if (e.handled) {
                            result = e.result;
                            return false
                        }
                    });
                    return result
                }
            });
        $.extend(DX, {
            registerActionExecutor: registerExecutor,
            unregisterActionExecutor: unregisterExecutor,
            Action: Action
        });
        DX.__internals = {actionExecutors: actionExecutors}
    })(jQuery, DevExpress);
    /*! Module core, file utils.js */
    (function($, DX, undefined) {
        var PI = Math.PI,
            LN10 = Math.LN10;
        var cos = Math.cos,
            sin = Math.sin,
            abs = Math.abs,
            log = Math.log,
            floor = Math.floor,
            ceil = Math.ceil,
            max = Math.max,
            min = Math.min,
            isNaN = window.isNaN,
            Number = window.Number,
            NaN = window.NaN;
        var dateUnitIntervals = ['millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'];
        var isDefined = function(object) {
                return object !== null && object !== undefined
            };
        var isString = function(object) {
                return $.type(object) === 'string'
            };
        var isNumber = function(object) {
                return $.isNumeric(object)
            };
        var isObject = function(object) {
                return $.type(object) === 'object'
            };
        var isArray = function(object) {
                return $.type(object) === 'array'
            };
        var isDate = function(object) {
                return $.type(object) === 'date'
            };
        var isFunction = function(object) {
                return $.type(object) === 'function'
            };
        var toMilliseconds = function(value) {
                switch (value) {
                    case'millisecond':
                        return 1;
                    case'second':
                        return toMilliseconds('millisecond') * 1000;
                    case'minute':
                        return toMilliseconds('second') * 60;
                    case'hour':
                        return toMilliseconds('minute') * 60;
                    case'day':
                        return toMilliseconds('hour') * 24;
                    case'week':
                        return toMilliseconds('day') * 7;
                    case'month':
                        return toMilliseconds('day') * 30;
                    case'quarter':
                        return toMilliseconds('month') * 3;
                    case'year':
                        return toMilliseconds('day') * 365;
                    default:
                        return 0
                }
            };
        var convertDateUnitToMilliseconds = function(dateUnit, count) {
                return toMilliseconds(dateUnit) * count
            };
        var convertMillisecondsToDateUnits = function(value) {
                var i,
                    dateUnitCount,
                    dateUnitInterval,
                    dateUnitIntervals = ['millisecond', 'second', 'minute', 'hour', 'day', 'month', 'year'],
                    result = {};
                for (i = dateUnitIntervals.length - 1; i >= 0; i--) {
                    dateUnitInterval = dateUnitIntervals[i];
                    dateUnitCount = Math.floor(value / toMilliseconds(dateUnitInterval));
                    if (dateUnitCount > 0) {
                        result[dateUnitInterval + 's'] = dateUnitCount;
                        value -= convertDateUnitToMilliseconds(dateUnitInterval, dateUnitCount)
                    }
                }
                return result
            };
        var convertDateTickIntervalToMilliseconds = function(tickInterval) {
                var milliseconds = 0;
                if (isObject(tickInterval))
                    $.each(tickInterval, function(key, value) {
                        milliseconds += convertDateUnitToMilliseconds(key.substr(0, key.length - 1), value)
                    });
                if (isString(tickInterval))
                    milliseconds = convertDateUnitToMilliseconds(tickInterval, 1);
                return milliseconds
            };
        var getPower = function(value) {
                return value.toExponential().split("e")[1]
            };
        var getDatesDifferences = function(date1, date2) {
                var differences,
                    counter = 0;
                differences = {
                    year: date1.getFullYear() !== date2.getFullYear(),
                    month: date1.getMonth() !== date2.getMonth(),
                    day: date1.getDate() !== date2.getDate(),
                    hour: date1.getHours() !== date2.getHours(),
                    minute: date1.getMinutes() !== date2.getMinutes(),
                    second: date1.getSeconds() !== date2.getSeconds()
                };
                $.each(differences, function(key, value) {
                    if (value)
                        counter++
                });
                differences.count = counter;
                return differences
            };
        var sameMonthAndYear = function(date1, date2) {
                return date1 && date2 && date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
            };
        var getFirstMonthDate = function(date) {
                return new Date(date.getFullYear(), date.getMonth(), 1)
            };
        var getFraction = function(value) {
                var valueString,
                    dotIndex;
                if (isNumber(value)) {
                    valueString = value.toString();
                    dotIndex = valueString.indexOf('.');
                    if (dotIndex >= 0)
                        if (isExponential(value))
                            return valueString.substr(dotIndex + 1, valueString.indexOf('e') - dotIndex - 1);
                        else {
                            valueString = value.toFixed(20);
                            return valueString.substr(dotIndex + 1, valueString.length - dotIndex + 1)
                        }
                }
                return ''
            };
        var getSignificantDigitPosition = function(value) {
                var fraction = getFraction(value),
                    i;
                if (fraction)
                    for (i = 0; i < fraction.length; i++)
                        if (fraction.charAt(i) !== '0')
                            return i + 1;
                return 0
            };
        var addSubValues = function(value1, value2, isSub) {
                return value1 + (isSub ? -1 : 1) * value2
            };
        var isExponential = function(value) {
                return isNumber(value) && value.toString().indexOf('e') !== -1
            };
        var addInterval = function(value, interval, isNegative) {
                var result = null,
                    intervalObject;
                if (isDate(value)) {
                    intervalObject = isString(interval) ? getDateIntervalByString(interval.toLowerCase()) : interval;
                    result = new Date(value.getTime());
                    if (intervalObject.years)
                        result.setFullYear(addSubValues(result.getFullYear(), intervalObject.years, isNegative));
                    if (intervalObject.quarters)
                        result.setMonth(addSubValues(result.getMonth(), 3 * intervalObject.quarters, isNegative));
                    if (intervalObject.months)
                        result.setMonth(addSubValues(result.getMonth(), intervalObject.months, isNegative));
                    if (intervalObject.weeks)
                        result.setDate(addSubValues(result.getDate(), 7 * intervalObject.weeks, isNegative));
                    if (intervalObject.days)
                        result.setDate(addSubValues(result.getDate(), intervalObject.days, isNegative));
                    if (intervalObject.hours)
                        result.setHours(addSubValues(result.getHours(), intervalObject.hours, isNegative));
                    if (intervalObject.minutes)
                        result.setMinutes(addSubValues(result.getMinutes(), intervalObject.minutes, isNegative));
                    if (intervalObject.seconds)
                        result.setSeconds(addSubValues(result.getSeconds(), intervalObject.seconds, isNegative));
                    if (intervalObject.milliseconds)
                        result.setMilliseconds(addSubValues(value.getMilliseconds(), intervalObject.milliseconds, isNegative))
                }
                else
                    result = addSubValues(value, interval, isNegative);
                return result
            };
        var getDateUnitInterval = function(tickInterval) {
                var maxInterval = -1,
                    i;
                if (isString(tickInterval))
                    return tickInterval;
                if (isObject(tickInterval)) {
                    $.each(tickInterval, function(key, value) {
                        for (i = 0; i < dateUnitIntervals.length; i++)
                            if (value && (key === dateUnitIntervals[i] + 's' || key === dateUnitIntervals[i]) && maxInterval < i)
                                maxInterval = i
                    });
                    return dateUnitIntervals[maxInterval]
                }
                return ''
            };
        var correctDateWithUnitBeginning = function(date, dateInterval) {
                var dayMonth,
                    firstQuarterMonth,
                    dateUnitInterval = getDateUnitInterval(dateInterval);
                switch (dateUnitInterval) {
                    case'second':
                        date.setMilliseconds(0);
                        break;
                    case'minute':
                        date.setSeconds(0, 0);
                        break;
                    case'hour':
                        date.setMinutes(0, 0, 0);
                        break;
                    case'year':
                        date.setMonth(0);
                    case'month':
                        date.setDate(1);
                    case'day':
                        date.setHours(0, 0, 0, 0);
                        break;
                    case'week':
                        dayMonth = date.getDate();
                        if (date.getDay() !== 0)
                            dayMonth += 7 - date.getDay();
                        date.setDate(dayMonth);
                        date.setHours(0, 0, 0, 0);
                        break;
                    case'quarter':
                        firstQuarterMonth = DX.formatHelper.getFirstQuarterMonth(date.getMonth());
                        if (date.getMonth() !== firstQuarterMonth)
                            date.setMonth(firstQuarterMonth);
                        date.setDate(1);
                        date.setHours(0, 0, 0, 0);
                        break
                }
            };
        var roundValue = function(value, precision) {
                if (precision > 20)
                    precision = 20;
                if (isNumber(value))
                    if (isExponential(value))
                        return Number(value.toExponential(precision));
                    else
                        return Number(value.toFixed(precision))
            };
        var getPrecision = function(value) {
                var stringFraction,
                    stringValue = value.toString(),
                    pointIndex = stringValue.indexOf('.'),
                    startIndex,
                    precision;
                if (isExponential(value)) {
                    precision = getDecimalOrder(value);
                    if (precision < 0)
                        return Math.abs(precision);
                    else
                        return 0
                }
                if (pointIndex !== -1) {
                    startIndex = pointIndex + 1;
                    stringFraction = stringValue.substring(startIndex, startIndex + 20);
                    return stringFraction.length
                }
                return 0
            };
        var applyPrecisionByMinDelta = function(min, delta, value) {
                var minPrecision = getPrecision(min),
                    deltaPrecision = getPrecision(delta);
                return roundValue(value, minPrecision < deltaPrecision ? deltaPrecision : minPrecision)
            };
        var adjustValue = function(value) {
                var fraction = getFraction(value),
                    nextValue,
                    i;
                if (fraction)
                    for (i = 1; i <= fraction.length; i++) {
                        nextValue = roundValue(value, i);
                        if (nextValue !== 0 && fraction[i - 2] && fraction[i - 1] && fraction[i - 2] === fraction[i - 1])
                            return nextValue
                    }
                return value
            };
        var getDateIntervalByString = function(intervalString) {
                var result = {};
                switch (intervalString) {
                    case'year':
                        result.years = 1;
                        break;
                    case'month':
                        result.months = 1;
                        break;
                    case'quarter':
                        result.months = 3;
                        break;
                    case'week':
                        result.days = 7;
                        break;
                    case'day':
                        result.days = 1;
                        break;
                    case'hour':
                        result.hours = 1;
                        break;
                    case'minute':
                        result.minutes = 1;
                        break;
                    case'second':
                        result.seconds = 1;
                        break;
                    case'millisecond':
                        result.milliseconds = 1;
                        break
                }
                return result
            };
        var normalizeAngle = function(angle) {
                return (angle % 360 + 360) % 360
            };
        var convertAngleToRendererSpace = function(angle) {
                return 90 - angle
            };
        var degreesToRadians = function(value) {
                return PI * value / 180
            };
        var getCosAndSin = function(angle) {
                var angleInRadians = degreesToRadians(angle);
                return {
                        cos: cos(angleInRadians),
                        sin: sin(angleInRadians)
                    }
            };
        var DECIMAL_ORDER_THRESHOLD = 1E-14;
        var getDecimalOrder = function(number) {
                var n = abs(number),
                    cn;
                if (!isNaN(n)) {
                    if (n > 0) {
                        n = log(n) / LN10;
                        cn = ceil(n);
                        return cn - n < DECIMAL_ORDER_THRESHOLD ? cn : floor(n)
                    }
                    return 0
                }
                return NaN
            };
        var getAppropriateFormat = function(start, end, count) {
                var order = max(getDecimalOrder(start), getDecimalOrder(end)),
                    precision = -getDecimalOrder(abs(end - start) / count),
                    format;
                if (!isNaN(order) && !isNaN(precision)) {
                    if (abs(order) <= 4) {
                        format = 'fixedPoint';
                        precision < 0 && (precision = 0);
                        precision > 4 && (precision = 4)
                    }
                    else {
                        format = 'exponential';
                        precision += order - 1;
                        precision > 3 && (precision = 3)
                    }
                    return {
                            format: format,
                            precision: precision
                        }
                }
                return null
            };
        var getLabelConnectorCoord = function(labelBox, graphBox, centerLabel, rotated) {
                var floor = Math.floor,
                    x1,
                    x2,
                    y1,
                    y2;
                x1 = floor(labelBox.x + labelBox.width / 2);
                x2 = floor(graphBox.x + graphBox.width / 2);
                if (labelBox.y + labelBox.height < graphBox.y) {
                    y1 = centerLabel || labelBox.y + labelBox.height;
                    y2 = graphBox.y
                }
                else if (labelBox.y > graphBox.y + graphBox.height) {
                    y1 = centerLabel || labelBox.y;
                    y2 = graphBox.y + graphBox.height
                }
                else if (labelBox.x > graphBox.x + graphBox.width || labelBox.x + labelBox.width < graphBox.x)
                    if (labelBox.y - graphBox.y < graphBox.y + graphBox.height - (labelBox.y + labelBox.height)) {
                        y1 = centerLabel || labelBox.y;
                        y2 = graphBox.y
                    }
                    else {
                        y1 = centerLabel || labelBox.y + labelBox.height;
                        y2 = graphBox.y + graphBox.height
                    }
                else
                    return;
                return !rotated ? [x1, y1, x2, y2] : [y1, x1, y2, x2]
            };
        var createResizeHandler = function(callback) {
                var $window = $(window),
                    timeout;
                var debug_callback = arguments[1];
                var handler = function() {
                        var width = $window.width(),
                            height = $window.height();
                        clearTimeout(timeout);
                        timeout = setTimeout(function() {
                            $window.width() === width && $window.height() === height && callback();
                            debug_callback && debug_callback()
                        }, 100)
                    };
                handler.stop = function() {
                    clearTimeout(timeout);
                    return this
                };
                return handler
            };
        var logger = function() {
                var console = window.console;
                function info(text) {
                    if (!console || !$.isFunction(console.info))
                        return;
                    console.info(text)
                }
                function warn(text) {
                    if (!console || !$.isFunction(console.warn))
                        return;
                    console.warn(text)
                }
                function error(text) {
                    if (!console || !$.isFunction(console.error))
                        return;
                    console.error(text)
                }
                return {
                        info: info,
                        warn: warn,
                        error: error
                    }
            }();
        var debug = function() {
                function assert(condition, message) {
                    if (!condition)
                        throw new Error(message);
                }
                function assertParam(parameter, message) {
                    assert(parameter !== null && parameter !== undefined, message)
                }
                return {
                        assert: assert,
                        assertParam: assertParam
                    }
            }();
        var windowResizeCallbacks = function() {
                var prevSize,
                    callbacks = $.Callbacks(),
                    jqWindow = $(window),
                    resizeEventHandlerAttached = false,
                    originalCallbacksAdd = callbacks.add,
                    originalCallbacksRemove = callbacks.remove;
                var formatSize = function() {
                        return [jqWindow.width(), jqWindow.height()].join()
                    };
                var handleResize = function() {
                        var now = formatSize();
                        if (now === prevSize)
                            return;
                        prevSize = now;
                        callbacks.fire()
                    };
                prevSize = formatSize();
                callbacks.add = function() {
                    var result = originalCallbacksAdd.apply(callbacks, arguments);
                    if (!resizeEventHandlerAttached && callbacks.has()) {
                        jqWindow.on("resize", handleResize);
                        resizeEventHandlerAttached = true
                    }
                    return result
                };
                callbacks.remove = function() {
                    var result = originalCallbacksRemove.apply(callbacks, arguments);
                    if (!callbacks.has() && resizeEventHandlerAttached) {
                        jqWindow.off("resize", handleResize);
                        resizeEventHandlerAttached = false
                    }
                    return result
                };
                return callbacks
            }();
        var resetActiveElement = function() {
                var android4nativeBrowser = DX.devices.real.platform === "android" && /^4\.0(\.\d)?/.test(DX.devices.real.version.join(".")) && navigator.userAgent.indexOf("Chrome") === -1;
                var activeElement = document.activeElement;
                if (android4nativeBrowser) {
                    var $specInput = $("<input>").addClass("dx-hidden-input").appendTo("body");
                    setTimeout(function() {
                        $specInput.focus();
                        setTimeout(function() {
                            $specInput.hide();
                            $specInput.remove()
                        }, 100)
                    }, 100)
                }
                if (activeElement && activeElement !== document.body && activeElement.blur)
                    activeElement.blur()
            };
        var createMarkupFromString = function(str) {
                var tempElement = $("<div />");
                if (window.WinJS)
                    WinJS.Utilities.setInnerHTMLUnsafe(tempElement.get(0), str);
                else
                    tempElement.append(str);
                return tempElement.contents()
            };
        var getNextClipId = function() {
                var numClipRect = 1;
                return function() {
                        return 'DevExpress_' + numClipRect++
                    }
            }();
        var getNextPatternId = function() {
                var numPattern = 1;
                return function() {
                        return 'DevExpressPattern_' + numPattern++
                    }
            }();
        var extendFromObject = function(target, source, overrideExistingValues) {
                target = target || {};
                for (var prop in source)
                    if (source.hasOwnProperty(prop)) {
                        var value = source[prop];
                        if (!(prop in target) || overrideExistingValues)
                            target[prop] = value
                    }
                return target
            };
        var clone = function() {
                function Clone(){}
                return function(obj) {
                        Clone.prototype = obj;
                        return new Clone
                    }
            }();
        var executeAsync = function(action, context) {
                var deferred = $.Deferred(),
                    normalizedContext = context || this;
                setTimeout(function() {
                    var result = action.call(normalizedContext);
                    if (result && result.done && $.isFunction(result.done))
                        result.done(function() {
                            deferred.resolveWith(normalizedContext)
                        });
                    else
                        deferred.resolveWith(normalizedContext)
                }, 0);
                return deferred.promise()
            };
        var getLog = function(value, base) {
                return Math.log(value) / Math.log(base)
            };
        var raiseTo = function(power, base) {
                return Math.pow(base, power)
            };
        var stringFormat = function() {
                var s = arguments[0];
                for (var i = 0; i < arguments.length - 1; i++) {
                    var reg = new RegExp("\\{" + i + "\\}", "gm");
                    s = s.replace(reg, arguments[i + 1])
                }
                return s
            };
        var getRootOffset = function(renderer) {
                var node,
                    result = {
                        left: {},
                        top: {}
                    },
                    root = renderer.getRoot();
                if (root) {
                    node = root.element;
                    if (node.getScreenCTM) {
                        var ctm = node.getScreenCTM();
                        if (ctm) {
                            result.left = node.createSVGPoint().matrixTransform(ctm).x + (document.body.scrollLeft || document.documentElement.scrollLeft);
                            result.top = node.createSVGPoint().matrixTransform(ctm).y + (document.body.scrollTop || document.documentElement.scrollTop)
                        }
                        else {
                            result.left = document.body.scrollLeft || document.documentElement.scrollLeft;
                            result.top = document.body.scrollTop || document.documentElement.scrollTop
                        }
                    }
                    else {
                        result.left = $(node).offset().left;
                        result.top = $(node).offset().top
                    }
                }
                return result
            };
        var findBestMatches = function(targetFilter, items, mapFn) {
                var bestMatches = [],
                    maxMatchCount = 0;
                $.each(items, function(index, itemSrc) {
                    var matchCount = 0,
                        item = mapFn ? mapFn(itemSrc) : itemSrc;
                    $.each(item, function(paramName) {
                        var value = targetFilter[paramName];
                        if (value !== item[paramName] && value !== undefined) {
                            matchCount = 0;
                            return false
                        }
                        else
                            matchCount++
                    });
                    if (matchCount === maxMatchCount && matchCount > 0)
                        bestMatches.push(itemSrc);
                    else if (matchCount > maxMatchCount) {
                        bestMatches.length = 0;
                        bestMatches.push(itemSrc);
                        maxMatchCount = matchCount
                    }
                });
                return bestMatches
            };
        var preg_quote = function(str) {
                return (str + "").replace(/([\+\*\?\\\.\[\^\]\$\(\)\{\}\>\<\|\=\!\:])/g, "\\$1")
            };
        var replaceAll = function(text, searchToken, replacementToken) {
                return text.replace(new RegExp("(" + preg_quote(searchToken) + ")", "gi"), replacementToken)
            };
        function icontains(elem, text) {
            return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((text || "").toLowerCase()) > -1
        }
        $.expr[":"].dxicontains = $.expr.createPseudo(function(text) {
            return function(elem) {
                    return icontains(elem, text)
                }
        });
        function deepExtendArraySafe(target, changes) {
            var prevValue,
                newValue;
            for (var name in changes) {
                prevValue = target[name];
                newValue = changes[name];
                if (target === newValue)
                    continue;
                if ($.isPlainObject(newValue))
                    target[name] = deepExtendArraySafe($.isPlainObject(prevValue) ? prevValue : {}, newValue);
                else if (newValue !== undefined)
                    target[name] = newValue
            }
            return target
        }
        DX.utils = {
            dateUnitIntervals: dateUnitIntervals,
            isDefined: isDefined,
            isString: isString,
            isNumber: isNumber,
            isObject: isObject,
            isArray: isArray,
            isDate: isDate,
            isFunction: isFunction,
            getLog: getLog,
            raiseTo: raiseTo,
            normalizeAngle: normalizeAngle,
            convertAngleToRendererSpace: convertAngleToRendererSpace,
            degreesToRadians: degreesToRadians,
            getCosAndSin: getCosAndSin,
            getDecimalOrder: getDecimalOrder,
            getAppropriateFormat: getAppropriateFormat,
            getFraction: getFraction,
            adjustValue: adjustValue,
            convertMillisecondsToDateUnits: convertMillisecondsToDateUnits,
            convertDateTickIntervalToMilliseconds: convertDateTickIntervalToMilliseconds,
            convertDateUnitToMilliseconds: convertDateUnitToMilliseconds,
            getDateUnitInterval: getDateUnitInterval,
            getDatesDifferences: getDatesDifferences,
            correctDateWithUnitBeginning: correctDateWithUnitBeginning,
            roundValue: roundValue,
            isExponential: isExponential,
            applyPrecisionByMinDelta: applyPrecisionByMinDelta,
            getSignificantDigitPosition: getSignificantDigitPosition,
            addInterval: addInterval,
            getDateIntervalByString: getDateIntervalByString,
            sameMonthAndYear: sameMonthAndYear,
            getFirstMonthDate: getFirstMonthDate,
            getPower: getPower,
            logger: logger,
            debug: debug,
            getLabelConnectorCoord: getLabelConnectorCoord,
            createResizeHandler: createResizeHandler,
            windowResizeCallbacks: windowResizeCallbacks,
            resetActiveElement: resetActiveElement,
            createMarkupFromString: createMarkupFromString,
            getNextClipId: getNextClipId,
            getNextPatternId: getNextPatternId,
            extendFromObject: extendFromObject,
            clone: clone,
            executeAsync: executeAsync,
            stringFormat: stringFormat,
            getRootOffset: getRootOffset,
            findBestMatches: findBestMatches,
            replaceAll: replaceAll,
            deepExtendArraySafe: deepExtendArraySafe
        };
        DX.utils.getPrecision = getPrecision
    })(jQuery, DevExpress);
    /*! Module core, file translator.js */
    (function($, DX, undefined) {
        var support = DX.support,
            TRANSLATOR_DATA_KEY = "dxTranslator",
            TRANSFORM_MATRIX_REGEX = /matrix(3d)?\((.+?)\)/,
            TRANSLATE_REGEX = /translate(?:3d)?\((.+?)\)/;
        var locate = function($element) {
                var result,
                    position;
                if (support.transform3d) {
                    var translate = getTranslate($element);
                    result = {
                        left: translate.x,
                        top: translate.y
                    }
                }
                else {
                    position = $element.position();
                    result = {
                        left: position.left,
                        top: position.top
                    }
                }
                return result
            };
        var move = function($element, position) {
                if (!support.transform3d) {
                    $element.css(position);
                    return
                }
                var translate = getTranslate($element),
                    left = position.left,
                    top = position.top;
                if (left !== undefined)
                    translate.x = left || 0;
                if (top !== undefined)
                    translate.y = top || 0;
                $element.css({
                    transform: getTranslateCss(translate),
                    transformOrigin: "0% 0%"
                })
            };
        var getTranslate = function($element) {
                var result = $element.data(TRANSLATOR_DATA_KEY);
                if (!result) {
                    var transformValue = $element.css("transform") || getTranslateCss({
                            x: 0,
                            y: 0
                        }),
                        matrix = transformValue.match(TRANSFORM_MATRIX_REGEX),
                        is3D = matrix && matrix[1];
                    if (matrix) {
                        matrix = matrix[2].split(",");
                        if (is3D === "3d")
                            matrix = matrix.slice(12, 15);
                        else {
                            matrix.push(0);
                            matrix = matrix.slice(4, 7)
                        }
                    }
                    else
                        matrix = [0, 0, 0];
                    result = {
                        x: parseFloat(matrix[0]),
                        y: parseFloat(matrix[1]),
                        z: parseFloat(matrix[2])
                    };
                    cacheTranslate($element, result)
                }
                return result
            };
        var cacheTranslate = function($element, translate) {
                $element.data(TRANSLATOR_DATA_KEY, translate)
            };
        var clearCache = function($element) {
                $element.removeData(TRANSLATOR_DATA_KEY)
            };
        var parseTranslate = function(translateString) {
                var result = translateString.match(TRANSLATE_REGEX);
                if (!result || !result[1])
                    return;
                result = result[1].split(",");
                result = {
                    x: parseFloat(result[0]),
                    y: parseFloat(result[1]),
                    z: parseFloat(result[2])
                };
                return result
            };
        var getTranslateCss = function(translate) {
                return "translate(" + (translate.x || 0) + "px, " + (translate.y || 0) + "px)"
            };
        DX.translator = {
            move: move,
            locate: locate,
            clearCache: clearCache,
            parseTranslate: parseTranslate,
            getTranslate: getTranslate,
            getTranslateCss: getTranslateCss
        }
    })(jQuery, DevExpress);
    /*! Module core, file animationFrame.js */
    (function($, DX, undefined) {
        var FRAME_ANIMATION_STEP_TIME = 1000 / 60,
            requestAnimationFrame = function(callback, element) {
                return this.setTimeout(callback, FRAME_ANIMATION_STEP_TIME)
            },
            cancelAnimationFrame = function(requestID) {
                return this.clearTimeout(requestID)
            },
            nativeRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame,
            nativeCancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
        if (nativeRequestAnimationFrame && nativeCancelAnimationFrame) {
            requestAnimationFrame = nativeRequestAnimationFrame;
            cancelAnimationFrame = nativeCancelAnimationFrame
        }
        if (nativeRequestAnimationFrame && !nativeCancelAnimationFrame) {
            var cancelledRequests = {};
            requestAnimationFrame = function(callback) {
                var requestId = nativeRequestAnimationFrame.call(window, function() {
                        try {
                            if (requestId in cancelledRequests)
                                return;
                            callback.apply(this, arguments)
                        }
                        finally {
                            delete cancelledRequests[requestId]
                        }
                    });
                return requestId
            };
            cancelAnimationFrame = function(requestId) {
                cancelledRequests[requestId] = true
            }
        }
        requestAnimationFrame = $.proxy(requestAnimationFrame, window);
        cancelAnimationFrame = $.proxy(cancelAnimationFrame, window);
        $.extend(DX, {
            requestAnimationFrame: requestAnimationFrame,
            cancelAnimationFrame: cancelAnimationFrame
        })
    })(jQuery, DevExpress);
    /*! Module core, file animator.js */
    (function($, DX, undefined) {
        DX.Animator = DX.Class.inherit({
            ctor: function() {
                this._finished = true;
                this._stopped = false
            },
            start: function() {
                this._stopped = false;
                this._finished = false;
                this._stepCore()
            },
            stop: function() {
                this._stopped = true
            },
            _stepCore: function() {
                if (this._isStopped()) {
                    this._stop();
                    return
                }
                if (this._isFinished()) {
                    this._finished = true;
                    this._complete();
                    return
                }
                this._step();
                DX.requestAnimationFrame.call(window, $.proxy(this._stepCore, this))
            },
            _step: DX.abstract,
            _isFinished: $.noop,
            _stop: $.noop,
            _complete: $.noop,
            _isStopped: function() {
                return this._stopped
            },
            inProgress: function() {
                return !(this._stopped || this._finished)
            }
        })
    })(jQuery, DevExpress);
    /*! Module core, file fx.js */
    (function($, DX, undefined) {
        var translator = DX.translator,
            support = DX.support,
            transitionEndEventName = support.transitionEndEventName + ".dxFX";
        var CSS_TRANSITION_EASING_REGEX = /cubic-bezier\((\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\)/,
            SIMULATED_TRANSITIONEND_TIMEOUT_DATA_KEY = "dxSimulatedTransitionTimeoutKey",
            ANIM_DATA_KEY = "dxAnimData",
            TRANSFORM_PROP = "transform";
        var TransitionAnimationStrategy = {
                animate: function($element, config) {
                    var deferred = $.Deferred(),
                        transitionEndFired = $.Deferred(),
                        simulatedTransitionEndFired = $.Deferred();
                    $element.one(transitionEndEventName, function() {
                        transitionEndFired.reject()
                    });
                    $element.data(SIMULATED_TRANSITIONEND_TIMEOUT_DATA_KEY, setTimeout(function() {
                        simulatedTransitionEndFired.reject()
                    }, config.duration + config.delay));
                    $.when(transitionEndFired, simulatedTransitionEndFired).fail($.proxy(function() {
                        this._cleanup($element);
                        deferred.resolveWith($element, [config, $element])
                    }, this));
                    $element.css("transform");
                    $element.css({
                        transitionProperty: "all",
                        transitionDelay: config.delay + "ms",
                        transitionDuration: config.duration + "ms",
                        transitionTimingFunction: config.easing
                    });
                    setProps($element, config.to);
                    if (!config.duration)
                        $element.trigger(transitionEndEventName);
                    return deferred.promise()
                },
                _cleanup: function($element) {
                    $element.css("transition", "none").off(transitionEndEventName);
                    var simulatedEndEventTimer = $element.data(SIMULATED_TRANSITIONEND_TIMEOUT_DATA_KEY);
                    clearTimeout(simulatedEndEventTimer);
                    $element.removeData(SIMULATED_TRANSITIONEND_TIMEOUT_DATA_KEY)
                },
                stop: function($element, jumpToEnd) {
                    var config = $element.data(ANIM_DATA_KEY);
                    if (!config)
                        return;
                    if (jumpToEnd)
                        $element.trigger(transitionEndEventName);
                    else {
                        $.each(config.to, function(key) {
                            $element.css(key, $element.css(key))
                        });
                        this._cleanup($element)
                    }
                }
            };
        var FrameAnimationStrategy = {
                animate: function($element, config) {
                    var deferred = $.Deferred(),
                        animationData = $element.data(ANIM_DATA_KEY),
                        self = this;
                    if (!animationData)
                        return deferred.reject().promise();
                    $.each(config.to, function(prop) {
                        if (config.from[prop] === undefined)
                            config.from[prop] = self._normalizeValue($element.css(prop))
                    });
                    if (config.to[TRANSFORM_PROP]) {
                        config.from[TRANSFORM_PROP] = self._parseTransform(config.from[TRANSFORM_PROP]);
                        config.to[TRANSFORM_PROP] = self._parseTransform(config.to[TRANSFORM_PROP])
                    }
                    animationData.frameAnimation = {
                        to: config.to,
                        from: config.from,
                        currentValue: config.from,
                        easing: convertTransitionTimingFuncToJQueryEasing(config.easing),
                        duration: config.duration,
                        startTime: (new Date).valueOf(),
                        finish: function() {
                            this.currentValue = this.to;
                            this.draw();
                            deferred.resolve()
                        },
                        draw: function() {
                            var currentValue = $.extend({}, this.currentValue);
                            if (currentValue[TRANSFORM_PROP])
                                currentValue[TRANSFORM_PROP] = $.map(currentValue[TRANSFORM_PROP], function(value, prop) {
                                    if (prop === "translate")
                                        return translator.getTranslateCss(value);
                                    else if (prop === "scale")
                                        return "scale(" + value + ")";
                                    else if (prop.substr(0, prop.length - 1) === "rotate")
                                        return prop + "(" + value + "deg)"
                                }).join(" ");
                            $element.css(currentValue)
                        }
                    };
                    if (config.delay) {
                        animationData.frameAnimation.startTime += config.delay;
                        animationData.frameAnimation.delayTimeout = setTimeout(function() {
                            self._animationStep($element)
                        }, config.delay)
                    }
                    else
                        self._animationStep($element);
                    return deferred.promise()
                },
                _parseTransform: function(transformString) {
                    var result = {};
                    $.each(transformString.match(/(\w|\d)+\([^\)]*\)\s*/g), function(i, part) {
                        var translateData = translator.parseTranslate(part),
                            scaleData = part.match(/scale\((.+?)\)/),
                            rotateData = part.match(/(rotate.)\((.+)deg\)/);
                        if (translateData)
                            result.translate = translateData;
                        if (scaleData && scaleData[1])
                            result.scale = parseFloat(scaleData[1]);
                        if (rotateData && rotateData[1])
                            result[rotateData[1]] = parseFloat(rotateData[2])
                    });
                    return result
                },
                stop: function($element, jumpToEnd) {
                    var animationData = $element.data(ANIM_DATA_KEY),
                        frameAnimation = animationData && animationData.frameAnimation;
                    if (!frameAnimation)
                        return;
                    clearTimeout(frameAnimation.delayTimeout);
                    if (jumpToEnd)
                        frameAnimation.finish()
                },
                _animationStep: function($element) {
                    var animationData = $element.data(ANIM_DATA_KEY),
                        frameAnimation = animationData && animationData.frameAnimation;
                    if (!frameAnimation)
                        return;
                    var now = (new Date).valueOf();
                    if (now >= frameAnimation.startTime + frameAnimation.duration) {
                        frameAnimation.finish();
                        return
                    }
                    frameAnimation.currentValue = this._calcStepValue(frameAnimation, now - frameAnimation.startTime);
                    frameAnimation.draw();
                    DX.requestAnimationFrame($.proxy(function() {
                        this._animationStep($element)
                    }, this))
                },
                _calcStepValue: function(frameAnimation, currentDuration) {
                    var calcValueRecursively = function(from, to) {
                            var result = $.isArray(to) ? [] : {};
                            var calcEasedValue = function(propName) {
                                    var x = currentDuration / frameAnimation.duration,
                                        t = currentDuration,
                                        b = 1 * from[propName],
                                        c = to[propName] - from[propName],
                                        d = frameAnimation.duration;
                                    return $.easing[frameAnimation.easing](x, t, b, c, d)
                                };
                            $.each(to, function(propName, endPropValue) {
                                if (typeof endPropValue === "string" && parseFloat(endPropValue, 10) === false)
                                    return true;
                                result[propName] = typeof endPropValue === "object" ? calcValueRecursively(from[propName], endPropValue) : calcEasedValue(propName)
                            });
                            return result
                        };
                    return calcValueRecursively(frameAnimation.from, frameAnimation.to)
                },
                _normalizeValue: function(value) {
                    var numericValue = parseFloat(value, 10);
                    if (numericValue === false)
                        return value;
                    return numericValue
                }
            };
        var animationStrategies = {
                transition: support.transition ? TransitionAnimationStrategy : FrameAnimationStrategy,
                frame: FrameAnimationStrategy
            };
        var getAnimationStrategy = function(config) {
                return animationStrategies[config && config.strategy || "transition"]
            };
        var TransitionTimingFuncMap = {
                linear: "cubic-bezier(0, 0, 1, 1)",
                ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
                "ease-out": "cubic-bezier(0, 0, 0.58, 1)",
                "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)"
            };
        var convertTransitionTimingFuncToJQueryEasing = function(cssTransitionEasing) {
                cssTransitionEasing = TransitionTimingFuncMap[cssTransitionEasing] || cssTransitionEasing;
                var bezCoeffs = cssTransitionEasing.match(CSS_TRANSITION_EASING_REGEX);
                if (!bezCoeffs)
                    return "linear";
                bezCoeffs = bezCoeffs.slice(1, 5);
                $.each(bezCoeffs, function(index, value) {
                    bezCoeffs[index] = parseFloat(value)
                });
                var easingName = "cubicbezier_" + bezCoeffs.join("_").replace(/\./g, "p");
                if (!$.isFunction($.easing[easingName])) {
                    var polynomBezier = function(x1, y1, x2, y2) {
                            var Cx = 3 * x1,
                                Bx = 3 * (x2 - x1) - Cx,
                                Ax = 1 - Cx - Bx,
                                Cy = 3 * y1,
                                By = 3 * (y2 - y1) - Cy,
                                Ay = 1 - Cy - By;
                            var bezierX = function(t) {
                                    return t * (Cx + t * (Bx + t * Ax))
                                };
                            var bezierY = function(t) {
                                    return t * (Cy + t * (By + t * Ay))
                                };
                            var findXfor = function(t) {
                                    var x = t,
                                        i = 0,
                                        z;
                                    while (i < 14) {
                                        z = bezierX(x) - t;
                                        if (Math.abs(z) < 1e-3)
                                            break;
                                        x = x - z / derivativeX(x);
                                        i++
                                    }
                                    return x
                                };
                            var derivativeX = function(t) {
                                    return Cx + t * (2 * Bx + t * 3 * Ax)
                                };
                            return function(t) {
                                    return bezierY(findXfor(t))
                                }
                        };
                    $.easing[easingName] = function(x, t, b, c, d) {
                        return c * polynomBezier(bezCoeffs[0], bezCoeffs[1], bezCoeffs[2], bezCoeffs[3])(t / d) + b
                    }
                }
                return easingName
            };
        var baseConfigValidator = function(config, animationType) {
                $.each(["from", "to"], function() {
                    if (!$.isPlainObject(config[this]))
                        throw Error("Animation with the '" + animationType + "' type requires '" + this + "' configuration as an plain object.");
                })
            };
        var CustomAnimationConfigurator = {setup: function($element, config){}};
        var SlideAnimationConfigurator = {
                validateConfig: function(config) {
                    baseConfigValidator(config, "slide")
                },
                setup: function($element, config) {
                    if (!support.transform3d)
                        return;
                    this._resetLocation($element);
                    this._locationToTranslate($element, config.from);
                    this._locationToTranslate($element, config.to)
                },
                _resetLocation: function($element) {
                    $element.css({
                        top: 0,
                        left: 0
                    })
                },
                _locationToTranslate: function($element, config) {
                    translator.clearCache($element);
                    var translate = translator.getTranslate($element),
                        left = config.left,
                        top = config.top;
                    if (left !== undefined) {
                        translate.x = left;
                        delete config.left
                    }
                    if (top !== undefined) {
                        translate.y = top;
                        delete config.top
                    }
                    config[TRANSFORM_PROP] = translator.getTranslateCss(translate)
                }
            };
        var FadeAnimationConfigurator = {setup: function($element, config) {
                    var from = config.from,
                        fromOpacity = $.isPlainObject(from) ? $element.css("opacity") : String(from),
                        toOpacity = String(config.to);
                    config.from = {opacity: fromOpacity};
                    config.to = {opacity: toOpacity}
                }};
        var PopAnimationConfigurator = {
                validateConfig: function(config) {
                    baseConfigValidator(config, "pop")
                },
                setup: function($element, config) {
                    var from = config.from,
                        to = config.to,
                        fromOpacity = "opacity" in from ? from.opacity : $element.css("opacity"),
                        toOpacity = "opacity" in to ? to.opacity : 1,
                        fromScale = "scale" in from ? from.scale : 0,
                        toScale = "scale" in to ? to.scale : 1;
                    config.from = {opacity: fromOpacity};
                    config.from[TRANSFORM_PROP] = this._getCssTransform(fromScale);
                    config.to = {opacity: toOpacity};
                    config.to[TRANSFORM_PROP] = this._getCssTransform(toScale)
                },
                _getCssTransform: function(scale) {
                    return "scale(" + scale + ")"
                }
            };
        var animationConfigurators = {
                custom: CustomAnimationConfigurator,
                slide: SlideAnimationConfigurator,
                fade: FadeAnimationConfigurator,
                pop: PopAnimationConfigurator
            };
        var getAnimationConfigurator = function(type) {
                var result = animationConfigurators[type];
                if (!result)
                    throw Error("Unknown animation type \"" + type + "\"");
                return result
            };
        var defaultConfig = {
                type: "custom",
                from: {},
                to: {},
                duration: 400,
                complete: $.noop,
                easing: "ease",
                delay: 0
            };
        var animate = function(element, config) {
                config = $.extend(true, {}, defaultConfig, config);
                var $element = $(element),
                    configurator = getAnimationConfigurator(config.type);
                if (!$element.length)
                    return $.Deferred().resolve().promise();
                setupPosition($element, config.from);
                setupPosition($element, config.to);
                if ($.isFunction(configurator.validateConfig))
                    configurator.validateConfig(config);
                configurator.setup($element, config);
                stop($element);
                setProps($element, config.from);
                return executeAnimation($element, config).done(config.complete)
            };
        var setupPosition = function($element, config) {
                if (!config.position)
                    return;
                var position = DX.calculatePosition($element, config.position);
                $.extend(config, {
                    left: position.h.location,
                    top: position.v.location
                });
                delete config.position
            };
        var setProps = function($element, props) {
                $.each(props, function(key, value) {
                    $element.css(key, value)
                })
            };
        var executeAnimation = function($element, config) {
                var deferred = $.Deferred();
                $element.data(ANIM_DATA_KEY, config);
                if (DX.fx.off)
                    config.duration = 0;
                getAnimationStrategy(config).animate($element, config).done(function() {
                    $element.removeData(ANIM_DATA_KEY);
                    deferred.resolveWith(this, [$element, config])
                });
                return deferred.promise()
            };
        var animating = function($element) {
                return !!$element.data(ANIM_DATA_KEY)
            };
        var stop = function(element, jumpToEnd) {
                var $element = $(element);
                getAnimationStrategy($element.data(ANIM_DATA_KEY)).stop($element, jumpToEnd);
                $element.removeData(ANIM_DATA_KEY)
            };
        DX.fx = {
            off: false,
            animationTypes: animationConfigurators,
            animate: animate,
            animating: animating,
            stop: stop
        };
        DX.fx.__internals = {convertTransitionTimingFuncToJQueryEasing: convertTransitionTimingFuncToJQueryEasing}
    })(jQuery, DevExpress);
    /*! Module core, file endpointSelector.js */
    (function($, DX, undefined) {
        var location = window.location,
            DXPROXY_HOST = "dxproxy.devexpress.com:8000",
            WIN_JS = location.protocol === "ms-appx:",
            IS_DXPROXY = location.host === DXPROXY_HOST,
            IS_LOCAL = isLocalHostName(location.hostname);
        function isLocalHostName(url) {
            return /^(localhost$|127\.)/i.test(url)
        }
        var extractProxyAppId = function() {
                return location.pathname.split("/")[1]
            };
        var formatProxyUrl = function(localUrl) {
                var urlData = DX.parseUrl(localUrl);
                if (!isLocalHostName(urlData.hostname))
                    return localUrl;
                return "http://" + DXPROXY_HOST + "/" + extractProxyAppId() + "_" + urlData.port + urlData.pathname + urlData.search
            };
        var EndpointSelector = DX.EndpointSelector = function(config) {
                this.config = config
            };
        EndpointSelector.prototype = {urlFor: function(key) {
                var bag = this.config[key];
                if (!bag)
                    throw Error("Unknown endpoint key");
                if (IS_DXPROXY)
                    return formatProxyUrl(bag.local);
                if (bag.production)
                    if (WIN_JS && !Debug.debuggerEnabled || !WIN_JS && !IS_LOCAL)
                        return bag.production;
                return bag.local
            }}
    })(jQuery, DevExpress);
    /*! Module core, file formatHelper.js */
    (function($, DX, undefined) {
        var utils = DX.utils;
        DX.NumericFormat = {
            currency: 'C',
            fixedpoint: 'N',
            exponential: '',
            percent: 'P',
            decimal: 'D'
        };
        DX.LargeNumberFormatPostfixes = {
            1: 'K',
            2: 'M',
            3: 'B',
            4: 'T'
        };
        var MAX_LARGE_NUMBER_POWER = 4,
            DECIMAL_BASE = 10;
        DX.LargeNumberFormatPowers = {
            largenumber: 'auto',
            thousands: 1,
            millions: 2,
            billions: 3,
            trillions: 4
        };
        DX.DateTimeFormat = {
            longdate: 'D',
            longtime: 'T',
            monthandday: 'M',
            monthandyear: 'Y',
            quarterandyear: 'qq',
            shortdate: 'd',
            shorttime: 't',
            millisecond: 'fff',
            second: 'T',
            minute: 't',
            hour: 't',
            day: 'dd',
            week: 'dd',
            month: 'MMMM',
            quarter: 'qq',
            year: 'yyyy',
            longdatelongtime: 'D',
            shortdateshorttime: 'd'
        };
        DX.formatHelper = {
            romanDigits: ['I', 'II', 'III', 'IV'],
            _addFormatSeparator: function(format1, format2) {
                var separator = ' ';
                if (format2)
                    return format1 + separator + format2;
                return format1
            },
            _getDateTimeFormatPattern: function(dateTimeFormat) {
                return Globalize.findClosestCulture().calendar.patterns[DX.DateTimeFormat[dateTimeFormat.toLowerCase()]]
            },
            _isDateFormatContains: function(format) {
                var result = false;
                $.each(DX.DateTimeFormat, function(key, value) {
                    result = key === format.toLowerCase();
                    return !result
                });
                return result
            },
            getQuarter: function(month) {
                return Math.floor(month / 3)
            },
            getQuarterString: function(date, format) {
                var resultQuarter = '',
                    quarter = this.getQuarter(date.getMonth());
                switch (format) {
                    case'q':
                        resultQuarter = this.romanDigits[quarter];
                        break;
                    case'qq':
                        resultQuarter = 'Q' + this.romanDigits[quarter];
                        break;
                    case'Q':
                        resultQuarter = (quarter + 1).toString();
                        break;
                    case'QQ':
                        resultQuarter = 'Q' + (quarter + 1).toString();
                        break
                }
                return resultQuarter
            },
            getFirstQuarterMonth: function(month) {
                return this.getQuarter(month) * 3
            },
            _formatCustomString: function(value, format) {
                var regExp = /qq|q|QQ|Q/g,
                    quarterFormat,
                    result = '',
                    index = 0;
                regExp.lastIndex = 0;
                while (index < format.length) {
                    quarterFormat = regExp.exec(format);
                    if (!quarterFormat || quarterFormat.index > index)
                        result += Globalize.format(value, format.substring(index, quarterFormat ? quarterFormat.index : format.length));
                    if (quarterFormat) {
                        result += this.getQuarterString(value, quarterFormat[0]);
                        index = quarterFormat.index + quarterFormat[0].length
                    }
                    else
                        index = format.length
                }
                return result
            },
            _parseNumberFormatString: function(format) {
                var formatList,
                    formatObject = {};
                if (!format || typeof format !== 'string')
                    return;
                formatList = format.toLowerCase().split(' ');
                $.each(formatList, function(index, value) {
                    if (value in DX.NumericFormat)
                        formatObject.formatType = value;
                    else if (value in DX.LargeNumberFormatPowers)
                        formatObject.power = DX.LargeNumberFormatPowers[value]
                });
                if (formatObject.power && !formatObject.formatType)
                    formatObject.formatType = 'fixedpoint';
                if (formatObject.formatType)
                    return formatObject
            },
            _calculateNumberPower: function(value, base, minPower, maxPower) {
                var number = Math.abs(value);
                var power = 0;
                if (number > 1)
                    while (number && number >= base && (maxPower === undefined || power < maxPower)) {
                        power++;
                        number = number / base
                    }
                else if (number > 0 && number < 1)
                    while (number < 1 && (minPower === undefined || power > minPower)) {
                        power--;
                        number = number * base
                    }
                return power
            },
            _getNumberByPower: function(number, power, base) {
                var result = number;
                while (power > 0) {
                    result = result / base;
                    power--
                }
                while (power < 0) {
                    result = result * base;
                    power++
                }
                return result
            },
            _formatNumber: function(value, formatObject, precision) {
                var powerPostfix;
                if (formatObject.power === 'auto')
                    formatObject.power = this._calculateNumberPower(value, 1000, 0, MAX_LARGE_NUMBER_POWER);
                if (formatObject.power)
                    value = this._getNumberByPower(value, formatObject.power, 1000);
                powerPostfix = DX.LargeNumberFormatPostfixes[formatObject.power] || '';
                return this._formatNumberCore(value, formatObject.formatType, precision) + powerPostfix
            },
            _formatNumberExponential: function(value, precision) {
                var power = this._calculateNumberPower(value, DECIMAL_BASE),
                    number = this._getNumberByPower(value, power, DECIMAL_BASE),
                    powString;
                precision = precision === undefined ? 1 : precision;
                if (number.toFixed(precision || 0) >= DECIMAL_BASE) {
                    power++;
                    number = number / DECIMAL_BASE
                }
                powString = (power >= 0 ? '+' : '') + power.toString();
                return this._formatNumberCore(number, 'fixedpoint', precision) + 'E' + powString
            },
            _formatNumberCore: function(value, format, precision) {
                if (format === 'exponential')
                    return this._formatNumberExponential(value, precision);
                else
                    return Globalize.format(value, DX.NumericFormat[format] + (utils.isNumber(precision) ? precision : 0))
            },
            _formatDate: function(date, format, formatString) {
                var resultFormat = DX.DateTimeFormat[format.toLowerCase()];
                format = format.toLowerCase();
                if (format === 'quarterandyear')
                    resultFormat = this.getQuarterString(date, resultFormat) + ' yyyy';
                if (format === 'quarter')
                    return this.getQuarterString(date, resultFormat);
                if (format === 'longdatelongtime')
                    return this._formatDate(date, 'longdate') + ' ' + this._formatDate(date, 'longtime');
                if (format === 'shortdateshorttime')
                    return this._formatDate(date, 'shortDate') + ' ' + this._formatDate(date, 'shortTime');
                return Globalize.format(date, resultFormat)
            },
            format: function(value, format, precision) {
                if (format && format.format)
                    if (format.dateType)
                        return this._formatDateEx(value, format);
                    else if (utils.isNumber(value) && isFinite(value))
                        return this._formatNumberEx(value, format);
                return this._format(value, format, precision)
            },
            _format: function(value, format, precision) {
                var numberFormatObject;
                if (!utils.isString(format) || format === '' || !utils.isNumber(value) && !utils.isDate(value))
                    return utils.isDefined(value) ? value.toString() : '';
                numberFormatObject = this._parseNumberFormatString(format);
                if (utils.isNumber(value) && numberFormatObject)
                    return this._formatNumber(value, numberFormatObject, precision);
                if (utils.isDate(value) && this._isDateFormatContains(format))
                    return this._formatDate(value, format);
                if (!numberFormatObject && !this._isDateFormatContains(format))
                    return this._formatCustomString(value, format)
            },
            _formatNumberEx: function(value, formatInfo) {
                var self = this,
                    numericFormatType = DX.NumericFormat[formatInfo.format.toLowerCase()],
                    numberFormat = Globalize.culture().numberFormat,
                    currencyFormat = formatInfo.currencyCulture && Globalize.cultures[formatInfo.currencyCulture] ? Globalize.cultures[formatInfo.currencyCulture].numberFormat.currency : numberFormat.currency,
                    percentFormat = numberFormat.percent,
                    formatSettings = self._getUnitFormatSettings(value, formatInfo),
                    unit = formatSettings.unit,
                    precision = formatSettings.precision,
                    showTrailingZeros = formatSettings.showTrailingZeros,
                    includeGroupSeparator = formatSettings.includeGroupSeparator,
                    groupSymbol = numberFormat[","],
                    floatingSymbol = numberFormat["."],
                    number,
                    isNegative,
                    pattern,
                    currentFormat,
                    regexParts = /n|\$|-|%/g,
                    result = "";
                value = self._applyUnitToValue(value, unit);
                number = Math.abs(value);
                isNegative = value < 0;
                switch (numericFormatType) {
                    case"D":
                        pattern = "n";
                        number = Math[isNegative ? "ceil" : "floor"](number);
                        if (precision > 0) {
                            var str = "" + number;
                            for (var i = str.length; i < precision; i += 1)
                                str = "0" + str;
                            number = str
                        }
                        if (isNegative)
                            number = "-" + number;
                        break;
                    case"N":
                        currentFormat = numberFormat;
                    case"C":
                        currentFormat = currentFormat || currencyFormat;
                    case"P":
                        currentFormat = currentFormat || percentFormat;
                        pattern = isNegative ? currentFormat.pattern[0] : currentFormat.pattern[1] || "n";
                        number = Globalize.format(number * (numericFormatType === "P" ? 100 : 1), "N" + precision);
                        if (!showTrailingZeros)
                            number = self._excludeTrailingZeros(number, floatingSymbol);
                        if (!includeGroupSeparator)
                            number = number.replace(new RegExp('\\' + groupSymbol, 'g'), '');
                        break;
                    default:
                        throw"Illegal numeric format: '" + numericFormatType + "'";
                }
                for (; ; ) {
                    var lastIndex = regexParts.lastIndex,
                        matches = regexParts.exec(pattern);
                    result += pattern.slice(lastIndex, matches ? matches.index : pattern.length);
                    if (matches)
                        switch (matches[0]) {
                            case"-":
                                if (/[1-9]/.test(number))
                                    result += numberFormat["-"];
                                break;
                            case"$":
                                result += currencyFormat.symbol;
                                break;
                            case"%":
                                result += percentFormat.symbol;
                                break;
                            case"n":
                                result += number + unit;
                                break
                        }
                    else
                        break
                }
                return (formatInfo.plus && value > 0 ? "+" : '') + result
            },
            _excludeTrailingZeros: function(strValue, floatingSymbol) {
                var floatingIndex = strValue.indexOf(floatingSymbol),
                    stopIndex,
                    i;
                if (floatingIndex < 0)
                    return strValue;
                stopIndex = strValue.length;
                for (i = stopIndex - 1; i >= floatingIndex && (strValue[i] === '0' || i === floatingIndex); i--)
                    stopIndex--;
                return strValue.substring(0, stopIndex)
            },
            _getUnitFormatSettings: function(value, formatInfo) {
                var unit = formatInfo.unit || '',
                    precision = formatInfo.precision || 0,
                    includeGroupSeparator = formatInfo.includeGroupSeparator || false,
                    showTrailingZeros = formatInfo.showTrailingZeros === undefined ? true : formatInfo.showTrailingZeros,
                    significantDigits = formatInfo.significantDigits || 1,
                    absValue;
                if (unit.toLowerCase() === 'auto') {
                    showTrailingZeros = false;
                    absValue = Math.abs(value);
                    if (significantDigits < 1)
                        significantDigits = 1;
                    if (absValue >= 1000000000) {
                        unit = 'B';
                        absValue /= 1000000000
                    }
                    else if (absValue >= 1000000) {
                        unit = 'M';
                        absValue /= 1000000
                    }
                    else if (absValue >= 1000) {
                        unit = 'K';
                        absValue /= 1000
                    }
                    else
                        unit = '';
                    if (absValue == 0)
                        precision = 0;
                    else if (absValue < 1) {
                        precision = significantDigits;
                        var smallValue = Math.pow(10, -significantDigits);
                        while (absValue < smallValue) {
                            smallValue /= 10;
                            precision++
                        }
                    }
                    else if (absValue >= 100)
                        precision = significantDigits - 3;
                    else if (absValue >= 10)
                        precision = significantDigits - 2;
                    else
                        precision = significantDigits - 1
                }
                if (precision < 0)
                    precision = 0;
                return {
                        unit: unit,
                        precision: precision,
                        showTrailingZeros: showTrailingZeros,
                        includeGroupSeparator: includeGroupSeparator
                    }
            },
            _applyUnitToValue: function(value, unit) {
                if (unit == 'B')
                    return value.toFixed(1) / 1000000000;
                if (unit == 'M')
                    return value / 1000000;
                if (unit == 'K')
                    return value / 1000;
                return value
            },
            _formatDateEx: function(value, formatInfo) {
                var self = this,
                    quarterPrefix = 'Q',
                    format = formatInfo.format,
                    dateType = formatInfo.dateType,
                    calendar = Globalize.culture().calendars.standard,
                    time = undefined,
                    index,
                    dateStr;
                format = format.toLowerCase();
                if (dateType !== 'num' || format === 'dayofweek')
                    switch (format) {
                        case'monthyear':
                            return self._formatDate(value, 'monthandyear');
                        case'quarteryear':
                            return self.getQuarterString(value, 'QQ') + ' ' + value.getFullYear();
                        case'daymonthyear':
                            return self._formatDate(value, dateType + 'Date');
                        case'datehour':
                            time = new Date(value.getTime());
                            time.setMinutes(0);
                            dateStr = dateType === 'timeOnly' ? '' : self._formatDate(value, dateType + 'Date');
                            return dateType === 'timeOnly' ? self._formatDate(time, 'shorttime') : dateStr + ' ' + self._formatDate(time, 'shorttime');
                        case'datehourminute':
                            dateStr = dateType === 'timeOnly' ? '' : self._formatDate(value, dateType + 'Date');
                            return dateType === 'timeOnly' ? self._formatDate(value, 'shorttime') : dateStr + ' ' + self._formatDate(value, 'shorttime');
                        case'datehourminutesecond':
                            dateStr = dateType === 'timeOnly' ? '' : self._formatDate(value, dateType + 'Date');
                            return dateType === 'timeOnly' ? self._formatDate(value, 'longtime') : dateStr + ' ' + self._formatDate(value, 'longtime');
                        case'year':
                            dateStr = value.toString();
                            return dateType === 'abbr' ? dateStr.slice(2, 4) : dateStr;
                        case'quarter':
                            return quarterPrefix + value.toString();
                        case'month':
                            index = value - 1;
                            return dateType === 'abbr' ? calendar.months.namesAbbr[index] : calendar.months.names[index];
                        case'hour':
                            if (dateType === 'long') {
                                time = new Date;
                                time.setHours(value);
                                time.setMinutes(0);
                                return self._formatDate(time, 'shorttime')
                            }
                            else
                                return value.toString();
                        case'dayofweek':
                            index = $.inArray(value, ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
                            if (dateType !== 'num')
                                return dateType === 'abbr' ? calendar.days.namesAbbr[index] : calendar.days.names[index];
                            else
                                return ((index - calendar.firstDay + 1 + 7) % 8).toString();
                        default:
                            return value.toString()
                    }
                else
                    return value.toString()
            },
            getTimeFormat: function(showSecond) {
                if (showSecond)
                    return this._getDateTimeFormatPattern('longtime');
                return this._getDateTimeFormatPattern('shorttime')
            },
            getDateFormatByDifferences: function(dateDifferences) {
                var resultFormat = '';
                if (dateDifferences.millisecond)
                    resultFormat = DX.DateTimeFormat.millisecond;
                if (dateDifferences.hour || dateDifferences.minute || dateDifferences.second)
                    resultFormat = this._addFormatSeparator(this.getTimeFormat(dateDifferences.second), resultFormat);
                if (dateDifferences.year && dateDifferences.month && dateDifferences.day)
                    return this._addFormatSeparator(this._getDateTimeFormatPattern('shortdate'), resultFormat);
                if (dateDifferences.year && dateDifferences.month)
                    return DX.DateTimeFormat['monthandyear'];
                if (dateDifferences.year)
                    return DX.DateTimeFormat['year'];
                if (dateDifferences.month && dateDifferences.day)
                    return this._addFormatSeparator(this._getDateTimeFormatPattern('monthandday'), resultFormat);
                if (dateDifferences.month)
                    return DX.DateTimeFormat['month'];
                if (dateDifferences.day)
                    return this._addFormatSeparator('dddd, dd', resultFormat);
                return resultFormat
            },
            getDateFormatByTicks: function(ticks) {
                var resultFormat,
                    maxDif,
                    currentDif,
                    i,
                    dateUnitInterval;
                if (ticks.length > 1) {
                    maxDif = utils.getDatesDifferences(ticks[0], ticks[1]);
                    for (i = 1; i < ticks.length - 1; i++) {
                        currentDif = utils.getDatesDifferences(ticks[i], ticks[i + 1]);
                        if (maxDif.count < currentDif.count)
                            maxDif = currentDif
                    }
                }
                else
                    maxDif = {
                        year: true,
                        month: true,
                        day: true,
                        hour: ticks[0].getHours() > 0,
                        minute: ticks[0].getMinutes() > 0,
                        second: ticks[0].getSeconds() > 0
                    };
                resultFormat = this.getDateFormatByDifferences(maxDif);
                return resultFormat
            },
            getDateFormatByTickInterval: function(startValue, endValue, tickInterval) {
                var resultFormat,
                    dateDifferences,
                    dateUnitInterval,
                    dateDifferencesConverter = {
                        quarter: 'month',
                        week: 'day'
                    },
                    correctDateDifferences = function(dateDifferences, tickInterval, value) {
                        switch (tickInterval) {
                            case'year':
                                dateDifferences.month = value;
                            case'quarter':
                            case'month':
                                dateDifferences.day = value;
                            case'week':
                            case'day':
                                dateDifferences.hour = value;
                            case'hour':
                                dateDifferences.minute = value;
                            case'minute':
                                dateDifferences.second = value;
                            case'second':
                                dateDifferences.millisecond = value
                        }
                    },
                    correctDifferencesByMaxDate = function(differences, minDate, maxDate) {
                        if (!maxDate.getMilliseconds() && maxDate.getSeconds()) {
                            if (maxDate.getSeconds() - minDate.getSeconds() === 1) {
                                differences.millisecond = true;
                                differences.second = false
                            }
                        }
                        else if (!maxDate.getSeconds() && maxDate.getMinutes()) {
                            if (maxDate.getMinutes() - minDate.getMinutes() === 1) {
                                differences.second = true;
                                differences.minute = false
                            }
                        }
                        else if (!maxDate.getMinutes() && maxDate.getHours()) {
                            if (maxDate.getHours() - minDate.getHours() === 1) {
                                differences.minute = true;
                                differences.hour = false
                            }
                        }
                        else if (!maxDate.getHours() && maxDate.getDate() > 1) {
                            if (maxDate.getDate() - minDate.getDate() === 1) {
                                differences.hour = true;
                                differences.day = false
                            }
                        }
                        else if (maxDate.getDate() === 1 && maxDate.getMonth()) {
                            if (maxDate.getMonth() - minDate.getMonth() === 1) {
                                differences.day = true;
                                differences.month = false
                            }
                        }
                        else if (!maxDate.getMonth() && maxDate.getFullYear())
                            if (maxDate.getFullYear() - minDate.getFullYear() === 1) {
                                differences.month = true;
                                differences.year = false
                            }
                    };
                tickInterval = utils.isString(tickInterval) ? tickInterval.toLowerCase() : tickInterval;
                dateDifferences = utils.getDatesDifferences(startValue, endValue);
                if (startValue !== endValue)
                    correctDifferencesByMaxDate(dateDifferences, startValue > endValue ? endValue : startValue, startValue > endValue ? startValue : endValue);
                dateUnitInterval = utils.getDateUnitInterval(dateDifferences);
                correctDateDifferences(dateDifferences, dateUnitInterval, true);
                dateUnitInterval = utils.getDateUnitInterval(tickInterval || 'second');
                correctDateDifferences(dateDifferences, dateUnitInterval, false);
                dateDifferences[dateDifferencesConverter[dateUnitInterval] || dateUnitInterval] = true;
                resultFormat = this.getDateFormatByDifferences(dateDifferences);
                return resultFormat
            }
        }
    })(jQuery, DevExpress);
    /*! Module core, file color.js */
    (function(DX, undefined) {
        var standardColorNames = {
                aliceblue: 'f0f8ff',
                antiquewhite: 'faebd7',
                aqua: '00ffff',
                aquamarine: '7fffd4',
                azure: 'f0ffff',
                beige: 'f5f5dc',
                bisque: 'ffe4c4',
                black: '000000',
                blanchedalmond: 'ffebcd',
                blue: '0000ff',
                blueviolet: '8a2be2',
                brown: 'a52a2a',
                burlywood: 'deb887',
                cadetblue: '5f9ea0',
                chartreuse: '7fff00',
                chocolate: 'd2691e',
                coral: 'ff7f50',
                cornflowerblue: '6495ed',
                cornsilk: 'fff8dc',
                crimson: 'dc143c',
                cyan: '00ffff',
                darkblue: '00008b',
                darkcyan: '008b8b',
                darkgoldenrod: 'b8860b',
                darkgray: 'a9a9a9',
                darkgreen: '006400',
                darkkhaki: 'bdb76b',
                darkmagenta: '8b008b',
                darkolivegreen: '556b2f',
                darkorange: 'ff8c00',
                darkorchid: '9932cc',
                darkred: '8b0000',
                darksalmon: 'e9967a',
                darkseagreen: '8fbc8f',
                darkslateblue: '483d8b',
                darkslategray: '2f4f4f',
                darkturquoise: '00ced1',
                darkviolet: '9400d3',
                deeppink: 'ff1493',
                deepskyblue: '00bfff',
                dimgray: '696969',
                dodgerblue: '1e90ff',
                feldspar: 'd19275',
                firebrick: 'b22222',
                floralwhite: 'fffaf0',
                forestgreen: '228b22',
                fuchsia: 'ff00ff',
                gainsboro: 'dcdcdc',
                ghostwhite: 'f8f8ff',
                gold: 'ffd700',
                goldenrod: 'daa520',
                gray: '808080',
                green: '008000',
                greenyellow: 'adff2f',
                honeydew: 'f0fff0',
                hotpink: 'ff69b4',
                indianred: 'cd5c5c',
                indigo: '4b0082',
                ivory: 'fffff0',
                khaki: 'f0e68c',
                lavender: 'e6e6fa',
                lavenderblush: 'fff0f5',
                lawngreen: '7cfc00',
                lemonchiffon: 'fffacd',
                lightblue: 'add8e6',
                lightcoral: 'f08080',
                lightcyan: 'e0ffff',
                lightgoldenrodyellow: 'fafad2',
                lightgrey: 'd3d3d3',
                lightgreen: '90ee90',
                lightpink: 'ffb6c1',
                lightsalmon: 'ffa07a',
                lightseagreen: '20b2aa',
                lightskyblue: '87cefa',
                lightslateblue: '8470ff',
                lightslategray: '778899',
                lightsteelblue: 'b0c4de',
                lightyellow: 'ffffe0',
                lime: '00ff00',
                limegreen: '32cd32',
                linen: 'faf0e6',
                magenta: 'ff00ff',
                maroon: '800000',
                mediumaquamarine: '66cdaa',
                mediumblue: '0000cd',
                mediumorchid: 'ba55d3',
                mediumpurple: '9370d8',
                mediumseagreen: '3cb371',
                mediumslateblue: '7b68ee',
                mediumspringgreen: '00fa9a',
                mediumturquoise: '48d1cc',
                mediumvioletred: 'c71585',
                midnightblue: '191970',
                mintcream: 'f5fffa',
                mistyrose: 'ffe4e1',
                moccasin: 'ffe4b5',
                navajowhite: 'ffdead',
                navy: '000080',
                oldlace: 'fdf5e6',
                olive: '808000',
                olivedrab: '6b8e23',
                orange: 'ffa500',
                orangered: 'ff4500',
                orchid: 'da70d6',
                palegoldenrod: 'eee8aa',
                palegreen: '98fb98',
                paleturquoise: 'afeeee',
                palevioletred: 'd87093',
                papayawhip: 'ffefd5',
                peachpuff: 'ffdab9',
                peru: 'cd853f',
                pink: 'ffc0cb',
                plum: 'dda0dd',
                powderblue: 'b0e0e6',
                purple: '800080',
                red: 'ff0000',
                rosybrown: 'bc8f8f',
                royalblue: '4169e1',
                saddlebrown: '8b4513',
                salmon: 'fa8072',
                sandybrown: 'f4a460',
                seagreen: '2e8b57',
                seashell: 'fff5ee',
                sienna: 'a0522d',
                silver: 'c0c0c0',
                skyblue: '87ceeb',
                slateblue: '6a5acd',
                slategray: '708090',
                snow: 'fffafa',
                springgreen: '00ff7f',
                steelblue: '4682b4',
                tan: 'd2b48c',
                teal: '008080',
                thistle: 'd8bfd8',
                tomato: 'ff6347',
                turquoise: '40e0d0',
                violet: 'ee82ee',
                violetred: 'd02090',
                wheat: 'f5deb3',
                white: 'ffffff',
                whitesmoke: 'f5f5f5',
                yellow: 'ffff00',
                yellowgreen: '9acd32'
            };
        var standardColorTypes = [{
                    re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
                    process: function(colorString) {
                        return [parseInt(colorString[1], 10), parseInt(colorString[2], 10), parseInt(colorString[3], 10)]
                    }
                }, {
                    re: /^#(\w{2})(\w{2})(\w{2})$/,
                    process: function(colorString) {
                        return [parseInt(colorString[1], 16), parseInt(colorString[2], 16), parseInt(colorString[3], 16)]
                    }
                }, {
                    re: /^#(\w{1})(\w{1})(\w{1})$/,
                    process: function(colorString) {
                        return [parseInt(colorString[1] + colorString[1], 16), parseInt(colorString[2] + colorString[2], 16), parseInt(colorString[3] + colorString[3], 16)]
                    }
                }];
        function Color(value) {
            this.baseColor = value;
            var color;
            if (value) {
                color = String(value).toLowerCase().replace(/ /g, '');
                color = standardColorNames[color] ? '#' + standardColorNames[color] : color;
                color = parseColor(color)
            }
            color = color || {};
            this.r = normalize(color[0]);
            this.g = normalize(color[1]);
            this.b = normalize(color[2])
        }
        function parseColor(color) {
            var result,
                i = 0,
                ii = standardColorTypes.length,
                str;
            for (; i < ii; ++i) {
                str = standardColorTypes[i].re.exec(color);
                if (str)
                    return standardColorTypes[i].process(str)
            }
            return null
        }
        function normalize(colorComponent) {
            return colorComponent < 0 || isNaN(colorComponent) ? 0 : colorComponent > 255 ? 255 : colorComponent
        }
        function toHexFromRgb(r, g, b) {
            return '#' + (0X01000000 | r << 16 | g << 8 | b).toString(16).slice(1)
        }
        var _round = Math.round;
        Color.prototype = {
            constructor: Color,
            highlight: function(step) {
                step = step || 10;
                return this.alter(step).toHex()
            },
            darken: function(step) {
                step = step || 10;
                return this.alter(-step).toHex()
            },
            alter: function(step) {
                var result = new Color;
                result.r = normalize(this.r + step);
                result.g = normalize(this.g + step);
                result.b = normalize(this.b + step);
                return result
            },
            blend: function(blendColor, opacity) {
                var other = blendColor instanceof Color ? blendColor : new Color(blendColor),
                    result = new Color;
                result.r = normalize(_round(this.r * (1 - opacity) + other.r * opacity));
                result.g = normalize(_round(this.g * (1 - opacity) + other.g * opacity));
                result.b = normalize(_round(this.b * (1 - opacity) + other.b * opacity));
                return result
            },
            toHex: function() {
                return toHexFromRgb(this.r, this.g, this.b)
            }
        };
        DX.Color = Color
    })(DevExpress);
    /*! Module core, file localization.js */
    (function($, DX, undefined) {
        var localization = function() {
                var newMessages = {};
                return {
                        setup: function(localizablePrefix) {
                            this.localizeString = function(text) {
                                var regex = new RegExp("(^|[^a-zA-Z_0-9" + localizablePrefix + "-]+)(" + localizablePrefix + "{1,2})([a-zA-Z_0-9-]+)", "g"),
                                    escapeString = localizablePrefix + localizablePrefix;
                                return text.replace(regex, function(str, prefix, escape, localizationKey) {
                                        var result = prefix + localizablePrefix + localizationKey;
                                        if (escape !== escapeString)
                                            if (Globalize.cultures["default"].messages[localizationKey])
                                                result = prefix + Globalize.localize(localizationKey);
                                            else
                                                newMessages[localizationKey] = DX.inflector.humanize(localizationKey);
                                        return result
                                    })
                            }
                        },
                        localizeNode: function(node) {
                            var self = this;
                            $(node).each(function(index, nodeItem) {
                                if (!nodeItem.nodeType)
                                    return;
                                if (nodeItem.nodeType === 3)
                                    nodeItem.nodeValue = self.localizeString(nodeItem.nodeValue);
                                else {
                                    $.each(nodeItem.attributes || [], function(index, attr) {
                                        if (typeof attr.value === "string")
                                            attr.value = self.localizeString(attr.value)
                                    });
                                    $(nodeItem).contents().each(function(index, node) {
                                        self.localizeNode(node)
                                    })
                                }
                            })
                        },
                        getDictionary: function(onlyNew) {
                            if (onlyNew)
                                return newMessages;
                            return $.extend({}, newMessages, Globalize.cultures["default"].messages)
                        }
                    }
            }();
        localization.setup("@");
        DX.localization = localization
    })(jQuery, DevExpress);
    /*! Module core, file localization.en.js */
    Globalize.addCultureInfo("default", {messages: {
            Yes: "Yes",
            No: "No",
            Cancel: "Cancel",
            Clear: "Clear",
            Done: "Done",
            Loading: "Loading...",
            Select: "Select...",
            Search: "Search",
            Back: "Back",
            "dxLookup-searchPlaceholder": "Minimum character number: {0}",
            "dxCollectionContainerWidget-noDataText": "No data to display",
            "dxList-pullingDownText": "Pull down to refresh...",
            "dxList-pulledDownText": "Release to refresh...",
            "dxList-refreshingText": "Refreshing...",
            "dxList-pageLoadingText": "Loading...",
            "dxListEditDecorator-delete": "Delete",
            "dxList-nextButtonText": "More",
            "dxScrollView-pullingDownText": "Pull down to refresh...",
            "dxScrollView-pulledDownText": "Release to refresh...",
            "dxScrollView-refreshingText": "Refreshing...",
            "dxScrollView-reachBottomText": "Loading...",
            "dxSwitch-onText": "ON",
            "dxSwitch-offText": "OFF"
        }});
    /*! Module core, file data.js */
    (function($, DX, undefined) {
        var HAS_KO = DX.support.hasKo;
        var bracketsToDots = function(expr) {
                return expr.replace(/\[/g, ".").replace(/\]/g, "")
            };
        var unwrapObservable = function(value) {
                if (HAS_KO)
                    return ko.utils.unwrapObservable(value);
                return value
            };
        var isObservable = function(value) {
                return HAS_KO && ko.isObservable(value)
            };
        var readPropValue = function(obj, propName) {
                if (propName === "this")
                    return obj;
                return obj[propName]
            };
        var assignPropValue = function(obj, propName, value) {
                if (propName === "this")
                    throw Error("Cannot assign to self");
                var propValue = obj[propName];
                if (isObservable(propValue))
                    propValue(value);
                else
                    obj[propName] = value
            };
        var compileGetter = function(expr) {
                if (arguments.length > 1)
                    expr = $.makeArray(arguments);
                if (!expr || expr === "this")
                    return function(obj) {
                            return obj
                        };
                if ($.isFunction(expr))
                    return expr;
                if ($.isArray(expr))
                    return combineGetters(expr);
                expr = bracketsToDots(expr);
                var path = expr.split(".");
                return function(obj, options) {
                        options = options || {};
                        var current = unwrapObservable(obj);
                        $.each(path, function() {
                            if (!current)
                                return false;
                            var next = unwrapObservable(current[this]);
                            if ($.isFunction(next) && !options.functionsAsIs)
                                next = next.call(current);
                            current = next
                        });
                        return current
                    }
            };
        var combineGetters = function(getters) {
                var compiledGetters = {};
                $.each(getters, function() {
                    compiledGetters[this] = compileGetter(this)
                });
                return function(obj, options) {
                        var result = {};
                        $.each(compiledGetters, function(name) {
                            var value = this(obj, options),
                                current,
                                path,
                                last,
                                i;
                            if (value === undefined)
                                return;
                            current = result;
                            path = name.split(".");
                            last = path.length - 1;
                            for (i = 0; i < last; i++)
                                current = current[path[i]] = {};
                            current[path[i]] = value
                        });
                        return result
                    }
            };
        var compileSetter = function(expr) {
                expr = expr || "this";
                expr = bracketsToDots(expr);
                var pos = expr.lastIndexOf("."),
                    targetGetter = compileGetter(expr.substr(0, pos)),
                    targetPropName = expr.substr(1 + pos);
                return function(obj, value, options) {
                        options = options || {};
                        var target = targetGetter(obj, {functionsAsIs: options.functionsAsIs}),
                            prevTargetValue = readPropValue(target, targetPropName);
                        if (!options.functionsAsIs && $.isFunction(prevTargetValue) && !isObservable(prevTargetValue))
                            target[targetPropName](value);
                        else {
                            prevTargetValue = unwrapObservable(prevTargetValue);
                            if (options.merge && $.isPlainObject(value) && (prevTargetValue === undefined || $.isPlainObject(prevTargetValue))) {
                                if (!prevTargetValue)
                                    assignPropValue(target, targetPropName, {});
                                DX.utils.deepExtendArraySafe(unwrapObservable(readPropValue(target, targetPropName)), value)
                            }
                            else
                                assignPropValue(target, targetPropName, value)
                        }
                    }
            };
        var normalizeBinaryCriterion = function(crit) {
                return [crit[0], crit.length < 3 ? "=" : crit[1].toLowerCase(), crit.length < 2 ? true : crit[crit.length - 1]]
            };
        var normalizeSortingInfo = function(info) {
                if (!$.isArray(info))
                    info = [info];
                return $.map(info, function(i) {
                        return {
                                selector: $.isFunction(i) || typeof i === "string" ? i : i.getter || i.field || i.selector,
                                desc: !!(i.desc || String(i.dir).charAt(0).toLowerCase() === "d")
                            }
                    })
            };
        var Guid = DX.Class.inherit({
                ctor: function(value) {
                    if (value)
                        value = String(value);
                    this._value = this._normalize(value || this._generate())
                },
                _normalize: function(value) {
                    value = value.replace(/[^a-f0-9]/ig, "").toLowerCase();
                    while (value.length < 32)
                        value += "0";
                    return [value.substr(0, 8), value.substr(8, 4), value.substr(12, 4), value.substr(16, 4), value.substr(20, 12)].join("-")
                },
                _generate: function() {
                    var value = "";
                    for (var i = 0; i < 32; i++)
                        value += Math.round(Math.random() * 15).toString(16);
                    return value
                },
                toString: function() {
                    return this._value
                },
                valueOf: function() {
                    return this._value
                },
                toJSON: function() {
                    return this._value
                }
            });
        var toComparable = function(value, caseSensitive) {
                if (value instanceof Date)
                    return value.getTime();
                if (value instanceof Guid)
                    return value.valueOf();
                if (!caseSensitive && typeof value === "string")
                    return value.toLowerCase();
                return value
            };
        var keysEqual = function(keyExpr, key1, key2) {
                if ($.isArray(keyExpr)) {
                    var names = $.map(key1, function(v, k) {
                            return k
                        }),
                        name;
                    for (var i = 0; i < names.length; i++) {
                        name = names[i];
                        if (toComparable(key1[name], true) != toComparable(key2[name], true))
                            return false
                    }
                    return true
                }
                return toComparable(key1, true) == toComparable(key2, true)
            };
        var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var base64_encode = function(input) {
                if (!$.isArray(input))
                    input = stringToByteArray(String(input));
                var result = "";
                for (var i = 0; i < input.length; i += 3) {
                    var octet1 = input[i],
                        octet2 = input[i + 1],
                        octet3 = input[i + 2];
                    result += $.map([octet1 >> 2, (octet1 & 3) << 4 | octet2 >> 4, isNaN(octet2) ? 64 : (octet2 & 15) << 2 | octet3 >> 6, isNaN(octet3) ? 64 : octet3 & 63], function(item) {
                        return BASE64_CHARS.charAt(item)
                    }).join("")
                }
                return result
            };
        var stringToByteArray = function(str) {
                var bytes = [],
                    code,
                    i;
                for (i = 0; i < str.length; i++) {
                    code = str.charCodeAt(i);
                    if (code < 128)
                        bytes.push(code);
                    else if (code < 2048)
                        bytes.push(192 + (code >> 6), 128 + (code & 63));
                    else if (code < 65536)
                        bytes.push(224 + (code >> 12), 128 + (code >> 6 & 63), 128 + (code & 63));
                    else if (code < 2097152)
                        bytes.push(240 + (code >> 18), 128 + (code >> 12 & 63), 128 + (code >> 6 & 63), 128 + (code & 63))
                }
                return bytes
            };
        var errorMessageFromXhr = function() {
                var textStatusMessages = {
                        timeout: "Network connection timeout",
                        error: "Unspecified network error",
                        parsererror: "Unexpected server response"
                    };
                var textStatusDetails = {
                        timeout: "possible causes: the remote host is not accessible, overloaded or is not included into the domain white-list when being run in the native container",
                        error: "if the remote host is located on another domain, make sure it properly supports cross-origin resource sharing (CORS), or use the JSONP approach instead",
                        parsererror: "the remote host did not respond with valid JSON data"
                    };
                var explainTextStatus = function(textStatus) {
                        var result = textStatusMessages[textStatus];
                        if (!result)
                            return textStatus;
                        result += " (" + textStatusDetails[textStatus] + ")";
                        return result
                    };
                return function(xhr, textStatus) {
                        if (xhr.status < 400)
                            return explainTextStatus(textStatus);
                        return xhr.statusText
                    }
            }();
        var data = DX.data = {
                utils: {
                    compileGetter: compileGetter,
                    compileSetter: compileSetter,
                    normalizeBinaryCriterion: normalizeBinaryCriterion,
                    normalizeSortingInfo: normalizeSortingInfo,
                    toComparable: toComparable,
                    keysEqual: keysEqual,
                    errorMessageFromXhr: errorMessageFromXhr
                },
                Guid: Guid,
                base64_encode: base64_encode,
                queryImpl: {},
                queryAdapters: {},
                query: function() {
                    var impl = $.isArray(arguments[0]) ? "array" : "remote";
                    return data.queryImpl[impl].apply(this, arguments)
                },
                errorHandler: null,
                _handleError: function(error) {
                    if (window.console)
                        console.warn("[DevExpress.data]: " + error);
                    if (data.errorHandler)
                        data.errorHandler(error)
                }
            }
    })(jQuery, DevExpress);
    /*! Module core, file data.query.array.js */
    (function($, DX, undefined) {
        var Class = DX.Class,
            data = DX.data,
            queryImpl = data.queryImpl,
            compileGetter = data.utils.compileGetter,
            toComparable = data.utils.toComparable;
        var Iterator = Class.inherit({
                toArray: function() {
                    var result = [];
                    this.reset();
                    while (this.next())
                        result.push(this.current());
                    return result
                },
                countable: function() {
                    return false
                }
            });
        var ArrayIterator = Iterator.inherit({
                ctor: function(array) {
                    this.array = array;
                    this.index = -1
                },
                next: function() {
                    if (this.index + 1 < this.array.length) {
                        this.index++;
                        return true
                    }
                    return false
                },
                current: function() {
                    return this.array[this.index]
                },
                reset: function() {
                    this.index = -1
                },
                toArray: function() {
                    return this.array.slice(0)
                },
                countable: function() {
                    return true
                },
                count: function() {
                    return this.array.length
                }
            });
        var WrappedIterator = Iterator.inherit({
                ctor: function(iter) {
                    this.iter = iter
                },
                next: function() {
                    return this.iter.next()
                },
                current: function() {
                    return this.iter.current()
                },
                reset: function() {
                    return this.iter.reset()
                }
            });
        var SortIterator = Iterator.inherit({
                ctor: function(iter, getter, desc) {
                    this.iter = iter;
                    this.rules = [{
                            getter: getter,
                            desc: desc
                        }]
                },
                thenBy: function(getter, desc) {
                    var result = new SortIterator(this.sortedIter || this.iter, getter, desc);
                    if (!this.sortedIter)
                        result.rules = this.rules.concat(result.rules);
                    return result
                },
                next: function() {
                    this._ensureSorted();
                    return this.sortedIter.next()
                },
                current: function() {
                    this._ensureSorted();
                    return this.sortedIter.current()
                },
                reset: function() {
                    delete this.sortedIter
                },
                countable: function() {
                    return this.sortedIter || this.iter.countable()
                },
                count: function() {
                    if (this.sortedIter)
                        return this.sortedIter.count();
                    return this.iter.count()
                },
                _ensureSorted: function() {
                    if (this.sortedIter)
                        return;
                    $.each(this.rules, function() {
                        this.getter = compileGetter(this.getter)
                    });
                    this.sortedIter = new ArrayIterator(this.iter.toArray().sort($.proxy(this._compare, this)))
                },
                _compare: function(x, y) {
                    if (x === y)
                        return 0;
                    for (var i = 0, rulesCount = this.rules.length; i < rulesCount; i++) {
                        var rule = this.rules[i],
                            xValue = toComparable(rule.getter(x)),
                            yValue = toComparable(rule.getter(y)),
                            factor = rule.desc ? -1 : 1;
                        if (xValue < yValue)
                            return -factor;
                        if (xValue > yValue)
                            return factor;
                        if (xValue !== yValue)
                            return !xValue ? -factor : factor
                    }
                    return 0
                }
            });
        var compileCriteria = function() {
                var compileGroup = function(crit) {
                        var operands = [],
                            bag = ["return function(d) { return "],
                            index = 0,
                            pushAnd = false;
                        $.each(crit, function() {
                            if ($.isArray(this) || $.isFunction(this)) {
                                if (pushAnd)
                                    bag.push(" && ");
                                operands.push(compileCriteria(this));
                                bag.push("op[", index, "](d)");
                                index++;
                                pushAnd = true
                            }
                            else {
                                bag.push(/and|&/i.test(this) ? " && " : " || ");
                                pushAnd = false
                            }
                        });
                        bag.push(" }");
                        return new Function("op", bag.join(""))(operands)
                    };
                var toString = function(value) {
                        return DX.utils.isDefined(value) ? value.toString() : ''
                    };
                var compileBinary = function(crit) {
                        crit = data.utils.normalizeBinaryCriterion(crit);
                        var getter = compileGetter(crit[0]),
                            op = crit[1],
                            value = crit[2];
                        value = toComparable(value);
                        switch (op.toLowerCase()) {
                            case"=":
                                return compileEquals(getter, value);
                            case"<>":
                                return compileEquals(getter, value, true);
                            case">":
                                return function(obj) {
                                        return toComparable(getter(obj)) > value
                                    };
                            case"<":
                                return function(obj) {
                                        return toComparable(getter(obj)) < value
                                    };
                            case">=":
                                return function(obj) {
                                        return toComparable(getter(obj)) >= value
                                    };
                            case"<=":
                                return function(obj) {
                                        return toComparable(getter(obj)) <= value
                                    };
                            case"startswith":
                                return function(obj) {
                                        return toComparable(toString(getter(obj))).indexOf(value) === 0
                                    };
                            case"endswith":
                                return function(obj) {
                                        var getterValue = toComparable(toString(getter(obj)));
                                        return getterValue.lastIndexOf(value) === getterValue.length - toString(value).length
                                    };
                            case"contains":
                                return function(obj) {
                                        return toComparable(toString(getter(obj))).indexOf(value) > -1
                                    };
                            case"notcontains":
                                return function(obj) {
                                        return toComparable(toString(getter(obj))).indexOf(value) === -1
                                    }
                        }
                        throw Error("Unknown filter operation: " + op);
                    };
                function compileEquals(getter, value, negate) {
                    return function(obj) {
                            obj = toComparable(getter(obj));
                            var result = useStrictComparison(value) ? obj === value : obj == value;
                            if (negate)
                                result = !result;
                            return result
                        }
                }
                function useStrictComparison(value) {
                    return value === "" || value === 0 || value === null || value === false || value === undefined
                }
                return function(crit) {
                        if ($.isFunction(crit))
                            return crit;
                        if ($.isArray(crit[0]))
                            return compileGroup(crit);
                        return compileBinary(crit)
                    }
            }();
        var FilterIterator = WrappedIterator.inherit({
                ctor: function(iter, criteria) {
                    this.callBase(iter);
                    this.criteria = compileCriteria(criteria)
                },
                next: function() {
                    while (this.iter.next())
                        if (this.criteria(this.current()))
                            return true;
                    return false
                }
            });
        var GroupIterator = Iterator.inherit({
                ctor: function(iter, getter) {
                    this.iter = iter;
                    this.getter = getter
                },
                next: function() {
                    this._ensureGrouped();
                    return this.groupedIter.next()
                },
                current: function() {
                    this._ensureGrouped();
                    return this.groupedIter.current()
                },
                reset: function() {
                    delete this.groupedIter
                },
                countable: function() {
                    return !!this.groupedIter
                },
                count: function() {
                    return this.groupedIter.count()
                },
                _ensureGrouped: function() {
                    if (this.groupedIter)
                        return;
                    var hash = {},
                        keys = [],
                        iter = this.iter,
                        getter = compileGetter(this.getter);
                    iter.reset();
                    while (iter.next()) {
                        var current = iter.current(),
                            key = getter(current);
                        if (key in hash)
                            hash[key].push(current);
                        else {
                            hash[key] = [current];
                            keys.push(key)
                        }
                    }
                    this.groupedIter = new ArrayIterator($.map(keys, function(key) {
                        return {
                                key: key,
                                items: hash[key]
                            }
                    }))
                }
            });
        var SelectIterator = WrappedIterator.inherit({
                ctor: function(iter, getter) {
                    this.callBase(iter);
                    this.getter = compileGetter(getter)
                },
                current: function() {
                    return this.getter(this.callBase())
                },
                countable: function() {
                    return this.iter.countable()
                },
                count: function() {
                    return this.iter.count()
                }
            });
        var SliceIterator = WrappedIterator.inherit({
                ctor: function(iter, skip, take) {
                    this.callBase(iter);
                    this.skip = Math.max(0, skip);
                    this.take = Math.max(0, take);
                    this.pos = 0
                },
                next: function() {
                    if (this.pos >= this.skip + this.take)
                        return false;
                    while (this.pos < this.skip && this.iter.next())
                        this.pos++;
                    this.pos++;
                    return this.iter.next()
                },
                reset: function() {
                    this.callBase();
                    this.pos = 0
                },
                countable: function() {
                    return this.iter.countable()
                },
                count: function() {
                    return Math.min(this.iter.count() - this.skip, this.take)
                }
            });
        queryImpl.array = function(iter, queryOptions) {
            queryOptions = queryOptions || {};
            if (!(iter instanceof Iterator))
                iter = new ArrayIterator(iter);
            var handleError = function(error) {
                    var handler = queryOptions.errorHandler;
                    if (handler)
                        handler(error);
                    data._handleError(error)
                };
            var aggregate = function(seed, step, finalize) {
                    var d = $.Deferred().fail(handleError);
                    try {
                        iter.reset();
                        if (arguments.length < 2) {
                            step = arguments[0];
                            seed = iter.next() ? iter.current() : undefined
                        }
                        var accumulator = seed;
                        while (iter.next())
                            accumulator = step(accumulator, iter.current());
                        d.resolve(finalize ? finalize(accumulator) : accumulator)
                    }
                    catch(x) {
                        d.reject(x)
                    }
                    return d.promise()
                };
            var select = function(getter) {
                    if (!$.isFunction(getter) && !$.isArray(getter))
                        getter = $.makeArray(arguments);
                    return chainQuery(new SelectIterator(iter, getter))
                };
            var selectProp = function(name) {
                    return select(compileGetter(name))
                };
            var chainQuery = function(iter) {
                    return queryImpl.array(iter, queryOptions)
                };
            return {
                    toArray: function() {
                        return iter.toArray()
                    },
                    enumerate: function() {
                        var d = $.Deferred().fail(handleError);
                        try {
                            d.resolve(iter.toArray())
                        }
                        catch(x) {
                            d.reject(x)
                        }
                        return d.promise()
                    },
                    sortBy: function(getter, desc) {
                        return chainQuery(new SortIterator(iter, getter, desc))
                    },
                    thenBy: function(getter, desc) {
                        if (iter instanceof SortIterator)
                            return chainQuery(iter.thenBy(getter, desc));
                        throw Error();
                    },
                    filter: function(criteria) {
                        if (!$.isArray(criteria))
                            criteria = $.makeArray(arguments);
                        return chainQuery(new FilterIterator(iter, criteria))
                    },
                    slice: function(skip, take) {
                        if (take === undefined)
                            take = Number.MAX_VALUE;
                        return chainQuery(new SliceIterator(iter, skip, take))
                    },
                    select: select,
                    groupBy: function(getter) {
                        return chainQuery(new GroupIterator(iter, getter))
                    },
                    aggregate: aggregate,
                    count: function() {
                        if (iter.countable()) {
                            var d = $.Deferred().fail(handleError);
                            try {
                                d.resolve(iter.count())
                            }
                            catch(x) {
                                d.reject(x)
                            }
                            return d.promise()
                        }
                        return aggregate(0, function(count) {
                                return 1 + count
                            })
                    },
                    sum: function(getter) {
                        if (getter)
                            return selectProp(getter).sum();
                        return aggregate(0, function(sum, item) {
                                return sum + item
                            })
                    },
                    min: function(getter) {
                        if (getter)
                            return selectProp(getter).min();
                        return aggregate(function(min, item) {
                                return item < min ? item : min
                            })
                    },
                    max: function(getter) {
                        if (getter)
                            return selectProp(getter).max();
                        return aggregate(function(max, item) {
                                return item > max ? item : max
                            })
                    },
                    avg: function(getter) {
                        if (getter)
                            return selectProp(getter).avg();
                        var count = 0;
                        return aggregate(0, function(sum, item) {
                                count++;
                                return sum + item
                            }, function(sum) {
                                return count ? sum / count : undefined
                            })
                    }
                }
        }
    })(jQuery, DevExpress);
    /*! Module core, file data.query.remote.js */
    (function($, DX, undefined) {
        var data = DX.data,
            queryImpl = data.queryImpl;
        queryImpl.remote = function(url, queryOptions, tasks) {
            tasks = tasks || [];
            queryOptions = queryOptions || {};
            var createTask = function(name, args) {
                    return {
                            name: name,
                            args: args
                        }
                };
            var exec = function(executorTask) {
                    var d = $.Deferred(),
                        adapterFactory,
                        adapter,
                        taskQueue,
                        currentTask;
                    var rejectWithNotify = function(error) {
                            var handler = queryOptions.errorHandler;
                            if (handler)
                                handler(error);
                            data._handleError(error);
                            d.reject(error)
                        };
                    try {
                        adapterFactory = queryOptions.adapter || "odata";
                        if (!$.isFunction(adapterFactory))
                            adapterFactory = data.queryAdapters[adapterFactory];
                        adapter = adapterFactory(queryOptions);
                        taskQueue = [].concat(tasks).concat(executorTask);
                        while (taskQueue.length) {
                            currentTask = taskQueue[0];
                            if (String(currentTask.name) !== "enumerate")
                                if (!adapter[currentTask.name] || adapter[currentTask.name].apply(adapter, currentTask.args) === false)
                                    break;
                            taskQueue.shift()
                        }
                        adapter.exec(url).done(function(result, extra) {
                            if (!taskQueue.length)
                                d.resolve(result, extra);
                            else {
                                var clientChain = queryImpl.array(result, {errorHandler: queryOptions.errorHandler});
                                $.each(taskQueue, function() {
                                    clientChain = clientChain[this.name].apply(clientChain, this.args)
                                });
                                clientChain.done($.proxy(d.resolve, d)).fail($.proxy(d.reject, d))
                            }
                        }).fail(rejectWithNotify)
                    }
                    catch(x) {
                        rejectWithNotify(x)
                    }
                    return d.promise()
                };
            var query = {};
            $.each(["sortBy", "thenBy", "filter", "slice", "select", "groupBy"], function() {
                var name = this;
                query[name] = function() {
                    return queryImpl.remote(url, queryOptions, tasks.concat(createTask(name, arguments)))
                }
            });
            $.each(["count", "min", "max", "sum", "avg", "aggregate", "enumerate"], function() {
                var name = this;
                query[name] = function() {
                    return exec.call(this, createTask(name, arguments))
                }
            });
            return query
        }
    })(jQuery, DevExpress);
    /*! Module core, file data.odata.js */
    (function($, DX, undefined) {
        var data = DX.data,
            Guid = data.Guid;
        var JSON_VERBOSE_MIME_TYPE = "application/json;odata=verbose";
        var ajaxOptionsForRequest = function(request, requestOptions) {
                request = $.extend({
                    method: "get",
                    url: "",
                    params: {},
                    payload: null,
                    headers: {}
                }, request);
                requestOptions = requestOptions || {};
                var beforeSend = requestOptions.beforeSend;
                if (beforeSend)
                    beforeSend(request);
                var method = (request.method || "get").toLowerCase(),
                    isGet = method === "get",
                    useJsonp = isGet && requestOptions.jsonp,
                    params = $.extend({}, request.params),
                    ajaxData = isGet ? params : JSON.stringify(request.payload),
                    qs = !isGet && $.param(params),
                    url = request.url,
                    contentType = !isGet && JSON_VERBOSE_MIME_TYPE;
                if (qs)
                    url += (url.indexOf("?") > -1 ? "&" : "?") + qs;
                if (useJsonp)
                    ajaxData["$format"] = "json";
                return {
                        url: url,
                        data: ajaxData,
                        dataType: useJsonp ? "jsonp" : "json",
                        jsonp: useJsonp && "$callback",
                        type: method,
                        timeout: 30000,
                        headers: request.headers,
                        contentType: contentType,
                        accepts: {json: [JSON_VERBOSE_MIME_TYPE, "text/plain"].join()},
                        xhrFields: {withCredentials: requestOptions.withCredentials}
                    }
            };
        var sendRequest = function(request, requestOptions) {
                var d = $.Deferred();
                $.ajax(ajaxOptionsForRequest(request, requestOptions)).always(function(obj, textStatus) {
                    var tuplet = interpretVerboseJsonFormat(obj, textStatus),
                        error = tuplet.error,
                        data = tuplet.data,
                        nextUrl = tuplet.nextUrl,
                        extra;
                    if (error)
                        d.reject(error);
                    else if (requestOptions.countOnly)
                        d.resolve(tuplet.count);
                    else if (nextUrl)
                        sendRequest({url: nextUrl}, requestOptions).fail($.proxy(d.reject, d)).done(function(nextData) {
                            d.resolve(data.concat(nextData))
                        });
                    else {
                        if (isFinite(tuplet.count))
                            extra = {totalCount: tuplet.count};
                        d.resolve(data, extra)
                    }
                });
                return d.promise()
            };
        var formatDotNetError = function(errorObj) {
                var message,
                    currentError = errorObj;
                if ("message" in errorObj)
                    if (errorObj.message.value)
                        message = errorObj.message.value;
                    else
                        message = errorObj.message;
                while (currentError = currentError.innererror || currentError.internalexception) {
                    message = currentError.message;
                    if (currentError.internalexception && message.indexOf("inner exception") === -1)
                        break
                }
                return message
            };
        var errorFromResponse = function(obj, textStatus) {
                if (textStatus === "nocontent")
                    return null;
                var httpStatus = 200,
                    message = "Unknown error",
                    response = obj;
                if (textStatus !== "success") {
                    httpStatus = obj.status;
                    message = data.utils.errorMessageFromXhr(obj, textStatus);
                    try {
                        response = $.parseJSON(obj.responseText)
                    }
                    catch(x) {}
                }
                var errorObj = response && response.error;
                if (errorObj) {
                    message = formatDotNetError(errorObj) || message;
                    if (httpStatus === 200)
                        httpStatus = 500;
                    if (response.error.code)
                        httpStatus = Number(response.error.code);
                    return $.extend(Error(message), {
                            httpStatus: httpStatus,
                            errorDetails: errorObj
                        })
                }
                else if (httpStatus !== 200)
                    return $.extend(Error(message), {httpStatus: httpStatus})
            };
        var interpretVerboseJsonFormat = function(obj, textStatus) {
                var error = errorFromResponse(obj, textStatus);
                if (error)
                    return {error: error};
                if (!$.isPlainObject(obj))
                    return {data: obj};
                var data = obj.d;
                if (!data)
                    return {error: Error("Malformed or unsupported JSON response received")};
                data = data.results || data;
                recognizeDates(data);
                return {
                        data: data,
                        nextUrl: obj.d.__next,
                        count: obj.d.__count
                    }
            };
        var EdmLiteral = DX.Class.inherit({
                ctor: function(value) {
                    this._value = value
                },
                valueOf: function() {
                    return this._value
                }
            });
        var serializeDate = function() {
                var pad = function(part) {
                        part = String(part);
                        if (part.length < 2)
                            part = "0" + part;
                        return part
                    };
                return function(date) {
                        var result = ["datetime'", date.getUTCFullYear(), "-", pad(date.getUTCMonth() + 1), "-", pad(date.getUTCDate())];
                        if (date.getUTCHours() || date.getUTCMinutes() || date.getUTCSeconds() || date.getUTCMilliseconds()) {
                            result.push("T", pad(date.getUTCHours()), ":", pad(date.getUTCMinutes()), ":", pad(date.getUTCSeconds()));
                            if (date.getUTCMilliseconds())
                                result.push(".", date.getUTCMilliseconds())
                        }
                        result.push("'");
                        return result.join("")
                    }
            }();
        var serializePropName = function(propName) {
                if (propName instanceof EdmLiteral)
                    return propName.valueOf();
                return propName.replace(/\./g, "/")
            };
        var serializeValue = function(value) {
                if (value instanceof Date)
                    return serializeDate(value);
                if (value instanceof Guid)
                    return "guid'" + value + "'";
                if (value instanceof EdmLiteral)
                    return value.valueOf();
                if (typeof value === "string")
                    return "'" + value.replace(/'/g, "''") + "'";
                return String(value)
            };
        var serializeKey = function(key) {
                if ($.isPlainObject(key)) {
                    var parts = [];
                    $.each(key, function(k, v) {
                        parts.push(serializePropName(k) + "=" + serializeValue(v))
                    });
                    return parts.join()
                }
                return serializeValue(key)
            };
        var recognizeDates = function(list) {
                $.each(list, function(i, val) {
                    if (val !== null && typeof val === "object")
                        recognizeDates(val);
                    else if (typeof val === "string") {
                        var matches = val.match(/^\/Date\((-?\d+)((\+|-)?(\d+)?)\)\/$/);
                        if (matches)
                            list[i] = new Date(Number(matches[1]) + matches[2] * 60000)
                    }
                })
            };
        var keyConverters = {
                String: function(value) {
                    return value + ""
                },
                Int32: function(value) {
                    return ~~value
                },
                Int64: function(value) {
                    if (value instanceof EdmLiteral)
                        return value;
                    return new EdmLiteral(value + "L")
                },
                Guid: function(value) {
                    if (value instanceof Guid)
                        return value;
                    return new Guid(value)
                }
            };
        var compileCriteria = function() {
                var createBinaryOperationFormatter = function(op) {
                        return function(prop, val, bag) {
                                bag.push(prop, " ", op, " ", val)
                            }
                    };
                var createStringFuncFormatter = function(op, reverse) {
                        return function(prop, val, bag) {
                                if (reverse)
                                    bag.push(op, "(", val, ",", prop, ")");
                                else
                                    bag.push(op, "(", prop, ",", val, ")")
                            }
                    };
                var formatters = {
                        "=": createBinaryOperationFormatter("eq"),
                        "<>": createBinaryOperationFormatter("ne"),
                        ">": createBinaryOperationFormatter("gt"),
                        ">=": createBinaryOperationFormatter("ge"),
                        "<": createBinaryOperationFormatter("lt"),
                        "<=": createBinaryOperationFormatter("le"),
                        startswith: createStringFuncFormatter("startswith"),
                        endswith: createStringFuncFormatter("endswith"),
                        contains: createStringFuncFormatter("substringof", true),
                        notcontains: createStringFuncFormatter("not substringof", true)
                    };
                var compileBinary = function(criteria, bag) {
                        criteria = data.utils.normalizeBinaryCriterion(criteria);
                        var op = criteria[1],
                            formatter = formatters[op.toLowerCase()];
                        if (!formatter)
                            throw Error("Unknown filter operation: " + op);
                        formatter(serializePropName(criteria[0]), serializeValue(criteria[2]), bag)
                    };
                var compileGroup = function(criteria, bag) {
                        var pushAnd = false;
                        $.each(criteria, function() {
                            if ($.isArray(this)) {
                                if (pushAnd)
                                    bag.push(" and ");
                                bag.push("(");
                                compileCore(this, bag);
                                bag.push(")");
                                pushAnd = true
                            }
                            else {
                                bag.push(/and|&/i.test(this) ? " and " : " or ");
                                pushAnd = false
                            }
                        })
                    };
                var compileCore = function(criteria, bag) {
                        if ($.isArray(criteria[0]))
                            compileGroup(criteria, bag);
                        else
                            compileBinary(criteria, bag)
                    };
                return function(criteria) {
                        var bag = [];
                        compileCore(criteria, bag);
                        return bag.join("")
                    }
            }();
        var createODataQueryAdapter = function(queryOptions) {
                var sorting = [],
                    criteria = [],
                    select,
                    skip,
                    take,
                    countQuery;
                var hasSlice = function() {
                        return skip || take !== undefined
                    };
                var sortCore = function(getter, desc, reset) {
                        if (hasSlice() || typeof getter !== "string")
                            return false;
                        if (reset)
                            sorting = [];
                        var rule = serializePropName(getter);
                        if (desc)
                            rule += " desc";
                        sorting.push(rule)
                    };
                var generateExpand = function() {
                        var hash = {};
                        if (queryOptions.expand)
                            $.each($.makeArray(queryOptions.expand), function() {
                                hash[serializePropName(this)] = 1
                            });
                        if (select)
                            $.each(select, function() {
                                var path = this.split(".");
                                if (path.length < 2)
                                    return;
                                path.pop();
                                hash[serializePropName(path.join("."))] = 1
                            });
                        return $.map(hash, function(k, v) {
                                return v
                            }).join() || undefined
                    };
                var requestData = function() {
                        var result = {};
                        if (!countQuery) {
                            if (sorting.length)
                                result["$orderby"] = sorting.join(",");
                            if (skip)
                                result["$skip"] = skip;
                            if (take !== undefined)
                                result["$top"] = take;
                            if (select)
                                result["$select"] = serializePropName(select.join());
                            result["$expand"] = generateExpand()
                        }
                        if (criteria.length)
                            result["$filter"] = compileCriteria(criteria.length < 2 ? criteria[0] : criteria);
                        if (countQuery)
                            result["$top"] = 0;
                        if (queryOptions.requireTotalCount || countQuery)
                            result["$inlinecount"] = "allpages";
                        return result
                    };
                return {
                        exec: function(url) {
                            return sendRequest({
                                    url: url,
                                    params: $.extend(requestData(), queryOptions && queryOptions.params)
                                }, {
                                    beforeSend: queryOptions.beforeSend,
                                    jsonp: queryOptions.jsonp,
                                    withCredentials: queryOptions.withCredentials,
                                    countOnly: countQuery
                                })
                        },
                        sortBy: function(getter, desc) {
                            return sortCore(getter, desc, true)
                        },
                        thenBy: function(getter, desc) {
                            return sortCore(getter, desc, false)
                        },
                        slice: function(skipCount, takeCount) {
                            if (hasSlice())
                                return false;
                            skip = skipCount;
                            take = takeCount
                        },
                        filter: function(criterion) {
                            if (hasSlice() || $.isFunction(criterion))
                                return false;
                            if (!$.isArray(criterion))
                                criterion = $.makeArray(arguments);
                            if (criteria.length)
                                criteria.push("and");
                            criteria.push(criterion)
                        },
                        select: function(expr) {
                            if (select || $.isFunction(expr))
                                return false;
                            if (!$.isArray(expr))
                                expr = $.makeArray(arguments);
                            select = expr
                        },
                        count: function() {
                            countQuery = true
                        }
                    }
            };
        $.extend(true, data, {
            EdmLiteral: EdmLiteral,
            utils: {odata: {
                    sendRequest: sendRequest,
                    serializePropName: serializePropName,
                    serializeValue: serializeValue,
                    serializeKey: serializeKey,
                    keyConverters: keyConverters
                }},
            queryAdapters: {odata: createODataQueryAdapter}
        })
    })(jQuery, DevExpress);
    /*! Module core, file data.store.abstract.js */
    (function($, DX, undefined) {
        var Class = DX.Class,
            abstract = DX.abstract,
            data = DX.data,
            normalizeSortingInfo = data.utils.normalizeSortingInfo;
        var STORE_CALLBACK_NAMES = ["loading", "loaded", "modifying", "modified", "inserting", "inserted", "updating", "updated", "removing", "removed"];
        function multiLevelGroup(query, groupInfo) {
            query = query.groupBy(groupInfo[0].selector);
            if (groupInfo.length > 1)
                query = query.select(function(g) {
                    return $.extend({}, g, {items: multiLevelGroup(data.query(g.items), groupInfo.slice(1)).toArray()})
                });
            return query
        }
        data.Store = Class.inherit({
            ctor: function(options) {
                var self = this;
                options = options || {};
                $.each(STORE_CALLBACK_NAMES, function() {
                    var callbacks = self[this] = $.Callbacks();
                    if (this in options)
                        callbacks.add(options[this])
                });
                this._key = options.key;
                this._errorHandler = options.errorHandler;
                this._useDefaultSearch = true
            },
            _customLoadOptions: function() {
                return null
            },
            key: function() {
                return this._key
            },
            keyOf: function(obj) {
                if (!this._keyGetter)
                    this._keyGetter = data.utils.compileGetter(this.key());
                return this._keyGetter(obj)
            },
            _requireKey: function() {
                if (!this.key())
                    throw Error("Key expression is required for this operation");
            },
            load: function(options) {
                var self = this;
                options = options || {};
                this.loading.fire(options);
                return this._loadImpl(options).done(function(result, extra) {
                        self.loaded.fire(result, extra)
                    })
            },
            _loadImpl: function(options) {
                var filter = options.filter,
                    sort = options.sort,
                    select = options.select,
                    group = options.group,
                    skip = options.skip,
                    take = options.take,
                    q = this.createQuery(options);
                if (filter)
                    q = q.filter(filter);
                if (group)
                    group = normalizeSortingInfo(group);
                if (sort || group) {
                    sort = normalizeSortingInfo(sort || []);
                    if (group)
                        sort = group.concat(sort);
                    $.each(sort, function(index) {
                        q = q[index ? "thenBy" : "sortBy"](this.selector, this.desc)
                    })
                }
                if (select)
                    q = q.select(select);
                if (group)
                    q = multiLevelGroup(q, group);
                if (take || skip)
                    q = q.slice(skip || 0, take);
                return q.enumerate()
            },
            createQuery: abstract,
            totalCount: function(options) {
                return this._addFailHandlers(this._totalCountImpl(options))
            },
            _totalCountImpl: function(options) {
                options = options || {};
                var q = this.createQuery(),
                    group = options.group,
                    filter = options.filter;
                if (filter)
                    q = q.filter(filter);
                if (group) {
                    group = normalizeSortingInfo(group);
                    q = multiLevelGroup(q, group)
                }
                return q.count()
            },
            byKey: function(key, extraOptions) {
                return this._addFailHandlers(this._byKeyImpl(key, extraOptions))
            },
            _byKeyImpl: abstract,
            insert: function(values) {
                var self = this;
                self.modifying.fire();
                self.inserting.fire(values);
                return self._addFailHandlers(self._insertImpl(values).done(function(callbackValues, callbackKey) {
                        self.inserted.fire(callbackValues, callbackKey);
                        self.modified.fire()
                    }))
            },
            _insertImpl: abstract,
            update: function(key, values) {
                var self = this;
                self.modifying.fire();
                self.updating.fire(key, values);
                return self._addFailHandlers(self._updateImpl(key, values).done(function(callbackKey, callbackValues) {
                        self.updated.fire(callbackKey, callbackValues);
                        self.modified.fire()
                    }))
            },
            _updateImpl: abstract,
            remove: function(key) {
                var self = this;
                self.modifying.fire();
                self.removing.fire(key);
                return self._addFailHandlers(self._removeImpl(key).done(function(callbackKey) {
                        self.removed.fire(callbackKey);
                        self.modified.fire()
                    }))
            },
            _removeImpl: abstract,
            _addFailHandlers: function(deferred) {
                return deferred.fail(this._errorHandler, data._handleError)
            }
        })
    })(jQuery, DevExpress);
    /*! Module core, file data.store.array.js */
    (function($, DX, undefined) {
        var data = DX.data,
            Guid = data.Guid;
        var trivialPromise = function(_) {
                var d = $.Deferred();
                return d.resolve.apply(d, arguments).promise()
            };
        var rejectedPromise = function(_) {
                var d = $.Deferred();
                return d.reject.apply(d, arguments).promise()
            };
        data.ArrayStore = data.Store.inherit({
            ctor: function(options) {
                if ($.isArray(options))
                    options = {data: options};
                else
                    options = options || {};
                this.callBase(options);
                this._array = options.data || []
            },
            createQuery: function() {
                return data.query(this._array, {errorHandler: this._errorHandler})
            },
            _byKeyImpl: function(key) {
                return trivialPromise(this._array[this._indexByKey(key)])
            },
            _insertImpl: function(values) {
                var keyExpr = this.key(),
                    keyValue,
                    obj = {};
                $.extend(obj, values);
                if (keyExpr) {
                    keyValue = this.keyOf(obj);
                    if (keyValue === undefined || typeof keyValue === "object" && $.isEmptyObject(keyValue)) {
                        if ($.isArray(keyExpr))
                            throw Error("Compound keys cannot be auto-generated");
                        keyValue = obj[keyExpr] = String(new Guid)
                    }
                    else if (this._array[this._indexByKey(keyValue)] !== undefined)
                        return rejectedPromise(Error("Attempt to insert an item with the duplicate key"))
                }
                else
                    keyValue = obj;
                this._array.push(obj);
                return trivialPromise(values, keyValue)
            },
            _updateImpl: function(key, values) {
                var target;
                if (this.key()) {
                    var index = this._indexByKey(key);
                    if (index < 0)
                        return rejectedPromise(Error("Data item not found"));
                    target = this._array[index]
                }
                else
                    target = key;
                DX.utils.deepExtendArraySafe(target, values);
                return trivialPromise(key, values)
            },
            _removeImpl: function(key) {
                var index = this._indexByKey(key);
                if (index > -1)
                    this._array.splice(index, 1);
                return trivialPromise(key)
            },
            _indexByKey: function(key) {
                for (var i = 0, arrayLength = this._array.length; i < arrayLength; i++)
                    if (data.utils.keysEqual(this.key(), this.keyOf(this._array[i]), key))
                        return i;
                return -1
            }
        })
    })(jQuery, DevExpress);
    /*! Module core, file data.store.local.js */
    (function($, DX, undefined) {
        var Class = DX.Class,
            abstract = DX.abstract,
            data = DX.data;
        var LocalStoreBackend = Class.inherit({
                ctor: function(store, storeOptions) {
                    this._store = store;
                    this._dirty = false;
                    var immediate = this._immediate = storeOptions.immediate;
                    var flushInterval = Math.max(100, storeOptions.flushInterval || 10 * 1000);
                    if (!immediate) {
                        var saveProxy = $.proxy(this.save, this);
                        setInterval(saveProxy, flushInterval);
                        $(window).on("beforeunload", saveProxy);
                        if (window.cordova)
                            document.addEventListener("pause", saveProxy, false)
                    }
                },
                notifyChanged: function() {
                    this._dirty = true;
                    if (this._immediate)
                        this.save()
                },
                load: function() {
                    this._store._array = this._loadImpl();
                    this._dirty = false
                },
                save: function() {
                    if (!this._dirty)
                        return;
                    this._saveImpl(this._store._array);
                    this._dirty = false
                },
                _loadImpl: abstract,
                _saveImpl: abstract
            });
        var DomLocalStoreBackend = LocalStoreBackend.inherit({
                ctor: function(store, storeOptions) {
                    this.callBase(store, storeOptions);
                    var name = storeOptions.name;
                    if (!name)
                        throw Error("Name is required");
                    this._key = "dx-data-localStore-" + name
                },
                _loadImpl: function() {
                    var raw = localStorage.getItem(this._key);
                    if (raw)
                        return JSON.parse(raw);
                    return []
                },
                _saveImpl: function(array) {
                    if (!array.length)
                        localStorage.removeItem(this._key);
                    else
                        localStorage.setItem(this._key, JSON.stringify(array))
                }
            });
        var localStoreBackends = {dom: DomLocalStoreBackend};
        data.LocalStore = data.ArrayStore.inherit({
            ctor: function(options) {
                if (typeof options === "string")
                    options = {name: options};
                else
                    options = options || {};
                this.callBase(options);
                this._backend = new localStoreBackends[options.backend || "dom"](this, options);
                this._backend.load()
            },
            clear: function() {
                this._array = [];
                this._backend.notifyChanged()
            },
            _insertImpl: function(values) {
                var b = this._backend;
                return this.callBase(values).done($.proxy(b.notifyChanged, b))
            },
            _updateImpl: function(key, values) {
                var b = this._backend;
                return this.callBase(key, values).done($.proxy(b.notifyChanged, b))
            },
            _removeImpl: function(key) {
                var b = this._backend;
                return this.callBase(key).done($.proxy(b.notifyChanged, b))
            }
        })
    })(jQuery, DevExpress);
    /*! Module core, file data.store.odata.js */
    (function($, DX, undefined) {
        var Class = DX.Class,
            data = DX.data,
            odataUtils = data.utils.odata;
        var escapeServiceOperationParams = function(params) {
                if (!params)
                    return params;
                var result = {};
                $.each(params, function(k, v) {
                    result[k] = odataUtils.serializeValue(v)
                });
                return result
            };
        var convertSimpleKey = function(keyType, keyValue) {
                var converter = odataUtils.keyConverters[keyType];
                if (!converter)
                    throw Error("Unknown key type: " + keyType);
                return converter(keyValue)
            };
        var SharedMethods = {
                _extractServiceOptions: function(options) {
                    options = options || {};
                    this._url = String(options.url).replace(/\/+$/, "");
                    this._beforeSend = options.beforeSend;
                    this._jsonp = options.jsonp;
                    this._withCredentials = options.withCredentials
                },
                _sendRequest: function(url, method, params, payload) {
                    return odataUtils.sendRequest({
                            url: url,
                            method: method,
                            params: params || {},
                            payload: payload
                        }, {
                            beforeSend: this._beforeSend,
                            jsonp: this._jsonp,
                            withCredentials: this._withCredentials
                        })
                }
            };
        var ODataStore = data.Store.inherit({
                ctor: function(options) {
                    this.callBase(options);
                    this._extractServiceOptions(options);
                    this._keyType = options.keyType
                },
                _customLoadOptions: function() {
                    return ["expand", "customQueryParams"]
                },
                _byKeyImpl: function(key, extraOptions) {
                    var params = {};
                    if (extraOptions)
                        if (extraOptions.expand)
                            params["$expand"] = $.map($.makeArray(extraOptions.expand), odataUtils.serializePropName).join();
                    return this._sendRequest(this._byKeyUrl(key), "GET", params)
                },
                createQuery: function(loadOptions) {
                    loadOptions = loadOptions || {};
                    return data.query(this._url, {
                            beforeSend: this._beforeSend,
                            errorHandler: this._errorHandler,
                            jsonp: this._jsonp,
                            withCredentials: this._withCredentials,
                            params: escapeServiceOperationParams(loadOptions.customQueryParams),
                            expand: loadOptions.expand,
                            requireTotalCount: loadOptions.requireTotalCount
                        })
                },
                _insertImpl: function(values) {
                    this._requireKey();
                    var self = this,
                        d = $.Deferred();
                    $.when(this._sendRequest(this._url, "POST", null, values)).done(function(serverResponse) {
                        d.resolve(values, self.keyOf(serverResponse))
                    }).fail($.proxy(d.reject, d));
                    return d.promise()
                },
                _updateImpl: function(key, values) {
                    var d = $.Deferred();
                    $.when(this._sendRequest(this._byKeyUrl(key), "MERGE", null, values)).done(function() {
                        d.resolve(key, values)
                    }).fail($.proxy(d.reject, d));
                    return d.promise()
                },
                _removeImpl: function(key) {
                    var d = $.Deferred();
                    $.when(this._sendRequest(this._byKeyUrl(key), "DELETE")).done(function() {
                        d.resolve(key)
                    }).fail($.proxy(d.reject, d));
                    return d.promise()
                },
                _byKeyUrl: function(key) {
                    var keyType = this._keyType;
                    if ($.isPlainObject(keyType))
                        $.each(keyType, function(subKeyName, subKeyType) {
                            key[subKeyName] = convertSimpleKey(subKeyType, key[subKeyName])
                        });
                    else if (keyType)
                        key = convertSimpleKey(keyType, key);
                    return this._url + "(" + encodeURIComponent(odataUtils.serializeKey(key)) + ")"
                }
            }).include(SharedMethods);
        var ODataContext = Class.inherit({
                ctor: function(options) {
                    var self = this;
                    self._extractServiceOptions(options);
                    self._errorHandler = options.errorHandler;
                    $.each(options.entities || [], function(entityAlias, entityOptions) {
                        self[entityAlias] = new ODataStore($.extend({}, options, {url: self._url + "/" + encodeURIComponent(entityOptions.name || entityAlias)}, entityOptions))
                    })
                },
                get: function(operationName, params) {
                    return this.invoke(operationName, params, "GET")
                },
                invoke: function(operationName, params, httpMethod) {
                    httpMethod = httpMethod || "POST";
                    var d = $.Deferred();
                    $.when(this._sendRequest(this._url + "/" + encodeURIComponent(operationName), httpMethod, escapeServiceOperationParams(params))).done(function(r) {
                        if (r && operationName in r)
                            r = r[operationName];
                        d.resolve(r)
                    }).fail([this._errorHandler, data._handleError, $.proxy(d.reject, d)]);
                    return d.promise()
                },
                objectLink: function(entityAlias, key) {
                    var store = this[entityAlias];
                    if (!store)
                        throw Error("Unknown entity name or alias: " + entityAlias);
                    return {__metadata: {uri: store._byKeyUrl(key)}}
                }
            }).include(SharedMethods);
        $.extend(data, {
            ODataStore: ODataStore,
            ODataContext: ODataContext
        })
    })(jQuery, DevExpress);
    /*! Module core, file data.store.rest.js */
    (function($, DX, undefined) {
        var data = DX.data;
        function createAjaxFailureHandler(deferred) {
            return function(xhr, textStatus) {
                    if (!xhr || !xhr.getResponseHeader)
                        deferred.reject.apply(deferred, arguments);
                    else
                        deferred.reject(Error(data.utils.errorMessageFromXhr(xhr, textStatus)))
                }
        }
        function operationCustomizerPropName(operationName) {
            return "_customize" + DX.inflector.camelize(operationName, true)
        }
        function pathPropName(operationName) {
            return "_" + operationName + "Path"
        }
        data.RestStore = data.Store.inherit({
            ctor: function(options) {
                DX.utils.logger.warn("RestStore is deprecated, use CustomStore instead");
                var self = this;
                self.callBase(options);
                options = options || {};
                self._url = String(options.url).replace(/\/+$/, "");
                self._jsonp = options.jsonp;
                self._withCredentials = options.withCredentials;
                $.each(["Load", "Insert", "Update", "Remove", "ByKey", "Operation"], function() {
                    var value = options["customize" + this];
                    if (value)
                        self[operationCustomizerPropName(this)] = value
                });
                $.each(["load", "insert", "update", "remove", "byKey"], function() {
                    var value = options[this + "Path"];
                    if (value)
                        self[pathPropName(this)] = value
                })
            },
            _loadImpl: function(options) {
                var d = $.Deferred(),
                    ajaxOptions = {
                        url: this._formatUrlNoKey("load"),
                        type: "GET"
                    };
                $.when(this._createAjax(ajaxOptions, "load", options)).done($.proxy(d.resolve, d)).fail(createAjaxFailureHandler(d));
                return this._addFailHandlers(d.promise())
            },
            createQuery: function() {
                throw Error("Not supported");
            },
            _insertImpl: function(values) {
                var d = $.Deferred(),
                    self = this,
                    ajaxOptions = {
                        url: this._formatUrlNoKey("insert"),
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(values)
                    };
                $.when(this._createAjax(ajaxOptions, "insert")).done(function(serverResponse) {
                    d.resolve(values, self.key() && self.keyOf(serverResponse))
                }).fail(createAjaxFailureHandler(d));
                return d.promise()
            },
            _updateImpl: function(key, values) {
                var d = $.Deferred(),
                    ajaxOptions = {
                        url: this._formatUrlWithKey("update", key),
                        type: "PUT",
                        contentType: "application/json",
                        data: JSON.stringify(values)
                    };
                $.when(this._createAjax(ajaxOptions, "update")).done(function() {
                    d.resolve(key, values)
                }).fail(createAjaxFailureHandler(d));
                return d.promise()
            },
            _removeImpl: function(key) {
                var d = $.Deferred(),
                    ajaxOptions = {
                        url: this._formatUrlWithKey("remove", key),
                        type: "DELETE"
                    };
                $.when(this._createAjax(ajaxOptions, "remove")).done(function() {
                    d.resolve(key)
                }).fail(createAjaxFailureHandler(d));
                return d.promise()
            },
            _byKeyImpl: function(key) {
                var d = $.Deferred(),
                    ajaxOptions = {
                        url: this._formatUrlWithKey("byKey", key),
                        type: "GET"
                    };
                $.when(this._createAjax(ajaxOptions, "byKey")).done(function(data) {
                    d.resolve(data)
                }).fail(createAjaxFailureHandler(d));
                return d.promise()
            },
            _createAjax: function(ajaxOptions, operationName, extra) {
                var customizationFunc,
                    customizationResult;
                function isDeferred(obj) {
                    return "done" in obj && "fail" in obj
                }
                if (this._jsonp && ajaxOptions.type === "GET")
                    ajaxOptions.dataType = "jsonp";
                else
                    $.extend(true, ajaxOptions, {xhrFields: {withCredentials: this._withCredentials}});
                customizationFunc = this[operationCustomizerPropName("operation")];
                if (customizationFunc) {
                    customizationResult = customizationFunc(ajaxOptions, operationName, extra);
                    if (customizationResult) {
                        if (isDeferred(customizationResult))
                            return customizationResult;
                        ajaxOptions = customizationResult
                    }
                }
                customizationFunc = this[operationCustomizerPropName(operationName)];
                if (customizationFunc) {
                    customizationResult = customizationFunc(ajaxOptions, extra);
                    if (customizationResult) {
                        if (isDeferred(customizationResult))
                            return customizationResult;
                        ajaxOptions = customizationResult
                    }
                }
                return $.ajax(ajaxOptions)
            },
            _formatUrlNoKey: function(operationName) {
                var url = this._url,
                    path = this[pathPropName(operationName)];
                if (!path)
                    return url;
                if ($.isFunction(path))
                    return path(url);
                return url + "/" + path
            },
            _formatUrlWithKey: function(operationName, key) {
                var url = this._url,
                    path = this[pathPropName(operationName)];
                if (!path)
                    return url + "/" + encodeURIComponent(key);
                if ($.isFunction(path))
                    return path(url, key);
                return url + "/" + path + "/" + encodeURIComponent(key)
            }
        })
    })(jQuery, DevExpress);
    /*! Module core, file data.store.custom.js */
    (function($, DX, undefined) {
        var data = DX.data;
        var ERROR_QUERY_NOT_SUPPORTED = "CustomStore does not support creating queries",
            ERROR_MISSING_USER_FUNC = "Required option is not specified or is not a function: ",
            ERROR_INVALID_RETURN = "Invalid return value: ";
        var TOTAL_COUNT = "totalCount",
            LOAD = "load",
            BY_KEY = "byKey",
            INSERT = "insert",
            UPDATE = "update",
            REMOVE = "remove";
        function isPromise(obj) {
            return obj && $.isFunction(obj.done) && $.isFunction(obj.fail) && $.isFunction(obj.promise)
        }
        function trivialPromise(value) {
            return $.Deferred().resolve(value).promise()
        }
        function ensureRequiredFuncOption(name, obj) {
            if (!$.isFunction(obj))
                throw Error(ERROR_MISSING_USER_FUNC + name);
        }
        function throwInvalidUserFuncResult(name) {
            throw Error(ERROR_INVALID_RETURN + name);
        }
        function createUserFuncFailureHandler(pendingDeferred) {
            function errorMessageFromXhr(promiseArguments) {
                var xhr = promiseArguments[0],
                    textStatus = promiseArguments[1];
                if (!xhr || !xhr.getResponseHeader)
                    return null;
                return data.utils.errorMessageFromXhr(xhr, textStatus)
            }
            return function(arg) {
                    var error;
                    if (arg instanceof Error)
                        error = arg;
                    else
                        error = Error(errorMessageFromXhr(arguments) || arg && String(arg) || "Unknown error");
                    pendingDeferred.reject(error)
                }
        }
        data.CustomStore = data.Store.inherit({
            ctor: function(options) {
                options = options || {};
                this.callBase(options);
                this._useDefaultSearch = false;
                this._loadFunc = options[LOAD];
                this._totalCountFunc = options[TOTAL_COUNT];
                this._byKeyFunc = options[BY_KEY] || options.lookup;
                this._insertFunc = options[INSERT];
                this._updateFunc = options[UPDATE];
                this._removeFunc = options[REMOVE]
            },
            createQuery: function() {
                throw Error(ERROR_QUERY_NOT_SUPPORTED);
            },
            _totalCountImpl: function(options) {
                var userFunc = this._totalCountFunc,
                    userResult,
                    d = $.Deferred();
                ensureRequiredFuncOption(TOTAL_COUNT, userFunc);
                userResult = userFunc(options);
                if (!isPromise(userResult)) {
                    userResult = Number(userResult);
                    if (!isFinite(userResult))
                        throwInvalidUserFuncResult(TOTAL_COUNT);
                    userResult = trivialPromise(userResult)
                }
                userResult.done(function(count) {
                    d.resolve(Number(count))
                }).fail(createUserFuncFailureHandler(d));
                return d.promise()
            },
            _loadImpl: function(options) {
                var userFunc = this._loadFunc,
                    userResult,
                    d = $.Deferred();
                ensureRequiredFuncOption(LOAD, userFunc);
                userResult = userFunc(options);
                if ($.isArray(userResult))
                    userResult = trivialPromise(userResult);
                else if (userResult === null || userResult === undefined)
                    userResult = trivialPromise([]);
                else if (!isPromise(userResult))
                    throwInvalidUserFuncResult(LOAD);
                userResult.done(function(data, extra) {
                    d.resolve(data, extra)
                }).fail(createUserFuncFailureHandler(d));
                return this._addFailHandlers(d.promise())
            },
            _byKeyImpl: function(key) {
                var userFunc = this._byKeyFunc,
                    userResult,
                    d = $.Deferred();
                ensureRequiredFuncOption(BY_KEY, userFunc);
                userResult = userFunc(key);
                if (!isPromise(userResult))
                    userResult = trivialPromise(userResult);
                userResult.done(function(obj) {
                    d.resolve(obj)
                }).fail(createUserFuncFailureHandler(d));
                return d.promise()
            },
            _insertImpl: function(values) {
                var userFunc = this._insertFunc,
                    userResult,
                    d = $.Deferred();
                ensureRequiredFuncOption(INSERT, userFunc);
                userResult = userFunc(values);
                if (!isPromise(userResult))
                    userResult = trivialPromise(userResult);
                userResult.done(function(newKey) {
                    d.resolve(values, newKey)
                }).fail(createUserFuncFailureHandler(d));
                return d.promise()
            },
            _updateImpl: function(key, values) {
                var userFunc = this._updateFunc,
                    userResult,
                    d = $.Deferred();
                ensureRequiredFuncOption(UPDATE, userFunc);
                userResult = userFunc(key, values);
                if (!isPromise(userResult))
                    userResult = trivialPromise();
                userResult.done(function() {
                    d.resolve(key, values)
                }).fail(createUserFuncFailureHandler(d));
                return d.promise()
            },
            _removeImpl: function(key) {
                var userFunc = this._removeFunc,
                    userResult,
                    d = $.Deferred();
                ensureRequiredFuncOption(REMOVE, userFunc);
                userResult = userFunc(key);
                if (!isPromise(userResult))
                    userResult = trivialPromise();
                userResult.done(function() {
                    d.resolve(key)
                }).fail(createUserFuncFailureHandler(d));
                return d.promise()
            }
        });
        data.CustomStore_internals = {ERRORS: {
                QUERY_NOT_SUPPORTED: ERROR_QUERY_NOT_SUPPORTED,
                MISSING_USER_FUNC: ERROR_MISSING_USER_FUNC,
                INVALID_RETURN: ERROR_INVALID_RETURN
            }}
    })(jQuery, DevExpress);
    /*! Module core, file data.dataSource.js */
    (function($, DX, undefined) {
        var data = DX.data,
            CustomStore = data.CustomStore,
            Class = DX.Class;
        var storeTypeRegistry = {
                jaydata: "JayDataStore",
                breeze: "BreezeStore",
                odata: "ODataStore",
                local: "LocalStore",
                array: "ArrayStore"
            };
        function normalizeDataSourceOptions(options) {
            var store;
            function createCustomStoreFromLoadFunc() {
                var storeConfig = {};
                $.each(["load", "byKey", "lookup", "totalCount", "insert", "update", "remove"], function() {
                    storeConfig[this] = options[this];
                    delete options[this]
                });
                return new CustomStore(storeConfig)
            }
            function createStoreFromConfig(storeConfig) {
                var storeCtor = data[storeTypeRegistry[storeConfig.type]];
                delete storeConfig.type;
                return new storeCtor(storeConfig)
            }
            function createCustomStoreFromUrl(url) {
                return new CustomStore({load: function() {
                            return $.getJSON(url)
                        }})
            }
            if (typeof options === "string")
                options = createCustomStoreFromUrl(options);
            if (options === undefined)
                options = [];
            if ($.isArray(options) || options instanceof data.Store)
                options = {store: options};
            else
                options = $.extend({}, options);
            store = options.store;
            if ("load" in options)
                store = createCustomStoreFromLoadFunc();
            else if ($.isArray(store))
                store = new data.ArrayStore(store);
            else if ($.isPlainObject(store))
                store = createStoreFromConfig($.extend({}, store));
            options.store = store;
            return options
        }
        function normalizeStoreLoadOptionAccessorArguments(originalArguments) {
            switch (originalArguments.length) {
                case 0:
                    return undefined;
                case 1:
                    return originalArguments[0]
            }
            return $.makeArray(originalArguments)
        }
        function generateStoreLoadOptionAccessor(optionName) {
            return function() {
                    var args = normalizeStoreLoadOptionAccessorArguments(arguments);
                    if (args !== undefined)
                        this._storeLoadOptions[optionName] = args;
                    return this._storeLoadOptions[optionName]
                }
        }
        function addOldUserDataSourceBackwardCompatibilityOptions(dataSource, storeLoadOptions) {
            storeLoadOptions.refresh = !dataSource._paginate || dataSource._pageIndex === 0;
            if (storeLoadOptions.searchValue !== null)
                storeLoadOptions.searchString = storeLoadOptions.searchValue
        }
        var DataSource = Class.inherit({
                ctor: function(options) {
                    options = normalizeDataSourceOptions(options);
                    this._store = options.store;
                    this._storeLoadOptions = this._extractLoadOptions(options);
                    this._mapFunc = options.map;
                    this._postProcessFunc = options.postProcess;
                    this._pageIndex = 0;
                    this._pageSize = options.pageSize !== undefined ? options.pageSize : 20;
                    this._items = [];
                    this._totalCount = -1;
                    this._isLoaded = false;
                    this._loadingCount = 0;
                    this._preferSync = options._preferSync;
                    this._loadQueue = this._createLoadQueue();
                    this._searchValue = "searchValue" in options ? options.searchValue : null;
                    this._searchOperation = options.searchOperation || "contains";
                    this._searchExpr = options.searchExpr;
                    this._paginate = options.paginate;
                    if (this._paginate === undefined)
                        this._paginate = !this.group();
                    this._isLastPage = !this._paginate;
                    this._userData = {};
                    this.changed = $.Callbacks();
                    this.loadError = $.Callbacks();
                    this.loadingChanged = $.Callbacks()
                },
                dispose: function() {
                    this.changed.empty();
                    this.loadError.empty();
                    this.loadingChanged.empty();
                    delete this._store;
                    this._disposed = true
                },
                _extractLoadOptions: function(options) {
                    var result = {},
                        names = ["sort", "filter", "select", "group", "requireTotalCount"],
                        customNames = this._store._customLoadOptions();
                    if (customNames)
                        names = names.concat(customNames);
                    $.each(names, function() {
                        result[this] = options[this]
                    });
                    return result
                },
                loadOptions: function() {
                    return this._storeLoadOptions
                },
                items: function() {
                    return this._items
                },
                pageIndex: function(newIndex) {
                    if (newIndex !== undefined) {
                        this._pageIndex = newIndex;
                        this._isLastPage = !this._paginate
                    }
                    return this._pageIndex
                },
                isLastPage: function() {
                    return this._isLastPage
                },
                sort: generateStoreLoadOptionAccessor("sort"),
                filter: function() {
                    var newFilter = normalizeStoreLoadOptionAccessorArguments(arguments);
                    if (newFilter !== undefined) {
                        this._storeLoadOptions.filter = newFilter;
                        this.pageIndex(0)
                    }
                    return this._storeLoadOptions.filter
                },
                group: generateStoreLoadOptionAccessor("group"),
                select: generateStoreLoadOptionAccessor("select"),
                searchValue: function(value) {
                    if (value !== undefined) {
                        this.pageIndex(0);
                        this._searchValue = value
                    }
                    return this._searchValue
                },
                searchOperation: function(op) {
                    if (op !== undefined) {
                        this.pageIndex(0);
                        this._searchOperation = op
                    }
                    return this._searchOperation
                },
                searchExpr: function(expr) {
                    var argc = arguments.length;
                    if (argc) {
                        if (argc > 1)
                            expr = $.makeArray(arguments);
                        this.pageIndex(0);
                        this._searchExpr = expr
                    }
                    return this._searchExpr
                },
                store: function() {
                    return this._store
                },
                key: function() {
                    return this._store && this._store.key()
                },
                totalCount: function() {
                    return this._totalCount
                },
                isLoaded: function() {
                    return this._isLoaded
                },
                isLoading: function() {
                    return this._loadingCount > 0
                },
                _createLoadQueue: function() {
                    return DX.createQueue()
                },
                _changeLoadingCount: function(increment) {
                    var oldLoading = this.isLoading(),
                        newLoading;
                    this._loadingCount += increment;
                    newLoading = this.isLoading();
                    if (oldLoading ^ newLoading)
                        this.loadingChanged.fire(newLoading)
                },
                _scheduleLoadCallbacks: function(deferred) {
                    var thisSource = this;
                    thisSource._changeLoadingCount(1);
                    deferred.always(function() {
                        thisSource._changeLoadingCount(-1)
                    })
                },
                _scheduleChangedCallbacks: function(deferred) {
                    var self = this;
                    deferred.done(function() {
                        self.changed.fire()
                    })
                },
                load: function() {
                    var thisSource = this,
                        d = $.Deferred(),
                        errorCallback = this.loadError,
                        storeLoadOptions;
                    this._scheduleLoadCallbacks(d);
                    this._scheduleChangedCallbacks(d);
                    storeLoadOptions = this._createStoreLoadOptions();
                    function loadTask() {
                        if (thisSource._disposed)
                            return undefined;
                        return thisSource._loadFromStore(storeLoadOptions, d)
                    }
                    this._loadQueue.add(function() {
                        loadTask();
                        return d.promise()
                    }, function() {
                        thisSource._changeLoadingCount(-1)
                    });
                    return d.promise().fail($.proxy(errorCallback.fire, errorCallback))
                },
                _addSearchOptions: function(storeLoadOptions) {
                    if (this._disposed)
                        return;
                    if (this.store()._useDefaultSearch)
                        this._addSearchFilter(storeLoadOptions);
                    else {
                        storeLoadOptions.searchValue = this._searchValue;
                        storeLoadOptions.searchExpr = this._searchExpr
                    }
                },
                _createStoreLoadOptions: function() {
                    var result = $.extend({}, this._storeLoadOptions);
                    this._addSearchOptions(result);
                    if (this._paginate) {
                        result.pageIndex = this._pageIndex;
                        if (this._pageSize) {
                            result.skip = this._pageIndex * this._pageSize;
                            result.take = this._pageSize
                        }
                    }
                    result.userData = this._userData;
                    addOldUserDataSourceBackwardCompatibilityOptions(this, result);
                    return result
                },
                _addSearchFilter: function(storeLoadOptions) {
                    var value = this._searchValue,
                        op = this._searchOperation,
                        selector = this._searchExpr,
                        searchFilter = [];
                    if (!value)
                        return;
                    if (!selector)
                        selector = "this";
                    if (!$.isArray(selector))
                        selector = [selector];
                    $.each(selector, function(i, item) {
                        if (searchFilter.length)
                            searchFilter.push("or");
                        searchFilter.push([item, op, value])
                    });
                    if (storeLoadOptions.filter)
                        storeLoadOptions.filter = [searchFilter, storeLoadOptions.filter];
                    else
                        storeLoadOptions.filter = searchFilter
                },
                _loadFromStore: function(storeLoadOptions, pendingDeferred) {
                    var thisSource = this;
                    function handleSuccess(data, extra) {
                        function processResult() {
                            thisSource._processStoreLoadResult(data, extra, storeLoadOptions, pendingDeferred)
                        }
                        if (thisSource._preferSync)
                            processResult();
                        else
                            DX.utils.executeAsync(processResult)
                    }
                    return this.store().load(storeLoadOptions).done(handleSuccess).fail($.proxy(pendingDeferred.reject, pendingDeferred))
                },
                _processStoreLoadResult: function(data, extra, storeLoadOptions, pendingDeferred) {
                    var thisSource = this;
                    function resolvePendingDeferred() {
                        thisSource._isLoaded = true;
                        thisSource._totalCount = isFinite(extra.totalCount) ? extra.totalCount : -1;
                        return pendingDeferred.resolve(data, extra)
                    }
                    function proceedLoadingTotalCount() {
                        thisSource.store().totalCount(storeLoadOptions).done(function(count) {
                            extra.totalCount = count;
                            resolvePendingDeferred()
                        }).fail(function(){})
                    }
                    if (thisSource._disposed)
                        return;
                    data = thisSource._transformLoadedData(data);
                    if (!$.isPlainObject(extra))
                        extra = {};
                    thisSource._items = data;
                    if (!data.length || !thisSource._paginate || thisSource._pageSize && data.length < thisSource._pageSize)
                        thisSource._isLastPage = true;
                    if (storeLoadOptions.requireTotalCount && !isFinite(extra.totalCount))
                        proceedLoadingTotalCount();
                    else
                        resolvePendingDeferred()
                },
                _transformLoadedData: function(data) {
                    var result = $.makeArray(data);
                    if (this._mapFunc)
                        result = $.map(result, this._mapFunc);
                    if (this._postProcessFunc)
                        result = this._postProcessFunc(result);
                    return result
                }
            });
        data.Store.redefine({toDataSource: function(options) {
                DX.utils.logger.warn("toDataSource() method is deprecated, use 'new DevExpress.data.DataSource(...)' instead");
                return new DataSource($.extend({store: this}, options))
            }});
        $.extend(true, data, {
            DataSource: DataSource,
            createDataSource: function(options) {
                DX.utils.logger.warn("createDataSource() method is deprecated, use 'new DevExpress.data.DataSource(...)' instead");
                return new DataSource(options)
            },
            utils: {
                storeTypeRegistry: storeTypeRegistry,
                normalizeDataSourceOptions: normalizeDataSourceOptions
            }
        })
    })(jQuery, DevExpress);
    /*! Module core, file social.js */
    DevExpress.social = {};
    /*! Module core, file facebook.js */
    (function($, DX, undefined) {
        function notifyDeprecated() {
            DX.utils.logger.warn("DevExpress.social API is deprecated. Use official Facebook library instead")
        }
        var social = DX.social;
        var location = window.location,
            navigator = window.navigator,
            encodeURIComponent = window.encodeURIComponent,
            decodeURIComponent = window.decodeURIComponent,
            iosStandaloneMode = navigator.standalone,
            cordovaMode = false;
        if (window.cordova)
            $(document).on("deviceready", function() {
                cordovaMode = true
            });
        var ACCESS_TOKEN_KEY = "dx-facebook-access-token",
            IOS_STANDALONE_STEP1_KEY = "dx-facebook-step1",
            IOS_STANDALONE_STEP2_KEY = "dx-facebook-step2";
        var accessToken = null,
            expires = null,
            connectionChanged = $.Callbacks();
        var pendingLoginRedirectUrl;
        var isConnected = function() {
                return !!accessToken
            };
        var getAccessTokenObject = function() {
                return {
                        accessToken: accessToken,
                        expiresIn: accessToken ? expires : 0
                    }
            };
        var FB = social.Facebook = {
                loginRedirectUrl: "FacebookLoginCallback.html",
                connectionChanged: connectionChanged,
                isConnected: isConnected,
                getAccessTokenObject: getAccessTokenObject,
                jsonp: false
            };
        var login = function(appId, options) {
                notifyDeprecated();
                options = options || {};
                if (cordovaMode)
                    pendingLoginRedirectUrl = "https://www.facebook.com/connect/login_success.html";
                else
                    pendingLoginRedirectUrl = formatLoginRedirectUrl();
                var scope = (options.permissions || []).join(),
                    url = "https://www.facebook.com/dialog/oauth?display=popup&client_id=" + appId + "&redirect_uri=" + encodeURIComponent(pendingLoginRedirectUrl) + "&scope=" + encodeURIComponent(scope) + "&response_type=token";
                if (iosStandaloneMode)
                    putData(IOS_STANDALONE_STEP1_KEY, location.href);
                if (cordovaMode)
                    startLogin_cordova(url);
                else
                    startLogin_browser(url)
            };
        var formatLoginRedirectUrl = function() {
                var pathSegments = location.pathname.split(/\//g);
                pathSegments.pop();
                pathSegments.push(FB.loginRedirectUrl);
                return location.protocol + "//" + location.host + pathSegments.join("/")
            };
        var startLogin_browser = function(loginUrl) {
                var width = 512,
                    height = 320,
                    left = (screen.width - width) / 2,
                    top = (screen.height - height) / 2;
                window.open(loginUrl, null, "width=" + width + ",height=" + height + ",toolbar=0,scrollbars=0,status=0,resizable=0,menuBar=0,left=" + left + ",top=" + top)
            };
        var startLogin_cordova = function(loginUrl) {
                var ref = window.open(loginUrl, "_blank");
                ref.addEventListener('exit', function(event) {
                    pendingLoginRedirectUrl = null
                });
                ref.addEventListener('loadstop', function(event) {
                    var url = unescape(event.url);
                    if (url.indexOf(pendingLoginRedirectUrl) === 0) {
                        ref.close();
                        _processLoginRedirectUrl(url)
                    }
                })
            };
        var handleLoginRedirect = function() {
                var opener = window.opener;
                if (iosStandaloneMode) {
                    putData(IOS_STANDALONE_STEP2_KEY, location.href);
                    location.href = getData(IOS_STANDALONE_STEP1_KEY)
                }
                else if (opener && opener.DevExpress) {
                    opener.DevExpress.social.Facebook._processLoginRedirectUrl(location.href);
                    window.close()
                }
            };
        var _processLoginRedirectUrl = function(url) {
                var params = parseUrlFragment(url);
                expires = params.expires_in;
                changeToken(params.access_token);
                pendingLoginRedirectUrl = null
            };
        var parseUrlFragment = function(url) {
                var hash = url.split("#")[1];
                if (!hash)
                    return {};
                var pairs = hash.split(/&/g),
                    result = {};
                $.each(pairs, function(i) {
                    var splitPair = this.split("=");
                    result[splitPair[0]] = decodeURIComponent(splitPair[1])
                });
                return result
            };
        var logout = function() {
                notifyDeprecated();
                changeToken(null)
            };
        var changeToken = function(value) {
                if (value === accessToken)
                    return;
                accessToken = value;
                putData(ACCESS_TOKEN_KEY, value);
                connectionChanged.fire(!!value)
            };
        var api = function(resource, method, params) {
                notifyDeprecated();
                if (!isConnected())
                    throw Error("Not connected");
                if (typeof method !== "string") {
                    params = method;
                    method = undefined
                }
                method = (method || "get").toLowerCase();
                var d = $.Deferred();
                var args = arguments;
                $.ajax({
                    url: "https://graph.facebook.com/" + resource,
                    type: method,
                    data: $.extend({access_token: accessToken}, params),
                    dataType: FB.jsonp && method === "get" ? "jsonp" : "json"
                }).done(function(response) {
                    response = response || simulateErrorResponse();
                    if (response.error)
                        d.reject(response.error);
                    else
                        d.resolve(response)
                }).fail(function(xhr) {
                    var response;
                    try {
                        response = $.parseJSON(xhr.responseText);
                        var tries = args[3] || 0;
                        if (tries++ < 3 && response.error.code == 190 && response.error.error_subcode == 466) {
                            setTimeout(function() {
                                api(resource, method, params, tries).done(function(result) {
                                    d.resolve(result)
                                }).fail(function(error) {
                                    d.reject(error)
                                })
                            }, 500);
                            return
                        }
                    }
                    catch(x) {
                        response = simulateErrorResponse()
                    }
                    d.reject(response.error)
                });
                return d.promise()
            };
        var simulateErrorResponse = function() {
                return {error: {message: "Unknown error"}}
            };
        var ensureStorageBackend = function() {
                if (!hasStorageBackend())
                    throw Error("HTML5 sessionStorage or jQuery.cookie plugin is required");
            };
        var hasStorageBackend = function() {
                return !!($.cookie || window.sessionStorage)
            };
        var putData = function(key, data) {
                ensureStorageBackend();
                data = JSON.stringify(data);
                if (window.sessionStorage)
                    if (data === null)
                        sess.removeItem(key);
                    else
                        sessionStorage.setItem(key, data);
                else
                    $.cookie(key, data)
            };
        var getData = function(key) {
                ensureStorageBackend();
                try {
                    return JSON.parse(window.sessionStorage ? sessionStorage.getItem(key) : $.cookie(key))
                }
                catch(x) {
                    return null
                }
            };
        if (hasStorageBackend())
            accessToken = getData(ACCESS_TOKEN_KEY);
        if (iosStandaloneMode) {
            var url = getData(IOS_STANDALONE_STEP2_KEY);
            if (url) {
                _processLoginRedirectUrl(url);
                putData(IOS_STANDALONE_STEP1_KEY, null);
                putData(IOS_STANDALONE_STEP2_KEY, null)
            }
        }
        $.extend(FB, {
            login: login,
            logout: logout,
            handleLoginRedirect: handleLoginRedirect,
            _processLoginRedirectUrl: _processLoginRedirectUrl,
            api: api
        })
    })(jQuery, DevExpress);
    /*! Module core, file ui.js */
    (function($, DX, undefined) {
        var ui = DX.ui = {};
        var IOS7_APP_BAR_HEIGHT = "20px";
        var initViewport = function(options) {
                options = $.extend({}, options);
                var device = DX.devices.current();
                var allowZoom = options.allowZoom,
                    allowPan = options.allowPan,
                    allowSelection = "allowSelection" in options ? options.allowSelection : device.platform == "desktop";
                DX.overlayTargetContainer(".dx-viewport");
                var metaSelector = "meta[name=viewport]";
                if (!$(metaSelector).length)
                    $("<meta />").attr("name", "viewport").appendTo("head");
                var metaVerbs = ["width=device-width"],
                    msTouchVerbs = [];
                if (allowZoom)
                    msTouchVerbs.push("pinch-zoom");
                else
                    metaVerbs.push("initial-scale=1.0", "maximum-scale=1.0, user-scalable=no");
                if (allowPan)
                    msTouchVerbs.push("pan-x", "pan-y");
                if (!allowPan && !allowZoom)
                    $("html, body").css("overflow", "hidden");
                else
                    $("html").css("-ms-overflow-style", "-ms-autohiding-scrollbar");
                if (!allowSelection) {
                    if (DX.devices.real.ios)
                        $(document).on("selectstart", function() {
                            return false
                        });
                    $(".dx-viewport").css("user-select", "none")
                }
                $(metaSelector).attr("content", metaVerbs.join());
                $("html").css("-ms-touch-action", msTouchVerbs.join(" ") || "none");
                if (DX.support.touch)
                    $(document).off(".dxInitViewport").on("touchmove.dxInitViewport", function(e) {
                        var count = e.originalEvent.touches.length,
                            zoomDisabled = !allowZoom && count > 1,
                            panDisabled = !allowPan && count === 1 && !e.isScrollingEvent;
                        if (zoomDisabled || panDisabled)
                            e.preventDefault()
                    });
                if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                    $(document.head).append($("<style/>").text("@-ms-viewport{ width: auto!important; user-zoom: fixed; max-zoom: 1; min-zoom: 1; }"));
                    $(window).bind("load resize", function(e) {
                        var TOP_BAR_W = 44,
                            TOP_BAR_H = 21,
                            ADDRESS_BAR_H = 72;
                        var isStandalone = 'Notify' in window.external;
                        var barWidth = isStandalone ? TOP_BAR_W : 0,
                            barHeight = isStandalone ? TOP_BAR_H : ADDRESS_BAR_H;
                        var actualHeight = $(window).width() < $(window).height() ? Math.round(screen.availHeight * (document.body.clientWidth / screen.availWidth)) - barHeight : Math.round(screen.availWidth * (document.body.clientHeight / screen.availHeight)) - barWidth;
                        document.body.style.setProperty("min-height", actualHeight + "px", "important")
                    })
                }
                var realDevice = DX.devices.real;
                if (realDevice.ios) {
                    var isPhoneGap = document.location.protocol == "file:";
                    if (isPhoneGap && realDevice.version[0] > 6) {
                        $(".dx-viewport").css("position", "relative");
                        $("body").css({
                            "box-sizing": "border-box",
                            "padding-top": IOS7_APP_BAR_HEIGHT
                        });
                        var setDeviceHeight = function() {
                                var deviceHeight = "height=device-" + (Math.abs(window.orientation) === 90 ? "width" : "height");
                                $(metaSelector).attr("content", metaVerbs.join() + "," + deviceHeight)
                            };
                        $(window).on("orientationchange", setDeviceHeight);
                        setDeviceHeight()
                    }
                    else
                        $(window).on("resize", function(e) {
                            var windowWidth = $(window).width();
                            setTimeout(function() {
                                $("body").width(windowWidth)
                            }, 0)
                        })
                }
            };
        var TemplateProvider = DX.Class.inherit({
                getTemplateClass: function() {
                    return Template
                },
                supportDefaultTemplate: function() {
                    return false
                },
                getDefaultTemplate: function() {
                    return null
                }
            });
        var Template = DX.Class.inherit({
                ctor: function(element) {
                    this._template = this._element = $(element).detach()
                },
                render: function(container) {
                    var renderedTemplate = this._template.clone();
                    container.append(renderedTemplate);
                    return renderedTemplate
                },
                dispose: $.noop
            });
        DX.registerActionExecutor({
            designMode: {validate: function(e) {
                    if (DX.designMode)
                        e.canceled = true
                }},
            gesture: {validate: function(e) {
                    if (!e.args.length)
                        return;
                    var args = e.args[0],
                        element = args.itemElement || args.element;
                    while (element && element.length) {
                        if (element.data("dxGesture")) {
                            e.canceled = true;
                            break
                        }
                        element = element.parent()
                    }
                }},
            disabled: {validate: function(e) {
                    if (!e.args.length)
                        return;
                    var args = e.args[0],
                        element = args.itemElement || args.element;
                    if (element && element.is(".dx-state-disabled, .dx-state-disabled *"))
                        e.canceled = true
                }}
        });
        $.extend(ui, {
            TemplateProvider: TemplateProvider,
            Template: Template,
            initViewport: initViewport
        });
        ui.__internals = {Template: Template}
    })(jQuery, DevExpress);
    /*! Module core, file ui.events.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            eventNS = $.event,
            specialNS = eventNS.special,
            EVENT_SOURCES_REGEX = {
                mouse: /mouse/i,
                touch: /^touch/i,
                keyboard: /^key/i,
                pointer: /pointer/i
            };
        var eventSource = function(e) {
                var result = "other";
                $.each(EVENT_SOURCES_REGEX, function(key) {
                    if (this.test(e.type)) {
                        result = key;
                        return false
                    }
                });
                return result
            };
        var isPointerEvent = function(e) {
                return eventSource(e) === "pointer"
            };
        var isMouseEvent = function(e) {
                return eventSource(e) === "mouse" || isPointerEvent(e) && e.pointerType === "mouse"
            };
        var isTouchEvent = function(e) {
                return eventSource(e) === "touch" || isPointerEvent(e) && e.pointerType === "touch"
            };
        var isKeyboardEvent = function(e) {
                return eventSource(e) === "keyboard"
            };
        var addNamespace = function(eventNames, namespace) {
                if (!namespace)
                    throw Error("Namespace is not defined");
                if (typeof eventNames === "string")
                    return addNamespace(eventNames.split(/\s+/g), namespace);
                $.each(eventNames, function(index, eventName) {
                    eventNames[index] = eventName + "." + namespace
                });
                return eventNames.join(" ")
            };
        var eventData = function(e) {
                if (isPointerEvent(e) && isTouchEvent(e)) {
                    var touch = (e.originalEvent.originalEvent || e.originalEvent).changedTouches[0];
                    return {
                            x: touch.pageX,
                            y: touch.pageY,
                            time: e.timeStamp
                        }
                }
                if (isMouseEvent(e))
                    return {
                            x: e.pageX,
                            y: e.pageY,
                            time: e.timeStamp
                        };
                if (isTouchEvent(e)) {
                    var touch = (e.changedTouches || e.originalEvent.changedTouches)[0];
                    return {
                            x: touch.pageX,
                            y: touch.pageY,
                            time: e.timeStamp
                        }
                }
            };
        var eventDelta = function(from, to) {
                return {
                        x: to.x - from.x,
                        y: to.y - from.y,
                        time: to.time - from.time || 1
                    }
            };
        var hasTouches = function(e) {
                if (isMouseEvent(e) || isPointerEvent(e))
                    return 0;
                if (isTouchEvent(e))
                    return e.originalEvent.touches.length
            };
        var needSkipEvent = function(e) {
                var $target = $(e.target),
                    touchInInput = $target.is("input, textarea, select");
                if (isMouseEvent(e))
                    return touchInInput || e.which > 1;
                if (isTouchEvent(e))
                    return touchInInput && $target.is(":focus") || (e.originalEvent.changedTouches || e.originalEvent.originalEvent.changedTouches).length !== 1
            };
        var createEvent = function(sourceEvent, props) {
                var event = $.Event(sourceEvent, props),
                    originalEvent = event.originalEvent,
                    propNames = $.event.props.slice();
                if (isMouseEvent(sourceEvent) || isTouchEvent(sourceEvent))
                    $.merge(propNames, $.event.mouseHooks.props);
                if (isKeyboardEvent(sourceEvent))
                    $.merge(propNames, $.event.keyHooks.props);
                if (originalEvent)
                    $.each(propNames, function() {
                        event[this] = originalEvent[this]
                    });
                return event
            };
        var fireEvent = function(props) {
                var event = createEvent(props.originalEvent, props);
                $.event.trigger(event, null, props.target || event.target);
                return event
            };
        var handleGestureEvent = function(e, type) {
                var gestureEvent = $(e.target).data("dxGestureEvent");
                if (!gestureEvent || gestureEvent === type) {
                    $(e.target).data("dxGestureEvent", type);
                    return true
                }
                return false
            };
        var registerEvent = function(eventName, eventObject) {
                var strategy = {};
                if ("noBubble" in eventObject)
                    strategy.noBubble = eventObject.noBubble;
                if ("bindType" in eventObject)
                    strategy.bindType = eventObject.bindType;
                if ("delegateType" in eventObject)
                    strategy.delegateType = eventObject.delegateType;
                $.each(["setup", "teardown", "add", "remove", "trigger", "handle", "_default", "dispose"], function(_, methodName) {
                    if (!eventObject[methodName])
                        return;
                    strategy[methodName] = function() {
                        var args = $.makeArray(arguments);
                        args.unshift(this);
                        return eventObject[methodName].apply(eventObject, args)
                    }
                });
                specialNS[eventName] = strategy
            };
        ui.events = {
            eventSource: eventSource,
            isPointerEvent: isPointerEvent,
            isMouseEvent: isMouseEvent,
            isTouchEvent: isTouchEvent,
            isKeyboardEvent: isKeyboardEvent,
            addNamespace: addNamespace,
            hasTouches: hasTouches,
            eventData: eventData,
            eventDelta: eventDelta,
            needSkipEvent: needSkipEvent,
            createEvent: createEvent,
            fireEvent: fireEvent,
            handleGestureEvent: handleGestureEvent,
            registerEvent: registerEvent
        }
    })(jQuery, DevExpress);
    /*! Module core, file ui.component.js */
    (function($, DX, undefined) {
        var COMPONENT_NAMES_DATA_KEY = "dxComponents",
            ui = DX.ui,
            dataUtils = DX.data.utils;
        var Component = DX.Class.inherit({
                NAME: null,
                _defaultOptions: function() {
                    return {disabled: false}
                },
                _optionsByReference: function() {
                    return {}
                },
                ctor: function(element, options) {
                    if (!this.NAME)
                        throw Error("NAME is not specified");
                    this._$element = $(element);
                    this._element().data(this.NAME, this);
                    if (!this._element().data(COMPONENT_NAMES_DATA_KEY))
                        this._element().data(COMPONENT_NAMES_DATA_KEY, []);
                    this._element().data(COMPONENT_NAMES_DATA_KEY).push(this.NAME);
                    this._options = {};
                    this._updateLockCount = 0;
                    this._requireRefresh = false;
                    this.optionChanged = $.Callbacks();
                    this.disposing = $.Callbacks();
                    this.beginUpdate();
                    try {
                        var device = DX.devices.current(),
                            optionsByDevice = ui.optionsByDevice(device, this.NAME) || {};
                        this.option(this._defaultOptions());
                        this.option(optionsByDevice);
                        this._initOptions(options || {})
                    }
                    finally {
                        this.endUpdate()
                    }
                },
                _initOptions: function(options) {
                    this.option(options)
                },
                _optionValuesEqual: function(name, oldValue, newValue) {
                    oldValue = dataUtils.toComparable(oldValue, true);
                    newValue = dataUtils.toComparable(newValue, true);
                    if (oldValue && newValue && oldValue.jquery && newValue.jquery)
                        return newValue.is(oldValue);
                    if (oldValue === null || typeof oldValue !== "object")
                        return oldValue === newValue;
                    return false
                },
                _init: $.noop,
                _render: $.noop,
                _clean: $.noop,
                _modelByElement: $.noop,
                _invalidate: function() {
                    if (!this._updateLockCount)
                        throw Error("Invalidate called outside update transaction");
                    this._requireRefresh = true
                },
                _refresh: function() {
                    this._clean();
                    this._render()
                },
                _dispose: function() {
                    this._clean();
                    this.optionChanged.empty();
                    this.disposing.fireWith(this).empty()
                },
                _createAction: function(actionSource, config) {
                    var self = this;
                    config = $.extend({}, config);
                    var element = config.element || self._element(),
                        model = self._modelByElement(element);
                    config.context = model || self;
                    config.component = self;
                    var action = new DX.Action(actionSource, config);
                    return function(e) {
                            if (!arguments.length)
                                e = {};
                            if (e instanceof $.Event)
                                throw Error("Action must be executed with jQuery.Event like action({ jQueryEvent: event })");
                            if (!$.isPlainObject(e))
                                e = {actionValue: e};
                            return action.execute.call(action, $.extend(e, {
                                    component: self,
                                    element: element,
                                    model: model
                                }))
                        }
                },
                _createActionByOption: function(optionName, config) {
                    if (typeof optionName !== "string")
                        throw Error("Option name type is unexpected");
                    return this._createAction(this.option(optionName), config)
                },
                _optionChanged: function(name, value, prevValue){},
                _element: function() {
                    return this._$element
                },
                instance: function() {
                    return this
                },
                beginUpdate: function() {
                    this._updateLockCount++
                },
                endUpdate: function() {
                    this._updateLockCount--;
                    if (!this._updateLockCount)
                        if (!this._initializing && !this._initialized) {
                            this._initializing = true;
                            try {
                                this._init()
                            }
                            finally {
                                this._initializing = false;
                                this._initialized = true
                            }
                            this._render()
                        }
                        else if (this._requireRefresh) {
                            this._requireRefresh = false;
                            this._refresh()
                        }
                },
                option: function(options) {
                    var self = this,
                        name = options,
                        value = arguments[1];
                    if (arguments.length < 2 && $.type(name) !== "object")
                        return dataUtils.compileGetter(name)(self._options, {functionsAsIs: true});
                    if (typeof name === "string") {
                        options = {};
                        options[name] = value
                    }
                    self.beginUpdate();
                    try {
                        $.each(options, function(name, value) {
                            var prevValue = dataUtils.compileGetter(name)(self._options, {functionsAsIs: true}),
                                topLevelName;
                            if (self._optionValuesEqual(name, prevValue, value))
                                return;
                            dataUtils.compileSetter(name)(self._options, value, {
                                functionsAsIs: true,
                                merge: !self._optionsByReference()[name]
                            });
                            topLevelName = name.split(/[.\[]/)[0];
                            if (self._initialized) {
                                self.optionChanged.fireWith(self, [topLevelName, value, prevValue]);
                                self._optionChanged(topLevelName, value, prevValue)
                            }
                        })
                    }
                    finally {
                        self.endUpdate()
                    }
                }
            });
        var registerComponent = function(name, componentClass) {
                ui[name] = componentClass;
                componentClass.prototype.NAME = name;
                $.fn[name] = function(options) {
                    var isMemberInvoke = typeof options === "string",
                        result = this;
                    if (isMemberInvoke) {
                        var memberName = options,
                            memberArgs = $.makeArray(arguments).slice(1);
                        this.each(function() {
                            var instance = $(this).data(name);
                            if (!instance)
                                throw Error(DX.utils.stringFormat("Component {0} has not been initialized on this element", name));
                            var member = instance[memberName],
                                memberValue = member.apply(instance, memberArgs);
                            if (memberValue !== undefined) {
                                result = memberValue;
                                return false
                            }
                        })
                    }
                    else
                        this.each(function() {
                            var instance = $(this).data(name);
                            if (instance)
                                instance.option(options);
                            else
                                new componentClass(this, options)
                        });
                    return result
                }
            };
        var getComponents = function(element) {
                element = $(element);
                var names = element.data(COMPONENT_NAMES_DATA_KEY);
                if (!names)
                    return [];
                return $.map(names, function(name) {
                        return element.data(name)
                    })
            };
        var disposeComponents = function() {
                $.each(getComponents(this), function() {
                    this._dispose()
                })
            };
        var originalCleanData = $.cleanData;
        $.cleanData = function(element) {
            $.each(element, disposeComponents);
            return originalCleanData.apply(this, arguments)
        };
        $.extend(ui, {
            Component: Component,
            registerComponent: registerComponent
        })
    })(jQuery, DevExpress);
    /*! Module core, file ui.knockoutIntegration.js */
    (function($, DX, undefined) {
        var ko = window.ko;
        if (!DX.support.hasKo)
            return;
        (function checkKnockoutVersion(version) {
            version = version.split(".");
            if (version[0] < 2 || version[0] == 2 && version[1] < 3)
                throw Error("Your version of KnockoutJS is too old. Please upgrade KnockoutJS to 2.3.0 or later.");
        })(ko.version);
        var ui = DX.ui,
            events = ui.events,
            LOCKS_DATA_KEY = "dxKoLocks",
            CREATED_WITH_KO_DATA_KEY = "dxKoCreation";
        var Locks = function() {
                var info = {};
                var currentCount = function(lockName) {
                        return info[lockName] || 0
                    };
                return {
                        obtain: function(lockName) {
                            info[lockName] = currentCount(lockName) + 1
                        },
                        release: function(lockName) {
                            var count = currentCount(lockName);
                            if (count < 1)
                                throw Error("Not locked");
                            if (count === 1)
                                delete info[lockName];
                            else
                                info[lockName] = count - 1
                        },
                        locked: function(lockName) {
                            return currentCount(lockName) > 0
                        }
                    }
            };
        var registerComponentKoBinding = function(componentName) {
                ko.bindingHandlers[componentName] = {init: function(domNode, valueAccessor) {
                        var element = $(domNode),
                            ctorOptions = {},
                            optionNameToModelMap = {};
                        var applyModelValueToOption = function(optionName, modelValue) {
                                var component = element.data(componentName),
                                    locks = element.data(LOCKS_DATA_KEY),
                                    optionValue = ko.utils.unwrapObservable(modelValue);
                                if (!component) {
                                    ctorOptions[optionName] = optionValue;
                                    if (ko.isWriteableObservable(modelValue))
                                        optionNameToModelMap[optionName] = modelValue
                                }
                                else {
                                    if (locks.locked(optionName))
                                        return;
                                    locks.obtain(optionName);
                                    try {
                                        component.option(optionName, optionValue)
                                    }
                                    finally {
                                        locks.release(optionName)
                                    }
                                }
                            };
                        var handleOptionChanged = function(optionName, optionValue) {
                                if (!(optionName in optionNameToModelMap))
                                    return;
                                var element = this._$element,
                                    locks = element.data(LOCKS_DATA_KEY);
                                if (locks.locked(optionName))
                                    return;
                                locks.obtain(optionName);
                                try {
                                    optionNameToModelMap[optionName](optionValue)
                                }
                                finally {
                                    locks.release(optionName)
                                }
                            };
                        ko.computed(function() {
                            var cmp = element.data(componentName);
                            if (cmp)
                                cmp.beginUpdate();
                            $.each(ko.unwrap(valueAccessor()), function(modelName, modelValueExpr) {
                                ko.computed(function() {
                                    applyModelValueToOption(modelName, modelValueExpr)
                                }, null, {disposeWhenNodeIsRemoved: domNode})
                            });
                            if (cmp)
                                cmp.endUpdate()
                        }, null, {disposeWhenNodeIsRemoved: domNode});
                        if (ctorOptions) {
                            element.data(CREATED_WITH_KO_DATA_KEY, true);
                            element[componentName](ctorOptions);
                            ctorOptions = null;
                            element.data(LOCKS_DATA_KEY, new Locks);
                            element.data(componentName).optionChanged.add(handleOptionChanged)
                        }
                        return {controlsDescendantBindings: ui[componentName].subclassOf(ui.Widget)}
                    }}
            };
        var KoComponent = ui.Component.inherit({_modelByElement: function(element) {
                    if (element.length)
                        return ko.dataFor(element.get(0))
                }});
        var originalRegisterComponent = ui.registerComponent;
        var registerKoComponent = function(name, componentClass) {
                originalRegisterComponent(name, componentClass);
                registerComponentKoBinding(name)
            };
        var KoTemplate = ui.Template.inherit({
                ctor: function(element) {
                    this.callBase.apply(this, arguments);
                    this._template = $("<div>").append(element);
                    this._registerKoTemplate()
                },
                _cleanTemplateElement: function() {
                    this._element.each(function() {
                        ko.cleanNode(this)
                    })
                },
                _registerKoTemplate: function() {
                    var template = this._template.get(0);
                    new ko.templateSources.anonymousTemplate(template)['nodes'](template)
                },
                render: function(container, data) {
                    data = data !== undefined ? data : ko.dataFor(container.get(0)) || {};
                    var containerBindingContext = ko.contextFor(container[0]);
                    var bindingContext = containerBindingContext ? containerBindingContext.createChildContext(data) : data;
                    var renderBag = $("<div />").appendTo(container);
                    ko.renderTemplate(this._template.get(0), bindingContext, null, renderBag.get(0));
                    var result = renderBag.contents();
                    container.append(result);
                    renderBag.remove();
                    return result
                },
                dispose: function() {
                    this._template.remove()
                }
            });
        var KoTemplateProvider = ui.TemplateProvider.inherit({
                getTemplateClass: function(widget) {
                    return KoTemplate
                },
                supportDefaultTemplate: function(widget) {
                    return this._createdWithKo(widget) ? true : this.callBase(widget)
                },
                getDefaultTemplate: function(widget) {
                    if (this._createdWithKo(widget))
                        return defaultKoTemplate(widget.NAME)
                },
                _createdWithKo: function(widget) {
                    return !!widget._element().data(CREATED_WITH_KO_DATA_KEY)
                }
            });
        ko.bindingHandlers.dxAction = {update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
                var $element = $(element);
                var unwrappedValue = ko.utils.unwrapObservable(valueAccessor()),
                    actionSource = unwrappedValue,
                    actionOptions = {context: element};
                if (unwrappedValue.execute) {
                    actionSource = unwrappedValue.execute;
                    $.extend(actionOptions, unwrappedValue)
                }
                var action = new DX.Action(actionSource, actionOptions);
                $element.off(".dxActionBinding").on("dxclick.dxActionBinding", function(e) {
                    action.execute({
                        element: $element,
                        model: viewModel,
                        evaluate: function(expression) {
                            var context = viewModel;
                            if (expression.length > 0 && expression[0] === "$")
                                context = ko.contextFor(element);
                            var getter = DX.data.utils.compileGetter(expression);
                            return getter(context)
                        },
                        jQueryEvent: e
                    });
                    if (!actionOptions.bubbling)
                        e.stopPropagation()
                })
            }};
        var defaultKoTemplate = function() {
                var cache = {};
                return function(widgetName) {
                        if (!DEFAULT_ITEM_TEMPLATE_GENERATORS[widgetName])
                            widgetName = "base";
                        if (!cache[widgetName]) {
                            var html = DEFAULT_ITEM_TEMPLATE_GENERATORS[widgetName](),
                                markup = DX.utils.createMarkupFromString(html);
                            cache[widgetName] = new KoTemplate(markup)
                        }
                        return cache[widgetName]
                    }
            }();
        var createElementWithBindAttr = function(tagName, bindings, closeTag, additionalProperties) {
                closeTag = closeTag === undefined ? true : closeTag;
                var bindAttr = $.map(bindings, function(value, key) {
                        return key + ":" + value
                    }).join(",");
                additionalProperties = additionalProperties || "";
                return "<" + tagName + " data-bind=\"" + bindAttr + "\" " + additionalProperties + ">" + (closeTag ? "</" + tagName + ">" : "")
            };
        var defaultKoTemplateBasicBindings = {css: "{ 'dx-state-disabled': $data.disabled, 'dx-state-invisible': !($data.visible === undefined || ko.unwrap($data.visible)) }"};
        var DEFAULT_ITEM_TEMPLATE_GENERATORS = {base: function() {
                    var template = [createElementWithBindAttr("div", defaultKoTemplateBasicBindings, false)],
                        htmlBinding = createElementWithBindAttr("div", {html: "html"}),
                        textBinding = createElementWithBindAttr("div", {text: "text"}),
                        primitiveBinding = createElementWithBindAttr("div", {text: "String($data)"});
                    template.push("<!-- ko if: $data.html && !$data.text -->", htmlBinding, "<!-- /ko -->", "<!-- ko if: !$data.html && $data.text -->", textBinding, "<!-- /ko -->", "<!-- ko ifnot: $.isPlainObject($data) -->", primitiveBinding, "<!-- /ko -->", "</div>");
                    return template.join("")
                }};
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxPivotTabs = function() {
            var template = DEFAULT_ITEM_TEMPLATE_GENERATORS.base(),
                titleBinding = createElementWithBindAttr("span", {text: "title"});
            var divInnerStart = template.indexOf(">") + 1,
                divInnerFinish = template.length - 6;
            template = [template.substring(0, divInnerStart), titleBinding, template.substring(divInnerFinish, template.length)];
            return template.join("")
        };
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxPanorama = function() {
            var template = DEFAULT_ITEM_TEMPLATE_GENERATORS.base(),
                headerBinding = createElementWithBindAttr("div", {text: "header"}, true, 'class="dx-panorama-item-header"');
            var divInnerStart = template.indexOf(">") + 1;
            template = [template.substring(0, divInnerStart), "<!-- ko if: $data.header -->", headerBinding, "<!-- /ko -->", template.substring(divInnerStart, template.length)];
            return template.join("")
        };
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxList = function() {
            var template = DEFAULT_ITEM_TEMPLATE_GENERATORS.base(),
                keyBinding = createElementWithBindAttr("div", {text: "key"});
            template = [template.substring(0, template.length - 6), "<!-- ko if: $data.key -->" + keyBinding + "<!-- /ko -->", "</div>"];
            return template.join("")
        };
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxToolbar = function() {
            var template = DEFAULT_ITEM_TEMPLATE_GENERATORS.base();
            template = [template.substring(0, template.length - 6), "<!-- ko if: $data.widget -->"];
            $.each(["button", "tabs", "dropDownMenu"], function() {
                var bindingName = DX.inflector.camelize(["dx", "-", this].join("")),
                    bindingObj = {};
                bindingObj[bindingName] = "$data.options";
                template.push("<!-- ko if: $data.widget === '", this, "' -->", createElementWithBindAttr("div", bindingObj), "<!-- /ko -->")
            });
            template.push("<!-- /ko -->");
            return template.join("")
        };
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxGallery = function() {
            var template = DEFAULT_ITEM_TEMPLATE_GENERATORS.base(),
                primitiveBinding = createElementWithBindAttr("div", {text: "String($data)"}),
                imgBinding = createElementWithBindAttr("img", {attr: "{ src: String($data) }"}, false);
            template = template.replace(primitiveBinding, imgBinding);
            return template
        };
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxTabs = function() {
            var template = DEFAULT_ITEM_TEMPLATE_GENERATORS.base(),
                baseTextBinding = createElementWithBindAttr("div", {text: "text"}),
                iconBinding = createElementWithBindAttr("span", {
                    attr: "{ 'class': 'dx-icon-' + $data.icon }",
                    css: "{ 'dx-icon': true }"
                }),
                iconSrcBinding = createElementWithBindAttr("img", {
                    attr: "{ src: $data.iconSrc }",
                    css: "{ 'dx-icon': true }"
                }, false),
                textBinding = "<!-- ko if: $data.icon -->" + iconBinding + "<!-- /ko -->" + "<!-- ko if: !$data.icon && $data.iconSrc -->" + iconSrcBinding + "<!-- /ko -->" + "<span class=\"dx-tab-text\" data-bind=\"text: $data.text\"></span>";
            template = template.replace("<!-- ko if: !$data.html && $data.text -->", "<!-- ko if: !$data.html && ($data.text || $data.icon || $data.iconSrc) -->").replace(baseTextBinding, textBinding);
            return template
        };
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxActionSheet = function() {
            return createElementWithBindAttr("div", {dxButton: "{ text: $data.text, clickAction: $data.clickAction, type: $data.type, disabled: !!ko.unwrap($data.disabled) }"})
        };
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxNavBar = DEFAULT_ITEM_TEMPLATE_GENERATORS.dxTabs;
        var cleanKoData = function(element, andSelf) {
                var cleanNode = function() {
                        ko.cleanNode(this)
                    };
                if (andSelf)
                    element.each(cleanNode);
                else
                    element.find("*").each(cleanNode)
            };
        var originalEmpty = $.fn.empty;
        $.fn.empty = function() {
            cleanKoData(this, false);
            return originalEmpty.apply(this, arguments)
        };
        var originalRemove = $.fn.remove;
        $.fn.remove = function(selector, keepData) {
            if (!keepData) {
                var subject = this;
                if (selector)
                    subject = subject.filter(selector);
                cleanKoData(subject, true)
            }
            return originalRemove.call(this, selector, keepData)
        };
        var originalHtml = $.fn.html;
        $.fn.html = function(value) {
            if (typeof value === "string")
                cleanKoData(this, false);
            return originalHtml.apply(this, arguments)
        };
        $.extend(ui, {
            Component: KoComponent,
            registerComponent: registerKoComponent,
            TemplateProvider: KoTemplateProvider,
            Template: KoTemplate,
            defaultTemplate: defaultKoTemplate
        });
        var originalRegisterEvent = events.registerEvent;
        var registerKoEvent = function(eventName, eventObject) {
                originalRegisterEvent(eventName, eventObject);
                var koBindingEventName = events.addNamespace(eventName, eventName + "Binding");
                ko.bindingHandlers[eventName] = {update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
                        var $element = $(element),
                            unwrappedValue = ko.utils.unwrapObservable(valueAccessor()),
                            eventSource = unwrappedValue.execute ? unwrappedValue.execute : unwrappedValue;
                        $element.off(koBindingEventName).on(koBindingEventName, function(e) {
                            eventSource(viewModel, e)
                        })
                    }}
            };
        $.extend(events, {registerEvent: registerKoEvent})
    })(jQuery, DevExpress);
    /*! Module core, file ui.angularIntegration.js */
    (function($, DX, undefined) {
        if (!DX.support.hasNg)
            return;
        var angular = window.angular,
            ui = DX.ui,
            events = ui.events,
            compileSetter = DX.data.utils.compileSetter,
            compileGetter = DX.data.utils.compileGetter;
        var CREATED_WITH_NG_DATA_KEY = "dxNgCreation",
            TEMPLATES_DATA_KEY = "dxTemplates",
            COMPILER_DATA_KEY = "dxNgCompiler",
            DEFAULT_COMPILER_DATA_KEY = "dxDefaultCompilerGetter",
            ANONYMOUS_TEMPLATE_NAME = "template";
        var phoneJsModule = angular.module("dx", []);
        var ComponentBuilder = DX.Class.inherit({
                ctor: function(options) {
                    this._componentName = options.componentName;
                    this._compile = options.compile;
                    this._$element = options.$element;
                    this._componentDisposing = $.Callbacks();
                    this._$templates = this._extractTemplates()
                },
                init: function(options) {
                    this._scope = options.scope;
                    this._$element = options.$element;
                    this._ngOptions = options.ngOptions;
                    this._$element.data(CREATED_WITH_NG_DATA_KEY, true);
                    if (options.ngOptions.data)
                        this._initDataScope(options.ngOptions.data)
                },
                initDefaultCompilerGetter: function() {
                    var self = this;
                    self._$element.data(DEFAULT_COMPILER_DATA_KEY, function($template) {
                        return self._compilerByTemplate($template)
                    })
                },
                initTemplateCompilers: function() {
                    var self = this;
                    if (this._$templates)
                        this._$templates.each(function(i, template) {
                            $(template).data(COMPILER_DATA_KEY, self._compilerByTemplate(template))
                        })
                },
                initComponentWithBindings: function() {
                    this._initComponent(this._scope);
                    this._initComponentBindings()
                },
                _initDataScope: function(data) {
                    if (typeof data === "string") {
                        var dataStr = data,
                            rootScope = this._scope;
                        data = rootScope.$eval(data);
                        this._scope = rootScope.$new();
                        this._synchronizeDataScopes(rootScope, this._scope, data, dataStr)
                    }
                    $.extend(this._scope, data)
                },
                _synchronizeDataScopes: function(parentScope, childScope, data, parentPrefix) {
                    var self = this;
                    $.each(data, function(fieldPath) {
                        self._synchronizeScopeField({
                            parentScope: parentScope,
                            childScope: childScope,
                            fieldPath: fieldPath,
                            parentPrefix: parentPrefix
                        })
                    })
                },
                _initComponent: function(scope) {
                    this._component = this._$element[this._componentName](this._evalOptions(scope)).data(this._componentName)
                },
                _initComponentBindings: function() {
                    var self = this,
                        optionDependencies = {};
                    if (self._ngOptions.bindingOptions)
                        $.each(self._ngOptions.bindingOptions, function(optionPath, valuePath) {
                            var separatorIndex = optionPath.search(/\[|\./),
                                optionForSubscribe = separatorIndex > -1 ? optionPath.substring(0, separatorIndex) : optionPath;
                            if (!optionDependencies[optionForSubscribe])
                                optionDependencies[optionForSubscribe] = {};
                            optionDependencies[optionForSubscribe][optionPath] = valuePath;
                            var clearWatcher = self._scope.$watch(valuePath, function(newValue, oldValue) {
                                    if (newValue !== oldValue)
                                        self._component.option(optionPath, newValue)
                                }, true);
                            self._component.disposing.add(function() {
                                clearWatcher();
                                self._componentDisposing.fire()
                            })
                        });
                    self._component.optionChanged.add(function(optionName, optionValue) {
                        if (self._scope.$root.$$phase === "$digest" || !optionDependencies || !optionDependencies[optionName])
                            return;
                        safeApply(function(scope) {
                            $.each(optionDependencies[optionName], function(optionPath, valuePath) {
                                var setter = compileSetter(valuePath),
                                    getter = compileGetter(optionPath);
                                var tmpData = {};
                                tmpData[optionName] = optionValue;
                                setter(scope, getter(tmpData))
                            })
                        }, self._scope)
                    })
                },
                _extractTemplates: function() {
                    var $templates;
                    if (ui[this._componentName].subclassOf(ui.Widget) && $.trim(this._$element.html())) {
                        var isAnonymousTemplate = !this._$element.children().first().attr("data-options");
                        if (isAnonymousTemplate)
                            $templates = $("<div/>").attr("data-options", "dxTemplate: { name: '" + ANONYMOUS_TEMPLATE_NAME + "' }").append(this._$element.contents());
                        else
                            $templates = this._$element.children().detach();
                        this._$element.data(TEMPLATES_DATA_KEY, $templates)
                    }
                    return $templates
                },
                _compilerByTemplate: function(template) {
                    var self = this,
                        scopeItemsPath = this._getScopeItemsPath();
                    return function(data, index) {
                            var $resultMarkup = $(template).clone(),
                                templateScope;
                            if (data !== undefined) {
                                var dataIsScope = data.$id,
                                    templateScope = dataIsScope ? data : self._createScopeWithData(data);
                                $resultMarkup.on("$destroy", function() {
                                    var destroyAlreadyCalled = !templateScope.$parent;
                                    if (destroyAlreadyCalled)
                                        return;
                                    templateScope.$destroy()
                                })
                            }
                            else
                                templateScope = self._scope;
                            if (scopeItemsPath)
                                self._synchronizeScopes(templateScope, scopeItemsPath, index);
                            safeApply(self._compile($resultMarkup), templateScope);
                            return $resultMarkup
                        }
                },
                _getScopeItemsPath: function() {
                    if (ui[this._componentName].subclassOf(ui.CollectionContainerWidget) && this._ngOptions.bindingOptions)
                        return this._ngOptions.bindingOptions.items
                },
                _createScopeWithData: function(data) {
                    var newScope = this._scope.$new();
                    if (typeof data === "object")
                        $.extend(newScope, data);
                    else
                        newScope.scopeValue = data;
                    return newScope
                },
                _synchronizeScopes: function(itemScope, parentPrefix, itemIndex) {
                    var self = this,
                        item = compileGetter(parentPrefix + "[" + itemIndex + "]")(this._scope);
                    if (!$.isPlainObject(item))
                        item = {scopeValue: item};
                    $.each(item, function(itemPath) {
                        self._synchronizeScopeField({
                            parentScope: self._scope,
                            childScope: itemScope,
                            fieldPath: itemPath,
                            parentPrefix: parentPrefix,
                            itemIndex: itemIndex
                        })
                    })
                },
                _synchronizeScopeField: function(args) {
                    var parentScope = args.parentScope,
                        childScope = args.childScope,
                        fieldPath = args.fieldPath,
                        parentPrefix = args.parentPrefix,
                        itemIndex = args.itemIndex;
                    var innerPathSuffix = fieldPath === "scopeValue" ? "" : "." + fieldPath,
                        collectionField = itemIndex !== undefined,
                        optionOuterBag = [parentPrefix],
                        optionOuterPath;
                    if (collectionField)
                        optionOuterBag.push("[", itemIndex, "]");
                    optionOuterBag.push(innerPathSuffix);
                    optionOuterPath = optionOuterBag.join("");
                    var clearParentWatcher = parentScope.$watch(optionOuterPath, function(newValue, oldValue) {
                            if (newValue !== oldValue)
                                compileSetter(fieldPath)(childScope, newValue)
                        });
                    var clearItemWatcher = childScope.$watch(fieldPath, function(newValue, oldValue) {
                            if (newValue !== oldValue) {
                                if (collectionField && !compileGetter(parentPrefix)(parentScope)[itemIndex]) {
                                    clearItemWatcher();
                                    return
                                }
                                compileSetter(optionOuterPath)(parentScope, newValue)
                            }
                        });
                    this._componentDisposing.add([clearParentWatcher, clearItemWatcher])
                },
                _evalOptions: function(scope) {
                    var result = $.extend({}, this._ngOptions);
                    delete result.data;
                    delete result.bindingOptions;
                    if (this._ngOptions.bindingOptions)
                        $.each(this._ngOptions.bindingOptions, function(key, value) {
                            result[key] = scope.$eval(value)
                        });
                    return result
                }
            });
        var safeApply = function(func, scope) {
                if (scope.$root.$$phase)
                    func(scope);
                else
                    scope.$apply(function() {
                        func(scope)
                    })
            };
        var NgComponent = ui.Component.inherit({
                _modelByElement: function(element) {
                    if (element.length)
                        return element.scope()
                },
                _createActionByOption: function() {
                    var action = this.callBase.apply(this, arguments);
                    var component = this,
                        wrappedAction = function() {
                            var self = this,
                                scope = component._modelByElement(component._element()),
                                args = arguments;
                            if (!scope || scope.$root.$$phase)
                                return action.apply(self, args);
                            return scope.$apply(function() {
                                    return action.apply(self, args)
                                })
                        };
                    return wrappedAction
                }
            });
        var originalRegisterComponent = ui.registerComponent;
        var registerNgComponent = function(componentName, componentClass) {
                originalRegisterComponent(componentName, componentClass);
                phoneJsModule.directive(componentName, ["$compile", function(compile) {
                        return {
                                restrict: "A",
                                compile: function($element) {
                                    var componentBuilder = new ComponentBuilder({
                                            componentName: componentName,
                                            compile: compile,
                                            $element: $element
                                        });
                                    return function(scope, $element, attrs) {
                                            componentBuilder.init({
                                                scope: scope,
                                                $element: $element,
                                                ngOptions: attrs[componentName] ? scope.$eval(attrs[componentName]) : {}
                                            });
                                            componentBuilder.initTemplateCompilers();
                                            componentBuilder.initDefaultCompilerGetter();
                                            componentBuilder.initComponentWithBindings()
                                        }
                                }
                            }
                    }])
            };
        var NgTemplate = ui.Template.inherit({
                ctor: function() {
                    this.callBase.apply(this, arguments);
                    this._compiler = this._template.data(COMPILER_DATA_KEY)
                },
                render: function(container, data, index) {
                    var compiler = this._compiler,
                        result = $.isFunction(compiler) ? compiler(data, index) : compiler;
                    container.append(result);
                    return result
                },
                setCompiler: function(compilerGetter) {
                    this._compiler = compilerGetter(this._element)
                }
            });
        var NgTemplateProvider = ui.TemplateProvider.inherit({
                getTemplateClass: function(widget) {
                    if (this._createdWithNg(widget))
                        return NgTemplate;
                    return this.callBase(widget)
                },
                supportDefaultTemplate: function(widget) {
                    return this._createdWithNg(widget) ? true : this.callBase(widget)
                },
                getDefaultTemplate: function(widget) {
                    if (this._createdWithNg(widget)) {
                        var compilerGetter = widget._element().data(DEFAULT_COMPILER_DATA_KEY),
                            template = defaultNgTemplate(widget.NAME);
                        template.setCompiler(compilerGetter);
                        return template
                    }
                },
                _createdWithNg: function(widget) {
                    return !!widget._element().data(CREATED_WITH_NG_DATA_KEY)
                }
            });
        var defaultNgTemplate = function() {
                var cache = {};
                return function(widgetName) {
                        if (!DEFAULT_ITEM_TEMPLATE_GENERATORS[widgetName])
                            widgetName = "base";
                        if (!cache[widgetName])
                            cache[widgetName] = DEFAULT_ITEM_TEMPLATE_GENERATORS[widgetName]();
                        return new NgTemplate(cache[widgetName])
                    }
            }();
        var baseElements = {
                container: function() {
                    return $("<div/>").attr("ng-class", "{ 'dx-state-invisible': !visible && visible != undefined, 'dx-state-disabled': !!disabled }").attr("ng-switch", "").attr("on", "html && 'html' || text && 'text' || scopeValue && 'scopeValue'")
                },
                html: function() {
                    return $("<div/>").attr("ng-switch-when", "html").attr("ng-bind-html-unsafe", "html")
                },
                text: function() {
                    return $("<div/>").attr("ng-switch-when", "text").attr("ng-bind", "text")
                },
                primitive: function() {
                    return $("<div/>").attr("ng-switch-when", "scopeValue").attr("ng-bind-html-unsafe", "'' + scopeValue")
                }
            };
        var DEFAULT_ITEM_TEMPLATE_GENERATORS = {base: function() {
                    return baseElements.container().append(baseElements.html()).append(baseElements.text()).append(baseElements.primitive())
                }};
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxList = function() {
            return DEFAULT_ITEM_TEMPLATE_GENERATORS.base().attr("on", "html && 'html' || text && 'text' || scopeValue && 'scopeValue' || key && 'key'").append($("<div/>").attr("ng-switch-when", "key").attr("ng-bind", "key"))
        };
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxToolbar = function() {
            var template = DEFAULT_ITEM_TEMPLATE_GENERATORS.base().attr("on", "html && 'html' || text && 'text' || scopeValue && 'scopeValue' || widget");
            $.each(["button", "tabs", "dropDownMenu"], function(i, widgetName) {
                var bindingName = "dx-" + DX.inflector.dasherize(this);
                $("<div/>").attr("ng-switch-when", widgetName).attr(bindingName, "options").appendTo(template)
            });
            return template
        };
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxGallery = function() {
            return baseElements.container().append(baseElements.html()).append(baseElements.text()).append($("<img/>").attr("ng-switch-when", "scopeValue").attr("ng-src", "{{'' + scopeValue}}"))
        };
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxTabs = function() {
            var container = baseElements.container().attr("on", "html && 'html' ||  icon && 'icon' ||  iconSrc && 'iconSrc' ||  text && 'text' || scopeValue && 'scopeValue'");
            var text = $("<span/>").addClass("dx-tab-text").attr("ng-bind", "text"),
                icon = $("<span/>").attr("ng-switch-when", "icon").addClass("dx-icon").attr("ng-class", "'dx-icon-' + icon").add(text.attr("ng-switch-when", "icon")),
                iconSrc = $("<img/>").attr("ng-switch-when", "iconSrc").addClass("dx-icon").attr("ng-src", "{{iconSrc}}").add(text.attr("ng-switch-when", "iconSrc"));
            return container.append(baseElements.html()).append(icon).append(iconSrc).append(text.attr("ng-switch-when", "text")).append(baseElements.primitive())
        };
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxActionSheet = function() {
            return $("<div/>").attr("dx-button", "{ bindingOptions: { text: 'text', clickAction: 'clickAction', type: 'type', disabled: 'disabled' } }")
        };
        DEFAULT_ITEM_TEMPLATE_GENERATORS.dxNavBar = DEFAULT_ITEM_TEMPLATE_GENERATORS.dxTabs;
        $.extend(ui, {
            Component: NgComponent,
            registerComponent: registerNgComponent,
            Template: NgTemplate,
            TemplateProvider: NgTemplateProvider
        });
        var originalRegisterEvent = events.registerEvent;
        var registerNgEvent = function(eventName, eventObject) {
                originalRegisterEvent(eventName, eventObject);
                var ngEventName = eventName.slice(0, 2) + eventName.charAt(2).toUpperCase() + eventName.slice(3);
                phoneJsModule.directive(ngEventName, ['$parse', function($parse) {
                        return {
                                restrict: "A",
                                compile: function(_, attr) {
                                    var handler = $parse(attr[ngEventName]);
                                    return function(scope, $element) {
                                            $element.on(eventName, function(e) {
                                                scope.$apply(function() {
                                                    handler(scope, {$event: e})
                                                })
                                            })
                                        }
                                }
                            }
                    }])
            };
        $.extend(events, {registerEvent: registerNgEvent})
    })(jQuery, DevExpress);
    /*! Module core, file ui.dialog.js */
    (function($, DX, undefined) {
        var ui = DX.ui;
        var DEFAULT_BUTTON = {
                text: "Ok",
                clickAction: function() {
                    return true
                }
            };
        var DX_DIALOG_CLASSNAME = "dx-dialog",
            DX_DIALOG_WRAPPER_CLASSNAME = DX_DIALOG_CLASSNAME + "-wrapper",
            DX_DIALOG_ROOT_CLASSNAME = DX_DIALOG_CLASSNAME + "-root",
            DX_DIALOG_CONTENT_CLASSNAME = DX_DIALOG_CLASSNAME + "-content",
            DX_DIALOG_MESSAGE_CLASSNAME = DX_DIALOG_CLASSNAME + "-message",
            DX_DIALOG_BUTTONS_CLASSNAME = DX_DIALOG_CLASSNAME + "-buttons",
            DX_DIALOG_BUTTON_CLASSNAME = DX_DIALOG_CLASSNAME + "-button";
        var dialog = function(options) {
                var self = this,
                    result;
                if (!ui.dxPopup)
                    throw new Error("DevExpress.ui.dxPopup required");
                var deferred = $.Deferred();
                options = $.extend(ui.optionsByDevice(DX.devices.current(), "dxDialog"), options);
                var $holder = $(".dx-viewport");
                var $element = $("<div/>").addClass(DX_DIALOG_CLASSNAME).appendTo($holder);
                var $message = $("<div/>").addClass(DX_DIALOG_MESSAGE_CLASSNAME).html(String(options.message));
                var $buttons = $("<div/>").addClass(DX_DIALOG_BUTTONS_CLASSNAME);
                var popupInstance = $element.dxPopup({
                        title: options.title || self.title,
                        height: "auto",
                        width: function() {
                            var isPortrait = $(window).height() > $(window).width(),
                                key = (isPortrait ? "p" : "l") + "Width";
                            return options.hasOwnProperty(key) ? options[key] : options["width"]
                        },
                        contentReadyAction: function() {
                            popupInstance.content().addClass(DX_DIALOG_CONTENT_CLASSNAME).append($message).append($buttons)
                        },
                        animation: {
                            show: {
                                type: "pop",
                                duration: 400
                            },
                            hide: {
                                type: "pop",
                                duration: 400,
                                to: {
                                    opacity: 0,
                                    scale: 0
                                },
                                from: {
                                    opacity: 1,
                                    scale: 1
                                }
                            }
                        }
                    }).data("dxPopup");
                popupInstance._wrapper().addClass(DX_DIALOG_WRAPPER_CLASSNAME);
                if (options.position)
                    popupInstance.option("position", options.position);
                $.each(options.buttons || [DEFAULT_BUTTON], function() {
                    var button = $("<div/>").addClass(DX_DIALOG_BUTTON_CLASSNAME).appendTo($buttons);
                    var action = new DX.Action(this.clickAction, {context: popupInstance});
                    button.dxButton($.extend(this, {clickAction: function() {
                            result = action.execute(arguments);
                            hide()
                        }}))
                });
                popupInstance._wrapper().addClass(DX_DIALOG_ROOT_CLASSNAME);
                function show() {
                    popupInstance.show();
                    return deferred.promise()
                }
                function hide(value) {
                    popupInstance.hide().done(function() {
                        popupInstance._element().remove()
                    });
                    deferred.resolve(result || value)
                }
                return {
                        show: show,
                        hide: hide
                    }
            };
        var alert = function(message, title) {
                var dialogInstance,
                    options = $.isPlainObject(message) ? message : {
                        title: title,
                        message: message
                    };
                dialogInstance = ui.dialog.custom(options);
                return dialogInstance.show()
            };
        var confirm = function(message, title) {
                var dialogInstance,
                    options = $.isPlainObject(message) ? message : {
                        title: title,
                        message: message,
                        buttons: [{
                                text: Globalize.localize("Yes"),
                                clickAction: function() {
                                    return true
                                }
                            }, {
                                text: Globalize.localize("No"),
                                clickAction: function() {
                                    return false
                                }
                            }]
                    };
                dialogInstance = ui.dialog.custom(options);
                return dialogInstance.show()
            };
        var notify = function(message, type, displayTime) {
                var options,
                    instance;
                options = $.isPlainObject(message) ? message : {message: message};
                if (!ui.dxToast) {
                    alert(options.message);
                    return
                }
                if (type)
                    options.type = type;
                if (displayTime)
                    options.displayTime = displayTime;
                instance = $("<div/>").appendTo(".dx-viewport").addClass("dx-static").dxToast(options).data("dxToast");
                instance.option("hiddenAction", function(args) {
                    args.element.remove();
                    new DX.Action(options.hiddenAction, {context: args.model}).execute(arguments)
                });
                instance.show()
            };
        $.extend(ui, {
            notify: notify,
            dialog: {
                custom: dialog,
                alert: alert,
                confirm: confirm
            }
        })
    })(jQuery, DevExpress);
    /*! Module core, file ui.dataHelper.js */
    (function($, DX, undefined) {
        var data = DX.data;
        var DATA_SOURCE_OPTIONS_METHOD = "_dataSourceOptions",
            DATA_SOURCE_CHANGED_METHOD = "_handleDataSourceChanged",
            DATA_SOURCE_LOAD_ERROR_METHOD = "_handleDataSourceLoadError",
            DATA_SOURCE_LOADING_CHANGED_METHOD = "_handleDataSourceLoadingChanged";
        DX.ui.DataHelperMixin = {
            ctor: function() {
                this.disposing.add(function() {
                    this._disposeDataSource()
                })
            },
            _refreshDataSource: function() {
                this._initDataSource();
                this._loadDataSource()
            },
            _initDataSource: function() {
                var dataSourceOptions = this.option("dataSource"),
                    widgetDataSourceOptions,
                    dataSourceType;
                this._disposeDataSource();
                if (dataSourceOptions) {
                    if (dataSourceOptions instanceof data.DataSource) {
                        this._isSharedDataSource = true;
                        this._dataSource = dataSourceOptions
                    }
                    else {
                        widgetDataSourceOptions = DATA_SOURCE_OPTIONS_METHOD in this ? this[DATA_SOURCE_OPTIONS_METHOD]() : {};
                        dataSourceType = this._dataSourceType ? this._dataSourceType() : data.DataSource;
                        this._dataSource = new dataSourceType($.extend(true, {}, widgetDataSourceOptions, data.utils.normalizeDataSourceOptions(dataSourceOptions)))
                    }
                    this._addDataSourceHandlers()
                }
            },
            _addDataSourceHandlers: function() {
                if (DATA_SOURCE_CHANGED_METHOD in this)
                    this._addDataSourceChangeHandler();
                if (DATA_SOURCE_LOAD_ERROR_METHOD in this)
                    this._addDataSourceLoadErrorHandler();
                if (DATA_SOURCE_LOADING_CHANGED_METHOD in this)
                    this._addDataSourceLoadingChangedHandler()
            },
            _addDataSourceChangeHandler: function() {
                var self = this,
                    dataSource = this._dataSource;
                this._dataSourceChangedHandler = function() {
                    self[DATA_SOURCE_CHANGED_METHOD](dataSource.items())
                };
                dataSource.changed.add(this._dataSourceChangedHandler)
            },
            _addDataSourceLoadErrorHandler: function() {
                this._dataSourceLoadErrorHandler = $.proxy(this[DATA_SOURCE_LOAD_ERROR_METHOD], this);
                this._dataSource.loadError.add(this._dataSourceLoadErrorHandler)
            },
            _addDataSourceLoadingChangedHandler: function() {
                this._dataSourceLoadingChangedHandler = $.proxy(this[DATA_SOURCE_LOADING_CHANGED_METHOD], this);
                this._dataSource.loadingChanged.add(this._dataSourceLoadingChangedHandler)
            },
            _loadDataSource: function() {
                if (this._dataSource) {
                    var dataSource = this._dataSource;
                    if (dataSource.isLoaded())
                        this._dataSourceChangedHandler();
                    else
                        dataSource.load()
                }
            },
            _disposeDataSource: function() {
                if (this._dataSource) {
                    if (this._isSharedDataSource) {
                        delete this._isSharedDataSource;
                        this._dataSource.changed.remove(this._dataSourceChangedHandler);
                        this._dataSource.loadError.remove(this._dataSourceLoadErrorHandler);
                        this._dataSource.loadingChanged.remove(this._dataSourceLoadingChangedHandler)
                    }
                    else
                        this._dataSource.dispose();
                    delete this._dataSource;
                    delete this._dataSourceChangedHandler;
                    delete this._dataSourceLoadErrorHandler;
                    delete this._dataSourceLoadingChangedHandler
                }
            }
        }
    })(jQuery, DevExpress);
    /*! Module core, file ui.events.mspointer.js */
    (function($, DX, undefined) {
        var POINTER_TYPE_MAP = {
                2: "touch",
                3: "pen",
                4: "mouse"
            };
        var pointerEventHook = {
                filter: function(event, originalEvent) {
                    var pointerType = originalEvent.pointerType;
                    if ($.isNumeric(pointerType))
                        event.pointerType = POINTER_TYPE_MAP[pointerType];
                    return event
                },
                props: $.event.mouseHooks.props.concat(["pointerId", "originalTarget", "namespace", "width", "height", "pressure", "result", "tiltX", "charCode", "tiltY", "detail", "isPrimary", "prevValue"])
            };
        $.each(["MSPointerDown", "MSPointerMove", "MSPointerUp", "MSPointerCancel", "MSPointerOver", "MSPointerOut", "MSPointerEnter", "MSPointerLeave", "pointerdown", "pointermove", "pointerup", "pointercancel", "pointerover", "pointerout", "pointerenter", "pointerleave"], function() {
            $.event.fixHooks[this] = pointerEventHook
        })
    })(jQuery, DevExpress);
    /*! Module core, file ui.events.touch.js */
    (function($, DX, undefined) {
        var touchEventHook = {
                filter: function(event, originalEvent) {
                    if (originalEvent.changedTouches.length) {
                        event.pageX = originalEvent.changedTouches[0].pageX;
                        event.pageY = originalEvent.changedTouches[0].pageY
                    }
                    return event
                },
                props: $.event.mouseHooks.props.concat(["touches", "changedTouches", "targetTouches", "detail", "result", "namespace", "originalTarget", "charCode", "prevValue"])
            };
        $.each(["touchstart", "touchmove", "touchend", "touchcancel"], function() {
            $.event.fixHooks[this] = touchEventHook
        })
    })(jQuery, DevExpress);
    /*! Module core, file ui.events.pointer.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            support = DX.support,
            device = DX.devices.real,
            events = ui.events;
        var POINTER_EVENTS_NAMESPACE = "dxPointerEvents",
            MouseStrategyEventMap = {
                dxpointerdown: "mousedown",
                dxpointermove: "mousemove",
                dxpointerup: "mouseup",
                dxpointercancel: ""
            },
            TouchStrategyEventMap = {
                dxpointerdown: "touchstart",
                dxpointermove: "touchmove",
                dxpointerup: "touchend",
                dxpointercancel: "touchcancel"
            },
            PointerStrategyEventMap = {
                dxpointerdown: "pointerdown",
                dxpointermove: "pointermove",
                dxpointerup: "pointerup",
                dxpointercancel: "pointercancel"
            },
            MouseAndTouchStrategyEventMap = {
                dxpointerdown: "touchstart mousedown",
                dxpointermove: "touchmove mousemove",
                dxpointerup: "touchend mouseup",
                dxpointercancel: "touchcancel"
            };
        var eventMap = function() {
                if (support.touch && !(device.tablet || device.phone))
                    return MouseAndTouchStrategyEventMap;
                if (support.touch)
                    return TouchStrategyEventMap;
                return MouseStrategyEventMap
            }();
        var skipTouchWithSameIdentifier = function(pointerEvent) {
                return device.platform === "ios" && (pointerEvent === "dxpointerdown" || pointerEvent === "dxpointerup")
            };
        var SingleEventStrategy = DX.Class.inherit({
                ctor: function(eventName, originalEvents) {
                    this._eventName = eventName;
                    this._eventNamespace = [POINTER_EVENTS_NAMESPACE, ".", this._eventName].join("");
                    this._originalEvents = originalEvents;
                    this._pointerId = 0;
                    this._handlerCount = 0
                },
                _handler: function(e) {
                    if (this._eventName === "dxpointerdown")
                        $(e.target).data("dxGestureEvent", null);
                    if (events.isTouchEvent(e) && skipTouchWithSameIdentifier(this._eventName)) {
                        var touch = e.changedTouches[0];
                        if (this._pointerId === touch.identifier)
                            return;
                        this._pointerId = touch.identifier
                    }
                    return events.fireEvent({
                            type: this._eventName,
                            pointerType: events.eventSource(e),
                            originalEvent: e
                        })
                },
                setup: function() {
                    if (this._handlerCount > 0)
                        return;
                    $(document).on(events.addNamespace(this._originalEvents, this._eventNamespace), $.proxy(this._handler, this))
                },
                add: function() {
                    this._handlerCount++
                },
                remove: function() {
                    this._handlerCount--
                },
                teardown: function() {
                    if (this._handlerCount)
                        return;
                    $(document).off("." + this._eventNamespace)
                },
                dispose: function() {
                    $(document).off("." + this._eventNamespace)
                }
            });
        var MultiEventStrategy = SingleEventStrategy.inherit({
                EVENT_LOCK_TIMEOUT: 100,
                _handler: function(e) {
                    if (events.isTouchEvent(e))
                        this._skipNextEvents = true;
                    if (events.isMouseEvent(e) && this._mouseLocked)
                        return;
                    if (events.isMouseEvent(e) && this._skipNextEvents) {
                        this._skipNextEvents = false;
                        this._mouseLocked = true;
                        clearTimeout(this._unlockMouseTimer);
                        this._unlockMouseTimer = setTimeout($.proxy(function() {
                            this._mouseLocked = false
                        }, this), this.EVENT_LOCK_TIMEOUT);
                        return
                    }
                    return this.callBase(e)
                },
                dispose: function() {
                    this.callBase();
                    this._skipNextEvents = false;
                    this._mouseLocked = false;
                    clearTimeout(this._unlockMouseTimer)
                }
            });
        var getStrategy = function() {
                return eventMap === MouseAndTouchStrategyEventMap ? MultiEventStrategy : SingleEventStrategy
            };
        $.each(eventMap, function(pointerEvent, originalEvents) {
            var Strategy = getStrategy();
            events.registerEvent(pointerEvent, new Strategy(pointerEvent, originalEvents))
        });
        DX.ui.events.__internals = DX.ui.events.__internals || {};
        $.extend(DX.ui.events.__internals, {
            SingleEventStrategy: SingleEventStrategy,
            MultiEventStrategy: MultiEventStrategy,
            MouseStrategyEventMap: MouseStrategyEventMap,
            TouchStrategyEventMap: TouchStrategyEventMap,
            PointerStrategyEventMap: PointerStrategyEventMap,
            MouseAndTouchStrategyEventMap: MouseAndTouchStrategyEventMap,
            eventMap: eventMap
        })
    })(jQuery, DevExpress);
    /*! Module core, file ui.events.click.js */
    (function($, DX, wnd, undefined) {
        var ua = navigator.userAgent,
            screen = wnd.screen,
            ui = DX.ui,
            utils = DX.utils,
            events = ui.events,
            support = DX.support,
            device = DX.devices.real,
            EVENTS_NAME_SPACE = "dxSpecialEvents",
            CLICK_NAME_SPACE = "dxClick" + EVENTS_NAME_SPACE,
            CLICK_EVENT_NAME = "dxclick",
            SCROLLABLE_PARENT_DATA_KEY = "dxClickScrollableParent",
            SCROLLABLE_PARENT_SCROLL_OFFSET_DATA_KEY = "dxClickScrollableParentOffset",
            preferNativeClick = function() {
                var iPhone4SAndElder = device.deviceType === "phone" && screen.height <= 480,
                    iPad2AndElder = device.deviceType === "tablet" && wnd.devicePixelRatio < 2,
                    IOS7AndNewer = device.platform === "ios" && device.version[0] > 6;
                return IOS7AndNewer && (iPhone4SAndElder || iPad2AndElder)
            }(),
            useNativeClick = function() {
                if (!support.touch)
                    return true;
                var chromeInfo = ua.match(/Chrome\/([0-9]+)/) || [],
                    chrome = !!chromeInfo[0],
                    chromeVersion = ~~chromeInfo[1],
                    android = device.platform === "android";
                if (chrome)
                    if (android) {
                        if (chromeVersion > 31 && wnd.innerWidth <= screen.width)
                            return true;
                        if ($("meta[name=viewport][content*='user-scalable=no']").length)
                            return true
                    }
                    else
                        return true;
                return false
            }();
        var SimulatedStrategy = DX.Class.inherit({
                TOUCH_BOUNDARY: 10,
                ctor: function() {
                    this._startX = 0;
                    this._startY = 0;
                    this._handlerCount = 0;
                    this._target = null
                },
                _touchWasMoved: function(e) {
                    var boundary = this.TOUCH_BOUNDARY;
                    return Math.abs(e.pageX - this._startX) > boundary || Math.abs(e.pageY - this._startY) > boundary
                },
                _getClosestScrollable: function($element) {
                    var $scrollParent = $();
                    if ($element.data(SCROLLABLE_PARENT_DATA_KEY))
                        $scrollParent = $element.data(SCROLLABLE_PARENT_DATA_KEY);
                    else {
                        var $current = $element;
                        while ($current.length) {
                            if ($current[0].scrollHeight - $current[0].offsetHeight > 1) {
                                $scrollParent = $current;
                                $element.data(SCROLLABLE_PARENT_DATA_KEY, $scrollParent);
                                break
                            }
                            $current = $current.parent()
                        }
                    }
                    return $scrollParent
                },
                _saveClosestScrollableOffset: function($element) {
                    var $scrollable = this._getClosestScrollable($element);
                    if ($scrollable.length)
                        $element.data(SCROLLABLE_PARENT_SCROLL_OFFSET_DATA_KEY, $scrollable.scrollTop())
                },
                _closestScrollableWasMoved: function($element) {
                    var $scrollable = $element.data(SCROLLABLE_PARENT_DATA_KEY);
                    return $scrollable && $scrollable.scrollTop() !== $element.data(SCROLLABLE_PARENT_SCROLL_OFFSET_DATA_KEY)
                },
                _hasClosestScrollable: function($element) {
                    var $scrollable = this._getClosestScrollable($element);
                    if (!$scrollable.length)
                        return false;
                    if ($scrollable.is("body"))
                        return false;
                    if ($scrollable === window)
                        return false;
                    if ($scrollable.css("overflow") === "hidden")
                        return false;
                    return true
                },
                _handleStart: function(e) {
                    if (events.isMouseEvent(e) && e.which !== 1)
                        return;
                    this._saveClosestScrollableOffset($(e.target));
                    this._target = e.target;
                    this._startX = e.pageX;
                    this._startY = e.pageY
                },
                _handleEnd: function(e) {
                    var $target = $(e.target);
                    if (!$target.is(this._target) || this._touchWasMoved(e) || this._closestScrollableWasMoved($target) || preferNativeClick && this._hasClosestScrollable($target))
                        return;
                    if (!$target.is("input, textarea") && !e.dxPreventBlur)
                        utils.resetActiveElement();
                    if (events.handleGestureEvent(e, CLICK_EVENT_NAME))
                        events.fireEvent({
                            type: CLICK_EVENT_NAME,
                            originalEvent: e
                        });
                    this._reset()
                },
                _handleCancel: function(e) {
                    this._reset()
                },
                _reset: function() {
                    this._target = null
                },
                _handleClick: function(e) {
                    var $target = $(e.target);
                    if ($target.is(this._target) && this._hasClosestScrollable($target))
                        if (events.handleGestureEvent(e, CLICK_EVENT_NAME))
                            events.fireEvent({
                                type: CLICK_EVENT_NAME,
                                originalEvent: e
                            });
                    this._reset()
                },
                _makeElementClickable: function($element) {
                    if (!$element.attr("onclick"))
                        $element.attr("onclick", "void(0)")
                },
                setup: function(element) {
                    this._makeElementClickable($(element));
                    if (this._handlerCount > 0)
                        return;
                    var $doc = $(document).on(events.addNamespace("dxpointerdown", CLICK_NAME_SPACE), $.proxy(this._handleStart, this)).on(events.addNamespace("dxpointerup", CLICK_NAME_SPACE), $.proxy(this._handleEnd, this)).on(events.addNamespace("dxpointercancel", CLICK_NAME_SPACE), $.proxy(this._handleCancel, this));
                    if (preferNativeClick)
                        $doc.on(events.addNamespace("click", CLICK_NAME_SPACE), $.proxy(this._handleClick, this))
                },
                add: function() {
                    this._handlerCount++
                },
                remove: function() {
                    this._handlerCount--
                },
                teardown: function() {
                    if (this._handlerCount)
                        return;
                    $(document).off("." + CLICK_NAME_SPACE)
                },
                dispose: function() {
                    $(document).off("." + CLICK_NAME_SPACE)
                }
            });
        var NativeStrategy = DX.Class.inherit({
                bindType: "click",
                delegateType: "click",
                handle: function(element, event) {
                    if (events.handleGestureEvent(event, CLICK_EVENT_NAME))
                        return event.handleObj.handler.call(element, event)
                }
            });
        events.registerEvent(CLICK_EVENT_NAME, new(useNativeClick ? NativeStrategy : SimulatedStrategy));
        DX.ui.events.__internals = DX.ui.events.__internals || {};
        $.extend(DX.ui.events.__internals, {
            NativeClickStrategy: NativeStrategy,
            SimulatedClickStrategy: SimulatedStrategy,
            device: device,
            preferNativeClickAccessor: function() {
                return preferNativeClick
            }
        })
    })(jQuery, DevExpress, window);
    /*! Module core, file ui.events.hold.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            events = ui.events,
            jqSpecialEvent = $.event.special,
            EVENTS_NAME_SPACE = "dxSpecialEvents",
            HOLD_NAME_SPACE = "dxHold",
            HOLD_EVENT_NAME = "dxhold",
            HOLD_TIMER_DATA_KEY = EVENTS_NAME_SPACE + "HoldTimer";
        var Hold = DX.Class.inherit({
                HOLD_TIMEOUT: 750,
                TOUCH_BOUNDARY: 5,
                _startX: 0,
                _startY: 0,
                _touchWasMoved: function(e) {
                    var boundary = this.TOUCH_BOUNDARY;
                    return Math.abs(e.pageX - this._startX) > boundary || Math.abs(e.pageY - this._startY) > boundary
                },
                setup: function(element, data) {
                    element = $(element);
                    var handleStart = function(e) {
                            if (element.data(HOLD_TIMER_DATA_KEY))
                                return;
                            this._startX = e.pageX;
                            this._startY = e.pageY;
                            element.data(HOLD_TIMER_DATA_KEY, setTimeout(function() {
                                element.removeData(HOLD_TIMER_DATA_KEY);
                                if (events.handleGestureEvent(e, HOLD_EVENT_NAME))
                                    events.fireEvent({
                                        type: HOLD_EVENT_NAME,
                                        originalEvent: e
                                    })
                            }, data && "timeout" in data ? data.timeout : this.HOLD_TIMEOUT))
                        };
                    var handleMove = function(e) {
                            if (!this._touchWasMoved(e))
                                return;
                            handleEnd()
                        };
                    var handleEnd = function() {
                            clearTimeout(element.data(HOLD_TIMER_DATA_KEY));
                            element.removeData(HOLD_TIMER_DATA_KEY)
                        };
                    element.on(events.addNamespace("dxpointerdown", HOLD_NAME_SPACE), $.proxy(handleStart, this)).on(events.addNamespace("dxpointermove", HOLD_NAME_SPACE), $.proxy(handleMove, this)).on(events.addNamespace("dxpointerup", HOLD_NAME_SPACE), $.proxy(handleEnd, this))
                },
                teardown: function(element) {
                    element = $(element);
                    clearTimeout(element.data(HOLD_TIMER_DATA_KEY));
                    element.removeData(HOLD_TIMER_DATA_KEY).off("." + HOLD_NAME_SPACE)
                }
            });
        events.registerEvent(HOLD_EVENT_NAME, new Hold)
    })(jQuery, DevExpress);
    /*! Module core, file ui.events.swipe.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            utils = DX.utils,
            events = ui.events,
            SWIPE_START_EVENT_NAME = "dxswipestart",
            SWIPE_EVENT_NAME = "dxswipe",
            SWIPE_END_EVENT_NAME = "dxswipeend",
            SWIPE_CANCEL_EVENT_NAME = "dxswipecancel",
            SWIPEABLE_DATA_KEY = "dxSwipeEventDataKey",
            GESTURE_LOCK_KEY = "dxGesture";
        var HorizontalStrategy = {
                defaultItemSizeFunc: function() {
                    return this._activeSwipeable.width()
                },
                isSwipeAngleAllowed: function(delta) {
                    return Math.abs(delta.y) <= Math.abs(delta.x)
                },
                getBounds: function() {
                    return [this._maxLeftOffset, this._maxRightOffset]
                },
                calcOffsetRatio: function(e) {
                    var endEventData = events.eventData(e);
                    return (endEventData.x - (this._startEventData && this._startEventData.x || 0)) / this._itemSizeFunc().call(this, e)
                },
                isFastSwipe: function(e) {
                    var endEventData = events.eventData(e);
                    return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(endEventData.x - this._tickData.x) >= endEventData.time - this._tickData.time
                }
            };
        var VerticalStrategy = {
                defaultItemSizeFunc: function() {
                    return this._activeSwipeable.height()
                },
                isSwipeAngleAllowed: function(delta) {
                    return Math.abs(delta.y) >= Math.abs(delta.x)
                },
                getBounds: function() {
                    return [this._maxTopOffset, this._maxBottomOffset]
                },
                calcOffsetRatio: function(e) {
                    var endEventData = events.eventData(e);
                    return (endEventData.y - (this._startEventData && this._startEventData.y || 0)) / this._itemSizeFunc().call(this, e)
                },
                isFastSwipe: function(e) {
                    var endEventData = events.eventData(e);
                    return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(endEventData.y - this._tickData.y) >= endEventData.time - this._tickData.time
                }
            };
        var STRATEGIES = {
                horizontal: HorizontalStrategy,
                vertical: VerticalStrategy
            };
        var SwipeDispatcher = DX.Class.inherit({
                STAGE_SLEEP: 0,
                STAGE_TOUCHED: 1,
                STAGE_SWIPING: 2,
                TICK_INTERVAL: 300,
                FAST_SWIPE_SPEED_LIMIT: 5,
                ctor: function() {
                    this._attachEvents()
                },
                _getStrategy: function() {
                    return STRATEGIES[this._data("direction")]
                },
                _defaultItemSizeFunc: function() {
                    return this._getStrategy().defaultItemSizeFunc.call(this)
                },
                _itemSizeFunc: function() {
                    return this._data("itemSizeFunc") || this._defaultItemSizeFunc
                },
                _data: function(key, value) {
                    var data = this._activeSwipeable.data(SWIPEABLE_DATA_KEY);
                    if (arguments.length === 1)
                        return data[key];
                    else if (arguments.length === 2)
                        data[key] = value
                },
                _closestSwipeable: function(e) {
                    var current = $(e.target);
                    while (current.length) {
                        var swipeable = $(current).data(SWIPEABLE_DATA_KEY);
                        if (swipeable)
                            return $(current);
                        current = current.parent()
                    }
                },
                _handleStart: function(e) {
                    if (events.needSkipEvent(e))
                        return;
                    if (this._swipeStage > this.STAGE_SLEEP)
                        return;
                    var activeSwipeable = this._activeSwipeable = this._closestSwipeable(e);
                    if (!activeSwipeable)
                        return;
                    this._parentsLength = this._activeSwipeable.parents().length;
                    this._startEventData = events.eventData(e);
                    this._tickData = {time: 0};
                    this._swipeStage = this.STAGE_TOUCHED
                },
                _handleMove: function(e) {
                    if (!this._activeSwipeable || this._swipeStage === this.STAGE_SLEEP)
                        return;
                    if (this._swipeStage === this.STAGE_TOUCHED)
                        this._handleFirstMove(e);
                    if (this._swipeStage === this.STAGE_SWIPING)
                        this._handleNextMoves(e)
                },
                _handleFirstMove: function(e) {
                    var delta = events.eventDelta(this._startEventData, events.eventData(e));
                    if (!delta.x && !delta.y)
                        return;
                    if (!events.handleGestureEvent(e, SWIPE_EVENT_NAME))
                        return;
                    if (!this._getStrategy().isSwipeAngleAllowed.call(this, delta) || events.needSkipEvent(e)) {
                        this._fireSwipeCancelEvent(e);
                        this._reset();
                        return
                    }
                    ui.feedback.reset();
                    if ($(":focus", this._activeSwipeable).length)
                        utils.resetActiveElement();
                    if (e.originalEvent) {
                        var direction = this._data("direction");
                        if (e.originalEvent.pointerMoveData[direction] !== this._parentsLength)
                            return;
                        e.originalEvent.isScrollingEvent = false
                    }
                    this._prepareGesture();
                    e = events.fireEvent({
                        type: "dxswipestart",
                        originalEvent: e,
                        target: this._activeSwipeable.get(0)
                    });
                    if (e.cancel) {
                        this._fireSwipeCancelEvent(e);
                        this._reset();
                        return
                    }
                    this._maxLeftOffset = e.maxLeftOffset;
                    this._maxRightOffset = e.maxRightOffset;
                    this._maxTopOffset = e.maxTopOffset;
                    this._maxBottomOffset = e.maxBottomOffset;
                    this._swipeStage = this.STAGE_SWIPING
                },
                _fireSwipeCancelEvent: function(e) {
                    events.fireEvent({
                        type: "dxswipecancel",
                        originalEvent: e,
                        target: this._activeSwipeable.get(0)
                    })
                },
                _handleBodyPointerMove: function(e) {
                    if (!this._activeSwipeable || !e.originalEvent)
                        return;
                    var pointerMoveData = e.originalEvent.pointerMoveData || {},
                        direction = this._data("direction"),
                        directionValue = pointerMoveData[direction];
                    if (directionValue && directionValue > this._parentsLength) {
                        this._reset();
                        return
                    }
                    pointerMoveData[direction] = this._parentsLength;
                    e.originalEvent.pointerMoveData = pointerMoveData
                },
                _handleNextMoves: function(e) {
                    var strategy = this._getStrategy(),
                        moveEventData = events.eventData(e),
                        offset = strategy.calcOffsetRatio.call(this, e);
                    offset = this._fitOffset(offset, this._data("elastic"));
                    if (moveEventData.time - this._tickData.time > this.TICK_INTERVAL)
                        this._tickData = moveEventData;
                    events.fireEvent({
                        type: "dxswipe",
                        originalEvent: e,
                        offset: offset,
                        target: this._activeSwipeable.get(0)
                    })
                },
                _handleEnd: function(e) {
                    if (!DX.devices.isRippleEmulator() && events.hasTouches(e) || !this._activeSwipeable)
                        return;
                    if (this._swipeStage !== this.STAGE_SWIPING) {
                        this._reset();
                        return
                    }
                    var strategy = this._getStrategy(),
                        offsetRatio = strategy.calcOffsetRatio.call(this, e),
                        fast = strategy.isFastSwipe.call(this, e),
                        startOffset = offsetRatio,
                        targetOffset = this._calcTargetOffset(offsetRatio, fast);
                    startOffset = this._fitOffset(startOffset, this._data("elastic"));
                    targetOffset = this._fitOffset(targetOffset, false);
                    events.fireEvent({
                        type: "dxswipeend",
                        offset: startOffset,
                        targetOffset: targetOffset,
                        target: this._activeSwipeable.get(0),
                        originalEvent: e
                    });
                    this._reset()
                },
                _fitOffset: function(offset, elastic) {
                    var strategy = this._getStrategy(),
                        bounds = strategy.getBounds.call(this);
                    if (offset < -bounds[0])
                        return elastic ? (-2 * bounds[0] + offset) / 3 : -bounds[0];
                    if (offset > bounds[1])
                        return elastic ? (2 * bounds[1] + offset) / 3 : bounds[1];
                    return offset
                },
                _calcTargetOffset: function(offsetRatio, fast) {
                    var result;
                    if (fast) {
                        result = Math.ceil(Math.abs(offsetRatio));
                        if (offsetRatio < 0)
                            result = -result
                    }
                    else
                        result = Math.round(offsetRatio);
                    return result
                },
                _prepareGesture: function() {
                    clearTimeout(this._gestureEndTimer);
                    this._activeSwipeable.data(GESTURE_LOCK_KEY, true)
                },
                _forgetGesture: function() {
                    var swipeable = this._activeSwipeable;
                    this._gestureEndTimer = setTimeout($.proxy(function() {
                        if (swipeable)
                            swipeable.data(GESTURE_LOCK_KEY, false)
                    }, this), 400)
                },
                _reset: function() {
                    this._forgetGesture();
                    this._activeSwipeable = null;
                    this._swipeStage = this.STAGE_SLEEP
                },
                _attachEvents: function() {
                    $("body").on(events.addNamespace("dxpointermove", "dxSwipe"), $.proxy(this._handleBodyPointerMove, this));
                    $(document).on(events.addNamespace("dxpointerdown", "dxSwipe"), $.proxy(this._handleStart, this)).on(events.addNamespace("dxpointermove", "dxSwipe"), $.proxy(this._handleMove, this)).on(events.addNamespace("dxpointerup dxpointercancel", "dxSwipe"), $.proxy(this._handleEnd, this))
                },
                isDisposed: function() {
                    return this._disposed
                },
                dispose: function() {
                    this._disposed = true;
                    if (this._activeSwipeable)
                        this._reset();
                    $("body").off(".dxSwipe");
                    $(document).off(".dxSwipe")
                }
            });
        var swipeDispatcher = null;
        var handlerCount = 0;
        $.each([SWIPE_START_EVENT_NAME, SWIPE_EVENT_NAME, SWIPE_END_EVENT_NAME, SWIPE_CANCEL_EVENT_NAME], function(_, eventName) {
            events.registerEvent(eventName, {
                noBubble: true,
                setup: function(element, data) {
                    $(element).data(SWIPEABLE_DATA_KEY, $.extend($(element).data(SWIPEABLE_DATA_KEY) || {
                        elastic: true,
                        direction: "horizontal"
                    }, data));
                    if (!swipeDispatcher || swipeDispatcher.isDisposed())
                        swipeDispatcher = new SwipeDispatcher
                },
                add: function() {
                    handlerCount++
                },
                remove: function() {
                    handlerCount--
                },
                teardown: function(element) {
                    var element = $(element);
                    if (element.is(swipeDispatcher._activeSwipeable))
                        swipeDispatcher._reset();
                    if (element.data(SWIPEABLE_DATA_KEY))
                        element.removeData(SWIPEABLE_DATA_KEY);
                    if (handlerCount)
                        return;
                    if (!swipeDispatcher)
                        return;
                    swipeDispatcher.dispose();
                    swipeDispatcher = null
                }
            })
        })
    })(jQuery, DevExpress);
    /*! Module core, file ui.events.wheel.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            events = ui.events;
        var EVENT_NAME = "dxmousewheel",
            EVENT_NAMESPACE = "dxWheel";
        var WHEEL_DISTANCE = 10;
        $.event.fixHooks["DOMMouseScroll"] = $.event.mouseHooks;
        var wheel = {
                setup: function(element, data) {
                    var $element = $(element);
                    $element.on(events.addNamespace("mousewheel DOMMouseScroll", EVENT_NAMESPACE), $.proxy(wheel._handleWheel, wheel))
                },
                teardown: function(element) {
                    var $element = $(element);
                    $element.off("." + EVENT_NAMESPACE)
                },
                _handleWheel: function(e) {
                    var delta = this._getWheelDelta(e.originalEvent);
                    events.fireEvent({
                        type: EVENT_NAME,
                        originalEvent: e,
                        delta: delta
                    })
                },
                _getWheelDelta: function(event) {
                    return event.wheelDelta / 60 || -event.detail / 1.5
                }
            };
        events.registerEvent(EVENT_NAME, wheel)
    })(jQuery, DevExpress);
    /*! Module core, file ui.widget.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            UI_FEEDBACK = "UIFeedback",
            UI_FEEDBACK_CLASS = "dx-feedback",
            ACTIVE_STATE_CLASS = "dx-state-active",
            DISABLED_STATE_CLASS = "dx-state-disabled",
            INVISIBLE_STATE_CLASS = "dx-state-invisible",
            HOVERED_STATE_CLASS = "dx-state-hovered",
            FEEDBACK_SHOW_TIMEOUT = 30,
            FEEDBACK_HIDE_TIMEOUT = 400;
        var activeElement,
            events = ui.events;
        ui.feedback = {reset: function() {
                handleEnd(true)
            }};
        ui.Widget = ui.Component.inherit({
            _defaultOptions: function() {
                return $.extend(this.callBase(), {
                        visible: true,
                        activeStateEnabled: true,
                        width: undefined,
                        height: undefined,
                        clickAction: null,
                        hoverStateEnabled: false
                    })
            },
            _init: function() {
                this.callBase();
                this._feedbackShowTimeout = FEEDBACK_SHOW_TIMEOUT;
                this._feedbackHideTimeout = FEEDBACK_HIDE_TIMEOUT
            },
            _render: function() {
                this.callBase();
                this._element().addClass("dx-widget");
                this._toggleDisabledState(this.option("disabled"));
                this._toggleVisibility(this.option("visible"));
                this._refreshFeedback();
                this._renderDimensions();
                this._renderClick()
            },
            _dispose: function() {
                this._clearTimers();
                if (activeElement && activeElement.closest(this._element()).length)
                    activeElement = null;
                this.callBase()
            },
            _clean: function() {
                this.callBase();
                this._element().empty()
            },
            _clearTimers: function() {
                clearTimeout(this._feedbackHideTimer);
                clearTimeout(this._feedbackShowTimer)
            },
            _toggleVisibility: function(visible) {
                this._element().toggleClass(INVISIBLE_STATE_CLASS, !visible)
            },
            _toggleHoverState: function(value) {
                if (this.option("hoverStateEnabled"))
                    this._element().toggleClass(HOVERED_STATE_CLASS, value)
            },
            _renderDimensions: function() {
                var width = this.option("width"),
                    height = this.option("height");
                this._element().width(width);
                this._element().height(height)
            },
            _refreshFeedback: function() {
                if (this._feedbackDisabled()) {
                    this._feedbackOff();
                    this._element().removeClass(UI_FEEDBACK_CLASS)
                }
                else
                    this._element().addClass(UI_FEEDBACK_CLASS)
            },
            _renderClick: function() {
                var self = this,
                    eventName = events.addNamespace("dxclick", this.NAME);
                this._clickAction = this._createActionByOption("clickAction");
                this._element().off(eventName).on(eventName, function(e) {
                    self._clickAction({jQueryEvent: e})
                })
            },
            _feedbackDisabled: function() {
                return !this.option("activeStateEnabled") || this.option("disabled")
            },
            _feedbackOn: function(element, immediate) {
                if (this._feedbackDisabled())
                    return;
                this._clearTimers();
                if (immediate)
                    this._feedbackShow(element);
                else
                    this._feedbackShowTimer = window.setTimeout($.proxy(this._feedbackShow, this, element), this._feedbackShowTimeout);
                this._saveActiveElement()
            },
            _feedbackShow: function(element) {
                var activeStateElement = this._element();
                if (this._activeStateUnit)
                    activeStateElement = $(element).closest(this._activeStateUnit);
                if (!activeStateElement.hasClass(DISABLED_STATE_CLASS)) {
                    activeStateElement.addClass(ACTIVE_STATE_CLASS);
                    this._toggleHoverState(false)
                }
            },
            _saveActiveElement: function() {
                activeElement = this._element()
            },
            _feedbackOff: function(immediate) {
                this._clearTimers();
                if (immediate)
                    this._feedbackHide();
                else
                    this._feedbackHideTimer = window.setTimeout($.proxy(this._feedbackHide, this), this._feedbackHideTimeout)
            },
            _feedbackHide: function() {
                var activeStateElement = this._element();
                if (this._activeStateUnit)
                    activeStateElement = activeStateElement.find(this._activeStateUnit);
                activeStateElement.removeClass(ACTIVE_STATE_CLASS);
                this._toggleHoverState(!this.option("disabled"));
                this._clearActiveElement()
            },
            _clearActiveElement: function() {
                var rootDomElement = this._element().get(0),
                    activeDomElement = activeElement && activeElement.get(0);
                if (activeDomElement && (activeDomElement === rootDomElement || $.contains(rootDomElement, activeDomElement)))
                    activeElement = null
            },
            _toggleDisabledState: function(value) {
                this._element().toggleClass(DISABLED_STATE_CLASS, value);
                this._toggleHoverState(!value)
            },
            _optionChanged: function(name, value) {
                switch (name) {
                    case"disabled":
                        this._toggleDisabledState(value);
                        this._refreshFeedback();
                        break;
                    case"activeStateEnabled":
                        this._refreshFeedback();
                        break;
                    case"hoverStateEnabled":
                        this._toggleHoverState();
                        break;
                    case"visible":
                        this._toggleVisibility(value);
                        break;
                    case"width":
                    case"height":
                        this._renderDimensions();
                        break;
                    case"clickAction":
                        this._renderClick();
                        break;
                    default:
                        this.callBase.apply(this, arguments)
                }
            },
            repaint: function() {
                this._refresh()
            }
        });
        var handleStart = function(args, immediate) {
                var e = args.jQueryEvent,
                    $target = args.element;
                if (events.needSkipEvent(e))
                    return;
                if (activeElement)
                    getWidget(activeElement)._feedbackOff(true);
                var closestFeedbackElement = $target.closest("." + UI_FEEDBACK_CLASS),
                    widget;
                if (closestFeedbackElement.length) {
                    widget = getWidget(closestFeedbackElement);
                    widget._feedbackOn($target, immediate);
                    if (immediate)
                        widget._feedbackOff()
                }
            };
        var handleEnd = function(immediate) {
                if (!activeElement)
                    return;
                getWidget(activeElement)._feedbackOff(immediate)
            };
        var getWidget = function(widgetElement) {
                var result;
                $.each(widgetElement.data("dxComponents"), function(index, componentName) {
                    if (ui[componentName].subclassOf(ui.Widget)) {
                        result = widgetElement.data(componentName);
                        return false
                    }
                });
                return result
            };
        $(function() {
            var startAction = new DX.Action(handleStart);
            $(document).on(events.addNamespace("dxpointerdown", UI_FEEDBACK), function(e) {
                startAction.execute({
                    jQueryEvent: e,
                    element: $(e.target)
                })
            }).on(events.addNamespace("dxpointerup dxpointercancel", UI_FEEDBACK), function(e) {
                var activeElementClicked = activeElement && $(e.target).closest("." + UI_FEEDBACK_CLASS).get(0) === activeElement.get(0);
                if (activeElementClicked)
                    startAction.execute({
                        jQueryEvent: e,
                        element: $(e.target)
                    }, true);
                handleEnd()
            })
        })
    })(jQuery, DevExpress);
    /*! Module core, file ui.containerWidget.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            ANONYMOUS_TEMPLATE_NAME = "template",
            TEMPLATE_SELECTOR = "[data-options*='dxTemplate']",
            TEMPLATES_DATA_KEY = "dxTemplates";
        var getTemplateOptions = function(element) {
                var options = $(element).data("options");
                if ($.trim(options).charAt(0) !== "{")
                    options = "{" + options + "}";
                return new Function("return " + options)().dxTemplate
            };
        var ContainerWidget = ui.Widget.inherit({
                _defaultOptions: function() {
                    return $.extend(this.callBase(), {contentReadyAction: $.noop})
                },
                _init: function() {
                    this.callBase();
                    this._templateProvider = new ui.TemplateProvider;
                    this._initTemplates();
                    this._initContentReadyAction()
                },
                _clean: $.noop,
                _createTemplate: function(element) {
                    return new(this._templateProvider.getTemplateClass(this))(element)
                },
                _initTemplates: function() {
                    var self = this,
                        templates = {},
                        dataTemplateElements = this._element().data(TEMPLATES_DATA_KEY),
                        templateElements = dataTemplateElements ? dataTemplateElements : this._element().contents().filter(TEMPLATE_SELECTOR);
                    if (templateElements.length)
                        templateElements.each(function() {
                            var templateOptions = getTemplateOptions(this);
                            if (!templateOptions)
                                return;
                            if (!templateOptions.name)
                                throw Error("Template name was not specified");
                            templates[templateOptions.name] = self._createTemplate(this)
                        });
                    else
                        templates[ANONYMOUS_TEMPLATE_NAME] = self._createTemplate(self._element().contents());
                    this._externalTemplates = {};
                    this._templates = templates
                },
                _initContentReadyAction: function() {
                    this._contentReadyAction = this._createActionByOption("contentReadyAction", {excludeValidators: ["gesture", "designMode", "disabled"]})
                },
                _render: function() {
                    this.callBase();
                    this._renderContent()
                },
                _renderContent: function() {
                    this._renderContentImpl();
                    this._fireContentReadyAction()
                },
                _renderContentImpl: DX.abstract,
                _fireContentReadyAction: function() {
                    this._contentReadyAction({excludeValidators: ["disabled", "gesture"]})
                },
                _getTemplate: function(templateName) {
                    var result = this._acquireTemplate.apply(this, arguments);
                    if (!result && this._templateProvider.supportDefaultTemplate(this)) {
                        result = this._templateProvider.getDefaultTemplate(this);
                        if (!result)
                            throw Error(DX.utils.stringFormat("Template \"{0}\" was not found and no default template specified!", templateName));
                    }
                    return result
                },
                _acquireTemplate: function(templateSource) {
                    if (templateSource == null)
                        return templateSource;
                    if (templateSource.nodeType || templateSource.jquery) {
                        templateSource = $(templateSource);
                        if (templateSource.is("script"))
                            templateSource = templateSource.html();
                        return this._createTemplate(templateSource)
                    }
                    if (typeof templateSource === "string")
                        return this._getTemplates()[templateSource];
                    if ($.isFunction(templateSource)) {
                        var args = $.makeArray(arguments).slice(1);
                        return this._acquireTemplate(templateSource.apply(this, args))
                    }
                    return this._acquireTemplate(templateSource.toString())
                },
                _optionChanged: function(name) {
                    switch (name) {
                        case"contentReadyAction":
                            this._initContentReadyAction();
                            break;
                        default:
                            this.callBase.apply(this, arguments)
                    }
                },
                _cleanTemplates: function() {
                    $.each(this._templates, function(templateName, template) {
                        template.dispose()
                    })
                },
                _dispose: function() {
                    this._cleanTemplates();
                    this._contentReadyAction = null;
                    this.callBase()
                },
                addTemplate: function(template) {
                    $.extend(this._templates, template)
                },
                addExternalTemplate: function(template) {
                    $.extend(this._externalTemplates, template)
                },
                _getTemplates: function() {
                    return $.extend({}, this._templates, this._externalTemplates)
                }
            });
        ui.ContainerWidget = ContainerWidget
    })(jQuery, DevExpress);
    /*! Module core, file ui.template.js */
    (function($, DX, undefined) {
        var isString = DX.utils.isString;
        var currentTemplateEngine;
        var templateEngines = [];
        var BaseTemplate = DevExpress.Class.inherit({
                _compile: function(html, element) {
                    return element
                },
                _render: function(template, data) {
                    return template
                },
                ctor: function(element) {
                    this._element = $(element);
                    if (this._element.length === 1) {
                        if (this._element[0].nodeName.toLowerCase() !== "script")
                            this._element = $("<div />").append(this._element);
                        this._template = this._compile(this._element.html() || "", this._element)
                    }
                },
                render: function(container, data) {
                    var result;
                    if (this._template) {
                        result = this._render(this._template, data);
                        if (isString(result))
                            result = $.parseHTML(result);
                        result = $(result);
                        if (container)
                            container.append(result);
                        return result
                    }
                },
                dispose: $.noop
            });
        var createTemplateEngine = function(options) {
                if (options && options.compile && options.render)
                    return BaseTemplate.inherit({
                            allowRenderToDetachedContainer: options.allowRenderToDetachedContainer !== false,
                            _compile: options.compile,
                            _render: options.render
                        });
                else
                    throw Error("Template Engine must contains compile and render methods");
            };
        if (window.ko) {
            var koCustomTemplateEngine = function(){};
            koCustomTemplateEngine.prototype = ko.utils.extend(new ko.templateEngine, {
                renderTemplateSource: function(templateSource, bindingContext, options) {
                    var precompiledTemplate = templateSource["data"]("precompiledTemplate");
                    if (!precompiledTemplate) {
                        precompiledTemplate = new currentTemplateEngine(templateSource.domElement);
                        templateSource["data"]("precompiledTemplate", precompiledTemplate)
                    }
                    return precompiledTemplate.render(null, bindingContext.$data)
                },
                allowTemplateRewriting: false
            })
        }
        DevExpress.ui.setTemplateEngine = function(templateEngine) {
            if (isString(templateEngine)) {
                currentTemplateEngine = templateEngines && templateEngines[templateEngine];
                if (!currentTemplateEngine && templateEngine !== "default")
                    throw Error(DX.utils.stringFormat("Template Engine \"{0}\" is not supported", templateEngine));
            }
            else
                currentTemplateEngine = createTemplateEngine(templateEngine) || currentTemplateEngine;
            if (window.ko)
                ko.setTemplateEngine(currentTemplateEngine ? new koCustomTemplateEngine : new ko.nativeTemplateEngine)
        };
        DevExpress.ui.TemplateProvider = DevExpress.ui.TemplateProvider.inherit({getTemplateClass: function() {
                if (currentTemplateEngine)
                    return currentTemplateEngine;
                return this.callBase.apply(this, arguments)
            }});
        var registerTemplateEngine = function(name, templateOptions) {
                templateEngines[name] = createTemplateEngine(templateOptions)
            };
        registerTemplateEngine("jquery-tmpl", {
            compile: function(html, element) {
                return element
            },
            render: function(template, data) {
                return template.tmpl(data)
            }
        });
        registerTemplateEngine("jsrender", {
            compile: function(html) {
                return $.templates(html)
            },
            render: function(template, data) {
                return template.render(data)
            }
        });
        registerTemplateEngine("mustache", {
            compile: function(html) {
                return Mustache.compile(html)
            },
            render: function(template, data) {
                return template(data)
            }
        });
        registerTemplateEngine("hogan", {
            compile: function(html) {
                return Hogan.compile(html)
            },
            render: function(template, data) {
                return template.render(data)
            }
        });
        registerTemplateEngine("underscore", {
            compile: function(html) {
                return _.template(html)
            },
            render: function(template, data) {
                return template(data)
            }
        });
        registerTemplateEngine("handlebars", {
            compile: function(html) {
                return Handlebars.compile(html)
            },
            render: function(template, data) {
                return template(data)
            }
        });
        registerTemplateEngine("doT", {
            compile: function(html) {
                return doT.template(html)
            },
            render: function(template, data) {
                return template(data)
            }
        })
    })(jQuery, DevExpress);
    /*! Module core, file ui.collectionContainerWidget.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            events = ui.events;
        var CollectionContainerWidget = ui.ContainerWidget.inherit({
                _defaultOptions: function() {
                    return $.extend(this.callBase(), {
                            items: [],
                            itemTemplate: "item",
                            itemRender: null,
                            itemClickAction: null,
                            itemRenderedAction: null,
                            noDataText: Globalize.localize("dxCollectionContainerWidget-noDataText"),
                            dataSource: null
                        })
                },
                _init: function() {
                    this.callBase();
                    this._cleanRenderedItems();
                    this._refreshDataSource()
                },
                _dataSourceOptions: function() {
                    var options = {
                            paginate: false,
                            _preferSync: false
                        };
                    if ($.isArray(this.option("dataSource")))
                        options._preferSync = true;
                    return options
                },
                _cleanRenderedItems: function() {
                    this._renderedItemsCount = 0
                },
                _optionChanged: function(name, value, prevValue) {
                    switch (name) {
                        case"items":
                            this._cleanRenderedItems();
                            this._invalidate();
                            break;
                        case"dataSource":
                            this._refreshDataSource();
                            if (!this._dataSource)
                                this.option("items", []);
                            this._renderEmptyMessage();
                            break;
                        case"noDataText":
                            this._renderEmptyMessage();
                            break;
                        case"itemRenderedAction":
                            this._createItemRenderAction();
                            break;
                        case"itemTemplate":
                            this._itemTemplateName = null;
                            this._invalidate();
                            break;
                        case"itemRender":
                            this._itemRender = null;
                            this._invalidate();
                            break;
                        case"itemClickAction":
                            break;
                        default:
                            this.callBase(name, value, prevValue)
                    }
                },
                _expectNextPageLoading: function() {
                    this._startIndexForAppendedItems = 0
                },
                _expectLastItemLoading: function() {
                    this._startIndexForAppendedItems = -1
                },
                _forgetNextPageLoading: function() {
                    this._startIndexForAppendedItems = null
                },
                _handleDataSourceChanged: function(newItems) {
                    var items = this.option("items");
                    if (this._initialized && items && this._shouldAppendItems()) {
                        this._renderedItemsCount = items.length;
                        if (!this._dataSource.isLastPage() || this._startIndexForAppendedItems !== -1)
                            this.option().items = items.concat(newItems.slice(this._startIndexForAppendedItems));
                        this._renderContent();
                        this._forgetNextPageLoading()
                    }
                    else
                        this.option("items", newItems)
                },
                _handleDataSourceLoadError: function() {
                    this._forgetNextPageLoading()
                },
                _shouldAppendItems: function() {
                    return this._startIndexForAppendedItems != null && this._allowDinamicItemsAppend()
                },
                _allowDinamicItemsAppend: function() {
                    return false
                },
                _clean: function() {
                    this._itemContainer().empty()
                },
                _refresh: function() {
                    this._cleanRenderedItems();
                    this.callBase.apply(this, arguments)
                },
                _itemContainer: function() {
                    return this._element()
                },
                _itemClass: DX.abstract,
                _itemSelector: function() {
                    return "." + this._itemClass()
                },
                _itemDataKey: DX.abstract,
                _itemElements: function() {
                    return this._itemContainer().find(this._itemSelector())
                },
                _render: function() {
                    this.callBase();
                    this._attachClickEvent()
                },
                _attachClickEvent: function() {
                    var itemSelector = this._itemSelector(),
                        eventName = events.addNamespace("dxclick", this.NAME);
                    this._itemContainer().off(eventName, itemSelector).on(eventName, itemSelector, $.proxy(this._handleItemClick, this))
                },
                _handleItemClick: function(e) {
                    this._handleItemJQueryEvent(e, "itemClickAction")
                },
                _renderContentImpl: function() {
                    var items = this.option("items") || [];
                    if (this._renderedItemsCount)
                        this._renderItems(items.slice(this._renderedItemsCount));
                    else
                        this._renderItems(items)
                },
                _renderItems: function(items) {
                    if (items.length)
                        $.each(items, $.proxy(this._renderItem, this));
                    this._renderEmptyMessage()
                },
                _renderItem: function(index, item, container) {
                    container = container || this._itemContainer();
                    var itemRenderer = this._getItemRenderer(),
                        itemTemplateName = this._getItemTemplateName(),
                        itemTemplate = this._getTemplate(item.template || itemTemplateName, index, item),
                        itemElement,
                        renderArgs = {
                            index: index,
                            item: item,
                            container: container
                        };
                    if (itemRenderer)
                        itemElement = this._createItemByRenderer(itemRenderer, renderArgs);
                    else if (itemTemplate)
                        itemElement = this._createItemByTemplate(itemTemplate, renderArgs);
                    else
                        itemElement = this._createItemByRenderer(this._itemRenderDefault, renderArgs);
                    itemElement.addClass(this._itemClass()).data(this._itemDataKey(), item);
                    var postprocessRenderArgs = {
                            itemElement: itemElement,
                            itemData: item,
                            itemIndex: index
                        };
                    this._postprocessRenderItem(postprocessRenderArgs);
                    this._getItemRenderAction()({
                        itemElement: itemElement,
                        itemData: item
                    });
                    return itemElement
                },
                _createItemRenderAction: function() {
                    return this._itemRenderAction = this._createActionByOption("itemRenderedAction", {
                            element: this._element(),
                            excludeValidators: ["gesture", "designMode", "disabled"]
                        })
                },
                _getItemRenderAction: function() {
                    return this._itemRenderAction || this._createItemRenderAction()
                },
                _getItemRenderer: function() {
                    this._itemRender = this._itemRender || this.option("itemRender");
                    return this._itemRender
                },
                _createItemByRenderer: function(itemRenderer, renderArgs) {
                    var itemElement = $("<div />").appendTo(renderArgs.container);
                    var rendererResult = itemRenderer.call(this, renderArgs.item, renderArgs.index, itemElement);
                    if (rendererResult != null && itemElement[0] !== rendererResult[0])
                        itemElement.append(rendererResult);
                    return itemElement
                },
                _getItemTemplateName: function() {
                    this._itemTemplateName = this._itemTemplateName || this.option("itemTemplate");
                    return this._itemTemplateName
                },
                _createItemByTemplate: function(itemTemplate, renderArgs) {
                    return itemTemplate.render(renderArgs.container, renderArgs.item, renderArgs.index, "ignoreTarget")
                },
                _itemRenderDefault: function(item, index, itemElement) {
                    if ($.isPlainObject(item)) {
                        if (item.visible !== undefined && !item.visible)
                            itemElement.hide();
                        if (item.disabled)
                            itemElement.addClass("dx-state-disabled");
                        if (item.text)
                            itemElement.text(item.text);
                        if (item.html)
                            itemElement.html(item.html)
                    }
                    else
                        itemElement.html(String(item))
                },
                _postprocessRenderItem: $.noop,
                _renderEmptyMessage: function() {
                    var noDataText = this.option("noDataText"),
                        items = this.option("items"),
                        dataSourceLoading = this._dataSource && this._dataSource.isLoading(),
                        hideNoData = !noDataText || items && items.length || dataSourceLoading;
                    if (hideNoData && this._$nodata) {
                        this._$nodata.remove();
                        this._$nodata = null
                    }
                    if (!hideNoData) {
                        this._$nodata = this._$nodata || $("<div />").addClass("dx-empty-message");
                        this._$nodata.appendTo(this._itemContainer()).text(noDataText)
                    }
                },
                _handleItemJQueryEvent: function(jQueryEvent, handlerOptionName, actionArgs, actionConfig) {
                    this._handleItemEvent(jQueryEvent.target, handlerOptionName, $.extend(actionArgs, {jQueryEvent: jQueryEvent}), actionConfig)
                },
                _handleItemEvent: function(initiator, handlerOptionName, actionArgs, actionConfig) {
                    var $itemElement = this._closestItemElement($(initiator)),
                        action = this._createActionByOption(handlerOptionName, actionConfig);
                    actionArgs = $.extend({
                        itemElement: $itemElement,
                        itemData: this._getItemData($itemElement)
                    }, actionArgs);
                    return action(actionArgs)
                },
                _closestItemElement: function($element) {
                    return $($element).closest(this._itemSelector())
                },
                _getItemData: function($itemElement) {
                    return $itemElement.data(this._itemDataKey())
                }
            }).include(ui.DataHelperMixin);
        ui.CollectionContainerWidget = CollectionContainerWidget
    })(jQuery, DevExpress);
    /*! Module core, file ui.selectableCollectionWidget.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            events = ui.events;
        var SelectableCollectionWidget = ui.CollectionContainerWidget.inherit({
                _defaultOptions: function() {
                    return $.extend(this.callBase(), {
                            selectedIndex: -1,
                            itemSelectAction: null
                        })
                },
                _render: function() {
                    this.callBase();
                    this._renderSelectedIndex(this.option("selectedIndex"));
                    this._attachSelectedEvent()
                },
                _attachSelectedEvent: function() {
                    var itemSelector = this._itemSelector(),
                        itemSelectAction = this._createAction(this._handleItemSelect),
                        handleItemClick = $.proxy(this._handleItemClick, this),
                        eventName = events.addNamespace("dxclick", this.NAME);
                    this._element().off(eventName, itemSelector).on(eventName, itemSelector, function(e) {
                        var $itemElement = $(e.target).closest(itemSelector);
                        itemSelectAction({
                            itemElement: $itemElement,
                            jQueryEvent: e
                        });
                        handleItemClick(e)
                    })
                },
                _handleItemSelect: function(args) {
                    var e = args.jQueryEvent,
                        instance = args.component;
                    if (events.needSkipEvent(e))
                        return;
                    var itemElements = instance._itemElements(),
                        selectedItemElement = $(e.target).closest(instance._itemSelector()),
                        selectedItemIndex = itemElements.index(selectedItemElement);
                    if (instance.option("selectedIndex") !== selectedItemIndex)
                        instance._onItemSelectAction(selectedItemIndex)
                },
                _onItemSelectAction: function(newIndex) {
                    this.option("selectedIndex", newIndex)
                },
                _renderSelectedIndex: DX.abstract,
                _renderEmptyMessage: $.noop,
                _attachClickEvent: $.noop,
                _optionChanged: function(name, value, prevValue) {
                    switch (name) {
                        case"selectedIndex":
                            this._renderSelectedIndex(value, prevValue);
                            this._handleItemEvent(this._selectedItemElement(value), "itemSelectAction", null, {excludeValidators: ["gesture"]});
                            break;
                        case"itemSelectAction":
                            break;
                        default:
                            this.callBase.apply(this, arguments)
                    }
                },
                _selectedItemElement: function(index) {
                    return this._itemElements().eq(index)
                }
            });
        ui.SelectableCollectionWidget = SelectableCollectionWidget
    })(jQuery, DevExpress);
    /*! Module core, file ui.optionsByDevice.js */
    (function($, DX, undefined) {
        var isNativeSupported = function(device) {
                var realDevice = DX.devices.real,
                    realPlatform = realDevice.platform,
                    realVersion = realDevice.version,
                    isObsoleteAndroid = realVersion && realVersion[0] < 4 && realPlatform === "android",
                    isNativeScrollDevice = !isObsoleteAndroid && $.inArray(realPlatform, ["ios", "android", "win8"]) > -1,
                    isPlatformForced = realPlatform !== device.platform,
                    isForcedGeneric = device.platform === "generic",
                    isDesktop = realDevice.platform === "generic" && device.platform === "desktop";
                return isNativeScrollDevice && (!isPlatformForced || isForcedGeneric) || isDesktop
            };
        var isChromeBrowser = /chrome/i.test(navigator.userAgent);
        var optionConfigurator = {};
        optionConfigurator.dxActionSheet = function(device) {
            if (device.platform === "ios" && device.tablet)
                return {usePopover: true}
        };
        optionConfigurator.dxRadioGroup = function(device) {
            if (device.tablet)
                return {layout: "horizontal"}
        };
        optionConfigurator.dxDateBox = function(device) {
            if (device.android || device.win8)
                return {useNativePicker: false}
        };
        optionConfigurator.dxDatePickerRoller = function(device) {
            if (device.platform === "win8")
                return {clickableItems: true}
        };
        optionConfigurator.dxDatePicker = function(device) {
            if (device.platform !== "win8")
                return {
                        width: 333,
                        height: 331
                    };
            else
                return {
                        fullScreen: true,
                        showNames: true
                    }
        };
        optionConfigurator.dxDialog = function(device) {
            if (device.platform === "ios")
                return {width: 276};
            if (device.platform === "win8" && !device.phone)
                return {width: "60%"};
            if (device.platform === "win8")
                return {
                        width: function() {
                            return $(window).width()
                        },
                        position: {
                            my: "top center",
                            at: "top center",
                            of: window,
                            offset: "0 0"
                        }
                    };
            if (device.platform === "android")
                return {
                        lWidth: "60%",
                        pWidth: "80%"
                    }
        };
        optionConfigurator.dxDropDownMenu = function(device) {
            if (device.platform === "ios")
                return {usePopover: true}
        };
        optionConfigurator.dxLoadIndicator = function(device) {
            var realDevice = DevExpress.devices.real,
                obsoleteAndroid = realDevice.platform === "android" && !isChromeBrowser;
            if (DevExpress.browser.msie && DevExpress.browser.version[0] <= 10 || obsoleteAndroid)
                return {viaImage: true}
        };
        optionConfigurator.dxLoadPanel = function(device) {
            if (device.platform === "desktop")
                return {width: 180}
        };
        var iosPopupAnimation = {
                show: {
                    type: "slide",
                    duration: 400,
                    from: {position: {
                            my: "top",
                            at: "bottom",
                            of: window
                        }},
                    to: {position: {
                            my: "center",
                            at: "center",
                            of: window
                        }}
                },
                hide: {
                    type: "slide",
                    duration: 400,
                    from: {position: {
                            my: "center",
                            at: "center",
                            of: window
                        }},
                    to: {position: {
                            my: "top",
                            at: "bottom",
                            of: window
                        }}
                }
            };
        optionConfigurator.dxLookup = function(device) {
            if (device.platform === "win8" && device.phone)
                return {
                        showCancelButton: false,
                        fullScreen: true
                    };
            if (device.platform === "win8" && !device.phone)
                return {popupWidth: "60%"};
            if (device.platform === "ios" && device.phone)
                return {
                        fullScreen: true,
                        animation: iosPopupAnimation
                    };
            if (device.platform === "ios" && device.tablet)
                return {
                        popupWidth: function() {
                            return Math.min($(window).width(), $(window).height()) * 0.4
                        },
                        popupHeight: function() {
                            return Math.min($(window).width(), $(window).height()) * 0.4
                        },
                        usePopover: true
                    }
        };
        optionConfigurator.dxPopup = function(device) {
            if (device.platform === "win8" && !device.phone)
                return {width: "60%"};
            if (device.platform === "win8" && device.phone)
                return {position: {
                            my: "top center",
                            at: "top center",
                            of: window,
                            offset: "0 0"
                        }};
            if (device.platform === "ios")
                return {animation: iosPopupAnimation}
        };
        optionConfigurator.dxScrollable = function(device) {
            var realDevice = DevExpress.devices.real;
            if (!isNativeSupported(device))
                return {
                        useNative: false,
                        useSimulatedScrollBar: true
                    };
            else if (realDevice.android)
                return {useSimulatedScrollBar: true}
        };
        optionConfigurator.dxScrollView = function(device) {
            var result = optionConfigurator.dxScrollable(device) || {};
            var realDevice = DevExpress.devices.real;
            if (realDevice.platform === "ios" || device.platform === "desktop" || device.platform === "generic")
                $.extend(result, {refreshStrategy: "pullDown"});
            if (realDevice.platform === "android")
                $.extend(result, {refreshStrategy: "swipeDown"});
            if (realDevice.platform === "win8")
                $.extend(result, {refreshStrategy: "slideDown"});
            return result
        };
        optionConfigurator.dxList = function(device) {
            var result = optionConfigurator.dxScrollable(device) || {};
            if ("useNative" in result) {
                result.useNativeScrolling = result.useNative;
                delete result.useNative
            }
            delete result.useSimulatedScrollBar;
            if (device.platform === "desktop")
                $.extend(result, {
                    showNextButton: true,
                    autoPagingEnabled: false,
                    editConfig: {selectionMode: "control"}
                });
            if (device.platform === "ios" || device.platform === "ios7")
                $.extend(result, {editConfig: {deleteMode: device.version === 7 ? "slideItem" : "slideButton"}});
            if (device.platform === "android")
                $.extend(result, {editConfig: {deleteMode: "swipe"}});
            if (device.platform === "win8")
                $.extend(result, {editConfig: {deleteMode: "hold"}});
            if (device.platform === "generic")
                $.extend(result, {editConfig: {deleteMode: "slideItem"}});
            return result
        };
        optionConfigurator.dxToast = function(device) {
            if (device.platform === "win8")
                return {
                        position: {
                            my: "top center",
                            at: "top center",
                            of: window,
                            offset: "0 0"
                        },
                        width: function() {
                            return $(window).width() - 20
                        }
                    }
        };
        optionConfigurator.dxToolbar = function(device) {
            if (device.platform === "ios")
                return {submenuType: "dxActionSheet"};
            if (device.platform === "win8")
                return {submenuType: "dxList"};
            if (device.platform === "android")
                return {submenuType: "dxDropDownMenu"}
        };
        DX.ui.optionsByDevice = function(device, componentName) {
            var configurator = optionConfigurator[componentName];
            return configurator && configurator(device)
        }
    })(jQuery, DevExpress);
    /*! Module core, file ui.tooltip.js */
    (function($, DX, undefined) {
        var ui = DX.ui;
        var tooltip = {
                _instance: null,
                _positionAliases: [{top: {
                            my: "bottom center",
                            at: "top center"
                        }}, {bottom: {
                            my: "top center",
                            at: "bottom center"
                        }}, {right: {
                            my: "left center",
                            at: "right center"
                        }}, {left: {
                            my: "right center",
                            at: "left center"
                        }}],
                _getPositionByAlias: function(alias) {
                    var position = null;
                    $.each(this._positionAliases, function(i, item) {
                        if (item[alias]) {
                            position = item[alias];
                            return false
                        }
                    });
                    return position
                },
                _normalizePosition: function(position) {
                    if (DX.utils.isString(position))
                        return $.extend(position, this._getPositionByAlias(position));
                    return position
                },
                _createTooltip: function(options) {
                    var _this = this;
                    var defaultOptions = {
                            position: {
                                my: "bottom center",
                                at: "top center"
                            },
                            visible: true,
                            isTooltip: true,
                            hiddenAction: function() {
                                delete _this._instance
                            }
                        };
                    var content = options.content;
                    delete options.content;
                    options = $.extend(true, defaultOptions, options);
                    options.position = this._normalizePosition(options.position);
                    options.position.of = options.target;
                    var $tooltip = $("<div />").html(content).dxPopover(options);
                    this._instance = $tooltip.dxPopover("instance")
                },
                show: function(options) {
                    if (!this._instance)
                        this._createTooltip(options);
                    return this._instance
                },
                hide: function() {
                    var d = $.Deferred();
                    this._instance.hide().done(function() {
                        d.resolve()
                    });
                    return d.promise()
                }
            };
        $.extend(ui, {tooltip: tooltip})
    })(jQuery, DevExpress)
}