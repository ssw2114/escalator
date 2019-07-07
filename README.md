# Escalator

Escalator is a web application that visualizes the location of photographs relative to gps coordinates on a hike, based on the timestamp in the photos' Exif metadata. After a user uploads photos and a gpx files from their hikes, Escalator will generate an interactive elevation profile chart for each gpx file, which will render photos as the user mouses over the chart.

The application works with .jpeg images and does not require the images to contain location metadata.

Built with Node.js, PosgreSQL, Sequelize, Express, React, Redux and D3.js

Deployed at: https://escalator-gps.herokuapp.com

### Run Locally

1.  `npm install`
2.  This app uploads photos to Cloudinary, so you'll need upload API credentials. (See https://cloudinary.com/documentation/image_upload_api_reference.) Add these to your secrets.js file.
3.  `npm run start-dev`

### Deployment to Heroku

1.  Add a git remote for Heroku
2.  This app uploads photos to Cloudinary, so you'll need upload API credentials. (See https://cloudinary.com/documentation/image_upload_api_reference.) Add these credentials as Config Vars in your Heroku app.
3.  `npm run deploy` (See './script/deploy')
