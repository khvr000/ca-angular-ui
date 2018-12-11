export class CAChartConfig {

    public static chartConfig = {
        ['piecchartcommon']: {
            'valueField': 'y',
            'titleField': 'x',
            'colorField': 'color',
            'type': 'pie',
            'balloon': {
                'fillAlpha': 0,
                'enabled': false,
                'showBullet': false,
            },
            'export': {
                'enabled': true
            },
            'chartScrollbar': {
                'enabled': false,
            },
            'chartCursor': {
                'oneBalloonOnly': true
            },
            'categoryAxis': {},
            'valueAxes': [],
            'labelsEnabled': false,
            'autoMargins': false,
            'radius': '28%',
            'innerRadius': '60%',
            'legend': {
                'marginRight': 0,
                'marginLeft': 5,
                'divId': '',
                'autoMargins': false,
                'valueWidth': 200,
                'markerLabelGap': 10,
                'labelText': '[[title]]',
                'valueText': '[[value]]',
                'width': '100%',
            },
            'colors': ['#00A5C8', '#2164B2', '#8BD3C7', '#5E5AC8', '#519F45', '#C8C8C5'],
        },
        ['stock']: {
            'type': 'stock',
            'theme': 'light',
            'panelsSettings': {
                'marginRight': 15
            },
            'panels': [{
                'showCategoryAxis': true,
                'eraseAll': false,

                'stockLegend': {
                    // "position": "absolute",
                    'top': 300,
                    'valueTextRegular': ' ',
                    'markerType': 'circle',
                    'fontSize': 14,
                    'labelText': '[[title]]',
                    'equalWidths': true,
                    'color': '#28323B'
                },

                'drawingIconsEnabled': false
            }],
            'chartScrollbarSettings': {
                'enabled': false
            },
            'chartCursorSettings': {
                'valueBalloonsEnabled': true,
                'cursorAlpha': 0.9,
                'cursorColor': '#a7a9ac',
                'selectionAlpha': 0.5,
                'zoomable': true,
            },
            'categoryAxesSettings': {
                'axisColor': '#000000',
                'minorGridEnabled': false,
                'axisAlpha': 0,
                'gridColor': '#FFFFFF',
                'fontSize': 14,
                'alwaysGroup': true,
                'minPeriod': 'DD'
            },
            'categoryAxis': {
                'parseDates': true
            },
            'valueAxesSettings': {
                'axisColor': '#000000',
                'axisAlpha': 0,
                'integersOnly': false,
                'autoGridCount': false,
                'stackType': 'none',
                'position': 'left',
                'inside': true,
                'unit': '',
                'unitPosition': 'left',
                'fontSize': 14
            },
            'export': {
                'enabled': false,

            },
        }
    };

}
