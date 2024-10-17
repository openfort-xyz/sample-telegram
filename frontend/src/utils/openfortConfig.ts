import Openfort, { OpenfortConfiguration, ShieldConfiguration } from '@openfort/openfort-js';

const baseConfiguration: OpenfortConfiguration = {
  publishableKey: import.meta.env.VITE_OPENFORT_PUBLIC_KEY!,
}
const shieldConfiguration: ShieldConfiguration = {
  shieldPublishableKey: import.meta.env.VITE_SHIELD_API_KEY!,
  debug: false,
}

if(!import.meta.env.VITE_OPENFORT_PUBLIC_KEY || !import.meta.env.VITE_SHIELD_API_KEY || !import.meta.env.VITE_CHAIN_ID || !import.meta.env.VITE_POLICY_ID || !import.meta.env.VITE_CONTRACT_ID) {
  throw new Error('Missing Openfort environment variables');
}

// Initialize the Openfort SDK
const openfort = new Openfort({
  baseConfiguration,
  shieldConfiguration,
})

export default openfort;
