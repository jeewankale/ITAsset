import React, {  } from "react";
import './ReactTagInputStyle.scss';
const Tag = props => <span className="tag" {...props} />
const Delete = props => <button className="delete" {...props} />
const Help = props => <span className="help" {...props} />

class ReactTagsInput extends React.Component {
  constructor () {
    super()
    this.state = {
      license: []
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleRemoveTag = this.handleRemoveTag.bind(this)
  }
  
  handleChange (e) {
    this.setState({ license: e.target.value })
    console.log("values:",this.state.license)
  }
  
  handleKeyDown (e) {
      console.log("key pressed")
    if (e.keyCode === 13 && e.target.value !== '')  {
      let license = this.state.license.trim()
      console.log("license:=",license);
      this.setState({ license: license })
      console.log("State values:",this.state.license)
      if (this.props.value.indexOf(license) === -1) {
          console.log("inside -1")
        this.props.value.push(license)
        this.setState({ license: license })
        //this.setState({ license: '' })
      }
      e.target.value = ''
    }
  }
  
  handleRemoveTag (e) {
    let license = e.target.parentNode.textContent.trim()
    let index = this.props.value.indexOf(license)
    this.props.value.splice(index, 1)
    this.setState({ license: '' })
  }
  
  render () {
    return (
      <div>
        <div className="tags-input">
          {this.props.value.map((license, index) => (
              
            <Tag key={index}>
              {license}
              <Delete  onClick={this.handleRemoveTag} />
            </Tag>
          ))}
          <input type="text" 
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </div>
        <Help>hit 'Enter' to add new License Keys</Help>
      </div>
    )
  }
}

export default ReactTagsInput;