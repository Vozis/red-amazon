import * as dotenv from 'dotenv';
import { PrismaClient, Product } from '@prisma/client';
import { faker } from '@faker-js/faker';
import slug = require('slug');

dotenv.config();

// initialize Prisma Client
const prisma = new PrismaClient();

const createProduct = async (quantity: number) => {
  const products: Product[] = [];

  for (let i = 0; i < quantity; i += 1) {
    const productName = faker.commerce.productName();
    const categoryName = faker.commerce.department();

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: slug(productName),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price(10, 999, 0),
        images: Array.from({
          length: faker.datatype.number({ min: 2, max: 6 }),
        }).map(() => faker.image.imageUrl()),
        category: {
          create: {
            name: categoryName,
            slug: slug(categoryName),
          },
        },
        reviews: {
          create: [
            {
              rating: faker.datatype.number({ min: 1, max: 5 }),
              text: faker.lorem.paragraph(),
              user: {
                connect: {
                  id: 1,
                },
              },
            },
            {
              rating: faker.datatype.number({ min: 1, max: 5 }),
              text: faker.lorem.paragraph(),
              user: {
                connect: {
                  id: 1,
                },
              },
            },
          ],
        },
      },
    });

    products.push(product);
  }

  console.log(`Created ${products.length} products`);
};

async function main() {
  console.log('Start seeding...');
  await createProduct(10);
}

// execute the main function
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
