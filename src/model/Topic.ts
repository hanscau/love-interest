export default interface Topic {
    TopicID: number;
    Name: string;
    Description: string;
    ImageURL: string;
    PostCount: number;
    DateCreated: Date;
}
export const mockTopics: Topic[] = [
    {
        TopicID: 1,
        Name: "Technology",
        Description: "Discuss the latest trends in technology",
        ImageURL: "https://example.com/technology.jpg",
        PostCount: 10,
        DateCreated: new Date()
    },
    {
        TopicID: 2,
        Name: "Sports",
        Description: "Talk about your favorite sports",
        ImageURL: "https://example.com/sports.jpg",
        PostCount: 5,
        DateCreated: new Date()
    },
    {
        TopicID: 3,
        Name: "Movies",
        Description: "Share your thoughts on movies",
        ImageURL: "https://example.com/movies.jpg",
        PostCount: 8,
        DateCreated: new Date()
    },
    {
        TopicID: 4,
        Name: "Food",
        Description: "Discuss your favorite recipes and restaurants",
        ImageURL: "https://example.com/food.jpg",
        PostCount: 3,
        DateCreated: new Date()
    },
    {
        TopicID: 5,
        Name: "Travel",
        Description: "Share your travel experiences",
        ImageURL: "https://example.com/travel.jpg",
        PostCount: 12,
        DateCreated: new Date()
    },
    {
        TopicID: 6,
        Name: "Books",
        Description: "Discuss your favorite books and authors",
        ImageURL: "https://example.com/books.jpg",
        PostCount: 7,
        DateCreated: new Date()
    },
    {
        TopicID: 7,
        Name: "Music",
        Description: "Share your favorite songs and artists",
        ImageURL: "https://example.com/music.jpg",
        PostCount: 9,
        DateCreated: new Date()
    },
    {
        TopicID: 8,
        Name: "Fashion",
        Description: "Talk about the latest fashion trends",
        ImageURL: "https://example.com/fashion.jpg",
        PostCount: 4,
        DateCreated: new Date()
    }
];
