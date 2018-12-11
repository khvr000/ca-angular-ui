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
      this.setStockChart();
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

  setStockChart() {
      /**
       * Generate random chart data
       */
      this.generateChartData();
      const stockChartConfig = {
          'type': 'stock',
          'theme': 'light',

          // This will keep the selection at the end across data updates
          'glueToTheEnd': true,

          // Defining data sets
          'dataSets': [ {
              'title': 'first data set',
              'fieldMappings': [ {
                  'fromField': 'value',
                  'toField': 'value'
              }, {
                  'fromField': 'volume',
                  'toField': 'volume'
              } ],
              'dataProvider': this.chartData1,
              'categoryField': 'date'
          }, {
              'title': 'second data set',
              'fieldMappings': [ {
                  'fromField': 'value',
                  'toField': 'value'
              }, {
                  'fromField': 'volume',
                  'toField': 'volume'
              } ],
              'dataProvider': this.chartData2,
              'categoryField': 'date'
          }, {
              'title': 'third data set',
              'fieldMappings': [ {
                  'fromField': 'value',
                  'toField': 'value'
              }, {
                  'fromField': 'volume',
                  'toField': 'volume'
              } ],
              'dataProvider': this.chartData3,
              'categoryField': 'date'
          }, {
              'title': 'fourth data set',
              'fieldMappings': [ {
                  'fromField': 'value',
                  'toField': 'value'
              }, {
                  'fromField': 'volume',
                  'toField': 'volume'
              } ],
              'dataProvider': this.chartData4,
              'categoryField': 'date'
          } ],

          // Panels
          'panels': [ {
              'showCategoryAxis': false,
              'title': 'Value',
              'percentHeight': 60,
              'stockGraphs': [ {
                  'id': 'g1',
                  'valueField': 'value',
                  'comparable': true,
                  'compareField': 'value'
              } ],
              'stockLegend': {}
          }, {
              'title': 'Volume',
              'percentHeight': 40,
              'stockGraphs': [ {
                  'valueField': 'volume',
                  'type': 'column',
                  'showBalloon': false,
                  'fillAlphas': 1
              } ],
              'stockLegend': {}
          } ],

          // Scrollbar settings
          'chartScrollbarSettings': {
              'graph': 'g1',
              'usePeriod': 'WW'
          },

          // Period Selector
          'periodSelector': {
              'position': 'left',
              'periods': [ {
                  'period': 'DD',
                  'count': 10,
                  'label': '10 days'
              }, {
                  'period': 'MM',
                  'selected': true,
                  'count': 1,
                  'label': '1 month'
              }, {
                  'period': 'YYYY',
                  'count': 1,
                  'label': '1 year'
              }, {
                  'period': 'YTD',
                  'label': 'YTD'
              }, {
                  'period': 'MAX',
                  'label': 'MAX'
              } ]
          },

          // Data Set Selector
          'dataSetSelector': {
              'position': 'left'
          },

          // Event listeners
          'listeners': [ {
              'event': 'rendered',
              'method': function( event ) {
                  chart.mouseDown = false;
                  chart.containerDiv.onmousedown = function() {
                      chart.mouseDown = true;
                  }
                  chart.containerDiv.onmouseup = function() {
                      chart.mouseDown = false;
                  }
              }
          } ]
      }
      var chart = this.AmCharts.makeChart( 'stockdiv1', stockChartConfig);
      setInterval( function() {

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
              value: a1,
              volume: b1
          } );
          chart.dataSets[ 1 ].dataProvider.push( {
              date: newDate,
              value: a2,
              volume: b2
          } );
          chart.dataSets[ 2 ].dataProvider.push( {
              date: newDate,
              value: a3,
              volume: b3
          } );
          chart.dataSets[ 3 ].dataProvider.push( {
              date: newDate,
              value: a4,
              volume: b4
          } );

          chart.validateData();
      }, 1000 );
  }

  generateChartData() {
        const firstDate = new Date();
        firstDate.setDate( firstDate.getDate() - 500 );
        firstDate.setHours( 0, 0, 0, 0 );

        for ( let i = 0; i < 500; i++ ) {
            const newDate = new Date( firstDate );
            newDate.setDate( newDate.getDate() + i );

            const a1 = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
            const b1 = Math.round( Math.random() * ( 1000 + i ) ) + 500 + i * 2;

            const a2 = Math.round( Math.random() * ( 100 + i ) ) + 200 + i;
            const b2 = Math.round( Math.random() * ( 1000 + i ) ) + 600 + i * 2;

            const a3 = Math.round( Math.random() * ( 100 + i ) ) + 200;
            const b3 = Math.round( Math.random() * ( 1000 + i ) ) + 600 + i * 2;

            const a4 = Math.round( Math.random() * ( 100 + i ) ) + 200 + i;
            const b4 = Math.round( Math.random() * ( 100 + i ) ) + 600 + i;

            this.chartData1.push( {
                'date': newDate,
                'value': a1,
                'volume': b1
            } );
            this.chartData2.push( {
                'date': newDate,
                'value': a2,
                'volume': b2
            } );
            this.chartData3.push( {
                'date': newDate,
                'value': a3,
                'volume': b3
            } );
            this.chartData4.push( {
                'date': newDate,
                'value': a4,
                'volume': b4
            } );
        }
    }

}
