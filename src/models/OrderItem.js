module.exports = (sequelize, DataTypes) => {
	const OrderItem = sequelize.define(
		'OrderItem',
		{
			priceHistory: {
				type: DataTypes.INTEGER,
				allowNull: false,
				valiadate: {
					notEmpty: true,
				},
			},
		},
		{ underscored: true }
	);

	OrderItem.associate = (db) => {
		OrderItem.belongsTo(db.Order, {
			foreignKey: {
				name: 'orderId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		OrderItem.belongsTo(db.Course, {
			foreignKey: {
				name: 'courseId',
				allowNull: false,
			},
			onDelete: 'CASCADE',
		});
	};
	return OrderItem;
};
