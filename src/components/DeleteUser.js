import { Fragment, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DeleteUser = (props)=> {

    const [id, setId] = useState(props.data.id);

    const deleteUser = async ()=> {
        const response =await axios.delete(`${API_BASE_URL}/${id}`);
        if(response.status == 200){
            const updatedUserlist = [...props.userDetails];
            updatedUserlist.splice(props.index, 1);
            props.updateUserDetails(updatedUserlist);
            toast.success("User deleted!!");
        }else {
            toast.error("Error while adding user!!");
            console.log(response)
        }
    }
    
    return(
        <Fragment>
            <button className='btn'><i className="fa-solid fa-user-minus" onClick={deleteUser}></i></button>
        </Fragment>
    )
}
export default DeleteUser;