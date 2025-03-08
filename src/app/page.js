import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import styles from './page.module.css'
import Link from "next/link";

async function getAllPosts(page = 1) {
  const response = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=4`).catch((error) => {
    logger.error("Falha na requisição ao servidor." + error)
  })

  if(!response || !response.ok) {
    logger.error("Problema ao obter os posts")
    return []
  }

  return response.json()
} 
 

export default async function Home({ searchParams }) {
  const curretPage = searchParams?.page || 1
  const { data: posts, next, prev } = await getAllPosts(curretPage)
  return (
    <main className={styles.grid}>
      {
        posts.map(post => <CardPost key={post.id}  post={post} />)
      }
      <div className={styles.links}>
        { prev && <Link href={`/?page=${prev}`}>Anterior</Link> }
        { next && <Link href={`/?page=${next}`}>Próxima</Link> }
      </div>
    </main>
  );
}
