import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadGpxThunk} from '../store'

class GpxUpload extends Component {
  onChange = e => {
    e.preventDefault()
    const loadGpx = this.props.loadGpx.bind(this)
    let files = Array.from(e.target.files)
    console.log('FILES', files)
    let reader = new FileReader()
    reader.onload = function(e) {
      console.log('UPLOADING')
      let uniqueId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
      //convert to text
      let text = reader.result
      //slice text into sufficiently small strings
      let start = 0
      const packageSize = 80000
      let end = packageSize
      let seq = 1
      while (start < text.length) {
        let payload = text.slice(start, end)
        loadGpx(payload, uniqueId, seq)
        start = end
        end += packageSize
        seq++
      }
      //convert to array of objs

      // getD3InputArray(text).then(array => {
      //   console.log(array.length)
      //   const tenthArrayIdx = Math.floor(array.length / 10)
      //   // let tenthArray = array.slice(0, array[Math.floor(array.length / 10)])
      //   let tenthArray = array.slice(0, tenthArrayIdx)

      //   loadGpx(tenthArray)
      // })
    }
    reader.readAsText(files[0])
  }

  render() {
    return (
      <div>
        <label>Upload Gpx file</label>
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
  loadGpx: (data, id, seq, location) =>
    dispatch(loadGpxThunk(data, id, seq, location))
})

export default connect(mapState, mapDispatch)(GpxUpload)
