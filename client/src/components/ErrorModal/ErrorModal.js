import './ErrorModal.scss';

const ErrorModal = ({ title, message, onConfirm }) => {
    return <div>
        <div className='backdrop' onClick={onConfirm} />
        <div className='modal'>
            <header className='error-header'>
                <h2 className='error-h2'>{title}</h2>
            </header>
            <div className='error-div'>
                <p className='error-p'>{message}</p>
                <button 
                    className='close-button' 
                    onClick={onConfirm}
                >
                    Close
                </button>
            </div>          
        </div>
    </div>
};

export default ErrorModal;