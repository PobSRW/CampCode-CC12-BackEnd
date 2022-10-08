module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define(
		'Order',
		{
			status: {
				type: DataTypes.ENUM('Pendding', 'Successful'),
				defaultValue: 'Pendding',
				allowNull: false,
				valiadate: {
					notEmpty: true,
				},
			},
			slipUrl: {
				type: DataTypes.STRING,
			},
		},
		{ underscored: true }
	);

	Order.associate = (db) => {
		Order.hasMany(db.OrderItem, {
			foreignKey: {
				name: 'orderId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Order.belongsTo(db.User, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};
	return Order;
};
