let editIndex = -1;

const form = document.getElementById("paymentForm");
const searchBox = document.getElementById("searchBox");

const dateEl = document.getElementById("paymentDate");
const nameEl = document.getElementById("customerName");
const modeEl = document.getElementById("paymentMode");
const amountEl = document.getElementById("amountGiven");

// Extra "Others" elements
const otherModeContainer = document.getElementById("otherModeContainer");
const otherModeDetails = document.getElementById("otherModeDetails");

const body = document.getElementById("paymentBody");
const totalPaidEl = document.getElementById("totalPaid");

/* DYNAMIC MONITORING FOR 'OTHERS' SELECTION */
if (modeEl) {
    modeEl.addEventListener("change", function () {
        if (this.value === "Others") {
            otherModeContainer.style.display = "block";
            otherModeDetails.required = true;
        } else {
            otherModeContainer.style.display = "none";
            otherModeDetails.required = false;
            otherModeDetails.value = "";
        }
    });
}

/* SAVE PAYMENT */
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let dynamicModeValue = modeEl.value;
        if (dynamicModeValue === "Others") {
            dynamicModeValue = "Others: " + otherModeDetails.value.trim();
        }

        let payment = {
            paymentDate: dateEl.value,
            customerName: nameEl.value,
            paymentMode: dynamicModeValue,
            amountGiven: Number(amountEl.value)
        };

        let payments = JSON.parse(localStorage.getItem("payments")) || [];

        if (editIndex === -1) {
            payments.push(payment);
        } else {
            payments[editIndex] = payment;
            editIndex = -1;
            document.querySelector("#paymentForm button[type='submit']").innerText = "Save Payment";
        }

        localStorage.setItem("payments", JSON.stringify(payments));

        form.reset();
        if (otherModeContainer) otherModeContainer.style.display = "none";
        if (otherModeDetails) otherModeDetails.required = false;

        loadPayments();
        alert("Payment Saved Successfully");
    });
}

/* LOAD TABLE */
function loadPayments(data = null) {
    let payments = JSON.parse(localStorage.getItem("payments")) || [];
    let list = data || payments;

    if (!body) return;
    body.innerHTML = "";
    let totalPaid = 0;

    list.forEach((payment, index) => {
        totalPaid += Number(payment.amountGiven);

        body.innerHTML += `
        <tr>
            <td>${payment.paymentDate}</td>
            <td>${payment.customerName}</td>
            <td>${payment.paymentMode}</td>
            <td>${payment.amountGiven}</td>
            <td>
                <button onclick="editPayment(${index})">
                    Edit
                </button>
                <button onclick="deletePayment(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

    if (totalPaidEl) {
        totalPaidEl.innerText = totalPaid.toFixed(2);
    }
}

/* EDIT */
function editPayment(index) {
    let payments = JSON.parse(localStorage.getItem("payments")) || [];
    let payment = payments[index];

    if (!dateEl || !nameEl || !amountEl || !modeEl) return;

    dateEl.value = payment.paymentDate;
    nameEl.value = payment.customerName;
    amountEl.value = payment.amountGiven;

    if (payment.paymentMode.startsWith("Others: ")) {
        modeEl.value = "Others";
        if (otherModeContainer) otherModeContainer.style.display = "block";
        if (otherModeDetails) {
            otherModeDetails.required = true;
            otherModeDetails.value = payment.paymentMode.replace("Others: ", "");
        }
    } else {
        modeEl.value = payment.paymentMode;
        if (otherModeContainer) otherModeContainer.style.display = "none";
        if (otherModeDetails) {
            otherModeDetails.required = false;
            otherModeDetails.value = "";
        }
    }

    editIndex = index;
    const submitBtn = document.querySelector("#paymentForm button[type='submit']");
    if (submitBtn) submitBtn.innerText = "Update Payment";
}

/* DELETE */
function deletePayment(index) {
    if (!confirm("Delete this payment?")) {
        return;
    }

    let payments = JSON.parse(localStorage.getItem("payments")) || [];
    payments.splice(index, 1);

    localStorage.setItem("payments", JSON.stringify(payments));
    loadPayments();
}

/* SEARCH */
if (searchBox) {
    searchBox.addEventListener("input", function () {
        let value = this.value.toLowerCase();
        let payments = JSON.parse(localStorage.getItem("payments")) || [];

        let filtered = payments.filter(payment =>
            payment.customerName.toLowerCase().includes(value)
        );

        loadPayments(filtered);
    });
}

/* INITIAL LOAD */
window.addEventListener("load", function() {
    loadPayments();
});