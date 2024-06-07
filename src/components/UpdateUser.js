import { Fragment, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from './Loading.js';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UpdateUser = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);

    const [id, setId] = useState(props.data.id);
    const [name, setName] = useState(props.data.name);
    const [email, setEmail] = useState(props.data.email);
    const [address, setAddress] = useState({
        suite: props.data.address.suite,
        street: props.data.address.street,
        city: props.data.address.city,
        zipcode: props.data.address.zipcode
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value
        });
    };

    const updateUser = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            if (name === '' || email === '' || address === '') {
                toast.warn("All fields required..")
                return;
            }
            const request = { name, email, address };
            const response = await axios.put(`${API_BASE_URL}/${id}`, request);
            if (response.status === 200) {
                const updatedUserlist = [...props.userDetails];
                updatedUserlist[props.index] = {...updatedUserlist[props.index], name: response.data.name, email: response.data.email, address:response.data.address};
                props.updateUserDetails(updatedUserlist);
                toast.success("User updated!!");
                handleClose();
            } else {
                throw new Error('Unexpected response from server');
            }
            setLoading(false);
            handleClose();
        } catch (error) {
            if (error) {
                console.log(error)
                toast.error(error.response.data.error);
            } else if (error.request) {
                console.log(error)
                toast.error(error.response.data.error);
            } else {
                console.log(error)
                toast.error(error.response.data.error);
            }
        }
    }

    return (
        <Fragment>
            <button className='btn' onClick={handleShow}><i className="fa-solid fa-user-pen"></i></button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => updateUser(e)}>
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
                            <button type="submit" className="btn btn-warning">Update User</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}
export default UpdateUser;