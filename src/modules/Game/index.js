import { RouteModule } from "../RouteModuleClass";
import {
  getGamesController,
} from "./controllers";
import {
} from "./schema";

class GameModule extends RouteModule {
  publicRoutes() {
    this.router.get(
      "/",
      getGamesController
    );
  }

  privateRoutes() {
  }
}

export const gameModule = new GameModule();
