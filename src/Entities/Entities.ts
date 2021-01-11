export interface Subject {id: string, title: string, imgUrl: String, article: Article, tips: string[], suggestions: string, modifiedDate: number, createdDate: number }
export interface Article {title: string, imgUrl: string, articleUrl: string }
export interface SocialMedia { name: string, url: string }
export interface TeamMember { name: string, image: string, title: string, social: SocialMedia[], bio: string}
