export default interface Topic {
  id: number;
  topic: string;
  topicImageURL: string;
  topicPosts: number;
  created_at: string;
}
export const mockTopics: Topic[] = [
  {
    id: 1,
    topic: "Technology",
    topicImageURL: "https://example.com/technology.jpg",
    topicPosts: 10,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    topic: "Sports",
    topicImageURL: "https://example.com/sports.jpg",
    topicPosts: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    topic: "Movies",
    topicImageURL: "https://example.com/movies.jpg",
    topicPosts: 8,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    topic: "Food",
    topicImageURL: "https://example.com/food.jpg",
    topicPosts: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    topic: "Travel",
    topicImageURL: "https://example.com/travel.jpg",
    topicPosts: 12,
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    topic: "Books",
    topicImageURL: "https://example.com/books.jpg",
    topicPosts: 7,
    created_at: new Date().toISOString(),
  },
  {
    id: 7,
    topic: "Music",
    topicImageURL: "https://example.com/music.jpg",
    topicPosts: 9,
    created_at: new Date().toISOString(),
  },
  {
    id: 8,
    topic: "Fashion",
    topicImageURL: "https://example.com/fashion.jpg",
    topicPosts: 4,
    created_at: new Date().toISOString(),
  },
];
