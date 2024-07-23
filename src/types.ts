export interface IProduct {
  id: number,
  title: string,
  images?: Array<string>,
  thumbnail?: string,
  price: number,
  quantity?: number,
  tags?: Array<string>,
  discountPercentage?: number,
  discountedTotal?: number,
  description?: string,
  stock?: number,
  warrantyInformation?: string,
  shippingInformation?: string,
  total?: number,
};

export interface IUser {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  token: string,
  refreshToken: string,
};
