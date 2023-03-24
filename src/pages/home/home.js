import './home.scss'
import { Input } from 'antd'
import { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const { TextArea } = Input

function Home () {

  const [value, setValue] = useState('')

  const navigate = useNavigate()

  function submitQuestion () {
    console.log(value)
    //跳转到提问页面并将参数携带过去
    navigate('/chat?question=' + value)
  }

  function changeValue (e) {
    setValue(
      e.target.value)
  }

  return (
    <>
      <div className='searchText11'>
        <span>ChatGPT</span>
        <TextArea
          value={value}
          onChange={(e) => changeValue(e)}
          placeholder="请输入你的问题"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </div>
      <div className='submitBtn'>
        <Button type="primary" icon={<SearchOutlined />} onClick={submitQuestion}>
          Search
        </Button>
      </div>
    </>
  )
}
export default Home