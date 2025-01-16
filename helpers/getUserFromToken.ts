// helpers/getUserFromToken.ts

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getUserFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("jsonToken")?.value;

    if (!token) {
      return null;
    }

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    if (!decodedToken || !decodedToken.id) {
      return null;
    }

    return decodedToken.id;
  } catch (error: any) {
    console.error("Error in getUserFromToken:", error);
    return null;
  }
};
