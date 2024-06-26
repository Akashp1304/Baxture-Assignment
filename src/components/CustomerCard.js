import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerCard.css';


const CustomerCard = ({ customer, onFollow, onDelete }) => {
  const { id, name, phone, email, website } = customer;
  const [initials, setInitials] = useState('');
  const [isFollowing, setIsFollowing] = useState(customer.following);
  const userPlus = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
  const userMinus = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-minus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4c.348 0 .686 .045 1.009 .128" /><path d="M16 19h6" /></svg>
  const deleteButton = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
  const atIcon = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-at" width="1rem" height="1rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" /></svg>
  const phoneIcon = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-call" width="1rem" height="1rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 7a2 2 0 0 1 2 2" /><path d="M15 3a6 6 0 0 1 6 6" /></svg>
  const worldIcon = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-world" width="1rem" height="1rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>
  const starIcon = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="1rem" height="1rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>


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
    
    <div className=' card-item  mantine-Grid-col __m__-R1mrrla'>
      <div className='card-items'>
        <div className='card-items1'>
          <div className="card " >
            
             

                <div className="logo"  dangerouslySetInnerHTML={{ __html: initials }} />
                <p className="card-title">{name}  {isFollowing ? starIcon : ''}</p>
              
              <div className='text-1'><a href='/' className="card-text text-dark">{atIcon}   {email}</a><br /></div>
              <div className='text-1'> <a href='/' className="card-text text-dark">{phoneIcon}   {phone}</a><br /></div>
              <div className='text-1'><a href='/' className="card-text text-dark">{worldIcon}   {website}</a><br /></div>

              <div className="btns">
              
              <button onClick={handleFollow} style={{ width: '136px', height:'30px' }} className={"btn "+(isFollowing ?"  btn-light border border-primary ms-1": "btn-primary")}>{isFollowing ? userMinus : userPlus}  {isFollowing ? 'Unfollow' : 'Follow'}</button>

              
              <button className="btnn "  onClick={handleDelete} style={{ width: '136px', height:'30px' ,border:'blue'}}>
                <span className='btnns'>
                <span className='btnn-1'>{deleteButton}</span>
                <span className='btnn-2'>Delete</span>
                </span>
              </button>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
