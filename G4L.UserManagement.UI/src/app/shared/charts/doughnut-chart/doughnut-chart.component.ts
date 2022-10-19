import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  @Input() dataSet: any;

  // Doughnut
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {};

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.dataSet);

    this.doughnutChartDatasets = [
      { data: [ this.dataSet?.used, this.dataSet?.remaining ] }
    ];

    this.doughnutChartOptions = {
      responsive: false,
    };

    console.log(this.doughnutChartOptions, this.doughnutChartDatasets);
  }

}
