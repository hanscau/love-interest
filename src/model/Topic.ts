export default interface Topic {
  topicID: number;
  topic: string;
  topicImageURL: string;
  topicPosts: number;
  created_at: string;
}
export const mockTopics: Topic[] = [
  {
    topicID: 1,
    topic: "Technology",
    topicImageURL: "https://example.com/technology.jpg",
    topicPosts: 10,
    created_at: new Date().toISOString(),
  },
  {
    topicID: 2,
    topic: "Sports",
    topicImageURL: "https://example.com/sports.jpg",
    topicPosts: 5,
    created_at: new Date().toISOString(),
  },
  {
    topicID: 3,
    topic: "Movies",
    topicImageURL: "https://example.com/movies.jpg",
    topicPosts: 8,
    created_at: new Date().toISOString(),
  },
  {
    topicID: 4,
    topic: "Food",
    topicImageURL: "https://example.com/food.jpg",
    topicPosts: 3,
    created_at: new Date().toISOString(),
  },
  {
    topicID: 5,
    topic: "Travel",
    topicImageURL: "https://example.com/travel.jpg",
    topicPosts: 12,
    created_at: new Date().toISOString(),
  },
  {
    topicID: 6,
    topic: "Books",
    topicImageURL: "https://example.com/books.jpg",
    topicPosts: 7,
    created_at: new Date().toISOString(),
  },
  {
    topicID: 7,
    topic: "Music",
    topicImageURL: "https://example.com/music.jpg",
    topicPosts: 9,
    created_at: new Date().toISOString(),
  },
  {
    topicID: 8,
    topic: "Fashion",
    topicImageURL: "https://example.com/fashion.jpg",
    topicPosts: 4,
    created_at: new Date().toISOString(),
  },
];
