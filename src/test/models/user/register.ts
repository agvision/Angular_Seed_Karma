import {it, describe, expect, inject, injectAsync, beforeEach, beforeEachProviders} from 'angular2/testing';

import {provide} from 'angular2/core';
import {HTTP_PROVIDERS, Http}   from 'angular2/http';
import {RouteRegistry, Router, ROUTER_PRIMARY_COMPONENT, Location} from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';

import 'rxjs/Rx';

import {HttpService} from '../../../app/services/http';
import {User} from '../../../app/models/user';
import {AppComponent} from '../../../app/components/app';

describe('User Register', () => {

	let validEmail: string = Math.random().toString() + "@email.com";

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

	it('Should require first name', injectAsync([User], (user:User) => {
	    return user.register()
	               .then((data:any) => {
	                   expect("Register").toContain("errors");
	               })
	               .catch((errors) => {
	                   expect(errors.has("requiredFirstName")).toBeTruthy();
	               });
	}));

	it('Should require last name', injectAsync([User], (user:User) => {
	    return user.register()
	               .then((data:any) => {
	                   expect("Register").toContain("errors");
	               })
	               .catch((errors) => {
	                   expect(errors.has("requiredLastName")).toBeTruthy();
	               });
	}));

	it('Should require email', injectAsync([User], (user:User) => {
	    return user.register()
	               .then((data:any) => {
	                   expect("Register").toContain("errors");
	               })
	               .catch((errors) => {
	                   expect(errors.has("requiredEmail")).toBeTruthy();
	               });
	}));

	it('Should require password', injectAsync([User], (user:User) => {
	    return user.register()
	               .then((data:any) => {
	                   expect("Register").toContain("errors");
	               })
	               .catch((errors) => {
	                   expect(errors.has("requiredPassword")).toBeTruthy();
	               });
	}));

	it('Should require valid email', injectAsync([User], (user:User) => {
		user.email = "invalid_email";

	    return user.register()
	               .then((data:any) => {
	                   expect("Register").toContain("errors");
	               })
	               .catch((errors) => {
	                   expect(errors.has("invalidEmail")).toBeTruthy();
	               });
	}));

	it('Should successfully register', injectAsync([User], (user:User) => {
		user.email     = validEmail;
		user.firstName = "firstName";
		user.lastName  = "lastName";
		user.password  = "123456";

		return user.register()
	               .then((data:any) => {
	                   
	               })
	               .catch((errors) => {
					   expect("Register").toBe("successful");
	               });
	}));

	it('Should require unique email', injectAsync([User], (user:User) => {
		user.email = validEmail;

	    return user.register()
	               .then((data:any) => {
	                   expect("Register").toContain("errors");
	               })
	               .catch((errors) => {
	                   expect(errors.has("duplicatedEmail")).toBeTruthy();
	               });
	}));
});