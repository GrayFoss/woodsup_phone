import { Price } from '../utils/models/Price';

export class Screen {
  constructor(
    public tone?: string,
    public brand?: string,
    public style?: string,
    public type?: string,
    public state?: string,
    public price?: Price,
    public sort?: number,
    public event?: any
  ) {}
}
