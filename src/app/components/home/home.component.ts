import { Component, OnInit, OnDestroy } from "@angular/core";
import { NewsService } from "src/app/services/news.service";
import { Article } from "src/app/Models/Article";
import { NgxSpinnerService } from "ngx-spinner";
import { SnotifyService } from "ng-snotify";
import { Source } from "src/app/Models/Source";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Subscription } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalContentComponent } from "src/app/modal-content/modal-content.component";
import { ActivatedRoute } from "@angular/router";

@AutoUnsubscribe()
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  currentPage = 1;
  totalResults: number;
  queryQStr = "";
  sources: Source[] = [];
  selectedSourceId = "";
  getEverythingSub: Subscription;
  getSourcesSub: Subscription;
  routeSub: Subscription;
  getHeadlinesSub: Subscription;

  // Headlines Logic
  isHeadlines: boolean;
  countries: { id: string; name: string }[] = [];
  selectedCountry = "";

  constructor(
    private newsServ: NewsService,
    private spinner: NgxSpinnerService,
    private snotifyService: SnotifyService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subToRoute();
  }

  ngOnDestroy() {}

  subToRoute() {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      if (params["headlines"]) {
        this.isHeadlines = true;
      } else {
        this.isHeadlines = false;
      }
      this.getSources();
    });
  }

  getEverything() {
    this.spinner.show();
    this.getEverythingSub = this.newsServ
      .getEverythingPaginated10(
        this.selectedSourceId,
        this.currentPage,
        this.queryQStr !== "" ? this.queryQStr : undefined
      )
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.articles = data["articles"];
          // AS I GOT THIS MESSAGE
          // "You have requested too many results. Developer accounts are limited to a max of 100 results. You are trying to request results 990 to 1000. Please upgrade to a paid plan if you need more results."
          // WHEN pageSize ABOVE 1000
          if (data["totalResults"] < 100) {
            this.totalResults = Math.ceil(data["totalResults"] / 10) * 10;
          } else {
            this.totalResults = 100;
          }
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  getHeadlines() {
    this.spinner.show();
    this.getHeadlinesSub = this.newsServ
      .getHeadlinesPaginated10(
        this.selectedSourceId,
        this.currentPage,
        this.queryQStr !== "" ? this.queryQStr : undefined,
        this.selectedCountry !== "" ? this.selectedCountry : undefined
      )
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.articles = data["articles"];
          if (data["totalResults"] < 100) {
            this.totalResults = Math.ceil(data["totalResults"] / 10) * 10;
          } else {
            this.totalResults = 100;
          }
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  onPageChange() {
    if (!this.isHeadlines) {
      this.getEverything();
    } else {
      this.getHeadlines();
    }
  }

  onSearchQClick() {
    this.currentPage = 1;
    if (!this.isHeadlines) {
      this.getEverything();
    } else {
      this.getHeadlines();
    }
  }

  getSources() {
    this.spinner.show();
    this.getSourcesSub = this.newsServ.getSources().subscribe(
      (data) => {
        this.sources = data["sources"];
        // Initially
        this.selectedSourceId = this.sources[0]["id"];
        if (this.isHeadlines) {
          this.getCountries();
          this.getHeadlines();
        } else {
          this.getEverything();
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getCountries() {
    this.countries = this.newsServ.getCountries();
  }

  // This is for Everything
  onSourceChange() {
    if (!this.selectedSourceId) {
      this.snotifyService.error("You have to add a news-source");
      return;
    } else {
      // console.log(this.selectedSourceId);
      this.currentPage = 1;
      this.getEverything();
    }
  }

  // NULL country if there is source
  onSourceChangeForHeadlines() {
    if (!this.selectedSourceId) {
      // Init it to (EG)
      this.selectedCountry = this.countries[0]["id"];
      this.currentPage = 1;
      this.getHeadlines();
    } else {
      this.selectedCountry = "";
      this.currentPage = 1;
      this.getHeadlines();
    }
  }

  // NULL source if there is country
  onCountryChange() {
    if (this.selectedCountry) {
      this.selectedSourceId = "";
      this.currentPage = 1;
      this.getHeadlines();
    } else {
      this.selectedSourceId = this.sources[0]["id"];
      this.currentPage = 1;
      this.getHeadlines();
    }
  }

  onArticleClick(article: Article) {
    const modalRef = this.modalService.open(ModalContentComponent, {
      size: "lg",
    });
    modalRef.componentInstance.article = article;
  }
}
