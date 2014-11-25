/*! 
* DevExpress Visualization Sparklines (part of ChartJS)
* Version: 13.2.8
* Build date: Mar 11, 2014
*
* Copyright (c) 2012 - 2014 Developer Express Inc. ALL RIGHTS RESERVED
* EULA: http://chartjs.devexpress.com/EULA
*/

"use strict";
if (!DevExpress.MOD_VIZ_SPARKLINES) {
    if (!window.DevExpress)
        throw Error('Required module is not referenced: core');
    if (!DevExpress.MOD_VIZ_CORE)
        throw Error('Required module is not referenced: viz-core');
    /*! Module viz-sparklines, file baseSparkline.js */
    (function($, DX) {
        var charts = DX.viz.charts,
            TOOLTIP_MARGIN = 100,
            TOOLTIP_ARROW_MARGIN = 10,
            DEFAULT_LINE_SPACING = 6,
            DEFAULT_EVENTS_DELAY = 200,
            TOUCH_EVENTS_DELAY = 1000,
            _math = Math,
            _extend = $.extend,
            _abs = _math.abs,
            _String = String,
            _Number = Number,
            _round = _math.round,
            core = DX.viz.core;
        DX.viz.sparklines = {};
        DX.viz.sparklines.BaseSparkline = DX.ui.Component.inherit({
            render: function() {
                this._refresh();
                return this
            },
            _rendererType: DX.viz.renderers.Renderer,
            _clean: function() {
                if (this._tooltipShown) {
                    this._tooltip.dispose();
                    this._tooltip = null;
                    this._tooltipShown = null;
                    this._tooltipGroup.clear()
                }
                this._tooltipContainer.detach();
                this._cleanWidgetElements()
            },
            _optionChanged: function(optionName, value) {
                if (optionName === 'size' && this._allOptions) {
                    this._clean();
                    this._canvas = this._calculateCanvas();
                    this._renderer.resize(this._canvas.width, this._canvas.height);
                    if (!this._isContainerVisible())
                        return;
                    this._allOptions.size = value;
                    this._redrawWidgetElements();
                    this._prepareTooltipContainer()
                }
                else if (optionName === 'dataSource')
                    this._refreshDataSource();
                else {
                    this._invalidate();
                    this.callBase.apply(this, arguments)
                }
            },
            _init: function() {
                this._renderer = new this._rendererType({cssClass: this._widgetClass + ' ' + this._widgetClass + '-' + this._widgetType});
                this._renderer.recreateCanvas(1, 1);
                this._createHtmlElements();
                this._createTooltipGroups();
                this._initTooltipEvents();
                this._drawContainer()
            },
            _dispose: function() {
                this.callBase();
                this._disposeWidgetElements();
                this._disposeTooltipEvents();
                this._renderer.killContainer();
                this._tooltipRenderer.killContainer();
                delete this._renderer;
                delete this._tooltipRenderer;
                delete this._tooltipTrackerGroup;
                delete this._tooltipGroup;
                delete this._tooltipContainer
            },
            _render: function() {
                this._canvas = this._calculateCanvas();
                this._renderer.resize(this._canvas.width, this._canvas.height);
                if (!this._isContainerVisible())
                    return;
                this._prepareOptions();
                this._createWidgetElements();
                this._drawWidgetElements()
            },
            _isContainerVisible: function() {
                var _this = this,
                    canvas = _this._canvas,
                    enoughWidth = canvas.width - canvas.left - canvas.right > 0,
                    enoughHeight = canvas.height - canvas.top - canvas.bottom > 0;
                return canvas.height && canvas.width && enoughHeight && enoughWidth
            },
            _createWidgetElements: function() {
                this._createRange();
                this._createTranslator()
            },
            _prepareOptions: function(defaultOptions) {
                var _this = this,
                    userOptions = _this.option() || {},
                    options,
                    defaultTheme,
                    theme;
                defaultTheme = core.findTheme('default');
                defaultTheme = defaultTheme[this._widgetType];
                options = _extend(true, {}, defaultOptions, userOptions);
                if (typeof options.theme === 'string') {
                    theme = core.findTheme(options.theme);
                    theme = theme[this._widgetType]
                }
                else
                    theme = options.theme;
                return _extend(true, {}, defaultTheme, theme, options)
            },
            _calculateCanvas: function() {
                var _this = this,
                    canvas = {},
                    sizeOptions = _this.option('size') || {},
                    marginOptions = _this.option('margin') || {},
                    defaultSize = _this._defaultSize,
                    container = _this._element(),
                    width = sizeOptions.width >= 0 ? _Number(sizeOptions.width) : container.width(),
                    height = sizeOptions.height >= 0 ? _Number(sizeOptions.height) : container.height();
                if (!width && _Number(sizeOptions.width) !== 0)
                    width = defaultSize.width;
                if (!height && _Number(sizeOptions.height) !== 0)
                    height = defaultSize.height;
                return {
                        width: width,
                        height: height,
                        top: _Number(marginOptions.top) || defaultSize.top,
                        bottom: _Number(marginOptions.bottom) || defaultSize.bottom,
                        left: _Number(marginOptions.left) || defaultSize.left,
                        right: _Number(marginOptions.right) || defaultSize.right
                    }
            },
            _createTooltipGroups: function() {
                var _this = this,
                    renderer,
                    root,
                    widgetClass = _this._widgetClass;
                _this._tooltipRenderer = renderer = new _this._rendererType({cssClass: widgetClass + ' ' + widgetClass + '-tooltip'});
                renderer.recreateCanvas(1, 1);
                _this._tooltipContainer = $('<div style="position: relative">');
                renderer.draw(_this._tooltipContainer[0]);
                root = renderer.getRoot();
                _this._tooltipGroup = renderer.createGroup({
                    'class': widgetClass + '-tooltip-group',
                    style: {'z-index': '1'}
                }).append(root);
                _this._tooltipTrackerGroup = renderer.createGroup({'class': widgetClass + '-tooltip-tracker-group'}).append(root);
                _this._tooltipTracker = _this._createTooltipTracker().append(_this._tooltipTrackerGroup)
            },
            _createTooltipTracker: function() {
                return this._tooltipRenderer.createRect(0, 0, 0, 0, 0, {
                        fill: 'grey',
                        opacity: 0
                    })
            },
            _initTooltipEvents: function() {
                var _this = this,
                    data = {
                        widget: _this,
                        container: _this._tooltipTracker
                    };
                _this._showTooltipCallback = function() {
                    _this._showTooltipTimeout = null;
                    if (!_this._tooltipShown) {
                        _this._tooltipShown = true;
                        _this._showTooltip()
                    }
                    _this._DEBUG_showCallback && _this._DEBUG_showCallback()
                };
                _this._hideTooltipCallback = function() {
                    _this._hideTooltipTimeout = null;
                    if (_this._tooltipShown) {
                        _this._tooltipShown = false;
                        _this._hideTooltip()
                    }
                    _this._DEBUG_hideCallback && _this._DEBUG_hideCallback()
                };
                _this._disposeCallbacks = function() {
                    _this = _this._showTooltipCallback = _this._hideTooltipCallback = _this._disposeCallbacks = null
                };
                _this._tooltipTracker.on(mouseEvents, data).on(touchEvents, data);
                _this._tooltipTracker.on(menuEvents)
            },
            _disposeTooltipEvents: function() {
                clearTimeout(this._showTooltipTimeout);
                clearTimeout(this._hideTooltipTimeout);
                this._showTooltipTimeout = this._showTooltipTimeout = null;
                this._tooltipTracker.off();
                this._disposeCallbacks()
            },
            _drawContainer: function() {
                this._renderer.draw(this._element()[0])
            },
            _createTranslator: function() {
                this._translator = new core.Translator2D(this._range, this._canvas)
            },
            _prepareTooltipOptions: function() {
                var _this = this,
                    canvas = _this._canvas,
                    tooltipOpt = _this._allOptions.tooltip,
                    text = _this._getTooltipText(),
                    size = _this._getTooltipSize(true),
                    defaultOptions = {
                        canvasWidth: size.width,
                        canvasHeight: size.height,
                        paddingLeftRight: tooltipOpt.paddingLeftRight,
                        paddingTopBottom: tooltipOpt.paddingTopBottom,
                        arrowLength: tooltipOpt.arrowLength,
                        cloudHorizontalPosition: tooltipOpt.horizontalAlignment,
                        cloudVerticalPosition: tooltipOpt.verticalAlignment,
                        lineSpacing: tooltipOpt.font.lineSpacing !== undefined && tooltipOpt.font.lineSpacing !== null ? tooltipOpt.font.lineSpacing : DEFAULT_LINE_SPACING
                    },
                    options = $.extend(defaultOptions, _this._allOptions.tooltip);
                _this._tooltipOptions = {
                    text: text,
                    size: size,
                    options: options
                }
            },
            _getTooltipText: function() {
                var _this = this,
                    customizeText = _this._allOptions.tooltip.customizeText,
                    customizeObject = _this._getTooltipData(),
                    generatedText,
                    text;
                if (typeof customizeText === 'function') {
                    text = customizeText.call(customizeObject, customizeObject);
                    if (text !== undefined && text !== null && text !== '')
                        generatedText = _String(text);
                    else
                        generatedText = null;
                    if (_this._allOptions.tooltip._justify)
                        generatedText = generatedText.split('<br/>')
                }
                else {
                    generatedText = this._getDefaultTooltipText(customizeObject);
                    _this._allOptions.tooltip._justify = true
                }
                return generatedText
            },
            _prepareTooltipContainer: function() {
                var _this = this,
                    canvas = _this._canvas,
                    width = canvas.width,
                    height = canvas.height,
                    renderer = _this._tooltipRenderer;
                _this._updateTooltipSizeToNormal();
                _this._tooltipTracker.applySettings({
                    width: width,
                    height: height
                });
                _this._tooltipContainer.appendTo(_this._element());
                _this._tooltipInitializated = false;
                _this._canShowTooltip = _this._allOptions.tooltip.enabled
            },
            _isTooltipVisible: function() {
                var _this = this,
                    tooltipEnabled = _this._allOptions.tooltip.enabled,
                    tooltipNotEmpty = _this._tooltipOptions.text !== null,
                    dataSourceNotEmpty;
                if (_this._widgetType === 'sparkline')
                    dataSourceNotEmpty = _this._dataSource.length !== 0;
                else
                    dataSourceNotEmpty = true;
                return tooltipEnabled && tooltipNotEmpty && dataSourceNotEmpty
            },
            _createTooltip: function() {
                var _this = this,
                    justify,
                    tooltipType,
                    tooltip;
                _this._prepareTooltipOptions();
                justify = _this._allOptions.tooltip._justify;
                tooltipType = justify ? DX.viz.sparklines.SparklineTooltip : charts.Tooltip;
                _this._tooltip = tooltip = new tooltipType({renderer: _this._tooltipRenderer}, _this._tooltipGroup);
                if (_this._isTooltipVisible()) {
                    tooltip.update(_this._tooltipOptions.options);
                    tooltip.draw();
                    _this._updateTooltipSizeToWide();
                    _this._checkTooltipSize();
                    _this._updateTooltipSizeToNormal();
                    tooltip.cloud.applySettings({opacity: _this._allOptions.tooltip.opacity})
                }
                else
                    _this._canShowTooltip = false
            },
            _doShowTooltip: function(delay) {
                var _this = this;
                if (!_this._canShowTooltip)
                    return;
                ++_this._DEBUG_clearHideTooltipTimeout;
                clearTimeout(_this._hideTooltipTimeout);
                _this._hideTooltipTimeout = null;
                clearTimeout(_this._showTooltipTimeout);
                ++_this._DEBUG_showTooltipTimeoutSet;
                _this._showTooltipTimeout = setTimeout(_this._showTooltipCallback, delay)
            },
            _doHideTooltip: function(delay) {
                var _this = this;
                if (!_this._canShowTooltip)
                    return;
                ++_this._DEBUG_clearShowTooltipTimeout;
                clearTimeout(_this._showTooltipTimeout);
                _this._showTooltipTimeout = null;
                clearTimeout(_this._hideTooltipTimeout);
                ++_this._DEBUG_hideTooltipTimeoutSet;
                _this._hideTooltipTimeout = setTimeout(_this._hideTooltipCallback, delay)
            },
            _getNormalTooltipSize: function() {
                var size = {};
                size.width = this._canvas.width;
                size.left = 0;
                size.tooltipLeft = _round(size.width / 2);
                return size
            },
            _getWideTooltipSize: function(leftWidthDelta, rightWidthDelta) {
                var _this = this,
                    canvas = _this._canvas,
                    horizontalPos = _this._allOptions.tooltip.horizontalAlignment,
                    widthDelta = leftWidthDelta + rightWidthDelta,
                    size = {};
                size.width = canvas.width + widthDelta;
                size.left = -leftWidthDelta;
                if (horizontalPos === 'right')
                    size.tooltipLeft = _round(canvas.width / 2);
                else if (horizontalPos === 'left')
                    size.tooltipLeft = _round(canvas.width / 2) + widthDelta;
                else
                    size.tooltipLeft = _round(size.width / 2);
                return size
            },
            _getTooltipSize: function(isNormal, leftWidthDelta, rightWidthDelta, heightDelta) {
                var _this = this,
                    canvas = _this._canvas,
                    isVerticalPosTop = !(_this._allOptions.tooltip.verticalAlignment === 'bottom'),
                    size = !isNormal && (leftWidthDelta || rightWidthDelta) ? _this._getWideTooltipSize(leftWidthDelta, rightWidthDelta) : _this._getNormalTooltipSize(),
                    yDelta = heightDelta > 0 ? heightDelta + TOOLTIP_MARGIN : TOOLTIP_MARGIN;
                size.height = canvas.height + yDelta;
                size.top = isVerticalPosTop ? -size.height : -canvas.height;
                size.trackerY = isVerticalPosTop ? yDelta : 0;
                size.tooltipY = isVerticalPosTop ? _round(canvas.height / 2) + yDelta - TOOLTIP_ARROW_MARGIN : _round(canvas.height / 2);
                return size
            },
            _checkTooltipSize: function() {
                var _this = this,
                    options = _this._tooltipOptions.options,
                    paddingLeftRight = options.paddingLeftRight,
                    paddingTopBottom = options.paddingTopBottom,
                    tooltipBBox = _this._tooltip.text.getBBox(),
                    tooltipLeftX = tooltipBBox.x - paddingLeftRight,
                    tooltipRightX = tooltipLeftX + tooltipBBox.width + 2 * paddingLeftRight,
                    tooltipHeight = tooltipBBox.height + 2 * paddingTopBottom,
                    getWide = _this._allOptions.tooltip.allowContainerResizing,
                    leftDelta = -tooltipLeftX,
                    rightDelta = tooltipRightX - _this._canvas.width,
                    topDelta = tooltipHeight - TOOLTIP_MARGIN,
                    size;
                if (leftDelta > 0 || rightDelta > 0 || topDelta > 0)
                    if (getWide) {
                        _this._tooltipOptions.size = size = _this._getTooltipSize(false, leftDelta > 0 ? leftDelta : 0, rightDelta > 0 ? rightDelta : 0, topDelta > 0 ? topDelta : 0);
                        _this._tooltipOptions.options.canvasWidth = size.width;
                        _this._tooltipOptions.options.canvasHeight = size.height;
                        _this._tooltip.update(_this._tooltipOptions.options);
                        _this._updateTooltipSizeToWide()
                    }
                    else
                        _this._canShowTooltip = false
            },
            _updateTooltipSizeToWide: function() {
                var _this = this,
                    size = _this._tooltipOptions.size,
                    renderer = _this._tooltipRenderer;
                renderer.resize(size.width, size.height);
                renderer.getRoot().applySettings({style: {
                        left: size.left,
                        top: size.top,
                        position: 'absolute',
                        overflow: 'hidden'
                    }});
                _this._tooltipTracker.applySettings({
                    y: size.trackerY,
                    x: -size.left
                });
                _this._tooltip.move(size.tooltipLeft, size.tooltipY, 0, _this._tooltipOptions.text)
            },
            _updateTooltipSizeToNormal: function() {
                var _this = this,
                    renderer = _this._tooltipRenderer,
                    canvas = _this._canvas;
                renderer.resize(canvas.width, canvas.height);
                renderer.getRoot().applySettings({style: {
                        left: 0,
                        top: -canvas.height,
                        position: 'absolute'
                    }});
                _this._tooltipTracker.applySettings({
                    y: 0,
                    x: 0
                })
            },
            _showTooltip: function() {
                if (!this._tooltipInitializated) {
                    this._createTooltip();
                    this._tooltipInitializated = true;
                    if (!this._canShowTooltip)
                        return
                }
                this._updateTooltipSizeToWide();
                this._tooltip.show()
            },
            _hideTooltip: function() {
                this._updateTooltipSizeToNormal();
                this._tooltip.hide()
            }
        }).include(core.widgetMarkupMixin);
        var menuEvents = {
                'contextmenu.sparkline-tooltip': function(event) {
                    if (DX.ui.events.isTouchEvent(event) || DX.ui.events.isPointerEvent(event))
                        event.preventDefault()
                },
                'MSHoldVisual.sparkline-tooltip': function(event) {
                    event.preventDefault()
                }
            };
        var mouseEvents = {
                'mouseover.sparkline-tooltip': function(event) {
                    isPointerDownCalled = false;
                    var widget = event.data.widget;
                    widget._x = event.pageX;
                    widget._y = event.pageY;
                    widget._tooltipTracker.off(mouseMoveEvents).on(mouseMoveEvents, event.data);
                    widget._doShowTooltip(DEFAULT_EVENTS_DELAY)
                },
                'mouseout.sparkline-tooltip': function(event) {
                    if (isPointerDownCalled)
                        return;
                    var widget = event.data.widget;
                    widget._tooltipTracker.off(mouseMoveEvents);
                    widget._doHideTooltip(DEFAULT_EVENTS_DELAY)
                }
            };
        var mouseMoveEvents = {'mousemove.sparkline-tooltip': function(event) {
                    var widget = event.data.widget;
                    if (widget._showTooltipTimeout && (_abs(widget._x - event.pageX) > 3 || _abs(widget._y - event.pageY) > 3)) {
                        widget._x = event.pageX;
                        widget._y = event.pageY;
                        widget._doShowTooltip(DEFAULT_EVENTS_DELAY)
                    }
                }};
        var active_touch_tooltip_widget = null,
            touchstartTooltipProcessing = function(event) {
                event.preventDefault();
                var widget = active_touch_tooltip_widget;
                if (widget && widget !== event.data.widget)
                    widget._doHideTooltip(DEFAULT_EVENTS_DELAY);
                widget = active_touch_tooltip_widget = event.data.widget;
                widget._doShowTooltip(TOUCH_EVENTS_DELAY);
                widget._touch = true
            },
            touchstartDocumentProcessing = function() {
                var widget = active_touch_tooltip_widget;
                if (widget) {
                    if (!widget._touch) {
                        widget._doHideTooltip(DEFAULT_EVENTS_DELAY);
                        active_touch_tooltip_widget = null
                    }
                    widget._touch = null
                }
            },
            touchendDocumentProcessing = function() {
                var widget = active_touch_tooltip_widget;
                if (widget)
                    if (widget._showTooltipTimeout) {
                        widget._doHideTooltip(DEFAULT_EVENTS_DELAY);
                        active_touch_tooltip_widget = null
                    }
            },
            isPointerDownCalled = false;
        var touchEvents = {
                'pointerdown.sparkline-tooltip': function(event) {
                    touchstartTooltipProcessing(event)
                },
                'touchstart.sparkline-tooltip': function(event) {
                    touchstartTooltipProcessing(event)
                }
            };
        $(document).on({
            'pointerdown.sparkline-tooltip': function() {
                isPointerDownCalled = true;
                touchstartDocumentProcessing()
            },
            'touchstart.sparkline-tooltip': function() {
                touchstartDocumentProcessing()
            },
            'pointerup.sparkline-tooltip': function() {
                touchendDocumentProcessing()
            },
            'touchend.sparkline-tooltip': function() {
                touchendDocumentProcessing()
            }
        });
        DX.viz.sparklines.BaseSparkline._DEBUG_reset = function() {
            active_touch_tooltip_widget = null
        }
    })(jQuery, DevExpress);
    /*! Module viz-sparklines, file sparkline.js */
    (function($, DX) {
        var charts = DX.viz.charts,
            MIN_BAR_WIDTH = 1,
            MAX_BAR_WIDTH = 50,
            DEFAULT_BAR_INTERVAL = 4,
            DEFAULT_CANVAS_WIDTH = 250,
            DEFAULT_CANVAS_HEIGHT = 30,
            DEFAULT_HORIZONTAL_MARGIN = 5,
            DEFAULT_VERTICAL_MARGIN = 3,
            FIRST_LAST_POINTS_CLASS = 'dxsl-first-last-points',
            MIN_POINT_CLASS = 'dxsl-min-point',
            MAX_POINT_CLASS = 'dxsl-max-point',
            POSITIVE_POINTS_CLASS = 'dxsl-positive-points',
            NEGATIVE_POINTS_CLASS = 'dxsl-negative-points',
            DEFAULT_OPTIONS = {
                theme: 'default',
                dataSource: [],
                size: {},
                margin: {},
                type: 'line',
                argumentField: 'arg',
                valueField: 'val',
                winlossThreshold: 0,
                showFirstLast: true,
                showMinMax: false
            },
            ALLOWED_TYPES = {
                line: true,
                spline: true,
                stepline: true,
                area: true,
                steparea: true,
                splinearea: true,
                bar: true,
                winloss: true
            },
            _map = $.map,
            _extend = $.extend,
            _abs = Math.abs,
            _round = Math.round,
            _isFinite = isFinite,
            _Number = Number,
            _String = String,
            _formatHelper = DX.formatHelper;
        DX.viz.sparklines.Sparkline = DX.viz.sparklines.BaseSparkline.inherit({
            _widgetType: 'sparkline',
            _widgetClass: 'dxsl',
            _defaultSize: {
                width: DEFAULT_CANVAS_WIDTH,
                height: DEFAULT_CANVAS_HEIGHT,
                left: DEFAULT_HORIZONTAL_MARGIN,
                right: DEFAULT_HORIZONTAL_MARGIN,
                top: DEFAULT_VERTICAL_MARGIN,
                bottom: DEFAULT_VERTICAL_MARGIN
            },
            _init: function() {
                this.callBase();
                this._refreshDataSource()
            },
            _handleDataSourceChanged: function() {
                if (this._initialized) {
                    this._clean();
                    this._createWidgetElements();
                    this._drawWidgetElements()
                }
            },
            _dataSourceOptions: function() {
                return {
                        paginate: false,
                        _preferSync: true
                    }
            },
            _redrawWidgetElements: function() {
                this._createTranslator();
                this._correctPoints();
                this._series.draw(this._translator);
                this._seriesGroup.append(this._renderer.getRoot())
            },
            _disposeWidgetElements: function() {
                delete this._seriesGroup;
                delete this._seriesLabelGroup
            },
            _cleanWidgetElements: function() {
                this._seriesGroup.detach();
                this._seriesLabelGroup.detach();
                this._seriesGroup.clear();
                this._seriesLabelGroup.clear()
            },
            _createWidgetElements: function() {
                this._createSeries();
                this.callBase()
            },
            _drawWidgetElements: function() {
                if (this._dataSource && this._dataSource.isLoaded())
                    this._drawSeries()
            },
            _prepareOptions: function() {
                this._allOptions = this.callBase(DEFAULT_OPTIONS);
                this._allOptions.type = _String(this._allOptions.type).toLowerCase();
                if (!ALLOWED_TYPES[this._allOptions.type])
                    this._allOptions.type = 'line'
            },
            _createHtmlElements: function() {
                this._seriesGroup = this._renderer.createGroup({'class': 'dxsl-series'});
                this._seriesLabelGroup = this._renderer.createGroup({'class': 'dxsl-series-labels'})
            },
            _createSeries: function() {
                var _this = this,
                    renderer = _this._renderer,
                    dataValidator;
                _this._prepareDataSource();
                _this._prepareSeriesOptions();
                _this._series = charts.factory.createSeries(_this._seriesOptions.type, renderer, _this._seriesOptions);
                dataValidator = charts.factory.createDataValidator(_this._simpleDataSource, [[_this._series]], null, {
                    checkTypeForAllData: false,
                    convertToAxisDataType: true,
                    sortingMethod: true
                });
                _this._simpleDataSource = dataValidator.validate();
                _this._series.options.customizePoint = _this._getCustomizeFunction();
                _this._series.reinitData(_this._simpleDataSource)
            },
            _parseNumericDataSource: function(data, argField, valField) {
                return _map(data, function(dataItem, index) {
                        var item = null,
                            isDataNumber;
                        if (dataItem !== undefined) {
                            item = {};
                            isDataNumber = _isFinite(dataItem);
                            item[argField] = isDataNumber ? _String(index) : dataItem[argField];
                            item[valField] = isDataNumber ? _Number(dataItem) : _Number(dataItem[valField]);
                            item = item[argField] !== undefined && item[valField] !== undefined ? item : null
                        }
                        return item
                    })
            },
            _parseWinlossDataSource: function(data, argField, valField) {
                var lowBarValue = -1,
                    zeroBarValue = 0,
                    highBarValue = 1,
                    delta = 0.0001,
                    target = this._allOptions.winlossThreshold;
                return _map(data, function(dataItem) {
                        var item = {};
                        item[argField] = dataItem[argField];
                        if (_abs(dataItem[valField] - target) < delta)
                            item[valField] = zeroBarValue;
                        else if (dataItem[valField] > target)
                            item[valField] = highBarValue;
                        else
                            item[valField] = lowBarValue;
                        return item
                    })
            },
            _prepareDataSource: function() {
                var _this = this,
                    options = _this._allOptions,
                    argField = options.argumentField,
                    valField = options.valueField,
                    dataSource = _this._dataSource ? _this._dataSource.items() : [],
                    data = _this._parseNumericDataSource(dataSource, argField, valField);
                if (options.type === 'winloss') {
                    _this._winlossDataSource = data;
                    _this._simpleDataSource = _this._parseWinlossDataSource(data, argField, valField)
                }
                else
                    _this._simpleDataSource = data
            },
            _prepareSeriesOptions: function() {
                var _this = this,
                    options = _this._allOptions,
                    defaultPointOptions = {
                        border: {},
                        hoverStyle: {border: {}},
                        selectionStyle: {border: {}}
                    },
                    customPointOptions = {
                        size: options.pointSize,
                        symbol: options.pointSymbol,
                        border: {
                            visible: true,
                            width: 2
                        },
                        color: options.pointColor
                    };
                _this._seriesOptions = {
                    argumentField: options.argumentField,
                    valueField: options.valueField,
                    color: options.lineColor,
                    width: options.lineWidth
                };
                _this._seriesOptions.border = {
                    color: _this._seriesOptions.color,
                    width: _this._seriesOptions.width,
                    visible: true
                };
                _this._seriesOptions.type = options.type === 'winloss' ? 'bar' : options.type;
                if (options.type === 'winloss' || options.type === 'bar') {
                    _this._seriesOptions.argumentAxisType = 'discrete';
                    _this._seriesOptions.border.visible = false
                }
                _this._seriesOptions.seriesGroup = _this._seriesGroup;
                _this._seriesOptions.seriesLabelsGroup = _this._seriesLabelGroup;
                _this._seriesOptions.point = _extend(defaultPointOptions, customPointOptions);
                _this._seriesOptions.point.visible = false
            },
            _createBarCustomizeFunction: function(pointIndexes) {
                var _this = this,
                    options = _this._allOptions,
                    winlossData = _this._winlossDataSource;
                return function() {
                        var index = this.index,
                            isWinloss = options.type === 'winloss',
                            target = isWinloss ? options.winlossThreshold : 0,
                            value = isWinloss ? winlossData[index][options.valueField] : this.value,
                            positiveColor = isWinloss ? options.winColor : options.barPositiveColor,
                            negativeColor = isWinloss ? options.lossColor : options.barNegativeColor,
                            color;
                        if (value >= target)
                            color = positiveColor;
                        else
                            color = negativeColor;
                        if (index === pointIndexes.first || index === pointIndexes.last)
                            color = options.firstLastColor;
                        if (index === pointIndexes.min)
                            color = options.minColor;
                        if (index === pointIndexes.max)
                            color = options.maxColor;
                        return {color: color}
                    }
            },
            _createLineCustomizeFunction: function(pointIndexes) {
                var _this = this,
                    options = _this._allOptions;
                return function() {
                        var color,
                            index = this.index;
                        if (index === pointIndexes.first || index === pointIndexes.last)
                            color = options.firstLastColor;
                        if (index === pointIndexes.min)
                            color = options.minColor;
                        if (index === pointIndexes.max)
                            color = options.maxColor;
                        return color ? {
                                visible: true,
                                border: {color: color}
                            } : {}
                    }
            },
            _getCustomizeFunction: function() {
                var _this = this,
                    options = _this._allOptions,
                    dataSource = _this._winlossDataSource || _this._simpleDataSource,
                    drawnPointIndexes = _this._getExtremumPointsIndexes(dataSource),
                    customizeFunction;
                if (options.type === 'winloss' || options.type === 'bar')
                    customizeFunction = _this._createBarCustomizeFunction(drawnPointIndexes);
                else
                    customizeFunction = _this._createLineCustomizeFunction(drawnPointIndexes);
                return customizeFunction
            },
            _getExtremumPointsIndexes: function(data) {
                var _this = this,
                    options = _this._allOptions,
                    lastIndex = data.length - 1,
                    indexes = {};
                _this._minMaxIndexes = _this._findMinMax(data);
                if (options.showFirstLast) {
                    indexes.first = 0;
                    indexes.last = lastIndex
                }
                if (options.showMinMax) {
                    indexes.min = _this._minMaxIndexes.minIndex;
                    indexes.max = _this._minMaxIndexes.maxIndex
                }
                return indexes
            },
            _findMinMax: function(data) {
                var _this = this,
                    valField = _this._allOptions.valueField,
                    firstItem = data[0] || {},
                    firstValue = firstItem[valField] || 0,
                    min = firstValue,
                    max = firstValue,
                    minIndex = 0,
                    maxIndex = 0,
                    dataLength = data.length,
                    value,
                    i;
                for (i = 1; i < dataLength; i++) {
                    value = data[i][valField];
                    if (value < min) {
                        min = value;
                        minIndex = i
                    }
                    if (value > max) {
                        max = value;
                        maxIndex = i
                    }
                }
                return {
                        minIndex: minIndex,
                        maxIndex: maxIndex
                    }
            },
            _createRange: function() {
                var _this = this,
                    series = _this._series,
                    isBarType = series.type === 'bar',
                    DEFAULT_VALUE_RANGE_MARGIN = 0.15,
                    DEFAULT_ARGUMENT_RANGE_MARGIN = isBarType ? 0.1 : 0,
                    rangeData = {
                        stickX: !isBarType && series.points.length > 1,
                        keepValueMarginsY: true,
                        minValueMarginY: DEFAULT_VALUE_RANGE_MARGIN,
                        maxValueMarginY: DEFAULT_VALUE_RANGE_MARGIN,
                        minValueMarginX: DEFAULT_ARGUMENT_RANGE_MARGIN,
                        maxValueMarginX: DEFAULT_ARGUMENT_RANGE_MARGIN
                    };
                _this._range = new charts.Range(rangeData);
                _this._range.addRange(series.getRangeData());
                _this._range.applyValueMargins()
            },
            _getBarWidth: function(pointsCount) {
                var _this = this,
                    canvas = _this._canvas,
                    intervalWidth = pointsCount * DEFAULT_BAR_INTERVAL,
                    rangeWidth = canvas.width - canvas.left - canvas.right - intervalWidth,
                    width = _round(rangeWidth / pointsCount);
                if (width < MIN_BAR_WIDTH)
                    width = MIN_BAR_WIDTH;
                if (width > MAX_BAR_WIDTH)
                    width = MAX_BAR_WIDTH;
                return width
            },
            _preparePointsClasses: function() {
                var _this = this,
                    options = _this._allOptions,
                    isBar = options.type === 'bar',
                    isBarOrWinloss = isBar || options.type === 'winloss',
                    points = _this._series.getAllPoints(),
                    firstIndex = 0,
                    lastIndex = points.length - 1,
                    minIndex = _this._minMaxIndexes.minIndex,
                    maxIndex = _this._minMaxIndexes.maxIndex,
                    target = isBar ? 0 : options.winlossThreshold,
                    additionalClass = '';
                if (isBarOrWinloss) {
                    additionalClass = ' dxsl-bar-point';
                    $.each(points, function(index, point) {
                        var className;
                        if (point.value >= target)
                            className = POSITIVE_POINTS_CLASS;
                        else
                            className = NEGATIVE_POINTS_CLASS;
                        points[index].options.attributes['class'] = className
                    })
                }
                if (options.showFirstLast) {
                    points[firstIndex].options.attributes['class'] = FIRST_LAST_POINTS_CLASS + additionalClass;
                    points[lastIndex].options.attributes['class'] = FIRST_LAST_POINTS_CLASS + additionalClass
                }
                if (options.showMinMax) {
                    points[minIndex].options.attributes['class'] = MIN_POINT_CLASS + additionalClass;
                    points[maxIndex].options.attributes['class'] = MAX_POINT_CLASS + additionalClass
                }
            },
            _correctPoints: function() {
                var _this = this,
                    seriesType = _this._allOptions.type,
                    seriesPoints = _this._series.getPoints(),
                    pointsLength = seriesPoints.length,
                    barWidth,
                    i;
                if (seriesType === 'bar' || seriesType === 'winloss') {
                    barWidth = _this._getBarWidth(pointsLength);
                    for (i = 0; i < pointsLength; i++)
                        seriesPoints[i].correctCoordinates({
                            width: barWidth,
                            offset: 0
                        })
                }
            },
            _drawSeries: function() {
                var _this = this;
                if (_this._simpleDataSource.length !== 0) {
                    _this._correctPoints();
                    _this._series._segmentPoints();
                    if (_this._series.styles.area)
                        _this._series.styles.area.opacity = _this._allOptions.areaOpacity;
                    _this._preparePointsClasses();
                    _this._series.createPatterns = function(){};
                    _this._series.draw(_this._translator);
                    _this._seriesGroup.append(_this._renderer.getRoot());
                    _this._prepareTooltipContainer()
                }
            },
            _getTooltipData: function() {
                var _this = this,
                    options = _this._allOptions,
                    format = options.tooltip.format,
                    precision = options.tooltip.precision,
                    dataSource = _this._winlossDataSource || _this._simpleDataSource;
                if (dataSource.length === 0)
                    return {};
                var minMax = _this._minMaxIndexes,
                    valueField = options.valueField,
                    first = dataSource[0][valueField],
                    last = dataSource[dataSource.length - 1][valueField],
                    min = dataSource[minMax.minIndex][valueField],
                    max = dataSource[minMax.maxIndex][valueField],
                    formattedFirst = _formatHelper.format(first, format, precision),
                    formattedLast = _formatHelper.format(last, format, precision),
                    formattedMin = _formatHelper.format(min, format, precision),
                    formattedMax = _formatHelper.format(max, format, precision),
                    customizeObject = {
                        firstValue: formattedFirst,
                        lastValue: formattedLast,
                        minValue: formattedMin,
                        maxValue: formattedMax,
                        originalFirstValue: first,
                        originalLastValue: last,
                        originalMinValue: min,
                        originalMaxValue: max
                    };
                if (options.type === 'winloss') {
                    customizeObject.originalThresholdValue = options.winlossThreshold;
                    customizeObject.thresholdValue = _formatHelper.format(options.winlossThreshold, format, precision)
                }
                return customizeObject
            },
            _getDefaultTooltipText: function(customizeObject) {
                return ['Start:', customizeObject.firstValue, 'End:', customizeObject.lastValue, 'Min:', customizeObject.minValue, 'Max:', customizeObject.maxValue]
            }
        }).include(DX.ui.DataHelperMixin)
    })(jQuery, DevExpress);
    /*! Module viz-sparklines, file sparklineTooltip.js */
    (function($, DX, undefined) {
        var X_INTERVAL = 15,
            _max = Math.max,
            _round = Math.round;
        DX.viz.sparklines.SparklineTooltip = DX.viz.charts.Tooltip.inherit({
            _createTextContent: function() {
                this._textGroup = this.renderer.createGroup();
                return this._textGroup
            },
            dispose: function() {
                this._tooltipTextArray = null;
                this._textGroup = null;
                this.callBase()
            },
            _checkWidthText: function(){},
            _getTextContentParams: function() {
                var _this = this,
                    i,
                    text,
                    textBBox,
                    textArray = _this.tooltipText,
                    textArrayLength = textArray.length,
                    textParams = {
                        width: [],
                        height: []
                    };
                _this._tooltipTextArray = [];
                for (i = 0; i < textArrayLength; i++) {
                    text = _this.renderer.createText(textArray[i], 0, 0, _this.textStyle).append(this._textGroup);
                    _this._tooltipTextArray.push(text);
                    textBBox = text.getBBox();
                    textParams.width.push(textBBox.width)
                }
                _this._lineHeight = -2 * textBBox.y - textBBox.height;
                return textParams
            },
            _calculateTextContent: function() {
                var _this = this,
                    textArray = _this.tooltipText,
                    textArrayLength = textArray.length,
                    textParams,
                    width,
                    textWidthArray = [],
                    textHeightArray = [],
                    stringWidthArray = [],
                    i;
                textParams = _this._getTextContentParams();
                for (i = 0; i < textArrayLength; i += 2) {
                    if (textParams.width[i + 1])
                        width = textParams.width[i] + X_INTERVAL + textParams.width[i + 1];
                    else
                        width = textParams.width[i];
                    stringWidthArray.push(width)
                }
                _this._textContentWidth = _max.apply(null, stringWidthArray)
            },
            _locateTextContent: function(x, y, alignment) {
                var _this = this,
                    textArrayLength = _this._tooltipTextArray.length,
                    textWidth = _this._textContentWidth,
                    lineSpacing = _this.options.lineSpacing,
                    yDelta = lineSpacing > 0 ? lineSpacing + _this._lineHeight : _this._lineHeight,
                    currentYCoord = y,
                    leftXCoord,
                    rightXCoord,
                    i;
                if (alignment === 'left')
                    leftXCoord = x;
                else if (alignment === 'right')
                    leftXCoord = x - textWidth;
                else
                    leftXCoord = _round(x - textWidth / 2);
                rightXCoord = leftXCoord + textWidth;
                for (i = textArrayLength - 1; i >= 0; i -= 2) {
                    _this._tooltipTextArray[i].applySettings({
                        x: rightXCoord,
                        y: currentYCoord,
                        align: 'right'
                    });
                    if (_this._tooltipTextArray[i - 1])
                        _this._tooltipTextArray[i - 1].applySettings({
                            x: leftXCoord,
                            y: currentYCoord,
                            align: 'left'
                        });
                    currentYCoord -= yDelta
                }
            },
            _updateTextContent: function() {
                this._textGroup.clear();
                this._calculateTextContent();
                this._locateTextContent(0, 0, 'center')
            },
            _correctYTextContent: function(y) {
                this._locateTextContent(0, y, 'center');
                var bbox = this._textGroup.getBBox();
                return y - (bbox.y + bbox.height - y)
            },
            _adjustTextContent: function(data) {
                this._locateTextContent(data.text.x, data.text.y, data.text.align)
            }
        })
    })(jQuery, DevExpress);
    /*! Module viz-sparklines, file bullet.js */
    (function($, DX) {
        var charts = DX.viz.charts,
            TARGET_MIN_Y = 0.02,
            TARGET_MAX_Y = 0.98,
            BAR_VALUE_MIN_Y = 0.1,
            BAR_VALUE_MAX_Y = 0.9,
            DEFAULT_CANVAS_WIDTH = 300,
            DEFAULT_CANVAS_HEIGHT = 30,
            DEFAULT_HORIZONTAL_MARGIN = 1,
            DEFAULT_VERTICAL_MARGIN = 2,
            DEFAULT_OPTIONS = {
                theme: 'default',
                size: {},
                margin: {}
            },
            _formatHelper = DX.formatHelper,
            _String = String,
            _Number = Number,
            _round = Math.round,
            _isFinite = isFinite;
        DX.viz.sparklines.Bullet = DX.viz.sparklines.BaseSparkline.inherit({
            _widgetType: 'bullet',
            _widgetClass: 'dxb',
            _defaultSize: {
                width: DEFAULT_CANVAS_WIDTH,
                height: DEFAULT_CANVAS_HEIGHT,
                left: DEFAULT_HORIZONTAL_MARGIN,
                right: DEFAULT_HORIZONTAL_MARGIN,
                top: DEFAULT_VERTICAL_MARGIN,
                bottom: DEFAULT_VERTICAL_MARGIN
            },
            _disposeWidgetElements: function() {
                delete this._zeroLevelPath;
                delete this._targetPath;
                delete this._barValuePath
            },
            _redrawWidgetElements: function() {
                this._createTranslator();
                this._drawBarValue();
                this._drawTarget();
                this._drawZeroLevel()
            },
            _cleanWidgetElements: function() {
                this._zeroLevelPath.detach();
                this._targetPath.detach();
                this._barValuePath.detach()
            },
            _drawWidgetElements: function() {
                this._drawBullet()
            },
            _createHtmlElements: function() {
                var renderer = this._renderer;
                this._zeroLevelPath = renderer.createPath(undefined, {'class': 'dxb-zero-level'});
                this._targetPath = renderer.createPath(undefined, {'class': 'dxb-target'});
                this._barValuePath = renderer.createPath(undefined, {'class': 'dxb-bar-value'})
            },
            _prepareOptions: function() {
                var _this = this,
                    options,
                    startScaleValue,
                    endScaleValue,
                    level,
                    value,
                    target;
                _this._allOptions = options = _this.callBase(DEFAULT_OPTIONS);
                if (_this._allOptions.value === undefined)
                    _this._allOptions.value = 0;
                if (_this._allOptions.target === undefined)
                    _this._allOptions.target = 0;
                options.value = value = _Number(options.value);
                options.target = target = _Number(options.target);
                if (_this._allOptions.startScaleValue === undefined) {
                    _this._allOptions.startScaleValue = target < value ? target : value;
                    _this._allOptions.startScaleValue = _this._allOptions.startScaleValue < 0 ? _this._allOptions.startScaleValue : 0
                }
                if (_this._allOptions.endScaleValue === undefined)
                    _this._allOptions.endScaleValue = target > value ? target : value;
                options.startScaleValue = startScaleValue = _Number(options.startScaleValue);
                options.endScaleValue = endScaleValue = _Number(options.endScaleValue);
                if (endScaleValue < startScaleValue) {
                    level = endScaleValue;
                    _this._allOptions.endScaleValue = startScaleValue;
                    _this._allOptions.startScaleValue = level;
                    _this._allOptions.inverted = true
                }
            },
            _createRange: function() {
                var _this = this,
                    options = _this._allOptions;
                _this._range = {
                    invertX: options.inverted,
                    minX: options.startScaleValue,
                    maxX: options.endScaleValue,
                    minY: 0,
                    maxY: 1
                }
            },
            _drawBullet: function() {
                var _this = this,
                    options = _this._allOptions,
                    isValidBounds = options.startScaleValue !== options.endScaleValue,
                    isValidMin = _isFinite(options.startScaleValue),
                    isValidMax = _isFinite(options.endScaleValue),
                    isValidValue = _isFinite(options.value),
                    isValidTarget = _isFinite(options.target);
                if (isValidBounds && isValidMax && isValidMin && isValidTarget && isValidValue) {
                    this._drawBarValue();
                    this._drawTarget();
                    this._drawZeroLevel();
                    this._prepareTooltipContainer()
                }
            },
            _getTargetParams: function() {
                var _this = this,
                    options = _this._allOptions,
                    translator = _this._translator,
                    minY = translator.translateY(TARGET_MIN_Y),
                    maxY = translator.translateY(TARGET_MAX_Y),
                    x = translator.translateX(options.target),
                    points = [{
                            x: x,
                            y: minY
                        }, {
                            x: x,
                            y: maxY
                        }];
                return {
                        points: points,
                        stroke: options.targetColor,
                        strokeWidth: options.targetWidth
                    }
            },
            _getBarValueParams: function() {
                var _this = this,
                    options = _this._allOptions,
                    translator = _this._translator,
                    startLevel = options.startScaleValue,
                    endLevel = options.endScaleValue,
                    value = options.value,
                    y2 = translator.translateY(BAR_VALUE_MIN_Y),
                    y1 = translator.translateY(BAR_VALUE_MAX_Y),
                    x1,
                    x2;
                if (value > 0) {
                    x1 = startLevel <= 0 ? 0 : startLevel;
                    x2 = value >= endLevel ? endLevel : value
                }
                else {
                    x1 = endLevel >= 0 ? 0 : endLevel;
                    x2 = value >= startLevel ? value : startLevel
                }
                x1 = translator.translateX(x1);
                x2 = translator.translateX(x2);
                return {
                        points: [{
                                x: x1,
                                y: y1
                            }, {
                                x: x2,
                                y: y1
                            }, {
                                x: x2,
                                y: y2
                            }, {
                                x: x1,
                                y: y2
                            }],
                        fill: options.color
                    }
            },
            _getZeroLevelParams: function() {
                var _this = this,
                    options = _this._allOptions,
                    translator = _this._translator,
                    minY = translator.translateY(TARGET_MIN_Y),
                    maxY = translator.translateY(TARGET_MAX_Y),
                    x = translator.translateX(0);
                return {
                        points: [{
                                x: x,
                                y: minY
                            }, {
                                x: x,
                                y: maxY
                            }],
                        stroke: options.targetColor,
                        strokeWidth: 1
                    }
            },
            _drawZeroLevel: function() {
                var _this = this,
                    options = _this._allOptions,
                    params;
                if (0 > options.endScaleValue || 0 < options.startScaleValue || !options.showZeroLevel)
                    return;
                params = _this._getZeroLevelParams();
                _this._zeroLevelPath.applySettings(params);
                _this._zeroLevelPath.append(_this._renderer.getRoot())
            },
            _drawTarget: function() {
                var _this = this,
                    options = _this._allOptions,
                    target = options.target,
                    startLevel = options.startScaleValue,
                    endLevel = options.endScaleValue,
                    params;
                if (target > endLevel || target < startLevel || !options.showTarget)
                    return;
                params = _this._getTargetParams();
                _this._targetPath.applySettings(params);
                _this._targetPath.append(_this._renderer.getRoot())
            },
            _drawBarValue: function() {
                var _this = this,
                    params = _this._getBarValueParams();
                _this._barValuePath.applySettings(params);
                _this._barValuePath.append(_this._renderer.getRoot())
            },
            _getTooltipData: function() {
                var _this = this,
                    options = _this._allOptions,
                    format = options.tooltip.format,
                    precision = options.tooltip.precision,
                    valueField = options.valueField,
                    value = options.value,
                    target = options.target,
                    formattedValue = _formatHelper.format(value, format, precision),
                    formattedTarget = _formatHelper.format(target, format, precision);
                return {
                        originalValue: value,
                        originalTarget: target,
                        value: formattedValue,
                        target: formattedTarget
                    }
            },
            _getDefaultTooltipText: function(customizeObject) {
                return ['Actual Value:', customizeObject.value, 'Target Value:', customizeObject.target]
            },
            _getNormalTooltipSize: function() {
                var size = {},
                    bbox = this._barValuePath.getBBox();
                size.width = this._canvas.width;
                size.left = 0;
                size.tooltipLeft = bbox.x + _round(bbox.width / 2);
                return size
            },
            _getWideTooltipSize: function(leftWidthDelta, rightWidthDelta) {
                var _this = this,
                    bbox = _this._barValuePath.getBBox(),
                    horizontalPos = _this._allOptions.tooltip.horizontalAlignment,
                    size = {};
                size.width = leftWidthDelta + rightWidthDelta + _this._canvas.width;
                size.left = -leftWidthDelta;
                if (horizontalPos === 'right')
                    size.tooltipLeft = bbox.x + _round(bbox.width / 2);
                else if (horizontalPos === 'left')
                    size.tooltipLeft = _round(bbox.width / 2) + leftWidthDelta + rightWidthDelta + bbox.x;
                else
                    size.tooltipLeft = _round(bbox.width / 2) + bbox.x + leftWidthDelta;
                return size
            }
        })
    })(jQuery, DevExpress);
    /*! Module viz-sparklines, file dxSparkline.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            viz = DX.viz;
        ui.registerComponent("dxSparkline", viz.sparklines.Sparkline)
    })(jQuery, DevExpress);
    /*! Module viz-sparklines, file dxBullet.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            viz = DX.viz;
        ui.registerComponent("dxBullet", viz.sparklines.Bullet)
    })(jQuery, DevExpress);
    DevExpress.MOD_VIZ_SPARKLINES = true
}