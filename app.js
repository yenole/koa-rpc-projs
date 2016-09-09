var route = require('koa-route'),
	session = require('koa-session'),
	koa = require('koa'),
	orm = require('./scripts/core/koa-orm'),
	app = koa(),
	config = require('./scripts/configs/main');


app.keys = ['some secret hurr'];
app.use(session(app));
app.use(require('./scripts/core/koa-log'));
app.use(orm(`mysql://${config.db.user}:${config.db.pass}@${config.db.host}/${config.db.databaase}`, {
	define: function(db, models) {
		config.models && config.models.forEach(one => {
			db.load(`./scripts/models/${one}`, err => {
				if (err) throw err;
			})
		})

	}
}));
app.use(route.post('/rpc/*', require('./scripts/core/koa-rpc')));
app.use(route.get('/*', require('./scripts/core/koa-file')));
app.listen(config.port);