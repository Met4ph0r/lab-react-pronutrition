import './App.css';
import React from 'react'


class FoodBox extends React.Component {

  constructor() {
    super()
    this.state = {
      "apple": 0,
      "banana": 0,
      "orange": 0,
      "guava": 0,
      "watermelon": 0,
      "pineapple": 0,
      "grapes": 0,
      "pomegranate": 0,

      "appleC": 0,
      "bananaC": 0,
      "orangeC": 0,
      "guavaC": 0,
      "watermelonC": 0,
      "pineappleC": 0,
      "grapesC": 0,
      "pomegranateC": 0,

      foodList: ["apple", "banana", "orange", "guava", "watermelon", "pineapple", "grapes", "pomegranate"],
      searchTerm: "",
      "totalCalories": 0
    }
  }

  addFoodCalories(name, cal, val) {
    val = parseInt(val)
    cal = parseInt(cal)
    cal = cal * val

    let nameCal = name + "C"
    this.setState({ [nameCal]: this.state[nameCal] + cal })
    this.setState({ [name]: this.state[name] + val })
    this.setState({ totalCalories: this.state.totalCalories + cal })
  }

  deleteFoodCalories(foodname) {
    let foodCal = foodname + "C"
    this.setState({totalCalories: parseInt(this.state.totalCalories) - parseInt(this.state[foodCal])})
    this.setState({[foodname]: 0})
    this.setState({[foodCal]: 0 })
  }

  createFood(name, calories, src) {
    return <>
      <div className="foodCard">
        <div className="image">
          <img src={src} height="100" width="100" alt='fruit' />
        </div>
        <div className="info">
          <p>{name}<br />
            {calories} cal/100 grams
          </p>
        </div>
        <div className="quantity">
          <input className="input" id={name} type="number" defaultValue="1" />

          <button className="button" onClick={() => this.addFoodCalories(name, calories, document.querySelector(`#${CSS.escape(name)}`).value)}>+</button>
        </div>
      </div>
    </>
  }

  foodObject = {
    "apple": this.createFood("apple", 52, "https://freepngimg.com/thumb/apple/8-2-apple-fruit-transparent.png"),
    "banana": this.createFood("banana", 89, "https://freepngimg.com/thumb/apple/8-2-apple-fruit-transparent.png"),
    "orange": this.createFood("orange", 47, "https://freepngimg.com/thumb/apple/8-2-apple-fruit-transparent.png"),
    "guava": this.createFood("guava", 68, "https://freepngimg.com/thumb/apple/8-2-apple-fruit-transparent.png"),
    "watermelon": this.createFood("watermelon", 30, "https://freepngimg.com/thumb/apple/8-2-apple-fruit-transparent.png"),
    "pineapple": this.createFood("pineapple", 50, "https://freepngimg.com/thumb/apple/8-2-apple-fruit-transparent.png"),
    "grapes": this.createFood("grapes", 67, "https://freepngimg.com/thumb/apple/8-2-apple-fruit-transparent.png"),
    "pomegranate": this.createFood("pomegranate", 83, "https://freepngimg.com/thumb/apple/8-2-apple-fruit-transparent.png")
  }

  DynamicSearch = (str) => {
    return this.state.foodList.filter(ele => ele.toLowerCase().includes(str.toLowerCase()))
  }

  render() {
    let found = []
    found = this.DynamicSearch(this.state.searchTerm)
    return <>

      <div className="parent">
        <div className="left-column">
          <input type="text" className="search" placeholder="Search food" onChange={(e) => { this.setState({ searchTerm: e.target.value }) }} />
          <div className="foodItems">
          {
          found.length==0 ? <div className='noResult'>No results found</div> :
                            found.map(ele => (
                              this.foodObject[ele]
                              ))
          }
            </div>
        </div>

        <div className="right-column">
          <h1>-----Today's Food-----</h1>
          <span id="total">{this.state.totalCalories}</span> Cal
          <div className='caloriesList'>
          {
            this.state.foodList.map(ele => {
              let nameCal = ele + "C"
              if (parseInt(this.state[ele]) > 0)
                return <>
                  <div className="calories-card">
                    {this.state[ele]} {ele} = {this.state[nameCal]} Cal
                    &nbsp; <button onClick={() => this.deleteFoodCalories(ele)}>X</button>
                  </div>
                  </>
                else return <></>
            }
            )
          }
          </div>
        </div>
      </div>
    </>
  }
}

export default FoodBox;
