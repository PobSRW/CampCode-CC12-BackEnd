module.exports = (sequelize, DataTypes) => {
	const Course = sequelize.define(
		'Course',
		{
			courseName: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				valiadate: {
					notEmpty: true,
				},
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				valiadate: {
					notEmpty: true,
				},
			},
			courseImage: DataTypes.STRING,
			courseVideo: DataTypes.STRING,
			priceCurrent: {
				type: DataTypes.INTEGER,
				allowNull: false,
				valiadate: {
					notEmpty: true,
				},
			},
			reviewCount: DataTypes.INTEGER,
			reviewScore: DataTypes.INTEGER,
		},
		{ underscored: true }
	);

	Course.associate = (db) => {
		Course.hasMany(db.UserCourse, {
			foreignKey: {
				name: 'courseId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Course.hasMany(db.Review, {
			foreignKey: {
				name: 'courseId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Course.hasMany(db.OrderItem, {
			foreignKey: {
				name: 'courseId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Course.belongsTo(db.Instructor, {
			foreignKey: {
				name: 'instructorId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};
	return Course;
};
