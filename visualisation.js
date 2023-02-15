// Define the data format for the custom visualization
const dataFormat = {
  'id': 'monthly_metrics',
  'label': 'Monthly Metrics',
  'structure': {
    'metrics': [
      {'id': 'metric1', 'dataType': 'NUMBER'},
      {'id': 'metric2', 'dataType': 'NUMBER'},
      {'id': 'metric3', 'dataType': 'NUMBER'},
      {'id': 'difference', 'dataType': 'NUMBER'}
    ],
    'dimensions': [
      {'id': 'month', 'dataType': 'STRING'}
    ]
  }
};

// Define the render function for the custom visualization
function render(data, container) {
  // Create a table element to display the data
  const table = document.createElement('table');
  container.appendChild(table);
  
  // Create the table header row
  const headerRow = document.createElement('tr');
  table.appendChild(headerRow);
  
  // Add the month column headers to the header row
  for (const month of data.months) {
    const headerCell = document.createElement('th');
    headerCell.textContent = month;
    headerRow.appendChild(headerCell);
  }
  
  // Add the difference column headers to the header row
  for (let i = 0; i < data.months.length - 1; i++) {
    const headerCell = document.createElement('th');
    headerCell.textContent = 'Difference';
    headerRow.appendChild(headerCell);
  }
  
  // Create a row for each metric
  for (const metric of data.metrics) {
    const metricRow = document.createElement('tr');
    table.appendChild(metricRow);
    
    // Add the metric name to the first column of the row
    const metricCell = document.createElement('td');
    metricCell.textContent = metric.name;
    metricRow.appendChild(metricCell);
    
    // Add the metric values to the table
    for (let i = 0; i < data.months.length; i++) {
      const valueCell = document.createElement('td');
      
      // If this is not the last month, calculate the difference from the previous month
      if (i < data.months.length - 1) {
        const currentValue = metric.values[i];
        const previousValue = metric.values[i + 1];
        const difference = (currentValue - previousValue) / previousValue;
        valueCell.textContent = `${(difference * 100).toFixed(2)}%`;
      } else {
        // If this is the last month, just display the current value
        valueCell.textContent = metric.values[i];
      }
      
      metricRow.appendChild(valueCell);
    }
  }
}

// Register the custom visualization with Data Studio
gds.registerDataViewPlugin({
  data: dataFormat,
  render: render,
  options: {}
});
