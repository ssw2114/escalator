import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadImagesThunk} from '../store/image'

class ImageUpload extends Component {
  onChange = e => {
    e.preventDefault()
    const photos = Array.from(e.target.files)
    let formData = new FormData()
    // console.log('FIRST FILE:', photos[0])

    photos.forEach((file, i) => {
      formData.append(i, file)
    })

    this.props.loadImages(formData)

    // let headers = new Headers()
    // headers.append(
    //   'Authorization',
    //   'Basic ' + btoa('723314166911458:8-yXh5UHr7jf1Xqu01urqE4KhmU')
    // )
    // fetch(`https://api.cloudinary.com/v1_1/di6e6irfj/image/upload`, {
    //   headers: headers,
    //   method: 'POST',
    //   body: formData,
    //   credentials: 'include'
    // })
    //   .then(res => {
    //     console.log('CLOUD RESPONSE:', res)
    //   })
    //   .catch(err => console.log(err))
    // let promises = photos.forEach((file, i) => {
    //   return EXIFP(file).then()
    // }

    // await photos.forEach(async (file, i) => {
    //   await EXIF.getData(file, async function() {
    //     let time = await EXIF.getTag(this, 'DateTimeOriginal')
    //     file.time = time
    //     let name = i.toString()
    //     console.log('post-exif file', file)
    //     formData.append(name, file)
    //   })
    // })
  }

  render() {
    return (
      <div>
        <label>Upload Photo</label>
        <input type="file" onChange={this.onChange} multiple />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    images: state.image.images
  }
}

const mapDispatch = dispatch => ({
  loadImages: data => dispatch(loadImagesThunk(data))
})

export default connect(mapState, mapDispatch)(ImageUpload)
