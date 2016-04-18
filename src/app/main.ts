import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './components/app';

import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS}   from 'angular2/http';

import {HttpService} 		from './services/http';
import {TranslateService} 	from './services/translate';
import 'rxjs/Rx';


bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, HttpService, TranslateService]);
