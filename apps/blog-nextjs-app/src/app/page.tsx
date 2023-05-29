import My from '@/components/my/index'
import ArticleListComponent from '@/components/article/articleList'
import { getArticleList } from '@/apis/articles'

export default async function Home() {

  const { data } = await getArticleList({
    pageIndex: 0,
    pageSize: 10
  })
  const listData:Article[] = data.rows
  const total = data.total

  return (
    <div className="main-content flex">
      <section className="content-section blog-card">
        <ArticleListComponent listData={listData} total={total} />
      </section>
      <article className="content-article">
        <My />
      </article>
    </div>
  )
}
