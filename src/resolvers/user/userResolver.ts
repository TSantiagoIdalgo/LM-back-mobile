import UserProxy from '../../proxies/user/userProxy';
import UserService from '../../services/user/userService';
import { IUser, IUserCreate } from '../../types/user/userTypes';
import { IToken } from '../../helpers/token';

const userService = new UserService();
const userProxy = new UserProxy(userService);

const userResolver = {
  Query: {
    getAllUser: async () => 
      await userProxy.getAllUsers(),
    getUserById: async (_root: IUser, args: IUser ) => 
      await userProxy.getUserById(args.id),
    userLogin: async (_root: IUser, args: IUser) => 
      await userProxy.getUserLogin(args.email, args.passwordHash),
    userNetworkLogin: async (_root: IUser, args: IUser) =>
      await userProxy.getUserNetworkLogin(args.userName, args.email, args.image),
    getUserMusic: async (_root: IUser, _args: IUser, context: IToken) =>
      await userProxy.getUserMusic(context),
    getUserHistory: async (_root: IUser, _args: IUser, context: IToken) =>
      await userProxy.getUserHistory(context),
  },
  Mutation: {
    createUser: async (_root: IUserCreate, args: IUserCreate) =>
      await userProxy.userCreate(args),
    verifyUser: async (_root: IUser, args: IUser) =>
      await userProxy.userVerify(args.token),
  }
};

export default userResolver;