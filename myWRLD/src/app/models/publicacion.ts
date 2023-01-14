export class Publicacion {
    _id?: number;
    email: string;
    msg: string;
    idUser: string;
    parentCode: string;
    likes: string;

    constructor(email: string, msg: string, idUser: string, parentCode: string, likes: string){
        this.email = email;
        this.msg = msg;
        this.idUser = idUser;
        this.parentCode = parentCode;
        this.likes = likes
    }
}