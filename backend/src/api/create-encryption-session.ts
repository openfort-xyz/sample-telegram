import openfort from '../utils/openfortAdminConfig';
import express, { Request, Response } from 'express';

export async function createEncryptionSession(
  req: Request,
  res: Response
) {
  console.log('createEncryptionSession');
  try {
    console.log(process.env.SHIELD_API_KEY);
    console.log(process.env.SHIELD_SECRET_KEY);
    console.log(process.env.SHIELD_ENCRYPTION_SHARE);
    const session = await openfort.registerRecoverySession(process.env.SHIELD_API_KEY!, process.env.SHIELD_SECRET_KEY!, process.env.SHIELD_ENCRYPTION_SHARE!)
    res.status(200).send({
        session: session,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      error: 'Internal server error',
    });
  }
}
