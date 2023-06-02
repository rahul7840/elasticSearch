import { Client } from '@elastic/elasticsearch';

const client = new Client({ node: 'http://localhost:9200' });

async function createIndex(Myindex: string) {
  try {
    // Create the index
    await client.indices.create({
      index: Myindex,
      body: {
        mappings: {
          properties: {
            product_title: { type: 'text' },
            product_category: { type: 'keyword' },
            brand_name: { type: 'keyword' },
          },
        },
      },
    });

    console.log(`Index '${Myindex}' created successfully.`);
  } catch (error) {
    console.error('An error occurred while creating the index:', error);
  }
}

createIndex('products');
