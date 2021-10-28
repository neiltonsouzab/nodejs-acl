import { Request, Response } from "express";
import { CreateProductService } from "../services/CreateProductService";
import { ListProductService } from "../services/ListProductService";

export class ProductController {
  async list(request: Request, response: Response): Promise<Response> {
    const listProductService = new ListProductService();

    const products = await listProductService.execute();

    return response.json(products);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, description, price } = request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name,
      description,
      price,
    });

    return response.status(201).json(product);
  }
}