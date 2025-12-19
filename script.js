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
    toggleEmptyCart();

    bookBtn.disabled = cartItems.length === 0;
    if (cartItems.length > 0) errorMsg.style.display = "none";
}

function toggleEmptyCart() {
    let empty = document.getElementById("empty-cart");
    empty.style.display = cartBody.children.length === 0 ? "block" : "none";
}

function showErrorIfCartEmpty() {
    errorMsg.style.display = cartItems.length === 0 ? "block" : "none";
}

nameInput.addEventListener("focus", showErrorIfCartEmpty);
emailInput.addEventListener("focus", showErrorIfCartEmpty);
phoneInput.addEventListener("focus", showErrorIfCartEmpty);

bookBtn.addEventListener("click", () => {
    if (cartItems.length === 0) return;

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

  
    let success = document.getElementById("success-msg");
    success.style.display = "block";
    success.innerHTML = " Email has been sent successfully!";

  
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";

    
    cartItems = [];
    updateCart();

    
    setTimeout(() => {
        success.style.display = "none";
    }, 3000);
});
