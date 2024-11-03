import { ShowroomForm } from "../Showroom/ShowroomType.type";

export type Car = {
    vin: string;
    maker: string;
    model: string;
    modelYear: string;
    price: number;
}
export type CarCreation = {
    vin: string;
    maker: string;
    model: string;
    modelYear: string;
    price: number;
    showroomCrn: string;
}
export type CarTable = {
    uuid: string;
    vin: string;
    maker: string;
    model: string;
    modelYear: string;
    price: number;
    showroomName: string;
    showroomPhoneNumber: string;
}