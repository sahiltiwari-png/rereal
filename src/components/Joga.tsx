import { useRef } from "react";

const Joga=()=>{
  const nameRef=useRef();
  const handleSubmit=()=>{
    console.log(nameRef.current.value);
  }
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
    <input type="text" ref={nameRef} placeholder="Enter your name" />
    <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
export default Joga;