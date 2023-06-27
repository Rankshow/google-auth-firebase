import React, { useState, useEffect } from "react"
import Logo from "./image/google_icon.png";
import { auth, googleProvider } from "./config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { storage } from "./config/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function App() {
  // initialize state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state that store image
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "imageFolder/");
// function that upload images
  const handleUploadImage = () => {
    if(imageUpload == null) return;

    const imageRef = ref(storage, `imageFolder${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      })
    });
  };

  // useEffect hooks 
  useEffect(() =>{
    listAll(imageListRef).then((response) =>{
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url])
        })
      })
    })
  }, [])
  
  // console.log(auth?.currentUser?.email)
// handleSignIn function
const handleSignIn = async () => {
  try{
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err)
  }
};


// handleGoogleSinIn
const handleGoogleSignIn = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err)
  }
};

// Logout
const logOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
}

  return (
    <>
      <div className="max-w-sm mx-auto mt-7 shadow-md shadow-emerald-800 rounded-md overflow-hidden md:max-w-md">
         <div className="h-[500px] md:bg-blue-800 flex items-center md:flex flex-col">

          {
            imageList.map((url) => {
              return (
                <div className='mx-auto w-20 mt-2'>
                  <img className='rounded-full' src={url} />
                </div>
              )
            })
          }

          {/* input file field */}
          <div className="mt-4">
             <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} />
          </div>

          {/* upload button */}
          <div>
            <button onClick={handleUploadImage} className="md:bg-white hover:opacity-80 md:text-black bg-blue-800 mt-4 py-1 px-2 rounded-md font-semibold text-white">Upload image</button>
          </div>

          {/* input fields for email and password */}
            <div className="mb-5 mt-4">
              <input onChange={(e) => setEmail(e.target.value)} className="bg-black py-2 w-60 pl-2 text-white shadow-md rounded-md" type="text" placeholder="Email..."/>
            </div>
            <div>
              <input onChange={(e) => setPassword(e.target.value)} className="bg-black py-2 w-60 pl-2 text-white shadow-md rounded-md" type="password" placeholder="password..."/>
              </div>

              {/*Sign In buttons */}
              <div>
                <button onClick={handleSignIn} className="bg-blue-800 md:bg-white md:text-black mt-4 py-1 px-2 rounded-md font-semibold w-60  text-white hover:opacity-80">Signin</button>
              </div>

              {/*Continue google buttons */}
              <div>
                <button onClick={handleGoogleSignIn} className="md:bg-white bg-orange-700 text-white flex items-center justify-evenly mt-4 w-60 px-2 rounded-md font-semibold md:text-black hover:opacity-80"><img className="w-10" src={Logo} alt="logo" /> Continue with google</button>
              </div>

               {/*Logout buttons */}
              <div>
                <button onClick={logOut} className="bg-red-800 mt-4 py-1 px-2 rounded-md font-semibold w-60  text-white hover:opacity-80">Logout</button>
              </div>
         </div>
      </div>    
    </>
  )
}

export default App
