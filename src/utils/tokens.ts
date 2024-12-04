const TOKEN_IDENTIFIERS: Record<string, string> = {
  'MEX': 'MEX-455c57',
  'LKMEX': 'LKMEX-aab910',
  'ASH': 'ASH-a642d1',
  'WBTC': 'WBTC-5349b3',
  'WETH': 'WETH-b4ca29',
  'EGLD': 'WEGLD-bd4d79',
};

export const getTokenIconUrl = (tokenName: string) => {
  const identifier = TOKEN_IDENTIFIERS[tokenName];
  if (!identifier) return '/fallback-token-icon.png'; // Add a fallback icon
  return `https://media.elrond.com/tokens/asset/${identifier}/logo.png`;
}; 