export interface ITrafficMessageDto {
  id: string;
  priority: number;
  createddate: Date;
  title: string;
  exactlocation: any;
  description: string;
  latitude: number;
  longitude: number;
  category: number;
  subcategory: number;
}
