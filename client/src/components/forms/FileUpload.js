import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Avatar, Badge } from 'antd'



const FileUpload = ({ values, setValues, setLoading }) => {
    const {token} = useSelector((state) => (state.user ));

    const fileUploadAndResize = (e) => {
        //console.log(e.target.files);
        //resize files

        const files = e.target.files;
        let allUploadedFiles = values.images;
        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
                    //console.log(uri);
                    axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
                        headers: {
                            authtoken: token ? token : '',
                        }
                    })
                        .then(res => {
                            console.log('Image upload res data', res);
                            setLoading(false);
                            allUploadedFiles.push(res.data);
                            setValues({ ...values, images: allUploadedFiles });
                        })
                        .catch(err => {
                            setLoading(false);
                            console.log("Cloudinary upload error", err);
                        })
                }, "base64");
            }
        }
        //send back to server to upload on cloudinary
        //set uro to images[] in parent component - ProductCreate
    }

    const handleRemove = (id) => {
        setLoading(true);
        //console.log(id);
        axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id: id }, {
            headers: {
                authtoken: token ? token : ""
            }
        })
            .then((res) => {
                setLoading(false);
                const { images } = values;
                let filteredImages = images.filter((item) => {
                    return item.public_id !== id;
                });
                setValues({ ...values, images: filteredImages });
            })
            .catch((err) => {
                setLoading(false);
                console.log("Cloudinary remove error", err);
            })
    }
    return (
        <>
            <div className="d-flex flex-wrap">
                {values.images && values.images.map((img) => {
                    return (
                        <Badge count="X" key={img.public_id}
                            onClick={() => handleRemove(img.public_id)}
                            style={{ cursor: "pointer" }}>
                            <Avatar
                                key={img.public_id}
                                src={img.url}
                                size={100}
                                className='m-3' />
                        </Badge>
                    )
                })}
            </div>
            <div className='row'>
                <label className='btn btn-primary btn-raised' >
                    Select Images
                    <input
                        type="file"
                        multiple
                        accept='images/*'
                        onChange={fileUploadAndResize}
                        hidden />
                </label>
            </div>
        </>
    )
}

export default FileUpload