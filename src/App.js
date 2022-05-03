import React, { Component } from 'react';
import { UserService } from './Service/UserService';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/nova-alt/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      visible: false,
      user: {
        id: null,
        nombres: null,
        usuario: null,
        correo_electronico: null,
        password: null,
        numero_telefono: null,
      },
      selectedUser:{

      },
    };
    this.items = [
      {
        label: 'Crear',
        icon: 'pi pi-fw pi-plus',
        command: () => {this.showSaveDialog()}
      },{
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => {this.showEditDialog()}
      },{
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        command: () => {this.delete()}
      }
    ];
    
    this.userService = new UserService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);

    this.footer = (
      <div>
        <Button label= 'Confirmar' icon= 'pi pi-check' onClick = {this.save}/>
      </div>
    );
  }

  componentDidMount(){
    this.userService.getAll().then(data => this.setState({
      users: data
    }));
  }

  save(){
    this.userService.save(this.state.user).then(
      data => {
        this.setState({
          visible: false,
          user: {
            id: null,
            nombres: null,
            usuario: null,
            correo_electronico: null,
            password: null,
            numero_telefono: null,
          }
        });
        this.toast.show({severity: 'success', summary: 'Operación Exitosa', detail: 'Usuario Guardado'});
        this.userService.getAll().then(data => this.setState({
          users: data
        }));
      }
    );
  }

  delete(){
    if(window.confirm("Desea eliminar el usuario?")){
      this.userService.delete(this.state.selectedUser.id).then(data=>{
        this.toast.show({severity: 'success', summary: 'Operación Exitosa', detail: 'Usuario Eliminado'});
        this.userService.getAll().then(data => this.setState({
          users: data
        }));
      });
    }
  }

  render(){
    return (
      <div style={{width: '80%', margin: ' 20px auto 0px'}}>
        <Menubar model = {this.items} style={{margin: '20px auto 10px'}}/>
        <Panel header = 'Proyecto Arquitectura'>
          <DataTable value={this.state.users} selectionMode="single" selection={this.state.selectedUser} onSelectionChange={e => this.setState({selectedUser: e.value})}>
            <Column field='id' header='Id'></Column>
            <Column field='nombres' header='Nombres'></Column>
            <Column field='usuario' header='Usuario'></Column>
            <Column field='correo_electronico' header='Correo Electronico'></Column>
            <Column field='password' header='Contraseña'></Column>
            <Column field='numero_telefono' header='Número de Telefono'></Column>
          </DataTable>
        </Panel>

        <Dialog header="Crear Usuario" visible={this.state.visible} style={{ width:'400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false}) }>
          
          <span className='p-float-label'>  
            <InputText value={this.state.user.nombres} id = 'nombres' style={{width:'100%', margin: '5px'}} onChange={(e) =>{ 
              let val = e.target.value;
              this.setState(prevState => {
                let user = Object.assign({}, prevState.user);
                user.nombres = val;
                return { user }
              })}}/>
            <label htmlFor='nombres'>Nombres</label>
          </span>
          <br/>
          <span className='p-float-label'>  
            <InputText value={this.state.user.usuario} id = 'usuario' style={{width:'100%', margin: '5px'}} onChange={(e) =>{
              let val = e.target.value;
              this.setState(prevState => {
                let user = Object.assign({}, prevState.user);
                user.usuario = val;
                return { user }
              })}}/>
            <label htmlFor='usuario'>Usuario</label>
          </span>
          <br/>
          <span className='p-float-label'>  
            <InputText value={this.state.user.correo_electronico} id = 'correo_electronico' style={{width:'100%', margin: '5px'}} onChange={(e) =>{ 
              let val = e.target.value;
              this.setState(prevState => {
                let user = Object.assign({}, prevState.user);
                user.correo_electronico = val;
                return { user }
              })}}/>
            <label htmlFor='correo_electronico'>Correo Electronico</label>
          </span>
          <br/>
          <span className='p-float-label'>  
            <Password value={this.state.user.password} id = 'password' style={{width:'100%', margin: '5px'}} onChange={(e) =>{ 
              let val = e.target.value;
              this.setState(prevState => {
                let user = Object.assign({}, prevState.user);
                user.password = val;
                return { user }
              })}}/>
            <label htmlFor='password'>Contraseña</label>
          </span>
          <br/>
          <span className='p-float-label'>  
            <InputNumber value={this.state.user.numero_telefono} id = 'numero_telefono' style={{width:'100%', margin: '5px'}} onChange={(e) =>{ 
              let val = e.target.value;
              this.setState(prevState => {
                let user = Object.assign({}, prevState.user);
                user.numero_telefono = val;
                return { user }
              })}}/>
            <label htmlFor='numero_telefono'>Teléfono</label>
          </span>
        </Dialog>
        <Toast ref={toast => {this.toast = toast}} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible: true,
      user: {
        id: null,
        nombres: null,
        usuario: null,
        correo_electronico: null,
        password: null,
        numero_telefono: null,
      }
    })
  }

  showEditDialog(){
    this.setState({
      visible: true,
      user: {
        id: this.state.selectedUser.id,
        nombres: this.state.selectedUser.nombres,
        usuario: this.state.selectedUser.usuario,
        correo_electronico: this.state.selectedUser.correo_electronico,
        password: this.state.selectedUser.password,
        numero_telefono: this.state.selectedUser.numero_telefono,
      }
    })
  }
}