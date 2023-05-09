import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/data/product.service';
import { Location } from '@angular/common';
import { CartService } from 'src/app/core/data/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.getProduct();
  }

  goBack(): void {
    this.location.back();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe((product) => this.product = product);
  }

  addToCart(): void{
    this.cartService.addItemToCart(this.product);
    this.snackBar.open('Item added to cart', 'View Cart', { duration: 3000 })
    .onAction().subscribe(()=> this.router.navigate(['/cart']));
  }

}
