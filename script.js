let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let deleteAll = document.getElementById("deleteAll");
let search = document.getElementById("search");
let mode = "create";
let temp;
let products;
if(localStorage.products != null){
    products = JSON.parse(localStorage.getItem('products'));
} else{
        products = [];
}

function showData(){
    let table = '';
    for (let i = 0; i < products.length; i++) {
        table += `
            <tr>
            <td>${i+1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td>${products[i].count}</td>
            <td><button onclick="updateProduct(${i})">Update</button></td>
            <td><button onclick="deleteProduct(${i})">Delete</button></td>
            </tr>
        `
    }
    document.getElementById('products-container').innerHTML = table;
    if(products.length > 0){
        deleteAll.innerHTML = `
        <button id="deleteall" onclick="deleteAllProducts()">Delete All (${products.length})</button>
        `
    }
    else{
        deleteAll.innerHTML = ``;
    }
}

showData();

function calcTotal(){
    if(price.value != '' && +price.value > 0){
        let result = +price.value + +taxes.value + +ads.value - +discount.value
        total.innerHTML = result
        total.style.background = "#040"
    }
    else{
        total.innerHTML = ''
        total.style.background = "#a00d02"
    }
}

function clearInputs(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    total.style.background = "#a00d02"
    count.value = '';
    category.value = '';
}

submit.onclick = function(){
    if(title.value !== "" && price.value !== ""&& +price.value > 0){
        let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value.trim() === '' || +count.value <= 0 ? 1 : count.value,
        category: category.value,
        }
        if (mode === "create") {
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products))
        } else{
            products[temp] = newProduct;
            showData();
            submit.innerHTML = "Create";
            mode = "create";
        }
    }
    else {
        alert('Please fill The Title and Price fields')
    }
    
    clearInputs();
    showData();
}

function updateProduct(index){
    let product = products[index];
    title.value = product.title;
    price.value = product.price;
    taxes.value = product.value;
    ads.value = product.ads;
    discount.value = product.discount;
    count.value = product.count;
    category.value = product.category;
    calcTotal();
    mode = "update";
    temp = index;
    submit.innerHTML = "Update";
    scroll({
        top: "0px",
        behavior: "smooth"
    })

}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    showData();
}

function deleteAllProducts(){
    localStorage.clear();
    products.splice(0);
    showData();
}

SearchbyTitle.onclick = function(){
    let value = search.value;
    let table='';
    let result = products.filter(product => product.title.toLowerCase().includes(value.toLowerCase()));
    for (let i = 0; i < result.length; i++) {
        table += `
            <tr>
            <td>${i+1}</td>
            <td>${result[i].title}</td>
            <td>${result[i].price}</td>
            <td>${result[i].taxes}</td>
            <td>${result[i].ads}</td>
            <td>${result[i].discount}</td>
            <td>${result[i].total}</td>
            <td>${result[i].category}</td>
            <td>${result[i].count}</td>
            <td><button onclick="updateProduct(${i})">Update</button></td>
            <td><button onclick="deleteProduct(${i})">Delete</button></td>
            </tr>
        `
    }
    document.getElementById('products-container').innerHTML = table;
}

SearchbyCategory.onclick = function(){
    let value = search.value;
    let table='';
    let result = products.filter(product => product.category.toLowerCase().includes(value.toLowerCase()));
    for (let i = 0; i < result.length; i++) {
        table += `
            <tr>
            <td>${i+1}</td>
            <td>${result[i].title}</td>
            <td>${result[i].price}</td>
            <td>${result[i].taxes}</td>
            <td>${result[i].ads}</td>
            <td>${result[i].discount}</td>
            <td>${result[i].total}</td>
            <td>${result[i].category}</td>
            <td>${result[i].count}</td>
            <td><button onclick="updateProduct(${i})">Update</button></td>
            <td><button onclick="deleteProduct(${i})">Delete</button></td>
            </tr>
        `
    }
    document.getElementById('products-container').innerHTML = table;
}