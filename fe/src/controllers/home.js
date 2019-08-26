import homeView from '../views/home.art'

export default {
  render(req, res, next) {
    console.log(0)
    res.render(homeView(req))
  }
}