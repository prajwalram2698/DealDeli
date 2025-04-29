// static/script.js

// Fetch and display total number of searches
fetch("/analytics/total_searches")
    .then(response => response.json())
    .then(data => {
        document.getElementById("total-searches").textContent = data.total_searches;
    })
    .catch(error => {
        console.error("Error fetching total searches:", error);
    });

// Fetch and display recent searches
fetch("/analytics/recent_searches")
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById("recent-searches-list");
        list.innerHTML = "";
        data.forEach(search => {
            const li = document.createElement("li");
            li.textContent = `${search.product_name} - ${new Date(search.timestamp).toLocaleString()}`;
            list.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Error fetching recent searches:", error);
    });

// Fetch and display top viewed products
fetch("/analytics/top_viewed_products")
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById("top-products-list");
        list.innerHTML = "";
        data.forEach(product => {
            const li = document.createElement("li");
            li.textContent = `${product.product_name} (${product.count} views)`;
            list.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Error fetching top viewed products:", error);
    });

// Fetch data for top 5 products (for Bar Chart)
fetch("/analytics/top_products_chart")
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById("topProductsChart").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.map(item => item.product_name),
                datasets: [{
                    label: "Views",
                    data: data.map(item => item.count),
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                }]
            }
        });
    })
    .catch(error => {
        console.error("Error fetching top products chart:", error);
    });

// Fetch data for category distribution (Pie Chart)
fetch("/analytics/category_distribution")
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById("categoryPieChart").getContext("2d");
        new Chart(ctx, {
            type: "pie",
            data: {
                labels: data.map(item => item.category),
                datasets: [{
                    data: data.map(item => item.count),
                    backgroundColor: [
                        "#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#2ecc71"
                    ]
                }]
            }
        });
    })
    .catch(error => {
        console.error("Error fetching category distribution:", error);
    });
