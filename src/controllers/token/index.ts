import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { authenticated } from "../../middlewares/authenticated";
import { authorized } from "../../middlewares/authorized";
import registerController from "../../utils/registerController";
import { create } from "./create";
import { list } from "./list";
import { update } from "./update";
import { remove } from "./delete";

const cryptoTokenController = registerController((router: Router) => {
  router.get('/', list);
  router.post('/', authenticated, authorized(), create);
  router.patch('/:id', authenticated, authorized(), update);
  router.delete('/:id', authenticated, authorized(), remove);
});

export default cryptoTokenController;