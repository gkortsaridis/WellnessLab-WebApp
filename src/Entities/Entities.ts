export interface Subject {id: string, title: string, imgUrl: string, article: Article, tips: string[], suggestions: SubjectSuggestion, modifiedDate: number, createdDate: number }
export interface Article {title: string, imgUrl: string, articleUrl: string }
export interface SocialMedia { name: string, url: string }
export interface TeamMember { name: string, image: string, title: string, social: SocialMedia[], bio: string}
export interface SuggestionType { name: string, img: string, id: string }
export interface SuggestionParent {suggestionType: SuggestionType, suggestionsText: string[]}
export interface SubjectSuggestion { mainText: string, suggestions: SuggestionParent[]}
