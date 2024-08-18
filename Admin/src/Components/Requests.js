import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import SupRequest from './SupRequest';
import { toast } from 'react-toastify';
import { useBaseUrl } from './BaseUrlContext';


function Requests() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = useBaseUrl();

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/api/admin/guideRequests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        if(err.response.status === 404){
          toast.error("There are no guide requests")
        }
        setLoading(false);
      }
    };
useEffect(()=>{
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const dataShow = data.map((el) => (
    <SupRequest
      key={el.guide_id}
      guideName={`${el.first_name} ${el.last_name}`}
      guideId={el.guide_id}
      onActionCompleted={fetchData}

        />
  ));

  return (
    <div className='dashboard'>
      <Header />
      <div className="list-view1">{dataShow}</div>
    </div>
  );
}

export default Requests;
