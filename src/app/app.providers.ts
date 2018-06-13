import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './reducers/index';
import { TransferState } from '@angular/platform-browser';
import {PhoneDataService} from './services/data.service';

export const APP_PROVIDERS = [
  { provide: RouterStateSerializer, useClass: CustomSerializer },
  TransferState,
  PhoneDataService,
];
