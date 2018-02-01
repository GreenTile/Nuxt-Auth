module.exports = {
	// Routes
	prefix: '/api',
	routes: [
	  './controllers/add'
	],
  
	// Plugins
	registrations: [
	  '@bakjs/mongo',
	  '@bakjs/auth'
	],
  
	// Mongo, lkm
	mongo: {
	  connections: {
		default: { uri: 'mongodb://localhost/usr' }
	  }
	},
  
	  auth: {
			secret: "SECRET_MD",
			user_model: require('./models/user')
		},
  }
  