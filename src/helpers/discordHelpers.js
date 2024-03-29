import axios from "axios";
import UserModel from "../modules/User/model";

export const getDiscordAccessToken = async (userId, code, redirect_uri) => {
  const params = {
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    scope: "identify connections guilds guilds.members.read dm_channels.read",
    redirect_uri,
  };

  const paramsString = new URLSearchParams(params);
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const { data } = await axios.post(
    "https://discord.com/api/oauth2/token",
    paramsString,
    {
      headers,
    }
  );
  const { access_token: accessToken, refresh_token: refreshToken } = data;

  await UserModel.updateOne(
    { _id: userId },
    {
      "externalLinks.discord.accessToken": accessToken,
      "externalLinks.discord.refreshToken": refreshToken,
    }
  );
  return accessToken;
};

export const getDiscordUser = async (accessToken) => {
  const { data } = await axios.get("https://discord.com/api/users/@me", {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const revokeDiscord = async (accessToken) => {
  let data = {
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    token: accessToken,
  };
  const params = new URLSearchParams(data);
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const { data: response } = await axios.post(
    "https://discord.com/api/oauth2/token/revoke",
    params,
    {
      headers,
    }
  );
  return response;
};

export const getDiscordGuilds = async (accessToken) => {
  const { data } = await axios.get(`https://discord.com/api/users/@me/guilds`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const getDiscordChannelMessages = async (channelId, accessToken) => {
  const { data } = await axios.get(
    `https://discord.com/api/channels/${channelId}`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

export const refreshDiscordToken = async (refreshToken, userId) => {
  let data = {
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };
  const params = new URLSearchParams(data);
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const { data: response } = await axios.post(
    "https://discord.com/api/oauth2/token",
    params,
    {
      headers,
    }
  );
  await UserModel.updateOne(
    { _id: userId },
    { "externalLinks.discord.refreshToken": response }
  );
  return response;
};

export const checkIfFollowingDiscordAccount = async (userHandle) => {
  try {
    console.log("here I am");
  } catch (err) {
    console.log(err);
  }
};

checkIfFollowingDiscordAccount();
