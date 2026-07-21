import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

const antigravityConnector = process.env.ANTIGRAVITY_CONNECTOR ?? "api.antigravity.ai/eve-chat-template-uuys";

export default defineMcpClientConnection({
  url: "https://api.antigravity.ai/mcp",
  description: "Antigravity API connection",
  auth: connect({
    connector: antigravityConnector,
    principalType: "app",
  }),
});
