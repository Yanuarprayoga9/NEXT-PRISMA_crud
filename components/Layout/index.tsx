import {ReactNode} from 'react'
import Head from 'next/head'
import Navbar from '../Layout/Navbar' 
interface LayoutProps {
    children:ReactNode,
    pageTitle:string
}
const Layout = (props:LayoutProps) => {
    const {children,pageTitle} = props;
  return (
    <div className='w-full'>
      <Head>
        <title>Next Basic : {pageTitle}</title>
        <meta name="description" content='basic next js'/>
      </Head>
        <div>{children}</div>
    </div>
  )
}


export default Layout