import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Popconfirm,
  Radio,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import { Link, useNavigate } from "react-router-dom";
import img404 from "@/assets/404.jpg";
import { useChannel } from "@/hooks";
import { useEffect, useState } from "react";
import { delArticleApi, getArticleListApi } from "@/apis/article";
import { ArticleQueryParams, ArticleType } from "./types";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const Article = () => {
  const navigate = useNavigate();

  const { channelList } = useChannel();

  const status: { [key: number]: React.ReactNode } = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>,
  };

  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      render: (cover: { images: string[] }) => {
        return (
          <img src={cover.images[0] || img404} width={60} height={60} alt="" />
        );
      },
    },
    { title: "标题", dataIndex: "title" },
    {
      title: "状态",
      dataIndex: "status",
      // data === 1 待审核
      // data === 2 审核通过
      render: (data: number) => status[data],
    },
    { title: "发布时间", dataIndex: "pubdate" },
    { title: "阅读数", dataIndex: "read_count" },
    { title: "评论数", dataIndex: "comment_count" },
    { title: "点赞数", dataIndex: "like_count" },
    {
      title: "操作",
      render: (data: ArticleType) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title="删除文章"
              description="确认删除当前文章？"
              onConfirm={() => onConfirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // const data = [
  //   {
  //     id: "8218",
  //     comment_count: 0,
  //     cover: {
  //       images: [],
  //     },
  //     like_count: 0,
  //     pubdate: "2021-10-20 10:00:00",
  //     read_count: 12,
  //     status: 2,
  //     title: "测试文章",
  //   },
  // ];

  const [queryParams, setQueryParams] = useState<ArticleQueryParams>({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 10,
  });

  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getList = async () => {
      const res = await getArticleListApi(queryParams);
      setList(res.data.results);
      setCount(res.data.total_count);
    };
    getList();
  }, [queryParams]);

  type ParamsType = {
    status?: string;
    channel_id?: string;
    date?: [dayjs.Dayjs?, dayjs.Dayjs?];
  };

  const onFinish = (newParams: ParamsType) => {
    setQueryParams({
      ...queryParams,
      status: newParams.status,
      channel_id: newParams.channel_id,
      begin_pubdate: newParams.date?.[0]?.format("YYYY-MM-DD"),
      end_pubdate: newParams.date?.[1]?.format("YYYY-MM-DD"),
    });
  };

  const onPageChange = (page: number) => {
    setQueryParams({
      ...queryParams,
      page,
    });
  };

  const onConfirm = async (data: ArticleType) => {
    await delArticleApi(data.id);
    setQueryParams({
      ...queryParams,
    });
  };

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[{ title: <Link to="/">首页</Link> }, { title: "文章列表" }]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={0}>未发布</Radio>
              <Radio value={1}>已发布</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择频道" style={{ width: 120 }}>
              {channelList.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${count} 条结果: `}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: queryParams.per_page,
            onChange: onPageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
