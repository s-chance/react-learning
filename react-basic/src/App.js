import { useEffect, useRef, useState } from 'react'
import './index.css'
import _ from 'lodash'
import classNames from 'classnames'
import { v4 as uuidV4 } from 'uuid'
import dayjs from 'dayjs'
import axios from 'axios'

// 评论列表数据
const list = [
  {
    rpid: 3,
    user: {
      uid: '12121244',
      avatar: 'https://example.com/',
      uname: '小明',
    },
    content: '这是评论内容',
    ctime: '2020-01-01 12:11:00',
    like: 10,
  },
  {
    rpid: 4,
    user: {
      uid: '12121245',
      avatar: 'https://example.com/',
      uname: '小红',
    },
    content: '这是评论内容',
    ctime: '2020-01-01 12:14:00',
    like: 2,
  },
  {
    rpid: 5,
    user: {
      uid: '12121246',
      avatar: 'https://example.com/',
      uname: '小刚',
    },
    content: '这是评论内容',
    ctime: '2020-01-01 12:22:00',
    like: 7,
  },
]


// 当前登录用户信息
const user = {
  uid: '12121244',
  avatar: 'https://example.com/',
  uname: '小明',
}
// 导航栏数据
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' }
]

function useGetList() {
  // 获取接口数据渲染
  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    // 请求数据
    async function getList() {
      // axios请求数据
      const res = await axios.get('http://localhost:3004/list')
      setCommentList(res.data)
    }
    getList()
  }, [])

  return {
    commentList,
    setCommentList
  }
}

// 封装Item组件
function Item({ item, onDel }) {
  return (
    <div className='reply-item'>
      {/* 头像 */}
      <div className='root-reply-avatar'>
        <div className='bili-avatar'>
          <img className='bili-avatar-img' alt='' src={item.user.avatar} />
        </div>
      </div>

      <div className='content-warp'>
        {/* 用户名 */}
        <div className='user-info'>
          <div className='user-name'>{item.user.uname}</div>
        </div>
        {/* 评论内容 */}
        <div className='root-reply'>
          <span className='reply-content'>{item.content}</span>
          <div className='reply-info'>
            {/* 评论时间 */}
            <span className='reply-time'>{item.ctime}</span>
            {/* 评论数量 */}
            <span className='trply-time'>点赞数:{item.like}</span>
            {/* 条件：user.uid === item.user.uid */}
            {user.uid === item.user.uid &&
              <span className='delete-btn' onClick={() => onDel(item.rpid)}>删除</span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  // 渲染评论列表
  // 1. 使用useState维护list
  // const [commentList, setCommentList] = useState(_.orderBy(list, 'like', 'desc'))
  const { commentList, setCommentList } = useGetList()

  // 删除功能
  const handleDel = (id) => {
    // 使用filter方法过滤掉要删除的评论
    setCommentList(commentList.filter(item => item.rpid !== id))
  }

  const [type, setType] = useState('hot')
  // tab切换功能
  const handleTabChange = (type) => {
    console.log(type);
    setType(type)
    // 基于列表的排序
    if (type === 'hot') {
      // 根据点赞数排序
      // setCommentList(_.orderBy(commentList, 'like', 'desc'))
      setCommentList([...commentList].sort((a, b) => a.like > b.like ? -1 : 1))
    } else {
      // 根据时间排序
      // setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
      setCommentList([...commentList].sort((a, b) => a.ctime > b.ctime ? -1 : 1))
    }
  }

  // 发表评论
  const [content, setContent] = useState('')
  const inputRef = useRef(null)

  const handlePublish = () => {
    setCommentList([
      ...commentList,
      {
        rpid: uuidV4(), // 随机id
        user: user,
        content: content,
        ctime: dayjs().format('MM-DD HH:mm'), // 格式化 月-日 时:分
        like: 7,
      },
    ])

    // 清空评论框
    setContent('')
    // 重新聚焦
    inputRef.current.focus()
  }

  return (
    <div className='app'>
      <div className='reply-navigation'>
        <ul className='nav-bar'>
          <li className='nav-title'>
            <span className='nav-title-text'>评论</span>
            {/* 评论数量 */}
            <span className='total-reply'>{1}</span>
          </li>
          <li className='nav-sort'>
            {/* 高亮类名：active */}
            {tabs.map(item =>
              <span
                key={item.type}
                className={classNames('nav-item', { active: type === item.type })}
                onClick={() => handleTabChange(item.type)}>
                {item.text}
              </span>
            )}
          </li>
        </ul>
      </div>

      <div className='reply-warp'>
        <div className='box-normal'>
          {/* 当前用户头像 */}
          <div className='reply-box-avatar'>
            <div className='bili-avatar'>
              <img className='bili-avatar-img' src={user.avatar} alt='用户头像' />
            </div>
          </div>
          <div className='reply-box-warp'>
            {/* 评论框 */}
            <textarea
              className='reply-box-textarea'
              placeholder='发表一条友善的评论'
              ref={inputRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {/* 发布按钮 */}
            <div className='reply-box-send'>
              <div className='send-text' onClick={handlePublish}>发布</div>
            </div>
          </div>
        </div>

        {/* 评论列表 */}
        <div className='reply-list'>
          {/* 评论项 */}
          {/* 2. 使用map方法对list数据进行遍历渲染 */}
          {commentList.map(item => <Item key={item.rpid} item={item} onDel={handleDel} />)}
        </div>

      </div>
    </div>
  );
}

export default App;