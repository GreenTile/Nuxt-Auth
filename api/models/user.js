const { Model, Schema } = require('@bakjs/mongo');
const { User } = require('@bakjs/auth');


class IUser extends User {
	static get $schema() {
		return {
			username: {type: Schema.Types.String},
			password: {type: Schema.Types.String},
			firstName: {type: Schema.Types.String},
			lastName: {type: Schema.Types.String}
		};
	}
}

module.exports = User.$model;