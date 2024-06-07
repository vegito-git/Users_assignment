import './App.css';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import DeleteUser from './components/DeleteUser';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {

    const [userDetails, setUserDetails] = useState([]);

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}`);
            const details = response.data;
            if (details == null) {
                toast.info("There are no such user!!");
            } else {
                setUserDetails(details);
            }
        } catch (error) {
            console.error("Error fetching tweets:", error);
            toast.error(error.response.data.error);
        }
    };

    const updateUserDetails = (data)=> {
        setUserDetails([...data]);
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <Fragment>
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-12'>
                        <h3 className='text-center cursive'>User List</h3>
                    </div>
                    <div className='col-12 mt-3'>
                        <table className="table table-hover border cursive">
                            <thead>
                                <tr className='table-warning rounded-top'>
                                    <th scope="col">ID No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Address</th>
                                    <th scope="col" className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userDetails.map((data, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{data.id}</th>
                                                <td>{data.name}</td>
                                                <td>{data.email}</td>
                                                <td>{data.address.suite}, {data.address.street}, {data.address.city}, {data.address.zipcode}</td>
                                                <td>
                                                    <UpdateUser data={data} userDetails={userDetails} index={index} updateUserDetails={updateUserDetails}/>
                                                    <DeleteUser data={data} userDetails={userDetails} index={index} updateUserDetails={updateUserDetails}/>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='col-12 d-grid'>
                        <AddUser userDetails={userDetails} setUserDetails={setUserDetails}/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default App;