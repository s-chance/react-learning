export type FormType = {
  title: string;
  content: string;
  cover: {
    type: number;
    images: string[];
  };
  channel_id: number;
};

export type ArticleUpdateType = {
  id: string;
  title: string;
  channel_id: number;
  content: string;
  cover: {
    type: number;
    images: string[];
  };
  pubdate: string;
};
