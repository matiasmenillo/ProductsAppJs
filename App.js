class Product {
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}


class UI{

    addProduct(product){
       const productList = document.getElementById('product-list');
       const element = document.createElement('div');
       element.innerHTML = `
                <div class="card text-center mb-4">
                    <div class="card-body">
                        <strong> Product Name </strong>: ${product.name}
                        <strong> Product Price </strong>: ${product.price}
                        <strong> Product Year </strong>: ${product.year}
                        <a href='#' name='delete' class='btn btn-danger'>Delete</a>
                    </div>
                </div>`
        productList.appendChild(element);
        
    }


    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        if(element.name === "delete"){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product deleted successfully', 'info');
        }

    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        //Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        },3000);
    }

} 
//DOM events
//Capturo el evento submit y cuando lo capture voy a ejecutar una funcion
document.getElementById('product-form').addEventListener('submit', function(e) {

    
    const productName = document.getElementById('name').value;
    const productPrice = document.getElementById('price').value;
    const productYear = document.getElementById('year').value;
    const product = new Product(productName, productPrice, productYear);
    const ui = new UI();

    if(productName === '' || productPrice === '' || productYear === ''){
        return ui.showMessage("Complete the fields please", "danger");
    }
    
    ui.addProduct(product);
    ui.resetForm()
    ui.showMessage('Product Added successfully', 'success');

    console.log(product); 
    e.preventDefault();
})

document.getElementById('product-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);
    console.log(e.target)
})
