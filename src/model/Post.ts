export default interface Post {
  PostID: number;
  UserID: number;
  TopicID: number;
  Title: string;
  Tags: string;
  Content: string;
  ImageURL: string;
  LikeCount: number;
  created_at: string;
}

export const mockPosts: Post[] = [
  {
    PostID: 1,
    UserID: 1,
    TopicID: 1,
    Title: "First Post",
    Tags: "#tag1#tag2",
    Content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ImageURL: "https://example.com/image1.jpg",
    LikeCount: 5,
    created_at: new Date().toISOString(),
  },
  {
    PostID: 2,
    UserID: 2,
    TopicID: 1,
    Title: "Second Post",
    Tags: "#tag1#tag2",
    Content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ImageURL: "https://example.com/image2.jpg",
    LikeCount: 10,
    created_at: new Date().toISOString(),
  },
  {
    PostID: 3,
    UserID: 3,
    TopicID: 2,
    Title: "Third Post",
    Tags: "#tag1#tag2",
    Content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ImageURL: "https://example.com/image3.jpg",
    LikeCount: 2,
    created_at: new Date().toISOString(),
  },
  {
    PostID: 4,
    UserID: 4,
    TopicID: 2,
    Title: "Fourth Post",
    Tags: "#tag1#tag2",
    Content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ImageURL: "https://example.com/image4.jpg",
    LikeCount: 8,
    created_at: new Date().toISOString(),
  },
  {
    PostID: 5,
    UserID: 5,
    TopicID: 3,
    Title: "Fifth Post",
    Tags: "#tag1#tag2",
    Content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ImageURL: "https://example.com/image5.jpg",
    LikeCount: 3,
    created_at: new Date().toISOString(),
  },
];
