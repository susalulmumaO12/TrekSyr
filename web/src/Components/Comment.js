import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from "@fortawesome/free-solid-svg-icons";
import { useBaseUrl } from './BaseUrlContext';

const Comment = () => {
    const { place_id } = useParams(); 
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseURL = useBaseUrl();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const token = localStorage.getItem('token'); 
                if (!token) {
                    setError('Unauthorized: No token found.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${baseURL}/api/user/placeComments/${place_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setComments(response.data);
                setLoading(false);
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 401) 
                        setError('Unauthorized: Invalid token.');
                    else if (err.response.status === 404)
                        setError('Not Found: No such place.');
                    else if(err.response.status === 500) 
                        setError('Internal Server Error: Technical issue, contact backend.');
                } else {
                    setError('Network Error: Please check your connection.');
                }
                setLoading(false);
            }
        };

        fetchComments();
    }, [place_id]);

    if (loading) {
        return <div className="loader">Loading comments...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (comments.length === 0) {
        return <div className="no-comments">No comments available for this place.</div>;
    }

    return (
      <div className='dashboard'>
        <div className="comments-container">
            <h2>Place Comments</h2>
            {comments.map((comment, index) => {
                const rating = comment.rate; 
                const ratingNumber = isNaN(parseFloat(rating)) ? 0 : Math.min(5, Math.max(0, parseFloat(rating)));
                
                const fullStars = Math.floor(ratingNumber);
                const halfStar = ratingNumber % 1 >= 0.5;
                const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

                return (
                    <div key={index} className="comment-card">
                        <div className="user-info">
                            <img
                                src={`data:image/jpeg;base64,${comment.image}`}
                                alt={`${comment.name}'s profile`}
                                className="user-image"
                            />
                            <div>
                                <h3 className="user-name">{comment.name}</h3>
                                <div className="rating">
                                    {[...Array(fullStars)].map((_, i) => (
                                        <FontAwesomeIcon key={i} icon={faStar} className="icon1" />
                                    ))}
                                    {halfStar && <FontAwesomeIcon key="half-star" icon={faStarHalfAlt} className="icon1" />}
                                    {[...Array(emptyStars)].map((_, i) => (
                                        <FontAwesomeIcon key={i + fullStars + 1} icon={faStarEmpty} className="icon-empty" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="comment-text">{comment.comment}</p>
                        <p className="comment-time">{comment.time}</p>
                    </div>
                );
            })}
        </div>
        </div>
    );
};

export default Comment;
