import { useState } from "react";

const BookModal = ({ book, onSave, onClose, isEditMode }) => {
    const [title, setTitle] = useState(book?.title || '');
    const [author, setAuthor] = useState(book?.author || '');
    const [publisher, setPublisher] = useState(book?.publisher || '');

    const handleSubmit = () => {
      onSave({ ...book, title, author, publisher });
    };
  
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{isEditMode ? 'Edit' : 'Add'} Book</h3>
          <input type="text" placeholder="Title" className="input input-bordered w-full my-2" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder="Author" className="input input-bordered w-full my-2" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input type="text" placeholder="Publisher" className="input input-bordered w-full my-2" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
          <div className="modal-action">
            <button onClick={handleSubmit} className="btn btn-primary">Save</button>
            <button onClick={onClose} className="btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default BookModal;
  