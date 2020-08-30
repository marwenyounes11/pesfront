import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService} from '../../service/article.service';
import { ToastrService } from 'ngx-toastr';
import { Article} from '../../model/article';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {
  host :string = "http://localhost:8085";
  errorMessage = '';
  article: Article | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private crudApi: ArticleService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getArticle(id);
    }
  }
 
  getArticle(id: number) {
    this.crudApi.getData(id).subscribe(
      response =>{this.article = response;},
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/detailarticle']);
  }

}
