module.exports = function(db, cb) {
	db.define('Account', {
		uid: {
			type: 'serial',
			key: true
		},
		nick: String
	});
	return cb();
}