import { Box, Button, Checkbox, FormControlLabel, FormLabel, TextField, } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
    const [inputs, setInputs] = useState();
    const id = useParams().id;
    const [checked, setChecked] = useState(false);
    const history = useNavigate();
    useEffect(() => {
        const fetchHandler = async () => {
            await axios
                .get(`https://jewellery-backend-or7c.onrender.com/books/${id}`)
                .then((res) => res.data)
                .then((data) => setInputs(data.book));
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        await axios
            .put(`https://jewellery-backend-or7c.onrender.com/books/${id}`, {
                name: String(inputs.name),
                idno: String(inputs.idno),
                description: String(inputs.description),
                price: Number(inputs.price),
                image: String(inputs.image),
                cart: false, //Cart should be set to false because existing book is updated here.
                stock:Number(inputs.stock),
                available: Boolean(checked),
            })
            .then((res) => res.data);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/books"));
    };
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div>
            {inputs && (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent={"center"}
                        maxWidth={700}
                        alignContent={"center"}
                        alignSelf="center"
                        marginLeft={"auto"}
                        marginRight="auto"
                        marginTop={10}
                    >
                        <FormLabel>product Name</FormLabel>
                        <TextField
                            value={inputs.name}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            name="name"
                        />
                        <FormLabel>idno</FormLabel>
                        <TextField
                            value={inputs.idno}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            name="author"
                        />
                        <FormLabel>Description</FormLabel>
                        <TextField
                            value={inputs.description}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            name="description"
                        />
                        <FormLabel>Price</FormLabel>
                        <TextField
                            value={inputs.price}
                            onChange={handleChange}
                            type="number"
                            margin="normal"
                            variant="outlined"
                            name="price"
                        />
                        <FormLabel>Stock</FormLabel>
                        <TextField
                            value={inputs.stock}
                            onChange={handleChange}
                            type="number"
                            margin="normal"
                            variant="outlined"
                            name="stock"
                        />
                        <FormLabel>Image</FormLabel>
                        <TextField
                            value={inputs.image}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            name="image"
                        />
                        <FormControlLabel 
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={() => setChecked(!checked)}
                                />
                            }
                            label="Available"
                        />

                        <Button variant="contained" 
                        style={{ backgroundColor: 'black', color: 'white' }}
                        type="submit">Update</Button>
                    </Box>
                </form>
            )}
        </div>
    );
};

export default UpdateBook;
