import openfort from '../utils/openfortAdminConfig';
import { Request, Response } from 'express';

const policy_id = process.env.POLICY_ID;
const chainId = Number(process.env.CHAIN_ID);

export async function createSession(
  req: Request,
  res: Response
) {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) {
    res.status(401).send({
      error: 'You must be signed in to view the protected content on this page.',
    });
    return
  }

  try {
    const response = await openfort.iam.verifyOAuthToken({
      provider: 'telegramMiniApp',
      token: accessToken,
      tokenType: 'idToken',
    });

    if (!response?.id) {
      res.status(401).send({
        error: 'Invalid token or unable to verify user.',
      });
      return
    }

    const { sessionDuration, sessionAddress } = req.body;
    if (!sessionDuration || !sessionAddress) {
      res.status(400).send({
        error: 'Session duration and sessionAddress are required',
      });
      return
    }
    const sessionDurationNumber: { [key: string]: number } = {
      '1hour': 3600000,
      '1day': 86400000,
      '1month': 2592000000,
    }
    if (!sessionDurationNumber[sessionDuration]) {
      res.status(400).send({
        error: 'Invalid session duration',
      });
      return
    }


    // The unix timestamp in seconds when the session key becomes valid in number format.
    const validAfter = Math.floor(new Date().getTime() / 1000)
    // The unix timestamp in seconds when the session key becomes invalid in number format (where session duration is 1hour, 1day, 1month).
    const validUntil = Math.floor(new Date(Date.now() + sessionDurationNumber[sessionDuration]).getTime() / 1000)

    const playerId = response.id;

    const sessionRegistration = await openfort.sessions.create({
      player: playerId,
      policy: policy_id,
      chainId,
      address: sessionAddress,
      validAfter: Number(validAfter),
      validUntil: Number(validUntil),
    });

    res.send({
      data: sessionRegistration,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      error: 'Internal server error',
    });
  }
}
