import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, Badge, Tooltip } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const FileUpload = ({ values, setValues, setLoading }) => {
    const { token } = useSelector((state) => state.user);

    const fileUploadAndResize = (e) => {
        const files = e.target.files;
        let allUploadedFiles = values.images;

        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        axios
                            .post(
                                `${process.env.REACT_APP_API}/uploadimages`,
                                { image: uri },
                                {
                                    headers: {
                                        authtoken: token ? token : '',
                                    },
                                }
                            )
                            .then((res) => {
                                allUploadedFiles.push(res.data);
                                setValues({ ...values, images: allUploadedFiles });
                                setLoading(false);
                            })
                            .catch((err) => {
                                console.log('Cloudinary upload error', err);
                                setLoading(false);
                            });
                    },
                    'base64'
                );
            }
        }
    };

    const handleRemove = (id) => {
        setLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_API}/removeimage`,
                { public_id: id },
                {
                    headers: {
                        authtoken: token ? token : '',
                    },
                }
            )
            .then(() => {
                const filteredImages = values.images.filter((img) => img.public_id !== id);
                setValues({ ...values, images: filteredImages });
                setLoading(false);
            })
            .catch((err) => {
                console.log('Cloudinary remove error', err);
                setLoading(false);
            });
    };

    return (
        <>
            {/* Image preview */}
            <div className="d-flex flex-wrap mb-3 gap-3">
                {values.images &&
                    values.images.map((img) => (
                        <div
                            key={img.public_id}
                            className="position-relative"
                            style={{ width: '100px', height: '100px' }}
                        >
                            <Tooltip title="Remove image">
                                <CloseCircleOutlined
                                    onClick={() => handleRemove(img.public_id)}
                                    style={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        fontSize: '20px',
                                        color: '#f5222d',
                                        cursor: 'pointer',
                                        zIndex: 10,
                                    }}
                                />
                            </Tooltip>
                            <Avatar
                                src={img.url}
                                size={100}
                                shape="square"
                                style={{
                                    objectFit: 'cover',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                }}
                            />
                        </div>
                    ))}
            </div>

            {/* Upload button */}
            <div className="mt-2">
                <label
                    className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold shadow-sm"
                    style={{ cursor: 'pointer' }}
                >
                    📁 Select Images
                    <input
                        type="file"
                        multiple
                        accept="images/*"
                        hidden
                        onChange={fileUploadAndResize}
                    />
                </label>
            </div>
        </>
    );
};

export default FileUpload;
