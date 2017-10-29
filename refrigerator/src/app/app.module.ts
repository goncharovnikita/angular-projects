import { AccountingEffects } from './accounting/accounting.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components import
import { AppComponent } from './app.component';
import { ProductsComponent } from './product/products.component';
import { AuthComponent } from './accounting/auth/auth.component';
import { LoginComponent } from './accounting/login/login.component';
import { RefrigeratorsComponent } from './refrigerator/refrigerators.component';

// Modules import
import { HttpModule } from '@angular/http';
import { MyMaterialModule } from './my-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductModule } from './product/product.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RefrigeratorModule } from './refrigerator/refrigerator.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product/product.effects';
import { RefrigeratorEffects } from './refrigerator/refrigerator.effects';

// Services import
import { ProductService } from './product/product.service';
import { AccountService } from './accounting/account.service';

// Directives import
import { RedOutlineDirective } from './red-outline.directive';

// Functions import
import { accountReducer } from './accounting/account.reducer';
import { productsReducer } from './product/products.reducer';
import { refrigeratorsReducer } from './refrigerator/refrigerators.reducer';

// Environment
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    component: RefrigeratorsComponent
  },
  {
    path: 'refrigerator/:id',
    component: ProductsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    RedOutlineDirective,
    AuthComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MyMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ProductModule,
    RefrigeratorModule,
    RouterModule.forRoot(
      routes
    ),
    AngularFireModule.initializeApp(environment.firebaseSecret),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StoreModule.forRoot({
      account: accountReducer,
      products: productsReducer,
      refrigerators: refrigeratorsReducer
    }),
    EffectsModule.forRoot([
      ProductEffects,
      RefrigeratorEffects,
      AccountingEffects
    ])
  ],
  providers: [
    ProductService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
