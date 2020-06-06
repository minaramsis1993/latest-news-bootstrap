import { Component, OnInit, OnDestroy } from "@angular/core";
import { NewsService } from "src/app/services/news.service";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Router } from "@angular/router";
import { Article } from "src/app/Models/Article";
import * as moment from "moment";

@AutoUnsubscribe()
@Component({
  selector: "app-article-details",
  templateUrl: "./article-details.component.html",
  styleUrls: ["./article-details.component.scss"],
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  article: Article;

  constructor(private newsServ: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentArticle();
  }

  ngOnDestroy(): void {}

  getCurrentArticle() {
    let value = this.newsServ.getArticleSubLastValue();
    if (!value) {
      this.router.navigate(["/home"]);
    } else {
      this.article = value;
      this.article.publishedAt = moment(this.article.publishedAt).format(
        "MMMM Do YYYY"
      );
    }
  }
}
