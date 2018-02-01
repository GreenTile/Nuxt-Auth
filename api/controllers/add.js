const { Controller } = require('bak');

const { User } = require('../models');

class UserController extends Controller {
	init() {
		this.defaults.auth = false;
		// this.get('/u', this.addUser);
		this.post('/auth/signup', this.addUser);
	}

	async addUser(request) {
		let payload = request.payload;
		console.log(payload);
		let u = new User(payload);
		await u.save();
		console.log('done');
		return {};
	}
}

module.exports = UserController;