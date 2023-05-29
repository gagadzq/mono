'use client';
import { formatDate, markdownSummary } from '@/utils/utils'
import { useState } from 'react'
import Pagination from '@mui/material/Pagination';
import { getArticleList } from '@/apis/articles'
import './index.scss';

interface IProps {
  listData: Article[],
  total: number
}

export default function ArticleItem ({ listData, total }: IProps) {
  const [data, setData] = useState(listData)
  const [pagesInfo] = useState({
    currentPage: 1,
    pageSize: 10
  })
  const [info] = useState({
    viewCount: 10,
    msgCount: 1,
    likeCount: 2,
    publishTime: +new Date()
  })

  const handelPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    getArticleList({
      pageSize: pagesInfo.pageSize,
      pageIndex: pagesInfo.currentPage - 1
    }).then(data => {
      // setData(data.rows)
    })
  }

  const handleOpenDetail = (detail: Article) => {

  }

  const renderSummary = (content: string) => {
    return markdownSummary(content)
  }
  
  
  return (
    <>
      {
        data.map(item => (
          <article key={item.id} className="article-item">
            <h3 className="article-item__title" onClick={() => handleOpenDetail(item)}>{ item.title }</h3>
            <div className="article-item__content">{ renderSummary(item.content) }</div>
            <div className="article-item__tools">
              <div>
                <div className="tools-item">
                  <i className="iconfont icon-view"></i>
                  <span>{item.viewsCount}</span>
                </div>
                <div className="tools-item">
                  <i className="iconfont icon-message"></i>
                  <span>{info.msgCount}</span>
                </div>
                <div className="tools-item">
                  <i className="iconfont icon-dianzan"></i>
                  <span>{info.likeCount}</span>
                </div>
              </div>
              <div className="tools-item">
                <i className="iconfont icon-time"></i>
                <span>发布于 {formatDate(new Date(item.createdTime), 'yyyy-MM-dd')}</span>
              </div>
            </div>
          </article>
        ))
      }

      <Pagination
        count={total}
        page={pagesInfo.currentPage}
        onChange={handelPageChange}
      />
    </>
  )
}