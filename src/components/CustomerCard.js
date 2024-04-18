import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUserPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import call from '../asects/call.png';
import mail from '../asects/mail.png';
import web from '../asects/web.png';

const CustomerCard = ({ customer, onFollow, onDelete }) => {
  const { id, name, phone, email, website } = customer;
  const [initials, setInitials] = useState('');
  const [isFollowing, setIsFollowing] = useState(customer.following);

  useEffect(() => {
    const fetchInitials = async () => {
      try {
        const response = await axios.get(`https://api.dicebear.com/7.x/initials/svg?seed=${name}`);
        setInitials(response.data);
      } catch (error) {
        console.error('Error fetching initials:', error);
      }
    };

    fetchInitials();
  }, [name]);

  const handleFollow = async () => {
    setIsFollowing(!isFollowing);
    onFollow(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="card">
      <div className="logo" dangerouslySetInnerHTML={{ __html: initials }} />
      <div className="info">
        <div className='user'>
          <h6>{name}</h6>
          {isFollowing && <span className="star-icon">☆</span>}
        </div>
        <div className='user-info'>
        <p className='icon'>
         <img src={mail} alt='..'/> {email}
          </p>
        <p className='icon'>
          <img src={call} alt='..'/> {phone}
          </p>
          <p className='icon'>
          <img src={web} alt='..'/> {website}
          </p>
        </div>
        
        <div className="buttons">
        
        <button  className="btn btn-primary" onClick={handleFollow}>
          {isFollowing ? <FontAwesomeIcon icon={faUserPlus} /> : <FontAwesomeIcon icon={faUserPlus} />} {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
        
        <button  className="btns btn-outlin-primary" onClick={handleDelete}>

          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
      </div>
      
    </div>
  );
};

export default CustomerCard;
