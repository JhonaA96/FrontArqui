import axios from 'axios'

export class UserService{
    url = 'http://localhost:8080/usuarios/'
    getAll(){
        return axios.get(this.url + 'all').then(
            res => res.data
        );
    }

    save(user){
        return axios.post(this.url + 'guardar', user).then(
            res => res.data
        );
    }

    delete(id){
        return axios.delete(this.url + 'eliminar/'+id).then(
            res => res.data
        );
    }
}