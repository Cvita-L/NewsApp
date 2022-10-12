import './Article.scss';

const Article = ({ title, author, imageUrl, articleUrl, onClick }) => {
    function openArticle() {
        onClick(articleUrl);
    }

    return (
        <div 
            className='article-div' 
            style={{ backgroundImage: `url(${imageUrl})` }}
            onClick={openArticle}
        >
            <div className='article-title-div'>
                <p className='article-title-text'>{title}</p> 
                <p className='article-author-text'>{author}</p>
            </div>
        </div>
)}

export default Article;