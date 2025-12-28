import React from 'react';

const ReviewForm = () => {
    return (
        <form className="p-4 border rounded">
            <h3>Write a Review</h3>
            <textarea className="w-full border p-2" />
            <button className="bg-blue-500 text-white p-2 rounded mt-2">Submit</button>
        </form>
    );
};

export default ReviewForm;
