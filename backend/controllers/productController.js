import Product from "../models/Product.js";

export async function getProducts(req, res, next) {
  try {
    const { category, search, popular } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (popular) filter.isPopular = true;
    if (search) filter.title = { $regex: search, $options: "i" };
    const products = await Product.find(filter).sort("-createdAt");
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
}

export async function addReview(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());
    if (alreadyReviewed) return res.status(409).json({ message: "Product already reviewed" });
    product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(req.body.rating), comment: req.body.comment });
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.numReviews;
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}
