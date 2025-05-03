import { Router } from "express";
import { FormController } from "../controllers/FormController";

export class FormRoutes {
  public router: Router;
  private formController: FormController;
  constructor() {
    this.router = Router();
    this.formController = new FormController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", this.formController.getAllForm);
    this.router.get("/getFormBySlug", this.formController.getFormBySlug);

    this.router.post(
      "/",
      this.formController.createForm,
    );

    this.router.delete(
      "/userForms",

      this.formController.getUserForms,
    );
  }
}
