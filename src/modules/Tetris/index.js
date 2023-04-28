
import { RouteModule } from "../RouteModuleClass";
// import { getUserSchema, getUsersSchema, getEventsSchema } from "./schema";

import { getLeaderboardController } from "./controllers";

class TetrisModule extends RouteModule {
  publicRoutes() {

    this.router.get(
      "/fetchLeaderboard",
      getLeaderboardController
    );
    // get all users on the system
    // this.router.get(
    //   "/",
    //   this.validateSchema(getUsersSchema, { includeQuery: true }),
    //   getUsersController
    // );

  }

  privateRoutes() {
    // // get following status
    // this.router.get(
    //   "/:username/follow",
    //   this.validateSchema(null, { idParamCheck: true, idName: "username" }),
    //   getFollowingStatusController
    // );
  }
}

export const tetrisModule = new TetrisModule();
