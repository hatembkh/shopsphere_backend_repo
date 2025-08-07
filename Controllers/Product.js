const Product = require("../Models/Product")

exports.AddProduct = async (req, res) => {
    try {
        const { name, price, description, releaseDate, stockQty, category } = req.body;

        if (!req.file) {
            return res.status(400).json({ errors: [{ msg: 'Image is required' }] });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            releaseDate,
            stockQty,
            category,
            image: {
                path: `/${req.file.filename}`,
                filename: req.file.filename
            }
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.GetAllProducts = async (req, res) => {
    try {
        const getAllProducts = await Product.find()

        res.status(200).send({ msg: 'Products', getAllProducts })
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not get Products ' }] })
    }
}

exports.GetOneProduct = async (req, res) => {
    try {
        const { id } = req.params

        const getOneProduct = await Product.findById(id)

        res.status(200).send({ msg: 'Product', getOneProduct })
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not get Product' }] })
    }
}

exports.UpdateProduct = async (req, res) => {
    try {
        const { name, price, category, stockQty, releaseDate, description } = req.body;

        const existingProduct= await Product.findById(req.params.id)

        const updateData = {
            name: name || existingProduct.name,
            price: price || existingProduct.price,
            description: description || existingProduct.description,
            releaseDate: releaseDate || existingProduct.releaseDate,
            stockQty: stockQty || existingProduct.stockQty,
            category: category || existingProduct.category,
        };
        if (req.file) {
            updateData.image = {
                path: `/${req.file.filename}`,
                filename: req.file.filename
            };
        } 


        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        await Product.findByIdAndDelete(id)

        res.status(200).send({ msg: 'Poduct Deleted' })
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not Delete Product' }] })
    }
}