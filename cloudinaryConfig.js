/* eslint-disable camelcase */
const cloudinary = require('cloudinary')
const uploader = require('cloudinary')

const cloudinaryConfig = () =>
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDNARY_SECRET
  })

module.exports = {cloudinaryConfig, uploader}
