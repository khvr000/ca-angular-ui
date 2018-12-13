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




// stacked bar chart ...



var barChartConfig1 = {
    "type": "serial",
    "theme": "none",
    "legend": {
        "horizontalGap": 10,
        "maxColumns": 1,
        "position": "right",
        "useGraphSettings": true,
        "markerSize": 10
    },
    "dataProvider": [{
        "year": 2003,
        "europe": 2.5,
        "namerica": 2.5,
        "asia": 2.1,
        "lamerica": 0.3,
        "meast": 0.2,
        "africa": 0.1
    }, {
        "year": 2004,
        "europe": 2.6,
        "namerica": 2.7,
        "asia": 2.2,
        "lamerica": 0.3,
        "meast": 0.3,
        "africa": 0.1
    }, {
        "year": 2005,
        "europe": 2.8,
        "namerica": 2.9,
        "asia": 2.4,
        "lamerica": 0.3,
        "meast": 0.3,
        "africa": 0.1
    }],
    "valueAxes": [{
        "stackType": "regular",
        "axisAlpha": 0.3,
        "gridAlpha": 0
    }],
    "graphs": [{
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
        "fillAlphas": 0.8,
        "labelText": "[[value]]",
        "lineAlpha": 0.3,
        "title": "Europe",
        "type": "column",
        "color": "#000000",
        "valueField": "europe"
    }, {
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
        "fillAlphas": 0.8,
        "labelText": "[[value]]",
        "lineAlpha": 0.3,
        "title": "North America",
        "type": "column",
        "color": "#000000",
        "valueField": "namerica"
    }, {
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
        "fillAlphas": 0.8,
        "labelText": "[[value]]",
        "lineAlpha": 0.3,
        "title": "Asia-Pacific",
        "type": "column",
        "color": "#000000",
        "valueField": "asia"
    }, {
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
        "fillAlphas": 0.8,
        "labelText": "[[value]]",
        "lineAlpha": 0.3,
        "title": "Latin America",
        "type": "column",
        "color": "#000000",
        "valueField": "lamerica"
    }, {
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
        "fillAlphas": 0.8,
        "labelText": "[[value]]",
        "lineAlpha": 0.3,
        "title": "Middle-East",
        "type": "column",
        "color": "#000000",
        "valueField": "meast"
    }, {
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
        "fillAlphas": 0.8,
        "labelText": "[[value]]",
        "lineAlpha": 0.3,
        "title": "Africa",
        "type": "column",
        "color": "#000000",
        "valueField": "africa"
    }],
    "categoryField": "year",
    "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "position": "left"
    },
    "export": {
        "enabled": true
    }

}