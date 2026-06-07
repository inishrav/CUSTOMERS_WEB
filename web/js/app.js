let entries = JSON.parse(localStorage.getItem("entries")) || [];

/* ---------------- TOTAL AMOUNT ---------------- */
function calculateTotalAmount() {
let total = 0;

entries.forEach(entry => {
total += parseFloat(entry.amount) || 0;
});

document.getElementById("totalAmount").innerText =
total.toFixed(2);
}

/* ---------------- TOTAL CUSTOMERS ---------------- */
function calculateTotalCustomers() {

let customers = [...new Set(
entries.map(entry => entry.customerName)
)];

document.getElementById("totalCustomers").innerText =
customers.length;
}

/* ---------------- RECENT ENTRIES (optional table) ---------------- */
function loadRecentEntries() {

let body = document.getElementById("recentTableBody");

if (!body) return;

body.innerHTML = "";

let recent = entries.slice(-5).reverse();

recent.forEach(entry => {

body.innerHTML += `
<tr>
<td>${entry.date}</td>
<td>${entry.customerName}</td>
<td>${entry.amount}</td>
</tr>
`;

});
}

/* ---------------- INIT ---------------- */
calculateTotalAmount();
calculateTotalCustomers();
loadRecentEntries();