import { useEffect } from "react"
import { usePost } from "../../context/PostContext"
import { Link } from "react-router-dom"
import DOMPurify from 'dompurify'; // Extecion para sanitizar el html
import dayjs from 'dayjs';// Extensión para formatear la fecha
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('es');

import './posts.css'


export function Posts() {

  const { loading, error, posts, getPosts } = usePost()

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <section className="posts">
      {posts.length > 0 ? (

        posts.map(post => (
          <article className="post" key={'$post' + post._id}>
            <Link className="link" to={`/detailPost/${post._id}`} >
              <div className="img">
                <img src={`${post.img}`} alt="" />
              </div>
              <div className="content">
                <div>
                  <h1>{post.title}</h1>
                  <p className="date">Publicado {dayjs(post.creationAt).fromNow()}</p>
                </div>
                <div className="descip-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.descrip) }}></div>
              </div>
            </Link>
          </article>
        ))

      ) : (
        <h1>No hay ningun posts</h1>
      )
      }
    </section>
  )
}
