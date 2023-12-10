// import { Injectable, NestMiddleware } from "@nestjs/common";
// import { Request, Response, NextFunction } from "express";

// @Injectable()
// export class VerificationMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     // Check if the user is authenticated and verified
//     if (req.user && req.user.isVerified) {
//       next();
//     } else {
//       // You can customize the response or redirect as needed
//       res.status(403).json({ message: "Unauthorized or unverified user." });
//     }
//   }
// }
