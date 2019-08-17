import React, { Component } from 'react'
import Editor from '../../src/index'
// import Editor from '../../dist'
import styles from './app.module.scss'
import value from '../static/help.md'

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      mobile: false
    }
    this.$vm = React.createRef()
  }

  componentDidMount() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
    setTimeout(() => {
      this.setState({
        value
      })
    }, 200)
  }

  resize() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      this.setState({
        mobile: false
      })
    } else {
      this.setState({
        mobile: true
      })
    }
  }

  handleChange(value) {
    this.setState({
      value
    })
  }

  handleSave(value) {
    console.log('触发保存事件', value)
  }

  addImg($file) {
    console.log(this.$vm.current.img2Url(1, '234'))
    console.log($file)
  }

  render() {
    const { value, mobile } = this.state

    return (
      <div className={styles.main}>
        <div className={styles.top}>
          <h1>for-editor</h1>
          <ul>
            <li>
              <a
                href="https://github.com/kkfor/for-editor"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.editor}>
          {mobile && (
            <Editor
              ref={this.$vm}
              height="500px"
              toolbar={{
                h1: true,
                h2: true,
                h3: true,
                save: true,
                preview: true
              }}
              value={value}
              subfield={false}
              onChange={value => this.handleChange(value)}
              onSave={value => this.handleSave(value)}
            />
          )}
          {!mobile && (
            <Editor
              ref={this.$vm}
              language="en"
              height="700px"
              value={value}
              addImg={($file) => this.addImg($file)}
              onChange={value => this.handleChange(value)}
              onSave={value => this.handleSave(value)}
            />
          )}
        </div>
      </div>
    )
  }
}

export default App
