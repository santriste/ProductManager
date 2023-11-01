import {promises as fs} from "fs"

export default class ProductManager {
constructor() {
    this.patch = "./productos.txt";
    this.products = []
    }

    static id = 0; 

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        ProductManager.id++
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id,
        };

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    };

getProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    if(!respuesta3.find((product) => product.id === id)){
        console.log("Producto no encontrado");
    } else {
        console.log(respuesta3.find((product) => product.id === id));
    }
    };

deleteProductsById = async (id) =>{
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter(products => products.id != id)
    await fs.writeFile(this.patch, JSON.stringify(productFilter));
    console.log("Producto Eliminado")
}; 

updateProducts = async ({id, ...producto}) => {   
    await this.deleteProductsById(id);
    let productOld = await this.readProducts()
    let modifiedProducts = [ {...producto, id}, ...productOld];
    await fs.writeFile(this.patch, JSON.stringify(modifiedProducts));
    };

}


//const productos = new ProductManager();

//  productos.addProduct("titulo1", "descripcion1", 1000, "imagen1", "a1", 5);
//  productos.addProduct("titulo2", "descripcion2", 1500, "imagen2", "a2", 10);
//  productos.addProduct("titulo3", "descripcion3", 2000, "imagen3", "a3", 15);
//  productos.addProduct("titulo4", "descripcion4", 2000, "imagen4", "a4", 15);
//  productos.addProduct("titulo5", "descripcion5", 2000, "imagen5", "a5", 15);
//  productos.addProduct("titulo6", "descripcion6", 2000, "imagen6", "a6", 15);
//  productos.addProduct("titulo7", "descripcion7", 2000, "imagen7", "a7", 15);
//  productos.addProduct("titulo8", "descripcion8", 2000, "imagen8", "a8", 15);
//  productos.addProduct("titulo9", "descripcion9", 2000, "imagen9", "a9", 15);
//  productos.addProduct("titulo10", "descripcion10", 2000, "imagen10", "b1", 15);

//productos.getProducts()

//productos.getProductsById(3);

//productos.deleteProductsById(2)

/*productos.updateProducts({    title: 'titulo3',
    description: 'descripcion3',
    price: 5000,
    thumbnail: 'imagen3',
    code: 'asd789',
    stock: 15,
    id: 3})*/