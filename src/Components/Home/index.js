import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import Output from '../Output'

import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class Home extends Component {
  state = {final: [], API: '', initial: categoriesList[0].id}

  onchange = event => {
    this.setState({initial: event.target.value}, this.getDetails)
  }

  renderView = () => {
    const {final} = this.state
    return (
      <>
        <ul className="unordered">
          {final.map(each => (
            <Output user12={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  onclick = () => {
    this.getDetails()
  }

  renderLoadingView = () => (
    <>
      <div data-testid="loader" className="center">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    </>
  )

  renderFailureView = () => (
    <>
      <div className="center1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
          alt="failure view"
          className="Failure"
        />
        <h1 className="oops">Oops! Something Went Wrong</h1>
        <p className="we">
          We cannot seem to find the page you are looking for.
        </p>
        <button type="button" className="button" onClick={this.onclick}>
          Retry
        </button>
      </div>
    </>
  )

  componentDidMount = () => {
    this.getDetails()
  }

  getDetails = async () => {
    const {initial} = this.state
    this.setState({API: apiStatus.inprogress})
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${initial}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const Data = await response.json()
    if (response.ok === true) {
      const UpdatedData = Data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({final: UpdatedData, API: apiStatus.success})
    } else {
      this.setState({API: apiStatus.failure})
    }
  }

  ntr = () => {
    const {API} = this.state
    switch (API) {
      case apiStatus.success:
        return this.renderView()
      case apiStatus.inprogress:
        return this.renderLoadingView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {initial} = this.state
    return (
      <div>
        <Header />
        <div className="div">
          <select className="select" onChange={this.onchange} value={initial}>
            {categoriesList.map(each => (
              <option key={each.id} value={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
        </div>
        {this.ntr()}
      </div>
    )
  }
}

export default Home
