import * as yup from "yup";

export const fetchGameSchema = yup.object({
  body: yup.object({
    gameId: yup.string().required("The game number is required"),
  }),
});