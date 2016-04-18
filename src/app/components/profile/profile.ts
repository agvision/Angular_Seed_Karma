import {Component} 	from 'angular2/core';
import {User}		from '../../models/user';

import {TranslateService} from '../../services/translate';

@Component({
    selector: 'profile',
    templateUrl: 'app/components/profile/profile.html',
    providers: [User]
})
export class ProfileComponent 
{ 
	public constructor(public user: User, public ts: TranslateService)
	{
		ts.load('app/components/profile/strings', 'profile');
	}

	public onUserClick()
	{
		this.user.getProfile()
				 .then((data) => this.onGetProfileSuccess(data))
				 .catch((errors) => this.handleGetProfileErrors(errors));
	}

	private onGetProfileSuccess(data)
	{
		console.log(data);
	}

	private handleGetProfileErrors(errors)
	{
		console.log(errors);
	}
}
