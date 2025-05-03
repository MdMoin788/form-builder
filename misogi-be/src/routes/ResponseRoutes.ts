import { Router } from "express";
import { ResponeController } from "../controllers/ResponeController";

export class ResponseRoutes {
  public router: Router;
  private responseController: ResponeController;
  constructor() {
    this.router = Router();
    this.responseController = new ResponeController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/:formId", this.responseController.getResponses);

    this.router.post(
      "/",
      this.responseController.saveResponse,
    );
   
  }
}
