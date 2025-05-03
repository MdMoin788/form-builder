import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import { IUserService, UserService } from "../services/UserService";

class AuthMiddleware {
  userService: IUserService;
  constructor() {
    this.userService = new UserService();
  }
  authenticate(req: Request, res: Response, next: NextFunction): void {
    const token =
    req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token)
      res.status(401).json({ message: "Access denied. No token provided." });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as any).decoded = decoded; 
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token." });
    }
  }

  authorizeRoles = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const decoded = (req as any).decoded;
      const user = (await this.userService.getUserById(decoded.id)) as IUser;
      ;(req as any).user = user
      if (!roles.includes(user.role as keyof IUser)) {
        res
          .status(403)
          .json({ message: "Access forbidden: Insufficient permissions." });
      }
      next();
    };
  };
}

export const authMiddleware = new AuthMiddleware();
