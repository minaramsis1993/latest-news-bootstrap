import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";

import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SnotifyModule, SnotifyService, ToastDefaults } from "ng-snotify";
import { NgSelectModule } from "@ng-select/ng-select";
import { NoResultsComponent } from "./components/no-results/no-results.component";
import { ArticleComponent } from "./components/article/article.component";
import { ModalContentComponent } from "./modal-content/modal-content.component";
import { ArticleDetailsComponent } from "./components/article-details/article-details.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NoResultsComponent,
    ArticleComponent,
    ModalContentComponent,
    ArticleDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbPaginationModule,
    NgxSpinnerModule,
    SnotifyModule,
    NgSelectModule,
  ],
  providers: [
    SnotifyService,
    { provide: "SnotifyToastConfig", useValue: ToastDefaults },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalContentComponent],
})
export class AppModule {}
