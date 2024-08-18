import React, { useState,useEffect } from 'react';
import Header from './Header';
import SupAllGuids from './SupAllGuids';
import axios from 'axios';
import { useBaseUrl } from './BaseUrlContext';



function AllGuids() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = useBaseUrl();

  const fetchData = async()=>{
    const token =localStorage.getItem("token");
    if(!token){
      alert("No token found");
      return;
    }
    try{
      const response =await axios.get(`${baseURL}/api/admin/getAllGuides`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
          setData(response.data);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
    useEffect(()=>{
      fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
      

  const dataShow= data.map((el,index)=> <SupAllGuids
      key={el.guide_id}
      img={`data:image/jpeg;base64,${el.image}`}
      guideName={`${el.first_name} ${el.last_name}`}
      guideId={el.guide_id}
      onActionCompleted={fetchData}

  />);
  return (
    <div className='dashboard'>
    <Header/>
      <div className="list-view">{dataShow}</div>
    </div>
 )
}

export default AllGuids ;

  



