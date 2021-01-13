import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

let client = require("contentful").createClient({
  accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN,
  space: process.env.NEXT_CONTENTFUL_SPACE_ID,
});

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: 'article'
  })

  return {
    props: {
      articles: data.items,
    }
  }
}

export default function Home({ articles }) {
  // console.log(articles);
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.Js + Contentful Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>NEXT JS + Contentful Template</h1>
        <ul>
          {articles.map((article) => (
            <li key={article.sys.id}>
              <Link href={"/articles/" + article.fields.slug}>
                <a>{article.fields.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
