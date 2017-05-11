/**
 * dashboard-charts.js
 *
 * @author Romack Natividad <romack@qstrike.com>
 * @since February 22, 2017
 */

// Endpoints
var endpoints = {
  orders: '/stats/orders/',
  saved_designs: '/stats/saved-designs/',
  users: '/stats/users/'
};

// Reusable color settings
var colors = {
  red: 'rgba(255, 99, 132, 0.2)',
  blue: 'rgba(54, 162, 235, 0.2)',
  yellow: 'rgba(255, 206, 86, 0.2)',
  green: 'rgba(75, 192, 192, 0.2)',
  violet: 'rgba(153, 102, 255, 0.2)',
  orange: 'rgba(255, 159, 64, 0.2)'
};

// Month constants
var months_array = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function initChartData(selectedColor) {
  return {
    labels: months_array,
    datasets: [{
        label: '',
        data: [],
        backgroundColor: [
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor]
        ],
        borderColor: [
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor],
            colors[selectedColor]
        ],
        borderWidth: 1
    }],
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
}

function buildChart(elementId, chartDataType, data, label, color) {
  var ctx = document.getElementById(elementId);
  var chart_data = undefined;
  var chart_data = initChartData(color);
  chart_data.datasets[0].data = data;
  chart_data.datasets[0].label = label
  return new Chart(ctx, {
    type: 'bar',
    data: chart_data,
    options: chart_data.options
  });
}
