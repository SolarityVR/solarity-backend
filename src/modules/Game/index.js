import { RouteModule } from "../RouteModuleClass";
import {
  getGamesController,
  getGameController,
} from "./controllers";
import { 
  fetchGameSchema
} from "./schema";

class GameModule extends RouteModule {
  publicRoutes() {
    this.router.get(
      "/",
      getGamesController
    );

    this.router.post(
      "/game",
      this.validateSchema(fetchGameSchema),
      getGameController,
    );
  }

  privateRoutes() {
  }
}

export const gameModule = new GameModule();
