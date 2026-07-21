import { getToken } from '@vercel/connect';

async function main() {
  const token = await getToken('api.antigravity.ai/eve-chat-template-uuys', { subject: { type: "app" } });
  console.log("Token:", token);
}

main().catch(console.error);
