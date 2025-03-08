import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import styles from './page.module.css'

async function getAllPosts() {
  const response = await fetch('http://localhost:3042/posts').catch((error) => {
    logger.error("Falha na requisição ao servidor." + error)
  })

  if(!response || !response.ok) {
    logger.error("Problema ao obter os posts")
    return []
  }

  return response.json()
} 
 

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <main className={styles.grid}>

      {
        posts.map(post => <CardPost key={post.id}  post={post} />)
      }
    </main>
  );
}
