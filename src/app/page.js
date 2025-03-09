import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import styles from './page.module.css'
import Link from "next/link";
import db from "../../prisma/db";

async function getAllPosts(page = 1) {
  try{
    
    const posts = await db.post.findMany()
    
    return { data:posts, next: null, prev: null }

  } catch (error) {
    logger.error(error)
    return { data:[], next: null, prev: null }
  }
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
