import { Component, OnInit, Input } from "@angular/core";
import { Article } from "../Models/Article";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { NewsService } from "../services/news.service";

@Component({
  selector: "app-modal-content",
  templateUrl: "./modal-content.component.html",
  styleUrls: ["./modal-content.component.scss"],
})
export class ModalContentComponent implements OnInit {
  @Input() public article: Article;
  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private newsServ: NewsService
  ) {}

  ngOnInit(): void {
    console.log(this.article);
  }

  viewDetails() {
    // console.log(this.article);

    this.newsServ.setArticleSub(this.article);
    this.activeModal.close();
    this.router.navigate(["/details"]);
  }
}
