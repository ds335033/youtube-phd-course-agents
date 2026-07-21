import { getToken } from '@vercel/connect';

async function main() {
  try {
    // Read the token for the API connector "your-api/my-api"
    const token = await getToken('your-api/my-api');
    console.log("Success! Token received:", token);
  } catch (error) {
    console.error("Failed to get token:", error);
    console.log("\nMake sure you have created the connection first by running:");
    console.log("vercel connect create your-api --name my-api");
  }
}

main();
