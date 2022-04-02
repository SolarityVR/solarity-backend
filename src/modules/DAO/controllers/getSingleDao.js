import { errorResponse, successResponse, throwError } from "../../../helpers";
import { getCollectionStats } from "../../../helpers/magicedenHelpers";
import DaoModel from "../model";
import Web3, { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const getSingleDaoController = async (req, res) => {
  try {
    const { symbol } = req.params;
    const daoFetch = await DaoModel.aggregate([
      {
        $match: { symbol },
      },
      {
        $addFields: {
          floorPrice: "$floorPrice.value",
          floorPriceLastUpdate: "$floorPrice.lastUpdate",
          profileImageLink: "$profileImage.link",
          twitterUsername: "$externalLinks.twitter.username",
          githubUsername: "$externalLinks.github.username",
          discordHandle: "$externalLinks.discord.handle",
        },
      },
    ]);
    if (daoFetch.length == 0)
      throwError("No DAO exists with the matching symbol");
    const dao = daoFetch[0];

    if (
      !dao.floorPrice ||
      !dao.floorPriceLastUpdate ||
      new Date().getTime() - dao.floorPriceLastUpdate.getTime() > 10000
    ) {
      try {
        const data = await getCollectionStats(dao.symbol);
        const { floorPrice } = data;
        const newFloorPrice = floorPrice / LAMPORTS_PER_SOL;
        await DaoModel.updateOne(
          { symbol },
          {
            floorPrice: {
              value: newFloorPrice,
              lastUpdate: new Date(),
            },
          }
        );
        dao.floorPrice = newFloorPrice;
      } catch (err) {}
    }
    delete dao.floorPriceLastUpdate;
    return successResponse({ res, response: { dao } });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
