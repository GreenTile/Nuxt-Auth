module.exports = {
	// Routes
	prefix: '/api',
	routes: [
	  './controllers/user'
	],
  
	// Plugins
	registrations: [
	  '@bakjs/mongo',
	  '@bakjs/auth'
	],
  
	// Mongo, lkm
	mongo: {
	  connections: {
		default: { uri: 'mongodb://localhost/test' }
	  }
	},
  
	  // auth: {
	  //   secret: "ddfdfkdofdkfo343"
	  // }
  }
  