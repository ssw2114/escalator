# Escalator

_[README in progress]_

### Run Locally

1.  `npm install`
2.  This app uploads photos to Cloudinary, so you'll need upload API credentials. See https://cloudinary.com/documentation/image_upload_api_reference. Add these to your secrets.js file.
3.  `npm run start-dev`

### Deployment to Heroku

1.  Add a git remote for Heroku
2.  This app uploads photos to Cloudinary, so you'll need upload API credentials. See https://cloudinary.com/documentation/image_upload_api_reference. Add these as Config Vars in your Heroku app.
3.  `npm run deploy` (see './script/deploy')
