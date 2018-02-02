const { Controller } = require('bak');

const { User } = require('../models');

class UserController extends Controller {
	init() {
		this.defaults.auth = false;
		this.post('/signup', this.addUser);
		this.post('/signup/check', this.availabilityCheck);
	}

	async addUser(request) {
		let payload = request.payload;
		let u = new User(payload);
		await u.save();
		return;
	}

	async availabilityCheck(request) {
		let payload = request.payload;
		let {email, username} = payload;
		if(email) {
			console.log('inside email')
			let res = await User.find({email: email})
			if(res && res.length && res.length > 0)
				return false;
			return true;
		}
		if(username) {
			console.log('inside user')
			let res = await User.find({username: username})
			if(res && res.length && res.length > 0)
				return false;
			return true;
		}
		return true;
	}
}

module.exports = UserController;