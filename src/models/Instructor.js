module.exports = (sequelize, DataTypes) => {
	const Instructor = sequelize.define(
		'Instructor',
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
			reviewScore: DataTypes.STRING,
			profileImage: DataTypes.STRING,
		},
		{ underscored: true }
	);

	Instructor.associate = (db) => {
		Instructor.hasMany(db.Course, {
			foreignKey: {
				name: 'instructorId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};
	return Instructor;
};
