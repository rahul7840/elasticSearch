import { Injectable, HttpException, BadGatewayException } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import { CreatProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update.dto';
import { ListDTO } from './dto/list.dto';
import { isEmpty } from 'class-validator';
import { ProductCategoriesDto } from './dto/creatCetegories.dto';

@Injectable()
export class AppService {
  private readonly esclient: elasticsearch.Client;
  client: any;

  constructor() {
    this.esclient = new elasticsearch.Client({
      host: process.env.ELASTICSEARCH_NODE,
    });

    this.esclient.ping({ requestTimeout: 3000 }).catch((e) => {
      console.log(e);
      throw new HttpException(
        {
          status: 'error',
          message: 'Unable to reach Elasticsearch cluster',
        },
        500,
      );
    });
  }

  //----------------------------------mapping-----------------------------
  async putMapping() {
    try {
      console.log('Creating Mapping index');
      const response = await this.esclient.putMapping({
        index: 'product-index',
        body: {
          properties: {
            price: {
              type: 'text',
              fielddata: true,
            },
          },
        },
      });

      console.log('Successfully Created Index');
    } catch (error) {
      console.error('Error creating mapping:', error);
    }
  }

  //-----------------------------------getlist---------------------------

  // async getlistProduct(listDto: ListDTO) {
  //   try {
  //     let { limit, pageno } = listDto;

  //     if (pageno < 0) {
  //       pageno = 1;
  //     }
  //     let from = limit * (pageno - 1);

  //     let query = {
  //       bool: {
  //         must: [],
  //       },
  //     };

  //     const searchRequest = {
  //       index: 'product-index',
  //       body: [
  //         {
  //           from,
  //           size: limit,
  //           query,
  //         },
  //       ],

  //       // const { body } = await this.esclient.search(searchRequest);

  //       // const{body}=await this.esclient.search(searchRequest)

  //       // const { body } = await this.esclient.search(searchRequest);

  //       // const final = body.hits.hits.map((hit) => hit._source);
  //       // const count = body.hits.total.value;

  //       // return { data: final, count };
  //     };
  //   } catch {}
  // }

  async getlistProduct(listDto: ListDTO) {
    try {
      const { pageno, limit } = listDto;
      // if (pageno <= 0) limit += 1;

      const response = await this.esclient.search({
        index: 'product-index',
        body: {
          size: 5,
          from: 0,
          query: {
            match_all: {},
          }
        }
      });
      // const totalHits = response.body.hits.total.value;
      // const results = response.body.hits.hits.map((hit) => hit._source);

      return {
        // totalHits,
        // results,
        response,
      };
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  //--------------------------------------------creat---------------------
  async createProduct(productDto: CreatProductDto) {
    const {
      product_title,
      product_category,
      brand_name,
      product_detail,
      price,
      in_stock,
      review,
      dicount,
      keywords,
      product_img,
      payment_type,
      quantity,
      startAt,
      endAt,
      active_status,
      isDeleted,
      createdAt,
      updatedAt,
    } = productDto;

    // const index = 'Myindex';

    const newBody = [];

    const body = {
      product_title,
      product_category,
      brand_name,
      product_detail,
      price,
      in_stock,
      review,
      dicount,
      keywords,
      product_img,
      payment_type,
      quantity,
      startAt,
      endAt,
      active_status,
      isDeleted,
      createdAt,
      updatedAt,
    };

    newBody.push({ index: 'prodduct' });
    newBody.push(body);
    // console.log('========-->', newBody);
    try {
      const result = await this.esclient.bulk({
        body: [
          {
            index: {
              _index: `product-index`,
              _type: `activitylog-ojoj`,
            },
          },
          body,
        ],
      });

      // return { message: 'Data inserted succesfully' };
      console.log(JSON.stringify(result))
      return result;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
  //---------------------------------------creat-two-----------------------
 async creatCategories(categoriesDto:ProductCategoriesDto){

  const { CategoriesName,Description,ParentCategory}=categoriesDto
  const body={CategoriesName,Description,ParentCategory}
  try{
    const result = await this.esclient.index({
      index:'product-categories',
      body:body 
    })
     
    if(result) return {message:"creat succesfully! "}
    else return {message:"failed to creat! "}

  }catch(e){
    console.log("getting error in creat cetrgories",e)
  }
 }

 async categoriesGetAll() {
  try {
    const body = await this.esclient.search({
      index: 'product-categories',
      body: {
        query: {
          match_all: {},
        }, 
      },
    });
    return body;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async categoriesSearch(searchtext) {
  const result = await this.esclient.search({
    index: 'product-categories',
    body: {
      query: {
        match: {
          full_text: searchtext,
        },
      },
    },
  });
  return result;
}




  //-------------------------------------------histogram---------------------
  async histogram() {
    try {
      const response = await this.esclient.search({
        index: 'product-index',
        size: 0,
        body: {
          aggregations: {
            reviews: {
              histogram: {
                // fielddata: true,
                field: 'review',
                interval: 900,
              },
            },
          },
        },
      });
     
      let object = response.aggregations.reviews.buckets
      let key =[]
      let doc_count=[]

      for(var i in object){
        key.push(object[i].key)
      }
 
      for(var i in doc_count){
        doc_count.push(object[i].doc_count)
      }
      
      let final= {key,doc_count}
      return final

    // const histogramResults = response.aggregations.pricee.buckets;
    } catch (error) {
      console.error('Error searching for histogram:', error);
      throw error;
    }
  }
  //--------------------------------------histogram-using-date---------------
  async histogramDate(){
    try{
      const response = await this.esclient.search({
        index:'product-index',
        size:0,
        body:{
          aggregations:{
            dates:{
              date_histogram:{
                field: "createdAt",
                interval:'1d',
                // format: "dd-MM-yyyy"  
              }
            }
          }

        }
      })

      console.log("--->",response)
      return response

    }catch(error){
      console.log("getting erroro here ",error)
    }
  }

  //-------------------------------------------delete------------------------
  async removeProduct(id: string) {
    const index = 'product-index';
    const deleteResponse = await this.esclient.deleteByQuery({
      index: 'product-index',
      body: {
        query: {
          term: {
            _id: id,
          },
        },
      },
    });

    if (deleteResponse) {
      return { statusCode: 200, message: 'Deletion successful!' };
    } else {
      return { statusCode: 404, message: 'Unable to delete!' };
    }
  }

  //-------------------------------------------update------------------------
  async updateProduct(product_id, updateDto: UpdateProductDto) {
    try {
      const {
        product_title,
        payment_type,
        quantity,
        updatedAt,
      
      } = updateDto;

      const body={  
          product_title,
          payment_type,
          quantity,
          updatedAt,
      };

      const result = await this.esclient.updateByQuery({
        index: 'product-index',
        body: {
          query: {
            term: {
              _id: product_id,
            },
          },
        },
      });

 
      // const result = await this.esclient.update({
      //   index: 'product-index',
      //   id: product_id,
      //   body: {
      //     doc:body
      //   },
      // });

      console.log('Result ->', result);
      if (result) {
        return { statusCode: 200, message: 'Update successful!' };
      } else {
        return { statusCode: 404, message: 'Unable to update' };
      }
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
  //-------------------------------------------getAll------------------------
  async getProduct() {
    try {
      const body = await this.esclient.search({
        index: 'product-index',
        body: {
          query: {
            match_all: {},
          },
        },
      });
      return body;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  //-------------------------------------get-product-byID--------------------
  async getProductById(id) {
    try {
      const body = await this.esclient.search({
        index: 'product-index',
        body: {
          query: {
            match: { _id: id },
          },
        },
      });
      return body;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // async update(index: string, id: string, document: any) {
  //   return await this.client.update({
  //     index,
  //     id,
  //     body: {
  //       doc: document,
  //     },
  //   });
  // }

  // async delete(index: string, id: string) {
  //   return await this.client.delete({
  //     index,
  //     id,
  //   });
  // }
  // async create(index: string, document: any) {
  //   return await this.client.index({
  //     index,
  //     body: document,
  //   });
  // }

  // async getById(index: string) {
  //   return await this.client.getAll({
  //     index,
  //   });
  // }
  // async updateProduct(product_id: string, updateDto: UpdateProductDto) {
  //   try {
  //     const { product_title } = updateDto;
  //     const updateBody = {
  //       doc: { product_title },
  //     };

  //     const result = await this.esclient.updateByQuery({
  //       index: `product-index`,
  //       id: 'alhsd899',
  //       body: {
  //         doc: {
  //           product_title: 'boomb',
  //         },
  //       },
  //     });
  //     console.log('Result -> ', result);
  //     if (result) {
  //       return { message: `Update successful!` };
  //     } else {
  //       return { message: `Unable to update` };
  //     }
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //     throw error;
  //   }
  // }  // async removeProduct(product_id: string) {
  //   const deleteResponse = await this.esclient.delete(product_id);

  //   console.log('booom', deleteResponse);
  //   if (!deleteResponse) throw new BadGatewayException('Invalid ID');
  // }
}
