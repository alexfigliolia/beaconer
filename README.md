# Beaconer

A backward compatible wrapper around the Beacon API! 

This API is commonly used for sending application analytics or diagnostics that were historically sent in the background using some combination of standard HTTP Requests with the page visibility API. A common pitfall developers would run into is that the browser, in some cases, would choose not to send out the request when a browser tab is in the background. The Beacon API was implemented to fix this issue. 

This package wraps the API with an `XMLHttpRequest` fallback.

## Installation
```bash
npm i -S beaconer

yarn add beaconer
```

## Usage
The `Beaconer` has two public properties:

```typescript
import { Beaconer } from "beaconer";

// The Beaconer will post your data to the target url using
// the Beacon API (if available) and fallback on an 
// `XMLHttpRequest`
const success = await Beaconer.send("url", JSON.stringify({ someData: 123 }));

// The `browserSupport` property will be true if the current 
// browser supports the Beacon API
const isUsingBeaconAPI = Beaconer.browserSupport;
```