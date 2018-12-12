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
   stockChart2: any;
   finalStockTestData = [];
   finalStockTestData2 = [];
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

      // LIVE DATA STOCK CHARTS
      this.drawLiveStockChart();
  }


  drawStockCharts() {

      this.generateChartDataStatic();

      var newStockChartConfig = {
          type: "stock",
          "theme": "none",
          dataSets: [{
              fieldMappings: [{
                  fromField: "value1",
                  toField: "value"
              }],

              color: "#00B333",
              dataProvider: this.finalStockTestData,
              title: "Positive",
              categoryField: "date"
          }, {
              fieldMappings: [{
                  fromField: "value2",
                  toField: "value"
              }],
              color: "#DA0000",
              dataProvider: this.finalStockTestData,
              compared: true,
              title: "Negative",
              categoryField: "date"
          }, {
              fieldMappings: [{
                  fromField: "value3",
                  toField: "value"
              }],
              color: "#3563B6",
              dataProvider: this.finalStockTestData,
              compared: true,
              title: "Neutral",
              categoryField: "date"
          }, {
              fieldMappings: [{
                  fromField: "value4",
                  toField: "value"
              }],
              color: "#FF7F00",
              dataProvider: this.finalStockTestData,
              compared: true,
              title: "Mixed",
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
      setTimeout(() => {
          this.AmCharts.updateChart(this.stockChart1, () => {
              // Change whatever properties you want
              var newData = this.generateChartData1NewSet(1);
              this.stockChart1.dataSets[1].dataProvider = newData;
              this.stockChart1.dataSets[0].dataProvider = newData;
          });
          this.stockSetTimeOut();
      }, 5000);
  }

    stockSetTimeOut() {
        setTimeout(() => {
            this.AmCharts.updateChart(this.stockChart1, () => {
                // Change whatever properties you want
                var newData = this.generateChartData1NewSet(2);
                this.stockChart1.dataSets[1].dataProvider = newData;
                this.stockChart1.dataSets[0].dataProvider = newData;
            });
        }, 5000);
    }

    generateChartDataStatic() {
        var firstDate = new Date();
        firstDate.setHours(0, 0, 0, 0);
        firstDate.setDate(firstDate.getDate() - 10);

        for (var i = 0; i < 10; i++) {
            var newDate = new Date(firstDate);

            newDate.setDate(newDate.getDate() + i);

            var open = Math.round(Math.random() * (30) + 100);
            var value1 = open + Math.round(Math.random() * (15) - Math.random() * 10);
            var value2 = Math.round(Math.random() * (30) + 100);
            var value3 = open + Math.round(Math.random() * (60) + 80);
            var value4 = Math.round(Math.random() * (45) + 60);

            this.finalStockTestData[i] = ({
                date: newDate,
                value1: value1,
                value2: value2,
                value3: value3,
                value4: value4,
            });
        }
    }

    generateChartData1NewSet (p) {
        var firstDate = new Date();
        firstDate.setHours(0, 0, 0, 0);
        firstDate.setDate(firstDate.getDate() + p);

        for (var i = 0; i < 1; i++) {
            var newDate = new Date(firstDate);

            newDate.setDate(newDate.getDate() + i);

            var open = Math.round(Math.random() * (30) + 100);
            var value1 = open + Math.round(Math.random() * (15) - Math.random() * 10);
            var value2 = Math.round(Math.random() * (30) + 100);
            var a = {
                date: newDate,
                value1: value1,
                value2: value2}
            };
            this.finalStockTestData2 = JSON.parse(JSON.stringify(this.finalStockTestData));
            this.finalStockTestData2.push(a);
             return this.finalStockTestData2;
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


   drawLiveStockChart() {

        this.generateChartData();
        var liveStockChartConfig = {
            "type": "stock",
            "theme": "light",

            // This will keep the selection at the end across data updates
            "glueToTheEnd": true,

            // Defining data sets
            "dataSets": [ {
                "title": "first data set",
                "fieldMappings": [ {
                    "fromField": "value",
                    "toField": "value"
                }, {
                    "fromField": "volume",
                    "toField": "volume"
                } ],
                "dataProvider": this.chartData1,
                "categoryField": "date"
            }, {
                "title": "second data set",
                "fieldMappings": [ {
                    "fromField": "value",
                    "toField": "value"
                }, {
                    "fromField": "volume",
                    "toField": "volume"
                } ],
                "dataProvider": this.chartData2,
                "categoryField": "date"
            }, {
                "title": "third data set",
                "fieldMappings": [ {
                    "fromField": "value",
                    "toField": "value"
                }, {
                    "fromField": "volume",
                    "toField": "volume"
                } ],
                "dataProvider": this.chartData3,
                "categoryField": "date"
            }, {
                "title": "fourth data set",
                "fieldMappings": [ {
                    "fromField": "value",
                    "toField": "value"
                }, {
                    "fromField": "volume",
                    "toField": "volume"
                } ],
                "dataProvider": this.chartData4,
                "categoryField": "date"
            } ],

            // Panels
            "panels": [ {
                "showCategoryAxis": false,
                "title": "Value",
                "percentHeight": 60,
                "stockGraphs": [ {
                    "id": "g1",
                    "valueField": "value",
                    "comparable": true,
                    "compareField": "value"
                } ],
                "stockLegend": {}
            }, {
                "title": "Volume",
                "percentHeight": 40,
                "stockGraphs": [ {
                    "valueField": "volume",
                    "type": "column",
                    "showBalloon": false,
                    "fillAlphas": 1
                } ],
                "stockLegend": {}
            } ],

            // Scrollbar settings
            "chartScrollbarSettings": {
                "graph": "g1",
                "usePeriod": "WW"
            },

            // Period Selector
            "periodSelector": {
                "position": "left",
                "periods": [ {
                    "period": "DD",
                    "count": 10,
                    "label": "10 days"
                }, {
                    "period": "MM",
                    "selected": true,
                    "count": 1,
                    "label": "1 month"
                }, {
                    "period": "YYYY",
                    "count": 1,
                    "label": "1 year"
                }, {
                    "period": "YTD",
                    "label": "YTD"
                }, {
                    "period": "MAX",
                    "label": "MAX"
                } ]
            },

            // Data Set Selector
            "dataSetSelector": {
                "position": "left"
            },

            // Event listeners
            "listeners": [ {
                "event": "rendered",
                "method": function( event ) {
                    this.stockChart2.mouseDown = false;
                    this.stockChart2.containerDiv.onmousedown = function() {
                        this.stockChart2.mouseDown = true;
                    }
                    this.stockChart2.containerDiv.onmouseup = function() {
                        this.stockChart2.mouseDown = false;
                    }
                }
            } ]
        }

       // this.stockChart2 = this.AmCharts.makeChart('stockdiv2', liveStockChartConfig);

   }

    generateChartData() {
        var firstDate = new Date();
        firstDate.setDate( firstDate.getDate() - 500 );
        firstDate.setHours( 0, 0, 0, 0 );

        for ( var i = 0; i < 500; i++ ) {
            var newDate = new Date( firstDate );
            newDate.setDate( newDate.getDate() + i );

            var a1 = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
            var b1 = Math.round( Math.random() * ( 1000 + i ) ) + 500 + i * 2;

            var a2 = Math.round( Math.random() * ( 100 + i ) ) + 200 + i;
            var b2 = Math.round( Math.random() * ( 1000 + i ) ) + 600 + i * 2;

            var a3 = Math.round( Math.random() * ( 100 + i ) ) + 200;
            var b3 = Math.round( Math.random() * ( 1000 + i ) ) + 600 + i * 2;

            var a4 = Math.round( Math.random() * ( 100 + i ) ) + 200 + i;
            var b4 = Math.round( Math.random() * ( 100 + i ) ) + 600 + i;

            this.chartData1.push( {
                "date": newDate,
                "value": a1,
                "volume": b1
            } );
            this.chartData2.push( {
                "date": newDate,
                "value": a2,
                "volume": b2
            } );
            this.chartData3.push( {
                "date": newDate,
                "value": a3,
                "volume": b3
            } );
            this.chartData4.push( {
                "date": newDate,
                "value": a4,
                "volume": b4
            } );
        }
    }
}
