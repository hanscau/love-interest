export default interface User {
    UserID: number;
    FirstName: string;
    LastName: string;
    DateCreated: Date;
    ProfilePicture: string;
    Bio: string;
}

export const mockUsers: User = {
    UserID: 1,
    FirstName: "John",
    LastName: "Doe",
    DateCreated: new Date(),
    ProfilePicture: "https://picsum.photos/200/300",
    Bio: "I am a software developer."
}