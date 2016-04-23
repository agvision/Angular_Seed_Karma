import {it, describe, expect, inject, injectAsync, beforeEach, beforeEachProviders} from 'angular2/testing';

import {provide} from 'angular2/core';
import {RouteRegistry, Router, ROUTER_PRIMARY_COMPONENT, Location} from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';

import {AppComponent} from '../app/components/app';

describe('Routing', () => {

    let location: Location;
    let router: Router;

    beforeEachProviders(() => [ 
        RouteRegistry,
        Location,
        provide(Router, {useClass: RootRouter}),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent})
    ]);

    beforeEach(inject([Router, Location], (r, l) => {
        router = r;
        location = l;
    }));

    it('Should navigate to Login', (done) => {   
        router.navigate(['Login']).then(() => {
            expect(location.path()).toBe('/login');
            done();
        }).catch(e => done.fail(e));
    });

    it('Should navigate to Register', (done) => {   
        router.navigate(['Register']).then(() => {
            expect(location.path()).toBe('/register');
            done();
        }).catch(e => done.fail(e));
    });

});
