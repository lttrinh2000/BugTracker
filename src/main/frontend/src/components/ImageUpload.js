import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import {useDropzone} from 'react-dropzone'

const UserProfiles = () => {

  const [userProfiles, setUserProfiles] = useState([]);

  const fetchUserProfiles = () => {
      axios.get("http://localhost:8080/api/v1/user-profile").then ( 
        res => {
          console.log(res);
          setUserProfiles(res.data);
        }
      );
  };

  useEffect ( () => {
      fetchUserProfiles();
  }, []);

  return userProfiles.map((user, index) => {
      return (
        <div key={index}>
          {user.id ? <img src={`http://localhost:8080/api/v1/user-profile/${user.id}/image/download`}/> : null}
          <br/>
          <br/>
          <h1> {user.userName} </h1>
          <p> {user.id} </p>
          <Dropzone id={user.id}/>
          <br/>
        </div>
      );
  });
};

function Dropzone( {id} ) {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    console.log(file);
    const formData = new FormData();
    formData.append("image_file", file);
    axios.post(`http://localhost:8080/api/v1/user-profile/${id}/image/upload`,
      formData,
      {
        Headers: {
          "Content-type": "multipart/form-data"
        }
      }
    ).then( () => {
      console.log("image uploaded successfully.");
      window.location.reload(false);
    }).catch( err => {
      console.log(err);
    }); 
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the image here ...</p> :
          <p>Drag 'n' drop profile image, or click to select image</p>
      }
    </div>
  )
}

export default UserProfiles;