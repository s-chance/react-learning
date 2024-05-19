import { Link, useNavigate } from "react-router-dom"
const Login = () => {
    const navigate = useNavigate()
    return (
        <div>
            登录页
            {/* 声明式写法 */}
            <Link to='/article'>跳转到文章页</Link>
            {/* 编程式写法 */}
            <button onClick={() => navigate('/article')}>跳转到文章页</button>
            <button onClick={() => navigate('/article?id=1001&name=Tom')}>searchParams传参</button>
            <button onClick={() => navigate('/article/1001/Tom')}>Params传参</button>
        </div>
    )
}

export default Login