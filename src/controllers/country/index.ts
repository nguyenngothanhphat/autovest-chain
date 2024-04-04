import { Router } from "express";
import registerController from "../../utils/registerController";
import { list } from "./list";

const countryController = registerController((router: Router) => {
  router.get('/', list);
});

export default countryController;