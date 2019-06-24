import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadImagesThunk} from '../store/image'

class ImageUpload extends Component {
  constructor() {
    super()
    this.state = {
      offset: 'Z'
    }
  }

  onUpload = e => {
    e.preventDefault()
    const photos = Array.from(e.target.files)
    let formData = new FormData()
    // console.log('FIRST FILE:', photos[0])

    photos.forEach((file, i) => {
      formData.append(i, file)
    })

    this.props.loadImages(formData, this.state.offset)

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
  }

  zoneChange = e => {
    event.preventDefault()
    this.setState({offset: e.target.value})
  }

  render() {
    const offsets = [
      '-12:00',
      '-11:00',
      '-10:00',
      '-9:30',
      '-9:00',
      '-8:00',
      '-7:00',
      '-6:00',
      '-5:00',
      '-4:00',
      '-3:30',
      '-3:00',
      '-2:00',
      '-1:00',
      'UTC',
      '+1:00',
      '+2:00',
      '+3:00',
      '+3:30',
      '+4:00',
      '+4:30',
      '+5:00',
      '+5:30',
      '+5:45',
      '+6:00',
      '+6:30',
      '+7:00',
      '+8:00',
      '+8:45',
      '+9:00',
      '+9:30',
      '+10:00',
      '+10:30',
      '+11:00',
      '+12:00',
      '+12:45',
      '+13:00',
      '+14:00'
    ]
    return (
      <div>
        <label>First, select a UTC Offset</label>
        <select value={this.state.offset} onChange={this.zoneChange}>
          {offsets.map(
            (offset, idx) =>
              offset === 'UTC' ? (
                <option key={idx} value="Z">
                  {offset}
                </option>
              ) : (
                <option key={idx} value={offset}>
                  {offset}
                </option>
              )
          )}
        </select>

        <label>Next, upload images</label>
        <input type="file" onChange={this.onUpload} multiple />
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
  loadImages: (data, offset) => dispatch(loadImagesThunk(data, offset))
})

export default connect(mapState, mapDispatch)(ImageUpload)
