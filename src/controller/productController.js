const productModel = require('../model/productModel');
const multer = require('multer');

const { isValidName, isValidNumber, isValidEmail, isValidPassword, isValid, isValidObjectId } = require('../validation/valid')

const storage = multer.diskStorage({
    
}) 

const createProduct = async function (req, res) {
    try {
        let data = req.body
        let { title, desc, price, img, review, category } = data

        //------------------validation for request body------------------
        if (Object.keys(data).length < 1) { return res.status(400).send({ status: false, message: "Data is required to create a product" }) }

        //------------------validation for title------------------
        if (!isValid(title)) { return res.status(400).send({ status: false, message: "Enter title" }) }
        if (!isValidName(title)) { return res.status(400).send({ status: false, message: "Enter valid title" }) }

        //------------------validation for description------------------
        if (!isValid(desc)) { return res.status(400).send({ status: false, message: "Enter description" }) }
        if (!isValidName(desc)) { return res.status(400).send({ status: false, message: "Enter valid description" }) }

        //------------------validation for price------------------
        if (!isValid(price)) { return res.status(400).send({ status: false, message: "Enter price" }) }
        if (!isValidNumber(price)) { return res.status(400).send({ status: false, message: "Enter valid price" }) }

        if (!isValid(review)) { return res.status(400).send({ status: false, message: "Enter review" }) }
        if (!isValidNumber(review)) { return res.status(400).send({ status: false, message: "Enter valid review" }) }

        if (!isValid(category)) { return res.status(400).send({ status: false, message: "Enter category" }) }
        if (!isValidName(category)) { return res.status(400).send({ status: false, message: "Enter valid category" }) }


        //------------------db call for making title unique------------------
        let checkTitle = await productModel.findOne({ title: title })
        if (checkTitle) return res.status(400).send({ status: false, message: "Title already exists" })

        let savedata = await productModel.create(data)
        return res.status(201).send({ status: true, message: 'products created successfully', data: savedata })

    } catch (err) {
        res.status(500).send({ status: false, message: err });
    }
}

const getProductByParam = async function (req, res) {
    try {
        let productId = req.params.productId;
        if (!isValidObjectId(productId)) { return res.status(400).send({ status: false, message: 'Please provide valid productId' }) }

        const product = await productModel.findOne({ _id: productId })
        if (!product) return res.status(404).send({ status: false, message: "No product found" })
        return res.status(200).send({ status: true, message: 'Success', data: product })
    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

const getProduct = async function (req, res) {
    try {
        let filter = {}
        if (req.query) {
            let data = req.query

            let { title, priceSort, priceGreaterThan, priceLessThan } = data

            //------------------if we want to filter through title (name)------------------
            if (title) {
                if (!isValid(title)) { return res.status(400).send({ status: false, message: "Enter product name" }) }
                //filter['title'] = title
            }


            //------------------if we want to filter through for price greater than------------------
            if (priceGreaterThan) {
                if (!isValid(priceGreaterThan)) { return res.status(400).send({ status: false, messsage: "Enter value for priceGreaterThan field" }) }
                filter['price'] = { '$gte': priceGreaterThan }
            }

            //------------------if we want to filter through for price less than------------------
            if (priceLessThan) {
                if (!isValid(priceLessThan)) { return res.status(400).send({ status: false, messsage: "Enter value for priceLessThan" }) }
                filter['price'] = { '$lte': priceLessThan }
            }

            if (priceLessThan && priceGreaterThan) { filter['price'] = { '$lte': priceLessThan, '$gte': priceGreaterThan } }

            if (priceSort) {
                if ((priceSort == 1 || priceSort == -1)) {
                    let filterProduct = await productModel.find({ filter }).sort({ price: priceSort })
                    if (!filterProduct) {
                        return res.status(404).send({ status: false, message: "No products found with this query" })
                    }
                    return res.status(200).send({ status: true, message: "Success", data: filterProduct })
                }
                return res.status(400).send({ status: false, message: "priceSort must have 1 or -1 as input" })
            }
        }

        let findProduct = await productModel.find()
        if (!findProduct) {
            return res.status(404).send({ status: false, message: "No products found with this query" })
        }
        return res.status(200).send({status:true, message:"sucess", data:findProduct})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createProduct, getProductByParam, getProduct }