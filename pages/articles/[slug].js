import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

let client = require("contentful").createClient({
  accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN,
  space: process.env.NEXT_CONTENTFUL_SPACE_ID,
});

export async function getStaticPaths() {
  let data = await client.getEntries({
    content_type: 'article',
  });

  return {
    paths: data.items.map(item => ({
      params: { slug: item.fields.slug },
    })),
    // damn you fallback
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let data = await client.getEntries({
    content_type: 'article',
    'fields.slug': params.slug,
  })

  return {
    props: {
      article: data.items[0],
    },
  };
}

export default function Article({ article }) {
  console.log(article)
  return (
    <div>
      <h1>{article.fields.title}</h1>
      <div>{documentToReactComponents(article.fields.content)}</div>
    </div>
  )
}