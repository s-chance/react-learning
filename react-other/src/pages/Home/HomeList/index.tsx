import { Image, List } from "antd-mobile";
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
    </div>
  );
};

export default HomeList;
