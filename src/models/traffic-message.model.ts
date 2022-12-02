export interface ITrafficMessage {
  id: string;
  priority: number;
  priorityString: string;
  createdDate: Date;
  title: string;
  exactLocation: any;
  description: string;
  latitude: number;
  longitude: number;
  category: number;
  subCategory: number;
  fetchedAt: Date;
}
