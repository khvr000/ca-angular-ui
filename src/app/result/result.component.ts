import { Component, OnInit } from '@angular/core';
import { AmChartsService} from '@amcharts/amcharts3-angular';
import {CAChartConfig} from '../global/chartConfig';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

   pieChart1: any;
   pieChart2: any;
   stockChart1: any;
   finalStockTestData = [];
   chartData1 = [];
   chartData2 = [];
   chartData3 = [];
   chartData4 = [];

   pieChartDataSet1 = [{
        sentiment: 'Positive',
        value: 260,
        color: '#00B333'},
        {
            sentiment: 'Negative',
            value: 201,
            color: '#DA0000'},
        {
            sentiment: 'Neutral',
            value: 65,
            color: '#3563B6'},
        {
            sentiment: 'Mixed',
            value: 39,
            color: '#FF7F00'}];


    pieChartDataSet2 = [{
        sentiment: 'Positive',
        value: 140,
        color: '#00B333'},
        {
            sentiment: 'Negative',
            value: 98,
            color: '#DA0000'},
        {
            sentiment: 'Neutral',
            value: 140,
            color: '#3563B6'},
        {
            sentiment: 'Mixed',
            value: 139,
            color: '#FF7F00'}];

    stockChartDataSet1 = [{"date":"2018-12-04","Dec 04, 2018 - Dec 10, 2018":0,"Nov 27, 2018 - Dec 03, 2018":0},
        {"date":"2018-12-05","Dec 04, 2018 - Dec 10, 2018":0,"Nov 27, 2018 - Dec 03, 2018":0},
        {"date":"2018-12-06","Dec 04, 2018 - Dec 10, 2018":3959.54,"Nov 27, 2018 - Dec 03, 2018":0},
        {"date":"2018-12-07","Dec 04, 2018 - Dec 10, 2018":0,"Nov 27, 2018 - Dec 03, 2018":5234376325.56},
        {"date":"2018-12-08","Dec 04, 2018 - Dec 10, 2018":0,"Nov 27, 2018 - Dec 03, 2018":0},
        {"date":"2018-12-09","Dec 04, 2018 - Dec 10, 2018":0,"Nov 27, 2018 - Dec 03, 2018":0},
        {"date":"2018-12-10","Dec 04, 2018 - Dec 10, 2018":0,"Nov 27, 2018 - Dec 03, 2018":0}];


    pieChartConfig1 = {
        'type': 'pie',
        'dataProvider': this.pieChartDataSet1,
        'addClassNames': true,
        'marginLeft': -10,
        'labelRadius': -22,
        'percentPrecision': 1,
        'precision': -1,
        'startAngle': 0,
        'valueField': 'value',
        'titleField':  'sentiment',
        'outlineColor': '#FFFFFF',
        'outlineAlpha': 0.8,
        'outlineThickness': 2,
        'depth3D': 15,
        'angle': 30,
        'colorField': CAChartConfig.chartConfig['piecchartcommon']['colorField'],
        labelsEnabled: false,
        'autoMargins': CAChartConfig.chartConfig['piecchartcommon']['autoMargins'],
        'radius': CAChartConfig.chartConfig['piecchartcommon']['radius'],
        'hideCredits': true,
    };



    pieChartConfig2 = {
        'type': 'pie',
        'dataProvider': this.pieChartDataSet1,
        'addClassNames': true,
        'marginLeft': -10,
        'labelRadius': -22,
        'percentPrecision': 1,
        'precision': -1,
        'startAngle': 0,
        'valueField': 'value',
        'titleField':  'sentiment',
        'outlineColor': '#FFFFFF',
            // 'outlineAlpha': 0.8,
            // 'outlineThickness': 2,
            // 'depth3D': 15,
            // 'angle': 30,
        'colorField': CAChartConfig.chartConfig['piecchartcommon']['colorField'],
        labelsEnabled: false,
        'autoMargins': CAChartConfig.chartConfig['piecchartcommon']['autoMargins'],
        'radius': '23%',
        'innerRadius': CAChartConfig.chartConfig['piecchartcommon']['innerRadius'],

        'hideCredits': true,
    };


    constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {
      this.pieChart1 = this.AmCharts.makeChart('piediv1', this.pieChartConfig1);
      this.pieChart2 = this.AmCharts.makeChart('piediv2', this.pieChartConfig2);
      this.loadPieDataSet2();
      // this.setStockChart();

      // STOCK CHARTS
      this.drawStockCharts();
  }


  drawStockCharts() {

      this.generateChartData1();

      var newStockChartConfig = {
          type: "stock",
          "theme": "none",
          dataSets: [{
              fieldMappings: [{
                  fromField: "value1",
                  toField: "value"
              }],

              color: "#7f8da9",
              dataProvider: this.finalStockTestData,
              title: "West Stock",
              categoryField: "date"
          }, {
              fieldMappings: [{
                  fromField: "value2",
                  toField: "value"
              }],
              color: "#fac314",
              dataProvider: this.finalStockTestData,
              compared: true,
              title: "East Stock",
              categoryField: "date"
          }],
          panels: [{
              title: "Value",
              showCategoryAxis: false,
              percentHeight: 70,
              valueAxes: [{
                  dashLength: 5
              }],

              categoryAxis: {
                  dashLength: 5
              },

              stockGraphs: [{
                  id: "g1",
                  type: "smoothedLine",
                  compareGraphType: "smoothedLine",
                  valueField: "value",
                  lineColor: "#7f8da9",
                  lineThickness: 2,
                  compareGraphLineThickness: 2,
                  comparable: true,
                  compareField: "value"
              }],

              stockLegend: {
                  valueTextRegular: undefined,
                  periodValueTextComparing: "[[percents.value.close]]%"
              }
             }
           ],
          chartScrollbarSettings: {

              graph: "g1",
              graphType: "line",
              usePeriod: "WW"
          },
          periodSelector: {
              position: "bottom",
              periods: [{
                  period: "DD",
                  count: 10,
                  label: "10 days"
              }, {
                  period: "MM",
                  selected: true,
                  count: 1,
                  label: "1 month"
              }, {
                  period: "YYYY",
                  count: 1,
                  label: "1 year"
              }, {
                  period: "YTD",
                  label: "YTD"
              }, {
                  period: "MAX",
                  label: "MAX"
              }]
          }
      }

      this.stockChart1 = this.AmCharts.makeChart('stockdiv1', newStockChartConfig);

  }

    generateChartData1() {
        var firstDate = new Date();
        firstDate.setHours(0, 0, 0, 0);
        firstDate.setDate(firstDate.getDate() - 2000);

        for (var i = 0; i < 2000; i++) {
            var newDate = new Date(firstDate);

            newDate.setDate(newDate.getDate() + i);

            var open = Math.round(Math.random() * (30) + 100);
            var value1 = open + Math.round(Math.random() * (15) - Math.random() * 10);
            var value2 = Math.round(Math.random() * (30) + 100);

            this.finalStockTestData[i] = ({
                date: newDate,
                value1: value1,
                value2: value2
            });
        }
    }

  loadPieDataSet2() {
      setTimeout(() => {
          this.AmCharts.updateChart(this.pieChart1, () => {
              // Change whatever properties you want
              this.pieChart1.dataProvider = this.pieChartDataSet2;
          });

          this.AmCharts.updateChart(this.pieChart2, () => {
              // Change whatever properties you want
              this.pieChart2.dataProvider = this.pieChartDataSet2;
          });

          this.loadPieDataSet1();
      }, 3000);
  }
  loadPieDataSet1 () {
      setTimeout(() => {
          this.AmCharts.updateChart(this.pieChart1, () => {
              // Change whatever properties you want
              this.pieChart1.dataProvider = this.pieChartDataSet1;
          });

          this.AmCharts.updateChart(this.pieChart2, () => {
              // Change whatever properties you want
              this.pieChart2.dataProvider = this.pieChartDataSet1;
          });


          this.loadPieDataSet2();
      }, 3000);
  }

}
