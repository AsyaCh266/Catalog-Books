const products = [
    { id: 1, name: "На дне", price: 300 },
    { id: 2, name: "1984", price: 450 },
    { id: 3, name: "Гарри Поттер и философский камень", price: 600 },
    { id: 4, name: "Мастер и Маргарита", price: 500 }
]

let cart = []
const addToCart = (id) => {
    const product = products.find(p => p.id === id)
    cart.push(product)
    renderCart()
}

const removeFromCart = (index) => {
    cart.splice(index, 1)
    renderCart()
}

const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0)
}

const renderCart = () => {
    const list = document.getElementById("cart-items")
    list.innerHTML = ""
    cart.forEach((item, index) => {
        const li = document.createElement("li")
        li.innerHTML = `
            ${item.name} - ${item.price} руб
            <button onclick="removeFromCart(${index})">Удалить</button>
        `
        list.appendChild(li)
    })
    document.getElementById("total").textContent = calculateTotal()
    localStorage.setItem("cart", JSON.stringify(cart))
}

const pay = () => {
    if (cart.length === 0) {
        alert("Корзина пуста")
        return
    }
    alert("Покупка прошла успешно!")
    cart = []
    renderCart()
}

const filterBooks = () => {
    const text = document.getElementById("search").value.toLowerCase()
    const category = document.getElementById("category").value.toLowerCase()
    document.querySelectorAll(".book").forEach(book => {
        const name = (book.dataset.name || "").toLowerCase()
        const bookCategory = (book.dataset.category || "").toLowerCase()
        const matchText = name.includes(text)
        const matchCategory = category === "all" || bookCategory === category
        if (matchText && matchCategory) {
            book.style.display = "block"
        } else {
            book.style.display = "none"
        }
    })
}

const scrollToCart = () => {
    document.getElementById("cart-items").scrollIntoView({
        behavior: "smooth"
    })
}

const savedCart = localStorage.getItem("cart")

if (savedCart) {
    cart = JSON.parse(savedCart)
    renderCart()
}