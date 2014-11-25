/*! 
* DevExpress Visualization Gauges (part of ChartJS)
* Version: 13.2.8
* Build date: Mar 11, 2014
*
* Copyright (c) 2012 - 2014 Developer Express Inc. ALL RIGHTS RESERVED
* EULA: http://chartjs.devexpress.com/EULA
*/

"use strict";
if (!DevExpress.MOD_VIZ_GAUGES) {
    if (!window.DevExpress)
        throw Error('Required module is not referenced: core');
    if (!DevExpress.MOD_VIZ_CORE)
        throw Error('Required module is not referenced: viz-core');
    /*! Module viz-gauges, file namespaces.js */
    (function(DX) {
        DX.viz.gauges = {__internals: {
                circularNeedles: {},
                circularMarkers: {},
                linearNeedles: {},
                linearMarkers: {}
            }};
        DX.viz.gauges.__tests = {}
    })(DevExpress);
    /*! Module viz-gauges, file factory.js */
    (function(DX, $, undefined) {
        var internals = DX.viz.gauges.__internals,
            circularNeedles = internals.circularNeedles,
            circularMarkers = internals.circularMarkers,
            linearNeedles = internals.linearNeedles,
            linearMarkers = internals.linearMarkers;
        var _String = window.String,
            _isString = DX.utils.isString;
        DX.viz.gauges.__factory = {
            createTranslator: function(fromAngle, toAngle, fromValue, toValue) {
                return new DX.viz.core.Translator1D(fromValue, toValue, fromAngle, toAngle)
            },
            createRenderer: function(options) {
                return new DX.viz.renderers.Renderer(options)
            },
            createCircularValueIndicator: function(type) {
                var indicatorType = circularNeedles.RectangleNeedle;
                switch (_String(type).toLowerCase()) {
                    case'rectangleneedle':
                    case'rectangle':
                        indicatorType = circularNeedles.RectangleNeedle;
                        break;
                    case'triangleneedle':
                    case'triangle':
                        indicatorType = circularNeedles.TriangleNeedle;
                        break;
                    case'twocolorneedle':
                    case'twocolorrectangle':
                        indicatorType = circularNeedles.TwoColorRectangleNeedle;
                        break;
                    case'rangebar':
                        indicatorType = internals.CircularRangeBar;
                        break
                }
                return new indicatorType
            },
            createLinearValueIndicator: function(type) {
                var indicatorType = internals.LinearRangeBar;
                switch (_String(type).toLowerCase()) {
                    case'rectangle':
                        indicatorType = linearNeedles.RectangleNeedle;
                        break;
                    case'rhombus':
                        indicatorType = linearNeedles.RhombusNeedle;
                        break;
                    case'circle':
                        indicatorType = linearNeedles.CircleNeedle;
                        break;
                    case'rangebar':
                        indicatorType = internals.LinearRangeBar;
                        break
                }
                return new indicatorType
            },
            createCircularSubvalueIndicator: function(type) {
                var indicatorType = circularMarkers.TriangleMarker;
                switch (_String(type).toLowerCase()) {
                    case'trianglemarker':
                    case'triangle':
                        indicatorType = circularMarkers.TriangleMarker;
                        break;
                    case'textcloud':
                        indicatorType = circularMarkers.TextCloudMarker;
                        break
                }
                return new indicatorType
            },
            createLinearSubvalueIndicator: function(type) {
                var indicatorType = linearMarkers.TriangleMarker;
                switch (_String(type).toLowerCase()) {
                    case'trianglemarker':
                    case'triangle':
                        indicatorType = linearMarkers.TriangleMarker;
                        break;
                    case'textcloud':
                        indicatorType = linearMarkers.TextCloudMarker;
                        break
                }
                return new indicatorType
            },
            createCircularValueIndicatorInHardMode: function(type) {
                var indicatorType = null;
                switch (_String(type).toLowerCase()) {
                    case'rectangleneedle':
                        indicatorType = circularNeedles.RectangleNeedle;
                        break;
                    case'triangleneedle':
                        indicatorType = circularNeedles.TriangleNeedle;
                        break;
                    case'twocolorneedle':
                        indicatorType = circularNeedles.TwoColorRectangleNeedle;
                        break;
                    case'rangebar':
                        indicatorType = internals.CircularRangeBar;
                        break;
                    case'trianglemarker':
                        indicatorType = circularMarkers.TriangleMarker;
                        break;
                    case'textcloud':
                        indicatorType = circularMarkers.TextCloudMarker;
                        break
                }
                return indicatorType ? new indicatorType : null
            },
            createLinearValueIndicatorInHardMode: function(type) {
                var indicatorType = null;
                switch (_String(type).toLowerCase()) {
                    case'rectangle':
                        indicatorType = linearNeedles.RectangleNeedle;
                        break;
                    case'rhombus':
                        indicatorType = linearNeedles.RhombusNeedle;
                        break;
                    case'circle':
                        indicatorType = linearNeedles.CircleNeedle;
                        break;
                    case'rangebar':
                        indicatorType = internals.LinearRangeBar;
                        break;
                    case'trianglemarker':
                        indicatorType = linearMarkers.TriangleMarker;
                        break;
                    case'textcloud':
                        indicatorType = linearMarkers.TextCloudMarker;
                        break
                }
                return indicatorType ? new indicatorType : null
            },
            createCircularNeedle: function(type) {
                if (_isString(type))
                    switch (type.toLowerCase()) {
                        case'rectangleneedle':
                        case'rectangle':
                            return new circularNeedles.RectangleNeedle;
                        case'twocolorneedle':
                        case'twocolorrectangle':
                            return new circularNeedles.TwoColorRectangleNeedle;
                        case'triangleneedle':
                        case'triangle':
                            return new circularNeedles.TriangleNeedle;
                        case'rangebar':
                            return new internals.CircularRangeBar
                    }
                return undefined
            },
            createLinearNeedle: function(type) {
                if (_isString(type))
                    switch (type.toLowerCase()) {
                        case'rectangle':
                            return new linearNeedles.RectangleNeedle;
                        case'rhombus':
                            return new linearNeedles.RhombusNeedle;
                        case'circle':
                            return new linearNeedles.CircleNeedle;
                        case'rangebar':
                            return new internals.LinearRangeBar
                    }
                return undefined
            },
            createCircularMarker: function(type) {
                if (_isString(type))
                    switch (type.toLowerCase()) {
                        case'trianglemarker':
                        case'triangle':
                            return new circularMarkers.TriangleMarker;
                        case'textcloud':
                            return new circularMarkers.TextCloudMarker
                    }
                return undefined
            },
            createLinearMarker: function(type) {
                if (_isString(type))
                    switch (type.toLowerCase()) {
                        case'trianglemarker':
                        case'triangle':
                            return new linearMarkers.TriangleMarker;
                        case'textcloud':
                            return new linearMarkers.TextCloudMarker
                    }
                return undefined
            },
            createCircularRangeBar: function() {
                return new internals.CircularRangeBar
            },
            createLinearRangeBar: function() {
                return new internals.LinearRangeBar
            },
            createCircularScale: function() {
                return new internals.CircularScale
            },
            createLinearScale: function() {
                return new internals.LinearScale
            },
            createCircularRangeContainer: function() {
                return new internals.CircularRangeContainer
            },
            createLinearRangeContainer: function() {
                return new internals.LinearRangeContainer
            },
            createTitle: function() {
                return new internals.Title
            },
            createIndicator: function() {
                return internals.Indicator && new internals.Indicator || null
            },
            createTooltip: function(parameters) {
                return new internals.Tooltip(parameters)
            },
            createLayoutManager: function() {
                return new internals.LayoutManager
            },
            createThemeManager: function(options) {
                return new internals.ThemeManager(options)
            },
            createTracker: function(parameters) {
                return new internals.Tracker(parameters)
            }
        };
        var _isFunction = DX.utils.isFunction,
            _String = window.String,
            _extend = $.extend;
        var _formatHelper = DX.formatHelper;
        internals.formatValue = function(value, options, extra) {
            options = options || {};
            var text = _formatHelper.format(value, options.format, options.precision),
                context;
            if (_isFunction(options.customizeText)) {
                var context = _extend({
                        value: value,
                        valueText: text
                    }, extra);
                return _String(options.customizeText.call(context, context))
            }
            return text
        };
        internals.getSampleText = function(translator, options) {
            var text1 = internals.formatValue(translator.getDomainStart(), options),
                text2 = internals.formatValue(translator.getDomainEnd(), options);
            return text1.length >= text2.length ? text1 : text2
        }
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file scale.js */
    (function(DX, $, undefined) {
        var formatHelper = DX.formatHelper;
        var getCosAndSin = DX.utils.getCosAndSin,
            normalizeAngle = DX.utils.normalizeAngle,
            convertAngleToRendererSpace = DX.utils.convertAngleToRendererSpace,
            isDefined = DX.utils.isDefined,
            isString = DX.utils.isString,
            isFunction = DX.utils.isFunction,
            isArray = DX.utils.isArray,
            isNaN = window.isNaN,
            Number = window.Number,
            String = window.String,
            max = Math.max,
            min = Math.min,
            abs = Math.abs,
            atan = Math.atan,
            acos = Math.acos,
            ceil = Math.ceil,
            $extend = $.extend,
            $map = $.map;
        var PI = Math.PI;
        var _tickProvider = DX.viz.core.tickProvider;
        function binarySearch(x, list) {
            var a = 0,
                b = list.length - 1,
                flag = list[a] - list[b] < 0,
                c,
                k = -1;
            if (list[a] === x)
                k = a;
            if (list[b] === x)
                k = b;
            while (k < 0 && a <= b) {
                c = ~~((a + b) / 2);
                if (list[c] === x)
                    k = c;
                else if (list[c] - x < 0 === flag)
                    a = c + 1;
                else
                    b = c - 1
            }
            return k
        }
        DX.viz.gauges.__internals.BaseScale = DX.Class.inherit({
            setup: function(parameters) {
                var self = this;
                DX.utils.debug.assertParam(parameters.renderer, '"renderer" is not passed');
                DX.utils.debug.assertParam(parameters.translator, '"translator" is not passed');
                DX.utils.debug.assertParam(parameters.owner, '"owner" is not passed');
                DX.utils.debug.assertParam(parameters.incidentOccured, '"incidentOccured" is not passed');
                self._renderer = parameters.renderer;
                self._translator = parameters.translator;
                self._owner = parameters.owner;
                self._incidentOccured = parameters.incidentOccured;
                self._rootElement = self._renderer.createGroup({'class': 'dxg-scale'});
                self._majorTicks = self._renderer.createGroup({'class': 'dxg-major-ticks'}).append(self._rootElement);
                self._minorTicks = self._renderer.createGroup({'class': 'dxg-minor-ticks'}).append(self._rootElement);
                self._labels = self._renderer.createGroup({'class': 'dxg-labels'}).append(self._rootElement);
                self._options = {};
                return self
            },
            dispose: function() {
                var self = this;
                delete self._renderer;
                delete self._translator;
                delete self._owner;
                delete self._incidentOccured;
                delete self._rootElement;
                delete self._majorTicks;
                delete self._minorTicks;
                delete self._labels;
                delete self._options;
                return self
            },
            init: function(options) {
                var self = this;
                $extend(true, self._options, options);
                self._options.majorTick || (self._options.majorTick = {});
                self._options.minorTick || (self._options.minorTick = {});
                if (options && options.majorTick && isDefined(options.majorTick.customTickValues))
                    self._options.majorTick.customTickValues = isArray(options.majorTick.customTickValues) ? options.majorTick.customTickValues.slice(0) : null;
                if (options && options.minorTick && isDefined(options.minorTick.customTickValues))
                    self._options.minorTick.customTickValues = isArray(options.minorTick.customTickValues) ? options.minorTick.customTickValues.slice(0) : null;
                delete self._processed;
                return self
            },
            _getCustomValues: function(values, compare) {
                var translator = this._translator,
                    result = [];
                if (isArray(values)) {
                    result = $map(values, function(x) {
                        return !isNaN(translator.translate(x)) ? Number(x) : null
                    }).sort(compare);
                    result = $map(result, function(x, i) {
                        return x !== result[i - 1] ? x : null
                    })
                }
                return result
            },
            _generateTicks: function() {
                var self = this,
                    translator = self._translator,
                    gridSpacingFactor = self._getGridSpacingFactor(),
                    majorTicksOptions = {
                        tickInterval: self._options.majorTick.tickInterval > 0 ? Number(self._options.majorTick.tickInterval) : undefined,
                        gridSpacingFactor: gridSpacingFactor.majorTicks,
                        numberMultipliers: [1, 2, 5]
                    },
                    minorTicksOptions = {
                        tickInterval: self._options.minorTick.tickInterval > 0 ? Number(self._options.minorTick.tickInterval) : undefined,
                        gridSpacingFactor: gridSpacingFactor.minorTicks,
                        numberMultipliers: [1, 2, 5]
                    };
                if (self._options.majorTick.useTicksAutoArrangement) {
                    majorTicksOptions.useTicksAutoArrangement = true;
                    majorTicksOptions.renderer = self._renderer;
                    majorTicksOptions.translator = {translateX: function(arg) {
                            return translator.translate(arg)
                        }};
                    majorTicksOptions.getCustomAutoArrangementStep = function(values) {
                        return self._getCuttingFactor(values.length, {
                                width: self._textWidth,
                                height: self._textHeight
                            })
                    }
                }
                var result = _tickProvider.getFullTicks(translator.getDomainStart(), translator.getDomainEnd(), self._getScreenDelta(), majorTicksOptions, minorTicksOptions);
                self = translator = majorTicksOptions = minorTicksOptions = null;
                return result
            },
            _getTicks: function() {
                var self = this,
                    options = self._options,
                    translator = self._translator,
                    compareCallback = translator.getDomainStart() < translator.getDomainEnd() ? function(x, y) {
                        return x - y
                    } : function(x, y) {
                        return y - x
                    },
                    info = self._generateTicks(),
                    majorValues,
                    minorValues,
                    customMajorValues,
                    customMinorValues,
                    list;
                majorValues = options.majorTick.showCalculatedTicks ? info.majorTicks : [];
                customMajorValues = self._getCustomValues(options.majorTick.customTickValues, compareCallback);
                customMajorValues = $map(customMajorValues, function(value) {
                    return binarySearch(value, majorValues) === -1 ? value : null
                });
                minorValues = options.minorTick.showCalculatedTicks ? info.minorTicks : [];
                minorValues = $map(minorValues, function(value) {
                    return binarySearch(value, customMajorValues) === -1 ? value : null
                });
                customMinorValues = self._getCustomValues(options.minorTick.customTickValues, compareCallback);
                list = majorValues.concat(minorValues, customMajorValues).sort(compareCallback);
                customMinorValues = $map(customMinorValues, function(value) {
                    return binarySearch(value, list) === -1 ? value : null
                });
                return {
                        major: $map(majorValues.concat(customMajorValues), function(value) {
                            return {
                                    value: value,
                                    position: translator.translate(value)
                                }
                        }),
                        minor: $map(minorValues.concat(customMinorValues), function(value) {
                            return {
                                    value: value,
                                    position: translator.translate(value)
                                }
                        })
                    }
            },
            _renderContent: function(ticks) {
                var self = this,
                    options = self._options,
                    i,
                    ii,
                    item,
                    points,
                    element,
                    textPosition,
                    textValue;
                if (self._majorTickLength && self._majorTickWidth) {
                    self._majorTicks.applySettings({fill: isString(options.majorTick.color) ? options.majorTick.color : 'none'});
                    points = self._getTickPoints(self._majorTickLength, self._majorTickWidth);
                    i = 0;
                    ii = ticks.major.length;
                    options.hideFirstTick === true && ++i;
                    options.hideLastTick === true && --ii;
                    for (; i < ii; ++i) {
                        item = ticks.major[i];
                        element = self._renderer.createArea(points);
                        self._moveTick(element, item);
                        element.append(self._majorTicks)
                    }
                }
                if (self._minorTickLength && self._minorTickWidth) {
                    self._minorTicks.applySettings({fill: isString(options.minorTick.color) ? options.minorTick.color : 'none'});
                    points = self._getTickPoints(self._minorTickLength, self._minorTickWidth);
                    for (i = 0, ii = ticks.minor.length; i < ii; ++i) {
                        item = ticks.minor[i];
                        element = self._renderer.createArea(points);
                        self._moveTick(element, item);
                        element.append(self._minorTicks)
                    }
                }
                if (self._textIndent) {
                    self._labels.applySettings({
                        align: self._getLabelAlign(self._textIndent),
                        font: options.label.font
                    });
                    textPosition = self._getLabelPosition(self._majorTickLength || 0, self._textIndent);
                    i = 0;
                    ii = ticks.major.length;
                    options.hideFirstLabel === true && ++i;
                    options.hideLastLabel === true && --ii;
                    for (; i < ii; ++i) {
                        item = ticks.major[i];
                        textValue = self._formatValue(item.value);
                        points = self._getLabelOptions(textValue, textPosition, self._textIndent, item);
                        self._renderer.createText(textValue, points.x, points.y + self._textVerticalOffset).append(self._labels)
                    }
                }
            },
            _processOptions: function() {
                var self = this,
                    options = self._options;
                if (self._processed)
                    return;
                self._processed = true;
                self._setupOrientation();
                self._majorTickLength = self._majorTickWidth = self._minorTickLength = self._minorTickWidth = self._textIndent = 0;
                if (options.majorTick.visible) {
                    if (options.majorTick.length > 0)
                        self._majorTickLength = Number(options.majorTick.length);
                    else
                        self._incidentOccured('Major ticks have not been drawn because the value of the "majorTick.length" option is not valid.');
                    if (options.majorTick.width > 0)
                        self._majorTickWidth = Number(options.majorTick.width);
                    else
                        self._incidentOccured('Major ticks have not been drawn because the value of the "majorTick.width" option is not valid.')
                }
                if (options.minorTick.visible) {
                    if (options.minorTick.length > 0)
                        self._minorTickLength = Number(options.minorTick.length);
                    else
                        self._incidentOccured('Minor ticks have not been drawn because the value of the "minorTick.length" option is not valid.');
                    if (options.minorTick.width > 0)
                        self._minorTickWidth = Number(options.minorTick.width);
                    else
                        self._incidentOccured('Minor ticks have not been drawn because the value of the "minorTick.width" option is not valid.')
                }
                if (options.label.visible)
                    if (Number(options.label.indentFromTick) !== 0) {
                        self._textIndent = Number(options.label.indentFromTick);
                        self._measureText()
                    }
                    else
                        self._incidentOccured('Labels have not been drawn because the value of the "label.indentFromTick"" option is not valid.')
            },
            clean: function() {
                var self = this;
                self._rootElement.detach();
                self._majorTicks.clear();
                self._minorTicks.clear();
                self._labels.clear();
                self._rendered = false;
                return self
            },
            render: function() {
                var self = this;
                self._processOptions();
                if (self._isVisible()) {
                    self._rendered = true;
                    self._rootElement.append(self._owner);
                    var ticks = self._getTicks();
                    self._renderContent(ticks)
                }
                return self
            },
            _formatValue: function(value) {
                var labelOptions = this._options.label,
                    result = formatHelper.format(value, labelOptions.format, labelOptions.precision);
                if (isFunction(labelOptions.customizeText)) {
                    result = {
                        value: value,
                        valueText: result
                    };
                    result = String(labelOptions.customizeText.call(result, result))
                }
                return result
            },
            _getSampleText: function() {
                var self = this,
                    start = self._translator.getDomainStart(),
                    end = self._translator.getDomainEnd(),
                    texts = [],
                    i,
                    ii,
                    text,
                    maxLength = 0,
                    maxText = '';
                var ticks = _tickProvider.getTicks({
                        min: start,
                        max: end,
                        tickInterval: self._options.majorTick.tickInterval > 0 ? Number(self._options.majorTick.tickInterval) : undefined,
                        screenDelta: self._options.approximateScreenDelta,
                        gridSpacingFactor: self._getGridSpacingFactor().majorTicks
                    });
                for (i = 0, ii = ticks.length; i < ii; ++i) {
                    text = self._formatValue(ticks[i]);
                    text.length > maxLength && (maxText = text) && (maxLength = text.length)
                }
                return maxText
            },
            _measureText: function() {
                var self = this,
                    value = self._getSampleText(),
                    text = self._renderer.createText(value, 0, 0, {font: self._options.label.font}).append(self._labels),
                    bbox;
                self._rendered || self._rootElement.append(self._owner);
                bbox = text.getBBox();
                self._rendered || self._rootElement.detach();
                text.remove();
                self._textVerticalOffset = -bbox.y - bbox.height / 2;
                self._textWidth = bbox.width;
                self._textHeight = bbox.height;
                self._textLength = value.length
            }
        });
        function getBasedAngle(startAngle, endAngle) {
            var startDelta,
                endDelta,
                tmp;
            if (startAngle > endAngle) {
                tmp = endAngle;
                endAngle = startAngle;
                startAngle = tmp
            }
            startDelta = 0 <= startAngle && startAngle <= 180 ? abs(90 - startAngle) : abs(270 - startAngle);
            startDelta = startAngle < 90 && 90 < endAngle || startAngle < 270 && 270 < endAngle ? 0 : startDelta;
            endDelta = 0 < endAngle && endAngle < 180 ? abs(90 - endAngle) : abs(270 - endAngle);
            return startDelta < endDelta ? startDelta : endDelta
        }
        DX.viz.gauges.__internals.CircularScale = DX.viz.gauges.__internals.BaseScale.inherit({
            _getGridSpacingFactor: function() {
                return {
                        majorTicks: 17,
                        minorTicks: 5
                    }
            },
            _getScreenDelta: function() {
                var self = this;
                return (self._translator.getCodomainStart() - self._translator.getCodomainEnd()) * self._options.radius * PI / 180
            },
            _getCuttingFactor: function(ticksCount, maxLabelSize) {
                var self = this,
                    options = self._options,
                    startAngle = self._translator.getCodomainStart(),
                    endAngle = self._translator.getCodomainEnd(),
                    radius = self._getLabelPosition(self._majorTickLength || 0, self._textIndent),
                    baseAngle = getBasedAngle(normalizeAngle(startAngle), normalizeAngle(endAngle)),
                    baseAngleCosSin = getCosAndSin(baseAngle),
                    degreesPerTick = (startAngle - endAngle) / ticksCount,
                    minAngleBetweenTicks,
                    widthBasedAngle,
                    tanOfWidthBasedAngle,
                    heightBasedAngle,
                    cosOfHeightBasedAngle,
                    cuttingBackFactor = 1;
                tanOfWidthBasedAngle = (baseAngleCosSin.sin * radius + maxLabelSize.width) / (baseAngleCosSin.cos * radius);
                widthBasedAngle = abs(baseAngle - atan(tanOfWidthBasedAngle) * 180 / PI);
                cosOfHeightBasedAngle = baseAngleCosSin.cos - maxLabelSize.height / radius;
                heightBasedAngle = -1 > cosOfHeightBasedAngle || cosOfHeightBasedAngle > 1 ? 90 : abs(baseAngle - acos(cosOfHeightBasedAngle) * 180 / PI);
                minAngleBetweenTicks = widthBasedAngle < heightBasedAngle ? widthBasedAngle : heightBasedAngle;
                if (degreesPerTick < minAngleBetweenTicks)
                    cuttingBackFactor = ceil(minAngleBetweenTicks / degreesPerTick);
                return max(1, cuttingBackFactor)
            },
            _setupOrientation: function() {
                var self = this,
                    inner = 0,
                    outer = 0;
                switch (self._options.orientation) {
                    case'inside':
                        inner = 1;
                        break;
                    case'center':
                        inner = outer = 0.5;
                        break;
                    default:
                        self._options.orientation !== 'outside' && self._incidentOccured('The value of the "orientation" option is not valid.');
                        outer = 1;
                        break
                }
                self._inner = inner;
                self._outer = outer
            },
            _getTickPoints: function(length, width) {
                var options = this._options,
                    x1 = options.x - width / 2,
                    x2 = options.x + width / 2,
                    y1 = options.y - options.radius - length * this._outer,
                    y2 = options.y - options.radius + length * this._inner;
                return [x1, y1, x2, y1, x2, y2, x1, y2]
            },
            _moveTick: function(element, tick) {
                element.rotate(convertAngleToRendererSpace(tick.position), this._options.x, this._options.y)
            },
            _getLabelPosition: function(tickLength, textIndent) {
                return this._options.radius + tickLength * (textIndent >= 0 ? this._outer : -this._inner) + textIndent
            },
            _getLabelAlign: function() {
                return 'center'
            },
            _getLabelOptions: function(textValue, textPosition, textIndent, tick) {
                var self = this,
                    options = self._options,
                    cossin = getCosAndSin(tick.position),
                    x = options.x + cossin.cos * textPosition,
                    y = options.y - cossin.sin * textPosition,
                    dx = cossin.cos * (textValue.length / self._textLength) * self._textWidth / 2,
                    dy = cossin.sin * self._textHeight / 2;
                if (textIndent > 0) {
                    x += dx;
                    y -= dy
                }
                else {
                    x -= dx;
                    y += dy
                }
                return {
                        x: x,
                        y: y
                    }
            },
            _isVisible: function() {
                var self = this,
                    length = self._majorTickLength || 0,
                    r = self._options.radius,
                    inner = r - self._inner * length,
                    outer = r + self._outer * length;
                return inner > 0 && outer > inner
            },
            measure: function() {
                var self = this,
                    options = self._options,
                    result = {
                        min: options.radius,
                        max: options.radius
                    };
                self._processOptions();
                if (self._majorTickLength) {
                    result.min -= self._inner * self._majorTickLength;
                    result.max += self._outer * self._majorTickLength
                }
                if (self._textIndent) {
                    if (self._textIndent >= 0) {
                        result.horizontalOffset = self._textIndent + self._textWidth;
                        result.verticalOffset = self._textIndent + self._textHeight
                    }
                    else {
                        result.horizontalOffset = 0;
                        result.verticalOffset = 0;
                        result.min += self._textIndent - max(self._textWidth, self._textHeight)
                    }
                    result.inverseHorizontalOffset = self._textWidth / 2;
                    result.inverseVerticalOffset = self._textHeight / 2
                }
                return result
            }
        });
        DX.viz.gauges.__internals.LinearScale = DX.viz.gauges.__internals.BaseScale.inherit({
            _getGridSpacingFactor: function() {
                return {
                        majorTicks: 25,
                        minorTicks: 5
                    }
            },
            _getScreenDelta: function() {
                return abs(this._translator.getCodomainEnd() - this._translator.getCodomainStart())
            },
            _getCuttingFactor: function(ticksCount, maxLabelSize) {
                var self = this,
                    labelSize = self._vertical ? maxLabelSize.height : maxLabelSize.width,
                    screenSize = abs(self._translator.getCodomainEnd() - self._translator.getCodomainStart());
                return max(1, ceil(ticksCount * labelSize / (screenSize + labelSize)))
            },
            _setupOrientation: function() {
                var self = this,
                    inner = 0,
                    outer = 0;
                self._vertical = self._options.orientation === 'vertical';
                if (self._vertical)
                    switch (self._options.horizontalOrientation) {
                        case'left':
                            inner = 1;
                            break;
                        case'center':
                            inner = outer = 0.5;
                            break;
                        default:
                            self._options.horizontalOrientation !== 'right' && self._incidentOccured('The value of the "horizontalOrientation" option is not valid.');
                            outer = 1;
                            break
                    }
                else
                    switch (self._options.verticalOrientation) {
                        case'top':
                            inner = 1;
                            break;
                        case'middle':
                            inner = outer = 0.5;
                            break;
                        default:
                            self._options.verticalOrientation !== 'bottom' && self._incidentOccured('The value of the "verticalOrientation" option is not valid.');
                            outer = 1;
                            break
                    }
                self._inner = inner;
                self._outer = outer
            },
            _getTickPoints: function(length, width) {
                var options = this._options,
                    x1,
                    x2,
                    y1,
                    y2;
                if (this._vertical) {
                    x1 = options.x - length * this._inner;
                    x2 = options.x + length * this._outer;
                    y1 = -width / 2;
                    y2 = width / 2
                }
                else {
                    x1 = -width / 2;
                    x2 = width / 2;
                    y1 = options.y - length * this._inner;
                    y2 = options.y + length * this._outer
                }
                return [x1, y1, x2, y1, x2, y2, x1, y2]
            },
            _moveTick: function(element, tick) {
                var options = this._options,
                    x = 0,
                    y = 0;
                if (this._vertical)
                    y = tick.position;
                else
                    x = tick.position;
                element.move(x, y)
            },
            _getLabelPosition: function(tickLength, textIndent) {
                var options = this._options,
                    position = tickLength * (textIndent >= 0 ? this._outer : -this._inner) + textIndent;
                if (this._vertical)
                    position += options.x;
                else
                    position += options.y + (textIndent >= 0 ? 1 : -1) * this._textVerticalOffset;
                return position
            },
            _getLabelAlign: function(textIndent) {
                return this._vertical ? textIndent > 0 ? 'left' : 'right' : 'center'
            },
            _getLabelOptions: function(textValue, textPosition, textIndent, tick) {
                var x,
                    y;
                if (this._vertical) {
                    x = textPosition;
                    y = tick.position
                }
                else {
                    x = tick.position;
                    y = textPosition
                }
                return {
                        x: x,
                        y: y
                    }
            },
            _isVisible: function() {
                return true
            },
            measure: function() {
                var self = this,
                    options = self._options,
                    result;
                self._processOptions();
                if (self._vertical) {
                    result = {
                        min: options.x,
                        max: options.x
                    };
                    if (self._majorTickLength) {
                        result.min -= self._inner * self._majorTickLength;
                        result.max += self._outer * self._majorTickLength
                    }
                    if (self._textIndent) {
                        if (self._textIndent >= 0)
                            result.max += self._textIndent + self._textWidth;
                        else
                            result.min += self._textIndent - self._textWidth;
                        result.indent = self._textHeight / 2
                    }
                }
                else {
                    result = {
                        min: options.y,
                        max: options.y
                    };
                    if (self._majorTickLength) {
                        result.min -= self._inner * self._majorTickLength;
                        result.max += self._outer * self._majorTickLength
                    }
                    if (self._textIndent) {
                        if (self._textIndent >= 0)
                            result.max += self._textIndent + self._textHeight;
                        else
                            result.min += self._textIndent - self._textHeight;
                        result.indent = self._textWidth / 2
                    }
                }
                return result
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file baseIndicator.js */
    (function(DX, $, undefined) {
        var isFinite = window.isFinite,
            Number = window.Number,
            $extend = $.extend;
        DX.viz.gauges.__internals.BaseIndicator = DX.Class.inherit({
            setup: function(parameters) {
                var self = this;
                self._renderer = parameters.renderer;
                self._translator = parameters.translator;
                self._owner = parameters.owner;
                self._tracker = parameters.tracker;
                self._className = parameters.className;
                self._options = {};
                self._rootElement = self._createRoot();
                return self
            },
            dispose: function() {
                var self = this;
                self._renderer = self._owner = self._translator = self._tracker = self._options = self._rootElement = null;
                return self
            },
            init: function(options) {
                $extend(true, this._options, options);
                return this
            },
            _setupAnimation: function() {
                var self = this;
                if (self._options.animation) {
                    self._animation || (self._animation = {step: function(pos) {
                            self._actualValue = self._animation.start + self._animation.delta * pos;
                            self._actualPosition = self._translator.translate(self._actualValue);
                            self._move()
                        }});
                    self._animation.duration = self._options.animation.duration > 0 ? Number(self._options.animation.duration) : 0;
                    self._animation.easing = self._options.animation.easing
                }
                else
                    delete self._animation
            },
            _runAnimation: function(value) {
                var self = this,
                    animation = self._animation;
                animation.start = self._actualValue;
                animation.delta = value - self._actualValue;
                self._rootElement.animate({_: 0}, {
                    step: animation.step,
                    duration: animation.duration,
                    easing: animation.easing
                })
            },
            _createRoot: function() {
                return this._renderer.createGroup({'class': this._className})
            },
            _createTracker: function() {
                return this._renderer.createArea()
            },
            _getTrackerSettings: function(){},
            clean: function() {
                var self = this;
                self._animation && self._rootElement.stopAnimation() && (self._animation = null);
                self._rootElement.detach();
                self._rootElement.clear();
                self._visible = false;
                self._clear();
                if (self._trackerElement) {
                    self._tracker.detach(self._trackerElement);
                    self._trackerElement = null
                }
                return self
            },
            render: function() {
                var self = this;
                self._actualValue = self._currentValue = self._translator.adjust(self._options.currentValue);
                self._actualPosition = self._translator.translate(self._actualValue);
                self._visible = self._isVisible();
                if (self._visible) {
                    self._setupAnimation();
                    self._rootElement.applySettings({fill: self._options.color});
                    self._rootElement.append(self._owner);
                    self._render();
                    self._trackerElement = self._trackerElement || self._createTracker();
                    self._trackerElement.applySettings(self._getTrackerSettings());
                    self._tracker.attach(self._trackerElement, self, self._trackerInfo);
                    self._move()
                }
                return self
            },
            update: function(options) {
                this.init(options);
                this._update();
                return this
            },
            _update: $.noop,
            value: function(arg, _noAnimation) {
                var self = this,
                    val;
                if (arguments.length) {
                    val = self._translator.adjust(arg);
                    if (self._currentValue !== val && isFinite(val)) {
                        self._currentValue = val;
                        if (self._visible)
                            if (self._animation && !_noAnimation)
                                self._runAnimation(val);
                            else {
                                self._actualValue = val;
                                self._actualPosition = self._translator.translate(val);
                                self._move()
                            }
                    }
                    return self
                }
                return self._currentValue
            },
            _isVisible: function() {
                throw new Error('_isVisible - not implemented');
            },
            _render: function() {
                throw new Error('_render - not implemented');
            },
            _clear: function() {
                throw new Error('_clear - not implemented');
            },
            _move: function() {
                throw new Error('_move - not implemented');
            },
            getCurrentValue: function() {
                return this.value()
            },
            setCurrentValue: function(value) {
                return this.value(value)
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file baseMarker.js */
    (function(DX, undefined) {
        var TextCloud = DX.viz.core.TextCloud;
        var formatValue = DX.viz.gauges.__internals.formatValue,
            getSampleText = DX.viz.gauges.__internals.getSampleText;
        DX.viz.gauges.__internals.BaseTextCloudMarker = DX.viz.gauges.__internals.BaseIndicator.inherit({
            _move: function() {
                var self = this,
                    bbox,
                    info = new TextCloud,
                    textCloudOptions = self._getTextCloudOptions();
                self._text.applySettings({text: formatValue(self._actualValue, self._options.text)});
                bbox = self._text.getBBox();
                info.setup({
                    x: textCloudOptions.x,
                    y: textCloudOptions.y,
                    textWidth: bbox.width,
                    textHeight: bbox.height,
                    horMargin: self._options.horizontalOffset,
                    verMargin: self._options.verticalOffset,
                    tailLength: self._options.arrowLength,
                    type: textCloudOptions.type
                });
                self._text.applySettings({
                    x: info.cx(),
                    y: info.cy() + self._textVerticalOffset
                });
                self._cloud.applySettings({points: info.points()});
                self._trackerElement && self._trackerElement.applySettings({points: info.points()})
            },
            _measureText: function() {
                var self = this,
                    root,
                    text,
                    bbox;
                if (!self._textVerticalOffset) {
                    root = self._createRoot().append(self._owner);
                    text = self._renderer.createText(getSampleText(self._translator, self._options.text), 0, 0, {
                        align: 'center',
                        font: self._options.text.font
                    }).append(root);
                    bbox = text.getBBox();
                    root.remove();
                    self._textVerticalOffset = -bbox.y - bbox.height / 2;
                    self._textWidth = bbox.width;
                    self._textHeight = bbox.height;
                    self._textFullWidth = self._textWidth + 2 * self._options.horizontalOffset;
                    self._textFullHeight = self._textHeight + 2 * self._options.verticalOffset
                }
            },
            _render: function() {
                var self = this;
                self._measureText();
                self._cloud = self._cloud || self._renderer.createArea().append(self._rootElement);
                self._text = self._text || self._renderer.createText().append(self._rootElement);
                self._text.applySettings({
                    align: 'center',
                    font: self._options.text.font
                })
            },
            _clear: function() {
                delete this._cloud;
                delete this._text
            },
            getTooltipParameters: function() {
                var position = this._getTextCloudOptions();
                return {
                        x: position.x,
                        y: position.y,
                        value: this._currentValue,
                        color: this._options.color
                    }
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file baseRangeBar.js */
    (function(DX, $, undefined) {
        var $extend = $.extend;
        var formatValue = DX.viz.gauges.__internals.formatValue,
            getSampleText = DX.viz.gauges.__internals.getSampleText;
        DX.viz.gauges.__internals.BaseRangeBar = DX.viz.gauges.__internals.BaseIndicator.inherit({
            _measureText: function() {
                var self = this,
                    root,
                    text,
                    bbox;
                self._hasText = self._isTextVisible();
                if (self._hasText && !self._textVerticalOffset) {
                    root = self._createRoot().append(self._owner);
                    text = self._renderer.createText(getSampleText(self._translator, self._options.text), 0, 0, {
                        'class': 'dxg-text',
                        align: 'center',
                        font: self._options.text.font
                    }).append(root);
                    bbox = text.getBBox();
                    root.remove();
                    self._textVerticalOffset = -bbox.y - bbox.height / 2;
                    self._textWidth = bbox.width;
                    self._textHeight = bbox.height
                }
            },
            _move: function() {
                var self = this;
                self._updateBarItemsPositions();
                if (self._hasText) {
                    self._text.applySettings({text: formatValue(self._actualValue, self._options.text)});
                    self._updateTextPosition();
                    self._updateLinePosition()
                }
            },
            _updateBarItems: function() {
                var self = this,
                    options = self._options,
                    backgroundColor,
                    spaceColor;
                self._setBarSides();
                self._startPosition = self._translator.translate(self._translator.getDomainStart());
                self._endPosition = self._translator.translate(self._translator.getDomainEnd());
                self._basePosition = self._translator.translate(options.baseValue);
                self._space = self._getSpace();
                backgroundColor = options.backgroundColor || 'none';
                if (backgroundColor !== 'none' && self._space > 0)
                    spaceColor = options.containerBackgroundColor || 'none';
                else {
                    self._space = 0;
                    spaceColor = 'none'
                }
                self._backItem1.applySettings({fill: backgroundColor});
                self._backItem2.applySettings({fill: backgroundColor});
                self._spaceItem1.applySettings({fill: spaceColor});
                self._spaceItem2.applySettings({fill: spaceColor})
            },
            _getSpace: function() {
                return 0
            },
            _updateTextItems: function() {
                var self = this;
                if (self._hasText) {
                    self._line = self._line || self._renderer.createPath([], {'class': 'dxg-main-bar'}).append(self._rootElement);
                    self._text = self._text || self._renderer.createText('', 0, 0, {'class': 'dxg-text'}).append(self._rootElement);
                    self._text.applySettings({
                        align: self._getTextAlign(),
                        font: self._getFontOptions()
                    });
                    self._setTextItemsSides()
                }
                else {
                    if (self._line) {
                        self._line.remove();
                        delete self._line
                    }
                    if (self._text) {
                        self._text.remove();
                        delete self._text
                    }
                }
            },
            _isTextVisible: function() {
                return false
            },
            _getTextAlign: function() {
                return 'center'
            },
            _getFontOptions: function() {
                var options = this._options,
                    font = options.text.font;
                if (!font || !font.color)
                    font = $extend({}, font, {color: options.color});
                return font
            },
            _updateBarItemsPositions: function() {
                var self = this,
                    positions = self._getPositions();
                self._backItem1.applySettings(self._buildItemSettings(positions.start, positions.back1));
                self._backItem2.applySettings(self._buildItemSettings(positions.back2, positions.end));
                self._spaceItem1.applySettings(self._buildItemSettings(positions.back1, positions.main1));
                self._spaceItem2.applySettings(self._buildItemSettings(positions.main2, positions.back2));
                self._mainItem.applySettings(self._buildItemSettings(positions.main1, positions.main2));
                self._trackerElement && self._trackerElement.applySettings(self._buildItemSettings(positions.main1, positions.main2))
            },
            _render: function() {
                var self = this;
                self._measureText();
                if (!self._backItem1) {
                    self._backItem1 = self._createBarItem();
                    self._backItem1.applySettings({'class': 'dxg-back-bar'})
                }
                if (!self._backItem2) {
                    self._backItem2 = self._createBarItem();
                    self._backItem2.applySettings({'class': 'dxg-back-bar'})
                }
                if (!self._spaceItem1) {
                    self._spaceItem1 = self._createBarItem();
                    self._spaceItem1.applySettings({'class': 'dxg-space-bar'})
                }
                if (!self._spaceItem2) {
                    self._spaceItem2 = self._createBarItem();
                    self._spaceItem2.applySettings({'class': 'dxg-space-bar'})
                }
                if (!self._mainItem) {
                    self._mainItem = self._createBarItem();
                    self._mainItem.applySettings({'class': 'dxg-main-bar'})
                }
                self._updateBarItems();
                self._updateTextItems()
            },
            _clear: function() {
                var self = this;
                delete self._backItem1;
                delete self._backItem2;
                delete self._spaceItem1;
                delete self._spaceItem2;
                delete self._mainItem;
                delete self._hasText;
                delete self._line;
                delete self._text
            },
            _update: function() {
                this._render();
                this._move();
                this._rootElement.applySettings({fill: this._options.color})
            },
            getTooltipParameters: function() {
                var position = this._getTooltipPosition();
                return {
                        x: position.x,
                        y: position.y,
                        value: this._currentValue,
                        color: this._options.color,
                        offset: 0
                    }
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file circularNeedle.js */
    (function(DX, undefined) {
        var circularNeedles = DX.viz.gauges.__internals.circularNeedles;
        circularNeedles.SimpleIndicator = DX.viz.gauges.__internals.BaseIndicator.inherit({
            _move: function() {
                var self = this,
                    options = self._options,
                    angle = DX.utils.convertAngleToRendererSpace(self._actualPosition);
                self._rootElement.rotate(angle, options.x, options.y);
                self._trackerElement && self._trackerElement.rotate(angle, options.x, options.y)
            },
            _isVisible: function() {
                var options = this._options;
                return options.width > 0 && options.radius - options.indentFromCenter > 0
            },
            _getTrackerSettings: function() {
                var options = this._options,
                    x = options.x,
                    y = options.y - (options.radius + options.indentFromCenter) / 2,
                    width = options.width / 2,
                    length = (options.radius - options.indentFromCenter) / 2;
                width > 10 || (width = 10);
                length > 10 || (length = 10);
                return {points: [x - width, y - length, x - width, y + length, x + width, y + length, x + width, y - length]}
            },
            _renderSpindle: function() {
                var self = this,
                    options = self._options,
                    gapSize;
                if (options.spindleSize > 0) {
                    gapSize = Number(options.spindleGapSize) || 0;
                    if (gapSize > 0)
                        gapSize = gapSize <= options.spindleSize ? gapSize : options.spindleSize;
                    self._spindleOuter = self._spindleOuter || self._renderer.createCircle().append(self._rootElement);
                    self._spindleInner = self._spindleInner || self._renderer.createCircle().append(self._rootElement);
                    self._spindleOuter.applySettings({
                        'class': 'dxg-spindle-border',
                        cx: options.x,
                        cy: options.y,
                        r: options.spindleSize / 2
                    });
                    self._spindleInner.applySettings({
                        'class': 'dxg-spindle-hole',
                        cx: options.x,
                        cy: options.y,
                        r: gapSize / 2,
                        fill: options.containerBackgroundColor
                    })
                }
                else
                    self._clearSpindle()
            },
            _render: function() {
                var self = this,
                    options = self._options;
                self._renderPointer();
                self._renderSpindle()
            },
            _clearSpindle: function() {
                delete this._spindleOuter;
                delete this._spindleInner
            },
            _clearPointer: function() {
                delete this._element
            },
            _clear: function() {
                this._clearPointer();
                this._clearSpindle()
            },
            measure: function() {
                var options = this._options,
                    result = {max: options.radius};
                if (options.indentFromCenter < 0)
                    result.inverseHorizontalOffset = result.inverseVerticalOffset = -options.indentFromCenter;
                return result
            },
            getTooltipParameters: function() {
                var options = this._options,
                    cossin = DX.utils.getCosAndSin(this._actualPosition),
                    r = (options.radius + options.indentFromCenter) / 2;
                return {
                        x: options.x + cossin.cos * r,
                        y: options.y - cossin.sin * r,
                        value: this._currentValue,
                        color: options.color,
                        offset: options.width / 2
                    }
            }
        });
        circularNeedles.RectangleNeedle = circularNeedles.SimpleIndicator.inherit({_renderPointer: function() {
                var self = this,
                    options = self._options,
                    y2 = options.y - options.radius,
                    y1 = options.y - options.indentFromCenter || options.y,
                    x1 = options.x - options.width / 2 || options.x,
                    x2 = x1 + options.width || options.x;
                self._element = self._element || self._renderer.createArea().append(self._rootElement);
                self._element.applySettings({points: [x1, y1, x1, y2, x2, y2, x2, y1]})
            }});
        circularNeedles.TriangleNeedle = circularNeedles.SimpleIndicator.inherit({_renderPointer: function() {
                var self = this,
                    options = self._options,
                    y2 = options.y - options.radius,
                    y1 = options.y - options.indentFromCenter || options.y,
                    x1 = options.x - options.width / 2 || options.x,
                    x2 = options.x + options.width / 2 || options.x;
                self._element = self._element || self._renderer.createArea().append(self._rootElement);
                self._element.applySettings({points: [x1, y1, options.x, y2, x2, y1]})
            }});
        circularNeedles.TwoColorRectangleNeedle = circularNeedles.SimpleIndicator.inherit({
            _renderPointer: function() {
                var self = this,
                    options = self._options,
                    x1 = options.x - options.width / 2,
                    x2 = options.x + options.width / 2,
                    y4 = options.y - options.radius,
                    y1 = options.y - options.indentFromCenter,
                    fraction = Number(options.secondFraction) || 0,
                    y2,
                    y3;
                if (fraction >= 1)
                    y2 = y3 = y1;
                else if (fraction <= 0)
                    y2 = y3 = y2;
                else {
                    y3 = y4 + (y1 - y4) * fraction;
                    y2 = y3 + options.space
                }
                self._firstElement = self._firstElement || self._renderer.createArea().append(self._rootElement);
                self._spaceElement = self._spaceElement || self._renderer.createArea().append(self._rootElement);
                self._secondElement = self._secondElement || self._renderer.createArea().append(self._rootElement);
                self._firstElement.applySettings({points: [x1, y1, x1, y2, x2, y2, x2, y1]});
                self._spaceElement.applySettings({
                    points: [x1, y2, x1, y3, x2, y3, x2, y2],
                    'class': 'dxg-hole',
                    fill: options.containerBackgroundColor
                });
                self._secondElement.applySettings({
                    points: [x1, y3, x1, y4, x2, y4, x2, y3],
                    'class': 'dxg-part',
                    fill: options.secondColor
                })
            },
            _clearPointer: function() {
                delete this._firstElement;
                delete this._secondElement;
                delete this._spaceElement
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file linearNeedle.js */
    (function(DX, undefined) {
        var linearNeedles = DX.viz.gauges.__internals.linearNeedles;
        linearNeedles.SimpleIndicator = DX.viz.gauges.__internals.BaseIndicator.inherit({
            _move: function() {
                var self = this,
                    delta = self._actualPosition - self._zeroPosition;
                self._rootElement.move(self._vertical ? 0 : delta, self._vertical ? delta : 0);
                self._trackerElement && self._trackerElement.move(self._vertical ? 0 : delta, self._vertical ? delta : 0)
            },
            _isVisible: function() {
                var options = this._options;
                return options.length > 0 && options.width > 0
            },
            _getTrackerSettings: function() {
                var options = this._options,
                    x1,
                    x2,
                    y1,
                    y2,
                    width = options.width / 2,
                    length = options.length / 2,
                    p = this._zeroPosition;
                width > 10 || (width = 10);
                length > 10 || (length = 10);
                if (this._vertical) {
                    x1 = options.x - length;
                    x2 = options.x + length;
                    y1 = p + width || p;
                    y2 = p - width || p
                }
                else {
                    x1 = p - width;
                    x2 = p + width;
                    y1 = options.y + length;
                    y2 = options.y - length
                }
                return {points: [x1, y1, x1, y2, x2, y2, x2, y1]}
            },
            _render: function() {
                var self = this;
                self._zeroPosition = self._translator.getCodomainStart()
            },
            _clear: function() {
                delete this._element
            },
            init: function(options) {
                var self = this;
                self.callBase(options);
                self._vertical = self._options.orientation === 'vertical';
                return self
            },
            measure: function() {
                var options = this._options,
                    p = this._vertical ? options.x : options.y;
                return {
                        min: p - options.length / 2,
                        max: p + options.length / 2
                    }
            },
            getTooltipParameters: function() {
                var self = this,
                    options = self._options,
                    p = self._actualPosition,
                    parameters = {
                        x: p,
                        y: p,
                        value: self._currentValue,
                        color: options.color,
                        offset: options.width / 2
                    };
                self._vertical ? parameters.x = options.x : parameters.y = options.y;
                return parameters
            }
        });
        linearNeedles.RectangleNeedle = linearNeedles.SimpleIndicator.inherit({_render: function() {
                var self = this,
                    options = self._options,
                    p,
                    x1,
                    x2,
                    y1,
                    y2;
                self.callBase();
                p = self._zeroPosition;
                if (self._vertical) {
                    x1 = options.x - options.length / 2 || options.x;
                    x2 = options.x + options.length / 2 || options.x;
                    y1 = p + options.width / 2 || p;
                    y2 = p - options.width / 2 || p
                }
                else {
                    x1 = p - options.width / 2 || p;
                    x2 = p + options.width / 2 || p;
                    y1 = options.y + options.length / 2 || options.y;
                    y2 = options.y - options.length / 2 || options.y
                }
                self._element = self._element || self._renderer.createArea().append(self._rootElement);
                self._element.applySettings({points: [x1, y1, x1, y2, x2, y2, x2, y1]})
            }});
        linearNeedles.RhombusNeedle = linearNeedles.SimpleIndicator.inherit({_render: function() {
                var self = this,
                    options = self._options,
                    x,
                    y,
                    dx,
                    dy;
                self.callBase();
                if (self._vertical) {
                    x = options.x;
                    y = self._zeroPosition;
                    dx = options.length / 2 || 0;
                    dy = options.width / 2 || 0
                }
                else {
                    x = self._zeroPosition;
                    y = options.y;
                    dx = options.width / 2 || 0;
                    dy = options.length / 2 || 0
                }
                self._element = self._element || self._renderer.createArea().append(self._rootElement);
                self._element.applySettings({points: [x - dx, y, x, y - dy, x + dx, y, x, y + dy]})
            }});
        linearNeedles.CircleNeedle = linearNeedles.SimpleIndicator.inherit({_render: function() {
                var self = this,
                    options = self._options,
                    x,
                    y,
                    r;
                self.callBase();
                if (self._vertical) {
                    x = options.x;
                    y = self._zeroPosition
                }
                else {
                    x = self._zeroPosition;
                    y = options.y
                }
                r = options.length / 2 || 0;
                self._element = self._element || self._renderer.createCircle().append(self._rootElement);
                self._element.applySettings({
                    cx: x,
                    cy: y,
                    r: r
                })
            }})
    })(DevExpress);
    /*! Module viz-gauges, file circularMarker.js */
    (function(DX, undefined) {
        var circularMarkers = DX.viz.gauges.__internals.circularMarkers;
        circularMarkers.TriangleMarker = DX.viz.gauges.__internals.circularNeedles.SimpleIndicator.inherit({
            _isVisible: function() {
                var options = this._options;
                return options.length > 0 && options.width > 0 && options.radius > 0
            },
            _render: function() {
                var self = this,
                    options = self._options,
                    x = options.x,
                    y1 = options.y - options.radius,
                    dx = options.width / 2 || 0,
                    y2 = y1 - options.length,
                    settings;
                self._element = self._element || self._renderer.createArea().append(self._rootElement);
                settings = {
                    points: [x, y1, x - dx, y2, x + dx, y2],
                    stroke: 'none',
                    strokeWidth: 0
                };
                if (options.space > 0) {
                    settings.strokeWidth = Math.min(options.space, options.width / 4) || 0;
                    settings.stroke = settings.strokeWidth > 0 ? options.containerBackgroundColor || 'none' : 'none'
                }
                self._element.applySettings(settings)
            },
            _clear: function() {
                delete this._element
            },
            _getTrackerSettings: function() {
                var options = this._options,
                    x = options.x,
                    y = options.y - options.radius - options.length / 2,
                    width = options.width / 2,
                    length = options.length / 2;
                width > 10 || (width = 10);
                length > 10 || (length = 10);
                return {points: [x - width, y - length, x - width, y + length, x + width, y + length, x + width, y - length]}
            },
            measure: function() {
                var options = this._options;
                return {
                        min: options.radius,
                        max: options.radius + options.length || options.radius
                    }
            },
            getTooltipParameters: function() {
                var options = this._options,
                    cossin = DX.utils.getCosAndSin(this._actualPosition),
                    r = options.radius + options.length / 2,
                    parameters = this.callBase();
                parameters.x = options.x + cossin.cos * r;
                parameters.y = options.y - cossin.sin * r;
                parameters.offset = options.length / 2;
                return parameters
            }
        });
        circularMarkers.TextCloudMarker = DX.viz.gauges.__internals.BaseTextCloudMarker.inherit({
            _isVisible: function() {
                return this._options.radius > 0
            },
            _getTextCloudOptions: function() {
                var self = this,
                    cossin = DX.utils.getCosAndSin(self._actualPosition),
                    nangle = DX.utils.normalizeAngle(self._actualPosition);
                return {
                        x: self._options.x + cossin.cos * self._options.radius,
                        y: self._options.y - cossin.sin * self._options.radius,
                        type: nangle > 270 ? 'left-top' : nangle > 180 ? 'top-right' : nangle > 90 ? 'right-bottom' : 'bottom-left'
                    }
            },
            measure: function() {
                var self = this;
                self._measureText();
                return {
                        min: self._options.radius,
                        max: self._options.radius,
                        horizontalOffset: self._textFullWidth + self._options.arrowLength,
                        verticalOffset: self._textFullHeight + self._options.arrowLength
                    }
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file linearMarker.js */
    (function(DX, undefined) {
        var linearMarkers = DX.viz.gauges.__internals.linearMarkers;
        linearMarkers.TriangleMarker = DX.viz.gauges.__internals.linearNeedles.SimpleIndicator.inherit({
            _render: function() {
                var self = this,
                    options = self._options,
                    x1,
                    x2,
                    y1,
                    y2,
                    settings = {
                        stroke: 'none',
                        strokeWidth: 0
                    };
                self.callBase();
                if (self._vertical) {
                    x1 = options.x;
                    y1 = self._zeroPosition;
                    x2 = x1 + (self._inverted ? options.length : -options.length);
                    settings.points = [x1, y1, x2, y1 - options.width / 2, x2, y1 + options.width / 2]
                }
                else {
                    y1 = options.y;
                    x1 = self._zeroPosition;
                    y2 = y1 + (self._inverted ? options.length : -options.length);
                    settings.points = [x1, y1, x1 - options.width / 2, y2, x1 + options.width / 2, y2]
                }
                if (options.space > 0) {
                    settings.strokeWidth = Math.min(options.space, options.width / 4) || 0;
                    settings.stroke = settings.strokeWidth > 0 ? options.containerBackgroundColor || 'none' : 'none'
                }
                self._element = self._element || self._renderer.createArea().append(self._rootElement);
                self._element.applySettings(settings)
            },
            _getTrackerSettings: function() {
                var self = this,
                    options = self._options,
                    width = options.width / 2,
                    length = options.length,
                    x1,
                    x2,
                    y1,
                    y2,
                    result;
                width > 10 || (width = 10);
                length > 20 || (length = 20);
                if (self._vertical) {
                    x1 = x2 = options.x;
                    x2 = x1 + (self._inverted ? length : -length);
                    y1 = self._zeroPosition + width;
                    y2 = self._zeroPosition - width;
                    result = [x1, y1, x2, y1, x2, y2, x1, y2]
                }
                else {
                    y1 = options.y;
                    y2 = y1 + (self._inverted ? length : -length);
                    x1 = self._zeroPosition - width;
                    x2 = self._zeroPosition + width;
                    result = [x1, y1, x1, y2, x2, y2, x2, y1]
                }
                return {points: result}
            },
            init: function(options) {
                var self = this;
                self.callBase(options);
                self._inverted = self._vertical ? self._options.horizontalOrientation === 'right' : self._options.verticalOrientation === 'bottom';
                return self
            },
            measure: function() {
                var self = this,
                    options = self._options,
                    minbound,
                    maxbound,
                    indent = options.width / 2 || 0;
                if (self._vertical) {
                    minbound = maxbound = options.x;
                    if (self._inverted)
                        maxbound = minbound + options.length || minbound;
                    else
                        minbound = maxbound - options.length || maxbound
                }
                else {
                    minbound = maxbound = options.y;
                    if (self._inverted)
                        maxbound = minbound + options.length || minbound;
                    else
                        minbound = maxbound - options.length || maxbound
                }
                return {
                        min: minbound,
                        max: maxbound,
                        indent: indent
                    }
            },
            getTooltipParameters: function() {
                var self = this,
                    options = self._options,
                    s = (self._inverted ? options.length : -options.length) / 2,
                    parameters = self.callBase();
                self._vertical ? parameters.x += s : parameters.y += s;
                parameters.offset = options.length / 2;
                return parameters
            }
        });
        linearMarkers.TextCloudMarker = DX.viz.gauges.__internals.BaseTextCloudMarker.inherit({
            _isVisible: function() {
                return true
            },
            _getTextCloudOptions: function() {
                var self = this,
                    x = self._actualPosition,
                    y = self._actualPosition,
                    type;
                if (self._vertical) {
                    x = self._options.x;
                    type = self._inverted ? 'top-left' : 'top-right'
                }
                else {
                    y = self._options.y;
                    type = self._inverted ? 'right-top' : 'right-bottom'
                }
                return {
                        x: x,
                        y: y,
                        type: type
                    }
            },
            init: function(options) {
                var self = this;
                self.callBase(options);
                self._vertical = self._options.orientation === 'vertical';
                self._inverted = self._vertical ? self._options.horizontalOrientation === 'right' : self._options.verticalOrientation === 'bottom';
                return self
            },
            measure: function() {
                var self = this,
                    options = self._options,
                    minbound,
                    maxbound,
                    indent;
                self._measureText();
                if (self._vertical) {
                    indent = self._textFullHeight;
                    if (self._inverted) {
                        minbound = options.x;
                        maxbound = options.x + options.arrowLength + self._textFullWidth
                    }
                    else {
                        minbound = options.x - options.arrowLength - self._textFullWidth;
                        maxbound = options.x
                    }
                }
                else {
                    indent = self._textFullWidth;
                    if (self._inverted) {
                        minbound = options.y;
                        maxbound = options.y + options.arrowLength + self._textFullHeight
                    }
                    else {
                        minbound = options.y - options.arrowLength - self._textFullHeight;
                        maxbound = options.y
                    }
                }
                return {
                        min: minbound,
                        max: maxbound,
                        indent: indent
                    }
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file circularRangeBar.js */
    (function(DX, undefined) {
        var getCosAndSin = DX.utils.getCosAndSin,
            convertAngleToRendererSpace = DX.utils.convertAngleToRendererSpace,
            max = Math.max,
            min = Math.min;
        DX.viz.gauges.__internals.CircularRangeBar = DX.viz.gauges.__internals.BaseRangeBar.inherit({
            _isVisible: function() {
                var options = this._options;
                return options.size > 0 && options.radius - options.size > 0
            },
            _createBarItem: function() {
                return this._renderer.createArc().append(this._rootElement)
            },
            _createTracker: function() {
                return this._renderer.createArc()
            },
            _setBarSides: function() {
                var self = this,
                    options = self._options;
                self._minSide = options.radius - options.size;
                self._maxSide = options.radius
            },
            _getSpace: function() {
                var options = this._options;
                return options.space > 0 ? options.space * 180 / options.radius / Math.PI : 0
            },
            _isTextVisible: function() {
                var options = this._options.text || {};
                return options.indent > 0
            },
            _setTextItemsSides: function() {
                var self = this,
                    options = self._options;
                self._lineFrom = options.y - options.radius;
                self._lineTo = self._lineFrom - options.text.indent;
                self._textRadius = options.radius + options.text.indent
            },
            _getPositions: function() {
                var self = this,
                    basePosition = self._basePosition,
                    actualPosition = self._actualPosition,
                    mainPosition1,
                    mainPosition2,
                    space = self._space;
                if (basePosition >= actualPosition) {
                    mainPosition1 = basePosition;
                    mainPosition2 = actualPosition
                }
                else {
                    mainPosition1 = actualPosition;
                    mainPosition2 = basePosition
                }
                return {
                        start: self._startPosition,
                        end: self._endPosition,
                        main1: mainPosition1,
                        main2: mainPosition2,
                        back1: min(mainPosition1 + space, self._startPosition),
                        back2: max(mainPosition2 - space, self._endPosition)
                    }
            },
            _buildItemSettings: function(from, to) {
                var self = this;
                return {
                        x: self._options.x,
                        y: self._options.y,
                        innerRadius: self._minSide,
                        outerRadius: self._maxSide,
                        startAngle: to,
                        endAngle: from
                    }
            },
            _updateTextPosition: function() {
                var self = this,
                    cossin = getCosAndSin(self._actualPosition),
                    x = self._options.x + self._textRadius * cossin.cos,
                    y = self._options.y - self._textRadius * cossin.sin;
                x += cossin.cos * self._textWidth * 0.6;
                y -= cossin.sin * self._textHeight * 0.6;
                self._text.applySettings({
                    x: x,
                    y: y + self._textVerticalOffset
                })
            },
            _updateLinePosition: function() {
                var self = this,
                    x = self._options.x,
                    x1,
                    x2;
                if (self._basePosition > self._actualPosition) {
                    x1 = x - 2;
                    x2 = x
                }
                else if (self._basePosition < self._actualPosition) {
                    x1 = x;
                    x2 = x + 2
                }
                else {
                    x1 = x - 1;
                    x2 = x + 1
                }
                self._line.applySettings({points: [x1, self._lineFrom, x1, self._lineTo, x2, self._lineTo, x2, self._lineFrom]});
                self._line.rotate(convertAngleToRendererSpace(self._actualPosition), x, self._options.y)
            },
            _getTooltipPosition: function() {
                var self = this,
                    cossin = getCosAndSin((self._basePosition + self._actualPosition) / 2),
                    r = (self._minSide + self._maxSide) / 2;
                return {
                        x: self._options.x + cossin.cos * r,
                        y: self._options.y - cossin.sin * r
                    }
            },
            measure: function() {
                var self = this,
                    options = self._options,
                    result = {
                        min: options.radius - options.size || options.radius,
                        max: options.radius
                    };
                self._measureText();
                if (self._hasText) {
                    result.max += options.text.indent;
                    result.horizontalOffset = self._textWidth;
                    result.verticalOffset = self._textHeight
                }
                return result
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file linearRangeBar.js */
    (function(DX, undefined) {
        DX.viz.gauges.__internals.LinearRangeBar = DX.viz.gauges.__internals.BaseRangeBar.inherit({
            _isVisible: function() {
                var options = this._options;
                return options.size > 0
            },
            init: function(options) {
                var self = this;
                self.callBase(options);
                self._vertical = self._options.orientation === 'vertical';
                self._inverted = self._vertical ? self._options.horizontalOrientation === 'right' : self._options.verticalOrientation === 'bottom';
                return self
            },
            _createBarItem: function() {
                return this._renderer.createArea().append(this._rootElement)
            },
            _createTracker: function() {
                return this._renderer.createArea()
            },
            _setBarSides: function() {
                var self = this,
                    options = self._options,
                    minSide,
                    maxSide;
                if (self._vertical)
                    if (self._inverted) {
                        minSide = options.x;
                        maxSide = options.x + options.size
                    }
                    else {
                        minSide = options.x - options.size;
                        maxSide = options.x
                    }
                else if (self._inverted) {
                    minSide = options.y;
                    maxSide = options.y + options.size
                }
                else {
                    minSide = options.y - options.size;
                    maxSide = options.y
                }
                self._minSide = minSide;
                self._maxSide = maxSide;
                self._minBound = minSide;
                self._maxBound = maxSide
            },
            _getSpace: function() {
                var options = this._options;
                return options.space > 0 ? Number(options.space) : 0
            },
            _isTextVisible: function() {
                var textOptions = this._options.text || {};
                return textOptions.indent > 0 || textOptions.indent < 0
            },
            _getTextAlign: function() {
                return this._vertical ? this._options.text.indent > 0 ? 'left' : 'right' : 'center'
            },
            _setTextItemsSides: function() {
                var self = this,
                    indent = Number(self._options.text.indent);
                if (indent > 0) {
                    self._lineStart = self._maxSide;
                    self._lineEnd = self._maxSide + indent;
                    self._textPosition = self._lineEnd + (self._vertical ? 2 : self._textHeight / 2);
                    self._maxBound = self._textPosition + (self._vertical ? self._textWidth : self._textHeight / 2)
                }
                else if (indent < 0) {
                    self._lineStart = self._minSide;
                    self._lineEnd = self._minSide + indent;
                    self._textPosition = self._lineEnd - (self._vertical ? 2 : self._textHeight / 2);
                    self._minBound = self._textPosition - (self._vertical ? self._textWidth : self._textHeight / 2)
                }
            },
            _getPositions: function() {
                var self = this,
                    options = self._options,
                    startPosition = self._startPosition,
                    endPosition = self._endPosition,
                    space = self._space,
                    basePosition = self._basePosition,
                    actualPosition = self._actualPosition,
                    mainPosition1,
                    mainPosition2,
                    backPosition1,
                    backPosition2;
                if (startPosition < endPosition) {
                    if (basePosition < actualPosition) {
                        mainPosition1 = basePosition;
                        mainPosition2 = actualPosition
                    }
                    else {
                        mainPosition1 = actualPosition;
                        mainPosition2 = basePosition
                    }
                    backPosition1 = mainPosition1 - space;
                    backPosition2 = mainPosition2 + space
                }
                else {
                    if (basePosition > actualPosition) {
                        mainPosition1 = basePosition;
                        mainPosition2 = actualPosition
                    }
                    else {
                        mainPosition1 = actualPosition;
                        mainPosition2 = basePosition
                    }
                    backPosition1 = mainPosition1 + space;
                    backPosition2 = mainPosition2 - space
                }
                return {
                        start: startPosition,
                        end: endPosition,
                        main1: mainPosition1,
                        main2: mainPosition2,
                        back1: backPosition1,
                        back2: backPosition2
                    }
            },
            _buildItemSettings: function(from, to) {
                var self = this,
                    side1 = self._minSide,
                    side2 = self._maxSide;
                var points = self._vertical ? [side1, from, side1, to, side2, to, side2, from] : [from, side1, from, side2, to, side2, to, side1];
                return {points: points}
            },
            _updateTextPosition: function() {
                var self = this;
                self._text.applySettings(self._vertical ? {
                    x: self._textPosition,
                    y: self._actualPosition + self._textVerticalOffset
                } : {
                    x: self._actualPosition,
                    y: self._textPosition + self._textVerticalOffset
                })
            },
            _updateLinePosition: function() {
                var self = this,
                    actualPosition = self._actualPosition,
                    side1,
                    side2,
                    points;
                if (self._vertical) {
                    if (self._basePosition >= actualPosition) {
                        side1 = actualPosition;
                        side2 = actualPosition + 2
                    }
                    else {
                        side1 = actualPosition - 2;
                        side2 = actualPosition
                    }
                    points = [self._lineStart, side1, self._lineStart, side2, self._lineEnd, side2, self._lineEnd, side1]
                }
                else {
                    if (self._basePosition <= actualPosition) {
                        side1 = actualPosition - 2;
                        side2 = actualPosition
                    }
                    else {
                        side1 = actualPosition;
                        side2 = actualPosition + 2
                    }
                    points = [side1, self._lineStart, side1, self._lineEnd, side2, self._lineEnd, side2, self._lineStart]
                }
                self._line.applySettings({points: points})
            },
            _getTooltipPosition: function() {
                var self = this,
                    crossCenter = (self._minSide + self._maxSide) / 2,
                    alongCenter = (self._basePosition + self._actualPosition) / 2,
                    position = {};
                if (self._vertical)
                    position = {
                        x: crossCenter,
                        y: alongCenter
                    };
                else
                    position = {
                        x: alongCenter,
                        y: crossCenter
                    };
                return position
            },
            measure: function() {
                var self = this,
                    options = self._options,
                    minbound,
                    maxbound,
                    indent;
                self._measureText();
                if (self._vertical) {
                    minbound = maxbound = options.x;
                    if (self._inverted)
                        maxbound = maxbound + options.size || maxbound;
                    else
                        minbound = minbound - options.size || minbound;
                    if (self._hasText) {
                        indent = self._textHeight / 2;
                        if (options.text.indent > 0)
                            maxbound += options.text.indent + self._textWidth;
                        if (options.text.indent < 0)
                            minbound += options.text.indent - self._textWidth
                    }
                }
                else {
                    minbound = maxbound = options.y;
                    if (self._inverted)
                        maxbound = maxbound + options.size || maxbound;
                    else
                        minbound = minbound - options.size || minbound;
                    if (self._hasText) {
                        indent = self._textWidth / 2;
                        if (options.text.indent > 0)
                            maxbound += options.text.indent + self._textHeight;
                        if (options.text.indent < 0)
                            minbound += options.text.indent - self._textHeight
                    }
                }
                return {
                        min: minbound,
                        max: maxbound,
                        indent: indent
                    }
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file rangeContainer.js */
    (function(DX, $, undefined) {
        var isDefined = DX.utils.isDefined,
            isString = DX.utils.isString,
            isArray = DX.utils.isArray,
            Number = window.Number,
            isFinite = window.isFinite,
            max = Math.max,
            abs = Math.abs,
            $each = $.each,
            $map = $.map,
            $extend = $.extend;
        var _Palette = DX.viz.core.Palette;
        function subtractSegmentAsc(segmentStart, segmentEnd, otherStart, otherEnd) {
            var result;
            if (otherStart > segmentStart && otherEnd < segmentEnd)
                result = [{
                        start: segmentStart,
                        end: otherStart
                    }, {
                        start: otherEnd,
                        end: segmentEnd
                    }];
            else if (otherStart >= segmentEnd || otherEnd <= segmentStart)
                result = [{
                        start: segmentStart,
                        end: segmentEnd
                    }];
            else if (otherStart <= segmentStart && otherEnd >= segmentEnd)
                result = [];
            else if (otherStart > segmentStart)
                result = [{
                        start: segmentStart,
                        end: otherStart
                    }];
            else if (otherEnd < segmentEnd)
                result = [{
                        start: otherEnd,
                        end: segmentEnd
                    }];
            return result
        }
        function subtractSegmentDes(segmentStart, segmentEnd, otherStart, otherEnd) {
            var result;
            if (otherStart < segmentStart && otherEnd > segmentEnd)
                result = [{
                        start: segmentStart,
                        end: otherStart
                    }, {
                        start: otherEnd,
                        end: segmentEnd
                    }];
            else if (otherStart <= segmentEnd || otherEnd >= segmentStart)
                result = [{
                        start: segmentStart,
                        end: segmentEnd
                    }];
            else if (otherStart >= segmentStart && otherEnd <= segmentEnd)
                result = [];
            else if (otherStart < segmentStart)
                result = [{
                        start: segmentStart,
                        end: otherStart
                    }];
            else if (otherEnd > segmentEnd)
                result = [{
                        start: otherEnd,
                        end: segmentEnd
                    }];
            return result
        }
        function isNotEmptySegmentAsc(start, end, threshold) {
            return end - start >= threshold
        }
        function isNotEmptySegmentDes(start, end, threshold) {
            return start - end >= threshold
        }
        DX.viz.gauges.__internals.BaseRangeContainer = DX.Class.inherit({
            setup: function(parameters) {
                var self = this;
                DX.utils.debug.assertParam(parameters.renderer, '"renderer" is not passed');
                DX.utils.debug.assertParam(parameters.renderer, '"translator" is not passed');
                DX.utils.debug.assertParam(parameters.owner, '"owner" is not passed');
                DX.utils.debug.assertParam(parameters.incidentOccured, '"incidentOccured" is not passed');
                self._renderer = parameters.renderer;
                self._translator = parameters.translator;
                self._owner = parameters.owner;
                self._incidentOccured = parameters.incidentOccured;
                self._rootElement = self._renderer.createGroup({'class': 'dxg-range-container'});
                self._options = {};
                return self
            },
            dispose: function() {
                var self = this;
                self._renderer = self._owner = self._translator = self._incidentOccured = self._options = self._rootElement = null;
                return self
            },
            init: function(options) {
                var self = this;
                $extend(true, self._options, options);
                if (options && isDefined(options.ranges))
                    self._options.ranges = isArray(options.ranges) ? options.ranges.slice(0) : null;
                return self
            },
            _getRanges: function() {
                var self = this,
                    options = self._options,
                    translator = self._translator,
                    totalStart = translator.getDomainStart(),
                    totalEnd = translator.getDomainEnd(),
                    totalDelta = totalEnd - totalStart,
                    isNotEmptySegment = totalDelta >= 0 ? isNotEmptySegmentAsc : isNotEmptySegmentDes,
                    subtractSegment = totalDelta >= 0 ? subtractSegmentAsc : subtractSegmentDes,
                    list = [],
                    ranges = [],
                    backgroundRanges = [{
                            start: totalStart,
                            end: totalEnd
                        }],
                    threshold = abs(totalDelta) / 1E4,
                    palette = new _Palette(options.palette, {
                        type: 'indicatingSet',
                        theme: options.themeName
                    }),
                    backgroundColor = isString(options.backgroundColor) ? options.backgroundColor : 'none',
                    width = options.width || {},
                    startWidth = Number(width > 0 ? width : width.start),
                    endWidth = Number(width > 0 ? width : width.end),
                    deltaWidth = endWidth - startWidth;
                if (!options.ranges) {
                    self._incidentOccured('The range container has not been drawn because the value of the "ranges" option is not valid.');
                    return null
                }
                if (!(startWidth >= 0 && endWidth >= 0 && startWidth + endWidth > 0)) {
                    self._incidentOccured('The range container has not been drawn because the value of the "width" option is not valid.');
                    return null
                }
                list = $map(options.ranges, function(rangeOptions, i) {
                    rangeOptions = rangeOptions || {};
                    var start = translator.adjust(rangeOptions.startValue),
                        end = translator.adjust(rangeOptions.endValue);
                    return isFinite(start) && isFinite(end) && isNotEmptySegment(start, end, threshold) ? {
                            start: start,
                            end: end,
                            color: rangeOptions.color,
                            classIndex: i
                        } : null
                });
                $each(list, function(i, item) {
                    var paletteColor = palette.getNextColor();
                    item.color = isString(item.color) && item.color || paletteColor || 'none';
                    item.className = 'dxg-range dxg-range-' + item.classIndex;
                    delete item.classIndex
                });
                $each(list, function(_, item) {
                    var i,
                        ii,
                        sub,
                        subs,
                        range,
                        newRanges = [],
                        newBackgroundRanges = [];
                    for (i = 0, ii = ranges.length; i < ii; ++i) {
                        range = ranges[i];
                        subs = subtractSegment(range.start, range.end, item.start, item.end);
                        (sub = subs[0]) && (sub.color = range.color) && (sub.className = range.className) && newRanges.push(sub);
                        (sub = subs[1]) && (sub.color = range.color) && (sub.className = range.className) && newRanges.push(sub)
                    }
                    newRanges.push(item);
                    ranges = newRanges;
                    for (i = 0, ii = backgroundRanges.length; i < ii; ++i) {
                        range = backgroundRanges[i];
                        subs = subtractSegment(range.start, range.end, item.start, item.end);
                        (sub = subs[0]) && newBackgroundRanges.push(sub);
                        (sub = subs[1]) && newBackgroundRanges.push(sub)
                    }
                    backgroundRanges = newBackgroundRanges
                });
                $each(backgroundRanges, function(_, range) {
                    range.color = backgroundColor;
                    range.className = 'dxg-range dxg-background-range';
                    ranges.push(range)
                });
                $each(ranges, function(_, range) {
                    range.startPosition = translator.translate(range.start);
                    range.endPosition = translator.translate(range.end);
                    range.startWidth = (range.start - totalStart) / totalDelta * deltaWidth + startWidth;
                    range.endWidth = (range.end - totalStart) / totalDelta * deltaWidth + startWidth
                });
                return ranges
            },
            _getRenderSettings: function() {
                throw new Error('_getRenderSettings - not implemented');
            },
            _createRange: function(settings) {
                throw new Error('_createRange - not implemented');
            },
            clean: function() {
                this._rootElement.detach();
                this._rootElement.clear();
                return this
            },
            render: function() {
                var self = this,
                    ranges,
                    settings;
                ranges = self._getRanges();
                settings = ranges ? self._getRenderSettings() : null;
                if (settings) {
                    self._rootElement.append(self._owner);
                    $each(ranges, function(_, range) {
                        var element = self._createRange(range, settings);
                        element.applySettings({
                            fill: range.color,
                            'class': range.className
                        });
                        element.append(self._rootElement)
                    })
                }
                return self
            }
        });
        DX.viz.gauges.__internals.CircularRangeContainer = DX.viz.gauges.__internals.BaseRangeContainer.inherit({
            _getRenderSettings: function() {
                var options = this._options,
                    r = options.radius,
                    inner = 0,
                    outer = 0,
                    width = options.width > 0 ? options.width : max(options.width.start, options.width.end);
                switch (options.orientation) {
                    case'inside':
                        inner = 1;
                        break;
                    case'outside':
                        outer = 1;
                        break;
                    case'center':
                        inner = outer = 0.5;
                        break;
                    default:
                        this._incidentOccured('The range container has not been drawn because the value of the "orientation" option is not valid.');
                        break
                }
                return (inner || outer) && r + outer * width > 0 && r - inner * width > 0 ? {
                        x: options.x,
                        y: options.y,
                        r: r,
                        inner: inner,
                        outer: outer
                    } : null
            },
            _createRange: function(range, settings) {
                var width = (range.startWidth + range.endWidth) / 2;
                return this._renderer.createArc(settings.x, settings.y, settings.r + settings.outer * width, settings.r - settings.inner * width, range.endPosition, range.startPosition)
            },
            measure: function() {
                var options = this._options,
                    radius = options.radius,
                    size = options.width || {},
                    result = null;
                size = Number(size) || max(size.start, size.end, 0) || 0;
                switch (options.orientation) {
                    case'inside':
                        result = {
                            min: radius - size,
                            max: radius
                        };
                        break;
                    case'outside':
                        result = {
                            min: radius,
                            max: radius + size
                        };
                        break;
                    case'center':
                        result = {
                            min: radius - size / 2,
                            max: radius + size / 2
                        };
                        break
                }
                return result
            }
        });
        DX.viz.gauges.__internals.LinearRangeContainer = DX.viz.gauges.__internals.BaseRangeContainer.inherit({
            _getRenderSettings: function() {
                var self = this,
                    options = self._options,
                    vertical,
                    position,
                    inner = 0,
                    outer = 0;
                if (options.orientation === 'vertical') {
                    position = options.x;
                    vertical = true;
                    switch (options.horizontalOrientation) {
                        case'left':
                            inner = 1;
                            break;
                        case'right':
                            outer = 1;
                            break;
                        case'center':
                            inner = outer = 0.5;
                            break;
                        default:
                            self._incidentOccured('The range container has not been drawn because the value of the "horizontalOrientation" option is not valid.');
                            break
                    }
                }
                else {
                    position = options.y;
                    vertical = false;
                    switch (options.verticalOrientation) {
                        case'top':
                            inner = 1;
                            break;
                        case'bottom':
                            outer = 1;
                            break;
                        case'middle':
                            inner = outer = 0.5;
                            break;
                        default:
                            self._incidentOccured('The range container has not been drawn because the value of the "verticalOrientation" option is not valid.');
                            break
                    }
                }
                return inner || outer ? {
                        position: position,
                        vertical: vertical,
                        inner: inner,
                        outer: outer
                    } : null
            },
            _createRange: function(range, settings) {
                var inner = settings.inner,
                    outer = settings.outer,
                    position = settings.position,
                    points;
                if (settings.vertical)
                    points = [position - range.startWidth * inner, range.startPosition, position - range.endWidth * inner, range.endPosition, position + range.endWidth * outer, range.endPosition, position + range.startWidth * outer, range.startPosition];
                else
                    points = [range.startPosition, position + range.startWidth * outer, range.startPosition, position - range.startWidth * inner, range.endPosition, position - range.endWidth * inner, range.endPosition, position + range.endWidth * outer];
                return this._renderer.createArea(points)
            },
            measure: function() {
                var options = this._options,
                    size = options.width || {},
                    result = null;
                size = Number(size) || max(size.start, size.end, 0) || 0;
                if (options.orientation === 'vertical') {
                    result = {
                        min: options.x,
                        max: options.x
                    };
                    switch (options.horizontalOrientation) {
                        case'left':
                            result.min -= size;
                            break;
                        case'right':
                            result.max += size;
                            break;
                        case'center':
                            result.min -= size / 2;
                            result.max += size / 2;
                            break
                    }
                }
                else {
                    result = {
                        min: options.y,
                        max: options.y
                    };
                    switch (options.verticalOrientation) {
                        case'top':
                            result.min -= size;
                            break;
                        case'bottom':
                            result.max += size;
                            break;
                        case'middle':
                            result.min -= size / 2;
                            result.max += size / 2;
                            break
                    }
                }
                return result
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file title.js */
    (function(DX, $, undefined) {
        var Rectangle = DX.viz.core.Rectangle;
        var isString = DX.utils.isString,
            isDefined = DX.utils.isDefined,
            min = Math.min,
            max = Math.max,
            floor = Math.floor,
            ceil = Math.ceil,
            $extend = $.extend;
        DX.viz.gauges.__internals.Title = DX.Class.inherit({
            ctor: function() {
                this._options = {
                    title: {},
                    subtitle: {}
                }
            },
            _measureTexts: function() {
                var self = this,
                    mainBox = self._mainText ? self._mainText.getBBox() : null,
                    subBox = self._subText ? self._subText.getBBox() : null,
                    dy;
                self._location = {
                    x: 0,
                    y: 0
                };
                if (mainBox && subBox) {
                    self._subText.applySettings({y: ceil(-subBox.y)});
                    self._rect = new Rectangle({
                        left: floor(min(mainBox.x, subBox.x)),
                        right: ceil(max(mainBox.x + mainBox.width, subBox.x + subBox.width)),
                        top: floor(mainBox.y),
                        bottom: ceil(subBox.height)
                    })
                }
                else if (mainBox || subBox) {
                    mainBox = mainBox || subBox;
                    self._rect = new Rectangle({
                        left: floor(mainBox.x),
                        right: ceil(mainBox.x + mainBox.width),
                        top: floor(mainBox.y),
                        bottom: ceil(mainBox.y + mainBox.height)
                    })
                }
            },
            render: function(options) {
                var self = this;
                $extend(true, self._options, options);
                self._root = self._root || self._renderer.createGroup({
                    'class': 'dxg-title',
                    align: 'center'
                }).append(self._owner);
                if (isString(self._options.title.text)) {
                    self._mainText = self._mainText || self._renderer.createText().append(self._root);
                    self._mainText.applySettings({
                        x: 0,
                        y: 0,
                        font: self._options.title.font,
                        text: self._options.title.text
                    })
                }
                else {
                    self._mainText && self._mainText.remove();
                    delete self._mainText
                }
                if (isString(self._options.subtitle.text)) {
                    self._subText = self._subText || self._renderer.createText().append(self._root);
                    self._subText.applySettings({
                        x: 0,
                        y: 0,
                        font: self._options.subtitle.font,
                        text: self._options.subtitle.text
                    })
                }
                else {
                    self._subText && self._subText.remove();
                    delete self._subText
                }
                if (self._mainText || self._subText)
                    self._measureTexts();
                else {
                    self._root && self._root.remove();
                    delete self._root
                }
                return self
            },
            processTitleOptions: function(options) {
                if (isString(options))
                    return {text: options};
                else if (!isDefined(options))
                    return {text: null};
                else {
                    options = $extend({}, options);
                    options.layout = $extend({}, options.layout, {position: options.position});
                    return options
                }
            },
            processSubtitleOptions: function(options) {
                if (isString(options))
                    return {text: options};
                else if (!isDefined(options))
                    return {text: null};
                else
                    return $extend({}, options)
            },
            isVisible: function() {
                return !!(this._mainText || this._subText)
            },
            getBoundingRect: function() {
                return this._rect.clone()
            },
            getLayoutOptions: function() {
                return this._options.title.layout || {}
            },
            move: function(dx, dy) {
                var self = this;
                self._root.move(self._location.x += dx, self._location.y += dy);
                self._rect = self._rect.move(dx, dy);
                return self
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file layoutManager.js */
    (function(DX, undefined) {
        var min = Math.min,
            max = Math.max,
            isString = DX.utils.isString;
        var Rectangle = DX.viz.core.Rectangle;
        function parseLayoutOptions(options) {
            options = options || {};
            var parts = (isString(options) ? options : options.position || '').split('-');
            return {
                    primary: isString(parts[0]) ? parts[0].toLowerCase() : '',
                    secondary: isString(parts[1]) ? parts[1].toLowerCase() : '',
                    overlay: options.overlay > 0 ? Number(options.overlay) : 0
                }
        }
        DX.viz.gauges.__internals.LayoutManager = DX.Class.inherit({
            setRect: function(rect) {
                this._rect = rect.clone();
                return this
            },
            getRect: function() {
                return this._rect.clone()
            },
            applyLayout: function(rect, options) {
                var dx = 0,
                    dy = 0,
                    availableRect = this._rect,
                    resultRect = rect.clone(),
                    options_ = parseLayoutOptions(options),
                    delta = resultRect.height() - options_.overlay;
                switch (options_.primary) {
                    case'top':
                        if (delta >= 0) {
                            dy = availableRect.top - resultRect.top;
                            availableRect.top = min(availableRect.top + delta, availableRect.bottom)
                        }
                        else
                            dy = availableRect.top - resultRect.top - delta;
                        break;
                    case'bottom':
                        if (delta >= 0) {
                            dy = availableRect.bottom - resultRect.bottom;
                            availableRect.bottom = max(availableRect.bottom - delta, availableRect.top)
                        }
                        else
                            dy = availableRect.bottom - resultRect.bottom + delta;
                        break
                }
                switch (options_.secondary) {
                    case'':
                    case'center':
                        dx = availableRect.horizontalMiddle() - resultRect.horizontalMiddle();
                        break;
                    case'left':
                        dx = availableRect.left - resultRect.left;
                        break;
                    case'right':
                        dx = availableRect.right - resultRect.right;
                        break
                }
                resultRect = resultRect.move(dx, dy);
                return {
                        rect: resultRect,
                        dx: dx,
                        dy: dy
                    }
            },
            dock: function(rect, options) {
                var dx = 0,
                    dy = 0,
                    mainRect = this._rect,
                    resultRect = rect.clone(),
                    options_ = parseLayoutOptions(options);
                switch (options_.primary) {
                    case'top':
                        dy = mainRect.top - resultRect.bottom + options_.overlay;
                        mainRect.top -= resultRect.height();
                        break;
                    case'bottom':
                        dy = mainRect.bottom - resultRect.top - options_.overlay;
                        mainRect.bottom += resultRect.height();
                        break
                }
                resultRect = resultRect.move(dx, dy);
                return {
                        rect: resultRect,
                        dx: dx,
                        dy: dy
                    }
            },
            selectRectByAspectRatio: function(aspectRatio, margins) {
                var rect = this._rect.clone(),
                    selfAspectRatio,
                    width = 0,
                    height = 0;
                margins = margins || {};
                if (aspectRatio > 0) {
                    rect.left += margins.left || 0;
                    rect.right -= margins.right || 0;
                    rect.top += margins.top || 0;
                    rect.bottom -= margins.bottom || 0;
                    if (rect.width() > 0 && rect.height() > 0) {
                        selfAspectRatio = rect.height() / rect.width();
                        if (selfAspectRatio > 1)
                            aspectRatio < selfAspectRatio ? width = rect.width() : height = rect.height();
                        else
                            aspectRatio > selfAspectRatio ? height = rect.height() : width = rect.width();
                        width > 0 || (width = height / aspectRatio);
                        height > 0 || (height = width * aspectRatio);
                        width = (rect.width() - width) / 2;
                        height = (rect.height() - height) / 2;
                        rect.left += width;
                        rect.right -= width;
                        rect.top += height;
                        rect.bottom -= height
                    }
                    else {
                        rect.left = rect.right = rect.horizontalMiddle();
                        rect.top = rect.bottom = rect.verticalMiddle()
                    }
                }
                return rect
            },
            selectRectBySizes: function(sizes, margins) {
                var rect = this._rect.clone(),
                    step;
                margins = margins || {};
                if (sizes) {
                    rect.left += margins.left || 0;
                    rect.right -= margins.right || 0;
                    rect.top += margins.top || 0;
                    rect.bottom -= margins.bottom || 0;
                    if (sizes.width > 0) {
                        step = (rect.width() - sizes.width) / 2;
                        if (step > 0) {
                            rect.left += step;
                            rect.right -= step
                        }
                    }
                    if (sizes.height > 0) {
                        step = (rect.height() - sizes.height) / 2;
                        if (step > 0) {
                            rect.top += step;
                            rect.bottom -= step
                        }
                    }
                }
                return rect
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file themeManager.js */
    (function(DX, undefined) {
        DX.viz.gauges.__internals.ThemeManager = DX.viz.core.BaseThemeManager.inherit({
            _themeSection: 'gauge',
            _initializeTheme: function() {
                var self = this;
                self._initializeFont(self._theme.scale.label.font);
                self._initializeFont(self._theme.valueIndicator.rangebar.text.font);
                self._initializeFont(self._theme.subvalueIndicator.textcloud.text.font);
                self._initializeFont(self._theme.valueIndicators.rangebar.text.font);
                self._initializeFont(self._theme.valueIndicators.textcloud.text.font);
                self._initializeFont(self._theme.title.font);
                self._initializeFont(self._theme.subtitle.font);
                self._initializeFont(self._theme.tooltip.font);
                self._initializeFont(self._theme.indicator.text.font);
                self._initializeFont(self._theme.loadingIndicator.font)
            },
            getPartialTheme: function(name) {
                return this._theme[name] || {}
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file presetManager.js */
    /*! Module viz-gauges, file gauge.js */
    (function(DX, $, undefined) {
        var factory = DX.viz.gauges.__factory;
        var Rectangle = DX.viz.core.Rectangle;
        var isArray = DX.utils.isArray,
            isFunction = DX.utils.isFunction,
            isFinite = window.isFinite,
            Number = window.Number,
            String = window.String,
            setTimeout = window.setTimeout,
            windowResizeCallbacks = DX.utils.windowResizeCallbacks,
            $extend = $.extend,
            $each = $.each,
            $map = $.map,
            _noop = $.noop,
            core = DX.viz.core;
        var REDRAW_DELAY = 500;
        var OPTION_VALUE = 'value',
            OPTION_SUBVALUES = 'subvalues',
            OPTION_LOADINDICATOR = 'loadingIndicator';
        DX.viz.gauges.__internals.BASE_GAUGE_SETTINGS = {
            size: {
                width: undefined,
                height: undefined
            },
            margin: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            redrawOnResize: true,
            incidentOccured: _noop,
            theme: undefined,
            title: {
                text: undefined,
                layout: {
                    position: 'top-center',
                    overlay: 0
                }
            },
            subtitle: {text: undefined},
            indicator: {
                hasPositiveMeaning: true,
                text: {
                    format: 'fixedPoint',
                    precision: 0,
                    customizeText: $.none,
                    useDefaultColor: false
                },
                layout: {
                    position: 'bottom-center',
                    overlay: 0
                }
            },
            tooltip: {
                enabled: false,
                format: undefined,
                precision: undefined,
                customizeText: undefined,
                horizontalPadding: 22,
                verticalPadding: 6,
                arrowLength: 10
            }
        };
        var DEFAULT_GAUGE_SETTINGS = {
                scale: {
                    majorTick: {
                        visible: true,
                        tickInterval: undefined,
                        length: 5,
                        width: 2,
                        showCalculatedTicks: true,
                        useTicksAutoArrangement: true,
                        customTickValues: []
                    },
                    minorTick: {
                        visible: false,
                        tickInterval: undefined,
                        length: 3,
                        width: 1,
                        showCalculatedTicks: true,
                        customTickValues: []
                    },
                    label: {
                        visible: true,
                        format: undefined,
                        precision: undefined,
                        customizeText: undefined
                    }
                },
                rangeContainer: {
                    offset: 0,
                    width: 5,
                    ranges: []
                },
                valueIndicator: {rangebar: {
                        baseValue: undefined,
                        space: 2,
                        size: 10,
                        text: {
                            indent: 0,
                            customizeText: undefined,
                            format: undefined,
                            precision: undefined
                        }
                    }},
                subvalueIndicator: {
                    trianglemarker: {
                        space: 2,
                        length: 14,
                        width: 13
                    },
                    triangle: {
                        space: 2,
                        length: 14,
                        width: 13
                    },
                    textcloud: {
                        arrowLength: 5,
                        horizontalOffset: 6,
                        verticalOffset: 3,
                        text: {
                            format: undefined,
                            precision: undefined,
                            customizeText: undefined
                        }
                    }
                },
                valueIndicators: {
                    rangebar: {
                        baseValue: undefined,
                        space: 2,
                        size: 10,
                        text: {
                            indent: 0,
                            customizeText: undefined,
                            format: undefined,
                            precision: undefined
                        }
                    },
                    trianglemarker: {
                        space: 2,
                        length: 14,
                        width: 13
                    },
                    textcloud: {
                        arrowLength: 5,
                        horizontalOffset: 6,
                        verticalOffset: 3,
                        text: {
                            format: undefined,
                            precision: undefined,
                            customizeText: undefined
                        }
                    }
                }
            };
        DX.viz.gauges.Gauge = DX.ui.Component.inherit({
            _themeManagerType: DX.viz.gauges.__internals.ThemeManager,
            _init: function() {
                var self = this;
                self._initRenderer();
                self._themeManager = new self._themeManagerType;
                self._translator = factory.createTranslator(0, 0, 0, 0);
                self._tracker = factory.createTracker({
                    renderer: self._renderer,
                    container: self._rootElement
                });
                self._layoutManager = factory.createLayoutManager();
                self._defaultSettings = self._getDefaultSettings();
                self._mainElements = [];
                self._externalElements = [];
                self._measureElements = [];
                self._initResizeHandler();
                self._selectMode()
            },
            _dispose: function() {
                var self = this;
                self.callBase.apply(self, arguments);
                self._scale && self._scale.dispose() && delete self._scale;
                self._rangeContainer && self._rangeContainer.dispose() && delete self._rangeContainer;
                self._disposeValueIndicators();
                self._tooltip && self._tooltip.dispose() && delete self._tooltip;
                self._tracker.dispose() && delete self._tracker;
                self._disposeResizeHandler();
                self._disposeRenderer();
                self._themeManager.dispose() && delete self._themeManager;
                delete self._layoutManager;
                delete self._defaultSettings;
                delete self._mainElements;
                delete self._externalElements;
                delete self._measureElements;
                self._animationSettings = null;
                self._disposeLoadIndicator()
            },
            _disposeValueIndicators: function() {
                var self = this;
                self._valueIndicator && self._valueIndicator.dispose() && delete self._valueIndicator;
                self._subvalueIndicatorsSet && self._subvalueIndicatorsSet.dispose() && delete self._subvalueIndicatorsSet
            },
            _selectMode: function() {
                var self = this;
                if (self.option(OPTION_VALUE) === undefined && self.option(OPTION_SUBVALUES) === undefined)
                    if (self.option('needles') !== undefined || self.option('markers') !== undefined || self.option('rangeBars') !== undefined) {
                        self._value = self._subvalues = self.value = self.subvalues = _noop;
                        self._updateActiveElements = function() {
                            var noAnimation = this._noAnimation;
                            $each([].concat(this._needles || [], this._markers || [], this._rangeBars || []), function(_, pointer) {
                                pointer.value(pointer._options.value, noAnimation)
                            });
                            this._resizing || this.hideLoadingIndicator()
                        };
                        self._prepareValueIndicators = function() {
                            prepareObsoleteElements(this)
                        };
                        self._disposeValueIndicators = function() {
                            $each([].concat(this._needles || [], this._markers || [], this._rangeBars || []), function(_, pointer) {
                                pointer.dispose()
                            });
                            delete this._needles;
                            delete this._markers;
                            delete this._rangeBars
                        };
                        self._cleanValueIndicators = function() {
                            $each([].concat(this._needles || [], this._markers || [], this._rangeBars || []), function(_, pointer) {
                                pointer.clean()
                            })
                        };
                        self.needleValue = function(index, value) {
                            return accessPointerValue.call(this, this._needles, arguments)
                        };
                        self.markerValue = function(index, value) {
                            return accessPointerValue.call(this, this._markers, arguments)
                        };
                        self.rangeBarValue = function(index, value) {
                            return accessPointerValue.call(this, this._rangeBars, arguments)
                        }
                    }
                    else if (self.option('valueIndicators') !== undefined) {
                        self._value = self._subvalues = self.value = self.subvalues = _noop;
                        self._updateActiveElements = function() {
                            var noAnimation = this._noAnimation;
                            $each(this._valueIndicators, function(_, valueIndicator) {
                                valueIndicator.value(valueIndicator._options.value, noAnimation)
                            });
                            this._resizing || this.hideLoadingIndicator()
                        };
                        self._prepareValueIndicators = function() {
                            prepareValueIndicatorsInHardMode(this)
                        };
                        self._disposeValueIndicators = function() {
                            $each(this._valueIndicators, function(_, valueIndicator) {
                                valueIndicator.dispose()
                            });
                            delete this._valueIndicators
                        };
                        self._cleanValueIndicators = function() {
                            $each(this._valueIndicators, function(_, valueIndicator) {
                                valueIndicator.clean()
                            })
                        };
                        self.indicatorValue = function() {
                            return accessPointerValue.call(this, this._valueIndicators, arguments)
                        }
                    }
            },
            _initRenderer: function() {
                var self = this;
                self._canvas = {
                    width: 1,
                    height: 1,
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: 0,
                    marginBottom: 0
                };
                self._renderer = factory.createRenderer({
                    width: 1,
                    height: 1
                });
                self._rootElement = self._renderer.getRoot();
                self._rootElement.applySettings({'class': 'dxg ' + self._rootClass})
            },
            _disposeRenderer: function() {
                var self = this;
                self._renderer.killContainer();
                delete self._renderer;
                delete self._canvas;
                self._rootElement.remove();
                delete self._rootElement
            },
            _initResizeHandler: function() {
                var self = this;
                self._resizeHandler = DX.utils.createResizeHandler(function() {
                    if (self._updateCanvas()) {
                        self._resizing = self._noAnimation = true;
                        self._clean();
                        self._renderCore();
                        delete self._resizing
                    }
                });
                self._resizeHandler.dispose = function() {
                    self = null;
                    return this
                }
            },
            _disposeResizeHandler: function() {
                windowResizeCallbacks.remove(this._resizeHandler.stop().dispose());
                delete this._resizeHandler
            },
            _trackWindowResize: function() {
                var self = this,
                    redrawOnResize = self.option('redrawOnResize');
                redrawOnResize = redrawOnResize !== undefined ? !!redrawOnResize : self._defaultSettings.redrawOnResize;
                if (redrawOnResize)
                    windowResizeCallbacks.has(self._resizeHandler) || windowResizeCallbacks.add(self._resizeHandler);
                else
                    windowResizeCallbacks.remove(self._resizeHandler)
            },
            _getDefaultSettings: function() {
                return $extend(true, {}, DX.viz.gauges.__internals.BASE_GAUGE_SETTINGS, DEFAULT_GAUGE_SETTINGS)
            },
            _getIncidentOccured: function() {
                var incidentOccured = this.option('incidentOccured');
                isFunction(incidentOccured) || (incidentOccured = this._defaultSettings.incidentOccured);
                return function() {
                        incidentOccured.apply(null, arguments)
                    }
            },
            _setupAnimationSettings: function() {
                var self = this,
                    option = self.option('animation');
                self._animationSettings = null;
                if (option === undefined || option) {
                    if (option === undefined)
                        option = {
                            enabled: self.option('animationEnabled'),
                            duration: self.option('animationDuration')
                        };
                    option = $extend({
                        enabled: true,
                        duration: 1000,
                        easing: 'easeOutCubic'
                    }, option);
                    if (option.enabled && option.duration > 0)
                        self._animationSettings = {
                            duration: Number(option.duration),
                            easing: option.easing
                        }
                }
            },
            _getDefaultFormatOptions: function() {
                return DX.utils.getAppropriateFormat(this._area.startValue, this._area.endValue, this._getApproximateScreenRange())
            },
            _getCanvas: function() {
                var self = this,
                    size = self.option('size') || {},
                    margin = self.option('margin') || {},
                    defaultSize = self._getDefaultContainerSize(),
                    width = size.width >= 0 ? Number(size.width) : self._element().width(),
                    height = size.height >= 0 ? Number(size.height) : self._element().height(),
                    marginLeft = margin.left > 0 ? Number(margin.left) : 0,
                    marginTop = margin.top > 0 ? Number(margin.top) : 0,
                    marginRight = margin.right > 0 ? Number(margin.right) : 0,
                    marginBottom = margin.bottom > 0 ? Number(margin.bottom) : 0;
                if (!width && Number(size.width) !== 0)
                    width = defaultSize.width;
                if (!height && Number(size.height) !== 0)
                    height = defaultSize.height;
                if (marginLeft + marginRight >= width)
                    marginLeft = marginRight = 0;
                if (marginTop + marginBottom >= height)
                    marginTop = marginBottom = 0;
                return {
                        width: width,
                        height: height,
                        marginLeft: marginLeft,
                        marginTop: marginTop,
                        marginRight: marginRight,
                        marginBottom: marginBottom
                    }
            },
            _updateVisibility: function(canvas) {
                var self = this;
                if (canvas.width - canvas.marginLeft - canvas.marginRight >= 2 && canvas.height - canvas.marginTop - canvas.marginBottom >= 2 && self._element().is(':visible'))
                    return true;
                else {
                    self._incidentOccured('Gauge cannot be drawn because its container is either too small or invisible.');
                    return false
                }
            },
            _getArea: function() {
                var self = this,
                    scale = self.option('scale') || {},
                    area = {};
                area.startValue = isFinite(scale.startValue) ? Number(scale.startValue) : 0;
                area.endValue = isFinite(scale.endValue) ? Number(scale.endValue) : 100;
                area.baseValue = Math.min(area.startValue, area.endValue);
                self._setupArea(area);
                self._translator.setup({
                    codomainStart: area.startCoord,
                    codomainEnd: area.endCoord,
                    domainStart: area.startValue,
                    domainEnd: area.endValue
                });
                return area
            },
            _renderTitle: function() {
                var self = this,
                    titleOptions = self.option('title'),
                    subtitleOptions = self.option('subtitle');
                if (!self._title) {
                    self._title = factory.createTitle();
                    self._title._renderer = self._renderer;
                    self._title._owner = self._rootElement
                }
                titleOptions = $extend(true, {}, self._defaultSettings.title, self._themeManager.getPartialTheme('title'), self._title.processTitleOptions(titleOptions));
                subtitleOptions = $extend(true, {}, self._defaultSettings.subtitle, self._themeManager.getPartialTheme('subtitle'), self._title.processSubtitleOptions(subtitleOptions));
                self._title.render({
                    title: titleOptions,
                    subtitle: subtitleOptions
                });
                self._title.isVisible() && self._externalElements.push(self._title)
            },
            _renderDeltaIndicator: function() {
                var self = this,
                    options = self.option('indicator');
                if (!self._indicator) {
                    self._indicator = factory.createIndicator();
                    if (self._indicator) {
                        self._indicator._renderer = self._renderer;
                        self._indicator._owner = self._rootElement
                    }
                }
                if (self._indicator) {
                    options = $extend(true, {}, self._defaultSettings.indicator, self._themeManager.getPartialTheme('indicator'), options);
                    self._indicator.render(options);
                    self._indicator.isVisible() && self._externalElements.push(self._indicator)
                }
            },
            _renderTooltip: function() {
                var self = this,
                    options = $extend(true, {}, self._defaultSettings.tooltip, self._themeManager.getPartialTheme('tooltip'), self.option('tooltip'));
                if (!self._tooltip)
                    self._tooltip = factory.createTooltip({
                        renderer: self._renderer,
                        container: self._rootElement,
                        tracker: self._tracker
                    });
                self._tooltip.init(options).setRect(self._rootRect).render()
            },
            _renderDebugInfo: function() {
                var self = this,
                    group = self._debugGroup || self._renderer.createGroup({'class': 'debug-info'}).append(),
                    rect;
                group.clear();
                rect = self._rootRect;
                self._renderer.createRect(rect.left, rect.top, rect.width(), rect.height(), 0, {
                    stroke: '#000000',
                    strokeWidth: 1,
                    fill: 'none'
                }).append(group);
                rect = self._mainRect;
                self._renderer.createRect(rect.left, rect.top, rect.width(), rect.height(), 0, {
                    stroke: '#0000FF',
                    strokeWidth: 1,
                    fill: 'none'
                }).append(group);
                rect = self._layoutManager.getRect();
                rect && self._renderer.createRect(rect.left, rect.top, rect.width(), rect.height(), 0, {
                    stroke: '#FF0000',
                    strokeWidth: 1,
                    fill: 'none'
                }).append(group);
                rect = self._title && self._title.isVisible() ? self._title.getBoundingRect() : null;
                rect && self._renderer.createRect(rect.left, rect.top, rect.width(), rect.height(), 0, {
                    stroke: '#00FF00',
                    strokeWidth: 1,
                    fill: 'none'
                }).append(group);
                rect = self._indicator && self._indicator.isVisible() ? self._indicator.getBoundingRect() : null;
                rect && self._renderer.createRect(rect.left, rect.top, rect.width(), rect.height(), 0, {
                    stroke: '#00FF00',
                    strokeWidth: 1,
                    fill: 'none'
                }).append(group)
            },
            _updateCanvas: function(force) {
                var currentCanvas = this._canvas,
                    newCanvas = this._getCanvas();
                if (!this._updateVisibility(newCanvas))
                    return false;
                if (newCanvas.width === currentCanvas.width && newCanvas.height === currentCanvas.height && !force)
                    return false;
                this._canvas = newCanvas;
                return true
            },
            _renderCore: function() {
                var self = this,
                    canvas = self._canvas;
                self._renderer.container || self._renderer.draw(self._element().get(0));
                self._renderer.resize(canvas.width, canvas.height);
                self._rootRect = new Rectangle({
                    left: canvas.marginLeft,
                    top: canvas.marginTop,
                    right: canvas.width - canvas.marginRight,
                    bottom: canvas.height - canvas.marginBottom
                });
                self._layoutManager.setRect(self._rootRect);
                self._mainRect = self._rootRect.clone();
                self._area = self._getArea();
                self._defaultFormatOptions = self._getDefaultFormatOptions();
                self._mainElements.length = 0;
                self._externalElements.length = 0;
                self._measureElements.length = 0;
                self._renderTitle();
                self._renderDeltaIndicator();
                self._externalElements.reverse();
                $each(self._externalElements, function(_, item) {
                    var layout = self._layoutManager.applyLayout(item.getBoundingRect(), item.getLayoutOptions());
                    item.move(layout.dx, layout.dy)
                });
                self._mainRect = self._layoutManager.getRect();
                self._prepareMainElements();
                $each(self._measureElements, function(_, element) {
                    self._updateElementPosition(element)
                });
                self._applyMainLayout();
                self._renderMainElements();
                $each(self._externalElements, function(_, item) {
                    var layout = self._layoutManager.dock(item.getBoundingRect(), item.getLayoutOptions());
                    item.move(layout.dx, layout.dy)
                });
                self._renderTooltip();
                self._tracker.activate();
                self._updateLoadIndicator(undefined, self._canvas.width, self._canvas.height);
                self._updateActiveElements();
                delete self._noAnimation;
                self.option('debugMode') === true && self._renderDebugInfo();
                self._debug_rendered && self._debug_rendered()
            },
            _updateIndicatorSettings: function(settings) {
                var self = this;
                settings.baseValue = isFinite(self._translator.translate(settings.baseValue)) ? Number(settings.baseValue) : self._area.baseValue;
                settings.currentValue = settings.baseValue;
                if (settings.text && !settings.text.format && !settings.text.precision) {
                    settings.text.format = self._defaultFormatOptions.format;
                    settings.text.precision = self._defaultFormatOptions.precision
                }
            },
            _prepareValueIndicatorSettings: function() {
                var self = this,
                    options = self.option('valueIndicator') || {},
                    defaultOptions = $extend(true, {}, self._defaultSettings.valueIndicator, self._themeManager.getPartialTheme('valueIndicator')),
                    type = String(options.type || defaultOptions.type).toLowerCase();
                self._valueIndicatorSettings = $extend(true, defaultOptions._default, defaultOptions[type], options, {
                    type: type,
                    animation: self._animationSettings,
                    containerBackgroundColor: self._containerBackgroundColor
                });
                self._updateIndicatorSettings(self._valueIndicatorSettings)
            },
            _prepareSubvalueIndicatorSettings: function() {
                var self = this,
                    options = self.option('subvalueIndicator') || {},
                    defaultOptions = $extend(true, {}, self._defaultSettings.subvalueIndicator, self._themeManager.getPartialTheme('subvalueIndicator')),
                    type = String(options.type || defaultOptions.type).toLowerCase();
                self._subvalueIndicatorSettings = $extend(true, defaultOptions._default, defaultOptions[type], options, {
                    type: type,
                    animation: self._animationSettings,
                    containerBackgroundColor: self._containerBackgroundColor
                });
                self._updateIndicatorSettings(self._subvalueIndicatorSettings)
            },
            _renderMainElements: function() {
                var self = this;
                self._translator.setup({
                    domainStart: self._area.startValue,
                    domainEnd: self._area.endValue,
                    codomainStart: self._area.startCoord,
                    codomainEnd: self._area.endCoord
                });
                $each(self._mainElements, function(_, element) {
                    self._updateElementPosition(element);
                    element.render()
                })
            },
            _clean: function() {
                var self = this;
                self._tracker.deactivate();
                self._scale && self._scale.clean();
                self._rangeContainer && self._rangeContainer.clean();
                self._cleanValueIndicators()
            },
            _cleanValueIndicators: function() {
                this._valueIndicator && this._valueIndicator.clean();
                this._subvalueIndicatorsSet && this._subvalueIndicatorsSet.clean()
            },
            _render: function() {
                var self = this;
                self._themeManager.setTheme(self.option('theme'));
                self._incidentOccured = self._getIncidentOccured();
                self._setupAnimationSettings();
                self._containerBackgroundColor = self.option('containerBackgroundColor') || self._themeManager.getPartialTheme('containerBackgroundColor') || self._defaultSettings.containerBackgroundColor;
                if (self._updateCanvas(true))
                    self._renderCore();
                self._trackWindowResize()
            },
            _prepareMainElements: function() {
                this._prepareRangeContainer();
                this._prepareScale();
                this._prepareValueIndicators()
            },
            _prepareValueIndicators: function() {
                this._prepareValueIndicator();
                this._prepareSubvalueIndicators()
            },
            _updateActiveElements: function() {
                var self = this;
                self._value(self.option(OPTION_VALUE));
                self._subvalues(self.option(OPTION_SUBVALUES))
            },
            _prepareScale: function() {
                var self = this,
                    scale = self._scale;
                if (!scale) {
                    scale = self._scale = self._createScale();
                    scale.setup({
                        renderer: self._renderer,
                        translator: self._translator,
                        owner: self._rootElement,
                        incidentOccured: self._incidentOccured
                    })
                }
                scale.init($extend(true, {}, self._defaultSettings.scale, self._themeManager.getPartialTheme('scale'), self.option('scale'), {
                    offset: 0,
                    approximateScreenDelta: self._getApproximateScreenRange()
                }));
                self._mainElements.push(scale);
                self._measureElements.push(scale)
            },
            _prepareRangeContainer: function() {
                var self = this,
                    rangeContainer = self._rangeContainer;
                if (!rangeContainer) {
                    rangeContainer = self._rangeContainer = self._createRangeContainer();
                    rangeContainer.setup({
                        renderer: self._renderer,
                        translator: self._translator,
                        owner: self._rootElement,
                        incidentOccured: self._incidentOccured
                    })
                }
                rangeContainer.init($extend({}, self._defaultSettings.rangeContainer, self._themeManager.getPartialTheme('rangeContainer'), self.option('rangeContainer'), {themeName: self._themeManager.themeName()}));
                self._mainElements.push(rangeContainer);
                self._measureElements.push(rangeContainer)
            },
            _prepareValueIndicator: function() {
                var self = this,
                    indicator = self._valueIndicator,
                    currentValue;
                self._prepareValueIndicatorSettings();
                indicator && self._valueIndicatorType !== self._valueIndicatorSettings.type && indicator.dispose() && (indicator = null);
                self._valueIndicatorType = self._valueIndicatorSettings.type;
                if (!indicator) {
                    indicator = self._valueIndicator = self._createValueIndicator(self._valueIndicatorType);
                    if (indicator) {
                        indicator.setup({
                            renderer: self._renderer,
                            translator: self._translator,
                            owner: self._rootElement,
                            tracker: self._tracker,
                            className: 'dxg-value-indicator'
                        });
                        indicator._trackerInfo = {type: 'value-indicator'}
                    }
                    else
                        self._incidentOccured('Value indicator has not been created because its specified type is unknown.')
                }
                indicator.init(self._valueIndicatorSettings);
                self._mainElements.push(indicator);
                self._measureElements.push(indicator)
            },
            _prepareSubvalueIndicators: function() {
                var self = this,
                    subvalueIndicatorsSet = self._subvalueIndicatorsSet;
                if (!subvalueIndicatorsSet)
                    subvalueIndicatorsSet = self._subvalueIndicatorsSet = new DX.viz.gauges.__internals.ValueIndicatorsSet({
                        renderer: self._renderer,
                        translator: self._translator,
                        owner: self._rootElement,
                        tracker: self._tracker,
                        className: 'dxg-subvalue-indicators',
                        indicatorClassName: 'dxg-subvalue-indicator',
                        trackerType: 'subvalue-indicator',
                        createIndicator: function() {
                            return self._createSubvalueIndicator(self._subvalueIndicatorType)
                        }
                    });
                self._prepareSubvalueIndicatorSettings();
                var isRecreate = self._subvalueIndicatorSettings.type !== self._subvalueIndicatorType;
                self._subvalueIndicatorType = self._subvalueIndicatorSettings.type;
                if (self._createSubvalueIndicator(self._subvalueIndicatorType)) {
                    subvalueIndicatorsSet.setSettings(self._subvalueIndicatorSettings, self.option(OPTION_SUBVALUES)).prepare(isRecreate);
                    self._measureElements.push(subvalueIndicatorsSet);
                    self._mainElements.push(subvalueIndicatorsSet)
                }
                else
                    self._incidentOccured('Subvalue indicator has not been created because its specified type is unknown.')
            },
            _value: function(value) {
                var self = this;
                if (arguments.length) {
                    self._valueIndicator.value(value, self._noAnimation);
                    self._resizing || self.hideLoadingIndicator();
                    return self
                }
                return self._valueIndicator.value()
            },
            _subvalues: function(values) {
                var self = this;
                if (arguments.length) {
                    self._subvalueIndicatorsSet.values(values, self._noAnimation);
                    self._resizing || self.hideLoadingIndicator();
                    return self
                }
                return self._subvalueIndicatorsSet.values()
            },
            _refresh: function() {
                var self = this,
                    callBase = self.callBase;
                self._endLoading(function() {
                    callBase.call(self)
                })
            },
            render: function(options) {
                options && options.animate !== undefined && !options.animate && (this._noAnimation = true);
                this._refresh();
                return this
            },
            value: function(arg) {
                var self = this;
                if (arguments.length) {
                    self._value(arg);
                    self.option(OPTION_VALUE, self._value());
                    return self
                }
                return self._value()
            },
            subvalues: function(arg) {
                var self = this;
                if (arguments.length) {
                    self._subvalues(arg);
                    self.option(OPTION_SUBVALUES, self._subvalues());
                    return self
                }
                return self._subvalues()
            },
            _optionChanged: function(name, newValue, oldValue) {
                var self = this;
                switch (name) {
                    case OPTION_VALUE:
                        self._value(newValue);
                        self.option(OPTION_VALUE, self._value());
                        return null;
                    case OPTION_SUBVALUES:
                        self._subvalues(newValue);
                        self.option(OPTION_SUBVALUES, self._subvalues());
                        return null;
                    case OPTION_LOADINDICATOR:
                        self._updateLoadIndicator($extend(true, {}, self._themeManager.getPartialTheme(OPTION_LOADINDICATOR), self.option(OPTION_LOADINDICATOR)));
                        return null;
                    default:
                        self._invalidate();
                        return self.callBase.apply(self, arguments)
                }
            },
            _optionValuesEqual: function(name, oldValue, newValue) {
                switch (name) {
                    case OPTION_VALUE:
                        return oldValue === newValue;
                    case OPTION_SUBVALUES:
                        return compareArrays(oldValue, newValue);
                    default:
                        return this.callBase.apply(this, arguments)
                }
            },
            _getDefaultContainerSize: function() {
                throw new Error('_getDefaultContainerSize - not implemented');
            },
            _setupArea: function() {
                throw new Error('_setupArea - not implemented');
            },
            _applyMainLayout: function() {
                throw new Error('_applyMainLayout - not implemented');
            },
            _updateElementPosition: function(element) {
                throw new Error('_updateElementPosition - not implemented');
            },
            _createScale: function() {
                throw new Error('_createScale - not implemented');
            },
            _createRangeContainer: function() {
                throw new Error('_createRangeContainer - not implemented');
            },
            _createValueIndicator: function() {
                throw new Error('_createValueIndicator - not implemented');
            },
            _createSubvalueIndicator: function() {
                throw new Error('_createSubvalueIndicator - not implemented');
            },
            _getApproximateScreenRange: function() {
                throw new Error('_getApproximateScreenRange - not implemented');
            }
        }).include(core.widgetMarkupMixin).inherit(core.loadIndicatorMixin.base).redefine(core.loadIndicatorMixin.gauge);
        function prepareValueIndicatorsInHardMode(self) {
            var valueIndicators = self._valueIndicators || [],
                userOptions = self.option('valueIndicators'),
                optionList = [],
                i = 0,
                ii;
            for (ii = isArray(userOptions) ? userOptions.length : 0; i < ii; ++i)
                optionList.push(userOptions[i]);
            for (ii = valueIndicators.length; i < ii; ++i)
                optionList.push(null);
            var defaultSettings = self._defaultSettings.valueIndicators,
                themeSettings = self._themeManager.getPartialTheme('valueIndicators'),
                parameters = {
                    renderer: self._renderer,
                    owner: self._rootElement,
                    translator: self._translator,
                    tracker: self._tracker
                },
                newValueIndicators = [];
            $each(optionList, function(i, userSettings) {
                var valueIndicator = valueIndicators[i];
                if (!userSettings) {
                    valueIndicator && valueIndicator.dispose();
                    return
                }
                var type = String(userSettings.type || defaultSettings._type).toLowerCase();
                if (valueIndicator && type !== valueIndicator._options.type) {
                    valueIndicator.dispose();
                    valueIndicator = null
                }
                if (!valueIndicator) {
                    valueIndicator = self._createValueIndicatorInHardMode(type);
                    valueIndicator && valueIndicator.setup(parameters)
                }
                if (valueIndicator) {
                    var settings = $extend(true, {}, defaultSettings._default, defaultSettings[type], themeSettings._default, themeSettings[type], userSettings, {
                            type: type,
                            animation: self._animationSettings,
                            containerBackgroundColor: self._containerBackgroundColor
                        });
                    self._updateIndicatorSettings(settings);
                    valueIndicator.init(settings);
                    valueIndicator._trackerInfo = {index: i};
                    self._mainElements.push(valueIndicator);
                    self._measureElements.push(valueIndicator);
                    newValueIndicators.push(valueIndicator)
                }
            });
            self._valueIndicators = newValueIndicators
        }
        function prepareObsoleteElements(self) {
            prepareObsoletePointers(self, '_rangeBars', '_createRangeBar', {
                user: self.option('rangeBars'),
                common: self.option('commonRangeBarSettings'),
                _default: self._defaultSettings.valueIndicator,
                theme: self._themeManager.getPartialTheme('valueIndicator'),
                preset: {},
                type: 'rangebar',
                className: 'dxg-value-indicator'
            });
            prepareObsoletePointers(self, '_needles', '_createNeedle', {
                user: self.option('needles'),
                common: self.option('commonNeedleSettings'),
                _default: self._defaultSettings.valueIndicator,
                theme: self._themeManager.getPartialTheme('valueIndicator'),
                preset: self._getPreset().commonNeedleSettings,
                className: 'dxg-value-indicator'
            });
            prepareObsoletePointers(self, '_markers', '_createMarker', {
                user: self.option('markers'),
                common: self.option('commonMarkerSettings'),
                _default: self._defaultSettings.subvalueIndicator,
                theme: self._themeManager.getPartialTheme('subvalueIndicator'),
                preset: self._getPreset().commonMarkerSettings,
                className: 'dxg-subvalue-indicator'
            })
        }
        function prepareObsoletePointers(self, fieldName, methodName, options) {
            var pointers = self[fieldName] || [],
                userOptions = [],
                i = 0,
                ii;
            for (ii = isArray(options.user) ? options.user.length : 0; i < ii; ++i)
                userOptions.push(options.user[i]);
            for (ii = pointers.length; i < ii; ++i)
                userOptions.push(null);
            var defaultOption = options._default,
                themeOption = options.theme,
                presetOption = options.preset,
                commonOption = options.common || {},
                parameters = {
                    renderer: self._renderer,
                    owner: self._rootElement,
                    translator: self._translator,
                    tracker: self._tracker,
                    className: options.className
                },
                newPointers = [];
            $each(userOptions, function(i, pointerOption) {
                var pointer = pointers[i];
                if (!pointerOption) {
                    pointer && pointer.dispose();
                    return
                }
                var type = String(pointerOption.type || commonOption.type || presetOption.type || defaultOption.type).toLowerCase(),
                    settings;
                if (pointer && pointer._options.type !== type) {
                    pointer.dispose();
                    pointer = null
                }
                if (!pointer) {
                    pointer = self[methodName](type);
                    pointer.setup(parameters)
                }
                if (pointer) {
                    type = options.type || type;
                    settings = $extend(true, {}, defaultOption._default, defaultOption[type], themeOption._default, themeOption[type], commonOption, pointerOption),
                    delete settings.spindleSize;
                    settings.animation = self._animationSettings;
                    settings.containerBackgroundColor = self._containerBackgroundColor;
                    self._updateIndicatorSettings(settings);
                    pointer.init(settings);
                    self._mainElements.push(pointer);
                    self._measureElements.push(pointer);
                    newPointers.push(pointer)
                }
            });
            if (newPointers.length)
                self[fieldName] = newPointers;
            else
                delete self[fieldName]
        }
        function accessPointerValue(pointers, args) {
            var pointer = (pointers || [])[args[0]];
            if (args.length > 1) {
                pointer && pointer.value(args[1]);
                this._resizing || this.hideLoadingIndicator();
                return this
            }
            else
                return pointer ? pointer.value() : undefined
        }
        function compareArrays(array1, array2) {
            if (array1 === array2)
                return true;
            if (isArray(array1) && isArray(array2) && array1.length === array2.length) {
                for (var i = 0, ii = array1.length; i < ii; ++i)
                    if (array1[i] !== array2[i])
                        return false;
                return true
            }
            return false
        }
        DX.viz.gauges.__internals.ValueIndicatorsSet = DX.Class.inherit({
            ctor: function(parameters) {
                var self = this;
                self._parameters = parameters;
                self._createIndicator = self._parameters.createIndicator || _noop;
                self._getIndicatorSettings = self._parameters.getIndicatorSettings || _noop;
                self._root = self._parameters.renderer.createGroup({'class': self._parameters.className})
            },
            dispose: function() {
                var self = this;
                if (self._indicators)
                    $each(self._indicators, function(_, indicator) {
                        indicator.dispose()
                    });
                self._parameters = self._createIndicator = self._getIndicatorSettings = self._root = self._options = self._indicators = null;
                return self
            },
            setSettings: function(indicatorSettings, data) {
                var self = this;
                self._indicatorSettings = indicatorSettings;
                self._enabled = data !== null && (isArray(data) || isFinite(data));
                self._options = {offset: indicatorSettings.offset};
                return self
            },
            init: function(indicatorPosition) {
                $extend(true, this._options, indicatorPosition);
                return this
            },
            prepare: function(isRecreate) {
                var self = this;
                if (self._enabled) {
                    self._root.append(self._parameters.owner);
                    self._indicatorParameters = self._indicatorParameters || {
                        renderer: self._parameters.renderer,
                        translator: self._parameters.translator,
                        owner: self._root,
                        tracker: self._parameters.tracker,
                        className: self._parameters.indicatorClassName
                    };
                    self._indicators = self._indicators || [];
                    if (self._createIndicator())
                        self._indicators = $map(self._indicators, function(indicator, i) {
                            if (isRecreate) {
                                indicator.dispose();
                                indicator = self._createIndicator();
                                indicator.setup(self._indicatorParameters);
                                indicator._trackerInfo = {
                                    type: self._parameters.trackerType,
                                    index: i
                                }
                            }
                            indicator.init(self._indicatorSettings);
                            return indicator
                        })
                }
                return self
            },
            measure: function() {
                var self = this,
                    indicator = self._createIndicator(),
                    result = null;
                if (indicator && self._enabled) {
                    indicator.setup(self._indicatorParameters).init(self._indicatorSettings).init(self._options);
                    result = indicator.measure();
                    indicator.clean().dispose()
                }
                return result
            },
            clean: function() {
                var self = this;
                self._root.detach();
                if (self._enabled)
                    $each(self._indicators, function(_, indicator) {
                        indicator.clean()
                    });
                return self
            },
            render: function() {
                var self = this;
                if (self._enabled) {
                    self._root.append(self._parameters.owner);
                    $each(self._indicators, function(i, indicator) {
                        indicator.init(self._options).init(self._getIndicatorSettings(i)).render()
                    })
                }
                return self
            },
            _adjustIndicatorsCount: function(count) {
                var self = this,
                    indicators = self._indicators,
                    i,
                    ii,
                    indicatorOptions,
                    indicator;
                if (indicators.length > count) {
                    for (i = count, ii = indicators.length; i < ii; ++i)
                        indicators[i].clean().dispose();
                    self._indicators = indicators.slice(0, count)
                }
                else if (indicators.length < count)
                    for (i = indicators.length, ii = count; i < ii; ++i) {
                        indicator = self._createIndicator();
                        indicator.setup(self._indicatorParameters);
                        indicator._trackerInfo = {
                            type: self._parameters.trackerType,
                            index: i
                        };
                        indicator.init(self._indicatorSettings).init(self._options).init(self._getIndicatorSettings(i)).render();
                        indicators.push(indicator)
                    }
            },
            values: function(arg, _noAnimation) {
                var self = this;
                if (!self._enabled)
                    return;
                if (arguments.length) {
                    if (!isArray(arg))
                        arg = isFinite(arg) ? [Number(arg)] : null;
                    if (arg) {
                        self._adjustIndicatorsCount(arg.length);
                        $each(self._indicators, function(i, indicator) {
                            indicator.value(arg[i], _noAnimation)
                        })
                    }
                    return self
                }
                return $map(self._indicators, function(indicator) {
                        return indicator.value()
                    })
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file circularGauge.js */
    (function(DX, $, undefined) {
        var factory = DX.viz.gauges.__factory;
        var isFinite = window.isFinite,
            Number = window.Number,
            normalizeAngle = DX.utils.normalizeAngle,
            getCosAndSin = DX.utils.getCosAndSin,
            abs = Math.abs,
            max = Math.max,
            min = Math.min,
            round = Math.round,
            slice = Array.prototype.slice,
            $extend = $.extend,
            $each = $.each;
        var PI = Math.PI;
        var DEFAULT_GAUGE_SETTINGS = {
                geometry: {
                    startAngle: 225,
                    endAngle: -45,
                    totalRadius: undefined
                },
                scale: {
                    orientation: 'outside',
                    label: {indentFromTick: 10}
                },
                rangeContainer: {orientation: 'outside'},
                valueIndicator: {
                    type: 'rectangleneedle',
                    _default: {
                        offset: 20,
                        indentFromCenter: 0,
                        width: 2,
                        spindleSize: 14,
                        spindleGapSize: 10
                    },
                    triangleneedle: {width: 4},
                    triangle: {width: 4},
                    twocolorneedle: {
                        space: 2,
                        secondFraction: 0.4
                    },
                    twocolorrectangle: {
                        space: 2,
                        secondFraction: 0.4
                    },
                    rangebar: {offset: 30}
                },
                subvalueIndicator: {
                    type: 'trianglemarker',
                    trianglemarker: {offset: 6},
                    triangle: {offset: 6},
                    textcloud: {offset: -6}
                },
                valueIndicators: {
                    _type: 'rectangleneedle',
                    _default: {
                        offset: 20,
                        indentFromCenter: 0,
                        width: 2,
                        spindleSize: 14,
                        spindleGapSize: 10
                    },
                    triangleneedle: {width: 4},
                    twocolorneedle: {
                        space: 2,
                        secondFraction: 0.4
                    },
                    rangebar: {offset: 30},
                    trianglemarker: {offset: 6},
                    textcloud: {offset: -6}
                }
            };
        function getSides(startAngle, endAngle) {
            var startCosSin = getCosAndSin(startAngle),
                endCosSin = getCosAndSin(endAngle),
                startCos = startCosSin.cos,
                startSin = startCosSin.sin,
                endCos = endCosSin.cos,
                endSin = endCosSin.sin;
            return {
                    left: startSin <= 0 && endSin >= 0 || startSin <= 0 && endSin <= 0 && startCos <= endCos || startSin >= 0 && endSin >= 0 && startCos >= endCos ? -1 : min(startCos, endCos, 0),
                    right: startSin >= 0 && endSin <= 0 || startSin >= 0 && endSin >= 0 && startCos >= endCos || startSin <= 0 && endSin <= 0 && startCos <= endCos ? 1 : max(startCos, endCos, 0),
                    up: startCos <= 0 && endCos >= 0 || startCos <= 0 && endCos <= 0 && startSin >= endSin || startCos >= 0 && endCos >= 0 && startSin <= endSin ? -1 : -max(startSin, endSin, 0),
                    down: startCos >= 0 && endCos <= 0 || startCos >= 0 && endCos >= 0 && startSin <= endSin || startCos <= 0 && endCos <= 0 && startSin >= endSin ? 1 : -min(startSin, endSin, 0)
                }
        }
        DX.viz.gauges.CircularGauge = DX.viz.gauges.Gauge.inherit({
            _rootClass: 'dxg-circular-gauge',
            _getDefaultSettings: function() {
                return $extend(true, this.callBase(), DEFAULT_GAUGE_SETTINGS)
            },
            _selectMode: function() {
                this.callBase.apply(this, arguments);
                if (typeof this.indicatorValue === 'function')
                    this._createValueIndicatorInHardMode = function(type) {
                        return factory.createCircularValueIndicatorInHardMode(type)
                    }
            },
            _setupArea: function(area) {
                var self = this,
                    geometry = self.option('geometry') || {},
                    startAngle = geometry.startAngle,
                    endAngle = geometry.endAngle,
                    centerAngle;
                startAngle = isFinite(startAngle) ? normalizeAngle(startAngle) : self._defaultSettings.geometry.startAngle;
                endAngle = isFinite(endAngle) ? normalizeAngle(endAngle) : self._defaultSettings.geometry.endAngle;
                if (abs(startAngle - endAngle) < 1) {
                    endAngle -= 360;
                    area.sides = {
                        left: -1,
                        up: -1,
                        right: 1,
                        down: 1
                    }
                }
                else {
                    startAngle < endAngle && (endAngle -= 360);
                    area.sides = getSides(startAngle, endAngle)
                }
                area.x = 0;
                area.y = 0;
                area.radius = 100;
                area.startCoord = startAngle;
                area.endCoord = endAngle;
                area.scaleRadius = geometry.scaleRadius > 0 ? Number(geometry.scaleRadius) : self._defaultSettings.geometry.scaleRadius
            },
            _measureMainElements: function() {
                var self = this,
                    maxRadius = 0,
                    minRadius = Infinity,
                    maxHorizontalOffset = 0,
                    maxVerticalOffset = 0,
                    maxInverseHorizontalOffset = 0,
                    maxInverseVerticalOffset = 0;
                $each(self._measureElements, function(_, x) {
                    var bounds = x.measure();
                    if (bounds) {
                        bounds.min > 0 && (minRadius = min(minRadius, bounds.min));
                        bounds.max > 0 && (maxRadius = max(maxRadius, bounds.max));
                        bounds.horizontalOffset > 0 && (maxHorizontalOffset = max(maxHorizontalOffset, bounds.max + bounds.horizontalOffset));
                        bounds.verticalOffset > 0 && (maxVerticalOffset = max(maxVerticalOffset, bounds.max + bounds.verticalOffset));
                        bounds.inverseHorizontalOffset > 0 && (maxInverseHorizontalOffset = max(maxInverseHorizontalOffset, bounds.inverseHorizontalOffset));
                        bounds.inverseVerticalOffset > 0 && (maxInverseVerticalOffset = max(maxInverseVerticalOffset, bounds.inverseVerticalOffset))
                    }
                });
                maxHorizontalOffset = max(maxHorizontalOffset - maxRadius, 0);
                maxVerticalOffset = max(maxVerticalOffset - maxRadius, 0);
                return {
                        minRadius: minRadius,
                        maxRadius: maxRadius,
                        horizontalMargin: maxHorizontalOffset,
                        verticalMargin: maxVerticalOffset,
                        inverseHorizontalMargin: maxInverseHorizontalOffset,
                        inverseVerticalMargin: maxInverseVerticalOffset
                    }
            },
            _applyMainLayout: function() {
                var self = this,
                    measurements = self._measureMainElements(),
                    area = self._area,
                    sides = area.sides,
                    margins = {
                        left: (sides.left < -0.1 ? measurements.horizontalMargin : measurements.inverseHorizontalMargin) || 0,
                        right: (sides.right > 0.1 ? measurements.horizontalMargin : measurements.inverseHorizontalMargin) || 0,
                        top: (sides.up < -0.1 ? measurements.verticalMargin : measurements.inverseVerticalMargin) || 0,
                        bottom: (sides.down > 0.1 ? measurements.verticalMargin : measurements.inverseVerticalMargin) || 0
                    },
                    rect = self._layoutManager.selectRectByAspectRatio((sides.down - sides.up) / (sides.right - sides.left), margins),
                    radius = min(rect.width() / (sides.right - sides.left), rect.height() / (sides.down - sides.up)),
                    x,
                    y;
                var scaler = (measurements.maxRadius - area.radius + area.scaleRadius) / radius;
                if (0 < scaler && scaler < 1) {
                    rect = rect.scale(scaler);
                    radius *= scaler
                }
                radius = radius - measurements.maxRadius + area.radius;
                x = rect.left - rect.width() * sides.left / (sides.right - sides.left);
                y = rect.top - rect.height() * sides.up / (sides.down - sides.up);
                area.x = round(x);
                area.y = round(y);
                area.radius = radius;
                rect.left -= margins.left;
                rect.right += margins.right;
                rect.top -= margins.top;
                rect.bottom += margins.bottom;
                self._layoutManager.setRect(rect)
            },
            _updateElementPosition: function(element) {
                var area = this._area;
                element.init({
                    x: area.x,
                    y: area.y,
                    radius: round(area.radius - (Number(element._options.offset) || 0))
                })
            },
            _createScale: function() {
                return factory.createCircularScale()
            },
            _createRangeContainer: function() {
                return factory.createCircularRangeContainer()
            },
            _createValueIndicator: function(type) {
                return factory.createCircularValueIndicator(type)
            },
            _createSubvalueIndicator: function(type) {
                return factory.createCircularSubvalueIndicator(type)
            },
            _getApproximateScreenRange: function() {
                var self = this,
                    area = self._area,
                    r = min(self._mainRect.width() / (area.sides.right - area.sides.left), self._mainRect.height() / (area.sides.down - area.sides.up));
                r > area.totalRadius && (r = area.totalRadius);
                r = 0.8 * r;
                return -self._translator.getCodomainRange() * r * PI / 180
            },
            _getDefaultContainerSize: function() {
                return {
                        width: 300,
                        height: 300
                    }
            },
            _getPreset: function() {
                var preset = this.option('preset'),
                    result;
                if (preset === 'preset2')
                    result = {
                        commonNeedleSettings: {type: 'twocolorrectangle'},
                        commonMarkerSettings: {type: 'triangle'}
                    };
                else if (preset === 'preset3')
                    result = {
                        commonNeedleSettings: {type: 'rectangle'},
                        commonMarkerSettings: {type: 'triangle'}
                    };
                else
                    result = {
                        commonNeedleSettings: {type: 'rectangle'},
                        commonMarkerSettings: {type: 'textcloud'}
                    };
                return result
            },
            _createNeedle: function(type) {
                return factory.createCircularNeedle(type)
            },
            _createMarker: function(type) {
                return factory.createCircularMarker(type)
            },
            _createRangeBar: function() {
                return factory.createCircularRangeBar()
            },
            _prepareMainElements: function() {
                this.callBase();
                this._prepareObsoleteSpindle()
            },
            _renderMainElements: function() {
                this.callBase();
                this._renderObsoleteSpindle()
            },
            _prepareObsoleteSpindle: function() {
                var self = this,
                    spindleOption = self.option('spindle') || {},
                    visible = self._needles && ('visible' in spindleOption ? !!spindleOption.visible : true);
                if (visible) {
                    var defaultOption = self._defaultSettings.valueIndicator._default,
                        size = spindleOption.size || defaultOption.spindleSize;
                    visible = size > 0
                }
                if (visible) {
                    var themeOption = self._themeManager.getPartialTheme('valueIndicator')._default,
                        gapSize = spindleOption.gapSize || defaultOption.spindleGapSize,
                        color = spindleOption.color || themeOption.color || defaultOption.color;
                    gapSize = gapSize <= size ? gapSize : size;
                    self._spindle = self._spindle || self._renderer.createGroup({'class': 'dxg-value-indicator'});
                    self._spindleOuter = self._spindleOuter || self._renderer.createCircle(0, 0, 0, {
                        'class': 'dxg-spindle-border',
                        stroke: 'none',
                        strokeWidth: 0
                    }).append(self._spindle);
                    self._spindleInner = self._spindleInner || self._renderer.createCircle(0, 0, 0, {
                        'class': 'dxg-spindle-hole',
                        stroke: 'none',
                        strokeWidth: 0
                    }).append(self._spindle);
                    self._spindleOuter.applySettings({
                        cx: self._area.x,
                        cy: self._area.y,
                        r: size / 2,
                        fill: color
                    });
                    self._spindleInner.applySettings({
                        cx: self._area.x,
                        cy: self._area.y,
                        r: gapSize / 2,
                        fill: self._containerBackgroundColor
                    })
                }
                else {
                    self._spindle && self._spindle.remove();
                    delete self._spindle;
                    delete self._spindleOuter;
                    delete self._spindleInner
                }
            },
            _renderObsoleteSpindle: function() {
                var self = this;
                if (self._spindle) {
                    self._spindleOuter.applySettings({
                        cx: self._area.x,
                        cy: self._area.y
                    });
                    self._spindleInner.applySettings({
                        cx: self._area.x,
                        cy: self._area.y
                    });
                    self._spindle.append(self._rootElement)
                }
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file linearGauge.js */
    (function(DX, $, undefined) {
        var factory = DX.viz.gauges.__factory;
        var max = Math.max,
            min = Math.min,
            round = Math.round,
            slice = Array.prototype.slice,
            $extend = $.extend,
            $each = $.each;
        var DEFAULT_GAUGE_SETTINGS = {
                geometry: {
                    orientation: 'horizontal',
                    totalSize: undefined
                },
                scale: {
                    horizontalOrientation: 'right',
                    verticalOrientation: 'bottom',
                    label: {indentFromTick: -10}
                },
                rangeContainer: {
                    horizontalOrientation: 'right',
                    verticalOrientation: 'bottom'
                },
                valueIndicator: {
                    type: 'rangebar',
                    _default: {
                        offset: 2.5,
                        length: 15,
                        width: 15
                    },
                    rectangle: {width: 10},
                    rangebar: {
                        offset: 10,
                        horizontalOrientation: 'right',
                        verticalOrientation: 'bottom'
                    }
                },
                subvalueIndicator: {
                    type: 'trianglemarker',
                    _default: {
                        offset: -1,
                        horizontalOrientation: 'left',
                        verticalOrientation: 'top'
                    }
                },
                valueIndicators: {
                    _type: 'rectangle',
                    _default: {
                        offset: 2.5,
                        length: 15,
                        width: 15
                    },
                    rectangle: {width: 10},
                    rangebar: {
                        offset: 10,
                        horizontalOrientation: 'right',
                        verticalOrientation: 'bottom'
                    },
                    trianglemarker: {
                        offset: -1,
                        horizontalOrientation: 'left',
                        verticalOrientation: 'top'
                    },
                    textcloud: {
                        offset: -1,
                        horizontalOrientation: 'left',
                        verticalOrientation: 'top'
                    }
                }
            };
        DX.viz.gauges.LinearGauge = DX.viz.gauges.Gauge.inherit({
            _rootClass: 'dxg-linear-gauge',
            _getDefaultSettings: function() {
                return $extend(true, this.callBase(), DEFAULT_GAUGE_SETTINGS)
            },
            _selectMode: function() {
                this.callBase.apply(this, arguments);
                if (typeof this.indicatorValue === 'function')
                    this._createValueIndicatorInHardMode = function(type) {
                        return factory.createLinearValueIndicatorInHardMode(type)
                    }
            },
            _setupArea: function(area) {
                var geometry = this.option('geometry') || {};
                area.vertical = geometry.orientation === 'vertical';
                area.x = 0;
                area.y = 0;
                area.startCoord = -100;
                area.endCoord = 100;
                area.scaleSize = geometry.scaleSize > 0 ? Number(geometry.scaleSize) : this._defaultSettings.geometry.scaleSize
            },
            _measureMainElements: function() {
                var self = this,
                    minBound = 1000,
                    maxBound = 0,
                    indent = 0;
                $each(self._measureElements, function(i, item) {
                    var bounds = item.measure();
                    if (bounds) {
                        maxBound = max(maxBound, bounds.max);
                        minBound = min(minBound, bounds.min);
                        bounds.indent > 0 && (indent = max(indent, bounds.indent))
                    }
                });
                return {
                        minBound: minBound,
                        maxBound: maxBound,
                        indent: indent
                    }
            },
            _applyMainLayout: function() {
                var self = this,
                    measurements = self._measureMainElements(),
                    area = self._area,
                    rect,
                    offset,
                    counterSize = area.scaleSize + 2 * measurements.indent;
                if (area.vertical) {
                    rect = self._layoutManager.selectRectBySizes({
                        width: measurements.maxBound - measurements.minBound,
                        height: counterSize
                    });
                    offset = rect.horizontalMiddle() - (measurements.minBound + measurements.maxBound) / 2;
                    area.startCoord = rect.bottom - measurements.indent;
                    area.endCoord = rect.top + measurements.indent;
                    area.x = round(area.x + offset)
                }
                else {
                    rect = self._layoutManager.selectRectBySizes({
                        height: measurements.maxBound - measurements.minBound,
                        width: counterSize
                    });
                    offset = rect.verticalMiddle() - (measurements.minBound + measurements.maxBound) / 2;
                    area.startCoord = rect.left + measurements.indent;
                    area.endCoord = rect.right - measurements.indent;
                    area.y = round(area.y + offset)
                }
                self._layoutManager.setRect(rect)
            },
            _updateElementPosition: function(element) {
                var area = this._area;
                element.init({
                    x: round(area.x + (Number(element._options.offset) || 0)),
                    y: round(area.y + (Number(element._options.offset) || 0)),
                    orientation: area.vertical ? 'vertical' : 'horizontal'
                })
            },
            _createScale: function() {
                return factory.createLinearScale()
            },
            _createRangeContainer: function() {
                return factory.createLinearRangeContainer()
            },
            _createValueIndicator: function(type) {
                return factory.createLinearValueIndicator(type)
            },
            _createSubvalueIndicator: function(type) {
                return factory.createLinearSubvalueIndicator(type)
            },
            _getApproximateScreenRange: function() {
                var self = this,
                    area = self._area,
                    s = area.vertical ? self._mainRect.height() : self._mainRect.width();
                s > area.totalSize && (s = area.totalSize);
                s = s * 0.8;
                return s
            },
            _getDefaultContainerSize: function() {
                var geometry = this.option('geometry') || {};
                if (geometry.orientation === 'vertical')
                    return {
                            width: 100,
                            height: 300
                        };
                else
                    return {
                            width: 300,
                            height: 100
                        }
            },
            _getPreset: function() {
                var preset = this.option('preset'),
                    result;
                if (preset === 'preset2')
                    result = {
                        commonNeedleSettings: {type: 'rhombus'},
                        commonMarkerSettings: {type: 'triangle'}
                    };
                else
                    result = {
                        commonNeedleSettings: {type: 'circle'},
                        commonMarkerSettings: {type: 'textcloud'}
                    };
                return result
            },
            _createNeedle: function(type) {
                return factory.createLinearNeedle(type)
            },
            _createMarker: function(type) {
                return factory.createLinearMarker(type)
            },
            _createRangeBar: function() {
                return factory.createLinearRangeBar()
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file barGauge.js */
    (function(DX, $, undefined) {
        var PI = Math.PI,
            DEFAULT_WIDTH = 300,
            DEFAULT_HEIGHT = 300;
        var _Number = window.Number,
            _isFinite = window.isFinite,
            _round = Math.round,
            _floor = Math.floor,
            _min = Math.min,
            _max = Math.max,
            _isArray = DX.utils.isArray,
            _convertAngleToRendererSpace = DX.utils.convertAngleToRendererSpace,
            _getCosAndSin = DX.utils.getCosAndSin,
            _noop = $.noop,
            _extend = $.extend,
            _getSampleText = DX.viz.gauges.__internals.getSampleText,
            _formatValue = DX.viz.gauges.__internals.formatValue;
        var _Palette = DX.viz.core.Palette;
        var _setupArea = DX.viz.gauges.CircularGauge.prototype._setupArea,
            _applyMainLayout = DX.viz.gauges.CircularGauge.prototype._applyMainLayout;
        DX.viz.gauges.BarGauge = DX.viz.gauges.Gauge.inherit({
            _rootClass: 'dxbg-bar-gauge',
            _getDefaultSettings: function() {
                return {
                        redrawOnResize: true,
                        incidentOccured: _noop,
                        geometry: {
                            startAngle: 225,
                            endAngle: -45
                        }
                    }
            },
            _init: function() {
                var self = this;
                self.callBase.apply(self, arguments);
                self._barsGroup = self._renderer.createGroup({'class': 'dxbg-bars'});
                self._values = [];
                self._context = {
                    renderer: self._renderer,
                    translator: self._translator,
                    tracker: self._tracker,
                    group: self._barsGroup
                };
                self._animateStep = function(pos) {
                    var bars = self._bars,
                        i = 0,
                        ii = bars.length;
                    for (; i < ii; ++i)
                        bars[i].animate(pos)
                };
                self._animateComplete = function() {
                    var bars = self._bars,
                        i = 0,
                        ii = bars.length;
                    for (; i < ii; ++i)
                        bars[i].endAnimation()
                }
            },
            _dispose: function() {
                var self = this;
                self.callBase.apply(self, arguments);
                self._barsGroup = self._values = self._context = self._animateStep = self._animateComplete = null
            },
            _getCanvas: function() {
                var self = this,
                    size = self.option('size') || {},
                    width = _Number(size.width),
                    height = _Number(size.height);
                if (!(width >= 0) || !(height >= 0)) {
                    var element = self._element();
                    width = width >= 0 ? width : element.width() || DEFAULT_WIDTH;
                    height = height >= 0 ? height : element.height() || DEFAULT_HEIGHT;
                    self._renderer.resize(width, height);
                    width = element.width() === width ? width : DEFAULT_WIDTH;
                    height = element.height() === height ? height : DEFAULT_HEIGHT;
                    self._renderer.resize(width, height)
                }
                return {
                        width: width,
                        height: height,
                        marginLeft: 0,
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }
            },
            _getArea: function() {
                var self = this,
                    area = {};
                area.startValue = _isFinite(area.startValue = self.option('startValue')) ? _Number(area.startValue) : 0;
                area.endValue = _isFinite(area.endValue = self.option('endValue')) ? _Number(area.endValue) : 100;
                _setupArea.call(self, area);
                delete area.scaleRadius;
                self._translator.setup({
                    domainStart: area.startValue,
                    domainEnd: area.endValue,
                    codomainStart: area.startCoord,
                    codomainEnd: area.endCoord
                });
                area.baseValue = _isFinite(self._translator.adjust(area.baseValue = self.option('baseValue'))) ? area.baseValue : area.startValue < area.endValue ? area.startValue : area.endValue;
                return area
            },
            _getApproximateScreenRange: function() {
                var self = this,
                    sides = self._area.sides,
                    width = self._mainRect.width() / (sides.right - sides.left),
                    height = self._mainRect.height() / (sides.down - sides.up),
                    r = width < height ? width : height;
                return -self._translator.getCodomainRange() * r * PI / 180
            },
            _setupAnimationSettings: function() {
                this.callBase();
                if (this._animationSettings)
                    _extend(this._animationSettings, {
                        step: this._animateStep,
                        complete: this._animateComplete
                    })
            },
            _clean: function() {
                var self = this;
                self._barsGroup.detach();
                self._animationSettings && self._barsGroup.stopAnimation();
                var i = 0,
                    ii = self._bars.length;
                for (; i < ii; ++i)
                    self._bars[i].dispose();
                self._palette = self._bars = null;
                self.callBase.apply(self, arguments)
            },
            _measureMainElements: function() {
                var self = this,
                    measurements = {maxRadius: self._area.radius},
                    labelOptions = self.option('label');
                self._barsGroup.append(self._rootElement);
                self._context.textEnabled = labelOptions === undefined || labelOptions && (!('visible' in labelOptions) || labelOptions.visible);
                if (self._context.textEnabled) {
                    labelOptions = _extend(true, {}, self._themeManager.theme().label, labelOptions);
                    self._context.formatOptions = {
                        format: labelOptions.format !== undefined || labelOptions.precision !== undefined ? labelOptions.format : self._defaultFormatOptions.format,
                        precision: labelOptions.format !== undefined || labelOptions.precision !== undefined ? labelOptions.precision : self._defaultFormatOptions.precision,
                        customizeText: labelOptions.customizeText
                    };
                    self._context.textOptions = {
                        font: _extend({}, self._themeManager.theme().label.font, labelOptions.font, {color: null}),
                        align: 'center'
                    };
                    self._textIndent = labelOptions.indent > 0 ? _Number(labelOptions.indent) : 0;
                    self._context.lineWidth = labelOptions.connectorWidth > 0 ? _Number(labelOptions.connectorWidth) : 0;
                    var text = self._renderer.createText(_getSampleText(self._translator, self._context.formatOptions), 0, 0, self._context.textOptions).append(self._barsGroup),
                        bbox = text.getBBox();
                    text.detach();
                    self._context.textVerticalOffset = -bbox.y - bbox.height / 2;
                    measurements.horizontalMargin = self._context.textWidth = bbox.width;
                    measurements.verticalMargin = self._context.textHeight = bbox.height
                }
                return measurements
            },
            _applyMainLayout: _applyMainLayout,
            _renderMainElements: function() {
                var self = this,
                    options = _extend({}, self._themeManager.theme(), self.option());
                self._palette = new _Palette(options.palette, {
                    stepHighlight: 50,
                    theme: self._themeManager.themeName()
                });
                var relativeInnerRadius = options.relativeInnerRadius > 0 && options.relativeInnerRadius < 1 ? _Number(options.relativeInnerRadius) : 0.1,
                    radius = self._area.radius;
                if (self._context.textEnabled) {
                    self._textIndent = _round(_min(self._textIndent, radius / 2));
                    radius -= self._textIndent
                }
                self._outerRadius = _round(radius);
                self._innerRadius = _round(radius * relativeInnerRadius);
                self._barSpacing = options.barSpacing > 0 ? _Number(options.barSpacing) : 0;
                _extend(self._context, {
                    backgroundColor: options.backgroundColor,
                    x: self._area.x,
                    y: self._area.y,
                    startAngle: self._area.startCoord,
                    endAngle: self._area.endCoord,
                    baseAngle: self._translator.translate(self._area.baseValue)
                });
                self._bars = [];
                self._updateValues(self.option('values'))
            },
            _setBarsCount: function(count) {
                var self = this,
                    i,
                    ii;
                if (self._bars.length > count) {
                    for (i = count, ii = self._bars.length; i < ii; ++i)
                        self._bars[i].dispose();
                    self._bars.splice(count, ii - count);
                    self._arrangeBars()
                }
                else if (self._bars.length < count) {
                    for (i = self._bars.length, ii = count; i < ii; ++i)
                        self._bars.push(new BarWrapper(i, self._context));
                    self._arrangeBars()
                }
                if (self._bars.length > 0) {
                    if (self._dummyBackground) {
                        self._dummyBackground.detach();
                        self._dummyBackground = null
                    }
                }
                else {
                    if (!self._dummyBackground)
                        self._dummyBackground = self._renderer.createArc().append(self._barsGroup);
                    self._dummyBackground.applySettings({
                        x: self._context.x,
                        y: self._context.y,
                        outerRadius: self._outerRadius,
                        innerRadius: self._innerRadius,
                        startAngle: self._context.endAngle,
                        endAngle: self._context.startAngle,
                        fill: self._context.backgroundColor
                    })
                }
            },
            _arrangeBars: function() {
                var self = this,
                    i = 0,
                    ii = self._bars.length,
                    radius = self._outerRadius - self._innerRadius;
                self._context.barSize = _max(_floor((radius - (ii - 1) * self._barSpacing) / ii), 1);
                var unitOffset = self._context.barSize + _round(_min((radius - ii * self._context.barSize) / (ii - 1), self._barSpacing));
                radius = self._outerRadius;
                self._context.textRadius = radius + self._textIndent;
                self._palette.reset();
                for (; i < ii; ++i, radius -= unitOffset)
                    self._bars[i].arrange({
                        color: self._palette.getNextColor(),
                        radius: radius
                    })
            },
            _updateBars: function() {
                var self = this,
                    i = 0,
                    ii = self._bars.length;
                for (; i < ii; ++i)
                    self._bars[i].setValue(self._values[i])
            },
            _animateBars: function() {
                var self = this,
                    i = 0,
                    ii = self._bars.length;
                if (ii > 0) {
                    for (; i < ii; ++i)
                        self._bars[i].beginAnimation(self._values[i]);
                    self._barsGroup.animate({_: 0}, self._animationSettings)
                }
            },
            _updateValues: function(values, noAnimation) {
                var self = this,
                    list = _isArray(values) && values || _isFinite(values) && [values] || [],
                    i = 0,
                    ii = list.length,
                    value;
                self._values = [];
                for (; i < ii; ++i) {
                    value = self._translator.adjust(list[i]);
                    _isFinite(value) && self._values.push(value)
                }
                self._animationSettings && self._barsGroup.stopAnimation();
                self._setBarsCount(self._values.length);
                if (self._animationSettings && !self._noAnimation)
                    self._animateBars();
                else
                    self._updateBars();
                if (!self._resizing) {
                    self.option('values', self._values);
                    self.hideLoadingIndicator()
                }
            },
            values: function(arg) {
                if (arg !== undefined) {
                    this._updateValues(arg);
                    return this
                }
                else
                    return this._values.slice(0)
            },
            _optionChanged: function(name, newValue, oldValue) {
                switch (name) {
                    case'values':
                        compareArrays(newValue, this._values) || this._updateValues(newValue);
                        break;
                    default:
                        this.callBase.apply(this, arguments);
                        break
                }
            },
            _selectMode: _noop,
            _renderDeltaIndicator: _noop,
            _prepareMainElements: _noop,
            _updateElementPosition: _noop,
            _disposeValueIndicators: _noop,
            _cleanValueIndicators: _noop,
            _updateActiveElements: _noop,
            _updateIndicatorSettings: null,
            _prepareValueIndicatorSettings: null,
            _prepareSubvalueIndicatorSettings: null,
            _prepareScale: null,
            _prepareRangeContainer: null,
            _prepareValueIndicators: null,
            _prepareValueIndicator: null,
            _prepareSubvalueIndicators: null,
            _createScale: null,
            _createRangeContainer: null,
            _createSubvalueIndicator: null,
            _value: null,
            _subvalues: null,
            value: null,
            subvalues: null
        });
        DX.viz.gauges.BarGauge.prototype._themeManagerType = DX.viz.gauges.__internals.ThemeManager.inherit({
            _themeSection: 'barGauge',
            _initializeTheme: function() {
                var self = this;
                self._initializeFont(self._theme.label.font);
                self._initializeFont(self._theme.title.font);
                self._initializeFont(self._theme.tooltip.font);
                self._initializeFont(self._theme.loadingIndicator.font)
            }
        });
        function BarWrapper(index, context) {
            var self = this;
            self._context = context;
            self._background = context.renderer.createArc().append(context.group);
            self._background.applySettings({fill: context.backgroundColor});
            self._bar = context.renderer.createArc().append(context.group);
            if (context.textEnabled) {
                self._line = context.renderer.createPath([], {strokeWidth: context.lineWidth}).append(context.group);
                self._text = context.renderer.createText('', 0, 0, context.textOptions).append(context.group)
            }
            self._tracker = context.renderer.createArc();
            context.tracker.attach(self._tracker, self, {index: index});
            self._index = index;
            self._angle = context.baseAngle;
            self._settings = {
                x: context.x,
                y: context.y,
                startAngle: context.baseAngle,
                endAngle: context.baseAngle
            }
        }
        _extend(BarWrapper.prototype, {
            dispose: function() {
                var self = this;
                self._background.detach();
                self._bar.detach();
                if (self._context.textEnabled) {
                    self._line.detach();
                    self._text.detach()
                }
                self._context.tracker.detach(self._tracker);
                self._context = self._settings = self._background = self._bar = self._line = self._text = self._tracker = null;
                return self
            },
            arrange: function(options) {
                var self = this;
                self._settings.outerRadius = options.radius;
                self._settings.innerRadius = options.radius - self._context.barSize;
                self._background.applySettings(_extend({}, self._settings, {
                    startAngle: self._context.endAngle,
                    endAngle: self._context.startAngle
                }));
                self._bar.applySettings(self._settings);
                self._tracker.applySettings(self._settings);
                self._color = options.color;
                self._bar.applySettings({fill: options.color});
                if (self._context.textEnabled) {
                    self._line.applySettings({
                        points: [self._context.x, self._context.y - self._settings.innerRadius, self._context.x, self._context.y - self._context.textRadius],
                        stroke: options.color
                    });
                    self._text.applySettings({font: {color: options.color}})
                }
                return self
            },
            getTooltipParameters: function() {
                var self = this,
                    cossin = _getCosAndSin((self._angle + self._context.baseAngle) / 2);
                return {
                        x: _round(self._context.x + (self._settings.outerRadius + self._settings.innerRadius) / 2 * cossin.cos),
                        y: _round(self._context.y - (self._settings.outerRadius + self._settings.innerRadius) / 2 * cossin.sin),
                        offset: 0,
                        color: self._color,
                        value: self._value
                    }
            },
            setValue: function(value) {
                var self = this;
                self._value = value;
                self._angle = self._context.translator.translate(value);
                setAngles(self._settings, self._context.baseAngle, self._angle);
                self._bar.applySettings(self._settings);
                self._tracker.applySettings(self._settings);
                if (self._context.textEnabled) {
                    self._line.rotate(_convertAngleToRendererSpace(self._angle), self._context.x, self._context.y);
                    var cossin = _getCosAndSin(self._angle);
                    self._text.applySettings({
                        text: _formatValue(value, self._context.formatOptions, {index: self._index}),
                        x: self._context.x + (self._context.textRadius + self._context.textWidth * 0.6) * cossin.cos,
                        y: self._context.y - (self._context.textRadius + self._context.textHeight * 0.6) * cossin.sin + self._context.textVerticalOffset
                    })
                }
                return self
            },
            beginAnimation: function(value) {
                var self = this;
                self._value = value;
                self._delta = self._context.translator.translate(value) - self._angle;
                if (self._delta !== 0) {
                    if (self._context.textEnabled) {
                        self._line.applySettings({visibility: 'hidden'});
                        self._text.applySettings({visibility: 'hidden'})
                    }
                }
                else {
                    self.setValue(self._value);
                    self.animate = _noop
                }
            },
            animate: function(step) {
                var self = this,
                    angle = self._angle + self._delta * step;
                setAngles(self._settings, self._context.baseAngle, angle);
                self._bar.applySettings(self._settings)
            },
            endAnimation: function() {
                var self = this;
                if (self._delta !== 0) {
                    if (self._context.textEnabled) {
                        self._line.applySettings({visibility: null});
                        self._text.applySettings({visibility: null})
                    }
                    self.setValue(self._value)
                }
                else
                    delete self.animate;
                delete self._delta
            }
        });
        function setAngles(target, angle1, angle2) {
            target.startAngle = angle1 < angle2 ? angle1 : angle2;
            target.endAngle = angle1 < angle2 ? angle2 : angle1
        }
        function compareArrays(array1, array2) {
            if (array1 === array2)
                return true;
            if (_isArray(array1) && _isArray(array2) && array1.length === array2.length) {
                for (var i = 0, ii = array1.length; i < ii; ++i)
                    if (array1[i] !== array2[i])
                        return false;
                return true
            }
            return false
        }
        DX.ui.registerComponent('dxBarGauge', DX.viz.gauges.BarGauge)
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file tooltip.js */
    (function(DX, $, undefined) {
        var formatHelper = DX.formatHelper;
        var _String = window.String,
            _isFunction = DX.utils.isFunction,
            _extend = $.extend;
        DX.viz.gauges.__internals.Tooltip = DX.Class.inherit({
            _innerType: DX.viz.charts.Tooltip,
            ctor: function(parameters) {
                var self = this;
                DX.utils.debug.assertParam(parameters, 'parameters');
                self._container = parameters.container;
                self._tracker = parameters.tracker;
                self._root = parameters.renderer.createGroup({'class': 'dxg-tooltip'});
                self._inner = new self._innerType({renderer: parameters.renderer}, self._root);
                self._inner.draw();
                self._inner.text.applySettings({'class': 'dxg-text'});
                self._options = {};
                var prepareCallback = function(target, info) {
                        return self._prepare(target, info)
                    };
                var showCallback = function() {
                        return self._show()
                    };
                var hideCallback = function() {
                        return self._hide()
                    };
                self._dispose = function() {
                    self = showCallback = hideCallback = prepareCallback = self._dispose = null
                };
                self._tracker.setCallbacks({
                    'tooltip-prepare': prepareCallback,
                    'tooltip-show': showCallback,
                    'tooltip-hide': hideCallback
                })
            },
            dispose: function() {
                var self = this;
                self._dispose();
                self.clear();
                self._root.clear();
                self._root.dispose();
                self._inner.dispose();
                self._root = self._inner = self._container = self._tracker = self._options = null;
                return self
            },
            init: function(options) {
                _extend(true, this._options, options);
                return this
            },
            render: function() {
                var self = this,
                    options = self._options;
                self._root.detach();
                self._inner.update({
                    canvasWidth: self._width,
                    canvasHeight: self._height,
                    arrowLength: options.arrowLength,
                    paddingLeftRight: options.horizontalPadding,
                    paddingTopBottom: options.verticalPadding,
                    color: options.color
                });
                self._inner.text.applySettings({font: options.font});
                self._tracker.setTooltipState(self._options.enabled);
                self._options.enabled && self._root.append(self._container);
                return self
            },
            clear: function() {
                this._root.detach();
                this._tracker.setTooltipState(false);
                return this
            },
            setRect: function(rect) {
                this._width = rect.width();
                this._height = rect.height();
                return this
            },
            _formatValue: function(value, context) {
                var options = this._options,
                    text = formatHelper.format(value, options.format, options.precision);
                if (_isFunction(options.customizeText)) {
                    var target = _extend({
                            value: value,
                            valueText: text
                        }, context);
                    text = options.customizeText.call(target, target);
                    text = text !== null && text !== undefined ? _String(text) : ''
                }
                return text
            },
            _prepare: function(target, info) {
                var parameters = target.getTooltipParameters();
                (parameters.text = this._formatValue(parameters.value, info)) && (this._parameters = parameters);
                this._DEBUG_parameters = parameters;
                return !!parameters.text
            },
            _show: function() {
                var parameters = this._parameters;
                this._parameters = null;
                this._inner.move(parameters.x, parameters.y, parameters.offset, parameters.text, parameters.color);
                this._inner.show();
                this._DEBUG_shown = true
            },
            _hide: function() {
                this._inner.hide();
                this._DEBUG_hidden = true
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file tracker.js */
    (function(DX, $, undefined) {
        var _setTimeout = window.setTimeout,
            _clearTimeout = window.clearTimeout,
            _extend = $.extend,
            _abs = Math.abs;
        var TOOLTIP_SHOW_DELAY = 300,
            TOOLTIP_HIDE_DELAY = 300,
            TOOLTIP_TOUCH_SHOW_DELAY = 400,
            TOOLTIP_TOUCH_HIDE_DELAY = 300;
        DX.viz.gauges.__internals.Tracker = DX.Class.inherit({
            ctor: function(parameters) {
                DX.utils.debug.assertParam(parameters, 'parameters');
                DX.utils.debug.assertParam(parameters.renderer, 'parameters.renderer');
                DX.utils.debug.assertParam(parameters.container, 'parameters.container');
                var self = this;
                self._container = parameters.container;
                self._element = parameters.renderer.createGroup({
                    'class': 'dxg-tracker',
                    stroke: 'none',
                    strokeWidth: 0,
                    fill: '#000000',
                    opacity: 0.0001
                });
                self._showTooltipCallback = function() {
                    self._showTooltipTimeout = null;
                    var target = self._tooltipEvent.target;
                    self._targetEvent = null;
                    if (self._tooltipTarget !== target) {
                        self._tooltipTarget = target;
                        self._callbacks['tooltip-show']()
                    }
                };
                self._hideTooltipCallback = function() {
                    self._hideTooltipTimeout = null;
                    self._targetEvent = null;
                    if (self._tooltipTarget) {
                        self._callbacks['tooltip-hide']();
                        self._tooltipTarget = null
                    }
                };
                self._dispose = function() {
                    self = self._showTooltipCallback = self._hideTooltipCallback = self._dispose = null
                };
                self._DEBUG_showTooltipTimeoutSet = self._DEBUG_showTooltipTimeoutCleared = self._DEBUG_hideTooltipTimeoutSet = self._DEBUG_hideTooltipTimeoutCleared = 0
            },
            dispose: function() {
                var self = this;
                self._dispose();
                self.deactivate();
                self._element.off();
                self._container = self._element = self._context = self._callbacks = null;
                return self
            },
            activate: function() {
                this._element.append(this._container);
                return this
            },
            deactivate: function() {
                this._element.detach();
                this._element.clear();
                return this
            },
            attach: function(element, target, info) {
                element.data({
                    target: target,
                    info: info
                });
                element.append(this._element);
                return this
            },
            detach: function(element) {
                element.detach();
                element.removeData();
                return this
            },
            setTooltipState: function(state) {
                var self = this,
                    data;
                self._element.off(tooltipMouseEvents).off(tooltipTouchEvents);
                if (state) {
                    data = {tracker: self};
                    self._element.on(tooltipMouseEvents, data).on(tooltipTouchEvents, data)
                }
                return self
            },
            setCallbacks: function(callbacks) {
                this._callbacks = callbacks;
                return this
            },
            _showTooltip: function(event, delay) {
                var self = this,
                    data = $(event.target).data();
                if (self._tooltipTarget === event.target || self._callbacks['tooltip-prepare'](data.target, data.info)) {
                    self._hideTooltipTimeout && ++self._DEBUG_hideTooltipTimeoutCleared;
                    _clearTimeout(self._hideTooltipTimeout);
                    self._hideTooltipTimeout = null;
                    _clearTimeout(self._showTooltipTimeout);
                    self._tooltipEvent = event;
                    ++self._DEBUG_showTooltipTimeoutSet;
                    self._showTooltipTimeout = _setTimeout(self._showTooltipCallback, delay)
                }
            },
            _hideTooltip: function(delay) {
                var self = this;
                self._showTooltipTimeout && ++self._DEBUG_showTooltipTimeoutCleared;
                _clearTimeout(self._showTooltipTimeout);
                self._showTooltipTimeout = null;
                _clearTimeout(self._hideTooltipTimeout);
                ++self._DEBUG_hideTooltipTimeoutSet;
                self._hideTooltipTimeout = _setTimeout(self._hideTooltipCallback, delay)
            }
        });
        var tooltipMouseEvents = {
                'mouseover.gauge-tooltip': handleTooltipMouseOver,
                'mouseout.gauge-tooltip': handleTooltipMouseOut
            };
        var tooltipMouseMoveEvents = {'mousemove.gauge-tooltip': handleTooltipMouseMove};
        var tooltipTouchEvents = {'touchstart.gauge-tooltip': handleTooltipTouchStart};
        function handleTooltipMouseOver(event) {
            var tracker = event.data.tracker;
            tracker._x = event.pageX;
            tracker._y = event.pageY;
            tracker._element.off(tooltipMouseMoveEvents).on(tooltipMouseMoveEvents, event.data);
            tracker._showTooltip(event, TOOLTIP_SHOW_DELAY)
        }
        function handleTooltipMouseMove(event) {
            var tracker = event.data.tracker;
            if (tracker._showTooltipTimeout && _abs(event.pageX - tracker._x) > 4 || _abs(event.pageY - tracker._y) > 4) {
                tracker._x = event.pageX;
                tracker._y = event.pageY;
                tracker._showTooltip(event, TOOLTIP_SHOW_DELAY)
            }
        }
        function handleTooltipMouseOut(event) {
            var tracker = event.data.tracker;
            tracker._element.off(tooltipMouseMoveEvents);
            tracker._hideTooltip(TOOLTIP_HIDE_DELAY)
        }
        var active_touch_tooltip_tracker = null;
        DX.viz.gauges.__internals.Tracker._DEBUG_reset = function() {
            active_touch_tooltip_tracker = null
        };
        function handleTooltipTouchStart(event) {
            event.preventDefault();
            var tracker = active_touch_tooltip_tracker;
            if (tracker && tracker !== event.data.tracker)
                tracker._hideTooltip(TOOLTIP_TOUCH_HIDE_DELAY);
            tracker = active_touch_tooltip_tracker = event.data.tracker;
            tracker._showTooltip(event, TOOLTIP_TOUCH_SHOW_DELAY);
            tracker._touch = true
        }
        function handleTooltipDocumentTouchStart(event) {
            var tracker = active_touch_tooltip_tracker;
            if (tracker) {
                if (!tracker._touch) {
                    tracker._hideTooltip(TOOLTIP_TOUCH_HIDE_DELAY);
                    active_touch_tooltip_tracker = null
                }
                tracker._touch = null
            }
        }
        function handleTooltipDocumentTouchEnd(event) {
            var tracker = active_touch_tooltip_tracker;
            if (tracker)
                if (tracker._showTooltipTimeout) {
                    tracker._hideTooltip(TOOLTIP_TOUCH_HIDE_DELAY);
                    active_touch_tooltip_tracker = null
                }
        }
        $(window.document).on({
            'touchstart.gauge-tooltip': handleTooltipDocumentTouchStart,
            'touchend.gauge-tooltip': handleTooltipDocumentTouchEnd
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file dxCircularGauge.js */
    (function(DX, undefined) {
        DX.ui.registerComponent("dxCircularGauge", DX.viz.gauges.CircularGauge)
    })(DevExpress);
    /*! Module viz-gauges, file dxLinearGauge.js */
    (function(DX, undefined) {
        DX.ui.registerComponent("dxLinearGauge", DX.viz.gauges.LinearGauge)
    })(DevExpress);
    DevExpress.MOD_VIZ_GAUGES = true
}