import html from 'remark-html';
import { remark } from 'remark';
import logger from "@/logger"

import { CardPost } from "@/components/CardPost";

import styles from './page.module.css'

async function getPost(slug) {
  const response = await fetch(`http://localhost:3042/posts?slug=${slug}`).catch((error) => {
    logger.error("Falha na requisição ao servidor." + error)
  })

  if(!response || !response.ok) {
    logger.error("Problema ao obter os posts")
    return {}
  }

  const data = await response.json()

  if(data.length === 0) {
    return {}
  }

  const post = data[0]

  const processedContent = await remark()
  .use(html)
  .process(post.markdown);
  
  const contentHtml = processedContent.toString();
  
  post.markdown = contentHtml
  
  return post
}

export default async function SlugPage({ params }) {
    const { slug } = params
    const post = await getPost(slug)
    return (
        <div>
            <CardPost post={post} highlight />
            <h3 className={styles.subtitle}>Código:</h3>
            <div className={styles.code}>
                <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
            </div>
        </div>
    //   <Post {...post} />
    );
}