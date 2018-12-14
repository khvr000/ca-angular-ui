import {Component, OnDestroy, OnInit} from '@angular/core';
import { AmChartsService} from '@amcharts/amcharts3-angular';
import {CAChartConfig} from '../global/chartConfig';
import {ActivatedRoute} from "@angular/router";
import {ResultService} from "../_services/result.service";




import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
import am4themes_dataviz from "@amcharts/amcharts4/themes/animated";
// am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_dataviz);



// // @ts-ignore
// import * as am4core from "@amcharts/amcharts4/core";
// // @ts-ignore
// import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
//
// am4core.useTheme(am4themes_animated);



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

   pieChart1: any;
   pieChart2: any;
    pieChart3: any;
   barChart1: any;
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
   pieChart1Loaded =  false;
   pieChart2Loaded =  false;
   pieChart3Loaded = false;
   barStackedChartLoaded = false;
   refreshIntervalPie: any;
   refreshIntervalBar: any;

   pieChartDataSet1 = [
       {
           'sentiment': 'positive',
           'value': '1.759440101828659',
           'color': '#669900'
       },
       {
           'sentiment': 'negative',
           'value': '1.2069939565844834',
           'color': '#cc0000'
       },
       {
           'sentiment': 'mixed',
           'value': '0.21850025688763708',
           'color': '#ffcc66'
       }
   ]


    pieChartDataSet2 = [
        {
            'sentiment': 'positive',
            'value': '0.8584888086043065',
            'color': '#70ad47'
        },
        {
            'sentiment': 'negative',
            'value': '1.3825850707653444',
            'color': '#f5422e'
        },
        {
            'sentiment': 'mixed',
            'value': '0.24020433775149286',
            'color': '#ffcc66'
        }
    ];

    pieChartDataSet3 = [
        {
            'type': 'Real User',
            'value': '0.7584888086043065',
            'color': '#38BEF2'
        },
        {
            'type': 'Bot',
            'value': '0.3825850707653444',
            'color': '#3E718A'
        }
    ];


    pieChartConfig1 = {
        'type': 'pie',
        'dataProvider': [],
        'addClassNames': true,
        'marginLeft': -10,
        'labelRadius': -22,
        'percentPrecision': 1,
        'precision': -1,
        'startAngle': 0,
        'valueField': 'value',
        'titleField':  'sentiment',
        'outlineColor': '#FFFFFF',
        'legend': {
            'position': 'bottom',
            'align': 'left',
            'marginRight': 5,
            'autoMargins': false,
            'labelText': '[[title]]',
            'valueText': '[[value]]',
            'equalWidths': true,
            'valueWidth': 60,
            'labelWidth': 60,
            'forceWidth': true,
            'fontSize': 16
        },
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
        'dataProvider': [],
        'addClassNames': true,
        'marginLeft': -10,
        'labelRadius': -22,
        'percentPrecision': 1,
        'precision': -1,
        'startAngle': 0,
        'valueField': 'value',
        'titleField':  'sentiment',
        'outlineColor': '#FFFFFF',
        'legend': {
            'position': 'bottom',
            'align': 'left',
            'marginRight': 5,
            'autoMargins': false,
            'labelText': '[[title]]',
            'valueText': '[[value]]',
            'equalWidths': true,
            'valueWidth': 60,
            'labelWidth': 60,
            'forceWidth': true,
            'fontSize': 16
        },
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

    pieChartConfig3 = {
        'type': 'pie',
        'dataProvider': [],
        'addClassNames': true,
        'marginLeft': -10,
        'labelRadius': -22,
        'percentPrecision': 1,
        'precision': -1,
        'startAngle': 0,
        'valueField': 'value',
        'titleField':  'type',
        'outlineColor': '#FFFFFF',
        'legend': {
            'position': 'bottom',
            'align': 'left',
            'marginRight': 5,
            'autoMargins': false,
            'labelText': '[[title]]',
            'valueText': '[[value]]',
            'equalWidths': true,
            'valueWidth': 60,
            'labelWidth': 70,
            'forceWidth': true,
            'fontSize': 16
        },
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





    constructor(private AmCharts: AmChartsService,private route: ActivatedRoute,
                private resultService: ResultService) {
        this.route.params.subscribe( params => {
                this.jobId = params['id'];
            }
        );
    }

  ngOnInit() {

        // DUMMY  PIE CHARTS
      // setTimeout(() => {
      //     // this.pieChart1Loaded
      //     this.pieChart1Loaded = true;
      //     this.pieChart2Loaded = true;
      //     this.pieChart3Loaded = true;
      //     this.pieChartConfig1.legend['valueFunction'] = function (dataItem, label) {
      //         let str = '';
      //         const percent = dataItem.percents.toFixed(2);
      //         if (percent === 0 || percent === '0.00') {
      //             str += ' (<0.01%)';
      //         } else {
      //             str += ' (' + percent + '%)';
      //         }
      //         return str;
      //     };
      //
      //     this.pieChartConfig2.legend['valueFunction'] = function (dataItem, label) {
      //         let str = '';
      //         const percent = dataItem.percents.toFixed(2);
      //         if (percent === 0 || percent === '0.00') {
      //             str += ' (<0.01%)';
      //         } else {
      //             str += ' (' + percent + '%)';
      //         }
      //         return str;
      //     };
      //
      //     this.pieChartConfig3.legend['valueFunction'] = function (dataItem, label) {
      //         let str = '';
      //         const percent = dataItem.percents.toFixed(2);
      //         if (percent === 0 || percent === '0.00') {
      //             str += ' (<0.01%)';
      //         } else {
      //             str += ' (' + percent + '%)';
      //         }
      //         return str;
      //     };
      //
      //     this.pieChart1 = this.AmCharts.makeChart('piediv1', this.pieChartConfig1);
      //     this.pieChart2 = this.AmCharts.makeChart('piediv2', this.pieChartConfig2);
      //     this.pieChart3 = this.AmCharts.makeChart('piediv3', this.pieChartConfig3);
      //     // this.loadPieDataSet2();
      // }, 100)


      // BAR charts DUMMY

      // this.testAm4();

      // this.setStockChart();

      // STOCK CHARTS
      // this.drawStockCharts();

      // LIVE DATA STOCK CHARTS
      // this.drawLiveStockChart();



       // MAIN FUNCTIONALITY

      this.drawAllPieCharts();

      this.refreshIntervalPie = setInterval(() => {
          this.reDrawAllPieCharts();
      }, 5000);

    this.drawStackBarChart();


      this.refreshIntervalBar =  setInterval(() => {
          this.redrawStackBarChart();
      }, 30000);

  }


  redrawStackBarChart() {
          // chart.data = dupData;
          this.resultService.getStackBarChartData(this.jobId).subscribe(res => {
              var newStackedBarData = res['body'];
              this.barChart1.data = newStackedBarData;
              this.barChart1.validateData();
          });

  }

    drawStackBarChart() {
        this.resultService.getStackBarChartData(this.jobId).subscribe(res => {
            //draw bar charts
            let chart = am4core.create("bardiv1", am4charts.XYChart);
            this.barChart1 = chart;
            chart.data = res['body'];
            // if (res['body'].length > 0) {
                this.barStackedChartLoaded = true;
                chart.legend = new am4charts.Legend();
                chart.legend.position = "right";

// Create axes
                var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "followersCount";
                categoryAxis.renderer.grid.template.opacity = 0;


                var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
                valueAxis.min = 0;
                valueAxis.renderer.grid.template.opacity = 0;
                valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
                valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
                valueAxis.renderer.ticks.template.length = 10;
                valueAxis.renderer.line.strokeOpacity = 0.5;
                valueAxis.renderer.baseGrid.disabled = true;
                valueAxis.renderer.minGridDistance = 40;
                valueAxis.calculateTotals = true;

// Create series
                // @ts-ignore
                function createSeries(field, name, color) {
                    var series = chart.series.push(new am4charts.ColumnSeries());
                    series.dataFields.valueX = field;
                    series.dataFields.categoryY = "followersCount";
                    series.stacked = true;
                    series.name = name;
                    series.dataFields.valueYShow = "totalPercent";
                    series.columns.template.tooltipText =
                        "{name}: {valueX.totalPercent.formatNumber('#.00')}%";
                    // series.columns.template.fill = color;
                    // // @ts-ignore
                    // series.columns.template.stroke = "#ff5ea0";

                    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
                    labelBullet.locationX = 0.5;
                    labelBullet.label.text = "{valueX.formatNumber('#.00')}";
                    labelBullet.label.fill = am4core.color("#fff");
                    // labelBullet.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
                }

                createSeries("positive", "Positive","#70ad47");
                createSeries("negative", "Negative", "#f5422e");
                createSeries("mixed", "Mixed", "#ffc000");

                chart.scrollbarY = new am4core.Scrollbar();
                this.barChart1 = chart;

                // setTimeout(() => {
                //     // chart.data = dupData;
                //     this.resultService.getStackBarChartData(this.jobId).subscribe(res => {
                //         var newStackedBarData = res['body'];
                //         chart.data = newStackedBarData;
                //         chart.validateData();
                //     })
                // }, 10000);

            // };


        })
    }

  drawAllPieCharts() {
        this.drawFirstPieChartData();
        this.drawSecondPieChartData();
        this.drawThirdPieChartData();
  }

  reDrawAllPieCharts() {
        this.redrawFirstPieChart();
        this.redrawSecondPieChart();
        this.redrawThirdPieChart();
  }



    drawFirstPieChartData () {
     this.resultService.getFirstPieChartData(this.jobId).subscribe(res => {
         var newFetchedData = res['body']['sentimentArray'];
         this.pieChartConfig1.legend['valueFunction'] = function (dataItem, label) {
             let str = '';
             const percent = dataItem.percents.toFixed(2);
             if (percent === 0 || percent === '0.00') {
                 str += ' (<0.01%)';
             } else {
                 str += ' (' + percent + '%)';
             }
             return str;
         };
         this.pieChart1 = this.AmCharts.makeChart('piediv1', this.pieChartConfig1);
         if (newFetchedData.length > 0) {
             this.pieChart1Loaded = true;
         }
     });

  }

    drawSecondPieChartData () {
        this.resultService.getSecondPieChartData(this.jobId).subscribe(res => {
            var newFetchedData = res['body']['sentimentArray'];
            this.pieChart2Loaded = true;
            this.pieChartConfig2.legend['valueFunction'] = function (dataItem, label) {
                let str = '';
                const percent = dataItem.percents.toFixed(2);
                if (percent === 0 || percent === '0.00') {
                    str += ' (<0.01%)';
                } else {
                    str += ' (' + percent + '%)';
                }
                return str;
            };
            this.pieChart2 = this.AmCharts.makeChart('piediv2', this.pieChartConfig2);
            // if (newFetchedData.length > 0) {
            //
            // }
        });

    }

    drawThirdPieChartData () {
        this.resultService.getThirdPieChartData(this.jobId).subscribe(res => {
            var newFetchedData = res['body'];
            this.pieChart3Loaded = true;
            this.pieChartConfig3.legend['valueFunction'] = function (dataItem, label) {
                let str = '';
                const percent = dataItem.percents.toFixed(2);
                if (percent === 0 || percent === '0.00') {
                    str += ' (<0.01%)';
                } else {
                    str += ' (' + percent + '%)';
                }
                return str;
            };
            this.pieChart3 = this.AmCharts.makeChart('piediv3', this.pieChartConfig3);
            // if (newFetchedData.length > 0) {
            //
            // }
        });

    }

    redrawFirstPieChart() {
        this.resultService.getFirstPieChartData(this.jobId).subscribe(res => {
            let newFetchedData = res['body']['sentimentArray'];
            if (newFetchedData.length > 0) {
                this.pieChart1Loaded = true;
            }
            console.log(res);
            if (this.pieChart1) {
                this.AmCharts.updateChart(this.pieChart1, () => {
                    // Change whatever properties you want
                    this.pieChart1.dataProvider = newFetchedData;
                });
            }
        });
    }

    redrawSecondPieChart() {
        this.resultService.getSecondPieChartData(this.jobId).subscribe(res => {
            let newFetchedDataSecondSet = res['body']['sentimentArray'];
            this.AmCharts.updateChart(this.pieChart2, () => {
                // Change whatever properties you want
                this.pieChart2.dataProvider = newFetchedDataSecondSet;
            });

        });
    }

    redrawThirdPieChart() {
        this.resultService.getThirdPieChartData(this.jobId).subscribe(res => {
            let newFetchedDataThirdSet = res['body'];
            // if ()
            this.AmCharts.updateChart(this.pieChart3, () => {
                // Change whatever properties you want
                this.pieChart3.dataProvider = newFetchedDataThirdSet;
            });

        });
    }

    testAm4() {

        setTimeout(() => {
            this.barStackedChartLoaded = true;
            chart.validateData();
        }, 3000);
        // this.barStackedChartLoaded = true;
        // Create chart instance
        let chart = am4core.create("bardiv1", am4charts.XYChart);
        let dupData =   [
            {
                "followersCount": "500-1000",
                "positive": "0.03620039718225598",
                "negative": "5.915166693739593E-4",
                "mixed": "9.349303727503866E-4"
            },
            {
                "followersCount": "5k-20k",
                "positive": "0.8786949515342712",
                "negative": "2.9988877940922976E-4",
                "mixed": "0.005021605174988508"
            },
            {
                "followersCount": "0-50",
                "positive": "0.9382591843605042",
                "negative": "0.004395967116579413",
                "mixed": "0.010882709408178926"
            },
            {
                "followersCount": "50-200",
                "positive": "0.6667218068614602",
                "negative": "0.5084130666218698",
                "mixed": "0.21073180862003937"
            },
            {
                "followersCount": "200-500",
                "positive": "0.06209923420101404",
                "negative": "0.5142109232256189",
                "mixed": "0.13702206229208969"
            }
        ];

// Add data
        // Add data
        chart.data = [{
            "followersCount": "0-100",
            "positive": 0.3,
            "negative": 0.5,
            "mixed": 0.2
        }, {
            "followersCount": "100-200",
            "positive": 0.1,
            "negative": 0.2,
            "mixed": 0.7
        }, {
            "followersCount": "200-500",
            "positive": 0.4,
            "negative": 0.5,
            "mixed": 0.1
        }, {
            "followersCount": "500-1000",
            "positive": 0.6,
            "negative": 0.3,
            "mixed": 0.1
        },{
            "followersCount": "1000-2000",
            "positive": 0.3,
            "negative": 0.5,
            "mixed": 0.2
        }, {
            "followersCount": "2000-20",
            "positive": 0.1,
            "negative": 0.2,
            "mixed": 0.7
        }];
        chart.data = dupData;
        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";

// Create axes
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "followersCount";
        categoryAxis.renderer.grid.template.opacity = 0;


        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.renderer.grid.template.opacity = 0;
        valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
        valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
        valueAxis.renderer.ticks.template.length = 10;
        valueAxis.renderer.line.strokeOpacity = 0.5;
        valueAxis.renderer.baseGrid.disabled = true;
        valueAxis.renderer.minGridDistance = 40;
        valueAxis.calculateTotals = true;

// Create series
        function createSeries(field, name, color) {
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = field;
            series.dataFields.categoryY = "followersCount";
            series.stacked = true;
            series.name = name;
            series.dataFields.valueYShow = "totalPercent";
            series.columns.template.tooltipText =
                "{name}: {valueX.totalPercent.formatNumber('#.00')}%";
            // series.columns.template.fill = color;
            // // @ts-ignore
            // series.columns.template.stroke = "#ff5ea0";

            var labelBullet = series.bullets.push(new am4charts.LabelBullet());
            labelBullet.locationX = 0.5;
            labelBullet.label.text = "{valueX.formatNumber('#.00')}";
            labelBullet.label.fill = am4core.color("#fff");
            // labelBullet.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
        }

        createSeries("positive", "Positive","#70ad47");
        createSeries("negative", "Negative", "#f5422e");
        createSeries("mixed", "Mixed", "#ffc000");

        chart.scrollbarY = new am4core.Scrollbar();
        // setTimeout(() => {
        //     chart.data = dupData;
        //     chart.validateData();
        // }, 10000);

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

        clearInterval(this.refreshIntervalPie);
        clearInterval(this.refreshIntervalBar);
        if (this.pieChart1) {
            this.pieChart1.clear();
        }
        if (this.pieChart2) {
            this.pieChart2.clear();
        }
        if (this.pieChart3) {
            this.pieChart3.clear();
        }
        if (this.barChart1) {
            this.barChart1 = null;
        }
    }

}



