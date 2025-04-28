// Fetch and display Total Searches
function fetchTotalSearches() {
    fetch('http://127.0.0.1:5003/analytics/total_searches')
        .then(response => response.json())
        .then(data => {
            document.getElementById('total-searches').textContent = data.total_searches;
        })
        .catch(error => {
            console.error('Error fetching total searches:', error);
            document.getElementById('total-searches').textContent = 'Error';
        });
}

// Fetch and display Recent Searches
function fetchRecentSearches() {
    fetch('http://127.0.0.1:5003/analytics/recent_searches')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('recent-searches-list');
            list.innerHTML = '';
            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.product_name} - ${new Date(item.timestamp).toLocaleString()}`;
                list.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching recent searches:', error);
            const list = document.getElementById('recent-searches-list');
            list.innerHTML = '<li>Error loading recent searches</li>';
        });
}

// Fetch and display Top 5 Products and Bar Chart
function fetchTopProducts() {
    fetch('http://127.0.0.1:5003/analytics/top_products')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('top-products-list');
            list.innerHTML = '';
            const labels = [];
            const counts = [];

            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.product_name} (${item.search_count} searches)`;
                list.appendChild(listItem);

                labels.push(item.product_name);
                counts.push(item.search_count);
            });

            updateTopProductsChart(labels, counts);
        })
        .catch(error => {
            console.error('Error fetching top products:', error);
            const list = document.getElementById('top-products-list');
            list.innerHTML = '<li>Error loading top products</li>';
        });
}

// Fetch and display Category Distribution Pie Chart
function fetchCategoryDistribution() {
    fetch('http://127.0.0.1:5003/analytics/category_distribution')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.category);
            const counts = data.map(item => item.search_count);
            updateCategoryPieChart(labels, counts);
        })
        .catch(error => {
            console.error('Error fetching category distribution:', error);
        });
}

// Initialize the Charts
let topProductsChart;
let categoryPieChart;

function updateTopProductsChart(labels, counts) {
    const ctx = document.getElementById('topProductsChart').getContext('2d');
    if (topProductsChart) {
        topProductsChart.destroy();
    }
    topProductsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Search Count',
                data: counts,
                backgroundColor: 'rgba(54, 162, 235, 0.7)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function updateCategoryPieChart(labels, counts) {
    const ctx = document.getElementById('categoryPieChart').getContext('2d');
    if (categoryPieChart) {
        categoryPieChart.destroy();
    }
    categoryPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: counts,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FFA726'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}

// Refresh Dashboard
function refreshDashboard() {
    fetchTotalSearches();
    fetchRecentSearches();
    fetchTopProducts();
    fetchCategoryDistribution();
}

setInterval(refreshDashboard, 30000); // Auto-refresh every 30s

window.onload = refreshDashboard;
