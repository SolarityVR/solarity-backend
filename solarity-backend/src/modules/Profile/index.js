import express from "express";
import { validateSchema } from "../../middlewares";
import { getProfile, updateProfile, updatePassword } from "./controller";
import {
  updatePasswordSchema,
  updatePublicAddressSchema,
  updateProfileSchema,
} from "./schema";

const router = express.Router();

router.get("/", getProfile);

router.post("/", validateSchema(updateProfileSchema), updateProfile);

router.post("/password", validateSchema(updatePasswordSchema), updatePassword);

router.post(
  "/publicAddress",
  validateSchema(updatePublicAddressSchema),
  updateProfile
);

export { router as profileModule };
