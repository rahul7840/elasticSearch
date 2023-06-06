import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import { CreatProductDto } from './dto/creatProduct.dto';
import { ListDTO } from './dto/list.dto';
import { UpdateProductDto } from './dto/update.dto';

@Injectable()
export class AppService {
  private readonly esclient: elasticsearch.Client;
  client: any;
 
  constructor() {
    this.esclient = new elasticsearch.Client({ 
      host: 'YOUR-ELASTIC-URL',
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



//----------------------------------insert/creat-------------------------


  async createProduct(productDto: CreatProductDto) {
    const {
      product_title,
      product_category,
      date
    } = productDto;

    // const index = 'Myindex';

    const newBody = [];

    const body = {
      product_title,
      product_category,
      date,
    };
    newBody.push({ index: 'prodduct' });
    newBody.push(body);
    // console.log('========-->', newBody);
    try {
      const result = await this.esclient.bulk({
        body: [
          {
            index: {
              _index: `productindexx`,
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
//----------------------------------insert/creat--part(2)-------------------------

async ccreateProduct(productDto:CreatProductDto){
  const { product_title,product_category,date}=productDto
  const body={ product_title,product_category,date}
  try{
   const result = await this.esclient.index({index: 'productindexx', body:body})
   if(result)return{message:"Data created succesfully! "}
   else return{message:"Unable to creat"}

  }catch(e){
    throw new BadRequestException("getting error during creation -->",e)
  }
}


//----------------------------------histogram-date-------------------------
  

async histogramDate(){
    try{  
      const body = await this.esclient.search({
        index: 'productindexx',
        size : 0,
        body: {
          aggregations: {   
            dates: {
              date_histogram: {
                field: "date",
                interval: '1d',
                format: 'yyyy-MM-dd',
              }
            }
        }
      }
      })
      let object = body.aggregations.dates.buckets
      let key = []
      let doc_count = []
  
      for (var i in object){
        key.push(object[i].key_as_string)
      }
      console.log(key)
  
      for (var i in object){
       doc_count.push(object[i].doc_count)
      }
      console.log(doc_count)
      
      let result = {key,doc_count}
      return result
    
  }catch(error) {
    console.error('Error-->:', error);
    throw error;
  }
  }


//----------------------------------get-all-------------------------
  

async getProduct() {
    try {
      const body = await this.esclient.search({
        index: 'productindexx',
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
  

//----------------------------------get-by-id-------------------------
  
async getProductById(id) {
    try {
      const body = await this.esclient.search({
        index: 'productindexx',
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


//----------------------------------pagination-------------------------


  async getlistProduct(listDto: ListDTO) {
    try {
      const { pageno, limit } = listDto;
      // if (pageno <= 0) limit += 1;

      const response = await this.esclient.search({
        index: 'productindexx',
        body: {
          size: limit,
          from: (pageno-1)*limit,
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


//----------------------------------histogram-------------------------
  

async histogram() {
    try {
      const response = await this.esclient.search({
        index: 'productindexx',
        size: 0,
        body: {
          aggregations: {
            reviews: {
              histogram: {
                // fielddata: true,
                field: 'review',
                interval: 100,
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


//-------------------------------------------delete------------------------

async removeProduct(id: string) {
      const index = 'product-index';
      const deleteResponse = await this.esclient.deleteByQuery({
        index: 'productindexx',
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
        index: 'productindexx',
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
}
