import {Injectable} 	from 'angular2/core';
import {HttpService}	from '../services/http';
import {Model}			from './model';


@Injectable()
export class User extends Model
{
	public firstName: string = "";
	public lastName: string  = "";
	public email: string  	 = "";
	public password: string  = "";

	public constructor(private httpService: HttpService)
	{
		super();
	}

	public getAuthToken()
	{
		return this.httpService.getAuthToken();
	}

	public setAuthToken(token: string)
	{
		this.httpService.setAuthToken(token);
	}

	public register()
	{
		let params = this.buildParams([
			'firstName',
			'lastName',
			'email',
			'password'
		]);

		return this.httpService.sendRequest("POST", "/auth/register", params);
	}

	public login()
	{
		let params = this.buildParams([
			'email',
			'password'
		]);

		return this.httpService.sendRequest("POST", "/auth/login", params);
	}

	public logout()
	{
		return this.httpService.sendAuthRequest("POST", '/auth/logout');
	}
}