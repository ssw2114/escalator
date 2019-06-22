import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadImagesThunk} from '../store/image'
import EXIF from 'exif-js'

class ImageUpload extends Component {
  onChange = e => {
    e.preventDefault()
    const errs = []
    const photos = Array.from(e.target.files)
    let formData = new FormData()
    const types = ['image/png', 'image/jpeg', 'image/gif']

    photos.forEach((file, i) => {
      //error checks
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`)
      }
      if (file.size > 150000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`)
      }
      let name = i.toString()
      EXIF.getData(file, function() {
        console.log('EXIF:', EXIF.getAllTags(this))

        //DateTimeOriginal or DateTime
      })
      formData.append(name, file)
    })
    console.log(formData.getAll('0'))
    console.dir(formData)
    this.props.loadImages(formData)
  }
  render() {
    return (
      <div>
        <label>Upload Photo</label>
        <input type="file" onChange={this.onChange} />
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
