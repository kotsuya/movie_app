import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

/*
const movieTitles = [
  "Mertrix",
  "Full Metal Jacket",
  "Oldboy",
  "Star wars"
];

const movieImages = [
  "http://cdn01.cdn.justjared.com/wp-content/uploads/headlines/2017/03/matrix-morpheus.jpg",
  "https://fanart.tv/fanart/movies/600/movieposter/full-metal-jacket-522752b4c2775.jpg",
  "http://2.bp.blogspot.com/_nE0S8RkkHEU/TJQeIFhj9aI/AAAAAAAAAZk/IvLStcdCQMY/s1600/oldboy.jpg",
  "http://cdn.collider.com/wp-content/uploads/star-wars-universe.jpg"
];
*/

class App extends Component {

  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = {}

  componentDidMount() {
    // setTimeout(()=>{
    //   this.setState({
    //     movies : [
    //     {
    //       title : "Mertrix",
    //       poster : "http://cdn01.cdn.justjared.com/wp-content/uploads/headlines/2017/03/matrix-morpheus.jpg",
    //     },
    //     {
    //       title : "Full Metal Jacket",
    //       poster : "https://fanart.tv/fanart/movies/600/movieposter/full-metal-jacket-522752b4c2775.jpg",
    //     },
    //     {
    //       title : "Oldboy",
    //       poster : "http://2.bp.blogspot.com/_nE0S8RkkHEU/TJQeIFhj9aI/AAAAAAAAAZk/IvLStcdCQMY/s1600/oldboy.jpg",
    //     },
    //     {
    //       title : "Star wars",
    //       poster : "http://cdn.collider.com/wp-content/uploads/star-wars-universe.jpg"
    //     },
    //     {
    //       title : "Transpotting",
    //       poster: "https://i.pinimg.com/originals/d9/23/d2/d923d2bc1b315512a01df2035f8187fe.jpg"
    //     }
    //   ]
    //
    //   })
    // },3000)
    this._getMovies();
  }

_getMovies = async () => {
  const movies = await this._callApi()
  this.setState({
    movies
  })
}

_callApi = () => {
  return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
  .then(potato => potato.json())
  .then(json => json.data.movies)//console.log(json.data.movies))
  .catch(err => console.log(err))
}

_renderMovies = () => {
  const movies = this.state.movies.map(movie => {
    // console.log(movie)
    return <Movie
    title={movie.title_long}
    poster={movie.medium_cover_image}
    key={movie.id}
    genres={movie.genres}
    synopsis={movie.synopsis}/>
  })
  return movies
}

  render() {
    // console.log('did render')
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
