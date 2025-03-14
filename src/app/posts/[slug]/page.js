import html from 'remark-html';
import { remark } from 'remark';
import logger from "@/logger"

import { CardPost } from "@/components/CardPost";

import styles from './page.module.css'
import db from '../../../../prisma/db';
import { redirect } from 'next/navigation';

async function getPost(slug) {

  try {
    const post = await db.post.findUnique({
      where: {
        slug
      },
      include: {
        author: true
      }
    })
    
    if(!post){
      throw new Error(`Post com o slug ${slug} não foi encontrado`)
    }

    const processedContent = await remark()
    .use(html)
    .process(post.markdown);
    
    const contentHtml = processedContent.toString();
    
    post.markdown = contentHtml
    
    return post
  } catch (error) {
    logger.error('Falha ao obter o post com o slug: ', { slug, error })
  }

  redirect('/not-found')
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
    );
}