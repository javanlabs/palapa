/*! 
* DevExpress Visualization Charts (part of ChartJS)
* Version: 13.2.8
* Build date: Mar 11, 2014
*
* Copyright (c) 2012 - 2014 Developer Express Inc. ALL RIGHTS RESERVED
* EULA: http://chartjs.devexpress.com/EULA
*/

"use strict";
if (!DevExpress.MOD_VIZ_CHARTS) {
    if (!window.DevExpress)
        throw Error('Required module is not referenced: core');
    if (!DevExpress.MOD_VIZ_CORE)
        throw Error('Required module is not referenced: viz-core');
    /*! Module viz-charts, file legend.js */
    (function($, DX, undefined) {
        var DEFAULT_MARGIN = 10,
            _math = Math,
            _round = _math.round,
            _ceil = _math.ceil;
        DX.viz.charts.Legend = DX.Class.inherit({
            ctor: function(userOptions, group, trackerGroup) {
                this.legendGroup = group;
                this.trackerGroup = trackerGroup;
                this._init(userOptions)
            },
            update: function(userOptions) {
                this._init(userOptions)
            },
            _disposeTrackers: function() {
                var _this = this;
                $.each(_this.trackers || [], function(_, tracker) {
                    tracker.removeData()
                });
                _this.trackers = null
            },
            dispose: function() {
                var _this = this;
                _this._disposeTrackers();
                _this.labelFormatObject = null;
                _this.seriesGroups = null;
                _this.insideLegendGroup = null;
                _this.legendGroup = null;
                _this.trackerGroup = null;
                _this.renderer = null;
                _this.series = null;
                _this.options = null
            },
            _init: function(options) {
                var debug = DX.utils.debug;
                debug.assertParam(options.visible, 'Visibility was not passed');
                debug.assertParam(options.renderer, 'renderer was not passed');
                debug.assertParam(options.margin, 'margin was not passed');
                debug.assertParam(options.markerSize, 'markerSize was not passed');
                debug.assertParam(options.font.color, 'fontColor was not passed');
                debug.assertParam(options.font.family, 'fontFamily was not passed');
                debug.assertParam(options.font.size, 'fontSize was not passed');
                debug.assertParam(options.paddingLeftRight, 'paddingLeftRight was not passed');
                debug.assertParam(options.paddingTopBottom, 'paddingTopBottom was not passed');
                debug.assertParam(options.columnItemSpacing, 'columnItemSpacing was not passed');
                debug.assertParam(options.rowItemSpacing, 'rowItemSpacing was not passed');
                debug.assertParam(options.equalColumnWidth, 'equalColumnWidth was not passed');
                var i,
                    series = [];
                this.renderer = options.renderer;
                options.renderer = null;
                if (typeof options.margin === 'number') {
                    options.margin = options.margin > 0 ? options.margin : DEFAULT_MARGIN;
                    options.margin = {
                        top: options.margin,
                        bottom: options.margin,
                        left: options.margin,
                        right: options.margin
                    }
                }
                else {
                    options.margin.top = options.margin.top > 0 ? options.margin.top : DEFAULT_MARGIN;
                    options.margin.bottom = options.margin.bottom > 0 ? options.margin.bottom : DEFAULT_MARGIN;
                    options.margin.left = options.margin.left > 0 ? options.margin.left : DEFAULT_MARGIN;
                    options.margin.right = options.margin.right > 0 ? options.margin.right : DEFAULT_MARGIN
                }
                options.horizontalAlignment = (options.horizontalAlignment || '').toLowerCase();
                if (options.horizontalAlignment !== 'center' && options.horizontalAlignment !== 'right' && options.horizontalAlignment !== 'left')
                    options.horizontalAlignment = 'right';
                options.verticalAlignment = (options.verticalAlignment || '').toLowerCase();
                if (options.verticalAlignment !== 'top' && options.verticalAlignment !== 'bottom') {
                    if (options.horizontalAlignment === 'center')
                        options.verticalAlignment = 'bottom';
                    if (options.horizontalAlignment === 'right' || options.horizontalAlignment === 'left')
                        options.verticalAlignment = 'top'
                }
                options.orientation = (options.orientation || '').toLowerCase();
                if (options.orientation !== 'vertical' && options.orientation !== 'horizontal') {
                    if (options.horizontalAlignment === 'center')
                        options.orientation = 'horizontal';
                    if (options.horizontalAlignment === 'right' || options.horizontalAlignment === 'left')
                        options.orientation = 'vertical'
                }
                if (!options.itemTextPosition)
                    options.itemTextPosition = options.orientation === 'horizontal' ? 'bottom' : 'right';
                else
                    options.itemTextPosition = options.itemTextPosition;
                options.position = (options.position || '').toLowerCase();
                if (options.position !== 'outside' && options.position !== 'inside')
                    options.position = 'outside';
                options.hoverMode = (options.hoverMode || '').toLowerCase();
                options.customizeText = $.isFunction(options.customizeText) ? options.customizeText : function() {
                    return this.seriesName
                };
                this.series = $.map(options.series || [], function(series) {
                    if (series.options.showInLegend)
                        return series;
                    return null
                });
                options.series = null;
                this.options = options;
                this.__initialized = true
            },
            formatLabel: function(options) {
                return options.customizeText.call(this, this)
            },
            _clearLegendGroups: function() {
                if (this.legendGroup) {
                    this.legendGroup.clear();
                    this.trackerGroup.clear();
                    this.legendGroup.move(0, 0);
                    this.trackerGroup.move(0, 0);
                    this.clipRect && this.legendGroup.applySettings({clipId: this.clipRect.id})
                }
            },
            _clearInsideLegendGroups: function() {
                if (this.insideLegendGroup) {
                    this.insideLegendGroup.detach();
                    this.insideLegendGroup.remove();
                    this.insideLegendGroup = this
                }
            },
            _createBackground: function(borderVisible) {
                var _this = this,
                    options = _this.options,
                    isInside = options.position === 'inside',
                    color = options.backgroundColor,
                    fill = color || (isInside ? options.containerBackgroundColor : 'none'),
                    background;
                if (isInside || color || borderVisible)
                    background = _this.renderer.createRect(0, 0, 0, 0, 0, {
                        fill: fill,
                        'class': 'dxc-border'
                    }).append(_this.insideLegendGroup);
                return background
            },
            _adjustBackgroundSettings: function(background, borderVisible) {
                var _this = this,
                    options = _this.options,
                    border = options.border,
                    legendBox = _this.insideLegendGroup.getBBox(),
                    backgroundSettings = {
                        x: _round(legendBox.x - options.paddingLeftRight),
                        y: _round(legendBox.y - options.paddingTopBottom),
                        width: _round(legendBox.width) + 2 * options.paddingLeftRight,
                        height: _round(legendBox.height) + 2 * options.paddingTopBottom
                    };
                if (borderVisible) {
                    backgroundSettings.strokeWidth = border.width;
                    backgroundSettings.stroke = border.color;
                    backgroundSettings.strokeOpacity = border.opacity;
                    backgroundSettings.dashStyle = border.dashStyle;
                    backgroundSettings.rx = border.cornerRadius || 0;
                    backgroundSettings.ry = border.cornerRadius || 0
                }
                background.applySettings(backgroundSettings)
            },
            _createMarker: function(settings, group) {
                var _this = this,
                    options = _this.options,
                    size = options.markerSize,
                    defaultHatchigStep = 5,
                    defaultHatchingWidth = 2,
                    hoverPatternColor,
                    selectedPatternColor,
                    isHoverPattern,
                    isSelectedPattern,
                    states,
                    hoverHatching,
                    selectedHatching,
                    hoverPattern,
                    selectedPattern,
                    marker;
                marker = _this.renderer.createRect(0, 0, size, size, 0, {
                    fill: settings.styles.themeColor,
                    'class': settings.className
                }).append(group);
                if (!settings.markerPatterns) {
                    states = settings.styles.states || settings.options.states;
                    hoverPatternColor = settings.hoverPatternColor ? settings.hoverPatternColor : states.hover.fill;
                    selectedPatternColor = settings.selectedPatternColor ? settings.selectedPatternColor : states.selected.fill;
                    hoverHatching = $.extend({}, states.hover.hatching, {
                        step: defaultHatchigStep,
                        width: defaultHatchingWidth
                    });
                    isHoverPattern = hoverPatternColor !== 'none' && hoverHatching.direction !== 'none';
                    hoverPattern = isHoverPattern ? _this.renderer.createPattern(hoverPatternColor, hoverHatching).append() : {
                        id: settings.styles.themeColor,
                        append: $.noop
                    };
                    selectedHatching = $.extend({}, states.selected.hatching, {
                        step: defaultHatchigStep,
                        width: defaultHatchingWidth
                    });
                    isSelectedPattern = selectedPatternColor !== 'none' && selectedHatching.direction !== 'none';
                    selectedPattern = isSelectedPattern ? _this.renderer.createPattern(selectedPatternColor, selectedHatching).append() : {
                        id: settings.styles.themeColor,
                        append: $.noop
                    };
                    settings.legend = _this;
                    settings.markerPatterns = {
                        marker: marker,
                        hoverPattern: hoverPattern,
                        selectedPattern: selectedPattern
                    }
                }
                else {
                    settings.markerPatterns.hoverPattern.append();
                    settings.markerPatterns.selectedPattern.append();
                    settings.markerPatterns.marker.dispose();
                    settings.markerPatterns.marker = marker
                }
                return marker
            },
            _createLabel: function(settings, group) {
                var _this = this,
                    options = _this.options,
                    position = options.itemTextPosition,
                    align = position === 'top' || position === 'bottom' ? 'center' : 'left',
                    text,
                    label;
                _this.labelFormatObject = {
                    seriesName: settings.name,
                    seriesNumber: settings.index,
                    seriesColor: settings.styles.themeColor
                };
                text = _this.formatLabel.call(_this.labelFormatObject, options);
                label = _this.renderer.createText(text, 0, 0, {
                    font: options.font,
                    align: align
                }).append(group);
                return label
            },
            _locateLabelAndMarker: function(label, marker) {
                var _this = this,
                    defaultXMargin = 7,
                    defaultTopMargin = 4,
                    defaultBottomMargin = 2,
                    labelX = 0,
                    labelY = 0,
                    markerX,
                    markerY,
                    labelBox = label.getBBox(),
                    markerBox = marker.getBBox();
                switch (_this.options.itemTextPosition) {
                    case'left':
                        labelY = _round(markerBox.y + markerBox.height / 2 - (labelBox.y + labelBox.height / 2));
                        markerX = labelBox.width + defaultXMargin;
                        break;
                    case'right':
                        labelX = markerBox.x + markerBox.width + defaultXMargin;
                        labelY = _round(markerBox.y + markerBox.height / 2 - (labelBox.y + labelBox.height / 2));
                        break;
                    case'top':
                        labelX = _round(markerBox.x + markerBox.width / 2 - (labelBox.x + labelBox.width / 2));
                        markerY = defaultTopMargin;
                        break;
                    case'bottom':
                        labelX = _round(markerBox.x + markerBox.width / 2 - (labelBox.x + labelBox.width / 2));
                        labelY = markerBox.y + markerBox.height + defaultBottomMargin - labelBox.y;
                        break
                }
                label.applySettings({
                    x: labelX,
                    y: labelY
                });
                marker.applySettings({
                    x: markerX,
                    y: markerY
                })
            },
            _getRowsColumns: function(count) {
                var _this = this,
                    options = _this.options,
                    isHorizontal = options.orientation === 'horizontal',
                    rows = options.rowCount,
                    onRows = _ceil(count / rows),
                    columns = options.columnCount,
                    onColumns = _ceil(count / columns),
                    autoEdit;
                if (columns && !rows)
                    rows = onColumns;
                else if (!columns && rows)
                    columns = onRows;
                else if (columns && rows) {
                    if (isHorizontal && columns < onRows)
                        columns = onRows;
                    else if (!isHorizontal && rows < onColumns)
                        rows = onColumns
                }
                else {
                    autoEdit = true;
                    if (isHorizontal) {
                        rows = 1;
                        columns = count
                    }
                    else {
                        columns = 1;
                        rows = count
                    }
                }
                return {
                        rows: rows,
                        columns: columns,
                        autoEdit: autoEdit
                    }
            },
            _locateRowsColumns: function(groups, trackers, count, background) {
                var _this = this,
                    options = _this.options,
                    itemTextPosition = options.itemTextPosition,
                    canvas = _this.canvas,
                    legendBox,
                    rowsColumns = _this._getRowsColumns(count),
                    rows = rowsColumns.rows,
                    isInside = options.position === 'inside',
                    margin = options.margin,
                    paddingLeftRight = background ? options.paddingLeftRight : 0,
                    paddingTopBottom = background ? options.paddingTopBottom : 0,
                    placeholderWidth = canvas.width - canvas.right - canvas.left - margin.left - margin.right - 2 * paddingLeftRight,
                    placeholderHeight = canvas.height - canvas.top - canvas.bottom - margin.top - margin.bottom - 2 * paddingTopBottom,
                    columns = rowsColumns.columns,
                    rowsColumnsData,
                    condition;
                rowsColumnsData = _this.getDataRowsColumns(groups, columns, rows);
                _this.moveItems(rowsColumnsData, groups, _this.insideLegendGroup, itemTextPosition, trackers);
                legendBox = _this.insideLegendGroup.getBBox();
                if (rowsColumns.autoEdit)
                    if (rows === 1)
                        while (legendBox.width > placeholderWidth && columns > 1) {
                            columns = _ceil(columns / 2);
                            rows = _ceil(count / columns);
                            rowsColumnsData = _this.getDataRowsColumns(groups, columns, rows);
                            _this.moveItems(rowsColumnsData, groups, _this.insideLegendGroup, itemTextPosition, trackers);
                            legendBox = _this.insideLegendGroup.getBBox()
                        }
                    else if (columns === 1)
                        while (legendBox.height > placeholderHeight && rows > 1) {
                            rows = _ceil(rows / 2);
                            columns = _ceil(count / rows);
                            rowsColumnsData = _this.getDataRowsColumns(groups, columns, rows);
                            _this.moveItems(rowsColumnsData, groups, _this.insideLegendGroup, itemTextPosition, trackers);
                            legendBox = _this.insideLegendGroup.getBBox()
                        }
            },
            draw: function() {
                var _this = this,
                    renderer = _this.renderer,
                    options = _this.options,
                    series = _this.series || {},
                    seriesLength = series.length,
                    seriesGroups = [],
                    i,
                    label,
                    marker,
                    singleSeriesGroup,
                    background,
                    trackers = [],
                    border = options.border,
                    borderVisible = border.visible && border.width && border.color && border.color !== 'none',
                    paddingLeftRight = options.paddingLeftRight,
                    paddingTopBottom = options.paddingTopBottom;
                if (!(options.visible && series && seriesLength)) {
                    _this._disposeTrackers();
                    return
                }
                _this.createClipRect();
                _this._clearLegendGroups();
                _this._clearInsideLegendGroups();
                _this.insideLegendGroup = renderer.createGroup().append(_this.legendGroup);
                background = _this._createBackground(borderVisible);
                for (i = 0; i < seriesLength; i++) {
                    singleSeriesGroup = renderer.createGroup({'class': 'dxc-item'}).append(_this.insideLegendGroup);
                    marker = _this._createMarker(series[i], singleSeriesGroup);
                    label = _this._createLabel(series[i], singleSeriesGroup);
                    _this._locateLabelAndMarker(label, marker);
                    trackers.push(renderer.createRect(0, 0, 0, 0, 0, {
                        stroke: 'none',
                        fill: 'grey',
                        opacity: 0.0001,
                        inh: true
                    }));
                    seriesGroups.push(singleSeriesGroup)
                }
                _this._locateRowsColumns(seriesGroups, trackers, seriesLength, background);
                if (background) {
                    _this._adjustBackgroundSettings(background, borderVisible);
                    _this.insideLegendGroup.move(paddingLeftRight, paddingTopBottom);
                    $.each(trackers, function(_, tracker) {
                        tracker.move(paddingLeftRight, paddingTopBottom)
                    })
                }
                _this.seriesGroups = seriesGroups;
                _this.trackers = trackers;
                _this.drawTrackers()
            },
            drawTrackers: function() {
                var _this = this;
                _this.trackerGroup.append(_this.legendGroup);
                $.each(_this.trackers || [], function(i, tracker) {
                    tracker.data({
                        series: _this.series[i],
                        mode: _this.options.hoverMode
                    });
                    tracker.append(_this.trackerGroup)
                })
            },
            applyNormalStyle: function(series) {
                if (series.markerPatterns)
                    series.markerPatterns.marker.applySettings({fill: series.styles.themeColor})
            },
            applyHoverStyle: function(series) {
                if (series.markerPatterns)
                    series.markerPatterns.marker.applySettings({fill: series.markerPatterns.hoverPattern.id})
            },
            applySelectionStyle: function(series) {
                if (series.markerPatterns)
                    series.markerPatterns.marker.applySettings({fill: series.markerPatterns.selectedPattern.id})
            },
            getDataRowsColumns: function(seriesGroups, cols, rows) {
                var self = this,
                    i,
                    j,
                    options = self.options,
                    equalColumnWidth = options.equalColumnWidth,
                    series = self.series || {},
                    maxWidthPerColumn = [],
                    maxWidthColumn = 0,
                    maxHeightRow = 0,
                    group,
                    box;
                for (i = 0; i < cols; i++)
                    maxWidthPerColumn[i] = 0;
                for (i = 0; i < rows; i++)
                    for (j = 0; j < cols; j++) {
                        if (rows < cols)
                            group = seriesGroups[i * cols + j];
                        else
                            group = seriesGroups[i + j * rows];
                        if (!group)
                            break;
                        box = group.getBBox();
                        if (maxHeightRow < box.height)
                            maxHeightRow = box.height;
                        if (!equalColumnWidth) {
                            if (maxWidthPerColumn[j] < box.width)
                                maxWidthPerColumn[j] = box.width
                        }
                        else if (maxWidthColumn < box.width)
                            maxWidthColumn = box.width
                    }
                return {
                        rows: rows,
                        cols: cols,
                        maxWidthPerColumn: maxWidthPerColumn,
                        maxWidthColumn: maxWidthColumn,
                        maxHeightRow: maxHeightRow
                    }
            },
            moveItems: function(data, seriesGroups, insideLegendGroup, horizontalTextPosition, trackers) {
                var self = this,
                    i,
                    j,
                    rows,
                    cols,
                    number,
                    group,
                    box,
                    xShift = 0,
                    yShift = 0,
                    widthColumn,
                    options = self.options,
                    xPadding = options.columnItemSpacing,
                    yPadding = options.rowItemSpacing,
                    equalColumnWidth = options.equalColumnWidth,
                    renderer = self.renderer,
                    maxWidthPerColumn = [],
                    maxWidthColumn = 0,
                    maxHeightRow = 0;
                rows = data.rows;
                cols = data.cols;
                maxHeightRow = data.maxHeightRow;
                maxWidthColumn = data.maxWidthColumn;
                maxWidthPerColumn = data.maxWidthPerColumn;
                for (i = 0; i < rows; i++) {
                    for (j = 0; j < cols; j++) {
                        if (rows < cols)
                            number = i * cols + j;
                        else
                            number = i + j * rows;
                        group = seriesGroups[number];
                        if (!group)
                            break;
                        box = group.getBBox();
                        widthColumn = !equalColumnWidth ? maxWidthPerColumn[j] : maxWidthColumn;
                        if (horizontalTextPosition === 'right') {
                            group.move(xShift - box.x, yShift);
                            trackers[number].applySettings({
                                x: xShift - xPadding / 2,
                                y: yShift + box.y - yPadding / 2,
                                height: maxHeightRow + yPadding,
                                width: widthColumn + xPadding
                            })
                        }
                        else if (horizontalTextPosition === 'left') {
                            group.move(box.x + widthColumn - box.width + xShift - xPadding / 2, yShift);
                            trackers[number].applySettings({
                                x: box.x + widthColumn - box.width + xShift - xPadding / 2,
                                y: yShift + box.y - yPadding / 2,
                                height: maxHeightRow + yPadding,
                                width: widthColumn + xPadding
                            })
                        }
                        else {
                            group.move(xShift - box.x - box.width / 2 + widthColumn / 2, yShift);
                            trackers[number].applySettings({
                                x: xShift - xPadding / 2,
                                y: yShift + box.y - yPadding / 2,
                                height: maxHeightRow + yPadding,
                                width: widthColumn + xPadding
                            })
                        }
                        xShift = xShift + widthColumn + xPadding
                    }
                    yShift = yShift + maxHeightRow + yPadding;
                    xShift = 0
                }
            },
            getBoundingRect: function() {
                return this.insideLegendGroup && this.insideLegendGroup.getBBox() || {}
            },
            createClipRect: function() {
                var _this = this,
                    canvas = _this.canvas,
                    height,
                    width;
                if (canvas) {
                    height = canvas.height - canvas.top - canvas.bottom;
                    width = canvas.width - canvas.left - canvas.right;
                    if (height < 0)
                        height = 0;
                    if (width < 0)
                        width = 0;
                    if (!_this.clipRect)
                        _this.clipRect = _this.renderer.createClipRect(canvas.left, canvas.top, width, height).append();
                    else
                        _this.clipRect.updateRectangle({
                            x: canvas.left,
                            y: canvas.top,
                            width: width,
                            height: height
                        })
                }
            },
            updateClip: function(settings) {
                this.clipRect && this.clipRect.updateRectangle({
                    translateX: -settings.translateX,
                    translateY: -settings.translateY
                });
                this.legendGroup.update()
            },
            shift: function(x, y) {
                var settings = {};
                x && (settings.translateX = x);
                y && (settings.translateY = y);
                this.legendGroup.applySettings(settings);
                this.updateClip(settings)
            }
        })
    })(jQuery, DevExpress);
    /*! Module viz-charts, file chartTitle.js */
    (function($, DX, undefined) {
        var isDefined = DX.utils.isDefined,
            endsWith = function(value, pattern) {
                return value.substr(value.length - pattern.length) === pattern
            },
            startsWith = function(value, pattern) {
                return value.indexOf(pattern) === 0
            };
        DX.viz.charts.ChartTitle = DX.Class.inherit({
            ctor: function(renderer, canvas, options, group) {
                var _this = this;
                _this._init(canvas, options);
                _this.renderer = renderer;
                _this.clipRect = _this.createClipRect();
                _this.titleGroup = group;
                _this.titleGroup && _this.clipRect && _this.titleGroup.applySettings({clipId: _this.clipRect.id})
            },
            dispose: function() {
                var _this = this;
                _this.renderer = null;
                _this.clipRect = null;
                _this.title = null;
                _this.innerTitleGroup = null;
                _this.titleGroup = null;
                _this.options = null;
                _this.canvas = null
            },
            update: function(canvas, options) {
                this._init(canvas, options)
            },
            _init: function(canvas, options) {
                var _this = this;
                if (options) {
                    _this._parseAlignments(options);
                    _this.horizontalAlignment = options.horizontalAlignment;
                    _this.verticalAlignment = options.verticalAlignment;
                    _this.options = options
                }
                _this.canvas = canvas || _this.canvas
            },
            _parseAlignments: function(options) {
                if (isDefined(options.position) && !(isDefined(options.verticalAlignment) && isDefined(options.horizontalAlignment))) {
                    options.position = options.position.toLowerCase();
                    options.verticalAlignment = endsWith(options.position, 'top') ? 'top' : 'bottom';
                    options.horizontalAlignment = startsWith(options.position, 'left') ? 'left' : startsWith(options.position, 'center') && 'center' || 'right';
                    return
                }
                options.verticalAlignment = (options.verticalAlignment || '').toLowerCase();
                options.horizontalAlignment = (options.horizontalAlignment || '').toLowerCase();
                if (options.verticalAlignment !== 'top' && options.verticalAlignment !== 'bottom')
                    options.verticalAlignment = 'top';
                if (options.horizontalAlignment !== 'left' && options.horizontalAlignment !== 'center' && options.horizontalAlignment !== 'right')
                    options.horizontalAlignment = 'center'
            },
            render: function() {
                var _this = this,
                    titleOptions = _this.options,
                    renderer = _this.renderer,
                    attr;
                if (!titleOptions.text)
                    return;
                if (!_this.innerTitleGroup)
                    _this.innerTitleGroup = renderer.createGroup();
                else
                    _this.innerTitleGroup.clear();
                _this.innerTitleGroup.append(_this.titleGroup);
                attr = {
                    font: titleOptions.font,
                    align: _this.horizontalAlignment,
                    style: titleOptions.fontStyle
                };
                _this.title = renderer.createText(titleOptions.text, _this.canvas.left, _this.canvas.top, attr).append(_this.innerTitleGroup);
                _this.title.text = titleOptions.text;
                _this.correctTitleLength()
            },
            correctTitleLength: function() {
                var _this = this,
                    canvas = _this.canvas,
                    text = _this.title.text,
                    updateText,
                    lineLength,
                    canvasWidth = canvas.width - canvas.right - canvas.left,
                    box = _this.getBoundingRect();
                if (canvasWidth > box.width || text.indexOf("<br/>") != -1)
                    return;
                lineLength = text.length * canvasWidth / box.width;
                updateText = text.substr(0, ~~lineLength - 1 - 3) + "...";
                _this.title.updateText(updateText);
                _this.title.text = updateText
            },
            getBoundingRect: function() {
                var options = this.options,
                    box;
                if (!this.innerTitleGroup)
                    return {
                            width: 0,
                            height: 0,
                            x: 0,
                            y: 0
                        };
                box = this.innerTitleGroup.getBBox();
                if (isDefined(options.placeholderSize))
                    box.height = options.placeholderSize;
                return box
            },
            shift: function(x, y) {
                this.innerTitleGroup.move(x, y)
            },
            createClipRect: function() {
                if (isDefined(this.options.placeholderSize))
                    return this.renderer.createClipRect(0, 0, 0, 0)
            },
            setClipRectSettings: function() {
                var canvas = this.canvas,
                    verticalAlignment = this.verticalAlignment,
                    clipRect = this.clipRect;
                if (clipRect) {
                    clipRect.append();
                    if (verticalAlignment === 'top')
                        clipRect.updateRectangle({
                            x: 0,
                            y: 0,
                            width: canvas.width,
                            height: canvas.top
                        });
                    else if (verticalAlignment === 'bottom')
                        clipRect.updateRectangle({
                            x: 0,
                            y: canvas.height - canvas.bottom,
                            width: canvas.width,
                            height: canvas.bottom
                        })
                }
            }
        })
    })(jQuery, DevExpress);
    /*! Module viz-charts, file axis.js */
    (function($, DX, undefined) {
        var utils = DX.utils,
            mathAbs = Math.abs,
            core = DX.viz.core,
            ParseUtils = core.ParseUtils,
            AXIS_VALUE_MARGIN_PRIORITY = 100,
            DEFAULT_AXIS_LABEL_SPACING = 5,
            AXIS_STAGGER_OVERLAPPING_KOEF = 2,
            MAX_GRID_BORDER_ADHENSION = 4,
            CANVAS_POSITION_PREFIX = 'canvas_position_',
            CANVAS_POSITION_BOTTOM = 'canvas_position_bottom',
            CANVAS_POSITION_TOP = 'canvas_position_top',
            CANVAS_POSITION_LEFT = 'canvas_position_left',
            CANVAS_POSITION_RIGHT = 'canvas_position_right';
        DX.viz.charts.AXIS_STAGGER_OVERLAPPING_KOEF = AXIS_STAGGER_OVERLAPPING_KOEF;
        DX.viz.charts.Axis = DX.Class.inherit(function() {
            var ctor = function(renderer, options) {
                    var debug = DX.utils.debug;
                    debug.assertParam(renderer, 'renderer was not passed');
                    debug.assertParam(options.label, 'label was not passed');
                    debug.assertParam(options.tick, 'tick was not passed');
                    debug.assertParam(options.grid, 'grid was not passed');
                    debug.assertParam(options.title, 'title was not passed');
                    debug.assert(options.axisDivisionFactor, 'axisDivisionFactor was not passed');
                    debug.assert(options.stripStyle, 'stripStyle was not passed');
                    debug.assert(options.constantLineStyle, 'constantLineStyle was not passed');
                    debug.assert(options.position, 'position was not passed');
                    debug.assertParam(options.isHorizontal, 'isHorizontal was not passed');
                    this.renderer = renderer;
                    this.init(options);
                    this._$axis = $(this)
                };
            var dispose = function() {
                    var _this = this;
                    _this._axisElementsGroup && _this._axisElementsGroup.dispose();
                    $.each(_this.labels || [], function(_, label) {
                        label.removeData()
                    });
                    _this._$axis = null;
                    _this.labels = null;
                    _this.title = null;
                    _this.stripLabels = null;
                    _this.stripRects = null;
                    _this.constantLineLabels = null;
                    _this.constantLines = null;
                    _this._axisStripGroup = null;
                    _this._axisConstantLineGroup = null;
                    _this._axisLableGroup = null;
                    _this._axisLineGroup = null;
                    _this._axisElementsGroup = null;
                    _this._axisGridGroup = null;
                    _this._axisGroup = null;
                    _this.axesContainerGroup = null;
                    _this.stripsGroup = null;
                    _this.constantLinesGroup = null;
                    _this._axisTitleGroup = null;
                    _this.renderer = null;
                    _this.translator = null;
                    _this.options = null;
                    _this.textOptions = null;
                    _this._tickValues = null;
                    _this._fullTickValues = null;
                    _this._fullTickPositions = null
                };
            var init = function(options) {
                    var categories = options.categories,
                        labelOptions = options.label;
                    options.hoverMode = options.hoverMode ? options.hoverMode.toLowerCase() : 'none';
                    this.hasLabelFormat = labelOptions.format !== '' && utils.isDefined(labelOptions.format);
                    this.options = options;
                    this.staggered = labelOptions.staggered;
                    labelOptions.minSpacing = utils.isDefined(labelOptions.minSpacing) ? labelOptions.minSpacing : DEFAULT_AXIS_LABEL_SPACING;
                    processCustomOptions(options);
                    if (categories) {
                        this.labelsNumber = categories.length;
                        this.ticksNumber = this.labelsNumber
                    }
                    options.range = {
                        min: options.min,
                        max: options.max,
                        categories: options.categories && options.categories.slice(0)
                    };
                    this.pane = options.pane;
                    this.textOptions = {
                        align: labelOptions.alignment,
                        font: labelOptions.font,
                        opacity: labelOptions.opacity,
                        style: labelOptions.style
                    };
                    if (options.type === 'logarithmic')
                        this.calcInterval = function(value, prevValue) {
                            return utils.getLog(value / prevValue, options.logarithmBase)
                        };
                    else
                        this.calcInterval = function(value, prevValue) {
                            return value - prevValue
                        }
                };
            var updateTranslatorInterval = function(self) {
                    var i,
                        tickValues,
                        options = self.options,
                        businessRange = self.translator.getBusinessRange(),
                        interval;
                    if (businessRange && businessRange.addRange && !options.categories) {
                        tickValues = self.getTickValues();
                        for (i = 0; i < tickValues.length - 1; i++) {
                            interval = mathAbs(tickValues[i] - tickValues[i + 1]);
                            if (options.isHorizontal)
                                businessRange.addRange({intervalX: interval});
                            else
                                businessRange.addRange({intervalY: interval})
                        }
                    }
                };
            var setTranslator = function(translator) {
                    var debug = DX.utils.debug;
                    debug.assertParam(translator, 'translator was not passed');
                    this.translator = translator;
                    this.resetTicks();
                    updateTranslatorInterval(this)
                };
            var resetTicks = function() {
                    this._tickValues = this._tickPositions = this._fullTickValues = this._fullTickPositions = null
                };
            var setRange = function(range) {
                    var debug = DX.utils.debug;
                    debug.assertParam(range, 'range was not passed');
                    var self = this,
                        options = self.options;
                    if (options.isHorizontal) {
                        options.min = range.minVisibleX;
                        options.max = range.maxVisibleX;
                        options.categories = range.categoriesX;
                        options.stubData = range.stubDataX
                    }
                    else {
                        options.min = range.minVisibleY;
                        options.max = range.maxVisibleY;
                        options.categories = range.categoriesY;
                        options.stubData = range.stubDataY
                    }
                    this.resetTicks()
                };
            var processCustomOptions = function(options) {
                    var label = options.label,
                        left = 'left',
                        right = 'right',
                        top = 'top',
                        bottom = 'bottom';
                    if (options.isHorizontal) {
                        if (!(options.position === bottom || options.position === top))
                            options.position = bottom
                    }
                    else if (!(options.position === left || options.position === right))
                        options.position = left;
                    if (options.position === right) {
                        label.indentFromAxis *= -1;
                        if (!label.userAlignment)
                            label.alignment = left
                    }
                    if (options.position === top)
                        label.indentFromAxis *= -1
                };
            var getXAxisPosition = function(self) {
                    var delta = 0;
                    if (self.delta)
                        delta = self.delta[self.options.position] || 0;
                    return self.translator.translateX(CANVAS_POSITION_PREFIX + self.options.position) + delta
                };
            var getYAxisPosition = function(self) {
                    var delta = 0;
                    if (self.delta)
                        delta = self.delta[self.options.position] || 0;
                    return self.translator.translateY(CANVAS_POSITION_PREFIX + self.options.position) + delta
                };
            var drawAxis = function drawAxis(self, group) {
                    var translator = self.translator,
                        options = self.options,
                        lineOptions = options,
                        axisAttr = {
                            strokeWidth: lineOptions.width,
                            stroke: lineOptions.color,
                            strokeOpacity: lineOptions.opacity
                        },
                        axis,
                        axisPosition = self.axisPosition,
                        start,
                        end;
                    if (!lineOptions.visible)
                        return;
                    if (self.options.isHorizontal) {
                        if (options.categories) {
                            start = translator.translateX(CANVAS_POSITION_LEFT);
                            end = translator.translateX(CANVAS_POSITION_RIGHT)
                        }
                        else {
                            start = translator.translateX(options.min);
                            end = translator.translateX(options.max)
                        }
                        axis = self.renderer.createLine(start, axisPosition, end, axisPosition, axisAttr)
                    }
                    else {
                        if (options.categories) {
                            start = translator.translateY(CANVAS_POSITION_TOP);
                            end = translator.translateY(CANVAS_POSITION_BOTTOM)
                        }
                        else {
                            start = translator.translateY(options.min);
                            end = translator.translateY(options.max)
                        }
                        axis = self.renderer.createLine(axisPosition, start, axisPosition, end, axisAttr)
                    }
                    axis.append(group)
                };
            var _getOptimalRotationAngle = function(tick1, tick2, labelOptions) {
                    var self = this,
                        svgElement1 = self.renderer.createText(formatLabel(tick1, labelOptions), core.outOfScreen.x + self.translator.translateX(tick1), core.outOfScreen.y, self.textOptions).append(),
                        svgElement2 = self.renderer.createText(formatLabel(tick2, labelOptions), core.outOfScreen.x + self.translator.translateX(tick2), core.outOfScreen.y, self.textOptions).append(),
                        bBox1 = svgElement1.getBBox(),
                        bBox2 = svgElement2.getBBox(),
                        angle = Math.asin((bBox1.height + labelOptions.minSpacing) / (bBox2.x - bBox1.x)) * 180 / Math.PI;
                    svgElement1.remove();
                    svgElement2.remove();
                    return isNaN(angle) ? 90 : Math.ceil(angle)
                };
            var _applyOptimalOverlappingBehavior = function(ticks, ticksOptions) {
                    function nextState(state) {
                        switch (state) {
                            case'overlap':
                                return 'stagger';
                            case'stagger':
                                return 'rotate';
                            case'rotate':
                            default:
                                return 'end'
                        }
                    }
                    var self = this,
                        isOverlapped = false,
                        rotationAngle = null,
                        mode = null,
                        options = $.extend({}, ticksOptions),
                        state = 'overlap';
                    while (state !== 'end') {
                        isOverlapped = self.options.tickProvider.isOverlappedTicks(ticks, options);
                        isOverlapped = rotationAngle && rotationAngle !== 90 ? false : isOverlapped;
                        state = nextState(isOverlapped ? state : null);
                        self.testAutoOverlappingState = state;
                        switch (state) {
                            case'stagger':
                                options.screenDelta *= AXIS_STAGGER_OVERLAPPING_KOEF;
                                mode = state;
                                break;
                            case'rotate':
                                rotationAngle = self._getOptimalRotationAngle(ticks[0], ticks[1], self.options.label);
                                self.testAutoOverlappingRotationAngle = rotationAngle;
                                options.screenDelta = ticksOptions.screenDelta;
                                options.textOptions.rotate = rotationAngle;
                                mode = state;
                                break
                        }
                    }
                    self.testAutoOverlappingOptions = options;
                    self.overlappingBehavior.isOverlapped = isOverlapped;
                    self.overlappingBehavior.mode = mode;
                    self.overlappingBehavior.rotationAngle = rotationAngle
                };
            var getTicksOptions = function(self, options, getPosition) {
                    var bpRange = options.isHorizontal ? [CANVAS_POSITION_LEFT, CANVAS_POSITION_RIGHT] : [CANVAS_POSITION_BOTTOM, CANVAS_POSITION_TOP],
                        screenDelta = mathAbs(getPosition.call(self.translator, bpRange[1]) - getPosition.call(self.translator, bpRange[0])),
                        digitPosition = utils.getSignificantDigitPosition(mathAbs(options.max - options.min) / screenDelta),
                        correctingValue,
                        min = options.min,
                        max = options.max,
                        base,
                        getText;
                    if (options.type === 'logarithmic')
                        base = options.logarithmBase;
                    if (utils.isNumber(min) && options.type !== 'logarithmic') {
                        min = utils.roundValue(options.min, digitPosition);
                        if (min < options.min) {
                            correctingValue = Math.pow(10, -digitPosition);
                            min = utils.applyPrecisionByMinDelta(min, correctingValue, min + correctingValue)
                        }
                        if (min > max)
                            min = options.min
                    }
                    if (self.options.stubData)
                        getText = function() {
                            return ''
                        };
                    else
                        getText = function(value) {
                            return formatLabel(value, options.label, {
                                    min: min,
                                    max: max
                                })
                        };
                    return {
                            min: min,
                            max: max,
                            base: base,
                            type: options.type,
                            customTicks: $.isArray(options.categories) ? options.categories : self._tickValues,
                            useTicksAutoArrangement: false,
                            textOptions: self.textOptions,
                            getText: getText,
                            renderer: self.renderer,
                            textSpacing: self.options.label.minSpacing,
                            translator: self.translator,
                            tickInterval: self.options.stubData ? null : options.tickInterval,
                            screenDelta: screenDelta,
                            gridSpacingFactor: options.axisDivisionFactor,
                            isHorizontal: options.isHorizontal,
                            setTicksAtUnitBeginning: options.setTicksAtUnitBeginning,
                            incidentOccured: options.incidentOccured
                        }
                };
            var getTickValues = function() {
                    var self = this,
                        correctedScreenDelta,
                        options = self.options,
                        getPosition = options.isHorizontal ? self.translator.translateX : self.translator.translateY,
                        tickProvider = options.tickProvider,
                        labelOptions = options.label,
                        categories = options.categories,
                        ticksOptions;
                    ticksOptions = getTicksOptions(self, options, getPosition);
                    self._fullTickValues = self._tickValues = tickProvider.getTicks(ticksOptions);
                    if ((utils.isDate(options.min) || utils.isDate(categories && categories[0])) && !self.hasLabelFormat)
                        options.label.format = DX.formatHelper.getDateFormatByTicks(self._tickValues);
                    self.overlappingBehavior = labelOptions.overlappingBehavior ? $.extend({}, labelOptions.overlappingBehavior) : null;
                    if (self.overlappingBehavior) {
                        if (!options.isHorizontal && self.overlappingBehavior.mode !== 'enlargeTickInterval')
                            self.overlappingBehavior.mode = 'ignore';
                        ticksOptions.useTicksAutoArrangement = self.overlappingBehavior.mode !== 'ignore';
                        if (self.overlappingBehavior.mode === 'auto') {
                            self.textOptions.rotate = 0;
                            self._applyOptimalOverlappingBehavior(self._fullTickValues, ticksOptions);
                            ticksOptions.useTicksAutoArrangement = self.overlappingBehavior.isOverlapped
                        }
                        if (self.overlappingBehavior.mode === 'rotate') {
                            self.textOptions.rotate = self.overlappingBehavior.rotationAngle;
                            if (!labelOptions.userAlignment)
                                self.textOptions.align = 'left'
                        }
                        else if (!labelOptions.userAlignment)
                            self.textOptions.align = labelOptions.alignment
                    }
                    if (ticksOptions.useTicksAutoArrangement) {
                        correctedScreenDelta = self._tickValues.length ? getPosition.call(self.translator, self._tickValues[self._tickValues.length - 1]) - getPosition.call(self.translator, self._tickValues[0]) : null;
                        if (correctedScreenDelta) {
                            ticksOptions.screenDelta = Math.abs(correctedScreenDelta);
                            ticksOptions.ticksCount = self._tickValues.length - 1
                        }
                        else
                            ticksOptions.ticksCount = self._tickValues.length;
                        if (self.overlappingBehavior && self.overlappingBehavior.mode === 'stagger')
                            ticksOptions.screenDelta *= AXIS_STAGGER_OVERLAPPING_KOEF;
                        ticksOptions.customTicks = self._tickValues;
                        self._tickValues = tickProvider.getTicks(ticksOptions)
                    }
                    self._testTKScreenDelta = ticksOptions.screenDelta;
                    self._autoArrangementStep = self._tickValues.autoArrangementStep;
                    self._useTicksAutoArrangement = ticksOptions.useTicksAutoArrangement;
                    if (self.options.stubData) {
                        self._testSkippedFormattingAndOverlapping = true;
                        return self._tickValues
                    }
                    if (!$.isArray(categories))
                        self._fullTickValues = self._tickValues;
                    return self._tickValues
                };
            var setTickValues = function(tickValues) {
                    this.resetTicks();
                    this._fullTickValues = this._tickValues = tickValues
                };
            var prepareLabelsToDraw = function prepareLabelsToDraw(self) {
                    var options = self.options,
                        ticksValues,
                        ticks = [],
                        getPosition,
                        i;
                    if (options.isHorizontal)
                        getPosition = self.translator.translateX;
                    else
                        getPosition = self.translator.translateY;
                    ticksValues = self.getTickValues();
                    if (ticksValues.hideLabels || options.stubData)
                        ticks.hideLabels = true;
                    for (i = 0; i < ticksValues.length; i++)
                        ticks.push({
                            text: ticksValues[i],
                            pos: getPosition.call(self.translator, ticksValues[i])
                        });
                    return ticks
                };
            var correctTicksPosition = function(self, ticks) {
                    var options = self.options,
                        translator = self.translator,
                        tickDelta,
                        i;
                    if (options.categories && (options.discreteAxisDivisionMode !== 'crossLabels' || !options.discreteAxisDivisionMode)) {
                        if (options.isHorizontal) {
                            tickDelta = translator.getIntervalX() / 2;
                            if (!options.valueMarginsEnabled)
                                ticks = ticks.slice(0, ticks.length - 1)
                        }
                        else {
                            tickDelta = -translator.getIntervalY() / 2;
                            if (!options.valueMarginsEnabled)
                                ticks = ticks.slice(1, ticks.length)
                        }
                        for (i = 0; i < ticks.length; i++)
                            ticks[i].pos = ticks[i].pos + tickDelta
                    }
                    return ticks
                };
            var prepareFullTicksToDraw = function prepareFullTicksToDraw(self) {
                    var options = self.options,
                        ticksValues = self._fullTickValues,
                        ticks = [],
                        getPosition = options.isHorizontal ? self.translator.translateX : self.translator.translateY,
                        i;
                    if (!self._fullTickPositions) {
                        if (!ticksValues) {
                            self.getTickValues();
                            ticksValues = self._fullTickValues || []
                        }
                        for (i = 0; i < ticksValues.length; i++)
                            ticks.push({pos: getPosition.call(self.translator, ticksValues[i])});
                        self._fullTickPositions = correctTicksPosition(self, ticks)
                    }
                    return self._fullTickPositions
                };
            var drawTicks = function drawTicks(self, group) {
                    var renderer = self.renderer,
                        options = self.options,
                        ticksOptions = options.tick,
                        categories = options.categories,
                        tickDelta = options.discreteAxisDivisionMode === 'crossLabels' ? 0 : 0.5,
                        i,
                        defaultTickLength = 8,
                        attr = {
                            strokeWidth: 1,
                            stroke: ticksOptions.color,
                            strokeOpacity: ticksOptions.opacity
                        },
                        currentTickConstant,
                        axisPosition = self.axisPosition,
                        tickPositionStart,
                        tickPositionEnd,
                        tick,
                        ticksToDraw;
                    if (!ticksOptions.visible)
                        return;
                    ticksToDraw = prepareFullTicksToDraw(self);
                    if (self.options.isHorizontal)
                        for (i = 0; i < ticksToDraw.length; i++) {
                            tick = ticksToDraw[i];
                            renderer.createLine(tick.pos, axisPosition - defaultTickLength / 2, tick.pos, axisPosition + defaultTickLength / 2, attr).append(group)
                        }
                    else
                        for (i = 0; i < ticksToDraw.length; i++) {
                            tick = ticksToDraw[i];
                            renderer.createLine(axisPosition - defaultTickLength / 2, tick.pos, axisPosition + defaultTickLength / 2, tick.pos, attr).append(group)
                        }
                };
            var formatLabel = function formatLabel(value, options, axisMinMax) {
                    var formatObject = {
                            value: value,
                            valueText: DX.formatHelper.format(value, options.format, options.precision) || ''
                        };
                    if (axisMinMax) {
                        formatObject.min = axisMinMax.min;
                        formatObject.max = axisMinMax.max
                    }
                    return options.customizeText ? options.customizeText.call(formatObject, formatObject) : formatObject.valueText
                };
            var setPercentLabelFormat = function() {
                    var labelOptions = this.options.label;
                    if (!labelOptions.format) {
                        labelOptions.format = 'percent';
                        labelOptions.autoFormat = true
                    }
                };
            var resetAutoLabelFormat = function() {
                    var labelOptions = this.options.label;
                    if (labelOptions.autoFormat) {
                        delete labelOptions.format;
                        delete labelOptions.autoFormat
                    }
                };
            var createTextForVerticalLabels = function(text, y, x, textOptions) {
                    return this.createText(text, x, y, textOptions)
                };
            var drawLabels = function drawLabels(self, group) {
                    var i,
                        options = self.options,
                        categories = options.categories,
                        renderer = self.renderer,
                        axisPosition = self.axisPosition,
                        labelOptions = options.label,
                        labelOffset = labelOptions.indentFromAxis,
                        labelsToDraw,
                        labelPoint,
                        label,
                        labels = [],
                        createText = options.isHorizontal ? renderer.createText : createTextForVerticalLabels,
                        currentLabelConst = options.isHorizontal ? axisPosition + labelOffset : axisPosition - labelOffset,
                        text;
                    if (!labelOptions.visible)
                        return;
                    labelsToDraw = prepareLabelsToDraw(self);
                    if (labelsToDraw.length === 0 || labelsToDraw.hideLabels)
                        return true;
                    for (i = 0; i < labelsToDraw.length; i++) {
                        labelPoint = labelsToDraw[i];
                        text = formatLabel(labelPoint.text, labelOptions, {
                            min: options.min,
                            max: options.max
                        });
                        if (utils.isDefined(text) && text !== '') {
                            label = createText.call(renderer, text, labelPoint.pos, currentLabelConst, self.textOptions);
                            labels.push(label);
                            label.append(group);
                            label.data({argument: labelPoint.text})
                        }
                    }
                    self.labels = labels
                };
            var getMultipleAxesSpacing = function() {
                    return this.options.multipleAxesSpacing || 0
                };
            var drawTitle = function drawTitle(self, group) {
                    var i,
                        options = self.options,
                        renderer = self.renderer,
                        axisPosition = self.axisPosition,
                        titleOptions = options.title,
                        margin = titleOptions.margin,
                        title,
                        attr = {
                            font: titleOptions.font,
                            opacity: titleOptions.opacity,
                            align: 'center',
                            'class': 'dx-chart-axis-title'
                        };
                    if (!titleOptions.text)
                        return;
                    if (options.isHorizontal)
                        if (options.position === 'bottom')
                            title = renderer.createText(titleOptions.text, self.translator.canvas.left + self.translator.width / 2, axisPosition, attr);
                        else
                            title = renderer.createText(titleOptions.text, self.translator.canvas.left + self.translator.width / 2, axisPosition, attr);
                    else if (options.position === 'left') {
                        attr.rotate = 270;
                        title = renderer.createText(titleOptions.text, axisPosition, self.translator.canvas.top + self.translator.height / 2, attr)
                    }
                    else {
                        attr.rotate = 90;
                        title = renderer.createText(titleOptions.text, axisPosition, self.translator.canvas.top + self.translator.height / 2, attr)
                    }
                    title.append(group);
                    self.title = title
                };
            var drawGrid = function drawGrid(self, group, borderOptions) {
                    var renderer = self.renderer,
                        options = self.options,
                        gridOptions = options.grid,
                        categories = options.categories,
                        translator = self.translator,
                        tickDelta = options.discreteAxisDivisionMode === 'crossLabels' ? 0 : 0.5,
                        positionsToDraw,
                        i,
                        attr = {
                            strokeWidth: gridOptions.width,
                            stroke: gridOptions.color,
                            strokeOpacity: gridOptions.opacity
                        },
                        currentTickConstant,
                        axisPosition = self.axisPosition,
                        positionFrom,
                        positionTo,
                        tick,
                        firstBorderLinePosition,
                        lastBorderLinePosition,
                        borderOptions = borderOptions || {visible: false};
                    if (!gridOptions.visible)
                        return;
                    positionsToDraw = prepareFullTicksToDraw(self);
                    if (self.options.isHorizontal) {
                        positionFrom = translator.translateY(CANVAS_POSITION_BOTTOM);
                        positionTo = translator.translateY(CANVAS_POSITION_TOP);
                        firstBorderLinePosition = borderOptions.visible && borderOptions.left ? translator.translateX(CANVAS_POSITION_LEFT) : undefined;
                        lastBorderLinePosition = borderOptions.visible && borderOptions.right ? translator.translateX(CANVAS_POSITION_RIGHT) : undefined;
                        for (i = 0; i < positionsToDraw.length; i++) {
                            tick = positionsToDraw[i];
                            if (mathAbs(tick.pos - firstBorderLinePosition) < MAX_GRID_BORDER_ADHENSION || mathAbs(tick.pos - lastBorderLinePosition) < MAX_GRID_BORDER_ADHENSION)
                                continue;
                            renderer.createLine(tick.pos, positionFrom, tick.pos, positionTo, attr).append(group)
                        }
                    }
                    else {
                        positionFrom = translator.translateX(CANVAS_POSITION_LEFT);
                        positionTo = translator.translateX(CANVAS_POSITION_RIGHT);
                        firstBorderLinePosition = borderOptions.visible && borderOptions.top ? translator.translateY(CANVAS_POSITION_TOP) : undefined;
                        lastBorderLinePosition = borderOptions.visible && borderOptions.bottom ? translator.translateY(CANVAS_POSITION_BOTTOM) : undefined;
                        for (i = 0; i < positionsToDraw.length; i++) {
                            tick = positionsToDraw[i];
                            if (mathAbs(tick.pos - firstBorderLinePosition) < MAX_GRID_BORDER_ADHENSION || mathAbs(tick.pos - lastBorderLinePosition) < MAX_GRID_BORDER_ADHENSION)
                                continue;
                            renderer.createLine(positionFrom, tick.pos, positionTo, tick.pos, attr).append(group)
                        }
                    }
                };
            var drawConstantLine = function drawConstantLine(self, group) {
                    var renderer = self.renderer,
                        options = self.options,
                        data = options.constantLines,
                        translator = self.translator,
                        isHorizontal = self.options.isHorizontal,
                        i,
                        lines = [],
                        labels = [],
                        positionFrom,
                        positionTo,
                        lineOptions,
                        range = translator.businessRange,
                        firstSide,
                        lastSide,
                        line;
                    var getPos = function(lineValue) {
                            var translate = isHorizontal ? function(val) {
                                    return translator.translateX(val)
                                } : function(val) {
                                    return translator.translateY(val)
                                },
                                parsedValue = self.validateUnit(lineValue, 'Value of a constant line'),
                                value = translate(parsedValue),
                                isContinous = isHorizontal ? !!(range.minVisibleX || range.maxVisibleX) : !!(range.minVisibleY || range.maxVisibleY),
                                categories = (isHorizontal ? range.categoriesX : range.categoriesY) || [];
                            if (!isContinous && $.inArray(lineValue, categories) === -1 || !utils.isDefined(value) || value < firstSide || value > lastSide)
                                return null;
                            return {
                                    value: value,
                                    parsedValue: parsedValue
                                }
                        };
                    positionFrom = isHorizontal ? translator.translateY(CANVAS_POSITION_BOTTOM) : translator.translateX(CANVAS_POSITION_LEFT);
                    positionTo = isHorizontal ? translator.translateY(CANVAS_POSITION_TOP) : translator.translateX(CANVAS_POSITION_RIGHT);
                    firstSide = !isHorizontal ? translator.translateY(CANVAS_POSITION_TOP) : translator.translateX(CANVAS_POSITION_LEFT);
                    lastSide = !isHorizontal ? translator.translateY(CANVAS_POSITION_BOTTOM) : translator.translateX(CANVAS_POSITION_RIGHT);
                    for (i = 0; i < data.length; i++) {
                        lineOptions = data[i];
                        if (lineOptions.value !== undefined) {
                            var pos = getPos(lineOptions.value),
                                value = pos && pos.value,
                                attr = {
                                    stroke: lineOptions.color,
                                    strokeWidth: lineOptions.width,
                                    dashStyle: lineOptions.dashStyle
                                };
                            if (!value && value !== 0) {
                                lines.push(null);
                                if (lineOptions.label && lineOptions.label.visible)
                                    labels.push(null);
                                continue
                            }
                            line = isHorizontal ? renderer.createLine(value, positionTo, value, positionFrom, attr) : renderer.createLine(positionFrom, value, positionTo, value, attr);
                            line.append(group);
                            lines.push(line);
                            if (lineOptions.label && lineOptions.label.visible)
                                labels.push(drawConstantLineLabels(self, pos.parsedValue, lineOptions.label, value, group));
                            else
                                labels.push(null)
                        }
                    }
                    self.constantLines = lines;
                    self.constantLineLabels = labels
                };
            var checkAlignmentConstantLineLabels = function(self, labelOptions) {
                    labelOptions.verticalAlignment = (labelOptions.verticalAlignment || '').toLowerCase();
                    labelOptions.horizontalAlignment = (labelOptions.horizontalAlignment || '').toLowerCase();
                    if (self.options.isHorizontal && labelOptions.position === 'outside') {
                        labelOptions.verticalAlignment = labelOptions.verticalAlignment === 'bottom' ? 'bottom' : 'top';
                        labelOptions.horizontalAlignment = 'center'
                    }
                    if (self.options.isHorizontal && labelOptions.position === 'inside') {
                        labelOptions.verticalAlignment = labelOptions.verticalAlignment === 'center' ? 'center' : labelOptions.verticalAlignment === 'bottom' ? 'bottom' : 'top';
                        labelOptions.horizontalAlignment = labelOptions.horizontalAlignment === 'left' ? 'left' : 'right'
                    }
                    if (!self.options.isHorizontal && labelOptions.position === 'outside') {
                        labelOptions.verticalAlignment = 'center';
                        labelOptions.horizontalAlignment = labelOptions.horizontalAlignment === 'left' ? 'left' : 'right'
                    }
                    if (!self.options.isHorizontal && labelOptions.position === 'inside') {
                        labelOptions.verticalAlignment = labelOptions.verticalAlignment === 'bottom' ? 'bottom' : 'top';
                        labelOptions.horizontalAlignment = labelOptions.horizontalAlignment === 'right' ? 'right' : labelOptions.horizontalAlignment === 'center' ? 'center' : 'left'
                    }
                };
            var drawConstantLineLabels = function drawConstantLineLabels(self, parsedValue, labelOptions, value, group) {
                    var renderer = self.renderer,
                        text = labelOptions.text,
                        canvas = self.translator.canvas,
                        attr = {
                            align: 'center',
                            font: $.extend({}, self.options.label.font, labelOptions.font)
                        },
                        label,
                        x,
                        y;
                    checkAlignmentConstantLineLabels(self, labelOptions);
                    text = utils.isDefined(text) ? text : formatLabel(parsedValue, self.options.label);
                    if (self.options.isHorizontal) {
                        x = value;
                        switch (labelOptions.horizontalAlignment) {
                            case'left':
                                attr.align = 'right';
                                break;
                            case'right':
                                attr.align = 'left';
                                break
                        }
                        switch (labelOptions.verticalAlignment) {
                            case'bottom':
                                y = canvas.height - canvas.bottom;
                                break;
                            case'center':
                                y = (canvas.height - canvas.top - canvas.bottom) / 2 + canvas.top;
                                break;
                            case'top':
                                y = canvas.top;
                                break
                        }
                    }
                    else {
                        y = value;
                        switch (labelOptions.horizontalAlignment) {
                            case'left':
                                x = canvas.left;
                                attr.align = labelOptions.position === 'inside' ? 'left' : 'right';
                                break;
                            case'center':
                                x = (canvas.width - canvas.left - canvas.right) / 2 + canvas.left;
                                attr.align = 'center';
                                break;
                            case'right':
                                x = canvas.width - canvas.right;
                                attr.align = labelOptions.position === 'inside' ? 'right' : 'left';
                                break
                        }
                    }
                    label = renderer.createText(text, x, y, attr);
                    label.append(group);
                    return label
                };
            var adjustConstantLineLabels = function(self) {
                    var options = self.options,
                        lines = self.constantLines,
                        label,
                        line,
                        lineBox,
                        canvas = self.translator.canvas,
                        linesOptions,
                        box,
                        x,
                        y,
                        i,
                        labelOptions,
                        padding = self.options.isHorizontal ? {
                            top: 0,
                            bottom: 0
                        } : {
                            left: 0,
                            right: 0
                        },
                        labels = self.constantLineLabels;
                    if (labels === undefined && lines === undefined)
                        return;
                    for (i = 0; i < labels.length; i++) {
                        x = y = 0;
                        linesOptions = options.constantLines[i];
                        labelOptions = linesOptions.label;
                        label = labels[i];
                        if (label !== null) {
                            line = lines[i];
                            box = label.getBBox();
                            lineBox = line.getBBox();
                            if (self.options.isHorizontal)
                                if (labelOptions.position === 'inside') {
                                    switch (labelOptions.horizontalAlignment) {
                                        case'left':
                                            x -= linesOptions.paddingLeftRight;
                                            break;
                                        default:
                                            x += linesOptions.paddingLeftRight;
                                            break
                                    }
                                    switch (labelOptions.verticalAlignment) {
                                        case'center':
                                            y += lineBox.y + lineBox.height / 2 - box.y - box.height / 2;
                                            break;
                                        case'bottom':
                                            y -= linesOptions.paddingTopBottom;
                                            break;
                                        default:
                                            y += linesOptions.paddingTopBottom + box.height;
                                            break
                                    }
                                }
                                else
                                    switch (labelOptions.verticalAlignment) {
                                        case'bottom':
                                            y += box.height + linesOptions.paddingTopBottom - (box.y + box.height - canvas.height + canvas.bottom);
                                            if (padding['bottom'] < box.height + linesOptions.paddingTopBottom)
                                                padding['bottom'] = box.height + linesOptions.paddingTopBottom;
                                            break;
                                        default:
                                            y -= linesOptions.paddingTopBottom;
                                            if (padding['top'] < linesOptions.paddingTopBottom + box.height)
                                                padding['top'] = linesOptions.paddingTopBottom + box.height;
                                            break
                                    }
                            else if (labelOptions.position === 'inside') {
                                switch (labelOptions.horizontalAlignment) {
                                    case'center':
                                        x += lineBox.x + lineBox.width / 2 - box.x - box.width / 2;
                                        break;
                                    case'right':
                                        x -= linesOptions.paddingLeftRight;
                                        break;
                                    default:
                                        x += linesOptions.paddingLeftRight;
                                        break
                                }
                                switch (labelOptions.verticalAlignment) {
                                    case'bottom':
                                        y += lineBox.y - box.y + linesOptions.paddingTopBottom;
                                        break;
                                    default:
                                        y -= linesOptions.paddingTopBottom;
                                        break
                                }
                            }
                            else {
                                y += lineBox.y + lineBox.height / 2 - box.y - box.height / 2;
                                switch (labelOptions.horizontalAlignment) {
                                    case'right':
                                        x += linesOptions.paddingLeftRight;
                                        if (padding['right'] < linesOptions.paddingLeftRight + box.width)
                                            padding['right'] = linesOptions.paddingLeftRight + box.width;
                                        break;
                                    default:
                                        x -= linesOptions.paddingLeftRight;
                                        if (padding['left'] < linesOptions.paddingLeftRight + box.width)
                                            padding['left'] = linesOptions.paddingLeftRight + box.width;
                                        break
                                }
                            }
                            label.move(x, y)
                        }
                    }
                    self.padding = padding
                };
            var drawStrip = function drawStrip(self, group) {
                    var renderer = self.renderer,
                        options = self.options,
                        stripData = options.strips,
                        translator = self.translator,
                        i,
                        stripLabels = [],
                        stripRects = [],
                        rect,
                        isHorizontal = self.options.isHorizontal,
                        stripOptions,
                        positionFrom,
                        positionTo,
                        stripPos;
                    if (options.stubData)
                        return;
                    var getPos = function(startV, endV, range) {
                            var isContinous = isHorizontal ? !!(range.minVisibleX || range.maxVisibleX) : !!(range.minVisibleY || range.maxVisibleY),
                                cateories = (isHorizontal ? range.categoriesX : range.categoriesY) || [],
                                translate = isHorizontal ? function(val) {
                                    return translator.translateX(val)
                                } : function(val) {
                                    return translator.translateY(val)
                                },
                                invert = isHorizontal ? !!range.invertX : range.invertY,
                                defaultPos = isHorizontal ? [CANVAS_POSITION_LEFT, CANVAS_POSITION_RIGHT] : [CANVAS_POSITION_BOTTOM, CANVAS_POSITION_TOP],
                                pos,
                                start = translate(self.validateUnit(startV, 'Start value of a strip')),
                                end = translate(self.validateUnit(endV, 'End value of a strip')),
                                min = isHorizontal ? range.minVisibleX : range.maxVisibleY,
                                max = isHorizontal ? range.maxVisibleX : range.maxVisibleY;
                            invert && defaultPos.reverse();
                            if (!isContinous && ($.inArray(startV, cateories) === -1 || $.inArray(endV, cateories) === -1))
                                return {
                                        stripFrom: 0,
                                        stripTo: 0
                                    };
                            if (!utils.isDefined(start) && isContinous)
                                start = startV < min ? translate(defaultPos[0]) : translate(defaultPos[1]);
                            if (!utils.isDefined(end) && isContinous)
                                end = endV < min ? translate(defaultPos[0]) : translate(defaultPos[1]);
                            return start < end ? {
                                    stripFrom: start,
                                    stripTo: end
                                } : {
                                    stripFrom: end,
                                    stripTo: start
                                }
                        };
                    positionFrom = isHorizontal ? translator.translateY(CANVAS_POSITION_BOTTOM) : translator.translateX(CANVAS_POSITION_LEFT);
                    positionTo = isHorizontal ? translator.translateY(CANVAS_POSITION_TOP) : translator.translateX(CANVAS_POSITION_RIGHT);
                    for (i = 0; i < stripData.length; i++) {
                        stripOptions = stripData[i];
                        if (stripOptions.startValue !== undefined && stripOptions.endValue !== undefined && stripOptions.color !== undefined) {
                            stripPos = getPos(stripOptions.startValue, stripOptions.endValue, translator.businessRange);
                            if (stripPos.stripTo - stripPos.stripFrom === 0 || !stripPos.stripTo && stripPos.stripTo !== 0 || !stripPos.stripFrom && stripPos.stripFrom !== 0) {
                                stripRects.push(null);
                                if (stripOptions.label && stripOptions.label.text)
                                    stripLabels.push(null);
                                continue
                            }
                            rect = isHorizontal ? renderer.createRect(stripPos.stripFrom, positionTo, stripPos.stripTo - stripPos.stripFrom, positionFrom - positionTo, 0, {fill: stripOptions.color}) : renderer.createRect(positionFrom, stripPos.stripFrom, positionTo - positionFrom, stripPos.stripTo - stripPos.stripFrom, 0, {fill: stripOptions.color});
                            rect.append(group);
                            stripRects.push(rect);
                            if (stripOptions.label && stripOptions.label.text)
                                stripLabels.push(drawStripLabel(self, stripOptions.label, stripPos.stripFrom, stripPos.stripTo, self._axisLableGroup));
                            else
                                stripLabels.push(null)
                        }
                    }
                    self.stripLabels = stripLabels;
                    self.stripRects = stripRects
                };
            var drawStripLabel = function drawStripLabel(self, labelOptions, stripFrom, stripTo, group) {
                    var renderer = self.renderer,
                        text = labelOptions.text,
                        canvas = self.translator.canvas,
                        attr = {
                            align: self.options.isHorizontal ? 'center' : 'left',
                            font: $.extend({}, self.options.label.font, labelOptions.font)
                        },
                        label,
                        x,
                        y;
                    if (self.options.isHorizontal) {
                        if (labelOptions.horizontalAlignment === 'center') {
                            x = stripFrom + (stripTo - stripFrom) / 2;
                            attr.align = 'center'
                        }
                        else if (labelOptions.horizontalAlignment === 'left') {
                            x = stripFrom;
                            attr.align = 'left'
                        }
                        else if (labelOptions.horizontalAlignment === 'right') {
                            x = stripTo;
                            attr.align = 'right'
                        }
                        if (labelOptions.verticalAlignment === 'top')
                            y = canvas.top;
                        else if (labelOptions.verticalAlignment === 'center')
                            y = (canvas.height - canvas.top - canvas.bottom) / 2 + canvas.top;
                        else if (labelOptions.verticalAlignment === 'bottom')
                            y = canvas.height - canvas.bottom
                    }
                    else {
                        if (labelOptions.horizontalAlignment === 'center') {
                            x = (canvas.width - canvas.left - canvas.right) / 2 + canvas.left;
                            attr.align = 'center'
                        }
                        else if (labelOptions.horizontalAlignment === 'left') {
                            x = canvas.left;
                            attr.align = 'left'
                        }
                        else if (labelOptions.horizontalAlignment === 'right') {
                            x = canvas.width - canvas.right;
                            attr.align = 'right'
                        }
                        if (labelOptions.verticalAlignment === 'top')
                            y = stripFrom;
                        else if (labelOptions.verticalAlignment === 'center')
                            y = stripTo + (stripFrom - stripTo) / 2;
                        else if (labelOptions.verticalAlignment === 'bottom')
                            y = stripTo
                    }
                    label = renderer.createText(text, x, y, attr);
                    label.append(group);
                    return label
                };
            var initAxisPositions = function(self) {
                    if (self.options.isHorizontal)
                        self.axisPosition = getYAxisPosition(self);
                    else
                        self.axisPosition = getXAxisPosition(self)
                };
            var adjustLabels = function(self) {
                    var options = self.options,
                        labels = self.labels,
                        labelOptions = options.label,
                        label,
                        labelHeight,
                        isNeedLabelAdjustment,
                        staggeringSpacing,
                        i,
                        xt,
                        shift = self.padding && self.padding[options.position] || 0,
                        boxAxis = self._axisElementsGroup && self._axisElementsGroup.getBBox() || {},
                        box;
                    if (!options.label.visible || !labels || !labels.length)
                        return;
                    for (i = 0; i < labels.length; i++) {
                        label = labels[i];
                        box = label.getBBox();
                        if (options.isHorizontal && options.position === 'bottom')
                            label.applySettings({y: 2 * label.settings.y - box.y + shift});
                        else if (!options.isHorizontal) {
                            if (options.position === 'left')
                                if (self.textOptions.align === 'right')
                                    xt = box.x + box.width - shift;
                                else if (self.textOptions.align === 'center')
                                    xt = box.x + box.width / 2 - shift - (boxAxis.width / 2 || 0);
                                else
                                    xt = box.x - shift - (boxAxis.width || 0);
                            else if (self.textOptions.align === 'center')
                                xt = box.x + box.width / 2 + (boxAxis.width / 2 || 0) + shift;
                            else if (self.textOptions.align === 'right')
                                xt = box.x + box.width + (boxAxis.width || 0) + shift;
                            else
                                xt = box.x + shift;
                            label.applySettings({
                                x: xt,
                                y: label.settings.y + ~~(label.settings.y - box.y - box.height / 2)
                            })
                        }
                        else if (options.isHorizontal && options.position === 'top')
                            label.applySettings({y: 2 * label.settings.y - box.y - box.height - shift})
                    }
                    isNeedLabelAdjustment = options.isHorizontal && self.overlappingBehavior && self.overlappingBehavior.mode === 'stagger';
                    self._testIsNeedLabelAdjustment = isNeedLabelAdjustment;
                    if (isNeedLabelAdjustment) {
                        labelHeight = 0;
                        for (i = 0; i < labels.length; i = i + 2) {
                            label = labels[i];
                            box = label.getBBox();
                            if (box.height > labelHeight)
                                labelHeight = box.height
                        }
                        staggeringSpacing = self.overlappingBehavior.staggeringSpacing;
                        self._testStaggeringSpacing = staggeringSpacing;
                        labelHeight = Math.round(labelHeight) + staggeringSpacing;
                        for (i = 1; i < labels.length; i = i + 2) {
                            label = labels[i];
                            if (options.position === 'bottom')
                                label.move(0, labelHeight);
                            else if (options.position === 'top')
                                label.move(0, -labelHeight)
                        }
                        for (i = 0; i < labels.length; i++)
                            labels[i].rotate(0)
                    }
                };
            var adjustStripLabels = function(self) {
                    var options = self.options,
                        labelOptions,
                        labels = self.stripLabels,
                        rects = self.stripRects,
                        rect,
                        label,
                        i,
                        box,
                        rectBox,
                        stripOptions,
                        x,
                        y;
                    if (labels === undefined && rects === undefined)
                        return;
                    for (i = 0; i < labels.length; i++) {
                        x = y = 0;
                        stripOptions = options.strips[i];
                        labelOptions = stripOptions.label;
                        label = labels[i];
                        if (label !== null) {
                            rect = rects[i];
                            box = label.getBBox();
                            rectBox = rect.getBBox();
                            if (labelOptions.horizontalAlignment === 'left')
                                x += stripOptions.paddingLeftRight;
                            else if (labelOptions.horizontalAlignment === 'right')
                                x -= stripOptions.paddingLeftRight;
                            if (labelOptions.verticalAlignment === 'top')
                                y += rectBox.y - box.y + stripOptions.paddingTopBottom;
                            else if (labelOptions.verticalAlignment === 'center')
                                y += rectBox.y + rectBox.height / 2 - box.y - box.height / 2;
                            else if (labelOptions.verticalAlignment === 'bottom')
                                y -= stripOptions.paddingTopBottom;
                            label.move(x, y)
                        }
                    }
                };
            var adjustTitle = function(self, group) {
                    var options = self.options,
                        margin = options.title.margin,
                        boxGroup,
                        boxTitle,
                        title = self.title;
                    if (!title)
                        return;
                    boxTitle = title.getBBox();
                    boxGroup = group.getBBox();
                    if (options.isHorizontal)
                        if (options.position === 'bottom')
                            title.applySettings({
                                y: boxGroup.isEmpty ? undefined : boxGroup.y + boxGroup.height,
                                translateY: margin + boxTitle.height
                            });
                        else
                            title.applySettings({
                                y: boxGroup.isEmpty ? undefined : boxGroup.y,
                                translateY: -margin
                            });
                    else if (options.position === 'left')
                        title.applySettings({
                            x: boxGroup.isEmpty ? undefined : boxGroup.x,
                            translateX: -margin
                        });
                    else
                        title.applySettings({
                            x: boxGroup.isEmpty ? undefined : boxGroup.x + boxGroup.width,
                            translateX: margin
                        })
                };
            var draw = function(externalOptions) {
                    var _this = this,
                        cssClass = _this.options.isHorizontal ? 'dxc-h-axis' : 'dxc-v-axis',
                        stripClass = _this.options.isHorizontal ? 'dxc-h-strips' : 'dxc-v-strips',
                        constantLineClass = _this.options.isHorizontal ? 'dxc-h-constant-lines' : 'dxc-v-constant-lines',
                        axisClipRectID = _this.clipRectID;
                    externalOptions = externalOptions || {};
                    var debug = DX.utils.debug;
                    debug.assertParam(this.translator, 'translator was not set before Draw call');
                    if (_this._axisGroup) {
                        _this._axisGroup.detach();
                        _this._axisStripGroup.detach();
                        _this._axisLableGroup.detach();
                        _this._axisConstantLineGroup.detach();
                        _this._axisTitleGroup.clear();
                        _this._axisGridGroup.clear();
                        _this._axisElementsGroup.clear();
                        _this._axisLineGroup.clear();
                        _this._axisStripGroup.clear();
                        _this._axisConstantLineGroup.clear();
                        _this._axisLableGroup.clear()
                    }
                    else {
                        _this._axisGroup = _this.renderer.createGroup({
                            'class': cssClass,
                            clipId: axisClipRectID
                        });
                        _this._axisStripGroup = _this.renderer.createGroup({'class': stripClass});
                        _this._axisGridGroup = _this.renderer.createGroup({'class': 'dxc-grid'}).append(_this._axisGroup);
                        _this._axisElementsGroup = _this.renderer.createGroup({'class': 'dxc-elements'}).append(_this._axisGroup);
                        _this._axisLineGroup = _this.renderer.createGroup({'class': 'dxc-line'}).append(_this._axisGroup);
                        _this._axisTitleGroup = _this.renderer.createGroup({'class': 'dxc-title'}).append(_this._axisGroup);
                        _this._axisConstantLineGroup = _this.renderer.createGroup({'class': constantLineClass});
                        _this._axisLableGroup = _this.renderer.createGroup({'class': 'dxc-axis-labels'})
                    }
                    initAxisPositions(_this);
                    if (!_this._virtual) {
                        drawAxis(_this, _this._axisLineGroup);
                        drawTicks(_this, _this._axisLineGroup);
                        drawLabels(_this, _this._axisElementsGroup);
                        if (_this.options.title.text)
                            drawTitle(_this, _this._axisTitleGroup)
                    }
                    if (_this.options.strips)
                        drawStrip(_this, _this._axisStripGroup);
                    if (_this.options.constantLines)
                        drawConstantLine(_this, _this._axisConstantLineGroup);
                    drawGrid(_this, _this._axisGridGroup, externalOptions.borderOptions);
                    _this._axisStripGroup.append(_this.stripsGroup);
                    _this._axisConstantLineGroup.append(_this.constantLinesGroup);
                    _this._axisGroup.append(_this.axesContainerGroup);
                    _this._axisLableGroup.append(_this.labelAxesGroup);
                    adjustConstantLineLabels(_this);
                    adjustLabels(_this);
                    adjustStripLabels(_this);
                    adjustTitle(_this, _this._axisElementsGroup)
                };
            var getBoundingRect = function() {
                    var _this = this,
                        axisBox = _this._axisElementsGroup.getBBox(),
                        lineBox = _this._axisLineGroup.getBBox(),
                        placeholderSize = _this.options.placeholderSize,
                        start,
                        isHorizontal = _this.options.isHorizontal,
                        coord = isHorizontal && 'y' || 'x',
                        side = isHorizontal && 'height' || 'width',
                        positionCondition = _this.options.position === (isHorizontal && 'bottom' || 'right'),
                        axisTitleBox = _this.title && _this._axisTitleGroup.getBBox() || axisBox;
                    if (axisBox.isEmpty && axisTitleBox.isEmpty && !placeholderSize)
                        return axisBox;
                    start = lineBox[coord] || _this.axisPosition;
                    if (positionCondition) {
                        axisBox[side] = placeholderSize || axisTitleBox[coord] + axisTitleBox[side] - start;
                        axisBox[coord] = start
                    }
                    else {
                        axisBox[side] = placeholderSize || lineBox[side] + start - axisTitleBox[coord];
                        axisBox[coord] = axisTitleBox.isEmpty ? start : axisTitleBox[coord]
                    }
                    return axisBox
                };
            var shift = function(x, y) {
                    var settings = {};
                    if (x)
                        settings.translateX = x;
                    if (y)
                        settings.translateY = y;
                    this._axisGroup.applySettings(settings)
                };
            var applyClipRect = function(clipId) {
                    this._axisStripGroup.applySettings({clipId: clipId})
                };
            var validate = function(isArgumentAxis, incidentOccured) {
                    var options = this.options,
                        parseUtils = new ParseUtils,
                        type = isArgumentAxis ? this.options.argumentType : this.options.valueType,
                        parser = type ? parseUtils.getParser(type, 'axis') : function(unit) {
                            return unit
                        };
                    this.parser = parser;
                    this.incidentOccured = incidentOccured;
                    this.options.axisType = type;
                    this._errorMessages = {
                        unsupportedFieldMessage: function(field) {
                            return 'The ' + field + ' field contains data of an unsupported axis type.'
                        },
                        numericParsingMessage: function(field) {
                            return 'The ' + field + ' cannot be parsed to the numeric axis type.'
                        },
                        dateParsingMessage: function(field) {
                            return 'The ' + field + ' cannot be parsed to the date axis type.'
                        }
                    };
                    if (options.min)
                        options.min = this.validateUnit(options.min, "Value of the 'min' option");
                    if (options.max)
                        options.max = this.validateUnit(options.max, "Value of the 'max' option");
                    if (options.range.min)
                        options.range.min = this.validateUnit(options.range.min);
                    if (options.range.max)
                        options.range.max = this.validateUnit(options.range.max)
                };
            var validateUnit = function(unit, field) {
                    var type = this.options.axisType;
                    unit = this.parser(unit);
                    if (unit === undefined && field) {
                        type === 'datetime' && this.incidentOccured(this._errorMessages.dateParsingMessage(field));
                        type === 'numeric' && this.incidentOccured(this._errorMessages.numericParsingMessage(field));
                        type !== 'numeric' && type !== 'datetime' && this.incidentOccured(this._errorMessages.unsupportedFieldMessage(field))
                    }
                    return unit
                };
            var getRangeData = function() {
                    var options = this.options,
                        range = {},
                        min,
                        max;
                    var addValueMarginToRange = function(prefix, dim) {
                            if (options['valueMarginsEnabled']) {
                                if (utils.isDefined(options[prefix])) {
                                    range[prefix + dim] = options[prefix];
                                    range[prefix + dim + 'Priority'] = AXIS_VALUE_MARGIN_PRIORITY
                                }
                            }
                            else {
                                range[prefix + dim] = 0;
                                range[prefix + dim + 'Priority'] = AXIS_VALUE_MARGIN_PRIORITY
                            }
                        };
                    if (utils.isDefined(options.range.min) && utils.isDefined(options.range.max)) {
                        min = options.range.min < options.range.max ? options.range.min : options.range.max;
                        max = options.range.max > options.range.min ? options.range.max : options.range.min
                    }
                    else {
                        min = options.range.min;
                        max = options.range.max
                    }
                    if (options.isHorizontal) {
                        range.minX = min;
                        range.maxX = max;
                        range.minVisibleX = options.range.min;
                        range.maxVisibleX = options.range.max;
                        addValueMarginToRange('minValueMargin', 'X');
                        addValueMarginToRange('maxValueMargin', 'X');
                        range.invertX = options.inverted;
                        range.stickX = !options.valueMarginsEnabled;
                        range.categoriesX = options.range.categories;
                        range.axisTypeX = options.type;
                        if (range.axisTypeX === 'logarithmic')
                            range.baseX = options.logarithmBase
                    }
                    else {
                        range.minY = min;
                        range.maxY = max;
                        range.minVisibleY = options.range.min;
                        range.maxVisibleY = options.range.max;
                        range.invertY = options.inverted || options.type === 'discrete' && options.oppositeDirectionYAxis;
                        range.stickY = !options.valueMarginsEnabled;
                        addValueMarginToRange('minValueMargin', 'Y');
                        addValueMarginToRange('maxValueMargin', 'Y');
                        range.categoriesY = options.range.categories;
                        range.axisTypeY = options.type;
                        if (range.axisTypeY === 'logarithmic')
                            range.baseY = options.logarithmBase
                    }
                    return range
                };
            var on = function(events, data, handler) {
                    this._$axis && this._$axis.on(events, data, handler);
                    return this
                };
            var off = function(events) {
                    this._$axis && this._$axis.off(events);
                    return this
                };
            var prototypeObject = {
                    _getOptimalRotationAngle: _getOptimalRotationAngle,
                    _applyOptimalOverlappingBehavior: _applyOptimalOverlappingBehavior,
                    ctor: ctor,
                    dispose: dispose,
                    init: init,
                    resetTicks: resetTicks,
                    setTranslator: setTranslator,
                    getTickValues: getTickValues,
                    setTickValues: setTickValues,
                    getRangeData: getRangeData,
                    getMultipleAxesSpacing: getMultipleAxesSpacing,
                    setRange: setRange,
                    setPercentLabelFormat: setPercentLabelFormat,
                    resetAutoLabelFormat: resetAutoLabelFormat,
                    draw: draw,
                    getBoundingRect: getBoundingRect,
                    shift: shift,
                    on: on,
                    off: off,
                    validate: validate,
                    applyClipRect: applyClipRect,
                    validateUnit: validateUnit
                };
            prototypeObject.getTicksOptions = getTicksOptions;
            prototypeObject.drawAxis = drawAxis;
            prototypeObject.drawTicks = drawTicks;
            prototypeObject.drawGrid = drawGrid;
            prototypeObject.drawStrip = drawStrip;
            prototypeObject.drawLabels = drawLabels;
            prototypeObject.adjustLabels = adjustLabels;
            prototypeObject.adjustStripLabels = adjustStripLabels;
            prototypeObject.drawTitle = drawTitle;
            prototypeObject.adjustTitle = adjustTitle;
            prototypeObject.initAxisPositions = initAxisPositions;
            prototypeObject.drawConstantLine = drawConstantLine;
            prototypeObject.drawConstantLineLabels = drawConstantLineLabels;
            prototypeObject.adjustConstantLineLabels = adjustConstantLineLabels;
            prototypeObject.checkAlignmentConstantLineLabels = checkAlignmentConstantLineLabels;
            return prototypeObject
        }())
    })(jQuery, DevExpress);
    /*! Module viz-charts, file baseChart.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            charts = DX.viz.charts,
            utils = DX.utils,
            dataUtils = DX.data.utils,
            TRACKER_RENDERING_DELAY = 1200,
            resizeRedrawOptions = {
                animate: false,
                isResize: true
            },
            ACTIONS_BY_PRIORITY = ['processAxesOption', 'reinit', '_reinitDataSource', '_handleDataSourceChanged', 'force_render'],
            core = DX.viz.core;
        charts.BaseChart = ui.Component.inherit({
            _defaultOptions: function() {
                return {
                        done: $.noop,
                        drawn: $.noop,
                        redrawOnResize: true,
                        incidentOccured: $.noop,
                        margin: {
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0
                        },
                        size: {
                            width: undefined,
                            height: undefined
                        },
                        title: {text: null},
                        legend: {hoverMode: 'includePoints'},
                        animation: {
                            enabled: true,
                            duration: 1000,
                            easing: 'easeOutCubic',
                            maxPointCountSupported: 300,
                            asyncSeriesRendering: true,
                            asyncTrackersRendering: true,
                            trackerRenderingDelay: TRACKER_RENDERING_DELAY
                        },
                        seriesSelectionMode: 'single',
                        pointSelectionMode: 'single',
                        seriesClick: null,
                        pointClick: null,
                        legendClick: null,
                        argumentAxisClick: null,
                        seriesHover: null,
                        pointHover: null,
                        seriesSelected: null,
                        pointSelected: null,
                        seriesSelectionChanged: null,
                        pointSelectionChanged: null,
                        seriesHoverChanged: null,
                        pointHoverChanged: null
                    }
            },
            _init: function() {
                this.__TRACKER_RENDERING_DELAY = TRACKER_RENDERING_DELAY;
                var _this = this;
                _this._checkAndSaveCanvasSize();
                _this._initRenderer();
                _this._createHtmlStructure();
                _this._needHandleRenderComplete = true;
                _this.layoutManager = charts.factory.createChartLayoutManager();
                _this._reinit();
                _this._element().css({webkitUserSelect: 'none'});
                _this._element().on('contextmenu', function(event) {
                    _this.eventType = 'contextmenu';
                    if (ui.events.isTouchEvent(event) || ui.events.isPointerEvent(event))
                        event.preventDefault()
                });
                _this._element().on('MSHoldVisual', function(event) {
                    _this.eventType = 'MSHoldVisual';
                    event.preventDefault()
                })
            },
            _reinit: function() {
                var _this = this;
                _this.layoutManager.update(_this);
                if (_this.option('redrawOnResize') && window) {
                    if (!_this._resizeHandlerCallback) {
                        _this._resizeHandlerCallback = _this._resizeHandler();
                        utils.windowResizeCallbacks.add(_this._resizeHandlerCallback)
                    }
                }
                else {
                    utils.windowResizeCallbacks.remove(_this._resizeHandlerCallback);
                    delete _this._resizeHandlerCallback
                }
                if (!$.isFunction(_this.option('incidentOccured'))) {
                    utils.debug.assert(false, 'Function should be passed as "incidentOccured" callback');
                    _this.option('incidentOccured', $.noop)
                }
                _this._createTracker();
                _this._reinitDataSource()
            },
            _createHtmlStructure: function() {
                var _this = this,
                    renderer = _this.renderer;
                _this._panesBackgroundGroup = renderer.createGroup({'class': 'dxc-background'});
                _this._titleGroup = renderer.createGroup({'class': 'dxc-title'});
                _this._legendGroup = renderer.createGroup({'class': 'dxc-legend'});
                _this._stripsGroup = renderer.createGroup({'class': 'dxc-strips-group'});
                _this._constantLinesGroup = renderer.createGroup({'class': 'dxc-constant-lines-group'});
                _this._axesGroup = renderer.createGroup({'class': 'dxc-axes-group'});
                _this._panesBorderGroup = renderer.createGroup({'class': 'dxc-border'});
                _this._labelAxesGroup = renderer.createGroup({'class': 'dxc-strips-labels-group'});
                _this._seriesGroup = renderer.createGroup({'class': 'dxc-series-group'});
                _this._labelsGroup = renderer.createGroup({'class': 'dxc-labels-group'});
                _this._tooltipGroup = renderer.createGroup({'class': 'dxc-tooltip'});
                _this._trackerGroup = renderer.createGroup({
                    'class': 'dxc-trackers',
                    opacity: 0.0001
                });
                _this._crosshairTrackerGroup = renderer.createGroup({
                    'class': 'dxc-crosshair-trackers',
                    stroke: 'none',
                    fill: 'grey'
                }).append(_this._trackerGroup);
                _this._seriesTrackerGroup = renderer.createGroup({'class': 'dxc-series-trackers'}).append(_this._trackerGroup);
                _this._markerTrackerGroup = renderer.createGroup({
                    'class': 'dxc-markers-trackers',
                    stroke: 'none',
                    fill: 'grey'
                }).append(_this._trackerGroup);
                _this._legendTrackerGroup = renderer.createGroup({
                    'class': 'dxc-legend-trackers',
                    stroke: 'none',
                    fill: 'grey',
                    opacity: 0.0001
                }).append(_this._legendGroup);
                _this._crossHairCursorGroup = renderer.createGroup({'class': 'dxc-crosshair-cursor'})
            },
            _cleanHtmlStructure: function() {
                var _this = this;
                _this._panesBackgroundGroup && _this._panesBackgroundGroup.clear();
                _this._titleGroup && _this._titleGroup.clear();
                _this._legendGroup && (_this._legendGroup.detach(), _this._legendTrackerGroup.clear(), _this._legendGroup.clear());
                _this._stripsGroup && (_this._stripsGroup.detach(), _this._stripsGroup.clear());
                _this._constantLinesGroup && (_this._constantLinesGroup.detach(), _this._constantLinesGroup.clear());
                _this._axesGroup && (_this._axesGroup.detach(), _this._axesGroup.clear());
                _this._labelAxesGroup && (_this._labelAxesGroup.detach(), _this._labelAxesGroup.clear());
                _this._seriesGroup && (_this._seriesGroup.detach(), _this._seriesGroup.clear());
                _this._labelsGroup && (_this._labelsGroup.detach(), _this._labelsGroup.clear());
                _this._trackerGroup && (_this._trackerGroup.detach(), _this._seriesTrackerGroup.clear(), _this._markerTrackerGroup.clear(), _this._crosshairTrackerGroup.clear());
                _this._panesBorderGroup && _this._panesBorderGroup.clear();
                _this._tooltipGroup && _this._tooltipGroup.clear();
                _this._crossHairCursorGroup && (_this._crossHairCursorGroup.clear(), _this._crossHairCursorGroup.detach())
            },
            _disposeObjectsInArray: function(propName) {
                $.each(this[propName] || [], function(_, item) {
                    item && item.dispose()
                });
                this[propName] = null
            },
            _dispose: function() {
                var _this = this,
                    disposeObject = function(propName) {
                        _this[propName] && _this[propName].dispose(),
                        _this[propName] = null
                    },
                    detachGroup = function(groupName) {
                        _this[groupName] && _this[groupName].detach()
                    },
                    disposeObjectsInArray = this._disposeObjectsInArray;
                clearTimeout(_this.delayedRedraw);
                if (_this._resizeHandlerCallback) {
                    _this._resizeHandlerCallback.stop();
                    utils.windowResizeCallbacks.remove(_this._resizeHandlerCallback);
                    _this._resizeHandlerCallback = null
                }
                _this.callBase();
                disposeObjectsInArray.call(_this, "businessRanges");
                disposeObjectsInArray.call(_this, "translators");
                disposeObjectsInArray.call(_this, "series");
                disposeObject("layoutManager");
                disposeObject("themeManager");
                disposeObject("renderer");
                disposeObject("tracker");
                disposeObject("tooltip");
                disposeObject("chartTitle");
                _this.paneAxis = null;
                _this._userOptions = null;
                _this.dirtyCanvas = null;
                _this.canvas = null;
                detachGroup("_legendGroup");
                detachGroup("_stripsGroup");
                detachGroup("_constantLinesGroup");
                detachGroup("_axesGroup");
                detachGroup("_labelAxesGroup");
                detachGroup("_seriesGroup");
                detachGroup("_labelsGroup");
                detachGroup("_trackerGroup");
                detachGroup("_crossHairCursorGroup");
                disposeObject("canvasClipRect");
                disposeObject("_panesBackgroundGroup");
                disposeObject("_titleGroup");
                disposeObject("_legendGroup");
                disposeObject("_stripsGroup");
                disposeObject("_constantLinesGroup");
                disposeObject("_axesGroup");
                disposeObject("_labelAxesGroup");
                disposeObject("_panesBorderGroup");
                disposeObject("_seriesGroup");
                disposeObject("_labelsGroup");
                disposeObject("_tooltipGroup");
                disposeObject("_crossHairCursorGroup");
                disposeObject("_seriesTrackerGroup");
                disposeObject("_markerTrackerGroup");
                disposeObject("_legendTrackerGroup");
                disposeObject("_crosshairTrackerGroup");
                disposeObject("_trackerGroup");
                _this._disposeLoadIndicator()
            },
            _clean: function _clean(hideLoadIndicator) {
                this.renderer && this.renderer.stopAllAnimations();
                hideLoadIndicator && this.hideLoadingIndicator();
                this._cleanHtmlStructure();
                this.callBase();
                this._saveDirtyCanvas()
            },
            _initRenderer: function _initRenderer() {
                if (this.renderer)
                    return;
                var _this = this,
                    animationOptions = _this.option('animation');
                animationOptions = animationOptions === true ? _this._defaultOptions().animation : animationOptions;
                _this.renderer = charts.factory.createRenderer({
                    animation: animationOptions,
                    cssClass: 'dxc dxc-chart'
                })
            },
            _initSeries: function() {
                this.series = this.series || this._populateSeries()
            },
            _reinitDataSource: function() {
                this._refreshDataSource()
            },
            _initOptions: function(options) {
                this._optionsInitializing = true;
                var _this = this,
                    changedTitle = _this._processTitleOption(options.title, _this.option('title'));
                if (changedTitle)
                    options.title = changedTitle;
                _this._userOptions = options;
                if (!options.incidentOccured)
                    options.incidentOccured = utils.logger.warn;
                _this._processAxesOption(options);
                _this._createThemeManager(options);
                _this.option(_this.themeManager.applyChartTheme(options));
                delete _this._userOptions.userCommonAxisSettings
            },
            _processTitleOption: function(title, oldTitle) {
                if (utils.isString(title)) {
                    var text = title;
                    title = oldTitle;
                    title.text = text;
                    return title
                }
            },
            _processAxesOption: function(options) {
                var argumentAxesOptions = $.isArray(options.argumentAxis) ? options.argumentAxis : [options.argumentAxis],
                    valueAxesOptions = $.isArray(options.valueAxis) ? options.valueAxis : [options.valueAxis],
                    incidentOccured = options.incidentOccured,
                    checkOptions = function(axesOptions) {
                        var axisOptions,
                            text,
                            i = 0;
                        for (i = 0; i < axesOptions.length; i++) {
                            axisOptions = axesOptions[i];
                            if (!axisOptions)
                                continue;
                            if (axisOptions.title)
                                if (utils.isString(axisOptions.title)) {
                                    text = axisOptions.title;
                                    axisOptions.title = {};
                                    axisOptions.title.text = text
                                }
                            if (axisOptions.type === 'logarithmic' && axisOptions.logarithmBase <= 0 || axisOptions.logarithmBase && !$.isNumeric(axisOptions.logarithmBase)) {
                                axisOptions.logarithmBase = undefined;
                                incidentOccured && incidentOccured.call && incidentOccured('The value passed to the "logarithmBase" option is not valid. The default value will be used.')
                            }
                            if (axisOptions.label) {
                                if (axisOptions.label.alignment)
                                    axisOptions.label['userAlignment'] = true;
                                if (!axisOptions.label.overlappingBehavior) {
                                    if (axisOptions.label.staggered)
                                        axisOptions.label.overlappingBehavior = {
                                            mode: 'stagger',
                                            staggeringSpacing: axisOptions.label.staggeringSpacing
                                        };
                                    if (axisOptions.label.rotationAngle)
                                        axisOptions.label.overlappingBehavior = {
                                            mode: 'rotate',
                                            rotationAngle: axisOptions.label.rotationAngle
                                        }
                                }
                                if (utils.isString(axisOptions.label.overlappingBehavior))
                                    axisOptions.label.overlappingBehavior = {mode: axisOptions.label.overlappingBehavior};
                                if (!axisOptions.label.overlappingBehavior || !axisOptions.label.overlappingBehavior.mode)
                                    axisOptions.label.overlappingBehavior = axisOptions.label.overlappingBehavior || {}
                            }
                        }
                    };
                options.userCommonAxisSettings = this._userOptions.commonAxisSettings;
                checkOptions([options.commonAxisSettings]);
                checkOptions(argumentAxesOptions);
                checkOptions(valueAxesOptions)
            },
            _checkAndSaveCanvasSize: function() {
                var canvas = this.option('size'),
                    intermediateResult = false;
                if (utils.isDefined(canvas.width))
                    if (canvas.width < 0)
                        canvas.width = canvas.userWidth;
                    else {
                        canvas.userWidth = canvas.width;
                        intermediateResult = true
                    }
                if (utils.isDefined(canvas.height))
                    if (canvas.height < 0)
                        canvas.height = canvas.userHeight;
                    else {
                        canvas.userHeight = canvas.height;
                        intermediateResult = true
                    }
                return intermediateResult
            },
            _saveDirtyCanvas: function() {
                this.dirtyCanvas = this._calculateCanvas()
            },
            _resizeHandler: function() {
                var _this = this;
                return utils.createResizeHandler(function() {
                        _this._render(resizeRedrawOptions)
                    })
            },
            _createThemeManager: function(options) {
                options = options || {};
                var _this = this;
                _this.themeManager && _this.themeManager.dispose();
                _this.themeManager = charts.factory.createThemeManager({
                    theme: options.theme,
                    palette: options.palette
                })
            },
            _calculateCanvas: function() {
                var canvas = this.option('size'),
                    container = this._element();
                if (!utils.isDefined(canvas.userWidth)) {
                    canvas.width = container.width();
                    if (!canvas.width)
                        canvas.width = 400
                }
                if (!utils.isDefined(canvas.userHeight)) {
                    canvas.height = container.height();
                    if (!canvas.height)
                        canvas.height = 400
                }
                return $.extend({}, canvas, this.option('margin'))
            },
            _createTracker: function() {
                var _this = this,
                    rotated = _this.option('rotated'),
                    tooltipOptions = _this.option('tooltip') || {};
                if (_this.tracker)
                    _this.tracker.dispose();
                _this.tracker = charts.factory.createTracker({
                    series: _this.series,
                    valueAxis: rotated ? _this.horizontalAxes : _this.verticalAxes,
                    argumentAxis: rotated ? _this.verticalAxes : _this.horizontalAxes,
                    seriesSelectionMode: _this.option('seriesSelectionMode'),
                    pointSelectionMode: _this.option('pointSelectionMode'),
                    tooltipShown: _this.option('tooltipShown'),
                    tooltipHidden: _this.option('tooltipHidden'),
                    markerTrackerGroup: _this._markerTrackerGroup,
                    crossHairOptions: _this._crossHairOptions,
                    seriesTrackerGroup: _this._seriesTrackerGroup,
                    legendGroup: _this._legendTrackerGroup,
                    seriesGroup: _this._seriesGroup,
                    tooltipEnabled: tooltipOptions.enabled,
                    renderer: _this.renderer,
                    events: {
                        seriesClick: _this.option('seriesClick'),
                        pointClick: _this.option('pointClick'),
                        argumentAxisClick: _this.option('argumentAxisClick'),
                        seriesHover: _this.option('seriesHover'),
                        seriesSelected: _this.option('seriesSelected'),
                        pointHover: _this.option('pointHover'),
                        pointSelected: _this.option('pointSelected'),
                        legendClick: _this.option('legendClick'),
                        seriesSelectionChanged: _this.option('seriesSelectionChanged'),
                        pointSelectionChanged: _this.option('pointSelectionChanged'),
                        seriesHoverChanged: _this.option('seriesHoverChanged'),
                        pointHoverChanged: _this.option('pointHoverChanged')
                    }
                })
            },
            _updateTracker: function() {
                var _this = this,
                    rotated = _this.option('rotated');
                if (!_this.tracker)
                    _this._createTracker();
                else
                    _this.tracker._reinit({
                        series: _this.series,
                        valueAxis: rotated ? _this.horizontalAxes : _this.verticalAxes,
                        argumentAxis: rotated ? _this.verticalAxes : _this.horizontalAxes
                    })
            },
            _render: function(drawOptions) {
                this._optionsInitializing = false;
                var _this = this,
                    renderer = _this.renderer,
                    translators = _this.translators,
                    updatedCanvas = _this.canvas,
                    container = this._element(),
                    currentDirtyCanvas = _this._calculateCanvas(),
                    oldDirtyCanvas = _this.dirtyCanvas;
                drawOptions = drawOptions || {recreateCanvas: true};
                drawOptions.recreateCanvas = drawOptions.recreateCanvas || !renderer.isInitialized();
                if (!drawOptions.force && oldDirtyCanvas && oldDirtyCanvas.width === currentDirtyCanvas.width && oldDirtyCanvas.height === currentDirtyCanvas.height && !_this.hiddenContainer) {
                    _this.stopRedraw = true;
                    return
                }
                clearTimeout(_this.delayedRedraw);
                if (drawOptions.recreateCanvas)
                    updatedCanvas = _this._calculateCanvas();
                if (updatedCanvas.width && updatedCanvas.height && container.is(':visible'))
                    _this.hiddenContainer = false;
                else {
                    _this.option('incidentOccured')('Chart cannot be drawn because its container is invisible.');
                    _this.hiddenContainer = true;
                    _this.stopRedraw = true;
                    renderer.killContainer();
                    return
                }
                if (drawOptions.recreateCanvas) {
                    _this.canvas = updatedCanvas;
                    renderer.recreateCanvas(_this.canvas.width, _this.canvas.height);
                    renderer.draw(_this._element()[0]);
                    _this._reappendLoadIndicator();
                    _this._updateLoadIndicator(undefined, updatedCanvas.width, updatedCanvas.height);
                    _this._createCanvasClipRect();
                    if (translators)
                        translators.length = 0
                }
                _this.layoutManager.update(_this);
                _this._cleanGroups(drawOptions);
                _this._saveDirtyCanvas()
            },
            _cleanGroups: function(drawOptions) {
                var _this = this;
                _this._stripsGroup.detach();
                _this._constantLinesGroup.detach();
                _this._axesGroup.detach();
                _this._labelAxesGroup.detach();
                _this._seriesGroup.detach();
                _this._labelsGroup.detach();
                _this._trackerGroup.detach();
                _this._tooltipGroup.detach();
                _this._crossHairCursorGroup.detach();
                if (!drawOptions || drawOptions.drawLegend) {
                    _this._legendGroup.detach();
                    _this._legendGroup.clear()
                }
                _this._stripsGroup.clear();
                _this._constantLinesGroup.clear();
                _this._axesGroup.clear();
                _this._labelAxesGroup.clear();
                _this._seriesGroup.clear();
                _this._labelsGroup.clear();
                _this._tooltipGroup.clear();
                _this._crossHairCursorGroup.clear();
                _this._seriesTrackerGroup.clear();
                _this._markerTrackerGroup.clear();
                _this._legendTrackerGroup.clear();
                _this._crosshairTrackerGroup.clear()
            },
            _drawTitle: function() {
                var _this = this;
                if (_this.chartTitle)
                    _this.chartTitle.update(_this.canvas, _this.option('title'));
                else
                    _this.chartTitle = charts.factory.createTitle(_this.renderer, _this.canvas, _this.option('title'), _this._titleGroup);
                _this.chartTitle.render()
            },
            _createTooltip: function() {
                var _this = this,
                    tooltipOptions = $.extend(true, {
                        renderer: _this.renderer,
                        canvasWidth: _this.canvas.width,
                        canvasHeight: _this.canvas.height
                    }, _this.option('tooltip') || {}),
                    tooltipCoords,
                    point = this.tracker.pointAtShownTooltip;
                if (!$.isFunction(tooltipOptions.customizeText) && utils.isDefined(tooltipOptions.customizeText)) {
                    _this.option('incidentOccured').call(null, 'The "customizeText" option cannot be applied because it is not a function.');
                    tooltipOptions.customizeText = undefined
                }
                if (_this.tooltip)
                    _this.tooltip.update(tooltipOptions);
                else
                    _this.tooltip = charts.factory.createTooltip(tooltipOptions, _this._tooltipGroup);
                _this.tooltip.draw();
                _this.tracker.tooltip = _this.tooltip;
                if (point) {
                    tooltipCoords = point.getTooltipCoords();
                    _this.tooltip.move(~~tooltipCoords.x, ~~tooltipCoords.y, tooltipCoords.offset, _this.tooltip.tooltipText, _this.tooltip.fillColor, _this.tooltip.className);
                    _this.tooltip.show()
                }
            },
            _prepareDrawOptions: function(drawOptions) {
                var animationOptions = this.option('animation'),
                    options;
                animationOptions = animationOptions === true ? this._defaultOptions().animation : animationOptions;
                options = $.extend({}, {
                    force: false,
                    adjustAxes: true,
                    drawLegend: true,
                    drawTitle: true,
                    adjustSeriesLabels: true,
                    animate: animationOptions.enabled,
                    animationPointsLimit: animationOptions.maxPointCountSupported,
                    asyncSeriesRendering: animationOptions.asyncSeriesRendering,
                    asyncTrackersRendering: animationOptions.asyncTrackersRendering,
                    trackerRenderingDelay: animationOptions.trackerRenderingDelay
                }, drawOptions);
                if (!utils.isDefined(options.recreateCanvas))
                    options.recreateCanvas = !(!options.adjustAxes || !options.drawLegend || !options.drawTitle);
                return options
            },
            _processRefreshData: function(newRefreshAction) {
                var currentRefreshActionPosition = $.inArray(this._currentRefreshData, ACTIONS_BY_PRIORITY),
                    newRefreshActionPosition = $.inArray(newRefreshAction, ACTIONS_BY_PRIORITY);
                if (!this._currentRefreshData || currentRefreshActionPosition >= 0 && newRefreshActionPosition < currentRefreshActionPosition)
                    this._currentRefreshData = newRefreshAction
            },
            _disposeSeries: function() {
                var _this = this;
                _this.tracker._clean();
                $.each(_this.series || [], function(_, series) {
                    series.dispose()
                });
                _this.series = null;
                $.each(_this.seriesFamilies || [], function(_, family) {
                    family.dispose()
                });
                _this.seriesFamilies = null
            },
            _optionChanged: function(name, value, prevValue) {
                var _this = this,
                    changedTitle;
                if (!_this._optionsInitializing) {
                    _this._optionValuesEqual(name, _this._userOptions[name], value);
                    dataUtils.compileSetter(name)(_this._userOptions, value, {
                        functionsAsIs: true,
                        merge: true
                    })
                }
                if (name === 'animation') {
                    _this.renderer.updateAnimationOptions(value);
                    return
                }
                clearTimeout(_this.delayedRedraw);
                switch (name) {
                    case'dataSource':
                        _this._needHandleRenderComplete = true;
                        _this._processRefreshData('_reinitDataSource');
                        break;
                    case'palette':
                        _this.themeManager.updatePalette(value);
                        _this._disposeSeries();
                        _this._needHandleRenderComplete = true;
                        _this._processRefreshData('_handleDataSourceChanged');
                        break;
                    case'series':
                    case'commonSeriesSettings':
                    case'containerBackgroundColor':
                    case'dataPrepareSettings':
                        _this._disposeSeries();
                        _this._needHandleRenderComplete = true;
                        _this._processRefreshData('_handleDataSourceChanged');
                        break;
                    case'legend':
                    case'seriesTemplate':
                        _this._processRefreshData('_handleDataSourceChanged');
                        break;
                    case'title':
                        changedTitle = _this._processTitleOption(value, prevValue);
                        if (changedTitle) {
                            _this.option('title', prevValue);
                            return
                        }
                        _this._processRefreshData('force_render');
                        break;
                    case'valueAxis':
                    case'argumentAxis':
                    case'commonAxisSettings':
                        _this._needHandleRenderComplete = true;
                        _this._processRefreshData('processAxesOption');
                        _this._disposeSeries();
                        _this.paneAxis = {};
                        break;
                    case'panes':
                    case'defaultPane':
                        _this._disposeSeries();
                        _this.paneAxis = {};
                        _this._needHandleRenderComplete = true;
                        _this._processRefreshData('reinit');
                        break;
                    case'size':
                        if (_this._checkAndSaveCanvasSize())
                            _this._processRefreshData('force_render');
                        break;
                    case'rotated':
                    case'equalBarWidth':
                    case'customizePoint':
                    case'customizeLabel':
                        _this._disposeSeries();
                        _this._needHandleRenderComplete = true;
                        _this._processRefreshData('reinit');
                        break;
                    case'theme':
                        _this._initOptions(_this._userOptions);
                        _this._processRefreshData('reinit');
                        break;
                    case'loadingIndicator':
                        _this._updateLoadIndicator(_this.option('loadingIndicator'));
                        return;
                    default:
                        _this._processRefreshData('reinit')
                }
                _this._invalidate();
                _this.callBase.apply(_this, arguments)
            },
            _refresh: function() {
                var _this = this;
                this.renderer.stopAllAnimations();
                if (_this._currentRefreshData) {
                    switch (_this._currentRefreshData) {
                        case'force_render':
                            _this._render({force: true});
                            break;
                        case'processAxesOption':
                            _this._processAxesOption(_this._options);
                            _this._reinit(true);
                            break;
                        case'reinit':
                            _this._reinit(true);
                            break;
                        default:
                            _this[_this._currentRefreshData] && _this[_this._currentRefreshData]()
                    }
                    delete _this._currentRefreshData
                }
                else
                    _this._render({force: true})
            },
            _dataSourceOptions: function() {
                return {
                        paginate: false,
                        _preferSync: true
                    }
            },
            _createCanvasClipRect: function() {
                var _this = this,
                    canvas = _this.canvas;
                if (!_this.canvasClipRect)
                    _this.canvasClipRect = _this.renderer.createClipRect(canvas.left, canvas.top, canvas.width - canvas.left - canvas.right, canvas.height - canvas.top - canvas.bottom).append();
                else
                    _this.canvasClipRect.updateRectangle({
                        x: canvas.left,
                        y: canvas.top,
                        width: canvas.width - canvas.left - canvas.right,
                        height: canvas.height - canvas.top - canvas.bottom
                    })
            },
            _getCanvasClipRectID: function() {
                return this.canvasClipRect.id
            },
            _handleDataSourceChanged: function() {
                clearTimeout(this.delayedRedraw);
                this._dataSpecificInit(true)
            },
            _groupSeries: function() {
                this._groupedSeries = [this.series]
            },
            _dataSpecificInit: function(needRedraw) {
                this._initSeries();
                this._repopulateSeries();
                this._handleSeriesPopulated(needRedraw)
            },
            _processSeriesTemplate: function() {
                var _this = this,
                    seriesTemplate = _this.option('seriesTemplate'),
                    customizeSeries = utils.isFunction(seriesTemplate.customizeSeries) ? seriesTemplate.customizeSeries : $.noop,
                    nameField = seriesTemplate.nameField || 'series',
                    dataSource = _this._dataSource;
                if (!dataSource)
                    return;
                var generatedSeries = {},
                    seriesOrder = [],
                    items = dataSource.items(),
                    series;
                for (var i = 0, length = items.length; i < length; i++) {
                    var data = items[i];
                    if (nameField in data) {
                        series = generatedSeries[data[nameField]];
                        if (!series) {
                            series = generatedSeries[data[nameField]] = {
                                name: data[nameField],
                                data: []
                            };
                            seriesOrder.push(series.name)
                        }
                        series.data.push(data)
                    }
                }
                _this._templatedSeries = $.map(seriesOrder, function(orderedName) {
                    var group = generatedSeries[orderedName],
                        seriesOptions = customizeSeries.call(null, group.name);
                    return $.extend(group, seriesOptions)
                });
                _this._populateSeries();
                delete _this._templatedSeries
            },
            _processSingleSeries: function(){},
            _repopulateSeries: function() {
                var self = this,
                    parsedData,
                    rotated = self.option('rotated'),
                    incidentOccured = self.option('incidentOccured'),
                    data = self._dataSource && self._dataSource.items(),
                    dataValidatorOptions = this.option('dataPrepareSettings'),
                    seriesTemplate = this.option('seriesTemplate');
                if (this._dataSource && seriesTemplate) {
                    this._processSeriesTemplate();
                    data = self.teamplateData || data
                }
                this._groupSeries();
                self._dataValidator = charts.factory.createDataValidator(data, self._groupedSeries, incidentOccured, dataValidatorOptions);
                parsedData = self._dataValidator.validate();
                self.themeManager.resetPalette();
                $.each(self.series, function(_, singleSeries) {
                    singleSeries.reinitData(parsedData);
                    self._processSingleSeries(singleSeries, singleSeries.userOptions)
                })
            },
            _handleRenderComplete: function() {
                var _this = this,
                    userHandle = _this.option('done'),
                    allSeriesInited = true;
                if (_this._needHandleRenderComplete) {
                    $.each(_this.series, function(_, s) {
                        allSeriesInited = allSeriesInited && s.canRenderCompleteHandle()
                    });
                    if (allSeriesInited) {
                        _this._needHandleRenderComplete = false;
                        $.isFunction(userHandle) && userHandle.call(_this)
                    }
                }
            },
            getAllSeries: function getAllSeries() {
                return this.series.slice()
            },
            getSeriesByName: function getSeriesByName(name) {
                var found = null;
                $.each(this.series, function(i, singleSeries) {
                    if (singleSeries.name === name) {
                        found = singleSeries;
                        return false
                    }
                });
                return found
            },
            getSeriesByPos: function getSeriesByPos(pos) {
                return this.series[pos]
            },
            getSelectedSeries: function getSelectedSeries() {
                return null
            },
            clearSelection: function clearSelection() {
                this.tracker.clearSelection()
            },
            hideTooltip: function() {
                this.tracker._hideTooltip()
            },
            render: function(renderOptions) {
                this._render(renderOptions)
            }
        }).include(ui.DataHelperMixin).inherit(core.loadIndicatorMixin.base).include(core.widgetMarkupMixin)
    })(jQuery, DevExpress);
    /*! Module viz-charts, file chart.js */
    (function($, DX, undefined) {
        var core = DX.viz.core,
            charts = DX.viz.charts,
            utils = DX.utils,
            MAX_ADJUSTMENT_ATTEMPTS = 5,
            DEFAULT_PANE_NAME = 'default',
            DEFAULT_AXIS_NAME = 'defaultAxisName',
            DEFAULT_BUSINESS_RANGE_VALUE_MARGIN = 0.1,
            ASYNC_SERIES_RENDERING_DELAY = 25,
            _each = $.each;
        charts.Chart = charts.BaseChart.inherit({
            _defaultOptions: function() {
                return $.extend(true, this.callBase(), {
                        commonSeriesSettings: {
                            type: 'line',
                            maxLabelCount: undefined,
                            stack: 'default',
                            label: {
                                visible: false,
                                alignment: 'center',
                                rotationAngle: 0,
                                horizontalOffset: 0,
                                verticalOffset: 0,
                                radialOffset: 0,
                                format: '',
                                argumentFormat: '',
                                precision: 0,
                                argumentPrecision: 0,
                                percentPrecision: 0,
                                customizeText: undefined,
                                position: 'outside',
                                connector: {
                                    visible: false,
                                    width: 0
                                }
                            }
                        },
                        useAggregation: false,
                        defaultPane: DEFAULT_PANE_NAME,
                        adjustOnZoom: true,
                        rotated: false,
                        synchronizeMultiAxes: true,
                        equalBarWidth: true,
                        commonPaneSettings: {
                            backgroundColor: 'none',
                            border: {
                                visible: false,
                                top: true,
                                bottom: true,
                                left: true,
                                right: true,
                                dashStyle: 'solid'
                            }
                        },
                        panes: [{
                                name: DEFAULT_PANE_NAME,
                                border: {}
                            }],
                        commonAxisSettings: {
                            tickInterval: undefined,
                            setTicksAtUnitBeginning: true,
                            valueMarginsEnabled: true,
                            placeholderSize: null,
                            logarithmBase: 10
                        }
                    })
            },
            _dispose: function() {
                var _this = this,
                    disposeObjectsInArray = this._disposeObjectsInArray;
                _this.callBase();
                _this.panes = null;
                _this.legend && (_this.legend.dispose(), _this.legend = null);
                disposeObjectsInArray.call(_this, "panesBackground");
                disposeObjectsInArray.call(_this, "panesClipRects");
                disposeObjectsInArray.call(_this, "financialPanesClipRects");
                disposeObjectsInArray.call(_this, "horizontalAxes");
                disposeObjectsInArray.call(_this, "verticalAxes");
                disposeObjectsInArray.call(_this, "seriesFamilies");
                $.each(_this._paneTrackerGroups || [], function(_, groups) {
                    groups.paneSeriesGroup.dispose();
                    groups.paneMarkerGroup.dispose()
                });
                _this._paneTrackerGroups = null
            },
            _init: function() {
                this.__ASYNC_SERIES_RENDERING_DELAY = ASYNC_SERIES_RENDERING_DELAY;
                this.paneAxis = {};
                this._crossHairOptions = {};
                this.callBase()
            },
            _reinit: function(needRedraw) {
                var _this = this;
                _this._disposeObjectsInArray("translators");
                _this.translators = [];
                _this.panes = _this._createPanes();
                _this._populateAxes();
                _this.callBase();
                delete _this._seriesInitializing;
                if (!_this.series)
                    _this._dataSpecificInit();
                else
                    _this._correctValueAxes();
                _this._endLoading(function() {
                    needRedraw && _this._render({force: true})
                })
            },
            _correctBusinessRange: function(range, tickInterval, field, setTicksAtUnitBeginning) {
                var min = 'min' + field,
                    max = 'max' + field;
                if (!tickInterval || !utils.isDefined(range[min]) || !utils.isDefined(range[max]))
                    return false;
                var tickIntervalRange = {},
                    originInterval = tickInterval;
                tickInterval = $.isNumeric(tickInterval) ? tickInterval : utils.convertDateTickIntervalToMilliseconds(tickInterval);
                if (tickInterval >= Math.abs(range[max] - range[min])) {
                    if (utils.isDate(range[min])) {
                        if (!$.isNumeric(originInterval)) {
                            tickIntervalRange[min] = utils.addInterval(range[min], originInterval, true);
                            tickIntervalRange[max] = utils.addInterval(range[max], originInterval, false)
                        }
                        else {
                            tickIntervalRange[min] = new Date(range[min].valueOf() - tickInterval);
                            tickIntervalRange[max] = new Date(range[max].valueOf() + tickInterval)
                        }
                        if (setTicksAtUnitBeginning) {
                            utils.correctDateWithUnitBeginning(tickIntervalRange[max], originInterval);
                            utils.correctDateWithUnitBeginning(tickIntervalRange[min], originInterval)
                        }
                    }
                    else {
                        tickIntervalRange[min] = range[min] - tickInterval;
                        tickIntervalRange[max] = range[max] + tickInterval
                    }
                    range.addRange(tickIntervalRange);
                    return true
                }
                return false
            },
            _populateBusinessRange: function(visibleArea) {
                var self = this,
                    panes = self.panes,
                    businessRanges = [],
                    range,
                    aggregationRange,
                    minBound,
                    maxBound,
                    min,
                    max,
                    i,
                    rotated = self.option('rotated'),
                    singleSeriesRange,
                    valAxes = rotated ? self.horizontalAxes : self.verticalAxes,
                    valueAxes = {},
                    argAxes = rotated ? self.verticalAxes : self.horizontalAxes,
                    valueField = rotated && 'X' || 'Y',
                    argumentField = rotated && 'Y' || 'X',
                    valueBoundRange = 'addRange' + valueField,
                    argumentBoundRange = 'addRange' + argumentField,
                    incidentOccured = self.option('incidentOccured'),
                    useAggregation = self.option('useAggregation'),
                    businessLength,
                    paneList = $.map(panes, function(pane) {
                        return pane.name
                    }),
                    series = self.series,
                    argumentTickInterval,
                    setTicksAtUnitBeginning,
                    paneAxis = self.paneAxis,
                    groupedSeries = self._groupedSeries;
                self._disposeObjectsInArray("businessRanges");
                var argRange = new charts.Range;
                $.each(valAxes, function(_, axis) {
                    valueAxes[axis.name] = axis
                });
                $.each(paneAxis, function(paneName, pane) {
                    $.each(pane, function(axisName, _) {
                        var seriesForRange = [],
                            valueAxesForRange,
                            valRange = new charts.Range({
                                pane: paneName,
                                axis: axisName,
                                minValueMarginX: DEFAULT_BUSINESS_RANGE_VALUE_MARGIN,
                                maxValueMarginX: DEFAULT_BUSINESS_RANGE_VALUE_MARGIN,
                                minValueMarginY: DEFAULT_BUSINESS_RANGE_VALUE_MARGIN,
                                maxValueMarginY: DEFAULT_BUSINESS_RANGE_VALUE_MARGIN
                            }),
                            valueType,
                            calcInterval;
                        $.each(groupedSeries, function(_, particularSeriesGroup) {
                            if (particularSeriesGroup[0].pane === paneName && particularSeriesGroup[0].axis === axisName)
                                seriesForRange = particularSeriesGroup
                        });
                        $.each(valAxes, function(_, axis) {
                            if (axis.pane === paneName && axis.name === axisName) {
                                valueAxesForRange = axis;
                                return false
                            }
                        });
                        $.each(argAxes, function(_, axis) {
                            axis.validate(true, incidentOccured);
                            axis.options.type = seriesForRange && seriesForRange.length ? seriesForRange[0].options.argumentAxisType : null;
                            argRange = argRange[argumentBoundRange](axis.getRangeData());
                            argumentTickInterval = axis.options.tickInterval;
                            setTicksAtUnitBeginning = axis.options.setTicksAtUnitBeginning;
                            calcInterval = axis.calcInterval
                        });
                        valueAxesForRange.validate(false, incidentOccured);
                        valueAxesForRange.options.type = seriesForRange && seriesForRange.length ? seriesForRange[0].options.valueAxisType : null;
                        var axisRange = new charts.Range(valueAxesForRange.getRangeData());
                        axisRange.applyEqualLimitsMargins();
                        valueType = valueType || valueAxesForRange.options.valueType === 'datetime' ? 'datetime' : undefined;
                        valRange = valRange[valueBoundRange](axisRange);
                        minBound = rotated ? valRange.minX : valRange.minY;
                        maxBound = rotated ? valRange.maxX : valRange.maxY;
                        for (i = 0; i < seriesForRange.length; i++) {
                            if (visibleArea) {
                                visibleArea.minVal = minBound;
                                visibleArea.maxVal = maxBound;
                                if (useAggregation && !visibleArea.adjustOnZoom) {
                                    aggregationRange = seriesForRange[i]._originalBusinessRange;
                                    min = rotated ? aggregationRange.minX : aggregationRange.minY;
                                    max = rotated ? aggregationRange.maxX : aggregationRange.maxY;
                                    visibleArea.minVal = utils.isDefined(visibleArea.minVal) ? visibleArea.minVal : min;
                                    visibleArea.maxVal = utils.isDefined(visibleArea.maxVal) ? visibleArea.maxVal : max
                                }
                            }
                            singleSeriesRange = seriesForRange[i].getRangeData(visibleArea, calcInterval);
                            valRange = valRange[valueBoundRange](singleSeriesRange);
                            argRange = argRange[argumentBoundRange](singleSeriesRange)
                        }
                        if (!valRange['isDefined' + valueField]())
                            valRange['setStubData' + valueField](valueType);
                        businessRanges.push(valRange)
                    })
                });
                if (!argRange['isDefined' + argumentField]())
                    argRange['setStubData' + argumentField](argAxes[0].options.argumentType);
                var bussinesRangeCorrectedWithTickInterval = self._correctBusinessRange(argRange, argumentTickInterval, argumentField, setTicksAtUnitBeginning);
                $.each(businessRanges, function(_, range) {
                    bussinesRangeCorrectedWithTickInterval && range.applyValueMargins();
                    range = range.addRange(argRange);
                    var vAxis = valueAxes[range.axis];
                    if (vAxis && vAxis.options.showZero)
                        range['correctValueZeroLevel' + valueField]();
                    !bussinesRangeCorrectedWithTickInterval && range.applyValueMargins();
                    range['stubData' + argumentField] = argRange['stubData' + argumentField];
                    if (!range.isDefined())
                        range.setStubData()
                });
                self.businessRanges = businessRanges
            },
            _groupSeries: function() {
                var self = this,
                    panes = self.panes,
                    rotated = self.option('rotated'),
                    valAxes = rotated ? self.horizontalAxes : self.verticalAxes,
                    argAxes = rotated ? self.verticalAxes : self.horizontalAxes,
                    paneList = $.map(panes, function(pane) {
                        return pane.name
                    }),
                    series = self.series,
                    paneAxis = self.paneAxis,
                    groupedSeries = self._groupedSeries = [];
                var getFirstAxisNameForPane = function(axes, paneName) {
                        var result;
                        for (var i = 0; i < axes.length; i++)
                            if (axes[i].pane === paneName) {
                                result = axes[i].name;
                                break
                            }
                        if (!result)
                            result = valAxes[0].name;
                        return result
                    };
                $.each(series, function(i, particularSeries) {
                    particularSeries.axis = particularSeries.axis || getFirstAxisNameForPane(valAxes, particularSeries.pane);
                    if (particularSeries.axis) {
                        paneAxis[particularSeries.pane] = paneAxis[particularSeries.pane] || {};
                        paneAxis[particularSeries.pane][particularSeries.axis] = true
                    }
                });
                $.each(valAxes, function(_, axis) {
                    if (axis.name && axis.pane && $.inArray(axis.pane, paneList) != -1) {
                        paneAxis[axis.pane] = paneAxis[axis.pane] || {};
                        paneAxis[axis.pane][axis.name] = true
                    }
                });
                self._correctValueAxes();
                var hideGridsOnNonFirstValueAxisForPane = function(paneName) {
                        var axesForPane = [],
                            firstShownAxis;
                        $.each(valAxes, function(_, axis) {
                            if (axis.pane === paneName)
                                axesForPane.push(axis)
                        });
                        if (axesForPane.length > 1 && self.option('synchronizeMultiAxes'))
                            $.each(axesForPane, function(_, axis) {
                                var gridOpt = axis.options.grid;
                                if (firstShownAxis && gridOpt && gridOpt.visible)
                                    gridOpt.visible = false;
                                else
                                    firstShownAxis = firstShownAxis ? firstShownAxis : gridOpt && gridOpt.visible
                            })
                    };
                $.each(paneAxis, function(paneName, pane) {
                    hideGridsOnNonFirstValueAxisForPane(paneName);
                    $.each(pane, function(axisName, _) {
                        var group = [];
                        $.each(series, function(_, particularSeries) {
                            if (particularSeries.pane === paneName && particularSeries.axis === axisName)
                                group.push(particularSeries)
                        });
                        group.length && groupedSeries.push(group)
                    })
                })
            },
            _cleanPanesClipRects: function(clipArrayName) {
                var _this = this,
                    clipArray = _this[clipArrayName];
                _each(clipArray || [], function(_, clipRect) {
                    clipRect && clipRect.remove()
                });
                _this[clipArrayName] = []
            },
            _createPanes: function() {
                var _this = this,
                    panes = _this.option('panes'),
                    panesNameCounter = 0,
                    bottomPaneName;
                _this._cleanPanesClipRects('panesClipRects');
                _this._cleanPanesClipRects('financialPanesClipRects');
                _this.defaultPane = _this.option('defaultPane');
                panes = $.isArray(panes) ? panes : panes ? [panes] : [];
                _each(panes, function(_, pane) {
                    pane.name = !utils.isDefined(pane.name) ? DEFAULT_PANE_NAME + panesNameCounter++ : pane.name
                });
                if (!_this._doesPaneExists(panes, _this.defaultPane) && panes.length > 0) {
                    bottomPaneName = panes[panes.length - 1].name;
                    _this.option('incidentOccured')('The "' + _this.defaultPane + '" pane does not exist. The "' + bottomPaneName + '" pane will be used.');
                    _this.defaultPane = bottomPaneName
                }
                panes = _this.option('rotated') ? panes.reverse() : panes;
                return panes
            },
            _doesPaneExists: function(panes, paneName) {
                var found = false;
                _each(panes, function(_, pane) {
                    if (pane.name === paneName) {
                        found = true;
                        return false
                    }
                });
                return found
            },
            _populateSeries: function() {
                var _this = this,
                    hasSeriesTemplate = !!_this.option('seriesTemplate'),
                    series = hasSeriesTemplate ? _this._templatedSeries : _this.option('series'),
                    allSeriesOptions = $.isArray(series) ? series : series ? [series] : [],
                    argumentAxisOptions = _this.option('argumentAxis'),
                    valueAxisOptions = _this.option('valueAxis'),
                    themeManager = _this.themeManager,
                    data,
                    particularSeriesOptions,
                    commonSeriesSettings = _this.option('commonSeriesSettings'),
                    userCommonSeriesSettings = _this._userOptions.commonSeriesSettings,
                    particularSeries,
                    rotated = _this.option('rotated'),
                    incidentOccured = _this.option('incidentOccured'),
                    i,
                    paneList = $.map(_this.panes, function(pane) {
                        return pane.name
                    }),
                    paneName,
                    paneIndex;
                _this.teamplateData = [];
                $.each(_this._paneTrackerGroups || [], function(_, groups) {
                    groups.paneSeriesGroup.remove();
                    groups.paneMarkerGroup.remove()
                });
                _this._paneTrackerGroups = [];
                $.each(_this.panes, function(_, pane) {
                    var paneSeriesTrackerGroup = _this.renderer.createGroup({'class': 'dxc-pane-tracker'}),
                        paneMarkerTrackerGroup = _this.renderer.createGroup({'class': 'dxc-pane-tracker'});
                    _this._paneTrackerGroups.push({
                        paneSeriesGroup: paneSeriesTrackerGroup,
                        paneMarkerGroup: paneMarkerTrackerGroup
                    })
                });
                _this._disposeSeries();
                _this.series = [];
                themeManager.resetPalette();
                commonSeriesSettings.containerBackgroundColor = _this.option('containerBackgroundColor');
                for (i = 0; i < allSeriesOptions.length; i++) {
                    particularSeriesOptions = allSeriesOptions[i];
                    if (particularSeriesOptions.type && !utils.isString(particularSeriesOptions.type))
                        particularSeriesOptions.type = '';
                    data = particularSeriesOptions.data;
                    particularSeriesOptions.data = null;
                    particularSeriesOptions.rotated = rotated;
                    particularSeriesOptions.customizePoint = _this._userOptions.customizePoint;
                    particularSeriesOptions.customizeLabel = _this._userOptions.customizeLabel;
                    if (argumentAxisOptions) {
                        particularSeriesOptions.argumentCategories = argumentAxisOptions.categories;
                        particularSeriesOptions.argumentAxisType = argumentAxisOptions.type;
                        particularSeriesOptions.argumentType = argumentAxisOptions.argumentType
                    }
                    if (valueAxisOptions)
                        if (utils.isArray(valueAxisOptions))
                            $.each(valueAxisOptions, function(iter, options) {
                                if (!particularSeriesOptions.axis && !iter || particularSeriesOptions.axis === options.name) {
                                    particularSeriesOptions.valueCategories = options.categories;
                                    particularSeriesOptions.valueAxisType = options.type;
                                    particularSeriesOptions.valueType = options.valueType;
                                    particularSeriesOptions.showZero = options.showZero
                                }
                            });
                        else {
                            particularSeriesOptions.valueCategories = valueAxisOptions.categories;
                            particularSeriesOptions.valueAxisType = valueAxisOptions.type;
                            particularSeriesOptions.valueType = valueAxisOptions.valueType;
                            particularSeriesOptions.showZero = valueAxisOptions.showZero
                        }
                    particularSeriesOptions.incidentOccured = incidentOccured;
                    if (!particularSeriesOptions.name)
                        particularSeriesOptions.name = 'Series ' + (i + 1).toString();
                    var seriesTheme = themeManager.applyNextSeriesTheme(particularSeriesOptions, commonSeriesSettings, userCommonSeriesSettings);
                    seriesTheme.pane = seriesTheme.pane || _this.defaultPane;
                    paneName = seriesTheme.pane;
                    paneIndex = _this._getPaneIndex(paneName);
                    if ($.inArray(paneName, paneList) === -1)
                        continue;
                    seriesTheme.seriesGroup = _this._seriesGroup;
                    seriesTheme.seriesLabelsGroup = _this._labelsGroup;
                    seriesTheme.seriesTrackerGroup = _this._paneTrackerGroups[paneIndex].paneSeriesGroup;
                    seriesTheme.markerTrackerGroup = _this._paneTrackerGroups[paneIndex].paneMarkerGroup;
                    particularSeries = charts.factory.createSeries(seriesTheme.type, _this.renderer, seriesTheme);
                    if (!particularSeries)
                        incidentOccured.call(null, 'Unknown series type requested: ' + seriesTheme.type + '.');
                    else {
                        particularSeries.index = i;
                        _this.series.push(particularSeries)
                    }
                    if (hasSeriesTemplate) {
                        $.each(data, function(_, data) {
                            $.each(particularSeries.getTeamplatedFields(), function(_, field) {
                                data[field.teamplateField] = data[field.originalField]
                            });
                            _this.teamplateData.push(data)
                        });
                        particularSeries.updateTeamplateFieldNames()
                    }
                }
                return _this.series
            },
            _createValueAxis: function(axisOptions, rotated, tickProvider) {
                var _this = this,
                    axis;
                axisOptions = $.extend({
                    isHorizontal: rotated,
                    tickProvider: tickProvider,
                    incidentOccured: _this.option('incidentOccured')
                }, axisOptions);
                axisOptions = $.extend(true, {}, _this.option('commonAxisSettings'), _this.option(rotated ? 'horizontalAxis' : 'verticalAxis'), _this.option('valueAxisStyle'), _this.option('userCommonAxisSettings'), _this.option('valueAxis'), axisOptions);
                if (axisOptions.strips)
                    $.each(axisOptions.strips, function(i, strips) {
                        axisOptions.strips[i] = $.extend(true, {}, axisOptions.stripStyle, axisOptions.strips[i])
                    });
                if (axisOptions.constantLines)
                    $.each(axisOptions.constantLines, function(i, line) {
                        axisOptions.constantLines[i] = $.extend(true, {}, axisOptions.constantLineStyle, line)
                    });
                axis = charts.factory.createAxis(_this.renderer, axisOptions);
                axis.name = axisOptions.name;
                axis.pane = axis.pane || axisOptions.pane;
                axis.priority = axisOptions.priority;
                return axis
            },
            _disposeAxes: function() {
                var _this = this;
                $.each(_this.horizontalAxes || [], function(_, axis) {
                    axis.dispose()
                });
                $.each(_this.verticalAxes || [], function(_, axis) {
                    axis.dispose()
                });
                _this.horizontalAxes = null;
                _this.verticalAxes = null
            },
            _populateAxes: function() {
                var _this = this,
                    horizontalAxes = [],
                    verticalAxes = [],
                    panes = _this.panes,
                    rotated = _this.option('rotated'),
                    themeManager = _this.themeManager,
                    valueAxisOptions = _this.option('valueAxis') || {},
                    argumentOption = _this.option('argumentAxis') || {},
                    argumentAxesOptions = $.isArray(argumentOption) ? argumentOption : [argumentOption],
                    valueAxesOptions = $.isArray(valueAxisOptions) ? valueAxisOptions : [valueAxisOptions],
                    i,
                    axis,
                    axisNames = [],
                    axisOptions,
                    tickProvider = charts.factory.getAxisTickProvider(),
                    paneWithNonVirtualAxis;
                _this._disposeAxes();
                var createArgumentAxis = function(axisOptions, virtual) {
                        axisOptions = $.extend(true, {
                            isHorizontal: !rotated,
                            tickProvider: tickProvider,
                            pane: _this.defaultPane,
                            incidentOccured: _this.option('incidentOccured')
                        }, axisOptions);
                        axisOptions = $.extend(true, {}, _this.option('commonAxisSettings'), _this.option(rotated ? 'verticalAxis' : 'horizontalAxis'), _this.option('argumentAxisStyle'), _this.option('userCommonAxisSettings'), _this.option('argumentAxis'), axisOptions);
                        if (axisOptions.strips)
                            $.each(axisOptions.strips, function(i, strips) {
                                axisOptions.strips[i] = $.extend(true, {}, axisOptions.stripStyle, axisOptions.strips[i])
                            });
                        if (axisOptions.constantLines)
                            $.each(axisOptions.constantLines, function(i, line) {
                                axisOptions.constantLines[i] = $.extend(true, {}, axisOptions.constantLineStyle, line)
                            });
                        axis = charts.factory.createAxis(_this.renderer, axisOptions);
                        axis._virtual = virtual;
                        if (axisOptions.isHorizontal)
                            horizontalAxes.push(axis);
                        else
                            verticalAxes.push(axis)
                    };
                if (rotated)
                    paneWithNonVirtualAxis = argumentAxesOptions[0].position === 'right' ? panes[panes.length - 1].name : panes[0].name;
                else
                    paneWithNonVirtualAxis = argumentAxesOptions[0].position === 'top' ? panes[0].name : panes[panes.length - 1].name;
                $.each(panes, function(_, pane) {
                    var paneName = pane.name,
                        virtual = paneName != paneWithNonVirtualAxis;
                    var axisOptions = $.extend(true, {}, {pane: paneName}, argumentAxesOptions[0]);
                    createArgumentAxis(axisOptions, virtual)
                });
                var createValueAxis = function(axisOptions) {
                        var axis = _this._createValueAxis(axisOptions, rotated, tickProvider);
                        if (rotated)
                            horizontalAxes.push(axis);
                        else
                            verticalAxes.push(axis)
                    };
                var valueAxesCounter = 0;
                var getNextAxisName = function() {
                        return DEFAULT_AXIS_NAME + valueAxesCounter++
                    };
                var unique = function(array) {
                        var values = {},
                            i,
                            len = array.length;
                        for (i = 0; i < len; i++)
                            values[array[i]] = true;
                        return $.map(values, function(_, key) {
                                return key
                            })
                    };
                $.each(valueAxesOptions, function(priority, axisOptions) {
                    var axisPanes = [],
                        name = axisOptions.name;
                    if (name && $.inArray(name, axisNames) != -1) {
                        _this.option('incidentOccured').call(null, 'The "valueAxis" configuration array contains axes with the same name.');
                        return
                    }
                    name && axisNames.push(name);
                    if (axisOptions.pane)
                        axisPanes.push(axisOptions.pane);
                    if (axisOptions.panes && axisOptions.panes.length)
                        axisPanes = axisPanes.concat(axisOptions.panes.slice(0));
                    axisPanes = unique(axisPanes);
                    if (!axisPanes.length)
                        axisPanes.push(undefined);
                    $.each(axisPanes, function(_, pane) {
                        createValueAxis($.extend(true, {}, axisOptions, {
                            name: name || getNextAxisName(),
                            pane: pane,
                            priority: priority
                        }))
                    })
                });
                _this.horizontalAxes = horizontalAxes;
                _this.verticalAxes = verticalAxes
            },
            _correctValueAxes: function() {
                var _this = this,
                    rotated = _this.option('rotated'),
                    themeManager = _this.themeManager,
                    valueAxisOptions = _this.option('valueAxis') || {},
                    valueAxesOptions = $.isArray(valueAxisOptions) ? valueAxisOptions : [valueAxisOptions],
                    tickProvider = charts.factory.getAxisTickProvider(),
                    valueAxes = (rotated ? _this.horizontalAxes : _this.verticalAxes) || [],
                    defaultAxisName = valueAxes[0].name,
                    paneAxis = _this.paneAxis || {},
                    panes = _this.panes,
                    i,
                    neededAxis = {};
                var getPaneForAxis = function(axisNameWithoutPane) {
                        var result;
                        $.each(_this.paneAxis, function(paneName, pane) {
                            $.each(pane, function(axisName, _) {
                                if (axisNameWithoutPane == axisName) {
                                    result = paneName;
                                    return false
                                }
                            })
                        });
                        return result
                    };
                var axesWithoutPanes = $.map(valueAxes, function(axis) {
                        if (axis.pane)
                            return null;
                        return axis
                    });
                $.each(axesWithoutPanes, function(_, axis) {
                    axis.pane = getPaneForAxis(axis.name);
                    if (!axis.pane) {
                        axis.pane = _this.defaultPane;
                        paneAxis[axis.pane] = paneAxis[axis.pane] || {};
                        paneAxis[axis.pane][axis.name] = true
                    }
                    axis.options.pane = axis.pane
                });
                for (i = 0; i < panes.length; i++)
                    if (!paneAxis[panes[i].name]) {
                        paneAxis[panes[i].name] = {};
                        paneAxis[panes[i].name][defaultAxisName] = true
                    }
                var findAxisOptions = function(axisName) {
                        var result,
                            axInd;
                        for (axInd = 0; axInd < valueAxesOptions.length; axInd++)
                            if (valueAxesOptions[axInd].name == axisName) {
                                result = valueAxisOptions[axInd];
                                result.priority = axInd;
                                break
                            }
                        if (!result)
                            for (axInd = 0; axInd < valueAxes.length; axInd++)
                                if (valueAxes[axInd].name == axisName) {
                                    result = valueAxes[axInd].options;
                                    result.priority = valueAxes[axInd].priority;
                                    break
                                }
                        if (!result) {
                            _this.option('incidentOccured').call(null, 'Value axis with the "' + axisName + '" name does not exist. It has been created automatically.');
                            result = {
                                name: axisName,
                                priority: valueAxes.length
                            }
                        }
                        return result
                    };
                var findAxis = function(paneName, axisName) {
                        var axis;
                        for (i = 0; i < valueAxes.length; i++) {
                            axis = valueAxes[i];
                            if (axis.name === axisName && axis.pane === paneName)
                                return axis
                        }
                    };
                $.each(_this.paneAxis, function(paneName, axisNames) {
                    $.each(axisNames, function(axisName, _) {
                        neededAxis[axisName + '-' + paneName] = true;
                        if (!findAxis(paneName, axisName)) {
                            var axisOptions = findAxisOptions(axisName);
                            if (axisOptions)
                                valueAxes.push(_this._createValueAxis($.extend(true, {}, axisOptions, {
                                    pane: paneName,
                                    name: axisName
                                }), rotated, tickProvider))
                        }
                    })
                });
                valueAxes = $.grep(valueAxes, function(elem) {
                    return !!neededAxis[elem.name + '-' + elem.pane]
                });
                valueAxes.sort(function(a, b) {
                    return a.priority - b.priority
                });
                rotated ? _this.horizontalAxes = valueAxes : _this.verticalAxes = valueAxes
            },
            _processSeriesFamilies: function() {
                var _this = this,
                    types = [],
                    families = [],
                    paneSeries,
                    rotated = _this.option('rotated');
                if (_this.seriesFamilies && _this.seriesFamilies.length) {
                    $.each(_this.seriesFamilies, function(_, family) {
                        family.adjustSeriesValues()
                    });
                    return
                }
                $.each(_this.series, function(_, item) {
                    if ($.inArray(item.type, types) === -1)
                        types.push(item.type)
                });
                $.each(_this.panes, function(_, pane) {
                    paneSeries = [];
                    $.each(_this.series, function(_, oneSeries) {
                        if (oneSeries.pane === pane.name)
                            paneSeries.push(oneSeries)
                    });
                    $.each(types, function(_, type) {
                        var family = charts.factory.createSeriesFamily({
                                type: type,
                                pane: pane.name,
                                rotated: rotated,
                                equalBarWidth: _this.option('equalBarWidth')
                            });
                        family.add(paneSeries);
                        family.adjustSeriesValues();
                        families.push(family)
                    })
                });
                _this.seriesFamilies = families
            },
            _createLegend: function() {
                var _this = this,
                    legendOptions = $.extend(true, {
                        renderer: _this.renderer,
                        series: _this.series,
                        containerBackgroundColor: _this.option('commonSeriesSettings').containerBackgroundColor
                    }, _this.option('legend'));
                if (_this.legend)
                    _this.legend.update(legendOptions);
                else
                    _this.legend = charts.factory.createLegend(legendOptions, _this._legendGroup, _this._legendTrackerGroup)
            },
            _createTranslator: function(range, canvas) {
                return new DX.viz.core.Translator2D(range, canvas)
            },
            _createPanesBorderOptions: function() {
                var commonBorderOptions = this.option('commonPaneSettings').border,
                    panesBorderOptions = {};
                $.each(this.panes, function(_, pane) {
                    var borderOptions = $.extend(true, {}, commonBorderOptions, pane.border);
                    panesBorderOptions[pane.name] = borderOptions
                });
                return panesBorderOptions
            },
            _render: function(drawOptions) {
                var _this = this,
                    renderer = _this.renderer,
                    translators = _this.translators,
                    rotated = _this.option('rotated'),
                    i,
                    layoutManager = _this.layoutManager,
                    titleOptions = _this.option('title'),
                    adjustmentCounter = 0,
                    paneName,
                    multiAxesSynchronizer = new charts.MultiAxesSynchronizer,
                    panesBorderOptions = _this._createPanesBorderOptions(),
                    needHideLoadIndicator,
                    legendHasInsidePosition = _this.legend && _this.legend.options.position === "inside";
                var updateAxesPerPane = function(_this, axes) {
                        var translator,
                            axis,
                            axisName,
                            i;
                        for (i = 0; i < axes.length; i++) {
                            axis = axes[i];
                            paneName = axis.pane;
                            axisName = axis.name;
                            translator = _this._getTranslator(paneName, axisName);
                            if (translator) {
                                translator.init();
                                axis.setRange(translator.getBusinessRange());
                                axis.setTranslator(translator)
                            }
                        }
                    };
                var drawSeries = function drawSeries() {
                        var particularSeries,
                            panes = _this.panes,
                            stackPoints = [],
                            i;
                        $.each(_this.seriesFamilies || [], function(_, seriesFamily) {
                            var translator = _this._getTranslator(seriesFamily.pane);
                            seriesFamily.updateSeriesValues(translator);
                            seriesFamily.adjustSeriesDimensions(translator)
                        });
                        _this._createCrossHairCursor();
                        function applyPaneClipRect(seriesOptions) {
                            var paneIndex = _this._getPaneIndex(seriesOptions.pane);
                            seriesOptions.paneClipRectID = seriesOptions.isFinancialSeries() ? _this.financialPanesClipRects[paneIndex].id : _this.panesClipRects[paneIndex].id;
                            seriesOptions.forceClipping = _this._getPaneBorderVisibility(paneIndex)
                        }
                        function preparePointsForSharedTooltip(singleSeries, stackPoints) {
                            if (!_this.option('tooltip').shared)
                                return;
                            var points = singleSeries.getPoints(),
                                stackName = singleSeries.getStackName();
                            $.each(points, function(index, point) {
                                var argument = point.argument;
                                if (!DX.utils.isArray(stackPoints[argument])) {
                                    stackPoints[argument] = [];
                                    stackPoints[argument][null] = []
                                }
                                if (stackName && !DX.utils.isArray(stackPoints[argument][stackName])) {
                                    stackPoints[argument][stackName] = [];
                                    $.each(stackPoints[argument][null], function(_, point) {
                                        if (!point.stackName)
                                            stackPoints[argument][stackName].push(point)
                                    })
                                }
                                if (stackName) {
                                    stackPoints[argument][stackName].push(point);
                                    stackPoints[argument][null].push(point)
                                }
                                else
                                    for (var stack in stackPoints[argument])
                                        stackPoints[argument][stack].push(point);
                                point.stackPoints = stackPoints[argument][stackName];
                                point.stackName = stackName
                            })
                        }
                        for (i = 0; i < _this.series.length; i++) {
                            particularSeries = _this.series[i];
                            preparePointsForSharedTooltip(particularSeries, stackPoints);
                            applyPaneClipRect(particularSeries);
                            particularSeries.adjustSeriesLabels = drawOptions.adjustSeriesLabels;
                            particularSeries.draw(_this._getTranslator(particularSeries.pane, particularSeries.axis), drawOptions.animate && particularSeries.getPoints().length <= drawOptions.animationPointsLimit && _this.renderer.animationEnabled())
                        }
                        _this._trackerGroup.append();
                        if (drawOptions.drawLegend && _this.legend && legendHasInsidePosition) {
                            _this.legend.canvas = $.extend({}, panes[0].canvas, {
                                right: panes[panes.length - 1].canvas.right,
                                bottom: panes[panes.length - 1].canvas.bottom
                            });
                            _this._legendGroup.append();
                            _this._tooltipGroup.append();
                            _this.legend.draw();
                            layoutManager.applyLegendLayout()
                        }
                        needHideLoadIndicator && _this.hideLoadingIndicator();
                        _this.option('drawn')();
                        var drawChartTrackers = function drawChartTrackers() {
                                var i;
                                $.each(_this._paneTrackerGroups || [], function(_, groups) {
                                    groups.paneSeriesGroup.clear();
                                    groups.paneMarkerGroup.clear()
                                });
                                for (i = 0; i < _this.series.length; i++)
                                    _this.series[i].drawTrackers();
                                if (_this.legend) {
                                    _this.legend.drawTrackers();
                                    legendHasInsidePosition && _this._legendGroup.append();
                                    legendHasInsidePosition && _this._tooltipGroup.append()
                                }
                                _this.tracker._prepare();
                                $.each(_this._paneTrackerGroups, function(index, paneGroups) {
                                    paneGroups.paneSeriesGroup.append(_this._seriesTrackerGroup);
                                    paneGroups.paneMarkerGroup.append(_this._markerTrackerGroup)
                                });
                                _this._handleRenderComplete()
                            };
                        _this._createTooltip();
                        if (drawOptions.asyncTrackersRendering)
                            _this.delayedRedraw = setTimeout(drawChartTrackers, drawOptions.trackerRenderingDelay);
                        else
                            drawChartTrackers()
                    };
                drawOptions = _this._prepareDrawOptions(drawOptions);
                _this.callBase(drawOptions);
                if (_this.stopRedraw) {
                    _this.stopRedraw = false;
                    return
                }
                _this._createPanesBackground();
                if (titleOptions.text && drawOptions.drawTitle) {
                    _this._titleGroup.append();
                    _this._drawTitle();
                    layoutManager.applyTitleLayout()
                }
                if (drawOptions.drawLegend && _this.legend && !legendHasInsidePosition) {
                    _this.legend.canvas = _this.canvas;
                    _this._legendGroup.append();
                    _this.legend.draw();
                    layoutManager.applyLegendLayout();
                    if (layoutManager.isCanvasExceeded(false)) {
                        _this.option('incidentOccured')('The container is too small to draw a chart with current settings.');
                        _this._clean(true);
                        return
                    }
                }
                _this._setPanesClipRectPadding(panesBorderOptions, rotated);
                if (drawOptions.recreateCanvas) {
                    layoutManager.createPanesCanvases();
                    $.each(_this.paneAxis, function(paneName, pane) {
                        $.each(pane, function(axisName, _) {
                            var translator = _this._createTranslator(new charts.Range(_this._getBusinessRange(paneName, axisName)), _this._getCanvasForPane(paneName));
                            translator.pane = paneName;
                            translator.axis = axisName;
                            translators.push(translator)
                        })
                    })
                }
                _this._options.useAggregation && $.each(_this.series, function(_, series) {
                    series._originalBusinessRange = series._originalBusinessRange || series.getRangeData();
                    series.resamplePoints(_this._getTranslator(series.pane), _this._zoomMinArg, _this._zoomMaxArg)
                });
                if (_this._zoomMinArg || _this._zoomMaxArg)
                    _this._populateBusinessRange({
                        adjustOnZoom: _this.option('adjustOnZoom'),
                        minArg: _this._zoomMinArg,
                        maxArg: _this._zoomMaxArg
                    });
                $.each(translators, function(_, translator) {
                    translator.updateBusinessRange(new charts.Range(_this._getBusinessRange(translator.pane, translator.axis)));
                    delete translator._originalBusinessRange;
                    translator.init()
                });
                updateAxesPerPane(_this, _this.horizontalAxes);
                updateAxesPerPane(_this, _this.verticalAxes);
                _this._stripsGroup.append();
                _this._axesGroup.append();
                _this._constantLinesGroup.append();
                _this._labelAxesGroup.append();
                do {
                    for (i = 0; i < _this.horizontalAxes.length; i++)
                        _this.horizontalAxes[i].resetTicks();
                    for (i = 0; i < _this.verticalAxes.length; i++)
                        _this.verticalAxes[i].resetTicks();
                    if (_this.option('synchronizeMultiAxes'))
                        multiAxesSynchronizer.synchronize(rotated ? _this.horizontalAxes : _this.verticalAxes, rotated);
                    for (i = 0; i < _this.horizontalAxes.length; i++) {
                        _this.horizontalAxes[i].clipRectID = _this._getCanvasClipRectID();
                        _this.horizontalAxes[i].stripsGroup = _this._stripsGroup;
                        _this.horizontalAxes[i].labelAxesGroup = _this._labelAxesGroup;
                        _this.horizontalAxes[i].constantLinesGroup = _this._constantLinesGroup;
                        _this.horizontalAxes[i].axesContainerGroup = _this._axesGroup;
                        _this.horizontalAxes[i].draw({borderOptions: panesBorderOptions[_this.horizontalAxes[i].pane]})
                    }
                    layoutManager.requireAxesRedraw = false;
                    if (drawOptions.adjustAxes) {
                        layoutManager.applyHorizontalAxesLayout();
                        $.each(translators, function(_, translator) {
                            translator.init()
                        })
                    }
                    for (i = 0; i < _this.verticalAxes.length; i++) {
                        _this.verticalAxes[i].clipRectID = _this._getCanvasClipRectID();
                        _this.verticalAxes[i].stripsGroup = _this._stripsGroup;
                        _this.verticalAxes[i].labelAxesGroup = _this._labelAxesGroup;
                        _this.verticalAxes[i].constantLinesGroup = _this._constantLinesGroup;
                        _this.verticalAxes[i].axesContainerGroup = _this._axesGroup;
                        _this.verticalAxes[i].draw({borderOptions: panesBorderOptions[_this.verticalAxes[i].pane]})
                    }
                    if (drawOptions.adjustAxes) {
                        layoutManager.applyVerticalAxesLayout();
                        $.each(translators, function(_, translator) {
                            translator.init()
                        })
                    }
                    adjustmentCounter = adjustmentCounter + 1;
                    if (layoutManager.isCanvasExceeded(true)) {
                        _this.option('incidentOccured')('The container is too small to draw a chart with current settings.');
                        _this._clean(true);
                        _this.__axisAdjustmentsCount = adjustmentCounter;
                        return
                    }
                } while (layoutManager.requireAxesRedraw && adjustmentCounter < MAX_ADJUSTMENT_ATTEMPTS);
                _this.__axisAdjustmentsCount = adjustmentCounter;
                if (_this.chartTitle)
                    _this.chartTitle.setClipRectSettings();
                _this._drawPanesBorders(panesBorderOptions);
                _this._createClipRectsForPanes();
                for (i = 0; i < _this.horizontalAxes.length; i++)
                    _this.horizontalAxes[i].applyClipRect(_this._getElementsClipRectID(_this.horizontalAxes[i].pane));
                for (i = 0; i < _this.verticalAxes.length; i++)
                    _this.verticalAxes[i].applyClipRect(_this._getElementsClipRectID(_this.verticalAxes[i].pane));
                _this._fillPanesBackground();
                _this._seriesGroup.append();
                _this._labelsGroup.append();
                _this._crossHairCursorGroup.append();
                _this._legendGroup.append();
                _this._tooltipGroup.append();
                needHideLoadIndicator = _this._loadIndicator && _this._loadIndicator.isShown && _this._dataSource && _this._dataSource.isLoaded() && !drawOptions.isResize;
                if (drawOptions.asyncSeriesRendering)
                    _this.delayedRedraw = setTimeout(drawSeries, ASYNC_SERIES_RENDERING_DELAY);
                else
                    drawSeries()
            },
            _setPanesClipRectPadding: function(panesBorderOptions, rotated) {
                var _this = this,
                    allPanesHaveBorder = true,
                    position = '';
                $.each(_this.panes, function(_, pane) {
                    allPanesHaveBorder = allPanesHaveBorder && !!panesBorderOptions[pane.name].visible
                });
                $.each(_this.horizontalAxes, function(_, axis) {
                    position += axis.options.position
                });
                $.each(_this.verticalAxes, function(_, axis) {
                    position += axis.options.position
                })
            },
            _createCrossHairCursor: function() {
                var _this = this,
                    renderer = _this.renderer,
                    panes = _this.panes,
                    commonCanvas,
                    canvas,
                    options = _this.option('crosshair') || {},
                    hLine,
                    vLine,
                    attrHLine,
                    attrVLine,
                    i;
                if (!options || !options.enabled)
                    return;
                attrHLine = {
                    stroke: options.horizontalLine.color || options.color,
                    strokeWidth: options.horizontalLine.width || options.width,
                    dashStyle: options.horizontalLine.dashStyle || options.dashStyle,
                    visibility: 'hidden',
                    opacity: options.horizontalLine.opacity || options.opacity
                };
                attrVLine = {
                    stroke: options.verticalLine.color || options.color,
                    strokeWidth: options.verticalLine.width || options.width,
                    dashStyle: options.verticalLine.dashStyle || options.dashStyle,
                    visibility: 'hidden',
                    opacity: options.verticalLine.opacity || options.opacity
                };
                for (i = 0; i < panes.length; i++) {
                    canvas = panes[i].canvas;
                    if (!commonCanvas)
                        commonCanvas = $.extend({}, canvas);
                    else {
                        commonCanvas.right = canvas.right;
                        commonCanvas.bottom = canvas.bottom
                    }
                    renderer.createRect(canvas.left, canvas.top, canvas.width - canvas.right - canvas.left, canvas.height - canvas.bottom - canvas.top, 0).append(this._crosshairTrackerGroup)
                }
                if (options.horizontalLine && options.horizontalLine.visible)
                    hLine = renderer.createLine(commonCanvas.left, commonCanvas.top, commonCanvas.width - commonCanvas.right, commonCanvas.top, attrHLine).append(_this._crossHairCursorGroup);
                if (options.verticalLine && options.verticalLine.visible)
                    vLine = renderer.createLine(commonCanvas.left, commonCanvas.top, commonCanvas.left, commonCanvas.height - commonCanvas.bottom, attrVLine).append(_this._crossHairCursorGroup);
                _this._crossHairOptions.horizontalLine = hLine;
                _this._crossHairOptions.verticalLine = vLine;
                _this._crossHairOptions.canvas = commonCanvas
            },
            _createPanesBackground: function() {
                var _this = this,
                    defaultBackgroundColor = _this.option('commonPaneSettings').backgroundColor,
                    backgroundColor,
                    renderer = _this.renderer,
                    rect,
                    i,
                    rects = [];
                _this._panesBackgroundGroup && _this._panesBackgroundGroup.clear();
                for (i = 0; i < _this.panes.length; i++) {
                    backgroundColor = _this.panes[i].backgroundColor || defaultBackgroundColor;
                    if (!backgroundColor || backgroundColor === 'none') {
                        rects.push(null);
                        continue
                    }
                    rect = renderer.createRect(0, 0, 0, 0, 0, {
                        fill: backgroundColor,
                        strokeWidth: 0
                    }).append(_this._panesBackgroundGroup);
                    rects.push(rect)
                }
                _this.panesBackground = rects;
                _this._panesBackgroundGroup.append()
            },
            _fillPanesBackground: function() {
                var _this = this,
                    bc;
                $.each(_this.panes, function(i, pane) {
                    bc = pane.borderCoords;
                    if (_this.panesBackground[i] != null)
                        _this.panesBackground[i].applySettings({
                            x: bc.left,
                            y: bc.top,
                            width: bc.width,
                            height: bc.height
                        })
                })
            },
            _calcPaneBorderCoords: function(pane, rotated) {
                var canvas = pane.canvas,
                    bc = pane.borderCoords = pane.borderCoords || {};
                bc.left = canvas.left;
                bc.top = canvas.top;
                bc.right = canvas.width - canvas.right;
                bc.bottom = canvas.height - canvas.bottom;
                bc.width = bc.right - bc.left;
                bc.height = bc.bottom - bc.top
            },
            _drawPanesBorders: function(panesBorderOptions) {
                var _this = this,
                    rotated = _this.option('rotated');
                _this._panesBorderGroup && (_this._panesBorderGroup.detach(), _this._panesBorderGroup.clear());
                $.each(_this.panes, function(i, pane) {
                    var bc,
                        borderOptions = panesBorderOptions[pane.name],
                        attr = {
                            fill: 'none',
                            stroke: borderOptions.color,
                            strokeOpacity: borderOptions.opacity,
                            strokeWidth: borderOptions.width,
                            dashStyle: borderOptions.dashStyle
                        };
                    _this._calcPaneBorderCoords(pane, rotated);
                    if (!borderOptions.visible)
                        return;
                    bc = pane.borderCoords;
                    _this.renderer.createSegmentRect(bc.left, bc.top, bc.width, bc.height, 0, borderOptions, attr).append(_this._panesBorderGroup)
                });
                _this._panesBorderGroup.append()
            },
            _createClipRect: function(clipArray, index, left, top, width, height) {
                var _this = this,
                    clipRect = clipArray[index];
                if (!clipRect) {
                    clipRect = _this.renderer.createClipRect(left, top, width, height).append();
                    clipArray[index] = clipRect
                }
                else
                    clipRect.updateRectangle({
                        x: left,
                        y: top,
                        width: width,
                        height: height
                    })
            },
            _createClipRectsForPanes: function() {
                var _this = this,
                    canvas = _this.canvas;
                $.each(_this.panes, function(i, pane) {
                    var hasFinancialSeries = false,
                        bc = pane.borderCoords,
                        left = bc.left,
                        top = bc.top,
                        width = bc.width,
                        height = bc.height;
                    _this._createClipRect(_this.panesClipRects, i, left, top, width, height);
                    $.each(_this.series, function(_, series) {
                        if (series.pane === pane.name && series.isFinancialSeries())
                            hasFinancialSeries = true
                    });
                    if (hasFinancialSeries) {
                        if (_this.option('rotated')) {
                            top = 0;
                            height = canvas.height
                        }
                        else {
                            left = 0;
                            width = canvas.width
                        }
                        _this._createClipRect(_this.financialPanesClipRects, i, left, top, width, height)
                    }
                    else
                        _this.financialPanesClipRects.push(null)
                })
            },
            _getPaneIndex: function(paneName) {
                var paneIndex;
                $.each(this.panes, function(index, pane) {
                    if (pane.name === paneName) {
                        paneIndex = index;
                        return false
                    }
                });
                return paneIndex
            },
            _getPaneBorderVisibility: function(paneIndex) {
                var commonPaneBorderVisible = this.option('commonPaneSettings').border.visible,
                    pane = this.panes[paneIndex] || {},
                    paneBorder = pane.border || {};
                return 'visible' in paneBorder ? paneBorder.visible : commonPaneBorderVisible
            },
            _getElementsClipRectID: function(paneName) {
                return this.panesClipRects[this._getPaneIndex(paneName)].id
            },
            _getTranslator: function(paneName, axisName) {
                var translators = this.translators,
                    translatorsNumber = translators.length,
                    foundTranslator = null,
                    i;
                for (i = 0; i < translatorsNumber; i++)
                    if (translators[i].pane === paneName && translators[i].axis === axisName) {
                        foundTranslator = translators[i];
                        break
                    }
                if (!foundTranslator)
                    for (i = 0; i < translatorsNumber; i++)
                        if (translators[i].pane === paneName) {
                            foundTranslator = translators[i];
                            break
                        }
                return foundTranslator
            },
            _getCanvasForPane: function(paneName) {
                var panes = this.panes,
                    panesNumber = panes.length,
                    i;
                for (i = 0; i < panesNumber; i++)
                    if (panes[i].name === paneName)
                        return panes[i].canvas
            },
            _getBusinessRange: function(paneName, axisName) {
                var ranges = this.businessRanges || [],
                    rangesNumber = ranges.length,
                    foundRange,
                    i;
                for (i = 0; i < rangesNumber; i++)
                    if (ranges[i].pane === paneName && ranges[i].axis === axisName) {
                        foundRange = ranges[i];
                        break
                    }
                if (!foundRange)
                    for (i = 0; i < rangesNumber; i++)
                        if (ranges[i].pane === paneName) {
                            foundRange = ranges[i];
                            break
                        }
                return foundRange
            },
            _handleSeriesPopulated: function(needRedraw) {
                var _this = this;
                _this._processSeriesFamilies();
                _this._createLegend();
                _this._populateBusinessRange();
                _this._processValueAxisFormat();
                _this._updateTracker();
                _this._endLoading(function() {
                    needRedraw && _this._render({force: true})
                })
            },
            _processValueAxisFormat: function() {
                var _this = this,
                    valueAxes = _this.option('rotated') ? _this.horizontalAxes : _this.verticalAxes,
                    axesWithFullStackedFormat = [];
                $.each(_this.series, function() {
                    if (this.isFullStackedSeries() && $.inArray(this.axis, axesWithFullStackedFormat) === -1)
                        axesWithFullStackedFormat.push(this.axis)
                });
                $.each(valueAxes, function() {
                    if ($.inArray(this.name, axesWithFullStackedFormat) !== -1)
                        this.setPercentLabelFormat();
                    else
                        this.resetAutoLabelFormat()
                })
            },
            zoomArgument: function(min, max) {
                var _this = this,
                    rotated = _this.option('rotated'),
                    axis = rotated ? _this.verticalAxes[0] : _this.horizontalAxes[0];
                min = axis.validateUnit(min);
                max = axis.validateUnit(max);
                _this._zoomMinArg = min;
                _this._zoomMaxArg = max;
                _this._render({
                    force: true,
                    drawTitle: false,
                    drawLegend: false,
                    adjustAxes: false,
                    animate: false,
                    adjustSeriesLabels: false,
                    asyncSeriesRendering: false
                })
            }
        })
    })(jQuery, DevExpress);
    /*! Module viz-charts, file pieChart.js */
    (function($, DX, undefined) {
        var core = DX.viz.core,
            charts = DX.viz.charts,
            utils = DX.utils,
            PANE_CLIP_RECT_PADDING = 12;
        charts.PieChart = charts.BaseChart.inherit({
            _defaultOptions: function() {
                return $.extend(true, this.callBase(), {
                        commonSeriesSettings: {
                            type: 'pie',
                            pie: {label: {percentPrecision: 0}}
                        },
                        legend: {hoverMode: 'markPoint'}
                    })
            },
            _reinit: function(needRedraw) {
                var _this = this;
                _this.callBase();
                if (!_this.series)
                    _this._dataSpecificInit();
                _this._endLoading(function() {
                    needRedraw && _this._render({force: true})
                })
            },
            _populateBusinessRange: function() {
                var businessRanges = [],
                    series = this.series,
                    singleSeries = series[0],
                    range,
                    singleSeriesRange;
                this._disposeObjectsInArray("businessRanges");
                if (singleSeries) {
                    range = new charts.Range({series: singleSeries});
                    singleSeriesRange = singleSeries.getRangeData();
                    range = range.addRange(singleSeriesRange);
                    if (!range.isDefined())
                        range.setStubData();
                    businessRanges.push(range)
                }
                this.businessRanges = businessRanges
            },
            _createTranslator: function(range, canvas) {
                return new DevExpress.viz.core.Translator1D(range.minY, range.maxY, 360, 0)
            },
            _populateSeries: function() {
                var _this = this,
                    renderer = _this.renderer,
                    hasSeriesTemplate = !!_this.option('seriesTemplate'),
                    seriesOptions = hasSeriesTemplate ? _this._templatedSeries : _this.option('series'),
                    allSeriesOptions = $.isArray(seriesOptions) ? seriesOptions : seriesOptions ? [seriesOptions] : [],
                    themeManager = _this.themeManager,
                    data,
                    particularSeriesOptions,
                    particularSeries,
                    seriesTheme,
                    seriesParams,
                    commonSeriesSettings = _this.option('commonSeriesSettings'),
                    userCommonSeriesSettings = _this._userOptions.commonSeriesSettings,
                    incidentOccured = _this.option('incidentOccured');
                _this._disposeSeries();
                _this.series = [];
                themeManager.resetPalette();
                if (allSeriesOptions.length) {
                    particularSeriesOptions = allSeriesOptions[0];
                    if (particularSeriesOptions.type && !utils.isString(particularSeriesOptions.type))
                        particularSeriesOptions.type = '';
                    data = particularSeriesOptions.data;
                    particularSeriesOptions.data = null;
                    particularSeriesOptions.incidentOccured = incidentOccured;
                    seriesTheme = themeManager.applyPieSeriesTheme(particularSeriesOptions, commonSeriesSettings, userCommonSeriesSettings);
                    seriesTheme.seriesGroup = _this._seriesGroup;
                    seriesTheme.trackerGroup = _this._trackerGroup;
                    seriesTheme.seriesLabelsGroup = _this._labelsGroup;
                    seriesTheme.seriesTrackerGroup = _this._seriesTrackerGroup;
                    seriesTheme.markerTrackerGroup = _this._markerTrackerGroup;
                    seriesParams = {
                        seriesType: seriesTheme.type !== undefined ? seriesTheme.type : _this.option('commonSeriesSettings').type,
                        widgetType: 'pie'
                    };
                    particularSeries = charts.factory.createSeries(seriesParams, renderer, seriesTheme);
                    if (!particularSeries)
                        incidentOccured.call(null, 'Unknown series type requested: ' + seriesParams.seriesType);
                    else {
                        _this._processSingleSeries(particularSeries, particularSeries.userOptions);
                        _this.series.push(particularSeries)
                    }
                    particularSeriesOptions.data = data
                }
                return _this.series
            },
            _processSingleSeries: function(singleSeries, options) {
                var commonSeriesSettings = this.option('commonSeriesSettings'),
                    points,
                    seriesGroup = options.seriesGroup,
                    trackerGroup = options.trackerGroup,
                    seriesTrackerGroup = options.seriesTrackerGroup,
                    markerTrackerGroup = options.markerTrackerGroup,
                    seriesLabelsGroup = options.seriesLabelsGroup,
                    getPointsMethod = this.option('paintNullPoints') ? 'getOriginalPoints' : 'getPoints';
                singleSeries.arrangePoints();
                points = singleSeries && singleSeries[getPointsMethod]() || [];
                options.seriesGroup = null;
                options.trackerGroup = null;
                options.seriesTrackerGroup = null;
                options.markerTrackerGroup = null;
                options.seriesLabelsGroup = null;
                for (var j = 0; j < points.length; j++) {
                    singleSeries.options.customizePoint = this._userOptions.customizePoint;
                    singleSeries.options.customizeLabel = this._userOptions.customizeLabel;
                    var theme = this.themeManager.applyNextPieSegmentTheme(options, commonSeriesSettings);
                    var convertedTheme = singleSeries.parseStyleOptions(theme);
                    var pointStyle = singleSeries._getPointStyle(singleSeries.styles.point, j, points[j].argument, points[j].originalValue, undefined, points[j].tag, {});
                    convertedTheme.point = $.extend(true, {}, convertedTheme.point, pointStyle);
                    points[j].setOptions(convertedTheme.point);
                    points[j].index = j
                }
                options.seriesGroup = seriesGroup;
                options.trackerGroup = trackerGroup;
                options.seriesTrackerGroup = seriesTrackerGroup;
                options.markerTrackerGroup = markerTrackerGroup;
                options.seriesLabelsGroup = seriesLabelsGroup
            },
            _handleSeriesPopulated: function(needRedraw) {
                var _this = this;
                _this._populateBusinessRange();
                _this._createLegend();
                _this._updateTracker();
                _this._endLoading(function() {
                    needRedraw && _this._render({
                        force: true,
                        recreateCanvas: true
                    })
                })
            },
            _createLegend: function() {
                var _this = this,
                    legendOptions = $.extend(true, {
                        renderer: _this.renderer,
                        series: $.map(_this.series[0] ? _this.series[0].getPoints() : [], function(item) {
                            item.name = item.argument;
                            item.options.showInLegend = true,
                            item.styles = {themeColor: item.options.attributes.fill};
                            return item
                        })
                    }, _this.option('legend'));
                if (legendOptions.position !== 'outside')
                    legendOptions.position = 'outside';
                _this.legend = charts.factory.createLegend(legendOptions, _this._legendGroup, _this._legendTrackerGroup)
            },
            _render: function(drawOptions) {
                var _this = this,
                    titleOptions = _this.option('title'),
                    layoutManager = _this.layoutManager,
                    incidentOccuredMessage = 'The container is too small to draw a chart with current settings.';
                drawOptions = _this._prepareDrawOptions(drawOptions);
                _this.callBase(drawOptions);
                if (_this.stopRedraw) {
                    _this.stopRedraw = false;
                    return
                }
                if (titleOptions.text && drawOptions.drawTitle) {
                    _this._titleGroup.append();
                    _this._drawTitle();
                    layoutManager.applyTitleLayout()
                }
                if (drawOptions.drawLegend && _this.legend) {
                    _this.legend.canvas = _this.canvas;
                    _this._legendGroup.append();
                    _this.legend.draw();
                    layoutManager.applyLegendLayout()
                }
                if (layoutManager.isCanvasExceeded(false)) {
                    _this.option('incidentOccured')(incidentOccuredMessage);
                    _this._clean(true);
                    return
                }
                if (_this.chartTitle)
                    _this.chartTitle.setClipRectSettings();
                if (_this.series && _this.series[0]) {
                    if (!layoutManager.applyPieChartSeriesLayout()) {
                        _this.option('incidentOccured')(incidentOccuredMessage);
                        _this._clean(true);
                        return
                    }
                    _this._seriesGroup.append();
                    _this._labelsGroup.append();
                    _this.series[0].canvas = _this.canvas;
                    _this.series[0].draw(_this._createTranslator(_this.businessRanges[0], _this.canvas), drawOptions.animate && _this.renderer.animationEnabled());
                    if (_this.series[0].redraw) {
                        _this._seriesGroup.detach();
                        _this._trackerGroup.detach();
                        _this._labelsGroup.detach();
                        _this._seriesGroup.clear();
                        _this._labelsGroup.clear();
                        _this._seriesGroup.append();
                        _this._labelsGroup.append();
                        layoutManager.applyPieChartSeriesLayout();
                        _this.series[0].draw(_this._createTranslator(_this.businessRanges[0], _this.canvas), drawOptions.animate && _this.renderer.animationEnabled())
                    }
                    _this._tooltipGroup.append();
                    _this._trackerGroup.append();
                    _this._createTooltip();
                    _this.series[0].drawTrackers();
                    _this.tracker._prepare('pieChart')
                }
                _this._dataSource && _this._dataSource.isLoaded() && !drawOptions.isResize && _this.hideLoadingIndicator();
                _this._handleRenderComplete()
            },
            getSeries: function getSeries() {
                return this.series && this.series[0]
            }
        })
    })(jQuery, DevExpress);
    /*! Module viz-charts, file layoutManager.js */
    (function($, DX, undefined) {
        var isNumber = DX.utils.isNumber,
            math = Math,
            LABEL_SPACING = 80,
            round = math.round;
        DX.viz.charts.LayoutManager = DX.Class.inherit(function() {
            var update = function(chart) {
                    this.chart = chart;
                    setCanvasValues(chart && chart.canvas)
                };
            var dispose = function() {
                    this.chart = null
                };
            var setCanvasValues = function(canvas) {
                    if (canvas) {
                        canvas.originalTop = canvas.top;
                        canvas.originalBottom = canvas.bottom;
                        canvas.originalLeft = canvas.left;
                        canvas.originalRight = canvas.right
                    }
                };
            var createPanesCanvases = function() {
                    var debug = DX.utils.debug;
                    $.each(this.chart.panes, function(i, item) {
                        debug.assert(item, 'pane is null object');
                        debug.assert(item.name, 'Pane does not have name')
                    });
                    var chart = this.chart,
                        canvas = chart.canvas,
                        panes = chart.panes,
                        pane,
                        i,
                        panesNumber = panes.length,
                        paneSpaceHeight = canvas.height - canvas.top - canvas.bottom,
                        paneSpaceWidth = canvas.width - canvas.left - canvas.right,
                        weightSum = 0,
                        oneWeightHeight,
                        oneWeightWidth,
                        padding = panes.padding || 10,
                        distributedTopSpace = 0,
                        distributedLeftSpace = 0;
                    for (i = 0; i < panesNumber; i++) {
                        pane = panes[i];
                        pane.weight = pane.weight || 1;
                        weightSum = weightSum + pane.weight
                    }
                    oneWeightHeight = (paneSpaceHeight - padding * (panesNumber - 1)) / weightSum;
                    oneWeightWidth = (paneSpaceWidth - padding * (panesNumber - 1)) / weightSum;
                    if (!chart.option('rotated'))
                        for (i = 0; i < panesNumber; i++) {
                            pane = panes[i];
                            pane.calcHeight = round(pane.weight * oneWeightHeight);
                            pane.canvas = $.extend({}, canvas);
                            pane.canvas.top = pane.canvas.originalTop = canvas.top + distributedTopSpace;
                            pane.canvas.bottom = pane.canvas.originalBottom = canvas.bottom + (paneSpaceHeight - pane.calcHeight - distributedTopSpace);
                            distributedTopSpace = distributedTopSpace + pane.calcHeight + padding
                        }
                    else
                        for (i = 0; i < panesNumber; i++) {
                            pane = panes[i];
                            pane.calcWidth = round(pane.weight * oneWeightWidth);
                            pane.canvas = $.extend({}, canvas);
                            pane.canvas.left = pane.canvas.originalLeft = canvas.left + distributedLeftSpace;
                            pane.canvas.right = pane.canvas.originalRight = canvas.right + (paneSpaceWidth - pane.calcWidth - distributedLeftSpace);
                            distributedLeftSpace = distributedLeftSpace + pane.calcWidth + padding
                        }
                };
            var applyTitleLayout = function() {
                    var chart = this.chart,
                        canvas = chart.canvas,
                        title = chart.chartTitle,
                        box,
                        horizontalPadding = 15,
                        verticalPadding = 10,
                        shiftX,
                        shiftY;
                    if (!title)
                        return;
                    box = title.getBoundingRect();
                    switch (title.horizontalAlignment) {
                        case'left':
                            shiftX = round(horizontalPadding + canvas.left);
                            break;
                        case'center':
                            shiftX = round((canvas.width - canvas.left - canvas.right - box.width) / 2 + canvas.left) - box.x;
                            break;
                        case'right':
                            shiftX = round(canvas.width - canvas.right - box.x - box.width - horizontalPadding);
                            break
                    }
                    if (title.verticalAlignment === 'top') {
                        shiftY = round(canvas.top - box.y);
                        canvas.top = canvas.top + box.height + verticalPadding
                    }
                    else {
                        shiftY = round(canvas.height - canvas.bottom - box.height - box.y);
                        canvas.bottom = canvas.bottom + box.height + verticalPadding
                    }
                    title.shift(shiftX, shiftY);
                    setCanvasValues(canvas)
                };
            var adjustTitleLayout = function adjustTitleLayout() {
                    var chart = this.chart,
                        canvas = chart.canvas,
                        title = chart.chartTitle,
                        horizontalPadding = 15,
                        box,
                        shiftX,
                        shiftY = title.innerTitleGroup.settings.translateY || 0;
                    title.canvas = canvas;
                    title.correctTitleLength();
                    box = title.getBoundingRect();
                    switch (title.horizontalAlignment) {
                        case'left':
                            shiftX = round(horizontalPadding + canvas.left);
                            break;
                        case'center':
                            shiftX = round((canvas.width - canvas.right - canvas.left - box.width) / 2 + canvas.left - box.x);
                            break;
                        case'right':
                            shiftX = round(canvas.width - canvas.right - box.x - box.width - horizontalPadding);
                            break
                    }
                    title.shift(shiftX, shiftY)
                };
            var _processLegendShiftX = function _processLegendShiftX(rect, isInside, isHorizontal) {
                    var _this = this,
                        chart = _this.chart,
                        canvas = chart.canvas,
                        title = chart.chartTitle,
                        options = chart.legend.options,
                        panes = chart.panes,
                        margin = options.margin,
                        shiftCondition = !(isInside || isHorizontal),
                        shiftX;
                    if (isInside) {
                        canvas = $.extend({}, panes[0].canvas);
                        canvas.right = panes[panes.length - 1].canvas.right
                    }
                    switch (options.horizontalAlignment) {
                        case'left':
                            shiftX = round(canvas.left + margin.left);
                            canvas.left = shiftCondition ? canvas.left + rect.width + margin.left + margin.right : canvas.left;
                            title && shiftCondition && _this.adjustTitleLayout();
                            break;
                        case'center':
                            shiftX = round((canvas.width - canvas.left - canvas.right - rect.width) / 2 + canvas.left);
                            break;
                        case'right':
                            shiftX = round(canvas.width - canvas.right - rect.width - margin.right);
                            canvas.right = shiftCondition ? canvas.right + rect.width + margin.left + margin.right : canvas.right;
                            title && shiftCondition && _this.adjustTitleLayout();
                            break
                    }
                    setCanvasValues(canvas);
                    return shiftX
                };
            var _processLegendShiftY = function _processLegendShiftY(rect, isInside, isHorizontal) {
                    var _this = this,
                        chart = _this.chart,
                        canvas = chart.canvas,
                        title = chart.chartTitle,
                        options = chart.legend.options,
                        panes = chart.panes,
                        isAlignCenter = options.horizontalAlignment === 'center',
                        shiftCondition = !isInside && (isHorizontal || isAlignCenter),
                        margin = options.margin,
                        shiftY;
                    if (isInside) {
                        canvas = $.extend({}, panes[0].canvas);
                        canvas.bottom = panes[panes.length - 1].canvas.bottom
                    }
                    switch (options.verticalAlignment) {
                        case'top':
                            shiftY = round(canvas.top + margin.top);
                            canvas.top = shiftCondition ? canvas.top + rect.height + margin.top + margin.bottom : canvas.top;
                            break;
                        case'bottom':
                            shiftY = round(canvas.height - rect.height - canvas.bottom - margin.bottom);
                            canvas.bottom = shiftCondition ? canvas.bottom + rect.height + margin.top + margin.bottom : canvas.bottom;
                            break
                    }
                    setCanvasValues(canvas);
                    return shiftY
                };
            var applyLegendLayout = function applyLegendLayout() {
                    var _this = this,
                        chart = _this.chart,
                        canvas = chart.canvas,
                        legend = chart.legend,
                        options = legend.options,
                        isHorizontal = options.orientation === 'horizontal',
                        isInside = options.position === 'inside',
                        rect = legend.getBoundingRect(),
                        shiftX,
                        shiftY;
                    if (options.visible && isNumber(rect.width) && isNumber(rect.height)) {
                        shiftX = _this._processLegendShiftX(rect, isInside, isHorizontal);
                        shiftY = _this._processLegendShiftY(rect, isInside, isHorizontal);
                        legend.shift(shiftX, shiftY)
                    }
                };
            var applyPieChartSeriesLayout = function() {
                    var chart = this.chart,
                        canvas = chart.canvas,
                        singleSeries = chart.series[0] || {},
                        paneSpaceHeight = canvas.height - canvas.top - canvas.bottom,
                        paneSpaceWidth = canvas.width - canvas.left - canvas.right,
                        min = paneSpaceWidth < paneSpaceHeight ? paneSpaceWidth : paneSpaceHeight,
                        accessibleRadius,
                        outerRadius = singleSeries.outerRadius,
                        innerRadius = singleSeries.type === 'pie' ? 0 : singleSeries.innerRadius || 0;
                    if (!(singleSeries && singleSeries.correctPosition))
                        return;
                    if (singleSeries.type !== 'pie')
                        if (!isNumber(innerRadius))
                            innerRadius = 0.5;
                        else {
                            innerRadius = Number(innerRadius);
                            if (innerRadius < 0.2)
                                innerRadius = 0.2;
                            if (innerRadius > 0.8)
                                innerRadius = 0.8
                        }
                    var getLabelSpace = function() {
                            var spacing;
                            if (singleSeries.styles.point.label.visible)
                                spacing = singleSeries.labelSpace || LABEL_SPACING;
                            else
                                $.each(singleSeries.points, function(i, point) {
                                    if (point.options.label.visible) {
                                        spacing = singleSeries.labelSpace || LABEL_SPACING;
                                        return false
                                    }
                                });
                            return spacing || 0
                        };
                    singleSeries.labelSpace = singleSeries.styles.point.label.position !== 'inside' ? getLabelSpace() : 0;
                    if (min < singleSeries.labelSpace)
                        return false;
                    accessibleRadius = outerRadius || (min - singleSeries.labelSpace - singleSeries.hoverSpace) / 2;
                    singleSeries.correctPosition({
                        centerX: math.floor(paneSpaceWidth / 2 + canvas.left),
                        centerY: math.floor(paneSpaceHeight / 2 + canvas.top),
                        radiusInner: math.floor(accessibleRadius * innerRadius),
                        radiusOuter: math.floor(accessibleRadius)
                    });
                    return true
                };
            var isValidBox = function isValidBox(box) {
                    return !!(box.x || box.y || box.width || box.height)
                };
            var correctDeltaMarginValue = function(panes, canvasesGrid, marginSides) {
                    var axisPanePosition,
                        canvasCell,
                        canvas,
                        deltaSide,
                        requireAxesRedraw;
                    $.each(panes, function(_, pane) {
                        axisPanePosition = getPanePosition(canvasesGrid, pane.name);
                        canvasCell = canvasesGrid[axisPanePosition.row][axisPanePosition.col];
                        canvas = canvasCell.canvas;
                        $.each(marginSides, function(_, side) {
                            deltaSide = 'delta' + side;
                            canvasCell[deltaSide] = Math.max(canvasCell[deltaSide] - (canvas[side.toLowerCase()] - canvas['original' + side]), 0);
                            if (canvasCell[deltaSide] > 0)
                                requireAxesRedraw = true
                        })
                    });
                    return requireAxesRedraw
                };
            var applyVerticalAxesLayout = function() {
                    var _this = this,
                        chart = _this.chart,
                        axes = chart.verticalAxes,
                        canvas,
                        axisPanePosition,
                        axisPosition,
                        canvasesGrid,
                        canvasCell,
                        box,
                        delta,
                        axis,
                        axisWidth,
                        commonAxisWidht = 0,
                        direction,
                        directionMultiplier,
                        i;
                    canvasesGrid = distributeCanvases(_this, chart.panes);
                    for (i = 0; i < axes.length; i++) {
                        axis = axes[i];
                        axisPosition = axis.options.position || 'left';
                        axis.delta = {};
                        box = axis.getBoundingRect();
                        if (!isValidBox(box))
                            continue;
                        axisPanePosition = getPanePosition(canvasesGrid, axes[i].pane);
                        canvasCell = canvasesGrid[axisPanePosition.row][axisPanePosition.col];
                        canvas = canvasCell.canvas;
                        if (axisPosition == 'right') {
                            direction = 'deltaRight';
                            directionMultiplier = 1;
                            canvasCell['deltaLeft'] += axis.padding && axis.padding['left']
                        }
                        else {
                            direction = 'deltaLeft';
                            directionMultiplier = -1;
                            canvasCell['deltaRight'] += axis.padding && axis.padding['right']
                        }
                        axisWidth = box.width;
                        if (!axis.delta[axisPosition] && canvasCell[direction] > 0)
                            canvasCell[direction] += axes[i].getMultipleAxesSpacing();
                        axes[i].delta[axisPosition] = axes[i].delta[axisPosition] || 0;
                        axes[i].delta[axisPosition] += canvasCell[direction] * directionMultiplier;
                        canvasCell[direction] += axisWidth;
                        if (!box.isEmpty) {
                            delta = box.y + box.height - (canvas.height - canvas.originalBottom);
                            if (delta > 0) {
                                _this.requireAxesRedraw = true;
                                canvasCell.deltaBottom += delta
                            }
                            delta = canvas.originalTop - box.y;
                            if (delta > 0) {
                                _this.requireAxesRedraw = true;
                                canvasCell.deltaTop += delta
                            }
                        }
                    }
                    _this.requireAxesRedraw = correctDeltaMarginValue(chart.panes, canvasesGrid, ['Left', 'Right']) || _this.requireAxesRedraw;
                    applyFoundExceedings(canvasesGrid)
                };
            var applyHorizontalAxesLayout = function() {
                    var _this = this,
                        chart = _this.chart,
                        panes = chart.panes,
                        axes = chart.horizontalAxes,
                        canvas,
                        axisPanePosition,
                        canvasesGrid,
                        canvasCell,
                        box,
                        delta,
                        axis,
                        axisHeight,
                        direction,
                        directionMultiplier,
                        axisPosition,
                        i;
                    canvasesGrid = distributeCanvases(_this, panes);
                    for (i = axes.length - 1; i >= 0; i--) {
                        axis = axes[i];
                        axisPosition = axis.options.position || 'bottom';
                        axes[i].delta = {};
                        box = axes[i].getBoundingRect();
                        if (!isValidBox(box))
                            continue;
                        axisPanePosition = getPanePosition(canvasesGrid, axes[i].pane);
                        canvasCell = canvasesGrid[axisPanePosition.row][axisPanePosition.col];
                        canvas = canvasCell.canvas;
                        if (axisPosition == 'top') {
                            direction = 'deltaTop';
                            directionMultiplier = -1;
                            canvasCell['deltaBottom'] += axis.padding && axis.padding['bottom']
                        }
                        else {
                            direction = 'deltaBottom';
                            directionMultiplier = 1;
                            canvasCell['deltaTop'] += axis.padding && axis.padding['top']
                        }
                        axisHeight = box.height;
                        if (!axis.delta[axisPosition] && canvasCell[direction] > 0)
                            canvasCell[direction] += axes[i].getMultipleAxesSpacing();
                        axes[i].delta[axisPosition] = axes[i].delta[axisPosition] || 0;
                        axes[i].delta[axisPosition] += canvasCell[direction] * directionMultiplier;
                        canvasCell[direction] += axisHeight;
                        if (!box.isEmpty) {
                            delta = canvas.originalLeft - box.x;
                            if (delta > 0) {
                                _this.requireAxesRedraw = true;
                                canvasCell.deltaLeft += delta
                            }
                            delta = box.x + box.width - (canvas.width - canvas.originalRight);
                            if (delta > 0) {
                                _this.requireAxesRedraw = true;
                                canvasCell.deltaRight = delta
                            }
                        }
                    }
                    _this.requireAxesRedraw = correctDeltaMarginValue(panes, canvasesGrid, ['Bottom', 'Top']) || _this.requireAxesRedraw;
                    applyFoundExceedings(canvasesGrid)
                };
            var distributeCanvases = function distributeCanvases(_this, panes) {
                    var panesLength = panes.length,
                        i,
                        j,
                        canvasesGrid = [],
                        canvasesRow = [],
                        rotated = _this.chart.option('rotated');
                    for (i = 0; i < panesLength; i++) {
                        if (!rotated)
                            canvasesRow = [];
                        canvasesRow.push({
                            canvas: panes[i].canvas,
                            pane: panes[i].name,
                            deltaLeft: 0,
                            deltaRight: 0,
                            deltaTop: 0,
                            deltaBottom: 0
                        });
                        !rotated && canvasesGrid.push(canvasesRow)
                    }
                    rotated && canvasesGrid.push(canvasesRow);
                    return canvasesGrid
                };
            var getPanePosition = function getPanePosition(canvasesGrid, pane) {
                    var row,
                        col;
                    for (row = 0; row < canvasesGrid.length; row++)
                        for (col = 0; col < canvasesGrid[row].length; col++)
                            if (canvasesGrid[row][col].pane === pane)
                                return {
                                        row: row,
                                        col: col
                                    }
                };
            var changeRowCanvas = function changeRowCanvas(canvasesGrid, row, callback) {
                    var col;
                    for (col = 0; col < canvasesGrid[row].length; col++)
                        callback(canvasesGrid[row][col].canvas)
                };
            var changeColumnCanvas = function changeRowCanvas(canvasesGrid, col, callback) {
                    var row;
                    for (row = 0; row < canvasesGrid.length; row++)
                        callback(canvasesGrid[row][col].canvas)
                };
            var applyFoundExceedings = function applyFoundExceedings(canvasesGrid) {
                    var col,
                        row,
                        canvasesRow,
                        maxLeft = 0,
                        maxRight = 0,
                        maxTop = 0,
                        maxBottom = 0,
                        maxColNumber = 0;
                    for (row = 0; row < canvasesGrid.length; row++) {
                        maxTop = 0;
                        maxBottom = 0;
                        canvasesRow = canvasesGrid[row];
                        if (canvasesRow.length > maxColNumber)
                            maxColNumber = canvasesRow.length;
                        for (col = 0; col < canvasesRow.length; col++) {
                            if (canvasesRow[col] && canvasesRow[col].deltaTop > maxTop)
                                maxTop = canvasesRow[col].deltaTop;
                            if (canvasesRow[col] && canvasesRow[col].deltaBottom > maxBottom)
                                maxBottom = canvasesRow[col].deltaBottom
                        }
                        if (maxTop)
                            changeRowCanvas(canvasesGrid, row, function(canvas) {
                                canvas.top += maxTop
                            });
                        if (maxBottom)
                            changeRowCanvas(canvasesGrid, row, function(canvas) {
                                canvas.bottom += maxBottom
                            })
                    }
                    for (col = 0; col < maxColNumber; col++) {
                        maxLeft = 0;
                        maxRight = 0;
                        for (row = 0; row < canvasesGrid.length; row++) {
                            canvasesRow = canvasesGrid[row];
                            if (canvasesRow[col] && canvasesRow[col].deltaLeft > maxLeft)
                                maxLeft = canvasesRow[col].deltaLeft;
                            if (canvasesRow[col] && canvasesRow[col].deltaRight > maxRight)
                                maxRight = canvasesRow[col].deltaRight
                        }
                        if (maxLeft)
                            changeColumnCanvas(canvasesGrid, col, function(canvas) {
                                canvas.left += maxLeft
                            });
                        if (maxRight)
                            changeColumnCanvas(canvasesGrid, col, function(canvas) {
                                canvas.right += maxRight
                            })
                    }
                };
            var isSingleCanvasExceeded = function isSingleCanvasExceeded(canvas) {
                    if (canvas.left > canvas.width - canvas.right || canvas.right > canvas.width - canvas.left || canvas.top > canvas.height - canvas.bottom || canvas.bottom > canvas.height - canvas.top)
                        return true
                };
            var isCanvasExceeded = function isCanvasExceeded(includePanes) {
                    var chart = this.chart,
                        paneCanvasesExceed = false;
                    if (isSingleCanvasExceeded(chart.canvas))
                        return true;
                    if (includePanes)
                        $.each(chart && chart.panes || {}, function(_, pane) {
                            if (pane.canvas && isSingleCanvasExceeded(pane.canvas)) {
                                paneCanvasesExceed = true;
                                return false
                            }
                        });
                    return paneCanvasesExceed
                };
            return {
                    update: update,
                    createPanesCanvases: createPanesCanvases,
                    applyLegendLayout: applyLegendLayout,
                    _processLegendShiftX: _processLegendShiftX,
                    _processLegendShiftY: _processLegendShiftY,
                    applyTitleLayout: applyTitleLayout,
                    adjustTitleLayout: adjustTitleLayout,
                    applyVerticalAxesLayout: applyVerticalAxesLayout,
                    applyHorizontalAxesLayout: applyHorizontalAxesLayout,
                    applyPieChartSeriesLayout: applyPieChartSeriesLayout,
                    isCanvasExceeded: isCanvasExceeded,
                    dispose: dispose
                }
        }())
    })(jQuery, DevExpress);
    /*! Module viz-charts, file multiAxesSynchronizer.js */
    (function($, DX, undefined) {
        var charts = DX.viz.charts,
            utils = DX.utils,
            math = Math;
        charts.MultiAxesSynchronizer = DX.Class.inherit(function() {
            var getValueAxesPerPanes = function(valueAxes) {
                    var result = {};
                    $.each(valueAxes, function() {
                        if (!result[this.pane])
                            result[this.pane] = [];
                        result[this.pane].push(this)
                    });
                    return result
                };
            var restoreOriginalBusinessRange = function(axis) {
                    var businessRange;
                    if (!axis.translator._originalBusinessRange)
                        axis.translator._originalBusinessRange = new charts.Range(axis.translator.getBusinessRange());
                    else {
                        businessRange = new charts.Range(axis.translator._originalBusinessRange);
                        axis.translator.updateBusinessRange(businessRange);
                        axis.setRange(businessRange)
                    }
                };
            var linearConvertor = {
                    transform: function(v, b) {
                        return utils.getLog(v, b)
                    },
                    addInterval: function(v, i) {
                        return v + i
                    },
                    getInterval: function(base, tickInterval) {
                        return tickInterval
                    },
                    adjustValue: math.floor
                };
            var logConvertor = {
                    transform: function(v, b) {
                        return utils.raiseTo(v, b)
                    },
                    addInterval: function(v, i) {
                        return v * i
                    },
                    getInterval: function(base, tickInterval) {
                        return math.pow(base, tickInterval)
                    },
                    adjustValue: utils.adjustValue
                };
            var convertAxisInfo = function(axisInfo, convertor) {
                    if (!axisInfo.isLogarithmic)
                        return;
                    var base = axisInfo.logarithmicBase,
                        tickValues = axisInfo.tickValues,
                        tick,
                        ticks = [],
                        interval;
                    axisInfo.minValue = convertor.transform(axisInfo.minValue, base);
                    axisInfo.oldMinValue = convertor.transform(axisInfo.oldMinValue, base);
                    axisInfo.maxValue = convertor.transform(axisInfo.maxValue, base);
                    axisInfo.oldMaxValue = convertor.transform(axisInfo.oldMaxValue, base);
                    axisInfo.tickInterval = math.round(axisInfo.tickInterval);
                    if (axisInfo.tickInterval < 1)
                        axisInfo.tickInterval = 1;
                    interval = convertor.getInterval(base, axisInfo.tickInterval);
                    for (tick = convertor.adjustValue(convertor.transform(axisInfo.tickValues[0], base)); ticks.length < axisInfo.tickValues.length; tick = convertor.addInterval(tick, interval))
                        ticks.push(tick);
                    ticks.tickInterval = axisInfo.tickInterval;
                    axisInfo.tickValues = ticks
                };
            var populateAxesInfo = function(axes, rotated) {
                    var axesInfo = [];
                    $.each(axes, function() {
                        var tickValues,
                            minValue,
                            maxValue,
                            inverted,
                            axisInfo,
                            businessRange,
                            logarithmicBase,
                            stubData = rotated && 'stubDataX' || 'stubDataY';
                        restoreOriginalBusinessRange(this);
                        tickValues = this.getTickValues();
                        if (tickValues && tickValues.length > 0 && utils.isNumber(tickValues[0]) && this.options.type !== 'discrete') {
                            businessRange = this.translator.getBusinessRange();
                            minValue = rotated ? businessRange.minVisibleX : businessRange.minVisibleY;
                            maxValue = rotated ? businessRange.maxVisibleX : businessRange.maxVisibleY;
                            inverted = rotated ? businessRange.invertX : businessRange.invertY;
                            logarithmicBase = rotated ? businessRange.baseX : businessRange.baseY;
                            axisInfo = {
                                axis: this,
                                isLogarithmic: this.options.type === 'logarithmic',
                                logarithmicBase: logarithmicBase,
                                tickValues: tickValues,
                                minValue: minValue,
                                oldMinValue: minValue,
                                maxValue: maxValue,
                                oldMaxValue: maxValue,
                                inverted: inverted,
                                tickInterval: tickValues.tickInterval,
                                synchronizedValue: this.options.synchronizedValue
                            };
                            if (businessRange[stubData]) {
                                axisInfo.stubData = true;
                                axisInfo.tickInterval = axisInfo.axis.options.tickInterval;
                                axisInfo.isLogarithmic = false
                            }
                            convertAxisInfo(axisInfo, linearConvertor);
                            if (!axisInfo.tickInterval && tickValues.length > 1)
                                axisInfo.tickInterval = tickValues[1] - tickValues[0];
                            axesInfo.push(axisInfo)
                        }
                    });
                    return axesInfo
                };
            var updateTickValues = function(axesInfo) {
                    var maxTicksCount = 0,
                        ticksMultiplier,
                        ticksCount,
                        additionalStartTicksCount = 0;
                    $.each(axesInfo, function() {
                        maxTicksCount = math.max(maxTicksCount, this.tickValues.length)
                    });
                    $.each(axesInfo, function() {
                        if (utils.isDefined(this.synchronizedValue)) {
                            this.baseTickValue = this.synchronizedValue;
                            this.invertedBaseTickValue = this.synchronizedValue;
                            this.tickValues = [this.baseTickValue]
                        }
                        else {
                            if (this.tickValues.length > 1 && this.tickInterval) {
                                ticksMultiplier = math.floor((maxTicksCount + 1) / this.tickValues.length);
                                ticksCount = ticksMultiplier > 1 ? math.floor((maxTicksCount + 1) / ticksMultiplier) : maxTicksCount;
                                additionalStartTicksCount = math.floor((ticksCount - this.tickValues.length) / 2);
                                while (additionalStartTicksCount > 0 && this.tickValues[0] !== 0) {
                                    this.tickValues.unshift(utils.adjustValue(this.tickValues[0] - this.tickInterval));
                                    additionalStartTicksCount--
                                }
                                while (this.tickValues.length < ticksCount)
                                    this.tickValues.push(utils.adjustValue(this.tickValues[this.tickValues.length - 1] + this.tickInterval));
                                this.tickInterval = this.tickInterval / ticksMultiplier
                            }
                            this.baseTickValue = this.tickValues[0];
                            this.invertedBaseTickValue = this.tickValues[this.tickValues.length - 1]
                        }
                    })
                };
            var getAxisRange = function(axisInfo) {
                    return axisInfo.maxValue - axisInfo.minValue
                };
            var getMainAxisInfo = function(axesInfo) {
                    var i;
                    for (i = 0; i < axesInfo.length; i++)
                        if (!axesInfo[i].stubData)
                            return axesInfo[i];
                    return null
                };
            var correctMinMaxValues = function(axesInfo) {
                    var mainAxisInfo = getMainAxisInfo(axesInfo);
                    $.each(axesInfo, function() {
                        var scale,
                            move,
                            mainAxisBaseValueOffset;
                        if (this !== mainAxisInfo) {
                            if (mainAxisInfo.tickInterval && this.tickInterval) {
                                if (this.stubData && utils.isDefined(this.synchronizedValue)) {
                                    this.oldMinValue = this.minValue = this.baseTickValue - (mainAxisInfo.baseTickValue - mainAxisInfo.minValue) / mainAxisInfo.tickInterval * this.tickInterval;
                                    this.oldMaxValue = this.maxValue = this.baseTickValue - (mainAxisInfo.baseTickValue - mainAxisInfo.maxValue) / mainAxisInfo.tickInterval * this.tickInterval;
                                    this.stubData = false
                                }
                                scale = mainAxisInfo.tickInterval / getAxisRange(mainAxisInfo) / this.tickInterval * getAxisRange(this);
                                this.maxValue = this.minValue + getAxisRange(this) / scale
                            }
                            if (mainAxisInfo.inverted && !this.inverted || !mainAxisInfo.inverted && this.inverted)
                                mainAxisBaseValueOffset = mainAxisInfo.maxValue - mainAxisInfo.invertedBaseTickValue;
                            else
                                mainAxisBaseValueOffset = mainAxisInfo.baseTickValue - mainAxisInfo.minValue;
                            move = (mainAxisBaseValueOffset / getAxisRange(mainAxisInfo) - (this.baseTickValue - this.minValue) / getAxisRange(this)) * getAxisRange(this);
                            this.minValue -= move;
                            this.maxValue -= move
                        }
                    })
                };
            var calculatePaddings = function(axesInfo) {
                    var minPadding,
                        maxPadding,
                        startPadding = 0,
                        endPadding = 0;
                    $.each(axesInfo, function() {
                        minPadding = this.minValue > this.oldMinValue ? (this.minValue - this.oldMinValue) / getAxisRange(this) : 0;
                        maxPadding = this.maxValue < this.oldMaxValue ? (this.oldMaxValue - this.maxValue) / getAxisRange(this) : 0;
                        if (this.inverted) {
                            startPadding = math.max(startPadding, maxPadding);
                            endPadding = math.max(endPadding, minPadding)
                        }
                        else {
                            startPadding = math.max(startPadding, minPadding);
                            endPadding = math.max(endPadding, maxPadding)
                        }
                    });
                    return {
                            start: startPadding,
                            end: endPadding
                        }
                };
            var correctMinMaxValuesByPaddings = function(axesInfo, paddings) {
                    var range;
                    $.each(axesInfo, function() {
                        range = getAxisRange(this);
                        if (this.inverted) {
                            this.minValue -= paddings.end * range;
                            this.maxValue += paddings.start * range
                        }
                        else {
                            this.minValue -= paddings.start * range;
                            this.maxValue += paddings.end * range
                        }
                        this.minValue = math.min(this.minValue, utils.adjustValue(this.minValue));
                        this.maxValue = math.max(this.maxValue, utils.adjustValue(this.maxValue))
                    })
                };
            var updateTickValuesIfSyncronizedValueUsed = function(axesInfo) {
                    var hasSyncronizedValue = false;
                    $.each(axesInfo, function() {
                        hasSyncronizedValue = hasSyncronizedValue || utils.isDefined(this.synchronizedValue)
                    });
                    $.each(axesInfo, function() {
                        var lastTickValue;
                        if (hasSyncronizedValue && this.tickInterval) {
                            while (this.tickValues[0] - this.tickInterval >= this.minValue)
                                this.tickValues.unshift(utils.adjustValue(this.tickValues[0] - this.tickInterval));
                            lastTickValue = this.tickValues[this.tickValues.length - 1];
                            while ((lastTickValue = lastTickValue + this.tickInterval) <= this.maxValue)
                                this.tickValues.push(utils.adjustValue(lastTickValue))
                        }
                        while (this.tickValues[0] < this.minValue)
                            this.tickValues.shift();
                        while (this.tickValues[this.tickValues.length - 1] > this.maxValue)
                            this.tickValues.pop()
                    })
                };
            var applyMinMaxValues = function(axesInfo, rotated) {
                    var axis,
                        range,
                        stubData = rotated && 'stubDataX' || 'stubDataY';
                    $.each(axesInfo, function() {
                        axis = this.axis;
                        range = axis.translator.getBusinessRange();
                        if (rotated) {
                            if (range.minX === range.minVisibleX)
                                range.minX = this.minValue;
                            if (range.maxX === range.maxVisibleX)
                                range.maxX = this.maxValue;
                            range.minVisibleX = this.minValue;
                            range.maxVisibleX = this.maxValue
                        }
                        else {
                            if (range.minY === range.minVisibleY)
                                range.minY = this.minValue;
                            if (range.maxY === range.maxVisibleY)
                                range.maxY = this.maxValue;
                            range.minVisibleY = this.minValue;
                            range.maxVisibleY = this.maxValue
                        }
                        if (utils.isDefined(this.stubData))
                            range[stubData] = this.stubData;
                        if (range.minY > range.minVisibleY)
                            range.minY = range.minVisibleY;
                        if (range.maxY < range.maxVisibleY)
                            range.maxY = range.maxVisibleY;
                        if (range.minX > range.minVisibleX)
                            range.minX = range.minVisibleX;
                        if (range.maxX < range.maxVisibleX)
                            range.maxX = range.maxVisibleX;
                        axis.translator.updateBusinessRange(range);
                        axis.setRange(range);
                        axis.setTickValues(this.tickValues)
                    })
                };
            return {synchronize: function(valueAxes, rotated) {
                        var valueAxesPerPanes;
                        valueAxesPerPanes = getValueAxesPerPanes(valueAxes);
                        $.each(valueAxesPerPanes, function(i, axes) {
                            var axesInfo,
                                paddings;
                            if (axes.length > 1) {
                                axesInfo = populateAxesInfo(axes, rotated);
                                if (axesInfo.length === 0 || !getMainAxisInfo(axesInfo))
                                    return;
                                updateTickValues(axesInfo);
                                correctMinMaxValues(axesInfo);
                                paddings = calculatePaddings(axesInfo);
                                correctMinMaxValuesByPaddings(axesInfo, paddings);
                                updateTickValuesIfSyncronizedValueUsed(axesInfo);
                                $.each(axesInfo, function() {
                                    convertAxisInfo(this, logConvertor)
                                });
                                applyMinMaxValues(axesInfo, rotated)
                            }
                        })
                    }}
        }())
    })(jQuery, DevExpress);
    /*! Module viz-charts, file tracker.js */
    (function($, DX) {
        var charts = DX.viz.charts,
            eventsConsts = charts.series.consts.events,
            utils = DX.utils,
            isFunction = utils.isFunction,
            isDefined = utils.isDefined,
            MULTIPLE_MODE = 'multiple',
            SINGLE_MODE = 'single',
            ALL_ARGUMENTS_POINTS_MODE = 'allargumentpoints',
            ALL_SERIES_POINTS_MODE = 'allseriespoints',
            msPointerEnabled = window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints || window.navigator.pointerEnabled && window.navigator.maxTouchPoints || null,
            MOUSE_EVENT_LOCK_TIMEOUT = 1000,
            CLICK_EVENT_LOCK_TIMEOUT = 600,
            HOVER_START_DELAY = 100,
            HOVER_HOLD_DELAY = 200,
            TOOLTIP_HOLD_TIMEOUT = 400,
            NONE_MODE = 'none';
        charts.Tracker = DX.Class.inherit({
            ctor: function(options) {
                this.__HOVER_HOLD_DELAY = HOVER_HOLD_DELAY;
                this.__TOOLTIP_HOLD_TIMEOUT = TOOLTIP_HOLD_TIMEOUT;
                var _this = this,
                    events = options.events = options.events || {},
                    getEventHandler = function(func) {
                        return func && func.call ? func : null
                    };
                _this._reinit(options);
                _this.pointSelectionMode = _this._prepareMode(options.pointSelectionMode);
                _this.seriesSelectionMode = _this._prepareMode(options.seriesSelectionMode);
                _this.hoverStartDelay = HOVER_START_DELAY;
                _this.hoverHoldDelay = HOVER_HOLD_DELAY;
                _this.sensitivity = 7;
                if (_this.pointSelectionMode === MULTIPLE_MODE) {
                    _this._releaseSelectedPoint = _this._releaseSelectedPointMultiMode;
                    _this.selectedPoint = []
                }
                else
                    _this._releaseSelectedPoint = _this._releaseSelectedPointSingleMode;
                if (_this.seriesSelectionMode === MULTIPLE_MODE) {
                    _this._releaseSelectedSeries = _this._releaseSelectedSeriesMultiMode;
                    _this.selectedSeries = []
                }
                else
                    _this._releaseSelectedSeries = _this._releaseSelectedSeriesSingleMode;
                _this.tooltipEnabled = options.tooltipEnabled;
                _this.tooltipShown = options.tooltipShown;
                _this.tooltipHidden = options.tooltipHidden;
                _this.seriesClick = getEventHandler(events.seriesClick);
                _this.pointClick = getEventHandler(events.pointClick);
                _this.legendClick = getEventHandler(events.legendClick);
                _this.argumentAxisClick = getEventHandler(events.argumentAxisClick);
                _this.seriesHover = getEventHandler(events.seriesHover);
                _this.seriesSelected = getEventHandler(events.seriesSelected);
                _this.pointHover = getEventHandler(events.pointHover);
                _this.seriesSelectionChanged = getEventHandler(events.seriesSelectionChanged);
                _this.pointSelectionChanged = getEventHandler(events.pointSelectionChanged);
                _this.seriesHoverChanged = getEventHandler(events.seriesHoverChanged);
                _this.pointHoverChanged = getEventHandler(events.pointHoverChanged);
                _this.pointSelected = getEventHandler(events.pointSelected);
                _this.renderer = options.renderer;
                _this.seriesTrackerGroup = options.seriesTrackerGroup;
                _this.markerTrackerGroup = options.markerTrackerGroup;
                _this.seriesGroup = options.seriesGroup;
                _this.legendGroup = options.legendGroup;
                _this.seriesGroup.on(eventsConsts.selectSeries, {tracker: _this}, _this._selectSeries);
                _this.seriesGroup.on(eventsConsts.deselectSeries, {tracker: _this}, _this._deselectSeries);
                _this.seriesGroup.on(eventsConsts.selectPoint, {tracker: _this}, _this._selectPoint);
                _this.seriesGroup.on(eventsConsts.deselectPoint, {tracker: _this}, _this._deselectPoint);
                _this.seriesGroup.on(eventsConsts.showPointTooltip, {tracker: _this}, _this._showPointTooltip);
                _this.seriesGroup.on(eventsConsts.hidePointTooltip, {tracker: _this}, _this._hidePointTooltip);
                _this.crossHairOptions = options.crossHairOptions
            },
            _clean: function() {
                var _this = this;
                _this.selectedPoint = _this.pointSelectionMode === MULTIPLE_MODE ? [] : null;
                _this.selectedSeries = _this.seriesSelectionMode === MULTIPLE_MODE ? [] : null;
                _this.hoveredPoint = null;
                _this.hoveredSeries = null;
                _this._hideTooltip(_this.pointAtShownTooltip);
                clearTimeout(_this.tooltipHoldTimeout);
                clearTimeout(_this.hoverStartTimeOut);
                clearTimeout(_this.hoverHoldTimeOut)
            },
            _reinit: function(options) {
                options = options || {};
                this.storedSeries = options.series || [];
                this.argumentAxis = options.argumentAxis || [];
                this._clean()
            },
            dispose: function() {
                var _this = this;
                clearTimeout(_this.tooltipHoldTimeout);
                clearTimeout(_this.hoverStartTimeOut);
                clearTimeout(_this.hoverHoldTimeOut);
                clearTimeout(_this.unlockMouseTimer);
                clearTimeout(_this.lockClickTimer);
                $.each(_this.argumentAxis, function(_, axis) {
                    axis._axisElementsGroup && axis._axisElementsGroup.off()
                });
                _this.seriesTrackerGroup.off();
                _this.markerTrackerGroup.off();
                _this.legendGroup.off();
                _this.seriesGroup.off();
                _this.rootTracker && _this.rootTracker.off();
                _this.argumentAxis = null;
                _this.seriesTrackerGroup = null;
                _this.markerTrackerGroup = null;
                _this.legendGroup = null;
                _this.seriesGroup = null;
                _this.crossHairOptions = null;
                _this.selectedPoint = null;
                _this.selectedSeries = null;
                _this.hoveredSeries = null;
                _this.hoveredPoint = null;
                _this.storedSeries = null;
                _this.argumentAxis = null;
                _this.hoveredObject = null;
                _this.pointAtShownTooltip = null
            },
            _prepareMode: function(mode) {
                mode = (mode || '').toLowerCase();
                return mode = mode !== SINGLE_MODE && mode !== MULTIPLE_MODE ? SINGLE_MODE : mode
            },
            _prepare: function(typeChart) {
                var _this = this;
                _this.rootTracker = _this.renderer.getRoot();
                $.each(_this.argumentAxis, function(_, axis) {
                    _this._eventHandler(axis._axisElementsGroup, {
                        parser: _this._getOptionsAxis,
                        condition: _this._axisCondition,
                        execute: _this._axisEvent
                    }, {
                        tracker: _this,
                        axis: axis
                    })
                });
                _this._eventHandler(_this.seriesTrackerGroup, {
                    parser: _this._getOptionsPointSeries,
                    condition: _this._seriesCondition,
                    execute: _this._seriesEvent
                }, {tracker: _this});
                _this._eventHandler(_this.markerTrackerGroup, {
                    parser: _this._getOptionsPointSeries,
                    condition: _this._pointCondition,
                    execute: _this._pointEvent
                }, {tracker: _this});
                _this._eventHandler(_this.legendGroup, {
                    parser: _this._getOptionsPointSeries,
                    condition: _this._getLegendCondition(typeChart),
                    execute: _this._getLegendEvent(typeChart)
                }, {tracker: _this});
                _this._eventHandler(_this.rootTracker, {
                    parser: _this._getOptionsCrossHair,
                    execute: _this._crossHairEvent
                }, {tracker: _this})
            },
            _getLegendCondition: function(typeChart) {
                var legendCondition;
                if (typeChart === 'pieChart')
                    legendCondition = this._pointCondition;
                else
                    legendCondition = this._seriesCondition;
                this.__legendCondition = legendCondition;
                return legendCondition
            },
            _getLegendEvent: function(typeChart) {
                var self = this,
                    legendEvent;
                if (typeChart === 'pieChart')
                    legendEvent = $.extend({}, this._pointEvent, {
                        touchend: function(self, point, mode, event) {
                            if (!self.showHoldTooltip)
                                self._legendClick(self, point, true, event) || self._pointClick(self, point, true, event);
                            clearTimeout(self.tooltipHoldTimeout);
                            self._clickLock(self);
                            self._clearHover(self)
                        },
                        click: function(self, point, mode, event) {
                            self._legendClick(self, point, false, event) || self._pointClick(self, point, false, event);
                            self._clickLock(self)
                        }
                    });
                else
                    legendEvent = $.extend({}, this._seriesEvent, {
                        click: function(self, series, mode, event) {
                            self._legendClick(self, series, false, event) || self._seriesClick(self, series, false, event);
                            self._clickLock(self)
                        },
                        touchend: function(self, series, mode, event) {
                            self._legendClick(self, series, true, event) || self._seriesClick(self, series, true, event);
                            self._clickLock(self)
                        }
                    });
                this.__legendEvent = legendEvent;
                return legendEvent
            },
            _eventHandler: function(group, handlers, data) {
                var prepareHandlers = this._designerHandlers(handlers);
                group.off(".dxc-tracker");
                group.on(prepareHandlers, data)
            },
            _designerHandlers: function(handler) {
                var handlers = {},
                    parser = handler.parser,
                    condition = handler.condition,
                    execute = handler.execute,
                    designerHandle = function(eventType, func) {
                        if (condition && condition[eventType] === null)
                            return;
                        handlers[eventType + ".dxc-tracker"] = function(event) {
                            var options = parser ? parser(event) : event;
                            if (!options)
                                return;
                            if (condition && condition[eventType] && condition[eventType].call)
                                condition[eventType].apply(null, options.concat([func]));
                            else
                                func.apply(null, options)
                        }
                    };
                $.each(execute, designerHandle);
                return handlers
            },
            _getOptionsCrossHair: function(event) {
                var self = event.data.tracker;
                var rootOffset = utils.getRootOffset(self.renderer);
                var xe = event.pageX - rootOffset.left;
                var ye = event.pageY - rootOffset.top;
                return [self, xe, ye]
            },
            _getOptionsPointSeries: function(event) {
                var object = $(event.target).data('point') || $(event.target).data('series'),
                    self = event.data.tracker,
                    mode = object && ($(event.target).data('mode') || object.options.hoverMode);
                if (event.type === 'mousemove')
                    return [self, event.pageX, event.pageY, event.offsetX, event.offsetY];
                if (!object)
                    return null;
                return [self, object, mode, event]
            },
            _getOptionsAxis: function(event) {
                var self = event.data.tracker,
                    axis = event.data.axis,
                    mode = axis.options.hoverMode,
                    argument;
                if (event.target.tagName === "tspan")
                    argument = $(event.target).parent().data('argument');
                else
                    argument = $(event.target).data('argument');
                if (event.type === 'mousemove')
                    return [self, event.pageX, event.pageY];
                if (!axis)
                    return null;
                return [self, axis, mode, argument, event]
            },
            _pointEvent: {
                mouseover: function(self, point, mode) {
                    if (self.mouseLocked)
                        return;
                    self._setHoveredPoint(point, mode);
                    if (self.tooltipEnabled && point && point.options)
                        self._showTooltip(self.tooltip, point)
                },
                mouseout: function(self, point, mode) {
                    if (self.mouseLocked)
                        return;
                    self._clearHover(self)
                },
                touchmove: function(self, point, mode) {
                    clearTimeout(self.tooltipHoldTimeout);
                    self.tooltipHoldTimeout = null;
                    self.showHoldTooltip = true
                },
                mousemove: function(self, pageX, pageY, offsetX, offsetY) {
                    self._getCurCoords(self, pageX, pageY)
                },
                touchstart: function(self, point, mode) {
                    self.showHoldTooltip = false;
                    self._mouseLock(self);
                    if (self.tooltipEnabled)
                        self.tooltipHoldTimeout = setTimeout(function() {
                            self.showHoldTooltip = true;
                            self._showTooltip(self.tooltip, point)
                        }, TOOLTIP_HOLD_TIMEOUT)
                },
                touchend: function(self, point, mode, event) {
                    if (!self.showHoldTooltip)
                        self._pointClick(self, point, true, event);
                    clearTimeout(self.tooltipHoldTimeout);
                    self._clickLock(self);
                    self._clearHover(self)
                },
                click: function(self, point, mode, event) {
                    self._pointClick(self, point, false, event)
                },
                mousedown: function(self, point, mode) {
                    self._pointEvent.touchstart(self, point, mode)
                },
                mouseup: function(self, point, mode, event) {
                    self._pointEvent.touchend(self, point, mode, event)
                }
            },
            _pointCondition: {
                mouseover: function(self, point, mode, event, func) {
                    if (mode === ALL_ARGUMENTS_POINTS_MODE && self.hoveredPoint && self.hoveredPoint.argument === point.argument) {
                        self.hoverHoldTimeOut = clearTimeout(self.hoverHoldTimeOut);
                        self.hoveredObject = point;
                        func(self, point, mode);
                        return
                    }
                    self._setHover(self, point, mode, func)
                },
                mouseout: function(self, point, mode, event, func) {
                    self._releaseHover(self, point, mode, func)
                },
                touchstart: !msPointerEnabled,
                touchend: !msPointerEnabled,
                mousedown: msPointerEnabled,
                mouseup: msPointerEnabled
            },
            _seriesEvent: {
                mouseover: function(self, series, mode) {
                    if (self.mouseLocked)
                        return;
                    self._setHoveredSeries(series, mode)
                },
                mouseout: function(self, series, mode) {
                    self._clearHover(self)
                },
                mousemove: function(self, pageX, pageY, offsetX, offsetY) {
                    self._getCurCoords(self, pageX, pageY)
                },
                touchstart: function(self) {
                    self._mouseLock(self)
                },
                touchend: function(self, series, _, event) {
                    self._seriesClick(self, series, true, event);
                    self._clickLock(self)
                },
                click: function(self, series, mode, event) {
                    self._seriesClick(self, series, false, event)
                },
                mousedown: function(self, point, mode) {
                    self._seriesEvent.touchstart(self, point, mode)
                },
                mouseup: function(self, point, mode) {
                    self._seriesEvent.touchend(self, point, mode)
                }
            },
            _crossHairEvent: {
                mousemove: function(self, x, y) {
                    if (!self.eventType) {
                        self.eventType = 'mouse';
                        return
                    }
                    else if (self.eventType === 'touch')
                        return;
                    else if (self.eventType === 'mouse') {
                        self._moveCrossHair(self, x, y);
                        self.eventType = null
                    }
                },
                mouseout: function(self) {
                    self._hideCrossHair(self);
                    self.eventType = null
                },
                touchstart: function(self, x, y) {
                    self.eventType = 'touch'
                },
                touchend: function(self, x, y) {
                    self.eventType = null
                },
                mousedown: function(self, x, y) {
                    self._crossHairEvent.touchstart(self, x, y)
                },
                mouseup: function(self, x, y) {
                    self._crossHairEvent.touchend(self, x, y)
                }
            },
            _hideCrossHair: function(self) {
                if (!self.crossHairOptions)
                    return;
                var horizontalLine = self.crossHairOptions.horizontalLine,
                    verticalLine = self.crossHairOptions.verticalLine;
                horizontalLine && horizontalLine.applySettings({visibility: 'hidden'});
                verticalLine && verticalLine.applySettings({visibility: 'hidden'})
            },
            _moveCrossHair: function(self, x, y) {
                if (!self.crossHairOptions)
                    return;
                var horizontalLine = self.crossHairOptions.horizontalLine,
                    verticalLine = self.crossHairOptions.verticalLine,
                    canvas = self.crossHairOptions.canvas || {};
                if (x > canvas.left && x < canvas.width - canvas.right && y > canvas.top && y < canvas.height - canvas.bottom) {
                    horizontalLine && horizontalLine.applySettings({visibility: 'visible'});
                    verticalLine && verticalLine.applySettings({visibility: 'visible'});
                    horizontalLine && horizontalLine.applySettings({translateY: y - canvas.top});
                    verticalLine && verticalLine.applySettings({translateX: x - canvas.left})
                }
                else {
                    horizontalLine && horizontalLine.applySettings({visibility: 'hidden'});
                    verticalLine && verticalLine.applySettings({visibility: 'hidden'})
                }
            },
            _seriesCondition: {
                mouseover: function(self, series, mode, event, func) {
                    self._setHover(self, series, mode, func)
                },
                mouseout: function(self, series, mode, event, func) {
                    self._releaseHover(self, series, mode, func)
                },
                touchstart: !msPointerEnabled,
                touchend: !msPointerEnabled,
                mousedown: msPointerEnabled,
                mouseup: msPointerEnabled
            },
            _axisEvent: {
                mouseover: function(self, axis, argument) {
                    if (self.mouseLocked || isDefined(self.hoveredArgument) && self.hoveredArgument === argument)
                        return;
                    self._clearHover(self);
                    if (isDefined(self.hoveredArgument))
                        self._toAllArgumentPoints(self.hoveredArgument, 'releasePointHoverState');
                    self._toAllArgumentPoints(argument, 'setPointHoverState');
                    self.hoveredArgument = argument
                },
                mouseout: function(self, axis) {
                    if (self.mouseLocked || !isDefined(self.hoveredArgument))
                        return;
                    self._toAllArgumentPoints(self.hoveredArgument, 'releasePointHoverState');
                    self.hoveredArgument = null
                },
                mousemove: function(self, pageX, pageY) {
                    self._getCurCoords(self, pageX, pageY)
                },
                touchstart: function(self) {
                    self._mouseLock(self)
                },
                touchend: function(self, axis, mode, argument, event) {
                    self._argumentAxisClick(self, axis, argument, true, event);
                    self._clearHover(self);
                    self._clickLock(self)
                },
                click: function(self, axis, mode, argument, event) {
                    self._clearHover(self);
                    self._argumentAxisClick(self, axis, argument, false, event);
                    self._clickLock(self)
                },
                mousedown: function(self) {
                    self._axisEvent.touchstart(self)
                },
                mouseup: function(self, axis, mode, argument, event) {
                    self._axisEvent.touchend(self, axis, mode, argument, event)
                }
            },
            _axisCondition: {
                mouseover: function(self, axis, mode, argument, event, func) {
                    self._hideCrossHair(self);
                    if (mode === ALL_ARGUMENTS_POINTS_MODE)
                        self._setHover(self, axis, argument, func)
                },
                mouseout: function(self, axis, mode, argument, event, func) {
                    self._releaseHover(self, axis, argument, func)
                },
                touchstart: !msPointerEnabled,
                touchend: !msPointerEnabled,
                mousedown: msPointerEnabled,
                mouseup: msPointerEnabled
            },
            _setHover: function(self, object, mode, func) {
                if (object === self.hoveredObject) {
                    self.hoverHoldTimeOut = clearTimeout(self.hoverHoldTimeOut);
                    if (mode === object.lastHoverMode)
                        return
                }
                if (self.mouseLocked)
                    return;
                self.hoverStartTimeOut = setTimeout(function() {
                    self._compareCoords(object, self, mode, func)
                }, self.hoverStartDelay)
            },
            _releaseHover: function(self, object, mode, func) {
                if (self.mouseLocked)
                    return;
                self.hoverStartTimeOut = clearTimeout(self.hoverStartTimeOut);
                if (object === self.hoveredObject)
                    self.hoverHoldTimeOut = setTimeout(function() {
                        self.hoveredObject = null;
                        func(self, object, mode)
                    }, self.hoverHoldDelay)
            },
            _compareCoords: function(point, self, mode, func) {
                clearTimeout(self.hoverStartTimeOut);
                if (Math.abs(self.pX - self.cX) + Math.abs(self.pY - self.cY) < self.sensitivity) {
                    if (self.mouseLocked)
                        return;
                    clearTimeout(self.hoverHoldTimeOut);
                    self.hoveredObject = point;
                    func(self, point, mode)
                }
                else {
                    self.pX = self.cX;
                    self.pY = self.cY;
                    self.hoverStartTimeOut = setTimeout(function() {
                        self._compareCoords(point, self, mode, func)
                    }, self.hoverStartDelay)
                }
            },
            _seriesClick: function(self, series, touchEvent, event) {
                if (self.lockClick && !touchEvent)
                    return;
                self.seriesClick && self.seriesClick.call(series, series, event)
            },
            _legendClick: function(self, series, touchEvent, event) {
                var legendClick = self.legendClick;
                if (self.lockClick && !touchEvent)
                    return true;
                if (legendClick) {
                    legendClick.call(series, series, event);
                    return true
                }
                return false
            },
            _pointClick: function(self, point, touchEvent, event) {
                var series = point.series;
                if (self.lockClick && !touchEvent)
                    return;
                if (self.pointClick) {
                    self.pointClick.call(point, point, event);
                    return
                }
                self.seriesClick && self.seriesClick.call(series, series, event);
                return
            },
            _argumentAxisClick: function(self, axis, argument, touchEvent, event) {
                if (self.lockClick && !touchEvent)
                    return;
                self.argumentAxisClick && self.argumentAxisClick.call(axis, axis, argument, event)
            },
            _selectSeries: function(event, mode) {
                event.data.tracker._setSelectedSeries(event.target, mode)
            },
            _deselectSeries: function(event, mode) {
                event.data.tracker._releaseSelectedSeries(event.target, mode)
            },
            _selectPoint: function(event, point) {
                event.data.tracker._setSelectedPoint(point)
            },
            _deselectPoint: function(event, point) {
                event.data.tracker._releaseSelectedPoint(point)
            },
            _showPointTooltip: function(event, point) {
                var self = event.data.tracker;
                self._showTooltip(self.tooltip, point)
            },
            _hidePointTooltip: function(event, point) {
                event.data.tracker._hideTooltip(point)
            },
            _hideTooltip: function(point) {
                var tooltip = this && this.tooltip;
                if (!tooltip || point && this.pointAtShownTooltip !== point)
                    return;
                point = point || this.pointAtShownTooltip;
                tooltip.hide();
                if (this.pointAtShownTooltip) {
                    this.pointAtShownTooltip = null;
                    isFunction(this.tooltipHidden) && this.tooltipHidden.call(point, point)
                }
            },
            _showTooltip: function(tooltip, point) {
                var tooltipFormatObject = point.getTooltipFormatObject(tooltip);
                if (!isDefined(tooltipFormatObject.valueText) && !tooltipFormatObject.points)
                    return;
                this.pointAtShownTooltip && this._hideTooltip(this.pointAtShownTooltip);
                if (point && point.options) {
                    var tooltipCoords = point.getTooltipCoords();
                    var tooltipText = tooltip.formatTooltip.call(tooltipFormatObject, tooltip.options);
                    if (!isDefined(tooltipText) || !isDefined(tooltipCoords.x) || !isDefined(tooltipCoords.y) || !tooltip)
                        return;
                    tooltip.show();
                    tooltip.move(~~tooltipCoords.x, ~~tooltipCoords.y, tooltipCoords.offset, tooltipText, point.getColor(), point.getClassName());
                    !this.pointAtShownTooltip && isFunction(this.tooltipShown) && this.tooltipShown.call(point, point);
                    this.pointAtShownTooltip = point
                }
            },
            _setHoveredSeries: function(series, mode) {
                var self = this;
                if (mode !== NONE_MODE && self.hoveredSeries !== series || series.lastHoverMode !== mode) {
                    self._clearHover(self);
                    self.hoveredSeries = series;
                    series.setHoverState(mode);
                    self.seriesHover && self.seriesHover.call(series, series);
                    self.seriesHoverChanged && self.seriesHoverChanged.call(series, series)
                }
                if (mode === NONE_MODE)
                    $(series).trigger('NoneMode')
            },
            _setSelectedSeries: function(series, mode) {
                var self = this,
                    seriesContain = false;
                if (this.seriesSelectionMode === MULTIPLE_MODE)
                    $.each(self.selectedSeries, function(_, sr) {
                        if (sr == series) {
                            seriesContain = true;
                            return false
                        }
                    });
                else if (self.selectedSeries == series)
                    seriesContain = true;
                if (!seriesContain || series.lastSelectionMode !== mode) {
                    if (self.seriesSelectionMode === SINGLE_MODE) {
                        this._releaseSelectedSeries();
                        self.selectedSeries = series
                    }
                    else
                        self.selectedSeries.push(series);
                    series.setSelectedState(mode);
                    self.seriesSelected && self.seriesSelected.call(series, series);
                    self.seriesSelectionChanged && self.seriesSelectionChanged.call(series, series)
                }
            },
            _setHoveredPoint: function(point, mode) {
                var self = this;
                var debug = DX.utils.debug;
                debug.assert(point.series, 'series was not assigned to point or empty');
                if (self.hoveredPoint === point && !point.series)
                    return;
                self._clearHover(self);
                self.hoveredPoint = point;
                if (point && point.options)
                    self._setHoverStylePointWithMode(point, 'setPointHoverState', mode || point.options.hoverMode, self.pointHoverChanged);
                self.pointHover && self.pointHover.call(point, point)
            },
            _toAllArgumentPoints: function(argument, func, callBack) {
                var _this = this;
                $.each(_this.storedSeries, function(_, series) {
                    var neighborPoint = series.getPointByArg(argument);
                    if (neighborPoint) {
                        series[func](neighborPoint);
                        callBack && callBack.call(neighborPoint, neighborPoint)
                    }
                })
            },
            _setHoverStylePointWithMode: function(point, func, mode, callBack) {
                var _this = this;
                switch (mode) {
                    case ALL_ARGUMENTS_POINTS_MODE:
                        this._toAllArgumentPoints(point.argument, func, callBack);
                        break;
                    case ALL_SERIES_POINTS_MODE:
                        $.each(point.series.points, function(_, point) {
                            point.series[func](point);
                            callBack && callBack.call(point, point)
                        });
                        break;
                    case NONE_MODE:
                        break;
                    default:
                        point.series[func](point);
                        callBack && callBack.call(point, point)
                }
            },
            _setSelectedPoint: function(point) {
                var self = this,
                    pointContain = false;
                if (this.pointSelectionMode === MULTIPLE_MODE) {
                    $.each(self.selectedPoint, function(_, pt) {
                        if (pt == point) {
                            pointContain = true;
                            return false
                        }
                    });
                    !pointContain && self.selectedPoint.push(point)
                }
                else if (self.selectedPoint !== point) {
                    this._releaseSelectedPoint();
                    self.selectedPoint = point
                }
                else
                    pointContain = true;
                if (!pointContain) {
                    self._setHoverStylePointWithMode(point, 'setPointSelectedState', point.options.selectionMode, self.pointSelectionChanged);
                    self.pointSelected && self.pointSelected.call(point, point)
                }
            },
            _releaseHoveredSeries: function() {
                if (!this.hoveredSeries)
                    return;
                this.hoveredSeries.releaseHoverState();
                this.seriesHoverChanged && this.seriesHoverChanged.call(this.hoveredSeries, this.hoveredSeries);
                this.hoveredSeries = null
            },
            _releaseSelectedSeriesMultiMode: function(series) {
                if (!this.selectedSeries)
                    return;
                series.releaseSelectedState();
                this.seriesSelectionChanged && this.seriesSelectionChanged.call(series, series);
                this.selectedSeries = $.map(this.selectedSeries, function(sr) {
                    if (sr !== series)
                        return sr
                })
            },
            _releaseSelectedSeriesSingleMode: function() {
                var series = this.selectedSeries;
                if (!series)
                    return;
                series.releaseSelectedState();
                this.seriesSelectionChanged && this.seriesSelectionChanged.call(series, series);
                this.selectedSeries = null
            },
            _releaseHoveredPoint: function() {
                var self = this,
                    point = self.hoveredPoint;
                if (!point || !point.options)
                    return;
                if (point.options.hoverMode === ALL_SERIES_POINTS_MODE)
                    $.each(point.series.points, function(_, point) {
                        point.series.releasePointHoverState(point);
                        self.pointHoverChanged && self.pointHoverChanged.call(point, point)
                    });
                else if (point.options.hoverMode === ALL_ARGUMENTS_POINTS_MODE)
                    self._toAllArgumentPoints(point.argument, 'releasePointHoverState', self.pointHoverChanged);
                else {
                    point.releaseHoverState();
                    self.pointHoverChanged && self.pointHoverChanged.call(point, point)
                }
                if (self.tooltipEnabled && !self.showHoldTooltip)
                    self._hideTooltip(point);
                self.hoveredPoint = null
            },
            _releaseSelectedPointMultiMode: function(point) {
                var self = this,
                    points = self.selectedPoint;
                if (!points)
                    return;
                self._setHoverStylePointWithMode(point, 'releasePointSelectedState', point.options.selectionMode, self.pointSelectionChanged);
                this.selectedPoint = $.map(this.selectedPoint, function(pt) {
                    if (pt !== point)
                        return pt
                })
            },
            _releaseSelectedPointSingleMode: function() {
                var self = this,
                    point = self.selectedPoint;
                if (!point)
                    return;
                self._setHoverStylePointWithMode(point, 'releasePointSelectedState', point.options.selectionMode, self.pointSelectionChanged);
                this.selectedPoint = null
            },
            clearSelection: function() {
                var self = this;
                if (this.pointSelectionMode === SINGLE_MODE)
                    this._releaseSelectedPoint();
                else
                    $.each(this.selectedPoint, function(_, point) {
                        self._releaseSelectedPoint(point)
                    });
                if (this.seriesSelectionMode === SINGLE_MODE)
                    this._releaseSelectedSeries();
                else
                    $.each(this.selectedSeries, function(_, series) {
                        self._releaseSelectedSeries(series)
                    })
            },
            _mouseLock: function(tracker) {
                if (tracker.unlockMouseTimer)
                    clearTimeout(tracker.unlockMouseTimer);
                tracker.mouseLocked = true;
                tracker.unlockMouseTimer = setTimeout(function() {
                    tracker.mouseLocked = false
                }, MOUSE_EVENT_LOCK_TIMEOUT)
            },
            _clickLock: function(tracker) {
                tracker.lockClick = true;
                if (tracker.lockClickTimer)
                    clearTimeout(tracker.lockClickTimer);
                tracker.lockClickTimer = setTimeout(function() {
                    tracker.lockClick = false
                }, CLICK_EVENT_LOCK_TIMEOUT)
            },
            _getCurCoords: function(self, pageX, pageY) {
                self.cX = pageX;
                self.cY = pageY
            },
            _clearHover: function(self) {
                self._releaseHoveredSeries();
                self._releaseHoveredPoint()
            }
        })
    })(jQuery, DevExpress);
    /*! Module viz-charts, file dxChart.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            viz = DX.viz;
        ui.registerComponent("dxChart", viz.charts.Chart)
    })(jQuery, DevExpress);
    /*! Module viz-charts, file dxPieChart.js */
    (function($, DX, undefined) {
        var ui = DX.ui,
            viz = DX.viz;
        ui.registerComponent("dxPieChart", viz.charts.PieChart)
    })(jQuery, DevExpress);
    DevExpress.MOD_VIZ_CHARTS = true
}