import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article.component/article.component';
import { ArticleDetailComponent } from './article.detail/article.detail.component';
import { ArticleThemeComponent } from './theme/article-theme.component';
import { ArticleAdvisory1Component } from './article-advisory/article-advisory1.component';
import { ArticleIndexComponent } from './article-index.component';
import { ArticleAdvisory2Component } from './article-advisory/article-advisory2.component';

const articleRoutes: Routes = [
  {
    path: '',
    component: ArticleIndexComponent,
    children: [
      {
        path: '',
        component: ArticleComponent
      },
      {
        path: ':id',
        component: ArticleDetailComponent
      },
      {
        path: 'theme/:id',
        component: ArticleThemeComponent
      },
      {
        path: 'article/advisory1',
        component: ArticleAdvisory1Component
      },
      {
        path: 'article/advisory2',
        component: ArticleAdvisory2Component
      }
    ]
  }
];
export const articleRouting = RouterModule.forChild(articleRoutes);
