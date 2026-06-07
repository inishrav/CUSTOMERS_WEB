let form = document.getElementById("entryForm");
let tableBody = document.getElementById("customerTableBody");
let searchBox = document.getElementById("searchCustomer");
let searchFYBox = document.getElementById("searchFinancialYear"); // Financial Year input variable

// Summary Section Variables
let summarySection = document.getElementById("summarySection");
let summaryTableBody = document.getElementById("summaryTableBody");

function loadEntries(data = null) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    let list = data || entries;

    tableBody.innerHTML = "";

    list.forEach((entry, index) => {
        const actualIndex = data ? entries.findIndex(e =>
            e.customerName === entry.customerName &&
            e.date === entry.date &&
            Number(e.grossWeight) === Number(entry.grossWeight) &&
            Number(e.netWeight) === Number(entry.netWeight) &&
            Number(e.kgRate) === Number(entry.kgRate)
        ) : index;

        tableBody.innerHTML += `
        <tr>
            <td>${entry.customerName}</td>
            <td>${entry.date}</td>
            <td>${entry.grossWeight}</td>
            <td>${entry.netWeight}</td>
            <td>${entry.kgRate}</td>
            <td>${entry.amount}</td>
            <td>
                <button onclick="editEntry(${actualIndex})">
                    Edit
                </button>
                <button onclick="deleteEntry(${actualIndex})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

    if (!data && summarySection) {
        summarySection.style.display = "none";
    }
}

/* PALM SEASON FINANCIAL YEAR FILTER LOGIC */
function filterRecords() {
    let nameValue = searchBox ? searchBox.value.toLowerCase().trim() : "";
    let fyValue = searchFYBox ? searchFYBox.value.trim() : "";
    let entries = JSON.parse(localStorage.getItem("entries")) || [];

    // If both search fields are clear, show everything and reset summary section
    if (nameValue === "" && fyValue === "") {
        loadEntries();
        if (summarySection) summarySection.style.display = "none";
        return;
    }

    let filtered = entries.filter(entry => {
        // 1. Customer Name Filter
        let matchesName =
            nameValue === "" ||
            entry.customerName.toLowerCase().includes(nameValue);

        // 2. Custom Palm Season Year Filter Logic (August 1st to March 31st)
        let matchesFY = true;

        if (fyValue !== "") {
            let seasonYear;
            let cleanFY = fyValue.replace(/\s/g, "");

            // If user enters a range like 25-26, isolate the starting year (25)
            if (cleanFY.includes("-")) {
                seasonYear = parseInt(cleanFY.split("-")[0]);
            } else {
                seasonYear = parseInt(cleanFY);
            }

            if (!isNaN(seasonYear)) {
                let entryDate = new Date(entry.date);
                // Season starts: August 1st (e.g., 2025-08-01)
                let startDate = new Date(`20${seasonYear}-08-01`);
                // Season ends: March 31st of the next year (e.g., 2026-03-31)
                let endDate = new Date(`20${seasonYear + 1}-03-31`);

                matchesFY = entryDate >= startDate && entryDate <= endDate;
            } else {
                matchesFY = false; // Handles broken or incomplete user inputs smoothly
            }
        }
        return matchesName && matchesFY;
    });

    tableBody.innerHTML = "";

    let totalGross = 0;
    let totalNet = 0;
    let totalAmount = 0;

    filtered.forEach(entry => {
        const originalIndex = entries.findIndex(e =>
            e.customerName === entry.customerName &&
            e.date === entry.date &&
            Number(e.grossWeight) === Number(entry.grossWeight) &&
            Number(e.netWeight) === Number(entry.netWeight) &&
            Number(e.kgRate) === Number(entry.kgRate)
        );

        totalGross += Number(entry.grossWeight);
        totalNet += Number(entry.netWeight);
        totalAmount += Number(entry.amount);

        tableBody.innerHTML += `
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
        </tr>`;
    });

    if (summaryTableBody) {
        summaryTableBody.innerHTML = `
        <tr>
            <td>${nameValue || "All Customers"}</td>
            <td>${totalGross}</td>
            <td>${totalNet}</td>
            <td>${totalAmount}</td>
        </tr>`;
    }

    if (summarySection) {
        summarySection.style.display = filtered.length ? "block" : "none";
    }
}

/* SAVE / UPDATE */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let customerName = document.getElementById("customerName").value;
    let date = document.getElementById("date").value;
    let grossWeight = parseFloat(document.getElementById("grossWeight").value);
    let netWeight = parseFloat(document.getElementById("netWeight").value);
    let kgRate = parseFloat(document.getElementById("kgRate").value);
    let amount = netWeight * kgRate;

    let entry = {
        customerName,
        date,
        grossWeight,
        netWeight,
        kgRate,
        amount
    };

    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    let editIndex = localStorage.getItem("editEntryIndex");

    if (editIndex !== null) {
        entries[editIndex] = entry;
        localStorage.removeItem("editEntryIndex");
        alert("Entry Updated Successfully");
    } else {
        entries.push(entry);
        alert("Entry Saved Successfully");
    }

    localStorage.setItem("entries", JSON.stringify(entries));
    form.reset();
    
    if (searchBox) searchBox.value = ""; 
    if (searchFYBox) searchFYBox.value = ""; 
    loadEntries();
});

/* EDIT */
function editEntry(index) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    let entry = entries[index];

    document.getElementById("customerName").value = entry.customerName;
    document.getElementById("date").value = entry.date;
    document.getElementById("grossWeight").value = entry.grossWeight;
    document.getElementById("netWeight").value = entry.netWeight;
    document.getElementById("kgRate").value = entry.kgRate;

    localStorage.setItem("editEntryIndex", index);
}

/* DELETE */
function deleteEntry(index) {
    if (!confirm("Delete this customer record?")) {
        return;
    }

    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.splice(index, 1);

    localStorage.setItem("entries", JSON.stringify(entries));
    
    if (searchBox) searchBox.value = ""; 
    if (searchFYBox) searchFYBox.value = ""; 
    loadEntries();
}

/* SEARCH EVENT LISTENERS */
if (searchBox) {
    searchBox.addEventListener("input", filterRecords);
}
if (searchFYBox) {
    searchFYBox.addEventListener("input", filterRecords);
}

/* PAGE LOAD */
window.addEventListener("load", function () {
    loadEntries();
});