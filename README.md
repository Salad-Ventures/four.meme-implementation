# four.meme Token Launch Implementation

This implementation handles the automatic form population when users launch their meme coins from four.meme to the token launch page.

## How It Works

When a user clicks the "Launch on four.meme" button on memeOS, they are redirected to `four.meme/create-token` with URL parameters containing their meme coin details:

### Example URL with parameters

`https://four.meme/launch-token?name=AbsurdApocalypse&symbol=LOLZ&description=Dive%20into%20the%20realm%20of%20existential%20wackiness,%20where%20chaos%20reigns%20and%20memes%20ponder%20their%20existence!&image=https://dev-meme-coin-images.s3.ap-southeast-1.amazonaws.com/meme-coins/absurdapocalypse-1732588507479.png`

### URL Parameters

- `name`: The name of the meme coin
- `symbol`: The token symbol
- `description`: A description of the meme coin (URL encoded)
- `image`: URL to the meme coin's image

### Automatic Form Population

The script automatically:

1. Extracts parameters from the URL
2. Populates form fields with the corresponding values:
   - Token name → `#name`
   - Token symbol → `#shortName`
   - Description → `#desc`
3. Downloads and uploads the image to the file input field

## Implementation Details

### Parameter Extraction

```javascript
function getUrlParams(url) {
  const params = new URL(url).searchParams;
  return {
    name: params.get("name"),
    symbol: params.get("symbol"),
    description: params.get("description"),
    image: params.get("image"),
  };
}
```

## Example Flow

1. User creates a meme coin on memeOS
2. Clicks "Launch on four.meme" button
3. Redirects to launch page with parameters
4. Script automatically populates:
   - Name: "AbsurdApocalypse"
   - Symbol: "LOLZ"
   - Description: "Dive into the realm..."
   - Image: Uploads from provided URL

## Demo

> 🎥 **Watch how it works:** [View Demo](https://www.loom.com/share/4fcc9b23bbd0474fab6ca1de882950ec?sid=92c682d3-8c78-4bba-98bf-bd52b45bbf28)

## Error Handling

The implementation includes error handling for:

- Missing form fields
- Failed image uploads
- Invalid URL parameters
- Network issues during image fetch

## Usage

Simply include the script on the launch token page:

```html
<script src="script.js"></script>
```

The form population will happen automatically when the page loads with the appropriate URL parameters.

Key Additions

1.  Allowed Domains List:
    • allowedDomains is an array of domains (e.g., ["memeos.ai"]).
    • Subdomains are automatically supported using referrerDomain.endsWith(domain).
2.  isReferrerAllowed Function:
    • Extracts the domain from document.referrer using the URL object.
    • Checks if the domain matches any entry in allowedDomains.
3.  Referrer Restriction:
    • The script only runs if the isReferrerAllowed function returns true.
    • If the referrer is invalid, unavailable, or not allowed, the script stops execution and logs a warning.

How It Works

• Valid Referrer:
If the document.referrer is from a domain or subdomain listed in allowedDomains, the script proceeds to populate the form and upload the image.
• Invalid or No Referrer:
If the document.referrer is missing, invalid, or from an unlisted domain, the script halts and logs a warning.

Example Scenarios

1.  Referrer: https://app.memeos.ai
    • Allowed: The script executes because app.memeos.ai ends with memeos.ai.
2.  Referrer: https://external-site.com
    • Blocked: The script logs Referrer is not allowed and stops execution.
3.  No Referrer (e.g., Direct Visit or Bookmark):
    • Blocked: The script logs Referrer is not valid or unavailable.

Notes

• Testing:
You can simulate different referrers by modifying the document.referrer in the browser console (not allowed in production environments).

Object.defineProperty(document, 'referrer', { value: 'https://app.memeos.ai', configurable: true });

• Caveats:
Referrer data may not be available in all scenarios (e.g., direct visits or strict browser privacy settings).
• Security:
This method is not foolproof. For sensitive use cases, server-side validation is recommended.
