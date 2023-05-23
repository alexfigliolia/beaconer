/**
 * Beaconer
 *
 * A wrapper around the Beacon API used for posting small amounts
 * of data to a server. The Beacon API is commonly used for sending
 * analytics/diagnostic data without some of the pitfalls of using
 * a standard `XMLHttpRequest`. This wrapper provides a fallback for
 * the beacon API in browsers that do not support it
 *
 * To read more about the Beacon API:
 * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
 */
export class Beaconer {
  public static browserSupport = true;

  static {
    if (!window?.navigator || !window?.navigator?.sendBeacon) {
      this.browserSupport = false;
    }
  }

  /**
   * Send
   *
   * Posts a small amount of data to a specified URL using the
   * Beacon API when available. It'll fallback to a standard
   * `XMLHttpRequest` if the Beacon API is not supported.
   *
   * To pass headers to this API
   */
  public static async send(
    url: string | URL,
    data?: XMLHttpRequestBodyInit | null
  ) {
    if (this.browserSupport) {
      return this.beacon(url, data);
    }
    return this.fallback(url, data);
  }

  private static beacon(
    url: string | URL,
    data?: XMLHttpRequestBodyInit | null
  ) {
    return window.navigator.sendBeacon(url, data);
  }

  private static fallback(
    url: string | URL,
    data?: XMLHttpRequestBodyInit | null
  ) {
    return new Promise<boolean>((resolve) => {
      const request = new XMLHttpRequest();
      request.onload = () => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      };
      request.onerror = () => {
        resolve(false);
      };
      request.open("POST", url, true);
      request.send(data);
    });
  }
}
