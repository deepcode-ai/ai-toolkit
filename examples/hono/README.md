# Hono + AI TOOLKIT Example

You can use the AI TOOLKIT in an [Hono](https://hono.dev/) server to generate and stream text and objects.

## Usage

1. Create .env file with the following content (and more settings, depending on the providers you want to use):

```sh
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

2. Run the following commands from the root directory of the AI TOOLKIT repo:

```sh
pnpm install
pnpm build
```

3. Run the following command:

```sh
pnpm dev
```

4. Test the endpoint with Curl:

```sh
curl -i -X POST http://localhost:8080
```
