import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters:{type: event}
    })
  }

  onFindPetsClick = (event) => {
    //event.preventDefault()
    let urlPath = (this.state.filters.type === 'all') ? '/api/pets' : `/api/pets?type=${this.state.filters.type}`
  fetch(urlPath)
  .then(response => response.json())
  .then(data => 
    //console.log(data)
    this.setState({pets: data})
    )
  }

  onAdoptPet = (pet) => {
    let petIndex = this.state.pets.findIndex(x => x.id === pet)
    console.log(petIndex)
    
    let tempState = [...this.state.pets];
    let tempItem = {...this.state.pets[petIndex]};
    tempItem.isAdopted = true;
    tempState[petIndex] = tempItem;
    this.setState({pets: tempState});



  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
