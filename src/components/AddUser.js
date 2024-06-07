import { Fragment, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Loading from './Loading.js';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AddUser = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState({
        suite: "",
        street: "",
        city: "",
        zipcode: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value
        });
    };

    const addUser = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            if (name === '' || email === '' || address === '') {
                toast.warn("All fields required..")
                return;
            }
            const request = { name, email, address };
            //API call for POST
            const response = await axios.post(`${API_BASE_URL}`, request);
            if (response.status === 201) {
                props.setUserDetails([...props.userDetails, response.data]);
                toast.success("User Added!!");
            } else {
                toast.error("Error while adding user!!");
            }
            setLoading(false);
            handleClose();
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while adding user");
        }
    }

    return (
        <Fragment>
            <button className='btn custom_btn' onClick={handleShow}><i className="fa-solid fa-user-plus"></i></button>
            <Modal show={show} onHide={handleClose} className="cursive">
                <Modal.Header closeButton>
                    <Modal.Title>Enter Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => addUser(e)}>
                        <div className="mb-3">
                            <label for="fullName" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="fullName" value={name} onChange={(ev) => setName(ev.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label for="mail" className="form-label">Email</label>
                            <input type="email" className="form-control" id="mail" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label for="suite" className="form-label">Suite</label>
                            <input type="text" className="form-control" id="suite" name="suite" value={address.suite} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label for="street" className="form-label">Street</label>
                            <input type="text" className="form-control" id="street" name="street" value={address.street} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label for="city" className="form-label">City</label>
                            <input type="text" className="form-control" id="city" name="city" value={address.city} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label for="zipcode" className="form-label">Zip Code</label>
                            <input type="text" className="form-control" id="zipcode" name="zipcode" value={address.zipcode} onChange={handleChange} />
                        </div>
                        {
                            loading ?
                                <div className="d-flex justify-content-center mb-3">
                                    <Loading />
                                </div>
                            : ''
                        }
                        <div className="d-grid mb-3">
                            <button type="submit" className="btn btn-warning">Add User</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}
export default AddUser;