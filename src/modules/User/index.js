import {
  followUserController,
  getUserController,
  getUserFollowingStatusController,
  getUsersController,
  getAllUsersController,
  unfollowUserController,
  getUserWithWalletAddressController
} from "./controller";
import { getUsersSchema } from "./schema";
import { RouteModule } from "../RouteModuleClass";
import { getUserFollowersController } from "./controllers";
import { getLinkInfoController } from "./controllers";

class UserModule extends RouteModule {
  publicRoutes() {
    this.router.get(
      "/getLinkInfo/:link",
      getLinkInfoController
    );
    this.router.get(
      "/",
      this.validateSchema(getUsersSchema, { includeQuery: true }),
      getUsersController
    );
    this.router.get(
      "/getUsers",
      getAllUsersController
    );
    this.router.get(
      "/:username",
      this.validateSchema(null, { idParamCheck: true, idName: "username" }),
      getUserController
    );
    this.router.get(
      "/wallet/:address",
      getUserWithWalletAddressController
    );
    this.router.get(
      "/:username/followers",
      this.validateSchema(null, { idParamCheck: true, idName: "username" }),
      getUserFollowersController
    );
  }
  privateRoutes() {
    this.router.get(
      "/:username/follow",
      this.validateSchema(null, { idParamCheck: true, idName: "username" }),
      getUserFollowingStatusController
    );
    this.router.post(
      "/:username/follow",
      this.validateSchema(null, { idParamCheck: true, idName: "username" }),
      followUserController
    );
    this.router.post(
      "/:username/unfollow",
      this.validateSchema(null, { idParamCheck: true, idName: "username" }),
      unfollowUserController
    );
  }
}

export const userModule = new UserModule();
