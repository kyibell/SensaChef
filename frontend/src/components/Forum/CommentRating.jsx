// import React, { useState } from "react";

// function CommentRating({ isOpen, onClose, onSubmit, userRating }){
//     const [rating, setRating] = useState(userRating || 0); // existing rating or 0
//     const [submitting, setSubmitting] = useState(false);

//     if(!isOpen) return null;

//     return (
//         <div className="rating">
//             <div className="rate-scale">
//                 <label>Rate this comment</label>
//                 <div className="stars">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                         <span 
//                             key={star} 
//                             className={`star ${star <= rating ? 'filled' : ''}`}
//                             onClick={() => setRating(star)}
//                             style={{ cursor: "pointer", fontSize: "2em" }}
//                         >
//                             ⭐
//                         </span>
                        
//                     ))}
//                 </div>
//                 <span>({rating}/5)</span>
//             </div>

//             <div className="rate-buttons">
//                 <button onClick={onClose}>Cancel</button>
//                 <button onClick={() => {
//                     setSubmitting(true);
//                     onSubmit(rating);
//                     }}
//                 >
//                     {submitting ? 'Submitting...' : 'Submit Rating'}
//                 </button>
//             </div>
//         </div>

//     )

// }

// export default CommentRating
