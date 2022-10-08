module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				valiadate: {
					notEmpty: true,
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				valiadate: {
					notEmpty: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				valiadate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				valiadate: {
					notEmpty: true,
				},
			},
			profileImage: DataTypes.STRING,
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
				valiadate: {
					notEmpty: true,
				},
			},
			role: {
				type: DataTypes.ENUM('User', 'Admin'),
				defaultValue: 'User',
				allowNull: false,
				valiadate: {
					isEmail: true,
				},
			},
		},
		{ underscored: true }
	);

	User.associate = (db) => {
		User.hasMany(db.Order, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		User.hasMany(db.UserCourse, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		User.hasMany(db.Review, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};
	return User;
};
