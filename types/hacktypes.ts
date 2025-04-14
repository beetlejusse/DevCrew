export interface Hackathon {
    _id: string
    title: string
    description: string
    startDate: string
    endDate: string
    createdAt: string
    coverPhoto: string
    url?: string
  }
  
  export interface HackathonData {
    title: string
    description?: string
    startDate?: string
    endDate?: string
    url?: string
    coverPhoto: string
  }