import { http } from "@/utils";
import type { ResType } from "./shared";

/**
 * detaildate
 */
export type DetailData = {
  /**
   * 文章id
   */
  art_id: string;
  /**
   * 文章-是否被点赞，-1(无态度)0(未点赞)1(点赞)
   */
  attitude: number;
  /**
   * 文章作者id
   */
  aut_id: string;
  /**
   * 文章作者名
   */
  aut_name: string;
  /**
   * 文章作者头像，无头像，默认为null
   */
  aut_photo: string;
  /**
   * 文章-评论总数
   */
  comm_count: number;
  /**
   * 文章内容
   */
  content: string;
  /**
   * 文章-是否被收藏，true(收藏)false(未收藏)
   */
  is_collected: boolean;
  /**
   * 文章作者-是否被关注，true(关注)false(未关注)
   */
  is_followed: boolean;
  /**
   * 文章-点赞总数
   */
  like_count: number;
  /**
   * 文章发布时间
   */
  pubdate: string;
  /**
   * 文章-阅读总数
   */
  read_count: number;
  /**
   * 文章标题
   */
  title: string;
};

export function fetchDetailAPI(id: string) {
  return http.request<ResType<DetailData>>({
    url: `/articles/${id}`,
  });
}
