import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Article } from "src/app/Models/Article";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.scss"],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Output() currentArticle = new EventEmitter<Article>();

  constructor() {}

  ngOnInit(): void {}

  onArticleClick() {
    this.currentArticle.emit(this.article);
  }
}
