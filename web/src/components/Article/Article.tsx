import { Link, routes } from '@redwoodjs/router'
import CommentsCell from 'src/components/CommentsCell'
import CommentForm from 'src/components/CommentForm'
const truncate = (text, length) => {
  return text.substring(0, length) + '...'
}
const Article = ({ article, summary = false }) => {
  return (
    <article className="mx-10 my-8 bg-white rounded-xl shadow-md overflow-hidden px-3 py-5 ">
      <header>
        <h2 className="text-x1 text-blue-700 font-semibold ">
          <Link to={routes.article({ id: article.id })}>{article.title}</Link>
        </h2>
      </header>
      <div className="mt-2 text-gray-900 font-light">
        {summary ? truncate(article.body, 100) : article.body}
      </div>
      {!summary && (
        <div className="mt-12">
          <CommentForm postId={article.id} />
          <div className="mt-12">
            <CommentsCell postId={article.id} />
          </div>
        </div>
      )}
    </article>
  )
}

export default Article
