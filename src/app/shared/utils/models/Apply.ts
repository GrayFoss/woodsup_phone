import {Product} from './Product';
import {PanoScene} from './PanoScene';
import {User} from './User';
/**
 * Created by 76546 on 2017/7/5.
 */
export class Apply {
  constructor(
    public target?: string,
    public other?: string,
    public id?: number,
    public createTime?: string,
    public editTime?: string,
    public action?: string,
    public sessionId?: string,
    public type?: string,
    public urlPath?: string,
    public panoSceneRecord_id?: string,
    public product_id?: string,
    public userRecord_id?: string,
    public product?: Product,
    public panoscene?: PanoScene,
    public user?: User,
    public panoSceneRecord?: PanoScene,
    public address?: string,
    public ip?: string,
    public endTime?: Date,
  ) {}
}
