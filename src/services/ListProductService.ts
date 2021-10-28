import { Product } from "../models/Product";
import { ProductsRepository } from "../repositories";

export class ListProductService {
  async execute(): Promise<Product[]> {
    const products = await ProductsRepository().find();

    return products;
  }
}