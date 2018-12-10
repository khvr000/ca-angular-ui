import { Component, OnInit } from '@angular/core';
import {AmChart, AmChartsService} from '@amcharts/amcharts3-angular';
import {CAChartConfig} from "../global/chartConfig";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

   chart: any;
  chartData = [{
        country: "Lithuania",
        value: 260},
        {
            country: "Ireland",
            value: 201},
        {
            country: "Germany",
            value: 65},
        {
            country: "Australia",
            value: 39},
        {
            country: "UK",
            value: 19},
        {
            country: "Latvia",
            value: 10}];


    constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {

      var chart;
      var legend;

      var chartConfig = {
          'type': 'pie',
          'dataProvider': this.chartData,
          'addClassNames': true,
          'marginLeft': -10,
          'labelRadius': -22,
          'percentPrecision': 1,
          'precision': -1,
          // 'chartScrollbar': AlacritiReportsChartConfig.chartConfig['piecchartcommon']['chartScrollbar'],
          // 'chartCursor': AlacritiReportsChartConfig.chartConfig['piecchartcommon']['chartCursor'],
          'startAngle': 0,
          'valueField': "value",
          'titleField':  "country",
          'outlineColor': "#FFFFFF",
          'outlineAlpha': 0.8,
          'outlineThickness': 2,
          'depth3D': 15,
          'angle': 30,
          'colorField': CAChartConfig.chartConfig['piecchartcommon']['colorField'],
          labelsEnabled: false,
          'autoMargins': CAChartConfig.chartConfig['piecchartcommon']['autoMargins'],
          'radius': CAChartConfig.chartConfig['piecchartcommon']['radius'],
      };
      var configChart1 = {}
      configChart1['dataProvider'] = this.chartData;
      configChart1['titleField'] = "country";
      configChart1['valueField'] = "value";
      configChart1['outlineColor'] = "#FFFFFF";
      configChart1['outlineAlpha'] = 0.8;
      configChart1['outlineThickness'] =  2;
      configChart1['depth3D'] = 15
      configChart1['angle'] = 30

      this.chart = this.AmCharts.makeChart('chartdiv1', chartConfig);
      this.chart = this.AmCharts.makeChart('chartdiv2', chartConfig);
  }

}
