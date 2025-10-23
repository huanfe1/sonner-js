
function identity<T>(x: T): T {
  return x
}

/**
 * Stores the Trusted Types Policy. Starts as undefined and can be set to null
 * if Trusted Types is not supported in the browser.
 */
let policy: TrustedTypePolicy | null | undefined

/**
 * Getter for the Trusted Types Policy. If it is undefined, it is instantiated
 * here or set to null if Trusted Types is not supported in the browser.
 */
function getPolicy() {
  if (typeof policy === 'undefined' && typeof window !== 'undefined') {
    policy =
      window.trustedTypes?.createPolicy('sonner-js', {
        createHTML: identity,
        createScript: identity,
        createScriptURL: identity,
      }) || null
  }

  return policy
}

/**
 * Unsafely promote a string to a TrustedHTML, falling back to strings
 * when Trusted Types are not available.
 * This is a security-sensitive function; any use of this function
 * must go through security review. In particular, it must be assured that the
 * provided string will never cause an XSS vulnerability if used in a context
 * that will cause a browser to execute a script
 */
export function __unsafeCreateTrustedHtml(
  html: string
): string {
  return (getPolicy()?.createHTML(html) || html) as string
}
