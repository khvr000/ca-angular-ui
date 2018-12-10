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
            'radius': '42%',
            // 'innerRadius': '70%',
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
    }

}
