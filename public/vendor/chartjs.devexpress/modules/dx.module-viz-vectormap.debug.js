/*! 
* DevExpress Visualization VectorMap (part of ChartJS)
* Version: 13.2.8
* Build date: Mar 11, 2014
*
* Copyright (c) 2012 - 2014 Developer Express Inc. ALL RIGHTS RESERVED
* EULA: http://chartjs.devexpress.com/EULA
*/

"use strict";
if (!DevExpress.MOD_VIZ_VECTORMAP) {
    if (!window.DevExpress)
        throw Error('Required module is not referenced: core');
    if (!DevExpress.MOD_VIZ_CORE)
        throw Error('Required module is not referenced: viz-core');
    /*! Module viz-vectormap, file map.js */
    (function(DX, $, undefined) {
        DX.viz.map = {};
        var _Number = window.Number,
            _String = window.String,
            _round = Math.round,
            _isArray = DX.utils.isArray,
            _isFunction = DX.utils.isFunction,
            _isString = DX.utils.isString,
            _windowResizeCallbacks = DX.utils.windowResizeCallbacks,
            _createResizeHandler = DX.utils.createResizeHandler,
            _getRootOffset = DX.utils.getRootOffset,
            _ajax = $.ajax,
            _extend = $.extend,
            _noop = $.noop;
        var DEFAULT_WIDTH = 800,
            DEFAULT_HEIGHT = 400;
        var SELECTION_MODE_NONE = 'none',
            SELECTION_MODE_SINGLE = 'single',
            SELECTION_MODE_MULTIPLE = 'multiple';
        var FLAG_NO_CALLBACK = 1,
            FLAG_NO_CHECK = 2;
        DX.viz.map.Map = DX.ui.Component.inherit({
            _rendererType: DX.viz.renderers.Renderer,
            _init: function() {
                var self = this;
                self.callBase();
                self._renderer = new self._rendererType;
                self._renderer.recreateCanvas(1, 1);
                self._renderer.draw(self._element().get(0));
                self._themeManager = new self._themeManagerType;
                self._projection = new self._projectionType;
                self._tracker = new self._trackerType;
                self._root = self._renderer.getRoot();
                self._root.applySettings({
                    'class': 'dxm',
                    stroke: 'none',
                    strokeWidth: 0,
                    fill: 'none',
                    align: 'center',
                    cursor: 'default',
                    style: {overflow: 'hidden'}
                });
                self._background = self._renderer.createRect(0, 0, 0, 0, 0, {'class': 'dxm-background'});
                self._tracker.attachRoot(self._root);
                self._tracker.setCallbacks(self, {
                    start: startCallback,
                    move: moveCallback,
                    end: endCallback,
                    wheel: wheelCallback,
                    'hover-on': hoverOnCallback,
                    'hover-off': hoverOffCallback,
                    click: clickCallback,
                    'tooltip-check': checkTooltipCallback,
                    'tooltip-show': showTooltipCallback,
                    'tooltip-move': moveTooltipCallback,
                    'tooltip-hide': hideTooltipCallback
                });
                self._initAreas();
                self._initMarkers();
                self._controlBar = new self._controlBarType({
                    container: self._root,
                    renderer: self._renderer,
                    context: self,
                    resetCallback: controlResetCallback,
                    beginMoveCallback: controlBeginMoveCallback,
                    endMoveCallback: controlEndMoveCallback,
                    moveCallback: controlMoveCallback,
                    zoomCallback: controlZoomCallback
                });
                self._tooltip = new self._tooltipType({
                    container: self._root,
                    renderer: self._renderer
                });
                self._legend = new self._legendType({
                    container: self._root,
                    renderer: self._renderer,
                    themeManager: self._themeManager
                });
                self._initResizing();
                self._debug_renderer = self._renderer;
                self._debug_themeManager = self._themeManager;
                self._debug_projection = self._projection;
                self._debug_tracker = self._tracker;
                self._debug_controlBar = self._controlBar;
                self._debug_tooltip = self._tooltip;
                self._debug_legend = self._legend
            },
            _initAreas: function() {
                var self = this;
                self._areasGroup = self._renderer.createGroup({'class': 'dxm-areas'});
                self._areasCancelLock = 0;
                self._tracker.attachGroup('areas', self._areasGroup)
            },
            _initMarkers: function() {
                var self = this,
                    options = _extend({}, self.option('marker'));
                self._markersGroup = self._renderer.createGroup({'class': 'dxm-markers'});
                self._markerShapesGroup = self._renderer.createGroup();
                self._markerTextsGroup = self._renderer.createGroup({'class': 'dxm-marker-texts'});
                self._markerCoversGroup = self._renderer.createGroup({
                    stroke: 'none',
                    strokeWidth: 0,
                    fill: '#000000',
                    opacity: 0.0001
                });
                self._markerShadowFilter = self._renderer.createFilter('shadow').applySettings({
                    id: 'marker-shadow-filter',
                    x: '-40%',
                    y: '-40%',
                    width: '180%',
                    height: '200%',
                    color: '#000000',
                    opacity: 0.2,
                    dx: 0,
                    dy: 1,
                    blur: 1
                }).append();
                self._markersCancelLock = 0;
                self._tracker.attachGroup('markers', self._markersGroup)
            },
            _initResizing: function() {
                var self = this;
                self._resizeHandler = _createResizeHandler(function() {
                    self._resize()
                });
                self._resizeHandler.dispose = function() {
                    self = null;
                    return this
                };
                _windowResizeCallbacks.add(self._resizeHandler)
            },
            _dispose: function() {
                var self = this;
                self.callBase();
                delete self._root;
                delete self._background;
                self._themeManager.dispose() && delete self._themeManager;
                self._tracker.detachRoot();
                self._disposeAreas();
                self._disposeMarkers();
                self._controlBar.dispose() && delete self._controlBar;
                self._tooltip.dispose() && delete self._tooltip;
                self._legend.dispose() && delete self._legend;
                self._renderer.dispose();
                delete self._renderer;
                delete self._projection;
                self._tracker.dispose() && delete self._tracker;
                delete self._readyCallback;
                self._disposeResizing();
                self._remoteDataCache = null;
                self._disposeLoadIndicator();
                delete self._debug_renderer;
                delete self._debug_themeManager;
                delete self._debug_projection;
                delete self._debug_tracker;
                delete self._debug_controlBar;
                delete self._debug_tooltip;
                delete self._debug_legend
            },
            _disposeAreas: function() {
                var self = this;
                self._areasGroup = self._areasInfo = self._mapData = null;
                self._tracker.detachGroup('areas')
            },
            _disposeMarkers: function() {
                var self = this;
                self._markersGroup.clear();
                self._markerShadowFilter.dispose();
                self._markersGroup = self._markerShapesGroup = self._markerTextsGroup = self._markerCoversGroup = self._markerShadowFilter = self._markersDataItems = null;
                self._tracker.detachGroup('markers')
            },
            _disposeResizing: function() {
                var self = this;
                _windowResizeCallbacks.remove(self._resizeHandler);
                self._resizeHandler.dispose() && delete self._resizeHandler
            },
            _adjustSize: function(force) {
                var self = this,
                    size = self.option('size') || {},
                    width = size.width >= 0 ? _Number(size.width) : self._element().width(),
                    height = size.height >= 0 ? _Number(size.height) : self._element().height();
                width === 0 && _Number(size.width) !== 0 && (width = DEFAULT_WIDTH);
                height === 0 && _Number(size.height) !== 0 && (height = DEFAULT_HEIGHT);
                var needResize = self._width !== width || self._height !== height;
                if (needResize || force) {
                    self._renderer.resize(width, height);
                    self._projection.setSize(width, height);
                    self._applyTransform();
                    self._tooltip.setSize(width, height);
                    self._legend.setSize(width, height);
                    self._background.applySettings({
                        x: 0,
                        y: 0,
                        width: width,
                        height: height
                    });
                    self._width = width;
                    self._height = height;
                    self._updateLoadIndicator(undefined, width, height)
                }
                return needResize
            },
            _clean: function() {
                var self = this;
                self._resizeHandler.stop();
                self._themeManager.reset();
                self._background.detach();
                self._cleanAreas();
                self._cleanMarkers();
                self._controlBar.clean();
                self._legend.clean();
                self._tooltip.clean();
                self._tracker.clean()
            },
            _render: function() {
                var self = this;
                self._projection.setBounds(self.option('bounds')).setMaxZoom(self.option('maxZoomFactor')).setZoom(self.option('zoomFactor')).setCenter(self.option('center'));
                self._adjustSize(true);
                self._themeManager.setTheme(self.option('theme'));
                self._tooltip.setOptions(self._themeManager.getTooltipSettings(self.option('tooltip')));
                self._legend.setOptions(self._themeManager.getLegendSettings(self.option('legend')));
                self._tracker.setOptions(self._getTrackerSettings());
                self._controlBar.setData({
                    minZoom: self._projection.getMinZoom(),
                    maxZoom: self._projection.getMaxZoom()
                }).setZoom(self._projection.getZoom()).setOptions(self._themeManager.getControlBarSettings(self.option('controlBar')));
                _isFunction(self._readyCallback = self.option('ready')) || (self._readyCallback = null);
                _isFunction(self._centerChangedCallback = self.option('centerChanged')) || (self._centerChangedCallback = _noop);
                _isFunction(self._zoomFactorChangedCallback = self.option('zoomFactorChanged')) || (self._zoomFactorChangedCallback = _noop);
                self._background.applySettings(self._themeManager.getBackgroundSettings(self.option('background')));
                self._background.append(self._root);
                self._renderAreas();
                self._renderMarkers();
                self._controlBar.render();
                self._legend.render();
                self._tooltip.render();
                self._tracker.render();
                self._contentReady = true;
                self._raiseReady()
            },
            _getTrackerSettings: function() {
                var interaction = this.option('interaction'),
                    settings = {};
                if (interaction !== undefined && !interaction)
                    settings.enabled = false;
                else {
                    interaction = interaction || {};
                    settings.enabled = true;
                    settings.touchEnabled = interaction.touchEnabled !== undefined ? !!interaction.touchEnabled : true;
                    settings.wheelEnabled = interaction.wheelEnabled !== undefined ? !!interaction.wheelEnabled : true;
                    settings.tooltipEnabled = this._tooltip.enabled()
                }
                return settings
            },
            _optionChanged: function(name, value) {
                switch (name) {
                    case'zoomFactor':
                        this._updateZoomFactor(value);
                        break;
                    case'center':
                        this._updateCenter(value);
                        break;
                    case'loadingIndicator':
                        this._updateLoadIndicator(this._themeManager.getLoadIndicatorSettings(this.option('loadingIndicator')));
                        break;
                    default:
                        this._invalidate();
                        break
                }
            },
            _updateZoomFactor: function(zoomFactor) {
                var self = this,
                    zoom = self._projection.getZoom();
                self._projection.setZoom(zoomFactor);
                if (zoom !== self._projection.getZoom()) {
                    self._controlBar.setZoom(self._projection.getZoom());
                    self._applyTransform(true)
                }
            },
            _updateCenter: function(center) {
                var self = this;
                self._projection.setCenter(center);
                self._applyTransform()
            },
            _resize: function() {
                var self = this;
                if (self._adjustSize()) {
                    self._applyTransform();
                    self._parseAreas();
                    self._redrawAreas();
                    self._parseMarkers();
                    self._redrawMarkers();
                    self._debug_resized && self._debug_resized()
                }
            },
            _raiseReady: function() {
                var self = this;
                if (self._areasReady && self._markersReady && self._contentReady) {
                    self._areasReady = self._markersReady = self._contentReady = null;
                    self._readyCallback && self._readyCallback();
                    self.hideLoadingIndicator();
                    self._debug_ready && self._debug_ready()
                }
            },
            _loadData: function(dataSource, callback) {
                if (_isString(dataSource)) {
                    var cache = this._remoteDataCache = this._remoteDataCache || {};
                    if (cache[dataSource])
                        callback(cache[dataSource]);
                    else
                        _ajax({
                            url: dataSource,
                            dataType: 'json',
                            type: 'GET',
                            success: function(data, status, xhr) {
                                cache[dataSource] = data;
                                callback(cache[dataSource])
                            },
                            error: function(xhr, status, error) {
                                callback([], error)
                            }
                        })
                }
                else if (dataSource)
                    callback(dataSource);
                else
                    callback([])
            },
            _cleanAreas: function() {
                var self = this;
                self._areaCustomizeCallback = self._areaClickCallback = self._areaSelectionChangedCallback = self._selectedAreas = null;
                self._areasGroup.detach();
                self._areasGroup.clear();
                var areasInfo = self._areasInfo;
                if (areasInfo) {
                    var i = 0,
                        ii = areasInfo.length;
                    for (; i < ii; ++i)
                        areasInfo[i].proxy._dispose();
                    self._areasInfo = null
                }
                else
                    ++self._areasCancelLock
            },
            _renderAreas: function() {
                var self = this,
                    options = self.option('areaSettings') || {};
                self._themeManager.initCommonAreaSettings(options);
                self._areaCustomizeCallback = _isFunction(options.customize) ? options.customize : null;
                self._areaClickCallback = _isFunction(options.click) ? options.click : null;
                self._areaSelectionChangedCallback = _isFunction(options.selectionChanged) ? options.selectionChanged : null;
                self._areaHoverEnabled = 'hoverEnabled' in options ? !!options.hoverEnabled : true;
                var selectionMode = _String(options.selectionMode).toLowerCase();
                self._areaSelectionMode = selectionMode === SELECTION_MODE_NONE || selectionMode === SELECTION_MODE_SINGLE || selectionMode === SELECTION_MODE_MULTIPLE ? selectionMode : SELECTION_MODE_SINGLE;
                self._selectedAreas = self._areaSelectionMode === SELECTION_MODE_MULTIPLE ? {} : null;
                self._areasGroup.append(self._root);
                self._loadData(self.option('mapData'), function(mapData) {
                    self._areasCancelLock === 0 ? self._createAreas(mapData) : --self._areasCancelLock;
                    self = null
                })
            },
            _parseAreas: function() {
                var areasInfo = this._areasInfo,
                    dataItems = this._mapData,
                    i = 0,
                    ii = dataItems.length;
                for (; i < ii; ++i)
                    (areasInfo[i] = areasInfo[i] || {}).coordinates = this._parseAreaCoordinates(dataItems[i] || {})
            },
            _createAreas: function(mapData) {
                var self = this,
                    areasInfo = self._areasInfo = [],
                    isGeoJson = mapData.type === 'FeatureCollection',
                    attributesName = isGeoJson ? 'properties' : 'attributes',
                    dataItems = self._mapData = isGeoJson ? mapData.features : mapData;
                self._parseAreaCoordinates = isGeoJson ? parseAreaCoordinatesGeoJson : parseAreaCoordinatesDefault;
                self._parseAreas();
                var group = self._areasGroup,
                    renderer = self._renderer,
                    themeManager = self._themeManager,
                    projection = self._projection,
                    customizeCallback = self._areaCustomizeCallback,
                    areaInfo,
                    dataItem,
                    i = 0,
                    ii = areasInfo.length,
                    selectedList = [],
                    element,
                    path;
                group.applySettings(themeManager.getCommonAreaSettings().common);
                for (; i < ii; ++i) {
                    areaInfo = areasInfo[i];
                    dataItem = dataItems[i] || {};
                    element = null;
                    areaInfo.attributes = dataItem[attributesName] || {};
                    areaInfo.options = (customizeCallback ? customizeCallback.call(dataItem, dataItem) : null) || {};
                    path = projection.projectArea(areaInfo.coordinates);
                    areaInfo.styles = themeManager.getAreaSettings(areaInfo.options);
                    areaInfo.element = element = renderer.createSimplePath({d: path});
                    element.applySettings(areaInfo.styles.normal);
                    areaInfo.index = i;
                    setElementData(element.$element, i);
                    areaInfo.options.isSelected && selectedList.push(areaInfo);
                    areaInfo.proxy = new self._proxyType(self, areaInfo, {
                        type: 'area',
                        setSelectionCallback: self._setAreaSelection
                    });
                    element.append(group)
                }
                ii = self._areaSelectionMode !== SELECTION_MODE_NONE ? selectedList.length : 0;
                i = ii > 0 && self._areaSelectionMode === SELECTION_MODE_SINGLE ? ii - 1 : 0;
                for (; i < ii; ++i)
                    self._setAreaSelection(selectedList[i], true, FLAG_NO_CALLBACK);
                self._areasReady = true;
                self._raiseReady()
            },
            _redrawAreas: function() {
                var areasInfo = this._areasInfo,
                    projection = this._projection,
                    areaInfo,
                    i = 0,
                    ii = areasInfo.length;
                for (; i < ii; ++i) {
                    areaInfo = areasInfo[i];
                    areaInfo.element.applySettings({d: projection.projectArea(areaInfo.coordinates)})
                }
                this._DEBUG_areasRedrawn && this._DEBUG_areasRedrawn()
            },
            _cleanMarkers: function() {
                var self = this;
                self._markerCustomizeCallback = self._markerClickCallback = self._markerSelectionChangedCallback = self._selectedMarkers = null;
                self._markersGroup.detach();
                self._markerShapesGroup.detach();
                self._markerTextsGroup.detach();
                self._markerCoversGroup.detach();
                self._markerShapesGroup.clear();
                self._markerTextsGroup.clear();
                self._markerCoversGroup.clear();
                var markersInfo = self._markersInfo;
                if (markersInfo) {
                    var i = 0,
                        ii = markersInfo.length;
                    for (; i < ii; ++i)
                        markersInfo[i].proxy._dispose();
                    self._markersInfo = null
                }
                else
                    ++self._markersCancelLock
            },
            _renderMarkers: function() {
                var self = this,
                    options = self.option('markerSettings') || {},
                    dataSource = self.option('markers');
                self._themeManager.initCommonMarkerSettings(options);
                self._markerCustomizeCallback = _isFunction(options.customize) ? options.customize : null;
                self._markerClickCallback = _isFunction(options.click) ? options.click : null;
                self._markerSelectionChangedCallback = _isFunction(options.selectionChanged) ? options.selectionChanged : null;
                self._markerHoverEnabled = 'hoverEnabled' in options ? !!options.hoverEnabled : true;
                var selectionMode = _String(options.selectionMode).toLowerCase();
                self._markerSelectionMode = selectionMode === SELECTION_MODE_NONE || selectionMode === SELECTION_MODE_SINGLE || selectionMode === SELECTION_MODE_MULTIPLE ? selectionMode : SELECTION_MODE_SINGLE;
                self._selectedMarkers = self._markerSelectionMode === SELECTION_MODE_MULTIPLE ? {} : null;
                self._markersGroup.append(self._root);
                self._loadData(dataSource, function(dataItems) {
                    self._markersDataItems = dataItems;
                    self._markersCancelLock === 0 ? self._createMarkers() : --self._markersCancelLock;
                    self = null
                })
            },
            _parseMarkers: function() {
                var markersInfo = this._markersInfo,
                    dataItems = this._markersDataItems,
                    projection = this._projection,
                    i = 0,
                    ii = dataItems.length;
                for (; i < ii; ++i)
                    (markersInfo[i] = markersInfo[i] || {}).coordinates = projection.parsePointData((dataItems[i] || {}).coordinates)
            },
            _createMarkers: function() {
                var self = this,
                    markersInfo = self._markersInfo = [];
                self._parseMarkers();
                var rootGroup = self._markersGroup,
                    shapesGroup = self._markerShapesGroup,
                    textsGroup = self._markerTextsGroup,
                    coversGroup = self._markerCoversGroup,
                    renderer = self._renderer,
                    themeManager = self._themeManager,
                    projection = self._projection,
                    dataItems = self._markersDataItems,
                    customizeCallback = self._markerCustomizeCallback,
                    markerInfo,
                    dataItem,
                    i = 0,
                    ii = markersInfo.length,
                    selectedList = [],
                    shape,
                    text,
                    cover;
                shapesGroup.applySettings(themeManager.getCommonMarkerSettings().common);
                textsGroup.applySettings(themeManager.getCommonMarkerSettings().text);
                themeManager.getCommonMarkerSettings().normal.filter = self._markerShadowFilter.ref;
                for (; i < ii; ++i) {
                    markerInfo = markersInfo[i];
                    dataItem = dataItems[i] || {};
                    markerInfo.attributes = dataItem.attributes = dataItem.attributes || {};
                    markerInfo.options = (customizeCallback ? customizeCallback.call(dataItem, dataItem) : null) || {};
                    markerInfo.styles = themeManager.getMarkerSettings(markerInfo.options);
                    shape = text = cover = null;
                    markerInfo.location = projection.projectPoint(markerInfo.coordinates);
                    markerInfo.index = i;
                    shape = renderer.createCircle(markerInfo.location.x, markerInfo.location.y).append(shapesGroup);
                    shape.applySettings({r: markerInfo.styles.size}).applySettings(markerInfo.styles.normal);
                    setElementData(shape.$element, i);
                    if (markerInfo.options.text) {
                        text = renderer.createText(markerInfo.options.text, markerInfo.location.x, markerInfo.location.y).append(textsGroup);
                        cover = renderer.createRect().append(coversGroup);
                        setElementData(cover.$element, i)
                    }
                    markerInfo.shape = shape;
                    markerInfo.text = text;
                    markerInfo.cover = cover;
                    markerInfo.options.isSelected && selectedList.push(markerInfo);
                    markerInfo.proxy = new self._proxyType(self, markerInfo, {
                        type: 'marker',
                        setSelectionCallback: self._setMarkerSelection
                    })
                }
                shapesGroup.append(rootGroup);
                textsGroup.append(rootGroup);
                coversGroup.append(rootGroup);
                self._arrangeMarkers();
                ii = self._markerSelectionMode !== SELECTION_MODE_NONE ? selectedList.length : 0;
                i = ii > 0 && self._markerSelectionMode === SELECTION_MODE_SINGLE ? ii - 1 : 0;
                for (; i < ii; ++i)
                    self._setMarkerSelection(selectedList[i], true, FLAG_NO_CALLBACK);
                self._markersReady = true;
                self._raiseReady()
            },
            _arrangeMarkers: function() {
                var self = this,
                    markersInfo = self._markersInfo,
                    i,
                    ii = markersInfo.length,
                    markerInfo,
                    measureList = [],
                    measureItem,
                    textBox,
                    x,
                    y;
                for (i = 0; i < ii; ++i) {
                    markerInfo = markersInfo[i];
                    measureItem = null;
                    if (markerInfo.text) {
                        textBox = markerInfo.text.getBBox();
                        x = markerInfo.location.x;
                        y = markerInfo.location.y;
                        markerInfo.textOffsetX = _round(x - textBox.x + markerInfo.styles.selectedSize) + 2;
                        markerInfo.textOffsetY = _round(y - textBox.y - textBox.height / 2) - 1;
                        markerInfo.trackerOffsetX = markerInfo.textOffsetX + textBox.x - x - 1;
                        markerInfo.trackerOffsetY = markerInfo.textOffsetY + textBox.y - y - 1;
                        markerInfo.trackerWidth = textBox.width + 2;
                        markerInfo.trackerHeight = textBox.height + 2;
                        measureItem = {
                            text: {
                                x: x + markerInfo.textOffsetX,
                                y: y + markerInfo.textOffsetY
                            },
                            cover: {
                                x: x + markerInfo.trackerOffsetX,
                                y: y + markerInfo.trackerOffsetY,
                                width: markerInfo.trackerWidth,
                                height: markerInfo.trackerHeight
                            }
                        }
                    }
                    measureList.push(measureItem)
                }
                self._markerTextsGroup.detach();
                self._markerCoversGroup.detach();
                for (i = 0; i < ii; ++i) {
                    markerInfo = markersInfo[i];
                    if (markerInfo.text) {
                        measureItem = measureList[i];
                        markerInfo.text.applySettings(measureItem.text);
                        markerInfo.cover.applySettings(measureItem.cover)
                    }
                }
                self._markerTextsGroup.append(self._markersGroup);
                self._markerCoversGroup.append(self._markersGroup)
            },
            _redrawMarkers: function() {
                var markersInfo = this._markersInfo,
                    projection = this._projection,
                    markerInfo,
                    i = 0,
                    ii = markersInfo.length,
                    x,
                    y;
                for (; i < ii; ++i) {
                    markerInfo = markersInfo[i];
                    markerInfo.location = projection.projectPoint(markerInfo.coordinates);
                    x = markerInfo.location.x;
                    y = markerInfo.location.y;
                    markerInfo.shape.applySettings({
                        cx: x,
                        cy: y
                    });
                    markerInfo.extra && markerInfo.extra.applySettings({
                        cx: x,
                        cy: y
                    });
                    if (markerInfo.options.text) {
                        markerInfo.text.applySettings({
                            x: x + markerInfo.textOffsetX,
                            y: y + markerInfo.textOffsetY
                        });
                        markerInfo.cover.applySettings({
                            x: x + markerInfo.trackerOffsetX,
                            y: y + markerInfo.trackerOffsetY
                        })
                    }
                }
                this._DEBUG_markersRedrawn && this._DEBUG_markersRedrawn()
            },
            _applyTransform: function(redraw) {
                var self = this,
                    transform = self._projection.getTransform();
                self._areasGroup.applySettings(transform);
                self._markersGroup.applySettings(transform);
                if (redraw) {
                    self._redrawAreas();
                    self._redrawMarkers()
                }
            },
            _setAreaHover: function(info, state) {
                if (!this._areaHoverEnabled)
                    return;
                state && DX.utils.debug.assert(!info.hovered, 'Area is already hovered');
                !state && DX.utils.debug.assert(info.hovered, 'Area is not hovered');
                info.hovered = !!state;
                if (!info.selected) {
                    info.element.applySettings(info.styles[state ? 'hovered' : 'normal']);
                    state ? info.element.toForeground() : info.element.toBackground()
                }
            },
            _setMarkerHover: function(info, state) {
                if (!this._markerHoverEnabled)
                    return;
                state && DX.utils.debug.assert(!info.hovered, 'Marker is already hovered');
                !state && DX.utils.debug.assert(info.hovered, 'Marker is not hovered');
                info.hovered = !!state;
                if (!info.selected)
                    if (info.hovered) {
                        if (!info.extra) {
                            info.extra = this._renderer.createCircle(info.location.x, info.location.y);
                            setElementData(info.extra.$element, info.index)
                        }
                        info.shape.applySettings({r: info.styles.hoveredSize}).applySettings(info.styles.hovered);
                        info.extra.applySettings({r: info.styles.hoveredExtraSize}).applySettings(info.styles.extraHovered);
                        info.extra.insertBefore(info.shape)
                    }
                    else {
                        info.shape.applySettings({r: info.styles.size}).applySettings(info.styles.normal);
                        info.extra.detach();
                        info.extra.dispose();
                        info.extra = null
                    }
            },
            _setAreaSelection: function(info, state, flag) {
                state && DX.utils.debug.assert(!info.selected, 'Area is already selected');
                !state && DX.utils.debug.assert(info.selected, 'Area is not selected');
                var self = this;
                if (self._areaSelectionMode === SELECTION_MODE_NONE)
                    return;
                info.selected = !!state;
                info.element.applySettings(info.styles[state ? 'selected' : info.hovered ? 'hovered' : 'normal']);
                if (info.selected)
                    !info.hovered && info.element.toForeground();
                else
                    !info.hovered && info.element.toBackground();
                if (!(flag & FLAG_NO_CALLBACK) && self._areaSelectionChangedCallback)
                    self._areaSelectionChangedCallback.call(info.proxy, info.proxy);
                if (!(flag & FLAG_NO_CHECK))
                    if (self._areaSelectionMode === SELECTION_MODE_SINGLE) {
                        info.selected && self._selectedAreas && self._setAreaSelection(self._selectedAreas, false, flag | FLAG_NO_CHECK);
                        self._selectedAreas = info.selected ? info : null
                    }
                    else
                        info.selected ? self._selectedAreas[info.index] = info : delete self._selectedAreas[info.index]
            },
            _setMarkerSelection: function(info, state, flag) {
                state && DX.utils.debug.assert(!info.selected, 'Marker is already selected');
                !state && DX.utils.debug.assert(info.selected, 'Marker is not selected');
                var self = this;
                if (self._markerSelectionMode === SELECTION_MODE_NONE)
                    return;
                info.selected = !!state;
                if (info.selected) {
                    if (!info.extra) {
                        info.extra = self._renderer.createCircle(info.location.x, info.location.y);
                        setElementData(info.extra.$element, info.index)
                    }
                    info.shape.applySettings({r: info.styles.selectedSize}).applySettings(info.styles.selected);
                    info.extra.applySettings({r: info.styles.selectedExtraSize}).applySettings(info.styles.extraSelected);
                    info.extra.insertBefore(info.shape)
                }
                else if (info.hovered) {
                    info.shape.applySettings({r: info.styles.hoveredSize}).applySettings(info.styles.hovered);
                    info.extra.applySettings({r: info.styles.hoveredExtraSize}).applySettings(info.styles.extraHovered)
                }
                else {
                    info.shape.applySettings({r: info.styles.size}).applySettings(info.styles.normal);
                    info.extra.detach();
                    info.extra.dispose();
                    info.extra = null
                }
                if (!(flag & FLAG_NO_CALLBACK) && self._markerSelectionChangedCallback)
                    self._markerSelectionChangedCallback.call(info.proxy, info.proxy);
                if (!(flag & FLAG_NO_CHECK))
                    if (self._markerSelectionMode === SELECTION_MODE_SINGLE) {
                        info.selected && self._selectedMarkers && self._setMarkerSelection(self._selectedMarkers, false, flag | FLAG_NO_CHECK);
                        self._selectedMarkers = info.selected ? info : null
                    }
                    else
                        info.selected ? self._selectedMarkers[info.index] = info : delete self._selectedMarkers[info.index]
            },
            _refresh: function() {
                var self = this,
                    callBase = self.callBase;
                self._endLoading(function() {
                    callBase.call(self)
                })
            },
            render: function(mode) {
                if (mode === 'resize')
                    this._resize();
                else
                    this._refresh();
                return this
            },
            getAreas: function() {
                var infos = this._areasInfo,
                    i = 0,
                    ii = infos.length,
                    list = [];
                for (; i < ii; ++i)
                    list.push(infos[i].proxy);
                return list
            },
            getMarkers: function() {
                var infos = this._markersInfo,
                    i = 0,
                    ii = infos.length,
                    list = [];
                for (; i < ii; ++i)
                    list.push(infos[i].proxy);
                return list
            },
            clearAreaSelection: function() {
                var self = this,
                    selectedAreas = self._selectedAreas;
                if (self._areaSelectionMode === SELECTION_MODE_SINGLE)
                    selectedAreas && self._setAreaSelection(selectedAreas, false);
                else if (self._areaSelectionMode === SELECTION_MODE_MULTIPLE) {
                    var key;
                    for (key in selectedAreas)
                        self._setAreaSelection(selectedAreas[key], false)
                }
                return self
            },
            clearMarkerSelection: function() {
                var self = this,
                    selectedMarkers = self._selectedMarkers;
                if (self._markerSelectionMode === SELECTION_MODE_SINGLE)
                    selectedMarkers && self._setMarkerSelection(selectedMarkers, false);
                else if (self._markerSelectionMode === SELECTION_MODE_MULTIPLE) {
                    var key;
                    for (key in selectedMarkers)
                        self._setMarkerSelection(selectedMarkers[key], false)
                }
                return self
            },
            clearSelection: function() {
                return this.clearAreaSelection().clearMarkerSelection()
            }
        }).include(DX.viz.core.widgetMarkupMixin).inherit(DX.viz.core.loadIndicatorMixin.base).redefine(DX.viz.core.loadIndicatorMixin.map);
        function setElementData($element, index) {
            $element.data('index', index)
        }
        function getElementData($element) {
            return $element.data('index')
        }
        DX.viz.map._utils = {
            getElementData: getElementData,
            setElementData: setElementData
        };
        function parseAreaCoordinatesDefault(dataItem) {
            return this._projection.parseAreaData(dataItem.coordinates)
        }
        function parseAreaCoordinatesGeoJson(dataItem) {
            if (dataItem.geometry) {
                var type = dataItem.geometry.type,
                    coordinates = dataItem.geometry.coordinates;
                if (coordinates && (type === 'Polygon' || type === 'MultiPolygon')) {
                    type === 'MultiPolygon' && (coordinates = [].concat.apply([], coordinates));
                    return this._projection.parseAreaData(coordinates)
                }
            }
            return []
        }
        function controlResetCallback() {
            var zoom = this._projection.getZoom();
            this._projection.setCenter(null).setZoom(null);
            this._applyTransform(zoom !== this._projection.getZoom());
            this._centerChangedCallback(this._projection.getCenter());
            this._zoomFactorChangedCallback(this._projection.getZoom())
        }
        function controlBeginMoveCallback(){}
        function controlEndMoveCallback() {
            this._centerChangedCallback(this._projection.getCenter())
        }
        function controlMoveCallback(dx, dy) {
            this._projection.moveCenter(dx, dy);
            this._applyTransform()
        }
        function controlZoomCallback(zoom) {
            this._projection.setZoom(zoom);
            this._applyTransform(true);
            this._zoomFactorChangedCallback(this._projection.getZoom())
        }
        function startCallback(arg) {
            arg.data = getElementData(arg.$target);
            this._controlBar.processStart(arg)
        }
        function moveCallback(arg) {
            arg.data = getElementData(arg.$target);
            this._controlBar.processMove(arg)
        }
        function endCallback(arg) {
            arg.data = getElementData(arg.$target);
            this._controlBar.processEnd(arg)
        }
        function wheelCallback(arg) {
            this._controlBar.processWheel(arg)
        }
        function hoverOnCallback(arg) {
            var index = getElementData(arg.$target);
            switch (arg.category) {
                case'areas':
                    this._setAreaHover(this._areasInfo[index], true);
                    break;
                case'markers':
                    this._setMarkerHover(this._markersInfo[index], true);
                    break;
                default:
                    DX.utils.debug.assert(false, 'Unknown hover-on category!');
                    break
            }
        }
        function hoverOffCallback(arg) {
            var index = getElementData(arg.$target);
            switch (arg.category) {
                case'areas':
                    this._setAreaHover(this._areasInfo[index], false);
                    break;
                case'markers':
                    this._setMarkerHover(this._markersInfo[index], false);
                    break;
                default:
                    DX.utils.debug.assert(false, 'Unknown hover-off category!');
                    break
            }
        }
        function clickCallback(arg) {
            var map = this,
                index = getElementData(arg.$target),
                callback,
                proxy;
            switch (arg.category) {
                case'areas':
                    callback = map._areaClickCallback;
                    proxy = map._areasInfo[index].proxy;
                    break;
                case'markers':
                    callback = map._markerClickCallback;
                    proxy = map._markersInfo[index].proxy;
                    break;
                default:
                    DX.utils.debug.assert(false, 'Unknown click category!');
                    break
            }
            callback && callback.call(proxy, proxy)
        }
        function checkTooltipCallback(arg) {
            var index = getElementData(arg.$target),
                info;
            switch (arg.category) {
                case'areas':
                    info = this._areasInfo[index];
                    break;
                case'markers':
                    info = this._markersInfo[index];
                    break;
                default:
                    DX.utils.debug.assert(false, 'Unknown tooltip-check category!');
                    break
            }
            return this._tooltip.check(info.proxy)
        }
        function showTooltipCallback() {
            this._tooltip.show()
        }
        function moveTooltipCallback(arg) {
            var offset = _getRootOffset(this._renderer);
            this._tooltip.move({
                x: arg.x - offset.left,
                y: arg.y - offset.top
            })
        }
        function hideTooltipCallback() {
            this._tooltip.hide()
        }
        DX.ui.registerComponent('dxVectorMap', DX.viz.map.Map);
        DX.viz.map.sources = {};
        DX.viz.map._tests = {}
    })(DevExpress, jQuery);
    /*! Module viz-vectormap, file projection.js */
    (function(DX, undefined) {
        var _Number = Number,
            _tan = Math.tan,
            _atan = Math.atan,
            _exp = Math.exp,
            _round = Math.round,
            _ln = Math.log,
            _isArray = DX.utils.isArray,
            _buildPath = DX.viz.renderers.buildPath;
        var DOUBLE_PI = Math.PI * 2,
            HALF_PI = Math.PI / 2,
            QUARTER_PI = Math.PI / 4,
            PI_TO_180 = Math.PI / 180;
        var ASPECT_RATIO = 1,
            MIN_LON = -180,
            MAX_LON = 180,
            MIN_LAT = -90,
            MAX_LAT = 90;
        var DEFAULT_MIN_ZOOM = 1,
            DEFAULT_MAX_ZOOM = 32;
        var Projection = DX.Class.inherit({
                setBounds: function(bounds) {
                    bounds = bounds || {};
                    var self = this;
                    self._minlon = bounds.minLon >= MIN_LON ? _Number(bounds.minLon) : MIN_LON;
                    self._maxlon = bounds.maxLon <= MAX_LON ? _Number(bounds.maxLon) : MAX_LON;
                    self._minlat = bounds.minLat >= MIN_LAT ? _Number(bounds.minLat) : MIN_LAT;
                    self._maxlat = bounds.maxLat <= MAX_LAT ? _Number(bounds.maxLat) : MAX_LAT;
                    return self
                },
                setSize: function(width, height) {
                    var self = this;
                    self._width = width;
                    self._height = height;
                    self._setupBounds();
                    self._adjustZoom();
                    self._adjustCenter();
                    return self
                },
                _setupBounds: function() {
                    var self = this,
                        width = self._width,
                        height = self._height,
                        size = height / width;
                    size = size <= ASPECT_RATIO ? height : width;
                    self._radius = size / DOUBLE_PI;
                    self._x0 = width / 2;
                    self._y0 = height / 2;
                    self._miny = self._y0 - size / 2;
                    self._maxy = self._y0 + size / 2;
                    if (self._maxlon - self._minlon >= 360 && self._maxlat - self._minlat >= 180)
                        return;
                    var coords1 = self._project([self._minlon, self._maxlat]),
                        coords2 = self._project([self._maxlon, self._minlat]),
                        xratio = width / (coords2.x - coords1.x),
                        yratio = height / (coords2.y - coords1.y),
                        ratio = xratio;
                    if (xratio < yratio) {
                        ratio = xratio;
                        xratio = (coords1.y + coords2.y) / 2;
                        yratio = height / ratio / 2;
                        coords1.y = xratio - yratio;
                        coords2.y = xratio + yratio
                    }
                    else if (xratio > yratio) {
                        ratio = yratio;
                        yratio = (coords1.x + coords2.x) / 2;
                        xratio = width / ratio / 2;
                        coords1.x = yratio - xratio;
                        coords2.x = yratio + xratio
                    }
                    self._x0 = -coords1.x * ratio + width * ratio / 2;
                    self._y0 = -coords1.y * ratio + height * ratio / 2;
                    self._radius *= ratio;
                    size *= ratio;
                    self._miny = self._y0 - size / 2;
                    self._maxy = self._y0 + size / 2
                },
                _project: function(coords, noTruncate) {
                    var self = this,
                        lon = coords[0] * PI_TO_180,
                        lat,
                        x = self._radius * lon + self._x0,
                        y;
                    if (lat <= MIN_LAT)
                        y = self._maxy;
                    else if (lat >= MAX_LAT)
                        y = self._miny;
                    else {
                        lat = coords[1] * PI_TO_180;
                        y = self._radius * -_ln(_tan(QUARTER_PI + lat / 2)) + self._y0
                    }
                    if (!noTruncate) {
                        y <= self._miny && (y = self._miny);
                        y >= self._maxy && (y = self._maxy)
                    }
                    return {
                            x: x,
                            y: y
                        }
                },
                _invproject: function(x, y) {
                    var self = this,
                        lon = (x - self._x0) / self._radius,
                        lat = 2 * _atan(_exp((self._y0 - y) / self._radius)) - HALF_PI;
                    return {
                            lat: lat / PI_TO_180,
                            lon: lon / PI_TO_180
                        }
                },
                parseAreaData: function(coordinates) {
                    var self = this,
                        i = 0,
                        ii = _isArray(coordinates) ? coordinates.length : 0,
                        subcoords,
                        j,
                        jj,
                        subresult,
                        result = [],
                        item;
                    for (; i < ii; ++i) {
                        subcoords = coordinates[i];
                        subresult = [];
                        for (j = 0, jj = _isArray(subcoords) ? subcoords.length : 0; j < jj; ++j) {
                            item = self._project(subcoords[j]);
                            subresult.push(item.x, item.y)
                        }
                        result.push(subresult)
                    }
                    return result
                },
                parsePointData: function(coordinates) {
                    return coordinates ? this._project(coordinates) : {}
                },
                projectArea: function(data) {
                    var k = 0,
                        kk = data.length,
                        partialData,
                        i,
                        ii,
                        list = [],
                        partialPath,
                        zoom = this._zoom,
                        xzoom = this._xzoom,
                        yzoom = this._yzoom;
                    for (; k < kk; ++k) {
                        partialData = data[k];
                        partialPath = [];
                        for (i = 0, ii = partialData.length; i < ii; i += 2)
                            partialPath.push(zoom * partialData[i] - xzoom, zoom * partialData[i + 1] - yzoom);
                        list.push(_buildPath(partialPath))
                    }
                    return list.join(' ')
                },
                projectPoint: function(data) {
                    return {
                            x: _round(this._zoom * data.x - this._xzoom),
                            y: _round(this._zoom * data.y - this._yzoom)
                        }
                },
                _adjustZoom: function() {
                    var self = this;
                    self._xzoom = self._width * (self._zoom - 1) / 2;
                    self._yzoom = self._height * (self._zoom - 1) / 2
                },
                _adjustCenter: function() {
                    var self = this,
                        center = self._project([self._loncenter, self._latcenter], true);
                    self._dxcenter = (self._x0 - (self._xcenter = center.x)) * self._zoom;
                    self._dycenter = (self._y0 - (self._ycenter = center.y)) * self._zoom
                },
                getZoom: function() {
                    return this._zoom
                },
                setZoom: function(zoom) {
                    var self = this,
                        _zoom = _Number(zoom);
                    _zoom < self._minZoom && (_zoom = self._minZoom);
                    _zoom > self._maxZoom && (_zoom = self._maxZoom);
                    self._zoom = self._minZoom <= _zoom && _zoom <= self._maxZoom ? _zoom : DEFAULT_MIN_ZOOM;
                    self._adjustZoom();
                    self._adjustCenter();
                    return self
                },
                setMaxZoom: function(maxZoom) {
                    this._minZoom = DEFAULT_MIN_ZOOM;
                    this._maxZoom = maxZoom >= DEFAULT_MIN_ZOOM ? _Number(maxZoom) : DEFAULT_MAX_ZOOM;
                    return this
                },
                getMinZoom: function() {
                    return 1
                },
                getMaxZoom: function() {
                    return this._maxZoom
                },
                getCenter: function() {
                    return [this._loncenter, this._latcenter]
                },
                setCenter: function(center) {
                    center = center || [];
                    this._loncenter = _Number(center[0]) || _Number(center.lon) || 0;
                    this._latcenter = _Number(center[1]) || _Number(center.lat) || 0;
                    this._adjustCenter();
                    return this
                },
                moveCenter: function(screenDx, screenDy) {
                    var self = this,
                        newx = self._xcenter + screenDx / self._zoom,
                        newy = self._ycenter + screenDy / self._zoom,
                        coords = self._invproject(newx, newy);
                    return self.setCenter(coords)
                },
                getTransform: function() {
                    return {
                            translateX: this._dxcenter,
                            translateY: this._dycenter
                        }
                }
            });
        DX.viz.map._tests.Projection = Projection;
        DX.viz.map.Map.include({_projectionType: Projection})
    })(DevExpress);
    /*! Module viz-vectormap, file controlBar.js */
    (function(DX, undefined) {
        var _buildPath = DX.viz.renderers.buildPath,
            _setTimeout = setTimeout,
            _clearTimeout = clearTimeout,
            _round = Math.round,
            _pow = Math.pow,
            _ln = Math.log,
            _setElementData = DX.viz.map._utils.setElementData;
        var _LN2 = Math.LN2;
        var COMMAND_RESET = 'command-reset',
            COMMAND_MOVE_UP = 'command-move-up',
            COMMAND_MOVE_RIGHT = 'command-move-right',
            COMMAND_MOVE_DOWN = 'command-move-down',
            COMMAND_MOVE_LEFT = 'command-move-left',
            COMMAND_ZOOM_IN = 'command-zoom-in',
            COMMAND_ZOOM_OUT = 'command-zoom-out',
            COMMAND_ZOOM_DRAG = 'command-zoom-drag';
        var COMMAND_TO_TYPE_MAP = {};
        COMMAND_TO_TYPE_MAP[COMMAND_RESET] = ResetCommand;
        COMMAND_TO_TYPE_MAP[COMMAND_MOVE_UP] = COMMAND_TO_TYPE_MAP[COMMAND_MOVE_RIGHT] = COMMAND_TO_TYPE_MAP[COMMAND_MOVE_DOWN] = COMMAND_TO_TYPE_MAP[COMMAND_MOVE_LEFT] = MoveCommand;
        COMMAND_TO_TYPE_MAP[COMMAND_ZOOM_IN] = COMMAND_TO_TYPE_MAP[COMMAND_ZOOM_OUT] = ZoomCommand;
        COMMAND_TO_TYPE_MAP[COMMAND_ZOOM_DRAG] = ZoomDragCommand;
        var ControlBar = DX.Class.inherit({
                ctor: function(parameters) {
                    var self = this;
                    self._container = parameters.container;
                    self._createElements(parameters.renderer);
                    var context = parameters.context,
                        resetCallback = parameters.resetCallback,
                        beginMoveCallback = parameters.beginMoveCallback,
                        endMoveCallback = parameters.endMoveCallback,
                        moveCallback = parameters.moveCallback,
                        zoomCallback = parameters.zoomCallback;
                    self._reset = function() {
                        resetCallback.call(context)
                    };
                    self._beginMove = function() {
                        beginMoveCallback.call(context)
                    };
                    self._endMove = function() {
                        endMoveCallback.call(context)
                    };
                    self._move = function(dx, dy) {
                        moveCallback.call(context, dx, dy)
                    };
                    self._zoom = function(zoom) {
                        zoomCallback.call(context, zoom)
                    };
                    self._dispose = function() {
                        delete this._reset;
                        delete this._move;
                        delete this._zoom;
                        delete this._dispose;
                        context = resetCallback = moveCallback = zoomCallback = null
                    };
                    parameters = null
                },
                _createElements: function(renderer) {
                    var rootGroup = this._root = renderer.createGroup({'class': 'dxm-control-bar'}),
                        buttonsGroup = renderer.createGroup({'class': 'dxm-control-buttons'}).append(rootGroup),
                        trackersGroup = renderer.createGroup({
                            stroke: 'none',
                            strokeWidth: 0,
                            fill: '#000000',
                            opacity: 0.0001,
                            cursor: 'pointer'
                        }).append(rootGroup),
                        options = {
                            bigCircleSize: 58,
                            smallCircleSize: 28,
                            buttonSize: 10,
                            arrowButtonOffset: 20,
                            incdecButtonSize: 11,
                            incButtonOffset: 66,
                            decButtonOffset: 227,
                            sliderLineStartOffset: 88.5,
                            sliderLineEndOffset: 205.5,
                            sliderLength: 20,
                            sliderWidth: 8,
                            trackerGap: 4
                        };
                    this._buttonsGroup = buttonsGroup;
                    this._createButtons(renderer, buttonsGroup, options);
                    this._createTrackers(renderer, trackersGroup, options);
                    rootGroup.applySettings({
                        translateX: 50.5,
                        translateY: 50.5
                    })
                },
                _createButtons: function(renderer, group, options) {
                    var size = options.buttonSize / 2,
                        offset1 = options.arrowButtonOffset - size,
                        offset2 = options.arrowButtonOffset,
                        incdecButtonSize = options.incdecButtonSize / 2;
                    renderer.createCircle(0, 0, options.bigCircleSize / 2).append(group);
                    renderer.createCircle(0, 0, size).append(group);
                    renderer.createPath([-size, -offset1, 0, -offset2, size, -offset1]).append(group);
                    renderer.createPath([offset1, -size, offset2, 0, offset1, size]).append(group);
                    renderer.createPath([size, offset1, 0, offset2, -size, offset1]).append(group);
                    renderer.createPath([-offset1, size, -offset2, 0, -offset1, -size]).append(group);
                    renderer.createCircle(0, options.incButtonOffset, options.smallCircleSize / 2).append(group);
                    renderer.createSimplePath({d: _buildPath([-incdecButtonSize, options.incButtonOffset, incdecButtonSize, options.incButtonOffset]) + ' ' + _buildPath([0, options.incButtonOffset - incdecButtonSize, 0, options.incButtonOffset + incdecButtonSize])}).append(group);
                    renderer.createCircle(0, options.decButtonOffset, options.smallCircleSize / 2).append(group);
                    renderer.createSimplePath({d: _buildPath([-incdecButtonSize, options.decButtonOffset, incdecButtonSize, options.decButtonOffset])}).append(group);
                    renderer.createSimplePath({d: _buildPath([0, options.sliderLineStartOffset, 0, options.sliderLineEndOffset])}).append(group);
                    this._zoomDrag = renderer.createRect(-options.sliderLength / 2, options.sliderLineEndOffset - options.sliderWidth / 2, options.sliderLength, options.sliderWidth).append(group);
                    this._sliderLineLength = options.sliderLineEndOffset - options.sliderLineStartOffset
                },
                _createTrackers: function(renderer, group, options) {
                    var size = _round((options.arrowButtonOffset - options.trackerGap) / 2),
                        offset1 = options.arrowButtonOffset - size,
                        offset2 = _round(_pow(options.bigCircleSize * options.bigCircleSize / 4 - size * size, 0.5)),
                        size2 = offset2 - offset1,
                        element;
                    element = renderer.createRect(-size, -size, size * 2, size * 2).append(group);
                    _setElementData(element.$element, COMMAND_RESET);
                    element = renderer.createRect(-size, -offset2, size * 2, size2).append(group);
                    _setElementData(element.$element, COMMAND_MOVE_UP);
                    element = renderer.createRect(offset1, -size, size2, size * 2).append(group);
                    _setElementData(element.$element, COMMAND_MOVE_RIGHT);
                    element = renderer.createRect(-size, offset1, size * 2, size2).append(group);
                    _setElementData(element.$element, COMMAND_MOVE_DOWN);
                    element = renderer.createRect(-offset2, -size, size2, size * 2).append(group);
                    _setElementData(element.$element, COMMAND_MOVE_LEFT);
                    element = renderer.createCircle(0, options.incButtonOffset, options.smallCircleSize / 2).append(group);
                    _setElementData(element.$element, COMMAND_ZOOM_IN);
                    element = renderer.createCircle(0, options.decButtonOffset, options.smallCircleSize / 2).append(group);
                    _setElementData(element.$element, COMMAND_ZOOM_OUT);
                    element = this._zoomDragCover = renderer.createRect(-options.sliderLength / 2, options.sliderLineEndOffset - options.sliderWidth / 2, options.sliderLength, options.sliderWidth).append(group);
                    _setElementData(element.$element, COMMAND_ZOOM_DRAG)
                },
                dispose: function() {
                    var self = this;
                    delete self._container;
                    self._dispose();
                    self._root.clear();
                    delete self._root;
                    delete self._buttonsGroup;
                    delete self._zoomDrag;
                    delete self._zoomDragCover;
                    return self
                },
                setData: function(data) {
                    var self = this;
                    self._minZoomFactor = _ln(data.minZoom) / _LN2;
                    self._maxZoomFactor = _ln(data.maxZoom) / _LN2;
                    self._zoomCoeff = self._sliderLineLength / (self._maxZoomFactor - self._minZoomFactor);
                    self._zoomFactorStep = (self._maxZoomFactor - self._minZoomFactor) / 10;
                    return self
                },
                setZoom: function(zoom) {
                    this._adjustZoom(_ln(zoom) / _LN2);
                    return this
                },
                setOptions: function(options) {
                    options = options || {};
                    this._enabled = options.enabled !== undefined ? !!options.enabled : true;
                    this._buttonsGroup.applySettings(options.shape);
                    return this
                },
                clean: function() {
                    this._enabled && this._root.detach();
                    return this
                },
                render: function() {
                    this._enabled && this._root.append(this._container);
                    return this
                },
                _adjustZoom: function(zoomFactor) {
                    var self = this,
                        value = zoomFactor;
                    value <= self._maxZoomFactor || (value = self._maxZoomFactor);
                    value >= self._minZoomFactor || (value = self._minZoomFactor);
                    self._zoomFactor = value;
                    var offset = -value * self._zoomCoeff;
                    self._zoomDrag.applySettings({translateY: offset});
                    self._zoomDragCover.applySettings({translateY: offset})
                },
                _applyZoom: function() {
                    this._zoom(_pow(2, this._zoomFactor))
                },
                processStart: function(arg) {
                    var commandType = COMMAND_TO_TYPE_MAP[arg.data] || MoveScreenCommand;
                    this._command = new commandType(this, arg);
                    return this
                },
                processMove: function(arg) {
                    this._command.update(arg);
                    return this
                },
                processEnd: function(arg) {
                    this._command.finish(arg);
                    return this
                },
                processWheel: function(arg) {
                    var self = this;
                    self._adjustZoom(self._zoomFactor + arg.delta * self._zoomFactorStep);
                    self._applyZoom();
                    return this
                }
            });
        function disposeCommand(command) {
            delete command._owner;
            command.update = function(){};
            command.finish = function(){}
        }
        function MoveScreenCommand(owner, arg) {
            this._owner = owner;
            this._x = arg.x;
            this._y = arg.y;
            this._owner._beginMove()
        }
        MoveScreenCommand.prototype.update = function(arg) {
            var self = this;
            self._owner._move(self._x - arg.x, self._y - arg.y);
            self._x = arg.x;
            self._y = arg.y
        };
        MoveScreenCommand.prototype.finish = function() {
            this._owner._endMove();
            disposeCommand(this)
        };
        function ResetCommand(owner, arg) {
            this._owner = owner;
            this._command = arg.data
        }
        ResetCommand.prototype.update = function(arg) {
            arg.data !== this._command && disposeCommand(this)
        };
        ResetCommand.prototype.finish = function() {
            this._owner._reset();
            this._owner._adjustZoom(this._owner._minZoomFactor);
            disposeCommand(this)
        };
        function MoveCommand(owner, arg) {
            this._command = arg.data;
            var timeout = null,
                interval = 100,
                dx = 0,
                dy = 0;
            switch (this._command) {
                case COMMAND_MOVE_UP:
                    dy = -10;
                    break;
                case COMMAND_MOVE_RIGHT:
                    dx = 10;
                    break;
                case COMMAND_MOVE_DOWN:
                    dy = 10;
                    break;
                case COMMAND_MOVE_LEFT:
                    dx = -10;
                    break
            }
            function callback() {
                owner._move(dx, dy);
                timeout = _setTimeout(callback, interval)
            }
            this._stop = function() {
                _clearTimeout(timeout);
                owner._endMove();
                this._stop = owner = callback = null;
                return this
            };
            arg = null;
            owner._beginMove();
            callback()
        }
        MoveCommand.prototype.update = function(arg) {
            this._command !== arg.data && this.finish()
        };
        MoveCommand.prototype.finish = function() {
            disposeCommand(this._stop())
        };
        function ZoomCommand(owner, arg) {
            this._owner = owner;
            this._command = arg.data;
            var timeout = null,
                interval = 150,
                dzoom = this._command === COMMAND_ZOOM_IN ? owner._zoomFactorStep : -owner._zoomFactorStep;
            function callback() {
                owner._adjustZoom(owner._zoomFactor + dzoom);
                timeout = _setTimeout(callback, interval)
            }
            this._stop = function() {
                _clearTimeout(timeout);
                this._stop = owner = callback = null;
                return this
            };
            arg = null;
            callback()
        }
        ZoomCommand.prototype.update = function(arg) {
            this._command !== arg.data && this.finish()
        };
        ZoomCommand.prototype.finish = function() {
            this._owner._applyZoom();
            disposeCommand(this._stop())
        };
        function ZoomDragCommand(owner, arg) {
            this._owner = owner;
            this._pos = arg.y
        }
        ZoomDragCommand.prototype.update = function(arg) {
            this._owner._adjustZoom(this._owner._zoomFactor + (this._pos - arg.y) / this._owner._zoomCoeff);
            this._pos = arg.y
        };
        ZoomDragCommand.prototype.finish = function() {
            this._owner._applyZoom();
            disposeCommand(this)
        };
        DX.viz.map._tests.ControlBar = ControlBar;
        DX.viz.map.Map.include({_controlBarType: ControlBar})
    })(DevExpress);
    /*! Module viz-vectormap, file legend.js */
    (function(DX, $, undefined) {
        var _max = Math.max,
            _min = Math.min;
        var Legend = DX.Class.inherit({
                ctor: function(parameters) {
                    var self = this;
                    self._container = parameters.container;
                    self._renderer = parameters.renderer;
                    self._themeManager = parameters.themeManager;
                    self._root = self._renderer.createGroup({'class': 'dxm-legend'});
                    self._background = self._renderer.createRect(0, 0, 0, 0, 0, {'class': 'dxm-legend-background'}).append(self._root);
                    self._itemsGroup = self._renderer.createGroup().append(self._root);
                    self._clip = self._renderer.createClipRect().append();
                    self._itemsGroup.applySettings({clipId: self._clip.id})
                },
                dispose: function() {
                    var self = this;
                    self._root.clear();
                    self._clip.dispose();
                    self._root = self._background = self._itemsGroup = self._clip = self._container = self._renderer = null;
                    return self
                },
                setSize: function(width, height) {
                    var self = this;
                    self._containerWidth = width;
                    self._containerHeight = height;
                    self._hasItems && self._adjustLocation();
                    return self
                },
                setOptions: function(options) {
                    options = options || {};
                    var self = this;
                    self._items = options.items && options.items.length > 0 ? options.items : [];
                    self._enabled = (options.enabled !== undefined ? !!options.enabled : true) && self._items.length > 0;
                    self._metrics = options.metrics;
                    self._backgroundSettings = options.background;
                    self._textSettings = options.text;
                    return self
                },
                _createItems: function() {
                    var self = this,
                        metrics = self._metrics,
                        renderer = self._renderer,
                        themeManager = self._themeManager,
                        textSettings = self._textSettings,
                        group = self._itemsGroup,
                        items = self._items,
                        i,
                        ii = items.length,
                        item,
                        texts = [],
                        bbox,
                        leftOffset = metrics.horizontalPadding,
                        topOffset = metrics.verticalPadding,
                        itemSize = metrics.itemSize,
                        itemSpacing = metrics.itemSpacing,
                        textIndent = metrics.textIndent,
                        actualItemSize,
                        position;
                    for (i = 0; i < ii; ++i)
                        texts.push(renderer.createText(items[i].text, 0, 0, textSettings).append(group));
                    for (i = 0; i < ii; ++i) {
                        bbox = texts[i].getBBox();
                        actualItemSize = _max(itemSize, bbox.height);
                        position = topOffset + actualItemSize / 2;
                        renderer.createRect(leftOffset, position - itemSize / 2, itemSize, itemSize, 0, themeManager.getLegendItemSettings(items[i])).append(group);
                        texts[i].applySettings({
                            x: leftOffset + itemSize + textIndent,
                            y: position - bbox.y - bbox.height / 2
                        });
                        topOffset += actualItemSize + itemSpacing
                    }
                    self._totalWidth = _min(self._metrics.maxWidth, group.getBBox().width + 2 * metrics.horizontalPadding);
                    self._totalHeight = _min(self._metrics.maxHeight, topOffset + metrics.verticalPadding - itemSpacing);
                    self._background.applySettings({
                        x: 0,
                        y: 0,
                        width: self._totalWidth,
                        height: self._totalHeight
                    });
                    self._clip.updateRectangle({
                        x: 0,
                        y: 0,
                        width: self._totalWidth,
                        height: self._totalHeight
                    });
                    self._adjustLocation();
                    self._hasItems = true
                },
                _adjustLocation: function() {
                    var self = this;
                    self._root.applySettings({
                        translateX: self._containerWidth - self._totalWidth - self._metrics.horizontalIndent,
                        translateY: self._containerHeight - self._totalHeight - self._metrics.verticalIndent
                    })
                },
                clean: function() {
                    var self = this;
                    if (self._enabled) {
                        self._root.detach();
                        self._itemsGroup.clear();
                        self._hasItems = null
                    }
                    return self
                },
                render: function() {
                    var self = this;
                    if (self._enabled) {
                        self._background.applySettings(self._backgroundSettings);
                        self._root.append(self._container);
                        self._createItems()
                    }
                    return self
                }
            });
        DX.viz.map._tests.Legend = Legend;
        DX.viz.map.Map.include({_legendType: Legend})
    })(DevExpress, jQuery);
    /*! Module viz-vectormap, file tracker.js */
    (function(DX, $, undefined) {
        var _addNamespace = DX.ui.events.addNamespace,
            _isTouchEvent = function(event) {
                var type = event.originalEvent.type,
                    pointerType = event.originalEvent.pointerType;
                return /^touch/.test(type) || /^MSPointer/.test(type) && pointerType !== 4 || /^pointer/.test(type) && pointerType !== 'mouse'
            },
            _abs = Math.abs,
            _now = $.now,
            _setTimeout = setTimeout,
            _clearTimeout = clearTimeout,
            _getElementData = DX.viz.map._utils.getElementData;
        var _document = $(document);
        var EVENT_NAMESPACE = 'dxVectorMap',
            EVENT_NAMES = {};
        var TOOLTIP_SHOW_DELAY = 300,
            TOOLTIP_HIDE_DELAY = 300,
            TOOLTIP_TOUCH_SHOW_DELAY = 400,
            TOOLTIP_TOUCH_HIDE_DELAY = 300;
        setupEvents();
        function setupEvents() {
            var wnd = window,
                isPointer = wnd.navigator.pointerEnabled,
                isMSPointer = wnd.navigator.msPointerEnabled,
                isTouch = 'ontouchstart' in wnd;
            switch (arguments[0]) {
                case'pointer':
                    isPointer = true;
                    isMSPointer = isTouch = false;
                    break;
                case'MSPointer':
                    isMSPointer = true;
                    isPointer = isTouch = false;
                    break;
                case'touch':
                    isTouch = true;
                    isPointer = isMSPointer = false;
                    break;
                case'mouse':
                    isPointer = isMSPointer = isTouch = false;
                    break
            }
            EVENT_NAMES.start = _addNamespace(isPointer ? 'pointerdown' : isMSPointer ? 'MSPointerDown' : isTouch ? 'touchstart mousedown' : 'mousedown', EVENT_NAMESPACE);
            EVENT_NAMES.move = _addNamespace(isPointer ? 'pointermove' : isMSPointer ? 'MSPointerMove' : isTouch ? 'touchmove mousemove' : 'mousemove', EVENT_NAMESPACE);
            EVENT_NAMES.end = _addNamespace(isPointer ? 'pointerup' : isMSPointer ? 'MSPointerUp' : isTouch ? 'touchend mouseup' : 'mouseup', EVENT_NAMESPACE);
            EVENT_NAMES.over = _addNamespace(isPointer ? 'pointerover' : isMSPointer ? 'MSPointerOver' : 'mouseover', EVENT_NAMESPACE);
            EVENT_NAMES.out = _addNamespace(isPointer ? 'pointerout' : isMSPointer ? 'MSPointerOut' : 'mouseout', EVENT_NAMESPACE);
            EVENT_NAMES.wheel = _addNamespace('mousewheel DOMMouseScroll', EVENT_NAMESPACE)
        }
        function getEventCoords(event) {
            var originalEvent = event.originalEvent,
                touch = originalEvent.changedTouches ? originalEvent.changedTouches[0] : {};
            return {
                    x: event.pageX || originalEvent.pageX || touch.pageX,
                    y: event.pageY || originalEvent.pageY || touch.pageY
                }
        }
        var EVENT_START = 'start',
            EVENT_MOVE = 'move',
            EVENT_END = 'end',
            EVENT_WHEEL = 'wheel',
            EVENT_HOVER_ON = 'hover-on',
            EVENT_HOVER_OFF = 'hover-off',
            EVENT_CLICK = 'click',
            EVENT_TOOLTIP_CHECK = 'tooltip-check',
            EVENT_TOOLTIP_SHOW = 'tooltip-show',
            EVENT_TOOLTIP_HIDE = 'tooltip-hide',
            EVENT_TOOLTIP_MOVE = 'tooltip-move';
        var Tracker = DX.Class.inherit({
                ctor: function() {
                    var self = this;
                    self._groups = {};
                    self._createCallbacks();
                    self._resetState()
                },
                dispose: function() {
                    var self = this;
                    DX.utils.debug.assert(!self._root, 'Undetached root!');
                    DX.utils.debug.assert($.map(self._groups, function(item) {
                        return item
                    }).length === 0, 'Undetached groups!');
                    self._dispose();
                    self._groups = self._context = self._callbacks = null;
                    return self
                },
                _resetState: function() {
                    var self = this;
                    _clearTimeout(self._tooltip_showTimeout);
                    _clearTimeout(self._tooltip_hideTimeout);
                    self._touchLock = self._moving = self._click_time = self._hover_event = self._tooltip_target = self._tooltip_showTimeout = self._tooltip_hideTimeout = null
                },
                _createCallbacks: function() {
                    var self = this;
                    self._rootEvents = {};
                    self._rootEvents[EVENT_NAMES.start] = function(event) {
                        var isTouch = _isTouchEvent(event);
                        if (isTouch && !self._touchEnabled)
                            return;
                        event.preventDefault();
                        self._touchLock = isTouch;
                        self._processStart(event);
                        isTouch && self._processTooltipRootTouchStart(event)
                    };
                    self._documentEventsMoveEnd = {};
                    self._documentEventsMoveEnd[EVENT_NAMES.move] = function(event) {
                        if (self._touchLock === _isTouchEvent(event))
                            self._processMove(event)
                    };
                    self._documentEventsMoveEnd[EVENT_NAMES.end] = function(event) {
                        if (self._touchLock === _isTouchEvent(event)) {
                            self._touchLock = null;
                            self._processEnd(event)
                        }
                    };
                    self._rootEvents[EVENT_NAMES.wheel] = function(event) {
                        if (self._wheelEnabled) {
                            event.preventDefault();
                            self._processWheel(event)
                        }
                    };
                    self._groupEvents = {};
                    self._groupEvents[EVENT_NAMES.start] = function(event) {
                        var isTouch = _isTouchEvent(event);
                        if (isTouch && !self._touchEnabled)
                            return;
                        self._processClickStart(event);
                        isTouch && self._processTooltipTouchStart(event)
                    };
                    self._groupClickEventsEnd = {};
                    self._groupClickEventsEnd[EVENT_NAMES.end] = function(event) {
                        self._processClickEnd(event)
                    };
                    self._groupEvents[EVENT_NAMES.over] = function(event) {
                        if (!self._touchLock && !_isTouchEvent(event)) {
                            self._processHoverOn(event);
                            self._processTooltipMouseOver(event)
                        }
                    };
                    self._groupEvents[EVENT_NAMES.out] = function(event) {
                        if (!self._touchLock && !_isTouchEvent(event)) {
                            self._processHoverOff(event);
                            self._processTooltipMouseOut(event)
                        }
                    };
                    self._groupTooltipEventsMouseMove = {};
                    self._groupTooltipEventsMouseMove[EVENT_NAMES.move] = function(event) {
                        self._processTooltipMouseMove(event)
                    };
                    self._groupTooltipEventsTouchMoveEnd = {};
                    self._groupTooltipEventsTouchMoveEnd[EVENT_NAMES.move] = function(event) {
                        self._processTooltipTouchMove(event)
                    };
                    self._groupTooltipEventsTouchMoveEnd[EVENT_NAMES.end] = function(event) {
                        self._processTooltipTouchEnd(event)
                    };
                    self._showTooltipCallback = function() {
                        self._showTooltipCore()
                    };
                    self._hideTooltipCallback = function() {
                        self._hideTooltipCore()
                    };
                    self._dispose = function() {
                        var self = this;
                        self = self._dispose = self._rootEvents = self._documentEventsMoveEnd = self._groupEvents = self._groupClickEventsEnd = self._groupTooltipEventsMouseMove = self._groupTooltipEventsTouchMoveEnd = self._showTooltipCallback = self._hideTooltipCallback = null
                    }
                },
                _processStart: function(event) {
                    var self = this,
                        coords = getEventCoords(event);
                    self._start_x = self._x = coords.x;
                    self._start_y = self._y = coords.y;
                    self._callbacks[EVENT_START].call(self._context, {
                        $target: $(event.target),
                        x: self._x,
                        y: self._y
                    });
                    _document.off(self._documentEventsMoveEnd).on(self._documentEventsMoveEnd, event.data)
                },
                _processMove: function(event) {
                    var self = this,
                        coords = getEventCoords(event);
                    if (self._moving || _abs(self._start_x - coords.x) > 3 || _abs(self._start_y - coords.y) > 3) {
                        self._moving = true;
                        self._x = coords.x;
                        self._y = coords.y;
                        self._callbacks[EVENT_MOVE].call(self._context, {
                            $target: $(event.target),
                            x: self._x,
                            y: self._y
                        })
                    }
                },
                _processEnd: function(event) {
                    var self = this;
                    _document.off(self._documentEventsMoveEnd);
                    self._callbacks[EVENT_END].call(self._context, {
                        $target: $(event.target),
                        x: self._x,
                        y: self._y
                    });
                    self._moving = self._start_x = self._start_y = self._x = self._y = null
                },
                _processWheel: function(event) {
                    var delta = event.originalEvent.wheelDelta / 120 || event.originalEvent.detail / -3 || 0;
                    this._callbacks[EVENT_WHEEL].call(this._context, {
                        $target: $(event.target),
                        delta: delta
                    })
                },
                _processHoverOn: function(event) {
                    var self = this;
                    if (self._hover_event && self._hover_event.target === event.target)
                        return;
                    self._hover_event && self._callbacks[EVENT_HOVER_OFF].call(self._context, {
                        $target: $(self._hover_event.target),
                        category: self._hover_event.data.category
                    });
                    self._hover_event = event;
                    self._callbacks[EVENT_HOVER_ON].call(self._context, {
                        $target: $(self._hover_event.target),
                        category: self._hover_event.data.category
                    })
                },
                _processHoverOff: function(event) {
                    var self = this;
                    if (_getElementData($(event.target)) === undefined)
                        return;
                    self._hover_event && self._callbacks[EVENT_HOVER_OFF].call(self._context, {
                        $target: $(self._hover_event.target),
                        category: self._hover_event.data.category
                    });
                    self._hover_event = null
                },
                _processClickStart: function(event) {
                    this._click_time = _now();
                    event.data.container.off(this._groupClickEventsEnd).on(this._groupClickEventsEnd, event.data)
                },
                _processClickEnd: function(event) {
                    var self = this;
                    if (self._click_time && !self._moving && _now() - self._click_time <= 500)
                        self._callbacks[EVENT_CLICK].call(self._context, {
                            $target: $(event.target),
                            category: event.data.category
                        });
                    self._click_time = null;
                    event.data.container.off(self._groupClickEventsEnd)
                },
                _processTooltipMouseOver: function(event) {
                    var self = this;
                    if (self._tooltipEnabled && self._isTooltipAvailable(event)) {
                        var coords = getEventCoords(event);
                        self._tooltip_x = coords.x;
                        self._tooltip_y = coords.y;
                        event.data.container.off(self._groupTooltipEventsMouseMove).on(self._groupTooltipEventsMouseMove, event.data);
                        self._showTooltip(self._tooltip_target ? null : TOOLTIP_SHOW_DELAY)
                    }
                },
                _processTooltipMouseMove: function(event) {
                    var self = this;
                    if (self._isTooltipAvailable(event))
                        if (self._tooltip_target)
                            self._showTooltip();
                        else {
                            var coords = getEventCoords(event);
                            if (_abs(self._tooltip_x - coords.x) > 3 || _abs(self._tooltip_y - coords.y) > 3)
                                self._showTooltip(TOOLTIP_SHOW_DELAY)
                        }
                    else {
                        event.data.container.off(self._groupTooltipEventsMouseMove);
                        self._hideTooltip(TOOLTIP_HIDE_DELAY)
                    }
                },
                _processTooltipMouseOut: function(event) {
                    if (this._tooltipEnabled) {
                        event.data.container.off(this._groupTooltipEventsMouseMove);
                        this._hideTooltip(TOOLTIP_HIDE_DELAY)
                    }
                },
                _processTooltipTouchStart: function(event) {
                    var self = this;
                    if (self._tooltipEnabled && self._isTooltipAvailable(event)) {
                        self._showTooltip(TOOLTIP_TOUCH_SHOW_DELAY);
                        event.data.container.off(self._groupTooltipEventsTouchMoveEnd).on(self._groupTooltipEventsTouchMoveEnd, event.data);
                        self._skipTouchStart = true
                    }
                },
                _processTooltipRootTouchStart: function(event) {
                    if (!this._skipTouchStart)
                        this._hideTooltip(TOOLTIP_TOUCH_HIDE_DELAY);
                    this._skipTouchStart = null
                },
                _processTooltipTouchMove: function(event) {
                    if (this._moving) {
                        this._hideTooltip();
                        event.data.container.off(this._groupTooltipEventsTouchMoveEnd)
                    }
                },
                _processTooltipTouchEnd: function(event) {
                    if (this._tooltip_showTimeout)
                        this._hideTooltip(TOOLTIP_TOUCH_HIDE_DELAY);
                    event.data.container.off(this._groupTooltipEventsTouchMoveEnd)
                },
                _isTooltipAvailable: function(event) {
                    var self = this,
                        result = !self._moving;
                    if (result && (!self._tooltip_event || self._tooltip_event.target !== event.target))
                        result = self._callbacks[EVENT_TOOLTIP_CHECK].call(self._context, {
                            $target: $(event.target),
                            category: event.data.category
                        });
                    self._tooltip_event = event;
                    return result
                },
                _showTooltip: function(delay) {
                    var self = this;
                    _clearTimeout(self._tooltip_hideTimeout);
                    self._tooltip_hideTimeout = null;
                    _clearTimeout(self._tooltip_showTimeout);
                    if (delay > 0)
                        self._tooltip_showTimeout = _setTimeout(self._showTooltipCallback, delay);
                    else
                        self._showTooltipCallback()
                },
                _hideTooltip: function(delay) {
                    var self = this;
                    _clearTimeout(self._tooltip_showTimeout);
                    self._tooltip_showTimeout = null;
                    if (delay > 0)
                        self._tooltip_hideTimeout = self._tooltip_hideTimeout || _setTimeout(self._hideTooltipCallback, delay);
                    else {
                        _clearTimeout(self._tooltip_hideTimeout);
                        self._hideTooltipCallback()
                    }
                },
                _showTooltipCore: function() {
                    var self = this,
                        event = self._tooltip_event,
                        coords = getEventCoords(event);
                    if (!self._tooltip_target)
                        self._callbacks[EVENT_TOOLTIP_SHOW].call(self._context, {
                            $target: $(event.target),
                            category: event.data.category
                        });
                    self._tooltip_target = event.target;
                    self._callbacks[EVENT_TOOLTIP_MOVE].call(self._context, {
                        $target: $(self._tooltip_target),
                        category: event.data.category,
                        x: coords.x,
                        y: coords.y
                    });
                    self._tooltip_showTimeout = null
                },
                _hideTooltipCore: function() {
                    var self = this,
                        event = self._tooltip_event;
                    if (self._tooltip_target)
                        self._callbacks[EVENT_TOOLTIP_HIDE].call(self._context, {
                            $target: $(self._tooltip_target),
                            category: event.data.category
                        });
                    self._tooltip_target = self._tooltip_hideTimeout = self._tooltip_event = null
                },
                attachRoot: function(container) {
                    DX.utils.debug.assert(!this._root, 'Root is already attached!');
                    this._root = container;
                    return this
                },
                detachRoot: function() {
                    DX.utils.debug.assert(this._root, 'Root is not attached!');
                    this._root = null;
                    return this
                },
                attachGroup: function(category, container) {
                    DX.utils.debug.assert(!this._groups[category], 'Group category is already attached!');
                    this._groups[category] = container;
                    return this
                },
                detachGroup: function(category) {
                    DX.utils.debug.assert(this._groups[category], 'Group category is not attached!');
                    this._groups[category] = null;
                    return this
                },
                setCallbacks: function(context, callbacks) {
                    this._context = context;
                    this._callbacks = callbacks;
                    return this
                },
                setOptions: function(options) {
                    options = options || {};
                    var self = this;
                    self._enabled = options.enabled;
                    self._touchEnabled = options.touchEnabled;
                    self._wheelEnabled = options.wheelEnabled;
                    self._tooltipEnabled = options.tooltipEnabled;
                    return self
                },
                render: function() {
                    var self = this;
                    if (!self._enabled)
                        return self;
                    if (self._touchEnabled) {
                        self._root.on(_addNamespace('MSHoldVisual', EVENT_NAMESPACE), function(event) {
                            event.preventDefault()
                        }).on(_addNamespace('contextmenu', EVENT_NAMESPACE), function(event) {
                            _isTouchEvent(event) && event.preventDefault()
                        });
                        self._root.applySettings({style: {
                                'touch-action': 'none',
                                '-ms-touch-action': 'none',
                                '-webkit-user-select': 'none'
                            }})
                    }
                    self._root.on(self._rootEvents, {container: self._root});
                    var category,
                        group;
                    for (category in self._groups) {
                        group = self._groups[category];
                        group && group.on(self._groupEvents, {
                            category: category,
                            container: group
                        })
                    }
                    return self
                },
                clean: function() {
                    var self = this;
                    if (!self._enabled)
                        return self;
                    if (self._touchEnabled)
                        self._root.applySettings({style: {
                                'touch-action': '',
                                '-ms-touch-action': '',
                                '-webkit-user-select': ''
                            }});
                    self._root.off('.' + EVENT_NAMESPACE);
                    _document.off(self._documentEventsMoveEnd);
                    var category,
                        group;
                    for (category in self._groups) {
                        group = self._groups[category];
                        group && group.off('.' + EVENT_NAMESPACE)
                    }
                    self._resetState();
                    return self
                }
            });
        DX.viz.map._tests.Tracker = Tracker;
        DX.viz.map._tests._DEBUG_forceEventMode = function(mode) {
            setupEvents(mode)
        };
        DX.viz.map.Map.include({_trackerType: Tracker})
    })(DevExpress, jQuery);
    /*! Module viz-vectormap, file tooltip.js */
    (function(DX, undefined) {
        var _isFunction = DX.utils.isFunction,
            _String = String;
        var Tooltip = DX.Class.inherit({
                ctor: function(parameters) {
                    var self = this;
                    self._container = parameters.container;
                    self._root = parameters.renderer.createGroup({'class': 'dxm-tooltip'});
                    self._renderer = parameters.renderer;
                    self._inner = new DX.viz.charts.Tooltip({
                        renderer: parameters.renderer,
                        arrowLength: 10,
                        paddingLeftRight: 12,
                        paddingTopBottom: 10
                    }, self._root);
                    self._inner.draw();
                    self._inner.text.applySettings({'class': 'dxm-tooltip-text'});
                    self._enabled = false
                },
                dispose: function() {
                    var self = this;
                    self._inner.dispose(),
                    delete self._inner;
                    delete self._container;
                    self._root.clear();
                    delete self._root;
                    return self
                },
                enabled: function() {
                    return this._enabled
                },
                setSize: function(width, height) {
                    this._inner.update({
                        canvasWidth: width,
                        canvasHeight: height
                    });
                    return this
                },
                setOptions: function(options) {
                    var self = this;
                    options = options || {};
                    self._enabled = !!options.enabled;
                    self._inner.update({color: options.color || null});
                    self._inner.cloud.applySettings(options.shape);
                    self._inner.text.applySettings(options.text);
                    self._customizeText = _isFunction(options.customizeText) ? options.customizeText : null;
                    return self
                },
                clean: function() {
                    this._root.detach();
                    this._inner.hide();
                    return this
                },
                render: function() {
                    this._root.append(this._container);
                    return this
                },
                check: function(target) {
                    if (this._enabled) {
                        var text = this._customizeText ? this._customizeText.call(target, target) : null;
                        return !!(this._text = text !== null && text !== undefined ? _String(text) : '')
                    }
                    return false
                },
                show: function() {
                    this._inner.show();
                    return this
                },
                hide: function() {
                    this._inner.hide();
                    return this
                },
                move: function(options) {
                    this._inner.move(options.x, options.y, 12, this._text);
                    return this
                }
            });
        DX.viz.map._tests.Tooltip = Tooltip;
        DX.viz.map.Map.include({_tooltipType: Tooltip})
    })(DevExpress);
    /*! Module viz-vectormap, file elementProxy.js */
    (function(DX, undefined) {
        function ElementProxy(map, info, settings) {
            var self = this;
            self._debug_map = map;
            self._debug_info = info;
            self.selected = function(state) {
                var current = !!info.selected;
                if (state !== undefined) {
                    !!state !== current && settings.setSelectionCallback.call(map, info, !current);
                    return this
                }
                return current
            };
            self.type = settings.type;
            var attributes = info.attributes;
            self.attribute = function(name) {
                return attributes[name]
            };
            var options = info.options;
            self.option = function(name, value) {
                return options[name]
            };
            self._dispose = function() {
                map = info = attributes = options = null;
                self._debug_map = self._debug_info = null
            }
        }
        DX.viz.map._tests.ElementProxy = ElementProxy;
        DX.viz.map.Map.include({_proxyType: ElementProxy})
    })(DevExpress);
    /*! Module viz-vectormap, file themeManager.js */
    (function(DX, $, undefined) {
        var _Number = Number,
            _extend = $.extend;
        var _Palette = DX.viz.core.GradientPalette;
        var ThemeManager = DX.viz.core.BaseThemeManager.inherit({
                _themeSection: 'map',
                _initializeTheme: function() {
                    var self = this;
                    self._initializeFont(self._theme.marker.font);
                    self._initializeFont(self._theme.tooltip.font);
                    self._initializeFont(self._theme.legend.font);
                    self._initializeFont(self._theme.loadingIndicator.font)
                },
                reset: function() {
                    this._commonAreaSettings = this._commonMarkerSettings = this._palette = null;
                    return this
                },
                getBackgroundSettings: function(options) {
                    var theme = this._theme.background,
                        merged = _extend({}, theme, options);
                    return {
                            strokeWidth: merged.borderWidth,
                            stroke: merged.borderColor,
                            fill: merged.color
                        }
                },
                initCommonAreaSettings: function(options) {
                    var theme = this._theme.area,
                        merged = _extend({}, theme, options);
                    this._commonAreaSettings = {
                        common: {
                            strokeWidth: merged.borderWidth,
                            stroke: merged.borderColor,
                            fill: merged.color
                        },
                        normal: {
                            'class': null,
                            strokeWidth: null,
                            stroke: null,
                            fill: null
                        },
                        hovered: {
                            'class': merged.hoveredClass,
                            strokeWidth: merged.hoveredBorderWidth,
                            stroke: merged.hoveredBorderColor,
                            fill: merged.hoveredColor
                        },
                        selected: {
                            'class': merged.selectedClass,
                            strokeWidth: merged.selectedBorderWidth,
                            stroke: merged.selectedBorderColor,
                            fill: merged.selectedColor
                        }
                    };
                    this._palette = new _Palette(merged.palette, merged.paletteSize);
                    this._DEBUG_palette = this._palette;
                    return this
                },
                getCommonAreaSettings: function() {
                    return this._commonAreaSettings
                },
                getAreaSettings: function(options) {
                    options = options || {};
                    if (options.color === undefined && options.paletteIndex >= 0)
                        options.color = this._palette.getColor(options.paletteIndex) || undefined;
                    var baseSettings = {
                            'class': options['class'],
                            fill: options.color,
                            stroke: options.borderColor
                        };
                    return {
                            normal: _extend({}, this._commonAreaSettings.normal, baseSettings),
                            hovered: _extend({}, this._commonAreaSettings.hovered, baseSettings, {
                                'class': options.hoveredClass,
                                fill: options.hoveredColor,
                                stroke: options.hoveredBorderColor
                            }),
                            selected: _extend({}, this._commonAreaSettings.selected, baseSettings, {
                                'class': options.selectedClass,
                                fill: options.selectedColor,
                                stroke: options.selectedBorderColor
                            })
                        }
                },
                initCommonMarkerSettings: function(options) {
                    var theme = this._theme.marker,
                        merged = _extend({}, theme, options);
                    this._commonMarkerSettings = {
                        size: _Number(merged.size),
                        selectedStep: _Number(merged.selectedStep),
                        extraStep: _Number(merged.extraStep),
                        text: {
                            strokeWidth: 0,
                            stroke: 'none',
                            fill: 'none',
                            font: _extend({}, theme.font, merged.font)
                        },
                        normal: {
                            'class': merged['class'],
                            strokeWidth: merged.borderWidth,
                            stroke: merged.borderColor,
                            fill: merged.color
                        },
                        hovered: {
                            'class': merged.hoveredClass,
                            strokeWidth: merged.borderWidth,
                            stroke: merged.hoveredBorderColor || merged.borderColor,
                            fill: merged.hoveredColor || merged.color
                        },
                        selected: {
                            'class': merged.selectedClass,
                            strokeWidth: merged.borderWidth,
                            stroke: merged.selectedBorderColor || merged.borderColor,
                            fill: merged.selectedColor || merged.color
                        },
                        extraHovered: {
                            strokeWidth: 0,
                            stroke: 'none',
                            fill: merged.extraColor,
                            opacity: merged.extraOpacity
                        },
                        extraSelected: {
                            strokeWidth: 0,
                            stroke: 'none',
                            fill: merged.extraColor,
                            opacity: merged.extraOpacity
                        }
                    };
                    return this
                },
                getCommonMarkerSettings: function() {
                    return this._commonMarkerSettings
                },
                getMarkerSettings: function(options) {
                    options = options || {};
                    var baseSettings = {
                            'class': options['class'],
                            fill: options.color,
                            stroke: options.borderColor
                        },
                        commonSettings = this._commonMarkerSettings;
                    var result = {
                            normal: _extend({}, commonSettings.normal, baseSettings),
                            hovered: _extend({}, commonSettings.hovered, baseSettings, {
                                'class': options.hoveredClass,
                                fill: options.hoveredColor,
                                stroke: options.hoveredBorderColor
                            }),
                            selected: _extend({}, commonSettings.selected, baseSettings, {
                                'class': options.selectedClass,
                                fill: options.selectedColor,
                                stroke: options.selectedBorderColor
                            }),
                            extraHovered: commonSettings.extraHovered,
                            extraSelected: commonSettings.extraSelected
                        };
                    result.selectedSize = result.hoveredSize = result.size = options.size > 0 ? _Number(options.size) : commonSettings.size;
                    result.selectedSize += options.selectedStep > 0 ? options.selectedStep : commonSettings.selectedStep;
                    result.hoveredExtraSize = result.hoveredSize + (options.extraStep > 0 ? options.extraStep : commonSettings.extraStep);
                    result.selectedExtraSize = result.selectedSize + (options.extraStep > 0 ? options.extraStep : commonSettings.extraStep);
                    return result
                },
                getControlBarSettings: function(options) {
                    var theme = this._theme.controlBar,
                        merged = _extend({}, theme, options);
                    return _extend({}, options, {shape: {
                                strokeWidth: merged.borderWidth,
                                stroke: merged.borderColor,
                                fill: merged.color
                            }})
                },
                getLoadIndicatorSettings: function(options) {
                    var theme = this._theme.loadingIndicator;
                    return _extend(true, {}, theme, options)
                },
                getTooltipSettings: function(options) {
                    var theme = this._theme.tooltip,
                        merged = _extend({}, theme, options);
                    return _extend({}, options, {
                            shape: {
                                strokeWidth: theme.borderWidth,
                                stroke: merged.borderColor,
                                fill: merged.color
                            },
                            text: {
                                strokeWidth: 0,
                                stroke: 'none',
                                fill: 'none',
                                font: _extend({}, theme.font, merged.font)
                            }
                        })
                },
                getLegendSettings: function(options) {
                    var theme = this._theme.legend,
                        merged = _extend({}, theme, options);
                    return _extend({}, options, {
                            background: {
                                strokeWidth: merged.borderWidth,
                                stroke: merged.borderColor,
                                fill: merged.color,
                                opacity: merged.opacity
                            },
                            text: {
                                strokeWidth: 0,
                                stroke: 'none',
                                fill: 'none',
                                align: 'left',
                                font: _extend({}, theme.font, merged.font),
                                'class': 'dxm-legend-text'
                            },
                            metrics: {
                                horizontalIndent: theme.horizontalIndent,
                                verticalIndent: theme.verticalIndent,
                                horizontalPadding: merged.horizontalPadding,
                                verticalPadding: merged.verticalPadding,
                                textIndent: merged.textIndent,
                                itemSize: merged.itemSize,
                                itemSpacing: merged.itemSpacing,
                                maxWidth: merged.maxWidth,
                                maxHeight: merged.maxHeight
                            }
                        })
                },
                getLegendItemSettings: function(item) {
                    var color = item.color;
                    if (color === undefined && item.paletteIndex >= 0)
                        color = this._palette.getColor(item.paletteIndex);
                    return {
                            strokeWidth: 0,
                            stroke: 'none',
                            fill: color
                        }
                }
            });
        DX.viz.map._tests.ThemeManager = ThemeManager;
        DX.viz.map.Map.include({_themeManagerType: ThemeManager})
    })(DevExpress, jQuery);
    DevExpress.MOD_VIZ_VECTORMAP = true
}