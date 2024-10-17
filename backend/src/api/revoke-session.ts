import openfort from '../utils/openfortAdminConfig';
import { Request, Response } from 'express';

const policy_id = process.env.POLICY_ID;
const chainId = Number(process.env.CHAIN_ID);

export async function revokeSession(
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
      provider: 'firebase',
      token: accessToken,
      tokenType: 'idToken',
    });

    if (!response?.id) {
      res.status(401).send({
        error: 'Invalid token or unable to verify user.',
      });
      return
    }

    const { sessionAddress } = req.body;
    if (!sessionAddress) {
      res.status(400).send({
        error: 'Session duration and sessionAddress are required',
      });
      return
    }

    const playerId = response.id;

    const sessionRevoke = await openfort.sessions.revoke({
      player: playerId,
      policy: policy_id,
      chainId,
      address: sessionAddress,
    });

    res.send({
      data: sessionRevoke,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      error: 'Internal server error',
    });
  }
}
