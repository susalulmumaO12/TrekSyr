import { Link } from "react-router-dom";

export default function Finish (props){
  return(
   <div className="item">
    <img src={props.img} alt=""/>
    <div className="details">
      <div className='text'>
      <h3>{props.city}</h3>
      <h2>{props.name}</h2>
      <p>{props.date}</p>
      </div>
      <div className="actions">
        <button className="rating">View Rating</button>
        <button className="repost">Repost</button>
        <Link to="/see-details">See Details</Link>
      </div>
      
    </div>
  </div>
   
  );
}