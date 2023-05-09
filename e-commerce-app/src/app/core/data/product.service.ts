import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from 'src/app/features/product';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'assets/products.json';
  private dbPath = '/products';

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
  ){}


  getProducts(): Observable<Product[]> {
    return this.db.list<Product>(this.dbPath).valueChanges();
  }

  getProduct(id: number): Observable<Product> {
    return this.db.list<Product>('products', ref => ref.orderByChild('id').equalTo(id)).valueChanges()
      .pipe(
        map(products => {
          if(products.length > 0) {
            return products[0];
          } else {
            throw new Error('Product not found');
          }
        })
      );
  }

  searchProducts(term: string): Observable<Product[]> {
    return this.db.list<Product>('products').valueChanges().pipe(
      map(products => {
        if (!term || term.trim() === '') {
          return products;
        }
        term = term.toLowerCase();
        return products.filter(product =>
          product.title.toLowerCase().includes(term)
        );
      })
    );
  }

  // Below methods used to populate or clear database of products. These methods are not used during runtime of application.
  loadProducts(): void {
    this.db.list('products').valueChanges().subscribe(products => {
      if (products.length === 0) {
        this.http.get<any[]>(this.productsUrl).subscribe(products => {
          products.forEach(product => {
            this.db.list('products').push(product);
          });
        });
      }
    });
  }

  clearProductList(): void {
    const productListRef = this.db.list(this.dbPath);
    productListRef.remove()
      .catch(error => {
        console.log('Error deleting products', error);
      });
  }
}


