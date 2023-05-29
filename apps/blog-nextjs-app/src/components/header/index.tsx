'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import './index.scss';
import Image from 'next/image';
import { Fragment, useState } from "react";

export default function Header () {
  const menuList = [
    { name: 'home', title: '首页', href: '/'},
    { name: 'article', title: '文章',
      children: [
        { name: 'category', title: '分类', href: '/category'},
        { name: 'tag', title: '标签', href: '/tag'},
      ] 
    },
    { name: 'collection', title: '收藏夹', href: '/collection' },
    { name: 'life', title: '生活', href: '/life' },
  ]

  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState('')
  
  return (
    <header className="header">
      <div className="header-title">
        <Image
          src="/images/logo.png"
          width={20}
          height={20}
          alt="爬爬の小破站"
        />
        <h1 className="header-title__text">爬爬の小破站</h1>
      </div>
      <ul className="header-menu flex relative">
        {
          menuList.map(item => (
            <Fragment key={item.name}>
              {
                !item.children ?
                (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={['header-menu__item', 'items-center', pathname=== item.href && 'header-menu__item--active'].join(' ')}
                  >{ item.title }</Link>
                ) :
                (
                  <div
                    key={item.name}
                    className="header-menu__item items-center"
                    onMouseEnter={e => { setActiveMenu(item.name) }}
                    onMouseLeave={e => { setActiveMenu('') }}
                  >
                    <span>{ item.title }</span>
                    {
                      activeMenu === item.name &&
                      (
                        <div className="header-menu__dropdown">
                          {
                            item.children.map(child => (
                              <Link
                                href={child.href}
                                key={child.name}
                                className={['header-menu__dropdown__item', pathname=== item.href && 'header-menu__dropdown__item--active'].join(' ')}
                              >{ child.title }</Link>
                            ))
                          }
                        </div>
                      )
                    }
                  </div>
                )
              }
            </Fragment>
          ))
        }
      </ul>
    </header>
  )
}