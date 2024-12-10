import express from "express";
import { getblogscontroller,getblogcontroller,createblogcontroller,updateblogcontroller,getblogPopuladocontroller,deleteblogcontroller } from "../controller/controllerBlog.js";
import { validationPostBlog, validationPutBlog, validationIdBlog } from "../validations/validationBlog.js";
import { validationMiddleware } from "../middleware/validationmiddleware.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
const routerBlog = express.Router();

routerBlog.get("/",getblogscontroller)
routerBlog.get("/:id",validationIdBlog,validationMiddleware,getblogcontroller)
routerBlog.get("/populado/:id",validationIdBlog,validationMiddleware,getblogPopuladocontroller) 
routerBlog.post("/",authMiddleware,validationPostBlog,validationMiddleware,createblogcontroller) 
routerBlog.put("/:id",validationPostBlog,validationIdBlog,validationMiddleware,updateblogcontroller)
routerBlog.delete("/:id",validationIdBlog,validationMiddleware,deleteblogcontroller)

export default routerBlog;