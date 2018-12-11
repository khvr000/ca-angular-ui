import {CAChartConfig} from "../global/chartConfig";

var activityChartConfig = JSON.parse(JSON.stringify(CAChartConfig.chartConfig['stock']));
// var stockGraphBody = {
//     'title': legends[test],
//     'valueField': [],
//     'useDataSetColors': false,
//     'lineColor': colors[test],
//     'balloonFunction': funcArray[test],
//     'lineThickness': 3,
//     'periodValue': 'Sum'
// };
var stockGraphs = [];
var colors = ['#2164B2', '#777', '#b0de09'];
var valueFileds = ['y','y1'];
var legends = [];
var fieldMappings = [];
var panels = activityChartConfig['panels'];
var dataSetBody = {
    'color': '#b0de09'
};
dataSetBody['categoryField'] = 'date';
let testLength = 2;
for (var test = 0; test < testLength; test++) {
    fieldMappings.push({
        'fromField': valueFileds[test],
        'toField': valueFileds[test]
    });
    var stockGraphBody = {};
    stockGraphBody = {
        'title': 'Test',
        'valueField': valueFileds[test],
        'useDataSetColors': false,
        'lineColor': colors[test],
        // 'balloonFunction': customerBalloonFunc[test],
        'lineThickness': 3,
        'periodValue': 'Sum'
    };
    stockGraphs.push(stockGraphBody);
}
dataSetBody['fieldMappings'] = fieldMappings;
dataSetBody['dataProvider'] = this.stockChartDataSet1;
panels[0]['titles'] = {

    'text': '',
    'id': 'hideText',
    'size': 14,
    'bold': false

};
panels[0]['stockGraphs'] = stockGraphs;
panels[0]['gridAboveGraphs'] = true;
var stcokChartConfig1 = {
    'type': activityChartConfig['type'],
    'theme': activityChartConfig['theme'],
    'dataSets': [dataSetBody],
    'panels': panels,
    // 'legend': this.chartDiv + 'legenddiv',
    'chartScrollbarSettings': activityChartConfig['chartScrollbarSettings'],
    'chartCursorSettings': activityChartConfig['chartCursorSettings'],
    'categoryAxesSettings': {
        // 'groupToPeriods': JSON.parse(JSON.stringify('DD')),
        'axisColor': '#000000',
        'minorGridEnabled': false,
        'axisAlpha': 0,
        'gridColor': '#FFFFFF',
        'fontSize': 14,
        'alwaysGroup': true,
        'minPeriod': 'DD',
        'boldPeriodBeginning': false
    },
    'allLabels': [{
        'text': 'Free label',
        'bold': true,
    }],
    'dataDateFormat': 'YYYY-MM-DD JJ:NN',
    'valueAxesSettings': activityChartConfig['valueAxesSettings'],
    'panelsSettings': activityChartConfig['panelsSettings'],
    'export': {
        'enabled': false,
        menu: [{
            'class': 'export-main',
            menu: [{
                format: 'JPG',
                label: 'JPG'
            }, {
                format: 'PNG',
                label: 'PNG'
            }, {
                format: 'SVG',
                label: 'SVG'
            }]
        }],


    }
};