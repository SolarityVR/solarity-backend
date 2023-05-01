import { errorResponse, successResponse } from "../../../utils";
import Tetris from '../model';

export const getLeaderboardController = async (req, res) => {
  try {
    const {
    } = req;
    let data;
    try {
      const now = new Date();
      const currentHour = now.getHours();
      let lowerBound = new Date(now);
      let upperBound = new Date(now);
      lowerBound.setHours(Math.floor(currentHour/2) * 2, 0, 0, 0);
      upperBound.setHours(Math.floor((currentHour + 2)/2) * 2, 0, 0, 0);

      data = await Tetris.find({
        createdAt: {
          $gte: lowerBound,
          $lt: upperBound
        }
      }).select("score amount level createdAt").sort({ score: -1 });
      console.log(lowerBound, upperBound, data, now, currentHour);
    } catch (err) {
      console.log("tetris", err);
    }
    return successResponse({ res, response: { data: data.slice(0, Math.ceil(data.length / 2))} });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
