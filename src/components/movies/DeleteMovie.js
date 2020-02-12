import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { API_URL } from "../../config"

const DeleteMovie = (props) => {
    const [modal, setModal] = useState(false)

    const handleDelete = (event) => {
        event.preventDefault()

        fetch(`${API_URL}movies/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        }).then(response => response.json())
        .then((data) => {
            if(data) {
                console.log(data)
                window.location.reload()
            } else {
                console.log(data.error)
            }
        })
    }

    const toggle = () => setModal(!modal);

    return (
        <div>
            <span onClick={toggle} style={{cursor: 'pointer', float: 'right', fontSize: '35px', margin: '5px', color: 'white'}}><i className="fa fa-trash"></i></span>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalBody>
                    Are you sure you want to delete<br></br>
                    movie {props.title} ?
                </ModalBody>
                <ModalFooter>
                    <Button onClick={toggle}>
                        No
                    </Button>
                    <Button onClick={handleDelete}>
                        Yes, delete it
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default DeleteMovie