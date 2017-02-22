/**
 * dashboard-charts.js
 *
 * @author Romack Natividad <romack@qstrike.com>
 * @since February 22, 2017
 */


// Reusable color settings
var colors = {
  red: 'rgba(255, 99, 132, 0.2)',
  blue: 'rgba(54, 162, 235, 0.2)',
  yellow: 'rgba(255, 206, 86, 0.2)',
  green: 'rgba(75, 192, 192, 0.2)',
  violet: 'rgba(153, 102, 255, 0.2)',
  orange: 'rgba(255, 159, 64, 0.2)'
}

// Month constants
var months_array = [
  "Januray",
  "February",
  "March",
  "April",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// Orders chart configuration
var OrdersChartData = {
  labels: months_array,
  datasets: [{
      label: '# of Orders',
      data: [],
      backgroundColor: [
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue
      ],
      borderColor: [
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue,
          colors.blue
      ],
      borderWidth: 1
  }]
}

// Users chart configuration
var UsersChartData = {
  labels: months_array,
  datasets: [{
      label: '# of Users',
      data: [],
      backgroundColor: [
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet
      ],
      borderColor: [
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet,
          colors.violet
      ],
      borderWidth: 1
  }]
}

