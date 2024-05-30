export type ArticleType = {
  id: string;
  title: string;
  status: string;
  read_count: number;
  comment_count: number;
  like_count: number;
  pubdate: string;
  cover: {
    images: string[];
    type: number;
  };
};

export type ArticleQueryParams = {
  status?: string;
  channel_id?: string;
  begin_pubdate?: string;
  end_pubdate?: string;
  page?: number;
  per_page?: number;
};
