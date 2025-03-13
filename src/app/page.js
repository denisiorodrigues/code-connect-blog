import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import styles from './page.module.css'
import Link from "next/link";
import db from "../../prisma/db";

async function getAllPosts(page = 1) {
  try{
    
    const perPage = 4
    const skip = (page - 1) * perPage
    const totalItems = await db.post.count()
    const totalPages = Math.ceil(totalItems / perPage)
    const next = page < totalPages ? page + 1 : null
    const prev = page > 1 ? page - 1 : null

    const posts = await db.post.findMany({
      take: perPage,
      skip,
      orderBy: {
        createdAt: 'desc'
      },  
      include: {
        author: true
      }
    })
    
    return { data:posts, next, prev }

  } catch (error) {
    logger.error(error)
    return { data:[], next: null, prev: null }
  }
} 
 

export default async function Home({ searchParams }) {
  const curretPage = parseInt(searchParams?.page || 1)
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
