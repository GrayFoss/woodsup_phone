export class UrlChange {
  public getHost(): string {
    switch (process.env.NODE_ENV) {
      case 'prod':
      case 'production':
        return 'http://119.23.131.76:3000';
      case 'test':
      case 'testing':
        return 'http://192.168.31.158:8080';
      case 'dev':
      case 'development':
      default:
        return 'http://m.wecareroom.com';
    }
  }
}
