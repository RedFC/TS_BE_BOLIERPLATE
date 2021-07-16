"use strict";
import { PrismaClient } from '@prisma/client'; 

interface IImageCreate {
    cloudinaryId: string;
    path: string;
}

const select = {
    id: true,
    cloudinaryId: true,
    path: true,
    type: true,
    createdAt: true,
    updatedAt: true,
}

export interface ICloudinaryUpload {
  id: string;
  path: string;
  url: string;
}

export class ImageService {
    private prisma;
    constructor() {
        this.prisma = new PrismaClient();
    }
    // create(images: IImageCreate[]): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         this.prisma.productImages
    //             .createMany({ data: images })
    //             .then(images => {
    //                 resolve(images)
    //             })
    //             .catch(error => reject(error))
    //             .finally(() => this.prisma.$disconnect())
    //         })
    // }
    // find(where): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         this.prisma.productImages
    //             .findMany({ where, select })
    //             .then(images => resolve(images))
    //             .catch(error => reject(error))
    //             .finally(() => this.prisma.$disconnect())
    //     })
    // }
    // findOne(where): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         this.prisma.productImages
    //             .findFirst({ where, select })
    //             .then(images => resolve(images))
    //             .catch(error => reject(error))
    //             .finally(() => this.prisma.$disconnect())
    //     })
    // }
    // delete(where): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         this.prisma.productImages
    //             .deleteMany({ where })
    //             .then(images => resolve(images))
    //             .catch(error => reject(error))
    //             .finally(() => this.prisma.$disconnect())
    //     })
    // }
}