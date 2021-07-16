"use strict";
import { PrismaClient } from '@prisma/client';
import { Category } from '../models/category.model'
import { SubCategory } from '../models/sub.category.model'
import { IUser } from '../models/user.model';
import { RedisService } from '../../cache/redis.service';




export class ProductService extends RedisService{

  private prisma;
  constructor() {
    super()
    this.prisma = new PrismaClient();
  }

  createCategory(schema: string): Promise<Category> {
    return new Promise((resolve, reject) => {
      this.prisma.category
        .create({
          data: { name: schema }
        })
        .then(Category => resolve(Category))
        .catch(error => reject(error))
        .finally(() => this.prisma.$disconnect())
    });
  }

  createSubCategory(name: string, categoryId: string): Promise<SubCategory> {
    return new Promise((resolve, reject) => {
      this.prisma.subCategory
        .create({
          data: { name: name, categoryId: categoryId }
        })
        .then(SubCategory => resolve(SubCategory))
        .catch(error => reject(error))
        .finally(() => this.prisma.$disconnect())
    });
  }


  getOneCategory(where): Promise<Category> {
    return new Promise((resolve, reject) => {

      this.prisma.category
        .findFirst({ where })
        .then(Category => resolve(Category))
        .catch(error => reject(error))
        .finally(() => this.prisma.$disconnect())

    })
  }

  getOneSubCategory(where): Promise<SubCategory> {
    return new Promise((resolve, reject) => {

      this.prisma.subCategory
        .findFirst({ where })
        .then(SubCategory => resolve(SubCategory))
        .catch(error => reject(error))
        .finally(() => this.prisma.$disconnect())

    })
  }

  // REDIS PRODUCT SERVICES

  setProductDataRedis(data) {
    data.map(data => {
      this.setData(data,`${data.id}|${data.title}|product`,0)
    })
  }

  updateProductDataRedis(product) {
    this.setData(product, `${product.id}|${product.title}|product`, 0)
    .catch((error) => { throw error })
  }

  deleteProductDataRedis(Key) {
    this.searchAndDeleteKeys(Key)
      .catch((error) => { throw error })
  }


  
}