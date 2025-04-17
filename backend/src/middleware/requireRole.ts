import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/enums';
import { User } from '../models/UserModel';

const requireRole = (requiredRole: UserRole) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
        res.status(403).json({ message: 'Forbidden: User role not provided or user not authenticated' });
        return
    }

    if (req.user.role !== requiredRole) {
        res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        return
    }

    next();
  };
};

export default requireRole;