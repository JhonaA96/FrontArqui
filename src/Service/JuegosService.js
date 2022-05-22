import axios from 'axios'

export class JuegosService{
    url = 'http://localhost:8080/juegos/'
    getAll(){
        return axios.get(this.url + 'all').then(
            res => res.data
        );
    }

    save(juego){
        return axios.post(this.url + 'guardar', juego).then(
            res => res.data
        );
    }

    delete(id){
        return axios.delete(this.url + 'eliminar/'+id).then(
            res => res.data
        );
    }
}