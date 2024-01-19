export default interface User {
  userID: number;
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  gender: Gender;
  phoneNo: string;
  userPosts: number;
  profileImageURL: string;
  jwt?: string;
  created_at: string;
}

export enum Gender {
  MALE = 0,
  FEMALE = 1,
}

export const mockUsers: User = {
  userID: 1,
  firstName: "John",
  lastName: "Doe",
  username: "JohnDoe",
  gender: Gender.MALE,
  phoneNo: "1234567890",
  userPosts: 0,
  created_at: new Date().toISOString(),
  profileImageURL: "https://picsum.photos/200/300",
  bio: "I am a software developer.",
};
