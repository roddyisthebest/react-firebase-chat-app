import React, { useRef } from "react";
import { AiFillWechat } from "react-icons/ai";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/compat";
import mime from "mime-types";
import { setPhotoURL } from "../../../redux/actions/user_action";
function UserPanel() {
  const user = useSelector((state) => state.user.currentUser);
  //   useSelector((state) => console.log(state));
  const dispatch = useDispatch();

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const inputOpenImageRef = useRef();
  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const metadata = { contentType: mime.lookup(file.name) };

    try {
        // way to use hosted image by google  
      let uploadTaskSnapShot = await firebase
        .storage()
        .ref()
        .child(`user_image/${user.uid}`)
        .put(file, metadata);
      let downloadURL = await uploadTaskSnapShot.ref.getDownloadURL();

        //currentUser updateProfile
      await firebase.auth().currentUser.updateProfile({
        photoURL: downloadURL,
      });

      // set redux-state changed photoURL
      dispatch(setPhotoURL(downloadURL));

      // update some user's photoURL at database 
      await firebase
        .database()
        .ref("users")
        .child(user.uid)
        .update({ image: downloadURL });

      console.log(uploadTaskSnapShot);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <h3 style={{ fontSize: 30, fontWeight: 700 }}>
        <AiFillWechat /> Chat App
      </h3>
      <div
        style={{ display: "flex", margin: "1.5rem 0", alignItems: "center" }}
      >
        <Image
          src={user && user.photoURL}
          roundedCircle
          style={{ width: "30px", height: "30px", marginRight: "10px" }}
        />
        <input
          type="file"
          accpet="image/jpeg ,image/png"
          ref={inputOpenImageRef}
          style={{ display: "none" }}
          onChange={handleUploadImage}
        />
        <Dropdown>
          <Dropdown.Toggle style={{ backgroundColor: "#ff3d84" }}>
            {user && user.displayName}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item disabled>Action (disabled)</Dropdown.Item>
            <Dropdown.Item onClick={handleOpenImageRef}>
              Profile edit
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default UserPanel;
