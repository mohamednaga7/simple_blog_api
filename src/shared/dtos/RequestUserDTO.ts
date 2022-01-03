interface RequestUserDTOInterface {
	username: string;
	email: string;
	_id: string;
	phoneNumber: string;
}

export class RequestUserDTO implements RequestUserDTO {
	username: string;
	email: string;
	_id: string;
	phoneNumber: string;

	constructor({ username, email, _id, phoneNumber }: RequestUserDTOInterface) {
		this.username = username;
		this.email = email;
		this._id = _id;
		this.phoneNumber = phoneNumber;
	}

	toObject() {
		return { ...this };
	}
}
