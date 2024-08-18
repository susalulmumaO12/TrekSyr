import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useBaseUrl } from './BaseUrlContext';


export default function SupRequest(props) {
  const {  guideName, guideId, onActionCompleted } = props;
  const baseURL = useBaseUrl();

  const handleAccept =async () =>{
    const token =localStorage.getItem("token");
    if(!token){
      alert("No token found");
      return;
    }

    try{
      const response =await axios.post(`${baseURL}/api/admin/acceptGuide`,{
        user_id: guideId},{
          headers:{
            Authorization:` Bearer ${token}`,
          },
        }
      );
      if(response.status === 200){
        toast.success("Guide validated successfully!");
        onActionCompleted();
      }
    }catch(error){
      console.error('Error accepting guide:', error);
      console.error('Error response:', error.response);

       if(error.response.status === 400){
        toast.error("User is not a guide")
       }
        else if(error.response.status === 401){
          toast.error("unauthorized")
        }
        else if(error.response.error === 404){
          toast.error("User Not Found")
        }
        else{
          toast.error("An unexpected error occurred")

        }
    }
  };
  const handleReject =async ()=>{
    const token = localStorage.getItem("token");
    if(!token){
      alert("No token found");
      return;
    }
    try{
      const response =  await axios.post(`${baseURL}//api/admin/rejectGuide`,{
        user_id:guideId},{
         headers :{
          Authorization:`Bearer ${token}`,
         },
        }
      );
      if(response.status === 200){
        toast.success("Guide rejected successfully!");
        onActionCompleted();
      }
    }catch(error){
      if(error.response.status === 400){
       toast.error("User is not a guide")
      }
       else if(error.response.status === 401){
         toast.error("unauthorized")
       }
       else if(error.response.error === 404){
         toast.error("User Not Found")
       }
       else if(error.response.error === 500){
        toast.error("Failed to update user validation status")
      }
       else{
         toast.error("An unexpected error occurred")

       }
  }
};
  return (
    <div className="item">
      <div className="details">
        <div className="text1">
          <h2>{guideName}</h2>
        </div>
        <div className="actions">
          <button  onClick={handleAccept}  className="not-accepted">
            Accept
          </button>
          <button onClick={handleReject} className="delete">
            Reject
          </button>  
          <Link to={`/see-details/${guideId}`}>See Details</Link>
        </div>
      </div>
    </div>
  );
}


  