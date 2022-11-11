
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import "../CSS/Left.css";


export default function InputWithIcon(props) {



  // const [page, setPage] = useState(1);

  const pageCount = () => {
    // check postperpage
    // return Math.ceil(props.totalRecipes.length / props.postperpage);
    if (props.searchTerm) {
      return Math.ceil(props.searchResult.length / 6);
    }
    else {
      return Math.ceil(props.totalRecipes.length / 6);
    }
  }

  const onClickDish = (ele) => {
    props.setSelectedDish(ele);
  }
  const onClickCreate = () => {
    props.setSelectedDish({});
  }

  const search = (e) => {
    if (e.target.value) {
      const filteredResult = props.visibleRecipes.filter(item => item.dishName?.toLowerCase().includes(e.target.value.toLowerCase()));
      props.setSearchResult(filteredResult);
      props.handlePageChange(null, 1)
    }
    else {
      props.setVisibleRecipes([...props.visibleRecipes]);

    }


    props.setSearchTerm(e.target.value);
  }

  return (
    <>

      <Stack direction="row" spacing={2} sx={{ "display": "flex", "justifyContent": "space-around" }}>
        <h3 style={{ "fontFamily": "cursive" }}>Dishes</h3>

        <Button onClick={onClickCreate} variant="outlined" startIcon={<AddIcon />} size="small" style={{ "height": "30px", "borderRadius": "20px", "top": "16px", "margin": "0" }}>Create</Button>
      </Stack>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <FormControl variant="standard">
          <Input
            value={props.searchTerm}
            onChange={search}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>


      {props.currentdishes
        .map((ele, i) => {
          return (<div key={i}>
            <ListItemButton onClick={() => onClickDish(ele)}>
              <ListItemText primary={ele.dishName} />
            </ListItemButton>
          </div>)
        })}




      <Stack spacing={2} style={{ "margin": "5px 10px" }} >
        <Pagination count={pageCount()} onChange={props.handlePageChange} variant="outlined" shape="circular" color='primary' />
      </Stack>







      {/* {props.totalRecipes.filter((x) => {
        if (searchTerm === "") {
          return x;
        } else if (x.dishName.toLowerCase().includes(searchTerm.toLowerCase())) {
          return x;
        }
        return false;
      }).slice(props.lastpostindex, props.lastpostindex + props.postperpage)  .map((ele, i) => {
        return (<div key={i}>
          <ListItemButton onClick={() => onClickDish(ele)}>
            <ListItemText primary={ele.dishName} />
          </ListItemButton>
          <br />
        </div>)
      })} */}











    </>
  );
}



