import {it, describe, expect, inject, injectAsync, beforeEach, beforeEachProviders} from 'angular2/testing';

import {provide} from 'angular2/core';
import {HTTP_PROVIDERS, Http}   from 'angular2/http';
import {RouteRegistry, Router, ROUTER_PRIMARY_COMPONENT, Location} from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';

import 'rxjs/Rx';

import {HttpService} from '../../../app/services/http';
import {User} from '../../../app/models/user';
import {AppComponent} from '../../../app/components/app';

describe('User Login', () => {

    let authToken:string = '';

    beforeEachProviders(() => [ 
        Http,
        HTTP_PROVIDERS, 

        RouteRegistry,
        Location,
        provide(Router, {useClass: RootRouter}),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),

        User, 
        HttpService,
    ]);

    it('Should set auth token', inject([User], (user:User) => {
        let token = "h83hdks95gt7";
        user.setAuthToken(token);

        expect(user.getAuthToken()).toBe(token);
    }));

    it('Should require email', injectAsync([User], (user:User) => {
        return user.login()
                   .then((data:any) => {
                       expect("Login").toContain("errors");
                   })
                   .catch((errors) => {
                       expect(errors.has("requiredEmail")).toBeTruthy();
                   });
    }));

    it('Should require password', injectAsync([User], (user:User) => {
        return user.login()
                   .then((data:any) => {
                       expect("Login").toContain("errors");
                   })
                   .catch((errors) => {
                       expect(errors.has("requiredPassword")).toBeTruthy();
                   });
    }));

    it('Should require valid email', injectAsync([User], (user:User) => {
        user.email = "invalid_email";

        return user.login()
                   .then((data:any) => {
                        expect("Login").toContain("errors");
                   })
                   .catch((errors) => {
                       expect(errors.has("invalidEmail")).toBeTruthy();
                   });
    }));

    it('Should require valid credentials', injectAsync([User], (user:User) => {
        user.email    = Math.random().toString() + "@email.com";
        user.password = "123456";

        return user.login()
                   .then((data:any) => {
                       expect("Login").toContain("errors");
                   })
                   .catch((errors) => {
                       expect(errors.has("invalidCredentials")).toBeTruthy();
                   });
    }));

    it('Should successfully login', injectAsync([User], (user:User) => {
        user.email    = "mihai@gmail.com";
        user.password = "123456";
        
        return user.login()
                   .then((data:any) => {
                       authToken = data.token;
                       expect(authToken).toBeDefined();
                   })
                   .catch((errors) => {
                       expect("Login").toBe("successful");
                   });
    }));

    it('Should access protected resource', injectAsync([User, HttpService], (user:User, httpService:HttpService) => {
        httpService.setAuthToken(authToken);
        
        return httpService.sendAuthRequest("GET", "/protected")
                          .then((data) => {
                              
                          })
                          .catch((errors) => {
                              expect("Request").toBe("successful");
                          });
    }));

    it('Should invalidate auth token', injectAsync([User, HttpService], (user:User, httpService:HttpService) => {
        httpService.setAuthToken(authToken);
        
        return user.logout()
                   .then((data) => {

                   })
                   .catch((errors) => {
                       expect("Logout").toBe("successful");
                   });
    }));

    it('Should NOT access protected resource', injectAsync([User, HttpService], (user:User, httpService:HttpService) => {
        httpService.setAuthToken(authToken);
        
        return httpService.sendAuthRequest("GET", "/protected")
                          .then((data) => {
                              expect("Request").toContain("errors");
                          })
                          .catch((errors) => {
                              expect(errors.has("invalidToken"));
                          });
    }));
});
