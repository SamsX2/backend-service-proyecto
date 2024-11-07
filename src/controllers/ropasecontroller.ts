import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Ropase";

const RopaseRepository = AppDataSource.getRepository(Product);

// GET - Obtener Todos los Productos
export const getAllropase = async(red: Request, res: Response) => {
  try {
    const Ropase = await RopaseRepository.find();
    res.json(Ropase);
  } catch(error) {
    res.status(500).json({ message: "Error al obtener productos." });
  }
};

// GET by ID - Obetener Producto por ID
export const getRopaseById = async(req: Request, res: Response) => {
  try {
    const Ropase = await RopaseRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if(Ropase) {
      res.json(Ropase);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al obtener el producto." });
  }
};

// POST - Crear un nuevo Producto
export const createRopase = async(req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const product = new Ropase();
    product.name = name;
    product.description = description;
    product.price = price;

    await RopaseRepository.save(product);
    res.status(201).json(product);
  } catch(error) {
    res.status(500).json({ message: "Error al crear el producto." });
  }
};

// PUT - Actualizar un Producto existente
export const updateProduct = async(req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const Ropase = await RopaseRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if(Ropase) {
      Ropase.name = name ?? Ropase.name;
      Ropase.description = description ?? Ropase.description;
      Ropase.price = price ?? Ropase.price;

      await RopaseRepository.save(Ropase);
      res.json(Ropase);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al actualizar el producto." });
  }
};

// DELETE - Borrar un Producto
export const deleteRopase = async(req: Request, res: Response) => {
  try {
    const Ropase = await RopaseRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if (Ropase) {
      await RopaseRepository.remove(Ropase);
      res.json({ message: "Producto eliminado." });
    } else {
      res.status(404).json({ message: "Producto no encontrado." });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al eliminar el producto." });
  }
};