import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MuiChipsInput } from 'mui-chips-input';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from "axios";
const myStyle = {
    display: "grid",
    backgroundImage:
        "url('https://i.ibb.co/TtqzJ28/Rectangle-165.png')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: "contain",
    backgroundPosition: "center"
};

export const Right = (props) => {
    const [dishData, setDishData] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (props.value) {
            setDishData(props.value);
        }
    }, [props.value]);

    const onClickSave = async () => {
        if (dishData._id) {
            let obj = {
                _id: dishData._id,
                dishName: dishData.dishName,
                ingredients: chips,
            }
            const response = await axios.put("http://localhost:5000/editdish", obj);
            
            if(response.status==200){
                let tempDishes = props.currentdishes;

                tempDishes.map((ele) => {
                    if (props.value._id == ele._id) {
                        ele.dishName = dishData.dishName
                        ele.ingredients = chips;
                    }
                })
                props.setCurrentdishes([...tempDishes]);
            } 
        }


        else {
            if (chips == undefined) {
                setShowMessage(true)
            }
            var newobj = {
                // id: props.visibleRecipes[props.visibleRecipes.length - 1].id + 1,
                ...dishData,
                ingredients: [...chips]
            }


            props.setRecipes([...props.visibleRecipes, newobj])
            const { dishName, ingredients } = newobj
            axios.post('http://localhost:5000/createdish', {
                dishName,
                ingredients
            })
                .then(data => console.log(data))
                .catch(e => {
                    console.error(e);
                })
            // console.log("checking flow 2");
            
            // window.alertmessage()
        }
    }

   

    const [chips, setChips] = useState(props.value.ingredients || [])
    useEffect(() => {
        setChips(props.value.ingredients)
    }, [props.value])

    const handleChange = (newChips) => {
        setChips(newChips)
    }


    return (
        <>
            {dishData && <div style={myStyle}>
                <TextField sx={{ "margin": "1rem", "width": "auto" }} type="text" label="Dish" value={dishData.dishName || ""} fullWidth onChange={(e) => setDishData({ ...dishData, dishName: e.target.value })} />
                <MuiChipsInput value={chips} onChange={handleChange} sx={{ "margin": "1rem" }} />

            </div>}
            {showMessage && window.alertmessage("error", "fil both dishname and ingredients")}
            <div className="save-button" style={{ "display": "flex", "justifyContent": "end" }}>
                <Button variant="outlined" onClick={() => onClickSave()} style={{ "height": "30px", "borderRadius": "20px", "right": "12px" }} >Save</Button>
            </div>
        </>
    )
}


