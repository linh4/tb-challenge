// Taboola api:
const URL = "https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init"

document.addEventListener('DOMContentLoaded', load)

// Load the data from the api
async function load() {
  try {
    let response = await fetch(URL)
    let data = await response.json()
    setHeader()
    renderAds(data)
  } catch(err) {
    errorPage() // TypeError: failed to fetch
  }
}

// If there is no list value return from the api
const notFoundData = `
  <div>
    <div class='img-container'>
      <a href='https://taboola.com' target='_blank'>
        <img src="https://upload.wikimedia.org/wikipedia/en/3/3c/Taboola_logo.png" />
        <p>No data is found!</p>
      </a>
    </div>
  </div>
`

// Render the ads with images, title, brand name and categories
// Check if there is list and categories
function renderAds(data) {
  data.list ? data.list.map(ad => {
    const categories = ad.categories ? ad.categories[0] : null
    const render = `
      <div>
        <a href=${ad.url} target='_blank'>
          <div class='img-container'>
            <img src=${ad.thumbnail[0].url} alt=${ad.name} />
            <p>${categories}</p>
          </div>
        </a>
        <a href=${ad.url} target='_blank'>
          <p class='ad-title'>${ad.name}</p>
          <p class='ad-brand'>${ad.branding}</p>
        </a>
      </div>
    `
    document.querySelector('.container').innerHTML += render
  })
  : notFoundData
}

// Detect the language to show the ads
const setLanguage = () => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0]
  } else {
    return navigator.language || navigator.userLanguage || navigator.browserLanguage || 'en'
  }
}

// Header with the link to taboola site and set the display language
function setHeader() {
  const header = `
      <p class="left" lang=${setLanguage()}>You May Like</p>
      <p class="right" lang=${setLanguage()}>
        <a href='https://taboola.com' target='_blank'>
          Sponsored Links by Taboola
        </a>
      </p>
    `
  document.querySelector('.header').innerHTML += header
}

// Error page for handle error from fetch the api
function errorPage() {
  const giphy = `
    <div class="giphy">
      <iframe src="https://giphy.com/embed/YFFIXwYg08nwf4U3y1" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/sweets-kendamas-404-kendama-YFFIXwYg08nwf4U3y1">via GIPHY</a></p>
    </div>
  `
  document.querySelector('.header').innerHTML += giphy
}
