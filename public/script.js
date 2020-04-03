const host = window.location.host

// apply target '_blank' to links that link outside the site
document.querySelectorAll('a').forEach((a) => {
  if (a.host !== host) {
    a.target = '_blank'
  }
})
