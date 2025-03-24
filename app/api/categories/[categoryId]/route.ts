import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import Category from "@/models/categoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();

  if (req.method === "GET") {
    try {
      const categories = await Category.find({}, "name categoryId attributes");
      console.log(categories);
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
