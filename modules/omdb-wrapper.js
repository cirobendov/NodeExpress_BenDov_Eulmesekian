import axios from "axios";
const APIKEY = "9c5167ef"; // Solo la clave, sin la URL completa
const BASE_URL = "http://www.omdbapi.com/";


const OMDBSearchByPage = async (searchText, page = 1) => {
  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: []
  };

  try {
    const requestString = `${BASE_URL}?apikey=${APIKEY}&s=${searchText}&page=${page}`;
    const response = await axios.get(requestString);


    if (response.data.Response === "True") {
      returnObject.respuesta = true;
      returnObject.cantidadTotal = parseInt(response.data.totalResults, 10);
      returnObject.datos = response.data.Search;
    }
  } catch (error) {
    console.error("Error en OMDBSearchByPage:", error);
  }


  return returnObject;
};


const OMDBSearchComplete = async (searchText) => {
  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: []
  };


  try {
    let page = 1;
    let totalResults = 0;
    let allResults = [];


    while (true) {
      const requestString = `${BASE_URL}?apikey=${APIKEY}&s=${searchText}&page=${page}`;
      const response = await axios.get(requestString);


      if (response.data.Response === "True") {
        totalResults = parseInt(response.data.totalResults, 10);
        allResults = [...allResults, ...response.data.Search];
      } else {
        break;
      }


      if (allResults.length >= totalResults) {
        break;
      }
      page++;
    }


    returnObject.respuesta = true;
    returnObject.cantidadTotal = totalResults;
    returnObject.datos = allResults;
  } catch (error) {
    console.error("Error en OMDBSearchComplete:", error);
  }


  return returnObject;
};


const OMDBGetByImdbID = async (imdbID) => {
  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: {}
  };


  try {
    const requestString = `${BASE_URL}?apikey=${APIKEY}&i=${imdbID}`;
    const response = await axios.get(requestString);


    if (response.data.Response === "True") {
      returnObject.respuesta = true;
      returnObject.datos = response.data;
    }
  } catch (error) {
    console.error("Error en OMDBGetByImdbID:", error);
  }


  return returnObject;
};


export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };
