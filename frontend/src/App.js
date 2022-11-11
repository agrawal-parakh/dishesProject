
import './App.css';
import Left from './components/Left';
import { Right } from './components/Right';
import React, { useEffect, useState } from 'react';
import "./CSS/Main.css"
import axios from 'axios';
import { Alert, Stack } from '@mui/material';

// import Page from './components/Page';




function App() {

  // initital recipes
  const [recipes, setRecipes] = useState([])
  // clone the recipes
  const [visibleRecipes, setVisibleRecipes] = useState(null);
  // to store the selected recipes
  const [selectedDish, setSelectedDish] = useState(null);
  // for maintaining page numbers
  const [currentpage, setCurrentPage] = useState(1)
  // to show the current 6 recipes
  const [currentdishes, setCurrentdishes] = useState([]);
  // after search store the recipes
  const [searchResult, setSearchResult] = useState([]);

  const postperpage = 6;
  //get current dishes
  const lastpostindex = currentpage * postperpage;
  const firstpostindex = lastpostindex - postperpage;

  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    axios.get('http://localhost:5000/getAllDishData')
      .then(data => {
        console.log("checking",data)
        setRecipes(data.data);
        setVisibleRecipes([...data.data]);
      })
      .catch(e => {
        console.error(e);
      })
  }, [])

  useEffect(() => {
    // console.log("checking props.toptalrecipes", searchResult)


    if (!searchTerm.length) {
      let visibleDishes = (visibleRecipes && visibleRecipes.length) ? visibleRecipes : [];
      setCurrentdishes(visibleDishes.slice(firstpostindex, lastpostindex));
      
    } else {
      console.log("checking", searchResult)
      
      setCurrentdishes(searchResult.slice(firstpostindex, lastpostindex));
      
    }   
  }, [currentpage, visibleRecipes, searchResult]);


  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  };


  const maintainRecipes = (newRecipes) => {
    setRecipes(newRecipes);
    setVisibleRecipes(newRecipes);
  }


 


  window.alertmessage=(msgType, msg)=>{
    return(
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity={msgType}>{msg}</Alert>
      </Stack>    
    )
  }



  return (
    <div className="App">
      <div className="main-container " >
        <div className="left-container gradient-border" >
          
          <Left setSelectedDish={setSelectedDish} searchResult={searchResult} totalRecipes={recipes} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handlePageChange={handlePageChange} currentdishes={currentdishes} setVisibleRecipes={setVisibleRecipes} visibleRecipes={visibleRecipes} setSearchResult={setSearchResult} />
        </div>
        <div>
          {selectedDish && <Right value={selectedDish} visibleRecipes={visibleRecipes} setRecipes={maintainRecipes} setVisibleRecipes={setVisibleRecipes} currentdishes={currentdishes} setCurrentdishes={setCurrentdishes} recipes={recipes} />}
        </div>
      </div>
    </div>

  );
}

export default App;



