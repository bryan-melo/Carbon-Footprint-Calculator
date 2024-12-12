// Global variables
let chart; 
let chart2;
let options; 
let options2;
let dataTable;
let dataTable2;

// Line chart default data
let lineChartData =  [[1, 0],  [2, 0],  [3, 0],  [4, 0],  [5, 0],
[6, 0],  [7, 0],  [8, 0],  [9, 0],  [10, 0], [11, 0], [12, 0]
];


// Pie chart default data
let pie_data = [
    ['Task', 'Carbon Emissions'],
    ['Monthly Electricity Usage (kWh)', 0],
    ['Monthly Fuel Consumption (liters):', 0],
    ['Waste Generated (kg per month)', 0],
    ['Monthly Water Usage (liters)', 0],
  ];

// Retrieve user data from local storage
const userData = localStorage.getItem('userData');
const user = JSON.parse(userData);

function setWelcomeMessage() {
    const username = user.username;

    // Set Welcome message
    const welcomeMessage = "Welcome back, " + username + "!";
    document.getElementById('welcome-user-message').textContent = welcomeMessage;
}

function fetchUserData() {
    const accountId = user.accountId;

    // Get data from the backend
    fetch(`http://127.0.0.1:5000/api/profile/get_calculation_data?accountId=${accountId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Handle the data received from the backend

        // Most recent calculations section
        const recentCalculations = getMostRecentCalculations(data);
        updateRecentCalculationsList(recentCalculations);

        // Cumulative Carbon Emissions
        updateCumulativeCarbonEmissions(data);

        // Most Impactful Category
        updateMostImpactfulCategory(data);

        // Carbon Footprint Over Time Line Chart
        updateLineChart(data);

        // This Month's Distribution of Resource Usage for Pie Chart
        updatePieChart(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getMostRecentCalculations(data) {
    // Sort the data by date in descending order
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Get the top 5 most recent calculations
    const top5 = sortedData.slice(0, 5);
    
    // Create an array of [formattedDate, totalEmissions]
    const recentCalculations = top5.map(entry => {
        const date = new Date(entry.date);
        const formattedDate = date.toISOString().split('T')[0]; // Format to "YYYY-MM-DD"
        const formattedEmissions = parseFloat(entry.totalEmissions).toFixed(2); // Format to 2 decimal places
        return [formattedDate, formattedEmissions];
    });

    return recentCalculations;
}

function updateRecentCalculationsList(calculations) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    calculations.forEach(([date, emissions]) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<b>Date:</b> ${date}&nbsp&nbsp&nbsp&nbsp<b>Total Emissions:</b> ${emissions} kg CO₂`;
        userList.appendChild(listItem);
    });
}

function updateCumulativeCarbonEmissions(data) {
    // Calculate cumulative carbon emissions (sum of totalEmissions)
    const totalEmissions = data.reduce((sum, entry) => sum + parseFloat(entry.totalEmissions), 0).toFixed(2);

    // Update DOM element
    document.getElementById("total-emissions").textContent = `${totalEmissions} kg CO₂`;
}

function updateMostImpactfulCategory(data) {
    // Initialize the totals for each category
    let electricityTotal = 0;
    let fuelTotal = 0;
    let wasteTotal = 0;
    let waterTotal = 0;

    // Loop through each entry in the data and sum the categories
    data.forEach(entry => {
        electricityTotal += parseFloat(entry.electricityUsage); 
        fuelTotal += parseFloat(entry.fuelConsumption); 
        wasteTotal += parseFloat(entry.wasteGenerated);
        waterTotal += parseFloat(entry.waterUsage); 
    });

    // Find the category with the highest total
    const categoryTotals = {
        "Electricity Usage": electricityTotal,
        "Fuel Consumption": fuelTotal,
        "Waste Generated": wasteTotal,
        "Water Usage": waterTotal
    };

    let mostImpactfulCategory = "";
    let highestEmissions = 0;
    let unit = "";

    // Find the category with the highest total
    for (const category in categoryTotals) {
        if (categoryTotals[category] > highestEmissions) {
            mostImpactfulCategory = category;
            highestEmissions = categoryTotals[category];
        }
    }

    // Determine the units based on the category
    if (mostImpactfulCategory === "Electricity Usage") {
        unit = "kWh";
    } else if (mostImpactfulCategory === "Fuel Consumption") {
        unit = "Liters";
    } else if (mostImpactfulCategory === "Waste Generated") {
        unit = "kg";
    } else if (mostImpactfulCategory === "Water Usage") {
        unit = "Liters";
    }

    // Update the DOM with the most impactful category and its unit
    document.getElementById("most-impactful-category").textContent = `${mostImpactfulCategory}: ${highestEmissions.toFixed(2)} ${unit}`;
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

function updateLineChart(data) {
    // Reset the monthly data array to zeroes
    lineChartData = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
                     [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0]];

    // Loop through each entry in the data and update the corresponding month
    data.forEach(entry => {
        const month = new Date(entry.date).getMonth(); 
        const emissions = parseFloat(entry.totalEmissions); 

        if (month >= 0 && month < 12) {
            lineChartData[month][1] += emissions;
        }
    });

    // Update the chart with the new data
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('number', 'Month');
    dataTable.addColumn('number', 'Total Emissions');
    dataTable.addRows(lineChartData);

    // Initialize the chart and options
    const chart = new google.visualization.LineChart(document.getElementById('chart-container'));

    const options = {
        title: 'Carbon Footprint Over Time',
        hAxis: {
            title: 'Time (Months)',
            ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        vAxis: {
            title: 'Carbon Emissions (kg CO\u00B2)',
        },
        width: '100%',
        height: '100%',
        backgroundColor: '#f4f4f4'
    };

    // Draw the chart with the updated data
    chart.draw(dataTable, options);
}

function updatePieChart(data) {
    const currentMonth = new Date().getMonth();

    let electricityTotal = 0;
    let fuelTotal = 0;
    let wasteTotal = 0;
    let waterTotal = 0;

    // Loop through the data and sum the values for the current month
    data.forEach(entry => {
        const entryDate = new Date(entry.date);
        const entryMonth = entryDate.getMonth();

        // If the entry is from the current month, sum the categories
        if (entryMonth === currentMonth) {
            electricityTotal += parseFloat(entry.electricityUsage) || 0;
            fuelTotal += parseFloat(entry.fuelConsumption) || 0;
            wasteTotal += parseFloat(entry.wasteGenerated) || 0;
            waterTotal += parseFloat(entry.waterUsage) || 0;
        }
    });

    // Update the pie chart data
    pie_data[1][1] = electricityTotal;
    pie_data[2][1] = fuelTotal;
    pie_data[3][1] = wasteTotal;
    pie_data[4][1] = waterTotal;

    initializePieChartData();
    drawPieChart();
}

function initializePieChartData() {
    dataTable2 = new google.visualization.arrayToDataTable(pie_data);
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
    fetchUserData(); 
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