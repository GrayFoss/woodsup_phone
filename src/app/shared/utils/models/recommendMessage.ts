import {User} from './User';
import {Product} from './Product';
import {PanoScene} from './PanoScene';
/**
 * Created by Administrator on 2017/7/8.
 */
export class RecommendMessage {
  action?: string;
  other?: any;
  panoSceneRecord?: PanoScene;
  product?: Product;
  sessionId?: string;
  target: string;
  type?: string;
  urlPath?: string;
  userRecord: User;
  id?: number;
  createTime?: string;
  editTime?: string;
}
