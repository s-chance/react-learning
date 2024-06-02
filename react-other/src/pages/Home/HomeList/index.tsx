import { Image, InfiniteScroll, List } from "antd-mobile";
import { useEffect, useState } from "react";
import { fetchListAPI, type ListRes } from "@/apis/list";

type Props = {
  channelId: string;
};

const HomeList = (props: Props) => {
  const { channelId } = props;

  const [listRes, setListRes] = useState<ListRes>({
    results: [],
    pre_timestamp: new Date().getTime().toString(),
  });

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await fetchListAPI({
          channel_id: channelId,
          timestamp: new Date().getTime().toString(),
        });
        setListRes({ ...res.data.data });
      } catch (error) {
        throw new Error("fetchListAPI error");
      }
    };
    getList();
  }, [channelId]);

  // 标记当前是否还有新数据
  const [hasMore, setHasMore] = useState(true);
  // 上拉加载触发条件：
  // 1.hasMore为true
  // 2.threshold触发
  const loadMore = async () => {
    console.log("上拉加载");
    try {
      const res = await fetchListAPI({
        channel_id: channelId,
        timestamp: listRes.pre_timestamp,
      });
      // 拼接新旧数据，存取下一次请求时间戳
      setListRes({
        results: [...listRes.results, ...res.data.data.results],
        pre_timestamp: res.data.data.pre_timestamp,
      });
      // 停止监听
      if (res.data.data.results.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      throw new Error("fetchListAPI error");
    }
  };

  return (
    <div>
      <List>
        {listRes.results.map((item) => (
          <List.Item
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
          >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10} />
    </div>
  );
};

export default HomeList;
