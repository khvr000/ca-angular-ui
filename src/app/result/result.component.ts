import {Component, OnDestroy, OnInit} from '@angular/core';
import { AmChartsService} from '@amcharts/amcharts3-angular';
import {CAChartConfig} from '../global/chartConfig';
import {ActivatedRoute} from "@angular/router";
import {ResultService} from "../_services/result.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

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
   jobId : string;
   reload: boolean;
   refreshIntervalId: any;

   pieChartDataSet1 = [
       {
           'sentiment': 'positive',
           'value': '0.0759440101828659'
       },
       {
           'sentiment': 'negative',
           'value': '1.2069939565844834'
       },
       {
           'sentiment': 'neutral',
           'value': '3.498561769723892'
       },
       {
           'sentiment': 'mixed',
           'value': '0.21850025688763708'
       }
   ]


    pieChartDataSet2 = [
        {
            'sentiment': 'positive',
            'value': '0.8584888086043065'
        },
        {
            'sentiment': 'negative',
            'value': '1.3825850707653444'
        },
        {
            'sentiment': 'neutral',
            'value': '7.518721833825111'
        },
        {
            'sentiment': 'mixed',
            'value': '0.24020433775149286'
        }
    ];


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



    constructor(private AmCharts: AmChartsService,private route: ActivatedRoute,
                private resultService: ResultService) {
        this.route.params.subscribe( params => {
                this.jobId = params['id'];
            }
        );
    }

  ngOnInit() {

      // this.pieChart1 = this.AmCharts.makeChart('piediv1', this.pieChartConfig1);
      // this.pieChart2 = this.AmCharts.makeChart('piediv2', this.pieChartConfig2);
      this.loadPieDataSet2();
      // this.setStockChart();

      // STOCK CHARTS
      // this.drawStockCharts();

      // LIVE DATA STOCK CHARTS
      this.drawLiveStockChart();



       // main functinality

      this.drawAllCharts();

      this.refreshIntervalId = setInterval(() => {
          this.reDrawAllCharts();
      }, 10000);


  }

  drawAllCharts() {
        this.drawFirstPieChartData();

  }

  reDrawAllCharts() {
        this.redrawFirstPieChart();
  }

  drawFirstPieChartData () {
     this.resultService.getFirstPieChartData(this.jobId).subscribe(res => {
         var newFetchedData = res['body'];
         this.pieChart1 = this.AmCharts.makeChart('piediv1', this.pieChartConfig1);
         console.log(res);
     });

  }

  redrawFirstPieChart() {
      this.resultService.getFirstPieChartData(this.jobId).subscribe(res => {
          let newFetchedData = res['body'];
          console.log(res);
          this.AmCharts.updateChart(this.pieChart1, () => {
              // Change whatever properties you want
              this.pieChart1.dataProvider = newFetchedData;
          });

      });
  }

  fetchSecondPieChartData () {
        this.resultService.getFirstPieChartData(this.jobId).subscribe(res => {

        });
    }

  drawStockCharts() {

      this.generateChartDataStatic();

      var newStockChartConfig = {
          type: "stock",
          "theme": "none",
          dataSets: [{
              fieldMappings: [{
                  fromField: "positive",
                  toField: "value"
              }],

              color: "#00B333",
              dataProvider: this.finalStockTestData,
              title: "Positive",
              categoryField: "date"
          }, {
              fieldMappings: [{
                  fromField: "negative",
                  toField: "value"
              }],
              color: "#DA0000",
              dataProvider: this.finalStockTestData,
              compared: true,
              title: "Negative",
              categoryField: "date"
          }, {
              fieldMappings: [{
                  fromField: "neutral",
                  toField: "value"
              }],
              color: "#3563B6",
              dataProvider: this.finalStockTestData,
              compared: true,
              title: "Neutral",
              categoryField: "date"
          }, {
              fieldMappings: [{
                  fromField: "mixed",
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
                  // type: "smoothedLine",
                  // compareGraphType: "smoothedLine",
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
          // periodSelector: {
          //     position: "bottom",
          //     periods: [{
          //         period: "DD",
          //         count: 10,
          //         label: "10 days"
          //     }, {
          //         period: "MM",
          //         selected: true,
          //         count: 1,
          //         label: "1 month"
          //     }, {
          //         period: "YYYY",
          //         count: 1,
          //         label: "1 year"
          //     }, {
          //         period: "YTD",
          //         label: "YTD"
          //     }, {
          //         period: "MAX",
          //         label: "MAX"
          //     }]
          // }
      }

      this.stockChart1 = this.AmCharts.makeChart('stockdiv1', newStockChartConfig);
        var p = 1;
      setInterval(() => {
          var newData = this.generateChartData1NewSet(p);
          this.AmCharts.updateChart(this.stockChart1, () => {
              // Change whatever properties you want
              this.stockChart1.dataSets[1].dataProvider = newData;
              this.stockChart1.dataSets[0].dataProvider = newData;
              this.stockChart1.dataSets[2].dataProvider = newData;
              this.stockChart1.dataSets[3].dataProvider = newData;
          });
          // this.stockSetTimeOut();
          p = p+1;
      }, 2000);
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
        // firstDate.setHours(0, 0, 0, 0);
        firstDate.setDate(firstDate.getDate() - 12);

        for (var i = 0; i < 10; i++) {
            var newDate = new Date(firstDate);

            newDate.setDate(newDate.getDate() + i);
            var value1 = Math.random();
            var value2 = Math.random();
            var value3 = Math.random();
            var value4 = Math.random();

            this.finalStockTestData[i] = ({
                date: newDate,
                positive: value1,
                negative: value2,
                neutral: value3,
                mixed: value4,
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

            var value1 = Math.random();
            var value2 = Math.random();
            var value3 = Math.random();
            var value4 = Math.random();
            var a = {
                date: newDate,
                positive: value1,
                negative: value2,
                neutral: value3,
                mixed: value4,}
            };
            this.finalStockTestData2 = JSON.parse(JSON.stringify(this.finalStockTestData));
            this.finalStockTestData2.push(a);
            this.finalStockTestData2.shift();
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
                } ],
                "dataProvider": this.chartData1,
                "categoryField": "date"
            }, {
                "title": "second data set",
                "fieldMappings": [ {
                    "fromField": "value",
                    "toField": "value"
                }],
                "dataProvider": this.chartData2,
                "categoryField": "date"
            }, {
                "title": "third data set",
                "fieldMappings": [ {
                    "fromField": "value",
                    "toField": "value"
                }],
                "dataProvider": this.chartData3,
                "categoryField": "date"
            }, {
                "title": "fourth data set",
                "fieldMappings": [ {
                    "fromField": "value",
                    "toField": "value"
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
                    "comparable": true
                } ],
                "stockLegend": {}
            } ],

            // Scrollbar settings
            "chartScrollbarSettings": {
                "graph": "g1",
                "usePeriod": "DD"
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
            // "listeners": [ {
            //     "event": "rendered",
            //     "method": function( event ) {
            //         this.stockChart2.mouseDown = false;
            //         this.stockChart2.containerDiv.onmousedown = function() {
            //             this.stockChart2.mouseDown = true;
            //         }
            //         this.stockChart2.containerDiv.onmouseup = function() {
            //             this.stockChart2.mouseDown = false;
            //         }
            //     }
            // } ]
        }
        var chart = this.AmCharts.makeChart('stockdiv2',liveStockChartConfig)

       setInterval( () => {

           // if mouse is down, stop all updates
           if ( chart.mouseDown )
               return;

           // normally you would load new datapoints here,
           // but we will just generate some random values
           // and remove the value from the beginning so that
           // we get nice sliding graph feeling

           // remove datapoint from the beginning
           // chartData1.shift();
           //chartData2.shift();
           //chartData3.shift();
           // chartData4.shift();

           // add new datapoint at the end
           var newDate = new Date( this.chartData1[ this.chartData1.length - 1 ].date );
           newDate.setDate( newDate.getDate() + 1 );

           var i = this.chartData1.length;

           var a1 = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
           var b1 = Math.round( Math.random() * ( 1000 + i ) ) + 500 + i * 2;

           var a2 = Math.round( Math.random() * ( 100 + i ) ) + 200 + i;
           var b2 = Math.round( Math.random() * ( 1000 + i ) ) + 600 + i * 2;

           var a3 = Math.round( Math.random() * ( 100 + i ) ) + 200;
           var b3 = Math.round( Math.random() * ( 1000 + i ) ) + 600 + i * 2;

           var a4 = Math.round( Math.random() * ( 100 + i ) ) + 200 + i;
           var b4 = Math.round( Math.random() * ( 100 + i ) ) + 600 + i;

           chart.dataSets[ 0 ].dataProvider.push( {
               date: newDate,
               value: a1
           } );
           chart.dataSets[ 1 ].dataProvider.push( {
               date: newDate,
               value: a2
           } );
           chart.dataSets[ 2 ].dataProvider.push( {
               date: newDate,
               value: a3
           } );
           chart.dataSets[ 3 ].dataProvider.push( {
               date: newDate,
               value: a4
           } );

           chart.validateData();
       }, 1000 );

       // this.stockChart2 = this.AmCharts.makeChart('stockdiv2', liveStockChartConfig);

   }

    generateChartData() {
        var firstDate = new Date();
        // const startDate = moment(dateF).set({hour: 0, minute: 0, second: 0, millisecond: 0}).format(this.chartDateFormat);
        firstDate.setDate( firstDate.getDate() - 10 );
        firstDate.setHours( 0, 0, 0, 0 );

        for ( var i = 0; i < 10; i++ ) {
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
                "value": a1
            } );
            this.chartData2.push( {
                "date": newDate,
                "value": a2
            } );
            this.chartData3.push( {
                "date": newDate,
                "value": a3
            } );
            this.chartData4.push( {
                "date": newDate,
                "value": a4
            } );
        }
    }




    ngOnDestroy() {
        clearInterval(this.refreshIntervalId);
        this.pieChart1.clear();
    }

}



