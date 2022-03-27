import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

const categoryRouter = express.Router();

categoryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.send(categories);
  })
);

categoryRouter.post(
  "/create",
  expressAsyncHandler(async (req, res) => {
    const category = await Category({ name: req.body.name });
    const createdCategory = await category.save();
    console.log(createdCategory);
    res.send({
      _id: createdCategory._id,
      name: createdCategory.name,
      stock: createdCategory.stock,
    });

    // res.status(401).send({message: 'Categoria Creada'});
  })
);

categoryRouter.put("/:id", expressAsyncHandler( async (req, res) => {
    console.log(req.body.props.name);
    console.log(req.params.id);
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (category) {
      category.name = req.body.props.name;
      const updatedCategory = await category.save();
      res.send({ message: "Category Updated", category: updatedCategory });
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      const deletedCategory = await category.remove();
      res.send({ message: "User Deleted", category: deletedCategory });
    } else {
      res.status(400).send({ message: "El Usuario no funcion" });
    }

    res.send(users);
  })
);

export default categoryRouter;
