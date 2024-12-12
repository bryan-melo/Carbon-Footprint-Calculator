// Dummy data
const data =  [[1, 470.04],  [2, 552.31],  [3, 394.16],  [4, 533.92],  [5, 494.59],
[6, 566.85],  [7, 512.95],  [8, 350.95],  [9, 620.25],  [10, 468.06], [11, 647.25], [12, 432.10]
];

const pie_data = [
    ['Task', 'Carbon Emissions'],
    ['Monthly Electricity Usage (kWh)', 3030],
    ['Monthly Fuel Consumption (liters):', 1050],
    ['Waste Generated (kg per month)', 5530],
    ['Monthly Water Usage (liters)', 53500],
  ];


// Global variables
let chart; 
let chart2;
let options; 
let options2;
let dataTable;
let dataTable2;

function setWelcomeMessage() {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('userData');
    const user = JSON.parse(userData);
    const username = user.username;

    // Set Welcome message
    const welcomeMessage = "Welcome back, " + username + "!";
    document.getElementById('welcome-user-message').textContent = welcomeMessage;
}

function initializeLineChartData() {
    dataTable = new google.visualization.DataTable();
    dataTable.addColumn('number', 'X');
    dataTable.addColumn('number', 'Carbon Emissions');
    dataTable.addRows(data);
  }

function initializePieChartData() {
    dataTable2 = new google.visualization.arrayToDataTable(pie_data);
}

function drawLineChart() {
    // Initialize chart and options
    chart = new google.visualization.LineChart(document.getElementById('chart-container'));

    options = {
        title: 'Carbon Footprint Over Time',
        hAxis: {
            title: 'Time (Months)',
            ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        vAxis: {
            title: 'Carbon Emissions (kg CO\u00B2)'
        },
        width: '100%', 
        height: '100%',
        backgroundColor: '#f4f4f4'
    };

    chart.draw(dataTable, options);
}

function drawPieChart() {
    chart2 = new google.visualization.PieChart(document.getElementById('pie-chart'));
   
    // Set chart options
    options2 = {
        'is3D': true,
        'backgroundColor': '#f4f4f4',
    };

    chart2.draw(dataTable2, options2);
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    setWelcomeMessage();
    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(() => {
        initializeLineChartData();
        drawLineChart();
        initializePieChartData();
        drawPieChart();
    });
});
  
// Add window resize listener for responsiveness
window.addEventListener('resize', () => {
    if (chart) {
        chart.draw(dataTable, options);
    }
    if (chart2) {
        chart2.draw(dataTable2, options2);
    }
});