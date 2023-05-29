'use client';

import { useEffect, useState } from 'react';
import './index.scss'

export default async function My() {

  const [myDetail, setMyDetail] = useState({
    info: {
      name: '小爬',
    },
    wikiNum: 10,
    tagNum: 5,
    typeNum: 2,
  })

  const [helloWord, setHelloWord] = useState('')
  useEffect(() => {
    const map = [
      { min: 5, max: 11, text: '上午' },
      { min: 11, max: 13, text: '中午' },
      { min: 14, max: 17, text: '下午' },
      { min: 18, max: 24, text: '晚上' },
    ]
    const hours = new Date().getHours()
    const defaultText = '欢迎来到爬爬的小破站'
    let world = ''
    for (let i = 0; i < map.length; i++) {
      const item = map[i]
      if (hours >= item.min && hours <= item.max) {
        world = `${item.text}好，${defaultText}`
      }
    }
    setHelloWord(world || `${defaultText}。夜深人静啦，不要再卷咯~早点睡觉健健康康！`)
  })
  
  return (
    <>
      <div className="my-container blog-card">
        <img className="my-photo" src="/images/myphone.jpeg" />
        <div className="my-name">{ myDetail.info.name }</div>
        <div className="my-hello">{ helloWord }</div>
        <div className="my-info">
          <div className="my-info__item">
            <span>文章</span><span>{ myDetail.wikiNum }</span>
          </div>
          <div className="my-info__item">
            <span>分类</span><span>{ myDetail.typeNum }</span>
          </div>
          <div className="my-info__item">
            <span>标签</span><span>{ myDetail.tagNum }</span>
          </div>
        </div>
      </div>
    </>
  )
}

