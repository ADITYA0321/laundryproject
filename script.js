let cartItems = [];
let cartBody = document.getElementById("cart-body");
let total = document.getElementById("total");
let bookBtn = document.querySelector(".book-btn");

let errorMsg = document.getElementById("cart-error");
let nameInput = document.querySelector('input[placeholder="Full Name"]');
let emailInput = document.querySelector('input[placeholder="Email ID"]');
let phoneInput = document.querySelector('input[placeholder="Phone Number"]');



document.querySelectorAll(".service").forEach(service => {
    
    let addBtn = service.querySelector(".add-btn");
    let removeBtn = service.querySelector(".remove-btn");

    // ADD ITEM
    addBtn.addEventListener("click", () => {
        let name = service.dataset.name;
        let price = parseInt(service.dataset.price);

        cartItems.push({ name, price });
        updateCart();

        addBtn.classList.add("hide");
        removeBtn.classList.remove("hide");
    });

    // REMOVE ITEM
    removeBtn.addEventListener("click", () => {
        let name = service.dataset.name;

        cartItems = cartItems.filter(item => item.name !== name);
        updateCart();

        removeBtn.classList.add("hide");
        addBtn.classList.remove("hide");
    });
});

// UPDATE CART + TOTAL
function updateCart() {
    cartBody.innerHTML = "";
    let sum = 0;

    cartItems.forEach((item, index) => {
        cartBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
            </tr>
        `;
        sum += item.price;
    });

    total.textContent = sum;

    // 🔥 MOST IMPORTANT LINE
    toggleEmptyCart();

 
    if (cartItems.length === 0) {
    bookBtn.disabled = true;  // disable when empty
} else {
    bookBtn.disabled = false; // enable when >=1 item
}

   if (cartItems.length > 0) {
    errorMsg.style.display = "none";
}

}


function toggleEmptyCart() {
    let cartBody = document.getElementById("cart-body");
    let empty = document.getElementById("empty-cart");

    if (cartBody.children.length === 0) {
        empty.style.display = "block";
    } else {
        empty.style.display = "none";
    }
}

function showErrorIfCartEmpty() {
    if (cartItems.length === 0) {
        errorMsg.style.display = "block";  // Show error
    } else {
        errorMsg.style.display = "none";   // Hide error
    }
}

nameInput.addEventListener("focus", showErrorIfCartEmpty);
emailInput.addEventListener("focus", showErrorIfCartEmpty);
phoneInput.addEventListener("focus", showErrorIfCartEmpty);

bookBtn.addEventListener("click", () => {
    // If cart empty, do nothing (error already shown)
    if (cartItems.length === 0) return;

    // If any input empty → show red border (optional)
    if (
        nameInput.value.trim() === "" ||
        emailInput.value.trim() === "" ||
        phoneInput.value.trim() === ""
    ) {
        errorMsg.style.display = "block";
        errorMsg.innerHTML =
            '<i class="fa-solid fa-circle-info"></i> Please fill all fields';
        return;
    }

    // Success message show
    let success = document.getElementById("success-msg");
    success.style.display = "block";

    // Reset form
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";

    // Optional: Hide success after 3 seconds
    setTimeout(() => {
        success.style.display = "none";
    }, 3000);
});


