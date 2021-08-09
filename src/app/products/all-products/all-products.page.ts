import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
})
export class AllProductsPage implements OnInit {

  products: Product[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(productData => {
      console.log(productData);
      const products: Product[] = [];

      for(const key in productData){
        if(productData.hasOwnProperty(key)){
          products.push({
            id: key,
            title: productData[key].title,
            type: productData[key].type,
            description: productData[key].description,
            amount: productData[key].amount,
            price: productData[key].price,
            yearOfProduction: productData[key].yearOfProduction,
            packaging: productData[key].packaging,
            imageUrl: productData[key].imageUrl,
          });
        }
      }
      this.products = products;
    });
  }

}
