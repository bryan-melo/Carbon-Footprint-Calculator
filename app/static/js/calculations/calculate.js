const userData = localStorage.getItem('userData');
const user = JSON.parse(userData);
const username = user.username;

let bar_char_data = [
    ["Categories", `${username}`, "Average Person"],
    ['Monthly Electricity Usage (kWh)', 0, 800],
    ['Monthly Fuel Consumption (liters):', 0, 100],
    ['Waste Generated (kg per month)', 0, 50],
    ['Monthly Water Usage (liters)', 0, 300],
];

// Global variables
let chart;
let options;
let dataTable;

function initializeBarChart() {
    dataTable = google.visualization.arrayToDataTable(bar_char_data);
}

function drawBarChart() {
    chart = new google.charts.Bar(document.getElementById('chart-container'));

    options = {
      chart: {
          title: 'Personal Resource Consumption',
          subtitle: 'Comparison of Personal and Average Usage on a Monthly Basis'
        },
        hAxis: {
          title: 'Resource Consumption'
        },
        vAxis: {
          title: 'Resource Type'
        },
        bars: 'horizontal',
    };

    chart.draw(dataTable, options);
}

function calculateCarbonFootprint() {
    //user input values
    const electricityUsage = parseFloat(document.getElementById('electricityUsage').value);
    const fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value);
    const wasteGenerated = parseFloat(document.getElementById('wasteGenerated').value);
    const waterUsage = parseFloat(document.getElementById('waterUsage').value);

    if (isNaN(electricityUsage) || isNaN(fuelConsumption) || isNaN(wasteGenerated) || isNaN(waterUsage)) {
        document.getElementById('result').textContent = 'Please enter valid numerical values for all inputs.';
        return;
    }

    //emission factors (kg CO2 per unit)
    const CO2_PER_KWH = 0.527;
    const CO2_PER_LITER_FUEL = 2.31;
    const CO2_PER_KG_WASTE = 0.8;
    const CO2_PER_LITER_WATER = 0.0003;

    //calc emissions for each activity
    const electricityEmissions = electricityUsage * CO2_PER_KWH;
    const fuelEmissions = fuelConsumption * CO2_PER_LITER_FUEL;
    const wasteEmissions = wasteGenerated * CO2_PER_KG_WASTE;
    const waterEmissions = waterUsage * CO2_PER_LITER_WATER;

    //total emissions
    const totalEmissions = electricityEmissions + fuelEmissions + wasteEmissions + waterEmissions;

    // Update chart data with user input values
    bar_char_data[1][1] = electricityUsage;  
    bar_char_data[2][1] = fuelConsumption;   
    bar_char_data[3][1] = wasteGenerated;   
    bar_char_data[4][1] = waterUsage;   

    //results
    document.getElementById('result-text').style.display = 'block';
    document.getElementById('result').textContent = `Your total monthly carbon footprint is: ${totalEmissions.toFixed(2)} kg CO2 equivalent.`;
    document.getElementById("chart-container").style.display = "block";


    // Get user data
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    
    // Prep data
    const data = {
        accountId: userData.accountId,
        date: new Date(), 
        electricityUsage: electricityUsage,
        fuelConsumption: fuelConsumption,
        wasteGenerated: wasteGenerated,
        waterUsage: waterUsage,
        totalEmissions: totalEmissions
    };

    // Send data to the backend
    fetch("http://127.0.0.1:5000/api/calculations/process-calculations", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            // Draw the chart after calculation
            initializeBarChart()
            drawBarChart();
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    })
    .then(responseData => {
        console.log('Server Response:', responseData); // Log server response
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').textContent += ' There was an error saving your data. Please try again later.';
    });
}

document.addEventListener("DOMContentLoaded", function () {
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(initializeBarChart); 
});

window.addEventListener('resize', () => {
    if (chart) {
        chart.draw(dataTable, options);
    }
});