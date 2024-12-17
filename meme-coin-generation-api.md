# MEMEOS Generation API Documentation

## Overview

The MEMEOS Generation API provides an AI-powered service that creates complete meme coin concepts from trends. Each generated meme coin includes a unique name, description, token symbol and an AI-generated logo.

## Quick Start

### Base URL

```
https://start.memeos.ai/
```

### Authentication

All requests require an API key passed in the header:

```
x-api-key: ******
```

## Endpoints

### Generate Meme Coin

`POST /api/v1/generate-meme-coin`

Creates a complete meme coin concept based on a trend.

#### Request Body

```
{
  "trendName": "string (required)",
  "trendDescription": "string (optional)"
}
```

#### Response Format

```json
{
  "name": "string",
  "tokenSymbol": "string",
  "description": "string",
  "imageUrl": "string",
  "coreLeft": "string"
}
```

#### Example Request

```bash
curl -X POST https://start.memeos.ai/api/v1/generate-meme-coin \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key" \
  -d '{
    "trendName": "artificial intelligence",
    "trendDescription": "The rise of AI and its impact on society"
  }'
```

#### Example Response

```json
{
  "name": "AIpha",
  "tokenSymbol": "AIF",
  "description": "The first memecoin powered by artificial intelligence, combining viral memes with machine learning for maximum gains!",
  "imageUrl": "https://storage.memeos.ai/meme-coins/aipha-1234567890.png",
  "coreLeft": "999,999"
}
```

#### Error Responses

| Status Code | Description                        |
| ----------- | ---------------------------------- |
| 400         | Missing required field (trendName) |
| 401         | Invalid or missing API key         |
| 403         | CORE limit exceeded                |
| 500         | Server error during generation     |

## Rate Limiting and Usage

- Each API key has a CORE limit for meme coin generation
- The `coreLeft` field in the response shows remaining credits
- One meme coin generation consumes one CORE credit

## Best Practices

1. **Trend Names**

   - Keep trend names concise (2-4 words)
   - Use current internet culture references
   - Avoid explicit content or trademarked terms

2. **Descriptions**
   - Provide context for better results
   - Keep descriptions under 200 characters
   - Include relevant cultural references
