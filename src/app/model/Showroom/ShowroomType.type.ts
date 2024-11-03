import { Car } from "../Cars/Car.type";

export type ShowroomHomePage = {
    uuid: string;
    name: string;
    commercialRegistrationNumber: string;
    phoneNumber: string;

}
export type ShowroomDetails = {
    uuid: string;
    name: string;
    commercialRegistrationNumber: string;
    managerName: string;
    phoneNumber: string;
    address: string;
    cars: Array<Car>;
}
export type ShowroomForm = {
    name: string;
    commercialRegistrationNumber: string;
    managerName: string;
    phoneNumber: string;
    address: string;
}