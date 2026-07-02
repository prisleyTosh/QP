document.querySelectorAll(".nav-item").forEach(button => {
    button.addEventListener("click", function () {
        const target = this.dataset.target;

        document.querySelectorAll("main section").forEach(section => {
            section.style.display = "none";
        });

        document.getElementById(target).style.display = "block";
    });
});
const createBtn = document.querySelector('[data-target="create"]');
const wrapper = document.querySelector(".table-wrapper");

createBtn.addEventListener("click", () => {
    wrapper.classList.add("active");
});
// ===============================
// Shopping List
// ===============================

const productsTable = document.getElementById("products-table");
const myList = document.getElementById("my-list-content");
const navBadge = document.getElementById("nav-badge");

// Update badge
function updateBadge() {

    const tbody = document.querySelector("#shopping-table tbody");

    if (!tbody) {
        navBadge.style.display = "none";
        navBadge.textContent = "0";
        return;
    }

    const count = tbody.rows.length;

    navBadge.textContent = count;
    navBadge.style.display = count > 0 ? "inline-flex" : "none";
}

// Create the table once
function createTable() {

    if (document.getElementById("shopping-table")) return;

    myList.innerHTML = `
        <h3 class="card-title">My List</h3>

        <table id="shopping-table">

            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Shop</th>
                    <th>Price</th>
                </tr>
            </thead>

            <tbody></tbody>

        </table>
    `;

    updateBadge();
}

// Add Product
function addProduct(product, shop, price) {

    createTable();

    const tbody = document.querySelector("#shopping-table tbody");

    // Check duplicate
    const exists = [...tbody.rows].some(row =>
        row.cells[0].textContent === product
    );

    if (exists) {
        alert(product + " already exists.");
        return;
    }

    const row = tbody.insertRow();

    row.insertCell().textContent = product;
    row.insertCell().textContent = shop;
    row.insertCell().textContent = "$" + price;

    // Update badge
    updateBadge();
}

// Listen for clicks
productsTable.addEventListener("click", function (event) {

    const cell = event.target.closest(".image-header");

    if (!cell) return;

    addProduct(
        cell.dataset.product,
        cell.dataset.shop,
        cell.dataset.price
    );

});

// Update badge when page loads
document.addEventListener("DOMContentLoaded", updateBadge);