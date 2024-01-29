import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import "./AllTask.css";
import axios from "axios";
import {
    Backdrop, CircularProgress,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
// import {format} from "date-fns";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';


function AllTask() {
    const location = useLocation();
    const [createdCampaignData, setCreatedCampaignData] = useState([]);
    const [searchCampaignValue, setSearchCampaignValue] = useState('');
    const [campaignStatus, setCampaignStatus] = useState('');
    const [page, setPage] = React.useState(0);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();


    const getCampaignListData = () => {
        setLoader(true);
        axios.get('api/task/index', {
            params: {
                status: campaignStatus,
                query: searchCampaignValue
            }
        })
            .then(function (response) {
                setCreatedCampaignData(response.data.data);
                if (response.data.success === true) {
                    setLoader(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    useEffect(() => {
        if (searchCampaignValue.length > 0) {
            const timerId = setTimeout(() => {
                getCampaignListData();
            }, 1500);
            return () => clearTimeout(timerId);
        } else {
            getCampaignListData();
        }
    }, [searchCampaignValue, campaignStatus, page]);


    const handleCampaignListSearch = (event) => {
        setSearchCampaignValue(event.target.value);
    }


    const handleFilterCampaignStatus = (event) => {
        setCampaignStatus(event.target.value);
    }

    const handleStatusClear = () => {
        setCampaignStatus('');
    }

    const navigateCreateCampaign = () => {
        navigate('/task')
    }
    const navigateEditTask = (id, title, description, status) => {
        navigate(`/task?id=${id}&title=${title}&description=${description}&status=${status}`);
    }

    const handleDelete = (id) =>{
        if(id) {
            axios.get('api/task/delete', {
                params: {
                    id: id,
                }
            })
                .then(function (response) {
                    if (response.data.success === true) {
                        console.log('Successfully deleted the task');
                        window.location.reload();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        else{
            console.log('Id will be compulsary');
        }
    }

    return (
        <>
            <div className='campaign-list-filters'>
                <div className='campaign-list-text'>Task list</div>
                <div style={{display: 'flex', gap: '25px'}}>
                    <TextField
                        id="outlined-number"
                        value={searchCampaignValue}
                        placeholder='Search by title and description'
                        onChange={handleCampaignListSearch}
                        className="campaign-filter-textfield"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <FormControl style={{width: '230px'}}>
                        <InputLabel
                            id="demo-simple-select-label"
                            style={{
                                color: '#b0aaaa',
                                fontSize: '15px',
                                fontFamily: 'Inter',
                                fontWeight: 500,
                            }}
                        >Status</InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={campaignStatus}
                            label="status"
                            onChange={handleFilterCampaignStatus}
                            style={{
                                height: '50px',
                            }}
                            sx={{
                                "& .MuiSelect-iconOutlined": {
                                    display: campaignStatus ? 'none' : '',
                                },
                            }}
                            endAdornment={<IconButton
                                sx={{
                                    display: campaignStatus ? '' : 'none',
                                }}
                                onClick={handleStatusClear}>
                                <ClearIcon/></IconButton>}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            <MenuItem value={'Todo'}>Todo</MenuItem>
                            <MenuItem value={'Inprogress'}>Inprogress</MenuItem>
                            <MenuItem value={'Done'}>Done</MenuItem>
                        </Select>
                    </FormControl>
                    <button className='create-campaign-button' onClick={navigateCreateCampaign}>New Task</button>
                </div>
            </div>

            {
                    createdCampaignData?.length !== 0 ?
                        <>
                            <Paper sx={{
                                borderRadius: '12px',
                                border: '1px solid #D1D1D1',
                                overflow: 'hidden',
                            }} className='campaign-table'>
                                <TableContainer component={Paper}>
                                    <Table sx={{minWidth: 650}}>
                                        <TableHead>
                                            <TableRow style={{backgroundColor: '#F8FAFC', height: '50px'}}>
                                                <TableCell className='call-log-table-heading'>Title</TableCell>
                                                <TableCell className='call-log-table-heading'>Description</TableCell>
                                                <TableCell className='call-log-table-heading'>Status</TableCell>
                                                <TableCell className='call-log-table-heading'>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {createdCampaignData?.map((data, idx) => {
                                                return (
                                                    <React.Fragment key={idx}>
                                                        <TableRow hover key={data.id}
                                                                  className='campaign-table-row-height'>
                                                            <TableCell className='call-log-table-body'
                                                                       onClick={() => navigate("/voice-note/campaign/campaign-details", {state: data})}
                                                                       style={{cursor: 'pointer'}}>{data?.title}</TableCell>
                                                            <TableCell
                                                                className='call-log-table-body'>{data?.description}</TableCell>
                                                            <TableCell
                                                                className='call-log-table-body'>{data?.status}</TableCell>
                                                            <TableCell
                                                                className='call-log-table-body'>
                                                                <button className='create-campaign-button'
                                                                        onClick={() => navigateEditTask(data.id, data.title, data.description, data.status)}>Edit
                                                                </button>
                                                                <button className='create-campaign-button'
                                                                        onClick={() => handleDelete(data.id)}>Delete
                                                                </button>

                                                            </TableCell>
                                                        </TableRow>
                                                    </React.Fragment>)
                                            })}
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                            </Paper>
                        </>
                        :
                            <div className="campaign-text-heading">No Data Found</div>
            }
        </>
    );
}

export default AllTask;
