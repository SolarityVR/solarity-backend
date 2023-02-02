import { errorResponse, successResponse } from "../../../utils";
import GameModel from "../model";

export const getGamesController = async (req, res) => {
  try {

    const data = await GameModel.find();

    return successResponse({ res, response: { data } });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
