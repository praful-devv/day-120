
import { useEffect } from 'react';
import useChat from '../hooks/useChat'

const Home = () => {

 const { initializedSocketConnection } = useChat();

 useEffect(()=>{
  initializedSocketConnection()
 })
 
  return (
    <div>Home</div>
  )
}

export default Home