module.exports = (sequelize, DataTypes) => {
	const Review = sequelize.define(
		'Review',
		{
			reviewCount: DataTypes.INTEGER,
			reviewScore: DataTypes.INTEGER,
		},
		{ underscored: true }
	);

	Review.associate = (db) => {
		Review.belongsTo(db.Course, {
			foreignKey: {
				name: 'courseId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Review.belongsTo(db.User, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	return Review;
};
