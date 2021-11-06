import express from "express";
import accountController from "../controllers/account.controller.js";



const router = express.Router();

router.post("/", accountController.createAccount);
router.get("/", accountController.getAccounts);
router.get("/:id", accountController.getAccount);
router.delete("/:id", accountController.deleteAccount);
router.put("/", accountController.updateAccount);
router.patch("/updateBalance", accountController.updateBalance);

router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});
export default router;
