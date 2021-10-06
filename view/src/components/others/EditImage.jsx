import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import ImageIcon from '@mui/icons-material/Image'
import { useSelector, useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { updateImageAction } from '../../redux/async/Post'
import { RESET_UPDATE_IMAGE_ERRORS } from '../../redux/constants/Post'

export default function EditImage({ id }) {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const { updateImageErrors } = useSelector(state => state.UpdateImage)
    const { redirect } = useSelector(state => state.Post)
    const [input, setInput] = useState({
        image: '',
        imagePreview: '',
        imageName: 'Choose image',
    })
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const fileHandle = e => {
        if (e.target.files.length !== 0) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setInput({
                    ...input,
                    imagePreview: reader.result,
                    image: e.target.files[0],
                    imageName: e.target.files[0].name,
                })
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
    const updateImage = () => {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('image', input.image)
        dispatch(updateImageAction(formData))
    }
    useEffect(() => {
        if (updateImageErrors.length !== 0) {
            updateImageErrors.map((error) => toast.error(error.message))
            dispatch({ type: RESET_UPDATE_IMAGE_ERRORS })
        }
        // eslint-disable-next-line
    }, [updateImageErrors])
    useEffect(() => {
        if (redirect) {
            setOpen(false)
        }
    }, [redirect])

    return (
        <div>
            <Toaster
                position='top-right'
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    },
                }}
            />
            <Tooltip title="Update the post image">
            <Button onClick={handleClickOpen}>
                <ImageIcon color="primary" />
            </Button>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="fs-8"
            >
                <DialogTitle className="fs-8" id="alert-dialog-title">
                    {"Change the image"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className="fs-4" id="alert-dialog-description">
                        Choose an image (jpg, png, jpeg) and get preview.
                    </DialogContentText>
                    <div className="image__update">
                        <div className=''>
                            <label htmlFor='image' className='image__label'>
                                {input.imageName}
                            </label>
                            <input
                                type='file'
                                name='image'
                                id='image'
                                onChange={fileHandle}
                            />
                        </div>
                        <div className=''>
                            <div className='imagePreivew'>
                                {input.imagePreview ? <img src={input.imagePreview} alt="preview" /> : ''}
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button className="btn-primary fs-6" onClick={handleClose} autoFocus>Cancel</Button>
                    <Button className="btn-primary fs-6" onClick={updateImage} >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
