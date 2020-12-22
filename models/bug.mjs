export default function bugModel(sequelize, DataTypes) {
  return sequelize.define('Bug', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    problem: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    errorText: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    commit: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
}
