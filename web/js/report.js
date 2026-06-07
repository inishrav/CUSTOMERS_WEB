let entries = JSON.parse(localStorage.getItem("entries")) || [];

const body = document.getElementById("reportBody");
const totalEl = document.getElementById("overallTotal");
const customerCountEl = document.getElementById("totalCustomers");
const searchBox = document.getElementById("searchCustomer");

if (body) {
    displayEntries(entries);
}

function saveData() {
    localStorage.setItem("entries", JSON.stringify(entries));
}

function displayEntries(data) {

    if (!body) return;

    body.innerHTML = "";

    let total = 0;

    data.forEach((entry) => {

        total += Number(entry.amount);

        let originalIndex = entries.findIndex(e =>
            e.customerName === entry.customerName &&
            e.date === entry.date &&
            e.amount === entry.amount
        );

        body.innerHTML += `
        <tr>
            <td>${entry.customerName}</td>
            <td>${entry.date}</td>
            <td>${entry.grossWeight}</td>
            <td>${entry.netWeight}</td>
            <td>${entry.kgRate}</td>
            <td>${entry.amount}</td>
            <td>
                <button onclick="editEntry(${originalIndex})">
                    Edit
                </button>

                <button onclick="deleteEntry(${originalIndex})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

    if (totalEl) {
        totalEl.innerText = total.toFixed(2);
    }
}

/* CUSTOMER COUNT */

if (customerCountEl) {

    let uniqueCustomers = [
        ...new Set(
            entries.map(entry => entry.customerName)
        )
    ];

    customerCountEl.innerText = uniqueCustomers.length;
}

/* SEARCH */

if (searchBox) {

    searchBox.addEventListener("input", function () {

        let searchText = this.value.toLowerCase();

        let filteredEntries = entries.filter(entry =>
            entry.customerName
                .toLowerCase()
                .includes(searchText)
        );

        displayEntries(filteredEntries);
    });
}

/* DELETE */

window.deleteEntry = function (index) {

    if (!confirm("Delete this entry?")) {
        return;
    }

    entries.splice(index, 1);

    saveData();

    if (body) {
        displayEntries(entries);
    }

    if (customerCountEl) {

        let uniqueCustomers = [
            ...new Set(
                entries.map(entry => entry.customerName)
            )
        ];

        customerCountEl.innerText = uniqueCustomers.length;
    }
};

/* EDIT */

window.editEntry = function (index) {

    let entry = entries[index];

    localStorage.setItem(
        "editEntryIndex",
        index
    );

    localStorage.setItem(
        "editEntryData",
        JSON.stringify(entry)
    );

    window.location.href = "add-entry.html";
};