import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import {IconButton, InputAdornment} from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import './Task.css'
import {useSearchParams} from 'react-router-dom';
import {Link, useLocation, useNavigate} from 'react-router-dom';



export default function Task(){
    const [params] = useSearchParams();
    const [title, setTitle] = useState(params.get('title'));
    const [description, setDescription]=useState(params.get('description'));
    const [status, setStatus]= useState(params.get('status'));
    const id = params.get('id');
    const navigate = useNavigate();

    const handletitleChange = (e) => {
        console.log(e);
        setTitle(e);
    }

    const handledescriptionChange = (e) => {
        console.log(e);
        setDescription(e);
    }
    const handlestatusChange = (updatedValue) => {
        setStatus(updatedValue);
    }

    const handleSubmit=()=>{
            if(title.length > 0 && status.length > 0 && status) {
                axios.post('api/task/create', {
                    params: {
                        id: id,
                        status: status,
                        title: title,
                        description: description,
                    }
                })
                    .then(function (response) {
                        if (response.data.success === true) {
                            console.log('Successfully Created the task');
                            navigate('/');
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
         else{
             console.log('title description and status will be compulsary');
         }
    }
    return(
        <>
            <div className='call-log-filters-container'>
                <div className='call-log-filters'>
                    <TextField
                        id="outlined-number"
                        label="Title"
                        type="tel"
                        className="campaign-filter-textfield"
                        value={title}
                        placeholder='Title'
                        onChange={(event) => handletitleChange(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoFocus
                    />
                    <TextField
                        id="outlined-number"
                        label="Description"
                        type="tel"
                        className="campaign-filter-textfield"
                        value={description}
                        placeholder='Title'
                        onChange={
                            (event) => handledescriptionChange(event.target.value)
                            }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoFocus
                    />
                    <FormControl style={{width: '15%'}}>
                        <InputLabel
                            id="demo-simple-select-label"
                            style={{
                                color: '#b0aaaa',
                                fontSize: '15px',
                                fontFamily: 'Inter',
                                fontWeight: 500,
                            }}
                        >Select Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Select Status"
                            onChange={(event) => handlestatusChange(event.target.value)}
                            style={{height: '50px'}}
                            sx={{
                                "& .MuiSelect-iconOutlined": {
                                    display: status ? 'none' : '',
                                },
                            }}
                            endAdornment={<IconButton sx={{display: status ? '' : 'none'}}
                                                      onClick={(event) => handlestatusChange('')}><ClearIcon/></IconButton>}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            <MenuItem value={'Todo'}>Todo</MenuItem>
                            <MenuItem value={'Inprogress'}>Inprogress</MenuItem>
                            <MenuItem value={'Done'}>Done</MenuItem>
                        </Select>
                    </FormControl>
                    <button className='create-campaign-button' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
}
