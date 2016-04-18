import {Component} 							from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES}  	from 'angular2/router';

import {User} from '../models/user';

import {LoginComponent} 	from './login/login';
import {RegisterComponent} 	from './register/register';
import {ProfileComponent} 	from './profile/profile';

@Component({
    selector: 	'my-app',
    template:	`
    	<nav>
    		<a [routerLink]="['Login']">Login</a>
    		<a [routerLink]="['Register']">Register</a>
    		<a [routerLink]="['Profile']">Profile</a>
    	</nav>
    	<router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [User]
})
@RouteConfig([
	{
		path: '/register',
		name: 'Register',
		component: RegisterComponent,
		useAsDefault: true
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginComponent
	},
	{
		path: '/profile',
		name: 'Profile',
		component: ProfileComponent
	},
])
export class AppComponent 
{ 

}