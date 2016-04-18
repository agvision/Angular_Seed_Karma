import {HttpService} from '../services/http';

export class Model
{

	public constructor()
	{

	}

	protected buildParams(properties: string[])
	{
		let params = new Map<string, any>();

		properties.forEach((value) => {
			params.set(value, this[value])
		});

		return params;
	}
}