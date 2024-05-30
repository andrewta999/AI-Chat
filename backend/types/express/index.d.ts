import { IUser } from '../../models/User'; // Ensure the correct path to your User model

export declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}
