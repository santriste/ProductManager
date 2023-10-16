class ProductManager {
    constructor() {
        this.products = [];
    }

    static id = 0

    addProduct(title, description, price, thumbnail, code, stock) {

        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === code) {
                console.log(`El codigo ${code} esta repetido`);
                break;
            }
        }

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        if (!Object.values(newProduct).includes(undefined)) {
            ProductManager.id++
            this.products.push({
                    ...newProduct,
                    id: ProductManager.id,
                });
        }else{
            console.log("Todos los campos son requeridos.")
        }



    }

    getProduct() {
        return this.products;
    }

    existe(id) {
        return this.products.find((producto) => producto.id === id)
    }

    getProductById(id) {
        !this.existe(id) ? console.log("Not Found") : console.log(this.existe(id));

    }
}

const productos = new ProductManager();


//array vacio
console.log(productos.getProduct());

//Productos
productos.addProduct('titulo1', 'descripcion1', 1, "thumbnail1", "a1", 5);
productos.addProduct('titulo2', 'descripcion2', 1, "thumbnail2", "b1");

//array con productos
console.log(productos.getProduct());

//validacion code repetido
productos.addProduct('titulo3', 'descripcion3', 1, "thumbnail3", "b1", 5);

//busqueda por id
productos.getProductById(2)

//ID Not found
productos.getProductById(5)