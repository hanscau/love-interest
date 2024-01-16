export default interface Comments {
    PostID: number;
    CommentID: number;
    UserID: number;
    Comment: string;
    DateCreated: Date;
    LikeCount: number;
    Replies: Comments[];
}

export const mockComments: Comments[] = [    {
        PostID: 1,
        CommentID: 1,
        UserID: 1,
        Comment: "Great post!",
        DateCreated: new Date(),
        LikeCount: 1,
        Replies: [    {
            PostID: 2,
            CommentID: 3,
            UserID: 3,
            Comment: "Thanks for sharing!",
            DateCreated: new Date(),
            LikeCount: 2,
            Replies: []
        },
        {
            PostID: 2,
            CommentID: 4,
            UserID: 4,
            Comment: "Could you provide more details?",
            DateCreated: new Date(),
            LikeCount: 0,
            Replies: []
        },
        {
            PostID: 3,
            CommentID: 5,
            UserID: 5,
            Comment: "Interesting perspective.",
            DateCreated: new Date(),
            LikeCount: 7,
            Replies: []
        }]
    },
    {
        PostID: 1,
        CommentID: 2,
        UserID: 2,
        Comment: "I disagree with your point. But I think that everyone should agree to disagree. What is living without talking about each other's opinion and not being able to say what you would want to say. Does this look like a freeded country to you?",
        DateCreated: new Date(),
        LikeCount: 5,
        Replies: []
    },
    {
        PostID: 2,
        CommentID: 3,
        UserID: 3,
        Comment: "Thanks for sharing!",
        DateCreated: new Date(),
        LikeCount: 2,
        Replies: []
    },
    {
        PostID: 2,
        CommentID: 4,
        UserID: 4,
        Comment: "Could you provide more details?",
        DateCreated: new Date(),
        LikeCount: 0,
        Replies: []
    },
    {
        PostID: 3,
        CommentID: 5,
        UserID: 5,
        Comment: "Interesting perspective.",
        DateCreated: new Date(),
        LikeCount: 7,
        Replies: []
    }
];
