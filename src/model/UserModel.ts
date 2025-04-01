import { DataTypes } from 'sequelize';
import client from 'src/config/SequelizeConnection';

const User = client.define('User', {
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken:{
    type: DataTypes.STRING,
  }
});

User.sync();
export default User;
