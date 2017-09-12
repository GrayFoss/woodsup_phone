import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { Meta } from '@angular/platform-browser';
import { articleRouting } from './article.routing';
import { ArticleComponent } from './article.component/article.component';
import { ArticleDetailComponent } from './article.detail/article.detail.component';
import { ArticleThemeComponent } from './theme/article-theme.component';
import { ArticleAdvisory1Component } from './article-advisory/article-advisory1.component';
import { ArticleIndexComponent } from './article-index.component';
import { ArticleAdvisory2Component } from './article-advisory/article-advisory2.component';
import { SharedModule } from '../../shared/shared.module';
import { OtherLoginService } from '../../shared/services/other-login.service';
import { ProductService } from '../../shared/services/index';
import { ArticleService } from '../../shared/services/article/article.service';

@NgModule ({
    imports:      [
      articleRouting,
      SharedModule.forRoot(),
      InfiniteScrollModule
    ],
    declarations: [
      ArticleIndexComponent,
      ArticleComponent,
      ArticleDetailComponent,
      ArticleThemeComponent,
      ArticleAdvisory1Component,
      ArticleAdvisory2Component
    ],
    providers: [
      OtherLoginService,
      ArticleService,
      ProductService,
      Meta
    ]
})
export class ArticleModule { }
