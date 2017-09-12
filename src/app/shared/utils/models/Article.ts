import { ArticleCategory } from './ArticleCategory';
import { User } from './User';
import { Product } from './Product';

export class Article {
  id?: number;
  owner: User;
  article_related_products: Product[];
  category: ArticleCategory;
  comments: Comment[];
  content: string;
  contentURL: string;
  involveCount: number;
  jmpUrl: string;
  likeCount: number;
  likeUser: User[];
  metadata: string;
  numComment: number;
  numFaved: number;
  numLike: number;
  priority: number;
  publishTime: Date;
  share: number;
  shouldJump: boolean;
  summary: string;
  title: string;
  titleImg: string;
  banner: Boolean;
  display: Boolean;
  faved: Boolean;
  liked: Boolean;
  createTime: Date;
  editTime: Date;
  Category: ArticleCategory;
}
