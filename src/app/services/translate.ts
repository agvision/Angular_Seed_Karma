import {Injectable} 	from 'angular2/core';
import {HttpService} 	from './http';
import {Http} 			from 'angular2/http';

@Injectable()
export class TranslateService
{	
	private strings = new Map<string, string>();
	private loaded  = new Set<string>();
	private defaultLanguage = 'en';

	public constructor(private httpService: HttpService, private http: Http)
	{
		this.getLanguage()
			.then((language:string) => this.setLanguage(language));
	}

	public get(string:string, params:any)
	{
		let value = this.strings.get(string); 

		return this.replaceParams(value, params);
	}

	public load(path:string, prefix:string)
	{
		this.getLanguage()
			.then((language:string) => {
				let resource = path + "_" + language;

				if (!this.loaded.has(resource)) {	
					this.loadStrings(path, language, prefix);
					this.loaded.add(resource);
				}

			});
	}

	public getLanguage()
	{	
		let cachedLanguage = localStorage.getItem('language');

		return new Promise((resolve, reject) => {
			if (cachedLanguage && cachedLanguage != 'undefined') {
				resolve(cachedLanguage);
			} else {
				this.httpService.sendRequest("GET", "/language")
					.then((data:any) => resolve(data.language))
					.catch((errors) => reject(errors));
			}
		});
	}

	public refreshLanguage()
	{
		return new Promise((resolve, reject) => {
			this.httpService.sendRequest("GET", "/language")
				.then((data:any) => {
					this.setLanguage(data.language);
					resolve(data.language)
				})
				.catch((errors) => reject(errors));
		});
	}

	public setLanguage(language:string)
	{
		localStorage.setItem('language', language);
		this.loaded.clear();
	}

	private loadStrings(path:string, language:string, prefix:string)
	{	
		let filePath = path + "/" + language + ".json";

		this.http.get(filePath).toPromise()
			.then((file) => {
				this.addStrings(file.json(), prefix);
			})
			.catch((error) => this.handleFileError(error, path, language, prefix));
		
	}

	private addStrings(strings:any, prefix:string = '')
	{	
		for (let key in strings) {
			if (typeof strings[key] == 'object') {
				this.addStrings(strings[key], prefix + '.' + key);
			} else {
				this.strings.set(prefix + '.' + key, strings[key]);
			}
		}
	}

	private replaceParams(input:string, params:any)
	{
		if (!input) return '';

		let output:string = input;

		for (let key in params) {
			output = output.replace("{{" + key + "}}", params[key]);
		}

		return output;
	}

	private handleFileError(error:any, path:string, language:string, prefix:string)
	{	
		if (error.status == 404 && language != this.defaultLanguage && language != 'undefined') {
			return this.loadStrings(path, this.defaultLanguage, prefix);
		}
	}
}