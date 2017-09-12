import {Injectable, Renderer2} from '@angular/core';
@Injectable()
export class vrJSLoader {
  public appendScript(render: Renderer2, host: HTMLElement, data: string, index: number, defer: boolean, async: boolean, prefix: string, callback) {
      const script = render.createElement('script');
      /*script.type = 'text/javascript';*/
      script.onload = callback;
      script.charset = 'utf-8';
      script.id = prefix + index;
      script.defer = defer;
      script.async = async;
      script.src = data;
      render.appendChild(host, script);
      // memorize the script so we can remove it later
      // this.activeScripts.push(script);
  }
  constructor() {}
  public removeScript(render: Renderer2, host: HTMLElement, id: string) {
  }
}
