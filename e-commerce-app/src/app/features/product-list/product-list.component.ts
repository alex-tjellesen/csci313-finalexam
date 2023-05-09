import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/data/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  gridColumns = 3;

  constructor(private productService: ProductService) {}

  ngOnInit(): void{
    this.loadProducts();
    this.getProducts();    
  }

  getProducts(): void{
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  loadProducts(): void{
    this.productService.loadProducts();
  }

  clearProductList(): void{
    this.productService.clearProductList();
  }
}
