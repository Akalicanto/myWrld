export class Usuario {
    _id?: number;
    username: string;
    email: string;
    password: string;
    name: string;
    desc: string;
    following: string;
    followers: string;
    profile: File|undefined;
    profileName: string;
    header: File|undefined;
    headerName: string;

    constructor(username: string, email: string, password: string, name: string, desc: string, following: string, followers: string, profile: File|undefined, profileName:string, header: File|undefined, headerName:string){
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
        this.desc = desc;
        this.following = following;
        this.followers = followers;
        this.profile = profile;
        this.profileName = profileName;
        this.header = header;
        this.headerName = headerName;
    }
}