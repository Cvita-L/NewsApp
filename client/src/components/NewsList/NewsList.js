import './NewsList.scss';
import Article from "../Article/Article";

const NewsList = ({ articles, onClick }) => {
    const articlesList = articles.map(article => 
        <Article
            key={article.url}
            title={article.title}
            author={article.author} 
            imageUrl={article.urlToImage}
            articleUrl={article.url}
            onClick={onClick}
        />
    );

    return <div className='list-div'>
        <h2 className='news-h2'>News</h2>
        <ul>{articlesList}</ul>
    </div>
}

export default NewsList;