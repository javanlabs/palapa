/*! 
* DevExpress Visualization RangeSelector (part of ChartJS)
* Version: 13.2.8
* Build date: Mar 11, 2014
*
* Copyright (c) 2012 - 2014 Developer Express Inc. ALL RIGHTS RESERVED
* EULA: http://chartjs.devexpress.com/EULA
*/

"use strict";
if (!DevExpress.MOD_VIZ_RANGESELECTOR) {
    if (!window.DevExpress)
        throw Error('Required module is not referenced: core');
    if (!DevExpress.MOD_VIZ_CORE)
        throw Error('Required module is not referenced: viz-core');
    /*! Module viz-rangeselector, file namespaces.js */
    (function(DevExpress) {
        DevExpress.viz.rangeSelector = {utils: {}}
    })(DevExpress);
    /*! Module viz-rangeselector, file baseVisualElement.js */
    (function(DX) {
        DevExpress.viz.rangeSelector.BaseVisualElement = DX.Class.inherit({
            ctor: function(renderer) {
                this._renderer = renderer;
                this._isDrawn = false
            },
            applyOptions: function(options) {
                this._options = options || {};
                this._applyOptions(this._options)
            },
            _applyOptions: function(options){},
            redraw: function(group) {
                var self = this;
                if (!self._isDrawn) {
                    self._isDrawn = !(self._draw(group || self._group) === false);
                    if (group)
                        self._group = group
                }
                else
                    self._update(group || self._group)
            },
            isDrawn: function() {
                return !!this._isDrawn
            },
            isInitialized: function() {
                return !!this._options
            },
            _draw: function(group){},
            _update: function(group) {
                group.clear();
                this._draw(group)
            }
        })
    })(DevExpress);
    /*! Module viz-rangeselector, file rangeSelector.js */
    (function($, DX, undefined) {
        var rangeSelector = DX.viz.rangeSelector,
            utils = DX.utils,
            dataUtils = DX.data.utils,
            rangeSelectorUtils = rangeSelector.utils,
            ParseUtils = DX.viz.core.ParseUtils,
            formatHelper = DX.formatHelper,
            core = DX.viz.core;
        var REDRAW_DELAY = 100;
        rangeSelector.consts = {
            fontHeightRatio: 0.55,
            emptySliderMarkerText: '. . .'
        };
        rangeSelector.formatValue = function(value, formatOptions) {
            var formatObject = {
                    value: value,
                    valueText: formatHelper.format(value, formatOptions.format, formatOptions.precision)
                };
            return String(utils.isFunction(formatOptions.customizeText) ? formatOptions.customizeText.call(formatObject, formatObject) : formatObject.valueText)
        };
        rangeSelector.RangeSelector = DX.ui.Component.inherit(function() {
            var SCALE_TEXT_SPACING = 5;
            var defaultRangeSelectorOptions = {
                    size: undefined,
                    margin: {
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0
                    },
                    scale: {
                        showCustomBoundaryTicks: true,
                        showMinorTicks: true,
                        startValue: undefined,
                        endValue: undefined,
                        minorTickCount: undefined,
                        minorTickInterval: undefined,
                        majorTickInterval: undefined,
                        useTicksAutoArrangement: true,
                        setTicksAtUnitBeginning: true,
                        minRange: undefined,
                        maxRange: undefined,
                        placeholderHeight: undefined,
                        valueType: undefined,
                        label: {
                            visible: true,
                            format: undefined,
                            precision: undefined,
                            customizeText: undefined
                        },
                        marker: {
                            visible: true,
                            label: {
                                format: undefined,
                                precision: undefined,
                                customizeText: undefined
                            }
                        }
                    },
                    selectedRange: undefined,
                    sliderMarker: {
                        visible: true,
                        format: undefined,
                        precision: undefined,
                        customizeText: undefined,
                        placeholderSize: undefined
                    },
                    behavior: {
                        snapToTicks: true,
                        animationEnabled: true,
                        moveSelectedRangeByClick: true,
                        manualRangeSelectionEnabled: true,
                        allowSlidersSwap: true,
                        callSelectedRangeChanged: "onMovingComplete"
                    },
                    background: {
                        color: "#C0BAE1",
                        visible: true,
                        image: {
                            url: undefined,
                            location: 'full'
                        }
                    },
                    chart: {
                        commonSeriesSettings: {
                            type: 'area',
                            label: {visible: false},
                            hoverMode: 'none'
                        },
                        equalBarWidth: true,
                        topIndent: 0.1,
                        bottomIndent: 0,
                        valueAxis: {
                            min: undefined,
                            max: undefined,
                            inverted: false
                        },
                        series: undefined
                    },
                    dataSource: undefined,
                    dataSourceField: 'arg',
                    redrawOnResize: true,
                    theme: undefined,
                    selectedRangeChanged: null,
                    incidentOccured: $.noop
                };
            var calculateMarkerSize = function(renderer, value, sliderMarkerOptions) {
                    var formattedText = value === undefined ? rangeSelector.consts.emptySliderMarkerText : rangeSelector.formatValue(value, sliderMarkerOptions),
                        textBBox = rangeSelectorUtils.getTextBBox(renderer, formattedText, sliderMarkerOptions.font);
                    return {
                            width: Math.ceil(textBBox.width) + 2 * sliderMarkerOptions.padding,
                            height: Math.ceil(textBBox.height * rangeSelector.consts.fontHeightRatio) + 2 * sliderMarkerOptions.padding + sliderMarkerOptions.pointerSize
                        }
                };
            var calculateScaleLabelHalfWidth = function(renderer, value, scaleOptions) {
                    var formattedText = rangeSelector.formatValue(value, scaleOptions.label),
                        textBBox = rangeSelectorUtils.getTextBBox(renderer, formattedText, scaleOptions.label.font);
                    return Math.ceil(textBBox.width / 2)
                };
            var calculateRangeContainerCanvas = function(size, margin, sliderMarkerSpacing) {
                    var canvas = {
                            left: margin.left + sliderMarkerSpacing.left,
                            top: margin.top + sliderMarkerSpacing.top,
                            width: size.width - margin.left - margin.right - sliderMarkerSpacing.left - sliderMarkerSpacing.right,
                            height: size.height - margin.top - margin.bottom - sliderMarkerSpacing.top - sliderMarkerSpacing.bottom
                        };
                    if (canvas.width <= 0)
                        canvas.width = 1;
                    return canvas
                };
            var parseSliderMarkersPlaceholderSize = function(placeholderSize) {
                    var placeholderWidthLeft,
                        placeholderWidthRight,
                        placeholderHeight;
                    if (utils.isNumber(placeholderSize))
                        placeholderWidthLeft = placeholderWidthRight = placeholderHeight = placeholderSize;
                    else if (placeholderSize) {
                        if (utils.isNumber(placeholderSize.height))
                            placeholderHeight = placeholderSize.height;
                        if (utils.isNumber(placeholderSize.width))
                            placeholderWidthLeft = placeholderWidthRight = placeholderSize.width;
                        else if (placeholderSize.width) {
                            if (utils.isNumber(placeholderSize.width.left))
                                placeholderWidthLeft = placeholderSize.width.left;
                            if (utils.isNumber(placeholderSize.width.right))
                                placeholderWidthRight = placeholderSize.width.right
                        }
                    }
                    return {
                            widthLeft: placeholderWidthLeft,
                            widthRight: placeholderWidthRight,
                            height: placeholderHeight
                        }
                };
            var calculateSliderMarkersSpacing = function(renderer, size, scale, sliderMarkerOptions) {
                    var leftMarkerSize,
                        leftScaleLabelWidth = 0,
                        rightScaleLabelWidth = 0,
                        rightMarkerSize,
                        canvas,
                        placeholderWidthLeft = 0,
                        placeholderWidthRight = 0,
                        placeholderHeight = 0,
                        parsedPlaceholderSize;
                    parsedPlaceholderSize = parseSliderMarkersPlaceholderSize(sliderMarkerOptions.placeholderSize);
                    placeholderWidthLeft = parsedPlaceholderSize.widthLeft || 0;
                    placeholderWidthRight = parsedPlaceholderSize.widthRight || 0;
                    placeholderHeight = parsedPlaceholderSize.height || 0;
                    if (sliderMarkerOptions.visible) {
                        leftMarkerSize = calculateMarkerSize(renderer, scale.startValue, sliderMarkerOptions);
                        if (!placeholderWidthLeft)
                            placeholderWidthLeft = leftMarkerSize.width;
                        rightMarkerSize = calculateMarkerSize(renderer, scale.endValue, sliderMarkerOptions);
                        if (!placeholderWidthRight)
                            placeholderWidthRight = rightMarkerSize.width;
                        if (!placeholderHeight)
                            placeholderHeight = Math.max(leftMarkerSize.height, rightMarkerSize.height)
                    }
                    if (scale.label.visible) {
                        leftScaleLabelWidth = calculateScaleLabelHalfWidth(renderer, scale.startValue, scale);
                        rightScaleLabelWidth = calculateScaleLabelHalfWidth(renderer, scale.endValue, scale)
                    }
                    placeholderWidthLeft = Math.max(placeholderWidthLeft, leftScaleLabelWidth);
                    placeholderWidthRight = Math.max(placeholderWidthRight, rightScaleLabelWidth);
                    return {
                            left: placeholderWidthLeft,
                            right: placeholderWidthRight,
                            top: placeholderHeight,
                            bottom: 0
                        }
                };
            var clearContainer = function(container) {
                    if (container)
                        container.empty()
                };
            var getContainer = function(self) {
                    return self._element()
                };
            var createRangeContainer = function(rangeContainerOptions) {
                    return rangeSelector.rangeSelectorFactory.createRangeContainer(rangeContainerOptions)
                };
            var createTranslator = function(range, canvas) {
                    return rangeSelector.rangeSelectorFactory.createTranslator(range, canvas)
                };
            var createTranslatorCanvas = function(sizeOptions, rangeContainerCanvas, scaleLabelsAreaHeight) {
                    return {
                            left: rangeContainerCanvas.left,
                            top: rangeContainerCanvas.top,
                            right: sizeOptions.width - rangeContainerCanvas.width - rangeContainerCanvas.left,
                            bottom: sizeOptions.height - rangeContainerCanvas.height - rangeContainerCanvas.top + scaleLabelsAreaHeight,
                            width: sizeOptions.width,
                            height: sizeOptions.height
                        }
                };
            var createRenderer = function(self) {
                    var renderer = self.option('renderer');
                    if (renderer)
                        return renderer;
                    renderer = rangeSelector.rangeSelectorFactory.createRenderer();
                    return renderer
                };
            var createThemeManager = function(theme) {
                    return rangeSelector.rangeSelectorFactory.createThemeManager(theme)
                };
            var calculateValueType = function(firstValue, secondValue) {
                    var types = [$.type(firstValue), $.type(secondValue)];
                    $.inArray();
                    return $.inArray('date', types) != -1 ? 'datetime' : $.inArray('number', types) != -1 ? 'numeric' : ''
                };
            var createSeriesDataSource = function(self) {
                    var seriesDataSource,
                        dataSource = self._dataSource && self._dataSource.items(),
                        scaleOptions = self.option('scale'),
                        valueType = scaleOptions.valueType;
                    if (!valueType)
                        valueType = calculateValueType(scaleOptions.startValue, scaleOptions.endValue);
                    if (dataSource || self.option('chart').series)
                        seriesDataSource = new rangeSelector.SeriesDataSource({
                            renderer: self.renderer,
                            dataSource: dataSource,
                            valueType: (valueType || '').toLowerCase(),
                            chart: self.option('chart'),
                            dataSourceField: self.option('dataSourceField'),
                            backgroundColor: self._userBackgroundColor,
                            incidentOccured: self.option('incidentOccured')
                        });
                    return seriesDataSource
                };
            var calculateTranslatorRange = function(self, seriesDataSource, scaleOptions) {
                    var translatorRange,
                        minValue,
                        maxValue,
                        inverted = false,
                        isEqualDates;
                    if (utils.isDefined(scaleOptions.startValue) && utils.isDefined(scaleOptions.endValue)) {
                        inverted = scaleOptions.inverted = scaleOptions.startValue > scaleOptions.endValue;
                        minValue = inverted ? scaleOptions.endValue : scaleOptions.startValue;
                        maxValue = inverted ? scaleOptions.startValue : scaleOptions.endValue
                    }
                    else if (utils.isDefined(scaleOptions.startValue) || utils.isDefined(scaleOptions.endValue)) {
                        minValue = scaleOptions.startValue;
                        maxValue = scaleOptions.endValue
                    }
                    translatorRange = seriesDataSource ? seriesDataSource.getBoundRange() : new DX.viz.charts.Range;
                    isEqualDates = utils.isDate(minValue) && utils.isDate(maxValue) && minValue.getTime() === maxValue.getTime();
                    if (minValue !== maxValue && !isEqualDates) {
                        translatorRange.invertX = inverted;
                        translatorRange.addRange({
                            minX: minValue,
                            maxX: maxValue,
                            minVisibleX: minValue,
                            maxVisibleX: maxValue
                        })
                    }
                    if (!translatorRange.isDefinedX()) {
                        if (isEqualDates)
                            scaleOptions.valueType = 'numeric';
                        translatorRange.setStubDataX(scaleOptions.valueType)
                    }
                    return translatorRange
                };
            var calculateScaleAreaHeight = function(renderer, scaleOptions, visibleMarkers) {
                    var textBBox,
                        visibleLabels = scaleOptions.label.visible;
                    if (scaleOptions.placeholderHeight)
                        return scaleOptions.placeholderHeight;
                    else {
                        textBBox = rangeSelectorUtils.getTextBBox(renderer, '0', scaleOptions.label.font);
                        return (visibleLabels ? scaleOptions.label.topIndent + textBBox.height : 0) + (visibleMarkers ? scaleOptions.marker.topIndent + scaleOptions.marker.separatorHeight : 0)
                    }
                };
            var getTicksInfo = function(self, scaleOptions, translator, screenDelta) {
                    var isEmpty = scaleOptions.isEmpty,
                        tickProvider = rangeSelector.rangeSelectorFactory.getTickProvider(),
                        minorTicksOptions,
                        majorTicksOptions,
                        startValue,
                        endValue,
                        businessRange = translator.getBusinessRange();
                    minorTicksOptions = {
                        tickInterval: isEmpty ? 0 : self.option('scale').minorTickInterval,
                        showCustomBoundaryTicks: scaleOptions.showCustomBoundaryTicks,
                        minorTickCount: scaleOptions.minorTickCount
                    };
                    majorTicksOptions = {
                        textOptions: {
                            align: 'center',
                            font: scaleOptions.label.font
                        },
                        renderer: self.renderer,
                        getText: function(value) {
                            return rangeSelector.formatValue(value, scaleOptions.label)
                        },
                        translator: translator,
                        isStartTickGenerated: !utils.isDefined(self.option('scale').majorTickInterval),
                        tickInterval: scaleOptions.majorTickInterval,
                        textSpacing: SCALE_TEXT_SPACING,
                        setTicksAtUnitBeginning: scaleOptions.setTicksAtUnitBeginning,
                        useTicksAutoArrangement: scaleOptions.useTicksAutoArrangement,
                        hideLabels: isEmpty
                    };
                    startValue = isEmpty ? businessRange.minX : scaleOptions.startValue;
                    endValue = isEmpty ? businessRange.maxX : scaleOptions.endValue;
                    return tickProvider.getFullTicks(startValue, endValue, screenDelta, majorTicksOptions, minorTicksOptions)
                };
            var updateTickIntervals = function(scaleOptions, screenDelta, incidentOccured) {
                    var tickProvider = rangeSelector.rangeSelectorFactory.getTickProvider(),
                        tickIntervals = tickProvider.getTickIntervals(scaleOptions.startValue, scaleOptions.endValue, screenDelta, {
                            tickInterval: scaleOptions.majorTickInterval,
                            incidentOccured: incidentOccured
                        }, {
                            tickInterval: scaleOptions.minorTickInterval,
                            incidentOccured: incidentOccured
                        });
                    scaleOptions.minorTickInterval = tickIntervals.minorTickInterval;
                    scaleOptions.majorTickInterval = tickIntervals.majorTickInterval
                };
            var updateScaleOptions = function(self, seriesDataSource, translatorRange, screenDelta, scaleOptions) {
                    var minVisibleX = utils.isDefined(translatorRange.minVisibleX) ? translatorRange.minVisibleX : translatorRange.minX,
                        maxVisibleX = utils.isDefined(translatorRange.maxVisibleX) ? translatorRange.maxVisibleX : translatorRange.maxX,
                        isEmptyInterval;
                    if (seriesDataSource && !seriesDataSource.isEmpty()) {
                        scaleOptions.startValue = scaleOptions.inverted ? maxVisibleX : minVisibleX;
                        scaleOptions.endValue = scaleOptions.inverted ? minVisibleX : maxVisibleX
                    }
                    isEmptyInterval = utils.isDate(scaleOptions.startValue) && utils.isDate(scaleOptions.endValue) && scaleOptions.startValue.getTime() === scaleOptions.endValue.getTime() || scaleOptions.startValue === scaleOptions.endValue;
                    scaleOptions.isEmpty = !utils.isDefined(scaleOptions.startValue) || !utils.isDefined(scaleOptions.endValue) || isEmptyInterval || scaleOptions.valueType === 'string';
                    if (scaleOptions.isEmpty)
                        scaleOptions.startValue = scaleOptions.endValue = undefined;
                    else {
                        updateTickIntervals(scaleOptions, screenDelta, self.option('incidentOccured'));
                        if (scaleOptions.valueType === 'datetime' && !utils.isDefined(scaleOptions.label.format))
                            if (!scaleOptions.marker.visible)
                                scaleOptions.label.format = formatHelper.getDateFormatByTickInterval(scaleOptions.startValue, scaleOptions.endValue, scaleOptions.majorTickInterval);
                            else
                                scaleOptions.label.format = utils.getDateUnitInterval(scaleOptions.majorTickInterval)
                    }
                };
            var prepareSliderMarkersOptions = function(self, scaleOptions, screenDelta) {
                    var sliderMarkerOptions = $.extend(true, {}, self.option('sliderMarker')),
                        businessInterval;
                    if (!sliderMarkerOptions.format) {
                        if (!self.option('behavior').snapToTicks && utils.isNumber(scaleOptions.startValue)) {
                            businessInterval = Math.abs(scaleOptions.endValue - scaleOptions.startValue);
                            sliderMarkerOptions.format = 'fixedPoint';
                            sliderMarkerOptions.precision = utils.getSignificantDigitPosition(businessInterval / screenDelta)
                        }
                        if (scaleOptions.valueType === 'datetime')
                            if (!scaleOptions.marker.visible) {
                                if (utils.isDefined(scaleOptions.startValue) && utils.isDefined(scaleOptions.endValue))
                                    sliderMarkerOptions.format = formatHelper.getDateFormatByTickInterval(scaleOptions.startValue, scaleOptions.endValue, scaleOptions.minorTickInterval !== 0 ? scaleOptions.minorTickInterval : scaleOptions.majorTickInterval)
                            }
                            else
                                sliderMarkerOptions.format = utils.getDateUnitInterval(utils.isDefined(scaleOptions.minorTickInterval) && scaleOptions.minorTickInterval !== 0 ? scaleOptions.minorTickInterval : scaleOptions.majorTickInterval)
                    }
                    return sliderMarkerOptions
                };
            var showScaleMarkers = function(scaleOptions) {
                    return scaleOptions.valueType == 'datetime' && scaleOptions.marker.visible
                };
            var updateTranslatorRangeInterval = function(translatorRange, scaleOptions) {
                    var intervalX = scaleOptions.minorTickInterval || scaleOptions.majorTickInterval;
                    translatorRange = translatorRange.addRange({intervalX: intervalX})
                };
            var prepareScaleOptions = function(self, seriesDataSource) {
                    var scaleOptions = $.extend(true, {}, self.option('scale')),
                        incidentOccured = self.option('incidentOccured'),
                        parsedValue = 0,
                        parseUtils = new ParseUtils({incidentOccured: incidentOccured}),
                        valueType = parseUtils.correctValueType((scaleOptions.valueType || '').toLowerCase());
                    if (seriesDataSource)
                        valueType = seriesDataSource.getCalculatedValueType() || valueType;
                    if (!valueType)
                        valueType = calculateValueType(scaleOptions.startValue, scaleOptions.endValue) || 'numeric';
                    scaleOptions.valueType = valueType;
                    if (scaleOptions.valueType === 'string') {
                        incidentOccured('The type of the arguments from the data source is not supported.');
                        return scaleOptions
                    }
                    var parser = parseUtils.getParser(valueType, 'scale');
                    if (utils.isDefined(scaleOptions.startValue)) {
                        parsedValue = parser(scaleOptions.startValue);
                        if (utils.isDefined(parsedValue))
                            scaleOptions.startValue = parsedValue;
                        else {
                            scaleOptions.startValue = undefined;
                            incidentOccured.call(null, 'The value of the "startValue" option is not valid.')
                        }
                    }
                    if (utils.isDefined(scaleOptions.endValue)) {
                        parsedValue = parser(scaleOptions.endValue);
                        if (utils.isDefined(parsedValue))
                            scaleOptions.endValue = parsedValue;
                        else {
                            scaleOptions.endValue = undefined;
                            incidentOccured.call(null, 'The value of the "endValue" option is not valid.')
                        }
                    }
                    scaleOptions.parser = parser;
                    return scaleOptions
                };
            var correctSizeOptions = function(self, sizeOptions, scaleOptions) {
                    var size = self.option('size') || {};
                    if (!sizeOptions.height && size.height !== 0)
                        if (scaleOptions.valueType === 'datetime' && scaleOptions.marker.visible !== false)
                            sizeOptions.height = 160;
                        else
                            sizeOptions.height = 120;
                    if (!sizeOptions.width && size.width !== 0)
                        sizeOptions.width = 400
                };
            var applyOptions = function(self) {
                    var rangeContainerCanvas,
                        seriesDataSource,
                        translatorRange,
                        scaleLabelsAreaHeight,
                        sizeOptions,
                        sliderMarkerSpacing,
                        sliderMarkerOptions,
                        selectedRange,
                        $container = self.container,
                        isEmpty;
                    self._isUpdating = true;
                    sizeOptions = calculateSize(self);
                    self._actualSize = sizeOptions;
                    seriesDataSource = createSeriesDataSource(self);
                    self._scaleOptions = prepareScaleOptions(self, seriesDataSource);
                    correctSizeOptions(self, sizeOptions, self._scaleOptions);
                    if (!sizeOptions.width || !sizeOptions.height || !$container.is(':visible')) {
                        self.stopRedraw = true;
                        self.option('incidentOccured')('RangeSelector can not be drawn as container is not visible');
                        return
                    }
                    else
                        self.stopRedraw = false;
                    updateRendererSize(self, sizeOptions);
                    self._updateLoadIndicator(undefined, self.canvas.width, self.canvas.height);
                    translatorRange = calculateTranslatorRange(self, seriesDataSource, self._scaleOptions);
                    updateScaleOptions(self, seriesDataSource, translatorRange, sizeOptions.width, self._scaleOptions);
                    updateTranslatorRangeInterval(translatorRange, self._scaleOptions);
                    sliderMarkerOptions = prepareSliderMarkersOptions(self, self._scaleOptions, sizeOptions.width);
                    selectedRange = initSelection(self, self._scaleOptions);
                    sliderMarkerSpacing = calculateSliderMarkersSpacing(self.renderer, sizeOptions, self._scaleOptions, sliderMarkerOptions);
                    rangeContainerCanvas = calculateRangeContainerCanvas(sizeOptions, self.option('margin'), sliderMarkerSpacing);
                    scaleLabelsAreaHeight = calculateScaleAreaHeight(self.renderer, self._scaleOptions, showScaleMarkers(self._scaleOptions));
                    self.translator = createTranslator(translatorRange, createTranslatorCanvas(sizeOptions, rangeContainerCanvas, scaleLabelsAreaHeight));
                    self._scaleOptions.ticksInfo = getTicksInfo(self, self._scaleOptions, self.translator, rangeContainerCanvas.width);
                    self._testTicksInfo = self._scaleOptions.ticksInfo;
                    self._selectedRange = selectedRange;
                    if (seriesDataSource)
                        seriesDataSource.adjustSeriesDimensions(self.translator);
                    self.rangeContainer.applyOptions({
                        canvas: rangeContainerCanvas,
                        scaleLabelsAreaHeight: scaleLabelsAreaHeight,
                        sliderMarkerSpacing: sliderMarkerSpacing,
                        translator: self.translator,
                        selectedRange: selectedRange,
                        scale: self._scaleOptions,
                        behavior: self.option('behavior'),
                        background: self.option('background'),
                        chart: self.option('chart'),
                        seriesDataSource: seriesDataSource,
                        sliderMarker: sliderMarkerOptions,
                        sliderHandle: self.option('sliderHandle'),
                        shutter: self.option('shutter'),
                        selectedRangeChanged: createSelectedRangeChangedFunction(self),
                        setSelectedRange: function(selectedRange) {
                            self.setSelectedRange(selectedRange)
                        }
                    });
                    self._isUpdating = false
                };
            var createSelectedRangeChangedFunction = function(self) {
                    return function(selectedRange, blockSelectedRangeChanged) {
                            var selectedRangeChanged = self.option('selectedRangeChanged');
                            self.option('selectedRange', selectedRange);
                            if (selectedRangeChanged && !blockSelectedRangeChanged)
                                selectedRangeChanged(selectedRange)
                        }
                };
            var calculateSize = function(self) {
                    var $container = self.container,
                        size = self.option('size') || {},
                        result = {
                            width: size.width,
                            height: size.height
                        };
                    if ($container) {
                        if (!result.width)
                            result.width = $container.width();
                        if (!result.height)
                            result.height = $container.height()
                    }
                    self.canvas = result;
                    return result
                };
            var updateRendererSize = function(self, size) {
                    var renderer = self.renderer;
                    if (renderer.isInitialized())
                        renderer.getRoot().applySettings({
                            width: size.width,
                            height: size.height
                        });
                    else {
                        renderer.recreateCanvas(size.width, size.height);
                        renderer.draw(self.container[0])
                    }
                };
            var prepareChartThemeOptions = function(self, options) {
                    var chartTheme;
                    if (!self.option('chart').theme && options && options.theme) {
                        chartTheme = options.theme;
                        if (chartTheme) {
                            if (typeof chartTheme === 'object') {
                                chartTheme = chartTheme.chart || {};
                                chartTheme.name = options.theme.name
                            }
                            self.option('chart').theme = chartTheme
                        }
                    }
                };
            var initSelection = function(_this, scaleOptions) {
                    var selectedRangeOptions = _this.option('selectedRange'),
                        startValue,
                        endValue,
                        parser = scaleOptions.parser || function() {
                            return null
                        },
                        parseValue = function(value, entity) {
                            var parsedValue,
                                result = scaleOptions[entity];
                            if (utils.isDefined(value))
                                parsedValue = parser(value);
                            if (!utils.isDefined(parsedValue))
                                _this.option('incidentOccured').call(null, 'The ' + entity + ' field of the "selectedRange" configuration object is not valid.');
                            else
                                result = parsedValue;
                            return result
                        };
                    if (!selectedRangeOptions)
                        return {
                                startValue: scaleOptions.startValue,
                                endValue: scaleOptions.endValue
                            };
                    else {
                        startValue = parseValue(selectedRangeOptions.startValue, 'startValue');
                        startValue = _this.rangeContainer.slidersContainer.truncateSelectedRange(startValue, scaleOptions);
                        endValue = parseValue(selectedRangeOptions.endValue, 'endValue');
                        endValue = _this.rangeContainer.slidersContainer.truncateSelectedRange(endValue, scaleOptions);
                        return {
                                startValue: startValue,
                                endValue: endValue
                            }
                    }
                };
            var _isSizeChanged = function(self) {
                    var actualSize = self._actualSize,
                        newSize = calculateSize(self);
                    return actualSize && (actualSize.width !== newSize.width || actualSize.height !== newSize.height)
                };
            var _resizeHandler = function(self) {
                    return DX.utils.createResizeHandler(function() {
                            if (_isSizeChanged(self))
                                self._render(true)
                        })
                };
            return {
                    isSizeChanged: function() {
                        return _isSizeChanged(this)
                    },
                    _defaultOptions: function() {
                        return defaultRangeSelectorOptions
                    },
                    _dataSourceOptions: function() {
                        return {
                                paginate: false,
                                _preferSync: true
                            }
                    },
                    _init: function() {
                        var self = this;
                        self.container = getContainer(self);
                        clearContainer(self.container);
                        self.renderer = createRenderer(self);
                        self.rangeContainer = createRangeContainer(self.renderer);
                        if (self.option('redrawOnResize') === true) {
                            self._resizeHandler = _resizeHandler(self);
                            utils.windowResizeCallbacks.add(self._resizeHandler)
                        }
                        if (!$.isFunction(self.option('incidentOccured'))) {
                            utils.debug.assert(false, 'Function should be passed as "info" callback');
                            self.option('incidentOccured', $.noop)
                        }
                        if (self.option('incidentOccured') === $.noop)
                            self.option('incidentOccured', utils.logger.warn);
                        self._reinitDataSource()
                    },
                    _reinitDataSource: function() {
                        this._refreshDataSource()
                    },
                    _dispose: function() {
                        var _this = this,
                            disposeObject = function(propName) {
                                _this[propName] && _this[propName].dispose(),
                                _this[propName] = null
                            };
                        utils.windowResizeCallbacks.remove(this._resizeHandler);
                        disposeObject("renderer");
                        disposeObject("translator");
                        disposeObject("rangeContainer")
                    },
                    _initOptions: function(options) {
                        var self = this,
                            themeManager;
                        this._optionsInitializing = true;
                        options = options || {};
                        self._userOptions = $.extend(true, {}, options);
                        themeManager = createThemeManager(options.theme);
                        themeManager.setBackgroundColor(options.containerBackgroundColor);
                        self.option(themeManager.applyRangeSelectorTheme(options));
                        prepareChartThemeOptions(self, options);
                        if (options.background)
                            self._userBackgroundColor = options.background.color
                    },
                    _refresh: function() {
                        var _this = this,
                            callBase = _this.callBase;
                        _this._endLoading(function() {
                            callBase.call(_this)
                        })
                    },
                    _render: function(isResizing) {
                        this._optionsInitializing = false;
                        var self = this,
                            currentAnimationEnabled,
                            behaviorOptions;
                        applyOptions(self);
                        if (!self.stopRedraw) {
                            if (isResizing) {
                                behaviorOptions = self.option('behavior');
                                currentAnimationEnabled = behaviorOptions.animationEnabled;
                                behaviorOptions.animationEnabled = false;
                                self.rangeContainer.redraw();
                                behaviorOptions.animationEnabled = currentAnimationEnabled
                            }
                            else
                                self.rangeContainer.redraw();
                            !isResizing && (!self._dataSource || self._dataSource && self._dataSource.isLoaded()) && self.hideLoadingIndicator()
                        }
                        self.__rendered && self.__rendered()
                    },
                    _optionChanged: function(name, value, prevValue) {
                        var self = this;
                        if (!this._optionsInitializing)
                            dataUtils.compileSetter(name)(self._userOptions, value, {
                                functionsAsIs: true,
                                merge: true
                            });
                        if (name === "dataSource") {
                            self._reinitDataSource();
                            self._invalidate()
                        }
                        else if (name === "selectedRange")
                            self.setSelectedRange(self.option('selectedRange'));
                        else if (name === "selectedRangeChanged")
                            self.rangeContainer.slidersContainer.selectedRangeChanged = createSelectedRangeChangedFunction(self);
                        else if (name === 'containerBackgroundColor' || name === 'theme') {
                            this._initOptions(self._userOptions);
                            self._invalidate()
                        }
                        else if (name === 'loadingIndicator')
                            self._updateLoadIndicator(self.option('loadingIndicator'));
                        else
                            self._invalidate()
                    },
                    _handleDataSourceChanged: function() {
                        var self = this;
                        self._endLoading(function() {
                            if (self.renderer.isInitialized())
                                self._render()
                        })
                    },
                    getSelectedRange: function() {
                        var self = this;
                        var selectedRange = self.rangeContainer.slidersContainer.getSelectedRange();
                        return {
                                startValue: selectedRange.startValue,
                                endValue: selectedRange.endValue
                            }
                    },
                    setSelectedRange: function(selectedRange) {
                        var self = this;
                        if (self._isUpdating || !selectedRange)
                            return;
                        var oldSelectedRange = self.rangeContainer.slidersContainer.getSelectedRange();
                        if (oldSelectedRange && oldSelectedRange.startValue === selectedRange.startValue && oldSelectedRange.endValue === selectedRange.endValue)
                            return;
                        self.rangeContainer.slidersContainer.setSelectedRange(selectedRange)
                    },
                    resetSelectedRange: function(blockSelectedRangeChanged) {
                        var self = this;
                        self.setSelectedRange({
                            startValue: self._scaleOptions.startValue,
                            endValue: self._scaleOptions.endValue,
                            blockSelectedRangeChanged: blockSelectedRangeChanged
                        })
                    },
                    render: function(isResizing) {
                        this._render(isResizing);
                        return this
                    }
                }
        }()).include(DX.ui.DataHelperMixin).inherit(core.loadIndicatorMixin.base).include(core.widgetMarkupMixin)
    })(jQuery, DevExpress);
    /*! Module viz-rangeselector, file rangeContainer.js */
    (function($, DX, undefined) {
        var rangeSelector = DX.viz.rangeSelector;
        rangeSelector.RangeContainer = rangeSelector.BaseVisualElement.inherit(function() {
            var ctor = function(renderer) {
                    this.callBase(renderer);
                    this.slidersContainer = createSlidersContainer(renderer);
                    this.rangeView = createRangeView(renderer);
                    this.scale = createScale(renderer)
                };
            var _applyOptions = function(options) {
                    var self = this,
                        isEmpty = options.scale.isEmpty,
                        viewCanvas = {
                            left: options.canvas.left,
                            top: options.canvas.top,
                            width: options.canvas.width,
                            height: options.canvas.height >= options.scaleLabelsAreaHeight ? options.canvas.height - options.scaleLabelsAreaHeight : 0
                        };
                    self._viewCanvas = viewCanvas;
                    self.slidersContainer.applyOptions({
                        canvas: viewCanvas,
                        translator: options.translator,
                        scale: options.scale,
                        selectedRange: options.selectedRange,
                        sliderMarker: options.sliderMarker,
                        sliderHandle: options.sliderHandle,
                        shutter: options.shutter,
                        behavior: options.behavior,
                        selectedRangeChanged: options.selectedRangeChanged,
                        isEmpty: isEmpty
                    });
                    self.rangeView.applyOptions({
                        canvas: viewCanvas,
                        translator: options.translator,
                        background: options.background,
                        chart: options.chart,
                        seriesDataSource: options.seriesDataSource,
                        behavior: options.behavior,
                        isEmpty: isEmpty
                    });
                    self.scale.applyOptions({
                        canvas: options.canvas,
                        translator: options.translator,
                        scale: options.scale,
                        hideLabels: isEmpty,
                        scaleLabelsAreaHeight: options.scaleLabelsAreaHeight,
                        setSelectedRange: options.setSelectedRange
                    })
                };
            var createSlidersContainer = function(options) {
                    return rangeSelector.rangeSelectorFactory.createSlidersContainer(options)
                };
            var createScale = function(options) {
                    return rangeSelector.rangeSelectorFactory.createScale(options)
                };
            var createRangeView = function(options) {
                    return rangeSelector.rangeSelectorFactory.createRangeView(options)
                };
            var _createClipRectCanvas = function(canvas, sliderMarkerSpacing) {
                    return {
                            left: canvas.left - sliderMarkerSpacing.left,
                            top: canvas.top - sliderMarkerSpacing.top,
                            width: canvas.width + sliderMarkerSpacing.right + sliderMarkerSpacing.left,
                            height: canvas.height + sliderMarkerSpacing.bottom + sliderMarkerSpacing.top
                        }
                };
            var _draw = function() {
                    var self = this,
                        containerGroup,
                        rangeViewGroup,
                        slidersContainerGroup,
                        scaleGroup,
                        trackersGroup,
                        size = self._options.size,
                        clipRectCanvas = _createClipRectCanvas(self._options.canvas, self._options.sliderMarkerSpacing),
                        viewCanvas = self._viewCanvas;
                    self._clipRect = self._renderer.createClipRect(clipRectCanvas.left, clipRectCanvas.top, clipRectCanvas.width, clipRectCanvas.height).append();
                    containerGroup = self._renderer.createGroup({
                        'class': 'rangeContainer',
                        clipId: self._clipRect.id
                    }).append();
                    self._viewClipRect = self._renderer.createClipRect(viewCanvas.left, viewCanvas.top, viewCanvas.width, viewCanvas.height).append();
                    rangeViewGroup = self._renderer.createGroup({
                        'class': 'view',
                        clipId: self._viewClipRect.id
                    });
                    rangeViewGroup.append(containerGroup);
                    self.rangeView.redraw(rangeViewGroup);
                    slidersContainerGroup = self._renderer.createGroup({'class': 'slidersContainer'});
                    slidersContainerGroup.append(containerGroup);
                    self.slidersContainer.redraw(slidersContainerGroup);
                    scaleGroup = self._renderer.createGroup({'class': 'scale'});
                    scaleGroup.append(containerGroup);
                    self.scale.redraw(scaleGroup);
                    trackersGroup = self._renderer.createGroup({'class': 'trackers'});
                    trackersGroup.append(containerGroup);
                    self._trackersGroup = trackersGroup;
                    self.slidersContainer.appendTrackers(trackersGroup)
                };
            var _update = function() {
                    var self = this,
                        clipRectCanvas = _createClipRectCanvas(self._options.canvas, self._options.sliderMarkerSpacing),
                        viewCanvas = self._viewCanvas;
                    self._clipRect.updateRectangle({
                        x: clipRectCanvas.left,
                        y: clipRectCanvas.top,
                        width: clipRectCanvas.width,
                        height: clipRectCanvas.height
                    });
                    self._viewClipRect.updateRectangle({
                        x: viewCanvas.left,
                        y: viewCanvas.top,
                        width: viewCanvas.width,
                        height: viewCanvas.height
                    });
                    self.rangeView.redraw();
                    self.slidersContainer.redraw();
                    self.slidersContainer.appendTrackers(self._trackersGroup);
                    self.scale.redraw()
                };
            var dispose = function() {
                    this.slidersContainer.dispose();
                    this.slidersContainer = null
                };
            var prototypeObject = {
                    createSlidersContainer: createSlidersContainer,
                    createScale: createScale,
                    ctor: ctor,
                    dispose: dispose,
                    _applyOptions: _applyOptions,
                    _draw: _draw,
                    _update: _update
                };
            return prototypeObject
        }())
    })(jQuery, DevExpress);
    /*! Module viz-rangeselector, file scale.js */
    (function($, DX, undefined) {
        var rangeSelector = DX.viz.rangeSelector,
            formatHelper = DX.formatHelper,
            utils = DX.utils;
        var SCALE_TEXT_SPACING = 5;
        rangeSelector.Scale = rangeSelector.BaseVisualElement.inherit({
            _setupDateUnitInterval: function(scaleOptions) {
                var key,
                    hasObjectSingleField = function(object) {
                        var fieldsCounter = 0;
                        $.each(object, function() {
                            return ++fieldsCounter < 2
                        });
                        return fieldsCounter === 1
                    },
                    millisecTickInterval,
                    majorTickInterval = scaleOptions.ticksInfo.majorTickInterval,
                    majorTicks = scaleOptions.ticksInfo.majorTicks;
                if (scaleOptions.valueType === 'datetime') {
                    if (utils.isObject(majorTickInterval) && !hasObjectSingleField(majorTickInterval))
                        utils.logger.warn('More than one field is specified within the object assigned to the "tickInterval" option. Assign an object with a single field specified (days, hours or a similar one).');
                    if (majorTicks && majorTicks.autoArrangementStep > 1) {
                        if (utils.isString(majorTickInterval))
                            majorTickInterval = utils.getDateIntervalByString(majorTickInterval);
                        for (key in majorTickInterval) {
                            majorTickInterval[key] *= majorTicks.autoArrangementStep;
                            millisecTickInterval = utils.convertDateTickIntervalToMilliseconds(majorTickInterval)
                        }
                        majorTickInterval = utils.convertMillisecondsToDateUnits(millisecTickInterval)
                    }
                    this.dateUnitInterval = utils.getDateUnitInterval(majorTickInterval)
                }
            },
            _prepareDatesDifferences: function(datesDifferences, tickInterval) {
                var deleteDifferent = tickInterval,
                    dateUnitInterval,
                    i;
                if (deleteDifferent === 'week')
                    deleteDifferent = 'day';
                if (deleteDifferent === 'quarter')
                    deleteDifferent = 'month';
                if (datesDifferences[deleteDifferent])
                    for (i = 0; i < utils.dateUnitIntervals.length; i++) {
                        dateUnitInterval = utils.dateUnitIntervals[i];
                        if (datesDifferences[dateUnitInterval]) {
                            datesDifferences[dateUnitInterval] = false;
                            datesDifferences.count--
                        }
                        if (dateUnitInterval === deleteDifferent)
                            break
                    }
            },
            _getMarkerDate: function(date, tickInterval) {
                var markerDate = new Date(date.getTime()),
                    month = 0;
                switch (tickInterval) {
                    case'quarter':
                        month = formatHelper.getFirstQuarterMonth(date.getMonth());
                    case'month':
                        markerDate.setMonth(month);
                    case'week':
                    case'day':
                        markerDate.setDate(1);
                    case'hour':
                        markerDate.setHours(0, 0, 0, 0);
                        break;
                    case'millisecond':
                        markerDate.setMilliseconds(0);
                        break;
                    case'second':
                        markerDate.setSeconds(0, 0);
                        break;
                    case'minute':
                        markerDate.setMinutes(0, 0, 0);
                        break
                }
                return markerDate
            },
            _drawDateMarker: function(date, options) {
                var labelPosX,
                    labelPosY,
                    dateFormated,
                    scaleOptions,
                    textElement;
                if (options.x === null)
                    return;
                scaleOptions = this._options.scale;
                this.lineOptions['class'] = 'dx-range-selector-date-marker';
                this._renderer.createLine(options.x, options.y, options.x, options.y + scaleOptions.marker.separatorHeight, this.lineOptions).append(options.group);
                dateFormated = this._getLabel(date, options.label);
                labelPosX = options.x + scaleOptions.tick.width + scaleOptions.marker.textLeftIndent;
                labelPosY = options.y + scaleOptions.marker.textTopIndent + scaleOptions.label.font.size;
                this.textOptions.align = 'left';
                textElement = this._renderer.createText(dateFormated, labelPosX, labelPosY, this.textOptions).append(options.group);
                return labelPosX + textElement.getBBox().width
            },
            _drawDateMarkers: function(dates, group) {
                var dateMarker,
                    i,
                    datesDifferences,
                    markerDate,
                    posX,
                    prevMarkerRightX = -1;
                if (this._options.scale.valueType !== 'datetime' || !this.visibleMarkers)
                    return;
                var markerDatePositions = [];
                if (dates.length > 1) {
                    for (i = 1; i < dates.length; i++) {
                        datesDifferences = utils.getDatesDifferences(dates[i - 1], dates[i]);
                        this._prepareDatesDifferences(datesDifferences, this.dateUnitInterval);
                        if (datesDifferences.count > 0) {
                            markerDate = this._getMarkerDate(dates[i], this.dateUnitInterval);
                            this.markerDates = this.markerDates || [];
                            this.markerDates.push(markerDate);
                            posX = this.translator.translateX(markerDate);
                            if (posX > prevMarkerRightX) {
                                posX !== null && markerDatePositions.push({
                                    date: markerDate,
                                    posX: posX
                                });
                                prevMarkerRightX = this._drawDateMarker(markerDate, {
                                    group: group,
                                    y: this._options.canvas.top + this._options.canvas.height - this.markersAreaHeight + this._options.scale.marker.topIndent,
                                    x: posX,
                                    label: this._getLabelFormatOptions(formatHelper.getDateFormatByDifferences(datesDifferences))
                                })
                            }
                        }
                    }
                    this._initializeMarkersEvents(markerDatePositions, group)
                }
            },
            _getLabelFormatOptions: function(formatString) {
                if (!utils.isDefined(this._options.scale.marker.label.format))
                    return $.extend({}, this._options.scale.marker.label, {format: formatString});
                return this._options.scale.marker.label
            },
            _calculateRangeByMarkerPosition: function(posX, markerDatePositions, scaleOptions) {
                var selectedRange = {},
                    index,
                    position;
                for (index in markerDatePositions) {
                    position = markerDatePositions[index];
                    if (!scaleOptions.inverted) {
                        if (posX >= position.posX)
                            selectedRange.startValue = position.date;
                        else if (!selectedRange.endValue)
                            selectedRange.endValue = position.date
                    }
                    else if (posX < position.posX)
                        selectedRange.endValue = position.date;
                    else if (!selectedRange.startValue)
                        selectedRange.startValue = position.date
                }
                selectedRange.startValue = selectedRange.startValue || scaleOptions.startValue;
                selectedRange.endValue = selectedRange.endValue || scaleOptions.endValue;
                return selectedRange
            },
            _initializeMarkersEvents: function(markerDatePositions, group) {
                var self = this,
                    markersAreaTop = this._options.canvas.top + this._options.canvas.height - this.markersAreaHeight + this._options.scale.marker.topIndent,
                    markersTracker,
                    svgOffsetLeft,
                    index,
                    posX,
                    selectedRange;
                if (markerDatePositions.length > 0) {
                    markersTracker = self._renderer.createRect(self._options.canvas.left, markersAreaTop, self._options.canvas.width, self._options.scale.marker.separatorHeight, 0, {
                        fill: 'grey',
                        stroke: 'grey',
                        opacity: 0.0001
                    });
                    markersTracker.append(group);
                    markersTracker.on(rangeSelector.events.start, function(e) {
                        svgOffsetLeft = rangeSelector.utils.getRootOffsetLeft(self._renderer);
                        posX = rangeSelector.utils.getEventPageX(e) - svgOffsetLeft;
                        selectedRange = self._calculateRangeByMarkerPosition(posX, markerDatePositions, self._options.scale);
                        self._options.setSelectedRange(selectedRange)
                    });
                    self._markersTracker = markersTracker
                }
            },
            _getLabel: function(value, options) {
                var formatObject = {
                        value: value,
                        valueText: formatHelper.format(value, options.format, options.precision)
                    };
                return String(utils.isFunction(options.customizeText) ? options.customizeText.call(formatObject, formatObject) : formatObject.valueText)
            },
            _drawLabel: function(value, group) {
                var textY = this._options.canvas.top + this._options.canvas.height - this.markersAreaHeight,
                    textElement = this._renderer.createText(this._getLabel(value, this._options.scale.label), this.translator.translateX(value), textY, this.textOptions);
                textElement.append(group);
                this.textElements = this.textElements || [];
                this.textElements.push(textElement)
            },
            _drawTick: function(value, group) {
                this.lineOptions['class'] = 'dx-range-selector-tick';
                var secondY = this._options.canvas.top + this._options.canvas.height - this.scaleLabelsAreaHeight,
                    posX = this.translator.translateX(value),
                    tickElement = this._renderer.createLine(posX, this._options.canvas.top, posX, secondY, this.lineOptions).append(group);
                this.tickElements = this.tickElements || [];
                this.tickElements.push(tickElement)
            },
            _redraw: function(group, isOptimize) {
                var self = this,
                    scaleOptions = self._options.scale,
                    ticksGroup = self._renderer.createGroup(),
                    labelsGroup = self._renderer.createGroup().append(group),
                    majorTicks = scaleOptions.ticksInfo.majorTicks,
                    minorTicks = scaleOptions.ticksInfo.minorTicks,
                    customBoundaryTicks = scaleOptions.ticksInfo.customBoundaryTicks,
                    hideLabels = self._options.hideLabels || majorTicks.hideLabels || !scaleOptions.label.visible,
                    i;
                for (i = 0; i < majorTicks.length; i++) {
                    if (!hideLabels)
                        self._drawLabel(majorTicks[i], labelsGroup);
                    self._drawTick(majorTicks[i], ticksGroup)
                }
                if (scaleOptions.showMinorTicks)
                    for (i = 0; i < minorTicks.length; i++)
                        self._drawTick(minorTicks[i], ticksGroup);
                for (i = 0; i < customBoundaryTicks.length; i++)
                    self._drawTick(customBoundaryTicks[i], ticksGroup);
                ticksGroup.append(group);
                self._drawDateMarkers(majorTicks, labelsGroup)
            },
            _applyOptions: function(options) {
                var scaleOptions = options.scale,
                    labelsAreaHeight;
                this.textOptions = {
                    align: 'center',
                    'class': 'dx-range-selector-scale',
                    font: scaleOptions.label.font,
                    style: {'-webkit-user-select': 'none'}
                };
                this.lineOptions = {
                    strokeWidth: scaleOptions.tick.width,
                    stroke: scaleOptions.tick.color,
                    strokeOpacity: scaleOptions.tick.opacity
                };
                this._setupDateUnitInterval(scaleOptions);
                this.visibleMarkers = scaleOptions.marker.visible === undefined ? true : scaleOptions.marker.visible;
                labelsAreaHeight = scaleOptions.label.visible ? scaleOptions.label.topIndent + scaleOptions.label.font.size : 0;
                this.scaleLabelsAreaHeight = options.scaleLabelsAreaHeight;
                this.markersAreaHeight = this.scaleLabelsAreaHeight - labelsAreaHeight;
                this.translator = options.translator
            },
            _draw: function(group) {
                this._redraw(group, false)
            },
            _update: function(group) {
                var callBase = this.callBase;
                if (this._markersTracker)
                    this._markersTracker.off(rangeSelector.events.start, '**');
                this.callBase = callBase;
                this.callBase(group)
            }
        })
    })(jQuery, DevExpress);
    /*! Module viz-rangeselector, file rangeFactory.js */
    (function($, DX, undefined) {
        var rangeSelector = DX.viz.rangeSelector,
            renderers = DX.viz.renderers;
        rangeSelector.rangeSelectorFactory = function() {
            return {
                    createRenderer: function(options) {
                        return new renderers.Renderer(options)
                    },
                    createTranslator: function(range, canvas) {
                        return new DX.viz.core.Translator2D(range, canvas)
                    },
                    getTickProvider: function() {
                        return DX.viz.core.tickProvider
                    },
                    createRangeContainer: function(rangeContainerOptions) {
                        return new rangeSelector.RangeContainer(rangeContainerOptions)
                    },
                    createSlidersContainer: function(options) {
                        return new rangeSelector.SlidersContainer(options)
                    },
                    createScale: function(options) {
                        return new rangeSelector.Scale(options)
                    },
                    createSliderMarker: function(options) {
                        return new rangeSelector.SliderMarker(options)
                    },
                    createRangeView: function(options) {
                        return new rangeSelector.RangeView(options)
                    },
                    createThemeManager: function(options) {
                        return new rangeSelector.ThemeManager(options)
                    },
                    createSlider: function(renderer, sliderIndex) {
                        return new rangeSelector.Slider(renderer, sliderIndex)
                    },
                    createSlidersEventsManager: function(renderer, slidersController, processSelectionChanged) {
                        return new rangeSelector.SlidersEventsManager(renderer, slidersController, processSelectionChanged)
                    },
                    createSlidersController: function(sliders) {
                        return new rangeSelector.SlidersController(sliders)
                    }
                }
        }()
    })(jQuery, DevExpress);
    /*! Module viz-rangeselector, file slidersContainer.js */
    (function($, DX, undefined) {
        var rangeSelector = DX.viz.rangeSelector,
            utils = DX.utils;
        var msPointerEnabled = window.navigator.msPointerEnabled || window.navigator.pointerEnabled;
        var isNumber = DX.utils.isNumber;
        var isDate = DX.utils.isDate;
        var START_VALUE_INDEX = 0,
            END_VALUE_INDEX = 1;
        rangeSelector.SlidersContainer = rangeSelector.BaseVisualElement.inherit(function() {
            var prototypeObject = {
                    getController: function() {
                        return this._controller
                    },
                    _drawAreaTracker: function(group) {
                        var self = this,
                            areaTracker,
                            selectedAreaTracker;
                        areaTracker = self._renderer.createRect(self._options.canvas.left, self._options.canvas.top, self._options.canvas.width, self._options.canvas.height, 0, {
                            fill: 'grey',
                            stroke: 'grey',
                            opacity: 0.0001
                        });
                        areaTracker.append(group);
                        selectedAreaTracker = self._renderer.createRect(self._options.canvas.left, self._options.canvas.top, self._options.canvas.width, self._options.canvas.height, 0, {
                            fill: 'grey',
                            stroke: 'grey',
                            opacity: 0.0001,
                            style: {cursor: 'pointer'}
                        });
                        selectedAreaTracker.append(group);
                        self._controller.setAreaTrackers(areaTracker, selectedAreaTracker)
                    },
                    dispose: function() {
                        this._eventsManager.dispose();
                        this._eventManager = null
                    },
                    _processSelectionChanged: function(moving, blockSelectedRangeChanged) {
                        var self = this,
                            equalLastSelectedRange = function(selectedRange) {
                                return selectedRange && self._lastSelectedRange.startValue === selectedRange.startValue && self._lastSelectedRange.endValue === selectedRange.endValue
                            },
                            selectedRange = self.getSelectedRange();
                        if ((!moving || (self._options.behavior.callSelectedRangeChanged || '').toLowerCase() === "onmoving") && self._options.selectedRangeChanged && !equalLastSelectedRange(selectedRange)) {
                            self._updateLastSelectedRange(selectedRange);
                            if (typeof self._options.selectedRangeChanged === 'function')
                                self._options.selectedRangeChanged.call(null, selectedRange, blockSelectedRangeChanged);
                            if (!moving && !equalLastSelectedRange(selectedRange))
                                self.setSelectedRange(selectedRange)
                        }
                    },
                    _updateLastSelectedRange: function(selectedRange) {
                        selectedRange = selectedRange || this._options.selectedRange;
                        this._lastSelectedRange = {
                            startValue: selectedRange.startValue,
                            endValue: selectedRange.endValue
                        }
                    },
                    _createSlider: function(sliderIndex) {
                        return rangeSelector.rangeSelectorFactory.createSlider(this._renderer, sliderIndex)
                    },
                    _createSlidersController: function(sliders) {
                        return rangeSelector.rangeSelectorFactory.createSlidersController(sliders)
                    },
                    _createSlidersEventsManager: function(controller) {
                        var self = this;
                        return rangeSelector.rangeSelectorFactory.createSlidersEventsManager(self._renderer, controller, function(moving) {
                                self._processSelectionChanged(moving)
                            })
                    },
                    ctor: function(renderer) {
                        var self = this,
                            sliders;
                        self.callBase(renderer);
                        sliders = [self._createSlider(START_VALUE_INDEX), self._createSlider(END_VALUE_INDEX)];
                        self._controller = self._createSlidersController(sliders);
                        self._eventsManager = self._createSlidersEventsManager(self._controller);
                        self._lastSelectedRange = {}
                    },
                    getSelectedRange: function() {
                        return this._controller.getSelectedRange()
                    },
                    truncateSelectedRange: function(value, scaleOptions) {
                        var min = scaleOptions.startValue > scaleOptions.endValue ? scaleOptions.endValue : scaleOptions.startValue,
                            max = scaleOptions.startValue > scaleOptions.endValue ? scaleOptions.startValue : scaleOptions.endValue;
                        if (value < min)
                            value = min;
                        if (value > max)
                            value = max;
                        return value
                    },
                    setSelectedRange: function(selectedRange) {
                        var _this = this,
                            scale = _this._options.scale,
                            startValue,
                            endValue,
                            currentSelectedRange = _this._options.selectedRange;
                        if (selectedRange) {
                            startValue = selectedRange.startValue;
                            endValue = selectedRange.endValue
                        }
                        if (isNumber(scale.startValue) && isNumber(startValue) || isDate(scale.startValue) && isDate(startValue))
                            currentSelectedRange.startValue = startValue;
                        if (isNumber(scale.endValue) && isNumber(endValue) || isDate(scale.endValue) && isDate(endValue))
                            currentSelectedRange.endValue = endValue;
                        currentSelectedRange.startValue = _this.truncateSelectedRange(currentSelectedRange.startValue, scale);
                        currentSelectedRange.endValue = _this.truncateSelectedRange(currentSelectedRange.endValue, scale);
                        _this._controller.applySelectedRange(currentSelectedRange);
                        _this._controller.applyPosition();
                        _this._processSelectionChanged(false, selectedRange && selectedRange.blockSelectedRangeChanged)
                    },
                    appendTrackers: function(group) {
                        this._controller.appendTrackers(group)
                    },
                    _applyOptions: function(options) {
                        var self = this;
                        self._controller.applyOptions({
                            translator: options.translator,
                            canvas: options.canvas,
                            sliderMarker: options.sliderMarker,
                            sliderHandle: options.sliderHandle,
                            shutter: options.shutter,
                            scale: options.scale,
                            behavior: options.behavior
                        });
                        self._eventsManager.applyOptions({behavior: options.behavior})
                    },
                    _draw: function(group) {
                        var self = this,
                            rootElement;
                        if (msPointerEnabled) {
                            rootElement = self._renderer.getRoot();
                            rootElement && (rootElement.element.style.msTouchAction = "pinch-zoom")
                        }
                        self._controller.redraw(group);
                        self._drawAreaTracker(group);
                        self._eventsManager.initialize();
                        self._update()
                    },
                    _update: function() {
                        var self = this,
                            isEmpty = self._options.isEmpty;
                        self._eventsManager.setEnabled(!isEmpty);
                        self._controller.applySelectedRange(isEmpty ? {} : self._options.selectedRange);
                        self._controller.applyPosition(self.isDrawn());
                        self._updateLastSelectedRange();
                        self._controller.redraw()
                    }
                };
            return prototypeObject
        }())
    })(jQuery, DevExpress);
    /*! Module viz-rangeselector, file slidersController.js */
    (function($, DX, undefined) {
        var rangeSelector = DX.viz.rangeSelector,
            utils = DX.utils;
        var START_VALUE_INDEX = 0,
            END_VALUE_INDEX = 1;
        rangeSelector.SlidersController = DX.Class.inherit(function() {
            return {
                    ctor: function(sliders) {
                        this._sliders = sliders;
                        sliders[START_VALUE_INDEX].setAnotherSlider(sliders[END_VALUE_INDEX]);
                        sliders[END_VALUE_INDEX].setAnotherSlider(sliders[START_VALUE_INDEX])
                    },
                    setAreaTrackers: function(areaTracker, selectedAreaTracker) {
                        this._areaTracker = areaTracker;
                        this._selectedAreaTracker = selectedAreaTracker
                    },
                    applyOptions: function(options) {
                        var self = this,
                            values = null;
                        self._options = options;
                        self.getSlider(START_VALUE_INDEX).applyOptions(options);
                        self.getSlider(END_VALUE_INDEX).applyOptions(options);
                        if (options.behavior.snapToTicks) {
                            values = options.scale.ticksInfo.fullTicks;
                            if (values.length > 1 && values[0] > values[values.length - 1])
                                values = values.reverse()
                        }
                        self.getSlider(START_VALUE_INDEX).setAvailableValues(values);
                        self.getSlider(END_VALUE_INDEX).setAvailableValues(values)
                    },
                    processDocking: function(sliderIndex) {
                        var self = this;
                        if (sliderIndex !== undefined)
                            self.getSlider(sliderIndex).processDocking();
                        else {
                            self.getSlider(START_VALUE_INDEX).processDocking();
                            self.getSlider(END_VALUE_INDEX).processDocking()
                        }
                        self.setTrackersCursorStyle('default');
                        self.applyAreaTrackersPosition()
                    },
                    getSelectedRangeInterval: function() {
                        var self = this;
                        return rangeSelector.utils.getInterval(self.getSlider(START_VALUE_INDEX).getValue(), self.getSlider(END_VALUE_INDEX).getValue())
                    },
                    moveSliders: function(postitionDelta, selectedRangeInterval) {
                        var self = this;
                        self.getSlider(START_VALUE_INDEX).setPosition(self.getSlider(START_VALUE_INDEX).getPosition() + postitionDelta, false, selectedRangeInterval);
                        self.applyPosition(true)
                    },
                    moveSlider: function(sliderIndex, fastSwap, position, offsetPosition, startOffsetPosition, startOffsetPositionChangedCallback) {
                        var self = this,
                            slider = self.getSlider(sliderIndex),
                            anotherSlider = slider.getAnotherSlider(),
                            anotherSliderIndex = anotherSlider.getIndex(),
                            doSwap;
                        if (slider.canSwap())
                            if (sliderIndex === START_VALUE_INDEX ? position > anotherSlider.getPosition() : position < anotherSlider.getPosition()) {
                                doSwap = fastSwap;
                                if (!fastSwap)
                                    if (Math.abs(offsetPosition) >= Math.abs(startOffsetPosition) && offsetPosition * startOffsetPosition < 0) {
                                        doSwap = true;
                                        position += 2 * startOffsetPosition;
                                        startOffsetPositionChangedCallback(-startOffsetPosition)
                                    }
                                if (doSwap) {
                                    self.swapSliders();
                                    anotherSlider.applyPosition(true)
                                }
                            }
                        slider.setPosition(position, true);
                        slider.applyPosition(true);
                        self.applyAreaTrackersPosition();
                        self.setTrackersCursorStyle('w-resize')
                    },
                    applySelectedAreaCenterPosition: function(pos) {
                        var self = this,
                            slidersContainerHalfWidth = (self.getSlider(END_VALUE_INDEX).getPosition() - self.getSlider(START_VALUE_INDEX).getPosition()) / 2,
                            selectedRangeInterval = self.getSelectedRangeInterval();
                        self.getSlider(START_VALUE_INDEX).setPosition(pos - slidersContainerHalfWidth, false, selectedRangeInterval);
                        self.applyPosition();
                        self.processDocking()
                    },
                    processManualSelection: function(startPosition, endPosition, eventArgs) {
                        var self = this,
                            animateSliderIndex,
                            movingSliderIndex,
                            positionRange = [Math.min(startPosition, endPosition), Math.max(startPosition, endPosition)];
                        animateSliderIndex = startPosition < endPosition ? START_VALUE_INDEX : END_VALUE_INDEX;
                        movingSliderIndex = startPosition < endPosition ? END_VALUE_INDEX : START_VALUE_INDEX;
                        self.getSlider(movingSliderIndex).setPosition(positionRange[movingSliderIndex]);
                        self.getSlider(animateSliderIndex).setPosition(positionRange[animateSliderIndex]);
                        self.getSlider(movingSliderIndex).setPosition(positionRange[movingSliderIndex], true);
                        self.getSlider(movingSliderIndex).startEventHandler(eventArgs);
                        self.getSlider(animateSliderIndex).processDocking();
                        self.getSlider(movingSliderIndex).applyPosition(true)
                    },
                    applySelectedRange: function(selectedRange) {
                        var self = this,
                            inverted = self._options.scale.inverted;
                        utils.debug.assertParam(selectedRange, 'selectedRange not passed');
                        if (!inverted && selectedRange.startValue > selectedRange.endValue || inverted && selectedRange.startValue < selectedRange.endValue) {
                            self.getSlider(START_VALUE_INDEX).setValue(selectedRange.endValue);
                            self.getSlider(END_VALUE_INDEX).setValue(selectedRange.startValue)
                        }
                        else {
                            self.getSlider(START_VALUE_INDEX).setValue(selectedRange.startValue);
                            self.getSlider(END_VALUE_INDEX).setValue(selectedRange.endValue)
                        }
                    },
                    getSelectedRange: function() {
                        var self = this;
                        return {
                                startValue: self.getSlider(START_VALUE_INDEX).getValue(),
                                endValue: self.getSlider(END_VALUE_INDEX).getValue()
                            }
                    },
                    swapSliders: function() {
                        var self = this;
                        self._sliders.reverse();
                        self.getSlider(START_VALUE_INDEX).changeLocation();
                        self.getSlider(END_VALUE_INDEX).changeLocation()
                    },
                    applyAreaTrackersPosition: function() {
                        var self = this,
                            selectedRange = self.getSelectedRange(),
                            scaleOptions = self._options.scale,
                            width = self.getSlider(END_VALUE_INDEX).getPosition() - self.getSlider(START_VALUE_INDEX).getPosition(),
                            options = {
                                x: self.getSlider(START_VALUE_INDEX).getPosition(),
                                width: width < 0 ? 0 : width,
                                y: self._options.canvas.top,
                                height: self._options.canvas.height,
                                style: {cursor: scaleOptions.endValue - scaleOptions.startValue === selectedRange.endValue - selectedRange.startValue ? 'default' : 'pointer'}
                            };
                        self._selectedAreaTracker.applySettings(options);
                        self._areaTracker.applySettings({
                            x: self._options.canvas.left,
                            width: self._options.canvas.width,
                            y: self._options.canvas.top,
                            height: self._options.canvas.height
                        })
                    },
                    applyPosition: function(disableAnimation) {
                        var self = this;
                        self.getSlider(START_VALUE_INDEX).applyPosition(disableAnimation);
                        self.getSlider(END_VALUE_INDEX).applyPosition(disableAnimation);
                        self.applyAreaTrackersPosition()
                    },
                    redraw: function(group) {
                        var self = this;
                        self.getSlider(START_VALUE_INDEX).redraw(group);
                        self.getSlider(END_VALUE_INDEX).redraw(group)
                    },
                    appendTrackers: function(group) {
                        var self = this;
                        if (self._areaTracker && self._selectedAreaTracker) {
                            self._areaTracker.append(group);
                            self._selectedAreaTracker.append(group)
                        }
                        self.getSlider(START_VALUE_INDEX).appendTrackers(group);
                        self.getSlider(END_VALUE_INDEX).appendTrackers(group)
                    },
                    getSlider: function(sliderIndex) {
                        return this._sliders[sliderIndex]
                    },
                    getAreaTracker: function() {
                        return this._areaTracker
                    },
                    getSelectedAreaTracker: function() {
                        return this._selectedAreaTracker
                    },
                    setTrackersCursorStyle: function(style) {
                        var self = this;
                        self._selectedAreaTracker.applySettings({style: {cursor: style}});
                        self._areaTracker.applySettings({style: {cursor: style}})
                    }
                }
        }())
    })(jQuery, DevExpress);
    /*! Module viz-rangeselector, file slidersEventsManager.js */
    (function($, DX, undefined) {
        var rangeSelector = DX.viz.rangeSelector,
            utils = DX.utils,
            EVENT_NS = ".dx-range-selector";
        var setEvents = function() {
                var win = window;
                win = DX.viz.rangeSelector.mockWindow || window;
                var touchSupport = "ontouchstart" in win;
                var msPointerEnabled = win.navigator.msPointerEnabled;
                var pointerEnabled = win.navigator.pointerEnabled;
                var addNStoEvents = function(str) {
                        var regExp = /(\w+)(\s|$)/g;
                        return str.replace(regExp, "$1" + EVENT_NS + "$2")
                    };
                rangeSelector.events = {
                    start: addNStoEvents(pointerEnabled ? "pointerdown" : msPointerEnabled ? "MSPointerDown" : touchSupport ? "touchstart mousedown" : "mousedown"),
                    move: addNStoEvents(pointerEnabled ? "pointermove" : msPointerEnabled ? "MSPointerMove" : touchSupport ? "touchmove mousemove" : "mousemove"),
                    end: addNStoEvents(pointerEnabled ? "pointerup pointercancel" : msPointerEnabled ? "MSPointerUp MSPointerCancel" : touchSupport ? "touchend mouseup" : "mouseup")
                }
            };
        setEvents();
        rangeSelector.__setEvents = setEvents;
        var MIN_MANUAL_SELECTING_WIDTH = 10,
            START_VALUE_INDEX = 0,
            END_VALUE_INDEX = 1;
        rangeSelector.SlidersEventsManager = DX.Class.inherit(function() {
            var getRootOffsetLeft = function(self) {
                    return rangeSelector.utils.getRootOffsetLeft(self._renderer)
                };
            var getEventPageX = function(eventArgs) {
                    return rangeSelector.utils.getEventPageX(eventArgs)
                };
            var isLeftButtonPressed = function(event) {
                    var e = event || window.event,
                        originalEvent = e.originalEvent,
                        touches = e.touches,
                        pointerType = originalEvent ? originalEvent.pointerType : false,
                        eventTouches = originalEvent ? originalEvent.touches : false,
                        isIE8LeftClick = e.which === undefined && e.button === 1,
                        isMSPointerLeftClick = originalEvent && pointerType !== undefined && (pointerType === (originalEvent.MSPOINTER_TYPE_TOUCH || 'touch') || pointerType === (originalEvent.MSPOINTER_TYPE_MOUSE || 'mouse') && originalEvent.buttons === 1),
                        isLeftClick = isIE8LeftClick || e.which === 1,
                        isTouches = touches && touches.length > 0 || eventTouches && eventTouches.length > 0;
                    return isLeftClick || isMSPointerLeftClick || isTouches
                };
            var isMultiTouches = function(event) {
                    var originalEvent = event.originalEvent,
                        touches = event.touches,
                        eventTouches = originalEvent ? originalEvent.touches : false;
                    return touches && touches.length > 1 || eventTouches && eventTouches.length > 1 || null
                };
            var isTouchEventArgs = function(e) {
                    return e && e.type && e.type.indexOf('touch') === 0
                };
            var initializeSliderEvents = function(self, sliderIndex) {
                    var renderer = self._renderer,
                        isTouchEvent,
                        slidersController = self._slidersController,
                        processSelectionChanged = self._processSelectionChanged,
                        slider = slidersController.getSlider(sliderIndex),
                        anotherSlider = slider.getAnotherSlider(),
                        fastSwap,
                        startOffsetPosition,
                        splitterMoving;
                    slider.startEventHandler = function(e) {
                        if (!self._enabled || !isLeftButtonPressed(e) || splitterMoving)
                            return;
                        fastSwap = this === slider.getSliderTracker().element;
                        splitterMoving = true;
                        isTouchEvent = isTouchEventArgs(e);
                        startOffsetPosition = getEventPageX(e) - slider.getPosition() - getRootOffsetLeft(self);
                        if (!isMultiTouches(e)) {
                            this.preventedDefault = true;
                            e.stopPropagation();
                            e.preventDefault()
                        }
                    };
                    slider.on(rangeSelector.events.start, slider.startEventHandler);
                    $(document).on(rangeSelector.events.end, function(e) {
                        if (splitterMoving) {
                            splitterMoving = false;
                            slidersController.processDocking();
                            processSelectionChanged(false)
                        }
                    });
                    $(document).on(rangeSelector.events.move, slider.__moveEventHandler = function(e) {
                        var doSwap,
                            pageX,
                            offsetPosition,
                            svgOffsetLeft = getRootOffsetLeft(self),
                            position,
                            sliderIndex = slider.getIndex();
                        if (isTouchEvent !== isTouchEventArgs(e))
                            return;
                        if (!isLeftButtonPressed(e, true) && splitterMoving) {
                            splitterMoving = false;
                            slidersController.processDocking();
                            processSelectionChanged(false)
                        }
                        else if (splitterMoving) {
                            if (!isMultiTouches(e)) {
                                this.preventedDefault = true;
                                e.preventDefault()
                            }
                            pageX = getEventPageX(e);
                            position = pageX - startOffsetPosition - svgOffsetLeft;
                            offsetPosition = pageX - slider.getPosition() - svgOffsetLeft;
                            slidersController.moveSlider(sliderIndex, fastSwap, position, offsetPosition, startOffsetPosition, function(newStartOffsetPosition) {
                                startOffsetPosition = newStartOffsetPosition
                            });
                            processSelectionChanged(true)
                        }
                    })
                };
            var initializeSelectedAreaEvents = function(self) {
                    var renderer = self._renderer,
                        isTouchEvent,
                        slidersController = self._slidersController,
                        processSelectionChanged = self._processSelectionChanged,
                        selectedAreaTracker = slidersController.getSelectedAreaTracker(),
                        selectedAreaMoving = false,
                        offsetStartPosition,
                        selectedRangeInterval;
                    selectedAreaTracker.on(rangeSelector.events.start, function(e) {
                        if (!self._enabled || !isLeftButtonPressed(e) || selectedAreaMoving)
                            return;
                        selectedAreaMoving = true;
                        isTouchEvent = isTouchEventArgs(e);
                        offsetStartPosition = getEventPageX(e) - slidersController.getSlider(START_VALUE_INDEX).getPosition();
                        selectedRangeInterval = slidersController.getSelectedRangeInterval();
                        if (!isMultiTouches(e)) {
                            this.preventedDefault = true;
                            e.stopPropagation();
                            e.preventDefault()
                        }
                    });
                    $(document).on(rangeSelector.events.end, function(e) {
                        if (selectedAreaMoving) {
                            selectedAreaMoving = false;
                            slidersController.processDocking();
                            processSelectionChanged(false)
                        }
                    });
                    $(document).on(rangeSelector.events.move, self.__selectedAreaMoveEventHandler = function(e) {
                        var positionDelta,
                            pageX;
                        if (isTouchEvent !== isTouchEventArgs(e))
                            return;
                        if (selectedAreaMoving && !isLeftButtonPressed(e)) {
                            selectedAreaMoving = false;
                            slidersController.processDocking();
                            processSelectionChanged(false)
                        }
                        if (selectedAreaMoving) {
                            if (!isMultiTouches(e)) {
                                this.preventedDefault = true;
                                e.preventDefault()
                            }
                            pageX = getEventPageX(e);
                            positionDelta = pageX - slidersController.getSlider(START_VALUE_INDEX).getPosition() - offsetStartPosition;
                            slidersController.moveSliders(positionDelta, selectedRangeInterval);
                            processSelectionChanged(true)
                        }
                    })
                };
            var initializeAreaEvents = function(self) {
                    var renderer = self._renderer,
                        isTouchEvent,
                        slidersController = self._slidersController,
                        processSelectionChanged = self._processSelectionChanged,
                        areaTracker = slidersController.getAreaTracker(),
                        unselectedAreaProcessing = false,
                        splitterMoving = false,
                        startPageX;
                    areaTracker.on(rangeSelector.events.start, function(e) {
                        if (!self._enabled || !isLeftButtonPressed(e) || unselectedAreaProcessing)
                            return;
                        unselectedAreaProcessing = true;
                        isTouchEvent = isTouchEventArgs(e);
                        startPageX = getEventPageX(e)
                    });
                    $(document).on(rangeSelector.events.end, function(e) {
                        var pageX;
                        if (unselectedAreaProcessing) {
                            pageX = getEventPageX(e);
                            if (self._options.behavior.moveSelectedRangeByClick && Math.abs(startPageX - pageX) < MIN_MANUAL_SELECTING_WIDTH)
                                slidersController.applySelectedAreaCenterPosition(pageX - getRootOffsetLeft(self));
                            unselectedAreaProcessing = false;
                            processSelectionChanged(false)
                        }
                    });
                    $(document).on(rangeSelector.events.move, self.__areaMoveEventHandler = function(e) {
                        var pageX,
                            startPosition,
                            endPosition,
                            svgOffsetLeft = getRootOffsetLeft(self);
                        if (isTouchEvent !== isTouchEventArgs(e))
                            return;
                        if (unselectedAreaProcessing && !isLeftButtonPressed(e)) {
                            unselectedAreaProcessing = false;
                            processSelectionChanged(false)
                        }
                        if (unselectedAreaProcessing) {
                            pageX = getEventPageX(e);
                            if (self._options.behavior.manualRangeSelectionEnabled && Math.abs(startPageX - pageX) >= MIN_MANUAL_SELECTING_WIDTH) {
                                startPosition = startPageX - svgOffsetLeft;
                                endPosition = pageX - svgOffsetLeft;
                                slidersController.processManualSelection(startPosition, endPosition, e);
                                unselectedAreaProcessing = false;
                                processSelectionChanged(true)
                            }
                        }
                    })
                };
            rangeSelector.getRootOffsetLeft = getRootOffsetLeft;
            return {
                    ctor: function(renderer, slidersController, processSelectionChanged) {
                        this._renderer = renderer;
                        this._slidersController = slidersController;
                        this._processSelectionChanged = processSelectionChanged;
                        this._enabled = true
                    },
                    applyOptions: function(options) {
                        this._options = options
                    },
                    dispose: function() {
                        $(document).off(EVENT_NS)
                    },
                    initialize: function() {
                        var self = this;
                        if (!self._renderer.isInitialized())
                            return;
                        initializeSelectedAreaEvents(self);
                        initializeAreaEvents(self);
                        initializeSliderEvents(self, START_VALUE_INDEX);
                        initializeSliderEvents(self, END_VALUE_INDEX)
                    },
                    setEnabled: function(enabled) {
                        this._enabled = enabled
                    }
                }
        }())
    })(jQuery, DevExpress);
    /*! Module viz-rangeselector, file slider.js */
    (function($, DX, undefined) {
        var rangeSelector = DX.viz.rangeSelector,
            utils = DX.utils;
        var touchSupport = "ontouchstart" in window;
        var msPointerEnabled = window.navigator.msPointerEnabled || window.navigator.pointerEnabled;
        var animationOptions = {duration: 250};
        var SPLITTER_WIDTH = 8,
            TOUCH_SPLITTER_WIDTH = 20,
            START_VALUE_INDEX = 0,
            END_VALUE_INDEX = 1;
        rangeSelector.Slider = rangeSelector.BaseVisualElement.inherit(function() {
            return {
                    getText: function() {
                        if (this._marker)
                            return this._marker.getText()
                    },
                    getAvailableValues: function() {
                        return this._values
                    },
                    getShutter: function() {
                        return this._shutter
                    },
                    getMarker: function() {
                        return this._marker
                    },
                    _createSlider: function() {
                        var self = this,
                            sliderHandle,
                            sliderGroup,
                            sliderHandleOptions = self._options.sliderHandle;
                        sliderGroup = self._renderer.createGroup({'class': 'slider'});
                        sliderGroup.applySettings({
                            translateX: self._options.canvas.left,
                            translateY: self._options.canvas.top
                        });
                        sliderHandle = self._renderer.createLine(0, 0, 0, self._options.canvas.height, {
                            'class': 'dx-range-selector-slider',
                            strokeWidth: sliderHandleOptions.width,
                            stroke: sliderHandleOptions.color,
                            strokeOpacity: sliderHandleOptions.opacity
                        });
                        sliderHandle.append(sliderGroup);
                        sliderGroup.setValid = function(correct) {
                            sliderHandle.applySettings({stroke: correct ? self._options.sliderHandle.color : self._options.sliderMarker.invalidRangeColor})
                        };
                        sliderGroup.updateHeight = function() {
                            sliderHandle.applySettings({points: [0, 0, 0, self._options.canvas.height]})
                        };
                        sliderGroup.applyOptions = function(options) {
                            sliderHandle.applySettings(options)
                        };
                        sliderGroup.__line = sliderHandle;
                        return sliderGroup
                    },
                    _createSliderTracker: function() {
                        var self = this,
                            sliderHandleWidth = self._options.sliderHandle.width,
                            splitterWidth = SPLITTER_WIDTH < sliderHandleWidth ? sliderHandleWidth : SPLITTER_WIDTH,
                            sliderWidth = touchSupport || msPointerEnabled ? TOUCH_SPLITTER_WIDTH : splitterWidth,
                            sliderTracker,
                            sliderTrackerGroup;
                        sliderTracker = self._renderer.createRect(-sliderWidth / 2, 0, sliderWidth, self._options.canvas.height, 0, {
                            fill: 'grey',
                            stroke: 'grey',
                            opacity: 0.0001,
                            style: {cursor: 'w-resize'}
                        });
                        sliderTrackerGroup = self._renderer.createGroup({'class': 'sliderTracker'});
                        sliderTrackerGroup.applySettings({
                            translateX: 0,
                            translateY: self._options.canvas.top
                        });
                        sliderTracker.append(sliderTrackerGroup);
                        sliderTrackerGroup.updateHeight = function() {
                            sliderTracker.applySettings({height: self._options.canvas.height})
                        };
                        sliderTrackerGroup.__rect = sliderTracker;
                        return sliderTrackerGroup
                    },
                    _drawSliderTracker: function(group) {
                        var self = this,
                            sliderTracker = self._createSliderTracker();
                        if (sliderTracker) {
                            sliderTracker.append(group);
                            self._sliderTracker = sliderTracker
                        }
                    },
                    _createSliderMarker: function(options) {
                        return rangeSelector.rangeSelectorFactory.createSliderMarker(options)
                    },
                    _setPosition: function(position, correctByMinMaxRange) {
                        var self = this,
                            correctedPosition = self._correctPosition(position),
                            value = self._options.translator.untranslateX(correctedPosition);
                        self.setValue(value, correctByMinMaxRange, false);
                        self._position = correctedPosition
                    },
                    _setPositionForBothSliders: function(startPosition, interval) {
                        var self = this,
                            anotherSlider,
                            startValue,
                            endValue,
                            endPosition,
                            inverted = self._options.scale.inverted;
                        anotherSlider = self.getAnotherSlider();
                        startPosition = self._correctBounds(startPosition);
                        startValue = self._options.translator.untranslateX(startPosition);
                        endValue = utils.addInterval(startValue, interval);
                        if (!inverted && endValue > self._options.scale.endValue || inverted && endValue < self._options.scale.endValue) {
                            endValue = self._options.scale.endValue;
                            endPosition = self._options.canvas.left + self._options.canvas.width;
                            startValue = utils.addInterval(endValue, interval, true);
                            startPosition = self._options.translator.translateX(startValue)
                        }
                        else
                            endPosition = self._options.translator.translateX(endValue);
                        if (self._values)
                            if (!inverted ? startValue < self._values[0] : startValue > self._values[self._values.length - 1]) {
                                startValue = self._correctBusinessValueByAvailableValues(startValue, false);
                                endValue = utils.addInterval(startValue, interval)
                            }
                            else {
                                endValue = self._correctBusinessValueByAvailableValues(endValue, false);
                                startValue = utils.addInterval(endValue, interval, true)
                            }
                        anotherSlider.setValue(endValue, undefined, false);
                        self.setValue(startValue, undefined, false);
                        self._position = startPosition;
                        anotherSlider._position = endPosition
                    },
                    _correctPosition: function(position) {
                        var self = this,
                            correctedPosition = self._correctInversion(position);
                        correctedPosition = self._correctBounds(correctedPosition);
                        return correctedPosition
                    },
                    _correctInversion: function(position) {
                        var self = this,
                            correctedPosition = position,
                            anotherSliderPosition = self.getAnotherSlider().getPosition(),
                            slidersInverted = self.getIndex() === START_VALUE_INDEX ? position > anotherSliderPosition : position < anotherSliderPosition;
                        if (slidersInverted)
                            correctedPosition = anotherSliderPosition;
                        return correctedPosition
                    },
                    _correctBounds: function(position) {
                        var self = this,
                            correctedPosition = position,
                            canvas = self._options.canvas;
                        if (position < canvas.left)
                            correctedPosition = canvas.left;
                        if (position > canvas.left + canvas.width)
                            correctedPosition = canvas.left + canvas.width;
                        return correctedPosition
                    },
                    _correctBusinessValue: function(businessValue, correctByMinMaxRange, skipCorrection) {
                        var self = this,
                            result = self._correctBusinessValueByAvailableValues(businessValue, skipCorrection);
                        if (correctByMinMaxRange)
                            result = self._correctBusinessValueByMinMaxRangeFromAnotherSlider(result);
                        result = self._correctBusinessValueByMinRangeFromStartEndValues(result);
                        return result
                    },
                    _correctBusinessValueByAvailableValues: function(businessValue, skipCorrection) {
                        var values = this._values;
                        if (!skipCorrection && values)
                            return rangeSelector.utils.findNearValue(values, businessValue);
                        return businessValue
                    },
                    _correctBusinessValueByMinMaxRangeFromAnotherSlider: function(businessValue) {
                        var self = this,
                            result = businessValue,
                            scale = self._options.scale,
                            values = self._values,
                            sliderIndex = self.getIndex(),
                            anotherBusinessValue = self.getAnotherSlider().getValue(),
                            isValid = true,
                            minValue,
                            maxValue;
                        if (!scale.inverted && sliderIndex === START_VALUE_INDEX || scale.inverted && sliderIndex === END_VALUE_INDEX) {
                            if (scale.maxRange)
                                minValue = utils.addInterval(anotherBusinessValue, scale.maxRange, true);
                            if (scale.minRange)
                                maxValue = utils.addInterval(anotherBusinessValue, scale.minRange, true)
                        }
                        else {
                            if (scale.maxRange)
                                maxValue = utils.addInterval(anotherBusinessValue, scale.maxRange);
                            if (scale.minRange)
                                minValue = utils.addInterval(anotherBusinessValue, scale.minRange)
                        }
                        if (maxValue !== undefined && result > maxValue) {
                            result = values ? rangeSelector.utils.findLessOrEqualValue(values, maxValue) : maxValue;
                            isValid = false
                        }
                        else if (minValue !== undefined && result < minValue) {
                            result = values ? rangeSelector.utils.findGreaterOrEqualValue(values, minValue) : minValue;
                            isValid = false
                        }
                        self._setValid(isValid);
                        return result
                    },
                    _correctBusinessValueByMinRangeFromStartEndValues: function(businessValue) {
                        var self = this,
                            values = self._values,
                            startValue,
                            endValue,
                            isValid = true,
                            scale = self._options.scale,
                            result = businessValue;
                        if (scale.minRange)
                            if (self.getIndex() === END_VALUE_INDEX) {
                                startValue = utils.addInterval(scale.startValue, scale.minRange, scale.inverted);
                                if (!scale.inverted && result < startValue || scale.inverted && result > startValue)
                                    result = startValue
                            }
                            else if (self.getIndex() === START_VALUE_INDEX) {
                                endValue = utils.addInterval(scale.endValue, scale.minRange, !scale.inverted);
                                if (!scale.inverted && result > endValue || scale.inverted && result < endValue)
                                    result = endValue
                            }
                        return result
                    },
                    _applySliderPosition: function(position, disableAnimation) {
                        var self = this,
                            isAnimation = self._options.behavior.animationEnabled && !disableAnimation,
                            top = self._options.canvas.top,
                            slider = self._slider;
                        if (isAnimation || slider.inAnimation) {
                            slider.inAnimation = true;
                            slider.animate({translate: {
                                    x: position,
                                    y: top
                                }}, isAnimation ? animationOptions : {duration: 0}, function() {
                                slider.inAnimation = false
                            });
                            self._sliderTracker.animate({translate: {
                                    x: position,
                                    y: top
                                }}, isAnimation ? animationOptions : {duration: 0})
                        }
                        else {
                            self._slider.applySettings({
                                translateX: position,
                                translateY: top
                            });
                            self._sliderTracker.applySettings({
                                translateX: position,
                                translateY: top
                            })
                        }
                        self._sliderTracker.updateHeight();
                        self._slider.updateHeight()
                    },
                    _applyShutterPosition: function(position, disableAnimation) {
                        var self = this,
                            shutterSettings,
                            shutter = self._shutter,
                            isAnimation = self._options.behavior.animationEnabled && !disableAnimation,
                            sliderIndex = self.getIndex();
                        if (sliderIndex == START_VALUE_INDEX)
                            shutterSettings = {
                                x: self._options.canvas.left,
                                y: self._options.canvas.top,
                                width: position - self._options.canvas.left,
                                height: self._options.canvas.height
                            };
                        else if (sliderIndex == END_VALUE_INDEX)
                            shutterSettings = {
                                x: position + 1,
                                y: self._options.canvas.top,
                                width: self._options.canvas.left + self._options.canvas.width - position,
                                height: self._options.canvas.height
                            };
                        if (shutterSettings)
                            if (isAnimation || shutter.inAnimation) {
                                shutter.inAnimation = true;
                                shutter.animate(shutterSettings, isAnimation ? animationOptions : {duration: 0}, function() {
                                    shutter.inAnimation = false
                                })
                            }
                            else
                                shutter.applySettings(shutterSettings)
                    },
                    _setValid: function(isValid) {
                        var self = this;
                        if (self._marker)
                            self._marker.setValid(isValid);
                        self._slider.setValid(isValid)
                    },
                    _setText: function(text) {
                        var self = this;
                        if (self._marker)
                            self._marker.setText(text)
                    },
                    ctor: function(renderer, index) {
                        var self = this;
                        self.callBase(renderer);
                        self._index = index
                    },
                    getIndex: function() {
                        return this._index
                    },
                    setAvailableValues: function(values) {
                        this._values = values
                    },
                    setAnotherSlider: function(slider) {
                        this._anotherSlider = slider
                    },
                    getAnotherSlider: function(slider) {
                        return this._anotherSlider
                    },
                    appendTrackers: function(group) {
                        var self = this;
                        if (self._sliderTracker)
                            self._sliderTracker.append(group)
                    },
                    getSliderTracker: function() {
                        return this._sliderTracker
                    },
                    changeLocation: function() {
                        var self = this;
                        if (self._marker)
                            self._marker.changeLocation();
                        self._index = this._index === START_VALUE_INDEX ? END_VALUE_INDEX : START_VALUE_INDEX;
                        self._lastPosition = null
                    },
                    setPosition: function(position, correctByMinMaxRange, selectedRangeInterval) {
                        var self = this,
                            slider;
                        if (selectedRangeInterval !== undefined) {
                            slider = self.getIndex() === START_VALUE_INDEX ? self : self.getAnotherSlider();
                            slider._setPositionForBothSliders(position, selectedRangeInterval)
                        }
                        else
                            self._setPosition(position, correctByMinMaxRange)
                    },
                    getPosition: function() {
                        return this._position
                    },
                    _applyOptions: function(options) {
                        this._lastPosition = null
                    },
                    setValue: function(value, correctByMinMaxRange, skipCorrection) {
                        var self = this;
                        if (value === undefined) {
                            self._value = undefined;
                            self._valuePosition = self._position = self.getIndex() === START_VALUE_INDEX ? self._options.canvas.left : self._options.canvas.left + self._options.canvas.width;
                            self._setText(rangeSelector.consts.emptySliderMarkerText)
                        }
                        else {
                            self._value = self._correctBusinessValue(value, correctByMinMaxRange, utils.isDefined(skipCorrection) ? !!skipCorrection : true);
                            self._valuePosition = self._position = self._options.translator.translateX(self._value);
                            self._setText(rangeSelector.formatValue(self._value, self._options.sliderMarker))
                        }
                    },
                    getValue: function() {
                        return this._value
                    },
                    canSwap: function() {
                        var self = this,
                            scale = self._options.scale,
                            startValue,
                            endValue,
                            anotherSliderValue;
                        if (self._options.behavior.allowSlidersSwap) {
                            if (scale.minRange) {
                                anotherSliderValue = self.getAnotherSlider().getValue();
                                if (self.getIndex() === START_VALUE_INDEX) {
                                    endValue = utils.addInterval(scale.endValue, scale.minRange, !scale.inverted);
                                    if (!scale.inverted && anotherSliderValue > endValue || scale.inverted && anotherSliderValue < endValue)
                                        return false
                                }
                                else {
                                    startValue = utils.addInterval(scale.startValue, scale.minRange, scale.inverted);
                                    if (!scale.inverted && anotherSliderValue < startValue || scale.inverted && anotherSliderValue > startValue)
                                        return false
                                }
                            }
                            return true
                        }
                        return false
                    },
                    processDocking: function() {
                        var self = this;
                        self._position = self._valuePosition;
                        self.applyPosition(false);
                        self._setValid(true)
                    },
                    applyPosition: function(disableAnimation) {
                        var self = this,
                            position = self.getPosition();
                        if (self._lastPosition !== position) {
                            self._applySliderPosition(position, disableAnimation);
                            self._applyShutterPosition(position, disableAnimation);
                            self._lastPosition = position
                        }
                    },
                    on: function(event, handler) {
                        var self = this;
                        self._sliderTracker.on(event, handler);
                        if (self._marker)
                            self._marker.getTracker().on(event, handler)
                    },
                    _update: function() {
                        var self = this;
                        self._marker && self._marker.applyOptions(self._options.sliderMarker);
                        self._shutter && self._shutter.applySettings({
                            fill: self._options.shutter.color,
                            fillOpacity: self._options.shutter.opacity
                        });
                        self._slider && self._slider.applyOptions({
                            strokeWidth: self._options.sliderHandle.width,
                            stroke: self._options.sliderHandle.color,
                            strokeOpacity: self._options.sliderHandle.opacity
                        })
                    },
                    _draw: function(group) {
                        var self = this,
                            slider,
                            marker,
                            sliderAreaGroup,
                            shutter,
                            startPos,
                            startWidth,
                            index = self.getIndex();
                        sliderAreaGroup = self._renderer.createGroup({'class': 'sliderArea'});
                        sliderAreaGroup.append(group);
                        if (index === START_VALUE_INDEX)
                            shutter = self._renderer.createRect(self._options.canvas.left, self._options.canvas.top, 0, self._options.canvas.height, 0);
                        else if (index === END_VALUE_INDEX)
                            shutter = self._renderer.createRect(self._options.canvas.left, self._options.canvas.top, self._options.canvas.width, self._options.canvas.height, 0);
                        if (shutter) {
                            shutter.append(sliderAreaGroup);
                            slider = self._createSlider();
                            if (slider)
                                slider.append(sliderAreaGroup);
                            if (self._options.sliderMarker.visible) {
                                marker = self._createSliderMarker({
                                    renderer: self._renderer,
                                    isLeftPointer: index === END_VALUE_INDEX,
                                    sliderMarkerOptions: self._options.sliderMarker
                                });
                                marker.draw(slider)
                            }
                            self._shutter = shutter;
                            self._slider = slider;
                            self._marker = marker
                        }
                        self._drawSliderTracker(group)
                    }
                }
        }())
    })(jQuery, DevExpress);
    /*! Module viz-rangeselector, file sliderMarker.js */
    (function($, DX, undefined) {
        var rangeSelector = DX.viz.rangeSelector;
        rangeSelector.SliderMarker = DX.Class.inherit(function() {
            var ctor = function(options) {
                    this._renderer = options.renderer;
                    this._text = options.text;
                    this._isLeftPointer = options.isLeftPointer;
                    this._options = options.sliderMarkerOptions;
                    this._isValid = true;
                    initializeAreaPoints(this, {
                        width: 10,
                        height: 10
                    })
                };
            var applyOptions = function(options) {
                    this._options = options;
                    this.update()
                };
            var getRectSize = function(self, textSize) {
                    return {
                            width: Math.round(2 * self._options.padding + textSize.width),
                            height: Math.round(2 * self._options.padding + textSize.height * rangeSelector.consts.fontHeightRatio)
                        }
                };
            var initializeAreaPoints = function(self, textSize) {
                    var rectSize = getRectSize(self, textSize);
                    self._points = [];
                    if (self._isLeftPointer) {
                        self._points.push({
                            x: 0,
                            y: 0
                        });
                        self._points.push({
                            x: rectSize.width,
                            y: 0
                        });
                        self._points.push({
                            x: rectSize.width,
                            y: rectSize.height
                        });
                        self._points.push({
                            x: self._options.pointerSize,
                            y: rectSize.height
                        });
                        self._points.push({
                            x: 0,
                            y: rectSize.height + self._options.pointerSize
                        })
                    }
                    else {
                        self._points.push({
                            x: 0,
                            y: 0
                        });
                        self._points.push({
                            x: rectSize.width,
                            y: 0
                        });
                        self._points.push({
                            x: rectSize.width,
                            y: rectSize.height + self._options.pointerSize
                        });
                        self._points.push({
                            x: rectSize.width - self._options.pointerSize,
                            y: rectSize.height
                        });
                        self._points.push({
                            x: 0,
                            y: rectSize.height
                        })
                    }
                };
            var getPointerPosition = function(self, textSize) {
                    var rectSize = getRectSize(self, textSize);
                    if (self._isLeftPointer)
                        return {
                                x: 0,
                                y: rectSize.height + self._options.pointerSize
                            };
                    else
                        return {
                                x: rectSize.width - 1,
                                y: rectSize.height + self._options.pointerSize
                            }
                };
            var draw = function(group) {
                    var self = this;
                    var padding = self._options.padding;
                    self._sliderMarkerGroup = self._renderer.createGroup({'class': 'sliderMarker'});
                    self._sliderMarkerGroup.append(group);
                    self._area = self._renderer.createArea(self.points, {fill: self._options.color});
                    self._area.append(self._sliderMarkerGroup);
                    self._label = self._renderer.createText(self._text, padding, padding, {
                        font: self._options.font,
                        style: {'-webkit-user-select': 'none'}
                    });
                    self._label.append(self._sliderMarkerGroup);
                    self._tracker = self._renderer.createRect(0, 0, 2 * padding, 2 * padding + self._options.pointerSize, 0, {
                        fill: 'grey',
                        stroke: 'grey',
                        opacity: 0.0001,
                        style: {cursor: 'pointer'}
                    });
                    self._tracker.append(self._sliderMarkerGroup);
                    self._drawn = true;
                    self.update()
                };
            var getTextSize = function(self) {
                    var textSize = self._label.getBBox();
                    if (!self._textHeight && isFinite(textSize.height))
                        self._textHeight = textSize.height;
                    return {
                            width: textSize.width,
                            height: self._textHeight
                        }
                };
            var update = function(stop) {
                    var self = this,
                        textSize,
                        rectSize,
                        pointerPosition;
                    self._interval && clearInterval(self._interval);
                    delete self._interval;
                    if (!self._drawn)
                        return;
                    self._label.updateText(self._text);
                    textSize = getTextSize(self);
                    if (!stop) {
                        self._textSize = self._textSize || textSize;
                        self._textSize = textSize.width > self._textSize.width || textSize.height > self._textSize.height ? textSize : self._textSize;
                        textSize = self._textSize;
                        self._interval = setInterval(function() {
                            update.call(self, [true])
                        }, 75)
                    }
                    else {
                        delete self._textSize;
                        self._textSize = textSize
                    }
                    rectSize = getRectSize(self, textSize);
                    pointerPosition = getPointerPosition(self, textSize);
                    self._sliderMarkerGroup.applySettings({
                        translateX: -pointerPosition.x,
                        translateY: -pointerPosition.y
                    });
                    initializeAreaPoints(self, textSize);
                    self._area.applySettings({
                        points: self._points,
                        fill: self._isValid ? self._options.color : self._options.invalidRangeColor
                    });
                    self._tracker.applySettings({
                        width: rectSize.width,
                        height: rectSize.height + self._options.pointerSize
                    });
                    self._label.applySettings({
                        x: self._options.padding,
                        y: rectSize.height - self._options.padding
                    })
                };
            var getText = function() {
                    var self = this;
                    return self._text
                };
            var setText = function(value) {
                    var self = this;
                    if (self._text !== value) {
                        self._text = value;
                        self.update()
                    }
                };
            var setValid = function(isValid) {
                    var self = this;
                    self._isValid = isValid;
                    self.update()
                };
            var changeLocation = function() {
                    var self = this;
                    self._isLeftPointer = !self._isLeftPointer;
                    self.update()
                };
            var getTracker = function() {
                    var self = this;
                    return self._tracker
                };
            return {
                    ctor: ctor,
                    draw: draw,
                    update: update,
                    getText: getText,
                    setText: setText,
                    changeLocation: changeLocation,
                    applyOptions: applyOptions,
                    getTracker: getTracker,
                    setValid: setValid
                }
        }())
    })(jQuery, DevExpress);
    /*! Module viz-rangeselector, file rangeView.js */
    (function($, DX, undefined) {
        var rangeSelector = DX.viz.rangeSelector;
        rangeSelector.RangeView = rangeSelector.BaseVisualElement.inherit(function() {
            var createThemeManager = function(self) {
                    return DX.viz.charts.factory.createThemeManager(self.chart.theme)
                };
            return {_draw: function(group) {
                        var self = this,
                            viewRect,
                            viewImage,
                            backgroundColor,
                            series,
                            i,
                            showChart,
                            canvas,
                            options = self._options,
                            isEmpty = options.isEmpty;
                        showChart = options.seriesDataSource && options.seriesDataSource.isShowChart() && !isEmpty;
                        canvas = options.canvas;
                        if (showChart)
                            backgroundColor = options.seriesDataSource.getBackgroundColor();
                        else if (!isEmpty && options.background.visible)
                            backgroundColor = options.background.color;
                        if (options.background.visible && backgroundColor) {
                            viewRect = self._renderer.createRect(canvas.left, canvas.top, canvas.width + 1, canvas.height, 0, {
                                fill: backgroundColor,
                                'class': 'dx-range-selector-background'
                            });
                            viewRect.append(group)
                        }
                        if (options.background.visible && options.background.image && options.background.image.url) {
                            viewImage = self._renderer.createImage(canvas.left, canvas.top, canvas.width + 1, canvas.height, options.background.image.url, {location: options.background.image.location});
                            viewImage.append(group)
                        }
                        if (showChart) {
                            series = options.seriesDataSource.getSeries();
                            options.seriesDataSource.adjustSeriesDimensions(options.translator, options.chart.useAggregation);
                            for (i = 0; i < series.length; i++) {
                                series[i].options.seriesGroup = group;
                                series[i].options.seriesLabelsGroup = group;
                                series[i].options.trackerGroup = group;
                                series[i].draw(options.translator, options.behavior && options.behavior.animationEnabled && self._renderer.animationEnabled())
                            }
                        }
                    }}
        }())
    })(jQuery, DevExpress);
    /*! Module viz-rangeselector, file seriesDataSource.js */
    (function($, DX, undefined) {
        var rangeSelector = DX.viz.rangeSelector,
            charts = DX.viz.charts,
            utils = DX.utils;
        rangeSelector.SeriesDataSource = DX.Class.inherit(function() {
            var createThemeManager = function(chartOptions) {
                    return charts.factory.createThemeManager(chartOptions, 'rangeSelector.chart')
                };
            var isArrayOfSimpleTypes = function(data) {
                    return $.isArray(data) && data.length > 0 && (utils.isNumber(data[0]) || utils.isDate(data[0]))
                };
            var convertToArrayOfObjects = function(data) {
                    return $.map(data, function(item, i) {
                            return {
                                    arg: item,
                                    val: i
                                }
                        })
                };
            var calculateSeries = function(self, options) {
                    var series = [],
                        particularSeriesOptions,
                        seriesTheme,
                        data,
                        parsedData,
                        temp,
                        chartThemeManager = createThemeManager(options.chart),
                        allSeriesOptions = options.chart.series,
                        seriesValueType = options.chart.valueAxis && options.chart.valueAxis.valueType,
                        dataSourceField,
                        chartOptions,
                        i,
                        commonSeriesSettings;
                    if (options.dataSource && !allSeriesOptions) {
                        if (isArrayOfSimpleTypes(options.dataSource))
                            options.dataSource = convertToArrayOfObjects(options.dataSource);
                        dataSourceField = options.dataSourceField || 'arg';
                        allSeriesOptions = {
                            argumentField: dataSourceField,
                            valueField: dataSourceField
                        };
                        self._hideChart = true
                    }
                    allSeriesOptions = $.isArray(allSeriesOptions) ? allSeriesOptions : allSeriesOptions ? [allSeriesOptions] : [];
                    chartOptions = $.extend(true, {}, chartThemeManager.theme(), options.chart);
                    $.extend(chartOptions.commonSeriesSettings, {
                        argumentType: options.valueType,
                        valueType: dataSourceField ? options.valueType : seriesValueType,
                        incidentOccured: options.incidentOccured
                    });
                    commonSeriesSettings = chartOptions.commonSeriesSettings;
                    self._backgroundColor = options.backgroundColor !== undefined ? options.backgroundColor : chartOptions.backgroundColor;
                    for (i = 0; i < allSeriesOptions.length; i++) {
                        particularSeriesOptions = allSeriesOptions[i];
                        particularSeriesOptions.rotated = false;
                        particularSeriesOptions.argumentField = particularSeriesOptions.argumentField || commonSeriesSettings.argumentField || options.dataSourceField;
                        data = options.dataSource;
                        seriesTheme = chartThemeManager.applyNextSeriesTheme(particularSeriesOptions, commonSeriesSettings);
                        if (data && data.length > 0) {
                            var newSeries = charts.factory.createSeries(particularSeriesOptions.type || commonSeriesSettings.type, options.renderer, seriesTheme);
                            newSeries._suppressTrackers = true;
                            series.push(newSeries)
                        }
                    }
                    self._dataValidator = charts.factory.createDataValidator(data, [series], options.incidentOccured, chartOptions.dataPrepareSettings);
                    parsedData = self._dataValidator.validate();
                    for (i = 0; i < series.length; i++) {
                        var particularSeries = series[i];
                        particularSeries.reinitData(parsedData)
                    }
                    return series
                };
            var processSeriesFamilies = function(series, equalBarWidth) {
                    var families = [],
                        types = [];
                    $.each(series, function(i, item) {
                        if ($.inArray(item.type, types) === -1)
                            types.push(item.type)
                    });
                    $.each(types, function(_, type) {
                        var family = new charts.factory.createSeriesFamily({
                                type: type,
                                equalBarWidth: equalBarWidth
                            });
                        family.add(series);
                        family.adjustSeriesValues();
                        families.push(family)
                    });
                    return families
                };
            var prototypeObject = {
                    ctor: function(options) {
                        var self = this;
                        self._indent = {
                            top: options.chart.topIndent >= 0 && options.chart.topIndent < 1 ? options.chart.topIndent : 0,
                            bottom: options.chart.bottomIndent >= 0 && options.chart.bottomIndent < 1 ? options.chart.bottomIndent : 0
                        };
                        self._valueAxis = options.chart.valueAxis || {};
                        self._hideChart = false;
                        self._series = calculateSeries(self, options);
                        self._seriesFamilies = processSeriesFamilies(self._series, options.chart.equalBarWidth)
                    },
                    adjustSeriesDimensions: function(translator, useAggregation) {
                        var self = this;
                        if (useAggregation)
                            $.each(self._series || [], function(_, s) {
                                s.resamplePoints(translator)
                            });
                        $.each(self._seriesFamilies, function() {
                            this.adjustSeriesDimensions(translator)
                        })
                    },
                    getBoundRange: function() {
                        var self = this,
                            seriesElement,
                            rangeData,
                            valueAxisMin = self._valueAxis.min,
                            valueAxisMax = self._valueAxis.max,
                            range = new charts.Range({
                                minY: valueAxisMin,
                                minVisibleY: valueAxisMin,
                                maxY: valueAxisMax,
                                maxVisibleY: valueAxisMax
                            }),
                            rangeYSize,
                            rangeVisibleSizeY,
                            i,
                            minIndent,
                            maxIndent;
                        for (i = 0; i < self._series.length; i++) {
                            rangeData = self._series[i].getRangeData();
                            range = range.addRange(rangeData)
                        }
                        if (range.isDefined()) {
                            minIndent = self._valueAxis.inverted ? self._indent.top : self._indent.bottom;
                            maxIndent = self._valueAxis.inverted ? self._indent.bottom : self._indent.top;
                            rangeYSize = range.maxY - range.minY;
                            rangeVisibleSizeY = ($.isNumeric(range.maxVisibleY) ? range.maxVisibleY : range.maxY) - ($.isNumeric(range.minVisibleY) ? range.minVisibleY : range.minY);
                            if (utils.isDate(range.minY))
                                range.minY = new Date(range.minY.valueOf() - rangeYSize * minIndent);
                            else
                                range.minY -= rangeYSize * minIndent;
                            if (utils.isDate(range.maxY))
                                range.maxY = new Date(range.maxY.valueOf() + rangeYSize * maxIndent);
                            else
                                range.maxY += rangeYSize * maxIndent;
                            if ($.isNumeric(rangeVisibleSizeY)) {
                                range.maxVisibleY = range.maxVisibleY ? range.maxVisibleY + rangeVisibleSizeY * maxIndent : undefined;
                                range.minVisibleY = range.minVisibleY ? range.minVisibleY - rangeVisibleSizeY * minIndent : undefined
                            }
                            range.invertY = self._valueAxis.inverted;
                            range.applyEqualLimitsMargins()
                        }
                        return range
                    },
                    getSeries: function() {
                        var self = this;
                        return self._series
                    },
                    getBackgroundColor: function() {
                        var self = this;
                        return self._backgroundColor
                    },
                    isEmpty: function() {
                        var self = this;
                        return self.getSeries().length === 0
                    },
                    isShowChart: function() {
                        var self = this;
                        return !self.isEmpty() && !self._hideChart
                    },
                    getCalculatedValueType: function() {
                        var self = this,
                            result;
                        if (self._series.length)
                            result = self._series[0].options.argumentType;
                        return result
                    }
                };
            return prototypeObject
        }())
    })(jQuery, DevExpress);
    /*! Module viz-rangeselector, file utils.js */
    (function($, DX, undefined) {
        var rangeSelector = DX.viz.rangeSelector,
            utils = rangeSelector.utils,
            dxUtils = DX.utils;
        var INVISIBLE_POS = -1000;
        var findLessOrEqualValueIndex = function(values, value) {
                if (!values || values.length === 0)
                    return -1;
                var minIndex = 0,
                    maxIndex = values.length - 1,
                    index = 0;
                while (maxIndex - minIndex > 1) {
                    var index = minIndex + maxIndex >> 1;
                    if (values[index] > value)
                        maxIndex = index;
                    else
                        minIndex = index
                }
                return values[maxIndex] <= value ? maxIndex : minIndex
            };
        var findLessOrEqualValue = function(values, value) {
                var index = findLessOrEqualValueIndex(values, value);
                if (values && index >= 0 && index < values.length)
                    return values[index];
                return value
            };
        var findNearValue = function(values, value) {
                var index = findLessOrEqualValueIndex(values, value);
                if (values && index >= 0 && index < values.length) {
                    if (index + 1 < values.length)
                        if (dxUtils.isDate(value)) {
                            if (values[index + 1].getTime() - value.getTime() < value.getTime() - values[index].getTime())
                                index++
                        }
                        else if (values[index + 1] - value < value - values[index])
                            index++;
                    return values[index]
                }
                return value
            };
        var findGreaterOrEqualValue = function(values, value) {
                var index = findLessOrEqualValueIndex(values, value);
                if (values && index >= 0 && index < values.length) {
                    if (values[index] < value && index + 1 < values.length)
                        index++;
                    return values[index]
                }
                return value
            };
        var getInterval = function(valueMin, valueMax, delta) {
                var result,
                    minDateDaysCount,
                    maxDateDaysCount,
                    daysCount,
                    prevMaxDaysCount;
                if (dxUtils.isDate(valueMin)) {
                    if (delta === 'year' || delta === 'quarter' || delta === 'month')
                        return {months: valueMax.getFullYear() * 12 + valueMax.getMonth() - valueMin.getFullYear() * 12 - valueMin.getMonth()};
                    else
                        return {milliseconds: valueMax.valueOf() - valueMin.valueOf()};
                    return result
                }
                else
                    return valueMax - valueMin
            };
        var getRootOffsetLeft = function(renderer) {
                return dxUtils.getRootOffset(renderer).left || 0
            };
        var getEventPageX = function(eventArgs) {
                var result = 0;
                if (eventArgs.pageX)
                    result = eventArgs.pageX;
                else if (eventArgs.originalEvent && eventArgs.originalEvent.pageX)
                    result = eventArgs.originalEvent.pageX;
                if (eventArgs.originalEvent && eventArgs.originalEvent.touches)
                    if (eventArgs.originalEvent.touches.length > 0)
                        result = eventArgs.originalEvent.touches[0].pageX;
                    else if (eventArgs.originalEvent.changedTouches.length > 0)
                        result = eventArgs.originalEvent.changedTouches[0].pageX;
                return result
            };
        var getTextBBox = function(renderer, text, fontOptions) {
                var textElement = renderer.createText(text, INVISIBLE_POS, INVISIBLE_POS, {font: fontOptions}).append();
                var textBBox = textElement.getBBox();
                textElement.remove();
                return textBBox
            };
        utils.findLessOrEqualValue = findLessOrEqualValue;
        utils.findNearValue = findNearValue;
        utils.findGreaterOrEqualValue = findGreaterOrEqualValue;
        utils.getInterval = getInterval;
        utils.getRootOffsetLeft = getRootOffsetLeft;
        utils.getEventPageX = getEventPageX;
        utils.getTextBBox = getTextBBox
    })(jQuery, DevExpress);
    /*! Module viz-rangeselector, file themeManager.js */
    (function($, DX, undefined) {
        DX.viz.rangeSelector = DX.viz.rangeSelector;
        DX.viz.rangeSelector.ThemeManager = DX.viz.core.BaseThemeManager.inherit({
            _themeSection: 'rangeSelector',
            ctor: function(userTheme) {
                this.setTheme(userTheme)
            },
            _initializeTheme: function() {
                this._initializeFont(this._theme.scale.label.font);
                this._initializeFont(this._theme.sliderMarker.font);
                this._initializeFont(this._theme.loadingIndicator.font)
            },
            applyRangeSelectorTheme: function(userOptions) {
                var self = this,
                    refs = {dataSource: userOptions.dataSource},
                    result;
                delete userOptions.dataSource;
                result = $.extend(true, {}, self._theme, userOptions);
                result.dataSource = refs.dataSource;
                return result
            },
            setBackgroundColor: function(containerBackgroundColor) {
                var theme = this._theme;
                if (containerBackgroundColor)
                    theme.containerBackgroundColor = containerBackgroundColor;
                theme.shutter.color = theme.shutter.color || theme.containerBackgroundColor
            }
        })
    })(jQuery, DevExpress);
    /*! Module viz-rangeselector, file dxRangeSelector.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            viz = DX.viz;
        ui.registerComponent("dxRangeSelector", viz.rangeSelector.RangeSelector)
    })(jQuery, DevExpress);
    DevExpress.MOD_VIZ_RANGESELECTOR = true
}