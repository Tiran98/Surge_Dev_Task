import React, { useEffect, useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const NoteList = () => {
    let userId = parseInt(localStorage.getItem('userId'));
    const navigate = useNavigate();
    const [allNotes, setAllNotes] = useState([]);
    const [notes, setNotes] = useState({
        id: "",
        userId: userId,
        title: "",
        description: ""
    });
    const [ModalNotes, setModalNotes] = useState({
        _id:"",
        id: "",
        userId: "",
        title: "",
        description: ""
    });
    // const [UpdateNotes, setUpdateNotes] = useState({
    //     id: "",
    //     userId: "",
    //     title: "",
    //     description: ""
    // });
    const createhandleChange = (e) => {
        setNotes((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };
    const updatehandleChange = (e) => {
        setModalNotes((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };
    const createNote = () => {
        if (notes.title === "") {
            Swal.fire("Oops...", "Title is Empty !", "error");
        } else if (notes.description === "") {
            Swal.fire("Oops...", "Description is Empty !", "error");
        } else {
            axios
                .post('http://localhost:5000/api/note/newNote', {
                    id: notes.id,
                    userId: notes.userId,
                    title: notes.title,
                    description: notes.description
                })
                .then((response) => {
                    if (response !== null) {
                        Swal.fire({
                            title: "Success",
                            text: "Note Create Successful !",
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonText: "Continue",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        })
                    }
                })
        }
    }
    const updateNote = () => {
        let id = ModalNotes._id;
        axios
        .put('http://localhost:5000/api/note/updateNote/' + id, {
            id:ModalNotes.id,
            userId: ModalNotes.userId,
            title: ModalNotes.title,
            description: ModalNotes.description
        })
        .then((response) => {
            if (response !== null) {
                Swal.fire({
                    title: "Success",
                    text: "Update Successful !",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "Continue",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })
            }
        })
    }
    const getAllNotes = () => {
        let userId = parseInt(localStorage.getItem('userId'));
        axios
            .get('http://localhost:5000/api/note/allNotes/' + userId)
            .then((response) => {
                setAllNotes(response.data)
            })
    }
    const getNoteDetails = (note) => {
        setModalNotes(note)
    }
    useEffect(() => {
        getAllNotes();
    }, []);
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    <h3 className="display-4" style={{ marginTop: 50 }}>Notes List</h3>
                </div>
                <div className='col-6'>
                    <button
                        style={{ marginTop: 70 }}
                        type="button"
                        className="btn btn-primary btn-block text-uppercase mb-6 rounded-pill shadow-sm"
                        data-toggle="modal" data-target="#myNoteCreateModal"
                        onClick={""}
                    >
                        Create Note
                    </button>
                </div>
            </div>
            <div className='row mt-5'>
                {allNotes.map((note, index) =>
                    <div className='card mb-3' style={{ width: 1000 }}>
                        <div className='card-body'>
                            <h5 className='card-title'>{note.title}</h5>
                            <p className='card-text'>{note.description}</p>
                            <button type='button' className='btn btn-primary' onClick={() => getNoteDetails(note)} data-toggle='modal' data-target='#editModal'>
                                Edit
                            </button>
                            <button type='button' className='btn btn-danger mx-2'>Remove</button>
                        </div>
                    </div>
                )}

            </div>

            {/* 
 Model Box  */}

            <div className="modal fade" id="myNoteCreateModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Create Note</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="form-group mb-3">
                                    <input
                                        id="inputnoteId"
                                        onChange={createhandleChange}
                                        value={notes.id}
                                        name="id"
                                        type="text"
                                        placeholder="Note Id"
                                        required={true}
                                        autoFocus={true}
                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        id="inputnoteTitle"
                                        onChange={createhandleChange}
                                        value={notes.title}
                                        name="title"
                                        type="text"
                                        placeholder="Note Title"
                                        required={true}
                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        id="inputNoteDesc"
                                        onChange={createhandleChange}
                                        value={notes.description}
                                        name="description"
                                        type="text"
                                        placeholder="Note Description"
                                        required={true}
                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                    onClick={() => createNote()}
                                >
                                    Create Note
                                </button>
                            </form>
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

            {/* 
 Model Box  */}

            <div className="modal fade" id="editModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Note</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="form-group mb-3">
                                    <input
                                        id="inputnoteId"
                                        onChange={updatehandleChange}
                                        value={ModalNotes.id}
                                        name="id"
                                        type="text"
                                        placeholder={ModalNotes.id}
                                        required={true}
                                        autoFocus={true}
                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        id="inputnoteTitle"
                                        onChange={updatehandleChange}
                                        value={ModalNotes.title}
                                        name="title"
                                        type="text"
                                        placeholder={ModalNotes.title}
                                        required={true}
                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        id="inputNoteDesc"
                                        onChange={updatehandleChange}
                                        value={ModalNotes.description}
                                        name="description"
                                        type="text"
                                        placeholder={ModalNotes.description}
                                        required={true}
                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                    onClick={() => updateNote()}
                                >
                                    Update Note
                                </button>
                            </form>
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteList