export type FormType = {
  title: string;
  content: string;
  cover: {
    type: number;
    images: string[];
  };
  channel_id: number;
};
