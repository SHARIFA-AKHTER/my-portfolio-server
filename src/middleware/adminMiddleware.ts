// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// interface AuthRequest extends Request {
//   user?: any;
// }

// export const adminMiddleware = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

//     // Role check
//     if (decoded.role !== "ADMIN") {
//       return res.status(403).json({ message: "Forbidden" });
//     }

//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden - Admins only" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Admin token check failed:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
