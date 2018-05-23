// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

const haveSupport = 'serviceWorker' in navigator
const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    .test(window.location.hostname))

// Check if the service worker can be found. If it can't reload the page.
const checkValidServiceWorker = swUrl => fetch(swUrl)
  .then(response => {
    // Ensure service worker exists, and that we really are getting a JS file.
    if (response.status === 404 ||
      response.headers.get('content-type').indexOf('javascript') === -1) {
      // No service worker found. Probably a different app. Reload the page.
      return navigator.serviceWorker.ready
        .then(registration => registration.unregister())
        .then(() => window.location.reload())
    }
    return registerValidSW(swUrl)
  })

const register = () => {
  if (process.env.NODE_ENV !== 'production' || !haveSupport) return
  // The URL constructor is available in all browsers that support SW.
  const publicUrl = new URL(process.env.PUBLIC_URL, window.location)
  if (publicUrl.origin !== window.location.origin) {
    // Our service worker won't work if PUBLIC_URL is on a different origin
    // from what our page is served on. This might happen if a CDN is used to
    // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
    return
  }

  window.addEventListener('load', () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`

    if (!isLocalhost) return registerValidSW(swUrl)
    // This is running on localhost.
    // Lets check if a service worker still exists or not.
    return Promise.all([
      checkValidServiceWorker(swUrl),
      navigator.serviceWorker.ready // learn more https://goo.gl/SC7cgQ
    ]).catch(console.error)
  })
}

const registerValidSW = swUrl => navigator.serviceWorker
  .register(swUrl)
  .then(registration => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing
      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // At this point, the old content will have been purged and
            // the fresh content will have been added to the cache.
            // It's the perfect time to display a "New content is
            // available; please refresh." message in your web app.
            console.log('New content is available; please refresh.')
          } else {
            // At this point, everything has been precached.
            // It's the perfect time to display a
            // "Content is cached for offline use." message.
            console.log('Content is cached for offline use.')
          }
        }
      }
    }
  })
  .catch(console.error)

const unregister = () => haveSupport && navigator.serviceWorker.ready
  .then(registration => registration.unregister())

export {
  unregister
}
export default register
