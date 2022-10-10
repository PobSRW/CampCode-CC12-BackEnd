module.exports = (sequelize, DataTypes) => {
	const UserCourse = sequelize.define('UserCourse', {}, { underscored: true });

	UserCourse.associate = (db) => {
		UserCourse.belongsTo(db.User, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		UserCourse.belongsTo(db.Course, {
			foreignKey: {
				name: 'courseId',
				allowNull: false,
			},
			onDelete: 'CASCADE',
		});
	};

	return UserCourse;
};
