import {Router} 	from 'angular2/router';
import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';

@Injectable()
export class HttpService
{	
	private requestURL = "http://localhost/agvision/Laravel_API/public/api";
	private tokenLifetimeLimit = 3600; 
	private invalidTokenErrors = new Set([
		'absentToken',
		'invalidToken',
		'expiredToken'
	]);
	
	public constructor(private http: Http, private router: Router) 
	{
		
	}

	public sendAuthRequest(method: string, path: string, params = new Map<string, any>())
	{

		let headers = new Headers({
			'Authorization': 'Bearer ' + this.getAuthToken()
		});

		return new Promise((resolve, reject) => {
			this.sendRequest(method, path, params, headers)
				.then((data) => {
					this.tryTokenRefresh();
					resolve(data);
				})
				.catch((errors) => reject(this.handleInvalidTokenErrors(errors)))
		});
	}

	public sendRequest(method: string, path: string, params = new Map<string, any>(), headers = new Headers())
	{
		switch (method) {
			case "GET":
				return this.get(path, params, headers);
			
			case "POST":
				return this.post(path, params, headers);

			case "PUT":
				return this.put(path, params, headers);

			case "DELETE":
				return this.delete(path, params, headers);
		}
	}

	public getAuthToken()
	{
		return localStorage.getItem('authToken');
	}

	public setAuthToken(token: string)
	{	
		localStorage.setItem('authTokenCreationTime', (new Date()).getTime().toString());
		localStorage.setItem('authToken', token);
	}

	public getTokenLifeTimeLimit()
	{
		return this.tokenLifetimeLimit;
	}

	public setTokenLifetimeLimit(limit:number)
	{
		this.tokenLifetimeLimit = limit;
	}

	private getTokenLifetime()
	{
		let tokenCreationTime = Number.parseInt(localStorage.getItem('authTokenCreationTime'));
		let now               = (new Date()).getTime();

		return Math.abs((now - tokenCreationTime) / 1000);
	}

	private tryTokenRefresh()
	{	
		let tokenLifetime = this.getTokenLifetime();

		// check token lifetime
		if (tokenLifetime > this.tokenLifetimeLimit) {
			let params = new Map<string, any>();
			params.set('token', this.getAuthToken());

			this.sendRequest("GET", '/auth/refresh-token', params)
				.then((data:any) => {
					if(data.token) {
						this.setAuthToken(data.token);
					}
				})
				.catch((errors) => this.handleInvalidTokenErrors(errors));
		}
	}

	private get(path: string, params: Map<string, any>, headers = new Headers())
	{
		let {url, body, options} = this.getRequestDetails(path, params, headers);

		return new Promise((resolve, reject) => {
			this.http.get(url + "?" + body, options)
				    .toPromise()
					.then(
						data => resolve(data.json().data),
						error => reject(new Set(error.json().errors))
					);
		});
	}

	private post(path: string, params: Map<string, any>, headers = new Headers())
	{	
		let {url, body, options} = this.getRequestDetails(path, params, headers);

		return new Promise((resolve, reject) => {
			this.http.post(url, body, options)
				    .toPromise()
					.then(
						data => resolve(data.json().data),
						error => reject(new Set(error.json().errors))
					);
		});
	}

	private put(path: string, params: Map<string, any>, headers = new Headers())
	{	
		let {url, body, options} = this.getRequestDetails(path, params, headers);

		return new Promise((resolve, reject) => {
			this.http.put(url, body, options)
				    .toPromise()
					.then(
						data => resolve(data.json().data),
						error => reject(new Set(error.json().errors))
					);
		});
	}

	private delete(path: string, params: Map<string, any>, headers = new Headers())
	{	
		let {url, body, options} = this.getRequestDetails(path, params, headers);

		return new Promise((resolve, reject) => {
			this.http.delete(url + "?" + body, options)
				    .toPromise()
					.then(
						data => resolve(data.json().data),
						error => reject(new Set(error.json().errors))
					);
		});
	}

	private getRequestDetails(path: string, params: Map<string, any>, headers = new Headers())
	{	
		let url = this.getRequestURL(path);

		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		let options = new RequestOptions({
			headers: headers
		});
		
		let body = this.getRequestBody(params);

		return {url, body, options};
	}

	private getRequestURL(path: string)
	{
		return this.requestURL + path;
	}

	private getRequestBody(params: Map<string, any>)
	{	
		// TODO: Encode the values using encodeURIComponent().
		let array: string[] = [];
		let body: string;

		params.forEach((value, key) => {
			array.push(key + "=" + value);
		});

		return array.join("&");
	}

	private handleInvalidTokenErrors(errors: Set<string>)
	{	
		// convert Set to Array
		let errorsArray = [];
		errors.forEach(v => errorsArray.push(v));

		let invalidTokenErrors = new Set(errorsArray.filter(x => this.invalidTokenErrors.has(x)));
		let otherErrors        = new Set(errorsArray.filter(x => !invalidTokenErrors.has(x)));

		if(invalidTokenErrors.size > 0) {
			// invalid tokens errors detected
			this.setAuthToken("");
			this.router.navigate(['Login']);
		}

		return otherErrors;
	}
}