/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
export const getHashParams = () => {
  let hashParams = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.parent.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

/**
 * Generate random string using the browser crypto function
 * @return string
 *
 * src: https://github.com/aaronpk/pkce-vanilla-js/blob/master/index.html
 */
export function generateRandomString() {
  let array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
}

/**
 * Calculate the SHA256 hash of an input text
 * @return a promise that resolves to an Array Buffer
 *
 * src: https://github.com/aaronpk/pkce-vanilla-js/blob/master/index.html
 */
export function sha256(input) {
  const encoder = new TextEncoder();
  const encoded_data = encoder.encode(input);
  return window.crypto.subtle.digest("SHA-256", encoded_data);
}

/**
 * Base64 url encode an input string
 * @return a base64url encoded string
 *
 * src: https://github.com/aaronpk/pkce-vanilla-js/blob/master/index.html
 */
export function base64urlEncode(input) {
  // Convert the ArrayBuffer to string using Uint8 array to conver to what btoa accepts.
  // btoa accepts chars only within ascii 0-255 and base64 encodes them.
  // Then convert the base64 encoded to base64url encoded
  //   (replace + with -, replace / with _, trim trailing =)
  return btoa(String.fromCharCode.apply(null, new Uint8Array(input)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Generate a PCKE code challenge
 * @return string
 *
 * src: https://github.com/aaronpk/pkce-vanilla-js/blob/master/index.html
 */
export async function generateCodeChallenge(verifier) {
  let hashed = await sha256(verifier);
  return base64urlEncode(hashed);
}
