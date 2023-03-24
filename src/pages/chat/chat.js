import { Input, Spin } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { http } from '../../utils'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import './chat.scss'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
)
const { Search } = Input

function Chat () {

  const [searchValue, setSearchValue] = useState('')

  function onChangeValue (value) {
    setSearchValue(value.target.value)
  }
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const [msgList, setMsgList] = useState([
    // {
    //   id: 1,
    //   type: 1,
    //   content: searchParams.get('question'),
    //   isReturn: true,
    //   me: true
    // }, {
    //   id: new Date().getTime(),
    //   type: 2,
    //   content: '你说的都对',
    //   isReturn: true,
    //   me: false
    // }
  ])

  useEffect(() => {
    async function fetchData () {
      const value = searchParams.get('question')
      const obj = {
        id: new Date().getTime(),
        type: 2,
        isReturn: true,
        content: value,
        me: true
      }
      const robotId = new Date().getTime() + 1
      const robotObj = {
        id: robotId,
        type: 2,
        content: '',
        me: false
      }

      setMsgList([...msgList, obj, robotObj])

      const res = await http.post('/chat/submit', { context: value })
      setMsgList({
        msgList: msgList.filter(item => item.id !== robotId)
      })

      setMsgList([...msgList, obj, {
        id: robotId,
        type: 2,
        content: res.data.content,
        isReturn: true,
        me: false
      }])
    }
    fetchData()
  }, [])

  async function onSearch (value) {
    const obj = {
      id: new Date().getTime(),
      type: 2,
      isReturn: true,
      content: value,
      me: true
    }
    const robotId = new Date().getTime() + 1
    const robotObj = {
      id: robotId,
      type: 2,
      content: '',
      me: false
    }
    setMsgList([...msgList, obj, robotObj])

    setSearchValue('')

    const res = await http.post('/chat/submit', { context: value })

    setMsgList({
      msgList: msgList.filter(item => item.id !== robotId)
    })

    setMsgList([...msgList, obj, {
      id: robotId,
      type: 2,
      content: res.data.content,
      isReturn: true,
      me: false
    }])
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [msgList])

  return (
    <div className="chat-container">
      <div className="chat-list">
        <ul>
          {msgList.map(item => (
            <div key={item.id} style={{ 'textAlign': item.me ? 'right' : 'left' }}>
              <img src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg"></img>
              <div style={{ 'padding': '50px' }}>
                {/* <ReactMarkdown className="code">{item.content}</ReactMarkdown> */}
                {!item.isReturn ? <Spin indicator={antIcon} /> : <ReactMarkdown className="code">{item.content}</ReactMarkdown>}
              </div>
            </div>
          ))}
        </ul>
        <div ref={messagesEndRef} />
      </div>
      <div className='searchText'>
        {/* 聊天框 */}
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          value={searchValue}
          onChange={(value) => onChangeValue(value)}
          onSearch={(value) => onSearch(value)}
        />
      </div>
    </div>
  )
}


export default Chat