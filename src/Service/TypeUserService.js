import axios from 'axios'

export class TypeUserService{
    url = 'http://localhost:8080/tipoUsuario/'
    all(){
        return axios.get(this.url + 'getAll').then(
            res => res.data
        );
    }
}