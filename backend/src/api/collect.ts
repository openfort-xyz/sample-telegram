import openfort from '../utils/openfortAdminConfig';
import { Request, Response } from 'express';

const policy_id = process.env.POLICY_ID;
const contract_id = process.env.CONTRACT_ID;
const chainId = Number(process.env.CHAIN_ID);
const optimistic = true;

export async function collect(
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

    const playerId = response.id;
    const interaction_mint = {
      contract: contract_id,
      functionName: 'mint',
      functionArgs: [playerId],
    };

    const transactionIntent = await openfort.transactionIntents.create({
      player: playerId,
      policy: policy_id,
      chainId,
      optimistic,
      interactions: [interaction_mint],
    });

    res.send({
      data: transactionIntent,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      error: 'Internal server error',
    });
  }
}
