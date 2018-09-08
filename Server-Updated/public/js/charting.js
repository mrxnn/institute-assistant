// A class used to load chart.js charts on UI
class Charting {
  constructor(labels, backgroundColor, borderColor, options) {
    this.labels = labels;
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.options = options;
  }

  // load the chart based on the given inputs
  initializeChart(theChart, chartType, dataArray, labelText) {
    new Chart(theChart, {
      type: chartType,
      options,
      data: {
        labels,
        datasets: [
          {
            label: labelText,
            data: dataArray,
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderWidth: 1
          }
        ]
      }
    });
  }
}

// UI variables
const stdChart = document.querySelector('#student-chart').getContext('2d');
const costChart = document.querySelector('#cost-chart').getContext('2d');

// chart variables
const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
const backgroundColor = '#bfdaf7';
const borderColor = 'rgba(54, 162, 235, 1)';

// chart options
let options = {
  legend: {
    display: false
  },
  scales: {
    xAxes: [{ gridLines: { display: false } }],
    yAxes: [{ gridLines: { display: false } }]
  }
};

// loading the charts
let charting = new Charting(labels, backgroundColor, borderColor, options);

// load student chart
charting.initializeChart(stdChart, 'line', [5, 4, 6, 11, 15, 16], 'students');

// load cost chart
charting.initializeChart(costChart, 'line', [12, 11, 9, 8, 7, 6, 4], 'Cost');
