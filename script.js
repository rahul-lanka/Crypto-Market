// Function to fetch data from the API using async/await
async function fetchDataAsyncAwait() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to fetch data from the API using .then()
function fetchDataThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => {
        // Handle data here
    })
    .catch(error => console.error('Error fetching data:', error));
}

function renderData(data) {
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = '';
    data.forEach(item => {
        // Create table rows and cells and append them to the table body
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.id}</td>
            <td><img src="${item.image}" alt="${item.name}" /></td>
            <td>${item.symbol}</td>
            <td>${item.current_price}</td>
            <td>${item.total_volume}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to handle sorting
function sortData(sortBy) {
    // Get the table body
    const tableBody = document.getElementById('cryptoTableBody');
    // Get all rows in the table
    const rows = tableBody.getElementsByTagName('tr');
    // Convert the HTMLCollection to an array
    const rowsArray = Array.from(rows);

    // Sort the array based on the selected criteria
    rowsArray.sort((a, b) => {
        let aValue, bValue;
        if (sortBy === 'marketPrice') {
            // Extract the price values from the rows
            aValue = parseFloat(a.cells[4].textContent.replace('$', '').replace(',', ''));
            bValue = parseFloat(b.cells[4].textContent.replace('$', '').replace(',', ''));
        } else if (sortBy === 'percentage') {
            // Extract the percentage values from the rows
            aValue = parseFloat(a.cells[5].textContent.replace('%', ''));
            bValue = parseFloat(b.cells[5].textContent.replace('%', ''));
        }
        return aValue - bValue;
    });

    // Append the sorted rows back to the table
    tableBody.innerHTML = '';
    rowsArray.forEach(row => {
        tableBody.appendChild(row);
    });
}

// Function to handle search
function search() {
    // Get the input value
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    // Get all rows in the table
    const rows = document.querySelectorAll('#cryptoTableBody tr');

    // Loop through each row and hide/show based on the search text
    rows.forEach(row => {
        // Get the name and symbol values from the row
        const name = row.cells[0].textContent.toLowerCase();
        const symbol = row.cells[3].textContent.toLowerCase();
        // Check if the search text matches either the name or symbol
        if (name.includes(searchText) || symbol.includes(searchText)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}


// Fetch data using async/await
fetchDataAsyncAwait().then(data => {
    renderData(data);
    // Add event listener for search input
    document.getElementById('searchInput').addEventListener('input', search);
});

document.getElementById('sortMarketPrice').addEventListener('click', () => sortData('marketPrice'));
document.getElementById('sortPercentage').addEventListener('click', () => sortData('percentage'));

// Fetch data using .then()
// fetchDataThen();
