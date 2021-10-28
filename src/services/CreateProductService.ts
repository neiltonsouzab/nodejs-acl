import { AppError } from "../error/AppError";
import { Product } from "../models/Product";
import { ProductsRepository } from "../repositories";

type CreateProductRequest = Pick<Product, 'name' | 'description' | 'price'>;

export class CreateProductService {
  async execute({ name, description, price }: CreateProductRequest): Promise<Product> {
    const productAlreadyExists = await ProductsRepository().findOne({
      name,
    });

    if (productAlreadyExists) {
      throw new AppError('Product already exists.');
    }

    const product = ProductsRepository().create({
      name,
      description,
      price,
    });

    await ProductsRepository().save(product);

    return product;
  }
}